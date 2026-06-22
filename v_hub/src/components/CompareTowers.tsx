import React, { useState, useEffect } from "react";
import {
	Sparkles,
	User,
	ClipboardList,
	TrendingUp,
	DollarSign,
	Activity,
	Award,
	Cpu,
	Layers,
	Globe,
	Users,
	Heart,
	Briefcase,
	Zap,
	BarChart3,
} from "lucide-react";
import {
	ComposedChart,
	Line,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	Legend,
} from "recharts";

interface CompareTowersProps {
	onDrillDown: (data: any) => void;
	compareMode?: "towers" | "markets";
}

const towerData: Record<
	string,
	{
		name: string;
		role: string;
		leader: string;
		meta: {
			headcount: string;
			locations: string;
			revenueShare: string;
		};
		kpis: {
			key: string;
			label: string;
			val: string;
			status: string;
			desc: string;
		}[];
		radarStats: { subject: string; A: number; fullMark: number }[];
		monthlyPerformance: { month: string; value: number }[];
		strategicBrief: string;
		actionItems: string[];
	}
> = {
	Overall: {
		name: "Overall VOIS Group",
		role: "Consolidated Global Operations",
		leader: "Gary (Group CEO)",
		meta: {
			headcount: "24,850 FTE",
			locations: "Global Network (Tier-1, 2 & 3 Hubs)",
			revenueShare: "100% Consolidated",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€2,858M",
				status: "green",
				desc: "Consolidated group revenue target met (+1.53% YoY)",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€141.62M takeout",
				status: "amber",
				desc: "Ahead of schedule vs €102M target, though offset by operational overheads",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "−€36.33M",
				status: "red",
				desc: "Under pressure due to cost overruns in delivery towers",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.4%",
				status: "green",
				desc: "Group SLA adherence rate above 99% threshold",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "85",
				status: "green",
				desc: "Robust employee satisfaction, outperforming industry standard",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "78%",
				status: "amber",
				desc: "Critical roles coverage under target of 85%",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "72%",
				status: "green",
				desc: "FTE displacement via RPA and AI ops platforms",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€38.0M",
				status: "green",
				desc: "Aggregated financial value realized from H2 programs",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 80, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 85, fullMark: 100 },
			{ subject: "Delivery Quality", A: 90, fullMark: 100 },
			{ subject: "Talent Stability", A: 78, fullMark: 100 },
			{ subject: "Automation Rate", A: 72, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 82 },
			{ month: "Nov-25", value: 83 },
			{ month: "Dec-25", value: 81 },
			{ month: "Jan-26", value: 84 },
			{ month: "Feb-26", value: 85 },
			{ month: "Mar-26", value: 85 },
		],
		strategicBrief:
			"VOIS Group continues to demonstrate overall resilience. Digital expansion targets are meeting objectives, but cost overruns in select delivery towers present EBITDA headwind.",
		actionItems: [
			"Approve Group-level resource allocations for FY27 Planning",
			"Reconcile Salesforce Horizon-2 pipeline tagging exceptions",
			"Deploy custom AI copilot platform in CARE tower to mitigate talent gaps",
		],
	},
	CFST: {
		name: "Corporate Functions (CFST)",
		role: "HR, Finance, Legal & Facilities Services",
		leader: "Sima (CHRO) & Sarah (CFO)",
		meta: {
			headcount: "1,240 FTE",
			locations: "Pune, Budapest, Bucharest",
			revenueShare: "7.3% Billing",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€210M",
				status: "green",
				desc: "Corporate chargebacks fully aligned to consumption keys",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€22.40M takeout",
				status: "green",
				desc: "Exceeded cost-saving goals by €2.4M via system consolidation",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "€12.50M",
				status: "green",
				desc: "Healthy positive margin contribution from optimized support functions",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.7%",
				status: "green",
				desc: "Outstanding reporting accuracy and ticket resolution times",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "82",
				status: "green",
				desc: "Solid engagement score in back-office teams",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "84%",
				status: "green",
				desc: "Highly stable talent pool; critical roles near full capacity",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "65%",
				status: "amber",
				desc: "RPA deployed for general ledger reconciliations and payroll",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€5.2M",
				status: "green",
				desc: "Savings from finance digital portal and HR ticket automated routing",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 70, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 92, fullMark: 100 },
			{ subject: "Delivery Quality", A: 95, fullMark: 100 },
			{ subject: "Talent Stability", A: 85, fullMark: 100 },
			{ subject: "Automation Rate", A: 65, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 88 },
			{ month: "Nov-25", value: 89 },
			{ month: "Dec-25", value: 87 },
			{ month: "Jan-26", value: 89 },
			{ month: "Feb-26", value: 90 },
			{ month: "Mar-26", value: 91 },
		],
		strategicBrief:
			"CFST has achieved high efficiency through back-office automation. Focus is on transitioning manual payroll workflows to self-service hubs.",
		actionItems: [
			"Finalize general ledger automation migration by Q2 close",
			"Deploy self-service HR ticketing system globally to lower facilities drag",
			"Initiate upskilling workshops for finance controllers on PowerBI tools",
		],
	},
	CARE: {
		name: "Customer Care & Support (CARE)",
		role: "Frontline Customer Service & Support Operations",
		leader: "Chris (GTM Director)",
		meta: {
			headcount: "12,120 FTE",
			locations: "Ahmedabad, Cairo, Manila",
			revenueShare: "23.8% Billing",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€680M",
				status: "green",
				desc: "High call-volume demand driving stable billings",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€32.80M takeout",
				status: "amber",
				desc: "95% of target achieved; onshore agent costs remain high",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "€85.60M",
				status: "green",
				desc: "Strong EBITDA contribution, supported by volume scale benefits",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "98.9%",
				status: "amber",
				desc: "Minor SLA breaches due to peak-time support ticket backlog",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "79",
				status: "amber",
				desc: "Frontline agent stress levels elevated; active coaching programs launched",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "74%",
				status: "amber",
				desc: "High attrition rate in tier-1 support roles; recruitment cycle lagging",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "55%",
				status: "amber",
				desc: "Generative AI co-pilot deployment underway to accelerate call handling",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€8.4M",
				status: "green",
				desc: "Value delivered through automated customer self-service channels",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 75, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 78, fullMark: 100 },
			{ subject: "Delivery Quality", A: 88, fullMark: 100 },
			{ subject: "Talent Stability", A: 70, fullMark: 100 },
			{ subject: "Automation Rate", A: 55, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 75 },
			{ month: "Nov-25", value: 76 },
			{ month: "Dec-25", value: 74 },
			{ month: "Jan-26", value: 76 },
			{ month: "Feb-26", value: 78 },
			{ month: "Mar-26", value: 79 },
		],
		strategicBrief:
			"CARE is experiencing volume growth, but high frontline attrition in Manila and Ahmedabad is impacting SLA consistency. Generative AI integration is targeted to boost agent throughput.",
		actionItems: [
			"Accelerate agent generative AI co-pilot pilot phase in Manila",
			"Structure talent retention incentives for high-stress customer tiers",
			"Optimize agent rosters to mitigate support ticket spikes during US shifts",
		],
	},
	TVOIS: {
		name: "Technology & Digital (TVOIS)",
		role: "Cloud, Infrastructure, Security & Software Development",
		leader: "A. Khan (Group COO)",
		meta: {
			headcount: "6,850 FTE",
			locations: "Bangalore, Cairo, Pune",
			revenueShare: "39.2% Billing",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€1,120M",
				status: "green",
				desc: "Major contributor to group revenue, driven by cloud and security migrations",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€54.20M takeout",
				status: "green",
				desc: "Massive savings from infrastructure optimization and data lake migration",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "€168.40M",
				status: "green",
				desc: "Primary profit engine; high margin software and digital service delivery",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.2%",
				status: "green",
				desc: "Exceptional platform uptime and change management success rate",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "86",
				status: "green",
				desc: "High engagement score driven by tech innovation culture",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "81%",
				status: "amber",
				desc: "Tech skills shortage affecting critical cloud architect role fill-rates",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "88%",
				status: "green",
				desc: "Advanced DevOps pipeline automation and AI ops alerting engines",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€17.8M",
				status: "green",
				desc: "Tremendous value realized from the Service-Data Lakehouse and AI platform",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 90, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 86, fullMark: 100 },
			{ subject: "Delivery Quality", A: 92, fullMark: 100 },
			{ subject: "Talent Stability", A: 82, fullMark: 100 },
			{ subject: "Automation Rate", A: 88, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 84 },
			{ month: "Nov-25", value: 85 },
			{ month: "Dec-25", value: 83 },
			{ month: "Jan-26", value: 86 },
			{ month: "Feb-26", value: 88 },
			{ month: "Mar-26", value: 89 },
		],
		strategicBrief:
			"TVOIS is leading the transformation wave with its automation engine and cloud deployments. Talent retention for niche cloud roles is the primary check item.",
		actionItems: [
			"Review regional salary benchmarks for niche cyber security roles",
			"Complete migration of legacy databases to the new central Lakehouse",
			"Host cross-tower technical workshops to share automation blueprints",
		],
	},
	BVOIS: {
		name: "Business Services (BVOIS)",
		role: "Supply Chain, Commercial Ops & Procurement Services",
		leader: "R. Wood (CCO)",
		meta: {
			headcount: "4,640 FTE",
			locations: "Budapest, Bangalore, Pune",
			revenueShare: "29.7% Billing",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€848M",
				status: "green",
				desc: "Strong growth from supply-chain services and contract administration",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€32.20M takeout",
				status: "green",
				desc: "Exceeded plan (112%) through centralized vendor procurement deals",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "€110.80M",
				status: "green",
				desc: "Very strong EBITDA margins, optimized resource leverage ratios",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.5%",
				status: "green",
				desc: "Procurement SLA targets exceeded; zero billing integration slips",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "88",
				status: "green",
				desc: "Exceptional team cohesion and feedback scores in commercial offices",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "79%",
				status: "amber",
				desc: "Specialist supply chain roles under-resourced in regional offices",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "78%",
				status: "green",
				desc: "High rate of purchase order and contract validation automation",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€6.6M",
				status: "green",
				desc: "Value realized through CSM re-platform and vendor onboarding automation",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 85, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 88, fullMark: 100 },
			{ subject: "Delivery Quality", A: 94, fullMark: 100 },
			{ subject: "Talent Stability", A: 80, fullMark: 100 },
			{ subject: "Automation Rate", A: 78, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 83 },
			{ month: "Nov-25", value: 85 },
			{ month: "Dec-25", value: 84 },
			{ month: "Jan-26", value: 87 },
			{ month: "Feb-26", value: 87 },
			{ month: "Mar-26", value: 88 },
		],
		strategicBrief:
			"BVOIS shows strong commercial execution. The main focus is on stabilizing supply chain staffing gaps in Europe local centers.",
		actionItems: [
			"Implement fast-track hiring for European supply chain analysts",
			"Roll out automated vendor risk-assessment platform",
			"Coordinate with TVOIS for integration of AI contract reviews",
		],
	},
};

