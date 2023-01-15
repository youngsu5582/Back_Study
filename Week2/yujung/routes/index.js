const router = require('express').Router();
const loginController = require('./login/loginController.js');
const socialLoginController = require('./socialLogin/socialLoginController.js');
const kakaoLoginController = require('./socialLogin/kakaoLoginController.js');
const naverLoginController = require('./socialLogin/naverLoginContoller.js');


router.post('/v1/register', loginController.register);

// JWT
router.post('/v1/jwtLogin', loginController.jwtLogin);
router.post('/v1/jwtVerify', loginController.jwtVerify);

// session
router.post('/v1/sessionLogin', loginController.sessionLogin);
router.post('/v1/sessionVerify', loginController.sessionVerify);

// 소셜 로그인
router.get('/v1/auth', socialLoginController.auth);
router.get('/v1/logout', socialLoginController.logout);
// 카카오
router.get('/v1/auth/kakao/login', kakaoLoginController.kakaoLogin);
router.get('/v1/auth/kakao/callback', kakaoLoginController.kakaoCallback);
router.get('/v1/auth/kakao/member', kakaoLoginController.kakaoMember);
// 네이버
router.get('/v1/auth/naver/login', naverLoginController.naverLogin);
router.get('/v1/auth/naver/callback', naverLoginController.naverCallback);
router.get('/v1/auth/naver/member', naverLoginController.naverMember);

module.exports = router;