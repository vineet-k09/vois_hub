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
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [activeStakeholder, setActiveStakeholder] = useState('★ Board Members');
  const [activePillar, setActivePillar] = useState('CEO SUMMARY');
  const [viewMode, setViewMode] = useState<'split' | 'deep-dive'>('split');
  const [isDesktop, setIsDesktop] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'ceo'>(() => {
    return (localStorage.getItem('vois-theme') as any) || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-ceo');
    root.classList.add(`theme-${theme}`);
    localStorage.setItem('vois-theme', theme);
  }, [theme]);

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
  };

  const handleActionClick = (actionName: string) => {
    handleDrillDown({
      type: 'action',
      label: actionName,
      name: actionName,
      description: `Triggered dashboard action: ${actionName}. Running with CEO credentials.`
    });
  };

  const generatePDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    const element = document.body;
    try {
      // Capture the element as a PNG data URL
      const dataUrl = await toPng(element, { 
        quality: 1, 
        pixelRatio: 2, // High resolution
        backgroundColor: window.getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#f8fafc' // Matches theme body background
      });
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit the page
      const imgProps = pdf.getImageProperties(dataUrl);
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;
      
      // Center the image
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(dataUrl, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`VOIS_Hub_Executive_Summary_${branding.period.replace(/ /g, '_')}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
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
      <section id="section-summary" className="bg-panel border border-panel-border rounded-2xl p-4 shadow-sm relative overflow-hidden">
        {/* Numbered pin for annotations */}
        <div className="req-pin" title="Requirement #2">
          2
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-stretch relative z-10 pl-1">
          <div className="flex-1 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-panel-2 text-accent p-1 rounded-lg">
                  <Sparkles size={13} />
                </div>
                {showAnnotations && (
                  <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded leading-none border border-panel-border">
                    REQ 02 · AI Executive Summary
                  </span>
                )}
              </div>
              <h2 className="text-sm font-barlow font-bold text-ink uppercase tracking-wide mt-1.5 leading-none">
                {aiSummary.title}
              </h2>
              <p
                className="text-ink-soft text-xs leading-relaxed font-light italic mt-1"
                dangerouslySetInnerHTML={{ __html: `"${aiSummary.overall}"` }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className={`flex items-center gap-1.5 bg-ink text-panel px-2.5 py-1 rounded-md text-[10px] font-bold hover:opacity-90 transition-all shadow-xs cursor-pointer leading-none ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}>
                {isGenerating ? (
                  <svg className="animate-spin h-2.5 w-2.5 text-panel" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FileText size={10} />
                )}
                {isGenerating ? 'Generating...' : 'Generate Board PDF'}
              </button>
              <button
                onClick={() => handleActionClick("Email Monthly Pack")}
                className="flex items-center gap-1.5 border border-panel-border text-ink-soft px-2.5 py-1 rounded-md text-[10px] font-bold hover:bg-panel-2 transition-all cursor-pointer leading-none">
                <Send size={10} />
                Email Monthly Pack
              </button>
            </div>
          </div>

          {/* AI Bullet points Split - Improved Readability */}
          <div className="w-full lg:w-140 grid grid-cols-1 md:grid-cols-2 gap-8 bg-panel-2/80 p-5 rounded-xl border border-panel-border shrink-0">
            <div className="space-y-3.5">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />{" "}
                Key Takeaways
              </span>
              <ul className="space-y-2.5 list-none pl-0">
                {aiSummary.takeaways?.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="text-[11px] text-ink-soft leading-normal border-l-2 border-emerald-500/40 pl-2.5">
                    <b className="text-ink font-bold">
                      {item.text.split(":")[0]}:
                    </b>
                    {item.text.split(":").slice(1).join(":")}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />{" "}
                Watchpoints
              </span>
              <ul className="space-y-2.5 list-none pl-0">
                {aiSummary.watchpoints?.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="text-[11px] text-ink-soft leading-normal border-l-2 border-amber-500/40 pl-2.5">
                    <b className="text-ink font-bold">
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
            <section id="section-gmt" className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
              {/* Numbered pin for annotation */}
              <div className="req-pin" title="Requirement #8">
                8
              </div>

              <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2 mb-3 pl-1">
                  <div>
                    <div className="flex items-center gap-2">
                      {showAnnotations && (
                        <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest bg-panel-2 px-2 py-0.5 rounded leading-none border border-panel-border">
                          REQ 08 · GMT Owner Grip
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
                      GMT Owner Grip
                    </h2>
                    <p className="text-ink-soft text-[10px] italic font-light mt-0.5">
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
                    const isUrgent = isRed || isAmber;
                    
                    const colSpanClass = isUrgent ? 'md:col-span-2' : 'md:col-span-1';
                    const ragColor = 
                      isGreen ? "bg-emerald-500" : 
                      isAmber ? "bg-amber-500" : 
                      isRed ? "bg-red-500" : "bg-muted-text";

                    return (
                      <div
                        key={item.name}
                        className={`group flex justify-between items-center ${isUrgent ? 'p-2.5' : 'p-2'} rounded-lg border transition-all cursor-pointer leading-none ${colSpanClass} ${
                          isRed ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30' : 
                          isAmber ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30' : 
                          'bg-panel-2/20 hover:bg-panel-2 border-panel-border'
                        }`}
                        onClick={() =>
                          handleDrillDown({
                            ...item,
                            type: "exception",
                            label: item.name,
                            requirementId: '8'
                          })
                        }>
                        <span className={`${isUrgent ? 'text-xs' : 'text-[11px]'} font-semibold text-ink flex items-center gap-1.5 min-w-0`}>
                          <span className="flex items-center shrink-0">
                            {isRed ? (
                              <span className="flex h-1.5 w-1.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                              </span>
                            ) : (
                              <span className={`w-1.5 h-1.5 rounded-full ${ragColor}`} />
                            )}
                          </span>
                          <span className="truncate">{item.name}</span>
                        </span>
                        <span className="text-[8px] font-bold text-accent uppercase tracking-wider hover:underline shrink-0 pl-1.5">
                          Grip →
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>          
            </section>
          )}

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
              {/* DO NOT REMOVE THE BELOW */}
              {/* {req05Anno && (
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
              )} */}
            </div>
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
    <div className="min-h-screen bg-bg-main text-ink font-inter flex flex-col pb-6">
      {/* =========== VODAFONE RED-TO-MAGENTA-TO-PURPLE PREMIUM GRADIENT BANNER =========== */}
      <header className="bg-header-gradient text-white shadow-sm shrink-0">
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
            {/* Theme Toggle */}
            <div className="flex items-center bg-white/10 border border-white/20 p-0.5 rounded-lg text-white">
              <button
                onClick={() => setTheme('light')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer leading-none transition-all ${
                  theme === 'light' ? 'bg-white text-slate-800 shadow-sm' : 'hover:bg-white/5'
                }`}
                title="Light Theme"
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer leading-none transition-all ${
                  theme === 'dark' ? 'bg-white text-slate-800 shadow-sm' : 'hover:bg-white/5'
                }`}
                title="Dark Theme"
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('ceo')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer leading-none transition-all ${
                  theme === 'ceo' ? 'bg-white text-slate-800 shadow-sm' : 'hover:bg-white/5'
                }`}
                title="CEO Executive Theme"
              >
                CEO
              </button>
            </div>

            <span className="text-white/20 hidden sm:inline">|</span>

            {/* Annotation Toggle */}
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                showAnnotations
                  ? "bg-white text-red-600 border-white shadow-sm font-bold"
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
              <div className="w-7 h-7 rounded-full bg-white text-accent font-black text-[11px] flex items-center justify-center border border-white/20 shadow-xs">
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
      <section className="bg-panel border-b border-panel-border sticky top-0 z-20 shadow-xs shrink-0 py-1.5">
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
              <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider shrink-0 border-r border-panel-border pr-2.5 leading-none">
                Pillar
              </span>
              <select
                value={activePillar}
                onChange={(e) => {
                  const val = e.target.value;
                  setActivePillar(val);

                  // Autoscroll logic for Single Page application
                  const idMap: Record<string, string> = {
                    'CEO SUMMARY': 'section-summary',
                    'TOP-LINE GROWTH': 'section-kpi',
                    'CUSTOMER': 'section-customer',
                    'OPERATING': 'section-exceptions',
                    'TRANSFORMATION': 'section-transformation',
                    'FY27 GOALS': 'section-goals',
                    'BE UNRIVALLED': 'section-gmt',
                    'PARTNERSHIP SUCCESS': 'section-gmt'
                  };

                  const targetId = idMap[val];
                  if (targetId) {
                    const element = document.getElementById(targetId);
                    if (element) {
                      // Account for the sticky sub-header height
                      const headerOffset = 85; 
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                      });
                    }
                  }

                  if (val !== "CEO SUMMARY") {
                    handleDrillDown({
                      type: "navigation",
                      label: val,
                      name: val,
                      description: `Explore the detailed ${val} dashboard module.`,
                    });
                  }
                }}
                className="bg-panel-2 border border-panel-border text-ink text-[11px] font-bold rounded-lg pl-2 pr-6 py-1.5 outline-none cursor-pointer hover:bg-panel transition-colors leading-none"
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%252352525b\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.35rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
              >
                {navigation.map((item: any) => (
                  <option key={item.label} value={item.label} className="bg-panel text-ink">
                    {getNavLabelPrefix(item.label)}{item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Review Slices Dropdown Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider shrink-0 border-r border-panel-border pr-2.5 leading-none flex items-center gap-0.5">
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
                className="bg-ink border border-ink text-panel text-[11px] font-bold rounded-lg pl-2 pr-6 py-1.5 outline-none cursor-pointer hover:opacity-90 transition-all leading-none"
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%2523a1a1aa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.35rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
              >
                {req05_08?.stakeholderSlices?.map((slice: string) => (
                  <option key={slice} value={slice} className="bg-panel text-ink">
                    {slice}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Layout Mode Selectors */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider leading-none">Layout</span>
            <div className="flex items-center bg-panel-2 p-0.5 rounded-lg border border-panel-border">
              <button
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer leading-none ${
                  viewMode === 'split' ? 'bg-panel text-ink shadow-xs border border-panel-border' : 'text-ink-soft hover:text-ink'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode('deep-dive')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer leading-none ${
                  viewMode === 'deep-dive' ? 'bg-panel text-ink shadow-xs border border-panel-border' : 'text-ink-soft hover:text-ink'
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
                onClick={() => setViewMode('split')}
                className="mb-3 text-[10px] font-bold text-accent hover:underline flex items-center gap-1 cursor-pointer leading-none"
              >
                ← Return to Split View
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
    </div>
  );
};

export default App;