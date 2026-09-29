const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

// Проверка авторизации
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Требуется авторизация (нет токена)',
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password_hash'] },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Пользователь не найден',
            });
        }

        if (user.is_blocked) {
            return res.status(403).json({
                success: false,
                message: 'Учётная запись заблокирована',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Неверный или просроченный токен',
            error: error.message,
        });
    }
};

// Проверка прав администратора
const adminMiddleware = (req, res, next) => {
    if (!req.user || !req.user.is_admin) {
        return res.status(403).json({
            success: false,
            message: 'Доступ только для администраторов',
        });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };