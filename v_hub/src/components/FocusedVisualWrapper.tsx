import React from 'react';
import KPIGrid from './KPIGrid';
import Transformation from './Transformation';
import GoalsAlignment from './GoalsAlignment';
import Exceptions from './Exceptions';
import CustomerLens from './CustomerLens';
import { FinanceDashboard } from './FinanceDashboard';
import { GTMDashboard } from './GTMDashboard';
import { HRDashboard } from './HRDashboard';
import dashboardData from '../data/dashboard_data.json';
import Tooltip from './Tooltip';
import { Sparkles } from 'lucide-react';

interface FocusedVisualWrapperProps {
  visualId: string;
  onDrillDown: (data: any) => void;
}

export const FocusedVisualWrapper: React.FC<FocusedVisualWrapperProps> = ({ visualId, onDrillDown }) => {
  // CEO special sections
  if (visualId === 'ceo-kpis') {
    return <KPIGrid onDrillDown={onDrillDown}  />;
  }
  if (visualId === 'ceo-transformation') {
    return <Transformation onDrillDown={onDrillDown}  />;
  }
  if (visualId === 'ceo-goals') {
    return <GoalsAlignment onDrillDown={onDrillDown}  />;
  }
  if (visualId === 'ceo-exceptions') {
    return <Exceptions onDrillDown={onDrillDown}  />;
  }
  if (visualId === 'ceo-customer') {
    return <CustomerLens onDrillDown={onDrillDown}  />;
  }

  // CEO Summary Visual
  if (visualId === 'ceo-summary') {
    const aiSummary = dashboardData.aiSummary;
    return (
      <section id="section-summary" className="bg-panel border border-panel-border rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-5 items-stretch relative z-10 pl-1">
          <div className="flex-1 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-panel-2 text-accent p-1 rounded-lg">
                  <Sparkles size={13} />
                </div>
              </div>
              <h2 className="text-sm  font-bold text-ink uppercase tracking-wide mt-1.5 leading-none">
                {aiSummary.title}
              </h2>
              <p
                className="text-ink-soft text-xs leading-relaxed font-light italic mt-1"
                dangerouslySetInnerHTML={{ __html: `"${aiSummary.overall}"` }}
              />
            </div>
          </div>

          <div className="w-full lg:w-120 grid grid-cols-1 md:grid-cols-2 gap-6 bg-panel-2/80 p-4 rounded-xl border border-panel-border shrink-0">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />{" "}
                Key Takeaways
              </span>
              <ul className="space-y-2 list-none pl-0">
                {aiSummary.takeaways?.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="text-[10px] text-ink-soft leading-normal border-l-2 border-emerald-500/40 pl-2">
                    <b className="text-ink font-bold">
                      {item.text.split(":")[0]}:
                    </b>
                    {item.text.split(":").slice(1).join(":")}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />{" "}
                Watchpoints
              </span>
              <ul className="space-y-2 list-none pl-0">
                {aiSummary.watchpoints?.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="text-[10px] text-ink-soft leading-normal border-l-2 border-amber-500/40 pl-2">
                    <b className="text-ink font-bold">
                      {item.text.split(":")[0]}:
                    </b>
                    {item.text.split(":").slice(1).join(":")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // CEO GMT owner grip visual
  if (visualId === 'ceo-gmt') {
    const req05_08 = dashboardData.sections.find((s: any) => s.id === "REQ 05 · 08");
    if (!req05_08) return null;

    const getGmtGripTooltip = (name: string) => {
      switch (name) {
        case 'Cost overshoot — Operations (COO)':
          return 'Operations cost takeout is running €39M above budget. COO alignment required.';
        case 'EBITDA pressure — Finance (CFO)':
          return 'Critical EBITDA gap (-€36M) under review by Finance. CFO tracking action items.';
        case 'Talent — Critical role gap (CHRO)':
          return '78% fill rate vs 85% target in critical roles. CHRO reviewing HR pipeline.';
        case 'Gen-2 categorisation — Commercial (CCO)':
          return 'Salesforce tag updates outstanding for 14 active deals. CCO team finalizing review.';
        case 'NPS & service health — Customer (CCSO)':
          return 'NPS at 89, Service Health is green. CCSO confirming Q1 customer feedback.';
        case 'CSM re-platform slippage — Transformation':
          return 'Milestone delayed by 4 weeks. Transformation Lead reviewing resource gates.';
        default:
          return 'GMT Executive review item. Click to open detailed strategic dashboard.';
      }
    };

    return (
      <section id="section-gmt" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2 mb-3 pl-1">
            <div>
              <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
                GMT Owner Grip
              </h2>
              <p className="text-ink-soft text-[10px] italic font-light mt-0.5">
                GMT metrics review context
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pl-1">
            {req05_08.gmtGrip?.map((item: any) => {
              const isRed = item.rag === 'red';
              const isAmber = item.rag === 'amber';
              const isGreen = item.rag === 'green';
              const isUrgent = isRed || isAmber;
              
              const colSpanClass = 'md:col-span-2';
              const ragColor = 
                isGreen ? "bg-emerald-500" : 
                isAmber ? "bg-amber-500" : 
                isRed ? "bg-red-500" : "bg-muted-text";

              return (
                <Tooltip key={item.name} content={getGmtGripTooltip(item.name)} position="top">
                  <div
                    className={`group flex justify-between items-center ${isUrgent ? 'p-2.5' : 'p-2'} rounded-lg border transition-all cursor-pointer leading-none ${colSpanClass} ${
                      isRed ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30' : 
                      isAmber ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30' : 
                      'bg-panel-2/20 hover:bg-panel-2 border-panel-border'
                    }`}
                    onClick={() =>
                      onDrillDown({
                        ...item,
                        type: "exception",
                        label: item.name,
                        requirementId: '8'
                      })
                    }>
                    <span className={`${isUrgent ? 'text-xs' : 'text-[11px]'} font-semibold text-ink flex items-center gap-1.5 min-w-0`}>
                      <span className="flex items-center shrink-0">
                        {isRed ? (
                          <span className="flex h-1.5 w-1.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                          </span>
                        ) : (
                          <span className={`w-1.5 h-1.5 rounded-full ${ragColor}`} />
                        )}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="text-[8px] font-bold text-accent uppercase tracking-wider hover:underline shrink-0 pl-1.5">
                      Grip →
                    </span>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>          
      </section>
    );
  }

  // Dashboard isolated section renderers (wrapped and filtered via data-focus + CSS)
  const dashboard = visualId.split('-')[0];
  
  return (
    <div className="focused-section-wrapper" data-focus={visualId}>
      {dashboard === 'finance' && (
        <FinanceDashboard onDrillDown={onDrillDown}  />
      )}
      {dashboard === 'gtm' && (
        <GTMDashboard onDrillDown={onDrillDown}  />
      )}
      {dashboard === 'hr' && (
        <HRDashboard onDrillDown={onDrillDown} />
      )}
    </div>
  );
};
