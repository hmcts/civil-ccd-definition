// The answers the judge and the hearing centre admin give for "Not suitable for SDO" and "Transfer online case", the
// same through the UI and the API

export const changeLocationReason = 'The claim should be sent to another hearing centre for directions (Playwright journey)';
export const otherReason = 'The claim is not suitable for a Standard Direction Order (Playwright journey)';
export const reasonForTransfer = 'Transferred at the judge\'s request (Playwright journey)';

// London (region 1) hearing centres, in the order they are tried, so the region 1 judge and legal adviser can still make
// the Standard Direction Order once the claim has moved
const londonCourts = [/Clerkenwell/i, /Central London/i, /Mayor's and City/i, /Barnet/i, /Brentford/i, /Edmonton/i, /Romford/i];

// The hearing centre to transfer the claim to, from the labels of "New hearing centre location" ("site - address -
// postcode"): the first London court that is not the claim's current one (currentSite, its locationName), as
// civil-service rejects a transfer to the same court
export function transferCourtLabel(labels: string[], currentSite: string | undefined): string {
  const notCurrent = labels.filter((label) => !currentSite || !label.toLowerCase().startsWith(currentSite.toLowerCase()));
  for (const court of londonCourts) {
    const label = notCurrent.find((candidate) => court.test(candidate));
    if (label) {
      return label;
    }
  }
  throw new Error(`None of the London hearing centres is offered for the transfer (current court: ${currentSite ?? 'unknown'})`);
}
