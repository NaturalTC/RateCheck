import type { CoverageLevel, IncidentType, StateRules } from '../rules/types.js';

export interface EstimateInput {
  zip: string;
  coverage: CoverageLevel;
  yearsLicensed: number;
  /** Surchargeable incidents in the last 6 years, counted by type. */
  incidents: Partial<Record<IncidentType, number>>;
  /** Years since the most recent surchargeable incident (or since licensed, if none). */
  incidentFreeYears: number;
}

export interface EstimateResult {
  low: number;
  high: number;
  /** One entry per factor so the UI can explain the estimate. */
  breakdown: Array<{ factor: string; multiplier: number }>;
  disclaimer: string;
}

// TODO(you): implement - milestone 2 in docs/PLAN.md.
// baselinePremium[coverage] x area tier (from maZipDensity) x SDIP surcharge or
// credit, then widen into a low/high range. Make test/estimate.test.ts pass.
export function estimate(_rules: StateRules, _input: EstimateInput): EstimateResult {
  throw new Error('Not implemented yet');
}
