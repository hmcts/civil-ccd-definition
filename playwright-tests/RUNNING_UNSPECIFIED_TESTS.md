# Running the unspecified claim journey

Example command lines for the playwright-tests unspecified journey (playwright-tests/e2e/journeys/UnspecifiedSS.test.ts), and the parameters a claim can be built with. Run every command from the repository root. Settings are environment variables put in front of the command. Add --headed to watch the browser. The specified journey has its own guide, RUNNING_SPECIFIED_TESTS.md.

Each command starts the journey from scratch: it creates a new claim and takes it through the steps in order. A step that does not apply to the claim, or is switched off, is skipped.

## 1. Environments

ENV picks the git-ignored settings file playwright-tests/env/.env.<ENV>, and every run must set it: without it the run stops straight away. Values already set in the shell win over the file.

### AAT

```bash
ENV=aat npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Steps that claim a work allocation task first, such as validating a discontinuance, need AAT's Camunda engine and task monitor in env/.env.aat:

```bash
CAMUNDA_URL=http://camunda-api-aat.service.core-compute-aat.internal/engine-rest
WA_TASK_MONITOR_URL=http://wa-task-monitor-aat.service.core-compute-aat.internal
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

Every event step has an API version except PAY_HEARING_FEE, which is paid in the UI's Service Request tab, so API_UNTIL=All_FINAL_ORDERS_ISSUED takes a claim through the whole journey with only the payment in the UI. An API version answers the same pages as the UI with the same answers. Where a page runs a civil-service callback when Continue is pressed (to fill in a list such as the hearing court, or to generate an order document), the API version has CCD run it too, as XUI does, and it submits only the event's own fields. Documents are civil-service's test document, except a judge's completed order, which must be a Word document: TEST_ORDER.docx is uploaded through XUI as the judge. Through the API, ADD_CASE_NOTE checks the case's saved notes rather than the Notes tab.

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

STOP_AT_STATE=AWAITING_RESPONDENT_ACKNOWLEDGEMENT stops after Notify claim details, while the claim waits for the defendants to acknowledge and respond. The defendants' solicitors are assigned to the claim before the run stops, as the acknowledgements that would assign them are skipped, so you can carry on as them by hand. A defendant who is a litigant in person has no solicitor, so is not assigned. This only happens when STOP_AT_STATE is set to AWAITING_RESPONDENT_ACKNOWLEDGEMENT, not with STOP_AFTER_TEST. Add KEEP_CASE_ASSIGNMENTS=Yes, or the clean-up at the end of the run takes the case away from them again.

```bash
ENV=aat CLAIM_TYPE=1v2DS API_UNTIL=AWAITING_RESPONDENT_ACKNOWLEDGEMENT STOP_AT_STATE=AWAITING_RESPONDENT_ACKNOWLEDGEMENT KEEP_CASE_ASSIGNMENTS=Yes npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

## 5. Stop at an event

STOP_AFTER_TEST=<step> stops after that step (or group of steps). A test number such as test12 also works, but numbers move when steps are added, so a name is safer. If both STOP_AT_STATE and STOP_AFTER_TEST are set, the run stops at whichever comes first.

```bash
ENV=aat STOP_AFTER_TEST=CREATE_HEARING_NOTICE npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Settling or discontinuing the claim (SETTLE_CLAIM, DISCONTINUE_CLAIM) still runs where STOP_AT_STATE or STOP_AFTER_TEST stops the journey, so the claim can be closed at any point. For example, this discontinues a claim at JUDICIAL_REFERRAL without the court's permission:

