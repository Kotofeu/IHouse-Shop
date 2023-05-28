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
    /**
     * Возвращает всю информацию о товарах / товаре
     * Переменные приходящие в req.query
     * @param {number} goodId id товара
    */
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
                    order: [['name', 'ASC']],
                    distinct: true,
                })
            }
            return res.json(goodInfo);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    /**
     * Удаляет строку информации о товаре
     * Переменные приходящие в req.body
     * @param {number} id id строки информации
    */
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
    /**
     * Возвращает все изображения товаров / товара
     * Переменные приходящие в req.query
     * @param {number} goodId id товара
    */
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
    /**
     * Возвращает изображение товара
     * Переменные приходящие в req.params
     * @param {number} id id изображения
    */
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
    /**
     * Удаляет изображение товара 
     * Переменные приходящие в req.body
     * @param {number} id id изображения
    */
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

    /**
     * Создаёт и обновляет товар
     * Переменные приходящие в req.body
     * @param {number} id id товара, при указании производит обновление товара, при отсутствии добавление
     * @param {string} name название товара
     * @param {number} price цена товара
     * @param {number} oldPrice старая цена товара, нужна для определения скидок
     * @param {boolean} isPromotion нахождение товара на вкладке Акции
     * @param {number} categoryId id категории
     * @param {number} typeId id типа товара
     * @param {number} brandId id бренда
     * @param {info[]} infos массив информации об объекте
     * {
        * @var {string} name название зарактеристики, 
        * @var {string} description описание характеристики, 
        * @var {integer} goodId id товара 
     * }
     * 
     * Переменные приходящие в req.files
     * @param {image[]} images картинки товара
    */
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
                infos
            } = req.body;
            const { images } = req.files;
            let imagesNames = [];
            images.forEach(image => {
                const fileName = `${uuid.v4()}.${image.name.split('.').pop()}`
                imagesNames.push(fileName)
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
            })
            let goods;

            if (id) {
                goods = await Good.update(
                    { name, price, oldPrice, isPromotion, categoryId, typeId, brandId },
                    { where: { id } }
                );
                if (imagesNames) {
                    const imagesForDelete = GoodImages.findAll({ where: { goodId: id } })
                    imagesForDelete.row.map(image => image.image).forEach(image => (
                        fs.unlink(path.resolve(__dirname, '..', 'static', image), () => null)
                    ))
                    GoodImages.destroy({ where: { goodId: id } })
                    imagesNames.forEach(image => RatingImage.create(
                        {
                            goodId: id,
                            image
                        }
                    ))
                }
                if (infos) {
                    GoodInfo.destroy({ where: { goodId: id } })
                    infos.forEach(info => GoodInfo.create({
                        name: info.name,
                        description: info.description,
                        goodId: id
                    }))
                }
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
                if (imagesNames) {
                    imagesNames.forEach(image => GoodImages.create(
                        {
                            goodId: goods.id,
                            image
                        }
                    ))
                }
                if (infos) {
                    infos.forEach(info => GoodInfo.create({
                        name: info.name,
                        description: info.description,
                        goodId: goods.id
                    }))
                }
            }
            return res.json(goods);

        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    /**
     * Поиск товаров по параметрам 
     * Переменные приходящие в req.query
     * @param {number} categoryId id категирии товара
     * @param {number} typeId id типа товара
     * @param {number} brandId id типа товара
     * @param {string} name название товара
     * @param {number} minPrice минимальная цена для товара
     * @param {number} maxPrice максимальная цена для товара
     * @param {string} orderBy упорядочить по @enum {name, price, id: default}
     * @param {boolean} isPromotion является ли товар в разделе акции
     * @param {number} limit лимит количества получаемых товаров
     * @param {number} page страница получаемых товаров
    */
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
    /**
     * Возвращает товар
     * Переменные приходящие в req.params
     * @param {number} id id товара
    */
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
    /**
     * Удаляет товар 
     * Переменные приходящие в req.body
     * @param {number} id id товара
    */
    async deleteGood(req, res, next) {
        try {
            let { id } = req.body;
            const imagesForDelete = GoodImages.findAll({ where: { goodId: id } })
            imagesForDelete.row.map(image => image.image).forEach(image => (
                fs.unlink(path.resolve(__dirname, '..', 'static', image), () => null)
            ))
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