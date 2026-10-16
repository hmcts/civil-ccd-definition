import { z } from 'zod';
import JudicialDecision from '../../../../constants/ccd-events/ga-ccd-events/make-decision/judicial-decision';

const nonEmptyString = z.string().min(1);

const judicialDecision = (judicialDecision: JudicialDecision) => ({
  judicialDecision: z.looseObject({
    decision: z.literal(judicialDecision),
  }),
});

const judicialDecisionRequestMoreInfo = (judicialDecision: JudicialDecision) => {
  if (judicialDecision === JudicialDecision.REQUEST_MORE_INFO) {
    return {
      judicialDecisionRequestMoreInfo: z.looseObject({
        judgeRecitalText: nonEmptyString,
        judgeRequestMoreInfoText: nonEmptyString,
        judgeRequestMoreInfoByDate: nonEmptyString,
      }),
      requestForInformationDocument: z.array(z.looseObject({})).min(1),
    };
  }

  return {};
};

const judicialListForHearing = (judicialDecision: JudicialDecision) => {
  if (judicialDecision === JudicialDecision.LIST_FOR_A_HEARING) {
    return {
      judicialListForHearing: z.looseObject({
        hearingPreferencesPreferredType: nonEmptyString,
        judicialTimeEstimate: nonEmptyString,
        judicialVulnerabilityText: nonEmptyString,
        judgeSignLanguage: nonEmptyString,
        judgeLanguageInterpreter: nonEmptyString,
        judgeOtherSupport: nonEmptyString,
        addlnInfoCourtStaff: nonEmptyString,
        judicialSupportRequirement: z.array(nonEmptyString).min(1),
      }),
    };
  }

  return {};
};

const hearingDetails = (judicialDecision: JudicialDecision) => {
  if (judicialDecision === JudicialDecision.LIST_FOR_A_HEARING) {
    return {
      judicialHearingGeneralOrderHearingText: nonEmptyString,
      judicialGeneralOrderHearingEstimationTimeText: nonEmptyString,
      judicialHearingGOHearingReqText: nonEmptyString,
      judicialGeneralHearingOrderRecital: nonEmptyString,
      judicialGOHearingDirections: nonEmptyString,
      judicialByCourtsInitiativeListForHearing: nonEmptyString,
      orderWithoutNoticeListForHearing: z.looseObject({
        orderWithoutNotice: nonEmptyString,
        orderWithoutNoticeDate: nonEmptyString,
      }),
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
