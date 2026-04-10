// Initialize Icons
lucide.createIcons();

/* ========================================================
   GLOBAL VARIABLES & DATA
======================================================== */
const splash     = document.getElementById('splash');
const splashLogo = document.getElementById('splash-logo');
const heroWrap   = document.getElementById('hero-wrap');
let splashEnded = false;

function endSplash() {
    if (splashEnded) return;
    splashEnded = true;
    if (splash) splash.classList.add('fade-out');
    if (heroWrap) heroWrap.classList.add('visible');
    
    // Trigger Hero Reveal Animation
    startHeroReveal();
    
    // Hide splash fully after transition
    setTimeout(() => { if (splash) splash.style.display = 'none'; }, 1200);
}

function startHeroReveal() {
    const laserTop   = document.getElementById('laser-top');
    const laserRight = document.getElementById('laser-right');
    const laserBot   = document.getElementById('laser-bottom');
    const laserLeft  = document.getElementById('laser-left');
    const sparkTR    = document.getElementById('spark-tr');
    const sparkBL    = document.getElementById('spark-bl');
    const scanLine   = document.getElementById('scan-line');

    // Stage 1 — lasers
    setTimeout(() => { if (laserTop) laserTop.classList.add('on--top');        }, 600);
    setTimeout(() => { if (laserRight) { laserRight.classList.add('on--right'); if (sparkTR) sparkTR.classList.add('visible'); } }, 1100);
    setTimeout(() => { if (laserBot) laserBot.classList.add('on--bottom');     }, 1600);
    setTimeout(() => { if (laserLeft) { laserLeft.classList.add('on--left');  if (sparkBL) sparkBL.classList.add('visible'); } }, 2100);

    // Stage 2 — scan & cleanup
    setTimeout(() => {
        if (scanLine) scanLine.classList.add('active');
        
        // Final polish: Fade lasers
        setTimeout(() => {
            [laserTop, laserRight, laserBot, laserLeft].forEach(l => { if (l) l.classList.add('fade'); });
            if (sparkTR) sparkTR.classList.remove('visible');
            if (sparkBL) sparkBL.classList.remove('visible');
            if (scanLine) scanLine.classList.remove('active');
        }, 2000);
    }, 2800);
}

// Splash Lifecycle Orchestration
if (splash) {
    const splashVideo = document.getElementById('splash-video');
    
    // 1. Reveal Splash Logo
    setTimeout(() => { if (splashLogo) splashLogo.classList.add('visible'); }, 1200);

    // 2. End Splash when video finishes
    if (splashVideo) {
        splashVideo.onended = () => endSplash();
        
        // Safety Heartbeat: If video is blocked or fails, end after 12s
        setTimeout(() => endSplash(), 12000);
    } else {
        // Fallback if video element doesn't exist
        setTimeout(() => endSplash(), 5000);
    }
}

let heroAnimationInitialized = false;
let scrollTl = null;

