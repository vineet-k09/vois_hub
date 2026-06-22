import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Home, Crown, DollarSign, TrendingUp, Users, GitCompare, ChevronRight } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
  onNavigateToView: (view: 'ceo' | 'finance' | 'gtm' | 'hr' | 'compare') => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackToHome, onNavigateToView }) => {
  const suggestedPortals = [
    {
      id: 'ceo' as const,
      name: 'CEO Strategic Portal',
      description: 'Strategic exception lens across all core pillars.',
      icon: <Crown className="w-4 h-4 text-red-500" />,
    },
    {
      id: 'finance' as const,
      name: 'Finance Portfolio Portal',
      description: 'Sarah\'s risk forecasts and revenue lifecycles.',
      icon: <DollarSign className="w-4 h-4 text-amber-500" />,
    },
    {
      id: 'gtm' as const,
      name: 'GTM Commercial Portal',
      description: 'Chris\'s GTM delivery risks and pipelines.',
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: 'hr' as const,
      name: 'HR Strategic Portal',
      description: 'Sima\'s people metrics and Spirit Beat drivers.',
      icon: <Users className="w-4 h-4 text-sky-500" />,
    },
    {
      id: 'compare' as const,
      name: 'Cross-Tower Benchmarking',
      description: 'Side-by-side comparative analysis of towers.',
      icon: <GitCompare className="w-4 h-4 text-rose-500" />,
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 w-full text-center font-inter max-w-4xl mx-auto">
      {/* 404 Visual Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-header-gradient opacity-20 blur-3xl rounded-full w-64 h-64 mx-auto -z-10 animate-pulse" />
        <h1 className="text-8xl md:text-9xl font-extrabold font-barlow tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-purple-600 select-none">
          404
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2 text-ink-soft font-semibold tracking-wide uppercase text-xs md:text-sm">
          <Compass className="w-4 h-4 text-accent animate-spin-slow" />
          <span>Page Not Found</span>
        </div>
      </motion.div>

      {/* Main Narrative Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full bg-panel border border-panel-border rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl"
      >
        <h2 className="text-xl md:text-2xl font-bold font-barlow text-ink mb-3 uppercase">
          Requested Executive view is unavailable
        </h2>
        <p className="text-ink-soft text-sm md:text-base leading-relaxed mb-6">
          The dashboard route you requested either does not exist or has been relocated to another workspace portal. Please use the directory below to redirect your session.
        </p>

        {/* Directory / Recommended views */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-6">
          {suggestedPortals.map((portal) => (
            <motion.div
              key={portal.id}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onNavigateToView(portal.id)}
              className="group p-3 bg-panel-2 border border-panel-border rounded-xl cursor-pointer hover:border-accent/40 transition-all flex items-start gap-3"
            >
              <div className="p-2 bg-panel border border-panel-border rounded-lg group-hover:bg-accent/5 transition-colors shrink-0">
                {portal.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink text-xs md:text-sm group-hover:text-accent transition-colors truncate">
                    {portal.name}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-text opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-[11px] text-ink-soft leading-snug mt-0.5 truncate">
                  {portal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Reset Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-panel-border pt-6">
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-header-gradient text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:opacity-95 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
