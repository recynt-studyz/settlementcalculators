export type FaultRule = 'pure_comparative' | 'modified_50' | 'modified_51' | 'contributory'

export interface StateData {
  name: string
  abbr: string
  faultRule: FaultRule
  faultRuleLabel: string
  solYears: number        // PI statute of limitations
  wcMaxWeekly: number    // Workers comp max weekly benefit
  medMalCap: number | null  // null = no cap
  dogBiteStrict: boolean
  avgPIRange: [number, number]  // average PI settlement range low/high
}

export const STATES: Record<string, StateData> = {
  AL: { name: 'Alabama',        abbr: 'AL', faultRule: 'contributory',   faultRuleLabel: 'contributory negligence — any fault on your part bars recovery', solYears: 2, wcMaxWeekly: 967,  medMalCap: 400000,   dogBiteStrict: false, avgPIRange: [25000, 75000]  },
  AK: { name: 'Alaska',         abbr: 'AK', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 2, wcMaxWeekly: 1713, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  AZ: { name: 'Arizona',        abbr: 'AZ', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 2, wcMaxWeekly: 3000, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [30000, 95000]  },
  AR: { name: 'Arkansas',       abbr: 'AR', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 3, wcMaxWeekly: 760,  medMalCap: null,     dogBiteStrict: false, avgPIRange: [25000, 70000]  },
  CA: { name: 'California',     abbr: 'CA', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 2, wcMaxWeekly: 1619, medMalCap: 350000,   dogBiteStrict: true,  avgPIRange: [45000, 130000] },
  CO: { name: 'Colorado',       abbr: 'CO', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 3, wcMaxWeekly: 1474, medMalCap: 300000,   dogBiteStrict: true,  avgPIRange: [35000, 100000] },
  CT: { name: 'Connecticut',    abbr: 'CT', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1702, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [35000, 105000] },
  DE: { name: 'Delaware',       abbr: 'DE', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1126, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  FL: { name: 'Florida',        abbr: 'FL', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1197, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [40000, 115000] },
  GA: { name: 'Georgia',        abbr: 'GA', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 2, wcMaxWeekly: 800,  medMalCap: null,     dogBiteStrict: false, avgPIRange: [30000, 90000]  },
  HI: { name: 'Hawaii',         abbr: 'HI', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 2, wcMaxWeekly: 1255, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [30000, 95000]  },
  ID: { name: 'Idaho',          abbr: 'ID', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 2, wcMaxWeekly: 1027, medMalCap: 250000,   dogBiteStrict: false, avgPIRange: [25000, 75000]  },
  IL: { name: 'Illinois',       abbr: 'IL', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1901, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [40000, 115000] },
  IN: { name: 'Indiana',        abbr: 'IN', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1040, medMalCap: 1800000,  dogBiteStrict: false, avgPIRange: [28000, 85000]  },
  IA: { name: 'Iowa',           abbr: 'IA', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 2145, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  KS: { name: 'Kansas',         abbr: 'KS', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 2, wcMaxWeekly: 753,  medMalCap: 350000,   dogBiteStrict: true,  avgPIRange: [25000, 75000]  },
  KY: { name: 'Kentucky',       abbr: 'KY', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 1, wcMaxWeekly: 1029, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [28000, 85000]  },
  LA: { name: 'Louisiana',      abbr: 'LA', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 1, wcMaxWeekly: 823,  medMalCap: 500000,   dogBiteStrict: true,  avgPIRange: [28000, 85000]  },
  ME: { name: 'Maine',          abbr: 'ME', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 6, wcMaxWeekly: 1062, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [28000, 85000]  },
  MD: { name: 'Maryland',       abbr: 'MD', faultRule: 'contributory',   faultRuleLabel: 'contributory negligence — any fault on your part bars recovery', solYears: 3, wcMaxWeekly: 1259, medMalCap: 860000,   dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  MA: { name: 'Massachusetts',  abbr: 'MA', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 3, wcMaxWeekly: 1938, medMalCap: 500000,   dogBiteStrict: true,  avgPIRange: [35000, 105000] },
  MI: { name: 'Michigan',       abbr: 'MI', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 3, wcMaxWeekly: 1213, medMalCap: 444400,   dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  MN: { name: 'Minnesota',      abbr: 'MN', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1361, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [32000, 95000]  },
  MS: { name: 'Mississippi',    abbr: 'MS', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 3, wcMaxWeekly: 567,  medMalCap: 500000,   dogBiteStrict: false, avgPIRange: [22000, 65000]  },
  MO: { name: 'Missouri',       abbr: 'MO', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 5, wcMaxWeekly: 1171, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  MT: { name: 'Montana',        abbr: 'MT', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 3, wcMaxWeekly: 983,  medMalCap: 250000,   dogBiteStrict: false, avgPIRange: [25000, 75000]  },
  NE: { name: 'Nebraska',       abbr: 'NE', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 4, wcMaxWeekly: 1012, medMalCap: 1750000,  dogBiteStrict: true,  avgPIRange: [28000, 85000]  },
  NV: { name: 'Nevada',         abbr: 'NV', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1133, medMalCap: 350000,   dogBiteStrict: false, avgPIRange: [30000, 90000]  },
  NH: { name: 'New Hampshire',  abbr: 'NH', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 3, wcMaxWeekly: 1895, medMalCap: null,     dogBiteStrict: false, avgPIRange: [30000, 90000]  },
  NJ: { name: 'New Jersey',     abbr: 'NJ', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1131, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [35000, 105000] },
  NM: { name: 'New Mexico',     abbr: 'NM', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 3, wcMaxWeekly: 1025, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [28000, 85000]  },
  NY: { name: 'New York',       abbr: 'NY', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 3, wcMaxWeekly: 1125, medMalCap: null,     dogBiteStrict: false, avgPIRange: [45000, 135000] },
  NC: { name: 'North Carolina', abbr: 'NC', faultRule: 'contributory',   faultRuleLabel: 'contributory negligence — any fault on your part bars recovery', solYears: 3, wcMaxWeekly: 1254, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [28000, 85000]  },
  ND: { name: 'North Dakota',   abbr: 'ND', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 6, wcMaxWeekly: 1226, medMalCap: 500000,   dogBiteStrict: false, avgPIRange: [25000, 75000]  },
  OH: { name: 'Ohio',           abbr: 'OH', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1258, medMalCap: 350000,   dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  OK: { name: 'Oklahoma',       abbr: 'OK', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 893,  medMalCap: 350000,   dogBiteStrict: false, avgPIRange: [25000, 75000]  },
  OR: { name: 'Oregon',         abbr: 'OR', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1581, medMalCap: null,     dogBiteStrict: false, avgPIRange: [30000, 90000]  },
  PA: { name: 'Pennsylvania',   abbr: 'PA', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1344, medMalCap: null,     dogBiteStrict: false, avgPIRange: [32000, 95000]  },
  RI: { name: 'Rhode Island',   abbr: 'RI', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 3, wcMaxWeekly: 1781, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  SC: { name: 'South Carolina', abbr: 'SC', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 3, wcMaxWeekly: 1068, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [28000, 85000]  },
  SD: { name: 'South Dakota',   abbr: 'SD', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 3, wcMaxWeekly: 854,  medMalCap: 500000,   dogBiteStrict: false, avgPIRange: [25000, 75000]  },
  TN: { name: 'Tennessee',      abbr: 'TN', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 1, wcMaxWeekly: 1161, medMalCap: 750000,   dogBiteStrict: false, avgPIRange: [28000, 85000]  },
  TX: { name: 'Texas',          abbr: 'TX', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 1087, medMalCap: 750000,   dogBiteStrict: false, avgPIRange: [32000, 95000]  },
  UT: { name: 'Utah',           abbr: 'UT', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 4, wcMaxWeekly: 1027, medMalCap: 450000,   dogBiteStrict: true,  avgPIRange: [28000, 85000]  },
  VT: { name: 'Vermont',        abbr: 'VT', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 3, wcMaxWeekly: 1468, medMalCap: null,     dogBiteStrict: false, avgPIRange: [28000, 85000]  },
  VA: { name: 'Virginia',       abbr: 'VA', faultRule: 'contributory',   faultRuleLabel: 'contributory negligence — any fault on your part bars recovery', solYears: 2, wcMaxWeekly: 1432, medMalCap: 2500000,  dogBiteStrict: false, avgPIRange: [28000, 85000]  },
  WA: { name: 'Washington',     abbr: 'WA', faultRule: 'pure_comparative', faultRuleLabel: 'pure comparative fault — you can recover even if primarily at fault', solYears: 3, wcMaxWeekly: 1568, medMalCap: null,     dogBiteStrict: true,  avgPIRange: [35000, 105000] },
  WV: { name: 'West Virginia',  abbr: 'WV', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 2, wcMaxWeekly: 878,  medMalCap: null,     dogBiteStrict: false, avgPIRange: [25000, 75000]  },
  WI: { name: 'Wisconsin',      abbr: 'WI', faultRule: 'modified_51',    faultRuleLabel: 'modified comparative fault (51% bar) — no recovery if 51%+ at fault', solYears: 3, wcMaxWeekly: 1557, medMalCap: 750000,   dogBiteStrict: true,  avgPIRange: [30000, 90000]  },
  WY: { name: 'Wyoming',        abbr: 'WY', faultRule: 'modified_50',    faultRuleLabel: 'modified comparative fault (50% bar) — no recovery if 50%+ at fault', solYears: 4, wcMaxWeekly: 1082, medMalCap: null,     dogBiteStrict: false, avgPIRange: [25000, 75000]  },
}

export const STATE_LIST = Object.values(STATES).sort((a, b) => a.name.localeCompare(b.name))

export const STATE_SLUGS: Record<string, string> = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE', florida: 'FL', georgia: 'GA',
  hawaii: 'HI', idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA',
  kansas: 'KS', kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD',
  massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS', missouri: 'MO',
  montana: 'MT', nebraska: 'NE', nevada: 'NV', 'new-hampshire': 'NH', 'new-jersey': 'NJ',
  'new-mexico': 'NM', 'new-york': 'NY', 'north-carolina': 'NC', 'north-dakota': 'ND', ohio: 'OH',
  oklahoma: 'OK', oregon: 'OR', pennsylvania: 'PA', 'rhode-island': 'RI', 'south-carolina': 'SC',
  'south-dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT', vermont: 'VT',
  virginia: 'VA', washington: 'WA', 'west-virginia': 'WV', wisconsin: 'WI', wyoming: 'WY',
}

export function getFaultReduction(grossLow: number, grossHigh: number, faultPct: number, rule: FaultRule): [number, number] | null {
  if (faultPct <= 0) return null
  if (rule === 'contributory' && faultPct > 0) return [0, 0]
  if (rule === 'modified_50' && faultPct >= 50) return [0, 0]
  if (rule === 'modified_51' && faultPct >= 51) return [0, 0]
  const factor = 1 - faultPct / 100
  return [Math.round(grossLow * factor), Math.round(grossHigh * factor)]
}

export const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
