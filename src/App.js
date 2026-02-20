const { useState, useEffect, useRef } = React;

const REGION_CONFIG = window.getRegionConfig();

// Helper to extract ISO codes safely (handling Natural Earth's -99 quirks)
const getIso3 = (feature) => {
    const p = feature.properties;
    return (p.ISO_A3 && p.ISO_A3 !== '-99' ? p.ISO_A3 : p.ADM0_A3) || feature.id;
};
const getIso2 = (feature) => {
    const p = feature.properties;
    return (p.ISO_A2 && p.ISO_A2 !== '-99' ? p.ISO_A2 : p.ISO_A2_EH);
};

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
    'Lakshadweep', 'Puducherry'
];

const CHINESE_PROVINCES = [
    'Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou',
    'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu',
    'Jiangxi', 'Jilin', 'Liaoning', 'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai',
    'Shanxi', 'Sichuan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang', 'Taiwan'
];

const BRAZIL_STATES = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
    'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
    'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina',
    'São Paulo', 'Sergipe', 'Tocantins'
];

const DENMARK_REGIONS = [
    'Region Hovedstaden', 'Region Midtjylland', 'Region Nordjylland', 'Region Sjælland', 'Region Syddanmark'
];

const FRANCE_REGIONS = [
    'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire', 'Corse',
    'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandie', 'Nouvelle-Aquitaine',
    'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur',
    'Guadeloupe', 'Martinique', 'Guyane', 'La Réunion', 'Mayotte'
];

const MEXICO_STATES = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
    'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo',
    'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
    'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
    'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

const ITALIAN_REGIONS = [
    'Piemonte', 'Valle d\'Aosta', 'Lombardia', 'Trentino-Alto Adige', 'Veneto',
    'Friuli-Venezia Giulia', 'Liguria', 'Emilia-Romagna', 'Toscana', 'Umbria',
    'Marche', 'Lazio', 'Abruzzo', 'Molise', 'Campania', 'Puglia', 'Basilicata',
    'Calabria', 'Sicilia', 'Sardegna'
];

const SLOVAK_REGIONS = [
    'Bratislavsky', 'Trnavsky', 'Trenciansky', 'Nitriansky',
    'Zilinsky', 'Banskobystricky', 'Presovsky', 'Kosicky'
];

const SWEDISH_COUNTIES = [
    'Stockholm', 'Uppsala', 'Södermanland', 'Östergötland', 'Jönköping',
    'Kronoberg', 'Kalmar', 'Gotland', 'Blekinge', 'Skåne', 'Halland',
    'Västra Götaland', 'Värmland', 'Örebro', 'Västmanland', 'Dalarna',
    'Gävleborg', 'Västernorrland', 'Jämtland', 'Västerbotten', 'Norrbotten'
];

const RUSSIAN_REGIONS = [
    'Moscow', 'Saint Petersburg', 'Republic of Tatarstan', 'Republic of Dagestan',
    'Krasnodar Krai', 'Republic of Bashkortostan', 'Sakha (Yakutia) Republic',
    'Murmansk Oblast', 'Kaliningrad Oblast', 'Republic of Buryatia',
    'Kamchatka Krai', 'Chechen Republic', 'Republic of Karelia',
    'Astrakhan Oblast', 'Altai Republic', 'Primorsky Krai',
    'Sverdlovsk Oblast', 'Rostov Oblast', 'Sakhalin Oblast', 'Tuva Republic',
    'Voronezh Oblast', 'Novosibirsk Oblast', 'Stavropol Krai', 'Altai Krai',
    'Volgograd Oblast', 'Samara Oblast', 'Republic of Adygea', 'Republic of Kalmykia',
    'Pskov Oblast', 'Leningrad Oblast', 'Republic of Mordovia', 'Tula Oblast',
    'Perm Krai', 'Chuvash Republic', 'Republic of North Ossetia-Alania',
    'Nizhny Novgorod Oblast', 'Krasnoyarsk Krai', 'Komi Republic',
    'Kabardino-Balkar Republic', 'Irkutsk Oblast', 'Khabarovsk Krai',
    'Republic of Khakassia', 'Yaroslavl Oblast', 'Udmurt Republic',
    'Vologda Oblast', 'Republic of Ingushetia', 'Chelyabinsk Oblast',
    'Arkhangelsk Oblast', 'Omsk Oblast', 'Chukotka Autonomous Okrug'
];

const SPANISH_REGIONS = [
    'Andalucia', 'Aragon', 'Asturias', 'Baleares', 'Canarias', 'Cantabria',
    'Castilla-La Mancha', 'Castilla-Leon', 'Cataluña', 'Ceuta', 'Extremadura',
    'Galicia', 'La Rioja', 'Madrid', 'Melilla', 'Murcia', 'Navarra',
    'Pais Vasco', 'Valencia'
];

const GREEK_REGIONS = [
    'East Macedonia and Thrace', 'Central Macedonia', 'West Macedonia', 'Thessaly',
    'Epirus', 'Ionian Islands', 'Western Greece', 'Central Greece', 'Peloponnese',
    'Attica', 'North Aegean', 'South Aegean', 'Crete'
];

const EL_SALVADOR_DEPARTMENTS = [
    'Ahuachapán', 'Cabañas', 'Chalatenango', 'Cuscatlán', 'La Libertad', 'La Paz', 'La Unión',
    'Morazán', 'San Miguel', 'San Salvador', 'San Vicente', 'Santa Ana', 'Sonsonate', 'Usulután'
];

const EL_SALVADOR_NAME_MAPPING = {
    "AHUACHAPAN": "Ahuachapán", "AHUACHAPÁN": "Ahuachapán",
    "CABANAS": "Cabañas", "CABAÑAS": "Cabañas",
    "CHALATENANGO": "Chalatenango",
    "CUSCATLAN": "Cuscatlán", "CUSCATLÁN": "Cuscatlán",
    "LA LIBERTAD": "La Libertad",
    "LA PAZ": "La Paz",
    "LA UNION": "La Unión", "LA UNIÓN": "La Unión",
    "MORAZAN": "Morazán", "MORAZÁN": "Morazán",
    "SAN MIGUEL": "San Miguel",
    "SAN SALVADOR": "San Salvador",
    "SAN VICENTE": "San Vicente",
    "SANTA ANA": "Santa Ana",
    "SONSONATE": "Sonsonate",
    "USULUTAN": "Usulután", "USULUTÁN": "Usulután"
};

const MEXICO_NAME_MAPPING = {
    "Michoacán de Ocampo": "Michoacán",
    "Veracruz de Ignacio de la Llave": "Veracruz",
    "Coahuila de Zaragoza": "Coahuila"
};

const FRANCE_NAME_MAPPING = {
    "Ile-de-France": "Île-de-France"
};

const SLOVAKIA_NAME_MAPPING = {
    "Bratislavsk\u00fd": "Bratislavsky",
    "Trnavsk\u00fd": "Trnavsky",
    "Tren\u010diansky": "Trenciansky",
    "\u017dilinsk\u00fd": "Zilinsky",
    "Banskobystrick\u00fd": "Banskobystricky",
    "Pre\u0161ovsk\u00fd": "Presovsky",
    "Ko\u0161ick\u00fd": "Kosicky"
};

const ITALY_NAME_MAPPING = {
    "Valle d'Aosta/Vallée d'Aoste": "Valle d'Aosta",
    "Trentino-Alto Adige/Südtirol": "Trentino-Alto Adige"
};

const CHINA_NAME_MAPPING = {
    "安徽": "Anhui", "安徽省": "Anhui",
    "北京": "Beijing", "北京市": "Beijing",
    "重庆": "Chongqing", "重庆市": "Chongqing",
    "福建": "Fujian", "福建省": "Fujian",
    "甘肃": "Gansu", "甘肃省": "Gansu",
    "广东": "Guangdong", "广东省": "Guangdong",
    "广西": "Guangxi", "广西壮族自治区": "Guangxi",
    "贵州": "Guizhou", "贵州省": "Guizhou",
    "海南": "Hainan", "海南省": "Hainan",
    "河北": "Hebei", "河北省": "Hebei",
    "黑龙江": "Heilongjiang", "黑龙江省": "Heilongjiang",
    "河南": "Henan", "河南省": "Henan",
    "湖北": "Hubei", "湖北省": "Hubei",
    "湖南": "Hunan", "湖南省": "Hunan",
    "内蒙古": "Inner Mongolia", "内蒙古自治区": "Inner Mongolia",
    "江苏": "Jiangsu", "江苏省": "Jiangsu",
    "江西": "Jiangxi", "江西省": "Jiangxi",
    "吉林": "Jilin", "吉林省": "Jilin",
    "辽宁": "Liaoning", "辽宁省": "Liaoning",
    "宁夏": "Ningxia", "宁夏回族自治区": "Ningxia",
    "青海": "Qinghai", "青海省": "Qinghai",
    "陕西": "Shaanxi", "陕西省": "Shaanxi",
    "山东": "Shandong", "山东省": "Shandong",
    "上海": "Shanghai", "上海市": "Shanghai",
    "山西": "Shanxi", "山西省": "Shanxi",
    "四川": "Sichuan", "四川省": "Sichuan",
    "天津": "Tianjin", "天津市": "Tianjin",
    "西藏": "Tibet", "西藏自治区": "Tibet",
    "新疆": "Xinjiang", "新疆维吾尔自治区": "Xinjiang",
    "云南": "Yunnan", "云南省": "Yunnan",
    "浙江": "Zhejiang", "浙江省": "Zhejiang",
    "香港": "Hong Kong", "香港特别行政区": "Hong Kong",
    "澳门": "Macau", "澳门特别行政区": "Macau",
    "台湾": "Taiwan", "台湾省": "Taiwan"
};

const TILE_STYLES = {
    dark: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        options: {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }
    },
    voyager: {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        options: {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }
    },
    satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        options: {
            attribution: 'Tiles &copy; Esri',
            maxZoom: 19
        }
    }
};

// Maps recipe match types to map highlight colors
const getMatchColor = (type) => {
    switch (type) {
        case 'drink':        return "#06b6d4"; // cyan
        case 'both':         return "#a855f7"; // purple  (food + drink)
        case 'dessert':      return "#ec4899"; // pink
        case 'food+dessert': return "#f97316"; // orange
        case 'drink+dessert':return "#6366f1"; // indigo
        case 'all':          return "#10b981"; // emerald (all three)
        case 'ready':        return "#10b981"; // emerald (stockpile ready)
        default:             return "#eab308"; // yellow  (food / default)
    }
};

