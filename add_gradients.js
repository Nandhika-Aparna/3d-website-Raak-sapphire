const fs = require('fs');
const target = 'style.css';

const css = `
/* IMMERSIVE VIBRANT GRADIENT BACKGROUNDS RE-OVERRIDE */

[data-theme="sunrise"] .bg-\\[\\#050505\\], 
[data-theme="sunrise"] body { 
    background: linear-gradient(135deg, #1f010c 0%, #3a0ca3 50%, #f72585 100%) !important; 
    color: #f8fafc; 
}

[data-theme="cyberpunk"] .bg-\\[\\#050505\\], 
[data-theme="cyberpunk"] body { 
    background: linear-gradient(to bottom, #10002b 0%, #240046 50%, #3c096c 100%) !important; 
}

[data-theme="ocean"] .bg-\\[\\#050505\\], 
[data-theme="ocean"] body { 
    background: linear-gradient(to right bottom, #001f3f 0%, #003366 50%, #005f9e 100%) !important; 
}

/* Adjust secondary black containers to translucent slightly elevated colors */
[data-theme="sunrise"] .bg-\\[\\#0f0f13\\] { background-color: rgba(20, 20, 30, 0.6) !important; }
[data-theme="cyberpunk"] .bg-\\[\\#0f0f13\\] { background-color: rgba(10, 5, 20, 0.7) !important; }
[data-theme="ocean"] .bg-\\[\\#0f0f13\\] { background-color: rgba(5, 10, 25, 0.6) !important; }

/* Improve text readabilities for lighter gradients */
[data-theme="sunrise"] .text-slate-400 { color: rgba(255, 255, 255, 0.85) !important; }
[data-theme="ocean"] .text-slate-400 { color: rgba(255, 255, 255, 0.8) !important; }
[data-theme="cyberpunk"] .text-slate-400 { color: rgba(255, 255, 255, 0.8) !important; }

`;

fs.appendFileSync(target, css);
console.log('Appended immersive gradients successfully');
