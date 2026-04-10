const fs = require('fs');
const target = 'style.css';

const themes = {
  sunrise: {
    base: '#020617',
    baseAlt: '#0f172a',
    primary: '#3b82f6',
    secondary: '#f97316',
    borderBase: 'rgba(59,130,246,0.2)',
    bgElevated: 'rgba(15,23,42,0.85)'
  },
  cyberpunk: {
    primary: '#00e5ff',
    secondary: '#ff003c'
  },
  ocean: {
    primary: '#00f3ff',
    secondary: '#10b981'
  }
};

let css = '\n/* EXTENDED DYNAMIC THEMES */\n';

// Sunrise CSS Generation
css += `
[data-theme="sunrise"] .bg-\\[\\#050505\\], [data-theme="sunrise"] body { background-color: ${themes.sunrise.base}; color: #f8fafc; }
[data-theme="sunrise"] .bg-\\[\\#0f0f13\\] { background-color: ${themes.sunrise.baseAlt}; }
[data-theme="sunrise"] .border-white\\/10 { border-color: ${themes.sunrise.borderBase}; }
[data-theme="sunrise"] .bg-white\\/5 { background-color: rgba(59,130,246,0.05); }
[data-theme="sunrise"] .bg-\\[\\#050505\\]\\/95, [data-theme="sunrise"] .bg-\\[\\#050505\\]\\/90, [data-theme="sunrise"] .bg-\\[\\#050505\\]\\/80, [data-theme="sunrise"] .bg-\\[\\#050505\\]\\/70, [data-theme="sunrise"] .bg-black\\/60 { background-color: ${themes.sunrise.bgElevated}; }
[data-theme="sunrise"] .bg-black { background-color: ${themes.sunrise.base}; }
[data-theme="sunrise"] .from-\\[\\#0f0f13\\] { --tw-gradient-from: ${themes.sunrise.baseAlt} var(--tw-gradient-from-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
[data-theme="sunrise"] .to-\\[\\#050505\\] { --tw-gradient-to: ${themes.sunrise.base} var(--tw-gradient-to-position); }
[data-theme="sunrise"] .from-\\[\\#050505\\] { --tw-gradient-from: ${themes.sunrise.base} var(--tw-gradient-from-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
[data-theme="sunrise"] .bg-gradient-to-br.from-\\[\\#0f0f13\\].to-\\[\\#050505\\] { background-image: linear-gradient(to bottom right, ${themes.sunrise.baseAlt}, ${themes.sunrise.base}) !important; }
[data-theme="sunrise"] .from-transparent.via-\\[\\#050505\\].to-\\[\\#050505\\] { background-image: radial-gradient(ellipse at center, transparent, ${themes.sunrise.base}, ${themes.sunrise.base}) !important; }
[data-theme="sunrise"] .via-\\[\\#050505\\] { --tw-gradient-stops: var(--tw-gradient-from), ${themes.sunrise.base} var(--tw-gradient-via-position), var(--tw-gradient-to); }
[data-theme="sunrise"] .bg-\\[\\#0f0f13\\]\\/90 { background-color: rgba(15,23,42, 0.9); }
[data-theme="sunrise"] .to-\\[\\#0f0f13\\] { --tw-gradient-to: ${themes.sunrise.baseAlt} var(--tw-gradient-to-position); }
[data-theme="sunrise"] .partner-section { background-color: ${themes.sunrise.base} !important; color: #f8fafc !important;}
[data-theme="sunrise"] .circuit-bg { background-image: radial-gradient(rgba(249, 115, 22, 0.15) 1px, transparent 1px); }
[data-theme="sunrise"] .glass-card { background: rgba(15,23,42,0.7); border: 1px solid rgba(249,115,22,0.3); box-shadow: 0 8px 30px rgba(249,115,22,0.15); }
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
[data-theme="sunrise"] .gradient-text { background: linear-gradient(90deg, #f97316, #3b82f6) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; }
[data-theme="cyberpunk"] .gradient-text { background: linear-gradient(90deg, #ff003c, #00e5ff) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; }
[data-theme="ocean"] .gradient-text { background: linear-gradient(90deg, #10b981, #00f3ff) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; }
`;

fs.appendFileSync(target, css);
console.log('Appended successfully');
