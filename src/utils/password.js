const bcrypt = require('bcryptjs');

// Хеширование пароля
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Сравнение пароля с хешем
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };