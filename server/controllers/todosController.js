const { TodosList, TodoItem } = require('../modules/models');
const ApiError = require('../error/ApiError');

class todosController {
    async create(req, res, next) {

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

    }
    async getAll(req, res) {
        try {
            let { workerId } = req.query;
            let todosList;
            if (!workerId) {
                todosList = await TodosList.findAndCountAll({
                    order: [
                        ['id', 'ASC']],
                    include: {
                        model: TodoItem
                    }

                });
            }
            else {
                todosList = await TodosList.findAndCountAll({
                    where: {
                        workerId: workerId
                    },
                    order: [
                        ['id', 'ASC']],
                    include: {
                        model: TodoItem
                    }
                });
            }
            return res.json(todosList);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async delete(req, res, next) {
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

    }
}

module.exports = new todosController();