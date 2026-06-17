import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import { ExternalLink } from 'lucide-react';
import AnnotationCard from './AnnotationCard';

interface GoalsAlignmentProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

const GoalsAlignment: React.FC<GoalsAlignmentProps> = ({ onDrillDown, showAnnotations }) => {
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
    <section className="bg-white border border-slate-200/70 rounded-2xl p-4.5 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #7">
        7
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                  REQ 07 · GOALS EVIDENCE MAP
                </span>
              )}
              {/* <span className="w-1.5 h-1.5 rounded-full bg-red-600" /> */}
            </div>
            <h2 className="text-base font-barlow font-bold text-slate-800 uppercase tracking-wide mt-0.5">
              {req07.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-[10px] italic font-light mt-0.5">{req07.note}</p>
          </div>
        </div>

        {/* Goals Alignment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-1">
          {req07.goals?.map((goal: any) => {
            const textRagColor = 
              goal.rag === 'green' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 
              goal.rag === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-100' : 
              goal.rag === 'red' ? 'text-rose-700 bg-rose-50 border-rose-100' : 'text-slate-650 bg-slate-50 border-slate-100';

            return (
              <div 
                key={goal.id} 
                className="group flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50/10 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer gap-3"
                onClick={() => handleGoalClick(goal)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-barlow text-[11px] font-black text-red-600 bg-red-50 w-5 h-5 rounded flex items-center justify-center shrink-0">
                    {goal.id}
                  </span>
                  <div className="truncate">
                    <p className="text-[11px] font-semibold text-slate-700 truncate leading-snug">{goal.text}</p>
                    <p className="text-[9px] text-slate-400 font-light truncate mt-0.5 flex items-center gap-1 leading-none">
                      Linked: <span className="font-medium text-slate-505">{goal.context}</span> <ExternalLink size={8} />
                    </p>
                  </div>
                </div>
                
                <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0 leading-none ${textRagColor}`}>
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
