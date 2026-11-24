# Adding an event to the playwright-tests journeys

This guide walks through adding a new CCD event (a Next step event in XUI) to the playwright-tests journeys. It uses one real event as the example all the way through: `CHANGE_SOLICITOR_EMAIL` ("Change solicitor's information"), where the claimant's solicitor sets the email address they get notifications at. It was added exactly this way in commit 7d4eb0c85, so you can look at the whole change with `git show 7d4eb0c85`.

Every path in this guide is relative to the repository root. Commands are run from the repository root too.

## 1. What you write

An event needs at most three files, and a line in a scenario:

| File | Where | What it does | Needed |
| --- | --- | --- | --- |
| UI class | `playwright-tests/e2e/flows/events/ui/<Event>.ts` | Picks the event from Next step in XUI, fills in its pages and submits it. | Yes |
| API class | `playwright-tests/e2e/flows/events/api/<Event>.ts` | Submits the same event with the same answers through the CCD API, with no browser. | No, but recommended |
| Event file | `playwright-tests/events/<event>.ts` | Says who does the event, when in the journey, which classes to call and what to check. | Yes |
| Scenario | `playwright-tests/scenarios/<journey>Scenarios.ts` | Turns the event on in a named scenario, so the pipeline runs it. | To run it in the pipeline |

You don't edit anything else. The journeys find the event file themselves, and from it they work out:

- **the setting** that turns it on: `<EVENT_ID>=Yes`, off by default
- **where it goes** in each journey, and which journeys get it
- **when it's skipped**, with a reason in the report
- **which settings it can't be used with**, such as default judgment where that replaces it
- **running it**: the API class until `API_UNTIL`, the UI class otherwise (signing in again if the session ends part way), then waiting for civil-service's business process and checking the claim's state
- **the guides**: `yarn guides:generate` adds its setting to the RUNNING guides' tables

The easiest way to write all three files is to copy a similar existing one and change it. Sections 3 to 5 say which to copy.

The rules that hold the framework together:

- **One class per CCD event.** The same class can be used in the main journey, in a branch, or after an API fast-forward.
- **Classes take parameters; they don't read settings.** The event file works out the answers and passes them in.
- **An API version where possible.** With `API_UNTIL=<state>`, the journey uses the API versions until the claim reaches that state, then switches to the UI. This lets a test reach a late state quickly and only do the event under test in the browser.
- **Steps have names, not numbers.** The event's step is named after its event ID, so `STOP_AFTER_TEST=CHANGE_SOLICITOR_EMAIL` stops after it, whatever is added before it.
- **Every step checks its result.** At least the claim's state; better, the saved case data too.

## 2. Find out how the event works

Start with `yarn event:info`. It reads the CCD definition in this repository and the journeys, and changes nothing.

With no event ID, it lists the Next step events an XUI user can do that the journeys don't cover yet, with who can do each, and when XUI offers it where that depends on the claim:

```bash
yarn event:info
```

```
  CHANGE_LANGUAGE_PREFERENCE    Change language preference    caseworker-civil-admin, cui-admin-profile
                                only when: applicant1Represented = "No" OR specRespondent1Represented = "No"
  CHANGE_SOLICITOR_EMAIL        Change solicitor's information    caseworker-civil-solicitor
  ...
```

With an event ID, it prints what you need to write the classes and the event file:

```bash
yarn event:info CHANGE_SOLICITOR_EMAIL
```

```
CHANGE_SOLICITOR_EMAIL: "Change solicitor's information"
Who can do it (roles with create access):
  caseworker-civil-solicitor
States:
  Offered in: CASE_ISSUED, AWAITING_CASE_DETAILS_NOTIFICATION, AWAITING_RESPONDENT_ACKNOWLEDGEMENT, ...
  Moves the claim to: no change (or set by civil-service)
  Check your answers page: no (the last page submits)
Pages (3), with the fields XUI can show. In XUI a field's element is #<field ID>:
  ...
  2. Applicant1SolicitorEmail
     Shown when: isApplicant1="Yes"
     applicantSolicitor1ServiceAddressRequired (YesOrNo, mandatory): ... Do you wish to enter a different address?
         element: #applicantSolicitor1ServiceAddressRequired_Yes / #applicantSolicitor1ServiceAddressRequired_No
     applicantSolicitor1UserDetails (UserDetails, complex): Notification details
         email (Email): What email would you like to send notifications to?
             element: #applicantSolicitor1UserDetails_email
  ...
Specified journey steps, for "after" (steps that close the claim are left out):
  CREATE_CLAIM                       Claimant Solicitor creates 1v1 specified claim
  ASSIGN_DEFENDANT_SOLICITORS        Defendant solicitors are assigned to the claim.
  ...
```

