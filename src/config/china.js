window.COUNTRY_FLAIRS = window.COUNTRY_FLAIRS || {};

window.COUNTRY_FLAIRS['CHN'] = [
    // Map Theme: Deep red/gold lacquer style
    { type: 'map-theme', name: 'china-imperial' },

    // --- THE GOLDEN DRAGON (Top Left) ---
    // Moved to Northwest to avoid obscuring the main provinces
    {
        type: 'svg',
        lat: 45, lon: 85,
        content: `
            <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="flair-fade-in" style="filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6));">
                <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#B8860B" />
                        <stop offset="50%" stop-color="#FFD700" />
                        <stop offset="100%" stop-color="#B8860B" />
                    </linearGradient>
                </defs>
                <!-- Sinuous Body -->
                <path d="M100 350 C 200 300, 150 150, 300 200 C 450 250, 400 50, 500 100" stroke="url(#goldGrad)" stroke-width="18" stroke-linecap="round" fill="none" />
                <!-- Scales Detail -->
                <path d="M100 350 C 200 300, 150 150, 300 200 C 450 250, 400 50, 500 100" stroke="#8B0000" stroke-width="2" stroke-dasharray="4 12" fill="none" opacity="0.7"/>
                <!-- Dragon Head Construction -->
                <g transform="translate(500, 100) rotate(-15)">
                    <path d="M0 0 L 40 -15 L 50 15 L 10 25 Z" fill="url(#goldGrad)" /> <!-- Snout -->
                    <path d="M40 -15 L 60 -35 L 45 -5 Z" fill="#FFD700" /> <!-- Horn -->
                    <path d="M50 15 L 40 35 L 20 25 Z" fill="#FFD700" /> <!-- Beard -->
                    <circle cx="30" cy="0" r="4" fill="#8B0000" /> <!-- Eye -->
                </g>
            </svg>`,
        width: 600, height: 400
    },

    // --- TITLE (Top Right) ---
    // "Zhōngguó" (China) - Vibrant Yellow, Glowing, Fades in first
    { 
        type: 'text', 
        lat: 40, lon: 112,
        content: '中国', 
        className: 'zhi-mang-xing-regular flair-fade-in',
        style: 'font-size: 100px; color: #ffcc00; text-shadow: 0 0 30px rgba(255, 50, 0, 0.9); font-weight: normal; opacity: 0; animation-delay: 0.5s;',
        width: 250, height: 120
    },

    // --- NEIGHBORS (Sinocentric View) ---
    // India -> Tianzhu (Heavenly Bamboo)
    {
        type: 'text',
        lat: 22, lon: 78,
        content: '天竺',
        style: 'font-size: 30px; color: #aaa; writing-mode: vertical-rl; opacity: 0.5; font-family: serif;',
        width: 50, height: 100
    },
    // Mongolia -> The Grasslands
    {
        type: 'text',
        lat: 47, lon: 106,
        content: '草原',
        style: 'font-size: 40px; color: #aaa; opacity: 0.5; font-family: serif; letter-spacing: 10px;',
        width: 200, height: 60
    },
    // Japan -> Fusang (Mythical East)
    {
        type: 'text',
        lat: 36, lon: 138,
        content: '扶桑',
        style: 'font-size: 30px; color: #aaa; writing-mode: vertical-rl; opacity: 0.5; font-family: serif;',
        width: 50, height: 100
    },

    // --- SOUTH CHINA SEA STARS (Pulsating) ---
    {
        type: 'svg',
        lat: 10, lon: 110,
        content: `
            <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
                <defs><filter id="starGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                <path class="star-pulse" d="M20 50 L25 35 L30 50 L45 55 L30 60 L25 75 L20 60 L5 55 Z" fill="#ff3333" style="filter: url(#starGlow); animation-delay: 0s;" />
                <path class="star-pulse" d="M80 30 L85 15 L90 30 L105 35 L90 40 L85 55 L80 40 L65 35 Z" fill="#ff3333" style="filter: url(#starGlow); animation-delay: 1s;" />
                <path class="star-pulse" d="M140 60 L145 45 L150 60 L165 65 L150 70 L145 85 L140 70 L125 65 Z" fill="#ff3333" style="filter: url(#starGlow); animation-delay: 2s;" />
            </svg>`,
        width: 150, height: 80
    },

    // --- POETRY (South China Sea) ---
    {
        type: 'svg',
        lat: 20, lon: 122,
        content: `
            <foreignObject width="350" height="200">
                <div xmlns="http://www.w3.org/1999/xhtml" class="flair-fade-in" style="font-family: 'Long Cang', cursive; color: #ffddaa; font-size: 24px; text-shadow: 2px 2px 4px #000; text-align: right; line-height: 1.4; opacity: 0; animation-delay: 2.5s;">
                    举杯邀明月<br>
                    对影成三人<br>
                    <span class="noto-serif-sc-regular" style="font-size: 14px; opacity: 0.9; color: #ddd; font-style: italic; display: block; margin-top: 8px;">
                        "Raising my cup, I invite the Moon,<br>
                        And my shadow makes three."<br>
                        - Li Bai
                    </span>
                </div>
            </foreignObject>`,
        width: 350, height: 200
    },

    // --- EFFECT (Lanterns) ---
    { type: 'effect', name: 'lanterns-rise' }
];