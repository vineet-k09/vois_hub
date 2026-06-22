import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';
import Tooltip from './Tooltip';

interface KPIGridProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

const parseValue = (v: any) => {
  if (!v || v === 'TBD') return null;
  // Handle the special minus sign and commas
  const clean = v.toString().replace(/,/g, '').replace('−', '-');
  const numeric = parseFloat(clean.replace(/[^0-9.-]/g, ''));
  return isNaN(numeric) ? null : numeric;
};

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
    <section id="section-kpi" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #1">
        1
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2 mb-3.5 pl-1">
        <div>
          <div className="flex items-center gap-2">
            {showAnnotations && (
              <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                REQ 01 · top-line performance
              </span>
            )}
            {/* <span className="w-1.5 h-1.5 rounded-full bg-red-655" /> */}
          </div>
          <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
            {req01.title.split('—')[0]}
          </h2>
          <p className="text-ink-soft text-[10px] italic font-light mt-0.5">{req01.note}</p>
        </div>
      </div>

      {/* Grid of Clusters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pl-1">
        {req01.clusters?.map((cluster: any) => (
          <div key={cluster.name} className="space-y-3">
            <h3 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5">
              {cluster.name}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5">
              {cluster.kpis
                ?.slice()
                .sort((a: any, b: any) => {
                  const ragOrder: Record<string, number> = { red: 0, amber: 1, green: 2, tbd: 3 };
                  
                  // Importance based on the labels previously used for double span
                  const importantLabels = ['EBITDA', 'Cost Takeout', 'Pipeline', 'New Logos', 'Talent', 'KPI Met'];
                  const isImportant = (kpi: any) => importantLabels.some(label => kpi.label.includes(label));
                  
                  // Primary sort: RAG
                  const ragA = ragOrder[a.rag] ?? 99;
                  const ragB = ragOrder[b.rag] ?? 99;
                  if (ragA !== ragB) return ragA - ragB;
                  
                  // Secondary sort: Importance
                  const impA = isImportant(a) ? 0 : 1;
                  const impB = isImportant(b) ? 0 : 1;
                  if (impA !== impB) return impA - impB;
                  
                  return 0;
                })
                .map((kpi: any) => {
                  const isRed = kpi.rag === 'red';
                  const isAmber = kpi.rag === 'amber';
                  const isTbd = kpi.rag === 'tbd';
                  const isUrgent = isRed || isAmber;
                  
                  // Importance flag for badges
                  const importantLabels = ['EBITDA', 'Cost Takeout', 'Pipeline', 'New Logos', 'Talent', 'KPI Met'];
                  const isImportant = importantLabels.some(label => kpi.label.includes(label));

                  // Progress Calculation
                  const valNum = parseValue(kpi.value);
                  const targetNum = parseValue(kpi.target);
                  let progress: number | null = null;
                  
                  if (valNum !== null && targetNum !== null && targetNum !== 0) {
                    progress = (valNum / targetNum) * 100;
                  } else if (valNum !== null && kpi.value.toString().includes('%') && !kpi.target) {
                    progress = valNum;
                  }

                  // Determine background and borders
                  let cardClass = '';
                  if (isRed) {
                    cardClass = 'bg-rag-red/10 border-rag-red/20 hover:border-rag-red/30 hover:bg-rag-red/15 text-ink ring-1 ring-rag-red/5';
                  } else if (isAmber) {
                    cardClass = 'bg-rag-amber/10 border-rag-amber/20 hover:border-rag-amber/30 hover:bg-rag-amber/15 text-ink ring-1 ring-rag-amber/5';
                  } else if (isTbd) {
                    cardClass = 'bg-panel-2 border-panel-border hover:bg-panel hover:border-panel-border text-muted-text';
                  } else {
                    cardClass = 'bg-panel border-panel-border hover:border-accent/40 hover:shadow-xs text-ink';
                  }

                  // Value Text Color
                  const valColor = isRed ? 'text-rag-red' : isAmber ? 'text-rag-amber' : 'text-ink';

                  // Trend text color
                  const trendClass = isRed ? 'text-rag-red font-bold' : isAmber ? 'text-rag-amber font-bold' : 'text-rag-green font-semibold';
                  
                  // Progress bar/text color
                  const ragColorClass = isRed ? 'bg-rag-red' : isAmber ? 'bg-rag-amber' : 'bg-rag-green';
                  const ragTextClass = isRed ? 'text-rag-red' : isAmber ? 'text-rag-amber' : 'text-rag-green';

                  const getKPITooltip = (kpi: any) => {
                    switch (kpi.label) {
                      case 'Revenue €M':
                        return 'Revenue is currently €2,858M, which is 1.53% above the target of €2,815M. Click to view trend details.';
                      case 'OFCF €M':
                        return 'Operating Free Cash Flow is €617.24M. Target fully achieved (1074.4% of RF). Click to view details.';
                      case 'Cost Takeout €M':
                        return 'Cost Takeout is €141.62M, up 38.84% vs target of €102M. Click to view cost breakdowns.';
                      case 'EBITDA €M':
                        return 'EBITDA is -€36.33M, below target of €0M due to operations margin pressure. Action required.';
                      case 'Pipeline (Qual.) €M':
                        return 'Qualified Pipeline is €1,359M vs €1,500M target. Volume of active deals: 14.';
                      case 'New Logos / Gen-2 Deals':
                        return '7 New Logos / Gen-2 deals signed, representing €82M in value. 2 more than last month.';
                      case 'Win Conversion %':
                        return 'Win Conversion rate is 62%, exceeding the target of 55% by 7pp.';
                      case 'Share of Wallet':
                        return 'Share of Wallet tracker. Annual refresh scheduled for Q1.';
                      case 'NPS':
                        return 'Net Promoter Score is 89. Click to see details about client feedback.';
                      case 'Spirit Beat':
                        return 'Spirit Beat score is 85, exceeding target of 80. Out of 100 maximum.';
                      case 'Talent — Critical Roles':
                        return '78% of critical roles filled vs 85% target. HR refresh is currently in-flight.';
                      case 'KPI Met %':
                        return '90%+ of top-line KPIs are met. 7 of 8 have met their FY27 goals.';
                      default:
                        return `Click to drill down into ${kpi.label} details.`;
                    }
                  };

                  return (
                    <Tooltip key={kpi.label} content={getKPITooltip(kpi)} position="top">
                      <div
                        onClick={() => handleKPIClick(kpi, cluster.name)}
                        className={`group p-3 rounded-xl border flex flex-col justify-between transition-all duration-200 cursor-pointer col-span-1 h-[108px] ${cardClass} relative overflow-hidden`}>
                        {/* Top row: Label & RAG Status Indicator */}
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[10px] font-bold text-ink-soft group-hover:text-ink leading-tight uppercase tracking-wider">
                            {kpi.label}
                          </span>

                          {/* RAG Bullet/Icon */}
                          <span className="flex items-center shrink-0 mt-0.5">
                            {isRed ? (
                              <span className="flex h-1.5 w-1.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rag-red opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rag-red"></span>
                              </span>
                            ) : isAmber ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-rag-amber" />
                            ) : isTbd ? (
                              <HelpCircle size={9} className="text-muted-text" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-rag-green" />
                            )}
                          </span>
                        </div>

                        {/* Middle: Main value, Trend indicator, and Badge */}
                        <div className="flex items-baseline justify-between gap-1.5 flex-wrap">
                          <div className="flex items-baseline gap-1.5">
                            <span className={`text-xl font-black tracking-tight leading-none ${valColor}`}>
                              {kpi.value}
                            </span>
                            {kpi.trend && (
                              <span className={`flex items-center gap-0.5 text-[9px] leading-none shrink-0 ${trendClass}`}>
                                {kpi.trend.includes("▲") ? (
                                  <TrendingUp size={9} />
                                ) : kpi.trend.includes("▼") ? (
                                  <TrendingDown size={9} />
                                ) : null}
                                {kpi.trend}
                              </span>
                            )}
                          </div>
                          
                          {isUrgent && isImportant && (
                            <span
                              className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase leading-none shrink-0 ${
                                isRed
                                  ? "bg-red-500/20 text-red-500 border-red-500/30"
                                  : "bg-amber-500/20 text-amber-500 border-amber-500/30"
                              }`}>
                              {isRed ? "Action" : "Review"}
                            </span>
                          )}
                        </div>

                        {/* Bottom Section: Unified Divider and Progress/Metadata */}
                        <div className="border-t border-panel-border/60 pt-2 flex flex-col justify-end h-7">
                          {progress !== null ? (
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-[9px] text-ink-soft leading-none">
                                <span>{kpi.target ? `Target: ${kpi.target}` : kpi.month || ''}</span>
                                <span className={`font-black ${ragTextClass}`}>{Math.round(progress)}%</span>
                              </div>
                              <div className="h-1 bg-panel-2 rounded-full overflow-hidden">
                                <div 
                                  className={`${ragColorClass} h-full transition-all duration-700`} 
                                  style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center text-[9px] text-ink-soft leading-none">
                              <span>{kpi.target ? `Target: ${kpi.target}` : kpi.month || ''}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* REQ 01 Annotation Card */}
      {req01Anno && (
        null
      )}
    </section>
  );
};

export default KPIGrid;
