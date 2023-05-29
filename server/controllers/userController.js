const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const {
    User
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
        const { email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword, name: email })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }
    async edit(req, res, next) {
        try {
            const {
                id,
                name,
                email,
                password,
                phone,
                isSubscribed,
            } = req.body;
            let image;
            let fileName
            if (req.files && req.files.image){
                image = req.files.image
                fileName = staticManagement.staticCreate(image)
            }
            staticManagement.staticDelete(await User.findOne({ where: { id: id } }))

            const user = await User.update({
                name, email, password, phone, isSubscribed, image: fileName
            }, {where: id})
            return res.json(user);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }
}

module.exports = new userController()