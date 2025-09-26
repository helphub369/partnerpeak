// scripts/partners.data.js
// Low-risk partner catalog for PartnerPeak (SaaS, analytics, productivity, ops, HR, finance, devtools, etc.)

const tpl = "https://example.com/?aff={AFF_ID}&s1={CLICK_ID}&dest={URLENCODED_DEST}";
const doc = (slug) => `https://docs.example.com/${slug}`;
const SRC = (slug) => `https://www.example.com/partners/${slug}`;

const make = ({
  program_name,
  verticals,
  mechanism = "referral link",
  automation_score = 4,
  payout_model = "recurring",
  typical_payout_range = "$100–$1500",
  geo_coverage = "global",
  approval_friction = "light",
  conv_type = "api",
  docs_slug = "tracking",
  source_slug,
  risk_flags = [],
}) => ({
  program_name,
  verticals,
  mechanism,
  automation_score,
  payout_model,
  typical_payout_range,
  geo_coverage,
  approval_friction,
  conversion_reporting: { type: conv_type, docs_url: doc(docs_slug) },
  deep_link_template: tpl,
  risk_flags,
  source_url: SRC(source_slug || program_name.toLowerCase().replace(/\s+/g, "-")),
});

// 60 programs — all low-risk verticals
const partners = [
  make({ program_name: "Acme Cyber SaaS", verticals: ["cybersecurity","saas"], typical_payout_range: "$200–$1500", source_slug: "acme-cyber" }),
  make({ program_name: "Zen Data Feeds", verticals: ["data_feeds","analytics","saas"], typical_payout_range: "$120–$900", source_slug: "zen-data" }),
  make({ program_name: "TitanERP Enterprise", verticals: ["erp","saas"], typical_payout_range: "$300–$1800", approval_friction: "moderate", source_slug: "titan-erp" }),

  make({ program_name: "Nimbus CRM Cloud", verticals: ["crm","sales","saas"], typical_payout_range: "$150–$1200" }),
  make({ program_name: "Ledgerly Books", verticals: ["accounting","finance","saas"], typical_payout_range: "$120–$800" }),
  make({ program_name: "HelpHero Desk", verticals: ["helpdesk","support","saas"], typical_payout_range: "$100–$700" }),
  make({ program_name: "FlowOps Automation", verticals: ["workflow","automation","saas"], typical_payout_range: "$140–$900" }),
  make({ program_name: "MetricMind BI", verticals: ["bi","analytics","reporting","saas"], typical_payout_range: "$180–$1300" }),
  make({ program_name: "ShipRight 3PL", verticals: ["logistics","shipping","saas"], typical_payout_range: "$130–$950" }),
  make({ program_name: "FormPilot", verticals: ["forms","lead_capture","saas"], typical_payout_range: "$100–$500" }),
  make({ program_name: "CampaignCraft", verticals: ["email","marketing_automation","saas"], typical_payout_range: "$130–$1100" }),
  make({ program_name: "PayGate Pro", verticals: ["payments","billing","saas"], typical_payout_range: "$160–$1200" }),
  make({ program_name: "QueueIQ Contact Center", verticals: ["contact_center","telephony","saas"], typical_payout_range: "$200–$1400" }),
  make({ program_name: "VaultDocs DMS", verticals: ["dms","content_management","saas"], typical_payout_range: "$120–$800" }),
  make({ program_name: "SecureSign eID", verticals: ["esign","identity","saas"], typical_payout_range: "$110–$600" }),
  make({ program_name: "ProjectPilot PM", verticals: ["project_management","collaboration","saas"], typical_payout_range: "$100–$700" }),
  make({ program_name: "Hirewise ATS", verticals: ["ats","recruiting","hr","saas"], typical_payout_range: "$150–$900" }),
  make({ program_name: "PeoplePulse HRIS", verticals: ["hris","payroll","saas"], typical_payout_range: "$180–$1200" }),
  make({ program_name: "PolicyScan GRC", verticals: ["grc","compliance","saas"], typical_payout_range: "$180–$1300" }),
  make({ program_name: "AssetTrack ITAM", verticals: ["itam","it_ops","saas"], typical_payout_range: "$140–$900" }),

  make({ program_name: "DeviceGuard MDM", verticals: ["mdm","endpoint","saas"], typical_payout_range: "$160–$1000" }),
  make({ program_name: "StreamCast CDN", verticals: ["cdn","media_delivery","saas"], typical_payout_range: "$200–$1500" }),
  make({ program_name: "CloudVault Backup", verticals: ["backup","dr","saas"], typical_payout_range: "$150–$1000" }),
  make({ program_name: "MirrorSync iPaaS", verticals: ["ipaas","integration","saas"], typical_payout_range: "$170–$1200" }),
  make({ program_name: "QueryHub Warehouse", verticals: ["data_warehouse","analytics","saas"], typical_payout_range: "$220–$1600" }),
  make({ program_name: "ModelTrack MLOps", verticals: ["mlops","ai_ops","saas"], typical_payout_range: "$220–$1500", approval_friction: "moderate" }),
  make({ program_name: "TaskForge RPA", verticals: ["rpa","automation","saas"], typical_payout_range: "$180–$1200" }),
  make({ program_name: "SignalDesk Uptime", verticals: ["observability","status","saas"], typical_payout_range: "$120–$700" }),
  make({ program_name: "DeployMate CI", verticals: ["ci_cd","devtools","saas"], typical_payout_range: "$140–$900" }),
  make({ program_name: "FeatureFlagger", verticals: ["feature_flags","release","saas"], typical_payout_range: "$120–$800" }),

  make({ program_name: "CacheCloud DBaaS", verticals: ["database","cache","saas"], typical_payout_range: "$180–$1300" }),
  make({ program_name: "EdgeShield WAF", verticals: ["application_security","waf","saas"], typical_payout_range: "$200–$1400" }),
  make({ program_name: "NoCodeGrid Builder", verticals: ["nocode","builder","saas"], typical_payout_range: "$100–$700" }),
  make({ program_name: "DocsIQ Knowledge", verticals: ["knowledge_base","support","saas"], typical_payout_range: "$110–$600" }),
  make({ program_name: "ScheduleX", verticals: ["scheduling","calendars","saas"], typical_payout_range: "$100–$500" }),
  make({ program_name: "LearnLoop LMS", verticals: ["lms","training","saas"], typical_payout_range: "$120–$800" }),
  make({ program_name: "EventPilot", verticals: ["events","ticketing","saas"], typical_payout_range: "$120–$900" }),
  make({ program_name: "QuoteQuick CPQ", verticals: ["cpq","sales_ops","saas"], typical_payout_range: "$150–$1000" }),
  make({ program_name: "PartnerHub PRM", verticals: ["prm","alliances","saas"], typical_payout_range: "$150–$1000" }),
  make({ program_name: "AffiliateEngine", verticals: ["affiliate","tracking","saas"], typical_payout_range: "$120–$900" }),

  make({ program_name: "MediaBox DAM", verticals: ["dam","content_ops","saas"], typical_payout_range: "$110–$700" }),
  make({ program_name: "ReviewBeacon", verticals: ["reputation","reviews","saas"], typical_payout_range: "$100–$600" }),
  make({ program_name: "JourneyMap CDP", verticals: ["cdp","customer_data","saas"], typical_payout_range: "$200–$1400" }),
  make({ program_name: "ConsentFlow CMP", verticals: ["privacy","consent","saas"], typical_payout_range: "$120–$800" }),
  make({ program_name: "AdBudget Planner", verticals: ["spend_ops","marketing_ops","saas"], typical_payout_range: "$100–$600" }),
  make({ program_name: "RouteSmart Field", verticals: ["field_ops","routing","saas"], typical_payout_range: "$130–$900" }),
  make({ program_name: "QuoteShield Contracts", verticals: ["clm","legal_ops","saas"], typical_payout_range: "$140–$900" }),
  make({ program_name: "InboxOps DMARC", verticals: ["email_security","deliverability","saas"], typical_payout_range: "$120–$700" }),
  make({ program_name: "ChargePilot AR", verticals: ["ar","collections","finance","saas"], typical_payout_range: "$150–$1000" }),
  make({ program_name: "SpendSense AP", verticals: ["ap","procure_to_pay","saas"], typical_payout_range: "$150–$1000" }),

  make({ program_name: "UsageMeter Billing", verticals: ["usage_billing","metering","saas"], typical_payout_range: "$150–$1100" }),
  make({ program_name: "TaxTrail Indirect", verticals: ["tax","compliance","saas"], typical_payout_range: "$140–$900" }),
  make({ program_name: "InsightForms Analytics", verticals: ["product_analytics","feedback","saas"], typical_payout_range: "$120–$800" }),
  make({ program_name: "RosterHQ Scheduling", verticals: ["workforce","scheduling","saas"], typical_payout_range: "$110–$700" }),
  make({ program_name: "MeetCast Webinar", verticals: ["webinar","video","saas"], typical_payout_range: "$110–$700" }),
  make({ program_name: "StackGuard Posture", verticals: ["cloud_security_posture","saas"], typical_payout_range: "$200–$1400" }),
  make({ program_name: "SentryDesk ITSM", verticals: ["itsm","service_desk","saas"], typical_payout_range: "$140–$900" }),
  make({ program_name: "PolicyBot Documentation", verticals: ["policy","docs","compliance","saas"], typical_payout_range: "$100–$600" }),
  make({ program_name: "AuditTrail SOX", verticals: ["audit","risk","saas"], typical_payout_range: "$160–$1200" }),
  make({ program_name: "BoardBook Rooms", verticals: ["board_portal","governance","saas"], typical_payout_range: "$180–$1300" }),

  make({ program_name: "ProcurePath", verticals: ["procurement","supplier","saas"], typical_payout_range: "$150–$1100" }),
  make({ program_name: "QuotePress Proposals", verticals: ["proposals","sales_enablement","saas"], typical_payout_range: "$100–$700" }),
  make({ program_name: "LocalReach Listings", verticals: ["local_seo","listings","saas"], typical_payout_range: "$100–$500" }),
  make({ program_name: "ContentGrid CMS", verticals: ["cms","web_ops","saas"], typical_payout_range: "$120–$900" }),
  make({ program_name: "StudioSign Brand", verticals: ["brand_portal","assets","saas"], typical_payout_range: "$120–$800" }),
  make({ program_name: "WarehouseIQ OMS", verticals: ["oms","inventory","saas"], typical_payout_range: "$160–$1100" }),
  make({ program_name: "RetailLoop POS Cloud", verticals: ["pos","retail_ops","saas"], typical_payout_range: "$150–$1000" }),
  make({ program_name: "FleetSense Telematics", verticals: ["fleet","telematics","saas"], typical_payout_range: "$150–$1000" }),
  make({ program_name: "BookingNest PMS", verticals: ["property_mgmt","hospitality","saas"], typical_payout_range: "$140–$900" }),
  make({ program_name: "DeskStudio Facilities", verticals: ["facilities","space_mgmt","saas"], typical_payout_range: "$120–$800" }),
];

// Derived helper (optional): sanitize + freeze
partners.forEach((p) => {
  if (!Array.isArray(p.verticals)) p.verticals = [String(p.verticals || "saas")];
  if (!p.typical_payout_range) p.typical_payout_range = "$100–$1500";
  if (!p.geo_coverage) p.geo_coverage = "global";
});
Object.freeze(partners);

export default partners;
export { partners };
