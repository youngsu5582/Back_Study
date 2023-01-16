const axios = require('axios');
require('dotenv').config();
var token;

exports.kakaoLogin = (req, res) => {
    const src = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;
    res.redirect(src);
}

exports.kakaoCallback = async (req, res) => {
    // 인가 코드
    const code = req.query.code;

    // 토큰
    var url = "https://kauth.kakao.com/oauth/token";
    var body = {
        "grant_type": "authorization_code",
        "client_id": process.env.KAKAO_REST_API_KEY,
        "redirect_uri": process.env.KAKAO_REDIRECT_URI,
        "code": code
    };
    var header = {
        'Content-type': 'application/x-www-form-urlencoded',
    };

    var result = await axios.post(url, {}, { params: body, headers: header });
    var { data } = result;
    token = data.access_token;
    res.redirect("/v1/auth/kakao/member");
}

exports.kakaoMember = async (req, res) => {
    url = "https://kapi.kakao.com/v2/user/me";
    header = {
        "Authorization": `Bearer ${token}`
    }

    result = await axios.get(url, { headers: header });
    data = result;
    const email = data.data.kakao_account.email;

    // 세션에 사용자 정보 저장
    req.session.email = email;
    res.redirect("/v1/auth");
}