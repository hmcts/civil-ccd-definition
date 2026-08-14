import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import setAsideOrderTypeSchemaBuilderComponents from './set-aside-order-type-schema-builder-components';
import SetAsideOrderType from '../../../../constants/ccd-events/set-aside-judgment/set-aside-order-type';
import SetAsideReason from '../../../../constants/ccd-events/set-aside-judgment/set-aside-reason';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class SetAsideOrderTypeSchemaBuilder extends BaseSchemaBuilder {
  async buildJudgementError(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      setAsideReason: SetAsideReason.JUDGMENT_ERROR,
    });
  }

  async buildJudgeOrder(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission)
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      setAsideReason = SetAsideReason.JUDGE_ORDER,
      setAsideOrderType = SetAsideOrderType.ORDER_AFTER_APPLICATION,
    }: {
      setAsideReason?: SetAsideReason,
      setAsideOrderType?: SetAsideOrderType,
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...setAsideOrderTypeSchemaBuilderComponents.setAsideJudgment(setAsideReason),
      ...setAsideOrderTypeSchemaBuilderComponents.setAsideOrderType(
        setAsideReason,
        setAsideOrderType,
      ),
      ...setAsideOrderTypeSchemaBuilderComponents.undefine,
    });
  }
}
