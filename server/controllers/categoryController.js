const { Category, Type } = require('../modules/models');
const ApiError = require('../error/ApiError');
class categoryController {
    async post(req, res, next) {
        try {
            let { id, name } = req.body;
            const { image } = req.files;
            const fileName = `${uuid.v4()}.${image.name.split('.').pop()}`
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            let category;
            if (id) {
                const imagesForDelete = Category.findOne({ where: id })
                fs.unlink(path.resolve(__dirname, '..', 'static', imagesForDelete), () => null)

                category = await Category.update({ name, image: fileName }, { where: { id } });
            }
            else {
                category = await Category.create({ name, image: fileName });
            }
            return res.json(category);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res, next) {
        try {
            const category = await Category.findAndCountAll({
                order: [['name', 'ASC']],
                include: { model: Type },
                distinct: true
            })
            return res.json(category);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getById(req, res, next) {
        try {

            const { id } = req.params
            const category = await Category.findOne(
                {
                    where: { id }
                },
            )
            return res.json(category)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            let { id } = req.body;
            const imagesForDelete = Category.findOne({ where: id })
            fs.unlink(path.resolve(__dirname, '..', 'static', imagesForDelete), () => null)
            const category = await Category.destroy({
                where: {
                    id: id
                }
            });
            return res.json(category);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new categoryController();