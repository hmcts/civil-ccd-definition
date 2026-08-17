import { defendantSolicitor1User } from '../../../../../config/users/exui-users';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import partys from '../../../../../constants/users/partys';
import CivilServiceRequests from '../../../../../requests/civil-service-requests';

const defendantLitigationFriend = async (civilServiceRequests: CivilServiceRequests) => {
  const certificateOfSuitability =
    await civilServiceRequests.uploadTestDocument(defendantSolicitor1User);

  return {
    DefendantLitigationFriend: {
      isRespondent1: 'Yes',
      respondent1LitigationFriend: {
        ...CaseDataHelper.buildLitigationFriendData(partys.DEFENDANT_1_LITIGATION_FRIEND),
        certificateOfSuitability: [CaseDataHelper.setIdToData({ document: certificateOfSuitability })],
        partyName: undefined,
      },
    },
  };
};

const addDefendantLitigationFriendDataComponents = {
  defendantLitigationFriend,
};

export default addDefendantLitigationFriendDataComponents;
