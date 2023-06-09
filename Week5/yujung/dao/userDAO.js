const User = require("../models/user");

exports.containUser = async (param) => {
    const user = await User.findOne({
        email: param.email,
    },);

    if (user) return true;
    return false;
}

exports.matchUser = async (param) => {
    const user = await User.findOne({
        email: param.email,
        password: param.password
    })

    if (user) return true;
    return false;
}

exports.addUser = async (param) => {
    const user = new User({
        name: param.name,
        email: param.email,
        password: param.password,
        phone: param.phone
    });

    await user.save();
}

exports.getUserByEmail = async (param) => {
    return await User.findOne({
        email: param.email
    });
}

exports.deleteUser = async () => {
    await User.deleteMany({});
}

exports.selectUser = async () => {
    return await User.find({});
}
