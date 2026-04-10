const fs = require('fs');
const target = 'style.css';

const themes = {
  nova: {
    primary: '#3b82f6',
    secondary: '#f97316'
  }
};

let css = '\n/* NOVA THEME EXTENSION & VIBRANT BACKGROUND OVERRIDES */\n';

// Core Background Gradients Overrides
css += `
[data-theme="sunrise"] .bg-\\[\\#050505\\], 
[data-theme="sunrise"] body { 
    background: linear-gradient(to right, #fceabb, #f8b500) !important; 
    color: #1a1a2e; 
}
[data-theme="sunrise"] .partner-section {
    background: transparent !important;
}

[data-theme="cyberpunk"] .bg-\\[\\#050505\\], 
[data-theme="cyberpunk"] body { 
    background: linear-gradient(135deg, #ff0844 0%, #ffb199 100%) !important; 
}
[data-theme="cyberpunk"] .partner-section {
    background: transparent !important;
}

[data-theme="ocean"] .bg-\\[\\#050505\\], 
[data-theme="ocean"] body { 
    background: linear-gradient(to right bottom, #0284c7, #0369a1, #0c4a6e) !important; 
}
[data-theme="ocean"] .partner-section {
    background: transparent !important;
}

[data-theme="nova"] .bg-\\[\\#050505\\], 
[data-theme="nova"] body { 
    background: linear-gradient(45deg, #f97316, #3b82f6) !important; 
}
[data-theme="nova"] .partner-section {
    background: transparent !important;
}

/* Make Glass Cards Highly Translucent Across All Themes to Let Gradients Shine */
[data-theme="sunrise"] .glass-card, [data-theme="cyberpunk"] .glass-card, [data-theme="ocean"] .glass-card, [data-theme="nova"] .glass-card {
    background: rgba(0, 0, 0, 0.25) !important;
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
}

[data-theme="sunrise"] .bg-\\[\\#0f0f13\\], [data-theme="cyberpunk"] .bg-\\[\\#0f0f13\\], [data-theme="ocean"] .bg-\\[\\#0f0f13\\], [data-theme="nova"] .bg-\\[\\#0f0f13\\] {
    background: rgba(0, 0, 0, 0.35) !important;
}

[data-theme="sunrise"] .bg-\\[\\#050505\\]\\/90, [data-theme="cyberpunk"] .bg-\\[\\#050505\\]\\/90, [data-theme="ocean"] .bg-\\[\\#050505\\]\\/90, [data-theme="nova"] .bg-\\[\\#050505\\]\\/90,
[data-theme="sunrise"] .bg-\\[\\#050505\\]\\/95, [data-theme="cyberpunk"] .bg-\\[\\#050505\\]\\/95, [data-theme="ocean"] .bg-\\[\\#050505\\]\\/95, [data-theme="nova"] .bg-\\[\\#050505\\]\\/95 {
    background: rgba(0, 0, 0, 0.45) !important;
}

/* Nova Core Settings */
:root {
  --neon-blue: #00f3ff;
  --neon-purple: #bc13fe;
}
[data-theme="nova"] {
    --neon-blue: #3b82f6;
    --neon-purple: #f97316;
    --dark-bg: transparent;
}
`;

