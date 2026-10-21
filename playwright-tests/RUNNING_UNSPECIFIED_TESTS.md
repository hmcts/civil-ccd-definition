# Running the unspecified claim journey

Example command lines for the playwright-tests unspecified journey (playwright-tests/e2e/journeys/UnspecifiedSS.test.ts), and the parameters a claim can be built with. Run every command from the repository root. Settings are environment variables put in front of the command. Add --headed to watch the browser.

Each command starts the journey from scratch: it creates a new claim and takes it through the steps in order. A step that does not apply to the claim, or is switched off, is skipped.

## 1. Environments

ENV picks the git-ignored settings file playwright-tests/env/.env.<ENV>. Values already set in the shell win over the file.

### AAT

```bash
ENV=aat npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Demo

```bash
ENV=demo npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### ITHC

```bash
ENV=ithc npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Preview: civil-ccd-definition PR

```bash
ENV=preview PREVIEW_SERVICE=ccd PR_NUMBER=8265 npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Preview: civil-service PR

```bash
ENV=preview PREVIEW_SERVICE=service PR_NUMBER=1234 npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Preview: civil-citizen-ui PR

```bash
ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8327 npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Preview: XUI webapp PR (everything behind XUI is AAT)

```bash
ENV=preview PREVIEW_SERVICE=webapp PR_NUMBER=5365 npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Replace the PR numbers with your own. ENV=preview needs both PREVIEW_SERVICE and PR_NUMBER.

## 2. API only

API_UNTIL=<state> does the steps that have an API version through the CCD API until the claim is confirmed to be in that state. Set STOP_AT_STATE to the same state so the run ends there and nothing goes through the UI.

The steps with an API version are CREATE_CLAIM, NOTIFY_CLAIM, NOTIFY_CLAIM_DETAILS, ACKNOWLEDGE_CLAIM_DEFENDANT1/2, RESPOND_TO_CLAIM_DEFENDANT1/2 and RESPOND_TO_DEFENCE, so the furthest a claim can get through the API alone is JUDICIAL_REFERRAL.

```bash
ENV=aat API_UNTIL=JUDICIAL_REFERRAL STOP_AT_STATE=JUDICIAL_REFERRAL npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Create an issued claim through the API only:

```bash
ENV=aat API_UNTIL=CASE_ISSUED STOP_AT_STATE=CASE_ISSUED npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

## 3. UI only

Leave API_UNTIL unset and every step goes through the UI, from creating the claim to the final order.

```bash
ENV=aat npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium --headed
```

## 4. Stop at a state

STOP_AT_STATE=<state> stops as soon as the claim is confirmed to be in that state. The remaining tests are skipped. Add KEEP_CASE_ASSIGNMENTS=Yes to keep the solicitors assigned so you can carry on with the case by hand.

```bash
ENV=aat STOP_AT_STATE=CASE_PROGRESSION KEEP_CASE_ASSIGNMENTS=Yes npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

States: PENDING_CASE_ISSUED, CASE_ISSUED, AWAITING_CASE_DETAILS_NOTIFICATION, AWAITING_RESPONDENT_ACKNOWLEDGEMENT, AWAITING_APPLICANT_INTENTION, JUDICIAL_REFERRAL, CASE_STAYED, CASE_PROGRESSION, HEARING_READINESS, PREPARE_FOR_HEARING_CONDUCT_HEARING, DECISION_OUTCOME, All_FINAL_ORDERS_ISSUED, PROCEEDS_IN_HERITAGE_SYSTEM.

## 5. Stop at an event

STOP_AFTER_TEST=<step> stops after that step (or group of steps). A test number such as test12 also works, but numbers move when steps are added, so a name is safer. If both STOP_AT_STATE and STOP_AFTER_TEST are set, the run stops at whichever comes first.

