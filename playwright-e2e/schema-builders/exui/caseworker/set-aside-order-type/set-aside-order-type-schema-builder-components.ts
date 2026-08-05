import { z } from 'zod';
import SetAsideOrderType from '../../../../constants/ccd-events/set-aside-judgment/set-aside-order-type';
import SetAsideReason from '../../../../constants/ccd-events/set-aside-judgment/set-aside-reason';

const nonEmptyString = z.string().min(1);

const setAsideJudgment = (setAsideReason: SetAsideReason) => {
  if (setAsideReason === SetAsideReason.JUDGE_ORDER) {
    return {
      joSetAsideReason: z.literal(SetAsideReason.JUDGE_ORDER),
    };
  }

  if (setAsideReason === SetAsideReason.JUDGMENT_ERROR) {
    return {
      joSetAsideReason: z.literal(SetAsideReason.JUDGMENT_ERROR),
      joSetAsideJudgmentErrorText: nonEmptyString,
    };
  }

  return {};
};

const setAsideOrderType = (setAsideReason: SetAsideReason, setAsideOrderType: SetAsideOrderType) => {
  if (setAsideReason === SetAsideReason.JUDGE_ORDER) {
    if (setAsideOrderType === SetAsideOrderType.ORDER_AFTER_APPLICATION) {
      return {
        joSetAsideOrderType: z.literal(SetAsideOrderType.ORDER_AFTER_APPLICATION),
        joSetAsideOrderDate: nonEmptyString,
        joSetAsideApplicationDate: nonEmptyString,
      };
    }

    if (setAsideOrderType === SetAsideOrderType.ORDER_AFTER_DEFENCE) {
      return {
        joSetAsideOrderType: z.literal(SetAsideOrderType.ORDER_AFTER_DEFENCE),
        joSetAsideOrderDate: nonEmptyString,
        joSetAsideDefenceReceivedDate: nonEmptyString,
      };
    }
  }

  return {};
};

const undefine = {
  activeJudgment: z.undefined().optional(),
}

const setAsideOrderTypeSchemaBuilderComponents = {
  setAsideJudgment,
  setAsideOrderType,
  undefine
};

export default setAsideOrderTypeSchemaBuilderComponents;
