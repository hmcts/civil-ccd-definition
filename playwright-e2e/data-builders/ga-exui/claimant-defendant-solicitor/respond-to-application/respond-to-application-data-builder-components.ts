import preferredCourts from "../../../../config/preferred-courts";
import GaAgreedToOrder from "../../../../constants/ccd-events/ga-ccd-events/respond-to-application/ga-agreed-to-order";
import CaseDataHelper from "../../../../helpers/case-data-helper";
import DateHelper from "../../../../helpers/date-helper";
import { Party } from "../../../../models/users/partys";
import User from "../../../../models/users/user";
import CivilServiceRequests from "../../../../requests/civil-service-requests";

const gaAgreedToOrder = async (gaAgreedToOrder: GaAgreedToOrder, solicitorParty: Party, civilServiceRequests: CivilServiceRequests, user: User) => {
  
  return {
    ...(gaAgreedToOrder === GaAgreedToOrder.NO ? {
      generalAppRespondDocument: await civilServiceRequests.uploadTestDocument(user)
    } : {}),
    generalAppRespondent1Representative: {
      hasAgreed: gaAgreedToOrder
    },
    ...(gaAgreedToOrder === GaAgreedToOrder.NO ? {generalAppRespondReason: `General App Respond Reason - ${solicitorParty.key}`} : {}),
  }
};

const hearingDetails = (solicitorParty: Party, solicitorUser: User) => {
  const preferredCourtLocation = CaseDataHelper.setCodeToData(preferredCourts[solicitorParty.key].default);

  return {
    hearingDetailsResp: {
      hearingYesorNo: 'Yes',
      hearingDate: DateHelper.formatDateToString(DateHelper.addToToday({months: 2}), {outputFormat: 'YYYY-MM-DD'}),
      trialRequiredYesOrNo: 'No',
      trialDateFrom: DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {outputFormat: 'YYYY-MM-DD'}),
      trialDateTo: DateHelper.formatDateToString(DateHelper.addToToday({days: 5, months: 1}), {outputFormat: 'YYYY-MM-DD'}),
      HearingPreferencesPreferredType: 'TELEPHONE',
      TelephoneHearingPreferredType: `Mediator - ${solicitorParty.key}`,
      ReasonForPreferredHearingType: `Reason for preferred hearing type - ${solicitorParty.key}`,
      HearingPreferredLocation: {
        list_items: [preferredCourtLocation],
        value: preferredCourtLocation
      },
      HearingDetailsTelephoneNumber: CaseDataHelper.getPartyPhoneNumber(solicitorParty),
      HearingDetailsEmailID: solicitorUser.email,
      HearingDuration: 'OTHER',
      generalAppHearingDays: '5',
      generalAppHearingHours: '2',
      generalAppHearingMinutes: '10',
      unavailableTrialRequiredYesOrNo: 'Yes',
      generalAppUnavailableDates: [
        {
          id: CaseDataHelper.getUuid(),
          value: {
            unavailableTrialDateFrom: DateHelper.formatDateToString(DateHelper.addToToday({months: 2}), {outputFormat: 'YYYY-MM-DD'}),
            unavailableTrialDateTo: DateHelper.formatDateToString(DateHelper.addToToday({days: 5, months: 2}), {outputFormat: 'YYYY-MM-DD'}),
          },
        },
      ],
      vulnerabilityQuestionsYesOrNo: 'Yes',
      vulnerabilityQuestion: `Vulnerable witness - ${solicitorParty.key}`,
      SupportRequirement: [
        'DISABLED_ACCESS',
        'HEARING_LOOPS',
        'SIGN_INTERPRETER',
        'LANGUAGE_INTERPRETER',
        'OTHER_SUPPORT',
      ],
      SupportRequirementLanguageInterpreter: `Language - ${solicitorParty.key}`,
      SupportRequirementOther: `Other support needed - ${solicitorParty.key}`,
      SupportRequirementSignLanguage: `Sign Language - ${solicitorParty.key}`,
    }
  };
}

export default {
  gaAgreedToOrder,
  hearingDetails
};
