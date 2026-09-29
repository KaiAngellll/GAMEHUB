const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Game = sequelize.define('Game', {
    ID_game: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    genre: { type: DataTypes.STRING(100) },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    release_date: { type: DataTypes.DATEONLY },
    developer: { type: DataTypes.STRING(255) },
    publisher: { type: DataTypes.STRING(255) },
    region: { type: DataTypes.STRING(50), defaultValue: 'Global' },
    image_url: { type: DataTypes.STRING(500) },
    rating: { type: DataTypes.DECIMAL(3, 1), defaultValue: 0.0 },
}, {
    tableName: 'games',
});

module.exports = Game;