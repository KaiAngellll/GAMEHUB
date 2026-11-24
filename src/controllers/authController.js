
const { User, CaseHistory, Transaction } = require('../models');
const sequelize = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

// Проверка Steam Trade URL
const isValidSteamUrl = (url) => {
    return /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+(?:&token=[a-zA-Z0-9_-]+)?$/.test(url);
};

// POST /api/auth/register — регистрация
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

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

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Пользователь с таким email уже существует',
            });
        }

        const existingUsername = await User.findOne({ where: { username } });

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Такое имя пользователя уже занято',
            });
        }

        const password_hash = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password_hash,
            balance: 0,
        });

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

        const isValid = await comparePassword(password, user.password_hash);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Неверный email или пароль',
            });
        }

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

// GET /api/auth/me — получить свой профиль
exports.getMe = async (req, res) => {
    res.json({
        success: true,
        data: req.user,
    });
};

// GET /api/auth/account — загрузить данные аккаунта
exports.getAccount = async (req, res) => {
    try {
        const userId = req.user.ID_user;

        const user = await User.findByPk(userId, {
            attributes: [
                'ID_user',
                'username',
                'email',
                'balance',
                'steam_trade_url',
            ],
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Пользователь не найден',
            });
        }

        const caseHistory = await CaseHistory.findAll({
            where: { ID_user: userId },
            order: [['opened_at', 'DESC']],
        });

        const transactions = await Transaction.findAll({
            where: { ID_user: userId },
            order: [['created_at', 'DESC']],
        });

        res.json({
            success: true,
            data: {
                balance: user.balance,
                caseHistory,
                steamTradeUrl: user.steam_trade_url || '',
                transactions,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка загрузки аккаунта',
            error: error.message,
        });
    }
};

// PUT /api/auth/profile — обновить свой профиль
exports.updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.user.ID_user;

        if (!username || !email) {
            return res.status(400).json({
                success: false,
                message: 'Имя пользователя и email обязательны',
            });
        }

        const existingUsername = await User.findOne({
            where: { username },
        });

        if (existingUsername && existingUsername.ID_user !== userId) {
            return res.status(400).json({
                success: false,
                message: 'Такое имя пользователя уже занято',
            });
        }

        const existingEmail = await User.findOne({
            where: { email },
        });

        if (existingEmail && existingEmail.ID_user !== userId) {
            return res.status(400).json({
                success: false,
                message: 'Этот email уже используется',
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Пользователь не найден',
            });
        }

        user.username = username;
        user.email = email;

        await user.save();

        res.json({
            success: true,
            message: 'Профиль успешно обновлён',
            data: {
                ID_user: user.ID_user,
                username: user.username,
                email: user.email,
                balance: user.balance,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка обновления профиля',
            error: error.message,
        });
    }
};

// GET /api/auth/case-history — история открытых кейсов
exports.getCaseHistory = async (req, res) => {
    try {
        const history = await CaseHistory.findAll({
            where: { ID_user: req.user.ID_user },
            order: [['opened_at', 'DESC']],
        });

        res.json({
            success: true,
            data: history,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка получения истории кейсов',
            error: error.message,
        });
    }
};

// POST /api/auth/case-openings — открыть кейс
exports.openCase = async (req, res) => {
    try {
        const { caseId, itemName, itemImage } = req.body;
        const userId = req.user.ID_user;

        // Цены и названия соответствуют существующим кейсам в App.jsx
        const cases = {
            1: { name: 'Dark Carnival', price: 149 },
            2: { name: 'Рошан в отпуске', price: 199 },
            3: { name: 'Янтарный дроп', price: 249 },
        };

        const selectedCase = cases[Number(caseId)];

        if (!selectedCase || !itemName || !itemImage) {
            return res.status(400).json({
                success: false,
                message: 'Некорректные данные открытия кейса',
            });
        }

        const result = await sequelize.transaction(async (dbTransaction) => {
            const user = await User.findByPk(userId, {
                transaction: dbTransaction,
            });

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            const balance = Number(user.balance);

            if (balance < selectedCase.price) {
                const error = new Error('Недостаточно средств на балансе');
                error.statusCode = 400;
                throw error;
            }

            user.balance = balance - selectedCase.price;
            await user.save({ transaction: dbTransaction });

            const caseOpening = await CaseHistory.create({
                ID_user: userId,
                case_name: selectedCase.name,
                item_name: itemName,
                item_image: itemImage,
                withdrawal_status: 'available',
            }, { transaction: dbTransaction });

            await Transaction.create({
                ID_user: userId,
                type: 'case_opening',
                amount: selectedCase.price,
                status: 'completed',
                description: `Открытие кейса: ${selectedCase.name}`,
            }, { transaction: dbTransaction });

            return {
                balance: user.balance,
                caseOpening,
            };
        });

        res.json({
            success: true,
            message: 'Кейс успешно открыт',
            data: result,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Ошибка открытия кейса',
        });
    }
};

