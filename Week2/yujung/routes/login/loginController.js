const jwt = require('jsonwebtoken');
const User = require('../../models/user')

const isUser = async (email) => {
    const users = await User.findAll({
        attributes: ['email'],
        where: {
            email: email,
        }
    })

    if (Object.keys(users).length === 0) {
        return false;
    }
    return true;
}

const match = async (email, password) => {
    const users = await User.findAll({
        attributes: ['email', 'password'],
        where: {
            email: email,
            password: password,
        }
    })

    if (Object.keys(users).length === 0) {
        return false;
    }
    return true;
}

exports.register = async (req, res) => {
    if (await isUser(req.body.email) === true) {
        res.send("Already Registered!");
        return;
    }

    User.create({
        email: req.body.email,
        password: req.body.password,
    });
    res.send("Register Complete!");
}

exports.jwtLogin = async (req, res) => {
    if (await match(req.body.email, req.body.password) === false) {
        res.send("Mismatch!");
        return;
    }

    const token = jwt.sign({
        type: 'JWT', email: req.body.email
    }, process.env.SECRET_KEY, {
        expiresIn: '10m',
    })
    res.header('authorization', token);
    res.send('Login Complete!');
}

exports.jwtVerify = (req, res) => {
    const token = req.headers.authorization;
    if (token === undefined) {
        res.send("Token Not Exists in Header");
        return;
    }
    const check = jwt.verify(token, process.env.SECRET_KEY);
    res.send(check.email);
}

exports.sessionLogin = async (req, res) => {
    if (await match(req.body.email, req.body.password) === false) {
        res.send("Mismatch!");
        return;
    }

    req.session.email = req.body.email;
    res.send('Login Complete!');

}

exports.sessionVerify = (req, res) => {
    if(req.session) {
        res.send(req.session.email);
        return;
    }

    res.send("Token Not Exists in Header");
}