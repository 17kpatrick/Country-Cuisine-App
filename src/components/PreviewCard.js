const PreviewCard = ({ feature, db, parentIso3 }) => {
    if (!feature) return null;

    const p = feature.properties;

    const isState = !!(p.st_nm || p.ST_NM || p.NAME_1 || p.name_1 || p.nom || p.state_name || p.NOM_DPTO || p.reg_name || p.NM4);

    const countryCode = isState ? null : ((p.ISO_A3 && p.ISO_A3 !== '-99' ? p.ISO_A3 : p.ADM0_A3) || feature.id);
    let countryName = (p.st_nm || p.ST_NM || p.NAME_1 || p.name_1 || p.NAME || p.ADMIN || p.name_latin || p.name || p.nom || p.state_name || p.NOM_DPTO || p.reg_name || p.NM4 || '').trim();

    if (countryName === 'Orissa') countryName = 'Odisha';
    if (countryName === 'Uttaranchal') countryName = 'Uttarakhand';
    if (countryName === 'Pondicherry') countryName = 'Puducherry';
    if (countryName.includes('Andaman')) countryName = 'Andaman and Nicobar Islands';
    if (countryName.includes('Dadra') || countryName.includes('Daman')) countryName = 'Dadra and Nagar Haveli and Daman and Diu';
    if (countryName === 'Jammu & Kashmir') countryName = 'Jammu and Kashmir';
    if (countryName === 'Distrito Federal') countryName = 'Ciudad de México';
    if (countryName === 'Ile-de-France') countryName = 'Île-de-France';
    if (countryName === 'Michoacán de Ocampo') countryName = 'Michoacán';
    if (countryName === 'Veracruz de Ignacio de la Llave') countryName = 'Veracruz';
    if (countryName === 'Coahuila de Zaragoza') countryName = 'Coahuila';
    if (countryName.includes('/Vall')) countryName = "Valle d'Aosta";
    if (countryName.includes('/Südtirol')) countryName = 'Trentino-Alto Adige';

    let culinaryData = window.getRecipeFromDB(db, countryCode, parentIso3) || window.getRecipeFromDB(db, countryName, parentIso3);
    if (!culinaryData) culinaryData = getGenericRecipe(countryName);

    const theme = getCountryTheme(countryCode);
    const iso2 = (countryName === 'Taiwan' || p.ISO_A3 === 'TWN') ? 'TW' : (p.ISO_A2 && p.ISO_A2 !== '-99' ? p.ISO_A2 : p.ISO_A2_EH);
    const flagUrl = iso2 ? `https://flagcdn.com/w80/${iso2.toLowerCase()}.png` : null;

    const food    = culinaryData;
    const drink   = culinaryData.drink   || null;
    const dessert = culinaryData.dessert || null;

    // Build the list of panels to show — always food, plus whichever exist
    const panels = [
        { key: 'food',    icon: '🍽',  label: 'Dish',    data: food,    accent: '#eab308' },
        drink   && { key: 'drink',   icon: '🍹',  label: 'Drink',   data: drink,   accent: '#06b6d4' },
        dessert && { key: 'dessert', icon: '🍰',  label: 'Dessert', data: dessert, accent: '#ec4899' },
    ].filter(Boolean);

    const colCount = panels.length; // 1, 2, or 3

    return (
        <div
            className="absolute bottom-8 left-8 z-[1000] bg-gray-900/92 text-gray-100 rounded-2xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4 duration-250 pointer-events-none"
            style={{ width: colCount === 1 ? '240px' : colCount === 2 ? '300px' : '360px' }}
        >
            {/* Country header */}
            <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.07]" style={{ borderBottomColor: theme.primary + '30' }}>
                {flagUrl && (
                    <img src={flagUrl} className="h-4 w-auto rounded-sm shadow opacity-90" alt="" />
                )}
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-200 truncate flex-1">{countryName}</p>
            </div>

            {/* Panels grid */}
            <div className={`grid divide-x divide-white/[0.05]`} style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}>
                {panels.map(({ key, icon, label, data, accent }) => (
                    <div key={key} className="flex flex-col">
                        {/* Thumbnail */}
                        <div className="relative" style={{ aspectRatio: '4/3' }}>
                            <FoodImage
                                src={
                                    key === 'drink'   ? getDrinkImage(data.dish, countryName) :
                                    key === 'dessert' ? getDessertImage(data.dish, countryName) :
                                    getDishImage(data.dish, countryName)
                                }
                                alt={data.dish}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                            {/* Category badge */}
                            <div
                                className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide bg-black/50 backdrop-blur-sm"
                                style={{ color: accent }}
                            >
                                <span>{icon}</span>
                                <span>{label}</span>
                            </div>
                        </div>

                        {/* Dish name */}
                        <div className="px-2.5 py-2 bg-black/20">
                            <p className="text-[11px] font-semibold text-gray-200 leading-snug line-clamp-2">{data.dish}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

window.PreviewCard = PreviewCard;
