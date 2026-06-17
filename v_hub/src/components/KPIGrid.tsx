import React from 'react';
import dashboardData from '../data/dashboard_data.json';

interface KPIGridProps {
  onDrillDown: (data: any) => void;
  onSelectReq?: (id: string) => void;
}

const KPIGrid: React.FC<KPIGridProps> = ({ onDrillDown, onSelectReq }) => {
  const req01 = dashboardData.sections.find(s => s.id === "REQ 01") as any;
  if (!req01) return null;

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
      <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600" />
      
      {/* Requirement Pin */}
      <div 
        className="req-pin cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (onSelectReq) onSelectReq('1');
        }}
        title="Requirement #1: Top-Line Performance"
      >
        1
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-4 mb-6 pl-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
              REQ 01 · top-line performance
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
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
                const isRed = kpi.rag === 'red';
                const isAmber = kpi.rag === 'amber';
                
                const ragBgDot = 
                  kpi.rag === 'green' ? 'bg-emerald-500' : 
                  kpi.rag === 'amber' ? 'bg-amber-500' : 
                  kpi.rag === 'red' ? 'bg-red-500' : 'bg-slate-300';

                // Determine dynamic classes based on severity (scream mode)
                let cardClass = "";
                let valClass = "";
                let alertHeader = null;

                if (isRed) {
                  cardClass = "col-span-2 bg-red-50/40 border-red-200 hover:border-red-300 shadow-sm";
                  valClass = "text-red-600 text-3xl font-black";
                  alertHeader = (
                    <span className="text-[8px] font-bold text-red-600 bg-red-100/50 px-1.5 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                      ⚠️ Attention Required
                    </span>
                  );
                } else if (isAmber) {
                  cardClass = "col-span-1 bg-amber-50/20 border-amber-200 hover:border-amber-300 shadow-sm";
                  valClass = "text-amber-600 text-2xl font-bold";
                  alertHeader = (
                    <span className="text-[8px] font-bold text-amber-700 bg-amber-100/40 px-1.5 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                      ⚡ Watchpoint
                    </span>
                  );
                } else {
                  cardClass = "col-span-1 bg-slate-50/30 border-slate-100 hover:bg-white hover:border-slate-200";
                  valClass = "text-slate-800 text-2xl font-black";
                }

                return (
                  <div 
                    key={kpi.label} 
                    onClick={() => handleKPIClick(kpi, cluster.name)}
                    className={`group p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[105px] ${cardClass}`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-700 leading-tight">
                          {kpi.label}
                        </span>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${ragBgDot}`} />
                      </div>
                      {alertHeader}
                    </div>

                    <div>
                      <div className={`font-barlow tracking-tight leading-none ${valClass}`}>
                        {kpi.value}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/50">
                        <span className="text-[9px] text-slate-400 font-medium">
                          {kpi.target ? `Target: ${kpi.target}` : kpi.month}
                        </span>
                        {kpi.trend && (
                          <span className={`text-[9px] font-bold ${
                            kpi.rag === 'green' ? 'text-emerald-600' : 
                            kpi.rag === 'amber' ? 'text-amber-600' : 'text-red-600'
                          }`}>
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
    </section>
  );
};

export default KPIGrid;
