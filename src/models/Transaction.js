const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
    ID_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_user: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING(50), allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING(50), defaultValue: 'pending' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'transactions',
});

module.exports = Transaction;