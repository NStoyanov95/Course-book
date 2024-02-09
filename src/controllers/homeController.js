const router = require('express').Router();

const courseService = require('../services/courseService');

router.get('/', async (req, res) => {

    const courses = await courseService.getAll().lean();

    res.render('home/home', { courses });
})


module.exports = router;