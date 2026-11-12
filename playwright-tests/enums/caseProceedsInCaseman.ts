// Why the hearing centre admin takes the claim offline with "Case proceeds in Caseman" (CASE_PROCEEDS_IN_CASEMAN),
// from the reason for proceeding on paper. civil-service moves the claim to PROCEEDS_IN_HERITAGE_SYSTEM ("Case Proceeds
// Offline"). DEFENDANT_DOES_NOT_CONSENT is only offered on a specified claim.
enum CaseProceedsInCaseman {
  APPLICATION = 'APPLICATION',
  JUDGEMENT_REQUEST = 'JUDGEMENT_REQUEST',
  DEFENDANT_DOES_NOT_CONSENT = 'DEFENDANT_DOES_NOT_CONSENT',
  CASE_SETTLED = 'CASE_SETTLED',
  OTHER = 'OTHER',
}

export default CaseProceedsInCaseman;