const courseData = {
    builder: {
        id: 'builder', title: "RS Robotech Builder", color: "blue", age: "Age 8-10",
        levels: [
            {
                id: 1, name: "Foundation (24 Sessions)",
                desc: "Basics of robotics and electronics. Understanding sensors and motors.",
                longDesc: "The Foundation level introduces students to robotics, electronics, and logic mapping using blocks. Learners begin with core concepts like electricity, circuits, and mechanical parts.",
                curriculum: [
                    "Introduction to Electricity & Basic Circuits",
                    "Electronic Components & Breadboarding",
                    "Gears, Motors & Mechanical Systems",
                    "Sensors & Actuators (IR, Ultrasonic, etc.)",
                    "Introduction to Block-Based Coding",
                    "Basic AI Concepts & Logic Building"
                ]
            },
            {
                id: 2, name: "Development (24 Sessions)",
                desc: "Advanced robotics components and circuits using AI logic block mapping.",
                longDesc: "Builds upon foundational knowledge to introduce intelligent logic design. Students explore sensor integrations and decision-making flowcharts.",
                curriculum: [
                    "Advanced Electronic Components & Circuit Design",
                    "Microcontrollers & Pin Configuration Basics",
                    "Sensor Integration & Data Processing",
                    "Motor Drivers & Motion Control Systems",
                    "AI Logic Building using Block-Based Coding",
                    "Decision Making & Conditional Programming"
                ]
            }
        ]
    },
    advanced: {
        id: 'advanced', title: "RS Robotech Advanced", color: "purple", age: "Age 11-15",
        levels: [
            {
                id: 1, name: "Intermediate (24 Sessions)",
                desc: "Introduction to embedded systems and programming fundamentals using C/C++.",
                longDesc: "Introduces core concepts of embedded systems and text-based C++ programming. Learners gain hands-on experience controlling hardware at low levels.",
                curriculum: [
                    "Introduction to Embedded Systems",
                    "Basics of C/C++ Programming",
                    "Microcontroller Architecture (Arduino/ESP)",
                    "Digital & Analog I/O Operations",
                    "Sensor Interfacing Techniques",
                    "Actuators & Motor Control"
                ]
            },
            {
                id: 2, name: "Advanced (24 sessions)",
                desc: "Proficiency in C/C++ programming for complex hardware integrations.",
                longDesc: "Deepen expertise in efficient system design, real-time control, and advanced sensor interactions developing robust robotics solutions.",
                curriculum: [
                    "Advanced Embedded System Design",
                    "Structured Programming in C/C++",
                    "Microcontroller Optimization Techniques",
                    "Advanced Sensor Integration & Calibration",
                    "Interrupts & Real-Time Processing",
                    "Communication Protocols (I2C, SPI, UART)"
                ]
            },
            {
                id: 3, name: "Innovation (24 sessions)",
                desc: "Real-world problem-solving using embedded systems and AI integration.",
                longDesc: "Pushing beyond structured learning into creative exploration. Learners apply accumulated knowledge to architect independent robotic prototypes.",
                curriculum: [
                    "Advanced Robotics System Design",
                    "Embedded Systems for Smart Applications",
                    "Automation & Smart Robotics Concepts",
                    "IoT Basics for Robotics Integration",
                    "AI Integration in Robotics (Intro)",
                    "Prototyping & Rapid Development"
                ]
            }
        ]
    },
    internships: {
        id: 'internships', title: "RS Robotech Job-Oriented", color: "green", age: "Ages 18+",
        levels: [
            {
                id: 1, name: "Embedded & VLSI Internship",
                desc: "Industry-ready training in embedded architectures, matching Maven Silicon rigor.",
                longDesc: "Provides intensive job-oriented internship paths focusing on Real-Time Operating Systems (RTOS), SystemVerilog, and ASIC methodologies tailored for advanced robotics.",
                curriculum: [
                    "Advanced ARM Cortex-M Architectures",
                    "Real-Time Operating Systems (RTOS)",
                    "VLSI Front-end Design Concepts",
                    "SystemVerilog & Hardware Verification",
                    "Industry Standard IoT Interfaces",
                    "Final Prototyping & Placement Prep"
                ]
            }
        ]
    },
    workshops: {
        id: 'workshops', title: "Corporate & Academia", color: "orange", age: "Custom / B2B",
        levels: [
            {
                id: 1, name: "Institutional Workshops",
                desc: "Bringing premium robotics infrastructure natively to corporate bodies and schools.",
                longDesc: "Intensive 2 to 5-day hardware bootcamps designed for Faculty Development Programs (FDP) and corporate seminars to establish rapid tech literacy.",
                curriculum: [
                    "Rapid Hardware Prototyping Bootcamp",
                    "Faculty Development Programs (FDP)",
                    "Corporate STEM Literacy Integration",
                    "Hands-on AI Hardware Acceleration",
                    "IoT Cloud Analytics Seminars"
                ]
            }
        ]
    }
};

/* ========================================================
   SPA ROUTING (VIEW SWITCHING)
======================================================== */
function switchView(viewId) {
    // Hide all views
    document.querySelectorAll('.view-content').forEach(view => {
        view.classList.remove('active');
        view.classList.add('hidden');
    });

    // Show target view
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
        
        // Force the browser to reset scroll to top AFTER display repaint
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 10);
    }

    // GSAP ScrollTrigger Refresh since DOM dimensions changed
    ScrollTrigger.refresh();
}

function toggleModal(id, show) {
    const modal = document.getElementById(id);
    if (show) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
}