for (const [t, colors] of Object.entries(themes)) {
  css += `
[data-theme="${t}"] .text-\\[\\#00f3ff\\] { color: ${colors.primary} !important; }
[data-theme="${t}"] .text-\\[\\#bc13fe\\] { color: ${colors.secondary} !important; }
[data-theme="${t}"] .bg-\\[\\#00f3ff\\] { background-color: ${colors.primary} !important; }
[data-theme="${t}"] .bg-\\[\\#bc13fe\\] { background-color: ${colors.secondary} !important; }
[data-theme="${t}"] .border-\\[\\#00f3ff\\] { border-color: ${colors.primary} !important; }
[data-theme="${t}"] .border-\\[\\#bc13fe\\] { border-color: ${colors.secondary} !important; }
[data-theme="${t}"] .shadow-\\[0_0_15px_\\#00f3ff\\] { box-shadow: 0 0 15px ${colors.primary} !important; }
[data-theme="${t}"] .shadow-\\[0_0_15px_\\#bc13fe\\] { box-shadow: 0 0 15px ${colors.secondary} !important; }
[data-theme="${t}"] .shadow-\\[0_0_20px_\\#00f3ff\\] { box-shadow: 0 0 20px ${colors.primary} !important; }
[data-theme="${t}"] .shadow-\\[0_0_20px_\\#bc13fe\\] { box-shadow: 0 0 20px ${colors.secondary} !important; }
[data-theme="${t}"] .shadow-\\[0_0_30px_\\#00f3ff\\] { box-shadow: 0 0 30px ${colors.primary} !important; }
[data-theme="${t}"] .shadow-\\[0_0_30px_\\#bc13fe\\] { box-shadow: 0 0 30px ${colors.secondary} !important; }
[data-theme="${t}"] .shadow-\\[0_0_50px_rgba\\(0\\,243\\,255\\,0\\.2\\)\\] { box-shadow: 0 0 50px ${colors.primary}33 !important; }
[data-theme="${t}"] .shadow-\\[0_0_50px_rgba\\(188\\,19\\,254\\,0\\.2\\)\\] { box-shadow: 0 0 50px ${colors.secondary}33 !important; }
[data-theme="${t}"] .bg-\\[\\#00f3ff\\]\\/5 { background-color: ${colors.primary}10 !important; }
[data-theme="${t}"] .bg-\\[\\#bc13fe\\]\\/5 { background-color: ${colors.secondary}10 !important; }
[data-theme="${t}"] .bg-\\[\\#00f3ff\\]\\/10 { background-color: ${colors.primary}20 !important; }
[data-theme="${t}"] .bg-\\[\\#bc13fe\\]\\/10 { background-color: ${colors.secondary}20 !important; }
[data-theme="${t}"] .bg-\\[\\#00f3ff\\]\\/20 { background-color: ${colors.primary}33 !important; }
[data-theme="${t}"] .bg-\\[\\#bc13fe\\]\\/20 { background-color: ${colors.secondary}33 !important; }
[data-theme="${t}"] .hover\\:text-\\[\\#00f3ff\\]:hover { color: ${colors.primary} !important; }
[data-theme="${t}"] .hover\\:text-\\[\\#bc13fe\\]:hover { color: ${colors.secondary} !important; }
[data-theme="${t}"] .hover\\:bg-\\[\\#00f3ff\\]\\/10:hover { background-color: ${colors.primary}20 !important; }
[data-theme="${t}"] .hover\\:shadow-\\[0_0_15px_\\#00f3ff\\]:hover { box-shadow: 0 0 15px ${colors.primary} !important; }
[data-theme="${t}"] .hover\\:shadow-\\[0_0_20px_\\#00f3ff\\]:hover { box-shadow: 0 0 20px ${colors.primary} !important; }
[data-theme="${t}"] .hover\\:shadow-\\[0_0_30px_\\#00f3ff\\]:hover { box-shadow: 0 0 30px ${colors.primary} !important; }
[data-theme="${t}"] .hover\\:shadow-\\[0_0_15px_\\#bc13fe\\]:hover { box-shadow: 0 0 15px ${colors.secondary} !important; }
[data-theme="${t}"] .hover\\:shadow-\\[0_0_30px_\\#bc13fe\\]:hover { box-shadow: 0 0 30px ${colors.secondary} !important; }
[data-theme="${t}"] .group-hover\\:border-\\[\\#bc13fe\\]\\/50:hover { border-color: ${colors.secondary}80 !important; }
  `;
}

css += `
[data-theme="nova"] .gradient-text { background: linear-gradient(90deg, #f97316, #3b82f6) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; }
`;

fs.appendFileSync(target, css);
console.log('Appended Nova mapping and translucent overlays successfully');
