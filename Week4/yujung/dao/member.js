const Member = require('../models/member');
const { sequelize } = require('../models');

async function addMember(email, password) {
    await Member.create({
        email: email,
        password: password,
    });
};

async function findRandomMember() {
    return await Member.findOne({
        order: sequelize.random()
    });
};

module.exports = {
    addMember,
    findRandomMember,
}