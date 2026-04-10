require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('--- MONGODB DIAGNOSTIC START ---');
console.log('URI provided in .env:', uri ? 'Exists' : 'MISSING');
if (!uri) process.exit(1);

console.log('Attempting connection to Atlas...');

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000 // 5 seconds timeout
})
.then(() => {
    console.log('✅ SUCCESS! Your connection string is working perfectly.');
    process.exit(0);
})
.catch(err => {
    console.error('❌ CONNECTION FAILED');
    console.error('Error Name:', err.name);
    console.error('Error Code:', err.code);
    console.error('Full Error Message:', err.message);
    if (err.reason) {
        console.error('Reason Detail:', JSON.stringify(err.reason, null, 2));
    }
    console.log('\n--- TROUBLESHOOTING TIPS ---');
    if (err.message.includes('IP not whitelisted')) {
        console.log('👉 ACTION: You must add your current IP to MongoDB Atlas Network Access.');
    } else if (err.message.includes('Authentication failed')) {
        console.log('👉 ACTION: Your username or password in .env might be incorrect.');
    } else if (err.name === 'MongooseServerSelectionError') {
        console.log('👉 ACTION: This usually means the server cannot be reached. Check if your firewall blocks Port 27017.');
    }
    process.exit(1);
});
