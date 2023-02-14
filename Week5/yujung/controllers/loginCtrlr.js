const uesrDAO = require('../dao/userDAO');
const session = require('../util/session');

exports.login = async (req, res) => {
    // 로그인 페이지 출력
    if (req.method == 'GET') {
        if(session.isVaildSession(req.session)) {  // 세션이 유효한 경우
            res.redirect('/v1/toss');
            return;
        }
        res.render('login');
    }

    // 로그인
    if (req.method == 'POST') {
        if (await uesrDAO.matchUser(req.body)) {
            const user = await uesrDAO.getUserByEmail({ email: req.body.email });
            req.session._id = user._id;
            req.session.name = user.name;
            req.session.email = user.email;
            req.session.phone = user.phone;
            res.redirect('/v1/toss');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
            res.write("<script>alert('회원이 아닙니다.')</script>");
            res.write("<script>window.location=\"/v1/login\"</script>");
        }
    }
}

exports.signup = async (req, res) => {
    // 회원가입 페이지 출력
    if (req.method == 'GET') {
        res.render('signup');
    }

    // 회원가입
    if (req.method == 'POST') {
        if (await uesrDAO.containUser(req.body)) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
            res.write("<script>alert('중복된 아이디입니다.')</script>");
            res.write("<script>window.location=\"/v1/signup\"</script>");
        } else {
            uesrDAO.addUser(req.body);
            res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
            res.write("<script>alert('가입되었습니다.')</script>");
            res.write("<script>window.location=\"/v1/login\"</script>");
        }
    }
}

// 로그아웃
exports.logout = (req, res) => {
    req.session.destroy(() => { req.session; });
    res.redirect('/v1/login');
}