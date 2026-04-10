const BASE_URL = 'http://localhost:3000/api';

async function testEndpoints() {
    console.log("--- TESTING EXPRESS API ENDPOINTS (FETCH) ---");

    try {
        // 1. Franchise
        console.log("\n[1] Testing Franchise Inquiry...");
        const fragResp = await fetch(`${BASE_URL}/franchise`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "John Franchise",
                email: "john@franchise.com",
                phone: "1234567890",
                location: "New York",
                budget: "5+ Lakhs",
                message: "Interested in the Node 03 tier."
            })
        });
        console.log("Response Status:", fragResp.status);
        console.log("Response Body:", await fragResp.json());

        // 2. Demo
        console.log("\n[2] Testing Demo Booking...");
        const demoResp = await fetch(`${BASE_URL}/demo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Jane Demo",
                company: "Tech Corp",
                email: "jane@tech.com",
                time: "2026-05-01T10:00"
            })
        });
        console.log("Response Status:", demoResp.status);
        console.log("Response Body:", await demoResp.json());

        // 3. Contact
        console.log("\n[3] Testing Contact Message...");
        const contactResp = await fetch(`${BASE_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Alice Contact",
                email: "alice@contact.com",
                subject: "Quick Question",
                message: "How do I sign up for the advanced course?"
            })
        });
        console.log("Response Status:", contactResp.status);
        console.log("Response Body:", await contactResp.json());

        console.log("\n--- ALL TESTS COMPLETED ---");
        console.log("Please check your MongoDB Atlas 'RosbotzDB' database now!");

    } catch (error) {
        console.error("Test Failed:", error.message);
    }
}

testEndpoints();
