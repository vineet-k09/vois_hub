import React, { useState, useEffect } from 'react';
import KPIGrid from './components/KPIGrid';
import Exceptions from './components/Exceptions';
import CustomerLens from './components/CustomerLens';
import Transformation from './components/Transformation';
import GoalsAlignment from './components/GoalsAlignment';
import DrillDownDrawer from './components/DrillDownDrawer';
import dashboardData from './data/dashboard_data.json';
import { Sparkles, FileText, Send, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [activeStakeholder, setActiveStakeholder] = useState('Board Members');
  const [activePillar, setActivePillar] = useState('CEO SUMMARY');

  const { branding, navigation, aiSummary, sections } = dashboardData as any;
  const req05_08 = sections.find((s: any) => s.id === "REQ 05 · 08");

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

  return (
		<div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-inter selection:bg-grad-2 selection:text-white flex flex-col pb-12">
			{/* =========== VODAFONE RED-TO-PURPLE GRADIENT TOP BANNER =========== */}
			<header
				className="bg-linear-to-r 
      from-[#e60000] via-[#b5004d] to-[#6d1b7b]
      text-white shadow-md">
				<div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-4">
						<div className="bg-white/10 border border-white/20 px-3 py-1 font-barlow font-black text-2xl tracking-widest rounded-lg">
							{branding.logo}
						</div>
						<div>
							<h1 className="font-barlow text-xl font-bold tracking-wide leading-none">
								{branding.name}
							</h1>
							<p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mt-1">
								CEO STRATEGIC PORTAL
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4 flex-wrap">
						{/* Annotation Toggle */}
						<button
							onClick={() => setShowAnnotations(!showAnnotations)}
							className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
								showAnnotations
									? "bg-[#ffd1ea] text-[#3a1635] border-[#ffd1ea] shadow-inner font-bold"
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
							<div className="w-8 h-8 rounded-full bg-white text-[#c40089] font-black text-xs flex items-center justify-center border-2 border-white/20 shadow-sm">
								{branding.user.initials}
							</div>
							<div className="text-left hidden md:block">
								<p className="text-xs font-bold leading-none">
									{branding.user.name}
								</p>
								<p className="text-[9px] text-white/70 uppercase font-semibold tracking-wider mt-0.5">
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
						<i style={{ background: "#0a8a3a" }}></i> Green — ready
					</span>
					<span>
						<i style={{ background: "#e08a00" }}></i> Amber — in progress
					</span>
					<span>
						<i style={{ background: "#cc1f1f" }}></i> Red — blocked
					</span>
					<span>
						<i style={{ background: "#3a1635" }}></i> Extension scope
					</span>
				</div>
			</div>

			{/* =========== SUB-HEADER BAR: PILLARS & STAKEHOLDER SLICES =========== */}
			<section className="bg-white border-b border-slate-200/80 sticky top-0 z-20 shadow-sm">
				<div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
					{/* Main Pillars Navigation */}
					<nav className="flex items-center overflow-x-auto gap-1 py-1 scrollbar-none">
						{navigation.map((item: any) => (
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
								className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap ${
									activePillar === item.label
										? "bg-slate-100 text-[#c40089] border-b-2 border-[#c40089]"
										: "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
								}`}>
								{item.label}
							</button>
						))}
					</nav>

					{/* Stakeholder Slices Filter */}
					<div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none border-t lg:border-t-0 pt-2 lg:pt-0">
						<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
							<Layers size={11} /> Slice:
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
									className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap ${
										activeStakeholder === slice
											? "bg-[#c40089]/10 text-[#c40089] border border-[#c40089]/20 shadow-sm"
											: "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50"
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
				{/* Strategic AI Insights Banner (REQ 02) */}
				<section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden">
					<div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-[#e60000] via-[#c40089] to-[#6a1b7a]" />

					<div className="flex flex-col lg:flex-row gap-8 items-start relative z-10 pl-2">
						<div className="flex-1 space-y-4">
							<div className="flex items-center gap-2.5">
								<div className="bg-linear-to-r from-[#e60000] to-[#c40089] text-white p-1.5 rounded-lg">
									<Sparkles size={16} />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
											REQ 02 · AI Executive Summary
										</span>
									</div>
									<h2 className="text-xl font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
										{aiSummary.title}
									</h2>
								</div>
							</div>
							<p
								className="text-slate-600 text-sm leading-relaxed font-light italic"
								dangerouslySetInnerHTML={{ __html: `"${aiSummary.overall}"` }}
							/>

							<div className="flex gap-3 pt-2">
								<button
									onClick={() => handleActionClick("Generate Board PDF")}
									className="flex items-center gap-2 bg-[#1e293b] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm">
									<FileText size={14} />
									Generate Board PDF
								</button>
								<button
									onClick={() => handleActionClick("Email Monthly Pack")}
									className="flex items-center gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors">
									<Send size={14} />
									Email Monthly Pack
								</button>
							</div>
						</div>

						{/* AI Bullet points Split */}
						<div className="w-full lg:w-120 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
							<div className="space-y-3">
								<span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
									<span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
									Key Takeaways
								</span>
								<ul className="space-y-2">
									{aiSummary.takeaways?.map((item: any, i: number) => (
										<li
											key={i}
											className="text-xs text-slate-600 leading-snug border-l-2 border-emerald-500/20 pl-2">
											<b className="text-slate-800">
												{item.text.split(":")[0]}:
											</b>
											{item.text.split(":").slice(1).join(":")}
										</li>
									))}
								</ul>
							</div>

							<div className="space-y-3">
								<span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
									<span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{" "}
									Watchpoints
								</span>
								<ul className="space-y-2">
									{aiSummary.watchpoints?.map((item: any, i: number) => (
										<li
											key={i}
											className="text-xs text-slate-600 leading-snug border-l-2 border-amber-500/20 pl-2">
											<b className="text-slate-800">
												{item.text.split(":")[0]}:
											</b>
											{item.text.split(":").slice(1).join(":")}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* SECTION 1: FY27 KPI GRID (REQ 01 & 07) */}
				<KPIGrid onDrillDown={handleDrillDown} />

				{/* SECTION 2 & 3: EXCEPTIONS & CUSTOMER LENS (REQ 03 & 04) */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<Exceptions onDrillDown={handleDrillDown} />
					<CustomerLens onDrillDown={handleDrillDown} />
				</div>

				{/* SECTION 4 & 5: ROADMAPS, GOALS & GMT GRIP (REQ 06, 07 & 08) */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<Transformation onDrillDown={handleDrillDown} />

					<div className="space-y-8 flex flex-col justify-between">
						{/* GMT Owner Grip (REQ 08 Exception details) */}
						{req05_08 && (
							<section className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
								{/* Visual Accent Rail */}
								<div className="absolute top-0 left-0 w-2 h-full bg-[#3a1635]" />

								<div className="req-pin" title="Requirement #8">
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
												<span className="w-1.5 h-1.5 rounded-full bg-[#3a1635]" />
											</div>
											<h2 className="text-lg font-barlow font-bold text-slate-800 uppercase tracking-wide mt-1">
												GMT Owner Grip
											</h2>
											<p className="text-slate-400 text-xs italic font-light mt-0.5">
												GMT metrics review context
											</p>
										</div>
									</div>

									<div className="grid grid-cols-1 gap-2 pl-2">
										{req05_08.gripItems?.slice(0, 4).map((item: any) => (
											<div
												key={item.name}
												className="group flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/10 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"
												onClick={() =>
													handleDrillDown({
														...item,
														type: "exception",
														label: item.name,
													})
												}>
												<span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
													<span
														className={`w-2 h-2 rounded-full ${
															item.rag === "green"
																? "bg-emerald-500"
																: item.rag === "amber"
																	? "bg-amber-500"
																	: "bg-red-500"
														}`}
													/>
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

						<GoalsAlignment onDrillDown={handleDrillDown} />
					</div>
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
