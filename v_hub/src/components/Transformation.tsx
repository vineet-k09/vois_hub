import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, Banknote, User2, ChevronRight } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

const Transformation: React.FC<{ onDrillDown: (data: any) => void }> = ({ onDrillDown }) => {
  const req06 = dashboardData.sections.find(s => s.id === "REQ 06");
  if (!req06) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b border-panel-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onDrillDown({ label: 'Transformation Tracking', requirementId: 6, type: 'requirement' })}
              className="bg-ink text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest hover:bg-grad-1 transition-colors cursor-help"
            >
              {req06.id}
            </button>
            <h2 className="font-barlow text-2xl font-bold text-ink uppercase tracking-wide">
              {req06.title.split('—')[0]}
            </h2>
          </div>
          <p className="text-muted-text text-[11px] italic leading-none pl-12">
            {req06.note}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-white bg-grad-3 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            Horizon 2 Feed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {req06.roadmap?.map((item: any) => (
          <motion.div 
            key={item.name}
            whileHover={{ translateY: -4 }}
            className="bg-white border border-panel-border rounded-2xl p-5 shadow-sm space-y-4 cursor-pointer relative overflow-hidden group"
            onClick={() => onDrillDown({ ...item, type: 'transformation' })}
          >
            {/* Urgency Glow */}
            {item.rag === 'amber' && (
              <div className="absolute top-0 left-0 w-full h-1 bg-rag-amber/30" />
            )}

            <div className="flex justify-between items-start">
              <h4 className="text-[14px] font-bold text-ink leading-tight">{item.name}</h4>
              <div className={`w-2 h-2 rounded-full ${
                item.rag === 'green' ? 'bg-rag-green' : 'bg-rag-amber'
              }`} />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-muted-text uppercase tracking-tighter">Completion</span>
                <span className={`font-barlow text-xl font-black ${
                  item.rag === 'green' ? 'text-rag-green' : 'text-rag-amber'
                }`}>{item.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${
                    item.rag === 'green' ? 'bg-rag-green' : 'bg-gradient-to-r from-rag-amber to-grad-3'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-50">
              <div className="flex items-center gap-2 text-[10px] text-ink-soft">
                <Milestone size={12} className="opacity-40" />
                <span className="font-medium">{item.meta.split('·')[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-ink-soft">
                <Banknote size={12} className="opacity-40" />
                <span className="font-medium text-grad-3">{item.meta.split('·')[1]}</span>
              </div>
              {item.meta.split('·')[2] && (
                <div className="flex items-center gap-2 text-[10px] text-muted-text">
                  <User2 size={12} className="opacity-40" />
                  <span className="italic">{item.meta.split('·')[2]}</span>
                </div>
              )}
            </div>

            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={14} className="text-accent-brand" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Transformation;
