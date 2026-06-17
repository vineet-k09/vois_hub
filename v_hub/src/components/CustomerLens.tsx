import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldAlert, Zap, MousePointer2 } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

const CustomerLens: React.FC<{ onDrillDown: (data: any) => void }> = ({ onDrillDown }) => {
  const req04 = dashboardData.sections.find(s => s.id === "REQ 04");
  if (!req04) return null;

  const { customerDetail }: any = req04;

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b border-panel-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onDrillDown({ label: 'Customer Performance', requirementId: 4, type: 'requirement' })}
              className="bg-ink text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest hover:bg-grad-1 transition-colors cursor-help"
            >
              {req04.id}
            </button>
            <h2 className="font-barlow text-2xl font-bold text-ink uppercase tracking-wide">
              {req04.title.split('—')[0]}
            </h2>
          </div>
          <p className="text-muted-text text-[11px] italic leading-none pl-12">
            {req04.note}
          </p>
        </div>
      </div>

      <motion.div 
        whileHover={{ scale: 1.005 }}
        className="bg-white border border-panel-border rounded-3xl p-8 shadow-sm relative overflow-hidden group cursor-pointer"
        onClick={() => onDrillDown({ ...customerDetail, type: 'customer', label: `Customer Lens: ${customerDetail.name}` })}
      >
        {/* Selection Indicator */}
        <div className="absolute top-0 left-0 h-full w-2 bg-grad-2" />
        
        <div className="flex flex-col lg:flex-row gap-12 relative z-10">
          {/* Left: Customer Profile */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-muted-text uppercase tracking-widest block mb-1">Selected Account</span>
              <h3 className="text-3xl font-barlow font-bold text-ink leading-none">{customerDetail.name}</h3>
              <div className="mt-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-ink-soft">
                  <UserCheck size={14} className="text-grad-2" />
                  <span className="font-medium">Lead: {customerDetail.lead}</span>
                </div>
                <div className="text-[10px] text-muted-text uppercase tracking-tighter pl-5">
                  Last Refresh: {customerDetail.lastRefresh}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-ink uppercase tracking-widest block border-b border-slate-100 pb-2">Engagement Narrative</span>
              <p className="text-[12px] text-ink leading-relaxed italic">
                "{customerDetail.mmdNarrative.leadNarrative}"
              </p>
            </div>
          </div>

          {/* Center: Internal Performance */}
          <div className="flex-1 space-y-6">
            <span className="text-[10px] font-bold text-ink uppercase tracking-widest block border-b border-slate-100 pb-2">Internal Performance Metrics</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {customerDetail.internalPerformance.map((item: any) => (
                <div key={item.label} className="space-y-1">
                  <span className="text-[11px] text-muted-text font-medium">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-barlow text-2xl font-bold ${
                      item.rag === 'green' ? 'text-rag-green' : 'text-rag-amber'
                    }`}>{item.value}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item.rag === 'green' ? 'bg-rag-green' : 'bg-rag-amber'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-panel-border/30">
              <span className="text-[10px] font-bold text-rag-red uppercase tracking-widest flex items-center gap-2 mb-3">
                <ShieldAlert size={12} />
                Critical Problem Jobs
              </span>
              <ul className="flex flex-wrap gap-2">
                {customerDetail.mmdNarrative.problemJobs.map((job: string, i: number) => (
                  <li key={i} className="bg-white border border-panel-border/50 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-ink-soft shadow-sm">
                    {job}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Wallet Share */}
          <div className="w-full lg:w-1/4 space-y-6 bg-panel/20 p-6 rounded-2xl border border-panel-border/50">
            <span className="text-[10px] font-bold text-ink uppercase tracking-widest block border-b border-panel-border/50 pb-2">Share of Wallet</span>
            <div className="space-y-4">
              {customerDetail.externalSpend.map((item: any) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-[11px] text-ink-soft">{item.label}</span>
                  <span className="font-barlow text-xl font-bold text-ink">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t border-panel-border/50 text-center">
              <button className="text-[10px] font-bold text-accent-brand uppercase tracking-[2px] flex items-center gap-2 justify-center w-full group-hover:scale-105 transition-transform">
                <Zap size={12} />
                Generate CEO Connect Brief
              </button>
            </div>
          </div>
        </div>

        {/* Hover Instruction */}
        <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-40 transition-opacity flex items-center gap-2 text-[10px] font-bold text-ink uppercase tracking-widest">
          Click for Customer 360 <MousePointer2 size={12} />
        </div>
      </motion.div>
    </section>
  );
};

export default CustomerLens;
