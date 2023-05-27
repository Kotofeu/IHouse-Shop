const { Partner } = require('../modules/models');
const ApiError = require('../error/ApiError');
class brandController {
    async post(req, res, next) {
        try {
            let { id, name, image } = req.body;
            let partner;
            if (id) {
                partner = await Partner.update(
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
                partner = await Partner.create({ name: name, image: image });
            }
            return res.json(partner);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res, next) {
        try {
            const partner = await Partner.findAndCountAll()
            return res.json(partner);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getById(req, res, next) {
        try {

            const { id } = req.params
            const partner = await Partner.findOne(
                {
                    where: { id }
                },
            )
            return res.json(partner)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            let { id } = req.body;
            const partner = await Partner.destroy({
                where: {
                    id: id
                }
            });
            return res.json(partner);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new brandController();