import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Send, RefreshCw } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

const Hero: React.FC<{ onDrillDown: (data: any) => void }> = ({ onDrillDown }) => {
  const { hero, aiSummary, branding } = dashboardData;

  return (
    <header className="relative bg-white border-b border-panel-border overflow-hidden">
      {/* Background Gradient Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-panel/30 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col lg:flex-row gap-12 items-start relative z-10">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-accent-brand uppercase tracking-widest">
              <span>{branding.period}</span>
              <span className="w-1 h-1 rounded-full bg-panel-border" />
              <span>Refreshed daily</span>
            </div>
            <h1 className=" text-5xl font-light tracking-tight text-ink">
              {hero.title.replace('Summary', '')} <span className="font-semibold text-grad-2">{hero.accent}</span>
            </h1>
            <p className="text-ink-soft text-sm leading-relaxed max-w-2xl font-light">
              {hero.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-ink text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-grad-3 transition-colors shadow-sm">
              <FileText size={14} />
              Generate Board PDF
            </button>
            <button className="flex items-center gap-2 border border-panel-border text-ink-soft px-4 py-2 rounded-lg text-xs font-semibold hover:bg-panel transition-colors">
              <Send size={14} />
              Email Monthly Pack
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-[450px] bg-slate-50/80 backdrop-blur-sm border border-panel-border rounded-2xl p-6 shadow-sm relative overflow-hidden"
        >
          {/* AI Chip */}
          <div className="absolute top-0 right-0 p-1">
            <div className="bg-gradient-to-r from-grad-1 to-grad-3 text-[9px] font-black text-white px-2 py-0.5 rounded-bl-xl rounded-tr-xl flex items-center gap-1 uppercase tracking-tighter">
              <Sparkles size={10} />
              {aiSummary.badge}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-panel-border pb-3">
              <h3 className=" text-lg font-bold text-ink uppercase tracking-wider">{aiSummary.title}</h3>
              <button 
                onClick={() => onDrillDown({ label: 'AI Executive Summary', requirementId: 2, type: 'requirement' })}
                className="text-[10px] text-muted-text font-bold uppercase hover:text-grad-1 transition-colors cursor-help"
              >
                {aiSummary.requirement}
              </button>
            </div>
            
            <p className="text-ink text-[13px] leading-relaxed italic">
              "{aiSummary.overall}"
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-rag-green uppercase tracking-wide">Key Takeaways</span>
                <ul className="space-y-1.5">
                  {aiSummary.takeaways.map((item, i) => (
                    <li key={i} className="text-[11px] leading-tight text-ink-soft pl-2 border-l-2 border-rag-green/30">
                      {item.text.split(':')[0]}: <span className="text-ink font-medium">{item.text.split(':')[1]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-rag-amber uppercase tracking-wide">Watchpoints</span>
                <ul className="space-y-1.5">
                  {aiSummary.watchpoints.map((item, i) => (
                    <li key={i} className="text-[11px] leading-tight text-ink-soft pl-2 border-l-2 border-rag-amber/30">
                      {item.text.split(':')[0]}: <span className="text-ink font-medium">{item.text.split(':')[1]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <div className="flex -space-x-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full border border-white bg-panel flex items-center justify-center text-[8px] font-bold text-ink-soft uppercase tracking-tighter shadow-sm">
                    A{i}
                  </div>
                ))}
                <div className="w-5 h-5 rounded-full border border-white bg-white flex items-center justify-center text-[10px] font-bold text-accent-brand shadow-sm">
                  +
                </div>
              </div>
              <button className="text-[10px] font-bold text-accent-brand hover:underline flex items-center gap-1">
                <RefreshCw size={10} />
                Regenerate Insights
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
