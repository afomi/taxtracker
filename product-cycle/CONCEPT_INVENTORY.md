# Concept Inventory

| Concept | Description | Related Personas | Related Stories |
|---------|-------------|-----------------|-----------------|
| Tax | A compulsory financial charge imposed by a government entity. The core domain object. | civic_researcher, data_contributor, policy_analyst | US-01, US-02, US-03, US-04, US-05, US-07 |
| Jurisdiction | The governmental boundary (federal, state, county, city, special district) that imposes a tax. Has a level, name, and slug. | civic_researcher, data_contributor, policy_analyst | US-01, US-02, US-03, US-08 |
| Agency | The government department or body that administers/collects a tax. Has a name and optional slug. | civic_researcher, data_contributor | US-01, US-02, US-03 |
| Rate | The amount charged for a tax — expressed as percent, flat amount, or "other"/varies. Includes what it applies to and optional cap. | civic_researcher, data_contributor, policy_analyst | US-01, US-02, US-03, US-08 |
| Revenue | The total annual dollar amount collected from a tax, paired with a fiscal year. | civic_researcher, policy_analyst | US-02, US-07, US-08 |
| Source | An authoritative reference (URL + name) that documents a tax's legal basis or current status. | civic_researcher, data_contributor | US-02, US-03 |
| Status | The lifecycle state of a tax: active, proposed, or repealed. | civic_researcher, data_contributor | US-01, US-02, US-03 |
| Type | The category of tax: sales, property, income, lodging, excise, use, etc. | civic_researcher, policy_analyst | US-01, US-02, US-08 |
| Slug | A URL-safe identifier derived from the tax or jurisdiction name, used for page generation and file paths. | data_contributor | US-02, US-03, US-04 |
| Flow | A visual representation of revenue moving from tax collection through funds to expenditure. | civic_researcher | US-06 |
| Fund | An account or pool where collected tax revenue is deposited before allocation. Referenced in flow visualizations. | civic_researcher, policy_analyst | US-06 |
| Expenditure | The downstream spending of collected tax revenue by a department or program. | civic_researcher, policy_analyst | US-06 |
| Export | A downloadable file (CSV/JSON) of tax data for external analysis. | policy_analyst | US-07 |
