#	Persona	Requirement Category	Feeback from Ideation Workshop	Requirement Description	Dependency	Acceptance Criteria	User-Story
1	CEO (Gary)	Top-Line Performance	Status: GREEN.

1. The page already exists on the VOIS 360 scorecard.
2. Ed confirmed the team is working with business owners to refresh the KPIs against FY27 goals (annual refresh in progress with Finance and HR teams, e.g. talent measures).

Action: Align on the exact KPIs to show for the CEO persona view.	Persona-aligned CEO landing page showing the agreed 5–10 critical KPIs (Revenue, Cost Takeout, EBITDA, OFCF, Talent, Spirit Beat, NPS, Pipeline) refreshed to FY27 goals, replacing or layering over the current VOIS 360 scorecard view.

Question: Should there be a drill through option for each of the top-line widgets to get a detailed view?	1. Product Owner (Ed) to finalize and provide the final list of critial KPI, their defination/calculation logic.	CEO opens the Hub and sees one page with the 5–10 agreed KPIs against FY27 targets, with RAG status visible; no scroll or drill-through needed to get the top-line health view.	As the CEO, I want a single persona-aligned landing page showing the 5–10 agreed critical KPIs (Revenue, Cost Takeout, EBITDA, OFCF, Talent, Spirit Beat, NPS, Pipeline) against FY27 targets with RAG status, so that I can assess top-line organisational health at a glance without scrolling or drilling through multiple reports.

--- 
2	CEO (Gary)	Board-Ready Narrative	Status: AMBER.

1. Ed agreed there is no clear, concise narrative tied to strategy in one view today — narrative is built via copy-paste from reports or via early LLM-based commentary on some pages.
2. Kali outlined the target approach: AI-generated commentary per pillar (Customer, Growth, Operating, Be Unrivalled, Partnership Success) with summary, key highlights and actions, then merged into a single executive summary for the whole VOIS Hub, distributable as a monthly PDF/email to Gary, directors and service tower leads (access-controlled).
3. Anurima agreed to capture this as a requirement across all screens.
4. Ed noted narrative work is best matured at the end once data sources are stable.	AI-generated commentary per strategic pillar (Customer, Growth, Operating, Be Unrivalled, Partnership Success) — each with summary, key highlights and recommended actions — merged via LLM into one executive summary for the whole VOIS Hub, distributable as a monthly PDF / email.

Question: Do we want the AI commentary summarize/rollup basis the strategic themes or do we want to roll-up based on the KPIs available on the persona  screen?	1. Internal AI / LLM teams (commentary models in progress);
2. data sources mature enough across all pillars before final roll-up.	Each pillar page shows dynamic LLM-generated commentary (summary + highlights + actions); a single board-paper-style executive summary can be generated on demand and emailed monthly; commentary updates when underlying data changes.	As the CEO, I want AI-generated commentary per strategic pillar merged into one executive summary distributable as a monthly PDF/email, so that I have a clear, board-ready narrative tied to strategy in one trusted view instead of copy-pasted slide packs.

---
3	CEO (Gary)	Topline Growth & New Badges	Status: AMBER (re-marked down from green).

1. Ed clarified that new logos / new badges is NOT currently captured — not yet a standardised metric across the organisation and not properly categorised in Salesforce.
2. Jerome noted Finance tracks this as 'Gen 2 deals' / 'second gen deals' (new external customers).
3. Ed acknowledged the end-to-end pipeline lifecycle (opportunity → win → loss conversion) is not well closed today.
4. Jerome reframed Gary's need as exception-based / minimalist reporting (top deals, big problems) rather than more metrics; the existing detailed view could become the drill-through behind a higher-level CEO/persona view.

Open Question: Does the Commercial team hold an equivalent slice on the pipeline side to Finance's 'second gen deals'?

Decision: Data probably exists but is not highlighted from a persona perspective — AMBER.	Exception-focused CEO view of top-line growth that surfaces the biggest wins and biggest problems (top 10 deals, new logos / Gen 2 deals) with drill-through into the existing detailed pipeline dashboard for the minus-ones.

Question: What are the KPIs or granuality of the information, one wants to see for the existing pipeline after the drill-through? directly route in salesforce?	1. Salesforce categorisation of new logos / Gen 2 deals (not yet standardised); 
2. Integration of data sources where the finacial metrics of the opportinities 	CEO view shows new-logo / Gen 2 deal count and value separately from re-sells; clicking through opens the detailed pipeline dashboard filtered to the relevant deals; exception flags identify pipeline movements worth attention.	As the CEO, I want an exception-focused view surfacing top deals, new logos / Gen 2 deals and the biggest pipeline problems with drill-through to the detailed pipeline dashboard, so that I can track commercialisation progress and topline growth on a signal-over-noise basis.

---
4	CEO (Gary)	Customer Performance	Status: AMBER.

1. Ed: data is mostly there but the narrative is missing — current reporting is data-driven (data point A up, B down) rather than story-driven.
2. MMD (customer engagement) work is starting to add user-led inputs from engagement leads (e.g. problem jobs), giving a richer lens than pure data.
3. Gaps noted:
   a. External customer spend trends (most VOIS Hub data is internal).
   b. Share-of-wallet report exists but is annual and limited in scope (VOIS share / third-party share / onshore spend).

