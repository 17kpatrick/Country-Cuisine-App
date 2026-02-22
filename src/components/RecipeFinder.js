// Universal flag component for both countries and regions.
// For regions, `code` may be an ISO 3166-2 subdivision code like "us-pa".
// onError cascade: subdivision → parent country → nothing (no broken image).
const FlagImg = ({ code, className }) => {
    const [cur, setCur] = React.useState(code);
    React.useEffect(() => { setCur(code); }, [code]);
    if (!cur) return (
        <div className={`${className} bg-gray-800 rounded border border-gray-700 flex items-center justify-center text-sm shrink-0`}>🌐</div>
    );
    const handleError = () => {
        // If we tried a subdivision code (e.g. "us-pa"), fall back to country ("us")
        if (cur && cur.includes('-')) {
            setCur(cur.split('-')[0]);
        } else {
            setCur(null); // show globe
        }
    };
    return (
        <img
            src={`https://flagcdn.com/w40/${cur}.png`}
            alt=""
            className={`${className} object-cover rounded shadow shrink-0 border border-gray-700`}
            onError={handleError}
        />
    );
};

const RecipeFinder = ({ db, onRecipeSelect, onHighlight, onSearchIngredientsChange, activeSearchMode, onActivateMode, countryIndex = [], regionParentIso2 = {} }) => {
    // Start collapsed
    const [isOpen, setIsOpen] = React.useState(false);

    // 'ingredients' | 'name' | 'country'
    const [searchMode, setSearchMode] = React.useState('ingredients');

    // Ingredient search
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [suggestions, setSuggestions] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [allIngredients, setAllIngredients] = React.useState([]);

    // Category filters
    const [categoryFilters, setCategoryFilters] = React.useState({ food: true, drink: true, dessert: true });

    // 'all' | 'any'
    const [matchMode, setMatchMode] = React.useState('all');

    // Name search
    const [nameQuery, setNameQuery] = React.useState('');
    const [nameResults, setNameResults] = React.useState([]);

    // Country search
    const [countryQuery, setCountryQuery] = React.useState('');
    const [countryResults, setCountryResults] = React.useState([]);

    // Load ingredients on mount
    React.useEffect(() => {
        if (db) setAllIngredients(getUniqueIngredients(db));
    }, [db]);

    // Autocomplete suggestions
    React.useEffect(() => {
        if (searchTerm.length > 1) {
            const lowerTerm = searchTerm.toLowerCase();
            const filtered = allIngredients.filter(ing =>
                ing.toLowerCase().includes(lowerTerm) &&
                !selectedIngredients.includes(ing)
            );
            filtered.sort((a, b) => {
                const aLower = a.toLowerCase();
                const bLower = b.toLowerCase();
                if (aLower === lowerTerm) return -1;
                if (bLower === lowerTerm) return 1;
                const aStarts = aLower.startsWith(lowerTerm);
                const bStarts = bLower.startsWith(lowerTerm);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                if (a.length !== b.length) return a.length - b.length;
                return a.localeCompare(b);
            });
            setSuggestions(filtered.slice(0, 10));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, allIngredients, selectedIngredients]);

    // React to global mode changes
    React.useEffect(() => {
        if (activeSearchMode !== 'recipe') {
            setSelectedIngredients([]);
            setResults([]);
            setNameQuery('');
            setNameResults([]);
            setCountryQuery('');
            setCountryResults([]);
        }
    }, [activeSearchMode]);

    // Name search filtering
    React.useEffect(() => {
        if (searchMode !== 'name' || !nameQuery.trim() || !db) {
            setNameResults([]);
            if (searchMode === 'name' && activeSearchMode === 'recipe') onHighlight(null);
            return;
        }

        const lowerQ = nameQuery.toLowerCase().trim();
        const found = [];

        const checkEntry = (key, recipe) => {
            const matches = [];
            if (categoryFilters.food && recipe.dish && recipe.dish.toLowerCase().includes(lowerQ))
                matches.push({ type: 'food', name: recipe.dish });
            if (categoryFilters.drink && recipe.drink && recipe.drink.dish && recipe.drink.dish.toLowerCase().includes(lowerQ))
                matches.push({ type: 'drink', name: recipe.drink.dish });
            if (categoryFilters.dessert && recipe.dessert && recipe.dessert.dish && recipe.dessert.dish.toLowerCase().includes(lowerQ))
                matches.push({ type: 'dessert', name: recipe.dessert.dish });
            if (matches.length > 0) found.push({ key, ...recipe, nameMatches: matches });
        };

        Object.entries(db).forEach(([key, recipe]) => {
            checkEntry(key, recipe);
            if (recipe.regions)
                Object.entries(recipe.regions).forEach(([rKey, rRecipe]) => checkEntry(rKey, rRecipe));
        });

        setNameResults(found);

        if (activeSearchMode === 'recipe') {
            const matchedMap = {};
            found.forEach(r => {
                const types = r.nameMatches.map(m => m.type);
                matchedMap[r.key] = resolveMatchType(types.includes('food'), types.includes('drink'), types.includes('dessert'));
            });
            onHighlight(Object.keys(matchedMap).length > 0 ? matchedMap : null);
        }
    }, [nameQuery, searchMode, categoryFilters, db, activeSearchMode]);

    // Country search — filters countryIndex (ISO3 countries) + sub-region keys from db
    React.useEffect(() => {
        if (searchMode !== 'country' || !countryQuery.trim() || !db) {
            setCountryResults([]);
            return;
        }

        // Build searchable list: GeoJSON countries that have a recipe + all sub-region keys
        const countryKeySet = new Set(countryIndex.map(c => c.key));
        const list = [];
        countryIndex.forEach(({ key, name, iso2 }) => {
            const recipe = db[key];
            if (recipe) list.push({ key, name, iso2, dish: recipe.dish, type: 'country' });
        });
        // Top-level non-ISO3 keys (e.g. Indian union territories stored at root level)
        Object.keys(db).forEach(key => {
            if (!countryKeySet.has(key)) {
                const parentIso2 = regionParentIso2[key] || null;
                list.push({ key, name: key, iso2: parentIso2, dish: db[key]?.dish, type: 'region' });
            }
        });
        // Nested sub-regions (db['JPN'].regions.Kyoto, db['ESP'].regions.Cataluña, etc.)
        Object.entries(db).forEach(([, recipe]) => {
            if (!recipe || !recipe.regions) return;
            Object.entries(recipe.regions).forEach(([regionKey, regionRecipe]) => {
                const parentIso2 = regionParentIso2[regionKey] || null;
                list.push({
                    key: regionKey,
                    name: regionKey,
                    iso2: parentIso2,
                    dish: regionRecipe?.dish,
                    type: 'region'
                });
            });
        });

        const lq = countryQuery.toLowerCase().trim();
        const filtered = list
            .filter(c => c.name.toLowerCase().includes(lq))
            .sort((a, b) => {
                const al = a.name.toLowerCase(), bl = b.name.toLowerCase();
                if (al === lq) return -1;
                if (bl === lq) return 1;
                if (al.startsWith(lq) && !bl.startsWith(lq)) return -1;
                if (!al.startsWith(lq) && bl.startsWith(lq)) return 1;
                return a.name.localeCompare(b.name);
            })
            .slice(0, 30);

        setCountryResults(filtered);
    }, [countryQuery, searchMode, db, countryIndex, regionParentIso2]);

    // Ingredient filtering & map highlighting
    React.useEffect(() => {
        if (activeSearchMode === 'recipe' && onSearchIngredientsChange)
            onSearchIngredientsChange(selectedIngredients);

        if (searchMode !== 'ingredients' || selectedIngredients.length === 0) {
            setResults([]);
            if (activeSearchMode === 'recipe' && searchMode === 'ingredients') onHighlight(null);
            return;
        }

        const matchedMap = {};
        const matchedRecipes = [];

        const collectIngs = (baseIngs, prelimSteps) => {
            let list = baseIngs ? baseIngs.map(i => parseIngredient(i).toLowerCase()) : [];
            if (prelimSteps)
                prelimSteps.forEach(step => {
                    if (step.ingredients)
                        list = list.concat(step.ingredients.map(i => parseIngredient(i).toLowerCase()));
                });
            return list;
        };

        const checkIngs = (ingList, selected) => {
            if (!ingList.length) return false;
            return matchMode === 'all'
                ? selected.every(sel => ingList.some(rIng => window.isIngredientMatch(rIng, sel)))
                : selected.some(sel => ingList.some(rIng => window.isIngredientMatch(rIng, sel)));
        };

        const checkRecipe = (key, recipe) => {
            const foodIngs = categoryFilters.food ? collectIngs(recipe.ingredients, recipe.preliminary_steps) : [];
            const drinkIngs = (categoryFilters.drink && recipe.drink)
                ? collectIngs(recipe.drink.ingredients, recipe.drink.preliminary_steps) : [];
            const dessertIngs = (categoryFilters.dessert && recipe.dessert)
                ? collectIngs(recipe.dessert.ingredients, recipe.dessert.preliminary_steps) : [];

            const hasFood = categoryFilters.food && checkIngs(foodIngs, selectedIngredients);
            const hasDrink = categoryFilters.drink && checkIngs(drinkIngs, selectedIngredients);
            const hasDessert = categoryFilters.dessert && checkIngs(dessertIngs, selectedIngredients);

            if (hasFood || hasDrink || hasDessert) {
                const type = resolveMatchType(hasFood, hasDrink, hasDessert);
                matchedMap[key] = type;
                matchedRecipes.push({ key, ...recipe, matchType: type, hasFood, hasDrink, hasDessert });
            }
        };

        Object.entries(db).forEach(([key, recipe]) => {
            checkRecipe(key, recipe);
            if (recipe.regions)
                Object.entries(recipe.regions).forEach(([rKey, rRecipe]) => checkRecipe(rKey, rRecipe));
        });

        setResults(matchedRecipes);
        if (activeSearchMode === 'recipe')
            onHighlight(Object.keys(matchedMap).length > 0 ? matchedMap : null);
    }, [selectedIngredients, db, activeSearchMode, categoryFilters, matchMode, searchMode]);

    const resolveMatchType = (hasFood, hasDrink, hasDessert) => {
        if (hasFood && hasDrink && hasDessert) return 'all';
        if (hasFood && hasDrink) return 'both';
        if (hasFood && hasDessert) return 'food+dessert';
        if (hasDrink && hasDessert) return 'drink+dessert';
        if (hasDrink) return 'drink';
        if (hasDessert) return 'dessert';
        return 'food';
    };

    const addIngredient = (ing) => {
        onActivateMode();
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
        setNameQuery('');
        setNameResults([]);
        setCountryQuery('');
        setCountryResults([]);
    };

    const toggleCategory = (key) => {
        setCategoryFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const getMatchBadge = (type) => {
        switch (type) {
            case 'food':          return { label: 'Dish',         cls: 'bg-yellow-900/80 text-yellow-300 border border-yellow-800' };
            case 'drink':         return { label: 'Drink',        cls: 'bg-cyan-900/80 text-cyan-300 border border-cyan-800' };
            case 'dessert':       return { label: 'Dessert',      cls: 'bg-pink-900/80 text-pink-300 border border-pink-800' };
            case 'both':          return { label: 'Dish+Drink',   cls: 'bg-purple-900/80 text-purple-300 border border-purple-800' };
            case 'food+dessert':  return { label: 'Dish+Dessert', cls: 'bg-orange-900/80 text-orange-300 border border-orange-800' };
            case 'drink+dessert': return { label: 'Drink+Dessert',cls: 'bg-indigo-900/80 text-indigo-300 border border-indigo-800' };
            case 'all':           return { label: 'All Three',    cls: 'bg-emerald-900/80 text-emerald-300 border border-emerald-800' };
            default:              return { label: 'Match',        cls: 'bg-gray-700 text-gray-300 border border-gray-600' };
        }
    };

    // Which tab should RecipeCard open on given a match type?
    const tabHintFor = (type) => {
        if (type === 'drink' || type === 'drink+dessert') return 'drink';
        if (type === 'dessert') return 'dessert';
        return 'food';
    };

    const activeResults = searchMode === 'country' ? countryResults
        : searchMode === 'name' ? nameResults : results;
    const hasActiveSearch = searchMode === 'ingredients'
        ? selectedIngredients.length > 0
        : searchMode === 'country'
            ? countryQuery.trim().length > 0
            : nameQuery.trim().length > 0;

    const activeCount = selectedIngredients.length + (nameQuery.trim() ? 1 : 0) + (countryQuery.trim() ? 1 : 0);

    // ── Collapsed state: compact pill bar ──────────────────────────────────────
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-4 left-4 z-[1000] bg-gray-900/95 backdrop-blur-md border border-gray-700 hover:border-yellow-600 text-white pl-3 pr-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 transition-all group"
                title="Open Recipe Finder"
                data-testid="recipe-finder-toggle"
            >
                <span className="text-base">🔍</span>
                <span className="text-sm font-bold text-gray-300 group-hover:text-yellow-400 transition-colors">Recipe Finder</span>
                {hasActiveSearch && activeResults.length > 0 && (
                    <span className="bg-yellow-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">
                        {activeResults.length}
                    </span>
                )}
                {/* Chevron down */}
                <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 transition-colors ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        );
    }

    // ── Expanded state ─────────────────────────────────────────────────────────
    return (
        <div
            className="absolute top-4 left-4 z-[1000] w-80 bg-gray-900/95 text-white rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md flex flex-col max-h-[88vh] animate-in fade-in slide-in-from-top-2 duration-200"
            data-testid="recipe-finder-panel"
        >
            {/* ── Header (click to collapse) ── */}
            <div
                className="p-4 border-b border-gray-700 flex justify-between items-center shrink-0 cursor-pointer hover:bg-gray-800/50 rounded-t-xl transition-colors group"
                onClick={() => setIsOpen(false)}
                title="Collapse Recipe Finder"
            >
                <h3 className="text-base font-serif font-bold text-yellow-500 flex items-center gap-2">
                    <span>🔍</span>
                    <span>Recipe Finder</span>
                    {hasActiveSearch && activeResults.length > 0 && (
                        <span className="bg-yellow-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none ml-1">
                            {activeResults.length}
                        </span>
                    )}
                </h3>
                {/* Chevron up to indicate click-to-collapse */}
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
            </div>

            {/* ── Search Mode Tabs ── */}
            <div className="flex border-b border-gray-700 shrink-0">
                <button
                    onClick={() => setSearchMode('ingredients')}
                    className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        searchMode === 'ingredients'
                            ? 'text-yellow-400 border-b-2 border-yellow-500 bg-gray-800/40'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/20'
                    }`}
                >
                    🧪 Ingredient
                </button>
                <button
                    onClick={() => setSearchMode('name')}
                    className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        searchMode === 'name'
                            ? 'text-yellow-400 border-b-2 border-yellow-500 bg-gray-800/40'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/20'
                    }`}
                >
                    🍽 Dish
                </button>
                <button
                    onClick={() => setSearchMode('country')}
                    className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        searchMode === 'country'
                            ? 'text-blue-400 border-b-2 border-blue-500 bg-gray-800/40'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/20'
                    }`}
                >
                    🌍 Country
                </button>
            </div>

            {/* ── Category Filters (hidden in country mode) ── */}
            {searchMode !== 'country' && <div className="px-4 py-3 border-b border-gray-700 bg-gray-800/20 shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Include</span>
                    <span className="text-[10px] text-gray-600 italic">
                        {[categoryFilters.food && 'Dish', categoryFilters.drink && 'Drink', categoryFilters.dessert && 'Dessert']
                            .filter(Boolean).join(', ') || 'None selected'}
                    </span>
                </div>
                <div className="flex gap-2">
                    <label className={`flex items-center gap-1.5 cursor-pointer text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all select-none flex-1 justify-center ${
                        categoryFilters.food ? 'bg-yellow-900/50 border-yellow-700 text-yellow-300' : 'bg-gray-800 border-gray-700 text-gray-500 hover:border-gray-600'
                    }`}>
                        <input type="checkbox" checked={categoryFilters.food} onChange={() => toggleCategory('food')} className="sr-only" />
                        <span>🍽</span><span>Dish</span>
                    </label>
                    <label className={`flex items-center gap-1.5 cursor-pointer text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all select-none flex-1 justify-center ${
                        categoryFilters.drink ? 'bg-cyan-900/50 border-cyan-700 text-cyan-300' : 'bg-gray-800 border-gray-700 text-gray-500 hover:border-gray-600'
                    }`}>
                        <input type="checkbox" checked={categoryFilters.drink} onChange={() => toggleCategory('drink')} className="sr-only" />
                        <span>🍹</span><span>Drink</span>
                    </label>
                    <label className={`flex items-center gap-1.5 cursor-pointer text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all select-none flex-1 justify-center ${
                        categoryFilters.dessert ? 'bg-pink-900/50 border-pink-700 text-pink-300' : 'bg-gray-800 border-gray-700 text-gray-500 hover:border-gray-600'
                    }`}>
                        <input type="checkbox" checked={categoryFilters.dessert} onChange={() => toggleCategory('dessert')} className="sr-only" />
                        <span>🍰</span><span>Dessert</span>
                    </label>
                </div>
            </div>}

            {/* ── Country Search ── */}
            {searchMode === 'country' && (
                <div className="p-4 border-b border-gray-700 shrink-0">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">🌍</span>
                        <input
                            type="text"
                            value={countryQuery}
                            onChange={(e) => { setCountryQuery(e.target.value); onActivateMode(); }}
                            placeholder="e.g. Fiji, Cataluña, Brittany..."
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-9 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 transition-colors"
                            autoFocus
                        />
                        {countryQuery && (
                            <button
                                onClick={() => { setCountryQuery(''); setCountryResults([]); }}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-200 text-lg leading-none transition-colors"
                            >&times;</button>
                        )}
                    </div>
                </div>
            )}

            {/* ── Ingredient Search ── */}
            {searchMode === 'ingredients' && (
                <div className="p-4 border-b border-gray-700 shrink-0">
                    {/* Match mode */}
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Match mode</span>
                            <span className="text-[10px] text-gray-600 italic">
                                {matchMode === 'all' ? 'All ingredients must appear' : 'Any one ingredient matches'}
                            </span>
                        </div>
                        <div className="flex rounded-lg overflow-hidden border border-gray-700 text-[10px] font-bold shrink-0">
                            <button
                                onClick={() => setMatchMode('all')}
                                className={`px-3 py-1.5 uppercase tracking-wider transition-colors ${matchMode === 'all' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setMatchMode('any')}
                                className={`px-3 py-1.5 uppercase tracking-wider transition-colors ${matchMode === 'any' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                            >
                                Any
                            </button>
                        </div>
                    </div>

                    {/* Selected tags */}
                    {selectedIngredients.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {selectedIngredients.map(ing => (
                                <span
                                    key={ing}
                                    className="bg-yellow-700/70 border border-yellow-600/50 text-yellow-100 text-xs pl-1 pr-2 py-1 rounded-full flex items-center gap-1.5 font-medium animate-in fade-in zoom-in duration-150"
                                >
                                    <img src={getIngredientImage(ing)} alt={ing} className="w-5 h-5 rounded-full bg-yellow-800 object-cover" />
                                    {ing}
                                    <button
                                        onClick={() => removeIngredient(ing)}
                                        className="hover:text-red-300 font-bold leading-none transition-colors"
                                        title={`Remove ${ing}`}
                                    >&times;</button>
                                </span>
                            ))}
                            <button
                                onClick={clearAll}
                                className="text-[10px] text-gray-500 hover:text-red-400 px-1 font-bold transition-colors self-center"
                                title="Clear all ingredients"
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Input */}
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">🔎</span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g. Coconut, Chicken, Lime..."
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-500 transition-colors"
                            data-testid="recipe-finder-search"
                        />
                    </div>

                    {/* Suggestions dropdown */}
                    {suggestions.length > 0 && (
                        <ul
                            className="mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-52 overflow-y-auto z-50 custom-scroll"
                            data-testid="recipe-finder-suggestions"
                        >
                            {suggestions.map(ing => (
                                <li
                                    key={ing}
                                    onClick={() => addIngredient(ing)}
                                    className="px-3 py-2 text-sm hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0 flex items-center gap-3 transition-colors"
                                    data-testid="recipe-finder-suggestion"
                                >
                                    <img src={getIngredientImage(ing)} alt={ing} className="w-7 h-7 rounded-full bg-gray-900 object-cover border border-gray-600 shrink-0" />
                                    <span className="font-medium text-gray-200">{ing}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* ── Name Search ── */}
            {searchMode === 'name' && (
                <div className="p-4 border-b border-gray-700 shrink-0">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">🔎</span>
                        <input
                            type="text"
                            value={nameQuery}
                            onChange={(e) => {
                                setNameQuery(e.target.value);
                                if (e.target.value.trim()) onActivateMode();
                            }}
                            placeholder="e.g. Curry, Mojito, Tiramisu..."
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-9 py-2 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-500 transition-colors"
                        />
                        {nameQuery && (
                            <button
                                onClick={() => { setNameQuery(''); setNameResults([]); }}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-200 text-lg leading-none transition-colors"
                                title="Clear search"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* ── Results ── */}
            <div className="overflow-y-auto custom-scroll flex-grow">
                {/* Results header bar */}
                {hasActiveSearch && searchMode !== 'country' && (
                    <div className="px-3 pt-3 pb-1 flex items-center justify-between shrink-0">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                            {activeResults.length > 0 ? `${activeResults.length} match${activeResults.length === 1 ? '' : 'es'}` : 'No matches'}
                        </span>
                        <button onClick={clearAll} className="text-[10px] text-gray-600 hover:text-red-400 font-bold uppercase tracking-wide transition-colors">Clear</button>
                    </div>
                )}

                {/* No results hint (ingredient / name modes) */}
                {activeResults.length === 0 && hasActiveSearch && searchMode !== 'country' && (
                    <div className="text-center py-6 px-4" data-testid="recipe-finder-no-results">
                        <p className="text-gray-400 text-sm mb-1">No recipes found.</p>
                        {searchMode === 'ingredients' && matchMode === 'all' && selectedIngredients.length > 1 && (
                            <p className="text-gray-600 text-xs italic">
                                Try switching to <span className="text-yellow-600 font-bold">Any</span> mode to broaden results.
                            </p>
                        )}
                        {searchMode === 'ingredients' && (
                            <p className="text-gray-600 text-xs italic mt-1">Check that at least one category is enabled above.</p>
                        )}
                    </div>
                )}

                {/* Empty state (ingredient / name modes) */}
                {!hasActiveSearch && searchMode !== 'country' && (
                    <div className="text-center py-8 px-5">
                        <p className="text-2xl mb-2">{searchMode === 'ingredients' ? '🧂' : '🍽'}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            {searchMode === 'ingredients'
                                ? 'Type an ingredient and select it to highlight matching countries on the map.'
                                : 'Type any dish, drink, or dessert name to find where it\'s from.'}
                        </p>
                    </div>
                )}

                {/* ── Country Results ── */}
                {searchMode === 'country' && (
                    <div className="p-2">
                        {!countryQuery.trim() && (
                            <div className="text-center py-8 px-5">
                                <p className="text-2xl mb-2">🌍</p>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Type a country or region name to fly the map there.
                                </p>
                            </div>
                        )}
                        {countryQuery.trim() && countryResults.length === 0 && (
                            <div className="text-center py-6 px-4">
                                <p className="text-gray-400 text-sm">No places found for "{countryQuery}"</p>
                            </div>
                        )}
                        {countryResults.map(item => (
                            <div
                                key={item.key}
                                onClick={() => onRecipeSelect(item.key)}
                                className="flex items-center gap-3 p-2 hover:bg-gray-800/70 rounded-lg cursor-pointer transition-colors group"
                            >
                                <FlagImg
                                    code={item.iso2}
                                    className="w-10 h-7"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <p className="font-semibold text-sm text-gray-200 group-hover:text-blue-400 transition-colors truncate">
                                            {item.name}
                                        </p>
                                        {item.type === 'region' && (
                                            <span className="text-[9px] px-1 py-0.5 rounded bg-gray-700 text-gray-400 font-bold uppercase tracking-wide shrink-0">Region</span>
                                        )}
                                    </div>
                                    {item.dish && (
                                        <p className="text-[11px] text-gray-500 truncate">{item.dish}</p>
                                    )}
                                </div>
                                <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        ))}
                    </div>
                )}

                {/* Result rows (ingredient / name modes only) */}
                {searchMode !== 'country' && <div className="p-2">
                    {activeResults.map(recipe => {
                        const matchType = recipe.matchType
                            || (recipe.nameMatches && resolveMatchType(
                                recipe.nameMatches.some(m => m.type === 'food'),
                                recipe.nameMatches.some(m => m.type === 'drink'),
                                recipe.nameMatches.some(m => m.type === 'dessert')
                            ));
                        const { label, cls } = getMatchBadge(matchType);

                        // Show the name of what actually matched, with the correct image category.
                        // Pass recipe.key as geographic context so Bing narrows to the right cuisine.
                        const ctx = recipe.key || '';
                        const getIngredientDisplayInfo = (recipe, matchType) => {
                            const foodName    = recipe.dish;
                            const drinkName   = recipe.drink?.dish;
                            const dessertName = recipe.dessert?.dish;
                            switch (matchType) {
                                case 'drink':        return { name: drinkName || foodName,           imgSrc: getDrinkImage(drinkName || foodName, ctx) };
                                case 'dessert':      return { name: dessertName || foodName,         imgSrc: getDessertImage(dessertName || foodName, ctx) };
                                case 'both':         return { name: `${foodName} / ${drinkName}`,    imgSrc: getDishImage(foodName, ctx) };
                                case 'food+dessert': return { name: `${foodName} / ${dessertName}`,  imgSrc: getDishImage(foodName, ctx) };
                                case 'drink+dessert':return { name: `${drinkName} / ${dessertName}`, imgSrc: getDrinkImage(drinkName || foodName, ctx) };
                                case 'all':          return { name: foodName,                        imgSrc: getDishImage(foodName, ctx) };
                                default:             return { name: foodName,                        imgSrc: getDishImage(foodName, ctx) };
                            }
                        };

                        const getNameMatchInfo = () => {
                            if (!recipe.nameMatches) return { name: recipe.dish, imgSrc: getDishImage(recipe.dish, ctx) };
                            const names = recipe.nameMatches.map(m => m.name).join(' / ');
                            const first = recipe.nameMatches[0];
                            const imgSrc = first.type === 'drink'   ? getDrinkImage(first.name, ctx)
                                         : first.type === 'dessert' ? getDessertImage(first.name, ctx)
                                         : getDishImage(first.name, ctx);
                            return { name: names, imgSrc };
                        };

                        const { name: displayName, imgSrc } = (searchMode === 'name' && recipe.nameMatches)
                            ? getNameMatchInfo()
                            : getIngredientDisplayInfo(recipe, matchType);

                        return (
                        <div
                            key={recipe.key}
                            onClick={() => onRecipeSelect(recipe.key, tabHintFor(matchType))}
                            className="flex items-center gap-3 p-2 hover:bg-gray-800/70 rounded-lg cursor-pointer transition-colors group"
                            data-testid="recipe-result"
                        >
                                <FoodImage
                                    src={imgSrc}
                                    alt={displayName}
                                    className="w-11 h-11 rounded-lg object-cover bg-gray-700 border border-gray-700 group-hover:border-yellow-600 transition-colors shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm leading-tight text-gray-200 group-hover:text-yellow-400 transition-colors truncate">
                                        {displayName}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${cls}`}>
                                            {label}
                                        </span>
                                        <span className="text-[10px] text-gray-600">{recipe.key}</span>
                                    </div>
                                </div>
                                <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-yellow-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        );
                    })}
                </div>}
            </div>
        </div>
    );
};

window.RecipeFinder = RecipeFinder;
