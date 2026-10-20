import type { StateRules } from './types.js';

// Massachusetts rules. Research and reasoning: docs/research/massachusetts.md.
// MA bans credit, sex, marital status, age (except 65+), occupation, income,
// education and homeownership as rating factors (211 CMR 79.04), so none of
// them appear here.
export const maRules: StateRules = {
  state: 'MA',
  zipPrefixes: [
    '010', '011', '012', '013', '014', '015', '016', '017', '018', '019',
    '020', '021', '022', '023', '024', '025', '026', '027',
  ],

  // Insurance.com / Quadrant, sample driver: 40-year-old, Honda Accord LX, clean record
  baselinePremium: {
    'state-minimum': 621,
    'liability-only': 809,
    full: 2430,
  },

  sdip: {
    // 211 CMR 134.13
    points: {
      minorViolation: 2,
      minorAccident: 3,
      majorAccident: 4,
      majorViolation: 5,
    },
    maxPoints: 45, // 211 CMR 134.10
    surchargePercentage: {
      value: 0.14,
      assumed: true,
      note: 'Calibrated from published increases: at-fault accident +55% (4 points), speeding +30% (2 points).',
    },
    excellentDriverDiscount: {
      value: 0.1,
      assumed: true,
      note: 'Within the publicly reported 7-17% range.',
    },
    excellentDriverDiscountPlus: {
      value: 0.17,
      assumed: true,
      note: 'Top of the publicly reported 7-17% range.',
    },
  },

  // Density = people per square mile (2020 Census, see ma-zip-density.ts)
  areaTiers: [
    { name: 'Urban', minDensity: 3000, multiplier: 1.2, assumed: false }, // Boston +21%, Worcester +25%
    { name: 'Suburban', minDensity: 1000, multiplier: 1.0, assumed: true },
    { name: 'Small town', minDensity: 250, multiplier: 0.9, assumed: true },
    { name: 'Rural', minDensity: 0, multiplier: 0.85, assumed: true },
  ],
  unknownAreaMultiplier: 1.0,

  // Insurance.com / Quadrant averages, same sample driver as baselinePremium
  insurers: [
    { name: 'Plymouth Rock Assurance', averagePremium: { 'state-minimum': 446, 'liability-only': 576, full: 1719 } },
    { name: 'GEICO', averagePremium: { 'state-minimum': 446, 'liability-only': 643, full: 1817 } },
    { name: 'Safety Insurance', averagePremium: { 'state-minimum': 380, 'liability-only': 690, full: 2189 } },
    { name: 'Progressive', averagePremium: { 'state-minimum': 907, 'liability-only': 1024, full: 2490 } },
    { name: 'Amica', averagePremium: { 'state-minimum': 504, 'liability-only': 637, full: 2491 } },
    { name: 'Arbella Insurance', averagePremium: { 'state-minimum': 724, 'liability-only': 933, full: 2807 } },
    { name: 'Farmers', averagePremium: { 'state-minimum': 549, 'liability-only': 758, full: 2807 } },
    { name: 'Travelers', averagePremium: { 'state-minimum': 897, 'liability-only': 1115, full: 2962 } },
    { name: 'Allstate', averagePremium: { 'state-minimum': 951, 'liability-only': 1216, full: 3388 } },
    {
      name: 'USAA',
      averagePremium: { 'state-minimum': 397, 'liability-only': 492, full: 1658 },
      eligibilityNote: 'Military members, veterans and their families only.',
    },
  ],

  sources: [
    {
      label: 'Insurance.com, Massachusetts car insurance guide (Quadrant Information Services data)',
      url: 'https://www.insurance.com/auto-insurance/massachusetts-car-insurance-guide/',
      retrieved: '2026-10-20',
    },
    {
      label: '211 CMR 79.04 - prohibited rating factors',
      url: 'https://www.law.cornell.edu/regulations/massachusetts/211-CMR-79-04',
      retrieved: '2026-10-20',
    },
    {
      label: '211 CMR 134.13 - SDIP surcharge points',
      url: 'https://www.law.cornell.edu/regulations/massachusetts/211-CMR-134-13',
      retrieved: '2026-10-20',
    },
    {
      label: '211 CMR 134.10 - SDIP surcharge and credit formula',
      url: 'https://www.law.cornell.edu/regulations/massachusetts/211-CMR-134-10',
      retrieved: '2026-10-20',
    },
    {
      label: 'Boston Globe (2023) - 17% excellent driver reduction',
      url: 'https://www.bostonglobe.com/2023/02/05/business/you-caused-damage-your-car-is-it-worth-filing-claim',
      retrieved: '2026-10-20',
    },
    {
      label: 'U.S. Census Bureau TIGERweb, 2020 ZCTA population and land area',
      url: 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Census2020/MapServer/84',
      retrieved: '2026-10-20',
    },
  ],
};
