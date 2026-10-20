# Massachusetts research notes (Milestone 1)

Status key: ✅ confirmed from a source · ⚠️ secondary source, verify on mass.gov · ❓ open question

Retrieved 2026-10-20. Regulation text is confirmed via Cornell LII's mirror (mass.gov blocks
automated fetching). ⚠️ items come from secondary sources.

## 1. Rating factors

| Factor | Allowed in MA? | Status | Source |
|---|---|---|---|
| Credit information from a consumer report | No (rating or underwriting) | ✅ | [211 CMR 79.04(13)][cmr79-04] |
| Sex, marital status, race, creed, national origin, religion, occupation, income, education, homeownership, gender identity, sexual orientation | No | ✅ | [211 CMR 79.04(11)][cmr79-04] |
| Age | No, except to reduce rates for insureds 65 or older | ✅ | [211 CMR 79.04(11)][cmr79-04] |
| Anything with a demonstrable probable effect on losses or expenses (e.g. years licensed, garaging territory, vehicle, mileage) | Yes, if not prohibited above | ✅ general rule · ⚠️ specific factors | [211 CMR 79.04(6)][cmr79-04] |
| Driving record (SDIP) | Yes. Incidents older than 6 years can't count; each affects premiums for at most 5 years | ✅ | [211 CMR 79.04(7)][cmr79-04] |

Confirmed against the regulation text on Cornell LII (mass.gov blocks automated access).
The consumer-facing summary is the [Bill of Rights][bor].

## 2. Baseline premium

NAIC Auto Insurance Database Report, Massachusetts **combined average premium**
(liability + collision + comprehensive), via [Agency Checklists][ac-2026]:

| Year | MA combined average premium |
|---|---|
| 2023 | $1,413.49 |
| 2022 | $1,256.62 |
| 2021 | $1,254.88 |

National combined average for 2023: $1,438 ([Agency Checklists][ac-naic]).

- ⚠️ Confirm against the NAIC report itself.
- ❓ This is statewide only. There is no free per-ZIP average, so `baselineByZipPrefix`
  starts as `{ default: 1413.49 }`. See section 5 for optional area adjustments.
- ❓ 2023 data is ~3 years old. Decide whether to show "based on 2023 averages" in the UI
  or apply a documented inflation adjustment.

## 3. Safe Driver Insurance Plan (SDIP)

Formula ([211 CMR 134.10][cmr134]) ✅:
- surcharge factor = 1 + (total SDIP surcharge points × Surcharge Percentage)
- credit factor = 1 − Excellent Driver Discount (or Excellent Driver Discount Plus)
- total SDIP points range from 0 to 45

Points per incident ([211 CMR 134.13][cmr134-13]) ✅:

| Incident | Points |
|---|---|
| Minor traffic law violation | 2 (a first minor violation with a non-criminal disposition gets 0) |
| Minor at-fault accident | 3 |
| Major at-fault accident | 4 |
| Major traffic law violation | 5 |
| Comprehensive claims | only if 4+ claims totalling $2,000+ (acts of God excluded) |

Definitions ([211 CMR 134.02][cmr134-02]) ✅:
- At-fault accident: operator more than 50% at fault, with a claim payment over $1,000 above
  the deductible (accidents on or after July 1, 2015; [134.03][cmr134-03])
- Policy Experience Period: the six years before the policy effective date
- Excellent Driver Discount: incident-free for more than 5 and less than 6 years
- Excellent Driver Discount Plus: incident-free for at least 6 years

⚠️ The major vs minor accident split (reported elsewhere as $5,000 of damage) is not in the
sections checked.

❓ **Surcharge Percentage and discount amounts have no public values.** The regulation defines
them as percentages "assigned by the Commissioner" when rates are fixed and established;
it states no numbers. The app uses clearly labelled assumed values (section 5).

## 4. Minimum coverage (policies issued or renewed on/after July 1, 2025) ✅

| Coverage | Minimum |
|---|---|
| Bodily injury to others | $25,000 per person / $50,000 per accident |
| Damage to someone else's property | $30,000 per accident (was $5,000) |
| Bodily injury caused by an uninsured auto | $25,000 per person / $50,000 per accident |
| Personal injury protection (PIP) | $8,000 per person (unchanged) |

Sources: [mass.gov notice 2025-A][min-2025], [Insurance Journal][ij-min].

## 5. Public sources only (project decision)

RateCheck uses only published online sources. No emails, records requests or
paid data. Per-insurer rate filings are not public, so anything that depends on
them is an **assumption, labelled as such in the UI**.

Coverage-level averages (Bankrate, Massachusetts) ⚠️:
- full coverage ≈ $2,096 per year, minimum coverage ≈ $649 per year ([Bankrate][bankrate])
- Bankrate and the NAIC use different methods and years. Use the *ratio* between
  minimum and full coverage, not Bankrate's dollar amounts, alongside the NAIC baseline.

Town differences (published comparisons) ⚠️:
- Bankrate lists Newton among the cheapest and Lowell among the most expensive cities
  ([Bankrate][bankrate]); see also [Insurance.com][insurance-com].
- These are survey estimates, not official data. Use them, if at all, for a few cited
  area adjustments; do not copy whole tables.

Not publicly available (use labelled assumptions):
- SDIP Surcharge Percentage and Excellent Driver Discount amounts (set in insurer filings)
- Territory relativities for private passenger auto
- Per-insurer prices

