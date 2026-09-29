const sequelize = require('../config/database');

const User = require('./User');
const Game = require('./Game');
const GameKey = require('./GameKey');
const Purchase = require('./Purchase');
const Box = require('./Box');
const BoxItem = require('./BoxItem');
const BoxOpening = require('./BoxOpening');
const News = require('./News');
const Transaction = require('./Transaction');
const Favorite = require('./Favorite');
const Review = require('./Review');

// пользователь 
User.hasMany(Purchase, { foreignKey: 'ID_user' });
User.hasMany(BoxOpening, { foreignKey: 'ID_user' });
User.hasMany(Transaction, { foreignKey: 'ID_user' });
User.hasMany(Favorite, { foreignKey: 'ID_user' });
User.hasMany(Review, { foreignKey: 'ID_user' });
User.hasMany(News, { foreignKey: 'ID_user', as: 'news' });

// игры 
Game.hasMany(GameKey, { foreignKey: 'ID_game' });
Game.hasMany(Purchase, { foreignKey: 'ID_game' });
Game.hasMany(BoxItem, { foreignKey: 'ID_game' });
Game.hasMany(BoxOpening, { foreignKey: 'ID_game' });
Game.hasMany(Favorite, { foreignKey: 'ID_game' });
Game.hasMany(Review, { foreignKey: 'ID_game' });

// ключи 
GameKey.belongsTo(Game, { foreignKey: 'ID_game' });
GameKey.hasOne(Purchase, { foreignKey: 'ID_key' });
GameKey.hasOne(BoxOpening, { foreignKey: 'ID_key' });

// покупки 
Purchase.belongsTo(User, { foreignKey: 'ID_user' });
Purchase.belongsTo(Game, { foreignKey: 'ID_game' });
Purchase.belongsTo(GameKey, { foreignKey: 'ID_key' });

// боксы 
Box.hasMany(BoxItem, { foreignKey: 'ID_box' });
Box.hasMany(BoxOpening, { foreignKey: 'ID_box' });

BoxItem.belongsTo(Box, { foreignKey: 'ID_box' });
BoxItem.belongsTo(Game, { foreignKey: 'ID_game' });

BoxOpening.belongsTo(User, { foreignKey: 'ID_user' });
BoxOpening.belongsTo(Box, { foreignKey: 'ID_box' });
BoxOpening.belongsTo(Game, { foreignKey: 'ID_game' });
BoxOpening.belongsTo(GameKey, { foreignKey: 'ID_key' });

// новости 
News.belongsTo(User, { foreignKey: 'ID_user', as: 'author' });

// транзакции 
Transaction.belongsTo(User, { foreignKey: 'ID_user' });

// избранное
Favorite.belongsTo(User, { foreignKey: 'ID_user' });
Favorite.belongsTo(Game, { foreignKey: 'ID_game' });

//отзывы 
Review.belongsTo(User, { foreignKey: 'ID_user' });
Review.belongsTo(Game, { foreignKey: 'ID_game' });

module.exports = {
    sequelize,
    User, Game, GameKey, Purchase, Box, BoxItem,
    BoxOpening, News, Transaction, Favorite, Review,
};