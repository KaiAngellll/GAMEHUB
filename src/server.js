
require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к Supabase PostgreSQL установлено');
        console.log('Модели успешно загружены');

        app.listen(PORT, () => {
            console.log(`Сервер запущен: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Ошибка запуска:', error);
        process.exit(1);
    }
})();
