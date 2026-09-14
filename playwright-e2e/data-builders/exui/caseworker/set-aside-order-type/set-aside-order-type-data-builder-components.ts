import SetAsideOrderType from '../../../../constants/ccd-events/ccd-events/set-aside-judgment/set-aside-order-type';
import SetAsideReason from '../../../../constants/ccd-events/ccd-events/set-aside-judgment/set-aside-reason';
import DateHelper from '../../../../helpers/date-helper';

const setAsideJudgment = (setAsideReason: SetAsideReason) => {
  if (setAsideReason === SetAsideReason.JUDGE_ORDER) {
    return {
      SetAsideJudgment: {
        joSetAsideReason: setAsideReason,
      },
    };
  } else if (setAsideReason === SetAsideReason.JUDGMENT_ERROR) {
    return {
      SetAsideJudgment: {
        joSetAsideReason: setAsideReason,
        joSetAsideJudgmentErrorText: 'Judgment made in error reason',
      },
    };
  }

  return {};
};

const setAsideOrderType = (setAsideReason: SetAsideReason, setAsideOrderType: SetAsideOrderType) => {
  if (setAsideReason === SetAsideReason.JUDGE_ORDER) {
    if (setAsideOrderType === SetAsideOrderType.ORDER_AFTER_APPLICATION) {
      return {
        SetAsideOrderType: {
          joSetAsideOrderType: setAsideOrderType,
          joSetAsideOrderDate: DateHelper.formatDateToString(DateHelper.getToday(), {
            outputFormat: 'YYYY-MM-DD',
          }),
          joSetAsideApplicationDate: DateHelper.formatDateToString(
            DateHelper.subtractFromToday({ days: 1 }),
            { outputFormat: 'YYYY-MM-DD' },
          ),
        },
      };
    } else if (setAsideOrderType === SetAsideOrderType.ORDER_AFTER_DEFENCE) {
      return {
        SetAsideOrderType: {
          joSetAsideOrderType: setAsideOrderType,
          joSetAsideOrderDate: DateHelper.formatDateToString(DateHelper.getToday(), {
            outputFormat: 'YYYY-MM-DD',
          }),
          joSetAsideDefenceReceivedDate: DateHelper.formatDateToString(
            DateHelper.subtractFromToday({ days: 1 }),
            { outputFormat: 'YYYY-MM-DD' },
          ),
        },
      };
    }

    return {};
  }

  return {};
};

const setAsideOrderTypeDataBuilderComponents = {
  setAsideJudgment,
  setAsideOrderType,
};

export default setAsideOrderTypeDataBuilderComponents;
