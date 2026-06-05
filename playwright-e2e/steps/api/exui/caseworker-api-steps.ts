import BaseApi from '../../../base/base-api';
import { civilAdminUser } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import CaseState from '../../../constants/cases/case-state';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import CaseworkerDataBuilderFactory from '../../../data-builders/exui/caseworker/caseworker-data-builder-factory';
import CaseworkerSchemaBuilderFactory from '../../../schema-builders/exui/caseworker/caseworker-schema-builder-factory';

@AllMethodsStep()
export default class CaseworkerApiSteps extends BaseApi {
  private caseworkerDataBuilderFactory: CaseworkerDataBuilderFactory;
  private caseworkerSchemaBuilderFactory: CaseworkerSchemaBuilderFactory;

  constructor(
    caseworkerDataBuilderFactory: CaseworkerDataBuilderFactory,
    caseworkerSchemaBuilderFactory: CaseworkerSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.caseworkerDataBuilderFactory = caseworkerDataBuilderFactory;
    this.caseworkerSchemaBuilderFactory = caseworkerSchemaBuilderFactory;
  }

  async AddCaseNote() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { addCaseNoteDataBuilder } = this.caseworkerDataBuilderFactory;
    const addCaseNoteData = await addCaseNoteDataBuilder.buildData();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.ADD_CASE_NOTE,
      addCaseNoteData,
      CaseState.CASE_ISSUED,
    );

    const { addCaseNoteSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const addCaseNoteSchema = await addCaseNoteSchemaBuilder.buildData(caseDataBeforeSubmission);
    ZodHelper.safeParse(addCaseNoteSchema, this.ccdCaseData);
  }

  async AmendPartyDetails() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { amendPartyDetailsDataBuilder } = this.caseworkerDataBuilderFactory;
    const amendPartyDetailsData = await amendPartyDetailsDataBuilder.buildData();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.AMEND_PARTY_DETAILS,
      amendPartyDetailsData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { amendPartyDetailsSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const amendPartyDetailsSchema = await amendPartyDetailsSchemaBuilder.buildData(caseDataBeforeSubmission);
    ZodHelper.safeParse(amendPartyDetailsSchema, this.ccdCaseData);
  }
}