const App = () => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const tileLayerRef = useRef(null);
    const activeTileStyleRef = useRef('dark');

    const geoJsonLayerRef = useRef(null);
    const subRegionLayerRef = useRef(null);
    const highlightedLayerRef = useRef(null);
    const activeRegionIsoRef = useRef(null);
    const activeRegionIso2Ref = useRef(null);
    const flaireLayerRef = useRef(null);
    const activeMapThemeRef = useRef(null);
    const highlightedKeysRef = useRef(null);
    const selectedCountryRef = useRef(null);
    const effectsContainerRef = useRef(null);
    const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const globalSubHighlightLayerRef = useRef(null);
    const choroplethSubLayersRef = useRef(null);
    const regionCacheRef = useRef({});

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const [culinaryDB, setCulinaryDB] = useState({});
    const [isMapLoading, setIsMapLoading] = useState(true);
    const [isDrillDownMode, setIsDrillDownMode] = useState(false);
    const [highlightedKeys, setHighlightedKeys] = useState(null);
    const [searchIngredients, setSearchIngredients] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [activeSearchMode, setActiveSearchMode] = useState(null); // 'recipe' | 'stockpile' | null
    const [selectedTabHint, setSelectedTabHint] = useState('food');
    const [mapMode, setMapMode] = useState('political'); // 'political' | 'primary_meat' | 'spice_level' | 'complexity'
    const [meatMapData, setMeatMapData] = useState({});
    const [meatStats, setMeatStats] = useState({});
    const [spiceMapData, setSpiceMapData] = useState({});
    const [spiceStats, setSpiceStats] = useState({});
    const [complexityMapData, setComplexityMapData] = useState({});
    const [complexityStats, setComplexityStats] = useState({});
    const [spiritMapData, setSpiritMapData] = useState({});
    const [spiritStats, setSpiritStats] = useState({});
    const mapModeRef = useRef('political');
    const meatMapDataRef = useRef({});
    const spiceMapDataRef = useRef({});
    const complexityMapDataRef = useRef({});
    const spiritMapDataRef = useRef({});
    const choroplethTooltipRef = useRef(null);

    // Safe reference to StockpileManager in case it hasn't loaded yet
    const StockpileManager = window.StockpileManager || (() => null);
    const MapModePanel = window.MapModePanel || (() => null);

    useEffect(() => {
        highlightedKeysRef.current = highlightedKeys;
    }, [highlightedKeys]);

    // Build analysis maps when recipes load
    useEffect(() => {
        if (Object.keys(culinaryDB).length === 0) return;
        const meatData = window.buildMeatMap(culinaryDB);
        setMeatMapData(meatData);
        meatMapDataRef.current = meatData;
        setMeatStats(window.getMeatStats(meatData));

        const spiceData = window.buildSpiceMap(culinaryDB);
        setSpiceMapData(spiceData);
        spiceMapDataRef.current = spiceData;
        setSpiceStats(window.getSpiceStats(spiceData));

        const cxData = window.buildComplexityMap(culinaryDB);
        setComplexityMapData(cxData);
        complexityMapDataRef.current = cxData;
        setComplexityStats(window.getComplexityStats(cxData));

        const spiritData = window.buildSpiritMap(culinaryDB);
        setSpiritMapData(spiritData);
        spiritMapDataRef.current = spiritData;
        setSpiritStats(window.getSpiritStats(spiritData));
    }, [culinaryDB]);

    useEffect(() => {
        selectedCountryRef.current = selectedCountry;
    }, [selectedCountry]);

    useEffect(() => {
        mapModeRef.current = mapMode;
    }, [mapMode]);

    // Load shopping list from local storage
    useEffect(() => {
        const savedCart = localStorage.getItem('shoppingList');
        if (savedCart) {
            setShoppingList(JSON.parse(savedCart));
        }
    }, []);

    // Save shopping list to local storage
    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }, [shoppingList]);

    const addToShoppingList = (items) => {
        const next = window.shoppingListAdd(shoppingList, items);
        if (next !== shoppingList) setShoppingList(next);
    };

    const removeFromShoppingList = (item) => {
        setShoppingList(window.shoppingListRemove(shoppingList, item));
    };

    const clearShoppingList = () => setShoppingList(window.shoppingListClear());

    // Unified helper: get choropleth color for a given key based on active mode
    const getChoroplethColor = (key) => {
        const mode = mapModeRef.current;
        if (mode === 'primary_meat') {
            const data = meatMapDataRef.current[key];
            return data ? window.getMeatColor(data.primary) : null;
        }
        if (mode === 'spice_level') {
            const data = spiceMapDataRef.current[key];
            return data ? window.getSpiceColor(data.tier) : null;
        }
        if (mode === 'complexity') {
            const data = complexityMapDataRef.current[key];
            return data ? window.getComplexityColor(data.tier) : null;
        }
        if (mode === 'base_spirit') {
            const data = spiritMapDataRef.current[key];
            return data ? window.getSpiritColor(data.primary) : null;
        }
        return null;
    };

    // Choropleth: apply coloring to map layers based on active mode data
    const applyChoropleth = () => {
        const mode = mapModeRef.current;

        if (!geoJsonLayerRef.current) return;

        if (mode === 'political') {
            geoJsonLayerRef.current.eachLayer(layer => {
                geoJsonLayerRef.current.resetStyle(layer);
            });
            if (subRegionLayerRef.current) {
                subRegionLayerRef.current.eachLayer(layer => {
                    subRegionLayerRef.current.resetStyle(layer);
                });
            }
            return;
        }

        const countriesWithRegions = Object.keys(REGION_CONFIG);

        geoJsonLayerRef.current.eachLayer(layer => {
            const isoCode = getIso3(layer.feature);
            const hasRegions = countriesWithRegions.includes(isoCode);

            if (hasRegions) {
                layer.setStyle({
                    fillColor: '#0f172a',
                    fillOpacity: 0.15,
                    weight: 1,
                    color: 'rgba(255,255,255,0.04)',
                    opacity: 1
                });
                return;
            }

            const color = getChoroplethColor(isoCode);
            if (color) {
                layer.setStyle({
                    fillColor: color,
                    fillOpacity: 0.65,
                    weight: 1,
                    color: 'rgba(255,255,255,0.18)',
                    opacity: 1
                });
            } else {
                layer.setStyle({
                    fillColor: '#1e293b',
                    fillOpacity: 0.25,
                    weight: 1,
                    color: 'rgba(255,255,255,0.06)',
                    opacity: 1
                });
            }
        });

        if (subRegionLayerRef.current) {
            subRegionLayerRef.current.eachLayer(layer => {
                const name = getNormalizedName(layer.feature);
                const color = getChoroplethColor(name);
                if (color) {
                    layer.setStyle({
                        fillColor: color,
                        fillOpacity: 0.7,
                        weight: 1,
                        color: 'rgba(255,255,255,0.25)',
                        opacity: 1
                    });
                } else {
                    layer.setStyle({
                        fillColor: '#1e293b',
                        fillOpacity: 0.25,
                        weight: 1,
                        color: 'rgba(255,255,255,0.08)',
                        opacity: 1
                    });
                }
            });
        }
    };

    // Load/clear choropleth sub-region overlays on the world map
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        // Ensure the highlight pane exists (shared with search highlights)
        if (!mapInstanceRef.current.getPane('highlightPane')) {
            mapInstanceRef.current.createPane('highlightPane');
            mapInstanceRef.current.getPane('highlightPane').style.zIndex = 450;
        }

        // Initialize or clear
        if (!choroplethSubLayersRef.current) {
            choroplethSubLayersRef.current = L.layerGroup().addTo(mapInstanceRef.current);
        } else {
            choroplethSubLayersRef.current.clearLayers();
        }

        // Only render sub-region overlays in metric modes
        if (mapMode === 'political') return;
        const hasData = (mapMode === 'primary_meat' && Object.keys(meatMapData).length > 0)
            || (mapMode === 'spice_level' && Object.keys(spiceMapData).length > 0)
            || (mapMode === 'complexity' && Object.keys(complexityMapData).length > 0)
            || (mapMode === 'base_spirit' && Object.keys(spiritMapData).length > 0);
        if (!hasData) return;

        const countriesWithRegions = Object.keys(REGION_CONFIG);

        countriesWithRegions.forEach(isoCode => {
            if (isDrillDownMode && activeRegionIsoRef.current === isoCode) return;

            const config = REGION_CONFIG[isoCode];

            const renderChoroplethRegions = (data) => {
                L.geoJson(data, {
                    pane: 'highlightPane',
                    style: (feature) => {
                        const name = feature.properties.st_nm || feature.properties.name;
                        const color = getChoroplethColor(name);
                        if (color) {
                            return { fillColor: color, fillOpacity: 0.7, weight: 0.8, color: 'rgba(255,255,255,0.2)', opacity: 1 };
                        }
                        return { fillColor: '#1e293b', fillOpacity: 0.3, weight: 0.5, color: 'rgba(255,255,255,0.06)', opacity: 1 };
                    },
                    onEachFeature: (feature, layer) => {
                        layer.on({
                            mouseover: (e) => {
                                const l = e.target;
                                const name = feature.properties.st_nm || feature.properties.name;
                                const color = getChoroplethColor(name);
                                if (color) {
                                    l.setStyle({ fillOpacity: 0.92, weight: 2, color: '#ffffff' });
                                } else {
                                    l.setStyle({ fillOpacity: 0.45, weight: 2, color: '#94a3b8' });
                                }
                                l.bringToFront();
                                setHoveredFeature(feature);
                            },
                            mouseout: (e) => {
                                const l = e.target;
                                const name = feature.properties.st_nm || feature.properties.name;
                                const color = getChoroplethColor(name);
                                if (color) {
                                    l.setStyle({ fillColor: color, fillOpacity: 0.7, weight: 0.8, color: 'rgba(255,255,255,0.2)' });
                                } else {
                                    l.setStyle({ fillColor: '#1e293b', fillOpacity: 0.3, weight: 0.5, color: 'rgba(255,255,255,0.06)' });
                                }
                                setHoveredFeature(null);
                            },
                            click: (e) => {
                                L.DomEvent.stopPropagation(e);
                                const name = feature.properties.st_nm || feature.properties.name;

                                mapInstanceRef.current.setView(config.view.center, config.view.zoom, { animate: true });
                                activeRegionIsoRef.current = isoCode;
                                // Resolve parent country's ISO2 from the world GeoJSON layer
                                let parentIso2 = null;
                                if (geoJsonLayerRef.current) {
                                    geoJsonLayerRef.current.eachLayer(cl => {
                                        if (getIso3(cl.feature) === isoCode) parentIso2 = getIso2(cl.feature);
                                    });
                                }
                                activeRegionIso2Ref.current = parentIso2;
                                setIsDrillDownMode(true);
                                loadSubRegionLayer(isoCode, config);

                                setSelectedCountry({
                                    name: { common: name },
                                    cca3: name,
                                    cca2: parentIso2
                                });
                            }
                        });
                    }
                }).addTo(choroplethSubLayersRef.current);
            };

            if (regionCacheRef.current[isoCode]) {
                renderChoroplethRegions(regionCacheRef.current[isoCode]);
            } else {
                fetch(config.geoJsonUrl)
                    .then(res => res.json())
                    .then(data => {
                        if (data.crs) delete data.crs;
                        // Pre-process names (same normalization as global highlights)
                        data.features.forEach(f => {
                            let name = (f.properties.st_nm || f.properties.ST_NM || f.properties.NAME_1 || f.properties.name_1 || f.properties.NAME || f.properties.ADMIN || f.properties.name_latin || f.properties.name || f.properties.nom || f.properties.navn || f.properties.state_name || f.properties.NOM_DPTO || f.properties.DPTO || f.properties.nombre || f.properties.reg_name || f.properties.NM4 || f.properties.REGIONNAVN || '').trim();
                            if (isoCode === 'CHN' && CHINA_NAME_MAPPING[name]) name = CHINA_NAME_MAPPING[name];
                            if (isoCode === 'SLV' && EL_SALVADOR_NAME_MAPPING[name]) name = EL_SALVADOR_NAME_MAPPING[name];
                            if (isoCode === 'MEX' && MEXICO_NAME_MAPPING[name]) name = MEXICO_NAME_MAPPING[name];
                            if (isoCode === 'FRA' && FRANCE_NAME_MAPPING[name]) name = FRANCE_NAME_MAPPING[name];
                            if (isoCode === 'ITA' && ITALY_NAME_MAPPING[name]) name = ITALY_NAME_MAPPING[name];
                            if (isoCode === 'SVK' && SLOVAKIA_NAME_MAPPING[name]) name = SLOVAKIA_NAME_MAPPING[name];
                            if (isoCode === 'IND') {
                                if (name === 'Orissa') name = 'Odisha';
                                if (name === 'Uttaranchal') name = 'Uttarakhand';
                                if (name === 'Pondicherry') name = 'Puducherry';
                                if (name.includes('Andaman')) name = 'Andaman and Nicobar Islands';
                                if (name.includes('Dadra') || name.includes('Daman')) name = 'Dadra and Nagar Haveli and Daman and Diu';
                                if (name === 'Jammu & Kashmir') name = 'Jammu and Kashmir';
                            }
                            if (name && !name.startsWith('Region ') && DENMARK_REGIONS.includes('Region ' + name)) name = 'Region ' + name;
                            if (name === 'Distrito Federal') name = 'Ciudad de México';
                            f.properties.st_nm = name;
                            f.properties.name = name;
                        });
                        regionCacheRef.current[isoCode] = data;
                        renderChoroplethRegions(data);
                    })
                    .catch(err => console.error(`Error loading choropleth region ${isoCode}`, err));
            }
        });
    }, [mapMode, meatMapData, spiceMapData, complexityMapData, spiritMapData, isDrillDownMode]);

    // Apply country-level choropleth when mode or data changes
    useEffect(() => {
        applyChoropleth();
    }, [mapMode, meatMapData, spiceMapData, complexityMapData, spiritMapData, isDrillDownMode]);

    const handleMapModeChange = (newMode) => {
        setMapMode(newMode);
        mapModeRef.current = newMode;
        // Clear search highlights when switching to metric modes
        if (newMode !== 'political') {
            setHighlightedKeys(null);
            setActiveSearchMode(null);
        }
        setTimeout(() => {
            meatMapDataRef.current = meatMapData;
            spiceMapDataRef.current = spiceMapData;
            complexityMapDataRef.current = complexityMapData;
            spiritMapDataRef.current = spiritMapData;
            applyChoropleth();
        }, 100);
    };

    const handleGlobalClear = () => {
        setHighlightedKeys(null);
        setActiveSearchMode(null);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const applyTileStyle = (styleKey) => {
        if (!mapInstanceRef.current) return;

        const key = TILE_STYLES[styleKey] ? styleKey : 'dark';
        if (tileLayerRef.current && activeTileStyleRef.current === key) return;

        if (tileLayerRef.current) {
            mapInstanceRef.current.removeLayer(tileLayerRef.current);
            tileLayerRef.current = null;
        }

        const cfg = TILE_STYLES[key];
        tileLayerRef.current = L.tileLayer(cfg.url, cfg.options).addTo(mapInstanceRef.current);
        activeTileStyleRef.current = key;
    };

    const getNormalizedName = (feature) => {
        const p = feature.properties;
        const isoCode = getIso3(feature);
        let name = (p.st_nm || p.ST_NM || p.NAME_1 || p.name_1 || p.NAME || p.ADMIN || p.name_latin || p.name || p.nom || p.navn || p.state_name || p.NOM_DPTO || p.DPTO || p.nombre || p.reg_name || p.NM4 || p.REGIONNAVN || '').trim();
        if (name === 'Orissa') name = 'Odisha';
        if (name === 'Uttaranchal') name = 'Uttarakhand';
        if (name === 'Pondicherry') name = 'Puducherry';
        if (name.includes('Andaman')) name = 'Andaman and Nicobar Islands';
        if (name.includes('Dadra') || name.includes('Daman')) name = 'Dadra and Nagar Haveli and Daman and Diu';
        if (name === 'Jammu & Kashmir') name = 'Jammu and Kashmir';
        if (CHINA_NAME_MAPPING[name]) name = CHINA_NAME_MAPPING[name];
        if (EL_SALVADOR_NAME_MAPPING[name]) name = EL_SALVADOR_NAME_MAPPING[name];
        if (MEXICO_NAME_MAPPING[name]) name = MEXICO_NAME_MAPPING[name];
        if (FRANCE_NAME_MAPPING[name]) name = FRANCE_NAME_MAPPING[name];
        if (ITALY_NAME_MAPPING[name]) name = ITALY_NAME_MAPPING[name];
        if (SLOVAKIA_NAME_MAPPING[name]) name = SLOVAKIA_NAME_MAPPING[name];
        if (name && !name.startsWith('Region ') && DENMARK_REGIONS.includes('Region ' + name)) name = 'Region ' + name;
        if (name === 'Distrito Federal') name = 'Ciudad de México';
        return name;
    };

    // --- MOUSE TRACKING FOR DIYA EFFECT ---
    const handleMouseMove = (e) => {
        if (mapContainerRef.current) {
            const rect = mapContainerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            mapContainerRef.current.style.setProperty('--mouse-x', `${x}px`);
            mapContainerRef.current.style.setProperty('--mouse-y', `${y}px`);
            mousePosRef.current = { x, y };
        }
    };

    // --- CONTINUOUS SMOKE LOOP (SEAMLESS FILAMENT) ---
    useEffect(() => {
        let animationFrameId;
        let lastTime = 0;

        const loop = (time) => {
            if (activeMapThemeRef.current === 'india-dark-diya') {
                // Spawn Rate: 12ms (Slightly spaced to balance the longer life)
                if (time - lastTime > 12) {
                    lastTime = time;
                    if (effectsContainerRef.current) {
                        const el = document.createElement('div');
                        el.className = 'cursor-smoke';

                        // 1. POSITION
                        el.style.left = `${mousePosRef.current.x}px`;
                        el.style.top = `${mousePosRef.current.y - 15}px`;

                        // 2. PHYSICS (Very Slow Waft)
                        const now = Date.now() / 1000;

                        // Slow, hypnotic sway
                        const sway = Math.sin(now * 0.3) * 30;
                        // Gentle jitter
                        const jitter = Math.cos(now * 1.5) * 5;

                        el.style.setProperty('--drift', `${sway + jitter}px`);

                        // 3. DURATION (Very Slow Rise)
                        // 10 to 15 seconds lifetime
                        el.style.setProperty('--duration', `${10 + Math.random() * 5}s`);

                        // 4. SIZE
                        const size = 3 + Math.random() * 4;
                        el.style.width = `${size}px`;
                        el.style.height = `${size}px`;

                        effectsContainerRef.current.appendChild(el);

                        // Cleanup after 15s
                        setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 15000);
                    }
                }
            } else if (activeMapThemeRef.current === 'brazil-cinematic') {
                // Spawn Rate: 70ms (Amazon leaf trail)
                if (time - lastTime > 70) {
                    lastTime = time;
                    if (effectsContainerRef.current) {
                        const el = document.createElement('div');
                        el.className = 'cursor-leaf';

                        // 1. POSITION
                        el.style.left = `${mousePosRef.current.x}px`;
                        el.style.top = `${mousePosRef.current.y}px`;

                        // 2. PHYSICS
                        const drift = (Math.random() - 0.5) * 50;
                        const rot = (Math.random() - 0.5) * 360;
                        el.style.setProperty('--drift', `${drift}px`);
                        el.style.setProperty('--rot', `${rot}deg`);
                        el.style.setProperty('--duration', `${1 + Math.random()}s`);

                        const size = 10 + Math.random() * 10;
                        el.style.width = `${size}px`;
                        el.style.height = `${size}px`;

                        effectsContainerRef.current.appendChild(el);
                        setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 2000);
                    }
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };
        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // --- HELPER: Apply Artistic Flaire ---
    const updateFlaire = (isoCode) => {
        if (!mapInstanceRef.current) return;

        if (flaireLayerRef.current) {
            flaireLayerRef.current.clearLayers();
        } else {
            flaireLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
        }

        if (effectsContainerRef.current) {
            effectsContainerRef.current.innerHTML = '';
        }

        if (activeMapThemeRef.current && mapContainerRef.current) {
            mapContainerRef.current.classList.remove(activeMapThemeRef.current);
            activeMapThemeRef.current = null;
        }

        applyTileStyle('dark');

        const flaireData = window.COUNTRY_FLAIRS?.[isoCode];
        if (!flaireData) return;

        flaireData.forEach(item => {
            if (item.type === 'map-theme') {
                if (mapContainerRef.current) {
                    mapContainerRef.current.classList.add(item.name);
                    activeMapThemeRef.current = item.name;
                }
                if (item.tiles) {
                    applyTileStyle(item.tiles);
                }
                return;
            }

            if (item.type === 'effect') {
                let count = item.count ?? 40;
                let className = 'sakura-petal';

                // Configure counts and classes based on effect type (item.count overrides)
                if (item.name === 'sand-dust-devils') {
                    count = item.count ?? 15; className = 'sand-devil';
                } else if (item.name === 'incense-smoke') {
                    count = item.count ?? 30; className = 'incense-smoke';
                } else if (item.name === 'diwali-lamp') {
                    count = item.count ?? 60; className = 'diwali-lamp';
                } else if (item.name === 'lanterns-rise') {
                    count = item.count ?? 50; className = 'lantern';
                } else if (item.name === 'sakura-wind') {
                    count = item.count ?? 60; className = 'sakura-petal';
                } else if (item.name === 'carnival-confetti') {
                    count = item.count ?? 80; className = 'carnival-confetti';
                } else if (item.name === 'carnival-embers') {
                    count = item.count ?? 25; className = 'carnival-ember';
                } else if (item.name === 'outback-dust') {
                    count = item.count ?? 35; className = 'outback-dust-mote';
                }

                for (let i = 0; i < count; i++) {
                    let el;

                    // --- SPECIAL LOGIC FOR SAKURA WIND (JAPAN) ---
                    if (item.name === 'sakura-wind') {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'sakura-wrapper';

                        wrapper.style.left = (Math.random() * 120 - 20) + '%';
                        wrapper.style.top = (Math.random() * 120 - 20) + '%';

                        const duration = Math.random() * 8 + 6;
                        wrapper.style.animationDuration = duration + 's';
                        wrapper.style.animationDelay = -(Math.random() * duration) + 's';

                        const petal = document.createElement('div');
                        petal.className = 'sakura-petal';

                        const size = Math.random() * 12 + 6;
                        petal.style.width = size + 'px';
                        petal.style.height = size + 'px';

                        petal.style.animationDuration = (Math.random() * 2 + 2) + 's';

                        wrapper.appendChild(petal);
                        el = wrapper;
                    } else if (item.name === 'river-mist') {
                        el = document.createElement('div');
                        el.className = 'river-mist';
                        el.style.left = `${Math.random() * 100}%`;
                        el.style.bottom = `${Math.random() * 20 - 10}%`;
                        el.style.width = `${200 + Math.random() * 300}px`;
                        el.style.height = `${50 + Math.random() * 50}px`;
                        el.style.animationDuration = `${20 + Math.random() * 20}s`;
                        el.style.animationDelay = `-${Math.random() * 20}s`;
                    } else if (item.name === 'carnival-embers') {
                        el = document.createElement('div');
                        el.className = 'carnival-ember';
                        el.style.left = `${Math.random() * 100}%`;
                        const size = 3 + Math.random() * 5;
                        el.style.width = `${size}px`;
                        el.style.height = `${size}px`;
                        el.style.animationDuration = `${10 + Math.random() * 10}s`;
                        el.style.animationDelay = `-${Math.random() * 10}s`;
                    } else if (item.name === 'outback-dust') {
                        el = document.createElement('div');
                        el.className = 'outback-dust-mote';
                        el.style.left = `${Math.random() * 100}%`;
                        el.style.bottom = `${Math.random() * 60}%`;
                        const size = 4 + Math.random() * 8;
                        el.style.width = `${size}px`;
                        el.style.height = `${size}px`;
                        el.style.animationDuration = `${12 + Math.random() * 16}s`;
                        el.style.animationDelay = `-${Math.random() * 15}s`;
                    } else if (item.name === 'carnival-confetti') {
                        el = document.createElement('div');
                        el.className = 'carnival-confetti';
                        el.style.left = `${Math.random() * 100}%`;
                        el.style.top = '-20px';
                        const colors = ['#009c3b', '#ffdf00', '#002776'];
                        el.style.background = colors[Math.floor(Math.random() * colors.length)];
                        const size = 4 + Math.random() * 5;
                        el.style.width = `${size}px`;
                        el.style.height = `${size * (0.5 + Math.random() * 0.6)}px`;
                        el.style.animationDuration = `${10 + Math.random() * 10}s`;
                        el.style.animationDelay = `-${Math.random() * 15}s`;
                    } else {
                        // --- STANDARD LOGIC FOR OTHERS ---
                        el = document.createElement('div');
                        el.className = className;
                        el.style.left = Math.random() * 100 + '%';

                        if (item.name === 'sand-dust-devils') {
                            el.style.bottom = (Math.random() * 40 - 20) + '%';
                            el.style.transform = `scale(${Math.random() * 0.5 + 0.3})`;
                        } else if (item.name === 'lanterns-rise') {
                            el.style.top = '0';
                            el.style.width = (Math.random() * 25 + 18) + 'px';
                            el.style.height = (parseFloat(el.style.width) * 1.3) + 'px';
                        } else if (item.name === 'incense-smoke') {
                            el.style.left = Math.random() * 100 + '%';
                            el.style.top = Math.random() * 100 + '%';
                            el.style.animationDelay = -(Math.random() * 10) + 's';

                            const colors = ['rgba(255, 160, 120, 0.3)', 'rgba(220, 220, 220, 0.3)', 'rgba(150, 255, 180, 0.2)'];
                            const color = colors[Math.floor(Math.random() * colors.length)];
                            el.style.background = `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`;
                        } else if (item.name === 'diwali-lamp') {
                            el.style.left = Math.random() * 100 + '%';
                            el.style.top = Math.random() * 100 + '%';
                            el.style.animationDelay = -(Math.random() * 5) + 's';
                        } else {
                            el.style.width = (Math.random() * 10 + 8) + 'px';
                            el.style.height = el.style.width;
                        }

                        const duration = item.name === 'lanterns-rise' ? Math.random() * 20 + 15 : Math.random() * 5 + 5;
                        el.style.animationDuration = duration + 's';
                        el.style.animationDelay = item.name === 'lanterns-rise'
                            ? -(Math.random() * duration) + 's'
                            : (Math.random() * 5) + 's';
                    }

                    effectsContainerRef.current.appendChild(el);
                }
                return;
            }

            if (item.type === 'circle') {
                L.circle([item.lat, item.lon], { radius: item.radius, ...item.style }).addTo(flaireLayerRef.current);
                return;
            }

            if (item.type === 'polyline') {
                L.polyline(item.points, { ...item.style }).addTo(flaireLayerRef.current);
                return;
            }

            let htmlContent = '';
            if (item.type === 'svg') {
                htmlContent = `<div style="width: ${item.width}px; height: ${item.height}px; ${item.style || ''}">${item.content}</div>`;
            } else if (item.type === 'text') {
                htmlContent = `<div class="${item.className || ''}" style="width: ${item.width}px; height: ${item.height}px; ${item.style || ''}">${item.content}</div>`;
            }

            if (!htmlContent) return;

            const w = item.width || 100;
            const h = item.height || 50;
            const anchor = item.iconAnchor || [w / 2, h / 2];
            const icon = L.divIcon({
                className: 'custom-flaire-element',
                html: htmlContent,
                iconSize: [w, h],
                iconAnchor: anchor
            });

            L.marker([item.lat, item.lon], { icon, interactive: false, zIndexOffset: 1000 })
                .addTo(flaireLayerRef.current);
        });
    };

    // --- GLOBAL SUB-REGION HIGHLIGHTS (SEARCH) ---
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        // Create a custom pane for sub-region highlights so they sit above countries (z-index 450)
        if (!mapInstanceRef.current.getPane('highlightPane')) {
            mapInstanceRef.current.createPane('highlightPane');
            mapInstanceRef.current.getPane('highlightPane').style.zIndex = 450;
        }

        // Initialize or clear the global highlight layer
        if (!globalSubHighlightLayerRef.current) {
            globalSubHighlightLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
        } else {
            globalSubHighlightLayerRef.current.clearLayers();
        }

        if (!highlightedKeys) return;

        const countriesWithSubRegions = Object.keys(REGION_CONFIG);

        countriesWithSubRegions.forEach(isoCode => {
            // Skip the active country in drill-down mode to let subRegionLayerRef handle it
            if (isDrillDownMode && activeRegionIsoRef.current === isoCode) return;

            const config = REGION_CONFIG[isoCode];

            const renderHighlights = (data) => {
                const featuresToHighlight = data.features.filter(f => {
                    const name = f.properties.st_nm || f.properties.name;
                    return highlightedKeys[name];
                });

                if (featuresToHighlight.length > 0) {
                    L.geoJson(featuresToHighlight, {
                        pane: 'highlightPane', // Force this layer to be above the country layer
                        style: (feature) => {
                            const name = feature.properties.st_nm || feature.properties.name;
                            const type = highlightedKeys[name];
                            const color = getMatchColor(type);
                            return { fillColor: color, fillOpacity: 0.9, weight: 1, color: "#ffffff" };
                        },
                        onEachFeature: (feature, layer) => {
                            layer.on('click', (e) => {
                                L.DomEvent.stopPropagation(e);
                                const name = feature.properties.st_nm || feature.properties.name;

                                mapInstanceRef.current.setView(config.view.center, config.view.zoom, { animate: true });
                                activeRegionIsoRef.current = isoCode;
                                let parentIso2 = null;
                                if (geoJsonLayerRef.current) {
                                    geoJsonLayerRef.current.eachLayer(cl => {
                                        if (getIso3(cl.feature) === isoCode) parentIso2 = getIso2(cl.feature);
                                    });
                                }
                                activeRegionIso2Ref.current = parentIso2;
                                setIsDrillDownMode(true);
                                loadSubRegionLayer(isoCode, config);

                                setSelectedCountry({
                                    name: { common: name },
                                    cca3: name,
                                    cca2: parentIso2
                                });
                            });
                        }
                    }).addTo(globalSubHighlightLayerRef.current);
                }
            };

            if (regionCacheRef.current[isoCode]) {
                renderHighlights(regionCacheRef.current[isoCode]);
            } else {
                fetch(config.geoJsonUrl)
                    .then(res => res.json())
                    .then(data => {
                        if (data.crs) delete data.crs;
                        // Pre-process/Normalize Data for Cache
                        data.features.forEach(f => {
                            let name = (f.properties.st_nm || f.properties.ST_NM || f.properties.NAME_1 || f.properties.name_1 || f.properties.NAME || f.properties.ADMIN || f.properties.name_latin || f.properties.name || f.properties.nom || f.properties.navn || f.properties.state_name || f.properties.NOM_DPTO || f.properties.DPTO || f.properties.nombre || f.properties.reg_name || f.properties.NM4 || f.properties.REGIONNAVN || '').trim();

                            if (isoCode === 'CHN' && CHINA_NAME_MAPPING[name]) {
                                name = CHINA_NAME_MAPPING[name];
                            }
                            if (isoCode === 'SLV' && EL_SALVADOR_NAME_MAPPING[name]) {
                                name = EL_SALVADOR_NAME_MAPPING[name];
                            }
                            if (isoCode === 'MEX' && MEXICO_NAME_MAPPING[name]) {
                                name = MEXICO_NAME_MAPPING[name];
                            }
                            if (isoCode === 'FRA' && FRANCE_NAME_MAPPING[name]) {
                                name = FRANCE_NAME_MAPPING[name];
                            }
                            if (isoCode === 'ITA' && ITALY_NAME_MAPPING[name]) {
                                name = ITALY_NAME_MAPPING[name];
                            }
                            if (isoCode === 'SVK' && SLOVAKIA_NAME_MAPPING[name]) {
                                name = SLOVAKIA_NAME_MAPPING[name];
                            }
                            if (isoCode === 'IND') {
                                if (name === 'Orissa') name = 'Odisha';
                                if (name === 'Uttaranchal') name = 'Uttarakhand';
                                if (name === 'Pondicherry') name = 'Puducherry';
                                if (name.includes('Andaman')) name = 'Andaman and Nicobar Islands';
                                if (name.includes('Dadra') || name.includes('Daman')) name = 'Dadra and Nagar Haveli and Daman and Diu';
                                if (name === 'Jammu & Kashmir') name = 'Jammu and Kashmir';
                            }
                            if (name && !name.startsWith('Region ') && DENMARK_REGIONS.includes('Region ' + name)) {
                                name = 'Region ' + name;
                            }
                            if (name === 'Distrito Federal') {
                                name = 'Ciudad de México';
                            }

                            f.properties.st_nm = name;
                            f.properties.name = name;
                        });

                        regionCacheRef.current[isoCode] = data;
                        renderHighlights(data);
                    })
                    .catch(err => console.error(`Error loading region ${isoCode}`, err));
            }
        });
    }, [highlightedKeys, isDrillDownMode]);

    const loadSubRegionLayer = (isoCode, regionConfig) => {
        if (subRegionLayerRef.current) {
            mapInstanceRef.current.removeLayer(subRegionLayerRef.current);
            subRegionLayerRef.current = null;
        }

        const fetchData = regionCacheRef.current[isoCode]
            ? Promise.resolve(regionCacheRef.current[isoCode])
            : fetch(regionConfig.geoJsonUrl).then(res => res.json()).then(data => {
                if (data.crs) delete data.crs;
                return data;
            });

        fetchData.then(subData => {
            if (activeRegionIsoRef.current !== isoCode) return;

            if (subData.features && !regionCacheRef.current[isoCode]) {
                subData.features.forEach(f => {
                    let name = (f.properties.st_nm || f.properties.ST_NM || f.properties.NAME_1 || f.properties.name_1 || f.properties.NAME || f.properties.ADMIN || f.properties.name_latin || f.properties.name || f.properties.nom || f.properties.navn || f.properties.state_name || f.properties.NOM_DPTO || f.properties.DPTO || f.properties.nombre || f.properties.reg_name || f.properties.NM4 || f.properties.REGIONNAVN || '').trim();
                    if (isoCode === 'CHN' && CHINA_NAME_MAPPING[name]) name = CHINA_NAME_MAPPING[name];
                    if (isoCode === 'SLV' && EL_SALVADOR_NAME_MAPPING[name]) name = EL_SALVADOR_NAME_MAPPING[name];
                    if (isoCode === 'MEX' && MEXICO_NAME_MAPPING[name]) name = MEXICO_NAME_MAPPING[name];
                    if (isoCode === 'FRA' && FRANCE_NAME_MAPPING[name]) name = FRANCE_NAME_MAPPING[name];
                    if (isoCode === 'ITA' && ITALY_NAME_MAPPING[name]) name = ITALY_NAME_MAPPING[name];
                    if (isoCode === 'SVK' && SLOVAKIA_NAME_MAPPING[name]) name = SLOVAKIA_NAME_MAPPING[name];
                    if (isoCode === 'IND') {
                        if (name === 'Orissa') name = 'Odisha';
                        if (name === 'Uttaranchal') name = 'Uttarakhand';
                        if (name === 'Pondicherry') name = 'Puducherry';
                        if (name.includes('Andaman')) name = 'Andaman and Nicobar Islands';
                        if (name.includes('Dadra') || name.includes('Daman')) name = 'Dadra and Nagar Haveli and Daman and Diu';
                        if (name === 'Jammu & Kashmir') name = 'Jammu and Kashmir';
                    }
                    if (name && !name.startsWith('Region ') && DENMARK_REGIONS.includes('Region ' + name)) name = 'Region ' + name;
                    if (name === 'Distrito Federal') name = 'Ciudad de México';
                    f.properties.st_nm = name;
                    f.properties.name = name;
                });
                regionCacheRef.current[isoCode] = subData;
            }

            const subLayer = L.geoJson(subData, {
                style: (feature) => {
                    const name = getNormalizedName(feature);
                    const iso = getIso3(feature);

                    // Choropleth mode for sub-regions (any metric mode)
                    if (mapModeRef.current !== 'political') {
                        const color = getChoroplethColor(name);
                        if (color) {
                            return { fillColor: color, fillOpacity: 0.7, weight: 1, color: 'rgba(255,255,255,0.25)', opacity: 1 };
                        }
                        return { fillColor: '#1e293b', fillOpacity: 0.25, weight: 1, color: 'rgba(255,255,255,0.08)', opacity: 1 };
                    }

                    // Default Style
                    let style = { fillColor: '#374151', weight: 1, opacity: 1, color: '#eab308', fillOpacity: 0.4 };

                    // Check Highlight (Recipe Finder)
                    const searchKeys = highlightedKeysRef.current;
                    if (searchKeys) {
                        const matchType = searchKeys[iso] || searchKeys[name];
                        if (matchType) {
                            const color = getMatchColor(matchType);
                            style = { fillColor: color, fillOpacity: 0.6, color: "#ffffff", weight: 1 };
                        } else {
                            style = { fillColor: '#1f2937', fillOpacity: 0.1, color: '#374151', weight: 1 };
                        }
                    }

                    // Check Selection (Click)
                    const isSelected = selectedCountryRef.current && selectedCountryRef.current.name.common === name;
                    if (isSelected) {
                        style = { ...style, color: '#38bdf8', weight: 2, opacity: 1 };
                    }

                    return style;
                },
                onEachFeature: (feature, layer) => {
                    if (isoCode === 'CHN') {
                        const rawName = feature.properties.name || feature.properties.NAME_1 || feature.properties.NAME;
                        if (rawName && CHINA_NAME_MAPPING[rawName]) {
                            feature.properties.name = CHINA_NAME_MAPPING[rawName];
                            feature.properties.st_nm = feature.properties.name;
                        }
                    }

                    layer.on({
                        mouseover: (e) => {
                            const l = e.target;
                            if (mapModeRef.current !== 'political') {
                                const regionName = getNormalizedName(layer.feature);
                                const color = getChoroplethColor(regionName);
                                if (color) {
                                    l.setStyle({ fillColor: color, fillOpacity: 0.9, weight: 2, color: '#ffffff', opacity: 1 });
                                } else {
                                    l.setStyle({ fillColor: '#334155', fillOpacity: 0.4, weight: 2, color: '#94a3b8', opacity: 1 });
                                }
                            } else {
                                l.setStyle({ weight: 2, color: '#ffffff', fillOpacity: 0.7 });
                            }
                            l.bringToFront();
                            setHoveredFeature(layer.feature);
                        },
                        mouseout: (e) => {
                            const l = e.target;
                            if (mapModeRef.current !== 'political') {
                                const regionName = getNormalizedName(l.feature);
                                const color = getChoroplethColor(regionName);
                                if (color) {
                                    l.setStyle({ fillColor: color, fillOpacity: 0.7, weight: 1, color: 'rgba(255,255,255,0.25)', opacity: 1 });
                                } else {
                                    l.setStyle({ fillColor: '#1e293b', fillOpacity: 0.25, weight: 1, color: 'rgba(255,255,255,0.08)', opacity: 1 });
                                }
                            } else {
                                subRegionLayerRef.current.resetStyle(l);

                                const name = getNormalizedName(l.feature);
                                const isSelected = selectedCountryRef.current && selectedCountryRef.current.name.common === name;
                                if (isSelected) {
                                    l.setStyle({ color: '#38bdf8', weight: 2, opacity: 1 });
                                }
                            }

                            setHoveredFeature(null);
                        },
                        click: (e) => {
                            L.DomEvent.stopPropagation(e);
                            const subName = getNormalizedName(feature);

                            mapInstanceRef.current.fitBounds(e.target.getBounds());
                            setSelectedCountry({
                                name: { common: subName },
                                cca3: subName,
                                cca2: activeRegionIso2Ref.current
                            });
                        }
                    });
                }
            }).addTo(mapInstanceRef.current);
            subRegionLayerRef.current = subLayer;
        });
    };

    useEffect(() => {
        if (mapInstanceRef.current) return;

        const map = L.map(mapContainerRef.current, {
            center: [20, 0],
            zoom: 2.5,
            zoomControl: false,
            minZoom: 2,
            maxBounds: [[-90, -180], [90, 180]]
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);
        mapInstanceRef.current = map;

        applyTileStyle('dark');

        fetch('./recipes.json')
            .then(res => res.json())
            .then(data => setCulinaryDB(data))
            .catch(err => console.error("Error loading recipes:", err));

        fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(data => {
                setIsMapLoading(false);

                const style = {
                    fillColor: '#1f2937',
                    weight: 1,
                    opacity: 1,
                    color: '#4b5563',
                    fillOpacity: 0.4
                };

                const highlightStyle = {
                    weight: 2,
                    color: '#eab308',
                    fillOpacity: 0.7,
                    fillColor: '#374151'
                };

                function highlightFeature(e) {
                    const layer = e.target;
                    const isoCode = getIso3(layer.feature);
                    const name = layer.feature.properties.NAME || layer.feature.properties.ADMIN || layer.feature.properties.name;

                    if (activeRegionIsoRef.current === isoCode) {
                        return;
                    }

                    // Choropleth mode hover
                    if (mapModeRef.current !== 'political') {
                        const countriesWithRegions = Object.keys(REGION_CONFIG);
                        if (countriesWithRegions.includes(isoCode)) return;

                        const color = getChoroplethColor(isoCode);
                        if (color) {
                            layer.setStyle({ fillColor: color, fillOpacity: 0.9, weight: 2, color: '#ffffff', opacity: 1 });
                        } else {
                            layer.setStyle({ fillColor: '#334155', fillOpacity: 0.4, weight: 2, color: '#94a3b8', opacity: 1 });
                        }
                        layer.bringToFront();
                        setHoveredFeature(layer.feature);
                        highlightedLayerRef.current = layer;
                        return;
                    }

                    const searchKeys = highlightedKeysRef.current;
                    const isSearchActive = searchKeys !== null;
                    let styleToApply = highlightStyle;

                    if (isSearchActive) {
                        const matchType = searchKeys[isoCode] || searchKeys[name];
                        if (matchType) {
                            styleToApply = {
                                weight: 2,
                                color: '#ffffff',
                                fillOpacity: 0.9,
                                fillColor: getMatchColor(matchType)
                            };
                        }
                    }

                    if (highlightedLayerRef.current && highlightedLayerRef.current !== layer) {
                        geoJsonLayerRef.current.resetStyle(highlightedLayerRef.current);
                    }
                    layer.setStyle(styleToApply);
                    layer.bringToFront();
                    setHoveredFeature(layer.feature);
                    highlightedLayerRef.current = layer;
                }

                function resetHighlight(e) {
                    const layer = e.target;
                    const isoCode = getIso3(layer.feature);
                    const name = getNormalizedName(layer.feature);

                    if (activeRegionIsoRef.current === isoCode) {
                        return;
                    }

                    // Choropleth mode reset
                    if (mapModeRef.current !== 'political') {
                        const countriesWithRegions = Object.keys(REGION_CONFIG);
                        if (countriesWithRegions.includes(isoCode)) return;

                        const color = getChoroplethColor(isoCode);
                        if (color) {
                            layer.setStyle({ fillColor: color, fillOpacity: 0.65, weight: 1, color: 'rgba(255,255,255,0.18)', opacity: 1 });
                        } else {
                            layer.setStyle({ fillColor: '#1e293b', fillOpacity: 0.25, weight: 1, color: 'rgba(255,255,255,0.06)', opacity: 1 });
                        }
                        setHoveredFeature(null);
                        if (highlightedLayerRef.current === e.target) highlightedLayerRef.current = null;
                        return;
                    }

                    const isSelected = selectedCountryRef.current && (
                        selectedCountryRef.current.cca3 === isoCode ||
                        selectedCountryRef.current.name.common === name
                    );

                    const searchKeys = highlightedKeysRef.current;
                    if (searchKeys !== null) {
                        const matchType = searchKeys[isoCode] || searchKeys[name];
                        if (matchType) {
                            let color = "#eab308";
                            if (matchType === 'drink') color = "#06b6d4";
                            if (matchType === 'both') color = "#a855f7";
                            if (matchType === 'ready') color = "#10b981";
                            layer.setStyle({ fillColor: color, fillOpacity: 0.6, color: '#ffffff', weight: 1 });
                        } else {
                            layer.setStyle({ fillColor: '#1f2937', fillOpacity: 0.1, color: '#374151', weight: 1 });
                        }
                    } else {
                        geoJsonLayerRef.current.resetStyle(e.target);
                    }

                    if (isSelected) {
                        layer.setStyle({ color: '#38bdf8', weight: 2, opacity: 1 });
                        if (searchKeys === null) {
                            layer.setStyle({ fillOpacity: 0.2, fillColor: '#374151' });
                        }
                    }

                    setHoveredFeature(null);
                    if (highlightedLayerRef.current === e.target) {
                        highlightedLayerRef.current = null;
                    }
                }

                function zoomToFeature(e) {
                    const layer = e.target;
                    const isoCode = getIso3(layer.feature);
                    const iso2Code = getIso2(layer.feature);
                    const name = layer.feature.properties.NAME || layer.feature.properties.ADMIN || layer.feature.properties.name;

                    if (activeRegionIsoRef.current && activeRegionIsoRef.current !== isoCode) {
                        if (subRegionLayerRef.current && map.hasLayer(subRegionLayerRef.current)) {
                            map.removeLayer(subRegionLayerRef.current);
                            subRegionLayerRef.current = null;
                        }
                        activeRegionIsoRef.current = null;
                        setIsDrillDownMode(false);
                    }

                    const regionConfig = REGION_CONFIG[isoCode];

                    if (regionConfig) {
                        map.setView(regionConfig.view.center, regionConfig.view.zoom, { animate: true });
                        activeRegionIsoRef.current = isoCode;
                        activeRegionIso2Ref.current = iso2Code;
                        setIsDrillDownMode(true);
                        geoJsonLayerRef.current.resetStyle(layer);
                        highlightedLayerRef.current = null;
                        loadSubRegionLayer(isoCode, regionConfig);
                    } else {
                        if (isoCode === 'FRA') {
                            map.setView([46.603354, 1.888334], 5.5, { animate: true });
                        } else if (isoCode === 'PRT') {
                            map.setView([39.3999, -8.2245], 7, { animate: true });
                        } else if (isoCode === 'BRA') {
                            map.setView([-12, -38], 4, { animate: true });
                        } else if (isoCode === 'NLD') {
                            map.setView([52.2, 5.5], 7.5, { animate: true });
                        } else if (isoCode === 'RUS') {
                            map.setView([55.75, 37.62], 3.5, { animate: true });
                        } else {
                            map.fitBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 6, animate: true });
                        }
                        activeRegionIsoRef.current = null;
                        setIsDrillDownMode(false);
                        if (subRegionLayerRef.current && map.hasLayer(subRegionLayerRef.current)) {
                            map.removeLayer(subRegionLayerRef.current);
                            subRegionLayerRef.current = null;
                        }
                    }

                    setSelectedCountry({
                        name: { common: name },
                        cca3: isoCode,
                        cca2: iso2Code
                    });

                    updateFlaire(isoCode);
                }

                geoJsonLayerRef.current = L.geoJson(data, {
                    style: style,
                    onEachFeature: (feature, layer) => {
                        layer.on({ mouseover: highlightFeature, mouseout: resetHighlight, click: zoomToFeature });
                    }
                }).addTo(map);
            });

        return () => map.remove();
    }, []);

    useEffect(() => {
        if (!mapInstanceRef.current) return;

        // In metric modes, don't let search/selection override choropleth
        if (mapModeRef.current !== 'political') {
            applyChoropleth();
            return;
        }

        const updateLayerStyle = (layerGroup) => {
            if (!layerGroup) return;

            layerGroup.eachLayer(layer => {
                const isoCode = getIso3(layer.feature);
                const name = getNormalizedName(layer.feature);
                const isSelected = selectedCountry && (
                    selectedCountry.cca3 === isoCode ||
                    selectedCountry.name.common === name
                );

                if (highlightedKeys === null && !isSelected) {
                    layerGroup.resetStyle(layer);
                    return;
                }

                const matchType = highlightedKeys && (highlightedKeys[isoCode] || highlightedKeys[name]);

                if (matchType) {
                    layer.setStyle({ fillColor: getMatchColor(matchType), fillOpacity: 0.6, color: '#ffffff', weight: 1 });
                } else if (highlightedKeys !== null) {
                    layer.setStyle({ fillColor: '#1f2937', fillOpacity: 0.1, color: '#374151', weight: 1 });
                } else {
                    layerGroup.resetStyle(layer);
                }

                if (isSelected) {
                    layer.setStyle({ color: '#38bdf8', weight: 2, opacity: 1 });
                    layer.bringToFront();
                } else {
                }
            });
        };

        updateLayerStyle(geoJsonLayerRef.current);
        updateLayerStyle(subRegionLayerRef.current);
    }, [highlightedKeys, selectedCountry]);

    const handleBackToWorld = () => {
        setIsDrillDownMode(false);
        activeRegionIsoRef.current = null;
        activeRegionIso2Ref.current = null;
        setSelectedCountry(null);

        if (flaireLayerRef.current) {
            flaireLayerRef.current.clearLayers();
        }

        if (effectsContainerRef.current) {
            effectsContainerRef.current.innerHTML = '';
            effectsContainerRef.current.style.display = 'none';
            setTimeout(() => {
                if (effectsContainerRef.current) effectsContainerRef.current.style.display = 'block';
            }, 10);
        }

        if (activeMapThemeRef.current && mapContainerRef.current) {
            mapContainerRef.current.classList.remove(activeMapThemeRef.current);
            activeMapThemeRef.current = null;
        }

        applyTileStyle('dark');

        if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([20, 0], 2.5);
            if (subRegionLayerRef.current && mapInstanceRef.current.hasLayer(subRegionLayerRef.current)) {
                mapInstanceRef.current.removeLayer(subRegionLayerRef.current);
                subRegionLayerRef.current = null;
            }
        }

        // Re-apply choropleth sub-region overlays if in metric mode
        // (the useEffect on [mapMode, meatMapData, isDrillDownMode] will handle it
        //  since isDrillDownMode just changed to false)
    };

    // Exit drill-down when the user scrolls/zooms out past the world-view threshold
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        if (!isDrillDownMode) return;

        const onZoomEnd = () => {
            if (map.getZoom() < 4) {
                handleBackToWorld();
            }
        };

        map.on('zoomend', onZoomEnd);
        return () => { map.off('zoomend', onZoomEnd); };
    }, [isDrillDownMode]);

    const handleRecipeSelect = (key, tabHint = 'food') => {
        setSelectedTabHint(tabHint);
        let targetLayer = null;
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.eachLayer(l => {
                const iso = getIso3(l.feature);
                if (iso === key) targetLayer = l;
            });
        }

        if (targetLayer) {
            const isoCode = key;
            const iso2Code = getIso2(targetLayer.feature);
            const name = targetLayer.feature.properties.NAME || targetLayer.feature.properties.name;

            const regionConfig = REGION_CONFIG[isoCode];

            if (regionConfig) {
                mapInstanceRef.current.setView(regionConfig.view.center, regionConfig.view.zoom, { animate: true });
                activeRegionIsoRef.current = isoCode;
                setIsDrillDownMode(true);
            } else {
                if (isoCode === 'PRT') {
                    mapInstanceRef.current.setView([39.3999, -8.2245], 7, { animate: true });
                } else if (isoCode === 'NLD') {
                    mapInstanceRef.current.setView([52.2, 5.5], 7.5, { animate: true });
                } else if (isoCode === 'RUS') {
                    mapInstanceRef.current.setView([55.75, 37.62], 3.5, { animate: true });
                } else {
                    mapInstanceRef.current.fitBounds(targetLayer.getBounds(), { padding: [50, 50], maxZoom: 6, animate: true });
                }
            }

            setSelectedCountry({ name: { common: name }, cca3: isoCode, cca2: iso2Code });
            targetLayer.fire('click');
        } else {
            let targetCountryIso = 'USA';
            let targetCountryCca2 = 'US';

            if (INDIAN_STATES.includes(key)) {
                targetCountryIso = 'IND';
                targetCountryCca2 = 'IN';
            }

            if (CHINESE_PROVINCES.includes(key)) {
                targetCountryIso = 'CHN';
                targetCountryCca2 = 'CN';
            }

            if (BRAZIL_STATES.includes(key)) {
                targetCountryIso = 'BRA';
                targetCountryCca2 = 'BR';
            }
            if (DENMARK_REGIONS.includes(key)) {
                targetCountryIso = 'DNK';
                targetCountryCca2 = 'DK';
            }
            if (FRANCE_REGIONS.includes(key)) {
                targetCountryIso = 'FRA';
                targetCountryCca2 = 'FR';
            }
            if (MEXICO_STATES.includes(key)) {
                targetCountryIso = 'MEX';
                targetCountryCca2 = 'MX';
            }
            if (EL_SALVADOR_DEPARTMENTS.includes(key)) {
                targetCountryIso = 'SLV';
                targetCountryCca2 = 'SV';
            }
            if (ITALIAN_REGIONS.includes(key)) {
                targetCountryIso = 'ITA';
                targetCountryCca2 = 'IT';
            }
            if (GREEK_REGIONS.includes(key)) {
                targetCountryIso = 'GRC';
                targetCountryCca2 = 'GR';
            }
            if (SPANISH_REGIONS.includes(key)) {
                targetCountryIso = 'ESP';
                targetCountryCca2 = 'ES';
            }
            if (RUSSIAN_REGIONS.includes(key)) {
                targetCountryIso = 'RUS';
                targetCountryCca2 = 'RU';
            }
            if (SWEDISH_COUNTIES.includes(key)) {
                targetCountryIso = 'SWE';
                targetCountryCca2 = 'SE';
            }
            if (SLOVAK_REGIONS.includes(key)) {
                targetCountryIso = 'SVK';
                targetCountryCca2 = 'SK';
            }

            if (!isDrillDownMode || activeRegionIsoRef.current !== targetCountryIso) {
                const regionConfig = REGION_CONFIG[targetCountryIso];
                if (regionConfig) {
                    mapInstanceRef.current.setView(regionConfig.view.center, regionConfig.view.zoom, { animate: true });
                    activeRegionIsoRef.current = targetCountryIso;
                    setIsDrillDownMode(true);
                    loadSubRegionLayer(targetCountryIso, regionConfig);
                    updateFlaire(targetCountryIso);
                }
            }

            setSelectedCountry({
                name: { common: key },
                cca3: key,
                cca2: targetCountryCca2
            });

            if (subRegionLayerRef.current) {
                subRegionLayerRef.current.eachLayer(l => {
                    if (l.feature.properties.name === key) {
                        l.fire('click');
                    }
                });
            }
        }
    };

    // Resolve the ISO2 for any feature (including sub-regions)
    const resolveIso2 = (feature, displayName) => {
        let iso2 = getIso2(feature);
        if (!iso2 || iso2 === '-99') {
            if (INDIAN_STATES.includes(displayName)) iso2 = 'in';
            else if (CHINESE_PROVINCES.includes(displayName)) iso2 = 'cn';
            else if (BRAZIL_STATES.includes(displayName)) iso2 = 'br';
            else if (MEXICO_STATES.includes(displayName)) iso2 = 'mx';
            else if (FRANCE_REGIONS.includes(displayName)) iso2 = 'fr';
            else if (ITALIAN_REGIONS.includes(displayName)) iso2 = 'it';
            else if (GREEK_REGIONS.includes(displayName)) iso2 = 'gr';
            else if (DENMARK_REGIONS.includes(displayName)) iso2 = 'dk';
            else if (EL_SALVADOR_DEPARTMENTS.includes(displayName)) iso2 = 'sv';
            else {
                const usEntry = culinaryDB['USA'];
                if (usEntry && usEntry.regions && usEntry.regions[displayName]) iso2 = 'us';
            }
        }
        return iso2;
    };

    // Compute tooltip data for hovered feature based on active metric mode
    const getMetricTooltipData = () => {
        if (!hoveredFeature || mapMode === 'political') return null;
        const isoCode = getIso3(hoveredFeature);
        const name = hoveredFeature.properties.NAME || hoveredFeature.properties.ADMIN || hoveredFeature.properties.name || '';
        const normalizedName = getNormalizedName(hoveredFeature);
        const displayName = normalizedName || name;
        const iso2 = resolveIso2(hoveredFeature, displayName);
        const recipe = window.getRecipeFromDB(culinaryDB, isoCode) || window.getRecipeFromDB(culinaryDB, normalizedName) || window.getRecipeFromDB(culinaryDB, name);

        if (mapMode === 'primary_meat') {
            const data = meatMapData[isoCode] || meatMapData[normalizedName] || meatMapData[name];
            if (!data || typeof data !== 'object' || !data.primary) {
                return { mode: 'meat', name: displayName, primary: 'No Data', dish: null, iso2 };
            }
            return { mode: 'meat', name: displayName, primary: data.primary, dish: recipe ? recipe.dish : null, iso2 };
        }

        if (mapMode === 'spice_level') {
            const data = spiceMapData[isoCode] || spiceMapData[normalizedName] || spiceMapData[name];
            if (!data || typeof data !== 'object' || !data.tier) {
                return { mode: 'spice', name: displayName, tier: 'mild', label: 'Mild', score: 0, dish: null, iso2 };
            }
            return {
                mode: 'spice',
                name: displayName,
                tier: data.tier,
                label: data.label,
                score: data.score,
                dish: recipe ? recipe.dish : null,
                iso2
            };
        }

        if (mapMode === 'complexity') {
            const data = complexityMapData[isoCode] || complexityMapData[normalizedName] || complexityMapData[name];
            if (!data || typeof data !== 'object' || !data.tier) {
                return { mode: 'complexity', name: displayName, tier: 'quick', label: 'Quick & Easy', score: 0, breakdown: null, dish: null, iso2 };
            }
            return {
                mode: 'complexity',
                name: displayName,
                tier: data.tier,
                label: data.label,
                score: data.score,
                breakdown: data.breakdown,
                dish: recipe ? recipe.dish : null,
                iso2
            };
        }

        if (mapMode === 'base_spirit') {
            const data = spiritMapData[isoCode] || spiritMapData[normalizedName] || spiritMapData[name];
            if (!data || typeof data !== 'object' || !data.primary) {
                return { mode: 'spirit', name: displayName, primary: 'No Drink', drinkName: null, iso2 };
            }
            return {
                mode: 'spirit',
                name: displayName,
                primary: data.primary,
                drinkName: data.drinkName,
                iso2
            };
        }

        return null;
    };

    const metricTooltip = getMetricTooltipData();

    return (
        <div className="relative w-full h-screen bg-gray-900 font-sans text-gray-100" onMouseMove={handleMouseMove}>
            <div id="map" ref={mapContainerRef} className="outline-none"></div>

            <div ref={effectsContainerRef} className="effects-container"></div>

            {/* EU5-Style Map Mode Panel */}
            <MapModePanel
                activeMode={mapMode}
                onModeChange={handleMapModeChange}
                meatStats={meatStats}
                spiceStats={spiceStats}
                complexityStats={complexityStats}
                spiritStats={spiritStats}
            />

            {/* Metric Tooltip (shown on hover in any metric mode) */}
            {metricTooltip && mapMode !== 'political' && (
                <div className="meat-tooltip" style={{ bottom: 70, right: 16 }}>
                    <div className="meat-tooltip-header">
                        {metricTooltip.iso2 && (
                            <img
                                className="meat-tooltip-flag"
                                src={`https://flagcdn.com/w40/${metricTooltip.iso2.toLowerCase()}.png`}
                                alt=""
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        )}
                        <span className="meat-tooltip-name">{metricTooltip.name}</span>
                    </div>

                    {metricTooltip.mode === 'meat' && (
                        <div className="meat-tooltip-body">
                            <div className="meat-tooltip-swatch-wrap" style={{ background: `${window.getMeatColor(metricTooltip.primary)}20` }}>
                                <span className="meat-tooltip-swatch-icon">{window.getMeatIcon(metricTooltip.primary)}</span>
                            </div>
                            <div className="meat-tooltip-info">
                                <span className="meat-tooltip-label">Primary Meat</span>
                                <span className="meat-tooltip-value" style={{ color: window.getMeatColor(metricTooltip.primary) }}>{metricTooltip.primary}</span>
                            </div>
                        </div>
                    )}

                    {metricTooltip.mode === 'spice' && (
                        <React.Fragment>
                            <div className="meat-tooltip-body">
                                <div className="meat-tooltip-swatch-wrap" style={{ background: `${window.getSpiceColor(metricTooltip.tier)}20` }}>
                                    <span className="meat-tooltip-swatch-icon">{window.getSpiceIcon(metricTooltip.tier)}</span>
                                </div>
                                <div className="meat-tooltip-info">
                                    <span className="meat-tooltip-label">Spice Level</span>
                                    <span className="meat-tooltip-value" style={{ color: window.getSpiceColor(metricTooltip.tier) }}>{metricTooltip.label}</span>
                                </div>
                            </div>
                            <div className="spice-tooltip-score">
                                <div className="spice-tooltip-score-bar-track">
                                    <div className="spice-tooltip-score-bar-fill" style={{ width: `${Math.min(100, (metricTooltip.score / 12) * 100)}%`, background: `linear-gradient(90deg, #60a5fa, ${window.getSpiceColor(metricTooltip.tier)})` }} />
                                </div>
                                <span className="spice-tooltip-score-num">{metricTooltip.score}</span>
                            </div>
                        </React.Fragment>
                    )}

                    {metricTooltip.mode === 'complexity' && (
                        <React.Fragment>
                            <div className="meat-tooltip-body">
                                <div className="meat-tooltip-swatch-wrap" style={{ background: `${window.getComplexityColor(metricTooltip.tier)}20` }}>
                                    <span className="meat-tooltip-swatch-icon">{window.getComplexityIcon(metricTooltip.tier)}</span>
                                </div>
                                <div className="meat-tooltip-info">
                                    <span className="meat-tooltip-label">Complexity</span>
                                    <span className="meat-tooltip-value" style={{ color: window.getComplexityColor(metricTooltip.tier) }}>{metricTooltip.label}</span>
                                </div>
                            </div>
                            {metricTooltip.breakdown && (
                                <div className="cx-tooltip-breakdown">
                                    {[
                                        { key: 'ingredients', label: 'Ingredients', max: 25, color: '#38bdf8' },
                                        { key: 'technique', label: 'Technique', max: 30, color: '#8b5cf6' },
                                        { key: 'process', label: 'Process', max: 30, color: '#6366f1' },
                                        { key: 'skill', label: 'Skill', max: 15, color: '#c026d3' }
                                    ].map(dim => (
                                        <div key={dim.key} className="cx-tooltip-dim">
                                            <span className="cx-tooltip-dim-label">{dim.label}</span>
                                            <div className="cx-tooltip-dim-bar-track">
                                                <div className="cx-tooltip-dim-bar-fill" style={{ width: `${Math.min(100, (metricTooltip.breakdown[dim.key] / dim.max) * 100)}%`, background: dim.color }} />
                                            </div>
                                            <span className="cx-tooltip-dim-val">{metricTooltip.breakdown[dim.key]}</span>
                                        </div>
                                    ))}
                                    <div className="cx-tooltip-total">
                                        <span className="cx-tooltip-total-label">Total Score</span>
                                        <span className="cx-tooltip-total-score" style={{ color: window.getComplexityColor(metricTooltip.tier) }}>{metricTooltip.score}</span>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    )}

                    {metricTooltip.mode === 'spirit' && (
                        <div className="meat-tooltip-body">
                            <div className="meat-tooltip-swatch-wrap" style={{ background: `${window.getSpiritColor(metricTooltip.primary)}20` }}>
                                <span className="meat-tooltip-swatch-icon">{window.getSpiritIcon(metricTooltip.primary)}</span>
                            </div>
                            <div className="meat-tooltip-info">
                                <span className="meat-tooltip-label">Base Spirit</span>
                                <span className="meat-tooltip-value" style={{ color: window.getSpiritColor(metricTooltip.primary) }}>{metricTooltip.primary}</span>
                            </div>
                        </div>
                    )}

                    {metricTooltip.dish && metricTooltip.mode !== 'spirit' && (
                        <div className="meat-tooltip-dish">
                            <span className="meat-tooltip-dish-label">Dish:</span>
                            <span>{metricTooltip.dish}</span>
                        </div>
                    )}
                    {metricTooltip.drinkName && metricTooltip.mode === 'spirit' && (
                        <div className="meat-tooltip-dish">
                            <span className="meat-tooltip-dish-label">Drink:</span>
                            <span>{metricTooltip.drinkName}</span>
                        </div>
                    )}
                </div>
            )}

            {isMapLoading && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-700 h-16 w-16 mb-4"></div>
                    <h2 className="text-xl font-bold text-gray-400 tracking-wider">LOADING KITCHEN...</h2>
                </div>
            )}

            <RecipeFinder
                db={culinaryDB}
                onRecipeSelect={handleRecipeSelect}
                onHighlight={setHighlightedKeys}
                onSearchIngredientsChange={setSearchIngredients}
                activeSearchMode={activeSearchMode}
                onActivateMode={() => setActiveSearchMode('recipe')}
            />

            <StockpileManager
                db={culinaryDB}
                onRecipeSelect={handleRecipeSelect}
                onHighlight={setHighlightedKeys}
                onSearchIngredientsChange={setSearchIngredients}
                activeSearchMode={activeSearchMode}
                onActivateMode={() => setActiveSearchMode('stockpile')}
            />

            {/* Shopping Cart Button */}
            <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="absolute top-4 right-6 z-[1100] bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg border border-gray-600 transition-all hover:scale-110 group"
                title="Shopping Cart"
                data-testid="shopping-cart-btn"
            >
                <span className="text-xl group-hover:animate-bounce">🛒</span>
                {shoppingList.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-gray-900">
                        {shoppingList.length}
                    </span>
                )}
            </button>

            {/* Shopping Cart Modal */}
            {isCartOpen && (
                <div className="absolute top-20 right-6 z-[1100] w-72 bg-gray-900/95 text-white rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md flex flex-col max-h-[60vh] animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-serif font-bold text-blue-400 flex items-center gap-2">
                            <span>🛒</span> Shopping List
                        </h3>
                        <button onClick={() => clearShoppingList()} className="text-xs text-red-400 hover:text-red-300 uppercase font-bold tracking-wider">Clear All</button>
                    </div>
                    <div className="overflow-y-auto custom-scroll p-2 flex-grow">
                        {shoppingList.length === 0 ? (
                            <p className="text-gray-500 text-center text-xs py-4 italic">Your cart is empty.</p>
                        ) : (
                            shoppingList.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-800 rounded border-b border-gray-800 last:border-0 group">
                                    <span className="text-sm text-gray-300">{item}</span>
                                    <button onClick={() => removeFromShoppingList(item)} className="text-gray-500 hover:text-red-400">&times;</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            <RecipeCard
                key={selectedCountry?.cca3 || selectedCountry?.name?.common}
                country={selectedCountry}
                db={culinaryDB}
                searchIngredients={searchIngredients}
                initialTab={selectedTabHint}
                onTabChange={(tab) => setSelectedTabHint(tab)}
                onAddToShoppingList={addToShoppingList}
                onShowToast={showToast}
                onClose={() => {
                    setSelectedCountry(null);
                    handleBackToWorld();
                }}
            />

            {/* GLOBAL CLEAR BUTTON (Visible whenever map is highlighted) */}
            {highlightedKeys && mapMode === 'political' && (
                <button
                    onClick={handleGlobalClear}
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[1200] bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full shadow-xl border border-red-400 font-bold text-sm tracking-wide animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-2"
                >
                    <span>✕</span> Clear Map
                </button>
            )}

            {mapMode === 'political' && <PreviewCard feature={hoveredFeature} db={culinaryDB} />}

            {highlightedKeys && (() => {
                const usedTypes = new Set(Object.values(highlightedKeys));
                const legendItems = [
                    { type: 'ready',        color: '#10b981', label: 'Ready',         shadow: 'rgba(16,185,129,0.6)' },
                    { type: 'food',         color: '#eab308', label: 'Dish',          shadow: 'rgba(234,179,8,0.6)' },
                    { type: 'drink',        color: '#06b6d4', label: 'Drink',         shadow: 'rgba(6,182,212,0.6)' },
                    { type: 'dessert',      color: '#ec4899', label: 'Dessert',       shadow: 'rgba(236,72,153,0.6)' },
                    { type: 'both',         color: '#a855f7', label: 'Dish+Drink',    shadow: 'rgba(168,85,247,0.6)' },
                    { type: 'food+dessert', color: '#f97316', label: 'Dish+Dessert',  shadow: 'rgba(249,115,22,0.6)' },
                    { type: 'drink+dessert',color: '#6366f1', label: 'Drink+Dessert', shadow: 'rgba(99,102,241,0.6)' },
                    { type: 'all',          color: '#10b981', label: 'All Three',     shadow: 'rgba(16,185,129,0.6)' },
                ].filter(item => usedTypes.has(item.type));

                return (
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-gray-900/85 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full shadow-2xl text-xs text-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none select-none flex items-center gap-1">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mr-2">Match</span>
                        {legendItems.map(({ type, color, label, shadow }, i) => (
                            <React.Fragment key={type}>
                                {i > 0 && <span className="text-gray-700 mx-1">·</span>}
                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 6px ${shadow}` }}></span>
                                    <span className="font-medium text-[11px]">{label}</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                );
            })()}

            {isDrillDownMode && !selectedCountry && (
                <button
                    onClick={handleBackToWorld}
                    className="absolute top-4 left-4 z-[1000] bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-600 transition-colors font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300"
                >
                    <span>🌍</span> Back to World
                </button>
            )}

            {toast && (
                <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[2000] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 border border-white/10 backdrop-blur-md ${toast.type === 'success' ? 'bg-emerald-600/90 text-white' : 'bg-red-600/90 text-white'}`}>
                    <span className="text-xl">{toast.type === 'success' ? '🛒' : '⚠️'}</span>
                    <span className="font-bold text-sm tracking-wide">{toast.message}</span>
                </div>
            )}
        </div>
    );
};
