import { AllMethodsStep } from '../../decorators/test-steps';
import BaseApiSteps from '../../base/base-api-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../models/test-data';
import User from '../../models/user';
import UserAssignedCasesHelper from '../../helpers/user-assigned-cases-helper';
import { defendantSolicitor1User, defendantSolicitor2User } from '../../config/users/exui-users';
import CaseRole from '../../enums/case-role';

@AllMethodsStep()
export default class ApiCaseRoleAssignmentSteps extends BaseApiSteps {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  async AssignCaseRoleToDefendant1() {
    await this.setupUserData(defendantSolicitor1User);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.assignCaseToDefendant(
      defendantSolicitor1User,
      this.ccdCaseData.id,
      CaseRole.RESPONDENT_SOLICITOR_ONE,
    );
    UserAssignedCasesHelper.addAssignedCaseToUser(defendantSolicitor1User, this.ccdCaseData.id);
  }

  async AssignCaseRoleToDefendant2() {
    await this.setupUserData(defendantSolicitor2User);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.assignCaseToDefendant(
      defendantSolicitor2User,
      this.ccdCaseData.id,
      CaseRole.RESPONDENT_SOLICITOR_TWO,
    );
    UserAssignedCasesHelper.addAssignedCaseToUser(defendantSolicitor2User, this.ccdCaseData.id);
  }

  async UnassignCasesForUser(user: User) {
    const assignedCases = await UserAssignedCasesHelper.getUserAssignedCases(user);
    if (assignedCases) {
      await this.setupUserData(user);
      const { civilServiceRequests } = this.requestsFactory;
      await civilServiceRequests.unassignUserFromCases(user, assignedCases);
    }
  }
}
