const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Purchase = sequelize.define('Purchase', {
    ID_purchase: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_user: { type: DataTypes.INTEGER, allowNull: false },
    ID_game: { type: DataTypes.INTEGER, allowNull: false },
    ID_key: { type: DataTypes.INTEGER, allowNull: false },
    price_paid: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    purchased_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'purchases',
});

module.exports = Purchase;