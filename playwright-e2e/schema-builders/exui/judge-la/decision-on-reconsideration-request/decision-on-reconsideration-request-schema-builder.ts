import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import DecisionOnRequestReconsiderationOption from '../../../../constants/ccd-events/decision-on-reconsideration-request/decision-on-request-reconsideration-option';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import decisionOnReconsiderationRequestSchemaBuilderComponents from './decision-on-reconsideration-request-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DecisionOnReconsiderationRequestSchemaBuilder extends BaseSchemaBuilder {
  async build(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildUpholdPreviousOrder(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildCreateNewSdo(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      decisionOnRequestReconsiderationOption: DecisionOnRequestReconsiderationOption.CREATE_SDO,
    });
  }

  async buildOrderNeedsAmending(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      decisionOnRequestReconsiderationOption:
        DecisionOnRequestReconsiderationOption.CREATE_GENERAL_ORDER,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      decisionOnRequestReconsiderationOption = DecisionOnRequestReconsiderationOption.YES,
    }: {
      decisionOnRequestReconsiderationOption?: DecisionOnRequestReconsiderationOption;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...decisionOnReconsiderationRequestSchemaBuilderComponents.judgeResponseToReconsideration(
        decisionOnRequestReconsiderationOption,
      ),
      ...decisionOnReconsiderationRequestSchemaBuilderComponents.orderPreview(
        decisionOnRequestReconsiderationOption,
      ),
    });
  }
}
