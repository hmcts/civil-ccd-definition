import CaseDataHelper from "../../../../helpers/case-data-helper";
import User from "../../../../models/users/user";
import CivilServiceRequests from "../../../../requests/civil-service-requests";

const generalAppAddlnInfoUpload = async (civilServiceRequests: CivilServiceRequests, solicitorUser: User) => {
  const addInfoDoc = await civilServiceRequests.uploadTestDocument(solicitorUser);

  return {
    generalAppAddlnInfoUpload: [CaseDataHelper.setIdToData(addInfoDoc)],
  };
};

export default {
  generalAppAddlnInfoUpload,
};
