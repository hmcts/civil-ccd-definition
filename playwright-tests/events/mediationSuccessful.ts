import caseStates from '../enums/caseStates.ts';
import { event } from '../e2e/journey/event.ts';
import { MediationSuccessful } from '../e2e/flows/events/ui/MediationSuccessful.ts';
import { MediationSuccessful as MediationSuccessfulApi } from '../e2e/flows/events/api/MediationSuccessful.ts';

// A small claim the claimant's response took to mediation: court staff record that mediation settled it, which stays
// the case and ends the journey. MEDIATION_UNSUCCESSFUL, the step after it, is then skipped.
export default event({
  id: 'MEDIATION_SUCCESSFUL',
  title: 'Hearing Centre Admin records that mediation was successful.',
  description: 'Optional step: mediation settles a small claim, which stays the case (CASE_STAYED) and ends the journey, instead of mediation being unsuccessful.',
  user: 'hearingCentreAdmin',
  after: { SPECIFIED: 'LIFT_STAY' },
  onlyWhen: ['reachesMediation'],
  ui: ({ page }) => new MediationSuccessful(page).submit(),
  api: ({ caseId }) => new MediationSuccessfulApi().submit(caseId),
  expect: { state: caseStates.CASE_STAYED, businessProcess: 'MEDIATION_SUCCESSFUL' },
});