```bash
ENV=aat API_UNTIL=JUDICIAL_REFERRAL STOP_AT_STATE=JUDICIAL_REFERRAL DISCONTINUE_CLAIM=NO_PERMISSION_NEEDED npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

An invalid combination of settings fails the run before the first test, with every problem listed: for example SETTLE_CLAIM and DISCONTINUE_CLAIM together, settling or discontinuing as the claimant's solicitor against two defendants where one is a LIP, or settling or discontinuing where the journey ends in a state the event is not offered in (such as DISCONTINUE_CLAIM on a journey that runs to All_FINAL_ORDERS_ISSUED without STOP_AT_STATE).

Steps, in the order they run:

- CREATE_CLAIM
- REFUND (group: REFUND_OVERPAYMENT, REFUND_REQUEST, REFUND_RETURN, REFUND_RESUBMIT, REFUND_DECISION, optional; here by default, or after the REFUND_AFTER step)
- ADD_CASE_NOTE (optional)
- NOTIFY_CLAIM
- NOTIFY_CLAIM_DETAILS
- NOTICE_OF_CHANGE (group: _CLAIMANT_1, _DEFENDANT_1, _DEFENDANT_2, optional; here by default, or after the NOTICE_OF_CHANGE_AFTER step)
- MOVE_RESPONSE_DEADLINE, DEFAULT_JUDGMENT, STANDARD_DIRECTION_ORDER_DJ (optional)
- ACKNOWLEDGE_CLAIM_DEFENDANT1, ACKNOWLEDGE_CLAIM_DEFENDANT2
- ADD_DEFENDANT_LITIGATION_FRIEND_DEFENDANT1, ADD_DEFENDANT_LITIGATION_FRIEND_DEFENDANT2 (optional)
- INFORM_AGREED_EXTENSION_DEFENDANT1, INFORM_AGREED_EXTENSION_DEFENDANT2 (optional)
- RESPOND_TO_CLAIM_DEFENDANT1, RESPOND_TO_CLAIM_DEFENDANT2
- RESPOND_TO_DEFENCE
- QUERY_MANAGEMENT (group: QUERY_RAISE_, QUERY_RESPOND_, QUERY_FOLLOW_UP_ and QUERY_RESPOND_FOLLOW_UP_ for each party, optional; here by default, or after the QUERY_MANAGEMENT_AFTER step)
- GENERAL_APPLICATION (group: GA_MAKE_APPLICATION, GA_PAY_FEE, GA_SEND_TO_OTHER_PARTY_LEGAL_ADVISER, GA_SEND_TO_OTHER_PARTY_JUDGE, GA_PAY_ADDITIONAL_FEE, GA_RESPOND_CLAIMANT, GA_RESPOND_DEFENDANT1, GA_RESPOND_DEFENDANT2, GA_REFER_TO_JUDGE, GA_DECISION_LEGAL_ADVISER, GA_DECISION_JUDGE, GA_APPROVE_CONSENT_ORDER_NBC_ADMIN, GA_APPROVE_CONSENT_ORDER_HEARING_CENTRE_ADMIN, optional; here by default, or after the GENERAL_APPLICATION_AFTER step)
- CREATE_CASE_FLAGS (group), MAKE_CASE_FLAG_INACTIVE (optional)
- MANAGE_CONTACT_INFORMATION (group, optional)
- ADD_UNAVAILABLE_DATES (group: _CLAIMANT_SOLICITOR, _DEFENDANT1_SOLICITOR, _DEFENDANT2_SOLICITOR, _ADMIN, optional)
- STAY_CASE, MANAGE_STAY_REQUEST_UPDATE, LIFT_STAY (optional)
- CREATE_SDO
- MAKE_DIRECTIONS_ORDER
- UPLOAD_EVIDENCE (group: _CLAIMANT_SOLICITOR, _DEFENDANT1_SOLICITOR, _DEFENDANT2_SOLICITOR)
- CREATE_HEARING_NOTICE
- PAY_HEARING_FEE
- TRIAL_READY_CHECK
- CONFIRM_TRIAL_ARRANGEMENTS (group: _CLAIMANT_SOLICITOR, _DEFENDANT1_SOLICITOR, _DEFENDANT2_SOLICITOR)
- CREATE_TRIAL_BUNDLE
- MOVE_TO_DECISION_OUTCOME
- MAKE_FINAL_ORDER
- CONFIRM_ORDER_REVIEW
- SETTLE_CLAIM_MARK_PAID_FULL, SETTLE_CLAIM (optional)
- DISCONTINUE_CLAIM, VALIDATE_DISCONTINUANCE (optional)

The steps from CREATE_SDO on run for claims on every track that reach JUDICIAL_REFERRAL. A small or fast track claim gets CREATE_SDO, which the judge makes with the track's directions task (SmallClaimsTrackDirections or FastTrackDirections). Intermediate and multi track claims get MAKE_DIRECTIONS_ORDER instead: the judge makes a directions order with "Make an order", keeping the claim on its track and uploading a blank pre-hearing order (documents/TEST_ORDER.docx), which moves the claim to CASE_PROGRESSION. Every track then goes on through the evidence upload, hearing notice (a small claims hearing for a small claim), hearing fee, trial bundle, decision outcome, final order and order review. The trial ready check and confirming trial arrangements are only made on the fast track.

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

### Manage contact information

The representative set: the admin adds a witness for Defendant 1, the claimant's solicitor changes Claimant 1's details and adds someone attending for their firm, and each defendant's solicitor changes their client's details.

```bash
ENV=aat MANAGE_CONTACT_INFORMATION=representative STOP_AFTER_TEST=MANAGE_CONTACT_INFORMATION npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Or a list of user:party, one run of the event each:

```bash
ENV=aat CLAIM_TYPE=1v2DS DEFENDANT_TYPE=COMPANY EXPERTS=1 MANAGE_CONTACT_INFORMATION='admin:DEFENDANT_1_EXPERTS,respondent1Solicitor:DEFENDANT_1_ORGANISATION_INDIVIDUALS,respondent2Solicitor:DEFENDANT_2_EXPERTS' STOP_AFTER_TEST=MANAGE_CONTACT_INFORMATION npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Admissions and counterclaims

Each defendant's response is set with RESPONDENT1_RESPONSE and RESPONDENT2_RESPONSE: FULL_DEFENCE (the default), FULL_ADMISSION, PART_ADMISSION or COUNTER_CLAIM. In a 2v1 claim RESPONDENT2_RESPONSE is the defendant's response to Claimant 2. In a 1v2SS claim the one solicitor answers for both defendants, and gives them separate responses when the two settings differ.

Anything other than a full defence from every defendant takes the claim offline (PROCEEDS_IN_HERITAGE_SYSTEM) once all the responses are in, so the run ends there and the claimant's response and later steps are skipped. Both the UI and the API versions of RESPOND_TO_CLAIM_DEFENDANT1/2 support every response.

An unspecified response does not ask when or how an admitted amount will be paid, so there is no ADMISSION_PAYMENT_ROUTE and no repayment plan here. Those are only in the specified journey (see RUNNING_SPECIFIED_TESTS.md).

```bash
ENV=aat RESPONDENT1_RESPONSE=PART_ADMISSION npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

```bash
ENV=aat CLAIM_TYPE=1v2DS RESPONDENT1_RESPONSE=FULL_DEFENCE RESPONDENT2_RESPONSE=COUNTER_CLAIM npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Through the API up to the responses (2v1, a full defence to Claimant 1 and a full admission to Claimant 2):

```bash
ENV=aat CLAIM_TYPE=2v1 RESPONDENT1_RESPONSE=FULL_DEFENCE RESPONDENT2_RESPONSE=FULL_ADMISSION API_UNTIL=JUDICIAL_REFERRAL npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

