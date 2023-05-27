const { Contacts } = require('../modules/models');
const ApiError = require('../error/ApiError');

class contactController {
    async create(req, res, next) {
        try {
            let { name, info, phone, email } = req.body;
            const сontacts = await Contacts.create({ name, info, phone, email });
            return res.json(сontacts);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async delete(req, res, next) {
        try {
            let { id } = req.body;
            const сontact = await Contacts.destroy(
                {
                    where: { id: id }
                }
            );
            return res.json(сontact);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        const сontacts = await Contacts.findAndCountAll({
            order: [
                ['id', 'ASC']],
        });
        return res.json(сontacts);
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const сontacts = await Contacts.findOne(
                {
                    where: { id: id },
                },
            );
            return res.json(сontacts);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async update(req, res, next) {
        try {
            let { id, name, info, phone, email } = req.body;
            const сontacts = await Contacts.update(
                {
                    name: name,
                    info: info,
                    phone: phone,
                    email: email
                },
                {
                    where: {
                        id: id
                    }
                }
            );
            return res.json(сontacts);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
}

module.exports = new contactController();