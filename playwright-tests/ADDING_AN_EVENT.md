# Adding a new event to playwright-tests

This guide walks through adding a new CCD event to the playwright-tests journeys, from finding out how the event works to running it in a nightly scenario. It uses one real event as the example all the way through: `AMEND_PARTY_DETAILS` ("Amend party details"), where the hearing centre admin changes the legal representatives' email addresses. It was added in commit 15ed9df29, so you can look at the whole change with `git show 15ed9df29`.

Every path in this guide is relative to the repository root.

## 1. How the framework fits together

A new event touches seven places. You add something to each of them (the shared answers only where needed).

| Layer | Where | What it does |
| --- | --- | --- |
| UI event class | `playwright-tests/e2e/flows/events/ui/<Event>.ts` | Picks the event from Next step in XUI, fills in its pages and submits it. Listed in `flows/events/ui/index.ts`. |
| API event class | `playwright-tests/e2e/flows/events/api/<Event>.ts` | Submits the same event with the same answers through the CCD API, with no browser. Listed in `flows/events/api/index.ts`. |
| Shared answers (optional) | `playwright-tests/e2e/flows/events/shared_api_ui/<event>Specs.ts` | Answers that both versions use, so the UI and API versions can't drift apart. |
| Setting | `playwright-tests/e2e/journey/settings.ts` | Declares the setting (environment variable) that turns the step on: its values, default and what it does. Its value is checked before the journey starts. |
| Journey config | `playwright-tests/e2e/journey/<specified or unspecified>/<journey>Config.ts` | Reads the setting for the journey's steps. |
| Journey step | `playwright-tests/e2e/journey/<specified or unspecified>/<journey>Steps.ts` | Says where the event runs in the journey, as which user, when it's skipped, and what it checks afterwards. |
| Scenario | `playwright-tests/scenarios/<journey>Scenarios.ts` | A named set of settings that runs the step in the PR, master or nightly pipeline. |

The rules that hold the framework together:

- **One class per CCD event.** Each event has its own class, so the same class can be used in the main journey, in a branch, or after an API fast-forward.
- **Classes take parameters; they don't read settings.** An event class never reads environment variables. The journey step works out the answers and passes them in.
- **Every event has a UI version and an API version where possible.** With `API_UNTIL=<state>`, the journey runs the API versions until the claim reaches that state, then switches to the UI. This lets a test reach a late state quickly and only do the event under test in the browser.
- **Steps have names, not numbers.** `STOP_AFTER_TEST=AMEND_PARTY_DETAILS` stops the journey after that step, whatever else is added before it.
- **Every step checks its result.** At minimum the claim's state; better, the saved case data too.

## 2. Find out how the event works

Before writing code, work out these things for the event. Most come from the CCD definition in this repository and from trying the event by hand in XUI on AAT.

1. **The event ID and its Next step name.** Search the definition (`ccd-definition/civil`, or `ccd-definition/generalapplication` for a general application event) for the event ID. The `Name` in its `CaseEvent` entry is what XUI shows in the Next step drop-down.
2. **Who can run it.** Look in `ccd-definition/civil/AuthorisationCaseEvent` for the roles with `C` (create) access, and pick the matching test user from `playwright-tests/civilConfig.ts` (for example `hearingCentreAdminCredentials`).
3. **Which states it runs in.** `PreConditionState(s)` in the `CaseEvent` entry. Also check any `EventEnablingCondition`.
4. **Its pages and fields.** The event's file in `ccd-definition/civil/CaseEventToFields` lists every field, the page each one is on (`PageID`), and whether a page has a mid-event callback (`CallBackURLMidEvent`). Some events have a separate file for specified claims (ending `LRspec`). Note the page IDs: the API version needs them.
5. **What it does to the claim.** Does it change the state? Does civil-service start a business process? What does the confirmation page say?

Searching for the files that mention the event:

```bash
grep -rln '"AMEND_PARTY_DETAILS"' ccd-definition/civil
```

For `AMEND_PARTY_DETAILS` this gave:

- Next step name: "Amend party details". User: hearing centre admin.
- One page, `Email`, with three fields: `specRespondentSolicitor1EmailAddress`, `respondentSolicitor1EmailAddress` and `applicantSolicitor1UserDetails.email`.
- No check your answers page. Confirmation header: "You have updated a legal representative's information".
- It does not change the claim's state.
- It only makes sense where Defendant 1 has a solicitor.

Write what you find in a comment at the top of the UI class. The next person to change the class will need it.

## 3. Write the UI event class

Create `playwright-tests/e2e/flows/events/ui/AmendPartyDetails.ts`. A UI class:

- takes the Playwright `page` in its constructor and builds the helpers it needs
- has a `submit(...)` method that takes the answers as parameters
- opens the event with `pageHelper.selectNextStep('<Next step name>')`
- fills in each page, using the field IDs from the definition as locators where possible
- submits with `pageHelper.submitEvent()`
- checks the confirmation page and closes it

