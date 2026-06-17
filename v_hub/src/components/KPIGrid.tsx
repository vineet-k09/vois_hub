import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Info, ExternalLink } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

interface KPICardProps {
  kpi: any;
  clusterName: string;
  onDrillDown: (data: any) => void;
}

const KPICard: React.FC<KPICardProps> = ({ kpi, clusterName, onDrillDown }) => {
  const isUrgent = kpi.rag === 'red' || kpi.rag === 'amber';
  
  const ragStyles: Record<string, string> = {
    green: 'border-rag-green/20 bg-rag-green/[0.02] text-rag-green',
    amber: 'border-rag-amber/20 bg-rag-amber/[0.02] text-rag-amber',
    red: 'border-rag-red/20 bg-rag-red/[0.02] text-rag-red',
    tbd: 'border-rag-tbd/20 bg-rag-tbd/[0.02] text-rag-tbd',
  };

  const ragDots: Record<string, string> = {
    green: 'bg-rag-green shadow-[0_0_8px_rgba(10,138,58,0.4)]',
    amber: 'bg-rag-amber shadow-[0_0_8px_rgba(224,138,0,0.4)]',
    red: 'bg-rag-red shadow-[0_0_8px_rgba(204,31,31,0.4)]',
    tbd: 'bg-rag-tbd shadow-[0_0_8px_rgba(122,107,122,0.4)]',
  };

  return (
    <motion.div 
      layout
      whileHover={{ scale: 1.01, translateY: -2 }}
      className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isUrgent 
          ? 'bg-white shadow-md border-panel-border z-10' 
          : 'bg-white/50 border-panel-border/50 hover:bg-white hover:shadow-sm'
      }`}
      onClick={() => onDrillDown({ ...kpi, clusterName })}
    >
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-16 h-16 opacity-5 transition-transform group-hover:scale-110 ${ragStyles[kpi.rag]}`}>
        <Info className="w-full h-full -rotate-12 translate-x-4 -translate-y-4" />
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-muted-text uppercase tracking-widest leading-none">
            {clusterName}
          </span>
          <h4 className="text-[13px] font-semibold text-ink leading-tight">
            {kpi.label}
          </h4>
        </div>
        <div className={`w-2 h-2 rounded-full ${ragDots[kpi.rag]}`} />
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`font-barlow text-4xl font-bold tracking-tight ${
          isUrgent ? 'text-ink' : 'text-ink/80'
        }`}>
          {kpi.value}
        </span>
        {kpi.trend && (
          <span className={`flex items-center text-[11px] font-bold ${
            kpi.trend.includes('▲') ? 'text-rag-green' : 'text-rag-red'
          }`}>
            {kpi.trend.includes('▲') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {kpi.trend.replace(/[▲▼]/g, '').trim()}
          </span>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-panel-border/50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-text font-medium italic">Target: {kpi.target}</span>
          <span className="text-[9px] text-muted-text uppercase tracking-tighter opacity-60">{kpi.month}</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-bold text-accent-brand uppercase tracking-wider">
          Explore <ExternalLink size={10} />
        </div>
      </div>
    </motion.div>
  );
};

const KPIGrid: React.FC<{ onDrillDown: (data: any) => void }> = ({ onDrillDown }) => {
  const req01 = dashboardData.sections.find(s => s.id === "REQ 01");
  
  if (!req01) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b border-panel-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onDrillDown({ label: 'Top-Line Performance', requirementId: 1, type: 'requirement' })}
              className="bg-ink text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest hover:bg-grad-1 transition-colors cursor-help"
            >
              {req01.id}
            </button>
            <h2 className="font-barlow text-2xl font-bold text-ink uppercase tracking-wide">
              {req01.title.split('—')[0]}
            </h2>
          </div>
          <p className="text-muted-text text-[11px] italic leading-none pl-12">
            {req01.note}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-min">
        {req01.clusters?.map((cluster) => (
          <React.Fragment key={cluster.name}>
            {cluster.kpis.map((kpi: any) => (
              <div 
                key={kpi.label} 
                className={`${
                  kpi.rag === 'red' || kpi.label.includes('Revenue')
                    ? 'md:col-span-2' 
                    : 'col-span-1'
                }`}
              >
                <KPICard 
                  kpi={kpi} 
                  clusterName={cluster.name} 
                  onDrillDown={onDrillDown}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default KPIGrid;
