const Course = require('../models/Course');

const helpers = require('../util/helpers');

exports.getOne = (courseId) => Course.findById(courseId);

exports.getAll = () => Course.find();

exports.create = (courseData) => Course.create(courseData);

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.edit = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData);

exports.signUp = async (courseId, userId) => {
    const course = await this.getOne(courseId);
    const isMatch = helpers.isMatch(course, userId);
    if (!isMatch) {
        return await Course.findByIdAndUpdate(courseId, { $push: { signUpList: userId } });
    }
}

exports.getOwnedCourses = (userId) =>  Course.find({ owner: userId }).lean();


exports.getSignedUpCourses = (userId) => Course.find({ signUpList: userId });