const marketData: Record<string, (typeof towerData)[string]> = {
	Overall: {
		name: "Overall VOIS Group",
		role: "Consolidated Global Operations",
		leader: "Gary (Group CEO)",
		meta: {
			headcount: "24,850 FTE",
			locations: "Global Network (Tier-1, 2 & 3 Hubs)",
			revenueShare: "100% Consolidated",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€2,858M",
				status: "green",
				desc: "Consolidated group revenue target met (+1.53% YoY)",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€141.62M takeout",
				status: "amber",
				desc: "Ahead of schedule vs €102M target, though offset by operational overheads",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "−€36.33M",
				status: "red",
				desc: "Under pressure due to regional utility and space expenses",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.4%",
				status: "green",
				desc: "Group SLA adherence rate above 99% threshold",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "85",
				status: "green",
				desc: "Robust employee satisfaction, outperforming industry standard",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "78%",
				status: "amber",
				desc: "Critical roles coverage under target of 85%",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "72%",
				status: "green",
				desc: "FTE displacement via RPA and AI ops platforms",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€38.0M",
				status: "green",
				desc: "Aggregated financial value realized from H2 programs",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 80, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 85, fullMark: 100 },
			{ subject: "Delivery Quality", A: 90, fullMark: 100 },
			{ subject: "Talent Stability", A: 78, fullMark: 100 },
			{ subject: "Automation Rate", A: 72, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 82 },
			{ month: "Nov-25", value: 83 },
			{ month: "Dec-25", value: 81 },
			{ month: "Jan-26", value: 84 },
			{ month: "Feb-26", value: 85 },
			{ month: "Mar-26", value: 85 },
		],
		strategicBrief:
			"VOIS Group continues to demonstrate overall resilience. Digital expansion targets are meeting objectives, but regional differences present EBITDA challenges.",
		actionItems: [
			"Approve Group-level resource allocations for FY27 Planning",
			"Reconcile regional pipeline tagging exceptions",
			"Deploy custom AI copilot platform to mitigate local talent gaps",
		],
	},
	India: {
		name: "VOIS India",
		role: "Primary Offshore Service Center",
		leader: "Sumit (India Director)",
		meta: {
			headcount: "11,450 FTE",
			locations: "Pune, Ahmedabad, Bangalore",
			revenueShare: "45.0% Billing",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€1,286M",
				status: "green",
				desc: "Massive scale delivery meeting onshore service requests (+3% YoY)",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€65.40M takeout",
				status: "green",
				desc: "Exceeded cost-saving goals through facility utilization",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "−€12.30M",
				status: "amber",
				desc: "Under pressure due to salary inflation in high-end tech roles",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.2%",
				status: "green",
				desc: "High service quality across all sub-towers",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "84",
				status: "green",
				desc: "Strong engagement scores from recent employee surveys",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "78%",
				status: "amber",
				desc: "Attrition in high-demand cloud and AI roles remains key check item",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "76%",
				status: "green",
				desc: "Highly automated test and DevOps scripts running across all systems",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€18.5M",
				status: "green",
				desc: "Significant value delivered via central automation hub",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 75, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 88, fullMark: 100 },
			{ subject: "Delivery Quality", A: 92, fullMark: 100 },
			{ subject: "Talent Stability", A: 78, fullMark: 100 },
			{ subject: "Automation Rate", A: 76, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 81 },
			{ month: "Nov-25", value: 82 },
			{ month: "Dec-25", value: 80 },
			{ month: "Jan-26", value: 83 },
			{ month: "Feb-26", value: 84 },
			{ month: "Mar-26", value: 84 },
		],
		strategicBrief:
			"India continues to be the main engine of delivery. Strategic focus is on improving retention and managing wage inflation in Pune and Bangalore centers.",
		actionItems: [
			"Implement retention incentives for senior tech leads",
			"Expand AI training programs to offset hiring costs",
			"Standardize cloud delivery pipelines to raise throughput",
		],
	},
	Egypt: {
		name: "VOIS Egypt",
		role: "MENA & Southern European Service Center",
		leader: "Yasmine (Egypt Director)",
		meta: {
			headcount: "6,200 FTE",
			locations: "Cairo",
			revenueShare: "25.0% Billing",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€714M",
				status: "green",
				desc: "Stable revenue delivery supported by European language support demands",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€35.20M takeout",
				status: "green",
				desc: "Operational optimization targets fully met",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "−€8.10M",
				status: "amber",
				desc: "Margin impact from FX fluctuations and infrastructure investments",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.0%",
				status: "green",
				desc: "SLA commitments met with positive customer feedback",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "82",
				status: "green",
				desc: "Solid employee engagement score, especially in customer support",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "75%",
				status: "amber",
				desc: "Language specialist roles experiencing high demand and attrition",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "68%",
				status: "amber",
				desc: "Automation of customer ticketing workflows under development",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€9.2M",
				status: "green",
				desc: "Substantial savings from automated CRM ticket routing",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 78, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 85, fullMark: 100 },
			{ subject: "Delivery Quality", A: 90, fullMark: 100 },
			{ subject: "Talent Stability", A: 75, fullMark: 100 },
			{ subject: "Automation Rate", A: 68, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 79 },
			{ month: "Nov-25", value: 80 },
			{ month: "Dec-25", value: 78 },
			{ month: "Jan-26", value: 81 },
			{ month: "Feb-26", value: 82 },
			{ month: "Mar-26", value: 82 },
		],
		strategicBrief:
			"Egypt is a key bilingual delivery hub. Efforts are focused on accelerating language-based AI tools to increase agent productivity.",
		actionItems: [
			"Deploy multilingual AI ticket categorizers in Cairo center",
			"Strengthen language-based customer CARE training modules",
			"Optimize shift rosters to align with peak European service hours",
		],
	},
	Hungary: {
		name: "VOIS Hungary",
		role: "Central & Northern European Hub",
		leader: "Balázs (Hungary Director)",
		meta: {
			headcount: "3,850 FTE",
			locations: "Budapest",
			revenueShare: "18.0% Billing",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€515M",
				status: "green",
				desc: "High-value specialist business support billings met (+1% YoY)",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€24.80M takeout",
				status: "amber",
				desc: "Under target by €1.5M due to utility and workspace expenses",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "−€9.80M",
				status: "red",
				desc: "EBITDA impacted by higher operating and energy costs in Budapest center",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.6%",
				status: "green",
				desc: "Excellent quality and accuracy in complex finance and legal workflows",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "86",
				status: "green",
				desc: "Top-tier engagement index; positive workspace culture rating",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "83%",
				status: "green",
				desc: "Stable talent pool with low attrition in core business lines",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "72%",
				status: "green",
				desc: "Strong adoption of accounting automation tools",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€6.1M",
				status: "green",
				desc: "Value realized via procurement validation automation",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 70, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 80, fullMark: 100 },
			{ subject: "Delivery Quality", A: 96, fullMark: 100 },
			{ subject: "Talent Stability", A: 83, fullMark: 100 },
			{ subject: "Automation Rate", A: 72, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 84 },
			{ month: "Nov-25", value: 85 },
			{ month: "Dec-25", value: 83 },
			{ month: "Jan-26", value: 85 },
			{ month: "Feb-26", value: 86 },
			{ month: "Mar-26", value: 86 },
		],
		strategicBrief:
			"Hungary is our center of excellence for high-value services. Priority is addressing utility overheads and expanding automation capabilities.",
		actionItems: [
			"Implement office consolidation measures to optimize rent and utility costs",
			"Provide advanced data-analytics workshops for local delivery teams",
			"Deploy RPA pipelines for vendor invoice processing",
		],
	},
	Romania: {
		name: "VOIS Romania",
		role: "Eastern European Operations & Tech Hub",
		leader: "Andrei (Romania Director)",
		meta: {
			headcount: "3,350 FTE",
			locations: "Bucharest",
			revenueShare: "12.0% Billing",
		},
		kpis: [
			{
				key: "revenue",
				label: "Billable Revenue",
				val: "€343M",
				status: "green",
				desc: "Tech and network operation service billings matching targets",
			},
			{
				key: "cost",
				label: "Cost Efficiency",
				val: "€16.20M takeout",
				status: "green",
				desc: "Ahead of cost-takeout schedule through regional cloud consolidation",
			},
			{
				key: "ebitda",
				label: "EBITDA",
				val: "−€6.10M",
				status: "amber",
				desc: "Minor pressure from local tech salary competition",
			},
			{
				key: "delivery",
				label: "Delivery KPI (SLA)",
				val: "99.5%",
				status: "green",
				desc: "Strong network and cyber-security SLA adherence",
			},
			{
				key: "spirit",
				label: "Spirit Beat Score",
				val: "88",
				status: "green",
				desc: "Outstanding workplace morale and positive feedback ratings",
			},
			{
				key: "talent",
				label: "Talent KPI",
				val: "81%",
				status: "green",
				desc: "Highly skilled tech workforce with stable retention indices",
			},
			{
				key: "automation",
				label: "Automation Index",
				val: "70%",
				status: "green",
				desc: "Automated alert resolution for network ops centers active",
			},
			{
				key: "transformation",
				label: "Transformation Value",
				val: "€4.2M",
				status: "green",
				desc: "Savings driven by network monitoring scripts",
			},
		],
		radarStats: [
			{ subject: "EBITDA Margin", A: 82, fullMark: 100 },
			{ subject: "Cost Efficiency", A: 85, fullMark: 100 },
			{ subject: "Delivery Quality", A: 95, fullMark: 100 },
			{ subject: "Talent Stability", A: 81, fullMark: 100 },
			{ subject: "Automation Rate", A: 70, fullMark: 100 },
		],
		monthlyPerformance: [
			{ month: "Oct-25", value: 85 },
			{ month: "Nov-25", value: 86 },
			{ month: "Dec-25", value: 85 },
			{ month: "Jan-26", value: 87 },
			{ month: "Feb-26", value: 88 },
			{ month: "Mar-26", value: 88 },
		],
		strategicBrief:
			"Romania hub provides critical technology and network operations. Key focus is to scale cyber security services and transition legacy operations.",
		actionItems: [
			"Scale regional cyber-security incident monitoring teams",
			"Upgrade infrastructure for cloud-based automation tools",
			"Coordinate with Hungary center for shared administrative workflows",
		],
	},
};

