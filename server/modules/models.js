const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('role', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});
const User = sequelize.define('user', {
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
    },
    email:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:
    {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isSubscribed:
    {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});
const Basket = sequelize.define('basket', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    count:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
const Rating = sequelize.define('rating', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating:
    {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});
const Favourites = sequelize.define('favourites', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
const Good = sequelize.define('good', {
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
    },
    price:
    {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    oldPrice:
    {
        type: DataTypes.FLOAT,
        allowNull: true
    }

});
const GoodImages = sequelize.define('good_images', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
});
const Category = sequelize.define('category', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
});
const Type = sequelize.define('type', {
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
const GoodInfo = sequelize.define('good_info', {
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
    },
    description:
    {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
const Brand = sequelize.define('brand', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
});
const ComplexOffer = sequelize.define('complex_offer', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price:
    {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});
const ComplexOfferGoods = sequelize.define('complex_offer_goods', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});
const Partner = sequelize.define('partner', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
});


Role.hasMany(User, {
    foreignKey: {
        name: 'roleId',
        allowNull: false
    }
});
User.belongsTo(Role);

User.hasMany(Basket, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
Basket.belongsTo(User);

User.hasMany(Rating, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
Rating.belongsTo(User);

User.hasMany(Favourites, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
Favourites.belongsTo(User);



Good.hasMany(Basket, {
    foreignKey: {
        name: 'goodId',
        allowNull: false
    }
});
Basket.belongsTo(Good);

Good.hasMany(Rating, {
    foreignKey: {
        name: 'goodId',
        allowNull: false
    }
});
Rating.belongsTo(Good);

Good.hasMany(Favourites, {
    foreignKey: {
        name: 'goodId',
        allowNull: false
    }
});
Favourites.belongsTo(Good);

Good.hasMany(GoodImages, {
    foreignKey: {
        name: 'goodId',
        allowNull: false
    }
});
GoodImages.belongsTo(Good);

Good.hasMany(GoodInfo, {
    foreignKey: {
        name: 'goodId',
        allowNull: false
    }
});
GoodInfo.belongsTo(Good);


Category.hasMany(Good, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    }
})
Good.belongsTo(Category)


Type.hasMany(Good, {
    foreignKey: {
        name: 'typeId',
        allowNull: true
    }
});
Good.belongsTo(Type);

Category.hasMany(Type, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    }
});
Type.belongsTo(Category);

Brand.hasMany(Good, {
    foreignKey: {
        name: 'brandId',
        allowNull: true
    }
});
Good.belongsTo(Brand);

Good.hasMany(ComplexOfferGoods, {
    foreignKey: {
        name: 'goodId',
        allowNull: false
    }
});
ComplexOfferGoods.belongsTo(Good);

ComplexOffer.hasMany(ComplexOfferGoods, {
    foreignKey: {
        name: 'complexOfferId',
        allowNull: false
    }
});
ComplexOfferGoods.belongsTo(ComplexOffer);


module.exports = {
    Role,
    User,
    Basket,
    Rating,
    Favourites,
    Good,
    GoodImages,
    Category,
    Type,
    GoodInfo,
    Brand,
    ComplexOffer,
    ComplexOfferGoods,
    Partner
}