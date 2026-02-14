const StockpileManager = ({ db, onRecipeSelect, onHighlight, onSearchIngredientsChange, activeSearchMode, onActivateMode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [stockpile, setStockpile] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [suggestions, setSuggestions] = React.useState([]);
    const [allIngredients, setAllIngredients] = React.useState([]);
    const [results, setResults] = React.useState([]);

    // Load from local storage on mount
    React.useEffect(() => {
        const saved = localStorage.getItem('ingredientStockpile');
        if (saved) {
            setStockpile(JSON.parse(saved));
        }
    }, []);

    // Save to local storage whenever stockpile changes
    React.useEffect(() => {
        localStorage.setItem('ingredientStockpile', JSON.stringify(stockpile));
    }, [stockpile]);

    // Load all ingredients for autocomplete
    React.useEffect(() => {
        if (db) {
            setAllIngredients(window.getUniqueIngredients(db));
        }
    }, [db]);

    // Autocomplete Logic
    React.useEffect(() => {
        if (searchTerm.length > 1) {
            const lowerTerm = searchTerm.toLowerCase();
            const filtered = allIngredients.filter(ing => 
                ing.toLowerCase().includes(lowerTerm) && 
                !stockpile.includes(ing)
            );
            setSuggestions(filtered.slice(0, 8));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, allIngredients, stockpile]);

    // React to global mode changes
    React.useEffect(() => {
        if (activeSearchMode !== 'stockpile') {
            setResults([]);
        }
    }, [activeSearchMode]);

    const addIngredient = (ing) => {
        // Clean the input just in case
        const clean = window.parseIngredient(ing);
        if (clean && !stockpile.includes(clean)) {
            setStockpile([...stockpile, clean]);
        }
        setSearchTerm('');
        setSuggestions([]);
    };

    const removeIngredient = (ing) => {
        setStockpile(stockpile.filter(i => i !== ing));
    };

    const findRecipes = () => {
        if (!db) return;
        
        onActivateMode(); // Tell App we are taking over
        
        // Normalize stockpile for comparison
        const stockpileSet = new Set(stockpile.map(i => i.toLowerCase()));
        const matchedMap = {};
        const matchedList = [];

        const checkRecipe = (key, recipe) => {
            // 1. Map prelim items to their ingredients for lookup
            const prelimMap = {};
            const registerPrelim = (steps) => {
                if (!steps) return;
                steps.forEach(step => {
                    const itemName = window.parseIngredient(step.item).toLowerCase();
                    const stepIngs = step.ingredients ? step.ingredients.map(i => window.parseIngredient(i).toLowerCase()) : [];
                    prelimMap[itemName] = stepIngs;
                });
            };
            registerPrelim(recipe.preliminary_steps);
            if (recipe.drink) registerPrelim(recipe.drink.preliminary_steps);

            // 2. Logic to check if a single ingredient requirement is met
            const canMakeIngredient = (reqIng) => {
                // Handle "AND" (e.g. "Salt and Pepper") -> must have both
                const andParts = reqIng.split(/\s+(?:and|&)\s+/i).map(s => s.trim());
                
                return andParts.every(part => {
                    // Handle "OR" (e.g. "Beef or Chicken") -> need at least one
                    const orOptions = part.split(/\s+or\s+/i).map(s => s.trim());
                    
                    return orOptions.some(opt => {
                        // A. Assumed staples (Water/Ice) - handled by filtering now, but kept for safety
                        if (window.isStaple(opt)) return true;

                        // B. Fuzzy match in stockpile (e.g. "Curry" matches "Black Chickpea Curry")
                        if (Array.from(stockpileSet).some(owned => window.isIngredientMatch(opt, owned))) return true;

                        // C. Prelim match (can we make this item?)
                        if (prelimMap[opt]) {
                            const subIngs = prelimMap[opt];
                            // To make the prelim item, we need ALL its ingredients
                            return subIngs.every(sub => {
                                 // Handle AND/OR in sub-ingredients too
                                 const subAndParts = sub.split(/\s+(?:and|&)\s+/i).map(s => s.trim());
                                 return subAndParts.every(subPart => {
                                     const subOrOptions = subPart.split(/\s+or\s+/i).map(s => s.trim());
                                     return subOrOptions.some(subOpt => 
                                         Array.from(stockpileSet).some(owned => window.isIngredientMatch(subOpt, owned))
                                     );
                                 });
                            });
                        }
                        return false;
                    });
                });
            };

            // 3. Check Food (Count Matches vs Missing)
            let foodIngs = [];
            if (recipe.ingredients) {
                // Parse each ingredient (don't split by comma - comma separates ingredient from prep method)
                recipe.ingredients.forEach(ing => {
                    const parsed = window.parseIngredient(ing).toLowerCase();
                    if (parsed) foodIngs.push(parsed);
                });
            }
            const validFoodIngs = foodIngs.filter(i => i && !window.isStaple(i));

            const foodMatches = validFoodIngs.filter(ing => canMakeIngredient(ing));
            const isFoodFull = validFoodIngs.length > 0 && foodMatches.length === validFoodIngs.length;
            const isFoodPartial = foodMatches.length > 0;

            // 4. Check Drink (Count Matches vs Missing)
            let drinkIngs = [];
            let validDrinkIngs = [];
            let drinkMatches = [];
            let isDrinkFull = false;
            let isDrinkPartial = false;

            if (recipe.drink && recipe.drink.ingredients) {
                recipe.drink.ingredients.forEach(ing => {
                    const parsed = window.parseIngredient(ing).toLowerCase();
                    if (parsed) drinkIngs.push(parsed);
                });
                validDrinkIngs = drinkIngs.filter(i => i && !window.isStaple(i));
                drinkMatches = validDrinkIngs.filter(ing => canMakeIngredient(ing));
                isDrinkFull = validDrinkIngs.length > 0 && drinkMatches.length === validDrinkIngs.length;
                isDrinkPartial = drinkMatches.length > 0;
            }

            // Include if there is ANY progress (Partial or Full)
            if (isFoodPartial || isDrinkPartial) {
                let type = 'food';
                if (isFoodPartial && isDrinkPartial) type = 'both';
                else if (isDrinkPartial) type = 'drink';
                
                // Determine if fully ready
                let isReady = false;
                if (type === 'food' && isFoodFull) isReady = true;
                else if (type === 'drink' && isDrinkFull) isReady = true;
                else if (type === 'both' && isFoodFull && isDrinkFull) isReady = true;

                matchedMap[key] = isReady ? 'ready' : type;
                matchedList.push({ 
                    key, 
                    ...recipe, 
                    matchType: type,
                    foodStatus: isFoodFull ? 'full' : (isFoodPartial ? 'partial' : 'none'),
                    drinkStatus: isDrinkFull ? 'full' : (isDrinkPartial ? 'partial' : 'none'),
                    foodMissing: validFoodIngs.length - foodMatches.length,
                    drinkMissing: validDrinkIngs.length - drinkMatches.length
                });
            }
        };

        Object.entries(db).forEach(([key, recipe]) => {
            checkRecipe(key, recipe);
            if (recipe.regions) {
                Object.entries(recipe.regions).forEach(([rKey, rRecipe]) => {
                    checkRecipe(rKey, rRecipe);
                });
            }
        });

        // Sort: Ready first, then by fewest missing ingredients
        matchedList.sort((a, b) => {
            // 1. Food Ready?
            if (a.foodStatus === 'full' && b.foodStatus !== 'full') return -1;
            if (b.foodStatus === 'full' && a.foodStatus !== 'full') return 1;
            
            // 2. Drink Ready?
            if (a.drinkStatus === 'full' && b.drinkStatus !== 'full') return -1;
            if (b.drinkStatus === 'full' && a.drinkStatus !== 'full') return 1;
            
            // 3. Fewest missing ingredients (Food)
            return a.foodMissing - b.foodMissing;
        });

        setResults(matchedList);
        onHighlight(Object.keys(matchedMap).length > 0 ? matchedMap : null);
        
        // Update the "search ingredients" so RecipeCard highlights them (all of them in this case)
        if (onSearchIngredientsChange) {
            onSearchIngredientsChange(stockpile);
        }
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="absolute top-4 left-[24rem] z-[1100] bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg border border-gray-600 transition-all hover:scale-110 group"
                title="My Pantry"
            >
                <span className="text-xl group-hover:animate-bounce">📦</span>
                {results.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-gray-800"></span>}
            </button>
        );
    }

    return (
        <div className="absolute top-4 left-[24rem] z-[1100] w-80 bg-gray-900/95 text-white rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-serif font-bold text-emerald-500 flex items-center gap-2">
                    <span>📦</span> My Stockpile
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
            </div>

            <div className="p-4 border-b border-gray-700 space-y-3">
                <div className="relative">
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addIngredient(searchTerm)}
                        placeholder="Add ingredient (e.g. Rice)..."
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 placeholder-gray-500"
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 mt-1 rounded shadow-lg max-h-40 overflow-y-auto z-50 custom-scroll">
                            {suggestions.map(ing => (
                                <li key={ing} onClick={() => addIngredient(ing)} className="px-3 py-2 text-sm hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0 text-gray-200">
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scroll">
                    {stockpile.map(ing => (
                        <span key={ing} className="bg-emerald-900/50 border border-emerald-700/50 text-emerald-100 text-xs px-2 py-1 rounded-full flex items-center gap-2">
                            {ing}
                            <button onClick={() => removeIngredient(ing)} className="hover:text-white font-bold text-emerald-400">&times;</button>
                        </span>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={findRecipes}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded font-bold text-sm transition-colors shadow-md"
                    >
                        Show What I Can Make 🍳
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto custom-scroll p-2 flex-grow">
                {results.length === 0 && stockpile.length > 0 && (
                    <p className="text-gray-500 text-center text-xs py-4 italic">Add ingredients and click show to find recipes.</p>
                )}
                {results.map(recipe => (
                    <div key={recipe.key} onClick={() => onRecipeSelect(recipe.key)} className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors group border-b border-gray-800 last:border-0">
                        <img src={window.getDishImage(recipe.dish)} alt={recipe.dish} className="w-10 h-10 rounded object-cover bg-gray-700 border border-gray-600 group-hover:border-emerald-500 transition-colors" />
                        <div className="flex-grow">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-sm leading-tight text-gray-200 group-hover:text-emerald-400 transition-colors">{recipe.dish}</p>
                                {recipe.foodStatus === 'full' && <span className="text-[9px] bg-emerald-900 text-emerald-200 px-1.5 py-0.5 rounded border border-emerald-700 font-bold">READY</span>}
                                {recipe.foodStatus === 'partial' && <span className="text-[9px] bg-yellow-900 text-yellow-200 px-1.5 py-0.5 rounded border border-yellow-700">MISSING {recipe.foodMissing}</span>}
                            </div>
                            
                            {recipe.drink && (recipe.drinkStatus === 'full' || recipe.drinkStatus === 'partial') && (
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-[10px] text-gray-400 italic">🍷 {recipe.drink.dish}</p>
                                    {recipe.drinkStatus === 'full' && <span className="text-[8px] bg-blue-900 text-blue-200 px-1 rounded border border-blue-700">READY</span>}
                                    {recipe.drinkStatus === 'partial' && <span className="text-[8px] bg-gray-800 text-gray-400 px-1 rounded border border-gray-600">MISSING {recipe.drinkMissing}</span>}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

window.StockpileManager = StockpileManager;