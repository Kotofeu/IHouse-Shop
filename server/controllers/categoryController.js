const { Category, Type } = require('../modules/models');
const ApiError = require('../error/ApiError');
class categoryController {
    async post(req, res, next) {
        try {
            let { id, name, image } = req.body;
            let category;
            if (id) {
                category = await Category.update(
                    {
                        name: name,
                        image: image
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                );
            }
            else {
                category = await Category.create({ name: name, image: image });
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
                include: { model: Type}
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