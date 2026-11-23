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
