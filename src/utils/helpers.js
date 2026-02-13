// Global Staples (Assumed to be in pantry)
window.STAPLES = [
    'water', 'hot water', 'cold water', 'boiling water', 'warm water', 'ice', 'ice water', 'crushed ice', 'ice cubes',
    'salt', 'pepper', 'black pepper', 'kosher salt', 'sea salt', 'white pepper', 'coarse salt',
    'oil', 'vegetable oil', 'olive oil', 'canola oil', 'cooking oil', 'neutral oil', 'oil for frying', 'frying oil',
    'sugar', 'white sugar', 'granulated sugar', 'brown sugar', 'flour', 'all-purpose flour'
];

// Helper to check if an ingredient is a staple (fuzzy match)
window.isStaple = (ingredient) => {
    if (!ingredient) return false;
    const lower = ingredient.toLowerCase().trim();
    return window.STAPLES.some(s => lower === s || lower.includes(` ${s}`) || lower.includes(`${s} `) || lower === s + 's');
};

// Robust fuzzy matching for ingredients (handles "Gin" vs "Ginger")
window.isIngredientMatch = (ing1, ing2) => {
    if (!ing1 || !ing2) return false;
    const a = ing1.toLowerCase().trim();
    const b = ing2.toLowerCase().trim();
    
    if (a === b) return true;
    
    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Check if 'a' is a distinct word/phrase in 'b' (e.g. "Rice" in "Basmati Rice")
    if (new RegExp(`\\b${escape(a)}\\b`, 'i').test(b)) return true;
    
    // Check if 'b' is a distinct word/phrase in 'a'
    if (new RegExp(`\\b${escape(b)}\\b`, 'i').test(a)) return true;
    
    return false;
};

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
    
    let cleaned = rawIngredient;

    // 0. Remove "Label:" prefixes (e.g. "Sauce:", "Filling:", "Dough:")
    cleaned = cleaned.replace(/^[A-Za-z\s]+:\s*/, '');
    
    // 1. Remove quantity and units
    const units = [
        'kg', 'g', 'lb', 'oz', 'cup', 'tbsp', 'tsp', 'ml', 'l', 'can', 'bunch', 'clove', 'slice', 'piece', 
        'ear', 'rack', 'stick', 'packet', 'bag', 'head', 'stalk', 'strip', 'pinch', 'dash', 'bottle', 'jar',
        'liter', 'litre', 'quart', 'pint', 'gallon', 'gal', 'pound', 'ounce', 'fluid ounce', 'fl oz'
    ].join('|');
    cleaned = cleaned.replace(new RegExp(`^[\\d\\s/.\u00BC-\u00BE\\-]+(${units})s?\\s+`, 'i'), '');
    
    // 2. Remove leading numbers
    cleaned = cleaned.replace(/^[\d\s/.\-\u00BC-\u00BE]+\s+/, '');

    // 3. Convert parentheses to alternatives (e.g. "Cheese (Gruyere)" -> "Cheese or Gruyere")
    cleaned = cleaned.replace(/\s*\(/g, ' or ').replace(/\)/g, '');

    // 4. Remove details after comma
    cleaned = cleaned.split(',')[0];

    // 5. Replace slashes with ' or ' to support alternatives
    cleaned = cleaned.replace(/\//g, ' or ');

    // 6. Remove common prep/state/cut words (Case insensitive)
    const prepWords = [
        'Fresh', 'Dried', 'Dry', 'Frozen', 'Canned', 'Preserved',
        'Chopped', 'Minced', 'Diced', 'Sliced', 'Grated', 'Crushed', 'Peeled', 'Shredded', 'Beaten', 'Melted', 'Smashed', 'Toasted', 'Roasted', 'Fried', 'Boiled', 'Hard-boiled', 'Steamed', 'Poached', 'Baked', 'Smoked', 'Pickled', 'Fermented', 'Marinated', 'Blanched',
        'Large', 'Small', 'Medium', 'Whole', 'Raw', 'Cooked', 'Boneless', 'Skinless', 'Lean', 'Extra', 'Virgin',
        'Ground', 'Fillet', 'Steak', 'Chop', 'Rib', 'Shank', 'Shoulder', 'Belly', 'Loin', 'Brisket', 'Breast', 'Thigh', 'Wing', 'Leg', 'Bone', 'Skin', 'Head', 'Tail', 'Trotter', 'Liver', 'Heart', 'Kidney',
        'Paste', 'Powder', 'Sauce', 'Oil', 'Extract', 'Essence', 'Juice', 'Zest', 'Wedge', 'Cube', 'Chunk', 'Ring', 'Strip', 'Sheet', 'Leaf', 'Leaves', 'Stalk', 'Bulb', 'Clove', 'Sprig', 'Bunch', 'Frying', 'For Frying',
        'Optional', 'To Taste', 'Garnish', 'Decoration', 'Starchy', 'Waxy'
    ];
    
    // Sort prepWords by length descending to match longest phrases first
    prepWords.sort((a, b) => b.length - a.length);

    const prepRegex = new RegExp(`\\b(${prepWords.join('|')})\\b`, 'gi');
    cleaned = cleaned.replace(prepRegex, '');

    // 7. Trim and Singularize
    const exceptions = ['asparagus', 'couscous', 'hummus', 'molasses', 'bass', 'lens', 'swiss', 'grits', 'oats', 'chips'];
    
    // Split by ' or ' to handle alternatives created by parens or slashes so we singularize each part
    const parts = cleaned.split(/\s+or\s+/i);
    const processedParts = parts.map(part => {
        let p = part.trim();
        const lower = p.toLowerCase();
        
        if (!exceptions.some(ex => lower.endsWith(ex))) {
            if (p.match(/ies$/i)) {
                return p.replace(/ies$/i, 'y');
            } else if (p.match(/oes$/i)) {
                return p.replace(/oes$/i, 'o');
            } else if (p.match(/s$/i) && !p.match(/ss$/i)) {
                return p.replace(/s$/i, '');
            }
        }
        return p;
    });
    
    cleaned = processedParts.join(' or ');

    // 8. Final cleanup of extra spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    // 9. Cleanup "or" artifacts (e.g. "Milk or or" -> "Milk")
    cleaned = cleaned.replace(/\s+or(\s+or)+/gi, ' or ');
    cleaned = cleaned.replace(/^or\s+|\s+or$/gi, '');

    return cleaned;
};

