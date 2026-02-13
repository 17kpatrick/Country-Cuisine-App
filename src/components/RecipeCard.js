const RecipeCard = ({ country, onClose, db }) => {
    if (!country) return null;

    // Get data or fallback
    let culinaryData = db[country.cca3] || db[country.name.common];
    
    if (!culinaryData) {
        culinaryData = getGenericRecipe(country.name.common);
    }

    const imageUrl = getDishImage(culinaryData.dish);
    const theme = getCountryTheme(country.cca3);
    
    // Flag URL - use CDN if cca2 exists, otherwise fallback to search
    const flagUrl = country.cca2 
        ? `https://flagcdn.com/w160/${country.cca2.toLowerCase()}.png`
        : `https://tse2.mm.bing.net/th?q=flag+of+${country.name.common}&w=100&h=60&c=7&rs=1&p=0`;

    return (
        <div 
            className="absolute top-6 right-6 z-[1000] w-[26rem] text-gray-100 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-10 duration-500 flex flex-col max-h-[85vh] border border-white/10 bg-gray-900/80 backdrop-blur-2xl"
        >
            
            {/* 1. Header Image */}
            <div className="h-48 relative shrink-0 bg-gray-800 z-10">
                 <img 
                    src={imageUrl} 
                    alt={culinaryData.dish} 
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
                        <p className="text-xs font-bold uppercase tracking-widest text-white/90 shadow-black drop-shadow-md">
                            {country.name.common}
                        </p>
                     </div>
                     <h2 className="text-3xl font-serif font-bold text-white shadow-black drop-shadow-md leading-none">
                        {culinaryData.dish}
                     </h2>
                </div>

                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all backdrop-blur-md border border-white/10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            {/* 2. Recipe Content */}
            <div className="p-6 overflow-y-auto custom-scroll flex-grow z-10 relative">
                
                {/* Description */}
                {culinaryData.description && (
                    <div className="mb-8 text-gray-300 italic border-l-2 pl-4 text-sm leading-relaxed font-light" style={{ borderColor: theme.primary }}>
                        {culinaryData.description}
                    </div>
                )}

                {/* Ingredients */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2 text-gray-400">Ingredients</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {culinaryData.ingredients.map((ing, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-300 font-light">
                                <span className="w-1.5 h-1.5 rounded-full mr-3 shrink-0" style={{ backgroundColor: theme.primary }}></span>
                                {ing}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Steps */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2 text-gray-400">Preparation</h3>
                    <div className="space-y-6">
                        {culinaryData.steps.map((step, i) => (
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