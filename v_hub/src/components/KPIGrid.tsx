import React from 'react';
import dashboardData from '../data/dashboard_data.json';

interface KPIGridProps {
  onDrillDown: (data: any) => void;
}

const KPIGrid: React.FC<KPIGridProps> = ({ onDrillDown }) => {
  const req01 = dashboardData.sections.find(s => s.id === "REQ 01") as any;
  if (!req01) return null;

  const req01Anno = (dashboardData.annotations as any)["1"];

  const handleKPIClick = (kpi: any, clusterName: string) => {
    onDrillDown({
      ...kpi,
      clusterName,
      type: 'kpi',
      label: kpi.label
    });
  };

  return (
    <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden">
      {/* Visual Accent Rail */}
      <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-4 mb-6 pl-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
              REQ 01 · top-line performance
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
            {req01.title.split('—')[0]}
          </h2>
          <p className="text-slate-400 text-xs italic font-light mt-0.5">{req01.note}</p>
        </div>
      </div>

      {/* Grid of Clusters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pl-2">
        {req01.clusters?.map((cluster: any) => (
          <div key={cluster.name} className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
              {cluster.name}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {cluster.kpis?.map((kpi: any) => {
                const isUrgent = kpi.rag === 'red' || kpi.rag === 'amber';
                
                const ragColor = 
                  kpi.rag === 'green' ? 'bg-emerald-500' : 
                  kpi.rag === 'amber' ? 'bg-amber-500' : 
                  kpi.rag === 'red' ? 'bg-rose-500' : 'bg-slate-300';

                const textRagColor = 
                  kpi.rag === 'green' ? 'text-emerald-600' : 
                  kpi.rag === 'amber' ? 'text-amber-600' : 
                  kpi.rag === 'red' ? 'text-rose-600' : 'text-slate-500';

                return (
                  <div 
                    key={kpi.label} 
                    onClick={() => handleKPIClick(kpi, cluster.name)}
                    className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-[120px] ${
                      isUrgent 
                        ? 'bg-white border-amber-200/60 shadow-sm hover:shadow-md hover:border-amber-300' 
                        : 'bg-slate-50/50 border-slate-100 hover:bg-white hover:shadow-sm hover:border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-700 leading-tight">
                        {kpi.label}
                      </span>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${ragColor}`} />
                    </div>

                    <div>
                      <div className="font-barlow text-2xl font-black text-slate-800 tracking-tight leading-none">
                        {kpi.value}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/50">
                        <span className="text-[9px] text-slate-400 font-medium">
                          {kpi.target ? `T: ${kpi.target}` : kpi.month}
                        </span>
                        {kpi.trend && (
                          <span className={`text-[9px] font-bold ${textRagColor}`}>
                            {kpi.trend}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* REQ 01 Annotation Card */}
      {req01Anno && (
        <div className="anno-card mt-8 ml-2">
          <div className="anno-head">
            <div className="nr">1</div>
            <h5>REQ 01 — {req01Anno.title}</h5>
            <div className="status green">GREEN</div>
          </div>
          <div className="anno-grid">
            <div className="anno-block">
              <h6>Workshop Feedback</h6>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                {req01Anno.feedback?.map((fb: string, i: number) => (
                  <li key={i}>{fb}</li>
                ))}
              </ul>
            </div>
            <div className="anno-block">
              <h6>Description (Updated)</h6>
              <p className="text-slate-600 text-[11px] leading-relaxed">{req01Anno.description}</p>
            </div>
            <div className="anno-block">
              <h6>Dependencies</h6>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                {req01Anno.dependencies?.map((dep: string, i: number) => (
                  <li key={i}>{dep}</li>
                ))}
              </ul>
            </div>
            <div className="anno-block">
              <h6>Acceptance Criteria</h6>
              <div className="text-slate-600 text-[11px] leading-relaxed">
                {Array.isArray(req01Anno.acceptanceCriteria) ? (
                  <ul className="list-disc pl-4 space-y-1">
                    {req01Anno.acceptanceCriteria.map((ac: string, i: number) => (
                      <li key={i}>{ac}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{req01Anno.acceptanceCriteria}</p>
                )}
              </div>
            </div>
          </div>
          <div className="anno-block us">
            <h6>User Story</h6>
            <p className="text-slate-700 italic text-[11px] font-light">"{req01Anno.userStory}"</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default KPIGrid;
