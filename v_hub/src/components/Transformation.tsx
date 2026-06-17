import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import AnnotationCard from './AnnotationCard';

interface TransformationProps {
  onDrillDown: (data: any) => void;
}

const Transformation: React.FC<TransformationProps> = ({ onDrillDown }) => {
  const req06 = dashboardData.sections.find(s => s.id === "REQ 06") as any;
  if (!req06) return null;

  const req06Anno = (dashboardData.annotations as any)["6"];

  // Specifically parse and enrich program metadata for presentation
  const getProgramDetails = (name: string) => {
    switch (name) {
      case 'VOE Platform':
        return {
          owner: 'Operations (COO)',
          milestones: 'Milestone 4 of 6 complete',
          value: '€18M value realized',
          alignment: 'Goal 07 (Transformation)',
          risk: 'On track',
          dependency: 'Global rollout alignment'
        };
      case 'CSM Re-platform':
        return {
          owner: 'Technology (CIO)',
          milestones: 'Milestone 3 of 7 complete',
          value: '€6M value realized',
          alignment: 'Goal 07 (Transformation)',
          risk: 'Slipped 4w (Schedule constraint)',
          dependency: 'Resource allocation gate'
        };
      case 'Service-Data Lakehouse':
        return {
          owner: 'Data & AI Tower',
          milestones: 'Milestone 5 of 8 complete',
          value: '€11M value realized',
          alignment: 'Goal 07 (Transformation)',
          risk: 'On track',
          dependency: 'Data validation sign-off'
        };
      case 'AI Ops & Co-pilots':
      default:
        return {
          owner: 'Digital Solutions',
          milestones: 'Milestone 2 of 6 complete',
          value: '€3M value realized',
          alignment: 'Goal 07 (Transformation)',
          risk: 'Awaiting funding gate',
          dependency: 'Investment board sign-off'
        };
    }
  };

  const handleItemClick = (item: any) => {
    const details = getProgramDetails(item.name);
    onDrillDown({
      ...item,
      ...details,
      type: 'transformation',
      label: item.name,
      requirementId: '6'
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #6">
        6
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4 mb-6 pl-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                REQ 06 · transformation
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
            <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
              {req06.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-xs italic font-light mt-0.5">{req06.note}</p>
          </div>
          
          <span className="text-[9px] font-black text-red-650 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-red-100">
            HORIZON 2 FEED
          </span>
        </div>

        {/* Roadmap Items list with high density */}
        <div className="grid grid-cols-1 gap-3.5 pl-2">
          {req06.roadmap?.map((item: any) => {
            const parsed = getProgramDetails(item.name);
            const isGreen = item.rag === 'green';
            const ragColor = isGreen ? 'bg-emerald-500' : 'bg-amber-500';
            const barColor = isGreen ? 'bg-emerald-500' : 'bg-amber-500';

            return (
              <div 
                key={item.name} 
                className="group p-4 rounded-xl border border-slate-150 bg-slate-50/20 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4"
                onClick={() => handleItemClick(item)}
              >
                {/* Initiative Name & Owner */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-red-650 transition-colors">
                      {item.name}
                    </h4>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ragColor}`} />
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">
                    Owner: {parsed.owner}
                  </p>
                </div>

                {/* Milestones & Value */}
                <div className="w-44 shrink-0">
                  <p className="text-xs text-slate-700 font-semibold leading-none">
                    {parsed.milestones}
                  </p>
                  <p className="text-[10px] text-emerald-650 font-bold mt-1 leading-none">
                    {parsed.value}
                  </p>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="w-32 shrink-0">
                  <div className="flex justify-between items-baseline text-[9px] text-slate-400 mb-1 leading-none">
                    <span>Progress</span>
                    <span className="font-bold text-slate-750">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${barColor}`} 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Risks / Status & Alignment */}
                <div className="w-48 shrink-0 text-left md:text-right flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-1.5">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    isGreen 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-150' 
                      : 'bg-amber-50 text-amber-700 border-amber-150'
                  }`}>
                    {parsed.risk}
                  </span>
                  <p className="text-[9px] text-slate-400 truncate max-w-full">
                    {parsed.alignment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REQ 06 Annotation Card */}
      {req06Anno && (
        <AnnotationCard
          id="6"
          title={req06Anno.title}
          status={req06Anno.status}
          feedback={req06Anno.feedback}
          description={req06Anno.description}
          dependencies={req06Anno.dependencies}
          acceptanceCriteria={req06Anno.acceptanceCriteria}
          userStory={req06Anno.userStory}
        />
      )}
    </section>
  );
};

export default Transformation;
