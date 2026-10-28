// How the claimant's solicitor fully discontinues the claim with "Discontinue this claim" (DISCONTINUE_CLAIM). Where
// the court's permission is not needed, civil-service discontinues the claim straight away (CASE_DISCONTINUED). Where a
// judge has given permission, court staff check the order with "Validate discontinuance", which discontinues it.
enum DiscontinueClaim {
  NO_PERMISSION_NEEDED = 'NO_PERMISSION_NEEDED',
  PERMISSION_GRANTED = 'PERMISSION_GRANTED',
}

export default DiscontinueClaim;
