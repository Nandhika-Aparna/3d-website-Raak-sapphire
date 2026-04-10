const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    phone: { type: String, required: false },
    timestamp: { type: Date, default: Date.now }
}, { collection: 'contact_submissions' }); // Saved to contacts folder

module.exports = mongoose.model('Contact', ContactSchema);
