import CaseDataHelper from '../../../../../helpers/case-data-helper.ts';
import {ClaimantDefendantPartyType} from "../../../../../models/users/claimant-defendant-party-types.ts";
import partys from "../../../../../constants/users/partys.ts";
import preferredCourts from "../../../../../config/preferred-courts.ts";
const selectedHearingLocation = CaseDataHelper.setCodeToData(
  preferredCourts[partys.DEFENDANT_1.key].default,
);

const defendantDetailsSpec = (defendant1Party : ClaimantDefendantPartyType) => ({
  defendantDetailsSpec: {
    defendantDetailsSpec: {
      list_items: [CaseDataHelper.setCodeToData(CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1, defendant1Party).partyName)],
      value: CaseDataHelper.setCodeToData(CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1, defendant1Party).partyName),
    }
  },
});

const showCertifyStatementSpec = () => ({
  showCertifyStatementSpec: {
    CPRAcceptance: {
      acceptance: ['CERTIFIED'],
    }
  },
});

const claimPartialPayment = () => ({
  claimPartialPayment: {
    partialPayment:  'No',
  },
});

const fixedCostsOnEntryYesOption = () => ({
  claimFixedCostsOnEntryDJ: {
    claimFixedCostsOnEntryDJ:  'Yes',
  },
});

const paymentBreakdown = {paymentBreakdown:{}}

const paymentType = () => ({
  paymentType: {
    paymentTypeSelection:  'IMMEDIATELY',
  },
});

const requestDefaultJudgementSpecBuilderComponents = {
  defendantDetailsSpec,
  showCertifyStatementSpec,
  claimPartialPayment,
  fixedCostsOnEntryYesOption,
  paymentBreakdown,
  paymentType,
};

export default requestDefaultJudgementSpecBuilderComponents;
