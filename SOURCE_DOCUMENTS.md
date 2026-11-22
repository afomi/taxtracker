---
layout: default
title: Finding the documents for a tax
permalink: /how-it-works/source-documents/
description: A repeatable way to find the document that defines a tax, the document that reports what was collected, and the document that shows where it was spent.
---

{% include header.html %}

# Finding the documents for a tax

A tax is ready to show when three documents are attached.
Each document has one job.
A page that tries to do all three jobs is a lead, and the pass below still looks for the other two.

1. **Defined.** A source document that names the tax and its scope: who imposes it, on what, over what territory, at what rate or by what formula, and for how long.
2. **Collected.** A source document that reports how much was collected, for a named period, by the agency that takes it in.
3. **Spent.** A source document that shows where that money went, for a named period.

An active tax may be missing any of the three.
The empty slot stays empty.
A guessed name may appear on the Vacaville sketch so the picture can be drawn.
A guessed name does not enter the inventory.

This pass finds documents.
Filling one inventory record from those documents is the gather step on [Contribute](/contribute/).
The sketch of one place is [/places/vacaville/](/places/vacaville/).

## The pass

Run the pass for one place and one standpoint.
The first place is Vacaville, California.
The first standpoint is a person who lives there.

1. **Name the standpoint.** A resident, a parcel, a shopper, a guest, and a business each meet a different subset. Write down which standpoint this pass is for. The Vacaville sketch shows all of them, in separate groups, so a lodging tax is not drawn as a tax on the house.
2. **List candidates from an official index.** Use a code table of contents, a rate book, an auditor's assessment list, or a budget revenue schedule. A line in a budget says the government receives the money. It does not define the tax. Memory and news are not indexes.
3. **Take one candidate.** Search for the defining document first, then collections, then expenditures. Stop on the first official document that actually does that job. Keep looking when a page only points at the document.
4. **Open it.** Read the page or the file. A search snippet is not a source. A document that does not load is not cited.
5. **Write one row.** Name, who levies it, which standpoint it reaches, the three URLs, and what is still unknown. Put the role in the words of the citation (`Defined in`, `Collected in`, `Spent in`). The inventory schema still has one `sources` list. The role lives in the source name until the schema grows a slot for each role.
6. **Promote the row only after the defining document has been opened.** The rate stays empty until the defining document or the collecting agency's rate page states it. The revenue stays empty until a collections document states it. Shares of spending stay empty until an expenditure document states them.
7. **Leave the sketch and the inventory apart.** The sketch may show a stub so the stack is visible. The inventory file is `_data/taxes`. `npm run build:data` is what admits a file into the inventory.

## Where each document usually is

| Level | Defined | Collected | Spent |
| --- | --- | --- | --- |
| City | Municipal code chapter, ordinance, or ballot measure | City ACFR actuals, then the adopted budget if actuals are not there | The fund the tax is deposited to, in the budget or ACFR |
| County | County code, or the auditor's rate book for a tax rate area | Auditor apportionment schedules, ACFR actuals | The same schedules, or the district's own budget when the county only collects |
| Special district or assessment | The formation act, the code chapter, or the engineer's report and the ordinance that levies this year's charge | The line on the county tax bill, then the district's revenue report | The district budget or the improvement the engineer's report names |
| State | The revenue and taxation code, or the constitution | The state controller or the tax agency's annual statistics | The state budget, only for the fund that receives the tax |
| Federal | The United States Code | IRS Statistics of Income, or the Treasury monthly statement, for that tax | The federal budget account for that receipt, when one exists |

A combined rate is a stack of taxes.
Record the tax this document defines.
Name the others as their own candidates.
Vacaville's lodging tax is the example already in the inventory: the city tax is 8 percent in the municipal code, and the guest's bill also carries a separate excise tax and a hotel assessment.

## Vacaville, first place

Use these indexes in this order.
Open the document before treating it as found.

**City of Vacaville.** The municipal code on eCode360 is the defining index. Transient occupancy tax is already opened at chapter 3.16. From that code, walk the revenue title for the other city taxes. The finance page is the collections and expenditures index: the ACFR for actuals, the adopted budget for the fund that receives each tax. The FY2025-26 budget narrative already names property tax, sales tax, Measure M, a franchise tax, a paramedic tax, and an excise tax as city revenue. Each of those is a candidate. The budget line is not the defining document.

**Solano County.** The Auditor-Controller property-tax page for the current fiscal year is the index for the parcel. It points at tax rate area fund composition, voter-debt rates, and special-assessment narratives. The 1 percent general levy is one tax, defined by the state constitution, collected and split by the county. Voter-approved debt is a separate candidate for each fund in the parcel's tax rate area. Direct charges on the bill are their own candidates. A Vacaville bill carries on the order of seventeen of them. Their names come from the bill and from the narratives, one charge at a time. The county publishes tax rate area boundaries through the State Board of Equalization roll-year map. That map says which districts cover the parcel. It does not state the rate.

**State of California.** The defining index is the Revenue and Taxation Code on leginfo. The rate index for a purchase in Vacaville is the California Department of Tax and Fee Administration's city and county rate schedule. Statewide collections are the department's or the controller's statistics. A city ACFR is the collections document for the local share.

**Federal.** The defining index is the United States Code. Collections for income tax are IRS Statistics of Income. Spending is a federal budget account, and many receipts are not tied to one account. Leave the spent slot empty when that is so.

## What the Vacaville sketch is allowed to do

The page at `/places/vacaville/` is a picture of the stack for someone who lives there.
It is there so the concept can be seen before every document is opened.

A row on that page is either a stub or a pointer to an inventory record.
A stub has no rate and no dollar amount.
The length of a bar on that page is there so the stack can be seen.
It is not revenue and it is not a rate.

When this pass opens a defining document, the inventory gains a record and the sketch gains a link.
The sketch does not become the source.

## Running it again

The next place uses the same seven steps and the same three slots.
Only the indexes change.
Start from the municipal code, the county auditor's rate book, the state tax agency's rate schedule, and the federal code.
Resist a national list until one place has all three slots for the taxes a resident actually meets.
