import React from "react";
import dashboardData from "../data/dashboard_data.json";
import Tooltip from "./Tooltip";

interface CustomerLensProps {
	onDrillDown: (data: any) => void;
}

const CustomerLens: React.FC<CustomerLensProps> = ({ onDrillDown }) => {
	const req04 = dashboardData.sections.find((s) => s.id === "REQ 04") as any;
	if (!req04) return null;

	const handleCustomerClick = () => {
		onDrillDown({
			...req04.customerDetail,
			type: "customer",
			label: `Customer Lens: ${req04.customerDetail.name}`,
			requirementId: "4",
		});
	};

	return (
		<section
			id="section-customer"
			className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden flex flex-col justify-between">
			<div>
				{/* Header */}
				<div className="flex flex-col justify-between items-start border-b border-panel-border pb-2.5 mb-3.5 pl-1">
					<h2 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
						{req04.title.split("—")[0]}
					</h2>
					<p className="text-ink-soft text-[10px] italic font-light mt-0.5">
						{req04.note}
					</p>
				</div>
			</div>

			{/* Selected Customer profile */}
			<div className="bg-panel-2/50 p-3 rounded-xl border border-panel-border mb-4 pl-2.5 flex justify-between items-center">
				<div>
					<span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider">
						SELECTED ACCOUNT
					</span>
					<h4 className="text-lg font-bold text-ink tracking-wide mt-0.5 leading-none">
						{req04.customerDetail.name}
					</h4>
				</div>
				<div className="text-right">
					<p className="text-xs text-ink-soft font-medium leading-none">
						Lead: {req04.customerDetail.lead}
					</p>
					<p className="text-[9px] text-muted-text font-light mt-1 leading-none">
						Updated {req04.customerDetail.lastRefresh}
					</p>
				</div>
			</div>

			{/* 3 Columns detailing Customer context */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-1">
				{/* Col 1: Internal Performance */}
				<div className="space-y-2">
					<h5 className="text-[9px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1">
						Internal Performance
					</h5>
					<div className="space-y-1">
						{req04.customerDetail.internalPerformance?.map((item: any) => {
							const textRagColor =
								item.rag === "green"
									? "text-emerald-500 font-semibold"
									: item.rag === "amber"
										? "text-amber-500 font-semibold"
										: item.rag === "red"
											? "text-rose-500 font-semibold"
											: "text-ink";

							const getPerformanceTooltip = (metric: string) => {
								switch (metric) {
									case "NPS (rolling)":
										return "Net Promoter Score (rolling average). Green indicator shows high customer satisfaction.";
									case "Service Health":
										return "Overall health of operations. Green indicates zero critical SLA breaches.";
									case "Incidents (P1/P2)":
										return "Priority 1 & 2 incidents raised. Amber: 3 items require monitoring.";
									case "Change Success":
										return "Percentage of successful system changes. Above the 95% baseline.";
									case "Contract Margin":
										return "Financial margin on the contract. Amber: currently below optimal 10% threshold.";
									default:
										return "Key internal performance indicator for this account.";
								}
							};

							return (
								<Tooltip
									key={item.label}
									content={getPerformanceTooltip(item.label)}
									position="top">
									<div className="flex justify-between items-center text-[11px] py-1 border-b border-panel-border/50 leading-none cursor-help hover:bg-panel-2/30 px-1 rounded transition-colors">
										<span className="text-ink font-medium">{item.label}</span>
										<span className={textRagColor}>{item.value}</span>
									</div>
								</Tooltip>
							);
						})}
					</div>
				</div>

				{/* Col 2: MMD narrative */}
				<div className="space-y-2">
					<h5 className="text-[9px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1">
						MMD — SME Insights
					</h5>
					<div className="space-y-2">
						<div className="bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
							<span className="text-[8px] font-bold text-accent uppercase tracking-wider block mb-1 leading-none">
								Problem Jobs (
								{req04.customerDetail.mmdNarrative?.problemJobs?.length || 0})
							</span>
							<ul className="space-y-1 pl-0 list-none">
								{req04.customerDetail.mmdNarrative?.problemJobs?.map(
									(job: string, idx: number) => {
										const getProblemJobTooltip = (j: string) => {
											switch (j) {
												case "latency on EU-billing batch":
													return "Batch latency currently exceeding target of 2 hours. Fixing in Q2.";
												case "service-now backlog on tickets > 7d":
													return "Backlog reduction plan active. Operations team is reviewing ticket load.";
												case "onshore staffing gap in Tier-3":
													return "Open headcount for 2 engineers. Actively recruiting to resolve.";
												default:
													return "Active problem area identified by service delivery managers.";
											}
										};
										return (
											<Tooltip
												key={idx}
												content={getProblemJobTooltip(job)}
												position="top">
												<li className="text-[10px] text-ink-soft leading-tight flex items-start gap-1 cursor-help hover:bg-red-500/5 p-0.5 rounded transition-colors">
													<span className="w-1 h-1 rounded-full bg-red-500 mt-1 shrink-0" />
													<span>{job}</span>
												</li>
											</Tooltip>
										);
									},
								)}
							</ul>
						</div>
						<p className="text-[10px] text-ink-soft font-light italic leading-normal">
							"{req04.customerDetail.mmdNarrative?.leadNarrative}"
						</p>
					</div>
				</div>

				{/* Col 3: External spend */}
				<div className="space-y-2">
					<h5 className="text-[9px] font-bold text-ink-soft uppercase tracking-widest border-b border-panel-border pb-1">
						Share-of-Wallet
					</h5>
					<div className="space-y-1">
						{req04.customerDetail.externalSpend?.map((item: any) => {
							const textRagColor =
								item.rag === "green"
									? "text-emerald-500 font-bold"
									: item.rag === "amber"
										? "text-amber-500 font-bold"
										: item.rag === "red"
											? "text-rose-500 font-bold"
											: "text-ink font-semibold";

							const getWalletTooltip = (l: string) => {
								switch (l) {
									case "Total external spend":
										return "Total annual technology spend of Vfz Group (inclusive of external vendors).";
									case "VOIS share":
										return "VOIS share of Vfz Group technology spend. Green indicator: on track.";
									case "3rd-party share":
										return "Competitor/Third-party spend share (Accenture, Capgemini, etc.).";
									case "Onshore spend":
										return "Spend on onshore consulting. High potential for offshore migration.";
									default:
										return "External spend and share-of-wallet analysis.";
								}
							};

							return (
								<Tooltip
									key={item.label}
									content={getWalletTooltip(item.label)}
									position="top">
									<div className="flex justify-between items-center text-[11px] py-1 border-b border-panel-border/50 leading-none cursor-help hover:bg-panel-2/30 px-1 rounded transition-colors">
										<span className="text-ink font-medium">{item.label}</span>
										<span className={textRagColor}>{item.value}</span>
									</div>
								</Tooltip>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CustomerLens;
