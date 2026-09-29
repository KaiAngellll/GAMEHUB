const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    ID_review: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_user: { type: DataTypes.INTEGER, allowNull: false },
    ID_game: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
    text: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'reviews',
});

module.exports = Review;