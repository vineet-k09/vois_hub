import React from 'react';
import { motion } from 'framer-motion';
import { Crown, DollarSign, TrendingUp, Users, ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onSelectView: (view: 'ceo' | 'finance' | 'gtm' | 'hr') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectView }) => {
  const dashboards = [
    {
      id: 'ceo' as const,
      title: 'CEO Strategic Dashboard',
      subtitle: 'Gary\'s Exception-Based View',
      description: 'Strategic, high-level exception lens across VOIS pillars. Integrates growth, customer performance, cost, and talent.',
      icon: <Crown className="w-6 h-6" />,
      kpiPreview: [
        { label: 'EBITDA', val: '-€36.33M', status: 'red' },
        { label: 'Cost Takeout', val: '€141.6M', status: 'amber' },
        { label: 'Spirit Beat', val: '85', status: 'green' }
      ]
    },
    {
      id: 'finance' as const,
      title: 'Finance Director Dashboard',
      subtitle: 'Sarah\'s Risk & Forecast Lens',
      description: 'Cross-functional risk signals (HR, pipeline, contract lifecycle) that move OpsAnalytics, CapEx, and Revenue forecasts.',
      icon: <DollarSign className="w-6 h-6" />,
      kpiPreview: [
        { label: 'Revenue at Risk', val: '€186.4M', status: 'red' },
        { label: 'CapEx Burn vs Plan', val: '134% / 81%', status: 'red' },
        { label: 'P×Q Revenue', val: '1074%', status: 'green' }
      ]
    },
    {
      id: 'gtm' as const,
      title: 'GTM Director Dashboard',
      subtitle: 'Chris\'s Commercial & Delivery Lens',
      description: 'Pipeline funnel tracking, recognized revenue vs targets, top-10 delivery risks, and share of wallet vs competitors.',
      icon: <TrendingUp className="w-6 h-6" />,
      kpiPreview: [
        { label: 'Qual. Pipeline', val: '€1,359M', status: 'green' },
        { label: 'Win Conv.', val: '62%', status: 'green' },
        { label: 'Delivery Risk', val: '3 Red / 4 Amber', status: 'red' }
      ]
    },
    {
      id: 'hr' as const,
      title: 'HR Director Dashboard',
      subtitle: 'Sima\'s People Correlation Lens',
      description: 'Spirit Beat drivers, top-talent promotion glide path, attrition hotspots, and L&D effectiveness mapped to outcomes.',
      icon: <Users className="w-6 h-6" />,
      kpiPreview: [
        { label: 'Talent Promotions', val: '24.6%', status: 'green' },
        { label: 'Spirit Beat', val: '85', status: 'green' },
        { label: 'L&D Adoption', val: '80%', status: 'amber' }
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 max-w-7xl mx-auto w-full">
      {/* Welcome Header */}
      <div className="text-center max-w-2xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-[10px] font-black uppercase text-accent tracking-widest leading-none">
          <Sparkles size={11} className="animate-pulse animate-duration-3000" /> Unified Executive Suite
        </div>
        <h1 className="text-3xl md:text-4xl font-barlow font-bold text-ink uppercase tracking-wide leading-tight">
          VOIS HUB PORTAL
        </h1>
        <p className="text-sm text-ink-soft font-light leading-relaxed">
          Select an executive persona view below to explore core KPIs, AI-synthesized risk analysis, cross-functional dependencies, and strategic briefs.
        </p>
      </div>

      {/* Grid of Dashboards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {dashboards.map((dash, index) => (
          <motion.div
            key={dash.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onSelectView(dash.id)}
            className="group cursor-pointer bg-panel border border-panel-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-accent/40 transition-all flex flex-col justify-between h-full relative overflow-hidden"
          >
            {/* Top row */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-panel-2 rounded-xl border border-panel-border text-accent group-hover:bg-accent group-hover:text-panel transition-all">
                  {dash.icon}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-widest leading-none group-hover:translate-x-1 transition-transform">
                  Enter View <ArrowRight size={10} />
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <h3 className="text-lg font-bold text-ink uppercase tracking-wide leading-snug">
                  {dash.title}
                </h3>
                <p className="text-[10px] font-bold text-ink-soft uppercase tracking-widest leading-none">
                  {dash.subtitle}
                </p>
              </div>

              <p className="text-xs text-ink-soft font-light leading-relaxed mb-6">
                {dash.description}
              </p>
            </div>

            {/* KPI Preview Bar */}
            <div className="bg-panel-2/50 border border-panel-border rounded-xl p-3.5 mt-auto">
              <span className="text-[8px] font-bold text-ink-soft uppercase tracking-widest block mb-2 leading-none">
                KPI Preview
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                {dash.kpiPreview.map((kpi, kIdx) => (
                  <div key={kIdx} className="space-y-1">
                    <span className="text-[9px] text-ink-soft block truncate leading-none uppercase">
                      {kpi.label}
                    </span>
                    <span className={`text-sm font-black tracking-tight block leading-none ${
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
