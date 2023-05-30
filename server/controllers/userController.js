const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const staticManagement = require('../helpers/staticManagement')

const {
    User, UserAuthorization
} = require('../modules/models');
const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class userController {
    async registration(req, res, next) {
        try {

            const { email, password } = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await UserAuthorization.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ name: email })
            const userAuth = await UserAuthorization.create({ email, password: hashPassword, userId: user.id })
            const token = generateJwt(user.id, userAuth.email, userAuth.role)
            return res.json({ token })
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await UserAuthorization.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.userId, user.email, user.role)
            return res.json({ token })
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async createAdmin(req, res, next) {
        try {

            const { email, password } = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await UserAuthorization.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ name: email })
            const userAuth = await UserAuthorization.create({ email, role: "ADMIN", password: hashPassword, userId: user.id })

            return res.json(userAuth)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async edit(req, res, next) {
        try {
            const {
                name,
                newEmail,
                newPassword,
                phone,
                isSubscribed,
            } = req.body;
            const user = await UserAuthorization.findOne({ where: { userId:req.user.id} })
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }

            let image;
            let fileName
            let hashPassword
            if (req.files && req.files.image) { 
                image = req.files.image
                fileName = staticManagement.staticCreate(image)
                staticManagement.staticDelete(await User.findOne({ where: { id: req.user.id } }))
            }
            
            if (newPassword){
                hashPassword = await bcrypt.hash(newPassword, 5)
            }

            const updatedUser = await User.update({
                name, phone, isSubscribed, image: fileName
            }, { where: { id: user.userId } })
            const userAuthorization = await UserAuthorization.update({
                email: newEmail, password: hashPassword
            }, { where: { id: user.userId } })

            const newAuth = await UserAuthorization.findOne({ where: { userId:req.user.id} })
            const token = generateJwt(req.user.id, newAuth.email, newAuth.password)
            return res.json({ token })
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findOne(
                {
                    where: { id },
                    include: {model: UserAuthorization, attributes: ["role", "email"]}
                    
                },
            )
            return res.json(user)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new userController()