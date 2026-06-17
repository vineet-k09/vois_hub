import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import { ExternalLink } from 'lucide-react';
import AnnotationCard from './AnnotationCard';

interface GoalsAlignmentProps {
  onDrillDown: (data: any) => void;
}

const GoalsAlignment: React.FC<GoalsAlignmentProps> = ({ onDrillDown }) => {
  const req07 = dashboardData.sections.find(s => s.id === "REQ 07") as any;
  if (!req07) return null;

  const req07Anno = (dashboardData.annotations as any)["7"];

  const handleGoalClick = (goal: any) => {
    onDrillDown({
      ...goal,
      type: 'goal',
      label: `Goal Alignment: ${goal.id}`,
      requirementId: '7'
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #7">
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
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
            <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
              {req07.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-xs italic font-light mt-0.5">{req07.note}</p>
          </div>
        </div>

        {/* Goals Alignment Grid */}
        <div className="grid grid-cols-1 gap-2 pl-2">
          {req07.goals?.map((goal: any) => {
            const textRagColor = 
              goal.rag === 'green' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 
              goal.rag === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-100' : 
              goal.rag === 'red' ? 'text-rose-700 bg-rose-50 border-rose-100' : 'text-slate-650 bg-slate-50 border-slate-100';

            return (
              <div 
                key={goal.id} 
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/10 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer gap-4"
                onClick={() => handleGoalClick(goal)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-barlow text-sm font-black text-red-600 bg-red-50 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">
                    {goal.id}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-700 truncate leading-snug">{goal.text}</p>
                    <p className="text-[10px] text-slate-400 font-light truncate mt-0.5 flex items-center gap-1.5 leading-none">
                      Linked: <span className="font-medium text-slate-500">{goal.context}</span> <ExternalLink size={10} />
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

      {/* REQ 07 Annotation Card */}
      {req07Anno && (
        <AnnotationCard
          id="7"
          title={req07Anno.title}
          status={req07Anno.status}
          feedback={req07Anno.feedback}
          description={req07Anno.description}
          dependencies={req07Anno.dependencies}
          acceptanceCriteria={req07Anno.acceptanceCriteria}
          userStory={req07Anno.userStory}
        />
      )}
    </section>
  );
};

export default GoalsAlignment;
