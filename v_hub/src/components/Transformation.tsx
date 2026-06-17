import React from 'react';
import dashboardData from '../data/dashboard_data.json';

interface TransformationProps {
  onDrillDown: (data: any) => void;
}

const Transformation: React.FC<TransformationProps> = ({ onDrillDown }) => {
  const req06 = dashboardData.sections.find(s => s.id === "REQ 06") as any;
  if (!req06) return null;

  const req06Anno = (dashboardData.annotations as any)["6"];

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

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4 mb-6 pl-2">
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

        {/* Roadmap Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
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
                className="group p-4 rounded-2xl border border-slate-100 bg-slate-50/20 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer space-y-3"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-semibold text-slate-700 leading-tight truncate pr-4">
                    {item.name}
                  </h4>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ragColor}`} />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Progress</span>
                    <span className={`font-barlow text-sm font-black ${textRagColor}`}>
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${barColor}`} 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-light truncate leading-none pt-1">
                  {item.meta.split('·')[0]} · {item.meta.split('·')[1]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* REQ 06 Annotation Card */}
      {req06Anno && (
        <div className="anno-card mt-8 ml-2">
          <div className="anno-head">
            <div className="nr">6</div>
            <h5>REQ 06 — {req06Anno.title}</h5>
            <div className="status amber">AMBER</div>
          </div>
          <div className="anno-grid">
            <div className="anno-block">
              <h6>Workshop Feedback</h6>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                {req06Anno.feedback?.map((fb: string, i: number) => (
                  <li key={i}>{fb}</li>
                ))}
              </ul>
            </div>
            <div className="anno-block">
              <h6>Description (Updated)</h6>
              <p className="text-slate-600 text-[11px] leading-relaxed">{req06Anno.description}</p>
            </div>
            <div className="anno-block">
              <h6>Dependencies</h6>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                {req06Anno.dependencies?.map((dep: string, i: number) => (
                  <li key={i}>{dep}</li>
                ))}
              </ul>
            </div>
            <div className="anno-block">
              <h6>Acceptance Criteria</h6>
              <p className="text-slate-600 text-[11px] leading-relaxed">{req06Anno.acceptanceCriteria}</p>
            </div>
          </div>
          <div className="anno-block us">
            <h6>User Story</h6>
            <p className="text-slate-700 italic text-[11px] font-light">"{req06Anno.userStory}"</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Transformation;
