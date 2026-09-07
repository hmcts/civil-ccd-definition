import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import { Party } from '../../../../models/users/partys';
import noticeOfChangeSchemaBuilderComponents from './notice-of-change-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class NoticeOfChangeSchemaBuilder extends BaseSchemaBuilder {
  async buildClaimant1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildClaimant2(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      party: partys.CLAIMANT_2,
    });
  }

  async buildDefendant1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      party: partys.DEFENDANT_1
    });
  }

  async buildDefendant2(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(
      caseDataBeforeSubmission,
      {
        party: partys.DEFENDANT_2,
      }
    );
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      party = partys.CLAIMANT_1,
    } : {
      party?: Party,
    } = {}
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...noticeOfChangeSchemaBuilderComponents.claimant1Undefined(party),
      ...noticeOfChangeSchemaBuilderComponents.defendant1Undefined(party),
      ...noticeOfChangeSchemaBuilderComponents.defendant2Undefined(party),
      ...noticeOfChangeSchemaBuilderComponents.ignore,
    });
  }
}
