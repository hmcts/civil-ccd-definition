enum CaseStates {
  PENDING_CASE_ISSUED = 'PENDING_CASE_ISSUED',
  CASE_ISSUED = 'CASE_ISSUED',
  AWAITING_CASE_DETAILS_NOTIFICATION = 'AWAITING_CASE_DETAILS_NOTIFICATION',
  AWAITING_RESPONDENT_ACKNOWLEDGEMENT = 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT',
  AWAITING_APPLICANT_INTENTION = 'AWAITING_APPLICANT_INTENTION',
  PROCEEDS_IN_HERITAGE_SYSTEM = 'PROCEEDS_IN_HERITAGE_SYSTEM',
  JUDICIAL_REFERRAL = 'JUDICIAL_REFERRAL',
  CASE_PROGRESSION = 'CASE_PROGRESSION',
  HEARING_READINESS = 'HEARING_READINESS',
  All_FINAL_ORDERS_ISSUED = 'All_FINAL_ORDERS_ISSUED',
  CASE_DISCONTINUED = 'CASE_DISCONTINUED',
  CLOSED = 'CLOSED',
}

export default CaseStates;