```typescript
import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The hearing centre admin changing the legal representatives' email addresses (event AMEND_PARTY_DETAILS, "Amend party
// details"). One page, both of Defendant 1's email boxes required, then the claimant's legal representative's email.
// The event has no check your answers page and leaves the claim in its state.
export class AmendPartyDetails {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(emails: { defendant1Solicitor: string; claimantSolicitor: string }) {
    await this.pageHelper.selectNextStep('Amend party details');

    await this.page.locator('#specRespondentSolicitor1EmailAddress').fill(emails.defendant1Solicitor);
    await this.page.locator('#respondentSolicitor1EmailAddress').fill(emails.defendant1Solicitor);
    await this.page.locator('#applicantSolicitor1UserDetails_email').fill(emails.claimantSolicitor);
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('You have updated a legal representative\'s information');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
```

Tips for the UI class:

- XUI turns a nested field ID like `applicantSolicitor1UserDetails.email` into the element ID `applicantSolicitor1UserDetails_email`.
- For an event with several pages, click Continue between pages with the helpers in `helpers/ButtonHelper.ts` and `helpers/PageHelper.ts`. Look at a similar event in `flows/events/ui` and copy its pattern, rather than writing new waits.
- Radio buttons sometimes need clicking more than once before XUI registers them. Existing classes click until the radio is checked; reuse that approach.
- Don't add fixed waits (`waitForTimeout`). Wait for the next page's heading or field instead.

## 4. Write the API event class

Create `playwright-tests/e2e/flows/events/api/AmendPartyDetails.ts`. An API class answers the same pages with the same answers as the UI version, through `CcdApiHelper.submitEventThroughPages`. That helper works the way XUI does:

- waits until the case has no business process running
- starts the event, which runs civil-service's about-to-start callback
- goes through the pages you list, in order, adding your answers to the event's data
- validates each page, which runs any mid-event callback
- submits only the event's own fields

```typescript
import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Changes the legal representatives' email addresses (AMEND_PARTY_DETAILS, "Amend party details") as the hearing centre
// admin through the CCD API, with the same answers as the UI version
export class AmendPartyDetails {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, emails: { defendant1Solicitor: string; claimantSolicitor: string }) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'AMEND_PARTY_DETAILS', caseId, [
      {
        page: 'Email',
        answers: (data) => ({
          specRespondentSolicitor1EmailAddress: emails.defendant1Solicitor,
          respondentSolicitor1EmailAddress: emails.defendant1Solicitor,
          applicantSolicitor1UserDetails: { ...data.applicantSolicitor1UserDetails, email: emails.claimantSolicitor },
        }),
      },
    ]);
    console.log(`AMEND_PARTY_DETAILS submitted through the API on case ${caseId}`);
  }
}
```

How the pages list works. Each entry is an `EventPage`:

| Property | Meaning |
| --- | --- |
| `page` | The page ID from `CaseEventToFields`, without the event ID in front. `Email` becomes `AMEND_PARTY_DETAILSEmail`. |
| `answers` | The fields to set on that page. Either an object, or a function that gets the event's data so far (as earlier callbacks left it) and returns the answers. Use the function form to keep the rest of a complex field, as `applicantSolicitor1UserDetails` does above. |
| `when` | Optional. A function of the event's data that says whether the user would see this page. The page is skipped when it returns false. |

An event with no pages to answer passes an empty list, as `DismissCase` does:

```typescript
await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'DISMISS_CASE', caseId, []);
```

Gotchas found so far:

- **Hidden read-only fields.** Fields with `RetainHiddenValue=Y` that the event prefills (often `*Copy` fields) must be sent back, or civil-service rejects or loses them. Use the `answers` function form and copy them from `data`.
- **Prefilled hidden complexes.** XUI drops hidden fields before Continue. Where an about-to-start callback prefills a complex the user never sees, set it to `null` in your answers so you send what XUI sends.
- **Callbacks that fill other pages.** If the about-to-start callback fills fields on pages the user doesn't see and civil-service then acts on them, pass `onlyAnsweredPages = true` (the sixth parameter) so only the pages you answered are submitted.
- **Documents.** Use civil-service's test document. A judge's Word order goes through `XuiDocumentHelper`.

## 5. Share the answers between the two versions (optional)

When an event's answers are more than a couple of values, put them in `playwright-tests/e2e/flows/events/shared_api_ui/<event>Specs.ts` and have both classes use them. This keeps the UI and API versions answering the same way. For example, `sendAndReplySpecs.ts`:

```typescript
export type MessageToSend = {
  recipientRoleType: 'DISTRICT_JUDGE';
  subjectType: 'HEARING';
  subject: string;
  content: string;
};

export function messageToSend(): MessageToSend {
  return {
    recipientRoleType: 'DISTRICT_JUDGE',
    subjectType: 'HEARING',
    subject: `Playwright message ${Date.now()}`,
    content: 'Please could a judge look at the hearing arrangements for this claim.',
  };
}
```