```bash
ENV=aat STOP_AFTER_TEST=CREATE_HEARING_NOTICE npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Steps, in the order they run:

- CREATE_CLAIM
- ADD_CASE_NOTE (optional)
- NOTIFY_CLAIM
- NOTIFY_CLAIM_DETAILS
- ACKNOWLEDGE_CLAIM_DEFENDANT1, ACKNOWLEDGE_CLAIM_DEFENDANT2
- INFORM_AGREED_EXTENSION_DEFENDANT1, INFORM_AGREED_EXTENSION_DEFENDANT2 (optional)
- RESPOND_TO_CLAIM_DEFENDANT1, RESPOND_TO_CLAIM_DEFENDANT2
- RESPOND_TO_DEFENCE
- CREATE_CASE_FLAGS (group), MAKE_CASE_FLAG_INACTIVE (optional)
- STAY_CASE, MANAGE_STAY_REQUEST_UPDATE, LIFT_STAY (optional)
- CREATE_SDO
- UPLOAD_EVIDENCE (group: _CLAIMANT_SOLICITOR, _DEFENDANT1_SOLICITOR, _DEFENDANT2_SOLICITOR)
- CREATE_HEARING_NOTICE
- PAY_HEARING_FEE
- TRIAL_READY_CHECK
- CONFIRM_TRIAL_ARRANGEMENTS (group: _CLAIMANT_SOLICITOR, _DEFENDANT1_SOLICITOR, _DEFENDANT2_SOLICITOR)
- CREATE_TRIAL_BUNDLE
- MOVE_TO_DECISION_OUTCOME
- MAKE_FINAL_ORDER
- CONFIRM_ORDER_REVIEW

The steps from CREATE_SDO on only run for fast track claims that reach JUDICIAL_REFERRAL.

## 6. Mix of API and UI

The steps up to the API_UNTIL state go through the API, and every step after it goes through the UI. Steps with no API version always use the UI.

Get to the claimant's response quickly through the API, then do the claimant response and the Standard Direction Order through the UI:

```bash
ENV=aat API_UNTIL=AWAITING_APPLICANT_INTENTION STOP_AFTER_TEST=CREATE_SDO npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium --headed
```

Create and issue the claim through the API, then do everything else through the UI:

```bash
ENV=aat API_UNTIL=CASE_ISSUED npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

## 7. Including a non-mandatory event

These events are off by default. Switch one on with its setting.

### Case note (straight after the claim is issued)

```bash
ENV=aat ADD_CASE_NOTE=Yes STOP_AFTER_TEST=ADD_CASE_NOTE npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Stay the case, request an update, lift the stay

```bash
ENV=aat STAY_CASE=Yes STOP_AFTER_TEST=LIFT_STAY npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Inform an agreed extension date (1v2DS shown, so both defendants do it)

```bash
ENV=aat CLAIM_TYPE=1v2DS INFORM_AGREED_EXTENSION=Yes STOP_AFTER_TEST=RESPOND_TO_CLAIM_DEFENDANT2 npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Case flags

```bash
ENV=aat CASE_FLAGS=representative STOP_AFTER_TEST=MAKE_CASE_FLAG_INACTIVE npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

```bash
ENV=aat CLAIM_TYPE=1v2SS CASE_FLAGS='CLAIMANT_1:RA0042:British Sign Language (BSL),DEFENDANT_1:PF0019,DEFENDANT_2:PF0015:Spanish' npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Several at once, with the API for the early steps

```bash
ENV=aat API_UNTIL=CASE_ISSUED ADD_CASE_NOTE=Yes STAY_CASE=Yes CASE_FLAGS=representative npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

## 8. A fully specified claim

A 1v1 fast track road accident claim with fixed recoverable costs, experts and witnesses (the same as yarn test:UNSPEC_1v1_FAST):

