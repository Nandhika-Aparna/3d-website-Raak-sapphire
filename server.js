const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Import Models
const Franchise = require('./models/Franchise');
const Demo = require('./models/Demo');
const Contact = require('./models/Contact');
const Scheduled = require('./models/Scheduled');
const Application = require('./models/Application');

// File Upload Configuration (Multer Local)
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
if (process.env.CLOUDINARY_URL) {
    // When using CLOUDINARY_URL, we config() empty to load it, 
    // then we can apply global settings like 'secure'
    cloudinary.config(); 
    cloudinary.config({ secure: true }); 
} else if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
}

const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ==========================================
// MongoDB Connection
// ==========================================
const connectDB = async () => {
    try {
        console.log('📡 Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connection successfully established.');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        if (err.name === 'MongooseServerSelectionError') {
            console.warn('💡 Tip: Ensure your IP is whitelisted in MongoDB Atlas Network Access.');
        }
        console.log('⚠️ Local File Fallback activated (Data will be stored in submissions_backup.json).');
    }
};

connectDB();

// Middleware to check DB status
app.use('/api', (req, res, next) => {
    req.dbConnected = mongoose.connection.readyState === 1;
    next();
});

// ==========================================
// Helpers
// ==========================================
const saveLocally = (type, data) => {
    try {
        const filePath = path.join(__dirname, 'submissions_backup.json');
        let records = [];
        if (fs.existsSync(filePath)) {
            records = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        records.push({
            submission_type: type,
            ...data,
            captured_at: new Date(),
            stored_locally: true
        });
        fs.writeFileSync(filePath, JSON.stringify(records, null, 2));
        console.log(`[BACKUP] ${type} submission saved to local JSON.`);
    } catch (e) {
        console.error("Critical: Local storage fallback failed:", e);
    }
};

// ==========================================
// API Routes
// ==========================================

// 0. Health Check (for frontend connectivity)
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        database: req.dbConnected ? 'online' : 'offline',
        timestamp: new Date()
    });
});

// 1. Franchise Inquiry
app.post('/api/franchise', async (req, res) => {
    const { name, email, phone, location, budget, message } = req.body;

    if (!name || !email || !phone || !location || !budget) {
        return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    try {
        if (req.dbConnected) {
            const entry = new Franchise(req.body);
            await entry.save();
            console.log(`[DATABASE] Saved Franchise Inquiry from ${name}`);
            return res.status(201).json({ success: true, message: 'Form submitted successfully.' });
        }
        throw new Error('Database Offline');
    } catch (error) {
        saveLocally('franchise', req.body);
        return res.status(201).json({
            success: true,
            message: 'Inquiry saved successfully.',
            storage: 'local'
        });
    }
});

// 2. Free Demo Booking
app.post('/api/demo', async (req, res) => {
    const { name, email, time } = req.body;

    if (!name || !email || !time) {
        return res.status(400).json({ success: false, message: 'Name, Email, and Time are required.' });
    }

    try {
        if (req.dbConnected) {
            const entry = new Demo(req.body);
            await entry.save();
            console.log(`[DATABASE] Saved Demo Booking from ${name}`);
            return res.status(201).json({ success: true, message: 'Booking submitted successfully.' });
        }
        throw new Error('Database Offline');
    } catch (error) {
        saveLocally('demo', req.body);
        return res.status(201).json({
            success: true,
            message: 'Booking confirmed.',
            storage: 'local'
        });
    }
});

// 3. Contact Us
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All contact fields are required.' });
    }

    try {
        if (req.dbConnected) {
            const entry = new Contact(req.body);
            await entry.save();
            console.log(`[DATABASE] Saved Contact from ${name}`);
            return res.status(201).json({ success: true, message: 'Message submitted successfully.' });
        }
        throw new Error('Database Offline');
    } catch (error) {
        saveLocally('contact', req.body);
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully.',
            storage: 'local'
        });
    }
});

// 4. Meeting Scheduler (WhatsApp Simulation)
app.post('/api/schedule', async (req, res) => {
    try {
        const meetId = Math.random().toString(36).substring(7);
        const meetLink = `https://meet.google.com/ros-${meetId}`;

        if (req.dbConnected) {
            const entry = new Scheduled(req.body);
            await entry.save();
        } else {
            saveLocally('schedule', req.body);
        }

        // Simulated API Log
        console.log(`[DISPATCH] WhatsApp to ${req.body.phone}: Hello ${req.body.name}! Meeting at ${req.body.time}. Link: ${meetLink}`);

        res.status(201).json({ success: true, link: meetLink, message: 'Class scheduled successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Scheduling failed: ' + error.message });
    }
});

// 5. Freelancer & Part-Time Application
app.post('/api/apply', async (req, res) => {
    try {
        const { name, email, phone, role, message } = req.body;

        if (!name || !email || !phone || !role) {
            return res.status(400).json({ success: false, message: 'Required fields missing.' });
        }

        const applicationData = {
            name,
            email,
            phone,
            role,
            message,
            resumeUrl: 'SENT_VIA_EMAIL'
        };

        if (req.dbConnected) {
            console.log(`[MONGODB] Attempting to save application from ${name}...`);
            const entry = new Application(applicationData);
            await entry.save();
            console.log(`[MONGODB] ✅ Saved Application to Atlas: ${name}`);

            return res.status(201).json({ 
                success: true, 
                message: 'Application submitted! Please remember to email your resume to raakcareers@gmail.com.'
            });
        } else {
            console.warn(`[BACKUP] DB Offline. Saving application to local fallback.`);
            saveLocally('application', applicationData);
            
            return res.status(201).json({
                success: true,
                message: 'Application received. (Stored locally). Please email your resume to raakcareers@gmail.com.',
                storage: 'local'
            });
        }
    } catch (error) {
        console.error('[SERVER ERROR] Application Submission failed:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Submission failed: ' + error.message 
        });
    }
});

// Health Check Protocol
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ACTIVE',
        database: req.dbConnected ? 'CONNECTED' : 'OFFLINE',
        timestamp: new Date().toISOString()
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n======================================`);
    console.log(`🚀 ROSBOTZ Backend: ACTIVE`);
    console.log(`🔗 Local Address: http://localhost:${PORT}`);
    console.log(`======================================\n`);
});
