import JudicialDecision from "../../../../constants/ccd-events/ga-ccd-events/make-decision/judicial-decision";
import DateHelper from '../../../../helpers/date-helper';

const judicialDecision = (judicialDecision: JudicialDecision) => {
  return {
    judicialDecision: {
      decision: judicialDecision,
    },
  };
};

const judicialDecisionRequestMoreInfo = (judicialDecision: JudicialDecision) => {
  if (judicialDecision === JudicialDecision.REQUEST_MORE_INFO) {
    return {
      judicialDecisionRequestMoreInfo: {
        judgeRecitalText: 'string',
        judgeRequestMoreInfoText: 'string',
        judgeRequestMoreInfoByDate: DateHelper.formatDateToString(DateHelper.addToToday({ days: 7 }), {
          outputFormat: 'YYYY-MM-DD',
        }),
      },
    };
  }

  return {};
};

const judicialListForHearing = (judicialDecision: JudicialDecision) => {
  if (judicialDecision === JudicialDecision.LIST_FOR_A_HEARING) {
    return {
      judicialListForHearing: {
        hearingPreferencesPreferredTypeLabel1: 'string',
        hearingPreferencesPreferredType: 'VIDEO',
        judgeHearingCourtLocationText1:
          'string.',
        judgeHearingTimeEstimateText1: 'string',
        judicialTimeEstimate: 'MINUTES_15',
        judicialVulnerabilityText:
          'string',
        judgeHearingSupportReqText1:
          'string',
        judgeSignLanguage: 'Sign Language',
        judgeLanguageInterpreter: 'Spanish',
        judgeOtherSupport: 'Support',
        addlnInfoCourtStaff: 'Additional Information',
        judicialSupportRequirement: [
          'DISABLED_ACCESS',
          'HEARING_LOOPS',
          'SIGN_INTERPRETER',
          'LANGUAGE_INTERPRETER',
          'OTHER_SUPPORT',
        ],
      },
    };
  }

  return {};
};

const hearingDetails = (judicialDecision: JudicialDecision) => {
  if (judicialDecision === JudicialDecision.LIST_FOR_A_HEARING) {
    return {
      judicialHearingGeneralOrderHearingText: 'string',
      judicialGeneralOrderHearingEstimationTimeText: 'string',
      judicialHearingGOHearingReqText: 'string',
      judicialGeneralHearingOrderRecital: 'string',
      judicialGOHearingDirections: 'string',
      judicialByCourtsInitiativeListForHearing: 'OPTION_2',
      orderWithoutNoticeListForHearing: {
        orderWithoutNotice:'string',
        orderWithoutNoticeDate: DateHelper.formatDateToString(DateHelper.addToToday({ days: 7 }), {
          outputFormat: 'YYYY-MM-DD',
        }),
      },
    };
  }

  return {};
};

export default {
  judicialDecision,
  judicialDecisionRequestMoreInfo,
  judicialListForHearing,
  hearingDetails,
};
