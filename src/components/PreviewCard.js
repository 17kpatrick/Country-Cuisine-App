const PreviewCard = ({ feature, db }) => {
    if (!feature) return null;
    
    const p = feature.properties;
    
    // Prioritize state name (st_nm) if present, otherwise fallback to standard country logic
    // This ensures we don't accidentally look up "IND" when hovering over a state
    const isState = !!(p.st_nm || p.ST_NM || p.NAME_1 || p.name_1 || p.nom || p.state_name || p.NOM_DPTO || p.reg_name);
    
    const countryCode = isState ? null : ((p.ISO_A3 && p.ISO_A3 !== '-99' ? p.ISO_A3 : p.ADM0_A3) || feature.id);
    let countryName = (p.st_nm || p.ST_NM || p.NAME_1 || p.name_1 || p.NAME || p.ADMIN || p.name || p.nom || p.state_name || p.NOM_DPTO || p.reg_name || '').trim();
    
    // Fix common GeoJSON name mismatches
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
    if (countryName.includes('/S\u00fcdtirol')) countryName = 'Trentino-Alto Adige';
    
    // Get data or fallback
    let culinaryData = window.getRecipeFromDB(db, countryCode) || window.getRecipeFromDB(db, countryName);
    if (!culinaryData) culinaryData = getGenericRecipe(countryName);
    
    const imageUrl = getDishImage(culinaryData.dish);
    const theme = getCountryTheme(countryCode);
    
    // Try to get flag from feature properties if available, or fallback
    const iso2 = (countryName === 'Taiwan' || p.ISO_A3 === 'TWN') ? 'TW' : (p.ISO_A2 && p.ISO_A2 !== '-99' ? p.ISO_A2 : p.ISO_A2_EH);
    const flagUrl = iso2 ? `https://flagcdn.com/w80/${iso2.toLowerCase()}.png` : null;

    return (
        <div className="absolute bottom-8 left-8 z-[1000] w-80 bg-gray-900/90 text-gray-100 rounded-3xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
            <div className="h-40 relative">
                <img src={imageUrl} alt={culinaryData.dish} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1">
                        {flagUrl && <img src={flagUrl} className="h-3 w-auto rounded-sm shadow-sm" alt="" style={{ borderColor: theme.primary, borderWidth: '0 0 2px 0' }} />}
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-100 drop-shadow-md">{countryName}</p>
                    </div>
                    <h3 className="text-xl font-serif font-bold leading-tight shadow-black drop-shadow-md">{culinaryData.dish}</h3>
                </div>
            </div>
            {culinaryData.drink && (
                <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center gap-2">
                    <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">Drink:</span>
                    <span className="text-xs text-gray-300 font-medium truncate">{culinaryData.drink.dish}</span>
                </div>
            )}
        </div>
    );
};

window.PreviewCard = PreviewCard;