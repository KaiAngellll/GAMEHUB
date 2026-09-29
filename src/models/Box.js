const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Box = sequelize.define('Box', {
    ID_box: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING(100) },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image_url: { type: DataTypes.STRING(500) },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    tableName: 'boxes',
});

module.exports = Box;