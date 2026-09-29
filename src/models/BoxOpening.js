const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BoxOpening = sequelize.define('BoxOpening', {
    ID_opening: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_user: { type: DataTypes.INTEGER, allowNull: false },
    ID_box: { type: DataTypes.INTEGER, allowNull: false },
    ID_game: { type: DataTypes.INTEGER, allowNull: false },
    ID_key: { type: DataTypes.INTEGER, allowNull: false },
    opened_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'box_openings',
});

module.exports = BoxOpening;