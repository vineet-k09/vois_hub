import React from 'react';
import dashboardData from '../data/dashboard_data.json';
import AnnotationCard from './AnnotationCard';

interface ExceptionsProps {
  onDrillDown: (data: any) => void;
  showAnnotations: boolean;
}

const Exceptions: React.FC<ExceptionsProps> = ({ onDrillDown, showAnnotations }) => {
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
    <section id="section-exceptions" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden flex flex-col justify-between">
      {/* Numbered pin for annotation */}
      <div className="req-pin" title="Requirement #3">
        3
      </div>

      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
          <div>
            <div className="flex items-center gap-2">
              {showAnnotations && (
                <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded border border-panel-border">
                  REQ 03 · exceptions
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
              {req03.title.split('—')[0]}
            </h2>
            <p className="text-ink-soft text-[10px] italic font-light mt-0.5">{req03.note}</p>
          </div>
        </div>

        {/* Content list split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-1">
          {req03.exceptionGroups?.map((group: any) => (
            <div key={group.title} className="space-y-2">
              <h3 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1 flex items-center gap-1.5">
                {group.title.replace('★ ', '')}
              </h3>
              
              <div className="space-y-1.5">
                {group.items?.map((item: any) => {
                  const ragColor = 
                    item.rag === 'green' ? 'bg-emerald-500' : 
                    item.rag === 'amber' ? 'bg-amber-500' : 
                    item.rag === 'red' ? 'bg-rose-500' : 'bg-muted-text';

                  const textRagColor = 
                    item.rag === 'green' ? 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20' : 
                    item.rag === 'amber' ? 'text-amber-600 bg-amber-500/10 border-amber-500/20' : 
                    item.rag === 'red' ? 'text-rose-600 bg-rose-500/10 border-rose-500/20' : 'text-ink-soft bg-panel-2 border-panel-border';

                  return (
                    <div 
                      key={item.name} 
                      onClick={() => handleItemClick(item, group.title)}
                      className="group flex justify-between items-center p-2 rounded-lg border border-panel-border bg-panel-2/20 hover:bg-panel-2 hover:border-ink-soft transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ragColor}`} />
                        <div className="truncate">
                          <p className="text-[11px] font-semibold text-ink truncate leading-tight">{item.name}</p>
                          {item.meta && (
                            <p className="text-[9px] text-ink-soft font-light mt-0.5 truncate leading-none">{item.meta}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className={`px-2 py-0.5 rounded text-[11px] font-bold border shrink-0 ${textRagColor}`}>
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
