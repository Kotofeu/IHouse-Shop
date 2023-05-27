const {
    Good,
    GoodImages,
    Category,
    Type,
    GoodInfo,
    Brand,
    Rating
} = require('../modules/models');
const ApiError = require('../error/ApiError');
const { Op } = require("sequelize");
class goodController {
    async post(req, res, next) {

        try {
            let { id, name, price, oldPrice, isPromotion, categoryId, typeId, brandId } = req.body;
            let goods;
            if (id) {
                goods = await Good.update({
                    name: name,
                    price: price,
                    oldPrice: oldPrice,
                    isPromotion: isPromotion,
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
                goods = await Good.create({
                    name: name,
                    price: price,
                    oldPrice: oldPrice,
                    isPromotion: isPromotion,
                    categoryId: categoryId,
                    typeId: typeId,
                    brandId: brandId
                });
            }
            return res.json(goods);

        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getAll(req, res, next) {
        try {
            let {
                categoryId = null,
                typeId,
                brandId,
                limit,
                minPrice,
                maxPrice,
                orderBy,
                isPromotion,
                name,
                page
            } = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let goods;
            let order;
            switch (orderBy){
                case "name": order = [['name', 'ASC']]; break;
                case "price": order = [['price', 'ASC']]; break;
                default: order = [['id', 'ASC']]
            }
            let where = {};
            if (categoryId) where.categoryId = categoryId
            if (typeId) where.typeId = typeId
            if (brandId) where.brandId = brandId
            if (isPromotion) where.isPromotion = {[Op.is]: true}
            if (name) where.name = { [Op.iLike]: `%${name}%` }
            if (minPrice) where.price = { [Op.gte]: minPrice }
            if (maxPrice) where.price = { [Op.lte]: maxPrice }
            if (minPrice && maxPrice) where.price = { [Op.between]: [minPrice, maxPrice] }
            if (!categoryId && !typeId && !brandId && !minPrice && !maxPrice && !name && !isPromotion) {
                goods = await Good.findAndCountAll({
                    limit, offset,
                    order: order,
                    include: [
                        { model: GoodImages },
                        { model: Rating },
                        { model: Category },
                        { model: Type },
                        { model: Brand },
                    ]
                })
            }
            else {
                goods = await Good.findAndCountAll({
                    where: where,
                    limit,
                    offset,
                    order: order,
                    include: [
                        { model: GoodImages },
                        { model: Rating },
                        { model: Category },
                        { model: Type },
                        { model: Brand },
                    ]
                })
            }
            return res.json(goods);
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

module.exports = new goodController();