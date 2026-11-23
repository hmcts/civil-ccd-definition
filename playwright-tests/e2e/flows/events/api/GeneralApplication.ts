import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import yesNo from '../../../../enums/yesNo.ts';
import moment from 'moment-business-days';
import { workingDayAfter } from '../../../../helpers/WorkingDayHelper.ts';

// What a general application asks for: its types (one or more, as the claim's INITIATE_GENERAL_APPLICATION lists
// them, e.g. STAY_THE_CLAIM), whether the other side has agreed to it, when they have not, whether it is made with
// notice to them, and whether it is urgent
export interface GeneralApplicationAnswers {
  types: string[];
  respondentAgreed: yesNo;
  withNotice: yesNo;
  urgent: yesNo;
}

// Why an urgent application is urgent, and the date to consider it by: a working day a week away, as it cannot be in the
// past
export const urgencyReason = 'Urgent, a reason given by playwright-tests';
export async function urgentConsiderationDate(): Promise<string> {
  return workingDayAfter(moment().format('YYYY-MM-DD'), 7);
}

// Makes a general application on a claim (INITIATE_GENERAL_APPLICATION, "Make an application") through the CCD API,
// instead of the event's pages in XUI, with the same answers as the UI: urgent or not, no hearing date to mention, an
// evidence document, an in person hearing at Clerkenwell if one is needed, and the fee the last page shows.
// civil-service then creates the application as a case of its own (CIVIL / GENERALAPPLICATION) linked to the claim,
// waiting for its fee to be paid. Returns the application's case ID.
export class GeneralApplication {
  private ccdApiHelper = new CcdApiHelper();
  private testingEndPointHelper = new TestingEndPointHelper();

  async submit(claimCaseId: string, user: SessionUserKey, answers: GeneralApplicationAnswers): Promise<string> {
    const credentials = sessionUsers[user].credentials;
    const knownApplications = await this.testingEndPointHelper.generalApplicationCaseIds(claimCaseId);
    const evidence = await this.testingEndPointHelper.uploadTestDocument(credentials);
    const notAgreed = answers.respondentAgreed === yesNo.NO;

    await this.ccdApiHelper.submitEventThroughPages(credentials, 'INITIATE_GENERAL_APPLICATION', claimCaseId, [
      { page: 'GATypePage', answers: { generalAppTypeLR: { types: answers.types } } },
      { page: 'GAHearingDate', answers: { generalAppHearingDate: { hearingScheduledPreferenceYesNo: 'No' } } },
      { page: 'GARespondentAgreementPage', answers: { generalAppRespondentAgreement: { hasAgreed: answers.respondentAgreed } } },
      {
        page: 'GAUrgencyRecordPage',
        answers: {
          generalAppUrgencyRequirement: answers.urgent === yesNo.YES
            ? {
              generalAppUrgency: 'Yes',
              reasonsForUrgency: urgencyReason,
              urgentAppConsiderationDate: await urgentConsiderationDate(),
              // Certifying that the urgent procedure is justified, as the UI asks
              ConsentAgreementCheckBox: ['ConsentAgreementCheckBox'],
            }
            : { generalAppUrgency: 'No' },
        },
      },
      {
        page: 'GAWithOrWithoutNoticePage',
        when: (data) => notAgreed && data.generalAppVaryJudgementType !== 'Yes',
        answers: {
          generalAppInformOtherParty: answers.withNotice === yesNo.YES
            ? { isWithNotice: 'Yes' }
            : { isWithNotice: 'No', reasonsForWithoutNotice: 'Application made without notice by playwright-tests' },
        },
      },
      {
        page: 'StatementOfTruth',
        answers: {
          generalAppDetailsOfOrder: `The order sought: ${answers.types.join(', ')}`,
          generalAppReasonsOfOrder: 'Reasons given by playwright-tests',
          generalAppEvidenceDocument: [{ value: evidence }],
          generalAppStatementOfTruthConsent: ['ConsentAgreementCheckBox'],
          generalAppStatementOfTruth: { name: credentials.name, role: 'Solicitor' },
        },
      },
      {
        page: 'HearingDetails',
        answers: (data) => {
          const courts = data.generalAppHearingDetails?.HearingPreferredLocation;
          const court = courts?.list_items?.find((item) => /clerkenwell/i.test(item.label)) ?? courts?.list_items?.[0];
          return {
            generalAppHearingDetails: {
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
      // The fee, which the hearing details page's callback works out, is shown and submitted as it is
      { page: 'GAPBADetailsGAspec' },
    ]);

    const applicationCaseId = await this.testingEndPointHelper.waitForNewGeneralApplication(claimCaseId, knownApplications);
    console.log(`INITIATE_GENERAL_APPLICATION (${answers.types.join(', ')}) submitted through the API on case ${claimCaseId}: application ${applicationCaseId}`);
    return applicationCaseId;
  }
}
