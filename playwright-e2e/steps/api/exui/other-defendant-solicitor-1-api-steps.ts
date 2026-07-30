import BaseApi from '../../../base/base-api';
import {
  defendantSolicitor1User,
  otherSolicitorUser2,
} from '../../../config/users/exui-users';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

@AllMethodsStep()
export default class OtherDefendantSolicitor1ApiSteps extends BaseApi {
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

  async NoticeOfChangeD1() {
    await this.setupApiStep(otherSolicitorUser2);
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { noticeOfChangeDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const noticeOfChangeAnswers = await noticeOfChangeDataBuilder.buildDefendant1();
    await super.submitNocEvent(
      otherSolicitorUser2,
      defendantSolicitor1User,
      noticeOfChangeAnswers,
    );

    const { noticeOfChangeSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const noticeOfChangeSchema =
      await noticeOfChangeSchemaBuilder.buildDefendant1(caseDataBeforeSubmission);
    ZodHelper.safeParse(noticeOfChangeSchema, this.ccdCaseData);
  }

  async NoticeOfChangeD2() {
    await this.setupApiStep(otherSolicitorUser2);
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { noticeOfChangeDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const noticeOfChangeAnswers = await noticeOfChangeDataBuilder.buildDefendant2();
    await super.submitNocEvent(
      otherSolicitorUser2,
      defendantSolicitor1User,
      noticeOfChangeAnswers,
    );

    const { noticeOfChangeSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const noticeOfChangeSchema =
      await noticeOfChangeSchemaBuilder.buildDefendant2(caseDataBeforeSubmission);
    ZodHelper.safeParse(noticeOfChangeSchema, this.ccdCaseData);
  }
}
