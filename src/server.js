const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('подключение к SQL Server установлено');
        console.log('модели успешно загружены');

        app.listen(PORT, () => {
            console.log(`сервер запущен: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('ошибка запуска:', error);
        process.exit(1);
    }
})();