`AMEND_PARTY_DETAILS` only needs two email addresses, so it passes them straight in and has no shared file.

## 6. Add the setting

Each optional step is turned on by a setting. Every setting is declared once, in `playwright-tests/e2e/journey/settings.ts`, with the values it takes, its default and what it does in each journey that reads it. Add an entry there, with a note for every journey the event belongs to:

```typescript
  AMEND_PARTY_DETAILS: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional step: once the defendants\' solicitors are assigned, the hearing centre admin changes the legal representatives\' email addresses with "Amend party details". Cannot be used with DEFAULT_JUDGMENT. Has an API version.',
      UNSPECIFIED: 'Optional event: once Notify claim details has run, the hearing centre admin changes ...',
    },
  },
```

What each part is for:

| Property | Meaning |
| --- | --- |
| `values` | The values the setting takes: `yesNoValues` for Yes/No, or `Object.values(...)` of an enum in `playwright-tests/enums` (for example `CASE_PROCEEDS_IN_CASEMAN`). It can differ by journey: `{ SPECIFIED: [...], UNSPECIFIED: [...] }`. |
| `valuesText` and `check` | For a setting that is not one of a list (a number, a list of parties, a step name): what it takes, for the guides, and a function that says why a value is not valid. Leave out `check` where the code that reads the setting already checks it, as for `CASE_FLAGS`. |
| `default` | Its value when it is not set. Leave it out for a setting that is off when not set. It can differ by journey, as `NOTICE_OF_CHANGE_AFTER`'s does. |
| `notes` | What it does in each journey, as the RUNNING guides say. The setting is only for the journeys it has a note for. |

Then read it in the config for every journey the event belongs to, `playwright-tests/e2e/journey/specified/specifiedConfig.ts` and/or `playwright-tests/e2e/journey/unspecified/unspecifiedConfig.ts`, through `read`, which gives the default when the setting is not set:

```typescript
    amendPartyDetails: read.yes('AMEND_PARTY_DETAILS'),
```

Use `read.yes(...)` for a Yes/No setting and `read.get(...)` for any other, cast to its enum (`read.get('SETTLE_CLAIM') as SettleClaim | undefined`).

You don't need to check the value. Before the journey starts, each config's `validate()` checks every setting against the registry, so a value the setting doesn't take (`AMEND_PARTY_DETAILS=yes`) fails the run straight away, with the values it does take. A scenario in `playwright-tests/scenarios` that sets a name that is not a setting, or one only the other journey reads, fails too. Settings that can't be used together (for example `SETTLE_CLAIM` and `DISCONTINUE_CLAIM` both set) are rules in the same file (see 7.4).

## 7. Add the journey step

Add a step to `journeySteps(...)` in `specifiedSteps.ts` and/or `unspecifiedSteps.ts`, at the point in the journey where the event should run. Steps run in the order they are listed. Where the step is the same in both journeys, write it once, in its own file under `playwright-tests/e2e/journey/steps/`, and list it in both journeys (7.7). The journey and step files import every event class at once, through the index files in `flows/events/ui` and `flows/events/api`:

```typescript
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
```

So first add a line for each new class to the matching index file, in alphabetical order:

```typescript
// playwright-tests/e2e/flows/events/ui/index.ts
export { AmendPartyDetails } from './AmendPartyDetails.ts';
// playwright-tests/e2e/flows/events/api/index.ts
export { AmendPartyDetails } from './AmendPartyDetails.ts';
```

The step then uses `ui.AmendPartyDetails` and `api.AmendPartyDetails`.

Then the step. Amend party details is the same in both journeys, so it is written once, in `playwright-tests/e2e/journey/steps/amendPartyDetails.ts`:

```typescript
// The hearing centre admin changes the legal representatives' email addresses with "Amend party details". Only run
// with AMEND_PARTY_DETAILS=Yes, where Defendant 1 has a solicitor and the claim did not go offline at Notify claim
// (unspecified only). The claim's state does not change.
export function amendPartyDetails(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'AMEND_PARTY_DETAILS',
    title: 'Hearing Centre Admin amends the legal representatives\' email addresses.',
    user: 'hearingCentreAdmin',
    needs: [c.facts.notOfflineAtNotify, c.facts.defendant1HasSolicitor],
    skipIf: [
      [c.amendPartyDetails !== yesNo.YES, 'Amending party details is switched off (set AMEND_PARTY_DETAILS=Yes to run it)'],
    ],
    run: async ({ page, storageState }) => {
      const stateBefore = ctx.lastStateReached;
      const emails = { defendant1Solicitor: respondent1SolicitorCredentials.username, claimantSolicitor: claimantSolicitorCredentials.username };
      await ctx.submitEvent(page, storageState, {
        api: () => new api.AmendPartyDetails().submit(ctx.caseId, emails),
        ui: () => new ui.AmendPartyDetails(page).submit(emails),
      });
      const saved = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
      expect(saved, 'The amended email addresses were not saved').toMatchObject({
        specRespondentSolicitor1EmailAddress: emails.defendant1Solicitor,
        respondentSolicitor1EmailAddress: emails.defendant1Solicitor,
        applicantSolicitor1UserDetails: { email: emails.claimantSolicitor },
      });
      await ctx.assertCaseState(stateBefore);
    },
  };
}
```

