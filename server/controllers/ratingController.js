const {
    User,
    RatingImage,
    Rating
} = require('../modules/models');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const { Op, where } = require("sequelize");

const ApiError = require('../error/ApiError');
class goodController {
    async postRating(req, res, next) {
        try {
            const {
                id,
                rating,
                userId,
                goodId,
                comment
            } = req.body;
            const { images } = req.files;
            let imagesNames = [];
            images.forEach(image => {
                const fileName = `${uuid.v4()}.${image.name.split('.').pop()}`
                imagesNames.push(fileName)
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
            })
            let ratingModel;
            if (id) {
                ratingModel = await Rating.update(
                    {
                        rating,
                        comment
                    },
                    { where: { id: id } }
                );
                if (imagesNames) {
                    const imagesForDelete = RatingImage.findAll({ where: { ratingId: id } })
                    imagesForDelete.row.map(image => image.image).forEach(image => (
                        fs.unlink(path.resolve(__dirname, '..', 'static', image), () => null)
                    ))
                    RatingImage.destroy({ where: { ratingId: id } })
                    imagesNames.forEach(image => RatingImage.create(
                        {
                            ratingId: id,
                            image
                        }
                    ))
                }
            }
            else {
                ratingModel = await Rating.create(
                    {
                        rating,
                        comment,
                        userId,
                        goodId
                    }
                );
                if (imagesNames) {
                    imagesNames.forEach(image => RatingImage.create(
                        {
                            ratingId: id,
                            image
                        }
                    ))
                }

            }
            return res.json(ratingModel);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getAllRatingByGood(req, res, next) {
        const { goodId, limit = 10, page = 1, rating } = req.query;
        if (!goodId) {
            next(ApiError.badRequest("Не указан goodId"));
        }
        const offset = page * limit - limit
        let ratingModel;
        const where = {}
        try {
            where.goodId = goodId
            if (rating) where.rating = rating
            ratingModel = await Rating.findAndCountAll({
                order: [['id', 'ASC']],
                include: [{ model: RatingImage }, {model: User}],
                distinct: true,
                where,
                limit,
                offset
            })

            return res.json(ratingModel);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllRatingByUser(req, res, next) {
        const { userId } = req.query;
        let ratingModel;
        if (!userId) {
            next(ApiError.badRequest("Не указан userId"));
        }
        try {
            ratingModel = await Rating.findAndCountAll({
                order: [['id', 'ASC']],
                include: [{ model: RatingImage }],
                distinct: true,
                where: {
                    userId: userId
                }
            })
            return res.json(ratingModel);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteRating(req, res, next) {
        try {
            const { id } = req.body;
            const imagesForDelete = RatingImage.findAll({ where: { ratingId: id } })
            imagesForDelete.row.map(image => image.image).forEach(image => (
                fs.unlink(path.resolve(__dirname, '..', 'static', image), () => null)
            ))
            const ratingModel = await Rating.destroy({
                where: {
                    id: id
                }
            });
            return res.json(ratingModel);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
}

module.exports = new goodController();