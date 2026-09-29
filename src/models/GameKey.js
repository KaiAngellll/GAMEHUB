const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GameKey = sequelize.define('GameKey', {
    ID_key: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_game: { type: DataTypes.INTEGER, allowNull: false },
    key_value: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    status: { type: DataTypes.STRING(50), defaultValue: 'available' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'game_keys',
});

module.exports = GameKey;