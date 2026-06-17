import React from 'react';
import { 
  Drawer, 
  IconButton
} from '@mui/material';
import { X, MessageSquare } from 'lucide-react';

interface DrillDownDrawerProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

const DrillDownDrawer: React.FC<DrillDownDrawerProps> = ({ open, onClose, data }) => {
  if (!data) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: { xs: '100%', sm: 460 }, bgcolor: '#fdfcfe' }
        }
      }}
    >
      <div className="h-full flex flex-col justify-between overflow-hidden bg-white text-slate-800 font-inter">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shadow-sm shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-black text-[#c40089] uppercase tracking-widest bg-[#c40089]/10 px-1.5 py-0.5 rounded">
                Deep-Dive
              </span>
              {data.rag && (
                <span className={`w-1.5 h-1.5 rounded-full ${
                  data.rag === 'green' ? 'bg-emerald-500' : data.rag === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
              )}
            </div>
            <h2 className="text-base font-barlow font-bold text-slate-800 uppercase tracking-wide leading-none mt-1">
              {data.label || data.name}
            </h2>
          </div>
          <IconButton onClick={onClose} size="small" className="hover:bg-slate-200">
            <X size={18} />
          </IconButton>
        </div>

        {/* Content Area - Designed to fit completely without scroll */}
        <div className="flex-1 p-5 space-y-4 flex flex-col justify-start overflow-hidden">
          
          {/* Specialized Content for Customer */}
          {data.type === 'customer' && (
            <div className="space-y-3 shrink-0">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50/30 p-2.5 rounded-xl border border-emerald-100/50">
                  <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-widest block mb-0.5">Service Health</span>
                  <p className="text-sm font-barlow font-black text-slate-800 leading-none">
                    {data.internalPerformance?.find((p: any) => p.metric?.toLowerCase().includes('health'))?.value || 'Green'}
                  </p>
                </div>
                <div className="bg-emerald-50/30 p-2.5 rounded-xl border border-emerald-100/50">
                  <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-widest block mb-0.5">NPS (Rolling)</span>
                  <p className="text-sm font-barlow font-black text-slate-800 leading-none">
                    {data.internalPerformance?.find((p: any) => p.metric?.toLowerCase().includes('nps'))?.value || '89'}
                  </p>
                </div>
              </div>
              <div className="bg-red-50/20 border border-red-100 p-3 rounded-xl">
                <h5 className="text-[9px] font-bold text-red-700 uppercase tracking-wider mb-1">MMD Critical Alerts</h5>
                <div className="space-y-1">
                  {data.mmdNarrative?.problemJobs?.slice(0, 2).map((job: string, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      <span className="truncate">{job}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Specialized Content for Goal */}
          {data.type === 'goal' && (
            <div className="bg-[#6a1b7a]/5 p-3.5 rounded-xl border border-[#6a1b7a]/15 border-l-4 border-l-[#6a1b7a] shrink-0">
              <h5 className="text-[10px] font-bold text-[#6a1b7a] uppercase tracking-wider mb-1">Strategy Alignment</h5>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Mapped to <span className="font-bold text-[#6a1b7a]">{data.context}</span>. Evidence is fetched from the annual close-out and refreshed daily against targets.
              </p>
            </div>
          )}

          {/* Dynamic Insight Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm ring-1 ring-black/[0.01]">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#c40089]/10 flex items-center justify-center text-[#c40089]">
                <MessageSquare size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Contextual Analysis</h4>
                <p className="text-[8px] text-slate-400 font-medium italic leading-none mt-0.5">AI Insights for Gary (CEO)</p>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-600 leading-relaxed font-light mb-3">
              The metrics for <span className="font-semibold text-slate-800">{data.label || data.name}</span> are currently <span className={`font-bold ${
                data.rag === 'green' ? 'text-emerald-600' : 'text-amber-600'
              }`}>{data.rag?.toUpperCase() || 'STEADY'}</span>. 
              {data.type === 'exception' 
                ? " Responding team has flagged operational bottlenecks. We suggest reviewing details with the GMT tower lead during the next 1:1."
                : " Operating within expected margins. Service-delivery indicators show high performance against the current FY27 targets."}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Next Step</span>
                <p className="text-[10px] font-semibold text-slate-700 leading-tight">Review alignment in 1:1</p>
              </div>
              <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Owner</span>
                <p className="text-[10px] font-semibold text-slate-700 leading-tight">M. Lee (CFO)</p>
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-2 flex-1 flex flex-col justify-end">
            <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-l-2 border-[#e60000] pl-1.5">Detailed Breakdown</h5>
            <div className="space-y-1.5">
              {[
                { label: 'Q1 Forecast', val: '€842M', status: 'On Track' },
                { label: 'Budget Variance', val: '+2.1%', status: 'Favorable' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/60 border border-slate-100/50">
                  <span className="text-[10px] text-slate-500 font-medium">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-barlow text-xs font-bold text-slate-800">{stat.val}</span>
                    <span className="text-[8px] font-bold text-emerald-600 bg-emerald-100/40 px-1 py-0.5 rounded">
                      {stat.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Fixed Height */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2 shrink-0">
          <button className="flex-1 bg-[#1e293b] text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm">
            Download deep-dive
          </button>
          <button className="flex-1 border border-slate-200 bg-white text-slate-600 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors">
            Share with GMT
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default DrillDownDrawer;
