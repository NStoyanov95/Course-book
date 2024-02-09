const jwt = require('../lib/jwt');

const { SECRET } = require('../util/constants');

exports.auth = async function (req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
       return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAuth = true;
        next();

    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

exports.isAuth = (req, res, next) => {
    if(!req.user){
       return res.redirect('/auth/login');
    }

    return next();
}
