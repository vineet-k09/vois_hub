import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import { ExternalLink } from 'lucide-react';

interface GoalsAlignmentProps {
  onDrillDown: (data: any) => void;
  onSelectReq?: (id: string) => void;
}

const GoalsAlignment: React.FC<GoalsAlignmentProps> = ({ onDrillDown, onSelectReq }) => {
  const req07 = dashboardData.sections.find(s => s.id === "REQ 07") as any;
  if (!req07) return null;

  const handleGoalClick = (goal: any) => {
    onDrillDown({
      ...goal,
      type: 'goal',
      label: `Goal Alignment: ${goal.id}`
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
      {/* Visual Accent Rail */}
      <div className="absolute top-0 left-0 w-2 h-full bg-[#c40089]" />

      {/* Requirement Pin */}
      <div 
        className="req-pin cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (onSelectReq) onSelectReq('7');
        }}
        title="Requirement #7: FY27 Goals Alignment"
      >
        7
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4 mb-6 pl-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                REQ 07 · GOALS EVIDENCE MAP
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c40089]" />
            </div>
            <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
              {req07.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-xs italic font-light mt-0.5">{req07.note}</p>
          </div>
        </div>

        {/* Goals Alignment Grid (wrapping text, no truncation!) */}
        <div className="grid grid-cols-1 gap-2 pl-2">
          {req07.goals?.map((goal: any) => {
            const textRagColor = 
              goal.rag === 'green' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 
              goal.rag === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-100' : 
              goal.rag === 'red' ? 'text-red-700 bg-red-50 border-red-100' : 'text-slate-600 bg-slate-50 border-slate-100';

            return (
              <div 
                key={goal.id} 
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/10 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer gap-4"
                onClick={() => handleGoalClick(goal)}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="font-barlow text-sm font-black text-[#c40089] bg-[#c40089]/5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    {goal.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-700 leading-snug whitespace-normal break-words">
                      {goal.text}
                    </p>
                    <p className="text-[10px] text-slate-400 font-light mt-1 flex items-center gap-1 leading-none">
                      Linked: <span className="font-medium text-slate-505">{goal.context}</span> <ExternalLink size={10} />
                    </p>
                  </div>
                </div>
                
                <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${textRagColor}`}>
                  {goal.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GoalsAlignment;
