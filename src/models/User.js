const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    ID_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'users',
});

module.exports = User;