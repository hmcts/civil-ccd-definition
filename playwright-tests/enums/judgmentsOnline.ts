// The settings for the Judgments Online events, which court staff and the claimant's solicitor use on a specified
// claim once a judgment has left it in All_FINAL_ORDERS_ISSUED.

// Why court staff set aside a default judgment (SET_ASIDE_JUDGMENT): it was made in error, or a judge's order set it
// aside following an application or following a defence received
export enum SetAsideJudgment {
  JUDGMENT_ERROR = 'JUDGMENT_ERROR',
  ORDER_AFTER_APPLICATION = 'ORDER_AFTER_APPLICATION',
  ORDER_AFTER_DEFENCE = 'ORDER_AFTER_DEFENCE',
}
