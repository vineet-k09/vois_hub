import React from 'react';
import { ExternalLink, Ban } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import financeData from '../data/finance_data.json';
import AnnotationCard from './AnnotationCard';

interface FinanceDashboardProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

export const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ onDrillDown, showAnnotations }) => {
  const { kpis, riskHeatmap, revenueAtRisk, costAtRisk, pqSummary, annotations } = financeData;

  const COLORS = ['#e60000', '#b8000a', '#5a0006', '#8c7878', '#cba8a8'];

  const handleKPIClick = (kpi: any) => {
    onDrillDown({
      ...kpi,
      type: 'kpi',
      label: kpi.label,
      requirementId: '10',
      summary: `Finance KPI ${kpi.label} is currently valued at ${kpi.value} vs target of ${kpi.target || 'N/A'}. Trend: ${kpi.trend}. RAG status: ${kpi.rag.toUpperCase()}.`,
      nextStep: `Verify monthly forecasting metrics in Sarah's central system`,
      owner: `Sarah Connor (Finance Director)`,
      metrics: [
        { label: "Value", val: kpi.value, status: kpi.rag === 'green' ? 'Favorable' : 'Action Set' },
        { label: "Target / Baseline", val: kpi.target || 'N/A', status: 'Baseline' },
        { label: "Trend Indicator", val: kpi.trend, status: 'Indicator' }
      ]
    });
  };

  const handleHeatmapCellClick = (row: any, field: string, val: string, desc: string, rag: string) => {
    onDrillDown({
      type: 'exception',
      label: `Risk Signal: ${row.portfolio} (${field.toUpperCase()})`,
      requirementId: '10',
      rag,
      summary: `Cross-functional risk signal mapped to portfolio ${row.portfolio} under ${field.toUpperCase()} dimension. Valued as ${val}. Detail: ${desc}.`,
      nextStep: `Convene with corresponding delivery lead to review operational forecast impact`,
      owner: `Sarah Connor (Finance Director)`,
      metrics: [
        { label: "Status", val: val, status: rag.toUpperCase() },
        { label: "Portfolio Affected", val: row.portfolio, status: 'Active' },
        { label: "Detail Description", val: desc, status: 'Context' }
      ]
    });
  };

  const handleContractClick = (contract: any) => {
    onDrillDown({
      type: 'exception',
      label: `Revenue at Risk: ${contract.deal}`,
      requirementId: '10',
      rag: contract.rag,
      summary: `Contract ${contract.deal} for customer ${contract.customer} is in the last 6 months of its lifecycle (expires in ${contract.expiryDays} days) without a confirmed auto-renewal flag. Exposure value: €${contract.value}M.`,
      nextStep: `Initiate urgent renewal alignment with CCO and DT Group account manager`,
      owner: `Sarah Connor (Finance Director)`,
      metrics: [
        { label: "Contract Value", val: `€${contract.value}M`, status: contract.risk === 'High' ? 'Critical' : 'Watch' },
        { label: "Days to Expiry", val: `${contract.expiryDays} days`, status: 'Urgent' },
        { label: "Auto-Renew Status", val: contract.autoRenew, status: 'Pending' }
      ]
    });
  };

  const handleCostClick = (project: any) => {
    onDrillDown({
      type: 'exception',
      label: `Cost at Risk: ${project.project}`,
      requirementId: '10',
      rag: project.rag,
      summary: `Project cost-at-risk analysis for ${project.project}. Current burn is at ${project.burn}% against physical project completion of ${project.completion}%. Verdict: ${project.verdict}.`,
      nextStep: `Run detailed review on платформу refresh deliverables and check for overspend causes`,
      owner: `Sarah Connor (Finance Director)`,
      metrics: [
        { label: "Burn Percentage", val: `${project.burn}%`, status: 'Over Burn' },
        { label: "Completion Rate", val: `${project.completion}%`, status: 'Progress' },
        { label: "Forecast Variance", val: `${project.burn - project.completion}pp gap`, status: project.rag === 'red' ? 'Critical' : 'Watch' }
      ]
    });
  };

  const handlePQMixClick = (data: any) => {
    onDrillDown({
      type: 'kpi',
      label: `P×Q Service Mix: ${data.type}`,
      requirementId: '11',
      summary: `Service type mix L1 category preview for ${data.type}. Value tracking at €${data.value}M which accounts for ${data.pct}% of high-level PQ marketplace revenue.`,
      nextStep: `Drill through to PQ Marketplace Dashboard for L2/L3 invoices detail`,
      owner: `Sarah Connor (Finance Director)`,
      metrics: [
        { label: "Service Share", val: `${data.pct}%`, status: 'L1 Category' },
        { label: "Invoiced Revenue", val: `€${data.value}M`, status: 'Green' }
      ]
    });
  };

  const formattedBurnData = costAtRisk.map(c => ({
    name: c.project.replace('OpEx — ', '').replace('CapEx — ', ''),
    'Burn %': c.burn,
    'Completion %': c.completion
  }));

  const pieData = pqSummary.mix.map(m => ({
    name: m.type,
    value: m.value,
    pct: m.pct
  }));

  return (
    <div className="space-y-4">
      {/* KPI GRID SECTION */}
      <section id="finance-kpis" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement #10">10</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide">Financial Headline KPIs</h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5"> Sarah's core financial control reporting closes</p>
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

      {/* REQ 10 - CROSS-FUNCTIONAL RISK VIEW */}
      <section id="finance-risk" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement #10">10</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ 10 · Cross-Functional Risk View
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              Cross-Functional Risk View — OpsAnalytics · CapEx · Revenue
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Non-finance signals affecting Sarah's forecasts · heatmap / RAG</p>
          </div>
        </div>

        <div className="space-y-4 pl-1">
          {/* Heatmap Table */}
          <div className="border border-panel-border rounded-xl overflow-hidden bg-panel-2/30">
            <div className="bg-panel-2 border-b border-panel-border p-3 flex justify-between items-center">
              <span className="text-xs font-bold text-ink uppercase tracking-wider">Risk Heatmap — Signals by Portfolio</span>
              <span className="text-[9px] font-bold text-panel bg-ink px-2 py-0.5 uppercase tracking-widest">CROSS-FUNCTIONAL</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-panel-2 border-b border-panel-border">
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9px] w-1/4">Portfolio</th>
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center w-1/5">HR / Headcount</th>
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center w-1/5">Pipeline Demand</th>
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center w-1/5">Operational Forecast</th>
                    <th className="p-3 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center w-1/5">Contract Lifecycle</th>
                  </tr>
                </thead>
                <tbody>
                  {riskHeatmap.map((row) => (
                    <tr key={row.portfolio} className="border-b border-panel-border/50 hover:bg-panel-2/20">
                      <td className="p-3 border-r border-panel-border/30">
                        <span className="font-bold text-ink block">{row.portfolio}</span>
                        <span className="text-[10px] text-ink-soft italic font-light">{row.subtitle}</span>
                      </td>
                      {['hr', 'pipeline', 'operations', 'contract'].map((key) => {
                        const cell = (row as any)[key];
                        const cellRag = cell.rag;
                        const cellBg = cellRag === 'green' ? 'bg-emerald-500/10 text-emerald-500' : cellRag === 'amber' ? 'bg-amber-500/10 text-amber-500' : cellRag === 'red' ? 'bg-rose-500/10 text-rose-500' : 'bg-panel-2 text-ink-soft';
                        return (
                          <td 
                            key={key} 
                            onClick={() => handleHeatmapCellClick(row, key, cell.val, cell.desc, cell.rag)}
                            className={`p-3 text-center border-r border-panel-border/30 cursor-pointer ${cellBg} transition-all`}
                          >
                            <span className="font-bold uppercase tracking-wider text-[10px] block">{cell.val}</span>
                            <span className="text-[9px] block mt-0.5 font-medium leading-tight">{cell.desc}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Revenue at Risk table */}
            <div className="border border-panel-border rounded-xl overflow-hidden bg-panel-2/30 flex flex-col justify-between">
              <div>
                <div className="bg-panel-2 border-b border-panel-border p-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-ink uppercase tracking-wider">Revenue at Risk — Lifecycles &lt; 6 Months</span>
                  <span className="text-[9px] font-bold text-panel bg-ink px-2 py-0.5 uppercase tracking-widest">NEW LENS</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse min-w-[350px]">
                    <thead>
                      <tr className="bg-panel-2 border-b border-panel-border">
                        <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px]">Contract</th>
                        <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px]">Customer</th>
                        <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-right">Value</th>
                        <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center">Days</th>
                        <th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-[9px] text-center">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueAtRisk.map((c) => (
                        <tr 
                          key={c.deal} 
                          onClick={() => handleContractClick(c)}
                          className="border-b border-panel-border/50 hover:bg-panel-2/20 cursor-pointer"
                        >
                          <td className="p-2.5 font-semibold text-ink">{c.deal}</td>
                          <td className="p-2.5 text-ink-soft">{c.customer}</td>
                          <td className="p-2.5 text-right font-bold text-ink">€{c.value}M</td>
                          <td className="p-2.5 text-center font-bold text-ink">{c.expiryDays}</td>
                          <td className="p-2.5 text-center">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${c.risk === 'High' ? 'bg-red-500/20 text-rose-500 border border-red-500/30' : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'}`}>
                              {c.risk}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Cost at Risk - Burn vs Completion charts */}
            <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Cost at Risk — Burn vs Project Completion %</span>
                  <span className="text-[8px] font-bold bg-ink text-panel px-2 py-0.5 tracking-wider uppercase">PROJECT LIFECYCLE</span>
                </h4>
                
                <div className="h-44 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formattedBurnData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                      <XAxis dataKey="name" stroke="var(--ink-soft)" fontSize={9} tickLine={false} />
                      <YAxis stroke="var(--ink-soft)" fontSize={9} unit="%" />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)' }} />
                      <Bar dataKey="Burn %" fill="#e60000" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Completion %" fill="#16a34a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-2 mt-3">
                {costAtRisk.map((p) => (
                  <div 
                    key={p.project} 
                    onClick={() => handleCostClick(p)}
                    className="flex justify-between items-center text-[10.5px] p-2 bg-panel rounded-lg border border-panel-border/70 hover:bg-panel-2 cursor-pointer transition-colors"
                  >
                    <span className="font-semibold text-ink">{p.project}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-ink-soft">Burn {p.burn}% vs Comp {p.completion}%</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${p.rag === 'green' ? 'bg-emerald-500/15 text-emerald-500' : p.rag === 'amber' ? 'bg-amber-500/15 text-amber-500' : 'bg-red-500/15 text-rose-500'}`}>
                        {p.rag === 'green' ? 'On Plan' : p.rag === 'amber' ? 'Overspent' : 'Critical'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showAnnotations && annotations["10"] && (
          <AnnotationCard
            id="10"
            title={annotations["10"].title}
            status={annotations["10"].status}
            description={annotations["10"].description}
            acceptanceCriteria={annotations["10"].acceptanceCriteria}
            userStory={annotations["10"].userStory}
            dependencies={annotations["10"].dependencies}
            feedback={annotations["10"].feedback}
          />
        )}
      </section>

      {/* REQ 11 - PXQ / BILLING INTEGRATION */}
      <section id="finance-pq" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement #11">11</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ 11 · P×Q / Billing Integration
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              P×Q / Billing Integration — Partnership Success Lens
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">High-level on Hub · drill-through to PQ marketplace dashboard for L1/L2/L3 detail</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pl-1">
          {/* High level KPIs */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30">
            <h5 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5 mb-2.5">
              High-Level KPIs
            </h5>
            <div className="space-y-2">
              {pqSummary.kpis.map((k, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] py-1 border-b border-panel-border/30 last:border-none">
                  <span className="text-ink-soft font-medium">{k.label}</span>
                  <span className={`font-barlow font-bold text-sm ${k.rag === 'green' ? 'text-emerald-500' : 'text-ink'}`}>{k.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recharts Pie Chart of Tower mix */}
          <div className="border border-panel-border rounded-xl p-3.5 bg-panel-2/30 flex flex-col justify-between">
            <h5 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1.5 mb-1">
              Service-Type Mix (L1 categories)
            </h5>
            
            <div className="flex items-center gap-3">
              <div className="h-32 w-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={45}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                          className="cursor-pointer outline-none"
                          onClick={() => handlePQMixClick(entry)}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 text-[10px] flex-1">
                {pqSummary.mix.map((m, idx) => (
                  <div 
                    key={m.type} 
                    onClick={() => handlePQMixClick(m)}
                    className="flex justify-between items-center py-0.5 border-b border-panel-border/30 cursor-pointer hover:bg-panel-2 rounded px-1"
                  >
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="font-semibold">{m.type}</span>
                    </span>
                    <span className="text-ink font-semibold">€{m.value}M ({m.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drill-through Link Box */}
          <div className="border border-panel-border rounded-xl p-5 bg-gradient-to-br from-panel-2 to-panel-2/40 flex flex-col justify-between text-center items-center">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">PQ Marketplace Dashboard</h4>
              <p className="text-[10px] text-ink-soft font-light leading-relaxed">
                Full L1 · L2 · L3 service-type breakdown, market-specific views, and invoice-level detail. Context preserved on click-through.
              </p>
            </div>
            <button 
              onClick={() => alert('Opening PQ Marketplace Dashboard... Context ( Sarah / Finance / FY27 YTD ) successfully transferred.')}
              className="mt-4 flex items-center gap-1.5 bg-ink text-panel px-4 py-2 rounded-xl text-[10px] font-bold uppercase hover:opacity-90 transition-all cursor-pointer leading-none"
            >
              Open Dashboard <ExternalLink size={10} />
            </button>
            <span className="text-[8px] text-muted-text mt-2 font-medium">SSO Integration Active</span>
          </div>
        </div>

        {showAnnotations && annotations["11"] && (
          <AnnotationCard
            id="11"
            title={annotations["11"].title}
            status={annotations["11"].status}
            description={annotations["11"].description}
            acceptanceCriteria={annotations["11"].acceptanceCriteria}
            userStory={annotations["11"].userStory}
            dependencies={annotations["11"].dependencies}
            feedback={annotations["11"].feedback}
          />
        )}
      </section>

      {/* REQ 9 - BASIC REPORTING RELIABILITY (PARKED) */}
      <section id="finance-gov" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="req-pin" title="Requirement #9">9</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ 09 · Basic Reporting Reliability
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              REQ 09 ★ Basic Reporting Reliability — Parked
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">Handed to data-governance workstream under the broader Ether programme</p>
          </div>
        </div>

        <div className="bg-panel-2/50 border border-panel-border rounded-xl p-5 pl-1 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-500/10 text-slate-500 flex items-center justify-center font-bold text-xl shrink-0 mt-0.5">
            <Ban size={18} />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
              <span>Not tracked as a VOIS Hub requirement</span>
              <span className="bg-slate-500 text-panel text-[8px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded">PARKED — ETHER PROGRAMME</span>
            </h4>
            <p className="text-[11px] text-ink-soft font-light leading-relaxed">
              Data reliability of monthly / quarterly / annual reporting cycles is a fundamental <b>data-governance and business-process</b> issue (HR ↔ Finance reconciliation, headcount mastership) — not a reporting one. The Hub will remain the single-source-of-truth landing place and will surface the canonical view (or multiple views with explanation) once upstream governance fixes are made.
            </p>
          </div>
        </div>

        {showAnnotations && annotations["9"] && (
          <AnnotationCard
            id="9"
            title={annotations["9"].title}
            status={annotations["9"].status}
            description={annotations["9"].description}
            acceptanceCriteria={annotations["9"].acceptanceCriteria}
            userStory={annotations["9"].userStory}
            dependencies={annotations["9"].dependencies}
            feedback={annotations["9"].feedback}
          />
        )}
      </section>
    </div>
  );
};