### Notice of change

A solicitor takes over a party from the "Notice of change" link on the case list, the first page after signing in. They enter the case's 16 digit reference and their client's name exactly as the case has it, with the title for an individual (for example "Mr John Smith"). Then they tick that the details are right and that every party has been told. civil-service approves it straight away. The party's case role moves to the solicitor's organisation, and anyone at the old organisation loses access to the case.

NOTICE_OF_CHANGE lists the parties: CLAIMANT_1, DEFENDANT_1, DEFENDANT_2. Who takes each one over:

| Party | New solicitor |
| --- | --- |
| A defendant who is a LIP | The solicitor the claim would have given them: Defendant 1 gets the Respondent1 Solicitor (Organisation 2), Defendant 2 the Respondent2 Solicitor (Organisation 3). The journey then carries on as the represented claim type, so that solicitor acknowledges and responds: 1v1LIP carries on as 1v1, 2v1LIP as 2v1, and the 1v2 claims with a LIP as 1v2DS once both defendants are represented. |
| A represented defendant | The New Defendant Solicitor, civil.damages.claims+organisation.2.solicitor.1@gmail.com (organisation N5AFUXG). |
| The claimant (both claimants in a 2v1 claim, as they share a solicitor) | The New Claimant Solicitor, civil.damages.claims+organisation.1.solicitor.1@gmail.com (organisation 0FA7S8S). |

After a change of solicitor, the party's later steps run as the new solicitor, and the test title says so, for example "Claimant Solicitor uploads evidence (as New Claimant Solicitor)."

The notices of change are given after NOTIFY_CLAIM_DETAILS, or after the step NOTICE_OF_CHANGE_AFTER names, in the order listed. Each one checks that:

- the party's case role is now the new solicitor's organisation's, and a defendant is recorded as represented
- the new solicitor can see the case, and the old one cannot (in a 1v2SS claim, only once both defendants have moved)
- the claim's state has not changed

A defendant who is a LIP gets a solicitor straight after the claim details are served. The solicitor then acknowledges and responds as usual:

```bash
ENV=aat CLAIM_TYPE=1v1LIP NOTICE_OF_CHANGE=DEFENDANT_1 STOP_AFTER_TEST=RESPOND_TO_DEFENCE npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Both parties change solicitor once the claimant has responded. The new solicitors then upload the evidence, pay the hearing fee and confirm the trial arrangements:

```bash
ENV=aat NOTICE_OF_CHANGE=CLAIMANT_1,DEFENDANT_1 NOTICE_OF_CHANGE_AFTER=RESPOND_TO_DEFENCE npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

With API_UNTIL, the notice of change goes through the case assignment service's API instead of the XUI pages, as long as the claim has not yet reached the API_UNTIL state. The service's address is worked out for each environment: on a preview it follows the XUI address (manage-case-assignment-civil-citizen-ui-pr-<n>...). AAC_API_URL overrides it.

These settings fail the run before the first test:

- a party the claim does not have
- a party given twice
- a LIP with NOTICE_OF_CHANGE_AFTER set to anything other than NOTIFY_CLAIM_DETAILS
- NOTICE_OF_CHANGE_AFTER set to a step before NOTIFY_CLAIM_DETAILS, or to a step that closes the claim
- only one defendant in a 1v2SS claim, which would give the defendants a solicitor each
- both defendants in a 1v2DS claim, which would give both the same new solicitor

A notice of change is not possible while the claim is in PENDING_CASE_ISSUED, CASE_DISMISSED or PROCEEDS_IN_HERITAGE_SYSTEM.

### Query management

A solicitor raises a query with the court from the case's "Raise a new query" screen, and a CTSC admin answers it from their task. These screens are XUI's own query management screens, not CCD event pages. Queries can be raised in any state except PENDING_CASE_ISSUED, CASE_DISMISSED, PROCEEDS_IN_HERITAGE_SYSTEM and CLOSED. Every party and court staff can see every query (the queries collection, "All queries").

QUERY_MANAGEMENT lists whose solicitors raise a query: claimant, defendant1, defendant2. For each one in turn:

- QUERY_RAISE_<PARTY>: their solicitor chooses "Raise a new query", enters a subject and the query, says whether it is about a hearing, and attaches a document (playwright-tests/documents/TEST_DOCUMENT_2.pdf).
- QUERY_RESPOND_<PARTY>: the CTSC admin opens their "Respond to a query" task from the case's Tasks tab and answers. Work allocation gives every query on a claim to CTSC unless it is in Welsh: at CTSC Salford for an unspecified claim, CTSC Stoke for a specified one. Where XUI needs the task claimed before the response can be given, the test claims it first. The task's link carries the task's ID, which XUI needs: opened at its plain address, the response screen goes blank after Continue.
- QUERY_FOLLOW_UP_<PARTY> (QUERY_MANAGEMENT_FOLLOW_UP=Yes): the solicitor opens the query from the Queries tab, checks CTSC's answer is shown, and asks a follow-up question.
- QUERY_RESPOND_FOLLOW_UP_<PARTY> (QUERY_MANAGEMENT_FOLLOW_UP=Yes): the CTSC admin answers the follow-up question.

With QUERY_MANAGEMENT_HEARING_RELATED=Yes the queries are about a hearing, ten days from today. Once the claim is past the directions stage (from JUDICIAL_REFERRAL on), work allocation calls the CTSC task "Respond to a hearing related query".

Each step checks that:

- the message was saved in the query's thread with its text (a follow-up or response points at the query it belongs to)
- after a query or follow-up, it is the case's latest query (qmLatestQuery), and work allocation has given CTSC a respondToQueryCTSC task (where the test can see Camunda: AAT, demo and ITHC)
- the claim's state has not changed

