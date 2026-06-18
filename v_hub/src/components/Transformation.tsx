import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import AnnotationCard from './AnnotationCard';

interface TransformationProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

const Transformation: React.FC<TransformationProps> = ({ onDrillDown, showAnnotations }) => {
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
    <section id="section-transformation" className="bg-white border border-slate-200/70 rounded-2xl p-4.5 shadow-sm relative 
    overflow-hidden flex flex-col justify-between h-full">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #6">
        6
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                  REQ 06 · transformation
                </span>
              )}
              {/* <span className="w-1.5 h-1.5 rounded-full bg-red-600" /> */}
            </div>
            <h2 className="text-base  font-bold text-slate-800 uppercase tracking-wide mt-0.5">
              {req06.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-[10px] italic font-light mt-0.5">{req06.note}</p>
          </div>
          
          <span className="text-[9px] font-black text-red-650 bg-red-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-red-100 leading-none">
            HORIZON 2 FEED
          </span>
        </div>

        {/* Roadmap Items list with high density */}
        <div className="grid grid-cols-1 gap-2.5 pl-1">
          {req06.roadmap?.map((item: any) => {
            const parsed = getProgramDetails(item.name);
            const isRed = item.rag === 'red';
            const isAmber = item.rag === 'amber';
            const isGreen = item.rag === 'green';

            const barColor = isGreen ? 'bg-emerald-500' : isAmber ? 'bg-amber-500' : 'bg-rose-500';

            // Importance scaling based on RAG - showing prominence via footprint
            const containerSizeClass = isRed ? 'py-4.5 px-4 shadow-xs' : isAmber ? 'py-3.5 px-3.5' : 'py-3 px-3';
            const nameFontClass = isRed ? 'text-sm' : 'text-[13px]';
            const ownerFontClass = isRed ? 'text-[11px]' : 'text-[10.5px]';

            // Theme styling consistent with KPIGrid.tsx
            let cardStyleClass = '';
            if (isRed) {
              cardStyleClass = 'bg-red-50/30 border-red-200 hover:bg-red-50/50 ring-1 ring-red-500/5';
            } else if (isAmber) {
              cardStyleClass = 'bg-amber-50/30 border-amber-200 hover:bg-amber-50/50 ring-1 ring-amber-500/5';
            } else {
              cardStyleClass = 'bg-slate-50/20 border-slate-150 hover:bg-slate-50 hover:border-slate-200';
            }

            return (
              <div 
                key={item.name} 
                className={`group rounded-xl border transition-all cursor-pointer flex flex-col gap-3 lg:grid lg:grid-cols-[1fr_320px] lg:items-center lg:gap-x-6 lg:gap-y-1.5 ${cardStyleClass} ${containerSizeClass}`}
                onClick={() => handleItemClick(item)}
              >
                {/* 1. Initiative Name */}
                <div className="lg:col-start-1 lg:row-start-1 min-w-0 flex items-center gap-1.5">
                  {isRed && (
                    <span className="flex h-1.5 w-1.5 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                    </span>
                  )}
                  <h4 className={`${nameFontClass} font-bold text-slate-900 group-hover:text-red-655 transition-colors truncate`}>
                    {item.name}
                  </h4>
                </div>

                {/* 2. Progress and stuff (Milestones, Progress Bar, Status/Risk) */}
                <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col gap-2 w-full min-w-0">
                  {/* Row 1: Milestones & Progress */}
                  <div className="flex justify-between items-center gap-3 text-xs leading-none">
                    <span className="font-semibold text-slate-700 truncate">{parsed.milestones}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-400">Progress</span>
                      <span className="font-bold text-slate-750 text-[11px]">{item.progress}%</span>
                      <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${barColor}`} 
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Value, Risk, and Alignment */}
                  <div className="flex justify-between items-center gap-3 leading-none">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] text-emerald-650 font-bold shrink-0">{parsed.value}</span>
                      <span className="text-[8.5px] text-slate-400 truncate hidden sm:inline">• {parsed.alignment}</span>
                    </div>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                      isGreen
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-150'
                        : isAmber
                          ? 'bg-amber-50 text-amber-700 border-amber-150'
                          : 'bg-red-50 text-red-700 border-red-150'
                    }`}>
                      {parsed.risk}
                    </span>
                  </div>
                </div>

                {/* 3. Owner */}
                <div className="lg:col-start-1 lg:row-start-2 min-w-0 mt-0.5 lg:mt-0">
                  <p className={`${ownerFontClass} text-slate-500 font-medium tracking-wide leading-none`}>
                    Owner: <span className="font-semibold text-slate-700">{parsed.owner}</span>
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
