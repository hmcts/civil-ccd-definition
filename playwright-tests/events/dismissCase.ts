import caseStates from '../enums/caseStates.ts';
import { settleableStates } from '../e2e/journey/claimFacts.ts';
import { event } from '../e2e/journey/event.ts';
import { DismissCase } from '../e2e/flows/events/ui/DismissCase.ts';
import { DismissCase as DismissCaseApi } from '../e2e/flows/events/api/DismissCase.ts';

// The hearing centre admin dismisses the case with "Dismiss case", which moves it to CASE_DISMISSED and tells the
// parties. It is offered in the same states as "Settle this claim" (not CASE_STAYED).
export default event({
  id: 'DISMISS_CASE',
  title: 'Hearing Centre Admin dismisses the case.',
  description: {
    SPECIFIED: 'Optional step, once the rest of the journey has run or where it is stopped: the hearing centre admin dismisses the case with "Dismiss case", which moves it to CASE_DISMISSED. Cannot be used with SETTLE_CLAIM, DISCONTINUE_CLAIM or CASE_PROCEEDS_IN_CASEMAN. Has an API version.',
    UNSPECIFIED: 'Optional event, once the rest of the journey has run or where STOP_AT_STATE or STOP_AFTER_TEST stops it: the hearing centre admin dismisses the case with "Dismiss case", which moves it to CASE_DISMISSED and tells the parties. It is offered in the same states as "Settle this claim", but not CASE_STAYED. Cannot be used with SETTLE_CLAIM, DISCONTINUE_CLAIM or CASE_PROCEEDS_IN_CASEMAN. Has an API version.',
  },
  user: 'hearingCentreAdmin',
  closesClaim: { offeredIn: settleableStates },
  ui: ({ page }) => new DismissCase(page).submit(),
  api: ({ caseId }) => new DismissCaseApi().submit(caseId),
  expect: { state: caseStates.CASE_DISMISSED, businessProcess: 'DISMISS_CASE' },
});
