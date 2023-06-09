require('dotenv').config();
exports.loginCheck = (req, res, next) => {
    if (!req.session.email) {
        res.render('login');
    }
    else {
        res.status(200).json(`${req.session.name}에 ${req.session.email}로 로그인됨. 주소에 /logout 추가작성시 로그아웃`);
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        req.session;
    })
    res.redirect('/v1/auth');
}