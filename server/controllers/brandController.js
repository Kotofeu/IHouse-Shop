const { Brand } = require('../modules/models');
const ApiError = require('../error/ApiError');
class brandController {
    async post(req, res, next) {
        try {
            let { id, name } = req.body;
            const { image } = req.files;
            const fileName = `${uuid.v4()}.${image.name.split('.').pop()}`
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            let brand;
            if (id) {
                const imagesForDelete = Brand.findOne({ where: id })
                fs.unlink(path.resolve(__dirname, '..', 'static', imagesForDelete), () => null)
                brand = await Brand.update({name,image: fileName},{where: {id: id}});
            }
            else {
                brand = await Brand.create({ name: name, image: fileName });
            }
            return res.json(brand);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res, next) {
        try {
            const brand = await Brand.findAndCountAll()
            return res.json(brand);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getById(req, res, next) {
        try {

            const { id } = req.params
            const brand = await Brand.findOne(
                {
                    where: { id }
                },
            )
            return res.json(brand)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            let { id } = req.body;
            const imagesForDelete = Brand.findOne({ where: id })
            fs.unlink(path.resolve(__dirname, '..', 'static', imagesForDelete), () => null)
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