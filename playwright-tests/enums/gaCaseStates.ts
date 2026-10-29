// General application states from the general application CCD definition (State.json) that the journeys check
enum GaCaseStates {
  // Made, with its fee not paid yet
  AWAITING_APPLICATION_PAYMENT = 'AWAITING_APPLICATION_PAYMENT',
  // Paid, made with notice, waiting for the other side's response
  AWAITING_RESPONDENT_RESPONSE = 'AWAITING_RESPONDENT_RESPONSE',
  // Waiting for a judge's or legal adviser's decision
  APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION = 'APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION',
  ORDER_MADE = 'ORDER_MADE',
  // An approved application the court deals with offline from then on, such as the claimant's application to strike out
  PROCEEDS_IN_HERITAGE = 'PROCEEDS_IN_HERITAGE',
  APPLICATION_DISMISSED = 'APPLICATION_DISMISSED',
}

export default GaCaseStates;
