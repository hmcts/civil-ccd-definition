import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// The claimant's solicitor requests default judgment on a specified claim (DEFAULT_JUDGEMENT_SPEC) through the CCD
// API, instead of the event's pages in XUI, with the same answers as the UI: against every defendant, nothing paid, no
// fixed costs, paid immediately. The defendant page's mid event callback says whether it is against one defendant or
// both, which decides the statements page, and the fixed costs page's callback works out the amounts owed.
export class DefaultJudgmentSpec {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, user: SessionUserKey = 'claimantSolicitor') {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'DEFAULT_JUDGEMENT_SPEC', caseId, [
      {
        page: 'defendantDetailsSpec',
        answers: (data) => {
          const options = data.defendantDetailsSpec;
          const choice = options.list_items.find((item) => item.label === 'Both Defendants') ?? options.list_items[0];
          return { defendantDetailsSpec: { ...options, value: choice } };
        },
      },
      { page: 'showCertifyStatementSpec', when: (data) => data.bothDefendantsSpec === 'One', answers: { CPRAcceptance: { acceptance: ['CERTIFIED'] } } },
      {
        page: 'showCertifyStatementSpecMultipleDefendant',
        when: (data) => data.bothDefendantsSpec === 'Both Defendants',
        answers: { CPRAcceptance2Def: { acceptance: ['CERTIFIED'] } },
      },
      { page: 'claimPartialPayment', answers: { partialPayment: 'No' } },
      { page: 'fixedCostsOnEntry', when: (data) => data.showDJFixedCostsScreen === 'Yes', answers: { claimFixedCostsOnEntryDJ: 'No' } },
      { page: 'paymentConfirmationSpec', when: (data) => data.showOldDJFixedCostsScreen === 'Yes', answers: { paymentConfirmationDecisionSpec: 'No' } },
      { page: 'paymentType', answers: { paymentTypeSelection: 'IMMEDIATELY' } },
    ]);
    console.log(`DEFAULT_JUDGEMENT_SPEC submitted through the API on case ${caseId}`);
  }
}
