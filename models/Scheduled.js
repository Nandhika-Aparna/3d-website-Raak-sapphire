const mongoose = require('mongoose');

const ScheduledSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    time: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scheduled', ScheduledSchema);