const getKPIIcon = (key: string) => {
	switch (key) {
		case "revenue":
			return <DollarSign size={13} className="text-emerald-500" />;
		case "cost":
			return <TrendingUp size={13} className="text-amber-500" />;
		case "ebitda":
			return <Activity size={13} className="text-rose-500" />;
		case "delivery":
			return <Award size={13} className="text-indigo-500" />;
		case "spirit":
			return <Heart size={13} className="text-pink-500" />;
		case "talent":
			return <User size={13} className="text-sky-500" />;
		case "automation":
			return <Cpu size={13} className="text-cyan-500" />;
		case "transformation":
			return <Zap size={13} className="text-violet-500" />;
		default:
			return <Briefcase size={13} className="text-slate-400" />;
	}
};

const parseNumericValue = (val: string): number => {
	const clean = val.replace(/[€%M\s,]/g, "");
	const withMinus = clean.replace("−", "-");
	const num = parseFloat(withMinus);
	return isNaN(num) ? 0 : num;
};

const getDynamicNarrative = (
	keyA: string,
	keyB: string,
	isMarkets: boolean,
) => {
	if (keyA === keyB) {
		return `You have selected the same target for both fields. Use the dropdown menus above to select two different options to trigger a detailed comparative gap analysis, operational synergy opportunities, and strategic alignment recommendations.`;
	}

	if (isMarkets) {
		const combo = [keyA, keyB].sort().join("-");
		switch (combo) {
			case "Egypt-India":
				return `Synergy Analysis: VOIS India (Primary Offshore, 11.4K FTE) delivers €1,286M revenue with a 76% Automation Index, but faces EBITDA strain (-€12.3M) due to tech wage inflation. VOIS Egypt (Cairo Hub, 6.2K FTE) reports €714M revenue with 68% automation. Shared RPA pipelines from India can be deployed in Cairo's support desk to raise processing throughput by 12%, while Egypt's European language professionals can help staff India's global client services, creating a cross-center talent and digital corridor.`;
			case "Hungary-India":
				return `Synergy Analysis: VOIS Hungary (Budapest Hub, 3.8K FTE) maintains outstanding delivery SLA (99.6%) and low attrition (83% talent stability), but faces utility overhead pressures (-€9.8M). VOIS India (45% billing share) can absorb Tier-2 transactional tasks from Budapest, lowering space expenses by €1.5M. Meanwhile, Hungary's finance center of excellence can help optimize and standardise India's complex billing and reconciliation operations.`;
			case "India-Romania":
				return `Synergy Analysis: VOIS India (Offshore Delivery Engine) has high automation (76%), while VOIS Romania (Bucharest Tech Hub, 3.3K FTE) has outstanding employee Spirit (88) and deep cloud security operations. Integrating Romania's automated network monitoring scripts into India's central ops will secure offshore pipelines. In return, India's automation factory can support Bucharest in speeding up regional service deliveries.`;
			case "Egypt-Hungary":
				return `Synergy Analysis: VOIS Egypt (Cairo language support) and VOIS Hungary (Budapest complex back-office operations) have complementary delivery strengths. Creating a unified European language support routing portal between Cairo and Budapest will optimize regional resources, aiming to reduce language agent hiring times by 25% and consolidate overlapping software licenses.`;
			case "Egypt-Romania":
				return `Synergy Analysis: VOIS Egypt and VOIS Romania both serve Southern and Eastern European clients. Establishing a joint Mediterranean security monitoring and support channel between Cairo and Bucharest will provide continuous 24/7 service coverage, reducing external contractor costs by €1.2M.`;
			case "Hungary-Romania":
				return `Synergy Analysis: VOIS Hungary and VOIS Romania are close European centers. Aligning Hungary's high-precision finance workflows with Romania's cloud network monitoring tools creates a premium tech-finance center. Romanian automation scripts can automate Budapest's administrative tasks, raising efficiency by 15%.`;
			default:
				return `Synergy Analysis: Comparing VOIS ${keyA} against VOIS ${keyB} highlights opportunities for best-practice sharing. Standardizing CRM workflows and establishing regional centers of excellence will accelerate the group-wide alignment towards the consolidated FY27 goals.`;
		}
	}

	const combo = [keyA, keyB].sort().join("-");

	switch (combo) {
		case "CARE-TVOIS":
			return `Synergy Analysis: CARE (Frontline Delivery, €680M) is currently operating with an Automation Index of 55% and experiencing SLA pressures (98.9% adherence). In contrast, TVOIS (Technology, €1,120M) boasts an Automation Index of 88%. Deploying TVOIS's custom GenAI Agent Co-Pilot scripts into CARE's Manila and Ahmedabad centers is estimated to boost CARE's ticket throughput by 18%, helping CARE close its SLA deviation and align with the Group's 99.4% standard while easing agent burnout (Spirit Beat: 79).`;
		case "CFST-TVOIS":
			return `Synergy Analysis: CFST (Corporate Functions, €210M) operates with stable talent (84% coverage) and high efficiency but holds a lower automation profile (65%) than TVOIS (88%). TVOIS's automated general ledger reconciliation workflows can be shared as a blueprint for CFST's finance team, unlocking approximately €1.8M in further indirect cost takeout. Conversely, CFST's stable talent pipelines (HR) can support TVOIS in addressing its critical cloud architect recruitment deficit (TVOIS Talent KPI: 81%).`;
		case "BVOIS-TVOIS":
			return `Synergy Analysis: BVOIS (Business Services, €848M) and TVOIS (Technology, €1,120M) are the primary growth and margin engines of the group. BVOIS has high customer satisfaction and spirit (88), and TVOIS has high automation (88%). Integrating TVOIS's natural language processing contracts model into BVOIS's vendor management suite can automate up to 40% of standard procurement validations, accelerating processing speed and boosting margin recognition.`;
		case "BVOIS-CARE":
			return `Synergy Analysis: CARE (Frontline Support) has a high headcount (12.1K FTE) and lower spirit (79) due to call intensity. BVOIS (Procurement & Commercial, 4.6K FTE) has outstanding spirit (88). Cross-tower talent sharing and career progression pathways from frontline CARE roles into BVOIS commercial roles can serve as a primary retention lever, aiming to reduce CARE's high tier-1 attrition and improve its talent KPI (currently at 74%).`;
		case "CARE-CFST":
			return `Synergy Analysis: CFST handles corporate enablement and has high Talent KPI (84%) and SLA (99.7%). CARE manages frontline operations with high volume. Aligning CFST's HR recruitment portal directly with CARE's high-attrition centers in India and Philippines can reduce agent hiring cycle-time from 28 days to 14 days, minimizing temporary staffing gaps and stabilizing CARE's delivery SLA.`;
		case "BVOIS-CFST":
			return `Synergy Analysis: BVOIS (Commercial & Supply Chain) and CFST (Finance & HR) both operate heavily in contracting and vendor interaction. Creating a unified onboarding hub merging BVOIS commercial validations with CFST compliance audits will streamline third-party developer onboarding. This joint initiative targets a reduction in vendor onboarding cycle-times by 30%, adding to cost efficiencies in both towers.`;
		default:
			return `Synergy Analysis: Comparing ${keyA} against ${keyB} reveals key opportunities for cross-tower collaboration. ${towerData[keyA]?.name || keyA} shows key strengths in its operations while ${towerData[keyB]?.name || keyB} leads in several digital vectors. Standardizing workflow APIs and establishing a shared operational center-of-excellence will accelerate the group-wide alignment towards the consolidated FY27 goals.`;
	}
};

