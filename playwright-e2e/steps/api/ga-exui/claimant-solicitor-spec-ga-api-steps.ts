import BaseApi from '../../../base/base-api';
import { claimantSolicitorUser } from '../../../config/users/exui-users';
import GaExuiDataBuilderFactory from '../../../data-builders/ga-exui/ga-exui-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import GaExuiSchemaBuilderFactory from '../../../schema-builders/ga-exui/ga-exui-schema-builder-factory';

@AllMethodsStep()
export default class ClaimantSolicitorSpecGaApiSteps extends BaseApi {
  private gaExuiDataBuilderFactory: GaExuiDataBuilderFactory;
  private gaExuiSchemaBuilderFactory: GaExuiSchemaBuilderFactory;

  constructor(
    gaExuiDataBuilderFactory: GaExuiDataBuilderFactory,
    gaExuiSchemaBuilderFactory: GaExuiSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.gaExuiDataBuilderFactory = gaExuiDataBuilderFactory;
    this.gaExuiSchemaBuilderFactory = gaExuiSchemaBuilderFactory;
  }

  async MakePaymentForClaimIssued() {
    await this.setupApiStep(claimantSolicitorUser);
    const gaCaseDataBeforeSubmission = structuredClone(this.getGaCCDCaseData());

    const { initiateGeneralApplicationSpecAfterPaymentDataBuilder } =
      this.gaExuiDataBuilderFactory;
    const initiateGeneralApplicationSpecAfterPaymentDTO =
      await initiateGeneralApplicationSpecAfterPaymentDataBuilder.build();
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updatePaymentForGaClaimIsue(
      claimantSolicitorUser,
      initiateGeneralApplicationSpecAfterPaymentDTO,
    );
    await super.waitForFinishedBusinessProcess(this.getGaCCDCaseData()?.id);
    await super.fetchAndSetGaCCDCaseData(this.getGaCCDCaseData()?.id);

    const { initiateGeneralApplicationAfterPaymentSchemaBuilder } =
      this.gaExuiSchemaBuilderFactory;
    const initiateGeneralApplicationSpecAfterPaymentSchema =
      await initiateGeneralApplicationAfterPaymentSchemaBuilder.build(
        gaCaseDataBeforeSubmission,
      );
    ZodHelper.safeParse(
      initiateGeneralApplicationSpecAfterPaymentSchema,
      this.getGaCCDCaseData(),
    );
  }
}
