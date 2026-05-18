import BaseApi from '../../../base/base-api';
import { defendantSolicitor1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseRole from '../../../constants/cases/case-role';
import CaseState from '../../../constants/cases/case-state';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

@AllMethodsStep()
export default class DefendantSolicitor1ApiSteps extends BaseApi {
  private claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory;
  private claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory;

  constructor(
    claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory,
    claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.claimantDefendantSolicitorDataBuilderFactory =
      claimantDefendantSolicitorDataBuilderFactory;
    this.claimantDefendantSolicitorSchemaBuilderFactory =
      claimantDefendantSolicitorSchemaBuilderFactory;
  }

  async AssignCaseRole() {
    await this.setupApiStep(defendantSolicitor1User);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.assignCaseToDefendant(
      defendantSolicitor1User,
      CaseRole.RESPONDENT_SOLICITOR_ONE,
      this.ccdCaseData?.id
    );
    await super.fetchAndSetCCDCaseData();
    UserAssignedCasesHelper.addAssignedCaseToUser(defendantSolicitor1User, this.ccdCaseData?.id);
  }

  async AcknowledgeClaimFullDefence1v1() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { acknowledgeClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const acknowledgeClaimData = await acknowledgeClaimDataBuilder.buildData1v1FullDefence();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.ACKNOWLEDGE_CLAIM,
      acknowledgeClaimData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { acknowledgeClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const acknowledgeClaimSchema = await acknowledgeClaimSchemaBuilder.buildData(caseDataBeforeSubmission);
    ZodHelper.safeParse(acknowledgeClaimSchema, this.ccdCaseData);
  }
}
