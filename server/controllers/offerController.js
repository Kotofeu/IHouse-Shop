const {
    ComplexOffer,
    ComplexOfferGoods,
    Good,
    Brand,
    Category,
    Type
} = require('../modules/models');

const ApiError = require('../error/ApiError');

class offerController {
    async postOffer(req, res, next) {
        try {
            let { id, name, price, desc, image } = req.body;
            let complexOffer;
            if (id) {
                complexOffer = await ComplexOffer.update({
                    name: name,
                    price: price,
                    desc: desc,
                    image: image
                },
                    {
                        where: {
                            id: id
                        }
                    });
            }
            else {
                complexOffer = await ComplexOffer.create({
                    name: name,
                    price: price,
                    desc: desc,
                    image: image
                });
            }
            return res.json(complexOffer);

        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async postGoodsAtOffer(req, res, next) {
        try {
            let { id, complexOfferId, goodId, count } = req.body;
            let complexOfferGoods;
            if (id) {
                complexOfferGoods = await ComplexOfferGoods.update({
                    goodId: goodId,
                    count: count
                },
                    {
                        where: {
                            id: id
                        }
                    });
            }
            else {
                complexOfferGoods = await ComplexOfferGoods.create({
                    complexOfferId: complexOfferId,
                    goodId: goodId,
                    count: count
                });
            }
            return res.json(complexOfferGoods);

        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getAll(req, res, next) {
        try {
            const complexOffer = await ComplexOffer.findAndCountAll({
                order: [
                    ['name', 'ASC']],
                include: [
                    {
                        model: ComplexOfferGoods,
                        include: [{
                            model: Good,
                            include: [
                                { model: Brand },
                                { model: Category },
                                { model: Type }
                            ]

                        }]
                    },

                ],
                distinct: true

            })
            return res.json(complexOffer);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params
            const complexOffer = await ComplexOffer.findOne(
                {
                    where: { id },
                    include: [
                        { all: true },
                    ]
                },
            )
            return res.json(complexOffer)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteOffer(req, res, next) {
        try {
            let { id } = req.body;
            const complexOffer = await ComplexOffer.destroy({
                where: {
                    id: id
                }
            });
            return res.json(complexOffer);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteGoodsAtOffer(req, res, next) {
        try {
            let { id } = req.body;
            const complexOfferGoods = await ComplexOfferGoods.destroy({
                where: {
                    id: id
                }
            });
            return res.json(complexOfferGoods);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
}

module.exports = new offerController();