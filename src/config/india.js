window.COUNTRY_FLAIRS = window.COUNTRY_FLAIRS || {};

window.COUNTRY_FLAIRS['IND'] = [
    // --- THEME: DARK VOID + MOUSE LIGHT ---
    { type: 'map-theme', name: 'india-dark-diya' },

    // --- HERO: ROTATING MANDALA (Floor Projection) ---
    {
        type: 'svg',
        lat: -2, lon: 78, 
        content: `
            <svg viewBox="0 0 200 200" fill="none" class="mandala-spin" style="opacity: 0.6; mix-blend-mode: screen;">
                <circle cx="100" cy="100" r="90" stroke="#ff9933" stroke-width="2" stroke-dasharray="2 4"/>
                <path d="M100 0 L120 40 L100 80 L80 40 Z" fill="#ff9933"/>
                <path d="M100 200 L120 160 L100 120 L80 160 Z" fill="#ff9933"/>
                <path d="M0 100 L40 120 L80 100 L40 80 Z" fill="#138808"/>
                <path d="M200 100 L160 120 L120 100 L160 80 Z" fill="#138808"/>
                <circle cx="100" cy="100" r="15" fill="#fff" filter="blur(5px)"/>
            </svg>`,
        width: 300, height: 300
    },

    // --- LANDMARK: THE TAJ MAHAL (Glowing Hologram) ---
    // Location: Agra (Top/North Central)
    {
        type: 'svg',
        lat: 27.17, lon: 78.04,
        content: `
            <svg viewBox="0 0 100 100" class="flair-fade-in" style="overflow: visible; filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));">
                <rect x="10" y="80" width="80" height="5" fill="#fff" opacity="0.8"/>
                <rect x="15" y="40" width="4" height="40" fill="#e0f7fa" />
                <rect x="81" y="40" width="4" height="40" fill="#e0f7fa" />
                <path d="M30 80 V 50 Q 30 40, 40 35 Q 50 20, 60 35 Q 70 40, 70 50 V 80" fill="#fff" opacity="0.9" />
                <path d="M45 80 V 60 Q 50 55, 55 60 V 80" fill="#1f2937" /> 
                <circle cx="50" cy="35" r="2" fill="#ff9933" />
            </svg>`,
        width: 80, height: 80
    },

    // --- TITLE ---
    {
        type: 'text',
        lat: 22, lon: 92, 
        content: 'भारत',
        className: 'noto-serif-sc-regular flair-fade-in',
        style: 'font-size: 140px; color: transparent; -webkit-text-stroke: 2px #ff9933; text-shadow: 0 0 50px rgba(255, 153, 51, 0.6); font-weight: bold; pointer-events: none;',
        width: 250, height: 150
    },

    // --- QUOTE (Arabian Sea) ---
    {
        type: 'text',
        lat: 12, lon: 60,
        content: '"Vasudhaiva Kutumbakam"<br><span style="font-size: 16px; opacity: 0.7; font-family: serif; color: #aaa;">(The World is One Family)</span>',
        className: 'cinzel-decorative-regular flair-fade-in',
        style: 'font-size: 22px; color: #e0e0e0; text-align: center; text-shadow: 0 0 15px rgba(255,255,255,0.2); opacity: 0; animation-delay: 1.5s; pointer-events: none;',
        width: 350, height: 100
    },

    // --- EFFECT: DIWALI LAMPS ---
    { type: 'effect', name: 'diwali-lamp' },
];