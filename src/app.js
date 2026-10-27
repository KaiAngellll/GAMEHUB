
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');
const boxRoutes = require('./routes/boxRoutes');
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Запрещаем поисковым системам индексировать API
app.use('/api', (req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    next();
});

// robots.txt для API-сервера
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(
        'User-agent: *\n' +
        'Disallow: /\n'
    );
});

app.get('/', (req, res) => {
    res.json({
        message: 'GAMEHUB API работает!',
        version: '1.0.0',
        status: 'OK',
    });
});

app.use('/api/games', gameRoutes);
app.use('/api/boxes', boxRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
