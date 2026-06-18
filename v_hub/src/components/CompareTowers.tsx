import React, { useState } from 'react';
import { Sparkles, User, ClipboardList } from 'lucide-react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend 
} from 'recharts';

interface CompareTowersProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

const towerData: Record<string, {
  name: string;
  role: string;
  leader: string;
  kpis: { label: string; val: string; status: string; desc: string }[];
  radarStats: { subject: string; A: number; fullMark: number }[];
  monthlyPerformance: { month: string; value: number }[];
  strategicBrief: string;
  actionItems: string[];
}> = {
  Overall: {
    name: "Overall VOIS Group",
    role: "Global Shared Services Group",
    leader: "Gary (Group CEO)",
    kpis: [
      { label: "Total Revenue / Run-rate", val: "€2,858M", status: "green", desc: "Stable top-line revenue growth of +1.53% YoY" },
      { label: "Total Cost Takeout", val: "€141.62M", status: "amber", desc: "Ahead of schedule vs €102M target; offset by ops" },
      { label: "Overall FTE Headcount", val: "24,850 FTE", status: "green", desc: "Capacity optimization in digital delivery centers" },
      { label: "Group NPS Score", val: "+42", status: "green", desc: "Strong customer feedback across DT Group & partners" },
      { label: "SLA Adherence Rate", val: "99.4%", status: "green", desc: "Consistently above the 99% baseline service agreement" }
    ],
    radarStats: [
      { subject: 'Financial Health', A: 85, fullMark: 100 },
      { subject: 'Talent Retention', A: 78, fullMark: 100 },
      { subject: 'Delivery Quality', A: 92, fullMark: 100 },
      { subject: 'Transformation', A: 80, fullMark: 100 },
      { subject: 'Pipeline Speed', A: 82, fullMark: 100 }
    ],
    monthlyPerformance: [
      { month: 'Oct-25', value: 82 },
      { month: 'Nov-25', value: 83 },
      { month: 'Dec-25', value: 81 },
      { month: 'Jan-26', value: 84 },
      { month: 'Feb-26', value: 85 },
      { month: 'Mar-26', value: 85 }
    ],
    strategicBrief: "VOIS Group continues to demonstrate overall resilience. Digital expansion targets are meeting objectives, but cost overruns in select delivery towers present EBITDA headwind.",
    actionItems: [
      "Approve Group-level resource allocations for FY27 Planning",
      "Reconcile Salesforce Horizon-2 pipeline tagging exceptions"
    ]
  },
  Finance: {
    name: "Finance & Portfolio Tower",
    role: "Financial Governance & Forecasts",
    leader: "Sarah Connor (Finance Director)",
    kpis: [
      { label: "Revenue Mapped", val: "€2,858M", status: "green", desc: "100% sync with Sarah's central database" },
      { label: "Cost Burn vs Plan", val: "134% / 81%", status: "red", desc: "Operations overshoot in BAU and CapEx slipping" },
      { label: "Tower FTE Headcount", val: "1,240 FTE", status: "green", desc: "FTE allocation optimized for audit operations" },
      { label: "Portfolio Risk Rating", val: "Amber", status: "amber", desc: "Muted variance in cost takeout and contract slip" },
      { label: "SLA Adherence Rate", val: "99.8%", status: "green", desc: "Reporting SLA met with zero late closing cycles" }
    ],
    radarStats: [
      { subject: 'Financial Health', A: 68, fullMark: 100 },
      { subject: 'Talent Retention', A: 84, fullMark: 100 },
      { subject: 'Delivery Quality', A: 99, fullMark: 100 },
      { subject: 'Transformation', A: 75, fullMark: 100 },
      { subject: 'Pipeline Speed', A: 70, fullMark: 100 }
    ],
    monthlyPerformance: [
      { month: 'Oct-25', value: 78 },
      { month: 'Nov-25', value: 76 },
      { month: 'Dec-25', value: 72 },
      { month: 'Jan-26', value: 74 },
      { month: 'Feb-26', value: 70 },
      { month: 'Mar-26', value: 72 }
    ],
    strategicBrief: "Finance tower focus is on resolving the €36.33M EBITDA pressure via active expense gates and checking cost allocation models across OpsAnalytics and CapEx.",
    actionItems: [
      "Convene Finance monthly review to audit Operations cost takeout",
      "Audit contract value realization for secondary delivery sites"
    ]
  },
  GTM: {
    name: "GTM Commercial Tower",
    role: "Sales, Pipeline & Delivery Risks",
    leader: "Chris (GTM Director)",
    kpis: [
      { label: "Qualified Pipeline", val: "€1,359M", status: "green", desc: "On track to hit sales targets for Horizon-2" },
      { label: "Win Conversion Rate", val: "62%", status: "green", desc: "+3.2pp increase month-on-month" },
      { label: "Tower FTE Headcount", val: "3,120 FTE", status: "amber", desc: "Sales support roles under-resourced in Tier-3" },
      { label: "Active Delivery Risks", val: "3 Red / 4 Amber", status: "red", desc: "Customer account margin pressures and delivery slip" },
      { label: "SLA Adherence Rate", val: "98.7%", status: "amber", desc: "ServiceNow incident slip on billing integrations" }
    ],
    radarStats: [
      { subject: 'Financial Health', A: 88, fullMark: 100 },
      { subject: 'Talent Retention', A: 72, fullMark: 100 },
      { subject: 'Delivery Quality', A: 82, fullMark: 100 },
      { subject: 'Transformation', A: 85, fullMark: 100 },
      { subject: 'Pipeline Speed', A: 94, fullMark: 100 }
    ],
    monthlyPerformance: [
      { month: 'Oct-25', value: 80 },
      { month: 'Nov-25', value: 82 },
      { month: 'Dec-25', value: 85 },
      { month: 'Jan-26', value: 89 },
      { month: 'Feb-26', value: 91 },
      { month: 'Mar-26', value: 92 }
    ],
    strategicBrief: "GTM is showing healthy sales velocity and pipeline size, but execution bottlenecks and missed billing milestones are impacting revenue recognition projections.",
    actionItems: [
      "Reconcile Salesforce tagging alignment with commercial leads",
      "Trigger mitigation connects for high-risk accounts in GTM review"
    ]
  },
  HR: {
    name: "HR & Talent Tower",
    role: "People, Spirit & Skill Development",
    leader: "Sima (HR Director)",
    kpis: [
      { label: "Spirit Beat Score", val: "85", status: "green", desc: "Strong employee engagement, above global benchmark" },
      { label: "Talent Promotions", val: "24.6%", status: "green", desc: "Favorable career progression rates in tech hubs" },
      { label: "Tower FTE Headcount", val: "1,450 FTE", status: "green", desc: "Full capacity, resourcing targets achieved" },
      { label: "Attrition Hotspots", val: "2 High Risk", status: "amber", desc: "Elevated attrition in Tier-3 support roles" },
      { label: "L&D Adoption Rate", val: "80%", status: "amber", desc: "Up-skilling programs running 5pp below target" }
    ],
    radarStats: [
      { subject: 'Financial Health', A: 80, fullMark: 100 },
      { subject: 'Talent Retention', A: 90, fullMark: 100 },
      { subject: 'Delivery Quality', A: 88, fullMark: 100 },
      { subject: 'Transformation', A: 92, fullMark: 100 },
      { subject: 'Pipeline Speed', A: 75, fullMark: 100 }
    ],
    monthlyPerformance: [
      { month: 'Oct-25', value: 84 },
      { month: 'Nov-25', value: 85 },
      { month: 'Dec-25', value: 86 },
      { month: 'Jan-26', value: 85 },
      { month: 'Feb-26', value: 87 },
      { month: 'Mar-26', value: 88 }
    ],
    strategicBrief: "HR is focusing on retention strategies for high-attrition geographics, and aligning upskilling initiatives with emerging technology roadmaps.",
    actionItems: [
      "Launch target retention package for tech hubs",
      "Deploy custom training modules for horizontal towers"
    ]
  }
};

