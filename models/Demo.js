const mongoose = require('mongoose');

const DemoSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    company: { type: String, required: false, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: false },
    time: { type: String, required: true },
    course: { type: String, required: false },
    formType: { type: String, default: 'Free Demo' },
    timestamp: { type: Date, default: Date.now }
}, { collection: 'demo_submissions' }); // Saved to demos folder

module.exports = mongoose.model('Demo', DemoSchema);
