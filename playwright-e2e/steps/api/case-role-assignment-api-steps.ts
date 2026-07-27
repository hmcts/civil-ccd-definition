import { AllMethodsStep } from '../../decorators/test-steps';
import User from '../../models/users/user';
import BaseApi from '../../base/base-api';
import { defendantSolicitor1User, defendantSolicitor2User } from '../../config/users/exui-users';
import CaseRole from '../../constants/cases/case-role';
import UserAssignedCasesHelper from '../../helpers/user-assigned-cases-helper';

@AllMethodsStep()
export default class CaseRoleAssignmentApiSteps extends BaseApi {
  async AssignCaseRoleToDS1() {
    await this.setupApiStep(defendantSolicitor1User);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.assignCaseToDefendant(
      defendantSolicitor1User,
      CaseRole.RESPONDENT_SOLICITOR_ONE,
      this.ccdCaseData?.id,
    );
    await super.fetchAndSetCCDCaseData();
    UserAssignedCasesHelper.addAssignedCaseToUser(defendantSolicitor1User, this.ccdCaseData?.id);
  }

  async AssignCaseRoleToDS2() {
    await this.setupApiStep(defendantSolicitor2User);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.assignCaseToDefendant(
      defendantSolicitor2User,
      CaseRole.RESPONDENT_SOLICITOR_TWO,
      this.ccdCaseData?.id,
    );
    await super.fetchAndSetCCDCaseData();
    UserAssignedCasesHelper.addAssignedCaseToUser(defendantSolicitor2User, this.ccdCaseData?.id);
  }

  async UnassignCasesForUser(user: User) {
    await this.setupApiStep(user);
    const { civilServiceRequests } = this.requestsFactory;
    const assignedCases = await UserAssignedCasesHelper.getUserAssignedCases(user);

    // It seems that CCD doesn't like large arrays of users to unassign cases from
    // Seeing 500 error - chunking the array (into an array of arrays) alleviates
    // this issue - only seeing this on the nightly pipeline due to the number of
    // cases being generated

    if (assignedCases) {
      const chunkedArray = [];
      const size = 5;  // if the 500 error resurfaces, then increase this value
      for (let i = 0; i < assignedCases.length; i += size) {
        chunkedArray.push(assignedCases.slice(i, i + size));
      }

      if (chunkedArray.length > 0) {
        for (let i = 0; i < chunkedArray.length; i++) {
          console.log('assignedCases: ', chunkedArray[i]);
          await civilServiceRequests.unassignUserFromCases(user, chunkedArray[i]);
        }
      }
    }
  }
}