Each journey lists it where it runs: after Notify claim details in `unspecifiedSteps.ts`, after the defendants' solicitors are assigned in `specifiedSteps.ts`:

```typescript
    amendPartyDetails(c, ctx),
```

A step that only one journey has is written the same way (the object inside `return { ... }`), straight into that journey's list.

What each part of a step does. The Amend party details step above uses `name`, `title`, `user`, `needs`, `skipIf` and `run`; sections 7.1 to 7.8 show the others, each with a real step from the journeys.

| Property | What it's for | Shown in |
| --- | --- | --- |
| `name` | The step's name. `STOP_AFTER_TEST` uses it, and it appears in the report. Use the event ID, or the event ID with a suffix if the event runs more than once. | The step above |
| `title` | The test title shown in the Playwright report. | The step above |
| `user` | Which saved session the step runs as. One of `claimantSolicitor`, `respondent1Solicitor`, `respondent2Solicitor`, `judge`, `hearingCentreAdmin`, `legalAdviser`, `nbcAdmin`, `ctscAdmin`, `newClaimantSolicitor`, `newDefendantSolicitor` (from `helpers/SessionHelper.ts`). | The step above |
| `needs` | The facts about the claim the step needs (`c.facts`). When the claim doesn't have one, the step is left out of the run, with the fact's reason. | The step above, 7.1 |
| `skipIf` | Other `[condition, reason]` pairs known before the journey starts, usually "the setting is off". When one holds, the step is left out of the run. | The step above |
| `run` | The step itself. It gets `page`, `storageState` and `user`. | The step above, 7.6 |
| `test.skip` in `run` | Skips the step for a reason only known while the journey runs. | 7.2 |
| `closesClaim` | Makes a step that closes the claim run even where the journey was stopped early. | 7.3 |
| `invalidIf` | `[condition, problem]` pairs for settings that can't be used with this step, where it also depends on how the claim goes (for example where the journey stops). They are checked before the journey starts, so the run fails at once with every problem listed. Clashes between settings alone are rules in `settings.ts` (7.4). | 7.3 |
| `group` | Steps for the same event by several users share a group and run as one numbered test. | 7.5 |
| `ctx.submitEvent` | Submits the event through its API or UI class, then waits for its business process and checks the state. | The step above, 7.6 |

What goes in `run`:

1. **Submit the event with `ctx.submitEvent(page, storageState, {...})`.** Give it:
   - `api`: the call to the API class. It is used while the journey is still fast-forwarding with `API_UNTIL`. Leave it out if the event has no API version.
   - `ui`: the call to the UI class, used otherwise. If the user's XUI session ends part way, it signs them in again, reopens the case and runs the event again from the start. For an event on a general application, also give `reopenUrl: ctx.gaCaseUrl()`.
   - `businessProcess` (optional): the business process to wait for (7.6).
   - `expectState` (optional): the state the claim should be in afterwards.

   It returns what the class returned, for events whose class returns something (such as the document it chose).
2. **Check the rest of the result.** Where the event saves data, read it with `ctx.testingEndpointHelper.getCaseData(ctx.caseId)` and check the fields with `toMatchObject`. Where the state check depends on something only known after the event, leave out `expectState` and call `ctx.assertCaseState(...)` yourself, as Amend party details does with the state from before the step.

A step whose API and UI versions do different things (for example claiming a work allocation task first, or checking different things afterwards) uses `ctx.useApi()` and `ctx.runEvent(...)` directly instead. Look at the Standard Direction Order step for an example.

### 7.1 List the facts the step needs (`needs`)

Whether a step applies to a claim mostly depends on facts about the claim: who has a solicitor, and where the claimant's response takes it. Each journey works these out once, in `playwright-tests/e2e/journey/claimFacts.ts`, and its config keeps them as `c.facts`, with the same names in both journeys. A step lists the ones it needs, and is left out of the run, with the fact's reason, when the claim doesn't have one:

```typescript
      needs: [c.facts.defendant1HasSolicitor],
```

The facts both journeys have:

| Fact | The claim |
| --- | --- |
| `defendant1HasSolicitor` | Defendant 1 has a solicitor (is not a litigant in person). |
| `notOfflineAtNotify` | Notify claim and Notify claim details did not take the claim offline. Always true for a specified claim, which has neither. |
| `everyDefendantRepresented` | Every defendant has a solicitor. A litigant in person responds through the citizen service instead. |
| `reachesJudicialReferral` | The claimant's response takes the claim to JUDICIAL_REFERRAL. For the steps from the judge's order on. |
| `reachesCaseProgression` | The judge's (or legal adviser's) order moves the claim to CASE_PROGRESSION. For the steps after it. |
| `claimantSolicitorCanCloseClaim` | The claimant's solicitor can settle or discontinue the claim (not two defendants with a litigant in person). |
| `withoutDefaultJudgment` | The claimant has not asked for default judgment. |

