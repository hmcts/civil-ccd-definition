import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';
import CCDCaseData from '../../../../../models/ccd-case-data';

const confirmNameAddress = (ccdCaseData: CCDCaseData) => {
  const respondent1 = structuredClone(ccdCaseData.respondent1);

  return {
    ConfirmNameAddress: {
      respondent1,
      respondent1Copy: respondent1,
    },
  };
};

const responseIntention = {
  ResponseIntention: {
    respondent1ClaimResponseIntentionType: DefendantResponseType.FULL_DEFENCE,
  },
};

const solicitorReferences = (ccdCaseData: CCDCaseData) => {
const solicitorReferences = structuredClone(ccdCaseData.solicitorReferences);

  return{
    SolicitorReferences: {
      solicitorReferences,
      solicitorReferencesCopy: solicitorReferences,
    },
  };
};

const acknowledgeClaimDataBuilderComponents = {
  confirmNameAddress,
  responseIntention,
  solicitorReferences,
};

export default acknowledgeClaimDataBuilderComponents;
