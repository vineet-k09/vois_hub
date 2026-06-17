import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, ChevronRight, Tags, DollarSign } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

const Exceptions: React.FC<{ onDrillDown: (data: any) => void }> = ({ onDrillDown }) => {
  const req03 = dashboardData.sections.find(s => s.id === "REQ 03");
  if (!req03) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b border-panel-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onDrillDown({ label: 'Top-Line Growth', requirementId: 3, type: 'requirement' })}
              className="bg-ink text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest hover:bg-grad-1 transition-colors cursor-help"
            >
              {req03.id}
            </button>
            <h2 className="font-barlow text-2xl font-bold text-ink uppercase tracking-wide">
              {req03.title.split('—')[0]}
            </h2>
          </div>
          <p className="text-muted-text text-[11px] italic leading-none pl-12">
            {req03.note}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-ink-soft bg-panel-2 px-2 py-1 rounded uppercase tracking-tighter shadow-inner">
            SF + FINANCE FEED
          </span>
          <span className="text-[10px] font-bold text-white bg-rail px-2 py-1 rounded uppercase tracking-tighter shadow-sm">
            GEN-2
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {req03.exceptionGroups?.map((group, idx) => (
          <div key={group.title} className="space-y-4">
            <div className="flex items-center gap-2 text-ink-soft">
              {idx === 0 ? <TrendingUp size={16} /> : <AlertCircle size={16} />}
              <h5 className="text-[11px] font-bold uppercase tracking-widest leading-none pt-0.5">
                {group.title.replace('★ ', '')}
              </h5>
            </div>

            <div className="bg-white border border-panel-border rounded-2xl divide-y divide-panel-border/30 overflow-hidden shadow-sm">
              {group.items.map((item: any) => (
                <motion.div 
                  key={item.name}
                  whileHover={{ backgroundColor: 'rgb(248, 250, 252)' }}
                  className="group flex items-center justify-between p-4 cursor-pointer transition-colors"
                  onClick={() => onDrillDown({ ...item, type: 'exception' })}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                      item.rag === 'green' ? 'bg-rag-green' : item.rag === 'amber' ? 'bg-rag-amber' : 'bg-rag-red'
                    }`} />
                    <div className="space-y-0.5">
                      <span className="text-[13px] font-semibold text-ink leading-none">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-muted-text uppercase tracking-wide">
                        <Tags size={10} className="opacity-50" />
                        {item.meta}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-right">
                    <div className="flex flex-col">
                      <span className={`font-barlow text-lg font-bold leading-none ${
                        item.rag === 'red' ? 'text-rag-red' : 'text-ink'
                      }`}>
                        {item.value}
                      </span>
                      <span className="text-[9px] text-muted-text uppercase font-medium">Impact</span>
                    </div>
                    <ChevronRight size={14} className="text-panel-border group-hover:text-accent-brand transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {idx === 0 && (
              <div className="flex justify-center">
                <button className="text-[10px] font-bold text-accent-brand hover:underline uppercase tracking-widest flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                  View Full Top 10 List <ChevronRight size={10} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Exceptions;