The CTSC admin is ctsc_admin@justice.gov.uk; an environment whose CTSC admins differ sets CTSC_ADMIN_USERNAME and CTSC_ADMIN_PASSWORD.

The claimant's and Defendant 2's solicitors each raise a query and ask a follow-up, once the claimant has responded:

```bash
ENV=aat CLAIM_TYPE=1v2DS API_UNTIL=JUDICIAL_REFERRAL QUERY_MANAGEMENT=claimant,defendant2 QUERY_MANAGEMENT_FOLLOW_UP=Yes STOP_AFTER_TEST=QUERY_MANAGEMENT npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

With API_UNTIL, the queries and responses go through the CCD API as long as the claim has not yet reached the API_UNTIL state. A query does not change the claim's state, so to send them through the API set API_UNTIL to a later state, such as CASE_PROGRESSION. XUI completes CTSC's task as it submits a response, but work allocation does not complete it for a response sent through the API, so the test completes it, as XUI would. Left open, it would sit beside the next query's task.

These settings fail the run before the first test:

- a party the claim does not have, or a party given twice
- defendant2 when the defendants share a solicitor (1v2SS): give defendant1
- a defendant who is a LIP, who raises queries in the citizen UI, which the journey does not do
- QUERY_MANAGEMENT_HEARING_RELATED or QUERY_MANAGEMENT_FOLLOW_UP set to anything but Yes or No
- QUERY_MANAGEMENT_AFTER set to a step before that defendant's solicitor has the case (their acknowledgement), or to a step that closes the claim

### Refunds

Refunds are not a CCD event. They are XUI's payment screens, backed by the payment and refunds services, so they always run in the UI, like paying the hearing fee. A refund needs a payment to refund, so the claim fee is first paid a second time.

REFUND says what the refund approver does with it:

- REFUND_OVERPAYMENT: the claimant's solicitor pays the claim fee again from their PBA account, through the payment API, and the payment is moved back 25 days, as the refunds service only refunds a payment once it has had time to clear.
- REFUND_REQUEST: the claimant's solicitor opens the overpayment from the Service Request tab (Review), chooses Issue refund, picks the fee, gives "Amended claim" as the reason and an email address for the contact, and submits it. The test notes the refund's reference (RF-...).
- REFUND_RETURN (REFUND=RETURN): the approver returns it to the caseworker with a reason.
- REFUND_RESUBMIT (REFUND=RETURN): the claimant's solicitor opens it from the refund list (Review refund), changes the reason to "System/technical error" and sends it again.
- REFUND_DECISION: the approver approves it (REFUND=APPROVE or RETURN) or rejects it (REFUND=REJECT, no associated payment).

The approver works from the refund list (/refunds), where each refund has a Process refund link. The list is shared by everyone on the environment (around a hundred refunds wait for approval on AAT), so its tables are sorted newest first before the case's refund is looked for.

On AAT the claimant's solicitor has the refund requester roles (payments-refund) and Defendant 1's solicitor the approver roles (payments-refund-approver), so Defendant 1's solicitor is the approver. The approver cannot be the user who asked for the refund. The court staff test users have neither role.

The refund comes straight after the claim is issued, or after the step REFUND_AFTER names. It does not change the claim's state.

```bash
ENV=aat API_UNTIL=CASE_ISSUED REFUND=RETURN STOP_AFTER_TEST=REFUND npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

A REFUND value other than APPROVE, REJECT or RETURN, or a REFUND_AFTER step that does not exist or closes the claim, fails the run before the first test.

### General applications

A solicitor makes a general application on the claim ("Make an application"), and pays its fee. civil-service makes the application a case of its own (case type GENERALAPPLICATION), which the test opens at /cases/case-details/CIVIL/GENERALAPPLICATION/<application id>. The claim's state does not change: every step checks the claim is still in the state it was in before the application.

GENERAL_APPLICATION lists the application's types, separated by commas, such as STAY_THE_CLAIM or EXTEND_TIME,STAY_THE_CLAIM: ADJOURN_HEARING, AMEND_A_STMT_OF_CASE, EXTEND_TIME, RELIEF_FROM_SANCTIONS, SET_ASIDE_JUDGEMENT, SETTLE_BY_CONSENT, STAY_THE_CLAIM, STRIKE_OUT, SUMMARY_JUDGEMENT, UNLESS_ORDER, VARY_ORDER, OTHER. The application comes after RESPOND_TO_DEFENCE (and any queries) by default, or after the step GENERAL_APPLICATION_AFTER names.

The steps, in the order they run, all in the GENERAL_APPLICATION group:

