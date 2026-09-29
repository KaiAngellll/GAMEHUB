const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

// POST /api/auth/register — регистрация
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Проверка обязательных полей
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Заполните все поля: username, email, password',
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Пароль должен содержать минимум 6 символов',
            });
        }

        // Проверка: существует ли уже пользователь с таким email или username
        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Пользователь с таким email уже существует',
            });
        }

        const existingUsername = await User.findOne({
            where: { username },
        });

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Такое имя пользователя уже занято',
            });
        }

        // Хеширование пароля
        const password_hash = await hashPassword(password);

        // Создание пользователя
        const user = await User.create({
            username,
            email,
            password_hash,
            balance: 0,
        });

        // Генерация токена
        const token = generateToken(user.ID_user);

        res.status(201).json({
            success: true,
            message: 'Регистрация успешна',
            data: {
                ID_user: user.ID_user,
                username: user.username,
                email: user.email,
                balance: user.balance,
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка регистрации',
            error: error.message,
        });
    }
};

// POST /api/auth/login — вход
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Введите email и пароль',
            });
        }

        // Поиск пользователя
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Неверный email или пароль',
            });
        }

        if (user.is_blocked) {
            return res.status(403).json({
                success: false,
                message: 'Учётная запись заблокирована',
            });
        }

        // Проверка пароля
        const isValid = await comparePassword(password, user.password_hash);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Неверный email или пароль',
            });
        }

        // Генерация токена
        const token = generateToken(user.ID_user);

        res.json({
            success: true,
            message: 'Вход выполнен',
            data: {
                ID_user: user.ID_user,
                username: user.username,
                email: user.email,
                balance: user.balance,
                is_admin: user.is_admin,
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка входа',
            error: error.message,
        });
    }
};

// GET /api/auth/me — получить свой профиль (защищённый маршрут)
exports.getMe = async (req, res) => {
    res.json({
        success: true,
        data: req.user,
    });
};