From it, note:

1. **The Next step name**, for the UI class (`"Change solicitor's information"`).
2. **Who can do it**, to pick the user. The roles map to the journeys' users: solicitor roles (`caseworker-civil-solicitor`, `APP-SOL-*`, `RES-SOL-*`) to `claimantSolicitor`, `respondent1Solicitor` or `respondent2Solicitor`; `caseworker-civil-admin` to `hearingCentreAdmin`; `judge-profile` to `judge`; `legal-adviser` to `legalAdviser`; `cui-admin-profile` is usually the CTSC admin, `ctscAdmin`. Where you're not sure, try the event by hand as the user first.
3. **The states**: where in the journey it can go, and whether it changes the state.
4. **The pages and fields**: each page's ID (the API class needs it) and each field's element ID and allowed values (the UI class needs them). The parts of a complex field are listed under it, with their own element IDs.
5. **Whether XUI offers it at all.** "NOT IN XUI" means the definition hides it from Next step for everyone, so it can only be done through the API, and it can't be added as an event file. "Next step only offers it when" is a condition on the claim: put the event somewhere the condition holds.

Then:

- **Try the event by hand in XUI on AAT**, as the user, on a claim in the right state. The definition doesn't say everything: which pages a given user sees, what the confirmation page says, and what civil-service rejects.
- **Read civil-service's callback handler** for the event (search `civil-service/src/main/java` for the event ID, under `handler/callback/user`). It shows what it validates (for example, dates that must be in the past) and the confirmation header. `CHANGE_SOLICITOR_EMAIL`'s handler checks the email and confirms with "You have updated a claimant's legal representative's information".

Write what you find in a comment at the top of the UI class. The next person to change it will need it.

## 3. Write the UI class

Copy a UI class for an event shaped like yours and change it:

| Your event | Copy |
| --- | --- |
| No fields, just Submit | `ui/DismissCase.ts` |
| One page, no check your answers page | `ui/AmendPartyDetails.ts` or `ui/ChangeSolicitorEmail.ts` |
| One page, then a check your answers page | `ui/AddCaseNote.ts` |
| Several pages, radio buttons and dates | `ui/AcknowledgeClaim.ts`, `ui/CreateHearingNotice.ts` |
| Uploading a document | `ui/AddOrAmendClaimDocuments.ts` |

`CHANGE_SOLICITOR_EMAIL`'s UI class, copied from `AmendPartyDetails.ts`:

```typescript
import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The claimant's solicitor changing their own email address for notifications (event CHANGE_SOLICITOR_EMAIL, "Change
// solicitor's information"). civil-service works out which party's legal representative is making the change, so the
// claimant's solicitor gets just the one page for the claimant's legal representative: whether postal correspondence
// should go to a different address than MyHMCTS has, and the email address, which civil-service checks. The event has
// no check your answers page and leaves the claim in its state.
export class ChangeSolicitorEmail {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(email: string) {
    await this.pageHelper.selectNextStep('Change solicitor\'s information');

    await this.page.locator('#applicantSolicitor1ServiceAddressRequired_No').check();
    await this.page.locator('#applicantSolicitor1UserDetails_email').fill(email);
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('You have updated a claimant\'s legal representative\'s information');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
```

A UI class:

- takes the Playwright `page` in its constructor and builds the helpers it needs
- has a `submit(...)` method that takes the answers as parameters
- opens the event with `pageHelper.selectNextStep('<Next step name>')`
- fills in each page with the element IDs `yarn event:info` gives, and moves on with `pageHelper.continueToNextPage()`
- submits with `pageHelper.submitEvent()`, from the last page or the check your answers page
- checks the confirmation page, where there is one, and closes it

Tips:

- An element ID is the field ID, with `_` between the parts of a complex field (`applicantSolicitor1UserDetails_email`), `_Yes` or `_No` after a Yes/No field, `-<code>` after a radio list's field ID, and `-day`, `-month` and `-year` after a date's.
- Radio buttons sometimes need clicking more than once before XUI registers them. Existing classes click until the radio is checked; reuse that approach.
- Don't add fixed waits (`waitForTimeout`). Wait for the next page's heading or field instead. `pageHelper.continueToNextPage()` and `pageHelper.submitEvent()` already retry the clicks XUI sometimes drops.

