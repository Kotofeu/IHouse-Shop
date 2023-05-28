const {
    Good,
    GoodImages,
    Brand,
    Rating,
    Basket,
} = require('../modules/models');
const ApiError = require('../error/ApiError');

class basketController {
    async postGoogInBasket(req, res, next) {
        try {
            const {
                id,
                goodId,
                userId,
                count
            } = req.body;
            let goodInBasket;
            if (id) {
                goodInBasket = await Basket.update(
                    { goodId, count },
                    { where: { id } }
                );
            }
            else {
                goodInBasket = await Basket.create({ userId, goodId, count });
            }
            return res.json(goodInBasket);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getUserBasket(req, res, next) {
        const { userId } = req.query;
        let goodInBasket;
        try {
            if (userId) {
                goodInBasket = await Basket.findAndCountAll({
                    order: [['id', 'ASC']],
                    include: [{
                        model: Good,
                        include: [
                            { model: Brand },
                            { model: Rating },
                            { model: GoodImages }
                        ]
                    }],
                    distinct: true,
                    where: {userId}
                })

            }
            else {
                goodInBasket = await Basket.findAndCountAll({
                    order: [['id', 'ASC']],
                    distinct: true,
                })
            }
            return res.json(goodInBasket);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async isGoodInUserBasket(req, res, next) {
        const { userId, goodId} = req.query;
        if (!userId || !goodId){
            next(ApiError.badRequest("Не переданы userId и goodId"));
        }
        try {
            goodInBasket = await Basket.findOne({where: {userId, goodId}})
            if (!goodInBasket) {
                return false
            }
            return true
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteGoodInfo(req, res, next) {
        try {
            const { id } = req.body;
            const goodInBasket = await Basket.destroy({
                where: {
                    id: id
                }
            });
            return res.json(goodInBasket);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
   
}

module.exports = new basketController();