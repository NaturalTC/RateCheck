import type { CoverageLevel, StateRules } from '../rules/types.js';

export interface EstimateInput {
  zip: string;
  yearsLicensed: number;
  drivingRecordStep: number;
  coverage: CoverageLevel;
}

export interface EstimateResult {
  low: number;
  high: number;
  /** One entry per factor so the UI can explain the estimate. */
  breakdown: Array<{ factor: string; multiplier: number }>;
  disclaimer: string;
}

// TODO(you): implement - milestone 2 in docs/PLAN.md.
// baseline (by ZIP prefix, falling back to 'default') x each multiplier, then
// widen into a low/high range. Make test/estimate.test.ts pass.
export function estimate(_rules: StateRules, _input: EstimateInput): EstimateResult {
  throw new Error('Not implemented yet');
}
