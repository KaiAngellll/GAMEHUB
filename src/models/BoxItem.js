const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BoxItem = sequelize.define('BoxItem', {
    ID_box_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_box: { type: DataTypes.INTEGER, allowNull: false },
    ID_game: { type: DataTypes.INTEGER, allowNull: false },
    probability: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
}, {
    tableName: 'box_items',
});

module.exports = BoxItem;