import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import Tooltip from './Tooltip';

interface TransformationProps {
  onDrillDown: (data: any) => void;
}

const Transformation: React.FC<TransformationProps> = ({ onDrillDown }) => {
  const req06 = dashboardData.sections.find(s => s.id === "REQ 06") as any;
  if (!req06) return null;

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
    <section id="section-transformation" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative 
    overflow-hidden flex flex-col justify-between h-full">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #6">
        6
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              {req06.title.split('—')[0]}
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">{req06.note}</p>
          </div>
          
          <span className="text-[9px] font-black text-accent bg-accent/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-accent/20 leading-none">
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
              cardStyleClass = 'bg-rag-red/10 border-rag-red/20 hover:bg-rag-red/15 text-ink ring-1 ring-rag-red/5';
            } else if (isAmber) {
              cardStyleClass = 'bg-rag-amber/10 border-rag-amber/20 hover:bg-rag-amber/15 text-ink ring-1 ring-rag-amber/5';
            } else {
              cardStyleClass = 'bg-panel-2/30 border-panel-border hover:bg-panel-2 hover:border-accent/40 text-ink';
            }

            const getProgramTooltip = (name: string, prog: number, details: any) => {
              return `${name} (${prog}% complete): Managed by ${details.owner}. Value outcome: ${details.value}. Risk profile: ${details.risk}. Primary dependency: ${details.dependency}. Click for drilldown detail.`;
            };

            return (
              <Tooltip key={item.name} content={getProgramTooltip(item.name, item.progress, parsed)} position="top">
                <div 
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
                    <h4 className={`${nameFontClass} font-bold text-ink group-hover:text-accent transition-colors `}>
                      {item.name}
                    </h4>
                  </div>

                  {/* 2. Progress and stuff (Milestones, Progress Bar, Status/Risk) */}
                  <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col gap-2 w-full min-w-0">
                    {/* Row 1: Milestones & Progress */}
                    <div className="flex justify-between items-center gap-3 text-xs leading-none">
                      <span className="font-semibold text-ink truncate">{parsed.milestones}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-ink-soft">Progress</span>
                        <span className="font-bold text-ink text-[11px]">{item.progress}%</span>
                        <div className="w-12 h-1 bg-panel rounded-full overflow-hidden">
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
                        <span className="text-[10px] text-rag-green font-bold shrink-0">{parsed.value}</span>
                        <span className="text-[8.5px] text-ink-soft truncate hidden sm:inline">• {parsed.alignment}</span>
                      </div>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                        isGreen
                          ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                          : isAmber
                            ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                            : 'bg-red-500/20 text-red-500 border-red-500/30'
                      }`}>
                        {parsed.risk}
                      </span>
                    </div>
                  </div>

                  {/* 3. Owner */}
                  <div className="lg:col-start-1 lg:row-start-2 min-w-0 mt-0.5 lg:mt-0">
                    <p className={`${ownerFontClass} text-ink-soft font-medium tracking-wide leading-none`}>
                      Owner: <span className="font-semibold text-ink">{parsed.owner}</span>
                    </p>
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default Transformation;
