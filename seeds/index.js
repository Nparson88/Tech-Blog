const userSeed = require('./user-seeds');
const postSeed = require('./post-seeds');
const commentSeed = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedData = async() => {
    await sequelize.sync({ force: true });
    await userSeed();
    await postSeed();
    await commentSeed();
    process.exit(0);
};

seedData();