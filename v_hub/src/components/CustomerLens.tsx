import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import { ExternalLink } from 'lucide-react';

interface CustomerLensProps {
  onDrillDown: (data: any) => void;
  onSelectReq?: (id: string) => void;
}

const CustomerLens: React.FC<CustomerLensProps> = ({ onDrillDown, onSelectReq }) => {
  const req04 = dashboardData.sections.find(s => s.id === "REQ 04") as any;
  if (!req04) return null;

  const handleCustomerClick = () => {
    onDrillDown({
      ...req04.customerDetail,
      type: 'customer',
      label: `Customer Lens: ${req04.customerDetail.name}`
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
      {/* Visual Accent Rail */}
      <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />

      {/* Requirement Pin */}
      <div 
        className="req-pin cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (onSelectReq) onSelectReq('4');
        }}
        title="Requirement #4: Customer Performance Connect"
      >
        4
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4 mb-6 pl-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                REQ 04 · customer lens
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
              {req04.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-xs italic font-light mt-0.5">{req04.note}</p>
          </div>
          
          <button 
            onClick={handleCustomerClick}
            className="flex items-center gap-1.5 text-xs font-bold text-[#c40089] hover:underline"
          >
            Customer 360 <ExternalLink size={12} />
          </button>
        </div>

        {/* Selected Customer profile */}
        <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 mb-6 pl-2 flex justify-between items-center">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">SELECTED ACCOUNT</span>
            <h4 className="text-xl font-barlow font-bold text-slate-800 tracking-wide mt-0.5">
              {req04.customerDetail.name}
            </h4>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-600 font-medium leading-none">Lead: {req04.customerDetail.lead}</p>
            <p className="text-[9px] text-slate-400 font-light mt-1">Updated {req04.customerDetail.lastRefresh}</p>
          </div>
        </div>

        {/* 3 Columns detailing Customer context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-2">
          
          {/* Col 1: Internal Performance */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              Internal Performance
            </h5>
            <div className="space-y-1.5">
              {req04.customerDetail.internalPerformance?.map((item: any) => {
                const textRagColor = 
                  item.rag === 'green' ? 'text-emerald-600 font-semibold' : 
                  item.rag === 'amber' ? 'text-amber-600 font-semibold' : 
                  item.rag === 'red' ? 'text-red-600 font-semibold' : 'text-slate-600';
                
                return (
                  <div key={item.metric} className="flex justify-between items-center text-xs py-1 border-b border-slate-100/50">
                    <span className="text-slate-500 font-medium">{item.metric}</span>
                    <span className={textRagColor}>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Col 2: MMD narrative */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              MMD — SME Insights
            </h5>
            <div className="space-y-2.5">
              <div className="bg-amber-50/20 p-3 rounded-xl border border-amber-200">
                <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  Problem Jobs ({req04.customerDetail.mmdNarrative?.problemJobs?.length || 0})
                </span>
                <ul className="list-disc pl-3 text-slate-600 text-[11px] space-y-1">
                  {req04.customerDetail.mmdNarrative?.problemJobs?.map((job: string, i: number) => (
                    <li key={i}>{job}</li>
                  ))}
                </ul>
              </div>
              <p className="text-[11px] text-slate-500 font-light italic leading-relaxed">
                "{req04.customerDetail.mmdNarrative?.leadNarrative}"
              </p>
            </div>
          </div>

          {/* Col 3: External spend */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              Share-of-Wallet
            </h5>
            <div className="space-y-1.5">
              {req04.customerDetail.externalSpend?.map((item: any) => {
                const textRagColor = 
                  item.rag === 'green' ? 'text-emerald-600 font-bold' : 
                  item.rag === 'amber' ? 'text-amber-600 font-bold' : 
                  item.rag === 'red' ? 'text-red-600 font-bold' : 'text-slate-700 font-semibold';
                
                return (
                  <div key={item.label} className="flex justify-between items-center text-xs py-1 border-b border-slate-100/50">
                    <span className="text-slate-500 font-medium">{item.label}</span>
                    <span className={textRagColor}>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerLens;
