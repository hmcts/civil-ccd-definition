import BaseApi from '../../../base/base-api';
import CaseState from '../../../constants/cases/case-state';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import ClaimantDefendantCitizenDataBuilderFactory from '../../../data-builders/cui/claimant-defendant-citizen/claimant-defendant-citizen-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantCitizenSchemaBuilderFactory from '../../../schema-builders/cui/claimant-defendant-citizen/claimant-defendant-citizen-schema-builder-factory';

@AllMethodsStep()
export default class ClaimantCitizenApiSteps extends BaseApi {
  private claimantDefendantCitizenDataBuilderFactory: ClaimantDefendantCitizenDataBuilderFactory;
  private claimantDefendantCitizenSchemaBuilderFactory: ClaimantDefendantCitizenSchemaBuilderFactory;

  constructor(
    claimantDefendantCitizenDataBuilderFactory: ClaimantDefendantCitizenDataBuilderFactory,
    claimantDefendantCitizenSchemaBuilderFactory: ClaimantDefendantCitizenSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.claimantDefendantCitizenDataBuilderFactory = claimantDefendantCitizenDataBuilderFactory;
    this.claimantDefendantCitizenSchemaBuilderFactory =
      claimantDefendantCitizenSchemaBuilderFactory;
  }

  async CreateLipClaimSmall() {
    await this.setupUserData(this.claimantCitizenUser);
    const createClaimDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.createClaimDataBuilder;
    const createClaimSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createClaimSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      ccdEvents.CREATE_LIP_CLAIM,
      await createClaimDataBuilder.buildSmall(),
      CaseState.PENDING_CASE_ISSUED,
    );
    ZodHelper.safeParse(await createClaimSchemaBuilder.buildSmall(), this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(this.claimantCitizenUser, this.ccdCaseData?.id);
  }

  async CreateLipClaimFast() {
    await this.setupApiStep(this.claimantCitizenUser);
    const createClaimDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.createClaimDataBuilder;
    const createClaimSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createClaimSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      ccdEvents.CREATE_LIP_CLAIM,
      await createClaimDataBuilder.buildFast(),
      CaseState.PENDING_CASE_ISSUED,
    );
    ZodHelper.safeParse(await createClaimSchemaBuilder.buildFast(), this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(this.claimantCitizenUser, this.ccdCaseData?.id);
  }

  async CreateLipClaimIntermediate() {
    await this.setupUserData(this.claimantCitizenUser);
    const createClaimDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.createClaimDataBuilder;
    const createClaimSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createClaimSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      ccdEvents.CREATE_LIP_CLAIM,
      await createClaimDataBuilder.buildIntermediate(),
      CaseState.PENDING_CASE_ISSUED,
    );
    ZodHelper.safeParse(await createClaimSchemaBuilder.buildIntermediate(), this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(this.claimantCitizenUser, this.ccdCaseData?.id);
  }

  async CreateLipClaimMulti() {
    await this.setupUserData(this.claimantCitizenUser);
    const createClaimDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.createClaimDataBuilder;
    const createClaimSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createClaimSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      ccdEvents.CREATE_LIP_CLAIM,
      await createClaimDataBuilder.buildMulti(),
      CaseState.PENDING_CASE_ISSUED,
    );
    ZodHelper.safeParse(await createClaimSchemaBuilder.buildMulti(), this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(this.claimantCitizenUser, this.ccdCaseData?.id);
  }

  async MakePaymentForClaimIssue() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const createClaimSpecAfterPaymentDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.createClaimSpecAfterPaymentDataBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      ccdEvents.CREATE_CLAIM_SPEC_AFTER_PAYMENT,
      await createClaimSpecAfterPaymentDataBuilder.buildIssueClaim(),
    );

    await super.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
    await super.fetchAndSetCCDCaseData();

    const createClaimSpecAfterPaymentSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createClaimSpecAfterPaymentSchemaBuilder;
    const createClaimSpecAfterPaymentSchema =
      await createClaimSpecAfterPaymentSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(createClaimSpecAfterPaymentSchema, this.ccdCaseData);
  }
}
