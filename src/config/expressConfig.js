const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const authMiddleware = require('../middlewares/authMiddleware')
function expressConfigurator(app) {

    app.use(express.static(path.resolve(__dirname, '..', 'static')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(authMiddleware.auth);
}

module.exports = expressConfigurator;