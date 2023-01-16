const fs = require('fs');

exports.auth = (req, res) => {
    // 세션이 사용자 정보가 존재하지 않으면 카카오 로그인
    if (req.session.email === undefined) {
        fs.readFile('views/login.html', 'utf8', (err, buf) => {
            res.end(buf);
        })
        return;
    }

    // 세션에 사용자 정보가 존재하면 사용자 정보 출력
    res.render('home', { "email": req.session.email });
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        req.session;
    });
    res.redirect('/v1/auth');
}