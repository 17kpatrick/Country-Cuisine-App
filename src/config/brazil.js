window.COUNTRY_FLAIRS = window.COUNTRY_FLAIRS || {};

// Editorial Brazil: one hero (Amazon), one title, one motto, two landmarks. No floating effects.
window.COUNTRY_FLAIRS['BRA'] = [
    { type: 'map-theme', name: 'brazil-cinematic' },

    // --- HERO: Amazon River ---
    {
        type: 'polyline',
        points: [
            [-4.5, -69], [-3.5, -65], [-3.12, -60.02], [-2.2, -55], [-1.45, -48.49],
            [-2.53, -44.30], [-3, -42], [-2.8, -38]
        ],
        style: {
            color: '#00c853',
            weight: 5,
            opacity: 0.9,
            className: 'amazon-river-line',
        },
    },

    // --- TITLE + MOTTO (styles in themes.css) ---
    {
        type: 'text',
        lat: -10,
        lon: -50,
        content: 'Brasil',
        className: 'brazil-hero-title flair-fade-in',
        style: '',
        width: 320,
        height: 96,
    },
    {
        type: 'text',
        lat: -12.5,
        lon: -50,
        content: 'Ordem e Progresso',
        className: 'flair-fade-in brazil-motto',
        style: 'opacity: 0;',
        width: 280,
        height: 28,
    },

    // --- LANDMARKS: Cristo + Sugarloaf (one soft shadow, flair-fade-in) ---
    {
        type: 'svg',
        lat: -22.95,
        lon: -43.21,
        content: `
            <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in brazil-landmark" style="animation-delay: 0.7s;">
                <path d="M30 2 L30 72" stroke="#f5f0e8" stroke-width="2" stroke-linecap="round" opacity="0.88"/>
                <path d="M30 8 L18 78 L28 78 L30 72 L32 78 L42 78 Z" fill="#f5f0e8" opacity="0.88"/>
                <ellipse cx="30" cy="16" rx="10" ry="5" fill="#f5f0e8" opacity="0.88"/>
            </svg>`,
        width: 36,
        height: 64,
    },
    {
        type: 'svg',
        lat: -22.98,
        lon: -43.52,
        content: `
            <svg viewBox="0 0 50 65" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in brazil-landmark" style="animation-delay: 0.85s;">
                <path d="M25 4 L44 62 H6 Z" fill="#5a6570"/>
                <path d="M25 4 L34 42 L25 62 L16 42 Z" fill="#6a7580"/>
            </svg>`,
        width: 22,
        height: 30,
    },

    // --- PARCHMENT QUOTE CARD (far right, over ocean — no overlap with BRASIL or landmarks) ---
    {
        type: 'text',
        lat: -16,
        lon: -8,
        iconAnchor: [260, 230],
        content: `
            <div class="brazil-parchment-wrap-inner">
                <div class="brazil-parchment-macaw" aria-hidden="true">
                    <svg viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 38 L18 34 L24 32 L30 34 L36 30 L42 28 L48 26 L52 22 L56 18 L58 14 L60 12 L64 14 L66 18 L66 22 L64 26 L60 30 L54 34 L48 38 L40 42 L28 44 L18 42 L14 38 Z" fill="#006633"/>
                        <path d="M60 12 L76 6 L80 12 L76 18 L62 16 Z" fill="#006633"/>
                        <path d="M52 22 L66 16 L70 20 L66 26 L52 24 Z" fill="#E85D04"/>
                        <path d="M64 16 L72 12 L76 16 L72 20 Z" fill="#FFB703"/>
                        <circle cx="66" cy="18" r="3" fill="#0d2818"/>
                        <path d="M14 38 L10 42 L12 44 L16 42 L20 40 L24 42 L26 46 L28 44 L26 40 L30 38 L34 40 L36 44 L38 42 L36 38" stroke="#005522" stroke-width="1.2" fill="none" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="brazil-parchment-card">
                    <p class="brazil-parchment-quote">"A vida é a arte do encontro."</p>
                    <span class="brazil-parchment-attribution">— Vinicius de Moraes</span>
                    <div class="brazil-parchment-crocs">
                        <svg class="brazil-croc brazil-croc-left" viewBox="0 0 80 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M2 15 L6 14 L12 12 L16 10 L18 12 L22 11 L28 12 L34 11 L40 12 L46 11 L52 12 L58 11 L64 12 L70 11 L76 12 L80 14 L78 16 L72 15 L64 16 L56 15 L48 16 L40 15 L32 16 L24 15 L16 16 L8 15 L2 16 Z" fill="#164330"/>
                            <circle cx="14" cy="11" r="1.5" fill="#0d2818"/>
                            <path d="M12 16 L12 21 L16 21 L16 16 M28 16 L28 21 L32 21 L32 16 M44 16 L44 21 L48 21 L48 16 M60 16 L60 21 L64 21 L64 16" fill="#164330"/>
                        </svg>
                        <svg class="brazil-croc brazil-croc-right" viewBox="0 0 80 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M78 15 L74 14 L68 12 L64 10 L62 12 L58 11 L52 12 L46 11 L40 12 L34 11 L28 12 L22 11 L18 12 L16 10 L12 12 L6 14 L2 14 L0 14 L2 16 L8 15 L16 16 L24 15 L32 16 L40 15 L48 16 L56 15 L64 16 L72 15 L78 16 Z" fill="#164330"/>
                            <circle cx="66" cy="11" r="1.5" fill="#0d2818"/>
                            <path d="M68 16 L68 21 L64 21 L64 16 M56 16 L56 21 L52 21 L52 16 M44 16 L44 21 L40 21 L40 16 M32 16 L32 21 L28 21 L28 16" fill="#164330"/>
                        </svg>
                    </div>
                </div>
            </div>`,
        className: 'brazil-parchment-wrap',
        style: 'background: transparent; border: none;',
        width: 260,
        height: 240,
    },
];