export const CompareTowers: React.FC<CompareTowersProps> = ({
	onDrillDown,
	compareMode = "towers",
}) => {
	const isMarkets = compareMode === "markets";
	const activeData = isMarkets ? marketData : towerData;

	const [towerA, setTowerA] = useState<string>("Overall");
	const [towerB, setTowerB] = useState<string>(isMarkets ? "India" : "TVOIS");

	useEffect(() => {
		setTowerA("Overall");
		setTowerB(isMarkets ? "India" : "TVOIS");
	}, [compareMode, isMarkets]);

	const dataA = activeData[towerA] || activeData.Overall;
	const dataB = activeData[towerB] || activeData[isMarkets ? "India" : "TVOIS"];

	// Format Radar Data
	const formatRadarData = () => {
		return dataA.radarStats.map((stat, i) => {
			const bStat = dataB.radarStats[i] || { A: 0 };
			const oStat = activeData.Overall.radarStats[i] || { A: 0 };
			return {
				subject: stat.subject,
				"Selected Target A": stat.A,
				"Selected Target B": bStat.A,
				"Group Baseline": oStat.A,
				fullMark: 100,
			};
		});
	};

	// Format Composed Monthly Chart Data
	const formatChartData = () => {
		return dataA.monthlyPerformance.map((item, i) => {
			const bItem = dataB.monthlyPerformance[i] || { value: 0 };
			const oItem = activeData.Overall.monthlyPerformance[i] || { value: 0 };
			return {
				month: item.month,
				"Selected Target A": item.value,
				"Selected Target B": bItem.value,
				"Group Baseline": oItem.value,
			};
		});
	};

	const radarData = formatRadarData();
	const chartData = formatChartData();

	const handleKPIClick = (targetName: string, kpi: any) => {
		onDrillDown({
			type: "kpi",
			label: `${targetName}: ${kpi.label}`,
			requirementId: "COMP",
			summary: `${kpi.label} for ${targetName} is currently valued at ${kpi.val}. Description: ${kpi.desc}. RAG status is ${kpi.status.toUpperCase()}.`,
			nextStep: `Coordinate cross-functional benchmarking review between selected targets`,
			owner: `${activeData[towerA]?.leader || "Leader"}`,
			metrics: [
				{
					label: "Metric Value",
					val: kpi.val,
					status: kpi.status.toUpperCase(),
				},
				{ label: "Description context", val: kpi.desc, status: "Active" },
				{
					label: "Comparative Target",
					val: "Group Average Alignment",
					status: "Benchmark",
				},
			],
		});
	};

	return (
		<div className="space-y-4">
			{/* HEADER SECTION */}
			<section className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
				<div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
					<div className="space-y-1 pl-1">
						<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[9px] font-black uppercase text-accent tracking-widest leading-none">
							<Sparkles size={10} className="animate-pulse" /> Alignment
							Analytics
						</div>
						<h2 className="text-lg  font-bold text-ink uppercase tracking-wide">
							{isMarkets
								? "VOIS Market Comparison Suite"
								: "VOIS Tower Comparison Suite"}
						</h2>
						<p className="text-ink-soft text-xs font-light leading-relaxed">
							{isMarkets
								? "Compare strategic profiles, operational KPIs, performance vectors and monthly growth metrics of different regional markets side-by-side."
								: "Compare strategic profiles, operational KPIs, performance vectors and monthly growth metrics of different service towers side-by-side."}
						</p>
					</div>

					{/* SELECTORS ROW */}
					<div className="flex flex-wrap items-center gap-3 bg-panel-2/60 p-2.5 rounded-xl border border-panel-border self-start md:self-auto">
						<div className="flex items-center gap-1.5">
							<span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider leading-none">
								Target A
							</span>
							<select
								value={towerA}
								onChange={(e) => setTowerA(e.target.value)}
								className="bg-panel border border-panel-border text-ink text-[11px] font-bold rounded-lg pl-2 pr-6 py-1 outline-none cursor-pointer hover:bg-panel-2 transition-colors leading-none"
								style={{
									appearance: "none",
									backgroundImage:
										"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%252352525b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
									backgroundPosition: "right 0.35rem center",
									backgroundSize: "1.25rem",
									backgroundRepeat: "no-repeat",
								}}>
								{isMarkets ? (
									<>
										<option value="Overall">Overall Group</option>
										<option value="India">VOIS India</option>
										<option value="Egypt">VOIS Egypt</option>
										<option value="Hungary">VOIS Hungary</option>
										<option value="Romania">VOIS Romania</option>
									</>
								) : (
									<>
										<option value="Overall">Overall Group</option>
										<option value="CFST">CFST (Corporate)</option>
										<option value="CARE">CARE (Customer Care)</option>
										<option value="TVOIS">TVOIS (Technology)</option>
										<option value="BVOIS">BVOIS (Business)</option>
									</>
								)}
							</select>
						</div>

						<div className="text-accent font-bold text-xs select-none">VS</div>

						<div className="flex items-center gap-1.5">
							<span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider leading-none">
								Target B
							</span>
							<select
								value={towerB}
								onChange={(e) => setTowerB(e.target.value)}
								className="bg-panel border border-panel-border text-ink text-[11px] font-bold rounded-lg pl-2 pr-6 py-1 outline-none cursor-pointer hover:bg-panel-2 transition-colors leading-none"
								style={{
									appearance: "none",
									backgroundImage:
										"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%252352525b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
									backgroundPosition: "right 0.35rem center",
									backgroundSize: "1.25rem",
									backgroundRepeat: "no-repeat",
								}}>
								{isMarkets ? (
									<>
										<option value="Overall">Overall Group</option>
										<option value="India">VOIS India</option>
										<option value="Egypt">VOIS Egypt</option>
										<option value="Hungary">VOIS Hungary</option>
										<option value="Romania">VOIS Romania</option>
									</>
								) : (
									<>
										<option value="Overall">Overall Group</option>
										<option value="CFST">CFST (Corporate)</option>
										<option value="CARE">CARE (Customer Care)</option>
										<option value="TVOIS">TVOIS (Technology)</option>
										<option value="BVOIS">BVOIS (Business)</option>
									</>
								)}
							</select>
						</div>
					</div>
				</div>

				{/* Info Badges */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-3.5 border-t border-panel-border/40">
					<div className="space-y-1 pl-1">
						<div className="text-[9px] font-bold text-ink-soft uppercase tracking-wider">
							Target A Profile
						</div>
						<div className="flex flex-wrap gap-1.5">
							<span className="px-2 py-0.5 rounded text-[10px] bg-panel-2 border border-panel-border font-medium text-ink flex items-center gap-1.5">
								<Users size={10} className="text-accent" />{" "}
								{dataA.meta.headcount}
							</span>
							<span className="px-2 py-0.5 rounded text-[10px] bg-panel-2 border border-panel-border font-medium text-ink flex items-center gap-1.5">
								<Globe size={10} className="text-accent" />{" "}
								{dataA.meta.locations}
							</span>
							<span className="px-2 py-0.5 rounded text-[10px] bg-panel-2 border border-panel-border font-medium text-ink flex items-center gap-1.5">
								<Layers size={10} className="text-accent" />{" "}
								{dataA.meta.revenueShare}
							</span>
						</div>
					</div>
					<div className="space-y-1 pl-1">
						<div className="text-[9px] font-bold text-ink-soft uppercase tracking-wider">
							Target B Profile
						</div>
						<div className="flex flex-wrap gap-1.5">
							<span className="px-2 py-0.5 rounded text-[10px] bg-panel-2 border border-panel-border font-medium text-ink flex items-center gap-1.5">
								<Users size={10} className="text-accent" />{" "}
								{dataB.meta.headcount}
							</span>
							<span className="px-2 py-0.5 rounded text-[10px] bg-panel-2 border border-panel-border font-medium text-ink flex items-center gap-1.5">
								<Globe size={10} className="text-accent" />{" "}
								{dataB.meta.locations}
							</span>
							<span className="px-2 py-0.5 rounded text-[10px] bg-panel-2 border border-panel-border font-medium text-ink flex items-center gap-1.5">
								<Layers size={10} className="text-accent" />{" "}
								{dataB.meta.revenueShare}
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* METRIC GRIDS: SIDE-BY-SIDE */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* TARGET A CARD COLUMN */}
				<div className="bg-panel border border-panel-border rounded-2xl p-4 shadow-sm space-y-3">
					<div className="flex justify-between items-center border-b border-panel-border pb-2">
						<div>
							<span className="text-[9px] font-bold text-accent uppercase tracking-widest leading-none">
								Selected Target A
							</span>
							<h3 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
								{dataA.name}
							</h3>
							<p className="text-[10px] text-ink-soft leading-none mt-0.5 italic">
								{dataA.role}
							</p>
						</div>
						<div className="text-right leading-none">
							<span className="text-[8px] font-bold text-ink-soft uppercase block tracking-wider">
								Leader
							</span>
							<span className="text-[11px] font-bold text-ink flex items-center gap-1 mt-1 justify-end">
								<User size={10} className="text-accent" />{" "}
								{dataA.leader.split(" & ")[0].split(" ")[0]}
							</span>
						</div>
					</div>

					<div className="space-y-2">
						{dataA.kpis.map((kpi, idx) => (
							<div
								key={idx}
								onClick={() => handleKPIClick(dataA.name, kpi)}
								className="flex justify-between items-center p-2.5 rounded-xl border border-panel-border bg-panel-2/20 hover:bg-panel-2/40 cursor-pointer transition-colors leading-none">
								<div className="flex items-center gap-2">
									{getKPIIcon(kpi.key)}
									<span className="text-[10px] text-ink font-semibold uppercase">
										{kpi.label}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-xs  font-black tracking-tight text-ink">
										{kpi.val}
									</span>
									<span
										className={`w-1.5 h-1.5 rounded-full ${kpi.status === "red" ? "bg-red-500" : kpi.status === "amber" ? "bg-amber-500" : "bg-emerald-500"}`}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* TARGET B CARD COLUMN */}
				<div className="bg-panel border border-panel-border rounded-2xl p-4 shadow-sm space-y-3">
					<div className="flex justify-between items-center border-b border-panel-border pb-2">
						<div>
							<span className="text-[9px] font-bold text-accent uppercase tracking-widest leading-none">
								Selected Target B
							</span>
							<h3 className="text-base font-bold text-ink uppercase tracking-wide mt-0.5">
								{dataB.name}
							</h3>
							<p className="text-[10px] text-ink-soft leading-none mt-0.5 italic">
								{dataB.role}
							</p>
						</div>
						<div className="text-right leading-none">
							<span className="text-[8px] font-bold text-ink-soft uppercase block tracking-wider">
								Leader
							</span>
							<span className="text-[11px] font-bold text-ink flex items-center gap-1 mt-1 justify-end">
								<User size={10} className="text-accent" />{" "}
								{dataB.leader.split(" & ")[0].split(" ")[0]}
							</span>
						</div>
					</div>

					<div className="space-y-2">
						{dataB.kpis.map((kpi, idx) => (
							<div
								key={idx}
								onClick={() => handleKPIClick(dataB.name, kpi)}
								className="flex justify-between items-center p-2.5 rounded-xl border border-panel-border bg-panel-2/20 hover:bg-panel-2/40 cursor-pointer transition-colors leading-none">
								<div className="flex items-center gap-2">
									{getKPIIcon(kpi.key)}
									<span className="text-[10px] text-ink font-semibold uppercase">
										{kpi.label}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-xs  font-black tracking-tight text-ink">
										{kpi.val}
									</span>
									<span
										className={`w-1.5 h-1.5 rounded-full ${kpi.status === "red" ? "bg-red-500" : kpi.status === "amber" ? "bg-amber-500" : "bg-emerald-500"}`}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CHARTS CONTAINER (RADAR & MONTHLY TRENDS) */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* RADAR CHART PROFILE MATCHING */}
				<section className="bg-panel border border-panel-border rounded-2xl p-4 shadow-sm">
					<h4 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest mb-3 pl-1 leading-none">
						Strategic Vectors Comparison
					</h4>
					<div className="h-64 w-full">
						<ResponsiveContainer width="100%" height="100%">
							<RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
								<PolarGrid stroke="var(--panel-border)" />
								<PolarAngleAxis
									dataKey="subject"
									stroke="var(--ink-soft)"
									fontSize={9}
								/>
								<PolarRadiusAxis
									angle={30}
									domain={[0, 100]}
									fontSize={8}
									stroke="var(--panel-border)"
								/>
								<Radar
									name={dataA.name}
									dataKey="Selected Target A"
									stroke="#e60000"
									fill="#e60000"
									fillOpacity={0.15}
								/>
								<Radar
									name={dataB.name}
									dataKey="Selected Target B"
									stroke="#f59e0b"
									fill="#f59e0b"
									fillOpacity={0.15}
								/>
								<Radar
									name="Group Average"
									dataKey="Group Baseline"
									stroke="var(--ink-soft)"
									fill="var(--ink-soft)"
									fillOpacity={0.05}
								/>
								<Legend wrapperStyle={{ fontSize: 9, paddingTop: 10 }} />
							</RadarChart>
						</ResponsiveContainer>
					</div>
				</section>

				{/* MONTHLY PERFORMANCE DRIFT */}
				<section className="bg-panel border border-panel-border rounded-2xl p-4 shadow-sm">
					<h4 className="text-[10px] font-bold text-ink-soft uppercase tracking-widest mb-3 pl-1 leading-none">
						Monthly Performance Trend — Dynamic Indexes
					</h4>
					<div className="h-64 w-full">
						<ResponsiveContainer width="100%" height="100%">
							<ComposedChart
								data={chartData}
								margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="var(--panel-border)"
								/>
								<XAxis dataKey="month" stroke="var(--ink-soft)" fontSize={9} />
								<YAxis
									stroke="var(--ink-soft)"
									fontSize={9}
									domain={[50, 100]}
								/>
								<RechartsTooltip
									contentStyle={{
										backgroundColor: "var(--panel)",
										borderColor: "var(--panel-border)",
										color: "var(--ink)",
									}}
								/>
								<Area
									type="monotone"
									name="Group Baseline"
									dataKey="Group Baseline"
									fill="var(--panel-2)"
									stroke="var(--panel-border)"
									fillOpacity={0.4}
								/>
								<Line
									type="monotone"
									name={dataA.name}
									dataKey="Selected Target A"
									stroke="#e60000"
									strokeWidth={2}
									dot={{ r: 3 }}
								/>
								<Line
									type="monotone"
									name={dataB.name}
									dataKey="Selected Target B"
									stroke="#f59e0b"
									strokeWidth={2}
									dot={{ r: 3 }}
								/>
								<Legend wrapperStyle={{ fontSize: 9, paddingTop: 10 }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</section>
			</div>

			{/* COMPARISON MATRIX TABLE */}
			<section className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm overflow-hidden">
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-2">
						<BarChart3 size={14} className="text-accent" />
						<h4 className="text-[11px] font-bold text-ink uppercase tracking-widest leading-none">
							{isMarkets
								? "Consolidated Market Comparison Matrix"
								: "Consolidated Service Tower Comparison Matrix"}
						</h4>
					</div>
					<span className="text-[8px] bg-accent/10 border border-accent/20 text-accent font-bold uppercase px-2 py-0.5 rounded tracking-wider">
						{isMarkets ? "All Markets side-by-side" : "All Towers side-by-side"}
					</span>
				</div>
				<p className="text-[10px] text-ink-soft mb-4 leading-normal">
					Compare all five dimensions simultaneously. The star icon (⭐)
					highlights the top-performing regional center or tower in each row.
				</p>

				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse text-[10px]">
						<thead>
							<tr className="border-b border-panel-border bg-panel-2/45">
								<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider min-w-[130px]">
									Key KPI Metric
								</th>
								<th className="p-2.5 font-bold text-ink uppercase tracking-wider text-center bg-accent/5">
									Overall Group
								</th>
								{isMarkets ? (
									<>
										<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-center">
											VOIS India
										</th>
										<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-center">
											VOIS Egypt
										</th>
										<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-center">
											VOIS Hungary
										</th>
										<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-center">
											VOIS Romania
										</th>
									</>
								) : (
									<>
										<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-center">
											CFST (Corp)
										</th>
										<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-center">
											CARE (Cust)
										</th>
										<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-center">
											TVOIS (Tech)
										</th>
										<th className="p-2.5 font-bold text-ink-soft uppercase tracking-wider text-center">
											BVOIS (Bus)
										</th>
									</>
								)}
							</tr>
						</thead>
						<tbody className="divide-y divide-panel-border/50">
							{activeData.Overall.kpis.map((kpi, idx) => {
								const valOverall = kpi.val;
								const statusOverall = kpi.status;

								// Dynamically fetch values based on comparison mode
								const keys = isMarkets
									? ["India", "Egypt", "Hungary", "Romania"]
									: ["CFST", "CARE", "TVOIS", "BVOIS"];
								const values = keys.map((k) => ({
									key: k,
									val: activeData[k].kpis[idx].val,
									status: activeData[k].kpis[idx].status,
									num: parseNumericValue(activeData[k].kpis[idx].val),
									name: activeData[k].name,
								}));

								const sortedValues = [...values].sort((a, b) => b.num - a.num);
								const leaderKey = sortedValues[0].key;

								const getCellClass = (status: string) => {
									if (status === "red") return "text-rag-red font-semibold";
									if (status === "amber") return "text-rag-amber font-semibold";
									return "text-rag-green font-semibold";
								};

								return (
									<tr
										key={idx}
										className="hover:bg-panel-2/30 transition-colors">
										<td className="p-2.5 font-semibold text-ink flex items-center gap-1.5">
											{getKPIIcon(kpi.key)}
											<span className="uppercase">{kpi.label}</span>
										</td>
										<td
											className={`p-2.5 text-center bg-accent/5 border-x border-panel-border/20 ${getCellClass(statusOverall)}`}>
											{valOverall}
										</td>
										{values.map((item) => (
											<td
												key={item.key}
												className={`p-2.5 text-center ${getCellClass(item.status)} ${leaderKey === item.key ? "bg-panel-2/60" : ""}`}>
												<div className="flex items-center justify-center gap-1">
													{item.val}{" "}
													{leaderKey === item.key && (
														<span className="text-[8px]">⭐</span>
													)}
												</div>
											</td>
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</section>

			{/* STRATEGIC SUMMARY & BR BRIEFING */}
			<section className="bg-panel border border-panel-border rounded-2xl p-4.5 shadow-sm space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div className="space-y-2.5">
						<span className="text-[9px] font-bold text-ink-soft uppercase tracking-widest block leading-none pl-1 border-l-2 border-accent">
							Target A Alignment Context
						</span>
						<div className="bg-panel-2/40 p-3 rounded-xl border border-panel-border space-y-1.5 h-[calc(100%-1.25rem)] flex flex-col justify-between">
							<p className="text-xs text-ink-soft leading-normal font-light italic">
								"{dataA.strategicBrief}"
							</p>
							<div className="space-y-1.5 pt-2 border-t border-panel-border/50">
								<span className="text-[8px] font-bold text-ink-soft uppercase tracking-widest block leading-none">
									Target A Governance Initiatives
								</span>
								<ul className="list-none pl-0 space-y-1">
									{dataA.actionItems.map((item, i) => (
										<li
											key={i}
											className="text-[10px] text-ink flex gap-1.5 items-start">
											<ClipboardList
												size={10}
												className="text-accent shrink-0 mt-0.5"
											/>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div className="space-y-2.5">
						<span className="text-[9px] font-bold text-ink-soft uppercase tracking-widest block leading-none pl-1 border-l-2 border-accent">
							Target B Alignment Context
						</span>
						<div className="bg-panel-2/40 p-3 rounded-xl border border-panel-border space-y-1.5 h-[calc(100%-1.25rem)] flex flex-col justify-between">
							<p className="text-xs text-ink-soft leading-normal font-light italic">
								"{dataB.strategicBrief}"
							</p>
							<div className="space-y-1.5 pt-2 border-t border-panel-border/50">
								<span className="text-[8px] font-bold text-ink-soft uppercase tracking-widest block leading-none">
									Target B Governance Initiatives
								</span>
								<ul className="list-none pl-0 space-y-1">
									{dataB.actionItems.map((item, i) => (
										<li
											key={i}
											className="text-[10px] text-ink flex gap-1.5 items-start">
											<ClipboardList
												size={10}
												className="text-accent shrink-0 mt-0.5"
											/>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Operational Synergy Opportunities */}
				<div className="pt-3 border-t border-panel-border/40 space-y-2">
					<span className="text-[9px] font-bold text-ink-soft uppercase tracking-widest block leading-none pl-1 border-l-2 border-accent">
						Operational Synergy Opportunities
					</span>
					<div className="bg-accent/5 p-3 rounded-xl border border-accent/20">
						<p className="text-xs text-ink leading-relaxed font-light">
							{getDynamicNarrative(towerA, towerB, isMarkets)}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};
