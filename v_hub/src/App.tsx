import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [viewMode, setViewMode] = useState<'dashboard' | 'split' | 'deep-dive'>('dashboard');
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (viewMode === 'dashboard') {
      setDrawerOpen(true);
    }
  };

  const handleActionClick = (actionName: string) => {
    handleDrillDown({
      type: 'action',
      label: actionName,
      name: actionName,
      description: `Triggered dashboard action: ${actionName}. Running with CEO credentials.`
    });
  };

  // Status mapping for pillars select indicators
  const getNavLabelPrefix = (label: string) => {
    switch (label) {
      case 'CEO SUMMARY':
        return '🔴 ';
      case 'TOP-LINE GROWTH':
      case 'CUSTOMER':
      case 'OPERATING':
      case 'TRANSFORMATION':
      case 'FY27 GOALS':
        return '🟡 ';
      case 'BE UNRIVALLED':
      case 'PARTNERSHIP SUCCESS':
        return '🟢 ';
      default:
        return '';
    }
  };

  const dashboardContent = (
    <>
      {/* HIERARCHY LEVEL 1: CRITICAL KPI OVERVIEW */}
      <KPIGrid onDrillDown={handleDrillDown} showAnnotations={showAnnotations} />

      {/* HIERARCHY LEVEL 2: EXECUTIVE SUMMARY */}
      <section className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-sm relative overflow-hidden">
        {/* Numbered pin for annotations */}
        <div className="req-pin" title="Requirement #2">
          2
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-stretch relative z-10 pl-1">
          <div className="flex-1 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-red-50 text-red-600 p-1 rounded-lg">
                  <Sparkles size={13} />
                </div>
                {showAnnotations && (
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded leading-none">
                    REQ 02 · AI Executive Summary
                  </span>
                )}
              </div>
              <h2 className="text-sm font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1.5 leading-none">
                {aiSummary.title}
              </h2>
              <p
                className="text-slate-600 text-xs leading-relaxed font-light italic mt-1"
                dangerouslySetInnerHTML={{ __html: `"${aiSummary.overall}"` }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleActionClick("Generate Board PDF")}
                className="flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1 rounded-md text-[10px] font-bold hover:bg-slate-800 transition-colors shadow-xs cursor-pointer leading-none">
                <FileText size={10} />
                Generate Board PDF
              </button>
              <button
                onClick={() => handleActionClick("Email Monthly Pack")}
                className="flex items-center gap-1.5 border border-slate-200 text-slate-605 px-2.5 py-1 rounded-md text-[10px] font-bold hover:bg-slate-50 transition-colors cursor-pointer leading-none">
                <Send size={10} />
                Email Monthly Pack
              </button>
            </div>
          </div>

          {/* AI Bullet points Split - High Density */}
          <div className="w-full lg:w-115 grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 shrink-0">
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                Key Takeaways
              </span>
              <ul className="space-y-1 list-none pl-0">
                {aiSummary.takeaways?.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="text-[10.5px] text-slate-600 leading-tight border-l border-emerald-300 pl-1.5">
                    <b className="text-slate-800 font-bold">
                      {item.text.split(":")[0]}:
                    </b>
                    {item.text.split(":").slice(1).join(":")}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{" "}
                Watchpoints
              </span>
              <ul className="space-y-1 list-none pl-0">
                {aiSummary.watchpoints?.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="text-[10.5px] text-slate-605 leading-tight border-l border-amber-300 pl-1.5">
                    <b className="text-slate-805 font-bold">
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
        {showAnnotations && req02Anno && (
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5">
        <Transformation onDrillDown={handleDrillDown} showAnnotations={showAnnotations} />

        <div className="space-y-4 flex flex-col justify-between">
          {/* GMT Owner Grip (REQ 08 Exception details) */}
          {req05_08 && (
            <section className="bg-white border border-slate-200/70 rounded-2xl p-4.5 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
              {/* Numbered pin for annotation */}
              <div className="req-pin" title="Requirement #8">
                8
              </div>

              <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-2 mb-3 pl-1">
                  <div>
                    <div className="flex items-center gap-2">
                      {showAnnotations && (
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded leading-none">
                          REQ 08 · GMT Owner Grip
                        </span>
                      )}
                      {/* <span className="w-1.5 h-1.5 rounded-full bg-red-600" /> */}
                    </div>
                    <h2 className="text-base font-barlow font-bold text-slate-800 uppercase tracking-wide mt-0.5">
                      GMT Owner Grip
                    </h2>
                    <p className="text-slate-450 text-[10px] italic font-light mt-0.5">
                      GMT metrics review context
                    </p>
                  </div>
                </div>

                {/* 2-Column High-Density Grid displaying all 6 items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pl-1">
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
                        className={`group flex justify-between items-center p-2 rounded-lg border border-slate-150 transition-all cursor-pointer leading-none ${
                          isRed ? 'bg-red-50/20 hover:bg-red-50/40 border-red-200' : 
                          isAmber ? 'bg-amber-50/20 hover:bg-amber-50/40 border-amber-250' : 
                          'bg-slate-50/10 hover:bg-slate-50 border-slate-100'
                        }`}
                        onClick={() =>
                          handleDrillDown({
                            ...item,
                            type: "exception",
                            label: item.name,
                            requirementId: '8'
                          })
                        }>
                        <span className="text-[11px] font-semibold text-slate-755 flex items-center gap-1.5 min-w-0">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ragColor}`} />
                          <span className="truncate">{item.name}</span>
                        </span>
                        <span className="text-[8px] font-bold text-red-650 uppercase tracking-wider hover:underline shrink-0 pl-1.5">
                          Grip →
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* REQ 08 & 05 Annotation Cards */}
              {showAnnotations && (req08Anno || req05Anno) && (
                <div className="space-y-3 mt-3">
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
        <GoalsAlignment onDrillDown={handleDrillDown} showAnnotations={showAnnotations} />
      </div>

      {/* HIERARCHY LEVEL 5: SUPPORTING DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5">
        <Exceptions onDrillDown={handleDrillDown} showAnnotations={showAnnotations} />
        <CustomerLens onDrillDown={handleDrillDown} showAnnotations={showAnnotations} />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#09090b] font-inter flex flex-col pb-6">
      {/* =========== VODAFONE RED-TO-MAGENTA-TO-PURPLE PREMIUM GRADIENT BANNER =========== */}
      <header className="bg-linear-to-r from-[#e60000] via-[#b5004d] to-[#6d1b7b] text-white shadow-sm shrink-0">
        <motion.div 
          layout="position"
          className="w-full mx-auto py-2.5 flex flex-col sm:flex-row justify-between items-center gap-3"
          animate={{
            maxWidth: viewMode === 'split' ? '100%' : '80rem',
            paddingLeft: viewMode === 'split' ? 16 : 24,
            paddingRight: viewMode === 'split' ? 16 : 24
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/15 border border-white/20 px-2.5 py-0.5 font-barlow font-black text-xl tracking-widest rounded">
              {branding.logo}
            </div>
            <div>
              <h1 className="font-barlow text-lg font-bold tracking-wide leading-none">
                {branding.name}
              </h1>
              <p className="text-white/85 text-[9px] uppercase font-bold tracking-widest mt-0.5">
                CEO STRATEGIC PORTAL
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Annotation Toggle */}
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                showAnnotations
                  ? "bg-white text-red-655 border-white shadow-sm font-bold"
                  : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
              }`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${showAnnotations ? "bg-green-500 animate-pulse" : "bg-white/45"}`}
              />
              Requirements Mode
            </button>

            <span className="text-white/20 hidden sm:inline">|</span>

            {/* Time Stamp */}
            <div className="text-[11px] text-white/80 font-medium bg-black/10 px-2.5 py-1 rounded border border-white/5 leading-none">
              {branding.period}
            </div>

            <span className="text-white/20 hidden sm:inline">|</span>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white text-red-655 font-black text-[11px] flex items-center justify-center border border-white/20 shadow-xs">
                {branding.user.initials}
              </div>
              <div className="text-left hidden md:block leading-none">
                <p className="text-[11px] font-bold">
                  {branding.user.name}
                </p>
                <p className="text-[8px] text-white/85 uppercase font-semibold tracking-wider mt-0.5">
                  {branding.user.role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* =========== SUB-HEADER BAR: PILLARS & REVIEW VIEW DROP-DOWNS & VIEW MODES =========== */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs shrink-0 py-1.5">
        <motion.div 
          layout="position"
          className="w-full mx-auto flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3"
          animate={{
            maxWidth: viewMode === 'split' ? '100%' : '80rem',
            paddingLeft: viewMode === 'split' ? 16 : 24,
            paddingRight: viewMode === 'split' ? 16 : 24
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          
          {/* Dropdown Navigation Selectors (Infinite Scaling) */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Strategic Pillars Dropdown Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider shrink-0 border-r border-slate-205 pr-2.5 leading-none">
                Pillar
              </span>
              <select
                value={activePillar}
                onChange={(e) => {
                  const val = e.target.value;
                  setActivePillar(val);
                  if (val !== "CEO SUMMARY") {
                    handleDrillDown({
                      type: "navigation",
                      label: val,
                      name: val,
                      description: `Explore the detailed ${val} dashboard module.`,
                    });
                  }
                }}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-bold rounded-lg pl-2 pr-6 py-1.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors leading-none"
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%2352525b\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.35rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
              >
                {navigation.map((item: any) => (
                  <option key={item.label} value={item.label}>
                    {getNavLabelPrefix(item.label)}{item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Review Slices Dropdown Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-455 uppercase tracking-wider shrink-0 border-r border-slate-205 pr-2.5 leading-none flex items-center gap-0.5">
                <Layers size={10} /> View
              </span>
              <select
                value={activeStakeholder}
                onChange={(e) => {
                  const val = e.target.value;
                  setActiveStakeholder(val);
                  handleDrillDown({
                    type: "stakeholder",
                    label: `Stakeholder Slice: ${val}`,
                    name: val,
                    description: `Displaying dashboard slice tailored for the ${val} review.`,
                  });
                }}
                className="bg-slate-900 border border-slate-900 text-white text-[11px] font-bold rounded-lg pl-2 pr-6 py-1.5 outline-none cursor-pointer hover:bg-slate-800 transition-colors leading-none"
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%23a1a1aa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.35rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
              >
                {req05_08?.stakeholderSlices?.map((slice: string) => (
                  <option key={slice} value={slice}>
                    {slice}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Layout Mode Selectors */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Layout</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer leading-none ${
                  viewMode === 'dashboard' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer leading-none ${
                  viewMode === 'split' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode('deep-dive')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer leading-none ${
                  viewMode === 'deep-dive' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Deep Dive
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========== MAIN VIEWPORT LAYOUT WRAPPER (Framer Motion transitions) =========== */}
      <motion.main 
        layout="position"
        className="flex-1 w-full min-h-0 py-3 mx-auto"
        animate={{
          maxWidth: viewMode === 'split' ? '100%' : viewMode === 'deep-dive' ? '48rem' : '80rem',
          paddingLeft: viewMode === 'split' ? 16 : 24,
          paddingRight: viewMode === 'split' ? 16 : 24
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {viewMode === 'deep-dive' ? (
            <motion.div
              key="deep-dive-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="w-full"
            >
              <button 
                onClick={() => setViewMode('dashboard')}
                className="mb-3 text-[10px] font-bold text-red-655 hover:underline flex items-center gap-1 cursor-pointer leading-none"
              >
                ← Return to Dashboard View
              </button>
              <DrillDownDrawer
                open={true}
                data={selectedItem || { 
                  label: "Performance Analysis", 
                  type: "fallback", 
                  summary: "Return to the Dashboard page layout and select a KPI or metrics card to populate the full detailed analysis brief." 
                }}
                inline={true}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-or-split-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="w-full flex flex-col lg:flex-row gap-4 items-start"
            >
              {/* Left Column: Dashboard Content */}
              <motion.div 
                layout="position"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="min-w-0 w-full lg:flex-1 space-y-4"
              >
                {dashboardContent}
              </motion.div>

              {/* Right Column: Persistent Context Panel (Slides in/out layout transitions) */}
              <AnimatePresence>
                {viewMode === 'split' && (
                  <motion.div
                    key="split-panel"
                    initial={{ opacity: 0, x: 30, width: 0 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      width: isDesktop ? 420 : "100%" 
                    }}
                    exit={{ opacity: 0, x: 30, width: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full shrink-0 lg:sticky lg:top-13 z-10"
                  >
                    <DrillDownDrawer
                      open={true}
                      data={selectedItem || { 
                        label: "Performance Analysis", 
                        type: "fallback", 
                        summary: "Select any performance metric card, customer account, or initiative milestones in the left panel to display instant analytics, strategic brief notes, actions, and audit owners in this space." 
                      }}
                      inline={true}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Global Drill-down Overlay Drawer (Dashboard view overlay mode) */}
      <DrillDownDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        data={selectedItem}
        inline={false}
      />
    </div>
  );
};

export default App;