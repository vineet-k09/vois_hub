import React, { useState } from 'react';
import KPIGrid from './components/KPIGrid';
import Exceptions from './components/Exceptions';
import CustomerLens from './components/CustomerLens';
import Transformation from './components/Transformation';
import GoalsAlignment from './components/GoalsAlignment';
import DrillDownDrawer from './components/DrillDownDrawer';
import dashboardData from './data/dashboard_data.json';
import { Sparkles, FileText, Send, Layers, ChevronRight, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeStakeholder, setActiveStakeholder] = useState('★ Board Members');
  const [activePillar, setActivePillar] = useState('CEO SUMMARY');
  const [selectedReqId, setSelectedReqId] = useState('1');

  const { branding, navigation, aiSummary, sections, annotations } = dashboardData as any;
  const req05_08 = sections.find((s: any) => s.id === "REQ 05 · 08");
  const activeReq = annotations[selectedReqId] || annotations['1'];

  const handleDrillDown = (item: any) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleActionClick = (actionName: string) => {
    handleDrillDown({
      type: 'action',
      label: actionName,
      name: actionName,
      description: `Triggered dashboard action: ${actionName}. Running with CEO credentials.`
    });
  };

  // Find critical alerts for Left Sidebar KPI Watch
  const criticalKpis = [
    { label: 'EBITDA €M', val: '−36.33', target: '0', rag: 'red' },
    { label: 'Cost Takeout €M', val: '141.62', target: '102', rag: 'amber' },
    { label: 'Spirit Beat', val: '85', target: '80', rag: 'green' }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-[#f8fafc] text-slate-800 font-inter selection:bg-[#c40089] selection:text-white">
      
      {/* ================= COLUMN 1: LEFT SIDEBAR (VODAFONE RED) ================= */}
      <aside className="w-72 bg-[#e60000] text-white flex flex-col justify-between shrink-0 h-full overflow-y-auto">
        <div className="p-5 space-y-6">
          {/* Header & User Profile */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white text-[#e60000] font-barlow font-black text-xl px-2 py-0.5 rounded shadow">
                {branding.logo}
              </div>
              <div>
                <h1 className="font-barlow text-lg font-bold tracking-wide leading-none">{branding.name}</h1>
                <p className="text-white/70 text-[9px] uppercase tracking-widest font-semibold mt-0.5">CEO Portal</p>
              </div>
            </div>
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 text-white font-bold text-[10px] flex items-center justify-center border border-white/20">
                {branding.user.initials}
              </div>
            </div>
          </div>

          {/* Slices navigation (REQ 05) */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-white/50 text-[9px] font-bold uppercase tracking-widest pl-1">
              <Layers size={10} /> Stakeholder Slices
            </div>
            <div className="space-y-1">
              {req05_08?.stakeholderSlices?.map((slice: string) => (
                <button
                  key={slice}
                  onClick={() => {
                    setActiveStakeholder(slice);
                    setSelectedReqId('5'); // sync annotations
                    handleDrillDown({
                      type: 'stakeholder',
                      label: `Stakeholder Slice: ${slice}`,
                      name: slice,
                      description: `Displaying dashboard slice tailored for the ${slice} review.`
                    });
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                    activeStakeholder === slice
                      ? 'bg-white text-[#e60000] font-bold shadow-sm'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="truncate">{slice.replace('★ ', '')}</span>
                  <ChevronRight size={10} className={activeStakeholder === slice ? 'text-[#e60000]' : 'text-white/40'} />
                </button>
              ))}
            </div>
          </div>

          {/* Strategic Navigation (Pillars) */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest pl-1">
              Strategic Pillars
            </div>
            <div className="grid grid-cols-1 gap-1">
              {navigation.slice(0, 6).map((item: any) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActivePillar(item.label);
                    if (item.label !== 'CEO SUMMARY') {
                      handleDrillDown({
                        type: 'navigation',
                        label: item.label,
                        name: item.label,
                        description: `Explore the detailed ${item.label} dashboard module.`
                      });
                    }
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                    activePillar === item.label
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column Bottom - Summarized KPI Alerts Watch */}
        <div className="p-4 bg-black/10 border-t border-white/10 space-y-3 shrink-0">
          <div className="flex items-center gap-1.5 text-white/50 text-[9px] font-bold uppercase tracking-widest">
            <Activity size={10} /> Critical KPI Watch
          </div>
          <div className="grid grid-cols-2 gap-2">
            {criticalKpis.map((kpi) => (
              <div 
                key={kpi.label} 
                className={`p-2 rounded-xl border flex flex-col justify-between h-14 cursor-pointer hover:bg-white/5 transition-all ${
                  kpi.rag === 'red' 
                    ? 'border-red-400 bg-red-950/20' 
                    : kpi.rag === 'amber' 
                    ? 'border-amber-400 bg-amber-950/20' 
                    : 'border-white/10 bg-white/5'
                }`}
                onClick={() => setSelectedReqId('1')}
              >
                <span className="text-[8px] text-white/60 font-medium truncate block leading-none">{kpi.label}</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-barlow font-bold text-white leading-none">{kpi.val}</span>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    kpi.rag === 'red' ? 'bg-red-500' : kpi.rag === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ================= COLUMN 2: CENTER MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm">
          <div>
            <h2 className="font-barlow text-xl font-bold tracking-wide text-slate-800 uppercase leading-none">
              CEO Strategic Portal
            </h2>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider mt-1">
              {branding.period}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded">
              Audience: {activeStakeholder.replace('★ ', '')}
            </span>
          </div>
        </header>

        {/* Main scrollable canvas */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          
          {/* Strategic AI Insights Banner (REQ 02) */}
          <section className="bg-white border border-slate-200/70 rounded-3xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#e60000] to-[#c40089]" />
            
            {/* Req pin */}
            <div 
              className="req-pin cursor-pointer"
              onClick={() => setSelectedReqId('2')}
              title="Requirement #2: AI Board Narrative"
            >
              2
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start relative z-10 pl-2">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-[#e60000] to-[#c40089] text-white p-1 rounded-lg">
                    <Sparkles size={12} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                      REQ 02 · AI Executive Summary
                    </span>
                    <h3 className="text-base font-barlow font-bold text-slate-800 uppercase tracking-wide mt-0.5">
                      {aiSummary.title}
                    </h3>
                  </div>
                </div>
                
                <p 
                  className="text-slate-600 text-xs leading-relaxed font-light italic" 
                  dangerouslySetInnerHTML={{ __html: `"${aiSummary.overall}"` }}
                />
                
                <div className="flex gap-2 pt-1">
                  <button 
                    onClick={() => handleActionClick('Generate Board PDF')}
                    className="flex items-center gap-1.5 bg-[#1e293b] text-white px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <FileText size={12} />
                    Generate Board PDF
                  </button>
                  <button 
                    onClick={() => handleActionClick('Email Monthly Pack')}
                    className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-slate-50 transition-colors"
                  >
                    <Send size={12} />
                    Email Monthly Pack
                  </button>
                </div>
              </div>

              {/* AI Bullet points Split */}
              <div className="w-full lg:w-[420px] grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/80 shrink-0">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" /> Takeaways
                  </span>
                  <ul className="space-y-1.5">
                    {aiSummary.takeaways?.map((item: any, i: number) => (
                      <li key={i} className="text-[10px] text-slate-600 leading-snug border-l border-emerald-500/30 pl-1.5">
                        <b className="text-slate-800">{item.text.split(':')[0]}:</b>
                        {item.text.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500" /> Watchpoints
                  </span>
                  <ul className="space-y-1.5">
                    {aiSummary.watchpoints?.map((item: any, i: number) => (
                      <li key={i} className="text-[10px] text-slate-600 leading-snug border-l border-red-500/30 pl-1.5">
                        <b className="text-slate-800">{item.text.split(':')[0]}:</b>
                        {item.text.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 1: FY27 KPI GRID (REQ 01 & 07) */}
          <KPIGrid onDrillDown={handleDrillDown} onSelectReq={setSelectedReqId} />

          {/* SECTION 2 & 3: EXCEPTIONS & CUSTOMER LENS (REQ 03 & 04) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Exceptions onDrillDown={handleDrillDown} onSelectReq={setSelectedReqId} />
            <CustomerLens onDrillDown={handleDrillDown} onSelectReq={setSelectedReqId} />
          </div>

          {/* SECTION 4 & 5: ROADMAPS, GOALS & GMT GRIP (REQ 06, 07 & 08) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Transformation onDrillDown={handleDrillDown} onSelectReq={setSelectedReqId} />
            
            <div className="space-y-6 flex flex-col justify-between">
              {/* GMT Owner Grip (REQ 08 Exception details) */}
              {req05_08 && (
                <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
                  
                  <div 
                    className="req-pin cursor-pointer"
                    onClick={() => setSelectedReqId('8')}
                    title="Requirement #8: GMT Owner Grip"
                  >
                    8
                  </div>
                  
                  <div>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-4 mb-6 pl-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                            REQ 08 · GMT Owner Grip
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        </div>
                        <h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
                          GMT Owner Grip
                        </h2>
                        <p className="text-slate-400 text-xs italic font-light mt-0.5">GMT metrics review context</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pl-2">
                      {req05_08.gmtGrip?.slice(0, 4).map((item: any) => (
                        <div 
                          key={item.name} 
                          className="group flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/10 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"
                          onClick={() => handleDrillDown({ ...item, type: 'exception', label: item.name })}
                        >
                          <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              item.rag === 'green' ? 'bg-emerald-500' : item.rag === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                            }`} />
                            {item.name}
                          </span>
                          <span className="text-[10px] font-bold text-[#c40089] uppercase tracking-wider hover:underline">
                            Verify Grip →
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              <GoalsAlignment onDrillDown={handleDrillDown} onSelectReq={setSelectedReqId} />
            </div>
          </div>
        </div>
      </main>

      {/* ================= COLUMN 3: RIGHT PANEL (WORKSHOP ANNOTATIONS) ================= */}
      <aside className="w-80 bg-white border-l border-slate-200/80 flex flex-col shrink-0 h-full overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-[#e60000] text-white p-1 rounded-lg">
              <ChevronRight size={14} className="rotate-90" />
            </div>
            <h3 className="font-barlow text-sm font-bold text-slate-800 uppercase tracking-wider">
              Workshop Requirements
            </h3>
          </div>
          <p className="text-[9.5px] text-slate-400 font-light mt-1">
            Gary (CEO) Workshop Specs & Dependencies
          </p>
        </div>

        {/* 1-8 Requirements Selector Grid */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/30 shrink-0">
          <div className="grid grid-cols-4 gap-1.5">
            {Object.keys(annotations).map((id) => {
              const reqMeta = annotations[id];
              const isSelected = selectedReqId === id;
              const statusColor = 
                reqMeta.status === 'GREEN' ? 'bg-emerald-500' : 
                reqMeta.status === 'AMBER' ? 'bg-amber-500' : 
                reqMeta.status === 'RED' ? 'bg-red-500' : 'bg-purple-900';

              return (
                <button
                  key={id}
                  onClick={() => setSelectedReqId(id)}
                  className={`relative p-2.5 rounded-xl border text-center transition-all ${
                    isSelected 
                      ? 'border-[#e60000] bg-red-50/20 text-[#e60000] font-black ring-1 ring-[#e60000]/10' 
                      : 'border-slate-100 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-barlow block leading-none">{id}</span>
                  <span className={`absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full ${statusColor}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Annotation Detail Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                REQ 0{selectedReqId}
              </span>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded text-white ${
                activeReq.status === 'GREEN' ? 'bg-emerald-600' : 
                activeReq.status === 'AMBER' ? 'bg-amber-600' : 
                activeReq.status === 'RED' ? 'bg-red-600' : 'bg-[#3a1635]'
              }`}>
                {activeReq.status}
              </span>
            </div>
            <h4 className="text-sm font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1.5">
              {activeReq.title.split('—')[1] || activeReq.title}
            </h4>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Description</span>
            <p className="text-xs text-slate-600 leading-relaxed font-light">{activeReq.description}</p>
          </div>

          {/* User Story */}
          <div className="bg-[#e60000]/[0.02] border-l-2 border-[#e60000] p-3 rounded-r-lg">
            <span className="text-[8px] font-bold text-[#e60000] uppercase tracking-widest block mb-0.5">User Story</span>
            <p className="text-[11px] text-slate-700 leading-relaxed italic font-light">"{activeReq.userStory}"</p>
          </div>

          {/* Workshop Feedback */}
          <div className="space-y-1">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Workshop Feedback</span>
            <ul className="space-y-1 text-xs text-slate-600">
              {activeReq.feedback?.map((fb: string, i: number) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 size={10} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{fb}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dependencies */}
          {activeReq.dependencies && activeReq.dependencies.length > 0 && (
            <div className="space-y-1 border-t border-slate-100 pt-3">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Dependencies</span>
              <ul className="space-y-1 text-xs text-slate-600">
                {activeReq.dependencies.map((dep: string, i: number) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <ShieldAlert size={10} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{dep}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Acceptance Criteria */}
          <div className="space-y-1 border-t border-slate-100 pt-3">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-bold">Acceptance Criteria</span>
            <div className="text-xs text-slate-600 leading-relaxed">
              {Array.isArray(activeReq.acceptanceCriteria) ? (
                <ul className="list-disc pl-4 space-y-1">
                  {activeReq.acceptanceCriteria.map((ac: string, i: number) => (
                    <li key={i}>{ac}</li>
                  ))}
                </ul>
              ) : (
                <p>{activeReq.acceptanceCriteria}</p>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Global Drill-down Side Drawer */}
      <DrillDownDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        data={selectedItem} 
      />
    </div>
  );
};

export default App;
