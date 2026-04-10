import mongoose from 'mongoose';

/**
 * 1. FRANCHISE FORMS FOLDER
 * Collection: "franchise_submissions"
 */
const FranchiseSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    phone: { type: String, required: [true, 'Phone number is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    budget: { type: String, required: [true, 'Investment budget is required'] },
    message: { type: String, required: [true, 'Message is required'] },
    timestamp: { type: Date, default: Date.now }
}, { collection: 'franchise_submissions' }); // Explicit collection name

/**
 * 2. FREE DEMO FORMS FOLDER
 * Collection: "demo_submissions"
 */
const DemoSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    company: { type: String, required: [true, 'Company/institute is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    time: { type: String, required: [true, 'Preferred Date/Time is required'] },
    timestamp: { type: Date, default: Date.now }
}, { collection: 'demo_submissions' }); // Explicit collection name

/**
 * 3. CONTACT US FORMS FOLDER
 * Collection: "contact_submissions"
 */
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    subject: { type: String, required: [true, 'Subject is required'], trim: true },
    message: { type: String, required: [true, 'Message is required'] },
    timestamp: { type: Date, default: Date.now }
}, { collection: 'contact_submissions' }); // Explicit collection name

// Secure model export
export const Franchise = mongoose.models.Franchise || mongoose.model('Franchise', FranchiseSchema);
export const Demo = mongoose.models.Demo || mongoose.model('Demo', DemoSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
