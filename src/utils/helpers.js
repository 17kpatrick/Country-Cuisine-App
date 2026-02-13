// Fallback generator for countries not in detailed DB
window.getGenericRecipe = (countryName) => {
    return {
        dish: "Traditional Cuisine",
        ingredients: ["Local seasonal vegetables", "Rice or grain staple", "Regional protein (Fish/Meat)", "Local herbs and spices"],
        steps: [
            `Ask a local in ${countryName} for their grandmother's recipe.`,
            "Prepare ingredients fresh from the market.",
            "Cook slowly with love and care.",
            "Share with family and friends."
        ]
    };
};

// Image Proxy Engine
window.getDishImage = (dishName) => {
    if (!dishName || dishName === "Traditional Cuisine") return "https://tse2.mm.bing.net/th?q=delicious+food+meal&w=500&h=300&c=7&rs=1&p=0";
    return `https://tse2.mm.bing.net/th?q=${encodeURIComponent(dishName)}+food+dish+recipe&w=600&h=400&c=7&rs=1&p=0`;
};

// Image Proxy Engine for Ingredients
window.getIngredientImage = (ingredientName) => {
    return `https://tse2.mm.bing.net/th?q=${encodeURIComponent(ingredientName)}+food+ingredient&w=100&h=100&c=7&rs=1&p=0`;
};

// Clean up raw ingredient strings to get the core item (e.g. "1 kg Beef" -> "Beef")
window.parseIngredient = (rawIngredient) => {
    if (!rawIngredient) return "";
    
    // 1. Remove quantity and units (simple regex for common patterns)
    // Matches "1 kg", "1/2 cup", "2 tbsp", "large", etc.
    let cleaned = rawIngredient.replace(/^[\d\s/.\-\u00BC-\u00BE]+(kg|g|lb|oz|cup|tbsp|tsp|ml|l|can|bunch|clove|slice|piece|ear|rack|stick|packet|bag|large|small|medium)s?\s+/i, '');
    
    // 2. Remove leading numbers if units weren't caught (e.g. "2 Onions")
    cleaned = cleaned.replace(/^[\d\s/.\-\u00BC-\u00BE]+\s+/, '');

    // 3. Remove details in parentheses (e.g. "(chopped)")
    cleaned = cleaned.replace(/\s*\(.*?\)/g, '');

    // 4. Remove details after comma (e.g. "Onion, chopped")
    cleaned = cleaned.split(',')[0];

    // 5. Trim whitespace
    return cleaned.trim();
};

window.getUniqueIngredients = (db) => {
    const ingredients = new Set();
    Object.values(db).forEach(recipe => {
        if (recipe.ingredients) {
            recipe.ingredients.forEach(ing => {
                const parsed = parseIngredient(ing);
                if (parsed && parsed.length > 2) { // Filter out tiny junk
                    ingredients.add(parsed.toLowerCase()); // Store lower case for deduping
                }
            });
        }
    });
    
    // Return formatted title case sorted list
    return Array.from(ingredients).map(ing => ing.charAt(0).toUpperCase() + ing.slice(1)).sort();
};

