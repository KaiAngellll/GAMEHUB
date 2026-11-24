
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Регистрация и авторизация
router.post('/register', authController.register);
router.post('/login', authController.login);

// Получение данных пользователя
router.get('/me', authMiddleware, authController.getMe);
router.get('/account', authMiddleware, authController.getAccount);

// Обновление профиля
router.put('/profile', authMiddleware, authController.updateProfile);

// История открытых кейсов
router.get('/case-history', authMiddleware, authController.getCaseHistory);

// Открытие кейса
router.post('/case-openings', authMiddleware, authController.openCase);

// Покупка игры или ключа
router.post('/purchase', authMiddleware, authController.purchase);

// Пополнение баланса
router.post('/top-up', authMiddleware, authController.topUp);

// Сохранение Steam Trade URL
router.put('/steam-trade-url', authMiddleware, authController.updateSteamTradeUrl);

// Отправка заявки на вывод предмета
router.post('/trade-request', authMiddleware, authController.tradeRequest);
router.post('/withdraw', authMiddleware, authController.withdrawItem);

module.exports = router;