- GA_MAKE_APPLICATION: the solicitor in GENERAL_APPLICATION_BY (claimant, defendant1 or defendant2; default claimant) makes the application, with an evidence document, no hearing date to mention and an in person hearing at Clerkenwell if one is needed. They answer whether the other side agreed (GENERAL_APPLICATION_AGREED, default No) and, where they did not, whether it is made with notice to them (GENERAL_APPLICATION_WITH_NOTICE, default Yes), and whether it is urgent (GENERAL_APPLICATION_URGENT, default No). The application waits for its fee (AWAITING_APPLICATION_PAYMENT).
- GA_PAY_FEE: the same solicitor pays the fee, by PBA or card (PAYMENT_METHOD), from the application's Service Request tab, or by PBA through the payment API in the API version. If the payment service has not told civil-service about the payment within a minute, the test does. An application made with notice or agreed then waits for the other side (AWAITING_RESPONDENT_RESPONSE). One made without notice, an urgent one or one to settle by consent goes straight to the court (APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION).
- GA_SEND_TO_OTHER_PARTY_LEGAL_ADVISER, GA_SEND_TO_OTHER_PARTY_JUDGE (GENERAL_APPLICATION_SEND_TO_OTHER_PARTY=Yes): for an application made without notice, whoever work allocation gives the decision to does not decide it yet. They choose "Make decision", "Request more information", "Send application to other party and request hearing details". civil-service asks the applicant for the extra fee for an application with notice (APPLICATION_ADD_PAYMENT). The step for the user who did not get the task is skipped.
- GA_PAY_ADDITIONAL_FEE (GENERAL_APPLICATION_SEND_TO_OTHER_PARTY=Yes): the applicant pays the extra fee, as for GA_PAY_FEE. It has its own service request (generalAppPBADetails.additionalPaymentServiceRef), so it is a second "Pay now" row on the Service Request tab. civil-service then sends the application to the other side (AWAITING_RESPONDENT_RESPONSE).
- GA_RESPOND_CLAIMANT, GA_RESPOND_DEFENDANT1, GA_RESPOND_DEFENDANT2: each of the other parties' solicitors responds ("Respond to application"): to an agreed application they confirm they agreed, and to any other they do not agree, with a reason and a supporting document. Either way they want an in person hearing at Clerkenwell if one is needed. One response comes from each organisation, so a solicitor acting for both defendants (1v2SS) responds once, as Defendant 1's. Two claimants share one solicitor. After the last response the application goes to the court. Skipped where the other side does not respond: an application made without notice (unless it is sent to them), an urgent one, or one to settle by consent.
- GA_REFER_TO_JUDGE (GENERAL_APPLICATION_REFER_TO_JUDGE=Yes): a legal adviser given the decision refers the application to a judge from the Next step list, and a judge then decides it. Skipped where work allocation gave the decision to a judge.
- GA_DECISION_LEGAL_ADVISER, GA_DECISION_JUDGE: whoever work allocation gives the decision to ("Make decision") makes an order without a hearing, approving the order the applicant asked for. Where the order runs to a date, such as a stay, it is a working day four weeks away. The application moves to ORDER_MADE, or to PROCEEDS_IN_HERITAGE for the claimant's application to strike out, which is dealt with offline from then on. The step for the user who did not get the task is skipped.
- GA_APPROVE_CONSENT_ORDER_NBC_ADMIN, GA_APPROVE_CONSENT_ORDER_HEARING_CENTRE_ADMIN: an agreed application of a type court staff can deal with (such as SETTLE_BY_CONSENT or a stay) goes to court staff instead of a judge (a ReviewApplication task). The National Business Centre admin approves it while the application is at the Civil National Business Centre, and the hearing centre admin once it is at a hearing centre ("Approve consent order", ORDER_MADE).

Work allocation decides who decides the application, from where the application is and its types. The steps wait for the task (JudgeDecideOnApplication, LegalAdvisorDecideOnApplication or ReviewApplication), claim it, and run as its user. The journeys' claims are at Clerkenwell, so on AAT a judge decides them. A legal adviser only gets applications at the Civil National Business Centre.

Every step has an API version, apart from paying by card, which is always in the UI. Through the API, the decision-maker's task is still claimed first. When an application is sent to the other side through the API, the test completes the task, as XUI does, so it does not sit beside the task to decide the application once the other side has responded.

A stay application, made with notice, which Defendant 1's solicitor responds to and the judge approves:

```bash
ENV=aat API_UNTIL=JUDICIAL_REFERRAL GENERAL_APPLICATION=STAY_THE_CLAIM STOP_AFTER_TEST=GENERAL_APPLICATION npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

A stay application made without notice, which the judge sends to the other side. The claimant's solicitor pays the extra fee, Defendant 1's solicitor responds, and the judge then approves it:

```bash
ENV=aat API_UNTIL=JUDICIAL_REFERRAL GENERAL_APPLICATION=STAY_THE_CLAIM GENERAL_APPLICATION_WITH_NOTICE=No GENERAL_APPLICATION_SEND_TO_OTHER_PARTY=Yes STOP_AFTER_TEST=GENERAL_APPLICATION npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Defendant 2's solicitor applies to extend time in a 1v2DS claim, and the claimant's and Defendant 1's solicitors respond, all through the API:

```bash
ENV=aat CLAIM_TYPE=1v2DS API_UNTIL=All_FINAL_ORDERS_ISSUED GENERAL_APPLICATION=EXTEND_TIME GENERAL_APPLICATION_BY=defendant2 STOP_AFTER_TEST=GENERAL_APPLICATION npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

These settings fail the run before the first test:

- a type that is not in the list, or the same type twice
- VARY_PAYMENT_TERMS_OF_JUDGMENT, which is only offered once there is a judgment and asks for an N245 form
- SETTLE_BY_CONSENT with another type, or without GENERAL_APPLICATION_AGREED=Yes
- GENERAL_APPLICATION_AGREED, GENERAL_APPLICATION_WITH_NOTICE, GENERAL_APPLICATION_URGENT, GENERAL_APPLICATION_REFER_TO_JUDGE or GENERAL_APPLICATION_SEND_TO_OTHER_PARTY set to anything but Yes or No
- GENERAL_APPLICATION_SEND_TO_OTHER_PARTY=Yes for an application that is made with notice, agreed or urgent
- GENERAL_APPLICATION_BY that is not claimant, defendant1 or defendant2, or defendant2 when Defendant 2 does not have their own solicitor (only 1v2DS)
- a defendant who is a LIP: applications involving a litigant in person are not covered
- GENERAL_APPLICATION_AFTER set to CREATE_CLAIM, a step that does not exist, or a step that closes the claim

### Several at once, with the API for the early steps

```bash
ENV=aat API_UNTIL=CASE_ISSUED ADD_CASE_NOTE=Yes STAY_CASE=Yes CASE_FLAGS=representative npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

