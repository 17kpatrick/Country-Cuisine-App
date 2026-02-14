const RecipeFinder = ({ db, onRecipeSelect, onHighlight, onSearchIngredientsChange, activeSearchMode, onActivateMode }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [suggestions, setSuggestions] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [allIngredients, setAllIngredients] = React.useState([]);

    // Load ingredients on mount
    React.useEffect(() => {
        if (db) {
            setAllIngredients(getUniqueIngredients(db));
        }
    }, [db]);

    // Handle Autocomplete
    React.useEffect(() => {
        if (searchTerm.length > 1) {
            const lowerTerm = searchTerm.toLowerCase();
            const filtered = allIngredients.filter(ing => 
                ing.toLowerCase().includes(lowerTerm) && 
                !selectedIngredients.includes(ing)
            );
            
            // Sort suggestions: Exact match > Starts with > Length > Alphabetical
            filtered.sort((a, b) => {
                const aLower = a.toLowerCase();
                const bLower = b.toLowerCase();
                
                // 1. Exact match
                if (aLower === lowerTerm) return -1;
                if (bLower === lowerTerm) return 1;
                
                // 2. Starts with
                const aStarts = aLower.startsWith(lowerTerm);
                const bStarts = bLower.startsWith(lowerTerm);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                
                // 3. Length (shorter is usually more "core")
                if (a.length !== b.length) return a.length - b.length;
                
                // 4. Alphabetical
                return a.localeCompare(b);
            });

            setSuggestions(filtered.slice(0, 10));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, allIngredients, selectedIngredients]);

    // React to global mode changes (e.g. if Stockpile is activated or Global Clear is clicked)
    React.useEffect(() => {
        if (activeSearchMode !== 'recipe') {
            setSelectedIngredients([]);
            setResults([]);
        }
    }, [activeSearchMode]);

    // Handle Filtering & Highlighting
    React.useEffect(() => {
        // Only update map/state if we are the active mode (or becoming it)
        if (activeSearchMode === 'recipe' && onSearchIngredientsChange) {
            onSearchIngredientsChange(selectedIngredients);
        }

        if (selectedIngredients.length === 0) {
            setResults([]);
            // Only clear highlight if we were the ones who set it
            if (activeSearchMode === 'recipe') onHighlight(null);
            return;
        }

        const matchedMap = {}; // { "ISO": "food" | "drink" | "both" }
        const matchedRecipes = [];

        const checkRecipe = (key, recipe) => {
            // Helper to collect all ingredients including preliminary ones
            const collectIngs = (baseIngs, prelimSteps) => {
                let list = baseIngs ? baseIngs.map(i => parseIngredient(i).toLowerCase()) : [];
                if (prelimSteps) {
                    prelimSteps.forEach(step => {
                        if (step.ingredients) {
                            list = list.concat(step.ingredients.map(i => parseIngredient(i).toLowerCase()));
                        }
                    });
                }
                return list;
            };

            const foodIngs = collectIngs(recipe.ingredients, recipe.preliminary_steps);
            const drinkIngs = recipe.drink 
                ? collectIngs(recipe.drink.ingredients, recipe.drink.preliminary_steps) 
                : [];
            
            const hasFood = selectedIngredients.every(sel => 
                foodIngs.some(rIng => window.isIngredientMatch(rIng, sel))
            );
            const hasDrink = selectedIngredients.every(sel => 
                drinkIngs.some(rIng => window.isIngredientMatch(rIng, sel))
            );

            if (hasFood || hasDrink) {
                let type = 'food';
                if (hasFood && hasDrink) type = 'both';
                else if (hasDrink) type = 'drink';
                
                matchedMap[key] = type;
                matchedRecipes.push({ key, ...recipe, matchType: type });
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

        setResults(matchedRecipes);
        
        if (activeSearchMode === 'recipe') {
            onHighlight(Object.keys(matchedMap).length > 0 ? matchedMap : null);
        }

    }, [selectedIngredients, db, activeSearchMode]);

    const addIngredient = (ing) => {
        onActivateMode(); // Tell App we are taking over
        setSelectedIngredients([...selectedIngredients, ing]);
        setSearchTerm('');
        setSuggestions([]);
    };

    const removeIngredient = (ing) => {
        setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
    };

    const clearAll = () => {
        setSelectedIngredients([]);
        setSearchTerm('');
        setSuggestions([]);
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="absolute top-4 left-4 z-[1000] bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg border border-gray-600 transition-all hover:scale-110 group"
                title="Search Recipes"
                data-testid="recipe-finder-toggle"
            >
                <span className="text-xl group-hover:text-yellow-400 transition-colors">🔍</span>
                {selectedIngredients.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border border-gray-800"></span>}
            </button>
        );
    }

    return (
        <div className="absolute top-4 left-4 z-[1000] w-80 bg-gray-900/95 text-white rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md flex flex-col max-h-[80vh] animate-in fade-in slide-in-from-left-4 duration-300" data-testid="recipe-finder-panel">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-serif font-bold text-yellow-500 flex items-center gap-2">
                    <span>🔍</span> Recipe Finder
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            
            <div className="p-4 border-b border-gray-700">
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                    {selectedIngredients.map(ing => (
                        <span key={ing} className="bg-yellow-600 text-xs pl-1 pr-2 py-1 rounded-full flex items-center gap-2 font-medium animate-in fade-in zoom-in duration-200">
                            <img src={getIngredientImage(ing)} alt={ing} className="w-5 h-5 rounded-full bg-yellow-700 object-cover" />
                            {ing}
                            <button onClick={() => removeIngredient(ing)} className="hover:text-black font-bold">&times;</button>
                        </span>
                    ))}
                </div>

                {/* Input */}
                <div className="relative">
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Type an ingredient (e.g. Beef)..."
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-500"
                        data-testid="recipe-finder-search"
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 mt-1 rounded shadow-lg max-h-60 overflow-y-auto z-50 custom-scroll" data-testid="recipe-finder-suggestions">
                            {suggestions.map(ing => (
                                <li key={ing} onClick={() => addIngredient(ing)} className="px-3 py-2 text-sm hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0 flex items-center gap-3 transition-colors" data-testid="recipe-finder-suggestion">
                                    <img src={getIngredientImage(ing)} alt={ing} className="w-8 h-8 rounded-full bg-gray-900 object-cover border border-gray-600" />
                                    <span className="font-medium text-gray-200">{ing}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto custom-scroll p-2 flex-grow">
                {results.length === 0 && selectedIngredients.length > 0 && (
                    <p className="text-gray-400 text-center text-sm py-4" data-testid="recipe-finder-no-results">No recipes found with these ingredients.</p>
                )}
                {results.map(recipe => (
                    <div key={recipe.key} onClick={() => onRecipeSelect(recipe.key)} className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors group" data-testid="recipe-result">
                        <img src={getDishImage(recipe.dish)} alt={recipe.dish} className="w-12 h-12 rounded object-cover bg-gray-700 border border-gray-600 group-hover:border-yellow-500 transition-colors" />
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-sm leading-tight text-gray-200 group-hover:text-yellow-500 transition-colors">{recipe.dish}</p>
                                {recipe.matchType === 'drink' && <span className="text-[10px] bg-blue-900 text-blue-200 px-1 rounded">DRINK</span>}
                                {recipe.matchType === 'both' && <span className="text-[10px] bg-purple-900 text-purple-200 px-1 rounded">BOTH</span>}
                            </div>
                            {recipe.matchType === 'drink' && recipe.drink && (
                                <p className="text-xs text-gray-400 italic">Matches: {recipe.drink.dish}</p>
                            )}
                            <p className="text-xs text-gray-500">{recipe.key}</p> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

window.RecipeFinder = RecipeFinder;