## 4. Write the API class

An API class answers the same pages with the same answers as the UI class, through `CcdApiHelper.submitEventThroughPages`, which works the way XUI does:

- waits until the case has no business process running
- starts the event, which runs civil-service's about-to-start callback
- goes through the pages you list, in order, adding your answers to the event's data
- validates each page, which runs any mid-event callback
- submits only the event's own fields

Without an API class the event always runs in the UI, even before `API_UNTIL`. That works, but it is slower and means a test can't fast-forward past it.

`CHANGE_SOLICITOR_EMAIL`'s API class, copied from `api/AmendPartyDetails.ts`:

```typescript
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Changes the claimant's solicitor's email address for notifications (CHANGE_SOLICITOR_EMAIL, "Change solicitor's
// information") as the claimant's solicitor through the CCD API, instead of the event's page in XUI, with the same
// answers as the UI
export class ChangeSolicitorEmail {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, email: string) {
    await this.ccdApiHelper.submitEventThroughPages(claimantSolicitorCredentials, 'CHANGE_SOLICITOR_EMAIL', caseId, [
      {
        page: 'Applicant1SolicitorEmail',
        answers: (data) => ({
          applicantSolicitor1ServiceAddressRequired: 'No',
          applicantSolicitor1UserDetails: { ...data.applicantSolicitor1UserDetails, email },
        }),
      },
    ]);
    console.log(`CHANGE_SOLICITOR_EMAIL submitted through the API on case ${caseId}`);
  }
}
```

Each entry in the pages list:

| Property | Meaning |
| --- | --- |
| `page` | The page ID `yarn event:info` lists. |
| `answers` | The fields to set on that page, as CCD saves them: `'Yes'` or `'No'`, a list's code, a date as `YYYY-MM-DD`, money in pence. Either an object, or a function that gets the event's data so far (as the callbacks left it) and returns the answers. Use the function form to keep the rest of a complex field, as `applicantSolicitor1UserDetails` does above. |
| `when` | Optional. A function of the event's data that says whether the user would see this page. The page is skipped when it returns false. |

An event with no pages to answer passes an empty list, as `api/DismissCase.ts` does. An event several users do takes the user as a parameter and uses `sessionUsers[user].credentials`.

Gotchas found so far:

- **Hidden read-only fields.** Fields with `RetainHiddenValue=Y` that the event prefills (often `*Copy` fields) must be sent back, or civil-service rejects or loses them. Use the `answers` function form and copy them from `data`.
- **Prefilled hidden complexes.** XUI drops hidden fields before Continue. Where an about-to-start callback prefills a complex the user never sees, set it to `null` in your answers so you send what XUI sends.
- **Callbacks that fill other pages.** If the about-to-start callback fills fields on pages the user doesn't see and civil-service then acts on them, pass `onlyAnsweredPages = true` (the sixth parameter) so only the pages you answered are submitted.
- **Documents.** Use civil-service's test document. A judge's Word order goes through `XuiDocumentHelper`.

When an event's answers are more than a couple of values, put them in `playwright-tests/e2e/flows/events/shared_api_ui/<event>Specs.ts` and have both classes use them, so the UI and API versions can't drift apart (`sendAndReplySpecs.ts` is an example).

## 5. Write the event file

Copy an event file from `playwright-tests/events` and change it. `CHANGE_SOLICITOR_EMAIL`'s, copied from `amendPartyDetails.ts`:

```typescript
import { expect } from '@playwright/test';
import { claimantSolicitorCredentials } from '../civilConfig.ts';
import { event } from '../e2e/journey/event.ts';
import { ChangeSolicitorEmail } from '../e2e/flows/events/ui/ChangeSolicitorEmail.ts';
import { ChangeSolicitorEmail as ChangeSolicitorEmailApi } from '../e2e/flows/events/api/ChangeSolicitorEmail.ts';

// The claimant's solicitor confirms the email address civil-service sends them notifications at (their own sign-in
// address), with "Change solicitor's information", once the defendants have the claim
export default event({
  id: 'CHANGE_SOLICITOR_EMAIL',
  title: 'Claimant Solicitor changes their email address for notifications.',
  description: 'Optional step: once the defendants have the claim, the claimant\'s solicitor sets the email address they get notifications at, with "Change solicitor\'s information". Has an API version.',
  user: 'claimantSolicitor',
  after: { SPECIFIED: 'ASSIGN_DEFENDANT_SOLICITORS', UNSPECIFIED: 'NOTIFY_CLAIM_DETAILS' },
  onlyWhen: ['notOfflineAtNotify'],
  answers: () => ({ email: claimantSolicitorCredentials.username }),
  ui: ({ page, answers }) => new ChangeSolicitorEmail(page).submit(answers.email),
  api: ({ caseId, answers }) => new ChangeSolicitorEmailApi().submit(caseId, answers.email),
  check: ({ caseData, answers }) => {
    expect(caseData.applicantSolicitor1UserDetails?.email, 'The email address was not saved').toBe(answers.email);
  },
});
```

