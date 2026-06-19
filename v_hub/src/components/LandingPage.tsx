import React from 'react';
import { motion } from 'framer-motion';
import { Crown, DollarSign, TrendingUp, Users, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onSelectView: (view: 'ceo' | 'finance' | 'gtm' | 'hr') => void;
  onSelectStory: (view: 'ceo' | 'finance' | 'gtm' | 'hr' | 'compare', cardId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectView, onSelectStory }) => {
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

  return (
    <div className="flex-1 flex flex-col justify-start items-center py-6 px-4 max-w-7xl mx-auto w-full space-y-6">
      {/* Welcome Header */}
      <div className="text-center max-w-2xl space-y-2 mb-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-[9px] font-black uppercase text-accent tracking-widest leading-none">
          <Sparkles size={10} className="animate-pulse animate-duration-3000" /> Unified Executive Suite
        </div>
        <h1 className="text-2xl md:text-3xl font-barlow font-bold text-ink uppercase tracking-wide leading-tight">
          VOIS HUB PORTAL
        </h1>
        <p className="text-xs text-ink-soft font-light leading-relaxed">
          Select an executive persona view or click a strategic user story shortcut below to jump directly to specific target cards with focused visual highlights.
        </p>
      </div>

      {/* STRATEGIC USER STORIES BUTTON LIST */}
      <div className="w-full space-y-2 max-w-5xl">
        <span className="text-[9px] font-black text-accent uppercase tracking-widest block pl-1">
          Executive Insights & User Story Shortcuts (Click to Navigate)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          {userStories.map((story, sIdx) => (
            <button
              key={sIdx}
              onClick={() => onSelectStory(story.view, story.cardId)}
              className="text-left bg-panel border border-panel-border rounded-xl p-2.5 hover:bg-accent/5 hover:border-accent/40 transition-all flex items-start gap-1.5 cursor-pointer leading-tight group focus:outline-none shadow-xs"
            >
              <ChevronRight size={12} className="text-accent shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-[10px] font-semibold text-ink-soft group-hover:text-ink leading-snug">
                {story.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Dashboards - Fits on one line on desktop via lg:grid-cols-4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
  );
};
