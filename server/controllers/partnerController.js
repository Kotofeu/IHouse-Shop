const { Workers } = require('../modules/models');
const ApiError = require('../error/ApiError');

class workerController {
    async create(req, res, next) {
        try {
            let { name } = req.body;
            const workers = await Workers.create({ name });
            return res.json(workers);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getAll(req, res) {
        const workers = await Workers.findAndCountAll();
        return res.json(workers);
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const workers = await Workers.findOne(
                {
                    where: { id: id },
                },
            );
            return res.json(workers);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
};

module.exports = new workerController();