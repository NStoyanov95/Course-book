const router = require('express').Router();

const authService = require('../services/authService');

const errorMessage = require('../util/errorMessage');

router.get('/register', (req, res) => {
    res.render('user/register')
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        await authService.register(userData);
        res.redirect('/');
    } catch (error) {
        const message = errorMessage.getErrorMessage(error);
        res.render('user/register', { error: message });
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie('auth', token);

    res.redirect('/');
});

router.get('/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;
