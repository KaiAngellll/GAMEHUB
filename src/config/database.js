const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER || 'localhost',
        port: parseInt(process.env.DB_PORT) || 1433,
        dialect: 'mssql',
        logging: false,
        dialectOptions: {
            options: {
                encrypt: process.env.DB_ENCRYPT === 'true',
                trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
                enableArithAbort: true,
            },
        },
        define: {
            timestamps: false,
            freezeTableName: true,
        },
    }
);

module.exports = sequelize;