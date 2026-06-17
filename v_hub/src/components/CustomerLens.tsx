import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import { ExternalLink } from 'lucide-react';
import AnnotationCard from './AnnotationCard';

interface CustomerLensProps {
  onDrillDown: (data: any) => void;
}

const CustomerLens: React.FC<CustomerLensProps> = ({ onDrillDown }) => {
  const req04 = dashboardData.sections.find(s => s.id === "REQ 04") as any;
  if (!req04) return null;

  const req04Anno = (dashboardData.annotations as any)["4"];

  const handleCustomerClick = () => {
    onDrillDown({
      ...req04.customerDetail,
      type: 'customer',
      label: `Customer Lens: ${req04.customerDetail.name}`,
      requirementId: '4'
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #4">
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
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
            <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
              {req04.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-xs italic font-light mt-0.5">{req04.note}</p>
          </div>
          
          <button 
            onClick={handleCustomerClick}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
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
                  item.rag === 'red' ? 'text-rose-600 font-semibold' : 'text-slate-600';
                
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
              <div className="bg-red-50/10 p-3 rounded-xl border border-red-100">
                <span className="text-[9px] font-bold text-red-650 uppercase tracking-wider block mb-1.5">
                  Problem Jobs ({req04.customerDetail.mmdNarrative?.problemJobs?.length || 0})
                </span>
                <ul className="space-y-1 pl-0 list-none">
                  {req04.customerDetail.mmdNarrative?.problemJobs?.map((job: string, idx: number) => (
                    <li key={idx} className="text-[11px] text-slate-600 leading-snug flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                      <span>{job}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[11px] text-slate-505 font-light italic leading-relaxed">
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
                  item.rag === 'green' ? 'text-emerald-605 font-bold' : 
                  item.rag === 'amber' ? 'text-amber-605 font-bold' : 
                  item.rag === 'red' ? 'text-rose-605 font-bold' : 'text-slate-700 font-semibold';
                
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

      {/* REQ 04 Annotation Card */}
      {req04Anno && (
        <AnnotationCard
          id="4"
          title={req04Anno.title}
          status={req04Anno.status}
          feedback={req04Anno.feedback}
          description={req04Anno.description}
          dependencies={req04Anno.dependencies}
          acceptanceCriteria={req04Anno.acceptanceCriteria}
          userStory={req04Anno.userStory}
        />
      )}
    </section>
  );
};

export default CustomerLens;
