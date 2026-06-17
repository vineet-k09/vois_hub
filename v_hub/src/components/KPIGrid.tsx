import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';
import AnnotationCard from './AnnotationCard';

interface KPIGridProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

const KPIGrid: React.FC<KPIGridProps> = ({ onDrillDown, showAnnotations }) => {
  const req01 = dashboardData.sections.find(s => s.id === "REQ 01") as any;
  if (!req01) return null;

  const req01Anno = (dashboardData.annotations as any)["1"];

  const handleKPIClick = (kpi: any, clusterName: string) => {
    onDrillDown({
      ...kpi,
      clusterName,
      type: 'kpi',
      label: kpi.label,
      requirementId: '1'
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #1">
        1
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-2 mb-3.5 pl-1">
        <div>
          <div className="flex items-center gap-2">
            {showAnnotations && (
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                REQ 01 · top-line performance
              </span>
            )}
            {/* <span className="w-1.5 h-1.5 rounded-full bg-red-650" /> */}
          </div>
          <h2 className="text-base font-barlow font-bold text-slate-800 uppercase tracking-wide mt-0.5">
            {req01.title.split('—')[0]}
          </h2>
          <p className="text-slate-400 text-[10px] italic font-light mt-0.5">{req01.note}</p>
        </div>
      </div>

      {/* Grid of Clusters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pl-1">
        {req01.clusters?.map((cluster: any) => (
          <div key={cluster.name} className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-150 pb-1.5">
              {cluster.name}
            </h3>
            
            <div className="grid grid-cols-2 gap-2.5">
              {cluster.kpis?.map((kpi: any) => {
                const isRed = kpi.rag === 'red';
                const isAmber = kpi.rag === 'amber';
                const isTbd = kpi.rag === 'tbd';
                const isUrgent = isRed || isAmber;
                
                // Define column span based on status and importance
                const isDoubleSpan = 
                  kpi.label.includes('EBITDA') || 
                  kpi.label.includes('Cost Takeout') || 
                  kpi.label.includes('Pipeline') || 
                  kpi.label.includes('New Logos') || 
                  kpi.label.includes('Talent') ||
                  kpi.label.includes('KPI Met');

                const colSpanClass = isDoubleSpan ? 'col-span-2' : 'col-span-1';

                // Determine background and borders
                let cardClass = '';
                if (isRed) {
                  cardClass = 'bg-red-50/30 border-red-200 hover:border-red-300 hover:bg-red-50/50 ring-1 ring-red-500/5';
                } else if (isAmber) {
                  cardClass = 'bg-amber-50/30 border-amber-200 hover:border-amber-300 hover:bg-amber-50/50 ring-1 ring-amber-500/5';
                } else if (isTbd) {
                  cardClass = 'bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-200 text-slate-400';
                } else {
                  cardClass = 'bg-white border-slate-200/80 hover:border-slate-350 hover:shadow-xs';
                }

                // Value Text Color
                const valColor = isRed ? 'text-red-700' : isAmber ? 'text-amber-800' : 'text-slate-900';

                // Trend text color
                const trendClass = isRed ? 'text-red-600 font-bold' : isAmber ? 'text-amber-700 font-bold' : 'text-emerald-600 font-semibold';

                return (
									<div
										key={kpi.label}
										onClick={() => handleKPIClick(kpi, cluster.name)}
										className={`group p-2.5 rounded-xl border flex flex-col justify-between transition-all duration-200 cursor-pointer ${colSpanClass} ${cardClass} ${
											isDoubleSpan ? "h-22" : "h-17"
										}`}>
										{/* Top row */}
										<div className="flex justify-between items-start gap-1">
											<span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 leading-tight truncate">
												{kpi.label}
											</span>

											{/* RAG Bullet/Icon */}
											<span className="flex items-center shrink-0">
												{isRed ? (
													<span className="flex h-1.5 w-1.5 relative">
														<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
														<span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
													</span>
												) : isAmber ? (
													<span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
												) : isTbd ? (
													<HelpCircle size={9} className="text-slate-400" />
												) : (
													<span className="w-1 h-1 rounded-full bg-emerald-500" />
												)}
											</span>
										</div>

										{/* Middle: Main value + Action Required banner if watchpoint */}
										<div className="flex items-baseline justify-between">
											<div
												// font-barlow
												className={` 
                        text-xl font-black tracking-tight leading-none ${valColor}`}>
												{kpi.value}
											</div>

											{/* Display a micro-badge for red/amber indicating review needed */}
											{isUrgent && isDoubleSpan && (
												<span
													className={`text-[8px] font-bold px-1 py-0.5 rounded uppercase leading-none ${
														isRed
															? "bg-red-100 text-red-700"
															: "bg-amber-100 text-amber-800"
													}`}>
													{isRed ? "Action" : "Review"}
												</span>
											)}
										</div>

										{/* Bottom row: trend & target */}
										<div className="flex items-center justify-between border-t border-slate-100/50 pt-1 text-[9px] text-slate-400 leading-none">
											<span className="font-medium truncate max-w-22.5">
												{kpi.target ? `T: ${kpi.target}` : kpi.month}
											</span>
											{kpi.trend && (
												<span
													className={`flex items-center gap-0.5 leading-none ${trendClass}`}>
													{kpi.trend.includes("▲") ? (
														<TrendingUp size={8} />
													) : kpi.trend.includes("▼") ? (
														<TrendingDown size={8} />
													) : null}
													{kpi.trend}
												</span>
											)}
										</div>
									</div>
								);
              })}
            </div>
          </div>
        ))}
      </div>

      {/* REQ 01 Annotation Card */}
      {req01Anno && (
        <AnnotationCard
          id="1"
          title={req01Anno.title}
          status={req01Anno.status}
          feedback={req01Anno.feedback}
          description={req01Anno.description}
          dependencies={req01Anno.dependencies}
          acceptanceCriteria={req01Anno.acceptanceCriteria}
          userStory={req01Anno.userStory}
        />
      )}
    </section>
  );
};

export default KPIGrid;
