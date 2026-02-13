const RecipeFinder = ({ db, onRecipeSelect, onHighlight }) => {
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
            setSuggestions(filtered.slice(0, 10));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, allIngredients, selectedIngredients]);

    // Handle Filtering & Highlighting
    React.useEffect(() => {
        if (selectedIngredients.length === 0) {
            setResults([]);
            onHighlight(null); // Clear highlight
            return;
        }

        const matchedKeys = [];
        const matchedRecipes = [];

        Object.entries(db).forEach(([key, recipe]) => {
            const recipeIngs = recipe.ingredients.map(i => parseIngredient(i).toLowerCase());
            // Check if recipe contains ALL selected ingredients
            const hasAll = selectedIngredients.every(sel => 
                recipeIngs.some(rIng => rIng.includes(sel.toLowerCase()))
            );

            if (hasAll) {
                matchedKeys.push(key);
                matchedRecipes.push({ key, ...recipe });
            }
        });

        setResults(matchedRecipes);
        onHighlight(matchedKeys);

    }, [selectedIngredients, db]);

    const addIngredient = (ing) => {
        setSelectedIngredients([...selectedIngredients, ing]);
        setSearchTerm('');
        setSuggestions([]);
    };

    const removeIngredient = (ing) => {
        setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
    };

    return (
        <div className="absolute top-4 left-4 z-[1000] w-80 bg-gray-900/95 text-white rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md flex flex-col max-h-[80vh] animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-serif font-bold text-yellow-500 mb-2 flex items-center gap-2">
                    <span>🔍</span> Recipe Finder
                </h3>
                
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
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 mt-1 rounded shadow-lg max-h-60 overflow-y-auto z-50 custom-scroll">
                            {suggestions.map(ing => (
                                <li key={ing} onClick={() => addIngredient(ing)} className="px-3 py-2 text-sm hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0 flex items-center gap-3 transition-colors">
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
                    <p className="text-gray-400 text-center text-sm py-4">No recipes found with these ingredients.</p>
                )}
                {results.map(recipe => (
                    <div key={recipe.key} onClick={() => onRecipeSelect(recipe.key)} className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors group">
                        <img src={getDishImage(recipe.dish)} alt={recipe.dish} className="w-12 h-12 rounded object-cover bg-gray-700 border border-gray-600 group-hover:border-yellow-500 transition-colors" />
                        <div>
                            <p className="font-bold text-sm leading-tight text-gray-200 group-hover:text-yellow-500 transition-colors">{recipe.dish}</p>
                            <p className="text-xs text-gray-500">{recipe.key}</p> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

window.RecipeFinder = RecipeFinder;