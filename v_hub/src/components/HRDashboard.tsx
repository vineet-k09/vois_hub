import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import hrData from '../data/hr_data.json';
import AnnotationCard from './AnnotationCard';

interface HRDashboardProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
  focusedSection?: string;
}

export const HRDashboard: React.FC<HRDashboardProps> = ({ onDrillDown, showAnnotations, focusedSection }) => {
  const { kpis, crossFunctionalHR, promotionsGlidePath, headcountEfficiency, talentDemand, spiritBeat, ldEffectiveness, annotations } = hrData;

  const handleKPIClick = (kpi: any) => {
    onDrillDown({
      ...kpi,
      type: 'kpi',
      label: kpi.label,
      requirementId: 'HR.1',
      summary: `HR KPI ${kpi.label} is currently tracking at ${kpi.value} vs target of ${kpi.target || 'N/A'}. Details: ${kpi.trend}. RAG status is ${kpi.rag.toUpperCase()}.`,
      nextStep: `Verify data alignment in Sima's Master Headcount Database`,
      owner: `Sima (HR Director)`,
      metrics: [
        { label: "KPI Value", val: kpi.value, status: kpi.rag.toUpperCase() },
        { label: "Target / Baseline", val: kpi.target || 'N/A', status: 'Baseline' },
        { label: "Detail Note", val: kpi.trend, status: 'Indicator' }
      ]
    });
  };

  const handleTowerClick = (tower: any) => {
    onDrillDown({
      type: 'kpi',
      label: `Tower Performance: ${tower.tower}`,
      requirementId: 'HR.1',
      summary: `Cross-functional signals for service tower ${tower.tower} (Headcount: ~${tower.headcount}). L&D Adoption is at ${tower.ldAdoption}% (${tower.ldDelta}). Spirit Beat score: ${tower.spiritBeat} (${tower.spiritDetail}). Business NPS/Performance: ${tower.nps} (${tower.businessPerf}).`,
      nextStep: `Coordinate target team-level pulse review with HR Business Partners`,
      owner: `Sima (HR Director)`,
      metrics: [
        { label: "Headcount", val: `${tower.headcount} FTE`, status: 'Active' },
        { label: "L&D Adoption", val: `${tower.ldAdoption}%`, status: tower.ragLd.toUpperCase() },
        { label: "Spirit Beat", val: `${tower.spiritBeat}`, status: tower.ragSpirit.toUpperCase() },
        { label: "Business NPS", val: `+${tower.nps}`, status: tower.ragNps.toUpperCase() }
      ]
    });
  };

  const handleHotspotClick = (hot: any) => {
    onDrillDown({
      type: 'exception',
      label: `Talent Hotspot: ${hot.name}`,
      requirementId: 'TLNT',
      rag: hot.rag,
      summary: `Promotion hotspot identified in ${hot.name}. Current promotions: ${hot.value}. Target Status: ${hot.desc}.`,
      nextStep: `Launch career progression review workshop with local leadership team`,
      owner: `Sima (HR Director)`,
      metrics: [
        { label: "Promotion Rate", val: hot.value, status: hot.status },
        { label: "Variance Notes", val: hot.desc, status: 'Watch' }
      ]
    });
  };

  const handleInitiativeClick = (init: any) => {
    onDrillDown({
      type: 'transformation',
      label: `Efficiency: ${init.name}`,
      requirementId: 'HR.1.1',
      summary: `Strategic profitability initiative: ${init.name}. Target impact: ${init.impact} by ${init.timing}. Details: ${init.desc}.`,
      nextStep: `Validate actual vs forecast cost take-out savings on project completion`,
      owner: `Sima (HR Director)`,
      metrics: [
        { label: "Headcount Impact", val: init.impact, status: 'Reduction' },
        { label: "Target Date", val: init.timing, status: 'Timing' }
      ]
    });
  };

  const handleFunnelClick = (stage: any) => {
    onDrillDown({
      type: 'kpi',
      label: `Talent Funnel: ${stage.stage}`,
      requirementId: 'HR.1.2',
      summary: `Talent recruitment pipeline stage ${stage.stage} for Project Atlas. Current count: ${stage.value}. Detail: ${stage.desc} (Source: ${stage.source}).`,
      nextStep: `Audit hiring SLA speed and unblock pending VRF approvals`,
      owner: `Sima (HR Director)`,
      metrics: [
        { label: "Hiring Volume", val: `${stage.value}`, status: stage.highlight ? 'Key Stage' : 'Active' },
        { label: "Detail Status", val: stage.desc, status: 'Context' },
        { label: "System Feed", val: stage.source, status: 'Source' }
      ]
    });
  };

  const handleDriverClick = (driver: any) => {
    onDrillDown({
      type: 'kpi',
      label: `Spirit Driver: ${driver.name}`,
      requirementId: 'HR.1.3',
      summary: `Correlation Analysis for Spirit Beat driver: ${driver.name}. Correlation coefficient r: ${driver.correlation > 0 ? '+' : ''}${driver.correlation} (${driver.level.toUpperCase()} significance). Driver description: ${driver.desc}`,
      nextStep: `Incorporate flexible work and benefits review findings into Q3 operational roadmap`,
      owner: `Sima (HR Director)`,
      metrics: [
        { label: "Correlation coefficient", val: `${driver.correlation}`, status: driver.level.toUpperCase() },
        { label: "Significance", val: driver.level === 'high' ? 'High Impact' : 'Monitor' }
      ]
    });
  };

  const handleCorrelationClick = (corr: any) => {
    onDrillDown({
      type: 'kpi',
      label: `L&D Correlation: ${corr.kpi}`,
      requirementId: 'HR.1.4',
      summary: `L&D training effectiveness correlation to ${corr.kpi}. Pearson r coefficient is ${corr.r} (${corr.strength.toUpperCase()} correlation). Performance change: ${corr.delta} (${corr.window} window).`,
      nextStep: `Verify whether Copilot licenses are fully utilised across pilot teams`,
      owner: `Sima (HR Director)`,
      metrics: [
        { label: "Correlation strength", val: corr.r, status: corr.strength.toUpperCase() },
        { label: "Performance change", val: corr.delta, status: corr.trend === 'up' ? 'Favorable' : 'Monitor' },
        { label: "Audit Window", val: corr.window, status: 'Rolling' }
      ]
    });
  };

  const formattedGlideData = promotionsGlidePath.monthlyData;
  const formattedHCData = headcountEfficiency.monthlyData;
  const spiritBeatHistory = spiritBeat.history;

  if (focusedSection === 'hr-spirit') {
    return (
      <section id="hr-spirit" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Spirit Beat 'Why' Analysis — Likely Drivers
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">One-off historical correlation tracked as ongoing framework</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1">
          {/* Spirit Beat Area Chart */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-widest mb-3 leading-none pl-1 border-l-2 border-accent">
                Historical Trend (Correlation Check)
              </h5>
              
              <div className="h-44 w-full mt-2 text-ink">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spiritBeatHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                    <XAxis dataKey="month" stroke="var(--ink-soft)" fontSize={9} />
                    <YAxis stroke="var(--ink-soft)" fontSize={9} domain={[60, 90]} />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)' }} />
                    <defs>
                      <linearGradient id="spiritGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e60000" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#e60000" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="score" stroke="#e60000" fillOpacity={1} fill="url(#spiritGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="pt-3 border-t border-panel-border/50 flex justify-between items-center text-[10.5px] text-ink-soft mt-3">
              <span>Correlation Strength: <strong>Highly Significant (p &lt; 0.01)</strong></span>
              <span className="font-bold text-ink">N=24,850 FTE</span>
            </div>
          </div>

          {/* Drivers List */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-widest mb-3 leading-none pl-1 border-l-2 border-accent">
                Identified Key Drivers &amp; Engagement Impact
              </h5>

              <div className="space-y-2">
                {spiritBeat.drivers.map((drv) => {
                  const levelClass = drv.level === 'high' ? 'bg-red-500/10 text-rose-500 border border-red-500/20 font-bold' : drv.level === 'med' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold' : 'bg-slate-500/10 text-slate-500';
                  return (
                    <div 
                      key={drv.name} 
                      onClick={() => handleDriverClick(drv)}
                      className="p-2.5 bg-panel border border-panel-border/70 hover:bg-panel-2 rounded-xl cursor-pointer transition-colors flex justify-between items-center leading-none"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] text-ink font-semibold uppercase">{drv.name}</span>
                        <span className="text-[9px] text-ink-soft font-light block leading-tight">{drv.desc}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] text-ink-soft">r = {drv.correlation > 0 ? '+' : ''}{drv.correlation}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wide ${levelClass}`}>
                          {drv.level}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      {/* KPI GRID */}
      <section id="hr-kpis" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement HR.1">1</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide">People &amp; Engagement KPIs</h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">FY27 YTD · all towers closes</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pl-1">
          {kpis.map((kpi) => {
            const isRed = kpi.rag === 'red';
            const isAmber = kpi.rag === 'amber';
            const isGreen = kpi.rag === 'green';
            const ragBg = isRed ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/20' : isAmber ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20';
            const ragColor = isGreen ? 'text-emerald-500' : isAmber ? 'text-amber-500' : 'text-rose-500';

            return (
              <div 
                key={kpi.label} 
                onClick={() => handleKPIClick(kpi)}
                className={`p-4 rounded-xl border ${ragBg} transition-all cursor-pointer flex flex-col justify-between items-center text-center`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wider">{kpi.label}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-emerald-500' : isAmber ? 'bg-amber-500' : 'bg-red-500'}`} />
                </div>
                <div className="my-2">
                  <span className={`text-2xl font-barlow font-black tracking-tight ${ragColor}`}>{kpi.value}</span>
                </div>
                <div className="flex justify-between items-center w-full text-[9px] text-ink-soft">
                  <span>Target: {kpi.target}</span>
                  <span className="font-semibold">{kpi.trend}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HR.1 - CROSS-FUNCTIONAL HR VIEW */}
      <section id="hr-cross" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement HR.1">HR.1</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ HR.1 · cross-functional hr
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Cross-Functional HR View — Correlated Storytelling
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Per service tower · AI narrates the 'why' and 'so what'</p>
          </div>
        </div>

        <div className="space-y-4 pl-1">
          {/* Service Towers Grid */}
          <div className="border border-panel-border rounded-xl overflow-hidden bg-panel-2/30">
            <div className="bg-panel-2 border-b border-panel-border p-3 flex justify-between items-center">
              <span className="text-xs font-bold text-ink uppercase tracking-wider">HR signals across service towers</span>
              <span className="text-[9px] font-bold text-panel bg-ink px-2 py-0.5 uppercase tracking-widest">DRILL FOR DETAIL</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-panel-2 border-b border-panel-border">
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9.5px]">Service Tower</th>
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-center">L&amp;D Adoption</th>
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-center">Spirit Beat</th>
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-center">Business NPS / Perf</th>
                  </tr>
                </thead>
                <tbody>
                  {crossFunctionalHR.towers.map((tower) => {
                    const ldrColor = tower.ragLd === 'green' ? 'text-emerald-500' : tower.ragLd === 'amber' ? 'text-amber-500' : 'text-rose-500';
                    const sprColor = tower.ragSpirit === 'green' ? 'text-emerald-500' : tower.ragSpirit === 'amber' ? 'text-amber-500' : 'text-rose-500';
                    const npsColor = tower.ragNps === 'green' ? 'text-emerald-500' : tower.ragNps === 'amber' ? 'text-amber-500' : 'text-rose-500';
                    
                    return (
                      <tr 
                        key={tower.tower} 
                        onClick={() => handleTowerClick(tower)}
                        className="border-b border-panel-border/50 hover:bg-panel-2/20 cursor-pointer"
                      >
                        <td className="p-3 border-r border-panel-border/30">
                          <span className="font-bold text-ink block">{tower.tower}</span>
                          <span className="text-[10px] text-ink-soft italic font-light">~ {tower.headcount} headcount</span>
                        </td>
                        <td className="p-3 text-center border-r border-panel-border/30">
                          <span className={`text-base font-barlow font-black block ${ldrColor}`}>{tower.ldAdoption}%</span>
                          <span className="text-[9px] text-ink-soft font-semibold">{tower.ldDelta}</span>
                        </td>
                        <td className="p-3 text-center border-r border-panel-border/30">
                          <span className={`text-base font-barlow font-black block ${sprColor}`}>{tower.spiritBeat}</span>
                          <span className="text-[9px] text-ink-soft font-semibold">{tower.spiritDetail}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`text-base font-barlow font-black block ${npsColor}`}>+{tower.nps}</span>
                          <span className="text-[9px] text-ink-soft font-semibold">{tower.businessPerf}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Correlated Narrative Box */}
          <div className="bg-panel border-l-4 border-l-accent p-4 rounded-r-xl border border-y border-r border-panel-border shadow-xs space-y-2">
            <div className="flex items-center gap-1.5 border-b border-panel-border/50 pb-1.5">
              <Sparkles size={12} className="text-accent" />
              <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider leading-none">Correlated HR Narrative</h4>
              <span className="text-[8px] bg-accent/10 border border-accent/20 text-accent font-black uppercase px-2 py-0.5 rounded leading-none ml-2">AI · LLM</span>
            </div>
            <p className="text-[11px] text-ink-soft leading-relaxed font-light">
              {crossFunctionalHR.narrative}
            </p>
          </div>
        </div>

        {showAnnotations && annotations["HR.1"] && (
          <AnnotationCard
            id="HR.1"
            title={annotations["HR.1"].title}
            status={annotations["HR.1"].status}
            description={annotations["HR.1"].description}
            acceptanceCriteria={annotations["HR.1"].acceptanceCriteria}
            userStory={annotations["HR.1"].userStory}
            dependencies={annotations["HR.1"].dependencies}
            feedback={annotations["HR.1"].feedback}
          />
        )}
      </section>

      {/* TALENT METRICS - ANNUALISED GLIDE PATH */}
      <section id="hr-promotions" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement TLNT">TLNT</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide">Top-Talent Promotions — Annualised Glide Path</h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Flat ~2%/month for 25% annual · drill to LoB / geography hotspots</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1">
          {/* Glide path line chart */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-widest mb-3 leading-none pl-1 border-l-2 border-accent">
                Promotion glide path vs target — FY27 YTD
              </h5>
              
              <div className="h-44 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={formattedGlideData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                    <XAxis dataKey="month" stroke="var(--ink-soft)" fontSize={9} />
                    <YAxis stroke="var(--ink-soft)" fontSize={9} unit="%" />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)' }} />
                    <Area type="monotone" name="Actual Promotions %" dataKey="actual" fill="rgba(230,0,0,0.1)" stroke="#e60000" strokeWidth={2} />
                    <Line type="monotone" name="Target Promotions %" dataKey="target" stroke="var(--ink)" strokeWidth={1.5} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex justify-between items-center text-[9.5px] text-ink-soft mt-3 bg-panel p-2 rounded border border-panel-border/50">
              <span className="font-semibold">YTD Promo: {promotionsGlidePath.currentYtd}% vs Target {promotionsGlidePath.targetYtd}%</span>
              <span className="font-bold text-emerald-500">Pool: {promotionsGlidePath.topTalentPool} Talent</span>
            </div>
          </div>

          {/* Hotspots */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5 mb-2.5">
                Hotspots by Line of Business / Geography
              </h5>
              <div className="grid grid-cols-2 gap-2.5">
                {promotionsGlidePath.hotspots.map((hot) => {
                  const isRed = hot.rag === 'red';
                  const isAmber = hot.rag === 'amber';
                  const cellBg = isRed ? 'bg-red-500/10 border-red-500/20 text-rose-500' : isAmber ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500';
                  
                  return (
                    <div 
                      key={hot.name} 
                      onClick={() => handleHotspotClick(hot)}
                      className={`p-3 rounded-xl border ${cellBg} transition-all cursor-pointer flex flex-col justify-between`}
                    >
                      <span className="text-[10px] font-bold text-ink uppercase tracking-wider">{hot.name}</span>
                      <span className="text-xl font-barlow font-black block my-1">{hot.value}</span>
                      <span className="text-[9px] text-ink-soft leading-normal font-light">{hot.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["TLNT"] && (
          <AnnotationCard
            id="TLNT"
            title={annotations["TLNT"].title}
            status={annotations["TLNT"].status}
            description={annotations["TLNT"].description}
            acceptanceCriteria={annotations["TLNT"].acceptanceCriteria}
            userStory={annotations["TLNT"].userStory}
            dependencies={annotations["TLNT"].dependencies}
            feedback={annotations["TLNT"].feedback}
          />
        )}
      </section>

      {/* HR.1.1 - EFFICIENCY → HEADCOUNT LINKAGE */}
      <section id="hr-headcount" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement HR.1.1">HR.1.1</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ HR.1.1 · efficiency headcount
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Efficiency → Headcount Linkage
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Strategic profitability initiatives overlaid on actuals + forecast</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1">
          {/* Headcount actual + forecast chart */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-widest mb-3 leading-none pl-1 border-l-2 border-accent">
                Group Headcount actuals &amp; forecast trajectory overlaid
              </h5>
              
              <div className="h-44 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={formattedHCData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                    <XAxis dataKey="month" stroke="var(--ink-soft)" fontSize={9} />
                    <YAxis stroke="var(--ink-soft)" fontSize={9} domain={[6000, 8000]} />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)' }} />
                    <Area type="monotone" name="Headcount Actual" dataKey="actual" fill="rgba(9,9,11,0.05)" stroke="var(--ink)" strokeWidth={2} />
                    <Area type="monotone" name="Forecast" dataKey="forecast" fill="transparent" stroke="#b8000a" strokeWidth={2} strokeDasharray="4 3" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-center text-[9px] text-ink-soft mt-3 bg-panel p-2 rounded border border-panel-border/50 flex-wrap">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-ink" /> Actuals (Apr-25 → Mar-26)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#b8000a] border-t border-dashed" /> Forecast (Apr-26 → Sep-26)</span>
            </div>
          </div>

          {/* Efficiency initiatives list */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5 mb-2.5">
                Strategic profitability initiatives overlay
              </h5>
              <div className="space-y-2.5">
                {headcountEfficiency.initiatives.map((init) => (
                  <div 
                    key={init.name} 
                    onClick={() => handleInitiativeClick(init)}
                    className="flex justify-between items-center text-[11px] p-2.5 bg-panel rounded-lg border border-panel-border/60 hover:bg-panel-2 transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-ink block">{init.name}</span>
                      <span className="text-[10px] text-ink-soft font-light mt-0.5">{init.desc}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-barlow font-black text-rose-500 block">{init.impact}</span>
                      <span className="text-[8px] bg-ink text-panel uppercase tracking-wider px-1.5 py-0.2 rounded mt-0.5 font-bold inline-block">{init.timing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["HR.1.1"] && (
          <AnnotationCard
            id="HR.1.1"
            title={annotations["HR.1.1"].title}
            status={annotations["HR.1.1"].status}
            description={annotations["HR.1.1"].description}
            acceptanceCriteria={annotations["HR.1.1"].acceptanceCriteria}
            userStory={annotations["HR.1.1"].userStory}
            dependencies={annotations["HR.1.1"].dependencies}
            feedback={annotations["HR.1.1"].feedback}
          />
        )}
      </section>

      {/* HR.1.2 - TALENT DEMAND OUTLOOK */}
      <section id="hr-demand" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement HR.1.2">HR.1.2</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ HR.1.2 · demand outlook
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Talent Demand &amp; Skills Outlook — End-to-End
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Contract → Demand → Positions → VRFs → SuccessFactors hires</p>
          </div>
        </div>

        <div className="space-y-4 pl-1">
          <div className="bg-panel-2/60 p-3 rounded-xl border border-panel-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="bg-ink text-panel text-[8px] font-black uppercase px-2 py-0.5 rounded leading-none">DEAL LINK</span>
              <h4 className="text-xs font-bold text-ink tracking-wide mt-1 uppercase">
                {talentDemand.dealName}
              </h4>
              <p className="text-[10px] text-ink-soft font-light mt-0.5">{talentDemand.dealMeta}</p>
            </div>
            <button 
              onClick={() => alert('Opening contract in Salesforce CRM...')}
              className="flex items-center gap-1.5 text-[10px] font-bold text-accent hover:underline cursor-pointer"
            >
              Open in Salesforce <ExternalLink size={10} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 items-stretch">
            {talentDemand.funnel.map((stage) => {
              const borderClass = stage.highlight ? 'border-accent bg-accent/5' : 'border-panel-border hover:bg-panel-2/50';
              const nameColor = stage.highlight ? 'text-accent font-bold' : 'text-ink';
              return (
                <div 
                  key={stage.stage} 
                  onClick={() => handleFunnelClick(stage)}
                  className={`p-3 rounded-xl border ${borderClass} transition-all cursor-pointer flex flex-col justify-between`}
                >
                  <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider block leading-none">{stage.stage}</span>
                  <span className={`text-2xl font-barlow font-black block mt-2 mb-1 ${nameColor}`}>{stage.value}</span>
                  <span className="text-[8.5px] text-ink-soft font-medium leading-tight block mb-2">{stage.desc}</span>
                  <span className="text-[7.5px] bg-panel-2 text-ink-soft px-1.5 py-0.2 rounded border border-panel-border inline-block self-start font-semibold uppercase">{stage.source}</span>
                </div>
              );
            })}
          </div>
        </div>

        {showAnnotations && annotations["HR.1.2"] && (
          <AnnotationCard
            id="HR.1.2"
            title={annotations["HR.1.2"].title}
            status={annotations["HR.1.2"].status}
            description={annotations["HR.1.2"].description}
            acceptanceCriteria={annotations["HR.1.2"].acceptanceCriteria}
            userStory={annotations["HR.1.2"].userStory}
            dependencies={annotations["HR.1.2"].dependencies}
            feedback={annotations["HR.1.2"].feedback}
          />
        )}
      </section>

      {/* HR.1.3 - SPIRIT SURVEY 'WHY' ANALYSIS */}
      <section id="hr-spirit" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement HR.1.3">HR.1.3</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ HR.1.3 · spirit beat why
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Spirit Beat 'Why' Analysis — Likely Drivers
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">One-off historical correlation tracked as ongoing framework</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1">
          {/* Spirit Beat Area Chart */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-widest mb-3 leading-none pl-1 border-l-2 border-accent">
                Spirit Beat Survey Score Trajectory — Glint Cycles
              </h5>
              
              <div className="h-44 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spiritBeatHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                    <XAxis dataKey="cycle" stroke="var(--ink-soft)" fontSize={9} />
                    <YAxis stroke="var(--ink-soft)" fontSize={9} domain={[60, 90]} />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)' }} />
                    <Area type="monotone" dataKey="score" fill="rgba(230,0,0,0.1)" stroke="#e60000" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex justify-between items-center text-[9.5px] text-ink-soft mt-3 bg-panel p-2 rounded border border-panel-border/50">
              <span className="font-semibold">Current Score: {spiritBeat.currentScore} (▲ {spiritBeat.delta} vs H1-26)</span>
              <span className="font-bold text-emerald-500">Target Score: 80</span>
            </div>
          </div>

          {/* Likely drivers list */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5 mb-2.5 flex justify-between items-center">
                <span>Likely Drivers Correlation Framework</span>
                <span className="bg-ink text-panel text-[8px] font-bold px-1.5 py-0.2 rounded">r significance</span>
              </h5>
              <div className="space-y-2">
                {spiritBeat.drivers.map((drv) => {
                  const corrColor = drv.correlation > 0 ? 'text-emerald-500' : 'text-rose-500';
                  return (
                    <div 
                      key={drv.name} 
                      onClick={() => handleDriverClick(drv)}
                      className="p-2.5 bg-panel rounded-lg border border-panel-border/60 hover:bg-panel-2 transition-colors cursor-pointer space-y-1.5"
                    >
                      <div className="flex justify-between items-center text-[10.5px]">
                        <span className="font-bold text-ink">{drv.name}</span>
                        <span className={`font-barlow font-black text-sm ${corrColor}`}>r = {drv.correlation > 0 ? '+' : ''}{drv.correlation}</span>
                      </div>
                      <div className="flex justify-between items-start gap-3">
                        <p className="text-[9.5px] text-ink-soft font-light leading-normal">{drv.desc}</p>
                        <span className={`px-1.5 py-0.2 rounded text-[7.5px] font-black uppercase shrink-0 ${drv.level === 'high' ? 'bg-red-500/10 text-rose-500 border border-red-500/20' : drv.level === 'med' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-slate-500/10 text-slate-500'}`}>
                          {drv.level}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["HR.1.3"] && (
          <AnnotationCard
            id="HR.1.3"
            title={annotations["HR.1.3"].title}
            status={annotations["HR.1.3"].status}
            description={annotations["HR.1.3"].description}
            acceptanceCriteria={annotations["HR.1.3"].acceptanceCriteria}
            userStory={annotations["HR.1.3"].userStory}
            dependencies={annotations["HR.1.3"].dependencies}
            feedback={annotations["HR.1.3"].feedback}
          />
        )}
      </section>

      {/* HR.1.4 - L&D / TRAINING EFFECTIVENESS */}
      <section id="hr-ld" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement HR.1.4">HR.1.4</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ HR.1.4 · training effectiveness
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              L&amp;D / Training Effectiveness — Business &amp; AI Productivity
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Adoption vs business KPI correlation strength over meaningful window</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1">
          {/* L&D stats tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ldEffectiveness.tiles.map((tile) => {
              const isGreen = tile.rag === 'green';
              const isAmber = tile.rag === 'amber';
              const borderBg = isGreen ? 'border-emerald-500/30 bg-emerald-500/5' : isAmber ? 'border-amber-500/30 bg-amber-500/5' : 'border-panel-border bg-panel-2/30';
              return (
                <div key={tile.label} className={`border rounded-xl p-3.5 ${borderBg} flex flex-col justify-between`}>
                  <div className="flex justify-between items-center text-[9.5px] text-ink-soft uppercase font-bold leading-none">
                    <span>{tile.label}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-emerald-500' : isAmber ? 'bg-amber-500' : 'bg-muted-text'}`} />
                  </div>
                  <span className="text-2xl font-barlow font-black text-ink my-1.5">{tile.value}</span>
                  <p className="text-[10px] text-ink-soft leading-normal font-light">{tile.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Correlation strength table */}
          <div className="border border-panel-border rounded-xl overflow-hidden bg-panel-2/30 flex flex-col justify-between">
            <div>
              <div className="bg-panel-2 border-b border-panel-border p-3 flex justify-between items-center">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">Correlation Strength — Training ↔ KPIs</span>
                <span className="text-[9px] font-bold text-panel bg-ink px-2 py-0.5 uppercase tracking-widest">PEARSON r</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse min-w-[300px]">
                  <thead>
                    <tr className="bg-panel-2 border-b border-panel-border">
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px]">Downstream Business KPI</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center">r</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center">Δ 6m</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center">Window</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ldEffectiveness.correlations.map((corr) => {
                      const isStrong = corr.strength === 'strong';
                      const isMed = corr.strength === 'med';
                      const cellBg = isStrong ? 'bg-emerald-500/10 text-emerald-500' : isMed ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500';
                      
                      return (
                        <tr 
                          key={corr.kpi} 
                          onClick={() => handleCorrelationClick(corr)}
                          className="border-b border-panel-border/50 hover:bg-panel-2/20 cursor-pointer"
                        >
                          <td className="p-2.5 font-semibold text-ink">{corr.kpi}</td>
                          <td className="p-2.5 text-center font-barlow font-black text-base">{corr.r}</td>
                          <td className="p-2.5 text-center">
                            <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold leading-none ${cellBg}`}>
                              {corr.delta}
                            </span>
                          </td>
                          <td className="p-2.5 text-center text-ink-soft font-medium">{corr.window}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["HR.1.4"] && (
          <AnnotationCard
            id="HR.1.4"
            title={annotations["HR.1.4"].title}
            status={annotations["HR.1.4"].status}
            description={annotations["HR.1.4"].description}
            acceptanceCriteria={annotations["HR.1.4"].acceptanceCriteria}
            userStory={annotations["HR.1.4"].userStory}
            dependencies={annotations["HR.1.4"].dependencies}
            feedback={annotations["HR.1.4"].feedback}
          />
        )}
      </section>
    </div>
  );
};
