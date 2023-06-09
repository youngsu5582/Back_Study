module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/v1/auth');
    }
    next();
}