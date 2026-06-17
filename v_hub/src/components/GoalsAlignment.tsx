import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

const GoalsAlignment: React.FC<{ onDrillDown: (data: any) => void }> = ({ onDrillDown }) => {
  const req07 = dashboardData.sections.find(s => s.id === "REQ 07");
  if (!req07) return null;

  const getGoalIcon = (rag: string) => {
    switch (rag) {
      case 'green': return <CheckCircle2 className="text-rag-green" size={18} />;
      case 'amber': return <Clock className="text-rag-amber" size={18} />;
      case 'red': return <AlertTriangle className="text-rag-red" size={18} />;
      default: return <Clock className="text-rag-tbd" size={18} />;
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b border-panel-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onDrillDown({ label: 'FY27 Goals Alignment', requirementId: 7, type: 'requirement' })}
              className="bg-ink text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest hover:bg-grad-1 transition-colors cursor-help"
            >
              {req07.id}
            </button>
            <h2 className="font-barlow text-2xl font-bold text-ink uppercase tracking-wide">
              {req07.title.split('—')[0]}
            </h2>
          </div>
          <p className="text-muted-text text-[11px] italic leading-none pl-12">
            {req07.note}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {req07.goals?.map((goal: any) => (
          <motion.div 
            key={goal.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white border border-panel-border rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:shadow-md transition-all group"
            onClick={() => onDrillDown({ ...goal, type: 'goal', label: `Goal Alignment: ${goal.id}` })}
          >
            <div className="flex-shrink-0 mt-1">
              {getGoalIcon(goal.rag)}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-muted-text tracking-tighter uppercase">Goal #{goal.id}</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                  goal.rag === 'green' ? 'bg-rag-green/10 text-rag-green' : 
                  goal.rag === 'amber' ? 'bg-rag-amber/10 text-rag-amber' : 
                  'bg-rag-red/10 text-rag-red'
                }`}>
                  {goal.status}
                </span>
              </div>
              <h4 className="text-[13px] font-semibold text-ink leading-snug pr-4">
                {goal.text}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-accent-brand font-bold uppercase tracking-wider pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Linked Evidence: {goal.context} <ExternalLink size={10} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GoalsAlignment;
