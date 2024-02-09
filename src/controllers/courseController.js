const router = require('express').Router();

const courseService = require('../services/courseService');

const { isAuth } = require('../middlewares/authMiddleware');

const helpers = require('../util/helpers');
const errorMessage = require('../util/errorMessage');

router.get('/create', isAuth, (req, res) => {
    res.render('course/create')
});

router.post('/create', async (req, res) => {
    const courseData = req.body;
    courseData.owner = req.user
    try {
        await courseService.create(courseData);
        res.redirect('/');
    } catch (error) {
        const message = errorMessage.getErrorMessage(error);
        res.render('course/create', { error: message, ...courseData })
    }
});

router.get('/catalog', async (req, res) => {
    const courses = await courseService.getAll().lean();

    res.render('course/catalog', { courses });
});

router.get('/:id/details', async (req, res) => {

    const course = await courseService.getOne(req.params.id).lean().populate('owner').populate('signUpList');
    const isOwner = req.user?._id == course.owner._id;
    const owner = course.owner.email;
    const isSigned = course.signUpList.length > 0;
    const signUpListUsers = helpers.listUsers(course);
    const isMatch = helpers.isMatch(course, req.user?._id)
    res.render('course/details', { course, isOwner, owner, isSigned, signUpListUsers, isMatch });
});

router.get('/:id/edit', isAuth, async (req, res) => {
    const course = await courseService.getOne(req.params.id).lean();

    res.render('course/edit', { course });
});

router.post('/:id/edit', async (req, res) => {
    const courseData = req.body;

    await courseService.edit(req.params.id, courseData);

    res.redirect(`/courses/${req.params.id}/details`);
});

router.get('/:id/delete', async (req, res) => {
    await courseService.delete(req.params.id);

    res.redirect('/courses/catalog');
});

router.get('/:id/signUp', async (req, res) => {
    await courseService.signUp(req.params.id, req.user._id);

    res.redirect(`/courses/${req.params.id}/details`)
});

router.get('/:id/profile', async (req, res) => {
    const user = req.user;
    const ownedCourses = await courseService.getOwnedCourses(user._id).lean();
    const ownedCount = ownedCourses.length;
    const signedUpCourses = await courseService.getSignedUpCourses(user._id).lean();
    const signedUpCount = signedUpCourses.length;

    res.render('user/profile', { user, ownedCourses, ownedCount, signedUpCourses, signedUpCount });
});




module.exports = router;