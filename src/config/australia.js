window.COUNTRY_FLAIRS = window.COUNTRY_FLAIRS || {};

window.COUNTRY_FLAIRS['AUS'] = [
    { type: 'map-theme', name: 'australia-outback' },

    // --- ABORIGINAL DOT ART CIRCLE (Background, Center of continent) ---
    {
        type: 'svg',
        lat: -26, lon: 134,
        content: `
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="australia-dot-spin" style="overflow: visible;">
                <circle cx="100" cy="100" r="90" stroke="#c1440e" stroke-width="1" fill="none" opacity="0.15" stroke-dasharray="4 8"/>
                <circle cx="100" cy="100" r="70" stroke="#daa520" stroke-width="1" fill="none" opacity="0.12" stroke-dasharray="3 6"/>
                <circle cx="100" cy="100" r="50" stroke="#c1440e" stroke-width="1" fill="none" opacity="0.1" stroke-dasharray="2 5"/>
                <circle cx="100" cy="10" r="3" fill="#daa520" opacity="0.2"/><circle cx="145" cy="20" r="2.5" fill="#c1440e" opacity="0.18"/>
                <circle cx="178" cy="50" r="3" fill="#daa520" opacity="0.2"/><circle cx="190" cy="100" r="2.5" fill="#c1440e" opacity="0.18"/>
                <circle cx="178" cy="150" r="3" fill="#daa520" opacity="0.2"/><circle cx="145" cy="180" r="2.5" fill="#c1440e" opacity="0.18"/>
                <circle cx="100" cy="190" r="3" fill="#daa520" opacity="0.2"/><circle cx="55" cy="180" r="2.5" fill="#c1440e" opacity="0.18"/>
                <circle cx="22" cy="150" r="3" fill="#daa520" opacity="0.2"/><circle cx="10" cy="100" r="2.5" fill="#c1440e" opacity="0.18"/>
                <circle cx="22" cy="50" r="3" fill="#daa520" opacity="0.2"/><circle cx="55" cy="20" r="2.5" fill="#c1440e" opacity="0.18"/>
            </svg>`,
        width: 560, height: 560
    },

    // --- MAIN TITLE ---
    {
        type: 'text',
        lat: -24,
        lon: 134,
        content: 'AUSTRALIA',
        className: 'australia-hero-title flair-fade-in',
        style: '',
        width: 420,
        height: 80,
    },
    // --- MOTTO ---
    {
        type: 'text',
        lat: -27,
        lon: 134,
        content: 'The Great Southern Land',
        className: 'flair-fade-in australia-motto',
        style: 'opacity: 0;',
        width: 320,
        height: 28,
    },

    // --- CATTLE DOG (Outback, Western Australia area — large, atmospheric) ---
    {
        type: 'text',
        lat: -23, lon: 113,
        content: '<img src="assets/australia/cattle_dog_aus.png" class="aus-photo-overlay aus-photo-dog"/>',
        className: 'aus-photo-wrap flair-fade-in',
        style: 'background: transparent; overflow: visible;',
        width: 216, height: 168,
    },

    // --- GREAT BARRIER REEF (Off QLD coast, over Coral Sea) ---
    {
        type: 'text',
        lat: -17, lon: 152,
        content: '<img src="assets/australia/barrier_reef_aus.png" class="aus-photo-overlay aus-photo-reef"/>',
        className: 'aus-photo-wrap flair-fade-in',
        style: 'background: transparent; overflow: visible;',
        width: 192, height: 160,
    },

    // --- OPERA HOUSE (Near Sydney, over Tasman Sea) ---
    {
        type: 'text',
        lat: -37, lon: 154.5,
        content: '<img src="assets/australia/opera_house_aus.png" class="aus-photo-overlay aus-photo-opera"/>',
        className: 'aus-photo-wrap flair-fade-in',
        style: 'background: transparent; overflow: visible;',
        width: 180, height: 300,
    },

    // --- ULURU (Center of Australia) ---
    {
        type: 'svg',
        lat: -25.65, lon: 131.03,
        content: `
            <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in australia-landmark" style="animation-delay: 0.5s; overflow: visible;">
                <path d="M10 70 Q 30 68, 40 55 Q 55 25, 80 18 Q 100 12, 120 18 Q 145 25, 160 55 Q 170 68, 190 70 Z" fill="#c1440e" opacity="0.85"/>
                <path d="M10 70 Q 30 68, 40 55 Q 55 25, 80 18 Q 100 12, 120 18 Q 145 25, 160 55 Q 170 68, 190 70" stroke="#8b2500" stroke-width="1.5" fill="none" opacity="0.6"/>
                <line x1="75" y1="35" x2="75" y2="55" stroke="#8b2500" stroke-width="0.8" opacity="0.4"/>
                <line x1="125" y1="35" x2="125" y2="55" stroke="#8b2500" stroke-width="0.8" opacity="0.4"/>
            </svg>`,
        width: 55, height: 22
    },

    // --- SYDNEY OPERA HOUSE SVG (Near Sydney) ---
    {
        type: 'svg',
        lat: -33.86, lon: 151.21,
        content: `
            <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in australia-landmark" style="animation-delay: 0.7s; overflow: visible;">
                <path d="M15 60 Q 18 30, 30 15 Q 35 10, 32 60" fill="#f5eed9" opacity="0.9"/>
                <path d="M30 60 Q 35 25, 48 12 Q 53 8, 50 60" fill="#f5eed9" opacity="0.9"/>
                <path d="M48 60 Q 53 22, 66 10 Q 72 6, 68 60" fill="#f5eed9" opacity="0.9"/>
                <path d="M65 60 Q 68 30, 78 18 Q 82 14, 80 60" fill="#f5eed9" opacity="0.85"/>
                <rect x="10" y="58" width="80" height="6" rx="1" fill="#d4c9a8" opacity="0.8"/>
            </svg>`,
        width: 36, height: 20
    },

    // --- BOOMERANG (Decorative, Indian Ocean) ---
    {
        type: 'svg',
        lat: -18, lon: 110,
        content: `
            <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in" style="opacity: 0.55; transform: rotate(-25deg); overflow: visible;">
                <path d="M20 80 Q 10 50, 30 25 Q 50 5, 80 10 Q 60 15, 45 35 Q 35 50, 40 70 Q 55 50, 75 45 Q 95 38, 110 25 Q 90 50, 65 65 Q 40 80, 20 80 Z" fill="#c1440e" opacity="0.7"/>
                <circle cx="35" cy="55" r="2" fill="#f5eed9" opacity="0.5"/>
                <circle cx="45" cy="45" r="2" fill="#f5eed9" opacity="0.5"/>
                <circle cx="55" cy="40" r="2" fill="#f5eed9" opacity="0.5"/>
                <circle cx="65" cy="38" r="2" fill="#f5eed9" opacity="0.5"/>
            </svg>`,
        width: 55, height: 46
    },

    // --- SOUTHERN CROSS CONSTELLATION (South, over Southern Ocean) ---
    {
        type: 'polyline',
        points: [
            [-37, 134], [-40.5, 136.5], [-39.5, 140], [-37.5, 138.5], [-38.5, 137]
        ],
        style: { className: 'southern-cross-line' }
    },
    {
        type: 'svg', lat: -40.5, lon: 136.5,
        content: `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in southern-cross-star" style="animation-delay: 0.2s;"><circle cx="15" cy="15" r="6" fill="#FFF" opacity="0.9"/><circle cx="15" cy="15" r="12" fill="#FFF" opacity="0.15"/></svg>`,
        width: 16, height: 16
    },
    {
        type: 'svg', lat: -37, lon: 134,
        content: `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in southern-cross-star" style="animation-delay: 0.4s;"><circle cx="15" cy="15" r="5" fill="#FFF" opacity="0.85"/><circle cx="15" cy="15" r="10" fill="#FFF" opacity="0.12"/></svg>`,
        width: 14, height: 14
    },
    {
        type: 'svg', lat: -37.5, lon: 138.50,
        content: `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in southern-cross-star" style="animation-delay: 0.6s;"><circle cx="15" cy="15" r="5" fill="#FFFACD" opacity="0.85"/><circle cx="15" cy="15" r="10" fill="#FFFACD" opacity="0.12"/></svg>`,
        width: 14, height: 14
    },
    {
        type: 'svg', lat: -39.5, lon: 140,
        content: `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in southern-cross-star" style="animation-delay: 0.8s;"><circle cx="15" cy="15" r="4" fill="#FFF" opacity="0.75"/><circle cx="15" cy="15" r="9" fill="#FFF" opacity="0.1"/></svg>`,
        width: 12, height: 12
    },
    {
        type: 'svg', lat: -38.5, lon: 137,
        content: `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in southern-cross-star" style="animation-delay: 1s;"><circle cx="15" cy="15" r="3" fill="#FFF" opacity="0.65"/><circle cx="15" cy="15" r="7" fill="#FFF" opacity="0.08"/></svg>`,
        width: 10, height: 10
    },

    // --- DOROTHEA MACKELLAR QUOTE (Bottom-Left, over Indian Ocean) ---
    {
        type: 'text',
        lat: -32, lon: 108,
        content: '"I love a sunburnt country,<br>A land of sweeping plains,<br>Of ragged mountain ranges,<br>Of droughts and flooding rains."<br><span style="font-size: 12px; letter-spacing: 0.08em; opacity: 0.7;">— Dorothea Mackellar, <i>My Country</i></span>',
        className: 'cinzel-decorative-regular flair-fade-in australia-poem',
        style: 'font-size: 16px; color: #f5eed9; text-align: center; font-style: italic; text-shadow: 0 0 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6); line-height: 1.7;',
        width: 300, height: 160
    },

    // --- "TERRA AUSTRALIS" badge (Far-right ocean) ---
    {
        type: 'svg',
        lat: -26, lon: 156.5,
        content: `
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in" style="overflow: visible; opacity: 0.6;">
                <circle cx="60" cy="60" r="55" fill="none" stroke="#c1440e" stroke-width="1.5" opacity="0.5"/>
                <circle cx="60" cy="60" r="45" fill="none" stroke="#daa520" stroke-width="0.8" opacity="0.3"/>
                <text x="60" y="52" font-family="'Cinzel Decorative', serif" font-size="11" fill="#f5eed9" text-anchor="middle" font-weight="bold" letter-spacing="0.15em" opacity="0.7">TERRA</text>
                <text x="60" y="72" font-family="'Cinzel Decorative', serif" font-size="11" fill="#f5eed9" text-anchor="middle" font-weight="bold" letter-spacing="0.15em" opacity="0.7">AUSTRALIS</text>
                <line x1="25" y1="57" x2="95" y2="57" stroke="#daa520" stroke-width="0.5" opacity="0.4"/>
                <line x1="25" y1="63" x2="95" y2="63" stroke="#daa520" stroke-width="0.5" opacity="0.4"/>
            </svg>`,
        width: 80, height: 80
    },

    // --- "OCEANIA" label (Far Right) ---
    {
        type: 'text',
        lat: -14, lon: 168,
        content: 'OCEANIA',
        className: 'cinzel-decorative-regular flair-fade-in',
        style: 'font-size: 16px; color: rgba(245, 238, 217, 0.2); letter-spacing: 0.35em; text-shadow: 0 0 6px rgba(0,0,0,0.4);',
        width: 180, height: 26
    },

    // --- "INDIAN OCEAN" label (Far Left) ---
    {
        type: 'text',
        lat: -22, lon: 100,
        content: 'INDIAN OCEAN',
        className: 'cinzel-decorative-regular flair-fade-in',
        style: 'font-size: 14px; color: rgba(245, 238, 217, 0.15); letter-spacing: 0.3em; text-shadow: 0 0 6px rgba(0,0,0,0.4);',
        width: 200, height: 24
    },

    // --- DUST MOTES EFFECT ---
    { type: 'effect', name: 'outback-dust', count: 30 }
];
