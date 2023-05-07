const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const TodosList = sequelize.define('todos_lists', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
});
const TodoItem = sequelize.define('todo_items', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
const Workers = sequelize.define('workers', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});
const Contacts = sequelize.define('contacts', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    info: {
        type: DataTypes.TEXT
    },
    phone: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    }
});

TodosList.hasMany(TodoItem);
TodoItem.belongsTo(TodosList);


Workers.hasMany(TodosList);
TodosList.belongsTo(Workers);

module.exports = {
    TodosList,
    TodoItem,
    Workers,
    Contacts
}