A specified claim also has `reachesMediation` and `notSettledInMediation`, and an unspecified claim `defendant2HasOwnSolicitor` and `claimantResponds`.

`skipIf` then only has the step's own conditions, usually "the setting is off":

```typescript
      needs: [c.facts.reachesJudicialReferral],
      skipIf: [
        [c.mySetting !== yesNo.YES, 'My event is switched off (set MY_SETTING=Yes to run it)'],
      ],
```

Each fact is a list of `[condition, reason]` pairs, the same as `skipIf`, so it can also be spread into a list of conditions that is not a step's (`...c.facts.everyDefendantRepresented`), or tested with `holds(c.facts.everyDefendantRepresented)`. The steps are wrapped in `withNeeds(...)`, which adds each step's facts to its `skipIf` straight away, as later code reads and copies a step's `skipIf`.

If your event needs a fact that isn't there yet and other steps could use it, add it to `claimFacts.ts`, for both journeys where it makes sense, with a comment.

### 7.2 Skip a step for a reason only known during the run

`skipIf` is worked out before the journey starts. Some things are only known once earlier steps have run, such as the state the journey stopped in. For those, call `test.skip(condition, reason)` as the first line of `run`. `ctx.lastStateReached` holds the claim's state after the last step. From the Dismiss case step:

```typescript
      run: async ({ page, storageState }) => {
        test.skip(!settleableStates.includes(ctx.lastStateReached), `Skipping as the case cannot be dismissed in ${ctx.lastStateReached}`);
```

`settleableStates` is a list of states in `playwright-tests/e2e/journey/claimFacts.ts`, shared by both journeys. Lists like it (`discontinuableStates`, `casemanStates`) come from the event's `PreConditionState(s)` in the CCD definition.

### 7.3 A step that closes the claim (`closesClaim` and `invalidIf`)

A step that ends the claim (settle, discontinue, dismiss, take offline) goes at the end of the list and sets `closesClaim: true`. The settle, discontinue, dismiss and take-offline steps are the same in both journeys, so they are written once, in `playwright-tests/e2e/journey/steps/closingSteps.ts` (see 7.7). It then still runs when `STOP_AT_STATE` or `STOP_AFTER_TEST` has stopped the journey earlier, so a test can close a claim wherever it stops. It also needs `invalidIf`, so the run fails straight away if the journey would stop in a state where the event isn't offered. The whole Dismiss case step:

```typescript
    {
      name: 'DISMISS_CASE',
      title: 'Hearing Centre Admin dismisses the case.',
      user: 'hearingCentreAdmin',
      closesClaim: true,
      invalidIf: (stops) => c.dismissCase === yesNo.YES ? closingProblems('DISMISS_CASE=Yes', stops, settleableStates, false) : [],
      skipIf: [
        [c.dismissCase !== yesNo.YES, 'Dismissing the case is switched off (set DISMISS_CASE=Yes to run it)'],
      ],
      run: async ({ page, storageState }) => {
        test.skip(!settleableStates.includes(ctx.lastStateReached), `Skipping as the case cannot be dismissed in ${ctx.lastStateReached}`);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.DismissCase().submit(ctx.caseId),
          ui: () => new ui.DismissCase(page).submit(),
          businessProcess: 'DISMISS_CASE',
          expectState: caseStates.CASE_DISMISSED,
        });
      },
    },
```

`invalidIf` gets `stops`, which says how the run is stopped (`stopAtState`, `stopAfterTest`). It returns a list of `[condition, problem]` pairs, or an empty list when the setting is off. `closingProblems(setting, stops, offeredIn, claimantSolicitor)` builds the usual problems for a closing step. Each journey makes it with `closingProblemsFor(c, journeyEndState)` from `closingSteps.ts`, as the state the journey ends in depends on that journey's steps, and passes it to the closing steps:

- the journey would end in a state not in `offeredIn`
- where `claimantSolicitor` is true, the claim has two defendants and one is a litigant in person (the claimant's solicitor can't settle or discontinue those)

