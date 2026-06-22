import React, { useState } from 'react';
import { Sparkles, Download } from 'lucide-react';
import { ComposedChart, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import gtmData from '../data/gtm_data.json';

interface GTMDashboardProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

export const GTMDashboard: React.FC<GTMDashboardProps> = ({ onDrillDown, showAnnotations }) => {
  const { kpis, pipelineFunnel, revenueRecognition, deliveryRisk, serviceOfferings, shareOfWallet, customerPerformance, competitiveBrief, annotations } = gtmData;
  const [selectedCustomer, setSelectedCustomer] = useState('DT Group');

  const handleKPIClick = (kpi: any) => {
    onDrillDown({
      ...kpi,
      type: 'kpi',
      label: kpi.label,
      requirementId: 'GTM.1',
      summary: `Commercial KPI ${kpi.label} is currently tracking at ${kpi.value} vs target of ${kpi.target || 'N/A'}. Trend: ${kpi.trend}. RAG status: ${kpi.rag.toUpperCase()}.`,
      nextStep: `Verify commercial data feed sync with CCO pipelines`,
      owner: `Chris (GTM Director)`,
      metrics: [
        { label: "KPI Value", val: kpi.value, status: kpi.rag.toUpperCase() },
        { label: "Target / Baseline", val: kpi.target || 'N/A', status: 'Baseline' },
        { label: "Trend Indicator", val: kpi.trend, status: 'Indicator' }
      ]
    });
  };

  const handlePipelineClick = (stage: any) => {
    onDrillDown({
      type: 'kpi',
      label: `Pipeline: ${stage.stage}`,
      requirementId: 'GTM.1',
      summary: `Pipeline funnel stage ${stage.stage} has total volume of €${stage.value}M across ${stage.opps} active opportunities. Month-on-month trend is ${stage.trend}.`,
      nextStep: `Validate conversion gate metrics in Salesforce CRM`,
      owner: `Chris (GTM Director)`,
      metrics: [
        { label: "Pipeline Value", val: `€${stage.value}M`, status: 'Active' },
        { label: "Opportunities Count", val: `${stage.opps} deals`, status: 'Volume' },
        { label: "MOM Trend", val: stage.trend, status: 'Indicator' }
      ]
    });
  };

  const handleVarianceClick = (deal: any) => {
    onDrillDown({
      type: 'exception',
      label: `Rev. Rec. Variance: ${deal.deal}`,
      requirementId: 'GTM.1.1',
      rag: deal.rag,
      summary: `Revenue recognition analysis for ${deal.deal}. Sold value of contract: €${deal.sold}M. Recognized YTD: €${deal.recognised}M. Variance is at ${deal.variance}%.`,
      nextStep: `Convene finance audit alignment meeting to resolve project billing milestone slip`,
      owner: `Chris (GTM Director)`,
      metrics: [
        { label: "Sold Contract Value", val: `€${deal.sold}M`, status: 'Sold' },
        { label: "Recognized Value YTD", val: `€${deal.recognised}M`, status: deal.rag === 'red' ? 'Critical' : 'Watch' },
        { label: "Variance Percentage", val: `${deal.variance}%`, status: 'Gap' }
      ]
    });
  };

  const handleDeliveryRiskClick = (deal: any) => {
    onDrillDown({
      type: 'exception',
      label: `Delivery Risk #${deal.rank}: ${deal.deal}`,
      requirementId: 'GTM.1.2',
      rag: deal.rag,
      summary: `Delivery risk audit for deal ${deal.deal} (customer ${deal.customer}). Current contract value is ${deal.value} with RAG status ${deal.rag.toUpperCase()}. Missed Milestones: ${deal.milestones}. SME-identified risks: ${deal.risks}.`,
      nextStep: `Coordinate risk mitigation tasks with target delivery lead before upcoming board review`,
      owner: `Chris (GTM Director)`,
      metrics: [
        { label: "Deal Value", val: deal.value, status: 'Active' },
        { label: "Milestone status", val: deal.milestones, status: deal.rag === 'red' ? 'Critical' : 'Watch' },
        { label: "SME Risk Flag", val: deal.risks, status: 'Roadblock' }
      ]
    });
  };

  const handleOpportunityClick = (opp: any) => {
    onDrillDown({
      type: 'kpi',
      label: `Growth Opp: ${opp.customer}`,
      requirementId: 'GTM.3',
      summary: `Identified growth opportunity in customer ${opp.customer} for ${opp.service}. Opportunity value is €${opp.value}M, current VOIS penetration is ${opp.voisPercent}%. Opportunity type: ${opp.type}.`,
      nextStep: `Engage with commercial lead to submit RFP outline for ${opp.service}`,
      owner: `Chris (GTM Director)`,
      metrics: [
        { label: "Opportunity Value", val: `€${opp.value}M`, status: 'Pipeline size' },
        { label: "VOIS Penetration", val: `${opp.voisPercent}%`, status: 'Upsell' },
        { label: "Sales Strategy", val: opp.type, status: 'Action Set' }
      ]
    });
  };

  const handleOfferingClick = (tower: string, off: any) => {
    onDrillDown({
      type: 'kpi',
      label: `Offering: ${off.name}`,
      requirementId: 'GTM.2',
      summary: `Service Offering detail under tower ${tower}. Product name: ${off.name}. Status: ${off.status.toUpperCase()}. Description: ${off.desc}. Launch Milestone: ${off.milestone}.`,
      nextStep: `Align customer pitch decks with product team for ${off.name}`,
      owner: `Chris (GTM Director)`,
      metrics: [
        { label: "Product Status", val: off.status.toUpperCase(), status: off.status === 'live' ? 'Live' : 'Beta' },
        { label: "Milestone Date", val: off.milestone, status: 'Roadmap' }
      ]
    });
  };

  const handleDownloadBriefing = () => {
    const brief = competitiveBrief;
      const textContent = `============================================================
      VOIS GTM COMPETITIVE BRIEFING: DT Group
      ============================================================
      Meeting: ${brief.meeting}
      Generated: Mar-26 | Refreshed on demand
      ------------------------------------------------------------
      COMPETITOR A STATUS (Down Trend):
      ${brief.compA.signals.map(s => `- ${s}`).join('\n')}

      COMPETITOR B STATUS (Up Trend):
      ${brief.compB.signals.map(s => `- ${s}`).join('\n')}

      CUSTOMER STATUS (Flat Trend):
      ${brief.customer.signals.map(s => `- ${s}`).join('\n')}
      ------------------------------------------------------------
      Generated via VOIS GTM Persona View on ${new Date().toLocaleDateString()}
      ============================================================
    `;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `VOIS_GTM_Competitive_Briefing_DT_Group.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartData = revenueRecognition.monthlyData;

  const formattedSOWData = shareOfWallet.shareByCustomer.map(s => ({
    name: s.customer,
    VOIS: s.vois,
    'Competitor A': s.compA,
    'Competitor B': s.compB,
    'Other/Onshore': s.other
  }));

  const npsHistoryData = customerPerformance.npsHistory.map((val, idx) => ({
    month: `M${idx + 1}`,
    NPS: val
  }));

  return (
    <div className="space-y-4">
      {/* KPI GRID */}
      <section id="gtm-kpis" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement GTM.1">1</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide">Commercial Headline KPIs</h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">FY27 YTD · enriched from Salesforce + Finance + Delivery</p>
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

      {/* GTM.1 - PIPELINE & SALESFORCE FEED */}
      <section id="gtm-pipeline" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement GTM.1">GTM.1</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ GTM.1 · pipeline
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Enriched Salesforce Pipeline View
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Pipeline + linked finance &amp; delivery-risk signals · filter to top deals</p>
          </div>
        </div>

        <div className="space-y-4 pl-1">
          {/* Pipeline Stage Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
            {pipelineFunnel.stages.map((stage, i) => {
              const borderColors = ['border-slate-350', 'border-slate-450', 'border-rose-500', 'border-rose-700', 'border-emerald-500'];
              return (
                <div 
                  key={stage.stage} 
                  onClick={() => handlePipelineClick(stage)}
                  className={`bg-panel-2/50 border-l-4 ${borderColors[i % borderColors.length]} p-3 rounded-r-xl border border-y border-r border-panel-border hover:bg-panel-2 transition-all cursor-pointer flex flex-col justify-between`}
                >
                  <span className="text-[9.5px] font-bold text-ink-soft uppercase tracking-wider">{stage.stage}</span>
                  <span className="text-xl font-barlow font-black text-ink mt-1.5">€{stage.value}M</span>
                  <div className="flex justify-between items-center text-[9px] text-ink-soft mt-1">
                    <span>{stage.opps} opps</span>
                    <span className={stage.trend.includes('▲') ? 'text-emerald-500' : 'text-rose-500'}>{stage.trend}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Linked Cross-Functional Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-panel-2/40 border border-panel-border rounded-xl p-3.5">
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-wider flex items-center justify-between border-b border-panel-border pb-1.5 mb-2">
                <span>Linked Finance Signal</span>
                <span className="bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase px-1.5 py-0.5 rounded leading-none border border-amber-500/20">Rec. Revenue</span>
              </h5>
              <p className="text-[14px] font-barlow font-black text-amber-500">{pipelineFunnel.links.revenueRecognition.split('|')[0]}</p>
              <p className="text-[10px] text-ink-soft mt-1 leading-normal">{pipelineFunnel.links.revenueRecognition.split('|')[1]}</p>
            </div>
            <div className="bg-panel-2/40 border border-panel-border rounded-xl p-3.5">
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-wider flex items-center justify-between border-b border-panel-border pb-1.5 mb-2">
                <span>Linked Delivery Risk</span>
                <span className="bg-rose-500/10 text-rose-500 text-[8px] font-black uppercase px-1.5 py-0.5 rounded leading-none border border-rose-500/20">Top-10 Deals</span>
              </h5>
              <p className="text-[14px] font-barlow font-black text-rose-500">{pipelineFunnel.links.deliveryRisk.split('|')[0]}</p>
              <p className="text-[10px] text-ink-soft mt-1 leading-normal">{pipelineFunnel.links.deliveryRisk.split('|')[1]}</p>
            </div>
            <div className="bg-panel-2/40 border border-panel-border rounded-xl p-3.5">
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-wider flex items-center justify-between border-b border-panel-border pb-1.5 mb-2">
                <span>Linked HR Signal</span>
                <span className="bg-ink text-panel text-[8px] font-black uppercase px-1.5 py-0.5 rounded leading-none">Hiring Demand</span>
              </h5>
              <p className="text-[14px] font-barlow font-black text-ink">{pipelineFunnel.links.hrSignal.split('|')[0]}</p>
              <p className="text-[10px] text-ink-soft mt-1 leading-normal">{pipelineFunnel.links.hrSignal.split('|')[1]}</p>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["GTM.1"] && (
          null
        )}
      </section>

      {/* GTM.1.1 - REVENUE RECOGNITION VS TARGETS */}
      <section id="gtm-revrec" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement GTM.1.1">GTM.1.1</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ GTM.1.1 · revenue recognition
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Revenue Recognition vs Targets — Closed-Loop
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Sold deals ↔ recognised revenue over contract life · by deal &amp; aggregate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1">
          {/* Revenue recognition composed chart */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[9.5px] font-bold text-ink-soft uppercase tracking-widest mb-3 leading-none pl-1 border-l-2 border-accent">
                Projected (Sold) vs Actual Recognised Revenue — FY27 close
              </h5>
              
              <div className="h-48 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                    <XAxis dataKey="month" stroke="var(--ink-soft)" fontSize={9} tickLine={false} />
                    <YAxis stroke="var(--ink-soft)" fontSize={9} />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)' }} />
                    <Bar dataKey="projected" name="Projected (Sold) €M" fill="var(--panel-border)" radius={[2, 2, 0, 0]} />
                    <Area type="monotone" name="Recognised €M" dataKey="actual" fill="rgba(230,0,0,0.15)" stroke="#e60000" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex justify-between items-center text-[9.5px] text-ink-soft mt-3 bg-panel p-2 rounded border border-panel-border/50">
              <span className="font-semibold">Aggregate YTD: €1,881M recognized / €2,005M projected</span>
              <span className="font-black text-rose-500">Var: -€124M (-6.2%)</span>
            </div>
          </div>

          {/* Variance by Major Deal table */}
          <div className="border border-panel-border rounded-xl overflow-hidden bg-panel-2/30 flex flex-col justify-between">
            <div>
              <div className="bg-panel-2 border-b border-panel-border p-3 flex justify-between items-center">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">Variance by Major Deal</span>
                <span className="text-[9px] font-bold text-panel bg-ink px-2 py-0.5 uppercase tracking-widest">FINANCE + SF</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse min-w-[300px]">
                  <thead>
                    <tr className="bg-panel-2 border-b border-panel-border">
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9.5px]">Deal</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-right">Sold</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-right">Recognised</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-center">Variance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueRecognition.majorDeals.map((deal) => (
                      <tr 
                        key={deal.deal} 
                        onClick={() => handleVarianceClick(deal)}
                        className={`border-b border-panel-border/50 hover:bg-panel-2/20 cursor-pointer ${deal.deal.includes('Aggregate') ? 'bg-panel-2 font-bold' : ''}`}
                      >
                        <td className="p-2.5 text-ink">{deal.deal}</td>
                        <td className="p-2.5 text-right font-barlow font-bold text-ink">€{deal.sold}M</td>
                        <td className="p-2.5 text-right font-barlow font-bold text-ink">€{deal.recognised}M</td>
                        <td className="p-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold leading-none ${deal.variance < 0 ? 'bg-red-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {deal.variance}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["GTM.1.1"] && (
          null
        )}
      </section>

      {/* GTM.1.2 - TOP-10 DELIVERY RISK */}
      <section id="gtm-delivery" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement GTM.1.2">GTM.1.2</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ GTM.1.2 · delivery risk
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              ★ Top-10 Major-Deal Delivery Risk
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">SME quarterly inputs + weekly RAG from delivery leads</p>
          </div>
        </div>

        <div className="space-y-3 pl-1">
          <div className="border border-panel-border rounded-xl overflow-hidden bg-panel-2/30">
            <div className="bg-panel-2 border-b border-panel-border p-3 flex justify-between items-center">
              <span className="text-xs font-bold text-ink uppercase tracking-wider">Top 10 Deals · Above Revenue Threshold</span>
              <span className="text-[9px] font-bold text-panel bg-ink px-2 py-0.5 uppercase tracking-widest">SME-LED + DELIVERY RAG</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-panel-2 border-b border-panel-border">
                    <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center">#</th>
                    <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px]">Deal / Programme</th>
                    <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px]">Customer</th>
                    <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-right">Value</th>
                    <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center">RAG</th>
                    <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px]">Missed Milestones</th>
                    <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px]">SME-identified Risks</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryRisk.deals.map((deal) => {
                    const isRed = deal.rag === 'red';
                    const isAmber = deal.rag === 'amber';
                    const cellBg = isRed ? 'bg-red-500/10 text-rose-500' : isAmber ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500';
                    return (
                      <tr 
                        key={deal.rank} 
                        onClick={() => handleDeliveryRiskClick(deal)}
                        className="border-b border-panel-border/50 hover:bg-panel-2/20 cursor-pointer"
                      >
                        <td className="p-2.5 font-barlow font-black text-center text-ink text-base">{deal.rank}</td>
                        <td className="p-2.5">
                          <span className="font-bold text-ink block">{deal.deal}</span>
                          <span className="text-[10px] text-ink-soft italic font-light">{deal.meta}</span>
                        </td>
                        <td className="p-2.5 text-ink">{deal.customer}</td>
                        <td className="p-2.5 text-right font-barlow font-bold text-ink">{deal.value}</td>
                        <td className="p-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${cellBg}`}>
                            {deal.rag}
                          </span>
                        </td>
                        <td className="p-2.5 text-ink-soft font-medium">{deal.milestones}</td>
                        <td className="p-2.5 text-ink-soft leading-normal">{deal.risks}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="bg-panel-2 border-t border-panel-border p-3 flex justify-between items-center text-[10px] text-ink-soft">
              <div className="flex gap-4">
                <span><span className="bg-ink text-panel px-1 py-0.5 rounded font-black text-[8px] uppercase tracking-wider mr-1">SME</span> Quarterly risk population</span>
                <span><span className="bg-ink text-panel px-1 py-0.5 rounded font-black text-[8px] uppercase tracking-wider mr-1">DELIVERY LEAD</span> Weekly RAG comments</span>
              </div>
              <span className="font-semibold text-ink">{deliveryRisk.footerText}</span>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["GTM.1.2"] && (
          null
        )}
      </section>

      {/* GTM.2 - SERVICE OFFERINGS ROADMAP */}
      <section id="gtm-offerings" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement GTM.2">GTM.2</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ GTM.2 · service offerings
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Service Offering Roadmap — Per Tower
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">New &amp; evolving offerings · milestone status · sourced from Horizon 2</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pl-1">
          {serviceOfferings.map((t) => (
            <div key={t.tower} className="border border-panel-border rounded-xl overflow-hidden bg-panel-2/30">
              <div className="bg-panel-2 border-b border-panel-border p-2.5 font-black text-ink text-[11px] uppercase tracking-wider text-center">
                {t.tower}
              </div>
              <div className="p-3.5 space-y-3.5">
                {t.offerings.map((off) => (
                  <div 
                    key={off.name} 
                    onClick={() => handleOfferingClick(t.tower, off)}
                    className="border-b border-panel-border/30 last:border-none pb-3 last:pb-0 space-y-1.5 cursor-pointer hover:bg-panel-2/10 rounded transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-ink leading-tight">{off.name}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[7.5px] font-black uppercase leading-none ${off.status === 'live' ? 'bg-emerald-500/20 text-emerald-500' : off.status === 'beta' ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-500/20 text-slate-500'}`}>
                        {off.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-ink-soft leading-normal font-light">{off.desc}</p>
                    <span className="text-[9px] font-semibold text-accent block leading-none">{off.milestone}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {showAnnotations && annotations["GTM.2"] && (
          null
        )}
      </section>

      {/* GTM.3 - SHARE OF WALLET */}
      <section id="gtm-wallet" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement GTM.3">GTM.3</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ GTM.3 · share of wallet
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Share of Wallet / Market Opportunity
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">VOIS penetration vs external competitors · upsell opportunity heatmap</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1">
          {/* Share of wallet stacked horizontal bar chart */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <div>
              <h5 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest mb-3 leading-none pl-1 border-l-2 border-accent">
                VOIS Penetration by Key Account — Spend Share %
              </h5>
              
              <div className="h-48 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formattedSOWData} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                    <XAxis type="number" stroke="var(--ink-soft)" fontSize={9} />
                    <YAxis dataKey="name" type="category" stroke="var(--ink-soft)" fontSize={9} tickLine={false} />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)' }} />
                    <Bar dataKey="VOIS" stackId="a" fill="#e60000" />
                    <Bar dataKey="Competitor A" stackId="a" fill="#5a0006" />
                    <Bar dataKey="Competitor B" stackId="a" fill="#8c7878" />
                    <Bar dataKey="Other/Onshore" stackId="a" fill="#cba8a8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-center text-[9px] text-ink-soft mt-3 bg-panel p-2 rounded border border-panel-border/50 flex-wrap">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e60000]" /> VOIS Share</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#5a0006]" /> Competitor A</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#8c7878]" /> Competitor B</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#cba8a8]" /> Other / Onshore</span>
            </div>
          </div>

          {/* SOW Opportunities */}
          <div className="border border-panel-border rounded-xl overflow-hidden bg-panel-2/30 flex flex-col justify-between">
            <div>
              <div className="bg-panel-2 border-b border-panel-border p-3 flex justify-between items-center">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">Upsell Opportunities to Grow Share</span>
                <span className="text-[9px] font-bold text-panel bg-ink px-2 py-0.5 uppercase tracking-widest">GROWTH METRIC</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse min-w-[300px]">
                  <thead>
                    <tr className="bg-panel-2 border-b border-panel-border">
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9.5px]">Account · Service</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-right">Value</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-right">VOIS %</th>
                      <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9.5px] text-center">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shareOfWallet.opportunities.map((opp, idx) => (
                      <tr 
                        key={idx} 
                        onClick={() => handleOpportunityClick(opp)}
                        className="border-b border-panel-border/50 hover:bg-panel-2/20 cursor-pointer"
                      >
                        <td className="p-2.5 font-semibold text-ink">
                          {opp.customer} <span className="text-ink-soft font-normal text-[10px]">· {opp.service}</span>
                        </td>
                        <td className="p-2.5 text-right font-barlow font-bold text-ink">€{opp.value}M</td>
                        <td className="p-2.5 text-right font-barlow font-bold text-ink-soft">{opp.voisPercent}%</td>
                        <td className="p-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-wide leading-none ${opp.type === 'UPSELL' ? 'bg-emerald-500/10 text-emerald-500' : opp.type === 'CROSS' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            {opp.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-3 text-[10px] text-ink-soft font-light bg-panel-2 border-t border-panel-border italic">
              *Competitor data sourced from Paid Aggregators. Sizing maps to active RFPs.
            </div>
          </div>
        </div>

        {showAnnotations && annotations["GTM.3"] && (
          null
        )}
      </section>

      {/* GTM.4 - CUSTOMER PERFORMANCE */}
      <section id="gtm-customers" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement GTM.4">GTM.4</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ GTM.4 · customer story
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Customer Satisfaction &amp; Delivery Risks — One Story
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">NPS + MMD problem jobs + service-impacting incidents · ready for meetings</p>
          </div>
        </div>

        <div className="space-y-4 pl-1">
          {/* Customer Selector Header */}
          <div className="bg-panel-2/60 p-3 rounded-xl border border-panel-border flex justify-between items-center">
            <div className="flex items-center gap-2 leading-none">
              <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider">SELECTED CUSTOMER:</span>
              <select 
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="bg-panel text-ink text-xs font-bold px-2 py-1 rounded border border-panel-border"
              >
                <option value="DT Group">DT Group</option>
                <option value="Vfz Group">Vfz Group</option>
                <option value="UKG">UKG</option>
              </select>
            </div>
            <span className="text-[9.5px] font-bold text-panel bg-ink px-2 py-0.5 uppercase tracking-widest">MEETING-READY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* NPS trend line chart */}
            <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
              <div>
                <h6 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5 mb-2.5 flex justify-between items-center">
                  <span>NPS Trend (Rolling 12m)</span>
                  <span className="text-emerald-500">+{customerPerformance.nps} (▲ {customerPerformance.npsDelta})</span>
                </h6>
                <div className="h-32 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={npsHistoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                      <XAxis dataKey="month" stroke="var(--ink-soft)" fontSize={9} />
                      <YAxis stroke="var(--ink-soft)" fontSize={9} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)' }} />
                      <Area type="monotone" dataKey="NPS" fill="rgba(230,0,0,0.1)" stroke="#e60000" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <p className="text-[9.5px] text-ink-soft leading-normal font-light mt-2 bg-panel p-2 rounded border border-panel-border/50">
                12 months of survey responses · promoter share <b>62%</b> · detractors <b>8%</b>. Trajectory positive.
              </p>
            </div>

            {/* Open Problem Jobs */}
            <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
              <div>
                <h6 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5 mb-2">
                  Open Problem Jobs (MMD) &amp; Incidents
                </h6>
                <div className="space-y-2.5">
                  {customerPerformance.problems.map((prob) => (
                    <div key={prob.name} className="border-b border-panel-border/30 last:border-none pb-2 last:pb-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-ink text-[11px] leading-tight">{prob.name}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[7.5px] font-black uppercase leading-none ${prob.rag === 'P1' ? 'bg-red-500/20 text-rose-500' : 'bg-amber-500/20 text-amber-500'}`}>
                          {prob.rag}
                        </span>
                      </div>
                      <p className="text-[10px] text-ink-soft font-light leading-normal">{prob.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Story synthesis */}
            <div className="border border-panel-border rounded-xl p-3.5 bg-panel border-l-4 border-l-accent flex flex-col justify-between">
              <div>
                <h6 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5 mb-2 flex items-center gap-1.5">
                  <Sparkles size={11} className="text-accent" />
                  <span>Customer Story — AI Synthesis</span>
                </h6>
                <p className="text-[11px] text-ink-soft leading-relaxed font-light mt-1">
                  <b>{selectedCustomer}</b> remains a strong promoter (NPS +{customerPerformance.nps}, ▲ {customerPerformance.npsDelta} vs prior month). Service health is rated green overall and engagement-lead sentiment is positive.
                </p>
                <p className="text-[11px] text-ink-soft leading-relaxed font-light mt-2">
                  <b>Pressure points to acknowledge:</b> recurring EU billing-batch latency and Tier-3 onshore staffing gap which is feeding ServiceNow backlogs.
                </p>
              </div>
              <span className="text-[8.5px] text-muted-text mt-3 font-semibold uppercase block leading-none tracking-wider">
                Refreshed hourly ahead of CEO Connect
              </span>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["GTM.4"] && (
          null
        )}
      </section>

      {/* GTM.5 - COMPETITIVE POSITIONING */}
      <section id="gtm-competitive" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement GTM.5">GTM.5</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ GTM.5 · competitive positioning
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Competitive Positioning — AI Brief
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Public sources + paid aggregators · brief ahead of major customer meetings</p>
          </div>
        </div>

        <div className="space-y-4 pl-1">
          {/* Brief header banner */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 rounded-xl text-panel flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="text-sm font-bold tracking-wide uppercase">
                Competitor Brief: Chris · Meeting DT Group
              </h4>
              <p className="text-[9px] text-panel-2 font-medium tracking-widest uppercase mt-0.5">
                Target Date: 28 Mar close · Refreshed daily
              </p>
            </div>
            <button 
              onClick={handleDownloadBriefing}
              className="bg-panel text-ink hover:opacity-90 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer flex items-center gap-1.5 leading-none"
            >
              <Download size={11} /> Download Briefing Brief
            </button>
          </div>

          {/* Competitor cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Competitor A */}
            <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
              <div>
                <h6 className="text-[11px] font-bold text-ink uppercase tracking-wider mb-2.5 flex justify-between items-center border-b border-panel-border pb-1.5 leading-none">
                  <span>{competitiveBrief.compA.name}</span>
                  <span className="text-rose-500 font-barlow font-black text-xs uppercase tracking-widest">Down Trend ▼</span>
                </h6>
                <div className="space-y-2">
                  {competitiveBrief.compA.signals.map((sig, idx) => (
                    <p key={idx} className="text-[10px] text-ink-soft leading-normal font-light border-l border-panel-border/80 pl-2">
                      {sig}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Competitor B */}
            <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
              <div>
                <h6 className="text-[11px] font-bold text-ink uppercase tracking-wider mb-2.5 flex justify-between items-center border-b border-panel-border pb-1.5 leading-none">
                  <span>{competitiveBrief.compB.name}</span>
                  <span className="text-emerald-500 font-barlow font-black text-xs uppercase tracking-widest">Up Trend ▲</span>
                </h6>
                <div className="space-y-2">
                  {competitiveBrief.compB.signals.map((sig, idx) => (
                    <p key={idx} className="text-[10px] text-ink-soft leading-normal font-light border-l border-panel-border/80 pl-2">
                      {sig}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Brief */}
            <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
              <div>
                <h6 className="text-[11px] font-bold text-ink uppercase tracking-wider mb-2.5 flex justify-between items-center border-b border-panel-border pb-1.5 leading-none">
                  <span>{competitiveBrief.customer.name} Context</span>
                  <span className="text-slate-500 font-barlow font-black text-xs uppercase tracking-widest">Steady —</span>
                </h6>
                <div className="space-y-2">
                  {competitiveBrief.customer.signals.map((sig, idx) => (
                    <p key={idx} className="text-[10px] text-ink-soft leading-normal font-light border-l border-panel-border/80 pl-2">
                      {sig}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["GTM.5"] && (
          null
        )}
      </section>
    </div>
  );
};
