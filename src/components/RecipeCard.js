const RecipeCard = ({ country, onClose, db, searchIngredients = [], onAddToShoppingList, onShowToast }) => {
    const [activeTab, setActiveTab] = React.useState('food');

    if (!country) return null;

    // Get data or fallback
    let fullData = window.getRecipeFromDB(db, country.cca3) || window.getRecipeFromDB(db, country.name.common);
    
    if (!fullData) {
        fullData = getGenericRecipe(country.name.common);
    }

    // Determine what to show based on tab
    const hasDrink = !!fullData.drink;
    const hasDessert = !!fullData.dessert;
    const displayData = activeTab === 'drink' && hasDrink ? fullData.drink
        : activeTab === 'dessert' && hasDessert ? fullData.dessert
        : fullData;

    const imageUrl = getDishImage(displayData.dish);
    const theme = getCountryTheme(country.cca3);
    
    // Flag URL - use CDN if cca2 exists, otherwise fallback to search
    const flagUrl = country.cca2 
        ? `https://flagcdn.com/w160/${country.cca2.toLowerCase()}.png`
        : `https://tse2.mm.bing.net/th?q=flag+of+${country.name.common}&w=100&h=60&c=7&rs=1&p=0`;

    // --- MATCHING LOGIC ---
    const getMatchStatus = () => {
        // Combine search ingredients (if active) with stored stockpile
        const storedStockpile = JSON.parse(localStorage.getItem('ingredientStockpile') || '[]');
        const ownedList = [
            ...searchIngredients.map(i => i.toLowerCase()),
            ...storedStockpile.map(i => i.toLowerCase())
        ];
        const uniqueOwned = [...new Set(ownedList)];

        let totalNonStaples = 0;
        let metNonStaples = 0;

        const checkList = (list) => {
            if (!list) return;
            list.forEach(ing => {
                // Don't split by comma - comma separates ingredient from prep method
                const parsed = window.parseIngredient(ing).toLowerCase();
                if (!parsed) return;

                // Handle "OR" logic (e.g. "Beef or Chicken")
                const options = parsed.split(/\s+or\s+/i).map(s => s.trim());

                // Check if ANY option is a staple
                const isStaple = options.some(opt => window.isStaple(opt));

                // Check if we have ANY of the options (or if it's a staple)
                const hasIt = options.some(opt =>
                    window.isStaple(opt) ||
                    uniqueOwned.some(owned => window.isIngredientMatch(opt, owned))
                );

                // Only count towards "Missing" if it's NOT a staple
                if (!isStaple) {
                    totalNonStaples++;
                    if (hasIt) metNonStaples++;
                }
            });
        };

        checkList(displayData.ingredients);
        if (displayData.preliminary_steps) {
            displayData.preliminary_steps.forEach(step => checkList(step.ingredients));
        }

        if (totalNonStaples === 0) return null; // Only staples?
        if (metNonStaples === totalNonStaples) return { text: "READY TO COOK", color: "bg-emerald-600 border-emerald-400" };
        if (metNonStaples > 0) return { text: `MISSING ${totalNonStaples - metNonStaples}`, color: "bg-yellow-600 border-yellow-400" };
        
        return null; // No matches
    };

    const matchBadge = getMatchStatus();

    const handleAddMissing = () => {
        if (!onAddToShoppingList) return;
        
        const missing = [];
        
        const storedStockpile = JSON.parse(localStorage.getItem('ingredientStockpile') || '[]');
        const ownedList = [
            ...searchIngredients.map(i => i.toLowerCase()),
            ...storedStockpile.map(i => i.toLowerCase())
        ];
        const uniqueOwned = [...new Set(ownedList)];

        const checkAndAdd = (ingredients) => {
             ingredients.forEach(ing => {
                // Don't split by comma - comma separates ingredient from prep method
                const parsed = window.parseIngredient(ing).toLowerCase();
                if (!parsed || window.isStaple(parsed)) return;

                const options = parsed.split(/\s+or\s+/i).map(s => s.trim());

                const hasRequirement = options.some(opt =>
                    window.isStaple(opt) ||
                    uniqueOwned.some(owned => window.isIngredientMatch(opt, owned))
                );

                if (!hasRequirement) {
                    missing.push(window.parseIngredient(options[0]));
                }
            });
        };

        if (displayData.ingredients) checkAndAdd(displayData.ingredients);
        
        if (displayData.preliminary_steps) {
            displayData.preliminary_steps.forEach(step => {
                if (step.ingredients) checkAndAdd(step.ingredients);
            });
        }
        
        if (missing.length > 0) {
            onAddToShoppingList(missing);
            if (onShowToast) {
                onShowToast(`Added ${missing.length} items to cart!`);
            }
        } else {
            if (onShowToast) {
                onShowToast("You have all the ingredients!", "success");
            }
        }
    };

    return (
        <div 
            className="absolute top-16 right-6 z-[1000] w-[340px] max-w-[calc(100vw-3rem)] flex flex-col max-h-[88vh] overflow-hidden rounded-2xl bg-[#0f1419]/95 backdrop-blur-xl border border-white/[0.06] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-right-4 duration-300"
        >
            {/* Header */}
            <div className="relative h-44 shrink-0 bg-neutral-900">
                 <img 
                    src={imageUrl} 
                    alt={displayData.dish} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/1f2937/94a3b8?text=No+Image";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5">
                     <div className="flex items-center gap-2.5 mb-1.5">
                        <img src={flagUrl} alt="" className="h-3.5 w-auto rounded-sm opacity-90" />
                        {matchBadge && (
                            <span className={`${matchBadge.color} text-white text-[10px] font-medium px-2 py-0.5 rounded-md`}>
                                {matchBadge.text}
                            </span>
                        )}
                        <span className="text-[11px] font-medium text-white/80 tracking-wide">
                            {country.name.common}
                        </span>
                     </div>
                     <h2 className="text-2xl font-serif font-semibold text-white leading-snug">
                        {displayData.dish}
                     </h2>
                </div>

                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(displayData.dish + ' recipe ' + country.name.common)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-500 text-white text-[10px] font-semibold tracking-wide shadow-lg transition-all hover:scale-105 backdrop-blur-sm border border-red-400/20"
                    title="Watch recipe tutorials on YouTube"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    Tutorial
                </a>

                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white/90 flex items-center justify-center transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>

            {(hasDrink || hasDessert) && (
                <div className="flex border-b border-white/[0.06] z-10">
                    <button 
                        onClick={() => setActiveTab('food')}
                        className={`flex-1 py-2.5 text-[11px] font-medium tracking-wide transition-colors ${activeTab === 'food' ? 'text-white bg-white/[0.08] border-b-2' : 'text-gray-500 hover:text-gray-400'} border-transparent`}
                        style={activeTab === 'food' ? { borderColor: theme.primary } : {}}
                    >
                        Food
                    </button>
                    {hasDrink && (
                        <button 
                            onClick={() => setActiveTab('drink')}
                            className={`flex-1 py-2.5 text-[11px] font-medium tracking-wide transition-colors ${activeTab === 'drink' ? 'text-white bg-white/[0.08] border-b-2' : 'text-gray-500 hover:text-gray-400'} border-transparent`}
                            style={activeTab === 'drink' ? { borderColor: theme.primary } : {}}
                        >
                            Drink
                        </button>
                    )}
                    {hasDessert && (
                        <button 
                            onClick={() => setActiveTab('dessert')}
                            className={`flex-1 py-2.5 text-[11px] font-medium tracking-wide transition-colors ${activeTab === 'dessert' ? 'text-white bg-white/[0.08] border-b-2' : 'text-gray-500 hover:text-gray-400'} border-transparent`}
                            style={activeTab === 'dessert' ? { borderColor: theme.primary } : {}}
                        >
                            Dessert
                        </button>
                    )}
                </div>
            )}

            <div className="p-5 overflow-y-auto custom-scroll flex-grow">
                {displayData.description && (
                    <p className="mb-6 text-[13px] text-gray-400 leading-relaxed">
                        {displayData.description}
                    </p>
                )}

                <div className="mb-6">
                    <h3 className="text-[11px] font-semibold text-gray-500 tracking-wide mb-3">Ingredients</h3>
                    <div className="grid grid-cols-1 gap-2.5">
                        {displayData.ingredients.map((ing, i) => {
                            // Check match for highlighting (don't split by comma)
                            const parsed = window.parseIngredient(ing).toLowerCase();
                            const isMatch = (() => {
                                if (!parsed || window.isStaple(parsed)) return false;
                                const options = parsed.split(/\s+or\s+/i).map(s => s.trim());
                                return options.some(opt =>
                                    searchIngredients.some(s => window.isIngredientMatch(opt, s))
                                );
                            })();

                            return (
                                <div key={i} className={`flex items-center gap-2 py-1.5 text-[13px] ${isMatch ? 'text-amber-200' : 'text-gray-400'}`}>
                                    <span className={`w-1 h-1 rounded-full shrink-0 ${isMatch ? 'bg-amber-400' : 'bg-gray-600'}`} />
                                    <span className="flex-1">{ing}</span>
                                    {isMatch && <span className="text-[10px] text-amber-400/80">✓</span>}
                                </div>
                            );
                        })}
                    </div>
                    <button 
                        onClick={handleAddMissing}
                        className="mt-4 w-full py-2.5 rounded-lg text-[12px] font-medium transition-colors flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/[0.08]"
                    >
                        Add Missing to Cart
                    </button>
                </div>

                {displayData.preliminary_steps && displayData.preliminary_steps.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-[11px] font-semibold text-gray-500 tracking-wide mb-3">Chef&apos;s Essentials</h3>
                        <div className="space-y-4">
                            {displayData.preliminary_steps.map((prep, idx) => (
                                <div key={idx} className="rounded-lg p-3.5 bg-white/[0.03] border border-white/[0.04]">
                                    <h4 className="text-[13px] font-medium text-gray-300 mb-2">{prep.item}</h4>
                                    <div className="space-y-2">
                                        {prep.ingredients && prep.ingredients.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {prep.ingredients.map((ing, i) => {
                                                    const parsed = window.parseIngredient(ing).toLowerCase();
                                                    const options = parsed ? parsed.split(/\s+or\s+/i).map(s => s.trim()) : [];
                                                    const isMatch = options.some(opt => searchIngredients.some(s => window.isIngredientMatch(opt, s)));
                                                    return (
                                                        <span key={i} className={`text-[11px] px-2 py-0.5 rounded ${isMatch ? 'bg-amber-500/20 text-amber-200' : 'bg-white/[0.06] text-gray-400'}`}>
                                                            {ing}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        {prep.steps && prep.steps.length > 0 && (
                                            <ol className="list-decimal list-inside text-[12px] text-gray-500 space-y-0.5 ml-0.5">
                                                {prep.steps.map((step, i) => (
                                                    <li key={i}>{step}</li>
                                                ))}
                                            </ol>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-[11px] font-semibold text-gray-500 tracking-wide mb-3">Preparation</h3>
                    <div className="space-y-4">
                        {displayData.steps.map((step, i) => (
                            <div key={i} className="flex gap-3">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-white/[0.06] text-[10px] text-gray-500 flex items-center justify-center font-medium">
                                    {i + 1}
                                </span>
                                <p className="text-[13px] text-gray-400 leading-relaxed">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

window.RecipeCard = RecipeCard;
