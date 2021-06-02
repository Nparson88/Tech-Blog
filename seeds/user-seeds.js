const { User } = require('../models');

const userData = [
    {
        username: "MarkLarrs",
        email: "marklarrs@gmail.com",
        password: "password567"
    },
    {
        username: "Zyndi",
        email: "johndoe@yahoo.com",
        password: "pass1word2"
    },
    {
        username: "Slixx",
        email: "slixtastic@aol.com",
        password: "password3333"
    },
    {
        username: "Jemii",
        email: "jemii@gmail.com",
        password: "password444"
    },
    {
        username: "Parzo",
        email: "parzo@gmail.com",
        password: "password5555"
    },
    {
        username: "Jimjam",
        email: "JimJames@gmail.com",
        password: "password6666"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;