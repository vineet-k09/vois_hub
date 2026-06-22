import React from 'react';
import { motion } from 'framer-motion';
import { Crown, DollarSign, TrendingUp, Users, ArrowRight, Sparkles, ChevronRight, Search, Layers } from 'lucide-react';

interface LandingPageProps {
  onSelectView: (view: 'ceo' | 'finance' | 'gtm' | 'hr' | 'custom') => void;
  onSelectStory: (view: 'ceo' | 'finance' | 'gtm' | 'hr' | 'compare', cardId: string) => void;
  onSelectSearchOption: (query: string, visualId: string, dashboard: 'ceo' | 'finance' | 'gtm' | 'hr', cardId: string) => void;
  customVisualIds?: string[];
  customDashboardName?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onSelectView, 
  onSelectStory, 
  onSelectSearchOption,
  customVisualIds = [],
  customDashboardName = 'Custom Dashboard'
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearchResults, setShowSearchResults] = React.useState(false);

  const dashboards = [
    {
      id: 'ceo' as const,
      title: 'CEO Strategic Dashboard',
      subtitle: 'Gary\'s Exception View',
      description: 'Strategic, high-level exception lens across VOIS pillars. Integrates growth, customer performance, cost, and talent.',
      icon: <Crown className="w-5 h-5" />,
      kpiPreview: [
        { label: 'EBITDA', val: '-€36.33M', status: 'red' },
        { label: 'Cost Takeout', val: '€141.6M', status: 'amber' },
        { label: 'Spirit Beat', val: '85', status: 'green' }
      ]
    },
    {
      id: 'finance' as const,
      title: 'Finance Dashboard',
      subtitle: 'Sarah\'s Forecast Lens',
      description: 'Cross-functional risk signals (HR, pipeline, contract lifecycle) that move OpsAnalytics, CapEx, and Revenue forecasts.',
      icon: <DollarSign className="w-5 h-5" />,
      kpiPreview: [
        { label: 'Revenue at Risk', val: '€186.4M', status: 'red' },
        { label: 'CapEx Burn vs Plan', val: '134%/81%', status: 'red' },
        { label: 'P×Q Revenue', val: '1074%', status: 'green' }
      ]
    },
    {
      id: 'gtm' as const,
      title: 'GTM Dashboard',
      subtitle: 'Chris\'s Commercial Lens',
      description: 'Pipeline funnel tracking, recognized revenue vs targets, top-10 delivery risks, and share of wallet vs competitors.',
      icon: <TrendingUp className="w-5 h-5" />,
      kpiPreview: [
        { label: 'Qual. Pipeline', val: '€1,359M', status: 'green' },
        { label: 'Win Conv.', val: '62%', status: 'green' },
        { label: 'Delivery Risk', val: '3R / 4A', status: 'red' }
      ]
    },
    {
      id: 'hr' as const,
      title: 'HR Dashboard',
      subtitle: 'Sima\'s People Correlation',
      description: 'Spirit Beat drivers, top-talent promotion glide path, attrition hotspots, and L&D effectiveness mapped to outcomes.',
      icon: <Users className="w-5 h-5" />,
      kpiPreview: [
        { label: 'Promotions', val: '24.6%', status: 'green' },
        { label: 'Spirit Beat', val: '85', status: 'green' },
        { label: 'L&D Adoption', val: '80%', status: 'amber' }
      ]
    }
  ];

  if (customVisualIds.length > 0) {
    dashboards.push({
      id: 'custom' as any,
      title: customDashboardName,
      subtitle: 'Bespoke Executive View',
      description: `Consolidated workspace containing ${customVisualIds.length} visual${customVisualIds.length === 1 ? '' : 's'} curated across CEO, Finance, GTM, and HR dashboard suites.`,
      icon: <Layers className="w-5 h-5" />,
      kpiPreview: [
        { label: 'Visuals', val: `${customVisualIds.length}`, status: 'green' },
        { label: 'Type', val: 'Bespoke', status: 'green' },
        { label: 'Scope', val: 'Unified', status: 'green' }
      ]
    });
  }

  const userStories = [
    {
      text: "CFST Talent stability is at 84% (Highest in 3 years). Check Sima's HR dashboard for critical role coverage.",
      view: 'hr' as const,
      cardId: 'hr-promotions'
    },
    {
      text: "TVOIS EBITDA Margin is leading at 90%. Review Sarah's Finance dashboard for CapEx burn vs plan details.",
      view: 'finance' as const,
      cardId: 'finance-risk'
    },
    {
      text: "CARE frontline agent Spirit Beat is at 79 (Amber). Check Sima's HR dashboard for employee feedback hotspots.",
      view: 'hr' as const,
      cardId: 'hr-spirit'
    },
    {
      text: "BVOIS is leading in Spirit (88) and Cost Efficiency. Review Chris's GTM dashboard for customer delivery risks.",
      view: 'gtm' as const,
      cardId: 'gtm-delivery'
    },
    {
      text: "TVOIS has achieved a 88% Automation Index. Check the Group Transformation Roadmap on the CEO dashboard.",
      view: 'ceo' as const,
      cardId: 'section-transformation'
    }
  ];

  const searchOptions = [
    {
      query: "Show me the Group Transformation Roadmap and Automation Index",
      visualId: "transformation",
      dashboard: "ceo" as const,
      cardId: "section-transformation",
      tags: ["transformation", "roadmap", "automation", "index", "group", "ai", "ceo"]
    },
    {
      query: "Review CapEx Burn vs Plan and Revenue at Risk",
      visualId: "finance-risk",
      dashboard: "finance" as const,
      cardId: "finance-risk",
      tags: ["capex", "burn", "plan", "revenue", "risk", "finance"]
    },
    {
      query: "Analyze CFST Talent Stability and Spirit Beat Drivers",
      visualId: "hr-spirit",
      dashboard: "hr" as const,
      cardId: "hr-spirit",
      tags: ["cfst", "talent", "stability", "spirit", "beat", "drivers", "hr", "people"]
    }
  ];

  const filteredSearchOptions = searchOptions.filter(opt => {
    if (!searchQuery) return true;
    const queryLower = searchQuery.toLowerCase();
    return opt.query.toLowerCase().includes(queryLower) || 
           opt.tags.some(tag => tag.includes(queryLower));
  });

  return (
    <div className="flex-1 flex flex-col md:flex-row justify-start items-stretch py-4 px-4 w-full gap-6">
      
      {/* Left side panel: shortcuts list */}
      <div className="w-full md:w-80 shrink-0">
        <div className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm space-y-3.5 h-full">
          <div className="space-y-1 pl-1">
            <span className="text-[10px] font-black text-accent uppercase tracking-widest block leading-none">
              Executive Insights
            </span>
            <h2 className="text-xs font-bold text-ink uppercase tracking-wide">
              User Story Shortcuts
            </h2>
            <p className="text-[9px] text-ink-soft leading-normal font-light">
              Click a shortcut below to navigate directly to target dashboard elements with highlighting.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {userStories.map((story, sIdx) => (
              <button
                key={sIdx}
                onClick={() => onSelectStory(story.view, story.cardId)}
                className="text-left bg-panel-2 border border-panel-border/70 rounded-xl p-3 hover:bg-accent/5 hover:border-accent/40 transition-all flex items-start gap-1.5 cursor-pointer leading-tight group focus:outline-none shadow-xs"
              >
                <ChevronRight size={12} className="text-accent shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span className="text-[10px] font-semibold text-ink-soft group-hover:text-ink leading-snug">
                  {story.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right main panel: search and dashboards */}
      <div className="flex-1 flex flex-col justify-start items-center space-y-6">
        
        {/* Welcome Header */}
        <div className="text-center max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-[9px] font-black uppercase text-accent tracking-widest leading-none">
            <Sparkles size={10} className="animate-pulse" /> Unified Executive Suite
          </div>
          <h1 className="text-2xl md:text-3xl  font-bold text-ink uppercase tracking-wide leading-tight">
            VOIS HUB PORTAL
          </h1>
          <p className="text-xs text-ink-soft font-light leading-relaxed">
            Select an executive persona view or search across consolidated insights using our AI-assisted visualization engine.
          </p>
        </div>

        {/* AI Search Section */}
        <div className="w-full max-w-xl relative space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search with AI (e.g. roadmap, capex, spirit)..."
              className="w-full bg-panel border border-panel-border text-ink rounded-2xl pl-10 pr-10 py-3 text-xs outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all shadow-xs"
            />
            <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-ink-soft hover:text-ink font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dropdown Results */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-panel border border-panel-border rounded-2xl shadow-lg z-50 overflow-hidden divide-y divide-panel-border">
              <div className="bg-panel-2 px-4 py-2 flex justify-between items-center">
                <span className="text-[8px] font-bold text-ink-soft uppercase tracking-wider">Suggested AI Queries</span>
                <button 
                  onClick={() => setShowSearchResults(false)} 
                  className="text-[8px] text-accent font-bold uppercase tracking-wider hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>
              {filteredSearchOptions.length > 0 ? (
                <div className="p-1.5 space-y-1 max-h-60 overflow-y-auto">
                  {filteredSearchOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        onSelectSearchOption(opt.query, opt.visualId, opt.dashboard, opt.cardId);
                        setShowSearchResults(false);
                      }}
                      className="w-full text-left bg-transparent hover:bg-accent/5 p-2.5 rounded-xl transition-colors flex items-start gap-2 group cursor-pointer focus:outline-none"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <span className="text-[10px] font-semibold text-ink-soft group-hover:text-ink block">
                          {opt.query}
                        </span>
                        <span className="text-[8px] text-ink-soft/75 uppercase tracking-wider block mt-0.5">
                          Opens visual from {opt.dashboard} dashboard
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-[10px] text-ink-soft">
                  No matching AI queries found. Try searching for "roadmap", "capex", or "spirit".
                </div>
              )}
            </div>
          )}

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
            <span className="text-[8px] font-black text-ink-soft uppercase tracking-wider mr-1">Suggestions:</span>
            {searchOptions.map((opt, index) => (
              <button
                key={index}
                onClick={() => onSelectSearchOption(opt.query, opt.visualId, opt.dashboard, opt.cardId)}
                className="px-2.5 py-1 rounded-full bg-panel-2 border border-panel-border hover:bg-accent/5 hover:border-accent/40 text-[9px] font-medium text-ink-soft hover:text-ink cursor-pointer transition-all flex items-center gap-1"
              >
                <Sparkles size={9} className="text-accent" />
                <span>{opt.query.split(" ").slice(0, 5).join(" ")}...</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Dashboards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-4">
          {dashboards.map((dash, index) => (
            <motion.div
              key={dash.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              whileHover={{ y: -3, scale: 1.005 }}
              onClick={() => onSelectView(dash.id)}
              className="group cursor-pointer bg-panel border border-panel-border rounded-2xl p-4 shadow-xs hover:shadow-sm hover:border-accent/40 transition-all flex flex-col justify-between h-full relative overflow-hidden"
            >
              {/* Top row */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="p-2 bg-panel-2 rounded-lg border border-panel-border text-accent group-hover:bg-accent group-hover:text-panel transition-all">
                    {dash.icon}
                  </div>
                  <div className="flex items-center gap-0.5 text-[9px] font-black text-accent uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                    Enter <ArrowRight size={9} />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-ink uppercase tracking-wide leading-tight">
                    {dash.title}
                  </h3>
                  <p className="text-[9px] font-bold text-ink-soft uppercase tracking-widest leading-none">
                    {dash.subtitle}
                  </p>
                </div>

                <p className="text-[11px] text-ink-soft font-light leading-relaxed">
                  {dash.description}
                </p>
              </div>

              {/* KPI Preview Bar */}
              <div className="bg-panel-2/50 border border-panel-border rounded-xl p-2.5 mt-4">
                <span className="text-[8px] font-bold text-ink-soft uppercase tracking-widest block mb-1.5 leading-none">
                  KPI Preview
                </span>
                <div className="grid grid-cols-3 gap-1 text-center">
                  {dash.kpiPreview.map((kpi, kIdx) => (
                    <div key={kIdx} className="space-y-0.5">
                      <span className="text-[8px] text-ink-soft block truncate leading-none uppercase">
                        {kpi.label}
                      </span>
                      <span className={`text-[11px] font-black tracking-tight block leading-none ${
                        kpi.status === 'red' ? 'text-rag-red' : kpi.status === 'amber' ? 'text-rag-amber' : 'text-rag-green'
                      }`}>
                        {kpi.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
