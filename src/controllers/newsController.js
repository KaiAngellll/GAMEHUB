const { News, User } = require('../models');

// GET /api/news — получить все новости
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({
            order: [['published_at', 'DESC']],
            include: [{
                model: User,
                as: 'author',
                attributes: ['ID_user', 'username'],
            }],
        });
        res.json({
            success: true,
            count: news.length,
            data: news,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка получения новостей',
            error: error.message,
        });
    }
};

// GET /api/news/:id — получить одну новость
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['ID_user', 'username'],
            }],
        });

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'Новость не найдена',
            });
        }

        res.json({ success: true, data: news });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка получения новости',
            error: error.message,
        });
    }
};