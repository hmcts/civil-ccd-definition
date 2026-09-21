import preferredCourts from "../../../../config/preferred-courts";
import GaTypeLr from "../../../../constants/ccd-events/ccd-events/initiate-general-application/ga-type-lr";
import GaUrgency from "../../../../constants/ccd-events/ccd-events/initiate-general-application/ga-urgency";
import RespondentAgreed from "../../../../constants/ccd-events/ccd-events/initiate-general-application/respondent-agreed";
import WithNotice from "../../../../constants/ccd-events/ccd-events/initiate-general-application/with-notice";
import CaseDataHelper from "../../../../helpers/case-data-helper";
import DateHelper from "../../../../helpers/date-helper";
import { Party } from "../../../../models/users/partys";
import User from "../../../../models/users/user";
import CivilServiceRequests from "../../../../requests/civil-service-requests";

const hearingScheduledDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {outputFormat: 'YYYY-MM-DD'});

const typePage = (gaTypesLr: GaTypeLr[]) => {
  return {
    TypePage: {
      generalAppTypeLR: {
        types: gaTypesLr
      }
    }
  }
};

const hearingDate = () => {
  return {
    HearingDate: {
      generalAppHearingDate: {
        hearingScheduledPreferenceYesNo: 'Yes',
        hearingScheduledDate: DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {outputFormat: 'YYYY-MM-DD'}),
      }
    }
  }
};

const defendantAgreementPage = (respondentAgreed: RespondentAgreed) => {
  return {
    RespondentAgreementPage: {
      generalAppRespondentAgreement: {
        hasAgreed: respondentAgreed
      }
    }
  }
};

const gaUrgencyRecordPage = (gaUrgency: GaUrgency, solicitorParty: Party) => {
  return {
    GAUrgencyRecordPage: {
      generalAppUrgencyRequirement: {
        generalAppUrgency: gaUrgency,
        ...(gaUrgency === GaUrgency.YES ? {
          reasonsForUrgency: `Reason for urgency - ${solicitorParty.key}`,
          urgentAppConsiderationDate: DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {outputFormat: 'YYYY-MM-DD'}),
        } : {})
      }
    }
  }
};

const gaWithOrWithoutNoticePage = (withNotice: WithNotice, solicitorParty: Party) => {
  return {
    GAWithOrWithoutNoticePage: {
      generalAppInformOtherParty: {
        isWithNotice: withNotice,
        ...(withNotice === WithNotice.NO ? {reasonsForWithoutNotice: `Without notice reason - ${solicitorParty.key}`} : {})
      }
    }
  }
}

const statementOfTruth = async (civilServiceRequests: CivilServiceRequests, solicitorParty: Party, solicitorUser: User) => {
  const gaEvidenceDoc = await civilServiceRequests.uploadTestDocument(solicitorUser);
  return {
    StatementOfTruth: {
      generalAppDetailsOfOrder: `Details of court order - ${solicitorParty.key}`,
      generalAppReasonsOfOrder: `Reasons for requesting this order - ${solicitorParty.key}`,
      generalAppStatementOfTruthConsent: ['ConsentAgreementCheckBox'],
      generalAppEvidenceDocument: [{value: gaEvidenceDoc}],
      generalAppStatementOfTruth: {
        name: solicitorUser.name,
        role: 'Solicitor'
      }
    }
  }
};

const hearingDetails = (solicitorParty: Party, solicitorUser: User) => {
  const preferredCourtLocation = CaseDataHelper.setCodeToData(preferredCourts[solicitorParty.key].default);

  return {
    HearingDetails: {
      generalAppHearingDetails: {
        hearingYesorNo: 'Yes',
        hearingDate: DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {outputFormat: 'YYYY-MM-DD'}),
        trialRequiredYesOrNo: 'Yes',
        trialDateFrom: DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {outputFormat: 'YYYY-MM-DD'}),
        // trialDateTo: DateHelper.formatDateToString(DateHelper.addToToday({days: 5, months: 1}), {outputFormat: 'YYYY-MM-DD'}),
        HearingPreferencesPreferredType: 'IN_PERSON',
        ReasonForPreferredHearingType: `Reason for preferred hearing type - ${solicitorParty.key}`,
        HearingPreferredLocation: {
          list_items: [preferredCourtLocation],
          value: preferredCourtLocation
        },
        HearingDetailsTelephoneNumber: CaseDataHelper.getPartyPhoneNumber(solicitorParty),
        HearingDetailsEmailID: solicitorUser.email,
        HearingDuration: 'MINUTES_15',
        generalAppUnavailableDates: [
          {
            value: {
              unavailableTrialDateFrom: DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {outputFormat: 'YYYY-MM-DD'}),
              unavailableTrialDateTo: DateHelper.formatDateToString(DateHelper.addToToday({days: 5, months: 1}), {outputFormat: 'YYYY-MM-DD'}),
            }
          }
        ],
        vulnerabilityQuestionsYesOrNo: 'Yes',
        vulnerabilityQuestion: `Vulnerability and support details - ${solicitorParty.key}`,
        SupportRequirement: [
          'DISABLED_ACCESS',
          'HEARING_LOOPS',
          'SIGN_INTERPRETER',
          'LANGUAGE_INTERPRETER',
          'OTHER_SUPPORT'
        ],
        SupportRequirementLanguageInterpreter: `Language - ${solicitorParty.key}`,
        SupportRequirementOther: `Other support requirement - ${solicitorParty.key}`,
        SupportRequirementSignLanguage: `Sign language - ${solicitorParty.key}`
      }
    }
  }
};


const gaPbaDetailsGaSpec = async (
  civilServiceRequests: CivilServiceRequests, 
  gaTypesLr: GaTypeLr[], 
  respondentAgreed: RespondentAgreed, 
  withNotice: WithNotice,
  solicitorUser: User
) => {
  const gaFee = await civilServiceRequests.getGaClaimFeeData(solicitorUser, {gaTypesLr, respondentAgreed, withNotice, hearingDate: hearingScheduledDate})
  return {
    GAPBADetailsGASpec: {
      generalAppPBADetails: {
        fee: gaFee,
        generalAppFeeToPayInText: `£${(Number(gaFee.calculatedAmountInPence)/100).toFixed(2)}`
      }
    }
  }
}


const initiateGeneralApplicationDataBuilderComponents = {
  typePage,
  hearingDate,
  defendantAgreementPage,
  gaUrgencyRecordPage,
  gaWithOrWithoutNoticePage,
  statementOfTruth,
  hearingDetails,
  gaPbaDetailsGaSpec
};

export default initiateGeneralApplicationDataBuilderComponents;