```bash
ENV=aat CLAIM_TYPE=1v1 CLAIMANT_TYPE=INDIVIDUAL DEFENDANT_TYPE=INDIVIDUAL TYPE_OF_CLAIM=PERSONAL_INJURY SUB_TYPE=ROAD_ACCIDENT TRACK=FAST_CLAIM FIXED_RECOVERABLE_COSTS=Yes FIXED_RECOVERY_COSTS_BAND=BAND_2 EXPERTS=2 WITNESSES=2 LANGUAGE=ENGLISH UNAVAILABLE_DATES=Yes FINAL_ORDER=ASSISTED_ORDER npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Run a named scenario from playwright-tests/scenarios/unspecifiedScenarios.ts:

```bash
ENV=aat SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium --grep @UNSPEC_1v2DS_FAST_STAY_CASE
```

## 9. Claim parameters

Defaults apply when a parameter is not set. Every on/off parameter takes Yes or No, and treats anything other than Yes as No.

| Parameter | Values | Default | Notes |
| --- | --- | --- | --- |
| `CLAIM_TYPE` | 1v1, 2v1, 1v2SS, 1v2DS, 1v1LIP, 2v1LIP, 1v2LIPS, 1v2LRLIP, 1v2LIPLR | 1v1 | SS = one solicitor for both defendants, DS = a solicitor each. LIP = litigant in person. 1v2LRLIP: Defendant 1 has a solicitor, Defendant 2 is a LIP. 1v2LIPLR is the other way round. |
| `CLAIMANT_TYPE` | INDIVIDUAL, COMPANY, ORGANISATION, SOLE_TRADER | INDIVIDUAL | Any other value is treated as INDIVIDUAL. |
| `DEFENDANT_TYPE` | INDIVIDUAL, COMPANY, ORGANISATION, SOLE_TRADER | INDIVIDUAL | Any other value is treated as INDIVIDUAL. |
| `CLAIMANT1_LITIGANT_FRIEND` | Yes, No | No | Claimant 1 has a litigation friend. |
| `CLAIMANT2_LITIGANT_FRIEND` | Yes, No | No | Claimant 2 has a litigation friend (2v1 claims). |
| `TYPE_OF_CLAIM` | PERSONAL_INJURY, CLINICAL_NEGLIGENCE, PROFESSIONAL_NEGLIGENCE, BREACH_OF_CONTRACT, CONSUMER, CONSUMER_CREDIT, HOUSING_DISREPAIR, DAMAGES_AND_OTHER_REMEDY, OTHER | No default | Every package.json script and scenario sets it. |
| `SUB_TYPE` | ROAD_ACCIDENT, WORK_ACCIDENT, PUBLIC_LIABILITY, HOLIDAY_ILLNESS, DISEASE_CLAIM, NOISE_INDUCED_HEARING_LOSS, PERSONAL_INJURY_OTHER | No default | Only for PERSONAL_INJURY. A noise induced hearing loss claim must be on the fast track. |
| `TRACK` | SMALL_CLAIM, FAST_CLAIM, INTERMEDIATE_CLAIM, MULTI_CLAIM | FAST_CLAIM | Sets the claim value. The steps from the Standard Direction Order on only run on the fast track. |
| `DEFENDANTS_TO_NOTIFY_CLAIM` | Both, Defendant One, Defendant Two | Both | Quote values with spaces. Anything other than Both takes the claim offline. |
| `DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS` | Both, Defendant One, Defendant Two | Both | Anything other than Both takes the claim offline. |
| `RESPONDENT1_RESPONSE_INTENTION` | FULL_DEFENCE, PART_DEFENCE, CONTEST_JURISDICTION | FULL_DEFENCE | Defendant 1's answer when acknowledging the claim. |
| `RESPONDENT2_RESPONSE_INTENTION` | FULL_DEFENCE, PART_DEFENCE, CONTEST_JURISDICTION | FULL_DEFENCE | Defendant 2's answer when acknowledging the claim. |
| `RESPONDENT1_RESPONSE` | FULL_DEFENCE, FULL_ADMISSION, PART_ADMISSION, COUNTER_CLAIM | FULL_DEFENCE | Anything other than a full defence takes the claim offline. |
| `RESPONDENT2_RESPONSE` | FULL_DEFENCE, FULL_ADMISSION, PART_ADMISSION, COUNTER_CLAIM | FULL_DEFENCE | Anything other than a full defence takes the claim offline. |
| `CLAIMANT_PROCEED_1` | Yes, No | Yes | 1v1: the claimant proceeds. 2v1: Claimant 1 proceeds. 1v2: the claimant proceeds against Defendant 1. No takes the claim offline. |
| `CLAIMANT_PROCEED_2` | Yes, No | Yes | 2v1: Claimant 2 proceeds. 1v2: the claimant proceeds against Defendant 2. Not used for 1v1. |
| `FIXED_RECOVERABLE_COSTS` | Yes, No | No | Directions questionnaire answer. |
| `FIXED_RECOVERY_COSTS_BAND` | BAND_1, BAND_2, BAND_3, BAND_4 | BAND_1 | Used when FIXED_RECOVERABLE_COSTS=Yes. |
| `DETERMINATION_WITHOUT_HEARING` | Yes, No | No | Directions questionnaire answer (small claims). |
| `ONE_MONTH_STAY` | Yes, No | No | Directions questionnaire answer. Also sets the pre-action protocol answer. |
| `EXPERTS` | A whole number, 0 or more | 0 | Number of experts in each directions questionnaire. |
| `WITNESSES` | A whole number, 0 or more | 0 | Number of witnesses in each directions questionnaire. |
| `LANGUAGE` | ENGLISH, WELSH, BOTH | ENGLISH | Language for the hearing and documents. |
| `UNAVAILABLE_DATES` | Yes, No | No | Adds unavailable dates to the directions questionnaires. |
| `FINAL_ORDER` | Small and fast: FREE_FORM_ORDER, ASSISTED_ORDER. Intermediate: BLANK_TEMPLATE_AFTER_HEARING, BLANK_TEMPLATE_BEFORE_HEARING, FIX_A_DATE_FOR_CMC. Multi: those three and FIX_A_DATE_FOR_CCMC | First order for the track | FREE_FORM_ORDER on small and fast, BLANK_TEMPLATE_AFTER_HEARING on intermediate and multi. |
| `ADD_CASE_NOTE` | Yes, No | No | Optional event: Hearing Centre Admin adds a case note after the claim is issued. |
| `STAY_CASE` | Yes, No | No | Optional events: stay the case, request an update and lift the stay, after the claimant's response. |
| `INFORM_AGREED_EXTENSION` | Yes, No | No | Optional event: each defendant's solicitor informs the court of an agreed extension after acknowledging the claim. |
| `CASE_FLAGS` | representative, or a list of holder:code[:detail] | None | Optional events: add flags after the claimant's response, then make the first inactive. Holders: CASE, CLAIMANT_1/2, DEFENDANT_1/2, CLAIMANT_1/2_LITIGATION_FRIEND, CLAIMANT_EXPERT_n, CLAIMANT_WITNESS_n, DEFENDANT_1/2_EXPERT_n, DEFENDANT_1/2_WITNESS_n. The detail is the language for an interpreter flag or the description for an OT0001 flag. |

## 10. Run settings

| Parameter | Values | Default | Notes |
| --- | --- | --- | --- |
| `ENV` | aat, demo, ithc, preview | None | Loads playwright-tests/env/.env.<ENV>. |
| `PREVIEW_SERVICE` | ccd, service, citizen-ui, webapp | None | Needed with ENV=preview: the repository the preview belongs to. |
| `PR_NUMBER` | A PR number | None | Needed with ENV=preview. |
| `API_UNTIL` | A case state | None (all UI) | Steps with an API version use the API until the claim reaches this state. |
| `STOP_AT_STATE` | A case state | None | Stop once the claim reaches this state. |
| `STOP_AFTER_TEST` | A step or group name, or testN | None | Stop after this step. |
| `KEEP_CASE_ASSIGNMENTS` | Yes, No | No | Keep the solicitors assigned to the case after the run. |
| `SCENARIOS` | Yes | None | Run the named scenarios in scenarios/unspecifiedScenarios.ts. Pick one with --grep @<name>. |
| `WORKERS` | A number | 1 | Scenarios run at the same time. Keep it low: PR previews have fewer resources and AAT was overloaded by 7 at once. |
| `JUDGE_USERNAME` | A judge's email address | DJ.Amy.Powell@ejudiciary.net | The judge who does the judge's events. |
| `PREFLIGHT` | false | Runs | false skips the preflight checks. |
