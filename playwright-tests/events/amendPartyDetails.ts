import { expect } from '@playwright/test';
import { claimantSolicitorCredentials, respondent1SolicitorCredentials } from '../civilConfig.ts';
import { event } from '../e2e/journey/event.ts';
import { AmendPartyDetails } from '../e2e/flows/events/ui/AmendPartyDetails.ts';
import { AmendPartyDetails as AmendPartyDetailsApi } from '../e2e/flows/events/api/AmendPartyDetails.ts';

// The hearing centre admin changes the legal representatives' email addresses with "Amend party details": Defendant
// 1's solicitor's to the address they sign in with (the claim was created with a made-up one), and the claimant's
// solicitor's to theirs.
export default event({
  id: 'AMEND_PARTY_DETAILS',
  title: 'Hearing Centre Admin amends the legal representatives\' email addresses.',
  description: {
    SPECIFIED: 'Optional step: once the defendants\' solicitors are assigned, the hearing centre admin changes the legal representatives\' email addresses with "Amend party details". Cannot be used with DEFAULT_JUDGMENT. Has an API version.',
    UNSPECIFIED: 'Optional event: once Notify claim details has run, the hearing centre admin changes the legal representatives\' email addresses with "Amend party details": Defendant 1\'s solicitor\'s to the address they sign in with (the claim is created with a made-up one) and the claimant\'s solicitor\'s to theirs. The test checks they were saved. Skipped where Defendant 1 is a litigant in person or the claim went offline when notified. Has an API version.',
  },
  user: 'hearingCentreAdmin',
  after: { SPECIFIED: 'ASSIGN_DEFENDANT_SOLICITORS', UNSPECIFIED: 'NOTIFY_CLAIM_DETAILS' },
  onlyWhen: ['notOfflineAtNotify', 'defendant1HasSolicitor'],
  answers: () => ({
    defendant1Solicitor: respondent1SolicitorCredentials.username,
    claimantSolicitor: claimantSolicitorCredentials.username,
  }),
  ui: ({ page, answers }) => new AmendPartyDetails(page).submit(answers),
  api: ({ caseId, answers }) => new AmendPartyDetailsApi().submit(caseId, answers),
  check: ({ caseData, answers }) => {
    expect(caseData, 'The amended email addresses were not saved').toMatchObject({
      specRespondentSolicitor1EmailAddress: answers.defendant1Solicitor,
      respondentSolicitor1EmailAddress: answers.defendant1Solicitor,
      applicantSolicitor1UserDetails: { email: answers.claimantSolicitor },
    });
  },
});
