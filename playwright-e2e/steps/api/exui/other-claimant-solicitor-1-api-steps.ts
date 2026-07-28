import BaseApi from '../../../base/base-api';
import {
  claimantSolicitorUser,
  otherSolicitorUser1,
} from '../../../config/users/exui-users';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

@AllMethodsStep()
export default class OtherClaimantSolicitor1ApiSteps extends BaseApi {
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

  async NoticeOfChangeC1() {
    await this.setupApiStep(claimantSolicitorUser);
    await this.setupApiStep(otherSolicitorUser1);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { noticeOfChangeDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const noticeOfChangeAnswers = await noticeOfChangeDataBuilder.buildClaimant1();
    await super.submitNocEvent(
      otherSolicitorUser1,
      claimantSolicitorUser,
      noticeOfChangeAnswers,
    );

    const { noticeOfChangeSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const noticeOfChangeSchema =
      await noticeOfChangeSchemaBuilder.buildClaimant1(caseDataBeforeSubmission);
    ZodHelper.safeParse(noticeOfChangeSchema, this.ccdCaseData);
  }

  async NoticeOfChangeC2() {
    await this.setupApiStep(claimantSolicitorUser);
    await this.setupApiStep(otherSolicitorUser1);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { noticeOfChangeDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const noticeOfChangeAnswers = await noticeOfChangeDataBuilder.buildClaimant2();
    await super.submitNocEvent(
      otherSolicitorUser1,
      claimantSolicitorUser,
      noticeOfChangeAnswers,
    );

    const { noticeOfChangeSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const noticeOfChangeSchema =
      await noticeOfChangeSchemaBuilder.buildClaimant2(caseDataBeforeSubmission);
    ZodHelper.safeParse(noticeOfChangeSchema, this.ccdCaseData);
  }
}
