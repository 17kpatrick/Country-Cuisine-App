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

const App = () => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
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

    useEffect(() => {
        highlightedKeysRef.current = highlightedKeys;
    }, [highlightedKeys]);

    useEffect(() => {
        selectedCountryRef.current = selectedCountry;
    }, [selectedCountry]);

    const getNormalizedName = (feature) => {
        const p = feature.properties;
        const isoCode = getIso3(feature);
        let name = (p.st_nm || p.ST_NM || p.NAME_1 || p.name_1 || p.NAME || p.ADMIN || p.name || '').trim();
        if (name === 'Orissa') name = 'Odisha';
        if (name === 'Uttaranchal') name = 'Uttarakhand';
        if (name === 'Pondicherry') name = 'Puducherry';
        if (name.includes('Andaman')) name = 'Andaman and Nicobar Islands';
        if (name.includes('Dadra') || name.includes('Daman')) name = 'Dadra and Nagar Haveli and Daman and Diu';
        if (name === 'Jammu & Kashmir') name = 'Jammu and Kashmir';
        if (isoCode === 'CHN' && CHINA_NAME_MAPPING[name]) name = CHINA_NAME_MAPPING[name];
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

        const flaireData = window.COUNTRY_FLAIRS?.[isoCode];
        if (!flaireData) return;

        flaireData.forEach(item => {
            if (item.type === 'map-theme') {
                if (mapContainerRef.current) {
                    mapContainerRef.current.classList.add(item.name);
                    activeMapThemeRef.current = item.name;
                }
                return;
            }

            if (item.type === 'effect') {
                let count = 40;
                let className = 'sakura-petal';

                // Configure counts and classes based on effect type
                if (item.name === 'sand-dust-devils') {
                    count = 15; className = 'sand-devil';
                } else if (item.name === 'incense-smoke') {
                    count = 30; className = 'incense-smoke';
                } else if (item.name === 'diwali-lamp') {
                    count = 60; className = 'diwali-lamp';
                } else if (item.name === 'lanterns-rise') {
                    count = 50; className = 'lantern';
                } else if (item.name === 'sakura-wind') {
                    count = 60; className = 'sakura-petal'; // Use updated wind petals
                }
                
                for (let i = 0; i < count; i++) {
                    let el;
                    
                    // --- SPECIAL LOGIC FOR SAKURA WIND (JAPAN) ---
                    if (item.name === 'sakura-wind') {
                        // Create a wrapper for movement (Wind)
                        const wrapper = document.createElement('div');
                        wrapper.className = 'sakura-wrapper';

                        // Spawn randomly across the entire viewport + buffer (-20% to 100%)
                        wrapper.style.left = (Math.random() * 120 - 20) + '%';
                        wrapper.style.top = (Math.random() * 120 - 20) + '%';
                        
                        // Wind Speed
                        const duration = Math.random() * 8 + 6;
                        wrapper.style.animationDuration = duration + 's';
                        wrapper.style.animationDelay = -(Math.random() * duration) + 's';

                        // Create the inner petal for rotation (Tumble)
                        const petal = document.createElement('div');
                        petal.className = 'sakura-petal';
                        
                        // Random sizes for depth perception
                        const size = Math.random() * 12 + 6; 
                        petal.style.width = size + 'px';
                        petal.style.height = size + 'px';
                        
                        // Randomize tumble speed slightly
                        petal.style.animationDuration = (Math.random() * 2 + 2) + 's';
                        
                        wrapper.appendChild(petal);
                        el = wrapper;
                    } else {
                        // --- STANDARD LOGIC FOR OTHERS ---
                        el = document.createElement('div');
                        el.className = className;
                        el.style.left = Math.random() * 100 + '%';
                        
                        if (item.name === 'sand-dust-devils') {
                            el.style.bottom = (Math.random() * 40 - 20) + '%';
                            el.style.transform = `scale(${Math.random() * 0.5 + 0.3})`;
                        } else if (item.name === 'lanterns-rise') {
                            el.style.top = '0'; // Position handled by transform
                            el.style.width = (Math.random() * 25 + 18) + 'px';
                            el.style.height = (parseFloat(el.style.width) * 1.3) + 'px';
                        } else if (item.name === 'incense-smoke') {
                            // Random positions for smoke
                            el.style.left = Math.random() * 100 + '%';
                            el.style.top = Math.random() * 100 + '%';
                            el.style.animationDelay = -(Math.random() * 10) + 's';
                            
                            // Randomize smoke colors (Increased opacity for visibility)
                            const colors = ['rgba(255, 160, 120, 0.3)', 'rgba(220, 220, 220, 0.3)', 'rgba(150, 255, 180, 0.2)'];
                            const color = colors[Math.floor(Math.random() * colors.length)];
                            el.style.background = `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`;
                        } else if (item.name === 'diwali-lamp') {
                            // Random positions for lamps
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

            const icon = L.divIcon({
                className: 'custom-flaire-element',
                html: htmlContent,
                iconSize: [item.width || 100, item.height || 50],
                iconAnchor: [(item.width || 100) / 2, (item.height || 50) / 2]
            });
            
            L.marker([item.lat, item.lon], { icon, interactive: false, zIndexOffset: 1000 })
                .addTo(flaireLayerRef.current);
        });
    };

    // --- GLOBAL SUB-REGION HIGHLIGHTS (SEARCH) ---
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        // Initialize or clear the global highlight layer
        if (!globalSubHighlightLayerRef.current) {
            globalSubHighlightLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
        } else {
            globalSubHighlightLayerRef.current.clearLayers();
        }

        if (!highlightedKeys) return;

        const countriesWithSubRegions = Object.keys(REGION_CONFIG);

        countriesWithSubRegions.forEach(isoCode => {
            const config = REGION_CONFIG[isoCode];

            const renderHighlights = (data) => {
                const featuresToHighlight = data.features.filter(f => {
                    // Use normalized name from cache
                    const name = f.properties.st_nm || f.properties.name;
                    return highlightedKeys.includes(name);
                });

                if (featuresToHighlight.length > 0) {
                    L.geoJson(featuresToHighlight, {
                        style: {
                            fillColor: '#ef4444', // Red/Orange to contrast with Yellow country highlight
                            fillOpacity: 0.9,
                            weight: 1,
                            color: '#ffffff'
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
                            let name = (f.properties.st_nm || f.properties.ST_NM || f.properties.NAME_1 || f.properties.name_1 || f.properties.NAME || f.properties.ADMIN || f.properties.name || '').trim();
                            
                            if (isoCode === 'CHN' && CHINA_NAME_MAPPING[name]) {
                                name = CHINA_NAME_MAPPING[name];
                            }
                            if (isoCode === 'IND') {
                                if (name === 'Orissa') name = 'Odisha';
                                if (name === 'Uttaranchal') name = 'Uttarakhand';
                                if (name === 'Pondicherry') name = 'Puducherry';
                                if (name.includes('Andaman')) name = 'Andaman and Nicobar Islands';
                                if (name.includes('Dadra') || name.includes('Daman')) name = 'Dadra and Nagar Haveli and Daman and Diu';
                                if (name === 'Jammu & Kashmir') name = 'Jammu and Kashmir';
                            }
                            
                            // Standardize properties for easier access later
                            f.properties.st_nm = name;
                            f.properties.name = name;
                        });

                        regionCacheRef.current[isoCode] = data;
                        renderHighlights(data);
                    })
                    .catch(err => console.error(`Error loading region ${isoCode}`, err));
            }
        });
    }, [highlightedKeys]);

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

                const subLayer = L.geoJson(subData, {
                    style: (feature) => {
                        const name = getNormalizedName(feature);
                        const iso = getIso3(feature);
                        
                        // Default Style
                        let style = { fillColor: '#374151', weight: 1, opacity: 1, color: '#eab308', fillOpacity: 0.4 };

                        // Check Highlight (Recipe Finder)
                        const searchKeys = highlightedKeysRef.current;
                        if (searchKeys) {
                            const isMatch = searchKeys.includes(iso) || searchKeys.includes(name);
                            if (isMatch) {
                                style = { fillColor: '#eab308', fillOpacity: 0.6, color: '#ffffff', weight: 1 };
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
                        // Data is already normalized if it came from cache, but if fresh fetch (rare race condition), handle it:
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

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

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
                        const isMatch = searchKeys.includes(isoCode) || searchKeys.includes(name);
                        if (isMatch) {
                            styleToApply = {
                                weight: 2,
                                color: '#ffffff',
                                fillOpacity: 0.9,
                                fillColor: '#eab308'
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
                        const isMatch = searchKeys.includes(isoCode) || searchKeys.includes(name);
                        if (isMatch) {
                            layer.setStyle({ fillColor: '#eab308', fillOpacity: 0.6, color: '#ffffff', weight: 1 });
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

                const isMatch = highlightedKeys && (highlightedKeys.includes(isoCode) || highlightedKeys.includes(name));

                if (isMatch) {
                    layer.setStyle({ fillColor: '#eab308', fillOpacity: 0.6, color: '#ffffff', weight: 1 });
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
                if(effectsContainerRef.current) effectsContainerRef.current.style.display = 'block'; 
            }, 10);
        }

        if (activeMapThemeRef.current && mapContainerRef.current) {
            mapContainerRef.current.classList.remove(activeMapThemeRef.current);
            activeMapThemeRef.current = null;
        }

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
                if (isoCode === 'FRA') {
                    mapInstanceRef.current.setView([46.603354, 1.888334], 5.5, { animate: true });
                } else if (isoCode === 'PRT') {
                    mapInstanceRef.current.setView([39.3999, -8.2245], 7, { animate: true });
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

            <div ref={effectsContainerRef} className="sakura-container"></div>

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
            />

            <RecipeCard 
                country={selectedCountry} 
                db={culinaryDB}
                onClose={() => {
                    setSelectedCountry(null);
                    handleBackToWorld();
                }}
            />

            <PreviewCard feature={hoveredFeature} db={culinaryDB} />

            {isDrillDownMode && !selectedCountry && (
                <button 
                    onClick={handleBackToWorld}
                    className="absolute top-4 left-4 z-[1000] bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-600 transition-colors font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300"
                >
                    <span>🌍</span> Back to World
                </button>
            )}

            {!selectedCountry && !hoveredFeature && !isMapLoading && (
                <div className="absolute bottom-8 w-full text-center pointer-events-none z-[400]">
                    <span className="bg-black/70 text-gray-300 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-md border border-gray-700">
                        Click a country to reveal its secret recipe 🍳
                    </span>
                </div>
            )}
        </div>
    );
};