```typescript
export function closingProblemsFor(c: JourneyConfig, journeyEndState: (stops: JourneyStops) => caseStates | undefined): ClosingProblems {
  return (setting, stops, offeredIn, claimantSolicitor) => {
    const endState = journeyEndState(stops);
    return [
      [
        claimantSolicitor && !holds(c.facts.claimantSolicitorCanCloseClaim),
        `${setting} cannot be used with CLAIM_TYPE=${c.claimType}: the claimant's solicitor cannot settle or discontinue a claim against two defendants where one is a litigant in person`,
      ],
      [
        endState !== undefined && !offeredIn.includes(endState),
        `${setting} cannot be used where the journey ends in ${endState}${stops.stopAtState ? ' (STOP_AT_STATE)' : ''}: it is only offered in ${offeredIn.join(', ')}`,
      ],
    ];
  };
}
```

The problem text should name both settings and say why they can't go together, as these do.

### 7.4 Settings that can't be used together (`settingRules`)

When your setting can't be used with another, add a rule to `settingRules` in `playwright-tests/e2e/journey/settings.ts`. Each rule names the journeys it is for and gives the problem when the settings clash. They are checked with the setting values, before the journey starts, so the run fails at once with every problem listed. A claim with default judgment never has its defendants respond, so no step that needs a response can run with `DEFAULT_JUDGMENT=Yes`. `AMEND_PARTY_DETAILS` added one line for that:

```typescript
  notWithDefaultJudgment(['SPECIFIED'], 'AMEND_PARTY_DETAILS', 'AMEND_PARTY_DETAILS=Yes'),
```

Any other clash is a rule of its own. `problem` gets the journey's settings: `get` for a setting's value (or its default), `isSet` for whether the scenario set it, and `isOn` for whether it is on (Yes, or set):

```typescript
  {
    journeys: ['SPECIFIED'],
    problem: (s) => (s.isSet('SET_ASIDE_JUDGMENT') && !s.isOn('DEFAULT_JUDGMENT')
      ? 'SET_ASIDE_JUDGMENT needs DEFAULT_JUDGMENT=Yes: only a default judgment can be set aside'
      : undefined),
  },
```

The problem text should name both settings and say why they can't go together. Then add "Cannot be used with ..." to both settings' rows in the RUNNING guide (section 11).

A clash that also depends on how the claim goes, rather than only on the settings, stays in a step's `invalidIf` (or in `validate()`): for example, the closing steps in 7.3, which depend on where the journey stops, or uploading mediation documents, which needs the claimant's response to take the claim to mediation.

Check it works by running with both settings on. The run should fail before any step, listing the problem:

```bash
ENV=aat DEFAULT_JUDGMENT=Yes AMEND_PARTY_DETAILS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

### 7.5 The same event done by several users (`group`)

When several users do the same event in turn (each solicitor uploading evidence, for example), build one step per user from a list and give them the same `group`. They sit next to each other and run as one numbered test, and `STOP_AFTER_TEST` can name either a single step or the group. Each step has its own `name` and `user`, and `run` gets the user as `user`, which the API version needs to submit as that user. From `specifiedSteps.ts`:

```typescript
  function uploadEvidenceSteps(): JourneyStep[] {
    const solicitors = [
      { name: 'UPLOAD_EVIDENCE_CLAIMANT_SOLICITOR', label: 'Claimant Solicitor', user: 'claimantSolicitor' },
      { name: 'UPLOAD_EVIDENCE_DEFENDANT1_SOLICITOR', label: 'Defendant 1 Solicitor', user: 'respondent1Solicitor' },
      { name: 'UPLOAD_EVIDENCE_DEFENDANT2_SOLICITOR', label: 'Defendant 2 Solicitor', user: 'respondent2Solicitor', defendant2: true },
    ] as const;
    return solicitors.map((solicitor) => ({
      group: 'UPLOAD_EVIDENCE',
      name: solicitor.name,
      title: `${solicitor.label} uploads evidence.`,
      user: solicitor.user,
      needs: [c.facts.reachesCaseProgression],
      skipIf: [
        ['defendant2' in solicitor && c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      ],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.UploadEvidence().submit(ctx.caseId, user, c.track),
          ui: () => new ui.UploadEvidence(page).submit(c.track),
          expectState: caseStates.CASE_PROGRESSION,
        });
      },
    }));
  }
```

The function is spread into the list of steps where the steps should run:

```typescript
    ...uploadEvidenceSteps(),
```

The API class for an event like this takes the user as a parameter, instead of using one user's credentials, as `AmendPartyDetails` does.

### 7.6 Wait for civil-service's business process

Many events start a business process in civil-service (Camunda) after they are submitted, which sends notifications, makes documents or changes the state. Wait for it to finish before checking the state, or the check can run too early. Give `ctx.submitEvent` the business process name, which is usually the event ID. It waits for it before checking `expectState`:

```typescript
        await ctx.submitEvent(page, storageState, {
          api: () => new api.DismissCase().submit(ctx.caseId),
          ui: () => new ui.DismissCase(page).submit(),
          businessProcess: 'DISMISS_CASE',
          expectState: caseStates.CASE_DISMISSED,
        });
```

Where the business process depends on something only known after the event, leave out `businessProcess` and call `ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, '<process>')` yourself, as the default judgment step does.

How long it waits is set by `BUSINESS_PROCESS_WAIT_SECONDS` (default 300). Events that don't start one, such as Amend party details, skip this. The API helper `submitEventThroughPages` already waits for any earlier business process before starting an event, so you don't need to wait before your step.

