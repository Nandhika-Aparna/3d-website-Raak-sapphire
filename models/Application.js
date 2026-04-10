const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Robotics Mentor', 'Coding Instructor', 'AI/ML Developer', 'Web Developer', 'Content Creator']
    },
    message: {
        type: String,
        trim: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);
