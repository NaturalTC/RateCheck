// Each supported state gets one StateRules file. Adding a state means adding
// a new file here, not changing the estimate engine.

export type CoverageLevel = 'state-minimum' | 'liability-only' | 'full';

export type IncidentType =
  | 'minorViolation'
  | 'minorAccident'
  | 'majorAccident'
  | 'majorViolation';

/** A value RateCheck chose because the real one is not public. The UI must label it. */
export interface Assumed<T> {
  value: T;
  assumed: true;
  note: string;
}

export interface AreaTier {
  name: string;
  /** Lowest population density (people per square mile) that falls in this tier. */
  minDensity: number;
  multiplier: number;
  assumed: boolean;
}

export interface Insurer {
  name: string;
  /** Published average annual premium for the sample driver, per coverage level (USD). */
  averagePremium: Record<CoverageLevel, number>;
  /** Shown next to the insurer when not everyone can buy from it. */
  eligibilityNote?: string;
}

export interface Source {
  label: string;
  url: string;
  retrieved: string; // YYYY-MM-DD
}

export interface StateRules {
  state: string; // two-letter code, e.g. "MA"
  /** First three digits of the ZIP codes that belong to this state. */
  zipPrefixes: ReadonlyArray<string>;
  /** Statewide average annual premium (USD) for the sample driver, per coverage level. */
  baselinePremium: Record<CoverageLevel, number>;
  sdip: {
    /** Surcharge points per incident, set by regulation. */
    points: Record<IncidentType, number>;
    maxPoints: number;
    /** Surcharge factor = 1 + points x surchargePercentage. */
    surchargePercentage: Assumed<number>;
    /** Incident-free for more than 5 and less than 6 years. */
    excellentDriverDiscount: Assumed<number>;
    /** Incident-free for at least 6 years. */
    excellentDriverDiscountPlus: Assumed<number>;
  };
  /** Sorted from highest minDensity to lowest. */
  areaTiers: ReadonlyArray<AreaTier>;
  /** Multiplier for ZIP codes with no density data. */
  unknownAreaMultiplier: number;
  insurers: ReadonlyArray<Insurer>;
  sources: ReadonlyArray<Source>;
}
