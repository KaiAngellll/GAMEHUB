const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorite = sequelize.define('Favorite', {
    ID_favorite: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_user: { type: DataTypes.INTEGER, allowNull: false },
    ID_game: { type: DataTypes.INTEGER, allowNull: false },
    added_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'favorites',
});

module.exports = Favorite;