## 7. Insurance.com averages (public, Quadrant Information Services data)

Source: [Insurance.com MA guide][ic-guide], retrieved 2026-10-20. Sample driver: 40-year-old,
Honda Accord LX, clean record, 12-mile commute. Full coverage = 100/300/100 limits, $500 deductibles.

Statewide: full coverage **$2,430**/yr · liability-only (50/100/50) $809 · state minimum $621.

Driving-record increases over the $2,430 average:

| Profile | Premium | Increase |
|---|---|---|
| At-fault accident | $3,771 | +55% |
| Careless driving | $3,279 | +35% |
| Claims | $2,877 | +18% |
| DUI | $4,497 | +85% |
| Reckless driving | $4,226 | +74% |
| Speeding | $3,166 | +30% |
| Texting ticket | $3,109 | +28% |

**Calibrating the assumed Surcharge Percentage:** a major at-fault accident is 4 SDIP points and
shows +55% (≈14% per point); speeding is a minor violation, 2 points, at +30% (≈15% per point).
So ~14% per point fits published data. Still an assumption (one sample driver, insurer averages).

Average by insurer (annual):

| Insurer | State minimum | Liability-only | Full coverage |
|---|---|---|---|
| Plymouth Rock Assurance | $446 | $576 | $1,719 |
| GEICO | $446 | $643 | $1,817 |
| Safety Insurance | $380 | $690 | $2,189 |
| Progressive | $907 | $1,024 | $2,490 |
| Amica | $504 | $637 | $2,491 |
| Arbella Insurance | $724 | $933 | $2,807 |
| Farmers | $549 | $758 | $2,807 |
| Travelers | $897 | $1,115 | $2,962 |
| Allstate | $951 | $1,216 | $3,388 |
| USAA | $397 | $492 | $1,658 (military families only) |

This enables a per-insurer *relative* estimate: insurer factor = insurer average ÷ statewide
average for the chosen coverage level. Label it "typical for a sample driver", not a quote.

Location data points (full coverage): Boston $2,937 (+21%), Worcester $3,036 (+25%).
⚠️ The [cheapest-insurance page][ic-cheapest]'s "most/least expensive cities" table is internally
inconsistent (its "most expensive" values are lower than its "least expensive" ones). Don't use it.

## 8. Area tiers (option B)

Public per-town averages are too sparse to price every ZIP code directly. Plan:
1. Assign each MA ZIP code a tier from a public proxy: population density from the U.S.
   Census (ZCTA data), e.g. rural / suburban / urban / dense urban.
2. Set tier multipliers from the published anchors above (dense urban ≈ 1.2–1.25 from
   Boston/Worcester; others assumed and labelled).
3. Unknown or unmatched ZIP codes fall back to 1.0 (statewide average).
4. Show the tier and its multiplier in the results breakdown.

## 6. Decisions for `ma.ts` (yours to make)

- [x] Baseline: Insurance.com per-coverage averages - state minimum $621, liability-only $809, full coverage $2,430 (section 7). NAIC kept as a cross-check only.
- [x] SDIP (assumed, labelled in the UI): Surcharge Percentage 14% per point (calibrated in section 7); Excellent Driver Discount 10%; Excellent Driver Discount Plus 17% (public 7-17% range).
- [ ] Location: option B chosen. Pick the density cut-offs and tier multipliers (section 8).
- [ ] Per-insurer estimates (section 7): include in v1 or later?
- [ ] Coverage levels: map `state-minimum` to the 2025 limits above; define what `standard` and `full` mean.
- [ ] Years of experience, vehicle type, mileage: no sourced multipliers yet. Leave at 1 or drop from v1?

[bor]: https://www.mass.gov/doc/massachusettsbillofrightsforautoinsurancepdf/download
[ic-guide]: https://www.insurance.com/auto-insurance/massachusetts-car-insurance-guide/
[ic-cheapest]: https://www.insurance.com/auto-insurance/cheapest-car-insurance-in-massachusetts/
[cmr79-04]: https://www.law.cornell.edu/regulations/massachusetts/211-CMR-79-04
[cmr134-02]: https://www.law.cornell.edu/regulations/massachusetts/211-CMR-134-02
[cmr134-03]: https://www.law.cornell.edu/regulations/massachusetts/211-CMR-134-03
[cmr134-13]: https://www.law.cornell.edu/regulations/massachusetts/211-CMR-134-13
[cmr134]: https://www.law.cornell.edu/regulations/massachusetts/211-CMR-134-10
[ac-2026]: https://agencychecklists.com/2026/03/17/auto-insurance-costs-climb-in-massachusetts-still-under-national-benchmark-80522/
[ac-naic]: https://agencychecklists.com/2026/03/04/five-items-insurance-professionals-should-know-from-the-naics-new-auto-insurance-database-report-80296/
[min-2025]: https://www.mass.gov/doc/2025-a-new-motor-vehicle-mandatory-coverage-limits/download
[ij-min]: https://www.insurancejournal.com/news/east/2025/01/10/807563.htm
[bankrate]: https://www.bankrate.com/insurance/car/average-cost-of-car-insurance-in-massachusetts
[insurance-com]: https://www.insurance.com/auto-insurance/massachusetts-car-insurance-guide/
