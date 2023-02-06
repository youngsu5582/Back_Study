const User = require('../Scemas/users');

getRandomUser = async function getRandomUser() {
    const count = await User.countDocuments();
    const random = Math.floor(Math.random() * count);
    return User.findOne().skip(random)
}

module.exports = getRandomUser;