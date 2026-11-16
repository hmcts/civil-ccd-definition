// Why the judge decides a claim is not suitable for a Standard Direction Order ("Not suitable for SDO",
// NOT_SUITABLE_SDO): it should be sent to another hearing centre for directions (CHANGE_LOCATION), which the hearing
// centre admin then does with "Transfer online case", or another reason (OTHER_REASONS), which takes the claim offline
enum NotSuitableSdo {
  CHANGE_LOCATION = 'CHANGE_LOCATION',
  OTHER_REASONS = 'OTHER_REASONS',
}

export default NotSuitableSdo;