// POST /api/auth/purchase — покупка игры или ключа
exports.purchase = async (req, res) => {
    try {
        const { title, amount, useBalance } = req.body;
        const userId = req.user.ID_user;
        const price = Number(amount);

        if (!title || !Number.isFinite(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Некорректные данные покупки',
            });
        }

        const result = await sequelize.transaction(async (dbTransaction) => {
            const user = await User.findByPk(userId, {
                transaction: dbTransaction,
            });

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            if (useBalance) {
                if (Number(user.balance) < price) {
                    const error = new Error('Недостаточно средств на балансе');
                    error.statusCode = 400;
                    throw error;
                }

                user.balance = Number(user.balance) - price;
                await user.save({ transaction: dbTransaction });
            }

            const transaction = await Transaction.create({
                ID_user: userId,
                type: 'purchase',
                amount: price,
                status: useBalance ? 'completed' : 'demo',
                description: title,
            }, { transaction: dbTransaction });

            return {
                balance: user.balance,
                transaction,
            };
        });

        res.json({
            success: true,
            message: 'Покупка оформлена',
            data: result,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Ошибка оформления покупки',
        });
    }
};

// POST /api/auth/top-up — демонстрационное пополнение баланса
exports.topUp = async (req, res) => {
    try {
        const { amount, method } = req.body;
        const userId = req.user.ID_user;
        const value = Number(amount);

        if (!Number.isFinite(value) || value <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Укажите корректную сумму пополнения',
            });
        }

        const result = await sequelize.transaction(async (dbTransaction) => {
            const user = await User.findByPk(userId, {
                transaction: dbTransaction,
            });

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            user.balance = Number(user.balance) + value;
            await user.save({ transaction: dbTransaction });

            await Transaction.create({
                ID_user: userId,
                type: 'top_up',
                amount: value,
                status: 'demo',
                description: `Демонстрационное пополнение (${method || 'не указан'})`,
            }, { transaction: dbTransaction });

            return { balance: user.balance };
        });

        res.json({
            success: true,
            message: 'Баланс пополнен',
            data: result,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Ошибка пополнения баланса',
        });
    }
};

// PUT /api/auth/steam-trade-url — сохранить ссылку Steam Trade URL
exports.updateSteamTradeUrl = async (req, res) => {
    try {
        const { steam_trade_url } = req.body;

        if (typeof steam_trade_url !== 'string' || !isValidSteamUrl(steam_trade_url.trim())) {
            return res.status(400).json({
                success: false,
                message: 'Укажите корректную ссылку Steam Trade URL',
            });
        }

        const user = await User.findByPk(req.user.ID_user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Пользователь не найден',
            });
        }

        user.steam_trade_url = steam_trade_url.trim();
        await user.save();

        res.json({
            success: true,
            message: 'Ссылка Steam Trade URL сохранена',
            data: {
                steam_trade_url: user.steam_trade_url,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сохранения ссылки Steam Trade URL',
            error: error.message,
        });
    }
};

// POST /api/auth/trade-request — отправить заявку на вывод предмета
exports.tradeRequest = async (req, res) => {
    try {
        const { historyId, tradeUrl } = req.body;
        const userId = req.user.ID_user;

        if (!historyId || typeof tradeUrl !== 'string' || !isValidSteamUrl(tradeUrl.trim())) {
            return res.status(400).json({
                success: false,
                message: 'Укажите корректную ссылку Steam Trade URL',
            });
        }

        const result = await sequelize.transaction(async (dbTransaction) => {
            const user = await User.findByPk(userId, {
                transaction: dbTransaction,
            });

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            const item = await CaseHistory.findOne({
                where: {
                    ID_history: historyId,
                    ID_user: userId,
                },
                transaction: dbTransaction,
            });

            if (!item) {
                const error = new Error('Предмет не найден в вашей истории');
                error.statusCode = 404;
                throw error;
            }

            if (item.withdrawal_status !== 'available') {
                const error = new Error('Для этого предмета уже отправлена заявка на вывод');
                error.statusCode = 400;
                throw error;
            }

            user.steam_trade_url = tradeUrl.trim();
            await user.save({ transaction: dbTransaction });

            item.withdrawal_status = 'pending';
            await item.save({ transaction: dbTransaction });

            return {
                steamTradeUrl: user.steam_trade_url,
                historyId: item.ID_history,
                item_name: item.item_name,
                withdrawal_status: item.withdrawal_status,
            };
        });

        res.json({
            success: true,
            message: 'Заявка отправлена. Ожидайте приёма трейда от продавца.',
            data: result,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Ошибка отправки заявки на вывод',
        });
    }
};

// POST /api/auth/withdraw — заявка на вывод предмета
exports.withdrawItem = async (req, res) => {
    try {
        const { historyId } = req.body;
        const userId = req.user.ID_user;

        if (!historyId) {
            return res.status(400).json({
                success: false,
                message: 'Не указан предмет для вывода',
            });
        }

        const user = await User.findByPk(userId);

        if (!user || !user.steam_trade_url) {
            return res.status(400).json({
                success: false,
                message: 'Сначала укажите ссылку Steam Trade URL в профиле',
            });
        }

        const item = await CaseHistory.findOne({
            where: {
                ID_history: historyId,
                ID_user: userId,
            },
        });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Предмет не найден в вашей истории',
            });
        }

        if (item.withdrawal_status !== 'available') {
            return res.status(400).json({
                success: false,
                message: 'Для этого предмета уже отправлена заявка на вывод',
            });
        }

        item.withdrawal_status = 'pending';
        await item.save();

        res.json({
            success: true,
            message: 'Заявка отправлена. Ожидайте приёма трейда от продавца.',
            data: {
                historyId: item.ID_history,
                item_name: item.item_name,
                withdrawal_status: item.withdrawal_status,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка отправки заявки на вывод',
            error: error.message,
        });
    }
};
