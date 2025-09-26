// Self-contained dataset (LOW-RISK verticals only).
// Replace/extend this array with your full catalog.
// IMPORTANT: Keep this as a .js file and expose it as window.PARTNERS_DATA.

window.PARTNERS_DATA = [
  {
    program_name: "Acme Cyber SaaS",
    verticals: ["cybersecurity","saas"],
    mechanism: "referral_link",
    automation_score: 5,
    payout_model: "recurring",
    typical_payout_range: "$200–$1500",
    geo_coverage: "global",        // counts toward global + all regional tallies
    approval_friction: "light"
  },
  {
    program_name: "Zen Data Feeds",
    verticals: ["data_feeds","saas"],
    mechanism: "api",
    automation_score: 4,
    payout_model: "recurring",
    typical_payout_range: "$100–$900",
    geo_coverage: "US|EU|UK|APAC", // counts each region, not global
    approval_friction: "medium"
  },
  {
    program_name: "LedgerFlow",
    verticals: ["finops","saas"],
    mechanism: "referral_link",
    automation_score: 5,
    payout_model: "recurring",
    typical_payout_range: "$150–$1200",
    geo_coverage: "US|EU|UK",
    approval_friction: "light"
  }
  // → paste the rest of your 53+ programs here
];