### 7.7 A step shared by both journeys (`journey/steps/`)

When a step is the same in both journeys, write it once, in a file under `playwright-tests/e2e/journey/steps/`, rather than in both `specifiedSteps.ts` and `unspecifiedSteps.ts`. The file exports a function that takes the journey's config and context, `(c, ctx)`, and returns the step. `c` is either journey's config (`JourneyConfig`), so the step reads only what both configs have, and checks `c.caseType` (`'SPECIFIED'` or `'UNSPECIFIED'`) where the journeys differ. From `stayCaseSteps.ts`:

```typescript
export function stayCase(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'STAY_CASE',
    title: 'Hearing Centre Admin stays the case.',
    user: 'hearingCentreAdmin',
    needs: [c.facts.reachesJudicialReferral],
    skipIf: [stayOff(c)],
    run: async ({ page, storageState }) => {
      await ctx.submitEvent(page, storageState, {
        api: () => new api.StayCase().submit(ctx.caseId),
        ui: () => new ui.StayCase(page).submit(),
        expectState: caseStates.CASE_STAYED,
      });
    },
  };
}
```

Each journey lists it where the step runs:

```typescript
    stayCase(c, ctx),
```

Steps that share state, such as discontinuing the claim and court staff validating the discontinuance, come from one function that returns both (`discontinueSteps` in `closingSteps.ts`), spread into the list with `...discontinueSteps(c, ctx, closingProblems)`.

A feature with several steps (send a message, then reply to it) that belongs in both journeys works the same way. The file exports a function that takes the parts of the config it needs, the journey context and anything that differs between journeys, and returns the steps. From `sendAndReplySteps.ts`:

```typescript
export function sendAndReplySteps(
  c: { sendAndReply: yesNo },
  ctx: JourneyContext,
  stateDuring: caseStates,
  skipIf: Array<[boolean, string]>,
): JourneyStep[] {
  const off: [boolean, string] = [c.sendAndReply !== yesNo.YES, 'Sending messages is switched off (set SEND_AND_REPLY=Yes to run it)'];
  if (c.sendAndReply !== yesNo.YES) {
    return [{ name: 'SEND_AND_REPLY', title: 'Court staff and a judge send each other messages.', user: 'hearingCentreAdmin', skipIf: [off], run: async () => {} }];
  }
  const message = messageToSend();
  const reply = replyTo(message);

  return [
    {
      name: 'SEND_MESSAGE',
      group: 'SEND_AND_REPLY',
      title: 'Hearing Centre Admin sends a district judge a message.',
      user: 'hearingCentreAdmin',
      skipIf,
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.SendAndReply().send(ctx.caseId, message),
          ui: () => new ui.SendAndReply(page).send(message),
        ...
```

Three things to copy from it:

- **Switched off:** when the setting is off, return a single placeholder step with the reason in `skipIf`, so the journey still lists it as switched off.
- **Shared answers:** work out values both steps need (the message and its reply) once, before the steps, so the reply step finds the message the first step sent.
- **Journey differences as parameters:** the journey's own skip conditions (`skipIf`) and the state the claim is in (`stateDuring`) are passed in, because they differ between the journeys.

Each journey then spreads it into its list, passing its own values. From `specifiedSteps.ts`:

```typescript
    ...sendAndReplySteps(c, ctx, c.stayCase === yesNo.YES ? caseStates.CASE_STAYED : caseStates.JUDICIAL_REFERRAL, c.facts.reachesJudicialReferral),
```

### 7.8 Add the step to both journeys

An event that exists on both specified and unspecified claims needs its step in both `specifiedSteps.ts` and `unspecifiedSteps.ts`, and its setting read in both config files, with a note for each journey in `settings.ts` (section 6). The two journeys differ, so check each one:

- **Where the step goes.** The steps around it differ. For example, an unspecified claim has Notify claim and Notify claim details steps that a specified claim doesn't.
- **The facts it needs.** The facts have the same names in both journeys, but a claim gets to the same point in different ways (7.1). Check which ones each journey's step needs.

Amend party details shows how a difference can still be shared. An unspecified claim can go offline at Notify claim, which a specified claim never does. Rather than two steps, both configs have the fact `notOfflineAtNotify`, which always holds for a specified claim (its list of conditions is empty), so the one step needs it in both journeys:

```typescript
    needs: [c.facts.notOfflineAtNotify, c.facts.defendant1HasSolicitor],
```

Where the journeys differ in a value rather than a fact, the shared step checks `c.caseType`. The Add case note step expects the claim to stay where it was, which is a different state in each journey:

```typescript
      await ctx.assertCaseState(specified ? caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT : caseStates.CASE_ISSUED);
```

Only write a step into both journey files when most of it differs.

## 8. Add any new case state

