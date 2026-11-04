// Who asks for the legal adviser's small claims order to be reconsidered with "Request for Reconsideration"
// (REQUEST_FOR_RECONSIDERATION): the claimant's solicitor, Defendant 1's solicitor (who also acts for Defendant 2 in a
// 1v2SS claim) or Defendant 2's own solicitor (1v2DS)
export enum RequestForReconsiderationBy {
  CLAIMANT = 'CLAIMANT',
  DEFENDANT_1 = 'DEFENDANT_1',
  DEFENDANT_2 = 'DEFENDANT_2',
}

// What the judge decides with "Decision on reconsideration" (RECONSIDERATION_DECISION): the order stands (UPHOLD), a
// new Standard Direction Order is needed (CREATE_SDO, which gives the judge a new directions task) or the order needs
// amending with a general order (CREATE_GENERAL_ORDER, which the judge makes with "Make an order")
export enum ReconsiderationDecision {
  UPHOLD = 'UPHOLD',
  CREATE_SDO = 'CREATE_SDO',
  CREATE_GENERAL_ORDER = 'CREATE_GENERAL_ORDER',
}

// The decision's value in the case data (decisionOnRequestReconsiderationOptions)
export const reconsiderationDecisionOption: Record<ReconsiderationDecision, string> = {
  [ReconsiderationDecision.UPHOLD]: 'YES',
  [ReconsiderationDecision.CREATE_SDO]: 'CREATE_SDO',
  [ReconsiderationDecision.CREATE_GENERAL_ORDER]: 'CREATE_GENERAL_ORDER',
};

// The case data field each party's reason goes in
export const reconsiderationReasonField: Record<RequestForReconsiderationBy, string> = {
  [RequestForReconsiderationBy.CLAIMANT]: 'reasonForReconsiderationApplicant',
  [RequestForReconsiderationBy.DEFENDANT_1]: 'reasonForReconsiderationRespondent1',
  [RequestForReconsiderationBy.DEFENDANT_2]: 'reasonForReconsiderationRespondent2',
};