// --- COUNTRY THEMES (FLAIRE) ---
const COUNTRY_THEMES = {
    'BRA': { primary: '#009c3b', secondary: '#ffdf00', gradient: 'linear-gradient(135deg, #009c3b 0%, #002776 100%)' },
    'USA': { primary: '#b22234', secondary: '#3c3b6e', gradient: 'linear-gradient(135deg, #3c3b6e 0%, #b22234 100%)' },
    'ITA': { primary: '#008c45', secondary: '#cd212a', gradient: 'linear-gradient(135deg, #008c45 0%, #cd212a 100%)' },
    'FRA': { primary: '#0055a4', secondary: '#ef4135', gradient: 'linear-gradient(135deg, #0055a4 0%, #ef4135 100%)' },
    'IND': { primary: '#ff9933', secondary: '#138808', gradient: 'linear-gradient(135deg, #ff9933 0%, #138808 100%)' },
    'JPN': { primary: '#bc002d', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #bc002d 0%, #1a1a1a 100%)' },
    'MEX': { primary: '#006847', secondary: '#ce1126', gradient: 'linear-gradient(135deg, #006847 0%, #ce1126 100%)' },
    'ESP': { primary: '#aa151b', secondary: '#f1bf00', gradient: 'linear-gradient(135deg, #aa151b 0%, #f1bf00 100%)' },
    'CHN': { primary: '#de2910', secondary: '#ffde00', gradient: 'linear-gradient(135deg, #de2910 0%, #ffde00 100%)' },
    'DEU': { primary: '#dd0000', secondary: '#ffce00', gradient: 'linear-gradient(135deg, #000000 0%, #dd0000 100%)' },
    'ARG': { primary: '#75aadb', secondary: '#fcbf49', gradient: 'linear-gradient(135deg, #75aadb 0%, #fcbf49 100%)' },
    'GRC': { primary: '#0d5eaf', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #0d5eaf 0%, #004c98 100%)' },
    'TUR': { primary: '#e30a17', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #e30a17 0%, #b00000 100%)' },
    'THA': { primary: '#a51931', secondary: '#2d2a4a', gradient: 'linear-gradient(135deg, #a51931 0%, #2d2a4a 100%)' },
    'VNM': { primary: '#da251d', secondary: '#ffff00', gradient: 'linear-gradient(135deg, #da251d 0%, #ffff00 100%)' },
    'KOR': { primary: '#0047a0', secondary: '#cd2e3a', gradient: 'linear-gradient(135deg, #0047a0 0%, #cd2e3a 100%)' },
    'ZAF': { primary: '#007749', secondary: '#e03c31', gradient: 'linear-gradient(135deg, #007749 0%, #e03c31 100%)' },
    'EGY': { primary: '#ce1126', secondary: '#c09300', gradient: 'linear-gradient(135deg, #ce1126 0%, #c09300 100%)' },
    'AUS': { primary: '#00008b', secondary: '#ff0000', gradient: 'linear-gradient(135deg, #00008b 0%, #ff0000 100%)' },
    'CAN': { primary: '#ff0000', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #ff0000 0%, #a00000 100%)' },
    'GBR': { primary: '#012169', secondary: '#c8102e', gradient: 'linear-gradient(135deg, #012169 0%, #c8102e 100%)' },
    'RUS': { primary: '#0039a6', secondary: '#d52b1e', gradient: 'linear-gradient(135deg, #0039a6 0%, #d52b1e 100%)' },
    'UKR': { primary: '#0057b8', secondary: '#ffd700', gradient: 'linear-gradient(135deg, #0057b8 0%, #ffd700 100%)' },
    'SWE': { primary: '#006aa7', secondary: '#fecc00', gradient: 'linear-gradient(135deg, #006aa7 0%, #fecc00 100%)' },
    'NOR': { primary: '#ba0c2f', secondary: '#00205b', gradient: 'linear-gradient(135deg, #ba0c2f 0%, #00205b 100%)' },
    'FIN': { primary: '#003580', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #003580 0%, #00205b 100%)' },
    'DNK': { primary: '#c60c30', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #c60c30 0%, #800000 100%)' },
    'IRL': { primary: '#169b62', secondary: '#ff883e', gradient: 'linear-gradient(135deg, #169b62 0%, #ff883e 100%)' },
    'JAM': { primary: '#009b3a', secondary: '#fed100', gradient: 'linear-gradient(135deg, #009b3a 0%, #fed100 100%)' },
    'CUB': { primary: '#002a8f', secondary: '#cf142b', gradient: 'linear-gradient(135deg, #002a8f 0%, #cf142b 100%)' },
    'PER': { primary: '#d91023', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #d91023 0%, #800000 100%)' },
    'COL': { primary: '#fcd116', secondary: '#003893', gradient: 'linear-gradient(135deg, #fcd116 0%, #003893 100%)' },
    'VEN': { primary: '#fcd116', secondary: '#cf142b', gradient: 'linear-gradient(135deg, #fcd116 0%, #cf142b 100%)' },
    'CHL': { primary: '#0039a6', secondary: '#d52b1e', gradient: 'linear-gradient(135deg, #0039a6 0%, #d52b1e 100%)' },
    'SAU': { primary: '#006c35', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #006c35 0%, #004d25 100%)' },
    'IRN': { primary: '#239f40', secondary: '#da0000', gradient: 'linear-gradient(135deg, #239f40 0%, #da0000 100%)' },
    'ISR': { primary: '#0038b8', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #0038b8 0%, #002080 100%)' },
    'IDN': { primary: '#ff0000', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #ff0000 0%, #b00000 100%)' },
    'MYS': { primary: '#010066', secondary: '#fcbd10', gradient: 'linear-gradient(135deg, #010066 0%, #fcbd10 100%)' },
    'PHL': { primary: '#0038a8', secondary: '#ce1126', gradient: 'linear-gradient(135deg, #0038a8 0%, #ce1126 100%)' },
    'SGP': { primary: '#ed2939', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #ed2939 0%, #b00000 100%)' },
    'NGA': { primary: '#008751', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #008751 0%, #005f3a 100%)' },
    'ETH': { primary: '#078930', secondary: '#da121a', gradient: 'linear-gradient(135deg, #078930 0%, #da121a 100%)' },
    'KEN': { primary: '#000000', secondary: '#bb0000', gradient: 'linear-gradient(135deg, #000000 0%, #bb0000 100%)' },
    'MAR': { primary: '#c1272d', secondary: '#006233', gradient: 'linear-gradient(135deg, #c1272d 0%, #006233 100%)' },
    'DZA': { primary: '#006233', secondary: '#d21034', gradient: 'linear-gradient(135deg, #006233 0%, #d21034 100%)' },
    'TUN': { primary: '#e70013', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #e70013 0%, #b00000 100%)' },
    'POL': { primary: '#dc143c', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #dc143c 0%, #a00000 100%)' },
    'PRT': { primary: '#006600', secondary: '#ff0000', gradient: 'linear-gradient(135deg, #006600 0%, #ff0000 100%)' },
    'NLD': { primary: '#ae1c28', secondary: '#21468b', gradient: 'linear-gradient(135deg, #ae1c28 0%, #21468b 100%)' },
    'BEL': { primary: '#000000', secondary: '#ef3340', gradient: 'linear-gradient(135deg, #000000 0%, #ef3340 100%)' },
    'CHE': { primary: '#d52b1e', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #d52b1e 0%, #a00000 100%)' },
    'AUT': { primary: '#ed2939', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #ed2939 0%, #a00000 100%)' },
};

window.getCountryTheme = (code) => {
    return COUNTRY_THEMES[code] || { primary: '#eab308', secondary: '#ffffff', gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' };
};

window.getRegionConfig = () => {
    return {
        'USA': {
            geoJsonUrl: 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json',
            view: { center: [37.8, -96], zoom: 4 }
        },
        'IND': {
            geoJsonUrl: 'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States',
            view: { center: [20.5937, 78.9629], zoom: 4 }
        },
        'CHN': {
            geoJsonUrl: 'https://gist.githubusercontent.com/songkeys/e0e3467a7e2ab1e571de9ed4296fbc2a/raw/China%20Province%20GeoJSON',
            view: { center: [35.8617, 104.1954], zoom: 4 }
        }
        // Example for future:
        // 'CAN': { geoJsonUrl: 'path/to/canada-provinces.json', view: { center: [56, -106], zoom: 4 } }
    };
};

// --- ARTISTIC FLAIRE CONFIGURATION ---
window.COUNTRY_FLAIRS = {
    // Flairs will be loaded from external config files (e.g., src/config/japan.js)
};