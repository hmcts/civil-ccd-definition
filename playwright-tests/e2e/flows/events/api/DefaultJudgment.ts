import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// The claimant's solicitor requests default judgment on an unspecified claim (DEFAULT_JUDGEMENT) through the CCD API,
// instead of the event's pages in XUI, with the same answers as the UI: against every defendant, with a disposal
// hearing the claimant asks to attend in person at the court the claim is issued at. The defendant page's mid event
// callback says whether it is against one defendant or both, which decides the statements page, and the hearing type
// page's callback fills in the list of courts.
export class DefaultJudgment {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    await this.ccdApiHelper.submitEventThroughPages(claimantSolicitorCredentials, 'DEFAULT_JUDGEMENT', caseId, [
      {
        page: 'defendantDetails',
        answers: (data) => {
          const options = data.defendantDetails;
          const choice = options.list_items.find((item) => item.label === 'Both Defendants') ?? options.list_items[0];
          return { defendantDetails: { ...options, value: choice } };
        },
      },
      { page: 'showcertifystatement', when: (data) => data.bothDefendants === 'One', answers: { CPRAcceptance: { acceptance: ['CERTIFIED'] } } },
      {
        page: 'showcertifystatementboth',
        when: (data) => data.bothDefendants === 'Both Defendants',
        answers: { CPRAcceptance2Def: { acceptance: ['CERTIFIED'] } },
      },
      {
        page: 'abandonOtherRemedyPage',
        when: (data) => data.isClaimDeclarationAdded === 'Yes' && ['HOUSING_DISREPAIR', 'DAMAGES_AND_OTHER_REMEDY'].includes(data.claimTypeUnSpec),
        answers: { isOtherRemedyAbandoned: 'Yes' },
      },
      { page: 'HearingType', answers: { hearingSelection: 'DISPOSAL_HEARING', detailsOfDirection: 'Directions requested by playwright-tests' } },
      {
        page: 'HearingSupportRequirementsFieldDJ',
        answers: (data) => {
          const requirements = data.hearingSupportRequirementsDJ ?? {};
          const courts = requirements.hearingTemporaryLocation;
          const court = courts?.list_items?.find((item) => /Clerkenwell/i.test(item.label)) ?? courts?.list_items?.[0];
          if (!court) {
            throw new Error('The hearing court list is empty');
          }
          return {
            hearingSupportRequirementsDJ: {
              ...requirements,
              hearingType: 'IN_PERSON',
              hearingTemporaryLocation: { ...courts, value: court },
              hearingPreferredTelephoneNumber1: '07444552365',
              hearingPreferredEmail: 'claimant@example.com',
              hearingUnavailableDates: 'No',
              hearingSupportQuestion: 'No',
            },
          };
        },
      },
    ]);
    console.log(`DEFAULT_JUDGEMENT submitted through the API on case ${caseId}`);
  }
}
