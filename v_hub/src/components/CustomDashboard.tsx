import React, { useState } from "react";
import { FocusedVisualWrapper } from "./FocusedVisualWrapper";
import {
	ArrowUp,
	ArrowDown,
	Trash2,
	Plus,
	LayoutGrid,
	X,
	Edit3,
} from "lucide-react";

export interface VisualDefinition {
	id: string;
	name: string;
	category: string;
	dashboard: "ceo" | "finance" | "gtm" | "hr";
}

export const AVAILABLE_VISUALS: VisualDefinition[] = [
	// CEO View
	{
		id: "ceo-kpis",
		name: "Critical KPI Grid",
		category: "CEO Strategy",
		dashboard: "ceo",
	},
	{
		id: "ceo-summary",
		name: "AI Executive Summary & Watchpoints",
		category: "CEO Strategy",
		dashboard: "ceo",
	},
	{
		id: "ceo-transformation",
		name: "Group Transformation Roadmap",
		category: "CEO Strategy",
		dashboard: "ceo",
	},
	{
		id: "ceo-gmt",
		name: "GMT Owner Grip / Exception Details",
		category: "CEO Strategy",
		dashboard: "ceo",
	},
	{
		id: "ceo-goals",
		name: "FY27 Strategic Goals Alignment",
		category: "CEO Strategy",
		dashboard: "ceo",
	},
	{
		id: "ceo-exceptions",
		name: "Operating Exceptions (Helios, Atlas, Iris)",
		category: "CEO Strategy",
		dashboard: "ceo",
	},
	{
		id: "ceo-customer",
		name: "Customer Account Performance Lens",
		category: "CEO Strategy",
		dashboard: "ceo",
	},

	// Finance View
	{
		id: "finance-kpis",
		name: "Finance KPI Grid (EBITDA, Opex, Capex)",
		category: "Finance Portfolio",
		dashboard: "finance",
	},
	{
		id: "finance-risk",
		name: "Cross-Functional Risk Heatmap & List",
		category: "Finance Portfolio",
		dashboard: "finance",
	},
	{
		id: "finance-pq",
		name: "PxQ / Billing Integration Summary",
		category: "Finance Portfolio",
		dashboard: "finance",
	},
	{
		id: "finance-gov",
		name: "Basic Reporting Reliability (Parked)",
		category: "Finance Portfolio",
		dashboard: "finance",
	},

	// GTM View
	{
		id: "gtm-kpis",
		name: "GTM KPI Grid (Win Conv, Pipeline, Bookings)",
		category: "GTM Commercial",
		dashboard: "gtm",
	},
	{
		id: "gtm-pipeline",
		name: "GTM Pipeline Funnel & Stage Metrics",
		category: "GTM Commercial",
		dashboard: "gtm",
	},
	{
		id: "gtm-revrec",
		name: "GTM Revenue Recognition & Target Progress",
		category: "GTM Commercial",
		dashboard: "gtm",
	},
	{
		id: "gtm-delivery",
		name: "GTM Top-10 Delivery Risk Dashboard",
		category: "GTM Commercial",
		dashboard: "gtm",
	},
	{
		id: "gtm-offerings",
		name: "GTM Service Offerings Performance Grid",
		category: "GTM Commercial",
		dashboard: "gtm",
	},
	{
		id: "gtm-wallet",
		name: "GTM Share of Wallet vs Competitor Performance",
		category: "GTM Commercial",
		dashboard: "gtm",
	},
	{
		id: "gtm-customers",
		name: "GTM Customer Accounts SLA & NPS Tracker",
		category: "GTM Commercial",
		dashboard: "gtm",
	},
	{
		id: "gtm-competitive",
		name: "GTM Competitive Briefing Dashboard",
		category: "GTM Commercial",
		dashboard: "gtm",
	},

	// HR View
	{
		id: "hr-kpis",
		name: "HR KPI Grid (FTEs, Attrition, Cost)",
		category: "HR Strategic",
		dashboard: "hr",
	},
	{
		id: "hr-cross",
		name: "Cross-Functional HR Headcount Mastership",
		category: "HR Strategic",
		dashboard: "hr",
	},
	{
		id: "hr-promotions",
		name: "Talent Stability & Promotions Glide Path",
		category: "HR Strategic",
		dashboard: "hr",
	},
	{
		id: "hr-headcount",
		name: "Headcount & Billing Efficiency Metrics",
		category: "HR Strategic",
		dashboard: "hr",
	},
	{
		id: "hr-demand",
		name: "Demand Outlook & Fulfillment Funnel",
		category: "HR Strategic",
		dashboard: "hr",
	},
	{
		id: "hr-spirit",
		name: "Spirit Beat Drivers & Employee Sentiment",
		category: "HR Strategic",
		dashboard: "hr",
	},
	{
		id: "hr-ld",
		name: "L&D Effectiveness & Competency Mappings",
		category: "HR Strategic",
		dashboard: "hr",
	},
];

