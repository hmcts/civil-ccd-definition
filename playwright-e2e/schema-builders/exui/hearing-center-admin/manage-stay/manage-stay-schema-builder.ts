import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import manageStaySchemaBuilderComponents from './manage-stay-schema-builder-components';
import ManageStayOption from '../../../../constants/ccd-events/manage-stay/manage-stay-option';

@AllMethodsStep()
export default class ManageStaySchemaBuilder extends BaseSchemaBuilder {
  async buildLiftStay(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildRequestUpdate(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    return this.buildSchema(caseDataBeforeSubmission, {manageStayOption: ManageStayOption.REQUEST_UPDATE});
  }

  async buildSchema(caseDataBeforeSubmission?: CCDCaseData, 
  {
    manageStayOption = ManageStayOption.LIFT_STAY
  } : {
    manageStayOption?: ManageStayOption
  } = {}): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...manageStaySchemaBuilderComponents.manageStay(manageStayOption),
      ...manageStaySchemaBuilderComponents.undefine(manageStayOption)
    });
  }
}
