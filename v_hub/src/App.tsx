import React, { useState, useEffect } from 'react';
import KPIGrid from './components/KPIGrid';
import Exceptions from './components/Exceptions';
import CustomerLens from './components/CustomerLens';
import Transformation from './components/Transformation';
import GoalsAlignment from './components/GoalsAlignment';
import DrillDownDrawer from './components/DrillDownDrawer';
import AnnotationCard from './components/AnnotationCard';
import dashboardData from './data/dashboard_data.json';
import { Sparkles, FileText, Send, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [activeStakeholder, setActiveStakeholder] = useState('★ Board Members');
  const [activePillar, setActivePillar] = useState('CEO SUMMARY');

  const { branding, navigation, aiSummary, sections } = dashboardData as any;
  
  const req05_08 = sections.find((s: any) => s.id === "REQ 05 · 08");
  const req02Anno = dashboardData.annotations["2"] as any;
  const req05Anno = dashboardData.annotations["5"] as any;
  const req08Anno = dashboardData.annotations["8"] as any;

  // Toggle annotation styles on document body
  useEffect(() => {
    if (showAnnotations) {
      document.body.classList.add('anno-on');
    } else {
      document.body.classList.remove('anno-on');
    }
  }, [showAnnotations]);

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

  // Status mapping for pillars nav indicators
  const getNavStatus = (label: string) => {
    switch (label) {
      case 'CEO SUMMARY':
        return 'red';
      case 'TOP-LINE GROWTH':
      case 'CUSTOMER':
      case 'OPERATING':
      case 'TRANSFORMATION':
      case 'FY27 GOALS':
        return 'amber';
      case 'BE UNRIVALLED':
      case 'PARTNERSHIP SUCCESS':
        return 'green';
      default:
        return 'none';
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#09090b] font-inter flex flex-col pb-12">
      {/* =========== VODAFONE RED GRADIENT TOP BANNER =========== */}
      <header className="bg-gradient-to-r from-[#e60000] to-[#b30000] text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-white/15 border border-white/20 px-3 py-1 font-barlow font-black text-2xl tracking-widest rounded-lg">
              {branding.logo}
            </div>
            <div>
              <h1 className="font-barlow text-xl font-bold tracking-wide leading-none">
                {branding.name}
              </h1>
              <p className="text-white/85 text-[10px] uppercase font-bold tracking-widest mt-1">
                CEO STRATEGIC PORTAL
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Annotation Toggle */}
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                showAnnotations
                  ? "bg-white text-red-600 border-white shadow-sm font-bold scale-102"
                  : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
              }`}>
              <span
                className={`w-2 h-2 rounded-full ${showAnnotations ? "bg-green-500 animate-pulse" : "bg-white/40"}`}
              />
              Requirements Mode
            </button>

            <span className="text-white/30 hidden sm:inline">|</span>

            {/* Time Stamp */}
            <div className="text-xs text-white/80 font-medium bg-black/10 px-3 py-1.5 rounded-lg border border-white/5">
              {branding.period}
            </div>

            <span className="text-white/30 hidden sm:inline">|</span>

            {/* User Profile */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-red-600 font-black text-xs flex items-center justify-center border-2 border-white/20 shadow-sm">
                {branding.user.initials}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold leading-none">
                  {branding.user.name}
                </p>
                <p className="text-[9px] text-white/80 uppercase font-semibold tracking-wider mt-0.5">
                  {branding.user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Annotation banner (shown when annotations are ON) */}
      <div className={`anno-banner ${showAnnotations ? "on" : ""}`}>
        <span className="leg">
          <span className="pin">N</span>
        </span>
        <div>
          <b>Requirements Mode is ON.</b> Numbered pins on each section map to
          the 8 CEO persona requirements from the workshop. Each annotation
          shows the workshop status, description, dependencies, acceptance
          criteria and user story.
        </div>
        <div className="key">
          <span>
            <i style={{ background: "#16a34a" }}></i> Green — ready
          </span>
          <span>
            <i style={{ background: "#d97706" }}></i> Amber — in progress
          </span>
          <span>
            <i style={{ background: "#dc2626" }}></i> Red — blocked
          </span>
          <span>
            <i style={{ background: "#71717a" }}></i> Extension scope
          </span>
        </div>
      </div>

      {/* =========== SUB-HEADER BAR: PILLARS & STAKEHOLDER SLICES =========== */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          
          {/* Main Pillars Navigation */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0 border-r border-slate-200 pr-3 mr-1">
              Strategic Pillars
            </span>
            <nav className="flex items-center gap-1">
              {navigation.map((item: any) => {
                const navStatus = getNavStatus(item.label);
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActivePillar(item.label);
                      if (item.label !== "CEO SUMMARY") {
                        handleDrillDown({
                          type: "navigation",
                          label: item.label,
                          name: item.label,
                          description: `Explore the detailed ${item.label} dashboard module.`,
                        });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                      activePillar === item.label
                        ? "bg-red-650 text-white shadow-sm"
                        : "text-slate-605 hover:text-slate-900 hover:bg-slate-50"
                    }`}>
                    <span>{item.label}</span>
                    {navStatus !== 'none' && (
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        navStatus === 'red' ? 'bg-red-500' :
                        navStatus === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                      } ${activePillar === item.label ? 'ring-2 ring-white/50' : ''}`} />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Stakeholder Slices Filter */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1 border-t lg:border-t-0 pt-2 lg:pt-0 border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0 border-r border-slate-200 pr-3 mr-1 flex items-center gap-1">
              <Layers size={11} /> Review Views
            </span>
            <div className="flex gap-1.5">
              {req05_08?.stakeholderSlices?.map((slice: string) => (
                <button
                  key={slice}
                  onClick={() => {
                    setActiveStakeholder(slice);
                    handleDrillDown({
                      type: "stakeholder",
                      label: `Stakeholder Slice: ${slice}`,
                      name: slice,
                      description: `Displaying dashboard slice tailored for the ${slice} review.`,
                    });
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeStakeholder === slice
                      ? "bg-slate-900 text-white shadow-sm border border-slate-900"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                  {slice}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========== MAIN CONTENT AREA =========== */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        
        {/* HIERARCHY LEVEL 1: CRITICAL KPI OVERVIEW */}
        <KPIGrid onDrillDown={handleDrillDown} />

        {/* HIERARCHY LEVEL 2: EXECUTIVE SUMMARY */}
        <section className="bg-white border border-slate-200/70 rounded-3xl p-5 shadow-xs relative overflow-hidden">
          {/* Numbered pin for annotations */}
          <div className="req-pin" title="Requirement #2">
            2
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch relative z-10 pl-2">
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-red-50 text-red-600 p-1 rounded-lg">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                    REQ 02 · AI Executive Summary
                  </span>
                </div>
                <h2 className="text-base font-barlow font-bold text-slate-800 uppercase tracking-wide mt-2">
                  {aiSummary.title}
                </h2>
                <p
                  className="text-slate-600 text-[13px] leading-relaxed font-light italic mt-1"
                  dangerouslySetInnerHTML={{ __html: `"${aiSummary.overall}"` }}
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleActionClick("Generate Board PDF")}
                  className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">
                  <FileText size={12} />
                  Generate Board PDF
                </button>
                <button
                  onClick={() => handleActionClick("Email Monthly Pack")}
                  className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                  <Send size={12} />
                  Email Monthly Pack
                </button>
              </div>
            </div>

            {/* AI Bullet points Split - High Density */}
            <div className="w-full lg:w-[480px] grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100/85 shrink-0">
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                  Key Takeaways
                </span>
                <ul className="space-y-1.5 list-none pl-0">
                  {aiSummary.takeaways?.map((item: any, i: number) => (
                    <li
                      key={i}
                      className="text-[11px] text-slate-655 leading-snug border-l border-emerald-350 pl-2">
                      <b className="text-slate-850">
                        {item.text.split(":")[0]}:
                      </b>
                      {item.text.split(":").slice(1).join(":")}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{" "}
                  Watchpoints
                </span>
                <ul className="space-y-1.5 list-none pl-0">
                  {aiSummary.watchpoints?.map((item: any, i: number) => (
                    <li
                      key={i}
                      className="text-[11px] text-slate-655 leading-snug border-l border-amber-350 pl-2">
                      <b className="text-slate-850">
                        {item.text.split(":")[0]}:
                      </b>
                      {item.text.split(":").slice(1).join(":")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* REQ 02 Annotation Card */}
          {req02Anno && (
            <AnnotationCard
              id="2"
              title={req02Anno.title}
              status={req02Anno.status}
              feedback={req02Anno.feedback}
              description={req02Anno.description}
              dependencies={req02Anno.dependencies}
              acceptanceCriteria={req02Anno.acceptanceCriteria}
              userStory={req02Anno.userStory}
            />
          )}
        </section>

        {/* HIERARCHY LEVEL 3: TRANSFORMATION TRACKING */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Transformation onDrillDown={handleDrillDown} />

          <div className="space-y-8 flex flex-col justify-between">
            {/* GMT Owner Grip (REQ 08 Exception details) */}
            {req05_08 && (
              <section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
                {/* Numbered pin for annotation */}
                <div className="req-pin" title="Requirement #8">
                  8
                </div>

                <div>
                  {/* Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-4 mb-4 pl-2">
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
                      <p className="text-slate-400 text-xs italic font-light mt-0.5">
                        GMT metrics review context
                      </p>
                    </div>
                  </div>

                  {/* 2-Column High-Density Grid displaying all 6 items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                    {req05_08.gmtGrip?.map((item: any) => {
                      const isRed = item.rag === 'red';
                      const isAmber = item.rag === 'amber';
                      const isGreen = item.rag === 'green';
                      const ragColor = 
                        isGreen ? "bg-emerald-500" : 
                        isAmber ? "bg-amber-500" : 
                        isRed ? "bg-red-500" : "bg-slate-350";

                      return (
                        <div
                          key={item.name}
                          className={`group flex justify-between items-center p-3 rounded-xl border border-slate-150 transition-all cursor-pointer ${
                            isRed ? 'bg-red-50/20 hover:bg-red-50/40 border-red-200' : 
                            isAmber ? 'bg-amber-50/20 hover:bg-amber-50/40 border-amber-250' : 
                            'bg-slate-50/10 hover:bg-slate-55 border-slate-100'
                          }`}
                          onClick={() =>
                            handleDrillDown({
                              ...item,
                              type: "exception",
                              label: item.name,
                              requirementId: '8'
                            })
                          }>
                          <span className="text-xs font-semibold text-slate-750 flex items-center gap-2 min-w-0">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ragColor}`} />
                            <span className="truncate">{item.name}</span>
                          </span>
                          <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider hover:underline shrink-0 pl-2">
                            Grip →
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* REQ 08 & 05 Annotation Cards */}
                {(req08Anno || req05Anno) && (
                  <div className="space-y-4">
                    {req08Anno && (
                      <AnnotationCard
                        id="8"
                        title={req08Anno.title}
                        status={req08Anno.status}
                        feedback={req08Anno.feedback}
                        description={req08Anno.description}
                        dependencies={req08Anno.dependencies}
                        acceptanceCriteria={req08Anno.acceptanceCriteria}
                        userStory={req08Anno.userStory}
                      />
                    )}
                    {req05Anno && (
                      <AnnotationCard
                        id="5"
                        title={req05Anno.title}
                        status={req05Anno.status}
                        feedback={req05Anno.feedback}
                        description={req05Anno.description}
                        dependencies={req05Anno.dependencies}
                        acceptanceCriteria={req05Anno.acceptanceCriteria}
                        userStory={req05Anno.userStory}
                      />
                    )}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        {/* HIERARCHY LEVEL 4: STRATEGIC PILLARS */}
        <div>
          <GoalsAlignment onDrillDown={handleDrillDown} />
        </div>

        {/* HIERARCHY LEVEL 5: SUPPORTING DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Exceptions onDrillDown={handleDrillDown} />
          <CustomerLens onDrillDown={handleDrillDown} />
        </div>
      </main>

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
