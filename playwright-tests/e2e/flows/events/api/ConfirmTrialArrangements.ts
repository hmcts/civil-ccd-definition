import { CcdApiHelper, EventPage } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// Confirms the case is ready for trial (TRIAL_READINESS, "Confirm trial arrangements") as a solicitor through the CCD
// API, instead of the event's pages in XUI. The about to start callback says whose page the solicitor gets (isApplicant1,
// isRespondent1, isRespondent2); a solicitor acting for both defendants (1v2 same solicitor) also answers for Defendant
// 2, as in the UI. Each party is ready for trial, with no change to their hearing requirements.
export class ConfirmTrialArrangements {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, user: SessionUserKey) {
    const ready = (page: string, field: string, prefix: string): EventPage => ({
      page,
      answers: {
        [field]: 'Yes',
        [`${prefix}RevisedHearingRequirements`]: { revisedHearingRequirements: 'No' },
        [`${prefix}HearingOtherComments`]: { hearingOtherComments: 'Trial arrangements confirmed by playwright-tests' },
      },
    });
    const pages: Record<string, EventPage> = {
      claimant: ready('ConfirmReadyClaimant', 'trialReadyApplicant', 'applicant'),
      defendant1: ready('ConfirmReadyDefendant1', 'trialReadyRespondent1', 'respondent1'),
      defendant2: ready('ConfirmReadyDefendant2', 'trialReadyRespondent2', 'respondent2'),
    };
    const caseRolePages = (data: Record<string, any>): EventPage[] => {
      if (data.isApplicant1 === 'Yes') {
        return [pages.claimant];
      }
      if (data.isRespondent1 === 'Yes') {
        return data.respondent2SameLegalRepresentative === 'Yes' ? [pages.defendant1, pages.defendant2] : [pages.defendant1];
      }
      return [pages.defendant2];
    };
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'TRIAL_READINESS', caseId, caseRolePages);
    console.log(`TRIAL_READINESS submitted through the API as ${user} on case ${caseId}`);
  }
}
