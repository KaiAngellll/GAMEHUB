const { Box, BoxItem, Game } = require('../models');

// GET /api/boxes — получить все боксы
exports.getAllBoxes = async (req, res) => {
    try {
        const boxes = await Box.findAll({
            where: { is_active: true },
        });
        res.json({
            success: true,
            count: boxes.length,
            data: boxes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка получения боксов',
            error: error.message,
        });
    }
};

// GET /api/boxes/:id — получить один бокс с содержимым
exports.getBoxById = async (req, res) => {
    try {
        const box = await Box.findByPk(req.params.id, {
            include: [{
                model: BoxItem,
                include: [{ model: Game }],
            }],
        });

        if (!box) {
            return res.status(404).json({
                success: false,
                message: 'Бокс не найден',
            });
        }

        res.json({ success: true, data: box });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка получения бокса',
            error: error.message,
        });
    }
};