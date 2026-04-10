const mongoose = require('mongoose');

const FranchiseSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true },
    tier: { type: String, required: false },
    timestamp: { type: Date, default: Date.now }
}, { collection: 'franchise_submissions' }); // Saved to franchises folder

module.exports = mongoose.model('Franchise', FranchiseSchema);