What each part is for:

| Part | What it says | Needed |
| --- | --- | --- |
| `id` | The CCD event ID. It is also the step's name and the setting that turns it on (`CHANGE_SOLICITOR_EMAIL=Yes`). | Yes |
| `title` | The test's title in the report. | Yes |
| `description` | What it does, as the RUNNING guides say in their claim parameters tables. A string, or `{ SPECIFIED: '...', UNSPECIFIED: '...' }` where the journeys differ. Say whether it has an API version, and which settings it can't be used with. | Yes |
| `user` | Who does it: `claimantSolicitor`, `respondent1Solicitor`, `respondent2Solicitor`, `judge`, `hearingCentreAdmin`, `legalAdviser`, `nbcAdmin`, `ctscAdmin`, `newClaimantSolicitor` or `newDefendantSolicitor`. | Yes |
| `after` | The step it comes after in each journey it belongs to, from the step names `yarn event:info` lists. Only the journeys named get it. | Yes, or `closesClaim` |
| `closesClaim` | For an event that closes the claim, instead of `after` (5.3). | No |
| `onlyWhen` | Facts about the claim it needs (5.2). | No |
| `answers` | What the user enters, worked out once each time the event runs, so `ui`, `api` and `check` use the same values. It gets the journey's config (`claim`), for answers that depend on the claim. | No |
| `ui` | Calls the UI class. Gets `page`, `answers` and `claim`. | Yes |
| `api` | Calls the API class. Gets `caseId`, `user`, `answers` and `claim`. | No |
| `expect` | `state`: the state the claim moves to (leave it out when it stays where it was). `businessProcess`: the process civil-service starts for the event, to wait for (5.4). | No |
| `check` | Anything else to check once it's done, with the saved case data (`caseData`), `page`, `inUi` (whether the UI class was used), `answers` and `claim` (5.5). | No |

### 5.1 Where it goes (`after`)

`after` names the step the event comes straight after, in each journey. `yarn event:info` lists each journey's steps. Pick the first point where the event makes sense: the claim is in a state the event is offered in, the user has access to the case, and anything the event needs has happened.

- An event in only one journey names only that journey: `after: { SPECIFIED: 'ASSIGN_DEFENDANT_SOLICITORS' }`.
- An event can come after another event file's event; the journeys place them in the right order.
- Several events after the same step go in file name order.
- A step name that doesn't exist fails the run straight away, listing the journey's steps.

### 5.2 Facts the event needs (`onlyWhen`)

Whether an event applies to a claim mostly depends on facts about the claim: who has a solicitor, and where the claimant's response takes it. List the facts the event needs, and the journey leaves it out, with the fact's reason, where the claim doesn't have one. The facts, from `playwright-tests/e2e/journey/claimFacts.ts`:

| Fact | The claim |
| --- | --- |
| `defendant1HasSolicitor` | Defendant 1 has a solicitor (is not a litigant in person). |
| `notOfflineAtNotify` | Notify claim and Notify claim details did not take the claim offline. Always true for a specified claim, which has neither. |
| `everyDefendantRepresented` | Every defendant has a solicitor. |
| `reachesJudicialReferral` | The claimant's response takes the claim to JUDICIAL_REFERRAL. For events from the judge's order on. |
| `onlineAfterClaimantResponse` | The claimant's solicitor responds and the claim stays online. |
| `reachesCaseProgression` | The judge's (or legal adviser's) order moves the claim to CASE_PROGRESSION. For events after it. |
| `claimantSolicitorCanCloseClaim` | The claimant's solicitor can settle or discontinue the claim (not two defendants where one is a litigant in person). |
| `withoutDefaultJudgment` | The claimant has not asked for default judgment. |

Your editor offers these names, and flags one that doesn't exist.