window.getRecipeFromDB = (db, key) => {
    if (!db || !key) return null;
    // 1. Try direct access
    if (db[key]) return db[key];

    // 2. Try searching in regions of known countries
    for (const countryKey in db) {
        const country = db[countryKey];
        if (country.regions && country.regions[key]) {
            return country.regions[key];
        }
    }
    return null;
};

window.getUniqueIngredients = (db) => {
    const ingredients = new Set();
    
    const processRecipe = (recipe) => {
        if (recipe.ingredients) {
            recipe.ingredients.forEach(ing => {
                // Split by comma to handle grouped ingredients (e.g. "Flour, Water, Salt")
                const parts = ing.split(',');
                for (const part of parts) {
                    const parsed = parseIngredient(part);
                    if (parsed && parsed.length > 2) {
                        parsed.split(/\s+or\s+/i).forEach(p => ingredients.add(p.trim().toLowerCase()));
                    }
                }
            });
        }
        // Scan preliminary steps ingredients (food)
        if (recipe.preliminary_steps) {
            recipe.preliminary_steps.forEach(step => {
                if (step.ingredients) {
                    step.ingredients.forEach(ing => {
                        const parts = ing.split(',');
                        for (const part of parts) {
                            const parsed = parseIngredient(part);
                            if (parsed && parsed.length > 2) parsed.split(/\s+or\s+/i).forEach(p => ingredients.add(p.trim().toLowerCase()));
                        }
                    });
                }
            });
        }
        // Scan drink ingredients
        if (recipe.drink && recipe.drink.ingredients) {
            recipe.drink.ingredients.forEach(ing => {
                const parts = ing.split(',');
                for (const part of parts) {
                    const parsed = parseIngredient(part);
                    if (parsed && parsed.length > 2) {
                        parsed.split(/\s+or\s+/i).forEach(p => ingredients.add(p.trim().toLowerCase()));
                    }
                }
            });
        }
        // Scan preliminary steps ingredients (drink)
        if (recipe.drink && recipe.drink.preliminary_steps) {
            recipe.drink.preliminary_steps.forEach(step => {
                if (step.ingredients) {
                    step.ingredients.forEach(ing => {
                        const parts = ing.split(',');
                        for (const part of parts) {
                            const parsed = parseIngredient(part);
                            if (parsed && parsed.length > 2) parsed.split(/\s+or\s+/i).forEach(p => ingredients.add(p.trim().toLowerCase()));
                        }
                    });
                }
            });
        }
    };

    Object.values(db).forEach(recipe => {
        processRecipe(recipe);
        if (recipe.regions) {
            Object.values(recipe.regions).forEach(processRecipe);
        }
    });
    
    // Return formatted title case sorted list
    return Array.from(ingredients).map(ing => ing.charAt(0).toUpperCase() + ing.slice(1)).sort();
};

window.getAllRecipeIngredients = (recipe) => {
    const collect = (baseIngs, prelimSteps) => {
        let list = [];
        if (baseIngs) {
            baseIngs.forEach(ing => {
                ing.split(',').forEach(part => list.push(window.parseIngredient(part).toLowerCase()));
            });
        }
        if (prelimSteps) {
            prelimSteps.forEach(step => {
                if (step.ingredients) {
                    step.ingredients.forEach(ing => {
                        ing.split(',').forEach(part => list.push(window.parseIngredient(part).toLowerCase()));
                    });
                }
            });
        }
        return list;
    };

    const foodIngs = collect(recipe.ingredients, recipe.preliminary_steps);
    const drinkIngs = recipe.drink 
        ? collect(recipe.drink.ingredients, recipe.drink.preliminary_steps) 
        : [];
    
    return { foodIngs, drinkIngs };
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
        },
        'BRA': {
            geoJsonUrl: 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/brazil-states.geojson',
            view: { center: [-14.2350, -51.9253], zoom: 4 }
        }
        // Example for future:
        // 'CAN': { geoJsonUrl: 'path/to/canada-provinces.json', view: { center: [56, -106], zoom: 4 } }
    };
};

// --- ARTISTIC FLAIRE CONFIGURATION ---
window.COUNTRY_FLAIRS = {
    // Brazil theme removed as requested
};