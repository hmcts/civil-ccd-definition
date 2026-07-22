import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import ConfirmOrderGivesPermission
  from '../../../../constants/ccd-events/validate-discontinue-claim-claimant/confirm-order-gives-permission';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import validateDiscontinueClaimClaimantSchemaBuilderComponents
  from './validate-discontinue-claim-claimant-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class ValidateDiscontinueClaimClaimantSchemaBuilder extends BaseSchemaBuilder {
  async buildYesPermission(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildNoPermission(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      confirmOrderGivesPermission: ConfirmOrderGivesPermission.NO,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      confirmOrderGivesPermission = ConfirmOrderGivesPermission.YES,
    }: {
      confirmOrderGivesPermission?: ConfirmOrderGivesPermission,
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;
      
    return baseSchema.extend({
      ...validateDiscontinueClaimClaimantSchemaBuilderComponents.validateDiscontinuance(confirmOrderGivesPermission),
      ...validateDiscontinueClaimClaimantSchemaBuilderComponents.undefine(confirmOrderGivesPermission),
    });
  }
}
