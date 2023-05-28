const {
    Good,
    GoodImages,
    Category,
    Type,
    GoodInfo,
    Brand,
    Rating
} = require('../modules/models');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const { Op } = require("sequelize");

const ApiError = require('../error/ApiError');
class goodController {
    async postGoodInfo(req, res, next) {
        try {
            let {
                id,
                name,
                description,
                goodId,
                listInfo
            } = req.body;
            let goodInfo;
            if (id) {
                goodInfo = await GoodInfo.update(
                    {
                        name, name,
                        description: description,
                        goodId: goodId
                    },
                    { where: { id: id } }
                );
            }
            else {
                if (listInfo) {
                    goodInfo = listInfo.length
                    listInfo.forEach(info => GoodInfo.create({
                        name: info.name,
                        description: info.description,
                        goodId: goodId
                    }))
                }
                else {
                    goodInfo = await GoodInfo.create({
                        name: name,
                        description: description,
                        goodId: goodId
                    });
                }

            }
            return res.json(goodInfo);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getAllGoodInfo(req, res, next) {
        let { goodId } = req.query;
        let goodInfo;
        try {
            if (goodId) {
                goodInfo = await GoodInfo.findAndCountAll({
                    order: [['id', 'ASC']],
                    distinct: true,
                    where: {
                        goodId: goodId
                    }
                })
            }
            else {
                goodInfo = await GoodInfo.findAndCountAll({
                    order: [['id', 'ASC']],
                    distinct: true,
                })
            }
            return res.json(goodInfo);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getGoodInfoById(req, res, next) {
        let { id } = req.params;
        try {
            const goodInfo = await GoodInfo.findOne({
                where: {
                    id: id
                }
            })
            return res.json(goodInfo);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteGoodInfo(req, res, next) {
        try {
            let { id } = req.body;
            const goodInfo = await GoodInfo.destroy({
                where: {
                    id: id
                }
            });
            return res.json(goodInfo);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async postGoodImage(req, res, next) {
        try {
            const {
                id,
                goodId
            } = req.body;
            const { image } = req.files;
            let fileName = `${uuid.v4()}.${image.name.split('.').pop()}`
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            let goodImage;
            if (id) {
                goodImage = await GoodImages.update({
                    image: fileName,
                    goodId: goodId,
                },
                    { where: { id: id } })
            }
            else {
                goodImage = await GoodImages.create({
                    image: fileName,
                    goodId: goodId,
                })
            }
            return res.json(goodImage);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getAllGoodImage(req, res, next) {
        const { goodId } = req.query;
        let goodImage;
        try {
            if (goodId) {
                goodImage = await GoodImages.findAndCountAll({
                    order: [['id', 'ASC']],
                    distinct: true,
                    where: {
                        goodId: goodId
                    }
                })
            }
            else {
                goodImage = await GoodImages.findAndCountAll({
                    order: [['id', 'ASC']],
                    distinct: true,
                })
            }
            return res.json(goodImage);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getGoodImageById(req, res, next) {
        const { id } = req.params;
        try {
            const goodImage = await GoodImages.findOne({
                where: {
                    id: id
                }
            })
            return res.json(goodImage);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteGoodImage(req, res, next) {
        try {
            let { id } = req.body;
            const imageName = await GoodImages.findOne({
                where: { id: id }
            })
            fs.unlink(path.resolve(__dirname, '..', 'static', imageName.image), () => null)
            const goodImage = await GoodImages.destroy({
                where: {
                    id: id
                }
            });
            return res.json(goodImage);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async postGood(req, res, next) {
        try {
            let {
                id,
                name,
                price,
                oldPrice,
                isPromotion,
                categoryId,
                typeId,
                brandId,
            } = req.body;
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
    async getAllGoods(req, res, next) {
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
            switch (orderBy) {
                case "name": order = [['name', 'ASC']]; break;
                case "price": order = [['price', 'ASC']]; break;
                default: order = [['id', 'ASC']]
            }
            let where = {};
            if (categoryId) where.categoryId = categoryId
            if (typeId) where.typeId = typeId
            if (brandId) where.brandId = brandId
            if (isPromotion) where.isPromotion = { [Op.is]: true }
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
                    ],
                    distinct: true

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
                    ],
                    distinct: true
                })
            }
            return res.json(goods);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getGoodById(req, res, next) {
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
    async deleteGood(req, res, next) {
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