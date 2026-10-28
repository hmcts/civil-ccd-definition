# Running the specified claim journey

Example command lines for the playwright-tests specified journey (playwright-tests/e2e/journeys/SpecifiedSS.test.ts), and the parameters a claim can be built with. Run every command from the repository root. Settings are environment variables put in front of the command. Add --headed to watch the browser. The unspecified journey has its own guide, RUNNING_UNSPECIFIED_TESTS.md.

Each command starts the journey from scratch: it creates a new specified (money) claim and takes it through the steps in order. A step that does not apply to the claim, or is switched off, is skipped. The journey currently ends with court staff confirming the judge's final order, which moves the claim to All_FINAL_ORDERS_ISSUED. A small claim goes to mediation, then after unsuccessful mediation gets a legal adviser's small claims Standard Direction Order, the solicitors' evidence uploads and a small claims hearing notice, the claimant's solicitor pays the hearing fee and the trial bundle is created. After the hearing the judge's final order and the order review take it to All_FINAL_ORDERS_ISSUED, as on the other tracks.

## 1. Environments

ENV picks the settings file playwright-tests/env/.env.<ENV>, exactly as for the unspecified journey (see section 1 of RUNNING_UNSPECIFIED_TESTS.md for the preview settings).

```bash
ENV=aat npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

```bash
ENV=preview PREVIEW_SERVICE=ccd PR_NUMBER=8265 npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

## 2. Steps

Steps, in the order they run:

