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