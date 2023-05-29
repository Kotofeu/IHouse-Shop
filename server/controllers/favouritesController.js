const {
    Good,
    GoodImages,
    Brand,
    Rating,
    Favourites,
} = require('../modules/models');
const ApiError = require('../error/ApiError');

class favouritesController {
    async postGoogInFavourites(req, res, next) {
        try {
            const {
                id,
                goodId,
                userId
            } = req.body;
            let goodInFavourites;
            if (!id) {
                const alreadyInFavorites = await Favourites.findOne({ where: { userId, goodId } })
                if (alreadyInFavorites) return res.json(alreadyInFavorites);
            }
            if (id) {
                goodInFavourites = await Favourites.update(
                    { goodId },
                    { where: { id } }
                );
            }
            else {
                goodInFavourites = await Favourites.create({ userId, goodId });
            }
            return res.json(goodInFavourites);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async getUserFavourites(req, res, next) {
        const { userId } = req.query;
        if (!userId) {
            next(ApiError.badRequest("Не задан userId"));
        }
        let goodInFavourites;
        try {
            if (userId) {
                goodInFavourites = await Favourites.findAndCountAll({
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
                    where: { userId }
                })

            }
            else {
                goodInFavourites = await Favourites.findAndCountAll({
                    order: [['id', 'ASC']],
                    distinct: true,
                })
            }
            return res.json(goodInFavourites);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async isGoodInUserFavourites(req, res, next) {
        const { userId, goodId } = req.query;
        if (!userId || !goodId) {
            next(ApiError.badRequest("Не переданы userId и goodId"));
        }
        try {
            const goodInFavourites = await Favourites.findOne({ where: { userId, goodId } })
            if (!goodInFavourites) {
                return res.json(0);
            }
            return res.json(1);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteGoodInFavourites(req, res, next) {
        try {
            const { id } = req.body;
            const goodInFavourites = await Favourites.destroy({
                where: {
                    id: id
                }
            });
            return res.json(goodInFavourites);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

}

module.exports = new favouritesController();