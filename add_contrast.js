const fs = require('fs');
const target = 'style.css';

let css = '\n/* HIGH CONTRAST TEXT OVERRIDES FOR VIBRANT THEMES */\n';

css += `
[data-theme="sunrise"] .text-slate-400,
[data-theme="sunrise"] .text-slate-500,
[data-theme="sunrise"] .text-gray-400,
[data-theme="sunrise"] p,
[data-theme="cyberpunk"] .text-slate-400,
[data-theme="cyberpunk"] .text-slate-500,
[data-theme="cyberpunk"] .text-gray-400,
[data-theme="cyberpunk"] p,
[data-theme="ocean"] .text-slate-400,
[data-theme="ocean"] .text-slate-500,
[data-theme="ocean"] .text-gray-400,
[data-theme="ocean"] p,
[data-theme="nova"] .text-slate-400,
[data-theme="nova"] .text-slate-500,
[data-theme="nova"] .text-gray-400,
[data-theme="nova"] p {
    color: rgba(255, 255, 255, 0.95) !important;
    text-shadow: 0 1px 3px rgba(0,0,0,0.8);
}

[data-theme="sunrise"] h1, [data-theme="sunrise"] h2, [data-theme="sunrise"] h3, [data-theme="sunrise"] h4,
[data-theme="cyberpunk"] h1, [data-theme="cyberpunk"] h2, [data-theme="cyberpunk"] h3, [data-theme="cyberpunk"] h4,
[data-theme="ocean"] h1, [data-theme="ocean"] h2, [data-theme="ocean"] h3, [data-theme="ocean"] h4,
[data-theme="nova"] h1, [data-theme="nova"] h2, [data-theme="nova"] h3, [data-theme="nova"] h4 {
    text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}
`;

fs.appendFileSync(target, css);
console.log('Appended high contrast text rules successfully');
