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
   /* async create(req, res, next) {

        try {
            let { id, name, workerId, todoTitle } = req.body;
            if (id) {
                const todo = await TodoItem.create({
                    todosListId: id,
                    title: todoTitle
                });
                return res.json(todo);
            }
            else {
                const todosList = await TodosList.create({ name: name, workerId: workerId });
                return res.json(todosList);
            }
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }*/
    async getAll(req, res) {
        try {
            let { 
                categoryId, 
                typeId, 
                brandId, 
                limit, 
                minPrice,
                maxPrice,
                name,
                page 
            } = req.body;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let goods;
            /*
                where: {categoryId: categoryId, typeId: typeId,}
            */
            let where = {};
            if (categoryId) where.categoryId = categoryId
            if (typeId) where.typeId = typeId
            if (brandId) where.brandId = brandId
            if (name) where.name = {[Op.like]: `%${name}%`}
            if (minPrice) where.price = {[Op.gte]: minPrice}
            if (maxPrice) where.price = {[Op.lte]: maxPrice}
            if (!categoryId && !typeId && !brandId && !minPrice && !maxPrice && !name) {
                goods = await Good.findAndCountAll({limit, offset})
            }
            else {
                goods = await Good.findAndCountAll({
                    where: where,
                    limit, 
                    offset,
                    include: {
                        model: GoodImages, Rating, Category, Type, Brand
                    }
                })
            }
            return res.json(goods);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getById(req, res) {
        const {id} = req.params
        const goods = await Good.findOne(
            {
                where: {id},
                include: {
                    model: GoodImages, Rating, Category, Type, Brand, GoodInfo
                }
              //  include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(goods)
    }

   /* async delete(req, res, next) {
        try {
            let { id, todoId } = req.body;
            if (id) {
                const todosItems = await TodoItem.destroy({
                    where: {
                        todosListId: id
                    }
                });
                const todosList = await TodosList.destroy({
                    where: {
                        id: id
                    }
                });
                return res.json(todosItems + todosList);
            }
            else {
                const todo = await TodoItem.destroy({
                    where: {
                        id: todoId
                    }
                });
                return res.json(todo);
            }
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async update(req, res, next) {
        try {
            let { id, name, idTodo, todoTitle } = req.body;
            if (id) {
                const todosList = await TodosList.update(
                    {
                        name: name
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                );
                return res.json(todosList);
            }
            else {
                const todo = await TodoItem.update(
                    {
                        title: todoTitle
                    },
                    {
                        where: {
                            id: idTodo
                        }
                    }
                );
                return res.json(todo);
            }
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }*/
}

module.exports = new goodController();