export const CompareTowers: React.FC<CompareTowersProps> = ({ onDrillDown }) => {
  const [towerA, setTowerA] = useState<string>('Overall');
  const [towerB, setTowerB] = useState<string>('GTM');

  const dataA = towerData[towerA] || towerData.Overall;
  const dataB = towerData[towerB] || towerData.GTM;

  // Format Radar Data
  const formatRadarData = () => {
    return dataA.radarStats.map((stat, i) => {
      const bStat = dataB.radarStats[i] || { A: 0 };
      const oStat = towerData.Overall.radarStats[i] || { A: 0 };
      return {
        subject: stat.subject,
        [dataA.name]: stat.A,
        [dataB.name]: bStat.A,
        'Group Baseline': oStat.A,
        fullMark: 100,
      };
    });
  };

  // Format Composed Monthly Chart Data
  const formatChartData = () => {
    return dataA.monthlyPerformance.map((item, i) => {
      const bItem = dataB.monthlyPerformance[i] || { value: 0 };
      const oItem = towerData.Overall.monthlyPerformance[i] || { value: 0 };
      return {
        month: item.month,
        [dataA.name]: item.value,
        [dataB.name]: bItem.value,
        'Group Baseline': oItem.value,
      };
    });
  };

  const radarData = formatRadarData();
  const chartData = formatChartData();

  const handleKPIClick = (towerName: string, kpi: any) => {
    onDrillDown({
      type: 'kpi',
      label: `${towerName}: ${kpi.label}`,
      requirementId: 'COMP',
      summary: `${kpi.label} for ${towerName} is currently valued at ${kpi.val}. Description: ${kpi.desc}. RAG status is ${kpi.status.toUpperCase()}.`,
      nextStep: `Coordinate cross-functional benchmarking review between selected towers`,
      owner: `${towerData[towerA]?.leader || 'Tower Leader'}`,
      metrics: [
        { label: "Metric Value", val: kpi.val, status: kpi.status.toUpperCase() },
        { label: "Description context", val: kpi.desc, status: 'Active' },
        { label: "Comparative Target", val: "Group Average Alignment", status: 'Benchmark' }
      ]
    });
  };

  return (
    <div className="space-y-4">
      {/* HEADER SECTION */}
      <section className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
          <div className="space-y-1 pl-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[9px] font-black uppercase text-accent tracking-widest leading-none">
              <Sparkles size={10} className="animate-pulse" /> Alignment Analytics
            </div>
            <h2 className="text-lg font-barlow font-bold text-ink uppercase tracking-wide">
              VOIS Tower Comparison Suite
            </h2>
            <p className="text-ink-soft text-xs font-light leading-relaxed">
              Compare strategic profiles, operational KPIs, performance vectors and monthly growth metrics of different towers side-by-side.
            </p>
          </div>

          {/* SELECTORS ROW */}
          <div className="flex flex-wrap items-center gap-3 bg-panel-2/60 p-2.5 rounded-xl border border-panel-border self-start md:self-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider leading-none">Tower A</span>
              <select
                value={towerA}
                onChange={(e) => setTowerA(e.target.value)}
                className="bg-panel border border-panel-border text-ink text-[11px] font-bold rounded-lg pl-2 pr-6 py-1 outline-none cursor-pointer hover:bg-panel-2 transition-colors leading-none"
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%252352525b\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.35rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
              >
                <option value="Overall">Overall Group</option>
                <option value="Finance">Finance</option>
                <option value="GTM">GTM</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div className="text-accent font-bold text-xs select-none">VS</div>

            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider leading-none">Tower B</span>
              <select
                value={towerB}
                onChange={(e) => setTowerB(e.target.value)}
                className="bg-panel border border-panel-border text-ink text-[11px] font-bold rounded-lg pl-2 pr-6 py-1 outline-none cursor-pointer hover:bg-panel-2 transition-colors leading-none"
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%252352525b\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.35rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
              >
                <option value="Overall">Overall Group</option>
                <option value="Finance">Finance</option>
                <option value="GTM">GTM</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC GRIDS: SIDE-BY-SIDE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* TOWER A CARD COLUMN */}
        <div className="bg-panel border border-panel-border rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-panel-border pb-2">
            <div>
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest leading-none">Selected Target A</span>
              <h3 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">{dataA.name}</h3>
              <p className="text-[10px] text-ink-soft leading-none mt-0.5 italic">{dataA.role}</p>
            </div>
            <div className="text-right leading-none">
              <span className="text-[8px] font-bold text-ink-soft uppercase block tracking-wider">Owner</span>
              <span className="text-[11px] font-bold text-ink flex items-center gap-1 mt-1 justify-end">
                <User size={10} className="text-accent" /> {dataA.leader.split(' ')[0]}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {dataA.kpis.map((kpi, idx) => (
              <div 
                key={idx}
                onClick={() => handleKPIClick(dataA.name, kpi)}
                className="flex justify-between items-center p-2.5 rounded-xl border border-panel-border bg-panel-2/20 hover:bg-panel-2/40 cursor-pointer transition-colors leading-none"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-ink-soft font-medium block truncate uppercase">{kpi.label}</span>
                  <span className="text-[9px] text-ink-soft font-light block truncate mt-0.5 leading-tight">{kpi.desc}</span>
                </div>
                <span className={`text-sm font-black tracking-tight shrink-0 pl-1.5 ${
                  kpi.status === 'red' ? 'text-rag-red' : kpi.status === 'amber' ? 'text-rag-amber' : 'text-rag-green'
                }`}>
                  {kpi.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TOWER B CARD COLUMN */}
        <div className="bg-panel border border-panel-border rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-panel-border pb-2">
            <div>
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest leading-none">Selected Target B</span>
              <h3 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">{dataB.name}</h3>
              <p className="text-[10px] text-ink-soft leading-none mt-0.5 italic">{dataB.role}</p>
            </div>
            <div className="text-right leading-none">
              <span className="text-[8px] font-bold text-ink-soft uppercase block tracking-wider">Owner</span>
              <span className="text-[11px] font-bold text-ink flex items-center gap-1 mt-1 justify-end">
                <User size={10} className="text-accent" /> {dataB.leader.split(' ')[0]}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {dataB.kpis.map((kpi, idx) => (
              <div 
                key={idx}
                onClick={() => handleKPIClick(dataB.name, kpi)}
                className="flex justify-between items-center p-2.5 rounded-xl border border-panel-border bg-panel-2/20 hover:bg-panel-2/40 cursor-pointer transition-colors leading-none"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-ink-soft font-medium block truncate uppercase">{kpi.label}</span>
                  <span className="text-[9px] text-ink-soft font-light block truncate mt-0.5 leading-tight">{kpi.desc}</span>
                </div>
                <span className={`text-sm font-black tracking-tight shrink-0 pl-1.5 ${
                  kpi.status === 'red' ? 'text-rag-red' : kpi.status === 'amber' ? 'text-rag-amber' : 'text-rag-green'
                }`}>
                  {kpi.val}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CHARTS GRAPHICS: RADAR & COMPOSED CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* RADAR PROFILE MAPPING */}
        <section className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm">
          <h4 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest pl-1 border-l-2 border-accent mb-4 leading-none">
            Strategic Dimension Mapping — Radar Profile Comparison
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="var(--panel-border)" />
                <PolarAngleAxis dataKey="subject" stroke="var(--ink-soft)" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--panel-border)" fontSize={8} />
                <Radar name={dataA.name} dataKey={dataA.name} stroke="#e60000" fill="#e60000" fillOpacity={0.25} />
                <Radar name={dataB.name} dataKey={dataB.name} stroke="#5a0006" fill="#5a0006" fillOpacity={0.2} />
                <Radar name="Group Average" dataKey="Group Baseline" stroke="#8c7878" fill="#8c7878" fillOpacity={0.08} strokeDasharray="3 3" />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 9, color: 'var(--ink)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* MONTHLY COMPOSED PERFORMANCE */}
        <section className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm">
          <h4 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest pl-1 border-l-2 border-accent mb-4 leading-none">
            Monthly Performance Run-Rate Trends — 6 Month Review
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 3" stroke="var(--panel-border)" />
                <XAxis dataKey="month" stroke="var(--ink-soft)" fontSize={9} />
                <YAxis domain={[40, 100]} stroke="var(--ink-soft)" fontSize={9} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)', color: 'var(--ink)', fontSize: 9 }} />
                
                {/* Area chart representing Group Baseline */}
                <Area type="monotone" name="Group Baseline" dataKey="Group Baseline" fill="var(--panel-border)" stroke="#8c7878" fillOpacity={0.2} strokeDasharray="4 4" />
                
                {/* Bar chart representing Tower A */}
                <Bar name={dataA.name} dataKey={dataA.name} fill="#e60000" radius={[4, 4, 0, 0]} maxBarSize={32} />
                
                {/* Line chart representing Tower B */}
                <Line type="monotone" name={dataB.name} dataKey={dataB.name} stroke="#5a0006" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 9 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>

      {/* STRATEGIC SUMMARY & BR BRIEFING */}
      <section className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2.5">
          <span className="text-[9px] font-bold text-ink-soft uppercase tracking-widest block leading-none pl-1 border-l-2 border-accent">Tower A Alignment Context</span>
          <div className="bg-panel-2/40 p-3 rounded-xl border border-panel-border space-y-1.5 h-[calc(100%-1.25rem)] flex flex-col justify-between">
            <p className="text-xs text-ink-soft leading-normal font-light italic">"{dataA.strategicBrief}"</p>
            <div className="space-y-1.5 pt-2 border-t border-panel-border/50">
              <span className="text-[8px] font-bold text-ink-soft uppercase tracking-widest block leading-none">Tower A Governance Initiatives</span>
              <ul className="list-none pl-0 space-y-1">
                {dataA.actionItems.map((item, i) => (
                  <li key={i} className="text-[10px] text-ink flex gap-1.5 items-start">
                    <ClipboardList size={10} className="text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <span className="text-[9px] font-bold text-ink-soft uppercase tracking-widest block leading-none pl-1 border-l-2 border-accent">Tower B Alignment Context</span>
          <div className="bg-panel-2/40 p-3 rounded-xl border border-panel-border space-y-1.5 h-[calc(100%-1.25rem)] flex flex-col justify-between">
            <p className="text-xs text-ink-soft leading-normal font-light italic">"{dataB.strategicBrief}"</p>
            <div className="space-y-1.5 pt-2 border-t border-panel-border/50">
              <span className="text-[8px] font-bold text-ink-soft uppercase tracking-widest block leading-none">Tower B Governance Initiatives</span>
              <ul className="list-none pl-0 space-y-1">
                {dataB.actionItems.map((item, i) => (
                  <li key={i} className="text-[10px] text-ink flex gap-1.5 items-start">
                    <ClipboardList size={10} className="text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
