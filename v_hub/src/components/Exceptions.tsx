import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import AnnotationCard from './AnnotationCard';

interface ExceptionsProps {
  onDrillDown: (data: any) => void;
}

const Exceptions: React.FC<ExceptionsProps> = ({ onDrillDown }) => {
  const req03 = dashboardData.sections.find(s => s.id === "REQ 03") as any;
  if (!req03) return null;

  const req03Anno = (dashboardData.annotations as any)["3"];

  const handleItemClick = (item: any, groupTitle: string) => {
    onDrillDown({
      ...item,
      groupTitle,
      type: 'exception',
      label: item.name,
      requirementId: '3'
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #3">
        3
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-4 mb-6 pl-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                REQ 03 · exceptions
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
            <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
              {req03.title.split('—')[0]}
            </h2>
            <p className="text-slate-400 text-xs italic font-light mt-0.5">{req03.note}</p>
          </div>
        </div>

        {/* Content list split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2">
          {req03.exceptionGroups?.map((group: any) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5">
                {group.title.replace('★ ', '')}
              </h3>
              
              <div className="space-y-2">
                {group.items?.map((item: any) => {
                  const ragColor = 
                    item.rag === 'green' ? 'bg-emerald-500' : 
                    item.rag === 'amber' ? 'bg-amber-500' : 
                    item.rag === 'red' ? 'bg-rose-500' : 'bg-slate-300';

                  const textRagColor = 
                    item.rag === 'green' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 
                    item.rag === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-105' : 
                    item.rag === 'red' ? 'text-rose-700 bg-rose-50 border-rose-100' : 'text-slate-650 bg-slate-50 border-slate-100';

                  return (
                    <div 
                      key={item.name} 
                      onClick={() => handleItemClick(item, group.title)}
                      className="group flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/20 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ragColor}`} />
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-700 truncate">{item.name}</p>
                          {item.meta && (
                            <p className="text-[10px] text-slate-400 font-light mt-0.5 truncate">{item.meta}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-barlow font-bold border shrink-0 ${textRagColor}`}>
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REQ 03 Annotation Card */}
      {req03Anno && (
        <AnnotationCard
          id="3"
          title={req03Anno.title}
          status={req03Anno.status}
          feedback={req03Anno.feedback}
          description={req03Anno.description}
          dependencies={req03Anno.dependencies}
          acceptanceCriteria={req03Anno.acceptanceCriteria}
          userStory={req03Anno.userStory}
        />
      )}
    </section>
  );
};

export default Exceptions;