Default judgment is handled for you. Where the claim has default judgment, the journey skips every step after it apart from those that close the claim. An event switched on that would be skipped that way fails the run before it starts: "DEFAULT_JUDGMENT=Yes cannot be used with `<ID>`=Yes".

### 5.3 An event that closes the claim (`closesClaim`)

An event that ends the claim (dismissing it, for example) has `closesClaim` instead of `after`, with the states it is offered in. It goes at the end of both journeys and still runs where `STOP_AT_STATE` or `STOP_AFTER_TEST` stopped the journey earlier, so a test can close a claim wherever it stops. The run fails before it starts if the journey would end in a state the event isn't offered in, and the step is skipped if the claim turns out to be in such a state while it runs. From `playwright-tests/events/dismissCase.ts`:

```typescript
  user: 'hearingCentreAdmin',
  closesClaim: { offeredIn: settleableStates },
  ui: ({ page }) => new DismissCase(page).submit(),
  api: ({ caseId }) => new DismissCaseApi().submit(caseId),
  expect: { state: caseStates.CASE_DISMISSED, businessProcess: 'DISMISS_CASE' },
```

`settleableStates`, `discontinuableStates` and `casemanStates` in `claimFacts.ts` are lists of states for the closing events; they come from the events' `PreConditionState(s)`.

### 5.4 The state and civil-service's business process (`expect`)

After the event, the journey checks the claim's state: the one in `expect.state`, or, without one, the state it was in before. `yarn event:info` says whether the event changes the state ("Moves the claim to").

Many events start a business process in civil-service (Camunda) once submitted, which sends notifications, makes documents or changes the state. Give its name in `expect.businessProcess` (usually the event ID) and the journey waits for it before checking the state, or the check can run too early. How long it waits is set by `BUSINESS_PROCESS_WAIT_SECONDS` (default 300). The API class already waits for any earlier business process before starting, so you don't need to wait before your event.

### 5.5 Checking what the event saved (`check`)

`check` runs once the event is done, with the case data as saved. Check the fields the event should have changed with `toMatchObject` or `toBe`, with a message that says what went wrong. It gets `inUi` too, for a check that only makes sense in the browser, such as the note on the Notes tab in `events/addCaseNote.ts`:

```typescript
  check: async ({ caseData, page, inUi, answers }) => {
    const notes = (caseData.caseNotes ?? []).map((entry: { value?: { note?: string } }) => entry.value?.note);
    expect(notes, 'The case note was not saved').toContain(answers.note);
    if (inUi) {
      await new AddCaseNote(page).verifyNoteShown(answers.note);
    }
  },
```

## 6. Add any new case state

If the event moves the claim to a state the framework hasn't seen before, add it to `playwright-tests/enums/caseStates.ts`, using the state ID from the CCD definition. `DISMISS_CASE` did this for `CASE_DISMISSED`.

## 7. Run it

Check where the step lands first. `--list` shows the tests without running anything:

```bash
ENV=aat CHANGE_SOLICITOR_EMAIL=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium --list
```

Then run the journey with the setting on, stopping straight after the event. Run the UI version and the API version, in each journey and on each claim type the event applies to. Without `--list` these run a real journey on AAT.

UI version, specified 1v1 claim:

```bash
ENV=aat CHANGE_SOLICITOR_EMAIL=Yes STOP_AFTER_TEST=CHANGE_SOLICITOR_EMAIL npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium --headed
```

API version: fast-forward through the API past the event, so the event itself goes through the API:

```bash
ENV=aat CHANGE_SOLICITOR_EMAIL=Yes STOP_AFTER_TEST=CHANGE_SOLICITOR_EMAIL API_UNTIL=AWAITING_APPLICANT_INTENTION npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

Both journeys at once, two at a time:

```bash
ENV=aat WORKERS=2 CHANGE_SOLICITOR_EMAIL=Yes STOP_AFTER_TEST=CHANGE_SOLICITOR_EMAIL npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium
```

Things to check:

- The event passes in both the UI and the API version.
- `CHANGE_SOLICITOR_EMAIL=yes` (a value it doesn't take) fails the run straight away.
- With the setting off, the step is skipped, with "CHANGE_SOLICITOR_EMAIL is switched off (set CHANGE_SOLICITOR_EMAIL=Yes to run it)".
- The journey carries on past the event and the later steps still pass (run once without `STOP_AFTER_TEST`).

## 8. Add a scenario

Add the setting to a named scenario in `playwright-tests/scenarios/specifiedScenarios.ts` or `unspecifiedScenarios.ts`, so the pipeline runs it. You can add it to an existing scenario that reaches the right point, or add a new one. The tag picks when it runs: `@spec-pr`/`@unspec-pr` on every PR, `@spec-master`/`@unspec-master` on master, `@spec-nightly`/`@unspec-nightly` every night. For example, adding it to the scenario that already runs the other court staff events:

```typescript
  {
    name: 'SPEC_1v1_FAST_DISMISS_CASE',
    tags: [NIGHTLY],
    env: { ...company1v1, ...closeAtJudicialReferral, ADD_CASE_NOTE: 'Yes', AMEND_PARTY_DETAILS: 'Yes', CHANGE_SOLICITOR_EMAIL: 'Yes', DISMISS_CASE: 'Yes' },
  },
