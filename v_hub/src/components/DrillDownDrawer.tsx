import React from 'react';
import { 
  Drawer, 
  IconButton, 
  Tabs, 
  Tab, 
  Box, 
  Typography,
  Chip
} from '@mui/material';
import { X, ClipboardList, BarChart3, MessageSquare, ShieldCheck, History } from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

interface DrillDownDrawerProps {
  open: boolean;
  onClose: () => void;
  data: any;
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
        <Box sx={{ py: 4 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const DrillDownDrawer: React.FC<DrillDownDrawerProps> = ({ open, onClose, data }) => {
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    if (data?.type === 'requirement') {
      setTab(1);
    } else {
      setTab(0);
    }
  }, [data]);

  if (!data) return null;

  // Find requirement metadata
  const reqId = data.requirementId || data.requirement?.replace('REQ ', '') || '1';
  const requirement = dashboardData.annotations[reqId as keyof typeof dashboardData.annotations];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 500, lg: 650 }, bgcolor: '#fdfcfe' }
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-panel-border flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-accent-brand uppercase tracking-widest bg-panel px-2 py-0.5 rounded">
                Detail View
              </span>
              <span className={`w-2 h-2 rounded-full ${
                data.rag === 'green' ? 'bg-rag-green' : data.rag === 'amber' ? 'bg-rag-amber' : 'bg-rag-red'
              }`} />
            </div>
            <h2 className="text-2xl font-barlow font-bold text-ink uppercase tracking-tight">
              {data.label || data.name}
            </h2>
          </div>
          <IconButton onClick={onClose} className="hover:bg-slate-100">
            <X size={20} />
          </IconButton>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tab} 
              onChange={(_, v) => setTab(v)}
              sx={{
                '& .MuiTab-root': {
                  fontFamily: 'Inter',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  minWidth: 100,
                  color: '#9a82a0'
                },
                '& .Mui-selected': {
                  color: '#a4007a !important'
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#a4007a',
                  height: 3
                }
              }}
            >
              <Tab icon={<BarChart3 size={16} className="mb-1" />} label="Analysis" />
              <Tab icon={<ClipboardList size={16} className="mb-1" />} label="Requirement" />
              <Tab icon={<History size={16} className="mb-1" />} label="History" />
            </Tabs>
          </Box>

          <TabPanel value={tab} index={0}>
            <div className="space-y-8">
              {/* Specialized Content for Customer */}
              {data.type === 'customer' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-grad-1/5 p-4 rounded-xl border border-grad-1/20">
                      <span className="text-[10px] font-bold text-grad-1 uppercase tracking-widest block mb-1">Service Health</span>
                      <p className="text-lg font-barlow font-bold text-ink">{data.internalPerformance.find((p: any) => p.label === 'Service Health')?.value}</p>
                    </div>
                    <div className="bg-grad-2/5 p-4 rounded-xl border border-grad-2/20">
                      <span className="text-[10px] font-bold text-grad-2 uppercase tracking-widest block mb-1">NPS (Rolling)</span>
                      <p className="text-lg font-barlow font-bold text-ink">{data.internalPerformance.find((p: any) => p.label === 'NPS (rolling)')?.value}</p>
                    </div>
                  </div>
                  <div className="bg-white border border-panel-border p-6 rounded-2xl shadow-sm">
                    <h5 className="text-[11px] font-bold text-ink uppercase tracking-widest mb-4"> MM-D Critical Alerts</h5>
                    <div className="space-y-3">
                      {data.mmdNarrative.problemJobs.map((job: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-rag-red/[0.03] border border-rag-red/10 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-rag-red" />
                          <span className="text-xs font-medium text-ink">{job}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Specialized Content for Goal */}
              {data.type === 'goal' && (
                <div className="bg-grad-3/5 p-6 rounded-2xl border border-grad-3/10 border-l-8 border-l-grad-3">
                  <h5 className="text-sm font-bold text-grad-3 uppercase tracking-tight mb-2">Strategy Alignment</h5>
                  <p className="text-[13px] text-ink leading-relaxed">
                    This goal is directly mapped to the <span className="font-bold text-grad-3">{data.context}</span> pillar. 
                    Evidence is gathered from the FY27 close-out reports and refreshed every 24 hours.
                  </p>
                </div>
              )}

              {/* Dynamic Insight Card */}
              <div className="bg-white border border-panel-border rounded-2xl p-6 shadow-sm ring-1 ring-black/[0.02]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-grad-2/10 flex items-center justify-center text-grad-2 shadow-inner">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink uppercase tracking-tight">Contextual Analysis</h4>
                    <p className="text-[10px] text-muted-text font-medium italic">LLM generated based on Mar-26 close</p>
                  </div>
                </div>
                
                <p className="text-[13px] text-ink leading-relaxed font-light mb-6">
                  The performance of <span className="font-bold">{data.label || data.name}</span> is currently <span className={`font-bold ${
                    data.rag === 'green' ? 'text-rag-green' : 'text-rag-amber'
                  }`}>{data.rag?.toUpperCase() || 'STEADY'}</span>. 
                  {data.type === 'exception' 
                    ? " This item requires attention due to recent volatility in Salesforce tagging. GMT owners should validate the Gen-2 categorization before the next board review."
                    : " Revenue realization is tracking 1.5% ahead of the FY27 stretch targets. Operational efficiencies in the global service towers have contributed significantly."}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50/50 p-4 rounded-xl border border-panel-border/30">
                    <span className="text-[9px] font-bold text-muted-text uppercase tracking-widest block mb-2">Next Step</span>
                    <p className="text-[11px] font-semibold text-ink leading-tight">Review reconciliation with Finance team</p>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-xl border border-panel-border/30">
                    <span className="text-[9px] font-bold text-muted-text uppercase tracking-widest block mb-2">Action Owner</span>
                    <p className="text-[11px] font-semibold text-ink leading-tight">M. Lee (CFO)</p>
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="space-y-4">
                <h5 className="text-[11px] font-bold text-ink uppercase tracking-widest pl-1 border-l-4 border-grad-1">Detailed Breakdown</h5>
                <div className="space-y-3">
                  {[
                    { label: 'Q1 Forecast', val: '€842M', status: 'On Track' },
                    { label: 'Budget Variance', val: '+2.1%', status: 'Favorable' },
                    { label: 'Market Share', val: '14.2%', status: 'Growth' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="text-xs text-ink-soft">{stat.label}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-barlow text-lg font-bold text-ink">{stat.val}</span>
                        <Chip label={stat.status} size="small" sx={{ fontSize: '9px', fontWeight: 700, height: 20 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <div className="space-y-8">
              {requirement && (
                <>
                  <div className="flex items-center justify-between bg-panel-2 p-4 rounded-xl border border-panel-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center text-white font-bold font-barlow">
                        {reqId}
                      </div>
                      <h4 className="text-sm font-bold text-ink uppercase tracking-tight">{requirement.title}</h4>
                    </div>
                    <Chip 
                      label={requirement.status} 
                      color={requirement.status === 'GREEN' ? 'success' : 'warning'} 
                      size="small"
                      sx={{ fontSize: '9px', fontWeight: 800 }}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h6 className="text-[10px] font-bold text-grad-2 uppercase tracking-[2px]">Description</h6>
                      <p className="text-[13px] text-ink leading-relaxed">{requirement.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h6 className="text-[10px] font-bold text-grad-2 uppercase tracking-[2px]">User Story</h6>
                      <div className="bg-grad-2/5 p-4 rounded-xl border-l-4 border-grad-2 italic">
                        <p className="text-[12px] text-ink/80 leading-relaxed">"{requirement.userStory}"</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h6 className="text-[10px] font-bold text-grad-2 uppercase tracking-[2px]">Workshop Feedback</h6>
                      <ul className="space-y-2">
                        {requirement.feedback.map((f, i) => (
                          <li key={i} className="flex gap-2 text-[12px] text-ink-soft leading-relaxed">
                            <span className="text-grad-2 font-bold">•</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex justify-center">
                      <button className="flex items-center gap-2 text-[10px] font-bold text-white bg-grad-3 px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
                        <ShieldCheck size={14} />
                        Validate AC Status
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabPanel>

          <TabPanel value={tab} index={2}>
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
              <History size={48} />
              <div>
                <p className="font-bold text-sm uppercase tracking-widest">Historical View</p>
                <p className="text-xs">Connecting to data warehouse...</p>
              </div>
            </div>
          </TabPanel>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-panel-border bg-slate-50 flex gap-4">
          <button className="flex-1 bg-ink text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-grad-3 transition-colors shadow-sm">
            Download Deep-Dive
          </button>
          <button className="flex-1 border border-panel-border bg-white text-ink-soft py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-panel transition-colors">
            Share with GMT
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default DrillDownDrawer;
