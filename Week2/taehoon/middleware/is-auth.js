const jwt = require('jsonwebtoken');
//토큰 존재유무(요청에 토큰이 부착되지 않아있으면 접근차단)

module.exports = (req, res, next) => {
    //console.log(req.headers);
    const authHeader = req.headers.authorization.split(' ')[0];
    let decodedToken;
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    next();
};