# Public Budget Challenges

## Structural issues in public institutions

Public budgets are not just financial documents. They are the operating system of collective governance — and like any operating system, they accumulate cruft, carry legacy obligations, and develop structural problems that constrain what the institution can actually do.

### The ratchet problem

Government spending tends to ratchet: programs are created in response to needs, funded through boom periods, and then defended as baseline during contractions. Each budget cycle negotiates from the previous year's baseline, not from zero. The effect over decades is a steadily growing structural commitment base that consumes an increasing share of revenue, leaving less room for new priorities or adaptation.

This isn't unique to government — any long-lived institution accumulates commitments. But government has a specific constraint: *it can't easily exit obligations*. Private firms can shut down product lines, lay off divisions, or go bankrupt. Government services often have legal mandates, political constituencies, and contractual obligations that make reduction extremely costly.

### Fragmented authority

Revenue authority and spending responsibility are often misaligned:

- **Federal mandates, local costs** — the federal government requires services (ADA compliance, environmental standards, special education) that local governments must fund
- **State-collected, locally-spent** — many taxes are collected by the state and redistributed, with formulas that may not match local needs
- **Special districts** — single-purpose entities (transit, water, fire) with independent taxing authority, creating overlapping jurisdictions that are difficult for residents to understand or hold accountable

TaxTracker's multi-level jurisdiction model (federal → state → county → city → special) reflects this fragmentation directly. The complexity isn't a data modeling problem — it's a governance reality.

### Temporal mismatch

Government budgets operate on annual or biennial cycles. But the problems they address — infrastructure decay, demographic shifts, climate adaptation, pension obligations — operate on multi-decade timescales. This creates a systematic bias:

- **Short-term visible** wins over **long-term invisible**: filling potholes beats replacing the pipe underneath the road, until the pipe bursts
- **Current services** win over **future capacity**: this year's teacher salaries are non-negotiable; next decade's school building is deferrable
- **Known obligations** win over **emerging risks**: pension payments are contractual; wildfire resilience is discretionary

## Debt

### Operating debt vs. capital debt

Not all public debt is the same:

**Capital debt** (general obligation bonds, revenue bonds) funds long-lived assets — schools, bridges, water systems. This is the equivalent of a mortgage: you borrow to build something that will serve the community for 30-50 years, and you repay over a similar timeframe. The asset and the liability are matched. This is reasonable.

**Operating debt** (deficit borrowing, pension obligation bonds, TRANs rolled over) funds current consumption with future revenue. This is the equivalent of putting groceries on a credit card. The service is consumed today; the bill is deferred. This is structurally dangerous.

The distinction matters because capital debt creates assets that generate value (a water treatment plant produces clean water for decades), while operating debt creates no corresponding asset — it just shifts cost forward.

### Debt service as rigidity

As debt grows, debt service payments consume an increasing share of the budget. These payments are non-negotiable — they're contractual obligations, often with constitutional priority over other spending. The effect:

- 5% of budget in debt service: comfortable, preserves flexibility
- 10-15%: noticeable constraint on discretionary spending
- 20%+: structural crisis — the institution is working for its creditors more than its residents

Some California cities (Stockton, San Bernardino, Vallejo) hit this wall and entered municipal bankruptcy. The common pattern: rising pension and debt obligations consuming general fund revenue until basic services — police, fire, parks — could no longer be maintained.

## Unfunded liabilities

### The quiet crisis

Unfunded liabilities are promises made without corresponding assets set aside to pay them. They don't appear as line items in annual budgets, but they represent real claims on future revenue.

The major categories:

