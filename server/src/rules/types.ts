// Each supported state gets one StateRules file. Adding a state means adding
// a new file here, not changing the estimate engine.

export type CoverageLevel = 'state-minimum' | 'standard' | 'full';

export interface StateRules {
  state: string; // two-letter code, e.g. "MA"
  /** Factors insurers may legally use in this state. The engine must ignore anything else. */
  allowedFactors: ReadonlyArray<'zip' | 'yearsLicensed' | 'drivingRecord' | 'vehicleType' | 'annualMileage' | 'coverage'>;
  /** Average annual premium (USD) used as the starting point, keyed by ZIP prefix or 'default'. */
  baselineByZipPrefix: Record<string, number>;
  /** Multipliers applied to the baseline. Every value must cite a source in sources[]. */
  multipliers: {
    yearsLicensed: Array<{ minYears: number; factor: number }>;
    drivingRecordStep: Record<number, number>;
    coverage: Record<CoverageLevel, number>;
  };
  sources: Array<{ label: string; url: string; retrieved: string }>;
}