/* ========================================================
   TOAST NOTIFICATION LOGIC
======================================================== */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'bg-red-600' : 'bg-slate-900 border border-[#00f3ff]'}`;
    toast.innerHTML = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ========================================================
   THEME TOGGLE LOGIC
======================================================== */
const themes = [null, 'light', 'cyberpunk', 'ocean', 'sunrise', 'nova'];
let currentThemeIndex = 0;

function setTheme(themeName) {
    if (themeName === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        showToast("Dark mode activated.", "success");
    } else {
        document.documentElement.setAttribute('data-theme', themeName);
        showToast(themeName.charAt(0).toUpperCase() + themeName.slice(1) + " mode activated.", "success");
    }
}

/* ========================================================
   FORM SUBMISSION HANDLERS (MONGODB BACKEND)
======================================================== */

// 1. UPDATE THIS URL after you deploy to Render (e.g., https://your-app.onrender.com)
const PRODUCTION_URL = "https://rosbotz-api.onrender.com"; 

// 2. Automatically determine the API base URL
const isLocalFile = window.location.protocol === 'file:';
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// PRODUCTION_URL should be your live site (no trailing slash)
// (Already defined at line 206)
const API_BASE_URL = (isDev || isLocalFile)
    ? "http://localhost:3000" 
    : ""; // When hosted, paths are relative to the current domain

/**
 * STARTUP HEALTH CHECK
 */
async function checkSystemHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        if (data.database === 'offline') {
            console.warn("⚠️ System Status: Server Online, but Database Offline.");
        } else {
            console.log("✅ System Status: All Systems Operational.");
        }
    } catch (e) {
        console.error("❌ System Status: Backend Server Unreachable.");
    }
}
window.addEventListener('DOMContentLoaded', checkSystemHealth);

/**
 * REUSABLE TRANSMISSION ENGINE
 */
async function transmitData(endpoint, payload, button) {
    const fullEndpoint = `${API_BASE_URL}${endpoint}`;
    const originalText = button.innerText;
    button.disabled = true;
    button.innerText = "TRANSMITTING...";

    try {
        const response = await fetch(fullEndpoint, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.status === 404) throw new Error("Endpoint Not Found (404). Check API config.");
        
        const data = await response.json();

        if (response.ok) {
            if (data.storage === 'local') {
                showToast("System Alert: Connection to DB was interrupted. Saved to local backup instead.", "success");
            } else {
                showToast(data.message || "Data Packet Transmitted Successfully!");
            }
            return { success: true, data };
        } else {
            console.error("Server Error:", data);
            showToast(data.message || "Submission Error: " + response.statusText, "error");
            return { success: false, error: data };
        }
    } catch (error) {
        console.error("Network Detail:", error);
        if (error.message.includes("Failed to fetch")) {
            showToast("Connection Error: The backend server is not running or unreachable.", "error");
        } else {
            showToast(`Error: ${error.message}`, "error");
        }
        return { success: false, error };
    } finally {
        button.disabled = false;
        button.innerText = originalText;
    }
}

/**
 * HANDLER 1: Contact Form
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    
    const result = await transmitData('/api/contact', payload, btn);
    if (result.success) form.reset();
}

/**
 * HANDLER 2: Demo Bookings
 */
async function handleDemoSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    
    // Ensure formType matches
    payload.formType = 'Free Demo';
    
    const result = await transmitData('/api/demo', payload, btn);
    if (result.success) {
        form.reset();
        if (document.getElementById('demoModal')) {
            setTimeout(() => toggleModal('demoModal', false), 1000);
        }
    }
}

/**
 * HANDLER 2b: Schedule Class
 */
async function handleScheduleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "TRANSMITTING...";

    try {
        const response = await fetch(`${API_BASE_URL}/api/schedule`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        });
        
        const data = await response.json();

        if (response.ok && data.success) {
            showToast("Meeting Scheduled & WhatsApp Dispatched!", "success");
            
            form.innerHTML = `
                <div class="text-center bg-[#bc13fe]/10 border border-[#bc13fe] rounded-xl p-8 animate-fade-in space-y-4">
                    <div class="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white mb-4">
                        <i data-lucide="check" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-2xl font-bold font-heading text-white">Class Confirmed!</h3>
                    <p class="text-slate-300 font-mono text-sm leading-relaxed">
                        We have automatically sent the <strong>Google Meet Link</strong> to your WhatsApp number: <br><span class="text-[#bc13fe] font-bold text-lg">${payload.phone}</span>
                    </p>
                    <div class="mt-4 p-4 border border-white/20 bg-black/50 rounded-lg">
                        <p class="text-xs text-slate-500 uppercase tracking-widest mb-2">Direct Link for Record</p>
                        <a href="${data.link}" target="_blank" class="text-[#00f3ff] font-mono hover:underline break-all block">${data.link}</a>
                    </div>
                    <button type="button" onclick="toggleModal('demoModal', false)" class="mt-6 border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors uppercase tracking-widest text-xs">Close</button>
                </div>
            `;
            if(window.lucide) window.lucide.createIcons();
        } else {
            showToast(data.message || "Schedule attempt failed.", "error");
            btn.disabled = false;
            btn.innerText = originalText;
        }
    } catch (error) {
        showToast("Connection error. Ensure backend is running.", "error");
        btn.disabled = false;
        btn.innerText = originalText;
    }
}

/**
 * HANDLER 3: Franchise Inquiry
 */
async function handleFranchiseSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    
    const result = await transmitData('/api/franchise', payload, btn);
    if (result.success) {
        form.reset();
        if (document.getElementById('franchiseModal')) {
            setTimeout(() => toggleModal('franchiseModal', false), 1000);
        }
    }
}

/* ========================================================
   COURSE FILTERING LOGIC
======================================================== */
/* ========================================================
   COURSE FILTERING LOGIC (ENHANCED)
======================================================== */
function filterCourses(category) {
    // 1. Color Map for Categories
    const colorMap = {
        'all': { border: 'border-[#00f3ff]', bg: 'bg-[#00f3ff]/10' },
        'builder': { border: 'border-[#00f3ff]', bg: 'bg-[#00f3ff]/10' },
        'advanced': { border: 'border-[#bc13fe]', bg: 'bg-[#bc13fe]/10' },
        'internships': { border: 'border-[#10b981]', bg: 'bg-[#10b981]/10' },
        'workshops': { border: 'border-[#f59e0b]', bg: 'bg-[#f59e0b]/10' }
    };

    const config = colorMap[category] || colorMap['all'];

    // 2. Update button styles
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        // Remove ALL possible active color classes from previous states
        btn.classList.remove(
            'border-[#00f3ff]', 'bg-[#00f3ff]/10', 
            'border-[#bc13fe]', 'bg-[#bc13fe]/10',
            'border-[#10b981]', 'bg-[#10b981]/10',
            'border-[#f59e0b]', 'bg-[#f59e0b]/10',
            'text-white', 'active'
        );
        // Reset to default inactive style
        btn.classList.add('border-white/20', 'bg-transparent', 'text-slate-400');
    });

    // 3. Find and activate current button using more robust detection
    const activeBtn = Array.from(buttons).find(b => b.outerHTML.includes(`'${category}'`));
    if (activeBtn) {
        activeBtn.classList.remove('border-white/20', 'bg-transparent', 'text-slate-400');
        activeBtn.classList.add(config.border, config.bg, 'text-white', 'active');
    }

    // 4. Filter grid items
    const grid = document.getElementById('course-grid');
    if (!grid) return;

    const courses = grid.children;
    Array.from(courses).forEach(c => {
        const itemCat = c.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            c.style.display = 'flex'; // Maintain internal flex structure
        } else {
            c.style.display = 'none';
        }
    });

    // 5. Refresh ScrollTrigger since the grid height changed
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

/* ========================================================
   DYNAMIC COURSE INJECTION
======================================================== */
let activeCourseId = null;

function showLevels(courseId) {
    activeCourseId = courseId;
    const data = courseData[courseId];
    const container = document.getElementById('levels-container');
    const title = document.getElementById('levels-display-title');

    title.innerText = `${data.title} - TIERS`;

    let borderColor, textColor, bgHover;
    if (data.color === 'blue') { borderColor = 'border-[#00f3ff]'; textColor = 'text-[#00f3ff]'; bgHover = 'hover:bg-[#00f3ff]'; }
    else if (data.color === 'purple') { borderColor = 'border-[#bc13fe]'; textColor = 'text-[#bc13fe]'; bgHover = 'hover:bg-[#bc13fe]'; }
    else if (data.color === 'green') { borderColor = 'border-[#10b981]'; textColor = 'text-[#10b981]'; bgHover = 'hover:bg-[#10b981]'; }
    else { borderColor = 'border-[#f59e0b]'; textColor = 'text-[#f59e0b]'; bgHover = 'hover:bg-[#f59e0b]'; }

    container.innerHTML = data.levels.map(level => `
        <div class="glass-card flex flex-col p-0 rounded-3xl bg-[#0f0f13] border border-white/10 border-t-4 ${borderColor} shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all overflow-hidden group">
            <div class="h-48 relative overflow-hidden border-b border-white/5">
                <img src="${level.image || 'image1.jpeg'}" alt="${level.name}" 
                    class="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-60"></div>
                <div class="absolute top-4 left-6">
                    <span class="inline-block px-3 py-1 bg-black/60 border border-white/10 rounded font-mono text-[10px] ${textColor} backdrop-blur-md">LEVEL 0${level.id}</span>
                </div>
            </div>
            <div class="p-8 flex-1 flex flex-col">
                <h3 class="text-2xl font-bold font-heading mb-3 text-white uppercase">${level.name}</h3>
                <p class="text-slate-400 mb-8 flex-1 text-sm leading-relaxed">${level.desc}</p>
                <button onclick="showCourseDetail(${level.id})" class="w-full py-4 border border-white/20 text-white rounded-xl font-bold ${bgHover} hover:text-black transition-all uppercase tracking-widest text-sm">Access File</button>
            </div>
        </div>
    `).join('');

    switchView('levels');
}

function showCourseDetail(levelId) {
    const course = courseData[activeCourseId];
    const level = course.levels.find(l => l.id === levelId);
    const content = document.getElementById('course-content');

    let hexColor, textColClass;
    if (course.color === 'blue') { hexColor = '#00f3ff'; textColClass = 'text-[#00f3ff]'; }
    else if (course.color === 'purple') { hexColor = '#bc13fe'; textColClass = 'text-[#bc13fe]'; }
    else if (course.color === 'green') { hexColor = '#10b981'; textColClass = 'text-[#10b981]'; }
    else { hexColor = '#f59e0b'; textColClass = 'text-[#f59e0b]'; }

    content.innerHTML = `
        <div class="grid lg:grid-cols-2 gap-12 items-start mt-8">
            <div class="space-y-8">
                <div class="h-72 relative rounded-3xl overflow-hidden border border-white/10 mb-8">
                    <img src="${level.image || 'image2.jpeg'}" alt="${level.name} Hero" 
                        class="absolute inset-0 w-full h-full object-cover opacity-100">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                    <div class="absolute bottom-6 left-6 flex gap-3">
                        <div class="px-3 py-1 rounded border border-[${hexColor}] ${textColClass} font-mono text-xs tracking-wider bg-black/40 backdrop-blur-md">L-0${level.id}</div>
                        <div class="px-3 py-1 rounded bg-white/10 text-white font-mono text-xs backdrop-blur-md">${course.age}</div>
                    </div>
                </div>
                <h1 class="text-5xl md:text-6xl font-bold font-heading uppercase text-white leading-tight">${level.name}</h1>
                <p class="text-xl text-slate-400">${course.title}</p>
                <div class="glass-card p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-1 h-full" style="background-color: ${hexColor}"></div>
                    <h4 class="font-bold font-mono text-lg mb-4 text-white">SYSTEM_OVERVIEW</h4>
                    <p class="text-slate-400 leading-relaxed">${level.longDesc}</p>
                </div>
                <button onclick="toggleModal('demoModal', true)" class="w-full md:w-auto px-10 py-5 bg-transparent border-2 border-[${hexColor}] ${textColClass} font-bold font-heading rounded-xl hover:bg-[${hexColor}] hover:text-black hover:shadow-[0_0_20px_${hexColor}] transition-all uppercase tracking-widest text-lg">
                    Initialize Setup
                </button>
            </div>
            
            <div class="space-y-6">
                <!-- Curriculum Module -->
                <div class="glass-card p-8 rounded-3xl bg-[#0f0f13] border border-white/10">
                    <h4 class="font-bold font-mono mb-6 text-xl flex items-center gap-2 text-white">
                        <i data-lucide="folder-code" class="w-5 h-5 ${textColClass}"></i>
                        CURRICULUM_FILES
                    </h4>
                    <div class="space-y-3">
                        ${level.curriculum.map((c, idx) => `
                            <div class="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:border-[${hexColor}]/30 transition-colors">
                                <div class="font-mono text-xs text-slate-600">0${idx + 1}</div>
                                <span class="text-slate-300 font-medium">${c}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Hardware Module -->
                <div class="glass-card p-8 rounded-3xl bg-[#0f0f13] border border-white/10">
                    <h4 class="font-bold font-mono mb-6 text-xl flex items-center gap-2 text-white">
                        <i data-lucide="cpu" class="w-5 h-5 ${textColClass}"></i>
                        HARDWARE_SPECS
                    </h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-white/5 rounded-xl text-center border border-white/10 hover:border-white/30 transition-colors"><i data-lucide="microchip" class="mx-auto mb-2 text-slate-400"></i><span class="text-sm font-medium text-slate-300">Core Node</span></div>
                        <div class="p-4 bg-white/5 rounded-xl text-center border border-white/10 hover:border-white/30 transition-colors"><i data-lucide="battery-charging" class="mx-auto mb-2 text-slate-400"></i><span class="text-sm font-medium text-slate-300">Power Cell</span></div>
                        <div class="p-4 bg-white/5 rounded-xl text-center border border-white/10 hover:border-white/30 transition-colors"><i data-lucide="radio" class="mx-auto mb-2 text-slate-400"></i><span class="text-sm font-medium text-slate-300">Sensors</span></div>
                        <div class="p-4 bg-white/5 rounded-xl text-center border border-white/10 hover:border-white/30 transition-colors"><i data-lucide="wrench" class="mx-auto mb-2 text-slate-400"></i><span class="text-sm font-medium text-slate-300">Tool Set</span></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
    switchView('course-detail');
}

/* ========================================================
   GSAP CINEMATIC HERO ANIMATION
======================================================== */
gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
const frameCount = 40;
const currentFrame = index => `ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`;

const images = [];
let loadedImages = 0;

function preloadImages() {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedImages++;
            const progress = Math.round((loadedImages / frameCount) * 100);
            document.getElementById('progress').innerText = progress;
            if (loadedImages === frameCount) {
                setTimeout(initAnimation, 800);
            }
        };
        images.push(img);
    }
}

// Particle Canvas for hologram dust
const particleCanvas = document.getElementById('particle-canvas');
const pCtx = particleCanvas.getContext('2d');
let particles = [];
function initParticles() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width, y: Math.random() * particleCanvas.height,
            size: Math.random() * 2, speedY: (Math.random() - 0.5) * 0.5, speedX: (Math.random() - 0.5) * 0.5
        });
    }
    drawParticles();
}
function drawParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    pCtx.fillStyle = 'rgba(0, 243, 255, 0.4)';
    particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = particleCanvas.width; if (p.x > particleCanvas.width) p.x = 0;
        if (p.y < 0) p.y = particleCanvas.height; if (p.y > particleCanvas.height) p.y = 0;
        pCtx.beginPath(); pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2); pCtx.fill();
    });
    requestAnimationFrame(drawParticles);
}

function initAnimation() {
    // Hide loader
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => { document.getElementById('loader').style.display = 'none'; }, 1000);

    // Show UI overlay
    document.querySelector('.ui-overlays').style.opacity = '1';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();

    // Render first frame
    function renderFrame(index) {
        if (!images[index]) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale; const h = img.height * scale;
        const x = (canvas.width - w) / 2; const y = (canvas.height - h) / 2;
        ctx.drawImage(img, x, y, w, h);
    }
    renderFrame(0);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        particleCanvas.width = window.innerWidth; particleCanvas.height = window.innerHeight;
        renderFrame(Math.round(airpods.frame));
    });

    // Object to animate (GSAP proxies the canvas frame index here)
    const airpods = { frame: 0 };

    if (scrollTl) scrollTl.kill(); // Reset if recalled

    scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top", end: "bottom bottom",
            scrub: 1.5 // Smooth interpolation
        }
    });

    // Animate image frames
    scrollTl.to(airpods, {
        frame: frameCount - 1, snap: "frame", ease: "none",
        onUpdate: () => renderFrame(Math.round(airpods.frame))
    }, 0);

    // Zoom effect near end
    scrollTl.to(".canvas-wrapper", { scale: 1.2, ease: "power1.inOut" }, 0.7);

    // Text Phase animations mapped to timeline duration
    const phases = ['.phase-1', '.phase-2', '.phase-3', '.phase-4', '.phase-5', '.phase-6'];
    const phaseDur = 1 / phases.length;

    phases.forEach((selector, i) => {
        const start = i * phaseDur;
        scrollTl.to(selector, { opacity: 1, duration: phaseDur * 0.2, ease: "power2.out" }, start)
            .to(selector, { opacity: 0, scale: 1.1, duration: phaseDur * 0.2, ease: "power2.in" }, start + phaseDur * 0.6);
    });
}

/* ========================================================
   ABOUT PAGE THREE.JS MASCOT / DANCING BOT
======================================================== */
let scene, camera, renderer, robot, clock;
let targetRotationX = 0.2, targetRotationY = 0;
let head, body, leftArm, rightArm, antennaL, antennaR;

// Custom Shape Helpers
function createRoundedBox(width, height, depth, radius, material) {
    const group = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(width, height - radius * 2, depth), material);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 20), material);
    top.rotation.z = Math.PI / 2;
    top.position.y = height / 2 - radius;
    group.add(box, top);
    return group;
}

function initThreeJSBot() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    clock = new THREE.Clock();
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 8);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Studio Lighting matching the image's pink/cyan rim lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const cyanLight = new THREE.DirectionalLight(0x00ffff, 1.2);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const pinkLight = new THREE.DirectionalLight(0xff00ff, 0.8);
    pinkLight.position.set(-5, 2, 2);
    scene.add(pinkLight);

    robot = new THREE.Group();

    // Materials
    const tealMat = new THREE.MeshStandardMaterial({ color: 0x4dd0e1, roughness: 0.3, metalness: 0.2 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xe0f7fa, roughness: 0.5, metalness: 0.1 });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.8 });
    const pinkGlow = new THREE.MeshBasicMaterial({ color: 0xff00ff });

    // BODY (Compact boxy torso)
    body = new THREE.Group();
    const torsoGeo = new THREE.BoxGeometry(1.2, 1.3, 0.8);
    const torso = new THREE.Mesh(torsoGeo, whiteMat);
    body.add(torso);

    // Front Panel details
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.6), tealMat);
    panel.position.z = 0.41;
    body.add(panel);

    robot.add(body);

    // HEAD (Large rounded cube-ish)
    head = new THREE.Group();
    const skullGeo = new THREE.BoxGeometry(2.2, 1.8, 1.6); // Massive head as in image
    const skull = new THREE.Mesh(skullGeo, whiteMat);
    // Add teal stripes
    const stripeL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.82, 1.62), tealMat);
    stripeL.position.x = -0.5;
    const stripeR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.82, 1.62), tealMat);
    stripeR.position.x = 0.5;
    head.add(skull, stripeL, stripeR);

    // EYES (The huge iconic goggles)
    function createEye(x) {
        const eyeGroup = new THREE.Group();
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.1, 16, 32), tealMat);
        const lens = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), blackMat);
        lens.scale.z = 0.2;
        const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.08, 16), pinkGlow);
        pupil.position.z = 0.08;

        eyeGroup.add(ring, lens, pupil);
        eyeGroup.position.set(x, 0, 0.8);
        return eyeGroup;
    }
    head.add(createEye(-0.6), createEye(0.6));

    // ANTENNA LOOPS
    const antennaGeo = new THREE.TorusGeometry(0.6, 0.02, 8, 32, Math.PI);
    antennaL = new THREE.Mesh(antennaGeo, tealMat);
    antennaL.position.set(-0.5, 0.9, 0);
    antennaL.rotation.z = Math.PI / 2;

    antennaR = new THREE.Mesh(antennaGeo, tealMat);
    antennaR.position.set(0.5, 0.9, 0);
    antennaR.rotation.z = Math.PI / 2;
    head.add(antennaL, antennaR);

    head.position.y = 1.6;
    robot.add(head);

    // ARMS (Speaker-like hands)
    function createArm(side) {
        const arm = new THREE.Group();
        const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), tealMat);
        arm.add(shoulder);

        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.8, 16), tealMat);
        forearm.position.y = -0.5;
        arm.add(forearm);

        // Speaker details on hands
        const speaker = new THREE.Mesh(new THREE.CircleGeometry(0.15, 16), blackMat);
        speaker.position.set(0, -0.9, 0.2);
        arm.add(speaker);

        arm.position.set(side * 1.1, 0.2, 0);
        return arm;
    }
    leftArm = createArm(-1);
    rightArm = createArm(1);
    robot.add(leftArm, rightArm);

    // LEGS (Stubby rounded boots)
    function createLeg(x) {
        const leg = new THREE.Group();
        const joint = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4), blackMat);
        leg.add(joint);
        const boot = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), tealMat);
        boot.scale.y = 0.6;
        boot.position.y = -0.4;
        leg.add(boot);
        leg.position.set(x, -0.8, 0);
        return leg;
    }
    robot.add(createLeg(-0.4), createLeg(0.4));

    scene.add(robot);

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('resize', onWindowResize);

    animateBot();
}

function onMouseDown(event) {
    const container = document.getElementById('canvas-container');
    const moveHandler = (e) => {
        targetRotationY += e.movementX * 0.01;
        targetRotationX += e.movementY * 0.01;
    };
    const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animateBot() {
    requestAnimationFrame(animateBot);
    const t = clock.getElapsedTime();

    // Gentle Float & Head Tilt
    robot.position.y = Math.sin(t * 2) * 0.1;
    head.rotation.z = Math.sin(t * 1.5) * 0.05;
    head.rotation.x = Math.cos(t * 2) * 0.05;

    // Antenna Wiggle
    antennaL.scale.set(1 + Math.sin(t * 5) * 0.05, 1, 1);
    antennaR.scale.set(1 + Math.cos(t * 5) * 0.05, 1, 1);

    // Arm movement
    leftArm.rotation.x = Math.sin(t * 3) * 0.2;
    rightArm.rotation.x = Math.cos(t * 3) * 0.2;

    robot.rotation.y += (targetRotationY - robot.rotation.y) * 0.1;
    robot.rotation.x += (targetRotationX - robot.rotation.x) * 0.1;

    renderer.render(scene, camera);
}

function setupDancingBot() {
    // 1. Core groovy dance: bounce & lean
    gsap.to(".dancing-robot", {
        y: -25,
        rotationZ: 6,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // 2. Add "say hello with excitement" element
    const container = document.querySelector('.robot-wrapper');
    if (container) {
        const helloBalloon = document.createElement('div');
        helloBalloon.innerHTML = 'HELLO! <i data-lucide="sparkles" class="inline w-4 h-4 ml-1"></i>';
        helloBalloon.className = "absolute top-4 right-0 bg-[#f97316] text-[#050505] font-bold font-mono px-4 py-2 rounded-xl text-sm md:text-lg opacity-0 transform translate-y-4 shadow-[0_0_20px_#f97316] z-20 pointer-events-none flex items-center";

        // Append a little tail to the dialogue balloon
        const tail = document.createElement('div');
        tail.className = "absolute -bottom-2 left-6 w-4 h-4 bg-[#f97316] transform rotate-45";
        helloBalloon.appendChild(tail);

        container.appendChild(helloBalloon);

        // Pop in and out animation with a springy jump
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        tl.to(helloBalloon, {
            opacity: 1,
            y: -10,
            scale: 1.1,
            duration: 0.5,
            ease: "back.out(2)"
        })
            .to(helloBalloon, {
                scale: 1,
                duration: 0.2
            })
            .to(helloBalloon, {
                rotationZ: -10,
                yoyo: true,
                repeat: 3,
                duration: 0.1,
                ease: "sine.inOut"
            })
            .to(helloBalloon, {
                opacity: 0,
                y: 10,
                scale: 0.5,
                duration: 0.3,
                ease: "back.in(1.5)",
                delay: 1.5
            });

        // Initialize Lucide icons for the injected sparkles
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

/* ========================================================
   FRANCHISE ABOUT HOVER INTERACTIONS
======================================================== */
function setupProtocolHover() {
    const steps = document.querySelectorAll('.protocol-step');
    const visualCard = document.getElementById('protocol-visual-card');
    const glow = document.getElementById('protocol-bg-glow');
    const icon = document.getElementById('protocol-icon');
    const title = document.getElementById('protocol-title');
    const desc = document.getElementById('protocol-desc');

    if (!steps.length || !visualCard) return;

    const protocolData = {
        '1': {
            icon: 'map-pin',
            title: 'Location Analysis',
            desc: 'System evaluating geographic node viability and population density for optimum franchise placement.',
            color: '#00f3ff'
        },
        '2': {
            icon: 'box',
            title: 'Hardware Logistics',
            desc: 'Tracking massive shipment of robotics kits, microcontrollers, and sensory arrays directly to your lab.',
            color: '#bc13fe'
        },
        '3': {
            icon: 'share-2',
            title: 'Knowledge Transfer',
            desc: 'Synchronizing trainer frameworks with expert mentors via encrypted 1-on-1 virtual sessions.',
            color: '#00f3ff'
        },
        '4': {
            icon: 'binary',
            title: 'Code Architecture',
            desc: 'Students actively programming algorithms and compiling them into functional hardware constructs.',
            color: '#bc13fe'
        },
        '5': {
            icon: 'power',
            title: 'System Online',
            desc: 'Lab fully operational. Generating verified STEM graduates and expanding the tech ecosystem.',
            color: '#00f3ff'
        }
    };

    steps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            const stepNum = step.getAttribute('data-step');
            const data = protocolData[stepNum];

            // Update UI State with GSAP for smooth transitions
            gsap.to(icon, {
                opacity: 0, scale: 0.5, duration: 0.2, onComplete: () => {
                    icon.setAttribute('data-lucide', data.icon);
                    icon.className = `w-32 h-32 mb-8 transition-all duration-500 text-[${data.color}] drop-shadow-[0_0_30px_${data.color}]`;
                    lucide.createIcons(); // Re-render the icon
                    gsap.to(icon, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
                }
            });

            gsap.to(title, {
                opacity: 0, y: 10, duration: 0.2, onComplete: () => {
                    title.innerText = data.title;
                    title.className = `text-3xl font-heading font-bold uppercase tracking-widest mb-4 transition-all duration-500 text-[${data.color}] drop-shadow-[0_0_15px_${data.color}]`;
                    gsap.to(title, { opacity: 1, y: 0, duration: 0.3 });
                }
            });

            gsap.to(desc, {
                opacity: 0, y: 10, duration: 0.2, onComplete: () => {
                    desc.innerText = data.desc;
                    gsap.to(desc, { opacity: 1, y: 0, duration: 0.3 });
                }
            });

            // Update Background Card Glow
            visualCard.style.borderColor = `${data.color}50`; // 50 opacity hex
            visualCard.style.boxShadow = `0 0 60px ${data.color}20`; // 20 opacity hex
            glow.className = `absolute inset-0 block mix-blend-overlay transition-colors duration-700 bg-gradient-to-br ${data.color === '#00f3ff' ? 'from-[#00f3ff]/20' : 'from-[#bc13fe]/20'} to-transparent`;
        });
    });
}

/* ========================================================
   GENERIC SCROLL ANIMATIONS (Reveal on Scroll)
======================================================== */
function initContentScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Apply soft fade-up animations to all cards, faq items, and specific content wrappers
    const targets = gsap.utils.toArray('.glass-card, .faq-item, .view-content h2, p.text-slate-400');

    targets.forEach(target => {
        // Exclude content hidden inside modals to prevent breaking them
        if (target.closest('#demoModal') || target.closest('#scheduleModal')) return;

        gsap.fromTo(target, 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: target,
                    start: "top 85%", 
                    toggleActions: "play none none reverse" // Play on scroll down, reverse on scroll up
                }
            }
        );
    });
}

/* ========================================================
   CAREERS & APPLICATION LOGIC
======================================================== */
function openApplyModal(role) {
    const modal = document.getElementById('applicationModal');
    const roleInput = document.getElementById('apply-role-input');
    const roleSubtitle = document.getElementById('apply-role-subtitle');
    const dropdown = document.getElementById('role-select-dropdown');
    
    if (role) {
        roleInput.value = role;
        roleSubtitle.innerText = `INITIATING_PROTOCOL // TARGET_ROLE: ${role.toUpperCase()}`;
        dropdown.value = role;
    }
    
    toggleModal('applicationModal', true);
}

