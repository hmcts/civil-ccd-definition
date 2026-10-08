// None of these claim types is small claims only: civil-service allocates the track from the claim value
// (AllocatedTrack.getAllocatedTrack), so every type can be a small claim if the value is low enough.
//  - PERSONAL_INJURY and CLINICAL_NEGLIGENCE: small claim up to £1,000, fast track up to £25,000.
//    Exception: PERSONAL_INJURY with the NOISE_INDUCED_HEARING_LOSS sub type is always fast track, never a small claim.
//  - All other types: small claim up to £10,000, fast track up to £25,000.
//  - Above £25,000: multi track, or intermediate track up to £100,000 when that feature is switched on.
enum UnspecClaimTypes {
  PERSONAL_INJURY = 'PERSONAL_INJURY',
  CLINICAL_NEGLIGENCE = 'CLINICAL_NEGLIGENCE',
  PROFESSIONAL_NEGLIGENCE = 'PROFESSIONAL_NEGLIGENCE',
  BREACH_OF_CONTRACT = 'BREACH_OF_CONTRACT',
  CONSUMER = 'CONSUMER',
  CONSUMER_CREDIT = 'CONSUMER_CREDIT',
  HOUSING_DISREPAIR = 'HOUSING_DISREPAIR',
  DAMAGES_AND_OTHER_REMEDY = 'DAMAGES_AND_OTHER_REMEDY',
  OTHER = 'OTHER',
}

export default UnspecClaimTypes;
