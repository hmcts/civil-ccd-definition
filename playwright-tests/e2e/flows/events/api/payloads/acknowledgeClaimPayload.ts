import claimTypes from '../../../../../enums/claim-types.ts';
import claimantDefendantTypes from '../../../../../enums/claimantDefendantTypes.ts';
import { partyDetails } from '../../../../../fixtures/partyDetails.ts';
import { UnspecifiedConfig } from '../../../../journey/unspecified/unspecifiedConfig.ts';

// The case data for ACKNOWLEDGE_CLAIM, as the UI's AcknowledgeClaim submits it for one defendant's solicitor.
// startCaseData is the case data CCD returned when the event was started, which holds the defendant's details and the
// solicitor's reference as they are now.
export function buildAcknowledgeClaimPayload(
  c: UnspecifiedConfig,
  startCaseData: Record<string, any>,
  defendantNumber: 1 | 2,
): Record<string, any> {
  return {
    ...copiesKept(startCaseData),
    ...confirmDetails(c, startCaseData, defendantNumber),
    ...responseIntention(c, defendantNumber),
    ...references(c, startCaseData, defendantNumber),
  };
}

// The copies the about to start callback makes of the defendants and the solicitor references, which the about to
// submit callback restores from (in a 1v2DS claim, the other defendant's details). They are hidden fields that keep
// their value, so XUI sends them back with the event, and so must the API.
function copiesKept(startCaseData: Record<string, any>) {
  const copies: Record<string, any> = {};
  for (const field of ['respondent1Copy', 'respondent2Copy', 'solicitorReferencesCopy']) {
    if (startCaseData[field] !== undefined) {
      copies[field] = startCaseData[field];
    }
  }
  return copies;
}

// Confirm details: the defendant's date of birth is asked for an individual or a sole trader (their own field each),
// and not for a company or an organisation. The UI does not fill it in a 1v2LIPLR claim (DTSCCI-672). The defendant is
// one complex field, so it is sent back whole, as the event started it, with the date of birth added.
function confirmDetails(c: UnspecifiedConfig, startCaseData: Record<string, any>, defendantNumber: 1 | 2) {
  const dateOfBirthField = {
    [claimantDefendantTypes.INDIVIDUAL]: 'individualDateOfBirth',
    [claimantDefendantTypes.SOLETRADER]: 'soleTraderDateOfBirth',
  }[c.defendantType];
  if (c.claimType === claimTypes.ONE_VS_TWO_LIP_LR || !dateOfBirthField) {
    return {};
  }
  const field = `respondent${defendantNumber}`;
  const details = defendantNumber === 1 ? partyDetails.defendant1 : partyDetails.defendant2;
  return {
    [field]: {
      ...startCaseData[field],
      [dateOfBirthField]: `${details.DOB_year}-${details.DOB_month}-${details.DOB_day}`,
    },
  };
}

// Response intention: one for the defendant acknowledging, except that in a 2v1 claim the defendant gives one for each
// claimant, and in a 1v2SS claim the shared solicitor gives one for each defendant
function responseIntention(c: UnspecifiedConfig, defendantNumber: 1 | 2) {
  switch (c.claimType) {
    case claimTypes.TWO_VS_ONE:
      return {
        respondent1ClaimResponseIntentionType: c.respondent1ResponseIntention,
        respondent1ClaimResponseIntentionTypeApplicant2: c.respondent2ResponseIntention,
      };
    case claimTypes.ONE_VS_TWO_SAME_SOL:
      return {
        respondent1ClaimResponseIntentionType: c.respondent1ResponseIntention,
        respondent2ClaimResponseIntentionType: c.respondent2ResponseIntention,
      };
    default:
      return defendantNumber === 1
        ? { respondent1ClaimResponseIntentionType: c.respondent1ResponseIntention }
        : { respondent2ClaimResponseIntentionType: c.respondent2ResponseIntention };
  }
}

// Solicitor references: the solicitor adds " acknowledge claim" to their reference. Defendant 2's reference is only
// shown when they do not share Defendant 1's solicitor, which in a 1v2LIPLR claim is never asked (Defendant 1 is a LiP),
// so that page has nothing to fill.
function references(c: UnspecifiedConfig, startCaseData: Record<string, any>, defendantNumber: 1 | 2) {
  if (defendantNumber === 1) {
    const solicitorReferences = startCaseData.solicitorReferences ?? {};
    return {
      solicitorReferences: {
        ...solicitorReferences,
        respondentSolicitor1Reference: `${solicitorReferences.respondentSolicitor1Reference ?? ''} acknowledge claim`,
      },
    };
  }
  if (c.claimType === claimTypes.ONE_VS_TWO_LIP_LR) {
    return {};
  }
  return { respondentSolicitor2Reference: `${startCaseData.respondentSolicitor2Reference ?? ''} acknowledge claim` };
}