## 8. Paying fees by PBA or card

PAYMENT_METHOD picks how the claimant's solicitor pays the claim fee and the hearing fee, and how the applicant pays a general application's fees. PBA (the default) pays from their PBA account. CARD pays on GOV.UK Pay's pages with a test card, in the claimant solicitor's name and at their organisation's address (playwright-tests/fixtures/paymentCard.ts).

A card payment is always made in the UI. With API_UNTIL the claim is still created through the API, and its fee is then paid by card from the Service Request tab.

```bash
ENV=aat PAYMENT_METHOD=CARD npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Create the claim through the API and pay its fee by card, then pay the hearing fee by card later in the run:

```bash
ENV=aat API_UNTIL=JUDICIAL_REFERRAL STOP_AFTER_TEST=PAY_HEARING_FEE PAYMENT_METHOD=CARD npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Card payment is useful when PBA payments are failing on the environment, for example with "Unable to retrieve account information".

## 9. A fully specified claim

A 1v1 fast track road accident claim with fixed recoverable costs, experts and witnesses (the same as yarn test:UNSPEC_1v1_FAST):

```bash
ENV=aat CLAIM_TYPE=1v1 CLAIMANT_TYPE=INDIVIDUAL DEFENDANT_TYPE=INDIVIDUAL TYPE_OF_CLAIM=PERSONAL_INJURY SUB_TYPE=ROAD_ACCIDENT TRACK=FAST_CLAIM FIXED_RECOVERABLE_COSTS=Yes FIXED_RECOVERY_COSTS_BAND=BAND_2 EXPERTS=2 WITNESSES=2 LANGUAGE=ENGLISH UNAVAILABLE_DATES=Yes FINAL_ORDER=ASSISTED_ORDER npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Run a named scenario from playwright-tests/scenarios/unspecifiedScenarios.ts:

```bash
ENV=aat SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium --grep @UNSPEC_1v2DS_FAST_STAY_CASE
```

The default judgment scenarios are UNSPEC_1v1_FAST_DEFAULT_JUDGMENT and UNSPEC_1v2DS_FAST_DEFAULT_JUDGMENT, which run in the nightly set:

```bash
ENV=aat SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium --grep @UNSPEC_1v1_FAST_DEFAULT_JUDGMENT
```

The notice of change scenarios run in the nightly set too. UNSPEC_1v1_LIP_FAST_NOTICE_OF_CHANGE gives a LIP defendant a solicitor (yarn test:UNSPEC_1v1_LIP_FAST_NOTICE_OF_CHANGE). UNSPEC_1v1_FAST_NOTICE_OF_CHANGE changes both parties' solicitors after the claimant's response (yarn test:UNSPEC_1v1_FAST_NOTICE_OF_CHANGE).

UNSPEC_1v1_FAST_QUERY_MANAGEMENT runs in the nightly set too: once the claimant has responded, both solicitors raise a query about the hearing, CTSC answers, each asks a follow-up question and CTSC answers that too (yarn test:UNSPEC_1v1_FAST_QUERY_MANAGEMENT). UNSPEC_1v1_FAST_REFUND has a refund returned, changed and then approved straight after the claim is issued (yarn test:UNSPEC_1v1_FAST_REFUND).

```bash
ENV=aat SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium --grep @UNSPEC_1v1_FAST_NOTICE_OF_CHANGE
```

## 10. Claim parameters

Defaults apply when a parameter is not set. Every on/off parameter takes Yes or No, and treats anything other than Yes as No. DEFAULT_JUDGMENT is the exception: any value other than Yes or No stops the run.

| Parameter | Values | Default | Notes |
| --- | --- | --- | --- |
| `CLAIM_TYPE` | 1v1, 2v1, 1v2SS, 1v2DS, 1v1LIP, 2v1LIP, 1v2LIPS, 1v2LRLIP, 1v2LIPLR | 1v1 | SS = one solicitor for both defendants, DS = a solicitor each. LIP = litigant in person. 1v2LRLIP: Defendant 1 has a solicitor, Defendant 2 is a LIP. 1v2LIPLR is the other way round. |
| `CLAIMANT_TYPE` | INDIVIDUAL, COMPANY, ORGANISATION, SOLE_TRADER | INDIVIDUAL | Any other value is treated as INDIVIDUAL. |
| `DEFENDANT_TYPE` | INDIVIDUAL, COMPANY, ORGANISATION, SOLE_TRADER | INDIVIDUAL | Any other value is treated as INDIVIDUAL. |
| `CLAIMANT1_LITIGANT_FRIEND` | Yes, No | No | Claimant 1 has a litigation friend. |
| `CLAIMANT2_LITIGANT_FRIEND` | Yes, No | No | Claimant 2 has a litigation friend (2v1 claims). |
| `TYPE_OF_CLAIM` | PERSONAL_INJURY, CLINICAL_NEGLIGENCE, PROFESSIONAL_NEGLIGENCE, BREACH_OF_CONTRACT, CONSUMER, CONSUMER_CREDIT, HOUSING_DISREPAIR, DAMAGES_AND_OTHER_REMEDY, OTHER | PERSONAL_INJURY | A value that is set but is not one of these stops the run before it starts. |
| `SUB_TYPE` | ROAD_ACCIDENT, WORK_ACCIDENT, PUBLIC_LIABILITY, HOLIDAY_ILLNESS, DISEASE_CLAIM, NOISE_INDUCED_HEARING_LOSS, PERSONAL_INJURY_OTHER | ROAD_ACCIDENT (personal injury only) | Only for PERSONAL_INJURY. A value that is not one of these stops the run before it starts. A noise induced hearing loss claim must be on the fast track. |
| `TRACK` | SMALL_CLAIM, FAST_CLAIM, INTERMEDIATE_CLAIM, MULTI_CLAIM | FAST_CLAIM | Sets the claim value. The intermediate and multi tracks get a directions order instead of the Standard Direction Order, then go on to the final order as the small and fast tracks do. |
| `DEFENDANTS_TO_NOTIFY_CLAIM` | Both, Defendant One, Defendant Two | Both | Quote values with spaces. Anything other than Both takes the claim offline. |
| `DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS` | Both, Defendant One, Defendant Two | Both | Anything other than Both takes the claim offline. |
| `RESPONDENT1_RESPONSE_INTENTION` | FULL_DEFENCE, PART_DEFENCE, CONTEST_JURISDICTION | FULL_DEFENCE | Defendant 1's answer when acknowledging the claim. |
| `RESPONDENT2_RESPONSE_INTENTION` | FULL_DEFENCE, PART_DEFENCE, CONTEST_JURISDICTION | FULL_DEFENCE | Defendant 2's answer when acknowledging the claim. |
| `RESPONDENT1_RESPONSE` | FULL_DEFENCE, FULL_ADMISSION, PART_ADMISSION, COUNTER_CLAIM | FULL_DEFENCE | Anything other than a full defence takes the claim offline. |
| `RESPONDENT2_RESPONSE` | FULL_DEFENCE, FULL_ADMISSION, PART_ADMISSION, COUNTER_CLAIM | FULL_DEFENCE | Defendant 2's response, or in a 2v1 claim the defendant's response to Claimant 2. Anything other than a full defence takes the claim offline. |
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
| `PAYMENT_METHOD` | PBA, CARD | PBA | How the claim fee and the hearing fee are paid. CARD is always paid in the UI, on GOV.UK Pay's pages. Any other value stops the run. |
| `ADD_CASE_NOTE` | Yes, No | No | Optional event: Hearing Centre Admin adds a case note after the claim is issued. |
| `STAY_CASE` | Yes, No | No | Optional events: stay the case, request an update and lift the stay, after the claimant's response. |
| `SETTLE_CLAIM` | MARK_PAID_IN_FULL, JUDGE_ORDER, CONSENT_ORDER | None | Optional event, once the rest of the journey has run or where STOP_AT_STATE or STOP_AFTER_TEST stops it. MARK_PAID_IN_FULL: the claimant's solicitor marks the claim paid in full with "Settle this claim", which stays the case (CASE_STAYED); with two claimants it is for both. JUDGE_ORDER or CONSENT_ORDER: the hearing centre admin records with court staff's "Settle this claim" that the claim settled for that reason (CASE_SETTLED). Has an API version. |
| `DISCONTINUE_CLAIM` | NO_PERMISSION_NEEDED, PERMISSION_GRANTED | None | Optional events, once the rest of the journey has run or where STOP_AT_STATE or STOP_AFTER_TEST stops it: the claimant's solicitor fully discontinues the claim with "Discontinue this claim", for every claimant and against every defendant. NO_PERMISSION_NEEDED: the court's permission is not needed, so the claim is discontinued (CASE_DISCONTINUED). PERMISSION_GRANTED: a judge gave permission today, and the hearing centre admin then validates the discontinuance, which discontinues the claim. Not offered once the final orders are issued or while the case is stayed. Has an API version. |
| `DEFAULT_JUDGMENT` | Yes, No | No | Optional events instead of the defendants responding: once Notify claim details has run, the response deadlines are moved to yesterday through civil-service's testing support, the claimant's solicitor requests default judgment against every defendant ("Request Default Judgment", the damages decided at a disposal hearing), which moves the claim to JUDICIAL_REFERRAL, and the judge makes the directions order after judgment ("Directions Order (Judgment)", a disposal hearing), which moves it to CASE_PROGRESSION. The defendants' steps and everything after them are skipped, apart from SETTLE_CLAIM and DISCONTINUE_CLAIM. Cannot be used with INFORM_AGREED_EXTENSION, DEFENDANT_LITIGATION_FRIEND, STAY_CASE, CASE_FLAGS, MANAGE_CONTACT_INFORMATION, ADD_UNAVAILABLE_DATES or a claim type that goes offline when notified. Has an API version. |
| `INFORM_AGREED_EXTENSION` | Yes, No | No | Optional event: each defendant's solicitor informs the court of an agreed extension after acknowledging the claim. |
| `ADD_UNAVAILABLE_DATES` | Yes, No | No | Optional events: once the claimant's response has taken the claim to JUDICIAL_REFERRAL, each solicitor on the claim adds a single date and a date range their parties cannot attend a hearing ("Add Unavailable Dates"), which civil-service adds to every party they represent, then the hearing centre admin adds some for the defendant (Defendants for 1v2SS, Defendant 2 where the defendants are separate). Each run's dates are checked on the parties they were added to. Cannot be used with DEFAULT_JUDGMENT. Has an API version. |
| `DEFENDANT_LITIGATION_FRIEND` | Yes, No | No | Optional event: each defendant's solicitor adds a litigation friend for the defendant they represent ("Add litigation friend") after acknowledging the claim, with a certificate of suitability. Where both defendants have the same solicitor (1v2SS), Defendant 1's solicitor chooses Both and one litigation friend is added for both. The saved litigation friends are checked against what was entered. Skipped for a defendant who is a LiP. Cannot be used with DEFAULT_JUDGMENT. Has an API version. |
| `CASE_FLAGS` | representative, or a list of holder:code[:detail] | None | Optional events: add flags after the claimant's response, then make the first inactive. Holders: CASE, CLAIMANT_1/2, DEFENDANT_1/2, CLAIMANT_1/2_LITIGATION_FRIEND, CLAIMANT_EXPERT_n, CLAIMANT_WITNESS_n, DEFENDANT_1/2_EXPERT_n, DEFENDANT_1/2_WITNESS_n. The detail is the language for an interpreter flag or the description for an OT0001 flag. |
| `MANAGE_CONTACT_INFORMATION` | representative, or a list of user:party | None | Optional events: Manage Contact Information after the claimant's response, one run per entry, each checked against the saved case data. Users: admin, claimantSolicitor, respondent1Solicitor, respondent2Solicitor (a solicitor only sees their own side). Parties: CLAIMANT_1/2, DEFENDANT_1/2, each with _LITIGATION_FRIEND or _ORGANISATION_INDIVIDUALS, and CLAIMANT_1/DEFENDANT_1/DEFENDANT_2 with _LR_INDIVIDUALS, _WITNESSES or _EXPERTS. A party's or litigation friend's email (and a party's first address line) is changed, an individual is added, and a witness or expert is added by the admin or the first one's email changed by a solicitor (set WITNESSES or EXPERTS). Has an API version. |
| `NOTICE_OF_CHANGE` | A list of CLAIMANT_1, DEFENDANT_1, DEFENDANT_2 | None | Optional steps: a solicitor takes over each party with a notice of change (see section 7). A LIP defendant gets the solicitor the represented claim type would have, and the journey carries on as that claim type. A represented party moves to a solicitor of another organisation, who runs that party's later steps. Has an API version. |
| `NOTICE_OF_CHANGE_AFTER` | A step name, from NOTIFY_CLAIM_DETAILS on | NOTIFY_CLAIM_DETAILS | The step the notices of change follow, for example RESPOND_TO_DEFENCE. A LIP can only be given a solicitor after NOTIFY_CLAIM_DETAILS. |
| `QUERY_MANAGEMENT` | A list of claimant, defendant1, defendant2 | None | Optional steps: each solicitor raises a query and a CTSC admin answers it (see section 7). Has an API version. |
| `QUERY_MANAGEMENT_AFTER` | A step name | RESPOND_TO_DEFENCE | The step the queries follow. A defendant's solicitor can only raise one once they have acknowledged the claim. |
| `QUERY_MANAGEMENT_HEARING_RELATED` | Yes, No | No | The queries are about a hearing, ten days from today. |
| `QUERY_MANAGEMENT_FOLLOW_UP` | Yes, No | No | Each solicitor asks a follow-up question once CTSC has answered, which CTSC answers too. |
| `REFUND` | APPROVE, REJECT, RETURN | None | Optional steps: the claim fee is paid again and the claimant's solicitor asks for it back; the approver approves, rejects, or returns it to be changed and sent again before approving it (see section 7). Always in the UI, apart from the second payment. |
| `REFUND_AFTER` | A step name | CREATE_CLAIM | The step the refund follows. |
| `GENERAL_APPLICATION` | A list of ADJOURN_HEARING, AMEND_A_STMT_OF_CASE, EXTEND_TIME, RELIEF_FROM_SANCTIONS, SET_ASIDE_JUDGEMENT, SETTLE_BY_CONSENT, STAY_THE_CLAIM, STRIKE_OUT, SUMMARY_JUDGEMENT, UNLESS_ORDER, VARY_ORDER, OTHER | None | Optional steps: a solicitor makes a general application with these types and pays its fee, the other side responds where it is made with notice, and a judge, legal adviser or court staff approves it (see "General applications" in section 7). The claim's state does not change. Has an API version. |
| `GENERAL_APPLICATION_AFTER` | A step name | RESPOND_TO_DEFENCE | The step the application follows. Not CREATE_CLAIM, or a step that closes the claim. |
| `GENERAL_APPLICATION_BY` | claimant, defendant1, defendant2 | claimant | Whose solicitor makes the application. defendant2 needs 1v2DS. The other parties' solicitors respond. |
| `GENERAL_APPLICATION_AGREED` | Yes, No | No | The other side has agreed to the application. It then counts as made with notice, and an agreed application of some types (such as SETTLE_BY_CONSENT or a stay) is approved by court staff as a consent order. SETTLE_BY_CONSENT needs Yes. |
| `GENERAL_APPLICATION_WITH_NOTICE` | Yes, No | Yes | Where it is not agreed, whether the application is made with notice to the other side. Without notice, the other side does not respond, and it goes straight to the court once paid. |
| `GENERAL_APPLICATION_URGENT` | Yes, No | No | The application is urgent. It goes straight to the court once paid, even with notice, so the other side does not respond. |
| `GENERAL_APPLICATION_REFER_TO_JUDGE` | Yes, No | No | A legal adviser given the decision refers the application to a judge, who decides it. |
| `GENERAL_APPLICATION_SEND_TO_OTHER_PARTY` | Yes, No | No | For an application made without notice (needs GENERAL_APPLICATION_WITH_NOTICE=No, not agreed, not urgent): the judge or legal adviser first sends it to the other side, the applicant pays the extra fee, and the other side responds before it is decided. |

## 11. Run settings

| Parameter | Values | Default | Notes |
| --- | --- | --- | --- |
| `ENV` | aat, demo, ithc, preview | None (required) | Loads playwright-tests/env/.env.<ENV>. A run without it stops straight away. |
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
| `AAC_API_URL` | A URL | Worked out for the environment | The case assignment service, which the API version of NOTICE_OF_CHANGE uses. |
