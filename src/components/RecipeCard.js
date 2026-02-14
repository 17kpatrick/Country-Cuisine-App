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
    const displayData = activeTab === 'drink' && hasDrink ? fullData.drink : fullData;

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
            className="absolute top-20 right-6 z-[1000] w-[26rem] text-gray-100 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-10 duration-500 flex flex-col max-h-[80vh] border border-white/10 bg-gray-900/80 backdrop-blur-2xl"
        >
            
            {/* 1. Header Image */}
            <div className="h-48 relative shrink-0 bg-gray-800 z-10">
                 <img 
                    src={imageUrl} 
                    alt={displayData.dish} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/333/FFF?text=No+Image+Available";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                     <div className="flex items-center gap-3 mb-2">
                        <img src={flagUrl} alt="Flag" className="h-4 w-auto rounded shadow-sm" />
                        {/* Ready Badge */}
                        {matchBadge && (
                            <span className={`${matchBadge.color} text-white text-[10px] font-bold px-2 py-0.5 rounded border shadow-sm`}>
                                {matchBadge.text}
                            </span>
                        )}
                        <p className="text-xs font-bold uppercase tracking-widest text-white/90 shadow-black drop-shadow-md">
                            {country.name.common}
                        </p>
                     </div>
                     <h2 className="text-3xl font-serif font-bold text-white shadow-black drop-shadow-md leading-none">
                        {displayData.dish}
                     </h2>
                </div>

                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all backdrop-blur-md border border-white/10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            {/* Tabs */}
            {hasDrink && (
                <div className="flex border-b border-white/10 bg-black/20 z-10">
                    <button 
                        onClick={() => setActiveTab('food')}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'food' ? 'text-white bg-white/10' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        🍽️ Food
                    </button>
                    <button 
                        onClick={() => setActiveTab('drink')}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'drink' ? 'text-white bg-white/10' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        🍷 Drink
                    </button>
                </div>
            )}

            {/* 2. Recipe Content */}
            <div className="p-6 overflow-y-auto custom-scroll flex-grow z-10 relative">
                
                {/* Description */}
                {displayData.description && (
                    <div className="mb-8 text-gray-300 italic border-l-2 pl-4 text-sm leading-relaxed font-light" style={{ borderColor: activeTab === 'drink' ? '#06b6d4' : theme.primary }}>
                        {displayData.description}
                    </div>
                )}

                {/* Ingredients */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2 text-gray-400">Ingredients</h3>
                    <div className="grid grid-cols-1 gap-3">
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
                                <div key={i} className={`flex items-center text-sm font-light ${isMatch ? 'text-yellow-400 font-medium' : 'text-gray-300'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${isMatch ? 'bg-yellow-400' : ''}`} style={{ backgroundColor: isMatch ? undefined : theme.primary }}></span>
                                    {ing}
                                    {isMatch && <span className="ml-auto text-[10px] uppercase tracking-wider opacity-70">Match</span>}
                                </div>
                            );
                        })}
                    </div>
                    <button 
                        onClick={handleAddMissing}
                        className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        <span>🛒</span> Add Missing to Cart
                    </button>
                </div>

                {/* Preliminary Steps (Chef's Essentials) */}
                {displayData.preliminary_steps && displayData.preliminary_steps.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2 text-gray-400 flex items-center gap-2">
                            <span style={{ color: theme.primary }}>⚡</span> Chef's Essentials
                        </h3>
                        <div className="space-y-4">
                            {displayData.preliminary_steps.map((prep, idx) => (
                                <div key={idx} className="bg-black/20 rounded-lg p-4 border border-white/5 hover:border-white/10 transition-colors">
                                    <h4 className="text-sm font-bold text-gray-200 mb-3 flex items-center gap-2">
                                        {prep.item}
                                    </h4>
                                    
                                    <div className="space-y-3">
                                        {prep.ingredients && prep.ingredients.length > 0 && (
                                            <div className="text-xs text-gray-400">
                                                <span className="uppercase font-bold text-[10px] tracking-wider opacity-70 block mb-1.5">Needs:</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {prep.ingredients.map((ing, i) => {
                                                        // Don't split by comma - comma separates ingredient from prep method
                                                        const parsed = window.parseIngredient(ing).toLowerCase();
                                                        const isMatch = (() => {
                                                            if (!parsed || window.isStaple(parsed)) return false;
                                                            const options = parsed.split(/\s+or\s+/i).map(s => s.trim());
                                                            return options.some(opt =>
                                                            searchIngredients.some(s => window.isIngredientMatch(opt, s))
                                                            );
                                                        })();

                                                        return (
                                                            <span key={i} className={`px-2 py-1 rounded border inline-block leading-tight ${isMatch ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-200' : 'bg-white/5 border-white/5 text-gray-300'}`}>
                                                                {ing}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {prep.steps && prep.steps.length > 0 && (
                                            <div className="text-xs text-gray-400">
                                                <span className="uppercase font-bold text-[10px] tracking-wider opacity-70 block mb-1">Make it:</span>
                                                <ol className="list-decimal list-outside ml-4 space-y-1 text-gray-300 font-light marker:text-gray-500">
                                                    {prep.steps.map((step, i) => (
                                                        <li key={i} className="pl-1">{step}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Steps */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2 text-gray-400">Preparation</h3>
                    <div className="space-y-6">
                        {displayData.steps.map((step, i) => (
                            <div key={i} className="flex">
                                <span 
                                    className="flex-shrink-0 w-6 h-6 rounded-full border border-white/20 text-gray-400 text-[10px] flex items-center justify-center mr-4 font-mono mt-0.5"
                                >
                                    {i + 1}
                                </span>
                                <p className="text-sm text-gray-300 leading-relaxed font-light">
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