- CREATE_CLAIM: the claimant's solicitor creates the claim and pays the claim fee. The claim is then issued and waits for the defendants (AWAITING_RESPONDENT_ACKNOWLEDGEMENT).
- ADD_CASE_NOTE (optional): the hearing centre admin adds a case note with "Add a case note" straight after the claim is issued (ADD_CASE_NOTE=Yes). The test checks it shows on the Notes tab (through the API, that it is in the case's saved notes). The claim stays in AWAITING_RESPONDENT_ACKNOWLEDGEMENT. It has an API version.
- MOVE_RESPONSE_DEADLINE, DEFAULT_JUDGMENT (optional): instead of the defendants responding, once the claim is issued (and any case note added) the response deadlines are moved to yesterday through civil-service's testing support, and the claimant's solicitor requests default judgment against every defendant with "Request Default Judgment": nothing paid, no fixed costs, paid immediately (DEFAULT_JUDGMENT=Yes). civil-service records the judgment through Judgments Online, which moves the claim to All_FINAL_ORDERS_ISSUED, or to JUDGMENT_REQUESTED where its judgment buffer is switched on. The defendants' steps and everything after them are skipped, apart from settling the claim. It has an API version.
- ASSIGN_DEFENDANT_SOLICITORS: the defendants' solicitors are given access to the claim. A specified claim has no Notify claim or Notify claim details steps.
- INFORM_AGREED_EXTENSION_DEFENDANT1, INFORM_AGREED_EXTENSION_DEFENDANT2 (optional): each defendant's solicitor tells the court about an agreed extension, which moves their response deadline back.
- RESPOND_TO_CLAIM_DEFENDANT1, RESPOND_TO_CLAIM_DEFENDANT2: each defendant's solicitor responds with a full defence, a full or part admission, or a counterclaim.
- RESPOND_TO_DEFENCE: the claimant's solicitor responds to the defence or the admission. It runs whenever the claim is still online once every defendant has responded (AWAITING_APPLICANT_INTENTION).
- CREATE_CASE_FLAGS, MAKE_CASE_FLAG_INACTIVE (optional): once the claimant has responded and the claim is still online, the hearing centre admin adds each flag in CASE_FLAGS with "Create case flags", then makes the first one inactive with "Manage case flags" (see section 8). The test checks each flag was saved, and the claim stays in the state the claimant's response left it in. It has an API version.
- MANAGE_CONTACT_INFORMATION (group, optional): once the claimant has responded and the claim is still online, each run in MANAGE_CONTACT_INFORMATION updates contact details with "Manage Contact Information", as the admin or a solicitor (see section 9). The test checks each change was saved, and the claim stays in the state the claimant's response left it in. It has an API version.
- STAY_CASE, MANAGE_STAY_REQUEST_UPDATE, LIFT_STAY (optional): once the claimant's response has taken the claim to JUDICIAL_REFERRAL, the hearing centre admin stays the case with "Stay case" (CASE_STAYED), asks the parties for an update with "Manage stay", then lifts the stay, which takes the claim back to JUDICIAL_REFERRAL for the judge's order (STAY_CASE=Yes). It has an API version.
- MEDIATION_SUCCESSFUL (optional): when the claimant's response took a small claim to mediation (IN_MEDIATION), the hearing centre admin records with "Mediation Successful" that the claim settled today and uploads the mediation agreement. civil-service stays the case (CASE_STAYED), which ends the journey: MEDIATION_UNSUCCESSFUL and every step after it are skipped (MEDIATION_SUCCESSFUL=Yes). It has an API version.
- MEDIATION_UNSUCCESSFUL: when the claimant's response took a small claim to mediation (IN_MEDIATION) and MEDIATION_SUCCESSFUL is not Yes, the hearing centre admin records with "Mediation Unsuccessful" that a party withdrew. civil-service moves the claim to JUDICIAL_REFERRAL for the judge's directions. It has an API version.
- CREATE_SDO: the judge makes a Standard Direction Order, moving the claim from JUDICIAL_REFERRAL to CASE_PROGRESSION. It runs on the fast track when the claimant's response took the claim to JUDICIAL_REFERRAL, and on the small claims track after unsuccessful mediation, where work allocation gives the directions task to a legal adviser, who makes the order (a one hour hearing, in person at the court civil-service fills in). In the UI the judge opens the event by its URL. The directions task is claimed first where work allocation needs one, for the API version too.
- MAKE_DIRECTIONS_ORDER: on the intermediate and multi tracks, which have no Standard Direction Order, the judge makes a directions order with "Make an order" instead, also moving the claim from JUDICIAL_REFERRAL to CASE_PROGRESSION. The judge keeps the claim on its track, chooses the blank template for an order before a hearing and uploads the completed order (playwright-tests/documents/TEST_ORDER.docx; the page only takes Word documents). The track allocation task is claimed first where work allocation needs one. It has an API version.
- UPLOAD_EVIDENCE (group: _CLAIMANT_SOLICITOR, _DEFENDANT1_SOLICITOR, _DEFENDANT2_SOLICITOR): once the judge's order has moved the claim to CASE_PROGRESSION, each solicitor uploads a disclosure list with "Upload Your Documents", or on the small claims track, which has no disclosure, documentary evidence for the hearing (once the small claims order is made) (the second defendant's solicitor only for 1v2DS). A solicitor acting for two parties uploads it for both. The claim stays in CASE_PROGRESSION. It has an API version.
- CREATE_HEARING_NOTICE: once the evidence is in, the hearing centre admin lists the trial with "Create a hearing notice" (a first listing of a "Trial (Fast, Intermediate and Multi track)" notice at Clerkenwell, 8 weeks ahead). A small claim gets a "Small claims hearing" notice instead, straight after its Standard Direction Order. This stands in for HMC returning a listed hearing. civil-service works out the hearing fee and moves the claim to HEARING_READINESS. It has an API version.
- PAY_HEARING_FEE: the claimant's solicitor pays the hearing fee from the Service Request tab, by PBA or card (PAYMENT_METHOD). If the payment service has not told civil-service about the payment within a minute, the test does. The test then runs HEARING_FEE_PAID, which civil-service's scheduler would otherwise run later, moving the claim to PREPARE_FOR_HEARING_CONDUCT_HEARING. It is always done in the UI.
- TRIAL_READY_CHECK: on the fast track only, the parties are asked to confirm they are ready for trial. civil-service's scheduler does this once the hearing is less than 3 weeks away; the hearing is 8 weeks ahead, so the test runs the event itself and checks it was recorded on the case. The claim stays in PREPARE_FOR_HEARING_CONDUCT_HEARING.
- CONFIRM_TRIAL_ARRANGEMENTS (group: _CLAIMANT_SOLICITOR, _DEFENDANT1_SOLICITOR, _DEFENDANT2_SOLICITOR): each solicitor confirms with "Confirm trial arrangements" that the case is ready for trial, with no change to the hearing requirements (the second defendant's solicitor only for 1v2DS). A solicitor acting for two parties confirms for both. Like the trial ready check it is fast track only (XUI does not offer it on the intermediate or multi tracks), and it has to be done more than 3 weeks before the hearing. The claim stays in PREPARE_FOR_HEARING_CONDUCT_HEARING. It has an API version.
- CREATE_TRIAL_BUNDLE: the trial bundle is created. civil-service's scheduler does this about 3 weeks before the hearing, for every track except intermediate and multi (small claims have bundles too), so the test asks civil-service to do it now, waits for the bundle to be stitched into one document and checks the claimant's solicitor sees it on the Bundles tab. The claim stays in PREPARE_FOR_HEARING_CONDUCT_HEARING.
- MOVE_TO_DECISION_OUTCOME: once the hearing date has passed, civil-service's scheduler moves the claim to DECISION_OUTCOME to wait for the judge's decision, on every track. The hearing is weeks away, so the test runs the event itself.
- MAKE_FINAL_ORDER: the judge makes the final order with "Make an order" (FINAL_ORDER, see section 12). On the small claims and fast tracks the judge writes a free form or an assisted order on the page. On the intermediate and multi tracks the judge keeps the claim on its track, picks a template (for the after-hearing template, giving today as the hearing date), and uploads the completed order (playwright-tests/documents/TEST_ORDER.docx). The test checks the order was added to the case and its notifications sent. The claim stays in DECISION_OUTCOME. It has an API version.
- CONFIRM_ORDER_REVIEW: the hearing centre admin reviews the order with "Confirm order review": no date a party must do something by, a final order, and nothing left to do. This closes the claim on any track, moving it to All_FINAL_ORDERS_ISSUED. It has an API version.
- SETTLE_CLAIM_MARK_PAID_FULL (optional): once the rest of the journey has run, or where STOP_AT_STATE or STOP_AFTER_TEST stops it, the claimant's solicitor settles the claim with "Settle this claim", marking it paid in full (SETTLE_CLAIM=MARK_PAID_IN_FULL). civil-service stays the case (CASE_STAYED) and tells the defendants. With two claimants it is for both. It has an API version.
- SETTLE_CLAIM (optional): once the rest of the journey has run, or where it is stopped, the hearing centre admin records with court staff's own "Settle this claim" that the claim settled following a judge's order (SETTLE_CLAIM=JUDGE_ORDER) or an approved consent order (CONSENT_ORDER), which moves it to CASE_SETTLED. Court staff can also settle a stayed case. It has an API version.
- DISCONTINUE_CLAIM, VALIDATE_DISCONTINUANCE (optional): once the rest of the journey has run, or where it is stopped, the claimant's solicitor fully discontinues the claim with "Discontinue this claim", for every claimant and against every defendant. Without the court's permission (DISCONTINUE_CLAIM=NO_PERMISSION_NEEDED) civil-service discontinues the claim (CASE_DISCONTINUED). With permission a judge gave today (PERMISSION_GRANTED), the hearing centre admin then claims the work allocation task and validates the discontinuance with "Validate discontinuance", which discontinues the claim. It is not offered once the final orders are issued or while the case is stayed. Both have API versions.

The Defendant 2 steps only run for 1v2DS, where Defendant 2 has their own solicitor. In a 1v2SS claim the one solicitor answers for both defendants in Defendant 1's steps. Where a defendant is a litigant in person (1v1LIP, 2v1LIP, 1v2LIPS, 1v2LRLIP, 1v2LIPLR) the response steps and RESPOND_TO_DEFENCE are skipped: they respond through the citizen service, which the journey does not do.

A specified claim is not acknowledged: the CCD definition only gives a defendant's solicitor read access to Acknowledgement of Service, so XUI does not offer it.

## 3. API only, UI only, or a mix

Every event step has an API version except PAY_HEARING_FEE, which is paid in the UI's Service Request tab (ASSIGN_DEFENDANT_SOLICITORS, TRIAL_READY_CHECK, CREATE_TRIAL_BUNDLE and MOVE_TO_DECISION_OUTCOME are done through APIs whatever API_UNTIL is). An API version answers the same pages as the UI with the same answers. Where a page runs a civil-service callback when Continue is pressed (to fill in a list such as the hearing court, or to generate an order document), the API version has CCD run it too, as XUI does, and it submits only the event's own fields. Documents are civil-service's test document, except a judge's completed order, which must be a Word document: TEST_ORDER.docx is uploaded through XUI as the judge. With API_UNTIL=<state> they go through the CCD API until the claim reaches that state, and every step after it goes through the UI. Leave API_UNTIL unset to do everything through the UI.

Everything that has an API version through the API (All_FINAL_ORDERS_ISSUED is the last state the journey reaches, so every step that has an API version uses it):

```bash
ENV=aat API_UNTIL=All_FINAL_ORDERS_ISSUED npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

Create the claim through the API, then do the extension and the responses through the UI:

```bash
ENV=aat API_UNTIL=AWAITING_RESPONDENT_ACKNOWLEDGEMENT INFORM_AGREED_EXTENSION=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium --headed
```

## 4. Stop at a state or an event

STOP_AT_STATE=<state> stops as soon as the claim is in that state, and STOP_AFTER_TEST=<step> stops after that step. Add KEEP_CASE_ASSIGNMENTS=Yes to keep the solicitors assigned so you can carry on with the case by hand.

Settling or discontinuing the claim (SETTLE_CLAIM, DISCONTINUE_CLAIM) still runs where the journey is stopped, so the claim can be closed at any point. An invalid combination of settings fails the run before the first test, with every problem listed: for example SETTLE_CLAIM and DISCONTINUE_CLAIM together, settling or discontinuing as the claimant's solicitor against two defendants where one is a litigant in person, or settling or discontinuing where the journey ends in a state the event is not offered in (such as SETTLE_CLAIM=MARK_PAID_IN_FULL after successful mediation, or DISCONTINUE_CLAIM on a journey that runs to All_FINAL_ORDERS_ISSUED).

```bash
ENV=aat STOP_AFTER_TEST=ASSIGN_DEFENDANT_SOLICITORS KEEP_CASE_ASSIGNMENTS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

States the journey reaches: PENDING_CASE_ISSUED, AWAITING_RESPONDENT_ACKNOWLEDGEMENT, AWAITING_APPLICANT_INTENTION, JUDICIAL_REFERRAL, CASE_PROGRESSION, HEARING_READINESS, PREPARE_FOR_HEARING_CONDUCT_HEARING, DECISION_OUTCOME, IN_MEDIATION, CASE_STAYED, All_FINAL_ORDERS_ISSUED, PROCEEDS_IN_HERITAGE_SYSTEM.

## 5. Inform an agreed extension date

INFORM_AGREED_EXTENSION=Yes runs the extension steps. The new deadline is 14 days after the current one, moved to a working day (weekends and GOV.UK England and Wales bank holidays are skipped). The test checks the response deadline is the agreed date afterwards, and in a 1v2SS claim that Defendant 2's deadline moved too.

```bash
ENV=aat CLAIM_TYPE=1v2DS INFORM_AGREED_EXTENSION=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

## 6. Defendant responses: defences, admissions and counterclaims

RESPONDENT1_RESPONSE and RESPONDENT2_RESPONSE set each response: FULL_DEFENCE (the default), FULL_ADMISSION, PART_ADMISSION or COUNTER_CLAIM. In a 2v1 claim RESPONDENT2_RESPONSE is the defendant's response to Claimant 2. In a 1v2SS claim the solicitor gives the two defendants separate responses when the settings differ.

What the test answers:

- Full defence: the defendant disputes the whole claim.
- Part admission: the defendant has not paid and admits £1,000.
- Full or part admission: ADMISSION_PAYMENT_ROUTE picks when they will pay. IMMEDIATELY (the default), BY_SET_DATE (a month from today) or SUGGESTION_OF_REPAYMENT_PLAN (£100 a month, starting a month from today). The defendant's financial details are filled in wherever XUI asks for them: an individual or sole trader not paying immediately owns their home, has no partner, children, dependants, debts or court orders, and is retired or self-employed (RESPONDENT1_EMPLOYMENT and RESPONDENT2_EMPLOYMENT). A self-employed defendant is a plumber with a £30,000 turnover who is not behind on their tax.
- Counterclaim: the defendant makes a counterclaim.

Where the claim goes once every response is in:

| Claim type | Stays online (AWAITING_APPLICANT_INTENTION) | Goes offline (PROCEEDS_IN_HERITAGE_SYSTEM) |
| --- | --- | --- |
| 1v1 | A full defence, full admission or part admission | A counterclaim |
| 2v1, 1v2SS | Both responses the same, and not a counterclaim | Different responses, or a counterclaim |
| 1v2DS | Both full defences | Anything else |

In a 1v2DS claim the claim stays in AWAITING_RESPONDENT_ACKNOWLEDGEMENT after Defendant 1's response, until Defendant 2 responds.

In a 1v2DS claim Defendant 2's solicitor should only see Defendant 2's financial pages. If they are shown one of Defendant 1's (DefendantSelfEmployment, DefendantIncomeExpenses or DefendantIncomeExpensesFullAdmission, which hold Defendant 1's answers), the step fails. Those pages' show conditions in the CCD definition need isRespondent1 = "Yes"; until that fix is deployed, a 1v2DS claim where both defendants admit and pay later fails at Defendant 2's response.

```bash
ENV=aat RESPONDENT1_RESPONSE=FULL_ADMISSION ADMISSION_PAYMENT_ROUTE=BY_SET_DATE npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

```bash
ENV=aat RESPONDENT1_RESPONSE=PART_ADMISSION ADMISSION_PAYMENT_ROUTE=SUGGESTION_OF_REPAYMENT_PLAN npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

```bash
ENV=aat RESPONDENT1_RESPONSE=PART_ADMISSION ADMISSION_PAYMENT_ROUTE=SUGGESTION_OF_REPAYMENT_PLAN RESPONDENT1_EMPLOYMENT=SELF_EMPLOYED npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

```bash
ENV=aat CLAIM_TYPE=1v2DS RESPONDENT1_RESPONSE=FULL_DEFENCE RESPONDENT2_RESPONSE=COUNTER_CLAIM npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

Through the API:

```bash
ENV=aat CLAIM_TYPE=1v2SS RESPONDENT1_RESPONSE=FULL_DEFENCE RESPONDENT2_RESPONSE=PART_ADMISSION API_UNTIL=JUDICIAL_REFERRAL npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

Through the API, a 2v1 defendant can only give the two claimants different responses when one of them is a full defence. Other combinations stop with an error; use the UI for them.

## 7. The claimant's response

Once every defendant has responded and the claim is still online (AWAITING_APPLICANT_INTENTION, see the table in section 6), the claimant's solicitor responds in RESPOND_TO_DEFENCE ("View and respond to defence").

### After full defences

A specified claim asks one question whatever the parties: whether the claimant proceeds with the claim (both claimants in a 2v1 claim, against both defendants in a 1v2 claim). CLAIMANT_PROCEED=Yes (the default) or No answers it.

Proceeding, the claimant uploads a response to the defence and answers the directions questionnaire: no experts or other witnesses, no unavailable dates, English, Clerkenwell as the preferred court and no support needs. A small claim asks for mediation contact details and availability instead of the fast track questions, and intermediate and multi track claims upload draft directions.

| Claimant | Small claim | Fast, intermediate or multi track |
| --- | --- | --- |
| Proceeds (CLAIMANT_PROCEED=Yes) | IN_MEDIATION, then JUDICIAL_REFERRAL after unsuccessful mediation (CASE_STAYED if it was successful) | JUDICIAL_REFERRAL |
| Does not proceed (CLAIMANT_PROCEED=No) | PROCEEDS_IN_HERITAGE_SYSTEM | PROCEEDS_IN_HERITAGE_SYSTEM |

```bash
ENV=aat CLAIM_TYPE=1v2DS npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

```bash
ENV=aat TRACK=SMALL_CLAIM CLAIMANT_PROCEED=No API_UNTIL=All_FINAL_ORDERS_ISSUED npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

### After admissions (1v1)

After a 1v1 full or part admission the claimant is not asked whether they proceed. Instead:

- CLAIMANT_ACCEPTS_AMOUNT=Yes (the default) or No: whether they accept the amount a defendant admits (part admission only). Rejecting it disputes the claim, so the claimant answers the directions questionnaire as after a defence.
- CLAIMANT_ACCEPTS_PLAN=Yes (the default) or No: whether they accept the date or repayment plan the defendant offers (ADMISSION_PAYMENT_ROUTE BY_SET_DATE or SUGGESTION_OF_REPAYMENT_PLAN). Accepting it, the claimant asks for judgment with nothing paid yet.
- CLAIMANT_SUGGESTED_PAYMENT=IMMEDIATELY (the default), SET_DATE (a month from today) or REPAYMENT_PLAN (£100 a month, starting two months from today): how the claimant suggests the defendant pays when they reject the date or plan.

A full admission paid immediately asks nothing: the claimant only sees when the defendant will pay.

| Defendant | Claimant | Where the claim goes |
| --- | --- | --- |
| Admits all of it, paying immediately | (nothing to answer) | Stays in AWAITING_APPLICANT_INTENTION, waiting for the payment |
| Admits part of it, paying immediately | Accepts the amount | Stays in AWAITING_APPLICANT_INTENTION, waiting for the payment |
| Admits part of it | Rejects the amount | JUDICIAL_REFERRAL, or IN_MEDIATION for a small claim |
| Admits all or part, by a set date or a repayment plan | Accepts the amount and the date or plan | All_FINAL_ORDERS_ISSUED (judgment by admission) |
| Admits all of it, by a set date or a repayment plan | Rejects the date or plan | PROCEEDS_IN_HERITAGE_SYSTEM |
| Admits part of it, by a set date or a repayment plan | Accepts the amount, rejects the date or plan | JUDICIAL_REFERRAL |

```bash
ENV=aat RESPONDENT1_RESPONSE=PART_ADMISSION ADMISSION_PAYMENT_ROUTE=SUGGESTION_OF_REPAYMENT_PLAN npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

```bash
ENV=aat RESPONDENT1_RESPONSE=FULL_ADMISSION ADMISSION_PAYMENT_ROUTE=BY_SET_DATE CLAIMANT_ACCEPTS_PLAN=No CLAIMANT_SUGGESTED_PAYMENT=REPAYMENT_PLAN API_UNTIL=All_FINAL_ORDERS_ISSUED npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

Through the API, asking for judgment (accepting a date or plan) only works without interest or fixed commencement costs; use the UI for those.

### After admissions (2v1 and 1v2SS)

When the defendants make the same admission in a 2v1 or 1v2SS claim, the claimant is only asked whether they proceed (CLAIMANT_PROCEED), and either way the claim goes offline (PROCEEDS_IN_HERITAGE_SYSTEM).

The step is skipped when the claim went offline once the defendants responded (a counterclaim, different responses, or anything other than two full defences in a 1v2DS claim), and when a defendant is a litigant in person.

## 8. Case flags

CASE_FLAGS switches on the case flag steps. Once the claimant has responded and the claim is still online (JUDICIAL_REFERRAL, IN_MEDIATION for a small claim, or after an admission AWAITING_APPLICANT_INTENTION or All_FINAL_ORDERS_ISSUED), the hearing centre admin adds each flag, then makes the first one inactive.

- representative: a hearing loop for Claimant 1 (RA0043, the longest route through the flag pages), evidence by live link for Defendant 1 (SM0003) and vulnerable user for Defendant 2 (PF0002), leaving out a flag for a party the claim does not have.
- A list of holder:code, e.g. CASE:CF0002,DEFENDANT_1:RA0012. A third part gives the language for an interpreter flag (CLAIMANT_1:PF0015:Spanish) or the description for an "Other" flag (OT0001).

The holders are CASE, CLAIMANT_1, CLAIMANT_2 (2v1) and DEFENDANT_1, DEFENDANT_2 (1v2). A specified claim's directions questionnaires name no experts or witnesses, so they cannot be flagged. A holder the claim does not have stops the run before it starts.

```bash
ENV=aat CASE_FLAGS=representative STOP_AFTER_TEST=MAKE_CASE_FLAG_INACTIVE npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

```bash
ENV=aat CLAIM_TYPE=1v2DS API_UNTIL=JUDICIAL_REFERRAL CASE_FLAGS='CASE:CF0002,DEFENDANT_2:PF0015:Spanish' STOP_AFTER_TEST=MAKE_CASE_FLAG_INACTIVE npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

## 9. Manage Contact Information

MANAGE_CONTACT_INFORMATION switches on the contact information steps, which run once the claimant has responded and the claim is still online.

- representative: the claimant's solicitor changes Claimant 1's details and adds someone attending for their firm, each defendant's solicitor changes their client's details, and the admin adds a witness for Defendant 1. A run for a party or solicitor the claim does not have is left out.
- A list of user:party, one run of the event each. The users are admin, claimantSolicitor, respondent1Solicitor and respondent2Solicitor; the parties are the event's options, e.g. CLAIMANT_1, DEFENDANT_1_LR_INDIVIDUALS or DEFENDANT_2_ORGANISATION_INDIVIDUALS (a company or organisation defendant).

A party's email and first address line are changed, someone attending for an organisation or its solicitor is added, and the admin adds a witness or expert. A solicitor only sees their own client's side. A specified claim names no witnesses or experts and has no litigation friends, so a solicitor cannot choose witnesses or experts, and no one can choose a litigation friend. A run the claim does not allow stops the run before it starts.

civil-service does not let a solicitor manage contact information while a claim waits in AWAITING_APPLICANT_INTENTION (a 1v1 full admission paid immediately), so a solicitor's run is skipped then; the admin's still runs.

```bash
ENV=aat MANAGE_CONTACT_INFORMATION=representative STOP_AFTER_TEST=MANAGE_CONTACT_INFORMATION npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

```bash
ENV=aat CLAIM_TYPE=1v2DS DEFENDANT_TYPE=COMPANY API_UNTIL=JUDICIAL_REFERRAL MANAGE_CONTACT_INFORMATION='admin:CLAIMANT_1,respondent1Solicitor:DEFENDANT_1_ORGANISATION_INDIVIDUALS,respondent2Solicitor:DEFENDANT_2' STOP_AFTER_TEST=MANAGE_CONTACT_INFORMATION npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

## 10. Paying fees by PBA or card

PAYMENT_METHOD picks how the claimant's solicitor pays the claim fee and the hearing fee. PBA (the default) pays from their PBA account. CARD pays on GOV.UK Pay's pages with a test card, always in the UI, even when the claim is created through the API. Use CARD when PBA payments fail on the environment, for example with "Unable to retrieve account information".

```bash
ENV=aat PAYMENT_METHOD=CARD API_UNTIL=JUDICIAL_REFERRAL npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

## 11. Named scenarios

Run a named scenario from playwright-tests/scenarios/specifiedScenarios.ts, or use a test:SPEC_* script in package.json:

```bash
ENV=aat SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium --grep @SPEC_1v2DS_FAST
```

The default judgment scenarios are SPEC_1v1_DEFAULT_JUDGMENT and SPEC_1v2DS_DEFAULT_JUDGMENT:

```bash
ENV=aat SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium --grep @SPEC_1v1_DEFAULT_JUDGMENT
```

## 12. Claim parameters

Defaults apply when a parameter is not set. Every on/off parameter takes Yes or No, and treats anything other than Yes as No. DEFAULT_JUDGMENT is the exception: any value other than Yes or No stops the run.

| Parameter | Values | Default | Notes |
| --- | --- | --- | --- |
| `CLAIM_TYPE` | 1v1, 2v1, 1v2SS, 1v2DS, 1v1LIP, 2v1LIP, 1v2LIPS, 1v2LRLIP, 1v2LIPLR | 1v1 | SS = one solicitor for both defendants, DS = a solicitor each. LIP = litigant in person. |
| `CLAIMANT_TYPE` | INDIVIDUAL, COMPANY, ORGANISATION, SOLE_TRADER | INDIVIDUAL | Any other value is treated as INDIVIDUAL. |
| `DEFENDANT_TYPE` | INDIVIDUAL, COMPANY, ORGANISATION, SOLE_TRADER | INDIVIDUAL | Any other value is treated as INDIVIDUAL. |
| `TRACK` | SMALL_CLAIM, FAST_CLAIM, INTERMEDIATE_CLAIM, MULTI_CLAIM | FAST_CLAIM | Sets the claim amount. |
| `AIRLINE_CLAIM` | Yes, No | No | A claim for a delayed or cancelled flight. |
| `TIMELINE` | MANUAL, UPLOAD | MANUAL | Whether the timeline of events is typed in or uploaded as a document, by the claimant and by each defendant. |
| `INTEREST_REQUIRED` | Yes, No | No | The claimant claims interest. |
| `INTEREST_TYPE` | SAME_RATE_INTEREST, BREAK_DOWN_INTEREST | SAME_RATE_INTEREST | One rate over the whole period, or a total the claimant has broken down. |
| `INTEREST_RATE` | A number | 8 | With the same rate, 8 is the statutory rate and any other rate needs a reason. With a breakdown, the total interest in pounds. |
| `FIXED_COMMENCEMENT_COSTS` | Yes, No | No | The claimant claims fixed commencement costs. |
| `PAYMENT_METHOD` | PBA, CARD | PBA | How the claim fee and the hearing fee are paid. CARD is always paid in the UI. Any other value stops the run. |
| `ADD_CASE_NOTE` | Yes, No | No | Optional step: the hearing centre admin adds a case note after the claim is issued. |
| `CASE_FLAGS` | representative, or a list of holder:code[:detail] | None | Optional steps: add flags once the claimant has responded, then make the first inactive (section 8). Holders: CASE, CLAIMANT_1, CLAIMANT_2, DEFENDANT_1, DEFENDANT_2. The detail is the language for an interpreter flag or the description for an OT0001 flag. |
| `MANAGE_CONTACT_INFORMATION` | representative, or a list of user:party | None | Optional steps: Manage Contact Information once the claimant has responded, one run per entry, each checked against the saved case data (section 9). Users: admin, claimantSolicitor, respondent1Solicitor, respondent2Solicitor. Parties: CLAIMANT_1/2, DEFENDANT_1/2, each with _ORGANISATION_INDIVIDUALS, and CLAIMANT_1/DEFENDANT_1/DEFENDANT_2 with _LR_INDIVIDUALS; the admin can also add _WITNESSES or _EXPERTS. Has an API version. |
| `STAY_CASE` | Yes, No | No | Optional steps: stay the case once it reaches JUDICIAL_REFERRAL, ask for an update and lift the stay. |
| `MEDIATION_SUCCESSFUL` | Yes, No | No | Optional step: mediation settles a small claim, which stays the case (CASE_STAYED) and ends the journey, instead of mediation being unsuccessful. |
| `SETTLE_CLAIM` | MARK_PAID_IN_FULL, JUDGE_ORDER, CONSENT_ORDER | None | Optional step, once the rest of the journey has run or where it is stopped: the claimant's solicitor marks the claim paid in full with "Settle this claim", which stays the case (CASE_STAYED), or the hearing centre admin records it settled after a judge's order or a consent order (CASE_SETTLED). |
| `DISCONTINUE_CLAIM` | NO_PERMISSION_NEEDED, PERMISSION_GRANTED | None | Optional steps, once the rest of the journey has run or where it is stopped: the claimant's solicitor fully discontinues the claim, without the court's permission (CASE_DISCONTINUED) or with a judge's permission, which the hearing centre admin then validates (CASE_DISCONTINUED). |
| `DEFAULT_JUDGMENT` | Yes, No | No | Optional steps instead of the defendants responding: the response deadlines are moved to yesterday and the claimant's solicitor requests default judgment against every defendant, which records the judgment (All_FINAL_ORDERS_ISSUED, or JUDGMENT_REQUESTED with the judgment buffer). Cannot be used with INFORM_AGREED_EXTENSION, STAY_CASE, MEDIATION_SUCCESSFUL, CASE_FLAGS, MANAGE_CONTACT_INFORMATION or DISCONTINUE_CLAIM. |
| `INFORM_AGREED_EXTENSION` | Yes, No | No | Optional steps: each defendant's solicitor informs the court of an agreed extension before responding. |
| `RESPONDENT1_RESPONSE` | FULL_DEFENCE, FULL_ADMISSION, PART_ADMISSION, COUNTER_CLAIM | FULL_DEFENCE | Defendant 1's response. |
| `RESPONDENT2_RESPONSE` | FULL_DEFENCE, FULL_ADMISSION, PART_ADMISSION, COUNTER_CLAIM | FULL_DEFENCE | Defendant 2's response, or in a 2v1 claim the defendant's response to Claimant 2. |
| `RESPONDENT1_EMPLOYMENT` | RETIRED, SELF_EMPLOYED | RETIRED | What Defendant 1 says about their work when they give their finances (an individual or sole trader admitting and not paying immediately). |
| `RESPONDENT2_EMPLOYMENT` | RETIRED, SELF_EMPLOYED | RETIRED | The same for Defendant 2. |
| `ADMISSION_PAYMENT_ROUTE` | IMMEDIATELY, BY_SET_DATE, SUGGESTION_OF_REPAYMENT_PLAN | IMMEDIATELY | When a defendant who admits all or part of the claim will pay. |
| `CLAIMANT_PROCEED` | Yes, No | Yes | Whether the claimant proceeds with the claim after the defendants' full defences, or after a 2v1 or 1v2SS admission. Any other value stops the run. |
| `CLAIMANT_ACCEPTS_AMOUNT` | Yes, No | Yes | Whether the claimant accepts the amount a 1v1 defendant admits (part admission). |
| `CLAIMANT_ACCEPTS_PLAN` | Yes, No | Yes | Whether the claimant accepts a 1v1 defendant's payment date or repayment plan. |
| `CLAIMANT_SUGGESTED_PAYMENT` | IMMEDIATELY, SET_DATE, REPAYMENT_PLAN | IMMEDIATELY | How the claimant suggests the defendant pays when they reject the date or plan. |
| `FINAL_ORDER` | Small and fast: FREE_FORM_ORDER, ASSISTED_ORDER. Intermediate: BLANK_TEMPLATE_AFTER_HEARING, BLANK_TEMPLATE_BEFORE_HEARING, FIX_A_DATE_FOR_CMC. Multi: those three and FIX_A_DATE_FOR_CCMC | First order for the track | FREE_FORM_ORDER on small and fast, BLANK_TEMPLATE_AFTER_HEARING on intermediate and multi. Any other value stops the run. |

## 13. Run settings

ENV, PREVIEW_SERVICE, PR_NUMBER, API_UNTIL, STOP_AT_STATE, STOP_AFTER_TEST, KEEP_CASE_ASSIGNMENTS, SCENARIOS, WORKERS and PREFLIGHT work as described in section 11 of RUNNING_UNSPECIFIED_TESTS.md.
