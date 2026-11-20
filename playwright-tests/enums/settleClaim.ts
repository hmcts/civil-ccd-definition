// How the claim is settled with "Settle this claim" (SETTLE_CLAIM). There are two events with that name: the claimant's
// solicitor marks the claim as paid in full (SETTLE_CLAIM_MARK_PAID_FULL), which stays the case, and court staff
// record why it settled (SETTLE_CLAIM), after a judge's order or an approved consent order, which settles the case.
enum SettleClaim {
  MARK_PAID_IN_FULL = 'MARK_PAID_IN_FULL',
  JUDGE_ORDER = 'JUDGE_ORDER',
  CONSENT_ORDER = 'CONSENT_ORDER',
}

export default SettleClaim;
