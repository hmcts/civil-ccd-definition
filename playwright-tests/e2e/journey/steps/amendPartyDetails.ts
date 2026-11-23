import { expect } from '@playwright/test';
import { claimantSolicitorCredentials, respondent1SolicitorCredentials } from '../../../civilConfig.ts';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import yesNo from '../../../enums/yesNo.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// The hearing centre admin changes the legal representatives' email addresses with "Amend party details": Defendant
// 1's solicitor's to the address they sign in with (the claim was created with a made-up one), and the claimant's
// solicitor's to theirs. Only run with AMEND_PARTY_DETAILS=Yes, where Defendant 1 has a solicitor and the claim did
// not go offline at Notify claim (unspecified only). The claim's state does not change.
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
