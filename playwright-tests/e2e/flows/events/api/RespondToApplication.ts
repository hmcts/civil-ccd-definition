import CaseType from '../../../../enums/caseType.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';

// The other side's solicitor responds to a general application made with notice (RESPOND_TO_APPLICATION, on the
// application) through the CCD API, instead of the event's pages in XUI: to an application the applicant said they
// agreed to, they confirm it; to any other, they do not agree, giving a reason and a supporting document. Either way
// they want an in person hearing at Clerkenwell if one is needed. civil-service then sends the
// application to a judge or legal adviser (APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION).
export class RespondToApplication {
  private ccdApiHelper = new CcdApiHelper(CaseType.GENERAL_APPLICATION);

  async submit(applicationCaseId: string, user: SessionUserKey) {
    const credentials = sessionUsers[user].credentials;
    const document = await new TestingEndPointHelper().uploadTestDocument(credentials);
    await this.ccdApiHelper.submitEventThroughPages(credentials, 'RESPOND_TO_APPLICATION', applicationCaseId, [
      // An application the applicant said was agreed (civil-service sets generalAppConsentOrder)
      {
        page: 'GARespondentConsent',
        when: (data) => Boolean(data.generalAppConsentOrder),
        answers: { gaRespondentConsent: 'Yes' },
      },
      {
        page: 'GARespondent1RespScreen',
        when: (data) => data.generalAppVaryJudgementType !== 'Yes' && !data.generalAppConsentOrder,
        answers: {
          generalAppRespondent1Representative: { hasAgreed: 'No' },
          generalAppRespondReason: 'The respondent does not agree, a reason given by playwright-tests',
          generalAppRespondDocument: [{ value: document }],
        },
      },
      {
        page: 'GARespHearingScreen',
        answers: (data) => {
          const courts = data.hearingDetailsResp?.HearingPreferredLocation;
          const court = courts?.list_items?.find((item) => /clerkenwell/i.test(item.label)) ?? courts?.list_items?.[0];
          return {
            hearingDetailsResp: {
              hearingYesorNo: 'No',
              judgeRequiredYesOrNo: 'No',
              trialRequiredYesOrNo: 'No',
              HearingPreferencesPreferredType: 'IN_PERSON',
              ReasonForPreferredHearingType: 'In person hearing preferred by playwright-tests',
              HearingPreferredLocation: { list_items: courts?.list_items ?? [], value: court },
              HearingDetailsTelephoneNumber: '07123456789',
              HearingDetailsEmailID: credentials.username,
              HearingDuration: 'MINUTES_15',
              unavailableTrialRequiredYesOrNo: 'No',
              vulnerabilityQuestionsYesOrNo: 'No',
            },
          };
        },
      },
    ]);
    console.log(`RESPOND_TO_APPLICATION submitted through the API as ${user} on application ${applicationCaseId}`);
  }
}
