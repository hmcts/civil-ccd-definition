import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import notifyClaimDetailsSchemaBuilderComponents from './notify-claim-details-schema-builder-components';

@AllMethodsStep()
export default class NotifyClaimDetailsSchemaBuilder extends BaseSchemaBuilder {
   async buildSchema(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    let baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    baseSchema = baseSchema.omit({
      // addLegalRepDeadlineRes1: true,
      // addLegalRepDeadlineRes2: true,
    });

    return baseSchema.extend({
      ...notifyClaimDetailsSchemaBuilderComponents.notification,
      ...notifyClaimDetailsSchemaBuilderComponents.defendantSolicitorNotifyClaimDetailsOptions,
      ...notifyClaimDetailsSchemaBuilderComponents.deadlines,
      ...notifyClaimDetailsSchemaBuilderComponents.servedDocumentFiles(caseDataBeforeSubmission?.servedDocumentFiles?.particularsOfClaimDocument!),
    });
  }
}