// Drag & Drop Handlers
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('resume-input');
    const fileNameDisplay = document.getElementById('file-name-display');

    if (dropZone) {
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-500', 'bg-blue-500/10');
        });

        ['dragleave', 'dragend'].forEach(type => {
            dropZone.addEventListener(type, () => {
                dropZone.classList.remove('border-blue-500', 'bg-blue-500/10');
            });
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'bg-blue-500/10');
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                updateFileName(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                updateFileName(fileInput.files[0]);
            }
        });
    }

    function updateFileName(file) {
        if (file.type !== 'application/pdf') {
            showToast("Invalid format. Please upload a PDF file.", "error");
            fileInput.value = '';
            fileNameDisplay.innerText = "Drag & drop or Click to upload";
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast("File too large. Maximum size is 5MB.", "error");
            fileInput.value = '';
            fileNameDisplay.innerText = "Drag & drop or Click to upload";
            return;
        }
        fileNameDisplay.innerText = `Selected: ${file.name}`;
        fileNameDisplay.classList.add('text-blue-500', 'font-bold');
    }
});

async function handleApplicationSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = document.getElementById('apply-submit-btn');
    const formData = new FormData(form);
    
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> UPLOADING_DATA...`;
    lucide.createIcons();

    try {
        const formData = new FormData(form);
        const jsonData = Object.fromEntries(formData.entries());

        const response = await fetch(`${API_BASE_URL}/api/apply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
        });

        const data = await response.json();

        if (response.ok) {
            showToast(`Deployment Record Initialized! Please email your resume to <span class="text-[#bc13fe] font-bold underline">raakcareers@gmail.com</span> now.`, "success");
            form.reset();
            setTimeout(() => toggleModal('applicationModal', false), 2500);
        } else {
            showToast(data.message || "Data integrity failure.", "error");
        }
    } catch (error) {
        console.error("Submission Error:", error);
        showToast("System Link Failure: Connection to server lost.", "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        lucide.createIcons();
    }
}

/* ========================================================
   STARTUP
======================================================== */
window.onload = () => {
    // Start original core initializations
    // We can run these in background while splash is showing
    preloadImages();
    initThreeJSBot();
    setupDancingBot();
    setupProtocolHover();
    initContentScrollAnimations();
    
    // The splash will end itself via its own timer or user skip
};

/* ========================================================
   VIDEO GALLERY LOGIC
======================================================== */
function scrollGallery(direction) {
    const container = document.getElementById('videoScrollContainer');
    if (!container) return;
    const scrollAmount = window.innerWidth > 768 ? 750 : 350;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
}

// Auto-swipe initialization
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('videoScrollContainer');
    if (!container) return;

    const videos = container.querySelectorAll('video');
    videos.forEach((video, index) => {
        video.onended = () => {
            const cards = container.querySelectorAll('.video-card');
            const nextCard = cards[index + 1];
            if (nextCard) {
                nextCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                const nextVideo = nextCard.querySelector('video');
                if (nextVideo) nextVideo.play().catch(e => console.log('Auto-play blocked'));
            }
        };
    });
});

