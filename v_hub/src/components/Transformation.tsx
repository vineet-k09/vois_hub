import React from 'react';
import dashboardData from '../data/dashboard_data.json';

interface TransformationProps {
  onDrillDown: (data: any) => void;
  onSelectReq?: (id: string) => void;
}

const Transformation: React.FC<TransformationProps> = ({ onDrillDown, onSelectReq }) => {
  const req06 = dashboardData.sections.find(s => s.id === "REQ 06") as any;
  if (!req06) return null;

  const handleItemClick = (item: any) => {
    onDrillDown({
      ...item,
      type: 'transformation',
      label: item.name
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
      {/* Visual Accent Rail */}
      <div className="absolute top-0 left-0 w-2 h-full bg-[#6a1b7a]" />

      {/* Requirement Pin */}
      <div 
        className="req-pin cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (onSelectReq) onSelectReq('6');
        }}
        title="Requirement #6: Transformation Horizon 2"
      >
        6
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4 mb-4 pl-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                REQ 06 · transformation
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6a1b7a]" />
            </div>
            <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
              {req06.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-xs italic font-light mt-0.5">{req06.note}</p>
          </div>
          
          <span className="text-[9px] font-black text-[#6a1b7a] bg-[#6a1b7a]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
            HORIZON 2 FEED
          </span>
        </div>

        {/* Roadmap Items list (Dense layout) */}
        <div className="divide-y divide-slate-100 pl-2">
          {req06.roadmap?.map((item: any) => {
            const ragColor = 
              item.rag === 'green' ? 'bg-emerald-500' : 'bg-amber-500';

            const barColor = 
              item.rag === 'green' ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-[#6a1b7a]';

            const textRagColor = 
              item.rag === 'green' ? 'text-emerald-600' : 'text-amber-600';

            return (
              <div 
                key={item.name} 
                className="group flex flex-col sm:flex-row items-stretch sm:items-center justify-between py-2.5 hover:bg-slate-50/50 transition-all cursor-pointer gap-2"
                onClick={() => handleItemClick(item)}
              >
                {/* Name */}
                <div className="sm:w-1/3 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${ragColor}`} />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-[#6a1b7a] transition-colors">
                    {item.name}
                  </span>
                </div>

                {/* Progress */}
                <div className="sm:w-1/3 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${barColor}`} 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className={`font-barlow text-xs font-black ${textRagColor} w-8 text-right`}>
                    {item.progress}%
                  </span>
                </div>

                {/* Milestones & Value */}
                <div className="sm:w-1/3 text-left sm:text-right pr-2">
                  <span className="text-[10px] text-slate-500 font-medium leading-none block">
                    {item.meta.split('·')[0]}
                  </span>
                  <span className="text-[9px] text-slate-400 font-light leading-none block mt-0.5">
                    {item.meta.split('·')[1]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Transformation;
