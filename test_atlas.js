require('dotenv').config();
const mongoose = require('mongoose');
async function test() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("SUCCESS: Connected to Atlas!");
        await mongoose.disconnect();
    } catch (e) {
        console.error("FAILURE: Could not connect to Atlas", e.message);
    }
}
test();
