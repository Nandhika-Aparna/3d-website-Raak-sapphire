require('dotenv').config();
const mongoose = require('mongoose');

// Define a temporary schema for the test
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

async function runTest() {
    console.log("--- STARTING LIVE INSERTION TEST ---");
    console.log("URI:", process.env.MONGODB_URI);
    
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected successfully.");

        const testContact = new Contact({
            name: "Test User",
            email: "test@example.com",
            subject: "Atlas Verification",
            message: "If you see this, the data is flowing correctly!"
        });

        const saved = await testContact.save();
        console.log("✅ Document saved successfully!");
        console.log("ID:", saved._id);
        console.log("Database Name:", mongoose.connection.name);
        console.log("Collection Name:", Contact.collection.name);

        await mongoose.disconnect();
        console.log("--- TEST COMPLETE ---");
    } catch (error) {
        console.error("❌ Test Failed:", error);
    }
}

runTest();