```

A scenario that sets a name that isn't a setting, or one only the other journey has, fails before it starts. Run it by its tag to check it:

```bash
ENV=aat SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium --grep @SPEC_1v1_FAST_DISMISS_CASE
```

Keep PR scenarios few and quick: PR previews have fewer resources than AAT. Most new events belong in a nightly scenario.

## 9. Update the guides

In the same commit:

- `playwright-tests/RUNNING_SPECIFIED_TESTS.md` and/or `RUNNING_UNSPECIFIED_TESTS.md`: add the event to the list of steps in section 2, in the order it runs, with an example command where it helps.
- Run `yarn guides:generate`. It adds the event's setting to each guide's claim parameters table, from its `description`, and writes the `.docx` version of every guide whose text changed. Don't edit the tables by hand: the next run puts them back. `yarn guides:generate --check` lists anything out of date without changing it.
- `playwright-tests/MISSING_EVENTS.md`: move the event to "Done since", with which scenarios passed on AAT and when.

## 10. When an event file isn't enough

An event file covers an optional event that happens once, as one user, at one point in the journey, turned on with Yes or No. A few events need more, and are written as steps in the journeys instead:

- **Events the journey always does**, such as creating the claim or the defendants' responses: in `playwright-tests/e2e/journey/specified/specifiedSteps.ts` and `unspecified/unspecifiedSteps.ts`.
- **Events each solicitor or party does**, such as each defendant's solicitor informing the court of an agreed extension, or each solicitor uploading evidence: copy the step function of an event like it and change it. There is one step for each user, each with its own `skipIf` (for example "Defendant 2 has no separate solicitor") and its own checks. `informAgreedExtensionSteps` in `unspecified/unspecifiedSteps.ts` gives each defendant's solicitor a separately numbered test. `uploadEvidenceSteps` in the journey files puts the solicitors' steps in one test with a shared `group`. The function is plain code you can read from top to bottom: list it in the journey's steps where it happens, and add its setting to `settings.ts` if it is optional.
- **Events that change the rest of the journey**, such as a notice of change, or steps that go after a step a setting names: `insertAfterStep`, as in `noticeOfChangeSteps.ts` and `refundSteps.ts`.
- **Settings that aren't Yes or No**, such as `SETTLE_CLAIM=MARK_PAID_IN_FULL`: declared in the settings registry, `playwright-tests/e2e/journey/settings.ts`, with the values they take, read in each journey's config.
- **Settings that can't be used together**, other than with default judgment: a rule in `settingRules` in `settings.ts`.

Steps the two journeys share are written once, in `playwright-tests/e2e/journey/steps/`, and listed in each journey. Look at the step nearest to what you need and follow it.

## 11. Checklist

- [ ] `yarn event:info <EVENT_ID>` checked: the event is in XUI, who does it, its states, pages and fields
- [ ] Event tried by hand in XUI on AAT, and civil-service's handler read for its checks and confirmation
- [ ] UI class in `flows/events/ui`, copied from a similar one, with a comment describing the event's pages
- [ ] API class in `flows/events/api`, answering the same pages the same way
- [ ] Event file in `playwright-tests/events`, with `after` (or `closesClaim`), the facts it needs in `onlyWhen`, `expect` and a `check` of what it saves
- [ ] New case states added to `enums/caseStates.ts`
- [ ] UI and API versions both passed on AAT, in each journey and claim type the event applies to
- [ ] Setting added to a scenario with the right pipeline tag
- [ ] Event listed in the RUNNING guides, `yarn guides:generate` run, and `MISSING_EVENTS.md` updated
- [ ] Staged diff checked for tokens, `.auth` files and local-only files before committing