**Pension obligations (OPEB excluded)**
- Public employees were promised defined-benefit pensions — a guaranteed income in retirement based on years of service and final salary
- These promises were made during periods of strong investment returns and optimistic actuarial assumptions
- When returns disappointed and assumptions were revised, the gap between what was promised and what was funded grew
- CalPERS (California's system) is roughly 70-75% funded as of recent valuations. That 25-30% gap, applied to trillions in total liabilities, represents hundreds of billions owed

**Other Post-Employment Benefits (OPEB)**
- Retiree healthcare benefits — often promised with even less funding than pensions
- Many jurisdictions funded these on a pay-as-you-go basis (no trust fund, just current-year payments from current revenue)
- As the retiree population grows relative to the active workforce, these costs escalate

**Deferred maintenance**
- Infrastructure that wasn't maintained on schedule. Every year of deferred maintenance increases the eventual repair cost (typically at a 4:1 ratio — $1 of maintenance deferred becomes $4 of repair needed)
- Roads, bridges, water/sewer systems, public buildings all have maintenance schedules. Most jurisdictions are behind.

### The accounting gap

Unfunded liabilities are off-balance-sheet in most government financial reporting. GASB standards now require disclosure of net pension liability on the balance sheet, but:

- The discount rate used to calculate the present value of liabilities is debatable (and consequential — small changes in discount rate produce swings of billions)
- OPEB liabilities are reported but often not funded
- Deferred maintenance isn't reported as a liability at all — it shows up only as deteriorating condition assessments

This is a transparency problem TaxTracker could eventually address: making the gap between *stated obligations* and *funded obligations* visible.

## Infrastructure as technical debt

Your instinct is right, and the analogy is precise.

### The parallel

In software, technical debt is the gap between *how the system should work* and *how it actually works* — accumulated shortcuts, deferred refactoring, known bugs left unfixed. It doesn't cause immediate failure, but it:

- Increases the cost of every future change
- Creates brittleness — small perturbations cause cascading failures
- Compounds over time if not serviced
- Eventually forces a costly rewrite/replacement that wouldn't have been necessary with ongoing investment

Public infrastructure follows the same pattern exactly:

| Software technical debt | Infrastructure technical debt |
|------------------------|-------------------------------|
| Deferred refactoring | Deferred maintenance |
| Legacy system nobody understands | Bridge built to 1960s standards with no documentation |
| Accumulated workarounds | Temporary patches that became permanent |
| "It works, don't touch it" | "The road is driveable, don't repave it" |
| Security vulnerabilities unpatched | Seismic/climate vulnerabilities unaddressed |
| Cost of change increases over time | Repair cost multiplier (1:4) |
| Eventually forces rewrite | Eventually forces replacement at 10x original cost |

### The funding gap as principal

The American Society of Civil Engineers grades U.S. infrastructure at a C- overall. Their estimated investment gap: $2.6 trillion over 10 years. This is the principal on infrastructure's technical debt.

At the local level, this manifests as:
- Water mains that are 80-100 years old, leaking 15-25% of treated water
- Roads with a Pavement Condition Index below "fair" — where each year of delay increases rehabilitation cost nonlinearly
- Stormwater systems designed for historical precipitation patterns, not current ones
- Public buildings with deferred HVAC, roofing, and ADA compliance

The interest on this debt is paid in emergency repairs, service disruptions, and reduced useful life of adjacent systems (a road surface fails faster when the subsurface drainage is compromised).

### Why it persists

Infrastructure technical debt persists for the same reason software technical debt does: **the people who benefit from deferring maintenance are not the people who pay for the consequences.**

- Elected officials serve 2-4 year terms; infrastructure operates on 30-50 year cycles
- Budget pressure favors visible current services over invisible preventive maintenance
- The failure mode is gradual degradation, not sudden collapse (until it is)
- There's no "test suite" that fails red when infrastructure is underfunded — the signal is slow and easy to ignore

## AI and the boundary question

### What AI compresses

Government is, structurally, an information-processing institution that happens to also employ people who do physical things (policing, firefighting, road construction). But a very large share of government labor is administrative and clerical:

- **Processing** — applications, permits, claims, filings, assessments
- **Compliance** — reviewing submissions against rules, flagging violations
- **Reporting** — assembling data into mandated formats for oversight bodies
- **Coordination** — routing work between departments, managing workflows
- **Communication** — responding to inquiries, sending notices, translating policy into guidance

AI systems are already demonstrably capable of handling much of this work faster, more consistently, and at lower marginal cost. The question isn't whether this work gets automated — it's what happens to the institution when it does.

### What shrinks

The clearest compression targets:

- **Clerical/processing staff** — permit processing, benefits administration, records management, data entry. These are high-volume, rule-based workflows where AI can handle the routine cases (80%+) and route exceptions to humans.
- **Middle management layers** — if the coordination function is handled by systems rather than meetings, the management hierarchy that exists primarily to route information flattens.
- **Compliance/audit functions** — AI can continuously monitor rather than periodically sample. One system replaces an audit team.
- **Reporting/accountability overhead** — if data is structured and systems are integrated, the labor of producing reports drops to near zero.

This suggests government *headcount* contracts — potentially significantly — while maintaining or improving service levels.

### What doesn't shrink (or grows)

Some functions resist automation and may even expand:

- **Judgment under uncertainty** — land use decisions, social work case assessment, prosecution discretion. These involve values, context, and political accountability that can't be delegated to systems.
- **Physical operations** — road repair, water treatment, emergency response. AI assists planning and dispatch, but the work is embodied.
- **Democratic interface** — public hearings, constituent services, community engagement. The legitimacy function of government requires human presence and accountability.
- **System design and oversight** — someone has to design, procure, validate, and govern the AI systems. This is a new function that barely exists in government today.
- **Policy adaptation** — if AI accelerates the pace of economic and social change, the policy function (setting rules, adjusting regulations) may need to be faster and more responsive, not slower.

### Where new boundaries form

The interesting question isn't "bigger or smaller government" but "where do the new boundaries and accumulation points emerge?"

**Boundary shifts:**

1. **Human/machine interface** — the biggest new boundary is between automated processing and human judgment. Where you draw this line defines the character of the institution. Too much automation and you lose legitimacy and context-sensitivity. Too little and you waste human capacity on mechanical work. *This boundary will be the primary design decision of 21st-century government.*

2. **Jurisdiction consolidation pressure** — if AI makes it cheap to process at scale, the argument for having 5,000+ separate local governments in California weakens. Shared back-office AI systems create gravitational pull toward consolidation — or at least shared services. Special districts, small cities, and county service areas may merge processing functions even if they keep separate governance.

3. **Real-time vs. batch** — government currently operates in batch mode (annual budgets, quarterly reports, periodic audits). AI enables continuous processing and real-time feedback. This shifts the regulatory loop from "measure → report → decide → act" (annual cycle) to something much faster. Beer's cyberfolk intuition becomes technically feasible: real-time feedback from service delivery to policy adjustment.

4. **Transparency as default** — if AI systems structure and process government data continuously, the *cost of transparency drops to near zero*. The current situation — where citizens must FOIA request data that government itself has trouble finding — is an artifact of manual information processing. When all data is structured and searchable, the boundary between inside-government and public knowledge shifts dramatically. TaxTracker's mission becomes easier, not harder.

**New accumulation points:**

1. **AI system procurement and governance** — whoever controls the AI systems that run government operations holds enormous power. This becomes the new contested resource, replacing headcount as the primary budget/political battle.

2. **Data infrastructure** — the quality of government AI depends entirely on the quality of government data. Jurisdictions that invest in clean, structured, interoperable data systems will perform dramatically better than those running AI on top of messy legacy systems. Data quality becomes the new infrastructure — with its own technical debt dynamics.

3. **Exception handling** — the humans remaining in government will increasingly be exception handlers: the cases AI can't resolve, the situations that require judgment, the moments that require democratic accountability. This is higher-skill, higher-stakes work. It concentrates human effort at the margins where the most interesting (and contested) decisions live.

4. **Legitimacy and trust** — if people can't understand how decisions are being made (because AI is making them), institutional legitimacy erodes. New accumulation of effort around explainability, public engagement, and democratic oversight of automated systems. This is a *growth* area, not a shrinkage area.

### The net effect

Government probably *shrinks in headcount* but *expands in capability*. The budget shifts:

- **Down:** Personnel costs for administrative/clerical functions
- **Up:** Technology infrastructure (AI systems, data platforms, cybersecurity)
- **Up:** Higher-skilled human roles (system designers, exception handlers, policy analysts)
- **Uncertain:** Physical operations (AI improves planning efficiency but doesn't eliminate the work)
- **Persistent:** Structural obligations (pensions, debt service, unfunded liabilities don't go away — they may even grow as fewer active employees support more retirees)

The risk: AI-driven efficiency gains get captured by structural obligations (pension costs, debt service) rather than reinvested in capacity. Government gets leaner but not more capable, because the savings flow to past promises rather than future investment.

The opportunity: if the efficiency gains are reinvested — in infrastructure technical debt reduction, in data quality, in service improvement — government could become dramatically more effective at its core mission of maintaining and improving public capacity.

Which outcome occurs is a political question, not a technical one. The information that TaxTracker makes visible — where money comes from, where it pools, where it goes — is exactly what citizens need to push for the better outcome.
