import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import { ExternalLink } from 'lucide-react';
import AnnotationCard from './AnnotationCard';

interface CustomerLensProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

const CustomerLens: React.FC<CustomerLensProps> = ({ onDrillDown, showAnnotations }) => {
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
    <section id="section-customer" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden flex flex-col justify-between">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #4">
        4
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ 04 · customer lens
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              {req04.title.split('—')[0]}
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">{req04.note}</p>
          </div>
          
          <button 
            onClick={handleCustomerClick}
            className="flex items-center gap-1 text-[11px] font-bold text-accent hover:underline cursor-pointer"
          >
            Customer 360 <ExternalLink size={10} />
          </button>
        </div>

        {/* Selected Customer profile */}
        <div className="bg-panel-2/50 p-3 rounded-xl border border-panel-border mb-4 pl-2.5 flex justify-between items-center">
          <div>
            <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider">SELECTED ACCOUNT</span>
            <h4 className="text-lg font-bold text-ink tracking-wide mt-0.5 leading-none">
              {req04.customerDetail.name}
            </h4>
          </div>
          <div className="text-right">
            <p className="text-xs text-ink-soft font-medium leading-none">Lead: {req04.customerDetail.lead}</p>
            <p className="text-[9px] text-muted-text font-light mt-1 leading-none">Updated {req04.customerDetail.lastRefresh}</p>
          </div>
        </div>

        {/* 3 Columns detailing Customer context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-1">
          
          {/* Col 1: Internal Performance */}
          <div className="space-y-2">
            <h5 className="text-[9px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1">
              Internal Performance
            </h5>
            <div className="space-y-1">
              {req04.customerDetail.internalPerformance?.map((item: any) => {
                const textRagColor = 
                  item.rag === 'green' ? 'text-emerald-500 font-semibold' : 
                  item.rag === 'amber' ? 'text-amber-500 font-semibold' : 
                  item.rag === 'red' ? 'text-rose-500 font-semibold' : 'text-ink';
                
                return (
                  <div key={item.metric} className="flex justify-between items-center text-[11px] py-1 border-b border-panel-border/50 leading-none">
                    <span className="text-ink-soft font-medium">{item.metric}</span>
                    <span className={textRagColor}>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Col 2: MMD narrative */}
          <div className="space-y-2">
            <h5 className="text-[9px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1">
              MMD — SME Insights
            </h5>
            <div className="space-y-2">
              <div className="bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                <span className="text-[8px] font-bold text-accent uppercase tracking-wider block mb-1 leading-none">
                  Problem Jobs ({req04.customerDetail.mmdNarrative?.problemJobs?.length || 0})
                </span>
                <ul className="space-y-1 pl-0 list-none">
                  {req04.customerDetail.mmdNarrative?.problemJobs?.map((job: string, idx: number) => (
                    <li key={idx} className="text-[10px] text-ink-soft leading-tight flex items-start gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500 mt-1 shrink-0" />
                      <span>{job}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[10px] text-ink-soft font-light italic leading-normal">
                "{req04.customerDetail.mmdNarrative?.leadNarrative}"
              </p>
            </div>
          </div>

          {/* Col 3: External spend */}
          <div className="space-y-2">
            <h5 className="text-[9px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1">
              Share-of-Wallet
            </h5>
            <div className="space-y-1">
              {req04.customerDetail.externalSpend?.map((item: any) => {
                const textRagColor = 
                  item.rag === 'green' ? 'text-emerald-500 font-bold' : 
                  item.rag === 'amber' ? 'text-amber-500 font-bold' : 
                  item.rag === 'red' ? 'text-rose-500 font-bold' : 'text-ink font-semibold';
                
                return (
                  <div key={item.label} className="flex justify-between items-center text-[11px] py-1 border-b border-panel-border/50 leading-none">
                    <span className="text-ink-soft font-medium">{item.label}</span>
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
