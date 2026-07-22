import DecisionOnRequestReconsiderationOption from "../../../../constants/ccd-events/decision-on-reconsideration-request/decision-on-request-reconsideration-option";

const judgeResponseToReconsideration = (decisionOnRequestReconsiderationOption: DecisionOnRequestReconsiderationOption) => {
  if (decisionOnRequestReconsiderationOption === DecisionOnRequestReconsiderationOption.YES) {
    return {
      JudgeResponseToReconsideration: {
        decisionOnRequestReconsiderationOptions: decisionOnRequestReconsiderationOption,
        upholdingPreviousOrderReason: {
          reasonForReconsiderationTxtYes: 'string'
        }
      }
    };
  } else if (
    decisionOnRequestReconsiderationOption === DecisionOnRequestReconsiderationOption.CREATE_SDO ||
    decisionOnRequestReconsiderationOption === DecisionOnRequestReconsiderationOption.CREATE_GENERAL_ORDER
  ) {
    return {
      JudgeResponseToReconsideration: {
        decisionOnRequestReconsiderationOptions: decisionOnRequestReconsiderationOption,
      }
    };
  }

  return {};
};

const orderPreview = (decisionOnRequestReconsiderationOption: DecisionOnRequestReconsiderationOption) => {
  if (decisionOnRequestReconsiderationOption === DecisionOnRequestReconsiderationOption.YES) {
    return {
      OrderPreview: {},
    };
  }

  return {};
}

const decisionOnReconsiderationRequestDataBuilderComponents = {
  judgeResponseToReconsideration,
  orderPreview
};

export default decisionOnReconsiderationRequestDataBuilderComponents;
