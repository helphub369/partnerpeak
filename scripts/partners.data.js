/* PartnerPeak – Low-risk partner catalog (Phase A, 50+) */
/* All entries restricted to automation-friendly B2B verticals (SaaS, BI, DevTools, Security (standard), HR/Payroll, Accounting, Productivity, CDP/ETL, iPaaS, LegalTech lite). */

window.PARTNER_DATA = [
  /* ---- Analytics / BI ---- */
  {
    program_name: "InsightBoard",
    verticals: ["analytics","bi"],
    mechanism: "referral link",
    automation_score: 5,
    payout_model: "recurring",
    typical_payout_range: "$200–$1,200",
    geo_coverage: "global",
    regions_ready: ["US","EU","UK","APAC"],
    approval_friction: "light",
    conversion_reporting: { type:"api", docs_url:"https://docs.insightboard.example/api" },
    deep_link_template: "https://insightboard.example/aff?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://insightboard.example/partners",
    blurb: "Self-serve BI with governed metrics and robust API reporting."
  },
  {
    program_name: "MetricWave",
    verticals: ["analytics","dashboards"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$150–$900",
    geo_coverage: "US|EU|UK|APAC",
    approval_friction: "light",
    conversion_reporting: { type:"api", docs_url:"https://metricwave.example/docs/partner" },
    deep_link_template: "https://metricwave.example/r/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://metricwave.example/partners",
    blurb: "Modern metrics store + dashboards. Webhooks for events."
  },

  /* ---- Data / ETL / iPaaS ---- */
  {
    program_name: "Zen Data Feeds",
    verticals: ["data_feeds","etl","ipaaS"],
    mechanism: "referral link",
    automation_score: 5,
    payout_model: "recurring",
    typical_payout_range: "$300–$1,500",
    geo_coverage: "global",
    approval_friction: "light",
    conversion_reporting: { type:"api", docs_url:"https://zendata.example/partners/api" },
    deep_link_template: "https://zendata.example/aff?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://zendata.example/partners",
    blurb: "Reliable ETL pipelines with SLA and usage metering."
  },
  {
    program_name: "SyncBridge",
    verticals: ["ipaaS","automation"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$120–$800",
    geo_coverage: "US|EU|UK",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://syncbridge.example/partners" },
    deep_link_template: "https://syncbridge.example/aff/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://syncbridge.example/partners",
    blurb: "No-code connectors with webhook triggers and logs."
  },

  /* ---- DevTools / API ---- */
  {
    program_name: "VectorCache",
    verticals: ["devtools","ai","search"],
    mechanism: "referral link",
    automation_score: 5,
    payout_model: "recurring",
    typical_payout_range: "$180–$1,000",
    geo_coverage: "global",
    approval_friction: "light",
    conversion_reporting: { type:"api", docs_url:"https://vectorcache.example/partners" },
    deep_link_template: "https://vectorcache.example/aff?ref={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://vectorcache.example/partners",
    blurb: "Vector DB + embeddings API with usage-based plans."
  },
  {
    program_name: "ScriptShip",
    verticals: ["devops","deploy"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$120–$700",
    geo_coverage: "US|EU|UK|APAC",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://scriptship.example/partners" },
    deep_link_template: "https://scriptship.example/a/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://scriptship.example/partners",
    blurb: "CI/CD for serverless + edge; first-class audit hooks."
  },

  /* ---- Security (standard, low-risk) ---- */
  {
    program_name: "SafeDocs",
    verticals: ["security","compliance"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$200–$900",
    geo_coverage: "global",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://safedocs.example/partners" },
    deep_link_template: "https://safedocs.example/aff/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://safedocs.example/partners",
    blurb: "Document DLP, retention, and secure sharing."
  },
  {
    program_name: "PolicyScan",
    verticals: ["compliance","privacy"],
    mechanism: "referral link",
    automation_score: 5,
    payout_model: "recurring",
    typical_payout_range: "$250–$1,100",
    geo_coverage: "US|EU|UK",
    approval_friction: "light",
    conversion_reporting: { type:"api", docs_url:"https://policyscan.example/docs" },
    deep_link_template: "https://policyscan.example/partners?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://policyscan.example/partners",
    blurb: "Privacy policy automation and RoPA management."
  },

  /* ---- HR / Payroll / PeopleOps ---- */
  {
    program_name: "OrgChartsHR",
    verticals: ["hr","peopleops"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$150–$700",
    geo_coverage: "US|EU|UK",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://orgchartshr.example/partners" },
    deep_link_template: "https://orgchartshr.example/aff/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://orgchartshr.example/partners",
    blurb: "Org charts, headcount planning, role analytics."
  },
  {
    program_name: "AccessGate",
    verticals: ["hr","security"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$120–$600",
    geo_coverage: "US|EU|UK|APAC",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://accessgate.example/partners" },
    deep_link_template: "https://accessgate.example/aff?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://accessgate.example/partners",
    blurb: "Employee lifecycle access reviews and SSO governance."
  },

  /* ---- Accounting / FinOps (no lending, no finance offers) ---- */
  {
    program_name: "LedgerLight",
    verticals: ["accounting","finops"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$180–$900",
    geo_coverage: "US|EU|UK",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://ledgerlight.example/partners" },
    deep_link_template: "https://ledgerlight.example/aff?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://ledgerlight.example/partners",
    blurb: "Close management, variance tracking, and audit logs."
  },
  {
    program_name: "InvoicePilot",
    verticals: ["accounting","billing"],
    mechanism: "referral link",
    automation_score: 5,
    payout_model: "recurring",
    typical_payout_range: "$150–$800",
    geo_coverage: "global",
    approval_friction: "light",
    conversion_reporting: { type:"api", docs_url:"https://invoicepilot.example/partners" },
    deep_link_template: "https://invoicepilot.example/aff/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://invoicepilot.example/partners",
    blurb: "Usage-based invoicing with revenue recognition helpers."
  },

  /* ---- Productivity / Collab ---- */
  {
    program_name: "TaskForge",
    verticals: ["productivity","pm"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$80–$400",
    geo_coverage: "US|EU|UK|APAC",
    approval_friction: "light",
    conversion_reporting: { type:"api", docs_url:"https://taskforge.example/partners" },
    deep_link_template: "https://taskforge.example/aff?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://taskforge.example/partners",
    blurb: "Projects, docs, and automations with webhook recipes."
  },
  {
    program_name: "BrieflyDocs",
    verticals: ["productivity","knowledge"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$70–$350",
    geo_coverage: "US|EU|UK",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://brieflydocs.example/partners" },
    deep_link_template: "https://brieflydocs.example/aff/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://brieflydocs.example/partners",
    blurb: "Team wiki with structured notes and review workflows."
  },

  /* ---- CDP / Messaging (non-adult, non-surveillance) ---- */
  {
    program_name: "ProfileHub",
    verticals: ["cdp","audience"],
    mechanism: "referral link",
    automation_score: 5,
    payout_model: "recurring",
    typical_payout_range: "$220–$1,100",
    geo_coverage: "global",
    approval_friction: "light",
    conversion_reporting: { type:"api", docs_url:"https://profilehub.example/partners" },
    deep_link_template: "https://profilehub.example/aff?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://profilehub.example/partners",
    blurb: "Consent-aware customer profiles with streaming pipelines."
  },
  {
    program_name: "EventRail",
    verticals: ["events","messaging"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$120–$600",
    geo_coverage: "US|EU|UK",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://eventrail.example/partners" },
    deep_link_template: "https://eventrail.example/a/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://eventrail.example/partners",
    blurb: "Event bus with replay and webhook transformation."
  },

  /* ---- LegalTech (light) ---- */
  {
    program_name: "ClauseKit",
    verticals: ["legaltech","contracts"],
    mechanism: "referral link",
    automation_score: 4,
    payout_model: "one-time",
    typical_payout_range: "$200–$500",
    geo_coverage: "US|EU|UK",
    approval_friction: "standard",
    conversion_reporting: { type:"api", docs_url:"https://clausekit.example/partners" },
    deep_link_template: "https://clausekit.example/aff/{AFF_ID}?s1={CLICK_ID}&dest={URLENCODED_DEST}",
    risk_flags: [],
    source_url: "https://clausekit.example/partners",
    blurb: "Template-driven contract assembly with approvals."
  },

  /* ---- Add many more (to exceed 50) ---- */
  /* For brevity, the next items reuse sane patterns but vary names/verticals. */
  ...[
    "QueryHub","DataWeave","ModelTrack","DashForge","MetricDock","ObserveIQ","EventScope",
    "DevTray","DeployMate","EdgeSuite","ApiPilot","Webhookry","ScaleForms","RollupCI",
    "PolicyHub","ConsentFlow","TrustNote","RiskBoard","DocAudit","AccessLedger",
    "CampFire Docs","NoteLoop","ProjectRay","SlateSpace","Briefboard","TimeGrid",
    "HeadcountPro","RoleMatrix","InterviewBase","OrgSignals","TeamPulse","ShiftPlanner",
    "BillFlow","RecoTrack","PayRun","CloseMate","SpendGlass","UnitEconomy",
    "GuardGrid","AuditTrailr","SecretFold","VaultBack","KeyStation","SingleSign",
    "MailPanel","SegmentoLite","JourneyMap","AudienceKit","EventSwitch","PipeSync"
  ].map((name,i)=>({
    program_name: name,
    verticals: (()=>{
      const groups=[
        ["analytics","bi"],["etl","ipaaS"],["devtools"],["devops","deploy"],["security"],["hr","peopleops"],
        ["accounting","billing"],["productivity","pm"],["cdp","audience"],["events","automation"],["compliance","privacy"]
      ];
      return groups[i%groups.length];
    })(),
    mechanism: "referral link",
    automation_score: 3 + (i%3), // 3..5
    payout_model: (i%4===0)?"one-time":"recurring",
    typical_payout_range: (i%4===0)?"$100–$400":"$120–$900",
    geo_coverage: (i%5===0)?"global":"US|EU|UK",
    regions_ready: (i%5===0)?["US","EU","UK","APAC"]:["US","EU","UK"],
    approval_friction: (i%6===0)?"light":"standard",
    conversion_reporting: { type:"api", docs_url:`https://${name.replace(/\s+/g,'').toLowerCase()}.example/partners/docs` },
    deep_link_template: `https://${name.replace(/\s+/g,'').toLowerCase()}.example/aff?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}`,
    risk_flags: [],
    source_url: `https://${name.replace(/\s+/g,'').toLowerCase()}.example/partners`,
    blurb: "Low-risk, automation-friendly B2B SaaS."
  }))
];
