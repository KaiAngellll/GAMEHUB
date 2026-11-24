const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CaseHistory = sequelize.define('CaseHistory', {
    ID_history: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },

    ID_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    case_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    item_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    item_image: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },

    withdrawal_status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'available',
    },

    opened_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'case_histories',
    timestamps: false,
});

module.exports = CaseHistory;