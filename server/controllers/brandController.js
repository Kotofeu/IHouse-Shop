const { Brand } = require('../modules/models');
const ApiError = require('../error/ApiError');
class brandController {
    async post(req, res, next) {
        try {
            let { id, name, image } = req.body;
            let brand;
            if (id) {
                brand = await Brand.update(
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
                brand = await Brand.create({ name: name, image: image });
            }
            return res.json(brand);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        try {
           const brand = await Brand.findAndCountAll()
            return res.json(brand);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getById(req, res) {
        const {id} = req.params
        const brand = await Brand.findOne(
            {
                where: {id}
            },
        )
        return res.json(brand)
    }

    async delete(req, res, next) {
        try {
            let { id } = req.body;
            const brand = await Brand.destroy({
                where: {
                    id: id
                }
            });
            return res.json(brand);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new brandController();