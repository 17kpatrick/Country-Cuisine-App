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
    'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur'
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

const App = () => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const tileLayerRef = useRef(null);
    const activeTileStyleRef = useRef('dark');

    const geoJsonLayerRef = useRef(null);
    const subRegionLayerRef = useRef(null);
    const highlightedLayerRef = useRef(null);
    const activeRegionIsoRef = useRef(null);
    const flaireLayerRef = useRef(null);
    const activeMapThemeRef = useRef(null);
    const highlightedKeysRef = useRef(null);
    const selectedCountryRef = useRef(null);
    const effectsContainerRef = useRef(null);
    const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const globalSubHighlightLayerRef = useRef(null);
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

    // Safe reference to StockpileManager in case it hasn't loaded yet
    const StockpileManager = window.StockpileManager || (() => null);

    useEffect(() => {
        highlightedKeysRef.current = highlightedKeys;
    }, [highlightedKeys]);

    useEffect(() => {
        selectedCountryRef.current = selectedCountry;
    }, [selectedCountry]);

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
        let name = (p.st_nm || p.ST_NM || p.NAME_1 || p.name_1 || p.NAME || p.ADMIN || p.name || p.nom || p.navn || p.state_name || p.NOM_DPTO || p.DPTO || p.nombre || p.reg_name || p.REGIONNAVN || '').trim();
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
                htmlContent = `<div class="${item.className || ''}" style="${item.style}">${item.content}</div>`;
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
                            let color = "#eab308"; // default yellow (food)
                            if (type === 'drink') color = "#06b6d4"; // cyan
                            if (type === 'both') color = "#a855f7"; // purple
                            return { fillColor: color, fillOpacity: 0.9, weight: 1, color: "#ffffff" };
                        },
                        onEachFeature: (feature, layer) => {
                            layer.on('click', (e) => {
                                L.DomEvent.stopPropagation(e);
                                const name = feature.properties.st_nm || feature.properties.name;

                                mapInstanceRef.current.setView(config.view.center, config.view.zoom, { animate: true });
                                activeRegionIsoRef.current = isoCode;
                                setIsDrillDownMode(true);
                                loadSubRegionLayer(isoCode, config);

                                setSelectedCountry({
                                    name: { common: name },
                                    cca3: name
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
                        // Pre-process/Normalize Data for Cache
                        data.features.forEach(f => {
                            let name = (f.properties.st_nm || f.properties.ST_NM || f.properties.NAME_1 || f.properties.name_1 || f.properties.NAME || f.properties.ADMIN || f.properties.name || f.properties.nom || f.properties.navn || f.properties.state_name || f.properties.NOM_DPTO || f.properties.DPTO || f.properties.nombre || f.properties.reg_name || f.properties.REGIONNAVN || '').trim();

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
            : fetch(regionConfig.geoJsonUrl).then(res => res.json());

        fetchData.then(subData => {
            if (activeRegionIsoRef.current !== isoCode) return;

            if (subData.features && !regionCacheRef.current[isoCode]) {
                subData.features.forEach(f => {
                    let name = (f.properties.st_nm || f.properties.ST_NM || f.properties.NAME_1 || f.properties.name_1 || f.properties.NAME || f.properties.ADMIN || f.properties.name || f.properties.nom || f.properties.navn || f.properties.state_name || f.properties.NOM_DPTO || f.properties.DPTO || f.properties.nombre || f.properties.reg_name || f.properties.REGIONNAVN || '').trim();
                    if (isoCode === 'CHN' && CHINA_NAME_MAPPING[name]) name = CHINA_NAME_MAPPING[name];
                    if (isoCode === 'SLV' && EL_SALVADOR_NAME_MAPPING[name]) name = EL_SALVADOR_NAME_MAPPING[name];
                    if (isoCode === 'MEX' && MEXICO_NAME_MAPPING[name]) name = MEXICO_NAME_MAPPING[name];
                    if (isoCode === 'FRA' && FRANCE_NAME_MAPPING[name]) name = FRANCE_NAME_MAPPING[name];
                    if (isoCode === 'ITA' && ITALY_NAME_MAPPING[name]) name = ITALY_NAME_MAPPING[name];
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

                    // Default Style
                    let style = { fillColor: '#374151', weight: 1, opacity: 1, color: '#eab308', fillOpacity: 0.4 };

                    // Check Highlight (Recipe Finder)
                    const searchKeys = highlightedKeysRef.current;
                    if (searchKeys) {
                        const matchType = searchKeys[iso] || searchKeys[name];
                        if (matchType) {
                            let color = "#eab308"; // food
                            if (matchType === 'drink') color = "#06b6d4";
                            if (matchType === 'both') color = "#a855f7";
                            if (matchType === 'ready') color = "#10b981"; 
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
                            l.setStyle({ weight: 2, color: '#ffffff', fillOpacity: 0.7 });
                            l.bringToFront();
                            setHoveredFeature(layer.feature);
                        },
                        mouseout: (e) => {
                            const l = e.target;
                            subRegionLayerRef.current.resetStyle(l);

                            const name = getNormalizedName(l.feature);
                            const isSelected = selectedCountryRef.current && selectedCountryRef.current.name.common === name;
                            if (isSelected) {
                                l.setStyle({ color: '#38bdf8', weight: 2, opacity: 1 });
                            }

                            setHoveredFeature(null);
                        },
                        click: (e) => {
                            L.DomEvent.stopPropagation(e);
                            const subName = getNormalizedName(feature);

                            mapInstanceRef.current.fitBounds(e.target.getBounds());
                            setSelectedCountry({
                                name: { common: subName },
                                cca3: subName
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

                    const searchKeys = highlightedKeysRef.current;
                    const isSearchActive = searchKeys !== null;
                    let styleToApply = highlightStyle;

                    if (isSearchActive) {
                        const matchType = searchKeys[isoCode] || searchKeys[name];
                        if (matchType) {
                            let color = "#eab308";
                            if (matchType === 'drink') color = "#06b6d4";
                            if (matchType === 'both') color = "#a855f7";
                            if (matchType === 'ready') color = "#10b981";
                            styleToApply = {
                                weight: 2,
                                color: '#ffffff',
                                fillOpacity: 0.9,
                                fillColor: color
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

        const updateLayerStyle = (layerGroup) => {
            if (!layerGroup) return;

            layerGroup.eachLayer(layer => {
                const isoCode = getIso3(layer.feature);
                const name = getNormalizedName(layer.feature);
                const isSelected = selectedCountry && (selectedCountry.cca3 === isoCode || selectedCountry.name.common === name);

                if (highlightedKeys === null && !isSelected) {
                    layerGroup.resetStyle(layer);
                    return;
                }

                const matchType = highlightedKeys && (highlightedKeys[isoCode] || highlightedKeys[name]);

                if (matchType) {
                    let color = "#eab308";
                    if (matchType === 'drink') color = "#06b6d4";
                    if (matchType === 'both') color = "#a855f7";
                    if (matchType === 'ready') color = "#10b981";
                    layer.setStyle({ fillColor: color, fillOpacity: 0.6, color: '#ffffff', weight: 1 });
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
    };

    const handleRecipeSelect = (key) => {
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

    return (
        <div className="relative w-full h-screen bg-gray-900 font-sans text-gray-100" onMouseMove={handleMouseMove}>
            <div id="map" ref={mapContainerRef} className="outline-none"></div>

            <div ref={effectsContainerRef} className="effects-container"></div>

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
                country={selectedCountry}
                db={culinaryDB}
                searchIngredients={searchIngredients}
                onAddToShoppingList={addToShoppingList}
                onShowToast={showToast}
                onClose={() => {
                    setSelectedCountry(null);
                    handleBackToWorld();
                }}
            />

            {/* GLOBAL CLEAR BUTTON (Visible whenever map is highlighted) */}
            {highlightedKeys && (
                <button
                    onClick={handleGlobalClear}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1200] bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full shadow-xl border border-red-400 font-bold text-sm tracking-wide animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-2"
                >
                    <span>✕</span> Clear Map
                </button>
            )}

            <PreviewCard feature={hoveredFeature} db={culinaryDB} />

            {highlightedKeys && (
                <div className="absolute bottom-24 right-4 z-[1000] bg-gray-900/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl text-xs text-gray-200 animate-in fade-in slide-in-from-right-4 duration-300 pointer-events-none select-none w-32">
                    <h4 className="font-bold mb-3 uppercase tracking-wider text-gray-400 border-b border-white/10 pb-2 text-[10px]">Match Type</h4>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                            <span className="font-medium">Ready</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-[#eab308] shadow-[0_0_8px_rgba(234,179,8,0.6)]"></span>
                            <span className="font-medium">Food</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
                            <span className="font-medium">Drink</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                            <span className="font-medium">Both</span>
                        </div>
                    </div>
                </div>
            )}

            {isDrillDownMode && !selectedCountry && (
                <button
                    onClick={handleBackToWorld}
                    className="absolute top-4 left-4 z-[1000] bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-600 transition-colors font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300"
                >
                    <span>🌍</span> Back to World
                </button>
            )}

            {!selectedCountry && !hoveredFeature && !isMapLoading && (
                <div className="absolute bottom-8 w-full text-center pointer-events-none z-[400]" data-testid="map-hint">
                    <span className="bg-black/70 text-gray-300 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-md border border-gray-700">
                        Click a country to reveal its secret recipe 🍳
                    </span>
                </div>
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
