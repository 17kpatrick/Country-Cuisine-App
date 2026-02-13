window.COUNTRY_FLAIRS = window.COUNTRY_FLAIRS || {};

window.COUNTRY_FLAIRS['JPN'] = [
    // Map Theme
    { type: 'map-theme', name: 'japan-ink' },
    
    // The Rising Sun (Background)
    {
        type: 'circle',
        lat: 36, lon: 138,
        radius: 350000,
        style: { color: '#bc002d', fillColor: '#bc002d', fillOpacity: 0.4, weight: 0, className: 'rising-sun-pulse' }
    },

    // --- TITLES & QUOTES ---
    // Main Title "Nippon" (Top Right)
    { 
        type: 'text', 
        lat: 41, lon: 148,
        content: '日本', 
        className: 'yuji-syuku-regular flair-fade-in',
        style: 'font-size: 90px; color: #b71c1c; text-shadow: 2px 2px 0px rgba(255,255,255,0.4); writing-mode: vertical-rl;',
        width: 100, height: 180
    },
    
    // Subtitle (Top Right)
    {
        type: 'text',
        lat: 41.5, lon: 146,
        content: 'Land of the Rising Sun',
        className: 'cinzel-decorative-regular flair-fade-in',
        style: 'font-size: 22px; color: #212121; text-shadow: 1px 1px 0px rgba(255,255,255,0.6); writing-mode: vertical-rl;',
        width: 50, height: 300
    },
    
    // Dogen Quote (Bottom Left)
    {
        type: 'text',
        lat: 25, lon: 135,
        content: '"The whole moon and the entire sky are reflected in one dewdrop on the grass." <br> - Dōgen',
        className: 'cinzel-decorative-regular flair-poem',
        style: 'font-size: 15px; color: #b71c1c; text-align: center; font-style: italic; text-shadow: 1px 1px 0px rgba(255,255,255,0.6);',
        width: 280, height: 100
    },

    // --- LANDMARKS (on land) ---
    // SVG Torii Gate
    { 
        type: 'svg', 
        lat: 34.29, lon: 132.32, 
        content: `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-icon flair-fade-in" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)); overflow: visible;">
                <path d="M15 25 H85" stroke="#212121" stroke-width="6" stroke-linecap="round"/>
                <path d="M20 35 H80" stroke="#b71c1c" stroke-width="5" stroke-linecap="round"/>
                <path d="M30 25 V90" stroke="#b71c1c" stroke-width="6"/>
                <path d="M70 25 V90" stroke="#b71c1c" stroke-width="6"/>
                <rect x="46" y="35" width="8" height="15" fill="#b71c1c"/>
            </svg>`,
        width: 45, height: 45
    },
    // SVG Mount Fuji
    { 
        type: 'svg', 
        lat: 35.36, lon: 138.72, 
        content: `
            <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-icon flair-fade-in" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)); overflow: visible;">
                <path d="M100 20 L180 110 H20 L100 20Z" fill="#455A64"/>
                <path d="M100 20 L125 50 C115 45 105 55 100 50 C95 55 85 45 75 50 L100 20Z" fill="white"/>
                <circle cx="150" cy="40" r="15" fill="#b71c1c" fill-opacity="0.8"/>
            </svg>`,
        width: 70, height: 35
    },

    // --- CREATIVE FLAIRE (in the sea) ---
    // Red Inkan Seal (Stamp) - Bottom Right
    {
        type: 'svg',
        lat: 30, lon: 142,
        content: `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-icon flair-fade-in" style="opacity: 0.9; transform: rotate(-8deg); mix-blend-mode: multiply; filter: blur(0.5px);">
                <rect x="10" y="10" width="80" height="80" rx="8" stroke="#b71c1c" stroke-width="4" fill="none" stroke-dasharray="80 10"/>
                <text x="50" y="70" font-family="serif" font-size="50" fill="#b71c1c" text-anchor="middle" font-weight="bold">味</text>
            </svg>`,
        width: 40, height: 40
    },

    // --- SURROUNDING AREAS ---
    // China: Ink Mountains (Centered on China)
    {
        type: 'svg',
        lat: 36, lon: 110,
        content: `<svg viewBox="0 0 200 100" fill="none" class="flair-fade-in" style="opacity: 0.6; filter: drop-shadow(2px 2px 0px rgba(255,255,255,0.2));">
            <path d="M20 100 L60 40 L100 100" fill="#555" opacity="0.5"/><path d="M80 100 L120 20 L160 100" fill="#333" opacity="0.6"/><path d="M140 100 L170 60 L200 100" fill="#555" opacity="0.5"/>
            <text x="100" y="90" font-family="'Yuji Syuku', serif" font-size="24" fill="#eee" text-anchor="middle" font-weight="bold">中国</text>
        </svg>`,
        width: 120, height: 60
    },
    // Korea: Stylized Label (Centered on Korea)
    {
        type: 'svg',
        lat: 37, lon: 127.5,
        content: `<svg viewBox="0 0 100 50" fill="none" class="flair-fade-in" style="opacity: 0.7; transform: rotate(-5deg);"><text x="50" y="35" font-family="'Yuji Syuku', serif" font-size="24" fill="#444" text-anchor="middle" style="text-shadow: 1px 1px 0 #fff;">朝鮮</text><path d="M20 45 Q 50 55, 80 45" stroke="#444" stroke-width="1" fill="none"/></svg>`,
        width: 80, height: 40
    },
    
    // --- INK WAVES (Seigaiha Style) ---
    {
        type: 'svg',
        lat: 44, lon: 148,
        content: `<svg viewBox="0 0 100 50" fill="none" style="opacity: 0.6;"><path d="M10 25 Q 25 5, 40 25 T 70 25" stroke="#2c3e50" stroke-width="3" stroke-linecap="round" fill="none" /></svg>`,
        width: 80, height: 40
    },

    // Effect (UPDATED TO WIND)
    { type: 'effect', name: 'sakura-wind' }
];