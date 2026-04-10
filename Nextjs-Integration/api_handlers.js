import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/mongodb';
import { Franchise, Demo, Contact } from '../../models/Forms';

/**
 * 1. FRANCHISE FORM HANDLER
 */
export async function POST_FRANCHISE(request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        // Validation
        const { name, email, phone, location, budget, message } = body;
        if (!name || !email || !phone || !location || !budget || !message) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const newEntry = new Franchise(body);
        await newEntry.save();

        return NextResponse.json({ success: true, message: "Message successfully submitted" }, { status: 201 });
    } catch (error) {
        console.error("Franchise Submit Error:", error);
        return NextResponse.json({ success: false, message: "Server error, please try again later." }, { status: 500 });
    }
}

/**
 * 2. FREE DEMO FORM HANDLER
 */
export async function POST_DEMO(request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        // Validation
        const { name, company, email, time } = body;
        if (!name || !company || !email || !time) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const newEntry = new Demo(body);
        await newEntry.save();

        return NextResponse.json({ success: true, message: "Message successfully submitted" }, { status: 201 });
    } catch (error) {
        console.error("Demo Submit Error:", error);
        return NextResponse.json({ success: false, message: "Server error, please try again later." }, { status: 500 });
    }
}

/**
 * 3. CONTACT US FORM HANDLER
 */
export async function POST_CONTACT(request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        // Validation
        const { name, email, subject, message } = body;
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const newEntry = new Contact(body);
        await newEntry.save();

        return NextResponse.json({ success: true, message: "Message successfully submitted" }, { status: 201 });
    } catch (error) {
        console.error("Contact Submit Error:", error);
        return NextResponse.json({ success: false, message: "Server error, please try again later." }, { status: 500 });
    }
}