If the event moves the claim to a state the framework hasn't seen before, add it to `playwright-tests/enums/caseStates.ts`, using the state ID from the CCD definition. `DISMISS_CASE` did this for `CASE_DISMISSED`.

## 9. Run it

Run the journey with the new setting on, from the repository root. Run the UI version and the API version, on each claim type the event applies to.

UI version, specified 1v1 claim, stopping straight after the new step:

```bash
ENV=aat AMEND_PARTY_DETAILS=Yes STOP_AFTER_TEST=AMEND_PARTY_DETAILS npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium --headed
```

API version: fast-forward through the API past the step, so the step itself goes through the API:

```bash
ENV=aat API_UNTIL=JUDICIAL_REFERRAL AMEND_PARTY_DETAILS=Yes STOP_AFTER_TEST=AMEND_PARTY_DETAILS npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium
```

Unspecified 1v2 different solicitors, UI:

```bash
ENV=aat CLAIM_TYPE=1v2DS AMEND_PARTY_DETAILS=Yes STOP_AFTER_TEST=AMEND_PARTY_DETAILS npx playwright test playwright-tests/e2e/journeys/UnspecifiedSS.test.ts --project chromium --headed
```

Things to check:

- The step passes in both the UI and the API version.
- A setting with a wrong value fails the run straight away with your message.
- A setting combined with one it can't go with fails straight away, listing the problem.
- With the setting off, the step doesn't appear in the report.
- The journey carries on past the step and the later steps still pass (run once without `STOP_AFTER_TEST`).

## 10. Add a scenario

Add the setting to a named scenario in `playwright-tests/scenarios/specifiedScenarios.ts` or `unspecifiedScenarios.ts`, so the pipeline runs it. You can add it to an existing scenario that reaches the right point, or add a new one. The tag picks when it runs: `@spec-pr`/`@unspec-pr` on every PR, `@spec-master`/`@unspec-master` on master, `@spec-nightly`/`@unspec-nightly` every night.

`AMEND_PARTY_DETAILS` was added to an existing nightly scenario that already stops at `JUDICIAL_REFERRAL` through the API:

```typescript
  // The hearing centre admin amends the legal representatives' details and adds a case note, then dismisses the case
  {
    name: 'SPEC_1v1_FAST_DISMISS_CASE',
    tags: [NIGHTLY],
    env: { ...company1v1, ...closeAtJudicialReferral, ADD_CASE_NOTE: 'Yes', AMEND_PARTY_DETAILS: 'Yes', DISMISS_CASE: 'Yes' },
  },
```

Run the scenario by its tag to check it:

```bash
ENV=aat SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --project chromium --grep @SPEC_1v1_FAST_DISMISS_CASE
```

Keep PR scenarios few and quick: PR previews have fewer resources than AAT. Most new events belong in a nightly scenario.

## 11. Update the guides

Update the documents that describe the framework, in the same commit:

- `playwright-tests/RUNNING_SPECIFIED_TESTS.md` and/or `RUNNING_UNSPECIFIED_TESTS.md`: add the step to the list of steps in section 2 (in the order it runs), and the setting to the claim parameters table, with the same text as its note in `e2e/journey/settings.ts`. Say whether it has an API version, and which settings it can't be used with.
- The matching `.docx` guides, regenerated from the `.md` files.
- `playwright-tests/MISSING_EVENTS.md`: move the event from the Events tables to "Done since", with which scenarios passed on AAT and when.

The row added to the claim parameters table for `AMEND_PARTY_DETAILS`:

```markdown
| `AMEND_PARTY_DETAILS` | Yes, No | No | Optional step: once the defendants' solicitors are assigned, the hearing centre admin changes the legal representatives' email addresses with "Amend party details". Cannot be used with DEFAULT_JUDGMENT. Has an API version. |
```

## 12. Checklist

- [ ] Event ID, Next step name, user, states, pages and fields found in the CCD definition and tried by hand in XUI
- [ ] UI class in `flows/events/ui`, with a comment describing the event's pages
- [ ] API class in `flows/events/api`, answering the same pages the same way
- [ ] Both classes added to the `index.ts` in their folder
- [ ] Shared answers in `flows/events/shared_api_ui` if there are more than a few
- [ ] Setting declared in `e2e/journey/settings.ts`, with a note for each journey, and read in each journey's config
- [ ] Step added in the right place in each journey (written once in `journey/steps/` where it is the same in both), with the facts it `needs`, its `skipIf`, and `invalidIf` or `closesClaim` where needed
- [ ] Settings it can't be used with added to `settingRules`
- [ ] Step checks the state, and the saved case data where the event saves something
- [ ] New case states added to `enums/caseStates.ts`
- [ ] UI and API versions both passed on AAT, on each claim type the event applies to
- [ ] Setting added to a scenario with the right pipeline tag
- [ ] RUNNING guides (.md and .docx) and `MISSING_EVENTS.md` updated
- [ ] Staged diff checked for tokens, `.auth` files and local-only files before committing
