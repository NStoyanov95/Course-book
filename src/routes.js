const router = require('express').Router()

const homeController = require('./controllers/homeController');
const courseController= require('./controllers/courseController');
const authController = require('./controllers/authController');

router.use(homeController);
router.use('/courses', courseController);
router.use('/auth', authController);

module.exports = router;