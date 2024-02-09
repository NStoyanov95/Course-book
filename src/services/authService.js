const User = require('../models/User');
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');

const { SECRET } = require('../util/constants');


exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Username or password don\'t match!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Username or password don\'t match!');
    }

    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
};


