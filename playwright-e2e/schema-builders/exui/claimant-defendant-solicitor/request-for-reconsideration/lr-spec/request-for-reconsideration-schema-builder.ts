import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import partys from '../../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { Party } from '../../../../../models/users/partys';
import requestForReconsiderationSchemaComponents from './request-for-reconsideration-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class RequestForReconsiderationSchemaBuilder extends BaseSchemaBuilder {
  async build(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildCS1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildDS1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantDefendantParty: partys.DEFENDANT_SOLICITOR_1,
    });
  }

  async buildDS2(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimantDefendantParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      claimantDefendantParty = partys.CLAIMANT_SOLICITOR_1,
    }: {
      claimantDefendantParty?: Party;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...requestForReconsiderationSchemaComponents.requestForReconsideration(
        claimantDefendantParty,
      ),
    });
  }
}
