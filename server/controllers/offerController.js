const {
    ComplexOffer,
    ComplexOfferGoods,
    Good,
    Brand,
    Category,
    Rating,
    Type
} = require('../modules/models');

const ApiError = require('../error/ApiError');

class offerController {
    async postOffer(req, res, next) {
        try {
            let { id, name, price, desc } = req.body;
            const { image } = req.files;
            const fileName = `${uuid.v4()}.${image.name.split('.').pop()}`
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            let complexOffer;
            if (id) {
                const imagesForDelete = ComplexOffer.findOne({ where: id })
                fs.unlink(path.resolve(__dirname, '..', 'static', imagesForDelete), () => null)

                complexOffer = await ComplexOffer.update({
                    name: name,
                    price: price,
                    desc: desc,
                    image: fileName
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
                    image: fileName
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
                                { model: Type },
                                { model: Rating }
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
                    include: [{
                        model: Good,
                        include: [
                            { model: Brand },
                            { model: Category },
                            { model: Type },
                            { model: Rating }
                        ]

                    }]
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
            const imagesForDelete = ComplexOffer.findOne({ where: id })
            fs.unlink(path.resolve(__dirname, '..', 'static', imagesForDelete), () => null)

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