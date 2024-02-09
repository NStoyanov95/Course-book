const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add title.'],
        minLength: [5, 'Title should be at least 5 characters long.'],
    },
    type: {
        type: String,
        minLength: [3, 'Type should be at least 3 characters long.'],
    },
    certificate: {
        type: String,
        minLength: [2, 'Certificate should be at least 2 characters long.'],
    },
    image: {
        type: String,
        match: [/^https?:\/\/\w+/mg, 'Please enter valid URL']
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters long.'],
    },
    price: {
        type: Number,
        min: [1, 'Price must be positive number.'],
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});
                 
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;