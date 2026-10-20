# Massachusetts research notes (Milestone 1)

Status key: ✅ confirmed from a source · ⚠️ secondary source, verify on mass.gov · ❓ open question

Retrieved 2026-10-20. mass.gov blocks automated fetching, so open the mass.gov
links in a browser and confirm the ⚠️ items yourself before they go into `ma.ts`.

## 1. Rating factors

| Factor | Allowed in MA? | Status | Source |
|---|---|---|---|
| Credit score / credit information | No (rating and underwriting) | ⚠️ | [Bill of Rights][bor], [Insurance Journal 2007][ij-credit] |
| Sex, marital status, race, occupation, income, education, home ownership | No | ⚠️ | [Bill of Rights][bor] |
| Age | No, except a discount for drivers 65+ | ⚠️ | [Bill of Rights][bor] |
| Years of driving experience | Yes | ⚠️ | aggregator summaries |
| Garaging location (territory) | Yes | ⚠️ | aggregator summaries |
| Vehicle type, annual mileage | Yes | ⚠️ | aggregator summaries |
| Driving record (SDIP) | Yes, uniform statewide system | ✅ | [211 CMR 134.10][cmr134] |

**Your task:** read the [Bill of Rights][bor] and turn every ⚠️ above into ✅ or correct it.

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
  starts as `{ default: 1413.49 }`. Territory differences need rate filings (section 5).
- ❓ 2023 data is ~3 years old. Decide whether to show "based on 2023 averages" in the UI
  or apply a documented inflation adjustment.

## 3. Safe Driver Insurance Plan (SDIP)

Formula ([211 CMR 134.10][cmr134]) ✅:
- surcharge factor = 1 + (total SDIP surcharge points × Surcharge Percentage)
- credit factor = 1 − Excellent Driver Discount (or Excellent Driver Discount Plus)
- total SDIP points range from 0 to 45

Points per incident (mass.gov SDIP page, via search) ⚠️:

| Incident | Points |
|---|---|
| Minor traffic law violation | 2 |
| Minor at-fault accident | 3 |
| Major at-fault accident | 4 |
| Major traffic law violation | 5 |

Discount eligibility ⚠️:
- Excellent Driver Discount: 5+ years of experience and no surchargeable incidents in the last 5 years
- Excellent Driver Discount Plus: 6+ years and none in the last 6 years

❓ **Surcharge Percentage and discount amounts were not found.** They appear to be set in
each insurer's rate filing, not by the state. Ask the Division of Insurance (section 5).
Until then the app can only use a clearly labelled assumed value.

## 4. Minimum coverage (policies issued or renewed on/after July 1, 2025) ✅

| Coverage | Minimum |
|---|---|
| Bodily injury to others | $25,000 per person / $50,000 per accident |
| Damage to someone else's property | $30,000 per accident (was $5,000) |
| Bodily injury caused by an uninsured auto | $25,000 per person / $50,000 per accident |
| Personal injury protection (PIP) | $8,000 per person (unchanged) |

Sources: [mass.gov notice 2025-A][min-2025], [Insurance Journal][ij-min].

## 5. Rate filings ❓

- Filings go to the Division of Insurance via SERFF under [211 CMR 79.00][cmr79];
  [submission guidance][filing-guide].
- No public portal for reading them was found. One [industry bulletin][car-1212] says
  filed rates are available "to member companies upon request".

### Draft email to the Division of Insurance (edit and send yourself)

> **Subject:** Public access to private passenger auto rate filings
>
> Hello,
>
> I am a computer science student at Westfield State University building a
> non-commercial educational tool that explains how Massachusetts auto insurance
> premiums are calculated. I would like to understand how a member of the public can
> access approved private passenger automobile rate and rule filings, in particular
> the SDIP Surcharge Percentage and Excellent Driver Discount values that insurers
> file, and territory rate relativities.
>
> Are these filings available for public inspection or online, or should I submit a
> public records request? Any pointers would be appreciated.
>
> Thank you,
> Jose Jimenez

## 6. Decisions for `ma.ts` (yours to make)

- [ ] Baseline: use $1,413.49 (2023) as `default`? Label the year in the UI?
- [ ] SDIP: model surcharge points → factor with an *assumed* Surcharge Percentage until filings arrive? Where will the UI say it's assumed?
- [ ] Coverage levels: map `state-minimum` to the 2025 limits above; define what `standard` and `full` mean.
- [ ] Years of experience, vehicle type, mileage: no sourced multipliers yet. Leave at 1 or drop from v1?

[bor]: https://www.mass.gov/doc/massachusettsbillofrightsforautoinsurancepdf/download
[ij-credit]: https://amp.insurancejournal.com/news/east/2007/10/09/84100.htm
[cmr134]: https://www.law.cornell.edu/regulations/massachusetts/211-CMR-134-10
[ac-2026]: https://agencychecklists.com/2026/03/17/auto-insurance-costs-climb-in-massachusetts-still-under-national-benchmark-80522/
[ac-naic]: https://agencychecklists.com/2026/03/04/five-items-insurance-professionals-should-know-from-the-naics-new-auto-insurance-database-report-80296/
[min-2025]: https://www.mass.gov/doc/2025-a-new-motor-vehicle-mandatory-coverage-limits/download
[ij-min]: https://www.insurancejournal.com/news/east/2025/01/10/807563.htm
[cmr79]: https://www.mass.gov/doc/211-cmr-7900-private-passenger-motor-vehicle-insurance-rates/download
[filing-guide]: https://www.mass.gov/doc/2008-c-submitting-private-passenger-motor-vehicle-rate-filings-in-massachusetts/download
[car-1212]: https://www.commauto.com/bulletins/bulletins/2026/bulletin_1212.pdf
