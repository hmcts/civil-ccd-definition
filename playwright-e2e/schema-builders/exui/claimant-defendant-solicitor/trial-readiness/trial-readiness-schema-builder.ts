import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import { Party } from '../../../../models/users/partys';
import trialReadinessSchemaComponents from './trial-readiness-schema-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class TrialReadinessSchemaBuilder extends BaseSchemaBuilder {
  async buildClaimant(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      party = partys.CLAIMANT_SOLICITOR_1,
    }: {
      party?: Party;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...trialReadinessSchemaComponents.confirmReadyClaimant(party),
    });
  }
}
