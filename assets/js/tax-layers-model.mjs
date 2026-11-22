// One place, and the taxes that can meet someone or some transaction there.
// A sketch row is a name we have not tied to a defining document on this page.
// World frame for the scene: y up, east is +x, north is -z.

export const PLACE = {
  id: "vacaville",
  name: "Vacaville",
  region: "California",
};

// Bottom to top. Wider bands are the broader jurisdictions.
export const GROUPS = [
  { id: "federal", name: "Federal", radius: 3.35, color: 0x334155 },
  { id: "state", name: "State", radius: 2.7, color: 0x4f46e5 },
  { id: "local", name: "Local", radius: 2.1, color: 0x6366f1 },
  { id: "other", name: "Other", radius: 1.5, color: 0xd97706 },
];

export const TAXES = [
  {
    id: "federal-income",
    group: "federal",
    name: "Federal income tax",
    sketch: false,
    inventory: "/taxes/united-states-federal-income-tax/",
    note: "It reaches the taxable income a resident reports to the United States.",
  },
  {
    id: "payroll",
    group: "federal",
    name: "Social Security and Medicare",
    sketch: true,
    inventory: null,
    note: "Payroll taxes on wages. This row is a name only.",
  },
  {
    id: "state-income",
    group: "state",
    name: "California personal income tax",
    sketch: false,
    inventory: "/taxes/california-personal-income-tax/",
    note: "It reaches the taxable income a resident reports to the state.",
  },
  {
    id: "state-income-additional",
    group: "state",
    name: "Additional personal income tax",
    sketch: false,
    inventory: "/taxes/california-additional-personal-income-tax/",
    note: "A separate state income tax, defined in its own section.",
  },
  {
    id: "state-sales",
    group: "state",
    name: "California sales and use tax",
    sketch: true,
    inventory: "/taxes/california-use-tax/",
    note: "The statewide sales and use tax on a purchase. The inventory link is the use-tax record. The combined city rate is a stack of other rows.",
  },
  {
    id: "fuel",
    group: "state",
    name: "Fuel excise tax",
    sketch: false,
    inventory: "/taxes/california-fuel-excise-tax/",
    note: "It reaches someone who buys fuel.",
  },
  {
    id: "property-general",
    group: "state",
    name: "Property tax, 1% general levy",
    sketch: false,
    inventory: "/taxes/solano-property-tax/",
    note: "Proposition 13 caps this levy at 1% of assessed value. Solano County bills it and apportions it.",
  },
  {
    id: "local-sales",
    group: "local",
    name: "Uniform local sales and use tax",
    sketch: false,
    inventory: "/taxes/vacaville-uniform-local-sales-and-use-tax/",
    note: "The city's Bradley-Burns sales and use tax, in the municipal code.",
  },
  {
    id: "local-district-sales",
    group: "local",
    name: "Transactions and use tax",
    sketch: false,
    inventory: "/taxes/vacaville-transactions-and-use-tax/",
    note: "The city's district sales tax. The code chapter does not call it Measure M.",
  },
  {
    id: "library-sales",
    group: "local",
    name: "Library transactions and use tax",
    sketch: false,
    inventory: "/taxes/solano-county-ca-library-transactions-and-use-tax/",
    note: "A county district tax on a taxable transaction. Its defining document is not linked on this sketch.",
  },
  {
    id: "business-license",
    group: "local",
    name: "Business license tax",
    sketch: false,
    inventory: "/taxes/vacaville-business-license-tax/",
    note: "It reaches a business the city licenses.",
  },
  {
    id: "community-services",
    group: "local",
    name: "Community services and facilities tax",
    sketch: false,
    inventory: "/taxes/vacaville-community-services-and-facilities-tax/",
    note: "The ordinance collects it with the water and sewer bill, the business license, or the lodging tax.",
  },
  {
    id: "lodging",
    group: "local",
    name: "Transient occupancy tax",
    sketch: false,
    inventory: "/taxes/vacaville-lodging-tax/",
    note: "A lodging guest pays it. The household that lives here does not.",
  },
  {
    id: "voter-debt",
    group: "other",
    name: "Voter-approved debt",
    sketch: true,
    inventory: null,
    note: "Bonds on this parcel's tax rate area. The names and the rate depend on the parcel, and the county resets the rate each year.",
  },
  {
    id: "assessments",
    group: "other",
    name: "Direct assessments",
    sketch: true,
    inventory: null,
    note: "A Vacaville bill carries on the order of 17 of these. Each one needs its own document.",
  },
  {
    id: "service-fees",
    group: "other",
    name: "Service fees",
    sketch: true,
    inventory: null,
    note: "A fee for a service, set in a fee schedule. It is a different instrument from the 1% levy and from a sales tax.",
  },
];

export function groupById(id) {
  return GROUPS.find((group) => group.id === id) || null;
}

export function taxesInGroup(groupId) {
  return TAXES.filter((tax) => tax.group === groupId);
}

export function taxById(id) {
  return TAXES.find((tax) => tax.id === id) || null;
}

// Vertical slot of each band. Federal is lowest and widest.
export function bandHeight(groupId) {
  const index = GROUPS.findIndex((group) => group.id === groupId);
  return 0.55 + index * 0.95;
}
