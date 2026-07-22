import { z } from 'zod';
import DecisionOnRequestReconsiderationOption from '../../../../constants/ccd-events/decision-on-reconsideration-request/decision-on-request-reconsideration-option';

const nonEmptyString = z.string().min(1);

const judgeResponseToReconsideration = (
  decisionOnRequestReconsiderationOption: DecisionOnRequestReconsiderationOption,
) => {
  if (decisionOnRequestReconsiderationOption === DecisionOnRequestReconsiderationOption.YES) {
    return {
      decisionOnRequestReconsiderationOptions: z.literal(decisionOnRequestReconsiderationOption),
      upholdingPreviousOrderReason: z.looseObject({
        reasonForReconsiderationTxtYes: nonEmptyString,
      }),
    };
  } else if (
    decisionOnRequestReconsiderationOption === DecisionOnRequestReconsiderationOption.CREATE_SDO ||
    decisionOnRequestReconsiderationOption === DecisionOnRequestReconsiderationOption.CREATE_GENERAL_ORDER
  ) {
    return {
      decisionOnRequestReconsiderationOptions: z.literal(decisionOnRequestReconsiderationOption),
    };
  }

  return {};
};

const orderPreview = (
  decisionOnRequestReconsiderationOption: DecisionOnRequestReconsiderationOption,
) => {
  if (decisionOnRequestReconsiderationOption === DecisionOnRequestReconsiderationOption.YES) {
    return {};
  }

  return {};
};

const decisionOnReconsiderationRequestSchemaBuilderComponents = {
  judgeResponseToReconsideration,
  orderPreview,
};

export default decisionOnReconsiderationRequestSchemaBuilderComponents;
