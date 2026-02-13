window.COUNTRY_FLAIRS = window.COUNTRY_FLAIRS || {};

/**
 * ===========================
 * BRAZIL — Neo Tropical v2
 * ===========================
 * Goals:
 * - High-fidelity silhouettes (Japan style)
 * - Majestic atmosphere
 * - modern typography (Sora)
 */
window.COUNTRY_FLAIRS["BRA"] = [
  // --- THEME: CINEMATIC JUNGLE (Realism) ---
  { type: "map-theme", name: "brazil-cinematic", tiles: "voyager" },

  // --- TITLE: MAJESTIC GOLD (Moved to Atlantic) ---
  {
    type: "text",
    lat: -20,
    lon: -30,
    content: "BRASIL",
    className: "brazil-title flair-fade-in",
    style: `
      font-size: 100px;
      opacity: 1;
      pointer-events: none;
      user-select: none;
    `,
    width: 600,
    height: 200,
  },

  // --- AMAZON RIVER: FLOWING LIFE ---
  {
    type: "polyline",
    points: [
      [-3.12, -73.2],
      [-3.2, -66.1],
      [-2.7, -60.0],
      [-2.4, -54.3],
      [-1.9, -49.0],
    ],
    style: {
      color: "#ffffff", /* Glowing Silver - No Blue */
      weight: 3,
      opacity: 0.8,
      lineCap: "round",
      lineJoin: "round",
      className: "amazon-river", /* Organic pulse */
    },
  },

  // --- LANDMARKS: GLOWING SILHOUETTES ---
  
  // Rio — Cristo Redentor (The Icon)
  {
    type: "svg",
    lat: -22.95,
    lon: -43.21,
    width: 70,
    height: 70,
    content: `
      <svg viewBox="0 0 100 100" class="flair-fade-in landmark-glow" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
        <!-- Rays -->
        <circle cx="50" cy="20" r="15" fill="rgba(255,255,255,0.2)" filter="blur(5px)" />
        <!-- Statue Silhouette -->
        <path d="M50 5 L55 15 H90 L95 25 H60 V85 H40 V25 H5 L10 15 H45 L50 5 Z" fill="#FFFFFF" stroke="#FFD700" stroke-width="1" />
      </svg>
    `,
  },

  // Manaus — Teatro Amazonas (The Dome)
  {
    type: "svg",
    lat: -3.1,
    lon: -60.0,
    width: 60,
    height: 45,
    content: `
      <svg viewBox="0 0 100 80" class="flair-fade-in landmark-glow" xmlns="http://www.w3.org/2000/svg">
        <!-- Dome -->
        <path d="M30 40 Q 50 10 70 40" fill="#FFD700" stroke="#FFFFFF" stroke-width="2" />
        <!-- Columns/Base -->
        <rect x="25" y="40" width="50" height="30" fill="#FFFFFF" />
        <line x1="35" y1="40" x2="35" y2="70" stroke="#FFD700" stroke-width="2" />
        <line x1="50" y1="40" x2="50" y2="70" stroke="#FFD700" stroke-width="2" />
        <line x1="65" y1="40" x2="65" y2="70" stroke="#FFD700" stroke-width="2" />
      </svg>
    `,
  },

  // Salvador — Elevador Lacerda (Art Deco Tower)
  {
    type: "svg",
    lat: -12.97,
    lon: -38.5,
    width: 40,
    height: 65,
    content: `
      <svg viewBox="0 0 60 100" class="flair-fade-in landmark-glow" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="20" height="80" fill="#FFFFFF" stroke="#FFD700" stroke-width="2" />
        <rect x="10" y="10" width="40" height="10" fill="#FFD700" />
      </svg>
    `,
  },

  // Brasília — Cathedral (Modernist Crown)
  {
    type: "svg",
    lat: -15.79,
    lon: -47.88,
    width: 60,
    height: 45,
    content: `
      <svg viewBox="0 0 100 80" class="flair-fade-in landmark-glow" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q 50 10 80 70" stroke="#FFFFFF" stroke-width="4" fill="none" />
        <path d="M35 70 Q 50 20 65 70" stroke="#FFFFFF" stroke-width="4" fill="none" />
        <path d="M50 70 V 30" stroke="#FFD700" stroke-width="2" />
      </svg>
    `,
  },

  // --- IDENTITY: THE AMAZON ---
  {
    type: "text",
    lat: -5,
    lon: -68, /* Moved further west to avoid Manaus overlap */
    content: "O PULMÃO DO MUNDO",
    className: "flair-fade-in",
    style: "font-family: 'Sora', sans-serif; font-weight: 800; font-size: 24px; color: rgba(255,255,255,0.2); text-align: center; line-height: 1.1; letter-spacing: 3px;",
    width: 300,
    height: 100
  },

  // --- EFFECTS (LUSHNESS + LIFE) ---
  { type: "effect", name: "canopy-mist" },
  { type: "effect", name: "macaw-flight" },
  { type: "effect", name: "amazon-fireflies" },
];