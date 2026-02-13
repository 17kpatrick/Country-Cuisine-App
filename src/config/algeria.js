window.COUNTRY_FLAIRS = window.COUNTRY_FLAIRS || {};

window.COUNTRY_FLAIRS['DZA'] = [
    // Map Theme
    { type: 'map-theme', name: 'algeria-sahara' },

    // --- CONSTELLATION LINES ---
    // Connects the cultural points
    {
        type: 'polyline',
        points: [ [36.78, 3.06], [34.5, -1.5], [35.48, 6.47], [36.78, 3.06] ],
        style: {
            className: 'constellation-line',
        }
    },

    // --- CORE SYMBOLS (CENTERPIECE) ---
    // Hand of Fatima (Khamsa) over Algiers - Smaller, with a glow
    {
        type: 'svg',
        lat: 36.78, lon: 3.06,
        content: `
            <svg viewBox="0 0 100 100" fill="#87CEEB" xmlns="http://www.w3.org/2000/svg" class="flair-icon flair-pulse">
                <defs><filter id="glow"><feGaussianBlur stdDeviation="3.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                <path d="M50 90 C 20 90, 20 60, 20 50 C 20 20, 50 10, 50 10 C 50 10, 80 20, 80 50 C 80 60, 80 90, 50 90 Z" stroke="#FFFFFF" stroke-width="5" style="filter: url(#glow);" />
                <circle cx="50" cy="50" r="8" fill="#FFFFFF"/>
                <circle cx="50" cy="50" r="4" fill="#006233"/>
            </svg>`,
        width: 40, height: 40
    },

    // Main Title "Al-Jazā'ir" - Central, elegant
    {
        type: 'text',
        lat: 33, lon: 2.5,
        content: 'الجزائر',
        className: 'noto-naskh-arabic-bold flair-fade-in',
        style: 'font-size: 90px; color: #FFFFFF; text-shadow: 0 0 10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 100, 51, 0.5); pointer-events: none;',
        width: 200, height: 100
    },

    // --- SATELLITE CULTURAL POINTS ---
    // Abstract Raï Music Soundwave near Oran
    {
        type: 'svg',
        lat: 35.0, lon: -1.5,
        content: `
            <svg viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-icon flair-fade-in">
                <path d="M0 25 H20 L30 15 L40 35 L50 25 H 70 L80 10 L90 40 L100 25 H120 L130 20 L140 30 L150 25 H200" stroke="#D21034" stroke-width="4" style="filter: drop-shadow(0 0 5px #D21034);"/>
            </svg>`,
        width: 100, height: 30
    },

    // Roman Ruins at Timgad
    {
        type: 'svg',
        lat: 35.48, lon: 7.2,
        content: `
            <svg viewBox="0 0 100 100" fill="#D2B48C" xmlns="http://www.w3.org/2000/svg" class="flair-icon flair-fade-in" style="opacity: 0.9;">
                 <rect x="20" y="30" width="10" height="60" rx="2" style="filter: drop-shadow(0 0 3px #000)"/>
                <rect x="45" y="40" width="10" height="50" rx="2" style="filter: drop-shadow(0 0 3px #000)"/>
                <rect x="70" y="20" width="10" height="70" rx="2" style="filter: drop-shadow(0 0 3px #000)"/>
            </svg>`,
        width: 35, height: 35
    },

    // Berber "Yaz" Symbol (ⵣ) integrated into the Sahara
    {
        type: 'svg',
        lat: 28, lon: 5,
        content: `
            <svg viewBox="0 0 100 100" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" class="flair-icon flair-fade-in">
                <text x="50" y="65" font-family="serif" font-size="80" text-anchor="middle" style="opacity: 0.3; mix-blend-mode: overlay;">ⵣ</text>
            </svg>`,
        width: 50, height: 50
    },

    // --- ATMOSPHERIC ELEMENTS ---
    // Poetic Verse (fading in and out)
    {
        type: 'text',
        lat: 23, lon: -4,
        content: '"The past resembles the future more than one drop of water resembles another."<br> - Ibn Khaldun',
        className: 'cinzel-decorative-regular flair-poem',
        style: 'font-size: 16px; color: #FFFFFF; text-align: center; font-style: italic; text-shadow: 0 0 8px #000;',
        width: 250, height: 50
    },
    
    // Subtle Crescent and Star Background
    {
        type: 'svg',
        lat: 29, lon: 3,
        content: `
            <svg viewBox="0 0 100 100" fill="#D21034" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 95C25.1472 95 5 74.8528 5 50C5 25.1472 25.1472 5 50 5C74.8528 5 95 25.1472 95 50C95 74.8528 74.8528 95 50 95ZM50 85C69.33 85 85 69.33 85 50C85 30.67 69.33 15 50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85Z"/>
                <path d="M68.49 58.49L59.26 52.5L50 58.49L53.13 48.11L45.27 41.51H56.02L59.26 31L62.5 41.51H73.25L65.39 48.11L68.49 58.49Z"/>
            </svg>`,
        width: 400, height: 400,
        style: 'opacity: 0.05; pointer-events: none; mix-blend-mode: overlay;'
    },

    // Floating Sand and Poem Effect
    { type: 'effect', name: 'sand-dust-devils' }
];