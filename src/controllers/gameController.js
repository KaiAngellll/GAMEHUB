const { Game } = require('../models');

// GET /api/games — получить все игры
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json({
            success: true,
            count: games.length,
            data: games,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка получения игр',
            error: error.message,
        });
    }
};

// GET /api/games/:id — получить одну игру по ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Игра не найдена',
            });
        }
        res.json({ success: true, data: game });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка получения игры',
            error: error.message,
        });
    }
};