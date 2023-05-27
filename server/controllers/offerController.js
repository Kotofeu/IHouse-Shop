const { ComplexOffer, ComplexOfferGoods, Good } = require('../modules/models');
const ApiError = require('../error/ApiError');

class offerController {
    async post(req, res, next) {

        try {
            let { id, name, price, oldPrice, categoryId, typeId, brandId } = req.body;
            let ComplexOffer;
            if (id) {
                ComplexOffer = await Good.update({
                    name: name,
                    price: price,
                    oldPrice: oldPrice,
                    categoryId: categoryId,
                    typeId: typeId,
                    brandId: brandId
                },
                {
                    where: {
                        id: id
                    }
                });
            }
            else {
                ComplexOffer = await Good.create({
                    name: name,
                    price: price,
                    oldPrice: oldPrice,
                    categoryId: categoryId,
                    typeId: typeId,
                    brandId: brandId
                });
            }
            return res.json(ComplexOffer);

        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getAll(req, res, next) {
        try {
            const complex_offer = await ComplexOffer.findAndCountAll({
                order: [
                    ['name', 'ASC']],
                include: [
                    { model: ComplexOfferGoods },
                    { model: Good }
                ]
            })
            return res.json(complex_offer);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params
            const goods = await Good.findOne(
                {
                    where: { id },
                    include: [
                        { model: GoodImages },
                        { model: GoodInfo },
                        { model: Rating },
                        { model: Category },
                        { model: Type },
                        { model: Brand },
                    ]
                    //  include: [{model: DeviceInfo, as: 'info'}]
                },
            )
            return res.json(goods)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            let { id } = req.body;
            const goods = await Good.destroy({
                where: {
                    id: id
                }
            });
            return res.json(goods);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
}

module.exports = new offerController();