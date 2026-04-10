// check_db.js
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  // Try primary MongoDB Atlas connection
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to primary MongoDB Atlas');
  } catch (err) {
    console.warn('Primary MongoDB connection failed, attempting local fallback:', err.message);
    const localUri = 'mongodb://127.0.0.1:27017/rosbotz_test';
    try {
      await mongoose.connect(localUri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to local MongoDB fallback');
    } catch (fallbackErr) {
      console.error('Local MongoDB fallback failed:', fallbackErr);
      process.exit(1);
    }
  }

  const Contact = mongoose.model('Contact', new mongoose.Schema({ name: String, email: String, subject: String, phone: String, message: String, timestamp: Date }), 'contacts');
  const Demo = mongoose.model('Demo', new mongoose.Schema({ formType: String, parentName: String, childName: String, email: String, phone: String, course: String, time: String, timestamp: Date }), 'demos');

  const contacts = await Contact.find({});
  const demos = await Demo.find({});
  console.log('Contacts count:', contacts.length);
  console.log('Demos count:', demos.length);
  console.log('Recent contacts:', contacts.slice(-3).map(c => ({ name: c.name, phone: c.phone })));
  console.log('Recent demos:', demos.slice(-3).map(d => ({ parentName: d.parentName, course: d.course })));

  await mongoose.disconnect();
})();
