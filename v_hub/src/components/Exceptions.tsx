import React from "react";
import dashboardData from "../data/dashboard_data.json";
import Tooltip from "./Tooltip";

interface ExceptionsProps {
	onDrillDown: (data: any) => void;
}

const getExceptionTooltip = (name: string) => {
	switch (name) {
		case "Project Helios — DT Group":
			return "Renewal project for DT Group. Successfully completed at €186M with on-track status.";
		case "Project Atlas — IDEA":
			return "Gen-2 deal with IDEA valued at €94M. Strategic expansion milestone completed.";
		case "Programme Iris — UKG":
			return "Deal value: €61M. Slipped from Q2 to Q3. Reviewing pipeline risk mitigation.";
		case "Vantage Cloud — DE-Local":
			return "New badge project at €48M. On track, client validation completed.";
		case "Project Orion — Vfz":
			return "Red Alert: Margin pressure on the €42M Vfz deal. Operations team is reviewing onshore costs.";
		case "Margin overshoot — Operations Tower":
			return "Red Alert: Cost is +38.8% vs budget (-€36M impact). Corrective staffing plan required.";
		case "Win→Loss lifecycle not closed":
			return "Amber: Salesforce tagging gap. Stalled opportunities require CRM cleanup.";
		case "Gen-2 categorisation incomplete":
			return "Amber: Commercial owner review is required for proper product classification.";
		case "Pipeline stalled > 90 days":
			return "Amber: €118M of pipeline has been inactive for >90 days across 6 opportunities.";
		case "Customer churn — Mid-tier":
			return "Red Alert: 2 accounts lost representing -€19M. SLA breach review in progress.";
		default:
			return "Click to drill down into exception details and action items.";
	}
};

const Exceptions: React.FC<ExceptionsProps> = ({ onDrillDown }) => {
	const req03 = dashboardData.sections.find((s) => s.id === "REQ 03") as any;
	if (!req03) return null;

	const handleItemClick = (item: any, groupTitle: string) => {
		onDrillDown({
			...item,
			groupTitle,
			type: "exception",
			label: item.name,
			requirementId: "3",
		});
	};

	return (
		<section
			id="section-exceptions"
			className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden flex flex-col justify-between">
			{/* Numbered pin for annotation */}
			<div className="req-pin" title="Requirement #3">
				3
			</div>

			<div>
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-panel-border pb-2.5 mb-3.5 pl-1">
					<div>
						<h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
							{req03.title.split("—")[0]}
						</h2>
						<p className="text-ink-soft text-[10px] italic font-light mt-0.5">
							{req03.note}
						</p>
					</div>
				</div>

				{/* Content list split */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-1">
					{req03.exceptionGroups?.map((group: any) => (
						<div key={group.title} className="space-y-2">
							<h3 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1 flex items-center gap-1.5">
								{group.title.replace("★ ", "")}
							</h3>

							<div className="space-y-1.5">
								{group.items?.map((item: any) => {
									const ragColor =
										item.rag === "green"
											? "bg-emerald-500"
											: item.rag === "amber"
												? "bg-amber-500"
												: item.rag === "red"
													? "bg-rose-500"
													: "bg-muted-text";

									const textRagColor =
										item.rag === "green"
											? "text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
											: item.rag === "amber"
												? "text-amber-600 bg-amber-500/10 border-amber-500/20"
												: item.rag === "red"
													? "text-rose-600 bg-rose-500/10 border-rose-500/20"
													: "text-ink-soft bg-panel-2 border-panel-border";

									return (
										<Tooltip
											key={item.name}
											content={getExceptionTooltip(item.name)}
											position="top">
											<div
												onClick={() => handleItemClick(item, group.title)}
												className="group flex justify-between items-center p-2 rounded-lg border border-panel-border bg-panel-2/20 hover:bg-panel-2 hover:border-ink-soft transition-all cursor-pointer">
												<div className="flex items-center gap-2 min-w-0">
													<span
														className={`w-1.5 h-1.5 rounded-full shrink-0 ${ragColor}`}
													/>
													<div className="truncate">
														<p className="text-[11px] font-semibold text-ink truncate leading-tight">
															{item.name}
														</p>
														{item.meta && (
															<p className="text-[9px] text-ink-soft font-light mt-0.5 truncate leading-none">
																{item.meta}
															</p>
														)}
													</div>
												</div>

												<div
													className={`px-2 py-0.5 rounded text-[11px] font-bold border shrink-0 ${textRagColor}`}>
													{item.value}
												</div>
											</div>
										</Tooltip>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Exceptions;