interface CustomDashboardProps {
	onDrillDown: (data: any) => void;
	customVisualIds: string[];
	setCustomVisualIds: React.Dispatch<React.SetStateAction<string[]>>;
	customDashboardName: string;
	setCustomDashboardName: (name: string) => void;
	onDeleteDashboard?: () => void;
}

export const CustomDashboard: React.FC<CustomDashboardProps> = ({
	onDrillDown,
	customVisualIds,
	setCustomVisualIds,
	customDashboardName,
	setCustomDashboardName,
	onDeleteDashboard,
}) => {
	const [showManager, setShowManager] = useState(false);
	const [isEditingName, setIsEditingName] = useState(false);
	const [nameInput, setNameInput] = useState(customDashboardName);

	const saveName = () => {
		if (nameInput.trim()) {
			setCustomDashboardName(nameInput.trim());
			localStorage.setItem("vois-custom-dashboard-name", nameInput.trim());
		}
		setIsEditingName(false);
	};

	const handleToggleVisual = (id: string) => {
		setCustomVisualIds((prev) => {
			let updated;
			if (prev.includes(id)) {
				updated = prev.filter((item) => item !== id);
			} else {
				updated = [...prev, id];
			}
			localStorage.setItem("vois-custom-visual-ids", JSON.stringify(updated));
			return updated;
		});
	};

	const handleMoveUp = (index: number) => {
		if (index === 0) return;
		setCustomVisualIds((prev) => {
			const updated = [...prev];
			const temp = updated[index];
			updated[index] = updated[index - 1];
			updated[index - 1] = temp;
			localStorage.setItem("vois-custom-visual-ids", JSON.stringify(updated));
			return updated;
		});
	};

	const handleMoveDown = (index: number) => {
		if (index === customVisualIds.length - 1) return;
		setCustomVisualIds((prev) => {
			const updated = [...prev];
			const temp = updated[index];
			updated[index] = updated[index + 1];
			updated[index + 1] = temp;
			localStorage.setItem("vois-custom-visual-ids", JSON.stringify(updated));
			return updated;
		});
	};

	return (
		<div className="space-y-6">
			{/* Dashboard Top Header Control Panel */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-panel border border-panel-border p-4.5 rounded-2xl shadow-sm">
				<div className="space-y-1.5 flex-1 w-full min-w-0">
					<div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full text-[9.5px] font-black uppercase text-accent tracking-wider leading-none">
						<LayoutGrid size={10} /> Bespoke Persona View
					</div>

					<div className="flex items-center gap-2 group w-full">
						{isEditingName ? (
							<div className="flex items-center gap-2 w-full max-w-md">
								<input
									type="text"
									value={nameInput}
									onChange={(e) => setNameInput(e.target.value)}
									onBlur={saveName}
									onKeyDown={(e) => e.key === "Enter" && saveName()}
									autoFocus
									className="bg-panel-2 border border-accent text-ink rounded-lg px-2.5 py-1 text-sm font-bold w-full outline-none"
								/>
								<button
									onClick={saveName}
									className="bg-ink text-panel text-[10px] font-black uppercase px-3 py-1.5 rounded-lg cursor-pointer">
									Save
								</button>
							</div>
						) : (
							<div className="flex items-center gap-2 max-w-full">
								<h1 className="text-xl md:text-2xl  font-bold text-ink uppercase tracking-wide truncate">
									{customDashboardName}
								</h1>
								<button
									onClick={() => {
										setNameInput(customDashboardName);
										setIsEditingName(true);
									}}
									className="text-ink-soft hover:text-accent p-1 rounded-lg transition-colors cursor-pointer"
									title="Rename Custom Dashboard">
									<Edit3 size={14} />
								</button>
							</div>
						)}
					</div>

					<p className="text-[11px] text-ink-soft font-light">
						Consolidated custom executive dashboard. Mix and match operational
						visuals, KPIs, and reports below.
					</p>
				</div>

				<div className="flex items-center gap-2 shrink-0">
					<button
						onClick={() => setShowManager(true)}
						className="flex items-center gap-1.5 bg-accent text-white hover:opacity-90 transition-all px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
						<Plus size={14} /> Add/Remove Visuals
					</button>

					{customVisualIds.length > 0 && (
						<button
							onClick={() => {
								if (
									confirm(
										"Are you sure you want to delete this custom dashboard? This will remove all selected visuals and reset the dashboard name.",
									)
								) {
									onDeleteDashboard?.();
								}
							}}
							className="flex items-center gap-1.5 border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
							title="Delete Custom Dashboard">
							<Trash2 size={14} /> Delete Dashboard
						</button>
					)}
				</div>
			</div>

			{/* Visuals Content List */}
			{customVisualIds.length > 0 ? (
				<div className="grid grid-cols-1 gap-6">
					{customVisualIds.map((vId, idx) => {
						const visual = AVAILABLE_VISUALS.find((v) => v.id === vId);
						if (!visual) return null;

						return (
							<div
								key={vId}
								className="bg-panel border border-panel-border rounded-2xl shadow-sm overflow-hidden flex flex-col group relative">
								{/* Visual Header Actions bar */}
								<div className="bg-panel-2/70 px-4 py-2 border-b border-panel-border flex justify-between items-center z-10">
									<div className="flex items-center gap-2">
										<span className="text-[9.5px] font-bold text-panel bg-ink-soft/80 px-2 py-0.5 uppercase tracking-wider rounded-sm leading-none">
											{visual.category}
										</span>
										<h3 className="text-xs font-bold text-ink uppercase tracking-wide">
											{visual.name}
										</h3>
									</div>

									<div className="flex items-center gap-1.5">
										{/* Move Up */}
										<button
											onClick={() => handleMoveUp(idx)}
											disabled={idx === 0}
											className={`p-1 rounded hover:bg-panel-border transition-colors ${idx === 0 ? "text-ink-soft/30 cursor-not-allowed" : "text-ink-soft hover:text-ink cursor-pointer"}`}
											title="Move visual up">
											<ArrowUp size={12} />
										</button>

										{/* Move Down */}
										<button
											onClick={() => handleMoveDown(idx)}
											disabled={idx === customVisualIds.length - 1}
											className={`p-1 rounded hover:bg-panel-border transition-colors ${idx === customVisualIds.length - 1 ? "text-ink-soft/30 cursor-not-allowed" : "text-ink-soft hover:text-ink cursor-pointer"}`}
											title="Move visual down">
											<ArrowDown size={12} />
										</button>

										<span className="w-px h-3 bg-panel-border" />

										{/* Remove */}
										<button
											onClick={() => handleToggleVisual(vId)}
											className="p-1 rounded text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
											title="Remove visual from Custom Dashboard">
											<Trash2 size={12} />
										</button>
									</div>
								</div>

								{/* Visual Body Render */}
								<div className="p-4 bg-panel relative min-h-0">
									<FocusedVisualWrapper
										visualId={vId}
										onDrillDown={onDrillDown}
									/>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="border-2 border-dashed border-panel-border rounded-2xl p-10 flex flex-col items-center text-center justify-center space-y-4 bg-panel/30">
					<div className="w-12 h-12 rounded-full bg-panel-2 border border-panel-border flex items-center justify-center text-ink-soft">
						<LayoutGrid size={22} />
					</div>
					<div className="space-y-1 max-w-sm">
						<h3 className="text-sm font-bold text-ink uppercase tracking-wide">
							Your Dashboard is Empty
						</h3>
						<p className="text-xs text-ink-soft font-light">
							Build your customized strategy report. Add metrics cards, charts,
							pipelines, or roadmap items from any dashboard.
						</p>
					</div>
					<button
						onClick={() => setShowManager(true)}
						className="flex items-center gap-1.5 bg-accent text-white hover:opacity-90 transition-all px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
						<Plus size={12} /> Add Your First Visual
					</button>
				</div>
			)}

			{/* Selector Manager Modal overlay */}
			{showManager && (
				<div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
					<div className="bg-panel border border-panel-border rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
						{/* Modal Header */}
						<div className="bg-panel-2 px-5 py-4 border-b border-panel-border flex justify-between items-center shrink-0">
							<div>
								<h3 className="text-sm font-bold text-ink uppercase tracking-wide">
									Configure Custom Dashboard Visuals
								</h3>
								<p className="text-[10px] text-ink-soft font-light">
									Select the visual blocks to render inside your custom
									executive report view.
								</p>
							</div>
							<button
								onClick={() => setShowManager(false)}
								className="text-ink-soft hover:text-ink p-1 rounded-lg transition-colors cursor-pointer">
								<X size={16} />
							</button>
						</div>

						{/* Modal Content Scroll */}
						<div className="p-5 overflow-y-auto space-y-4.5">
							{["ceo", "finance", "gtm", "hr"].map((db) => {
								const dbName =
									db === "ceo"
										? "CEO Exception Suite"
										: db === "finance"
											? "Finance Suite"
											: db === "gtm"
												? "GTM Suite"
												: "HR Suite";
								const items = AVAILABLE_VISUALS.filter(
									(v) => v.dashboard === db,
								);

								return (
									<div key={db} className="space-y-2">
										<h4 className="text-[9.5px] font-black text-accent uppercase tracking-widest pl-1.5 border-l-2 border-accent leading-none">
											{dbName}
										</h4>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
											{items.map((item) => {
												const isAdded = customVisualIds.includes(item.id);
												return (
													<div
														key={item.id}
														onClick={() => handleToggleVisual(item.id)}
														className={`flex justify-between items-center p-3 rounded-xl border transition-all cursor-pointer select-none leading-none ${
															isAdded
																? "bg-accent/5 border-accent/40 shadow-xs"
																: "bg-panel-2 border-panel-border/70 hover:bg-panel-2/80 hover:border-panel-border"
														}`}>
														<span className="text-[11px] font-bold text-ink-soft truncate mr-2">
															{item.name}
														</span>
														<span
															className={`text-[8.5px] font-black px-2 py-1 rounded-md border shrink-0 transition-colors uppercase leading-none ${
																isAdded
																	? "bg-accent text-white border-accent"
																	: "bg-panel border-panel-border text-ink-soft"
															}`}>
															{isAdded ? "Selected" : "Add"}
														</span>
													</div>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>

						{/* Modal Footer */}
						<div className="bg-panel-2 px-5 py-3 border-t border-panel-border flex justify-end shrink-0">
							<button
								onClick={() => setShowManager(false)}
								className="bg-ink text-panel hover:opacity-90 transition-all px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
								Close & View Dashboard ({customVisualIds.length})
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
