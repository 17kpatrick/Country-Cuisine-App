// Global Staples (Assumed to be in pantry)
window.STAPLES = [
    // Water variants
    'water', 'hot water', 'cold water', 'boiling water', 'warm water', 'ice', 'ice water', 'crushed ice', 'ice cubes',
    // Salt variants
    'salt', 'pepper', 'black pepper', 'kosher salt', 'sea salt', 'white pepper', 'coarse salt', 'table salt',
    // Oil variants
    'oil', 'vegetable oil', 'olive oil', 'canola oil', 'cooking oil', 'neutral oil', 'oil for frying', 'frying oil',
    // Sugar and flour
    'sugar', 'white sugar', 'granulated sugar', 'brown sugar', 'flour', 'all-purpose flour', 'plain flour'
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

    // 0. Remove ALL leading junk: list markers (-, *, •), whitespace, etc.
    cleaned = cleaned.replace(/^[\s\-*•·→⋅,;]+/, '').trim();

    // 0a. Remove "Label:" prefixes (e.g. "Sauce:", "Filling:", "Dough:")
    cleaned = cleaned.replace(/^[A-Za-z\s]+:\s*/, '').trim();

    // Units list - comprehensive
    const units = [
        'kg', 'g', 'lb', 'lbs', 'oz', 'cup', 'cups', 'tbsp', 'tablespoon', 'tablespoons', 'tsp', 'teaspoon', 'teaspoons',
        'ml', 'milliliter', 'milliliters', 'l', 'liter', 'litre', 'litres', 'liters',
        'can', 'cans', 'bunch', 'bunches', 'clove', 'cloves', 'slice', 'slices', 'piece', 'pieces',
        'ear', 'ears', 'rack', 'racks', 'stick', 'sticks', 'packet', 'packets', 'bag', 'bags',
        'head', 'heads', 'stalk', 'stalks', 'strip', 'strips', 'pinch', 'dash',
        'bottle', 'bottles', 'jar', 'jars', 'quart', 'quarts', 'pint', 'pints', 'gallon', 'gallons', 'gal',
        'pound', 'pounds', 'ounce', 'ounces', 'fluid ounce', 'fl oz'
    ];

    // 1. Remove parenthetical content that contains measurements (e.g. "(120 ml)" or "(optional)")
    cleaned = cleaned.replace(/\([^)]*\)/g, '');

    // 2. Split by comma first to remove preparation notes
    cleaned = cleaned.split(',')[0].trim();

    // 3. Aggressively remove ALL number + unit patterns (anywhere in string, multiple passes)
    const unitsPattern = units.join('|');
    const measurementRegex = new RegExp(`\\b[\\d\\s/.\u00BC-\u00BE\\-]+(${unitsPattern})s?\\b`, 'gi');
    cleaned = cleaned.replace(measurementRegex, ' ');

    // 4. Remove standalone numbers, percentages, and symbols at the start (e.g. "2 Eggs", "100%", "% something")
    cleaned = cleaned.replace(/^[\d\s/.\u00BC-\u00BE\-%]+/, '').trim();

    // 5. Remove "of" patterns (e.g. "of coconut" -> "coconut")
    cleaned = cleaned.replace(/\b(of|from)\s+/gi, '').trim();

    // 6. Replace slashes with ' or ' to support alternatives
    cleaned = cleaned.replace(/\//g, ' or ');

    // 7. Remove common prep/state/cut words AND variety/type descriptors (Case insensitive)
    const prepWords = [
        // Temperature & State
        'Fresh', 'Dried', 'Dry', 'Frozen', 'Canned', 'Preserved', 'Hot', 'Cold', 'Warm', 'Cool', 'Room Temperature',
        // Preparation Methods
        'Chopped', 'Minced', 'Diced', 'Sliced', 'Grated', 'Crushed', 'Peeled', 'Shredded', 'Beaten', 'Melted', 'Smashed', 'Toasted', 'Roasted', 'Fried', 'Boiled', 'Hard-boiled', 'Steamed', 'Poached', 'Baked', 'Smoked', 'Pickled', 'Fermented', 'Marinated', 'Blanched',
        // Size & Quality
        'Large', 'Small', 'Medium', 'Whole', 'Raw', 'Cooked', 'Boneless', 'Skinless', 'Lean', 'Extra', 'Virgin', 'Premium', 'Quality', 'Grade',
        // Cuts & Parts
        'Ground', 'Fillet', 'Steak', 'Chop', 'Rib', 'Shank', 'Shoulder', 'Belly', 'Loin', 'Brisket', 'Breast', 'Thigh', 'Wing', 'Leg', 'Bone', 'Skin', 'Head', 'Tail', 'Trotter', 'Liver', 'Heart', 'Kidney',
        // Forms
        'Paste', 'Powder', 'Sauce', 'Oil', 'Extract', 'Essence', 'Juice', 'Zest', 'Wedge', 'Cube', 'Chunk', 'Ring', 'Strip', 'Sheet', 'Leaf', 'Leaves', 'Stalk', 'Bulb', 'Clove', 'Sprig', 'Bunch', 'Frying', 'For Frying',
        // Coffee Varieties
        'Robusta', 'Arabica', 'Colombian', 'Ethiopian', 'Espresso', 'Instant', 'Brewed', 'Ground Coffee',
        // Rice Varieties
        'Basmati', 'Jasmine', 'Arborio', 'Sushi', 'Long-grain', 'Short-grain', 'Medium-grain', 'Wild',
        // Cheese & Dairy Descriptors
        'Aged', 'Sharp', 'Mild', 'Creamy', 'Full-fat', 'Low-fat', 'Non-fat', 'Skim',
        // General Descriptors
        'Optional', 'To Taste', 'Garnish', 'Decoration', 'Starchy', 'Waxy', 'Store-bought', 'Homemade', 'Organic', 'Natural', 'Artificial', 'Pure', 'Imported', 'Local', 'Domestic'
    ];
    
    // Sort prepWords by length descending to match longest phrases first
    prepWords.sort((a, b) => b.length - a.length);

    const prepRegex = new RegExp(`\\b(${prepWords.join('|')})\\b`, 'gi');
    cleaned = cleaned.replace(prepRegex, '');

    // 8. Trim and Singularize
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

    // 9. Final cleanup of extra spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    // 10. Cleanup "or" artifacts (e.g. "Milk or or" -> "Milk")
    cleaned = cleaned.replace(/\s+or(\s+or)+/gi, ' or ');
    cleaned = cleaned.replace(/^or\s+|\s+or$/gi, '');

    // 11. Remove any remaining standalone numbers, percentages, or measurements
    cleaned = cleaned.replace(/\b\d+%?\b/g, '').trim();
    cleaned = cleaned.replace(/^\%+/, '').trim();  // Remove leading %
    cleaned = cleaned.replace(/\%+$/, '').trim();  // Remove trailing %

    // 12. Strip ALL leading and trailing punctuation, symbols, and whitespace
    cleaned = cleaned.replace(/^[\s\-*•·→⋅,;:.!?'"()\[\]{}%#@&]+/, '');
    cleaned = cleaned.replace(/[\s\-*•·→⋅,;:.!?'"()\[\]{}%#@&]+$/, '');
    cleaned = cleaned.trim();

    // 13. Validation: reject if result is too short, just numbers, or invalid
    if (cleaned.length < 3) return "";
    if (/^\d+%?$/.test(cleaned)) return ""; // Just a number or percentage
    if (/^[^\w\s]+$/.test(cleaned)) return ""; // Just special characters
    if (/^(block|soft|hard|firm|extra|super|light|dark|heavy)$/i.test(cleaned)) return ""; // Descriptors only

    // 14. Reject common non-ingredient words that might slip through
    const invalidResults = ['into', 'cut', 'to', 'for', 'with', 'from', 'at', 'in', 'on', 'by', 'about', 'like', 'through', 'over', 'before', 'between', 'after', 'since', 'of', 'the', 'a', 'an', 'and', 'or', 'as', 'per', 'each', 'all', 'some', 'any', 'few'];
    if (invalidResults.includes(cleaned.toLowerCase())) return "";

    // 15. Reject if it's just a prep word that slipped through
    if (prepWords.some(w => w.toLowerCase() === cleaned.toLowerCase())) return "";

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
                const parsed = window.parseIngredient(ing);
                if (parsed && parsed.length > 2) {
                    parsed.split(/\s+or\s+/i).forEach(p => {
                        // Aggressive normalization: strip punctuation, lowercase, trim
                        let normalized = p.trim().toLowerCase();
                        normalized = normalized.replace(/^[\s\-*•·→⋅,;:.!?'"()\[\]{}%#@&]+/, '');
                        normalized = normalized.replace(/[\s\-*•·→⋅,;:.!?'"()\[\]{}%#@&]+$/, '');
                        normalized = normalized.replace(/^\d+%?/, ''); // Remove leading numbers/percentages
                        normalized = normalized.trim();
                        // Only add if it's at least 3 characters and contains letters
                        if (normalized.length > 2 && /[a-z]/.test(normalized)) ingredients.add(normalized);
                    });
                }
            });
        }
        // Scan preliminary steps ingredients (food)
        if (recipe.preliminary_steps) {
            recipe.preliminary_steps.forEach(step => {
                if (step.ingredients) {
                    step.ingredients.forEach(ing => {
                        const parsed = window.parseIngredient(ing);
                        if (parsed && parsed.length > 2) {
                            parsed.split(/\s+or\s+/i).forEach(p => {
                                let normalized = p.trim().toLowerCase();
                                normalized = normalized.replace(/^[\s\-*•·→⋅,;:.!?'"()\[\]{}%#@&]+/, '');
                                normalized = normalized.replace(/[\s\-*•·→⋅,;:.!?'"()\[\]{}%#@&]+$/, '');
                                normalized = normalized.replace(/^\d+%?/, '');
                                normalized = normalized.trim();
                                if (normalized.length > 2 && /[a-z]/.test(normalized)) ingredients.add(normalized);
                            });
                        }
                    });
                }
            });
        }
        // Scan drink ingredients
        if (recipe.drink && recipe.drink.ingredients) {
            recipe.drink.ingredients.forEach(ing => {
                const parsed = window.parseIngredient(ing);
                if (parsed && parsed.length > 2) {
                    parsed.split(/\s+or\s+/i).forEach(p => {
                        let normalized = p.trim().toLowerCase();
                        normalized = normalized.replace(/^[\s\-*•·→⋅,;:.!?'"()\[\]{}]+/, '');
                        normalized = normalized.replace(/[\s\-*•·→⋅,;:.!?'"()\[\]{}]+$/, '');
                        normalized = normalized.trim();
                        if (normalized.length > 2) ingredients.add(normalized);
                    });
                }
            });
        }
        // Scan preliminary steps ingredients (drink)
        if (recipe.drink && recipe.drink.preliminary_steps) {
            recipe.drink.preliminary_steps.forEach(step => {
                if (step.ingredients) {
                    step.ingredients.forEach(ing => {
                        const parsed = window.parseIngredient(ing);
                        if (parsed && parsed.length > 2) {
                            parsed.split(/\s+or\s+/i).forEach(p => {
                                let normalized = p.trim().toLowerCase();
                                normalized = normalized.replace(/^[\s\-*•·→⋅,;:.!?'"()\[\]{}%#@&]+/, '');
                                normalized = normalized.replace(/[\s\-*•·→⋅,;:.!?'"()\[\]{}%#@&]+$/, '');
                                normalized = normalized.replace(/^\d+%?/, '');
                                normalized = normalized.trim();
                                if (normalized.length > 2 && /[a-z]/.test(normalized)) ingredients.add(normalized);
                            });
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
                // Don't split by comma - comma separates ingredient from prep method
                const parsed = window.parseIngredient(ing).toLowerCase();
                if (parsed) list.push(parsed);
            });
        }
        if (prelimSteps) {
            prelimSteps.forEach(step => {
                if (step.ingredients) {
                    step.ingredients.forEach(ing => {
                        const parsed = window.parseIngredient(ing).toLowerCase();
                        if (parsed) list.push(parsed);
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

// --- SHOPPING LIST (tested in tests/shoppingList.test.js) ---
window.shoppingListAdd = (currentList, newItems) => {
    const newItemsFiltered = newItems.filter(item => !currentList.includes(item));
    if (newItemsFiltered.length === 0) return currentList;
    return [...currentList, ...newItemsFiltered];
};
window.shoppingListRemove = (currentList, item) => currentList.filter(i => i !== item);
window.shoppingListClear = () => [];

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
            view: { center: [-12, -38], zoom: 4 }
        },
        'DNK': {
            geoJsonUrl: 'https://gist.githubusercontent.com/PernilleMatthews/70fd81c96b3572e5494603b07eda250f/raw/regioner_geo.json',
            view: { center: [56.2, 10.5], zoom: 6 }
        },
        'FRA': {
            geoJsonUrl: 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-avec-outre-mer.geojson',
            view: { center: [46.6, 1.9], zoom: 5.5 }
        },
        'ITA': {
            geoJsonUrl: 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson',
            view: { center: [42.5, 12.5], zoom: 5.5 }
        },
        'GRC': {
            geoJsonUrl: 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/greece-regions.geojson',
            view: { center: [38.5, 23.5], zoom: 6 }
        },
        'MEX': {
            geoJsonUrl: 'https://raw.githubusercontent.com/strotgen/mexico-leaflet/master/states.geojson',
            view: { center: [23.6, -102.5], zoom: 4 }
        },
        'SLV': {
            geoJsonUrl: 'https://raw.githubusercontent.com/eaguilarjz/elsalvador/master/dptoA_WGS_1984.json',
            view: { center: [13.7, -88.9], zoom: 7 }
        }
    };
};

// --- PRIMARY MEAT / PROTEIN ANALYSIS ENGINE ---
window.MEAT_CATEGORIES = {
    'Chicken': {
        keywords: [
            'chicken', 'poultry', 'hen', 'fowl', 'turkey',
            'chicken breast', 'chicken thigh', 'chicken wing', 'chicken leg',
            'chicken drumstick', 'whole chicken'
        ],
        color: '#f59e0b',
        icon: '\u{1F414}'
    },
    'Beef': {
        keywords: [
            'beef', 'cattle', 'veal', 'steer', 'ox', 'oxtail', 'brisket',
            // Cuts
            'steak', 'ribeye', 'rib eye', 'sirloin', 'chuck', 'flank',
            'tenderloin', 'filet mignon', 'fillet', 'rump', 'round',
            't-bone', 'porterhouse', 'strip steak', 'skirt steak',
            'hanger steak', 'tri-tip', 'short rib',
            // Preparations
            'ground beef', 'beef roast', 'corned beef', 'beef shank',
            'beef cheek', 'beef tongue', 'suet'
        ],
        color: '#dc2626',
        icon: '\u{1F42E}'
    },
    'Pork': {
        keywords: [
            'pork', 'ham', 'bacon', 'lard', 'prosciutto', 'pancetta',
            'chorizo', 'sausage', 'lardon', 'lardons', 'guanciale', 'pig',
            // Cuts
            'pork belly', 'pork shoulder', 'pork chop', 'pork loin',
            'pork tenderloin', 'pork butt', 'pork knuckle', 'pork rib',
            'spare rib', 'baby back',
            // Preparations
            'ground pork', 'salt pork', 'fatback', 'bratwurst',
            'kielbasa', 'andouille', 'salami', 'pepperoni', 'mortadella',
            'hot dog', 'frankfurter'
        ],
        color: '#f472b6',
        icon: '\u{1F437}'
    },
    'Lamb/Goat': {
        keywords: [
            'lamb', 'mutton', 'goat', 'sheep', 'kid meat',
            'lamb shank', 'lamb shoulder', 'lamb chop', 'rack of lamb',
            'lamb leg', 'ground lamb', 'lamb loin',
            'ground goat', 'goat leg', 'goat shoulder'
        ],
        color: '#a855f7',
        icon: '\u{1F411}'
    },
    'Fish/Seafood': {
        keywords: [
            'fish', 'salmon', 'tuna', 'cod', 'shrimp', 'prawn',
            'crab', 'lobster', 'clam', 'mussel', 'oyster', 'squid',
            'octopus', 'anchovy', 'anchovies', 'sardine', 'mackerel',
            'tilapia', 'snapper', 'bass', 'trout', 'halibut', 'swordfish',
            'crawfish', 'crayfish', 'scallop', 'calamari', 'seafood',
            'conch', 'grouper', 'catfish', 'perch', 'herring', 'haddock',
            'pollock', 'mahi', 'barramundi', 'dogfish', 'shark', 'eel',
            'bream', 'kingfish', 'snail', 'escargot', 'saltfish', 'salt cod',
            'stockfish', 'bacalao', 'bacalhau', 'pike', 'carp', 'whiting',
            'monkfish', 'sea bream', 'red snapper', 'wahoo', 'marlin'
        ],
        color: '#06b6d4',
        icon: '\u{1F41F}'
    },
    'Duck/Game': {
        keywords: [
            'duck', 'goose', 'venison', 'rabbit', 'quail', 'pheasant',
            'bison', 'elk', 'boar', 'game', 'pigeon', 'guinea fowl',
            'duck leg', 'duck breast', 'duck fat', 'foie gras',
            'kangaroo', 'ostrich', 'wild boar', 'hare'
        ],
        color: '#84cc16',
        icon: '\u{1F986}'
    },
    'Vegetarian': {
        keywords: [],
        color: '#10b981',
        icon: '\u{1F331}'
    },
    'No Data': {
        keywords: [],
        color: '#374151',
        icon: '\u{2753}'
    }
};

window.analyzeMeatForRecipe = (recipe) => {
    if (!recipe) return null;
    if (!recipe.ingredients && !recipe.preliminary_steps) return null;

    const scores = {};
    Object.keys(window.MEAT_CATEGORIES).forEach(cat => {
        if (cat !== 'Vegetarian' && cat !== 'No Data') scores[cat] = 0;
    });

    // Collect ALL ingredient lines: main + preliminary_steps
    const allIngLines = [...(recipe.ingredients || [])];
    if (recipe.preliminary_steps) {
        recipe.preliminary_steps.forEach(ps => {
            if (ps.ingredients) allIngLines.push(...ps.ingredients);
        });
    }

    // Analyze each ingredient line individually for context
    allIngLines.forEach(rawIng => {
        const ing = rawIng.toLowerCase();

        // Handle "X or Y" alternatives: only score the first (preferred) option
        const alternatives = ing.split(/\s+or\s+/);
        const textToScore = alternatives[0];

        // Downweight cooking fats -- "lard" or "duck fat" as a cooking medium
        // doesn't mean the dish IS that protein
        const isCookingFat = /\b(lard|duck fat|bacon fat|schmaltz|dripping)\b/i.test(textToScore)
            && /\b(for frying|for cooking|tablespoon|tbsp|tsp|teaspoon)\b/i.test(ing);

        // Ambiguous cuts: "steak", "tenderloin", "fillet", "roast", "chop", "rib"
        // can belong to multiple animals. Check if a more specific animal word
        // is on the same line to avoid mis-attribution.
        const ambiguousBeefCuts = ['steak', 'tenderloin', 'fillet', 'roast', 'short rib'];
        const lineHasFish = /\b(fish|salmon|tuna|cod|swordfish|halibut|mahi|snapper|grouper|bass)\b/i.test(textToScore);
        const lineHasPork = /\bpork\b/i.test(textToScore);
        const lineHasLamb = /\b(lamb|mutton|goat)\b/i.test(textToScore);

        Object.entries(window.MEAT_CATEGORIES).forEach(([category, data]) => {
            if (category === 'Vegetarian' || category === 'No Data') return;
            data.keywords.forEach(keyword => {
                const regex = new RegExp('\\b' + keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                if (regex.test(textToScore)) {
                    // Context-aware sausage
                    if (keyword === 'sausage') {
                        if (/chicken|turkey|poultry/i.test(ing)) return;
                        if (/lamb|mutton/i.test(ing)) return;
                        if (/beef/i.test(ing)) return;
                    }
                    // Don't credit Beef for ambiguous cuts when another animal is specified
                    if (category === 'Beef' && ambiguousBeefCuts.includes(keyword)) {
                        if (lineHasFish || lineHasPork || lineHasLamb) return;
                    }
                    scores[category] += isCookingFat ? 0.25 : 1;
                }
            });
        });
    });

    // If no meat found in ingredients, scan description as a fallback
    // (catches "meat filling", "chicken stew", "lamb braise" etc in descriptions)
    const totalFromIngs = Object.values(scores).reduce((a, b) => a + b, 0);
    if (totalFromIngs === 0 && recipe.description) {
        const desc = recipe.description.toLowerCase();
        Object.entries(window.MEAT_CATEGORIES).forEach(([category, data]) => {
            if (category === 'Vegetarian' || category === 'No Data') return;
            data.keywords.forEach(keyword => {
                const regex = new RegExp('\\b' + keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                if (regex.test(desc)) {
                    scores[category] += 0.5;
                }
            });
        });
    }

    let maxScore = 0;
    let primary = 'Vegetarian';
    Object.entries(scores).forEach(([cat, score]) => {
        if (score > maxScore) {
            maxScore = score;
            primary = cat;
        }
    });

    return { primary, scores, total: maxScore };
};

window.buildMeatMap = (db) => {
    const meatMap = {};
    const countriesWithRegions = new Set();
    
    Object.entries(db).forEach(([key, entry]) => {
        if (entry.regions) {
            countriesWithRegions.add(key);
            Object.entries(entry.regions).forEach(([regionName, regionRecipe]) => {
                const analysis = window.analyzeMeatForRecipe(regionRecipe);
                if (analysis) {
                    meatMap[regionName] = analysis;
                }
            });
        }
        
        // Always store national-level too (for fallback/tooltip)
        const analysis = window.analyzeMeatForRecipe(entry);
        if (analysis) {
            meatMap[key] = analysis;
        }
    });
    
    // Tag which keys are national entries for countries that have regions
    meatMap._countriesWithRegions = Array.from(countriesWithRegions);
    
    return meatMap;
};

window.getMeatColor = (meatType) => {
    const cat = window.MEAT_CATEGORIES[meatType];
    return cat ? cat.color : '#374151';
};

window.getMeatIcon = (meatType) => {
    const cat = window.MEAT_CATEGORIES[meatType];
    return cat ? cat.icon : '\u{2753}';
};

window.getMeatStats = (meatMap) => {
    const stats = {};
    const countriesWithRegions = new Set(meatMap._countriesWithRegions || []);
    
    Object.entries(meatMap).forEach(([key, value]) => {
        if (key === '_countriesWithRegions') return;
        if (typeof value !== 'object' || !value.primary) return;
        
        // Skip national-level entries for countries that have regions
        // (only count their provinces/states)
        if (countriesWithRegions.has(key)) return;
        
        stats[value.primary] = (stats[value.primary] || 0) + 1;
    });
    return stats;
};

// --- SPICE LEVEL / HEAT INDEX ANALYSIS ENGINE ---
window.SPICE_TIERS = [
    { id: 'fiery',  label: 'Fiery',  icon: '\u{1F525}\u{1F525}', minScore: 8,  color: '#ef4444', glow: 'rgba(239,68,68,0.5)' },
    { id: 'hot',    label: 'Hot',    icon: '\u{1F525}',          minScore: 5,  color: '#f97316', glow: 'rgba(249,115,22,0.5)' },
    { id: 'medium', label: 'Medium', icon: '\u{1F336}\u{FE0F}',  minScore: 3,  color: '#eab308', glow: 'rgba(234,179,8,0.5)' },
    { id: 'gentle', label: 'Gentle', icon: '\u{1F33F}',          minScore: 1,  color: '#22d3ee', glow: 'rgba(34,211,238,0.5)' },
    { id: 'mild',   label: 'Mild',   icon: '\u{2744}\u{FE0F}',   minScore: 0,  color: '#60a5fa', glow: 'rgba(96,165,250,0.5)' }
];

// Heat-producing ingredient patterns with Scoville-calibrated weights.
// Pure aromatics are excluded. All patterns use \b word boundaries.
window.SPICE_KEYWORDS = {
    extreme: {
        weight: 5,
        words: [
            '\\bhabanero\\b', '\\bscotch bonnet\\b', '\\bghost pepper\\b',
            '\\bbhut jolokia\\b', '\\bcarolina reaper\\b', '\\btrinidad scorpion\\b',
            '\\bnaga\\b', '\\bbird.?s?.?eye chili', '\\bbird.?s?.?eye pepper',
            '\\bpiri piri\\b', '\\bperi peri\\b', '\\bthai chili', '\\bthai chile',
            '\\bthai pepper\\b'
        ]
    },
    high: {
        weight: 3,
        words: [
            '\\bcayenne\\b', '\\bserrano\\b', '\\bgochugaru\\b', '\\bgochujang\\b',
            '\\bsambal\\b', '\\bsriracha\\b', '\\bhot sauce\\b',
            '\\bred pepper flake', '\\bcrushed red pepper',
            '\\bchipotle\\b', '\\bde arbol\\b', '\\btabasco\\b',
            '\\bharissa\\b', '\\bberbere\\b',
            '\\baji\\s+\\w+', '\\baleppo pepper\\b',
            '\\bkashmiri chili', '\\bkashmiri chilli',
            '\\bred chili', '\\bred chile', '\\bred chilli',
            '\\bgreen chili', '\\bgreen chile', '\\bgreen chilli',
            '\\bdried chili', '\\bdried chile',
            '\\bchili paste', '\\bchile paste',
            '\\bchili sauce', '\\bchile sauce',
            '\\bhot pepper', '\\bguajillo\\b',
            '\\bpasilla\\b', '\\bjerk seasoning\\b', '\\bcajun\\b',
            // Standalone dried chili variety names (Mexican, etc.)
            '\\bancho\\b', '\\bmulato\\b', '\\bcascabel\\b',
            '\\bmorita\\b', '\\bpuya\\b', '\\btepín\\b', '\\btepin\\b'
        ]
    },
    medium: {
        weight: 2,
        words: [
            '\\bchili powder', '\\bchile powder', '\\bchilli powder',
            '\\bchili flake', '\\bchile flake',
            '\\bjalapeno\\b', '\\bjalape.o\\b', '\\bpoblano\\b',
            '\\bcurry paste\\b', '\\bred curry\\b', '\\bgreen curry\\b',
            '\\byellow curry\\b', '\\bvindaloo\\b', '\\bmadras\\b',
            '\\bszechuan pepper', '\\bsichuan pepper',
            '\\bwasabi\\b', '\\bhorseradish\\b',
            '\\bgaram masala\\b', '\\btandoori\\b',
            // Bare "chile(s)" / "chili(s)" as standalone (the word itself implies heat)
            '\\bchiles\\b', '\\bchilis\\b', '\\bchilies\\b',
            '\\bchillies\\b', '\\bchillis\\b'
        ]
    },
    low: {
        weight: 1,
        words: [
            '\\bcurry powder\\b',
            '\\bmustard powder\\b', '\\bdijon mustard\\b',
            '\\bginger\\b',
            // Bare singular "chili"/"chile"/"chilli" (could be incidental)
            '\\bchili\\b', '\\bchile\\b', '\\bchilli\\b'
        ]
    }
};

// Modifiers that reduce a heat keyword's contribution
window._SPICE_DAMPENERS = /\b(sweet|mild|smoked|dulce|optional|garnish|to taste|if desired|or to taste|seeded|deveined)\b/i;
// Paprika needs special handling: only counts if NOT preceded by "sweet" or "smoked"
window._PAPRIKA_PATTERN = /\bpaprika\b/i;
window._PAPRIKA_NEGATE = /\b(sweet|smoked|dulce)\b/i;

window.analyzeSpiceForRecipe = (recipe) => {
    if (!recipe) return null;
    if (!recipe.ingredients && !recipe.preliminary_steps) return null;

    // Collect ALL ingredient lines: main + preliminary_steps
    const ings = [...(recipe.ingredients || [])];
    if (recipe.preliminary_steps) {
        recipe.preliminary_steps.forEach(ps => {
            if (ps.ingredients) ings.push(...ps.ingredients);
        });
    }
    const totalIngredients = ings.length;
    if (totalIngredients === 0) return null;

    let rawScore = 0;
    let heatIngredientCount = 0;
    let highestSingleWeight = 0;
    const matched = new Set();

    // === INGREDIENT SCAN (primary signal) ===
    ings.forEach(rawIng => {
        const fullIng = rawIng.toLowerCase();
        const orParts = fullIng.split(/\s+or\s+/);
        const ing = orParts[0];
        let ingContributed = false;

        const isDampened = window._SPICE_DAMPENERS.test(fullIng);
        const dampenFactor = isDampened ? 0.3 : 1.0;

        // Quantity boost: "4 ancho" or "6 chiles" → multiple chilis = more heat
        const qtyMatch = ing.match(/^(\d+)\s/);
        const qty = qtyMatch ? parseInt(qtyMatch[1]) : 1;
        const qtyBoost = qty >= 3 ? 1.5 : (qty >= 2 ? 1.2 : 1.0);

        // Special paprika handling
        if (window._PAPRIKA_PATTERN.test(ing) && !window._PAPRIKA_NEGATE.test(ing)) {
            if (!matched.has('_paprika')) {
                matched.add('_paprika');
                const pts = 2 * dampenFactor * qtyBoost;
                rawScore += pts;
                highestSingleWeight = Math.max(highestSingleWeight, pts);
                ingContributed = true;
            }
        }

        Object.entries(window.SPICE_KEYWORDS).forEach(([level, { weight, words }]) => {
            words.forEach(pattern => {
                if (matched.has(pattern)) return;
                try {
                    const regex = new RegExp(pattern, 'i');
                    if (regex.test(ing)) {
                        matched.add(pattern);
                        const pts = weight * dampenFactor * qtyBoost;
                        rawScore += pts;
                        highestSingleWeight = Math.max(highestSingleWeight, weight);
                        ingContributed = true;
                    }
                } catch (e) {}
            });
        });

        if (ingContributed) heatIngredientCount++;
    });

    // === STEP TEXT SCAN (secondary signal, 40% weight) ===
    // Catches heat ingredients mentioned in steps but not the ingredient list
    let stepsText = (recipe.steps || []).join(' ').toLowerCase();
    if (recipe.preliminary_steps) {
        recipe.preliminary_steps.forEach(ps => {
            if (ps.steps) stepsText += ' ' + ps.steps.join(' ').toLowerCase();
        });
    }
    let stepBonus = 0;
    const stepPatterns = [
        { p: /\b(cayenne|serrano|habanero|scotch bonnet|ghost pepper|chipotle|gochugaru|gochujang|sambal|harissa|berbere)\b/i, w: 2 },
        { p: /\b(red chili|green chili|red chile|green chile|chili powder|chile powder|chili flake|hot sauce|hot pepper)\b/i, w: 1.5 },
        { p: /\b(paprika|jalapeno|jalapeño|curry paste|garam masala)\b/i, w: 1 }
    ];
    stepPatterns.forEach(({ p, w }) => {
        if (p.test(stepsText) && !p.test(ings.join(' ').toLowerCase())) {
            stepBonus += w;
        }
    });
    rawScore += stepBonus * 0.4;

    // === RATIO-BASED ADJUSTMENT ===
    const heatRatio = totalIngredients > 0 ? heatIngredientCount / totalIngredients : 0;
    const relevanceMultiplier = Math.max(0.3, Math.min(2.0, 0.25 + heatRatio * 3.0));

    // === INTENSITY FLOOR ===
    // Even if only 1 ingredient is a chili, a scotch bonnet (weight 5) must score
    // at least Medium. The raw weight encodes how hot the pepper IS.
    const intensityFloor = Math.round(highestSingleWeight * 0.6);

    // === DESCRIPTION SENTIMENT ===
    const desc = (recipe.description || '').toLowerCase();
    const dishName = (recipe.dish || '').toLowerCase();
    const descText = desc + ' ' + dishName;

    let sentimentBonus = 0;
    if (/\b(fiery|burning|pungent|scorching|blazing|incendiary)\b/.test(descText)) sentimentBonus += 2;
    if (/\b(spicy|spiced)\b/.test(descText)) sentimentBonus += 1;
    const negativeHits = (descText.match(/\b(mild|delicate|subtle|light|refresh\w*|cream\w*|cool\w*|sweet|citrus\w*|tang\w*|sour|tart|bright|clean|briny|herbal|aromatic|fragrant|comfort\w*|rich|savory|umami)\b/g) || []).length;
    sentimentBonus -= Math.min(negativeHits, 3);

    // === FINAL SCORE ===
    const ratioAdjusted = Math.round(rawScore * relevanceMultiplier);
    const adjustedScore = Math.max(0, Math.max(intensityFloor, ratioAdjusted) + sentimentBonus);

    let tier = window.SPICE_TIERS[window.SPICE_TIERS.length - 1];
    for (const t of window.SPICE_TIERS) {
        if (adjustedScore >= t.minScore) { tier = t; break; }
    }

    return { score: adjustedScore, tier: tier.id, label: tier.label, color: tier.color };
};

window.buildSpiceMap = (db) => {
    const spiceMap = {};
    const countriesWithRegions = new Set();

    Object.entries(db).forEach(([key, entry]) => {
        if (entry.regions) {
            countriesWithRegions.add(key);
            Object.entries(entry.regions).forEach(([regionName, regionRecipe]) => {
                const analysis = window.analyzeSpiceForRecipe(regionRecipe);
                if (analysis) spiceMap[regionName] = analysis;
            });
        }
        const analysis = window.analyzeSpiceForRecipe(entry);
        if (analysis) spiceMap[key] = analysis;
    });

    spiceMap._countriesWithRegions = Array.from(countriesWithRegions);
    return spiceMap;
};

window.getSpiceTier = (tierId) => {
    return window.SPICE_TIERS.find(t => t.id === tierId) || window.SPICE_TIERS[window.SPICE_TIERS.length - 1];
};

window.getSpiceColor = (tierId) => {
    const tier = window.getSpiceTier(tierId);
    return tier.color;
};

window.getSpiceIcon = (tierId) => {
    const tier = window.getSpiceTier(tierId);
    return tier.icon;
};

window.getSpiceStats = (spiceMap) => {
    const stats = {};
    const countriesWithRegions = new Set(spiceMap._countriesWithRegions || []);

    Object.entries(spiceMap).forEach(([key, value]) => {
        if (key === '_countriesWithRegions') return;
        if (typeof value !== 'object' || !value.label) return;
        if (countriesWithRegions.has(key)) return;
        stats[value.label] = (stats[value.label] || 0) + 1;
    });
    return stats;
};

// --- RECIPE COMPLEXITY INDEX ENGINE (multi-dimensional) ---
window.COMPLEXITY_TIERS = [
    { id: 'masterclass',   label: 'Masterclass',   icon: '\u{1F451}', minScore: 55, color: '#c026d3', glow: 'rgba(192,38,211,0.5)' },
    { id: 'advanced',      label: 'Advanced',      icon: '\u{1F52C}', minScore: 38, color: '#8b5cf6', glow: 'rgba(139,92,246,0.5)' },
    { id: 'intermediate',  label: 'Intermediate',  icon: '\u{1F373}', minScore: 22, color: '#6366f1', glow: 'rgba(99,102,241,0.5)' },
    { id: 'approachable',  label: 'Approachable',  icon: '\u{1F44C}', minScore: 10, color: '#38bdf8', glow: 'rgba(56,189,248,0.5)' },
    { id: 'quick',         label: 'Quick & Easy',  icon: '\u{26A1}',  minScore: 0,  color: '#34d399', glow: 'rgba(52,211,153,0.5)' }
];

window.TECHNIQUE_LEXICON = {
    basic: {
        weight: 1,
        verbs: ['boil', 'fry', 'bake', 'roast', 'grill', 'steam', 'simmer', 'stir', 'mix',
                'chop', 'slice', 'dice', 'mash', 'melt', 'toast', 'heat', 'warm', 'cook',
                'drain', 'rinse', 'soak', 'peel', 'trim', 'wash', 'season', 'toss',
                'spread', 'layer', 'wrap', 'fill', 'stuff', 'serve', 'plate', 'garnish',
                'form', 'shape', 'roll', 'flatten', 'crush', 'crumble', 'assemble',
                'dip', 'coat', 'bread', 'dust', 'drizzle', 'brush', 'pour']
    },
    intermediate: {
        weight: 2,
        verbs: ['braise', 'stew', 'poach', 'blanch', 'deglaze', 'reduce', 'marinate',
                'caramelize', 'char', 'smoke', 'sear', 'sweat', 'render', 'fold',
                'whisk', 'cream', 'knead', 'proof', 'rest', 'infuse', 'steep',
                'baste', 'glaze', 'score', 'butterfly', 'pound', 'shred', 'julienne',
                'zest', 'bloom', 'dry.?rub', 'deep.?fry', 'stir.?fry', 'pan.?fry',
                'par.?boil', 'par.?cook', 'blind.?bake', 'skim', 'strain', 'sift',
                'puree', 'blend', 'process', 'grind', 'spatchcock']
    },
    advanced: {
        weight: 3,
        verbs: ['temper', 'laminate', 'ferment', 'confit', 'cure', 'flamb',
                'sous.?vide', 'emulsify', 'clarify', 'debone', 'truss',
                'brine', 'cold.?smoke', 'hot.?smoke', 'dry.?age',
                'chiffonade', 'brunoise', 'baton', 'tournee',
                'mount', 'nappe', 'ribbon', 'coddle', 'spherif']
    }
};

window.analyzeComplexityForRecipe = (recipe) => {
    if (!recipe) return null;
    if (!recipe.ingredients && !recipe.preliminary_steps) return null;
    if (!recipe.steps && !recipe.preliminary_steps) return null;

    // === DIMENSION 1: Ingredient Breadth (0-25) ===
    // Expand compound ingredient lines ("Dough: flour, cornmeal, ghee" -> 3 items)
    const rawIngs = [...(recipe.ingredients || [])];
    if (recipe.preliminary_steps) {
        recipe.preliminary_steps.forEach(ps => {
            if (ps.ingredients) rawIngs.push(...ps.ingredients);
        });
    }
    const expandedIngs = [];
    rawIngs.forEach(line => {
        if (line.includes(':')) {
            const afterColon = line.split(':').slice(1).join(':');
            const subs = afterColon.split(',').map(s => s.trim()).filter(s => s.length > 1);
            if (subs.length > 1) {
                subs.forEach(s => expandedIngs.push(s));
            } else {
                expandedIngs.push(line);
            }
        } else {
            expandedIngs.push(line);
        }
    });
    let nonStapleCount = 0;
    expandedIngs.forEach(ing => {
        if (!window.isStaple(ing)) nonStapleCount++;
    });
    let ingredientScore = Math.min(nonStapleCount, 8);
    if (nonStapleCount > 8) ingredientScore += (Math.min(nonStapleCount, 15) - 8) * 0.6;
    if (nonStapleCount > 15) ingredientScore += (nonStapleCount - 15) * 0.3;
    ingredientScore = Math.min(ingredientScore, 25);

    // === DIMENSION 2: Technique Depth (0-30) ===
    let allStepsText = (recipe.steps || []).join(' ').toLowerCase();
    if (recipe.preliminary_steps) {
        recipe.preliminary_steps.forEach(ps => {
            if (ps.steps) allStepsText += ' ' + ps.steps.join(' ').toLowerCase();
        });
    }
    // Also scan ingredient text for technique hints (e.g. "marinated", "smoked")
    const allIngText = expandedIngs.join(' ').toLowerCase();

    const foundTechniques = new Set();
    let techniqueScore = 0;
    Object.entries(window.TECHNIQUE_LEXICON).forEach(([level, { weight, verbs }]) => {
        verbs.forEach(verb => {
            try {
                if (new RegExp('\\b' + verb, 'i').test(allStepsText + ' ' + allIngText)) {
                    if (!foundTechniques.has(verb)) {
                        foundTechniques.add(verb);
                        techniqueScore += weight;
                    }
                }
            } catch(e) {}
        });
    });
    // Multi-method bonus: using 3+ distinct cooking METHODS is harder
    const cookingMethods = ['boil', 'fry', 'bake', 'roast', 'grill', 'steam', 'simmer',
        'braise', 'stew', 'poach', 'smoke', 'sear', 'deep.?fry', 'stir.?fry', 'pan.?fry', 'char'];
    let methodCount = 0;
    cookingMethods.forEach(m => {
        try { if (new RegExp('\\b' + m, 'i').test(allStepsText)) methodCount++; } catch(e) {}
    });
    if (methodCount >= 3) techniqueScore += (methodCount - 2) * 2;

    techniqueScore = Math.min(techniqueScore, 30);

    // === DIMENSION 3: Process Intensity (0-30) ===
    const mainSteps = recipe.steps || [];
    let totalStepCount = mainSteps.length;
    let prelimCount = 0;
    if (recipe.preliminary_steps && recipe.preliminary_steps.length > 0) {
        prelimCount = recipe.preliminary_steps.length;
        recipe.preliminary_steps.forEach(ps => {
            totalStepCount += (ps.steps || []).length;
        });
    }

    // Detect compressed steps: count sentence-ending periods within steps
    // "Form dough balls. Boil in water." is 2 tasks in 1 step
    let extraSubTasks = 0;
    mainSteps.forEach(step => {
        const sentences = step.split(/\.\s+(?=[A-Z])/).length;
        if (sentences > 1) extraSubTasks += (sentences - 1);
    });
    const effectiveSteps = totalStepCount + Math.floor(extraSubTasks * 0.6);

    // Step-based text volume: longer steps = denser work
    const totalStepChars = mainSteps.reduce((sum, s) => sum + s.length, 0);
    const textDensityBonus = Math.min(Math.floor(totalStepChars / 250), 5);

    let processScore = Math.min(effectiveSteps, 6);
    if (effectiveSteps > 6) processScore += (Math.min(effectiveSteps, 12) - 6) * 0.7;
    if (effectiveSteps > 12) processScore += (effectiveSteps - 12) * 0.4;
    processScore += textDensityBonus;
    processScore += prelimCount * 6;

    // Time indicators
    if (/overnight|24\s*hours?|next\s*day|day\s*before|days?\s*in|for\s*\d+\s*days/i.test(allStepsText)) processScore += 4;
    else if (/(\d+)\s*hours?/i.test(allStepsText)) {
        const match = allStepsText.match(/(\d+)\s*hours?/i);
        if (match && parseInt(match[1]) >= 2) processScore += 3;
        else processScore += 1.5;
    }
    // Minute-based time: 30+ mins of active waiting is non-trivial
    const minMatch = allStepsText.match(/(\d+)\s*min/i);
    if (minMatch && parseInt(minMatch[1]) >= 30) processScore += 1;

    // Multiple temperature stages
    const tempMatches = allStepsText.match(/\d+\s*°[fFcC]/g);
    if (tempMatches && tempMatches.length > 1) processScore += (tempMatches.length - 1) * 1.5;
    processScore = Math.min(processScore, 30);

    // === DIMENSION 4: Skill Demand (0-15) ===
    const skillTerms = [
        'julienne', 'chiffonade', 'brunoise', 'debone', 'spatchcock', 'butterfly',
        'fold gently', 'fold careful', 'knead', 'laminate', 'proof', 'ferment',
        'temper', 'bloom', 'emulsif', 'ribbon stage', 'soft peak', 'stiff peak',
        'ice bath', 'shock', 'flash', 'torch', 'flamb',
        'paper.?thin', 'translucent', 'caramel stage', 'crack stage', 'thread stage',
        'al dente', 'bain.?marie', 'double boiler', 'water bath',
        'roll.?thin', 'stretch.?thin', 'pound.?flat', 'truss',
        // Manual dough/shaping work
        'form.*ball', 'shape.*ball', 'roll.*dough', 'flatten.*dough',
        'pinch', 'pleat', 'crimp', 'seal.*edge', 'stuff.*fold',
        'roll.*out', 'stretch.*dough', 'form.*patties', 'mold',
        // Assembly work
        'assemble', 'stack.*layer', 'wrap.*tight', 'tie.*string'
    ];
    const foundSkills = new Set();
    skillTerms.forEach(term => {
        try {
            if (new RegExp(term, 'i').test(allStepsText)) foundSkills.add(term);
        } catch(e) {}
    });
    // Dough-from-scratch bonus: flour in ingredients + shaping in steps
    const hasDoughWork = /flour|dough|masa|batter/i.test(allIngText) &&
        /form|shape|roll|knead|flatten|ball|patties|wrap/i.test(allStepsText);
    if (hasDoughWork) foundSkills.add('_dough_from_scratch');

    let skillScore = foundSkills.size * 2;
    skillScore = Math.min(skillScore, 15);

    // === COMPOSITE ===
    const total = Math.round(ingredientScore + techniqueScore + processScore + skillScore);

    let tier = window.COMPLEXITY_TIERS[window.COMPLEXITY_TIERS.length - 1];
    for (const t of window.COMPLEXITY_TIERS) {
        if (total >= t.minScore) { tier = t; break; }
    }

    return {
        score: total,
        tier: tier.id,
        label: tier.label,
        color: tier.color,
        breakdown: {
            ingredients: Math.round(ingredientScore),
            technique: Math.round(techniqueScore),
            process: Math.round(processScore),
            skill: Math.round(skillScore)
        }
    };
};

window.buildComplexityMap = (db) => {
    const cxMap = {};
    const countriesWithRegions = new Set();

    Object.entries(db).forEach(([key, entry]) => {
        if (entry.regions) {
            countriesWithRegions.add(key);
            Object.entries(entry.regions).forEach(([regionName, regionRecipe]) => {
                const analysis = window.analyzeComplexityForRecipe(regionRecipe);
                if (analysis) cxMap[regionName] = analysis;
            });
        }
        const analysis = window.analyzeComplexityForRecipe(entry);
        if (analysis) cxMap[key] = analysis;
    });

    cxMap._countriesWithRegions = Array.from(countriesWithRegions);
    return cxMap;
};

window.getComplexityTier = (tierId) => {
    return window.COMPLEXITY_TIERS.find(t => t.id === tierId) || window.COMPLEXITY_TIERS[window.COMPLEXITY_TIERS.length - 1];
};

window.getComplexityColor = (tierId) => {
    return window.getComplexityTier(tierId).color;
};

window.getComplexityIcon = (tierId) => {
    return window.getComplexityTier(tierId).icon;
};

window.getComplexityStats = (cxMap) => {
    const stats = {};
    const countriesWithRegions = new Set(cxMap._countriesWithRegions || []);
    Object.entries(cxMap).forEach(([key, value]) => {
        if (key === '_countriesWithRegions') return;
        if (typeof value !== 'object' || !value.label) return;
        if (countriesWithRegions.has(key)) return;
        stats[value.label] = (stats[value.label] || 0) + 1;
    });
    return stats;
};

// --- BASE SPIRIT / DRINK ANALYSIS ENGINE ---
window.SPIRIT_CATEGORIES = {
    'Rum': {
        keywords: ['\\brum\\b', '\\blight rum\\b', '\\bdark rum\\b', '\\bwhite rum\\b', '\\bspiced rum\\b', '\\boverproof\\b', '\\brhum\\b', '\\bcacha[cç]a\\b', '\\baguardiente\\b'],
        color: '#d97706', icon: '\u{1F943}'
    },
    'Whisky': {
        keywords: ['\\bwhisky\\b', '\\bwhiskey\\b', '\\bbourbon\\b', '\\bscotch\\b', '\\brye whiskey\\b', '\\brye whisky\\b', '\\bmalt\\b'],
        color: '#b45309', icon: '\u{1F951}'
    },
    'Vodka': {
        keywords: ['\\bvodka\\b'],
        color: '#94a3b8', icon: '\u{2744}\u{FE0F}'
    },
    'Tequila/Mezcal': {
        keywords: ['\\btequila\\b', '\\bmezcal\\b', '\\bmescal\\b'],
        color: '#65a30d', icon: '\u{1F335}'
    },
    'Gin': {
        keywords: ['\\bgin\\b'],
        color: '#7c3aed', icon: '\u{1FAB4}'
    },
    'Wine': {
        keywords: ['\\bwine\\b', '\\bred wine\\b', '\\bwhite wine\\b', '\\bchampagne\\b', '\\bprosecco\\b', '\\bsherry\\b', '\\bport\\b', '\\bsangria\\b', '\\bsake\\b', '\\bsoju\\b', '\\bmead\\b', '\\bvermouth\\b', '\\briesling\\b', '\\bpinot\\b', '\\bburgundy\\b', '\\bchianti\\b', '\\bcava\\b'],
        color: '#be123c', icon: '\u{1F377}'
    },
    'Beer/Cider': {
        keywords: ['\\bbeer\\b', '\\blager\\b', '\\bale\\b', '\\bstout\\b', '\\bpilsner\\b', '\\bporter\\b', '\\bcider\\b', '\\bbrew\\b', '\\bguinness\\b', '\\bipa\\b'],
        color: '#ca8a04', icon: '\u{1F37A}'
    },
    'Brandy/Other Spirit': {
        keywords: ['\\bbrandy\\b', '\\bcognac\\b', '\\barmagnac\\b', '\\bgrappa\\b', '\\bpisco\\b', '\\beau de vie\\b', '\\brakija\\b', '\\brak[iı]\\b', '\\barak\\b', '\\bouzo\\b', '\\bslivovitz\\b', '\\bp[aá]linka\\b', '\\bmaotai\\b', '\\bbaijiu\\b', '\\bshochu\\b', '\\bsnaps\\b', '\\bakvavit\\b', '\\baquavit\\b', '\\bpastis\\b', '\\babsinthe\\b', '\\bsambuca\\b', '\\blimoncello\\b', '\\bamarula\\b', '\\bkahlua\\b', '\\bchartreuse\\b'],
        color: '#c2410c', icon: '\u{1F376}'
    },
    'Tea': {
        keywords: ['\\btea\\b', '\\bgreen tea\\b', '\\bblack tea\\b', '\\bchai\\b', '\\bmatcha\\b', '\\bherbal tea\\b', '\\bmate\\b', '\\byerba\\b', '\\brooibos\\b'],
        color: '#059669', icon: '\u{1FAD6}'
    },
    'Coffee': {
        keywords: ['\\bcoffee\\b', '\\bespresso\\b', '\\bcappuccino\\b', '\\bturk.*coffee\\b', '\\barabic.*coffee\\b', '\\bcafé\\b'],
        color: '#92400e', icon: '\u{2615}'
    },
    'Non-Alcoholic': {
        keywords: ['\\bjuice\\b', '\\blemonade\\b', '\\blimeade\\b', '\\bsmoothie\\b', '\\blassi\\b', '\\bbuttermilk\\b', '\\bayran\\b', '\\bdoogh\\b', '\\bsharbat\\b', '\\bhorchata\\b', '\\batole\\b', '\\bchocolate\\b', '\\bcocoa\\b', '\\bagua de\\b', '\\bagua fresca\\b', '\\bhibiscus\\b', '\\btamarind\\b', '\\bcoconut water\\b', '\\bcoconut milk\\b', '\\bmilk\\b', '\\bsyrup\\b', '\\bsherbet\\b', '\\bpomegranate\\b', '\\bmango\\b', '\\bpassion\\s*fruit\\b'],
        color: '#0ea5e9', icon: '\u{1F9C3}'
    },
    'No Drink': {
        keywords: [],
        color: '#374151', icon: '\u{2796}'
    }
};

window.analyzeSpiritForRecipe = (recipe) => {
    if (!recipe || !recipe.drink) return { primary: 'No Drink' };
    const drink = recipe.drink;
    if (!drink.ingredients && !drink.dish) return { primary: 'No Drink' };

    // Build searchable text from drink name, description, ingredients, AND preliminary_steps
    const parts = [];
    if (drink.dish) parts.push(drink.dish.toLowerCase());
    if (drink.description) parts.push(drink.description.toLowerCase());
    if (drink.ingredients) parts.push(drink.ingredients.map(i => i.toLowerCase()).join(' | '));
    if (drink.preliminary_steps) {
        drink.preliminary_steps.forEach(ps => {
            if (ps.ingredients) parts.push(ps.ingredients.map(i => i.toLowerCase()).join(' | '));
        });
    }
    const searchText = parts.join(' | ');

    const scores = {};
    Object.keys(window.SPIRIT_CATEGORIES).forEach(cat => {
        if (cat !== 'No Drink') scores[cat] = 0;
    });

    Object.entries(window.SPIRIT_CATEGORIES).forEach(([category, data]) => {
        if (category === 'No Drink') return;
        data.keywords.forEach(pattern => {
            try {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(searchText)) {
                    scores[category]++;
                }
            } catch (e) {}
        });
    });

    let maxScore = 0;
    let primary = 'Non-Alcoholic';
    Object.entries(scores).forEach(([cat, score]) => {
        if (score > maxScore) {
            maxScore = score;
            primary = cat;
        }
    });

    // If nothing matched at all, classify based on name heuristics
    if (maxScore === 0) {
        const name = (drink.dish || '').toLowerCase();
        if (/cocktail|spirit|liquor|shot|aperitif|apéritif|digestif|punch/i.test(name)) {
            primary = 'Brandy/Other Spirit';
        } else {
            primary = 'Non-Alcoholic';
        }
    }

    return { primary, drinkName: drink.dish || 'Unknown' };
};

window.buildSpiritMap = (db) => {
    const spiritMap = {};
    const countriesWithRegions = new Set();

    Object.entries(db).forEach(([key, entry]) => {
        if (entry.regions) {
            countriesWithRegions.add(key);
            Object.entries(entry.regions).forEach(([regionName, regionRecipe]) => {
                const analysis = window.analyzeSpiritForRecipe(regionRecipe);
                if (analysis) spiritMap[regionName] = analysis;
            });
        }
        const analysis = window.analyzeSpiritForRecipe(entry);
        if (analysis) spiritMap[key] = analysis;
    });

    spiritMap._countriesWithRegions = Array.from(countriesWithRegions);
    return spiritMap;
};

window.getSpiritColor = (category) => {
    const cat = window.SPIRIT_CATEGORIES[category];
    return cat ? cat.color : '#374151';
};

window.getSpiritIcon = (category) => {
    const cat = window.SPIRIT_CATEGORIES[category];
    return cat ? cat.icon : '\u{2796}';
};

window.getSpiritStats = (spiritMap) => {
    const stats = {};
    const countriesWithRegions = new Set(spiritMap._countriesWithRegions || []);
    Object.entries(spiritMap).forEach(([key, value]) => {
        if (key === '_countriesWithRegions') return;
        if (typeof value !== 'object' || !value.primary) return;
        if (countriesWithRegions.has(key)) return;
        stats[value.primary] = (stats[value.primary] || 0) + 1;
    });
    return stats;
};

// --- ARTISTIC FLAIRE CONFIGURATION ---
window.COUNTRY_FLAIRS = window.COUNTRY_FLAIRS || {};