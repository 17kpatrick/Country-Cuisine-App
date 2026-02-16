const MapModePanel = ({ activeMode, onModeChange, meatStats, spiceStats, complexityStats, spiritStats }) => {
    const [isLegendExpanded, setIsLegendExpanded] = React.useState(true);
    const [hoveredCategory, setHoveredCategory] = React.useState(null);

    const MODES = [
        { id: 'political', label: 'Political', icon: '\u{1F30D}', desc: 'Standard map view' },
        { id: 'primary_meat', label: 'Primary Meat', icon: '\u{1F356}', desc: 'Dominant protein by region' },
        { id: 'spice_level', label: 'Spice Level', icon: '\u{1F525}', desc: 'Heat index by region' },
        { id: 'complexity', label: 'Complexity', icon: '\u{1F9EA}', desc: 'Recipe complexity index' },
        { id: 'base_spirit', label: 'Base Spirit', icon: '\u{1F378}', desc: 'Primary drink spirit by region' }
    ];

    const meatCategories = window.MEAT_CATEGORIES;
    const spiritCategories = window.SPIRIT_CATEGORIES;
    const meatTotal = meatStats ? Object.values(meatStats).reduce((a, b) => a + b, 0) : 0;
    const spiceTotal = spiceStats ? Object.values(spiceStats).reduce((a, b) => a + b, 0) : 0;
    const cxTotal = complexityStats ? Object.values(complexityStats).reduce((a, b) => a + b, 0) : 0;
    const spiritTotal = spiritStats ? Object.values(spiritStats).reduce((a, b) => a + b, 0) : 0;

    const sortedMeatStats = meatStats ? Object.entries(meatStats).sort((a, b) => b[1] - a[1]) : [];

    const spiceTiers = window.SPICE_TIERS || [];
    const orderedSpiceStats = spiceTiers
        .map(tier => [tier.label, spiceStats ? (spiceStats[tier.label] || 0) : 0])
        .filter(([, count]) => count > 0);

    const complexityTiers = window.COMPLEXITY_TIERS || [];
    const orderedCxStats = complexityTiers
        .map(tier => [tier.label, complexityStats ? (complexityStats[tier.label] || 0) : 0])
        .filter(([, count]) => count > 0);

    const sortedSpiritStats = spiritStats
        ? Object.entries(spiritStats).sort((a, b) => b[1] - a[1])
        : [];

    // Reusable legend renderer
    const renderCategoricalLegend = (title, icon, subtitle, items, tierSource, total, footerText, footerDotClass) => (
        <div className={`map-mode-legend ${isLegendExpanded ? 'expanded' : 'collapsed'}`}>
            <button
                className="map-mode-legend-header"
                onClick={() => setIsLegendExpanded(!isLegendExpanded)}
            >
                <div className="map-mode-legend-title-row">
                    <span className="map-mode-legend-icon">{icon}</span>
                    <span className="map-mode-legend-title">{title}</span>
                </div>
                <span className={`map-mode-legend-chevron ${isLegendExpanded ? 'open' : ''}`}>
                    {'\u{25B8}'}
                </span>
            </button>

            {isLegendExpanded && (
                <div className="map-mode-legend-body">
                    <div className="map-mode-legend-subtitle">{subtitle}</div>

                    {tierSource === 'gradient' && items.gradientBar}

                    <div className="map-mode-legend-items">
                        {items.rows.map(([label, count]) => {
                            const tier = items.lookup(label);
                            if (!tier) return null;
                            const pct = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                            return (
                                <div
                                    key={label}
                                    className={`map-mode-legend-item ${hoveredCategory === label ? 'hovered' : ''}`}
                                    onMouseEnter={() => setHoveredCategory(label)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                >
                                    <div className="map-mode-legend-item-left">
                                        <span className="map-mode-legend-swatch" style={{ background: tier.color, boxShadow: `0 0 8px ${tier.glow || tier.color + '60'}` }} />
                                        <span className="map-mode-legend-item-icon">{tier.icon}</span>
                                        <span className="map-mode-legend-item-name">{label}</span>
                                    </div>
                                    <div className="map-mode-legend-item-right">
                                        <div className="map-mode-legend-bar-track">
                                            <div className="map-mode-legend-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${tier.color}cc, ${tier.color})` }} />
                                        </div>
                                        <span className="map-mode-legend-item-count">{count}</span>
                                        <span className="map-mode-legend-item-pct">{pct}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="map-mode-legend-footer">
                        <span className={`map-mode-legend-footer-dot ${footerDotClass || ''}`} />
                        {footerText}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="map-mode-panel">
            <div className="map-mode-tabs">
                <div className="map-mode-tabs-header">
                    <span className="map-mode-tabs-icon">{'\u{1F5FA}\u{FE0F}'}</span>
                    <span className="map-mode-tabs-title">MAP MODE</span>
                </div>
                <div className="map-mode-tabs-row">
                    {MODES.map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => onModeChange(mode.id)}
                            className={`map-mode-tab ${activeMode === mode.id ? 'active' : ''}`}
                            title={mode.desc}
                        >
                            <span className="map-mode-tab-icon">{mode.icon}</span>
                            <span className="map-mode-tab-label">{mode.label}</span>
                            {activeMode === mode.id && <div className="map-mode-tab-indicator" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Primary Meat Legend */}
            {activeMode === 'primary_meat' && renderCategoricalLegend(
                'PRIMARY MEAT', '\u{1F356}',
                `Dominant protein identified from ${meatTotal} recipes`,
                {
                    rows: sortedMeatStats,
                    lookup: (label) => meatCategories[label]
                },
                'categorical', meatTotal,
                'Data sourced from recipe ingredients', ''
            )}

            {/* Spice Level Legend */}
            {activeMode === 'spice_level' && renderCategoricalLegend(
                'SPICE LEVEL', '\u{1F525}',
                `Heat index derived from ${spiceTotal} recipes`,
                {
                    rows: orderedSpiceStats,
                    lookup: (label) => spiceTiers.find(t => t.label === label),
                    gradientBar: (
                        <div className="spice-gradient-bar">
                            <div className="spice-gradient-track">
                                {spiceTiers.slice().reverse().map((tier) => (
                                    <div key={tier.id} className="spice-gradient-segment" style={{ background: tier.color, flex: 1 }} />
                                ))}
                            </div>
                            <div className="spice-gradient-labels"><span>Mild</span><span>Fiery</span></div>
                        </div>
                    )
                },
                'gradient', spiceTotal,
                'Scored by spicy ingredient weight', 'spice-dot'
            )}

            {/* Complexity Legend */}
            {activeMode === 'complexity' && renderCategoricalLegend(
                'COMPLEXITY', '\u{1F9EA}',
                `Multi-dimensional index across ${cxTotal} recipes`,
                {
                    rows: orderedCxStats,
                    lookup: (label) => complexityTiers.find(t => t.label === label),
                    gradientBar: (
                        <div className="spice-gradient-bar">
                            <div className="spice-gradient-track">
                                {complexityTiers.slice().reverse().map((tier) => (
                                    <div key={tier.id} className="spice-gradient-segment" style={{ background: tier.color, flex: 1 }} />
                                ))}
                            </div>
                            <div className="spice-gradient-labels"><span>Easy</span><span>Masterclass</span></div>
                        </div>
                    )
                },
                'gradient', cxTotal,
                'Ingredients + Technique + Process + Skill', 'complexity-dot'
            )}

            {/* Base Spirit Legend */}
            {activeMode === 'base_spirit' && renderCategoricalLegend(
                'BASE SPIRIT', '\u{1F378}',
                `Primary drink spirit across ${spiritTotal} recipes`,
                {
                    rows: sortedSpiritStats,
                    lookup: (label) => spiritCategories[label]
                },
                'categorical', spiritTotal,
                'Classified from drink ingredients', 'spirit-dot'
            )}
        </div>
    );
};

window.MapModePanel = MapModePanel;
