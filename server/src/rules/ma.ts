import type { StateRules } from './types.js';

// Massachusetts rules. ALL NUMBERS BELOW ARE PLACEHOLDERS (factor 1 / $0) until
// replaced with sourced values - see docs/PLAN.md, milestone 1.
// MA bans credit score, sex, marital status, occupation, income, education and
// home ownership as rating factors (MA Auto Insurance Bill of Rights), so they
// are deliberately absent from allowedFactors.
export const maRules: StateRules = {
  state: 'MA',
  allowedFactors: ['zip', 'yearsLicensed', 'drivingRecord', 'vehicleType', 'annualMileage', 'coverage'],
  baselineByZipPrefix: { default: 0 },
  multipliers: {
    yearsLicensed: [{ minYears: 0, factor: 1 }],
    drivingRecordStep: { 0: 1 },
    coverage: { 'state-minimum': 1, standard: 1, full: 1 },
  },
  sources: [
    {
      label: 'MA Auto Insurance Bill of Rights',
      url: 'https://www.mass.gov/doc/massachusettsbillofrightsforautoinsurancepdf/download',
      retrieved: 'TODO',
    },
  ],
};
