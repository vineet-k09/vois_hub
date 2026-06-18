import React from 'react';
import { 
  Drawer, 
  IconButton, 
  Tabs, 
  Tab, 
  Box
} from '@mui/material';
import { X, ClipboardList, BarChart3, MessageSquare, ShieldCheck, History, User } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

interface DrillDownDrawerProps {
  open?: boolean;
  onClose?: () => void;
  data: any;
  inline?: boolean;
}

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const DrillDownDrawer: React.FC<DrillDownDrawerProps> = ({ 
  open = true, 
  onClose = () => {}, 
  data, 
  inline = false 
}) => {
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    if (data?.requirementId) {
      setTab(1); // Default to requirement tab if it was a strategy drill-down
    } else {
      setTab(0); // Default to analysis tab
    }
  }, [data]);

  if (!data) return null;

  // Find requirement metadata
  const reqId = data.requirementId || data.requirement?.replace('REQ ', '') || '1';
  const requirement = dashboardData.annotations[reqId as keyof typeof dashboardData.annotations];

  // Generate dynamic executive insights based on selected item
  const getExecutiveInsight = (item: any) => {
    const name = (item.label || item.name || '').toUpperCase();
    
    if (name.includes('EBITDA')) {
      return {
        summary: "EBITDA is materially off-track at -€36.33M against a budget of €0M. This deficit is driven entirely by a 38.8% cost overrun in the Operations tower. Immediate validation of cost allocation models is required.",
        nextStep: "Review Operations expense run-rate in COO monthly connect",
        owner: "Gary (CEO) & M. Lee (CFO)",
        metrics: [
          { label: "Q1 Forecast Variance", val: "-€36.33M", status: "Critical" },
          { label: "EBITDA Deficit", val: "100% vs plan", status: "Off Track" },
          { label: "Operations Cost Variance", val: "+38.8%", status: "High Risk" }
        ]
      };
    } else if (name.includes('COST TAKEOUT')) {
      return {
        summary: "Cost takeout is performing ahead of schedule at €141.62M vs the €102M target. However, operational headcount variance offsets EBITDA benefits. The CHRO is reviewing the savings categorization.",
        nextStep: "Validate CHRO headcount refresh and operational savings audit",
        owner: "A. Khan (COO) & HR Team",
        metrics: [
          { label: "Takeout to Date", val: "€141.6M", status: "Favorable" },
          { label: "Target", val: "€102.0M", status: "Achieved" },
          { label: "EBITDA Net Benefit", val: "None (Offset)", status: "At Risk" }
        ]
      };
    } else if (name.includes('PIPELINE') || name.includes('GROWTH')) {
      return {
        summary: "Qualified pipeline stands at €1,359M vs the €1,500M target. Stalled pipeline opportunities (inactive for > 90 days) account for €118M. CCO is addressing Salesforce tagging anomalies.",
        nextStep: "Audit stalled opportunities and re-run Gen-2 tagging reconciliation",
        owner: "R. Wood (CCO)",
        metrics: [
          { label: "Current Pipeline", val: "€1,359M", status: "At Risk" },
          { label: "Target Gap", val: "-€141M", status: "Watch" },
          { label: "Stalled Pipeline Value", val: "€118M", status: "Action Set" }
        ]
      };
    } else if (name.includes('NEW LOGOS') || name.includes('GEN-2')) {
      return {
        summary: "7 Gen-2 deals booked in March (contract value €82M), tracking 2 deals ahead of previous month. Margin compression is noted on project Helios and vantage cloud. SF tagging gaps are being reconciled.",
        nextStep: "Approve commercial guidelines for Gen-2 deal thresholds",
        owner: "R. Wood (CCO) & CCO Office",
        metrics: [
          { label: "Gen-2 Deals", val: "7 logos", status: "On Track" },
          { label: "Booked Value", val: "€82M", status: "Growth" },
          { label: "Margin Pressure Flags", val: "2 Deals", status: "Watch" }
        ]
      };
    } else if (name.includes('TALENT') || name.includes('ROLES')) {
      return {
        summary: "Critical role coverage is currently at 78% against the 85% target. Recipient markets are reporting onshore staffing gaps (particularly in Tier-3). HR refresh of skill categories is in progress.",
        nextStep: "Lock refreshed Talent KPI target before Board deck submission",
        owner: "CHRO & Talent Tower",
        metrics: [
          { label: "Role Coverage", val: "78%", status: "Watch" },
          { label: "Target Gap", val: "-7.0pp", status: "Action Set" },
          { label: "Tier-3 Role Gaps", val: "14 roles", status: "Critical" }
        ]
      };
    } else if (item.type === 'customer') {
      return {
        summary: `Customer detail for ${item.name || 'Vfz'}. Rolling NPS is strong at +42. Contract margins are at risk (8.4%) due to onshore staffing pressure. MMD shows three critical problem jobs on EU-billing and onshore staffing gaps.`,
        nextStep: "Confirm AI Ops expansion roadmap proposal for Q3 review",
        owner: "K. Patel (Account Director)",
        metrics: [
          { label: "NPS (Rolling)", val: "+42", status: "Green" },
          { label: "Incidents (P1/P2)", val: "3 cases", status: "Watch" },
          { label: "Contract Margin", val: "8.4%", status: "Amber" }
        ]
      };
    } else if (item.type === 'transformation') {
      return {
        summary: `Transformation tracking for ${item.name}. Milestone completion: ${item.milestones || 'M3/7 complete'}. Value realized: ${item.value || 'N/A'}. Program status: ${item.risk || 'Steady'}. Dependency: ${item.dependency || 'N/A'}.`,
        nextStep: "Audit value tracking framework with Finance team",
        owner: item.owner || "Transformation Team",
        metrics: [
          { label: "Progress", val: `${item.progress}%`, status: item.rag === 'green' ? 'On Track' : 'Watch' },
          { label: "Milestone Status", val: item.milestones?.split('complete')[0] || 'N/A', status: 'In Flight' },
          { label: "Goal Mapped", val: "Goal 07", status: 'Aligned' }
        ]
      };
    } else {
      // General Fallback
      return {
        summary: item.summary || `Contextual analysis for ${item.label || item.name || 'Dashboard item'}. Performance is currently ${item.rag?.toUpperCase() || 'STEADY'}. Review against the strategic targets indicates alignment on underlying performance, though review process continues.`,
        nextStep: "Review performance reconciliations with service owners",
        owner: "GMT Lead Owner",
        metrics: [
          { label: "Report Value", val: item.value || "TBD", status: item.rag === 'green' ? 'Favorable' : 'Watch' },
          { label: "Trend", val: item.trend || "Stable", status: 'Standard' },
          { label: "Cadence", val: "Monthly Review", status: 'Steady' }
        ]
      };
    }
  };

  const insight = getExecutiveInsight(data);

  const handleActionClick = (actionName: string) => {
    alert(`${actionName} triggered. Running with CEO credentials.`);
  };

  const content = (
    <div className={`flex flex-col bg-white ${
      inline 
        ? 'border border-slate-200 rounded-2xl shadow-xs overflow-hidden h-157.5 w-full' 
        : 'h-full'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10 shrink-0">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-red-650 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded border border-red-100/50 leading-none">
              Detail View
            </span>
            <span className={`w-2 h-2 rounded-full ${
              data.rag === 'green' ? 'bg-emerald-500' : data.rag === 'amber' ? 'bg-amber-500' : data.rag === 'red' ? 'bg-red-500' : 'bg-slate-400'
            }`} />
          </div>
          <h2 className="text-base  font-bold text-slate-905 uppercase tracking-wide leading-tight">
            {data.label || data.name}
          </h2>
        </div>
        {!inline && (
          <IconButton onClick={onClose} className="hover:bg-slate-50 shrink-0 text-slate-405 hover:text-slate-800 p-1">
            <X size={16} />
          </IconButton>
        )}
      </div>

      {/* Tabs and TabPanels in scroll container */}
      <div className="flex-1 overflow-y-auto px-5 py-2 min-h-0">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tab} 
            onChange={(_, v) => setTab(v)}
            sx={{
              minHeight: 32,
              '& .MuiTab-root': {
                fontFamily: 'Inter',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                minWidth: 70,
                color: '#71717a',
                minHeight: 32,
                py: 0.5,
                px: 1.5
              },
              '& .Mui-selected': {
                color: '#e60000 !important'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#e60000',
                height: 2
              }
            }}
          >
            <Tab icon={<BarChart3 size={12} className="mb-0.5 mr-1" />} label="Analysis" iconPosition="start" />
            <Tab icon={<ClipboardList size={12} className="mb-0.5 mr-1" />} label="Requirement" iconPosition="start" />
            <Tab icon={<History size={12} className="mb-0.5 mr-1" />} label="History" iconPosition="start" />
          </Tabs>
        </Box>

        {/* TAB 1: EXECUTIVE ANALYSIS */}
        <TabPanel value={tab} index={0}>
          <div className="space-y-4">
            
            {/* Context Summary Card */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded bg-red-50 flex items-center justify-center text-red-650">
                  <MessageSquare size={13} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider leading-none">Executive Performance Note</h4>
                  <p className="text-[8px] text-slate-400 font-medium italic mt-0.5 leading-none">CEO dashboard synthesis • Mar-26 close</p>
                </div>
              </div>
              
              <p className="text-[11px] text-slate-700 leading-relaxed font-light mb-3">
                {insight.summary}
              </p>

              {/* Next Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-200">
                <div className="bg-white p-2 rounded border border-slate-150">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5 leading-none">Strategic Action Required</span>
                  <p className="text-[10px] font-semibold text-slate-800 leading-snug">{insight.nextStep}</p>
                </div>
                <div className="bg-white p-2 rounded border border-slate-150">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5 leading-none">Action Owner</span>
                  <p className="text-[10px] font-semibold text-slate-850 leading-snug flex items-center gap-1">
                    <User size={9} className="text-red-500 shrink-0" />
                    {insight.owner}
                  </p>
                </div>
              </div>
            </div>

            {/* Metric Breakdown */}
            <div className="space-y-2">
              <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1 border-l-2 border-red-600 leading-none">
                Detailed Metric Breakdown
              </h5>
              <div className="grid grid-cols-1 gap-1.5">
                {insight.metrics.map((stat, i) => {
                  const isCrit = stat.status.toLowerCase().includes('crit') || stat.status.toLowerCase().includes('risk') || stat.status.toLowerCase().includes('off');
                  const isGreen = stat.status.toLowerCase().includes('green') || stat.status.toLowerCase().includes('favor') || stat.status.toLowerCase().includes('achieve');
                  const isWatch = stat.status.toLowerCase().includes('watch') || stat.status.toLowerCase().includes('amber') || stat.status.toLowerCase().includes('flight');
                  
                  let chipColor = "bg-slate-50 text-slate-605 border-slate-200";
                  if (isCrit) chipColor = "bg-red-50 text-red-700 border-red-150";
                  else if (isWatch) chipColor = "bg-amber-50 text-amber-800 border-amber-150";
                  else if (isGreen) chipColor = "bg-emerald-50 text-emerald-700 border-emerald-150";

                  return (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:bg-slate-50/50 transition-colors leading-none">
                      <span className="text-[11px] font-medium text-slate-600">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-905">{stat.val}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border leading-none shrink-0 ${chipColor}`}>
                          {stat.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabPanel>

        {/* TAB 2: ALIGNMENT & WORKSHOP REQUIREMENT */}
        <TabPanel value={tab} index={1}>
          <div className="space-y-4">
            {requirement ? (
              <>
                <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-red-655 flex items-center justify-center text-white font-bold text-xs">
                      {reqId}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider leading-none">
                        {requirement.title.split('—').slice(1).join('—') || requirement.title}
                      </h4>
                      <p className="text-[8px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5 leading-none">REQ {reqId}</p>
                    </div>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wide leading-none ${
                    requirement.status === 'GREEN' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {requirement.status}
                  </span>
                </div>

                <div className="space-y-3 pt-0.5">
                  <div className="space-y-1">
                    <h6 className="text-[8px] font-bold text-red-600 uppercase tracking-widest leading-none">Description</h6>
                    <p className="text-[11px] text-slate-700 leading-normal font-light">{requirement.description}</p>
                  </div>

                  <div className="space-y-1">
                    <h6 className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">CEO Strategic Story</h6>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 border-l-2 border-red-500 italic">
                      <p className="text-[11px] text-slate-800 leading-normal font-light">"{requirement.userStory}"</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h6 className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Alignment Feedback & Decisions</h6>
                    <ul className="space-y-1.5 pl-0 list-none">
                      {requirement.feedback.map((f: string, i: number) => (
                        <li key={i} className="flex gap-1.5 text-[11px] text-slate-600 leading-normal items-start">
                          <span className="text-red-550 font-bold shrink-0">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-1 flex justify-center">
                    <button 
                      onClick={() => alert(`Strategic validation triggered for Requirement #${reqId}`)}
                      className="flex items-center gap-1 text-[9px] font-bold text-white bg-red-600 px-4 py-1.5 rounded-full shadow hover:bg-red-700 transition-all hover:scale-102 cursor-pointer uppercase tracking-wider leading-none">
                      <ShieldCheck size={11} />
                      Validate AC Status
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-slate-400 text-[11px]">
                No workshop requirement mapped to this item.
              </div>
            )}
          </div>
        </TabPanel>

        {/* TAB 3: HISTORICAL AUDIT */}
        <TabPanel value={tab} index={2}>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-2 opacity-50">
            <History size={36} className="text-slate-400" />
            <div>
              <p className="font-bold text-[11px] uppercase tracking-widest text-slate-700">Historical View</p>
              <p className="text-[10px] text-slate-400 mt-1">Connecting to VOIS data warehouse for past 12 months...</p>
            </div>
            <span className="inline-block text-[8px] bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded mt-2 uppercase tracking-wider font-semibold">
              ERP Interface Refresher
            </span>
          </div>
        </TabPanel>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70 flex gap-2 shrink-0">
        <button 
          onClick={() => handleActionClick(`Download Deep-Dive: ${data.label || data.name}`)}
          className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm cursor-pointer text-center leading-none">
          Download Briefing
        </button>
        <button 
          onClick={() => handleActionClick(`Share with GMT: ${data.label || data.name}`)}
          className="flex-1 border border-slate-250 bg-white text-slate-700 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer text-center leading-none">
          Share with GMT
        </button>
      </div>
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: { xs: '100%', sm: 460, lg: 520 }, bgcolor: '#ffffff' }
        }
      }}
    >
      {content}
    </Drawer>
  );
};

export default DrillDownDrawer;
