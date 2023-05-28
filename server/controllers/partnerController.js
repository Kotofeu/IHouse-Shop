const { Partner } = require('../modules/models');
const ApiError = require('../error/ApiError');
class brandController {
    async post(req, res, next) {
        try {
            let { id, name } = req.body;
            const { image } = req.files;
            const fileName = `${uuid.v4()}.${image.name.split('.').pop()}`
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            let partner;
            if (id) {
                const imagesForDelete = Partner.findOne({ where: id })
                fs.unlink(path.resolve(__dirname, '..', 'static', imagesForDelete), () => null)

                partner = await Partner.update(
                    {
                        name: name,
                        image: fileName
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                );
            }
            else {
                partner = await Partner.create({ name: name, image: fileName });
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
            const imagesForDelete = Partner.findOne({ where: id })
            fs.unlink(path.resolve(__dirname, '..', 'static', imagesForDelete), () => null)

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