Action: Review the persona requirements directly with GMT members or their minus-ones to validate.	Consolidated customer-lens view combining internal performance data (NPS, MMD problem jobs, service health) with user-led inputs from engagement leads and a basic external spend / share-of-wallet view — designed for CEO Connect and customer-facing meetings.	1. Identification of the KPIs/metrics and the data sources in the MMD dataset and engagement-lead input process
2. Identification of the source data for external share-of-wallet 	For a selected customer, the page shows internal performance, engagement narrative from SMEs, and available external spend context on one screen, ready to print or share before a CEO Connect.	As the CEO, I want a consolidated customer-lens view combining internal performance data, engagement-lead narrative and external spend / share-of-wallet context, so that I am fully briefed before CEO Connect and customer-facing meetings.

---
5	CEO (Gary)	Stakeholder Engagement Data	Discussion outcome: Treat as EXTENDED requirements / use cases rather than separate personas.

1. Ed and Jerome agreed these are different slices of the same underlying data (board members, key customers, suppliers, direct-report 1:1s).
2. Today Ed publishes a quarterly Key Performance Levers update into board papers.
3. No ready-made customers or suppliers report exists, but one could be built.
4. Jerome's recommendation: park as extension scope for after the persona views are in place — won't introduce many new requirements, mainly defines appropriate filters / slices for each forum.	Extension scope (not a separate persona view): filtered slices of the persona dashboards for board members, key customers, suppliers and direct-report 1:1s, drawing on the same underlying data.	Persona dashboards (items 1–9) need to be in place first; quarterly Key Performance Levers update process already feeds board papers and can be reused.	Once persona views exist, a user can apply a 'board members' / 'customer' / 'supplier' / '1:1' filter or export and receive a slice fit for that audience without building new dashboards.	As the CEO, I want filtered slices of the persona dashboards tailored for board members, key customers, suppliers and direct-report 1:1s, so that I can prepare for any stakeholder forum from the same underlying data without commissioning new dashboards.

---
6	CEO (Gary)	Transformation Tracking	Status: AMBER.

1. No dedicated transformation page on the Hub today; some transformation dashboards sit outside the Hub.
2. Jerome suggested leveraging Horizon 2 reporting as the angle — it should cover most transformations across the organisation (VOE, CSM, service-data transformations) with milestone updates against initiatives.
3. Ed agreed: 'something is better than nothing' and starting the conversation will flush out further requirements.

Action: Use Horizon 2 to feed transformation insights into the Hub.	A dedicated transformation view on the Hub fed from Horizon 2 reporting, showing key initiatives across VOE, CSM and service-data transformations with milestone status 

	 1. Identification of thedata sources of the in-flight ransformations(can be identified from Horizon-2 dashboard)
2.KPIs/mertrics that needs to be visualized for measuring the status of that transformation.

	CEO can see a list of in-flight transformation initiatives with RAG status, milestone progress and value delivered to date, on one Hub page.	As the CEO, I want a dedicated transformation page fed from Horizon 2 reporting showing in-flight initiatives with RAG status, milestone progress and value realised, so that I can track the speed and quality of transformation across people, process and technology.

---
7	CEO (Gary)	FY27 Goals Alignment	Status: AMBER.

1. Ed confirmed an offline cross-check was already done against Gary's goals — the majority of goal data points are captured, though not necessarily every single one.
2. A dedicated view listing the annual goals with direct pointers to each data point could be built relatively simply.

Action: Build an explicit goals-alignment view on the Hub.	An explicit FY27 goals page that lists Gary's annual organisational goals with direct pointers to each supporting data point on the Hub.

Question: Do you want to visualize / measure the status for each of the priorities / goals ?	1. Updating the FY2027 goals in the VOIS Hub dashboard
2. Mapping of the OKRs with goals

	1. FY27 goals page lists every annual goal (Illustrative) along with RAG status
	As the CEO, I want an explicit FY27 goals page listing every annual organisational goal with direct pointers to the supporting data points, so that I can evidence dashboard alignment to my goals at any time.
8	CEO (Gary)	Confidence in GMT Grip	1. No specific line-item discussion in this session; the broader theme of drill-through from a CEO/exception view into deeper data was covered under Top-Line Growth (item 4).
2. Jerome's framing applies: this dashboard becomes the drill-through Gary uses when an exception flag fires, with the persona-level view sitting above it.
3. Existing dashboards retain value as the depth layer for the minus-ones.	Drill-through from the CEO exception view into the underlying detailed dashboards so Gary can verify a GMT member's grip on detail and surface specific questions for 1:1s.


	Persona-driven CEO dashboard (item 1) must sit above the existing detailed views to act as the entry point; access permissions for cross-GMT-member data.	From any RAG flag or KPI on the CEO view, Gary can click through to the underlying detailed page owned by the relevant GMT member, with the data already filtered to that area.	As the CEO, I want to click through from any RAG flag or KPI on my persona view into the underlying detailed dashboard owned by the relevant GMT member, so that I can verify they are on top of the detail and surface specific questions for 1:1s.
