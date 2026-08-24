import BaseApi from '../../../base/base-api';
import { claimantSolicitorUser } from '../../../config/users/exui-users';
import GaCaseState from '../../../constants/cases/ga-case-states';
import gaCCDEvents from '../../../constants/ccd-events/ga-ccd-events/ga-ccd-events';
import ClaimantDefendantSolicitorGaDataBuilderFactory from '../../../data-builders/ga-exui/claimant-defendant-solicitor/claimant-defendant-solicitor-ga-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorGaSchemaBuilderFactory from '../../../schema-builders/ga-exui/claimant-defendant-solicitor/claimant-defendant-solicitor-ga-schema-builder-factory';

@AllMethodsStep()
export default class ClaimantSolicitorGaApiSteps extends BaseApi {
  private claimantDefendantSolicitorGaDataBuilderFactory: ClaimantDefendantSolicitorGaDataBuilderFactory;
  private claimantDefendantSolicitorGaSchemaBuilderFactory: ClaimantDefendantSolicitorGaSchemaBuilderFactory;

  constructor(
    claimantDefendantSolicitorGaDataBuilderFactory: ClaimantDefendantSolicitorGaDataBuilderFactory,
    claimantDefendantSolicitorGaSchemaBuilderFactory: ClaimantDefendantSolicitorGaSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.claimantDefendantSolicitorGaDataBuilderFactory = claimantDefendantSolicitorGaDataBuilderFactory;
    this.claimantDefendantSolicitorGaSchemaBuilderFactory = claimantDefendantSolicitorGaSchemaBuilderFactory;
  }

  async MakePaymentForClaimIssued() {
    await this.setupApiStep(claimantSolicitorUser);
    const gaCaseDataBeforeSubmission = structuredClone(this.getGaCCDCaseData());

    const { initiateGeneralApplicationAfterPaymentDataBuilder } = this.claimantDefendantSolicitorGaDataBuilderFactory;
    const initiateGeneralApplicationAfterPaymentDTO =
      await initiateGeneralApplicationAfterPaymentDataBuilder.build();
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updatePaymentForGaClaimIssue(
      claimantSolicitorUser,
      initiateGeneralApplicationAfterPaymentDTO,
    );
    await super.waitForFinishedBusinessProcess(this.getGaCCDCaseData()?.id);
    await super.fetchAndSetGaCCDCaseData(
      this.getGaCCDCaseData()?.id,
      undefined,
      [
        GaCaseState.AWAITING_RESPONDENT_RESPONSE,
        GaCaseState.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION,
      ],
    );

    const { initiateGeneralApplicationAfterPaymentSchemaBuilder } = this.claimantDefendantSolicitorGaSchemaBuilderFactory;
    const initiateGeneralApplicationAfterPaymentSchema =
      await initiateGeneralApplicationAfterPaymentSchemaBuilder.build(gaCaseDataBeforeSubmission);
    ZodHelper.safeParse(initiateGeneralApplicationAfterPaymentSchema, this.getGaCCDCaseData());
  }

  async RespondToApplicationAgreed() {
    await this.setupApiStep(claimantSolicitorUser);
    const gaCaseDataBeforeSubmission = structuredClone(this.getGaCCDCaseData());

    const { respondToApplicationDataBuilder } = this.claimantDefendantSolicitorGaDataBuilderFactory;
    const respondToApplicationEventData =
      await respondToApplicationDataBuilder.buildCS();

    await super.submitGaCCDEvent(
      claimantSolicitorUser,
      gaCCDEvents.RESPOND_TO_APPLICATION,
      respondToApplicationEventData,
      { expectedState: GaCaseState.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION },
    );

    const { respondToApplicationSchemaBuilder } = this.claimantDefendantSolicitorGaSchemaBuilderFactory;
    const respondToApplicationSchema =
      await respondToApplicationSchemaBuilder.build(gaCaseDataBeforeSubmission);
    ZodHelper.safeParse(respondToApplicationSchema, this.getGaCCDCaseData());
  }
}
