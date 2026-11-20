import { randomUUID } from 'node:crypto';
import moment from 'moment-business-days';
import yesNo from '../../../../../enums/yesNo.ts';
import trackType from '../../../../../enums/track.ts';
import unspecClaimTypes from '../../../../../enums/unspecClaimTypes.ts';
import { courts } from '../../../../../fixtures/courts.ts';
import { DirectionsQuestionnaireAnswers, DirectionsQuestionnaireParty } from '../../ui/DirectionsQuestionnaire.ts';

type Document = Record<string, string>;

const collection = <T>(values: T[]) => values.map((value) => ({ id: randomUUID(), value }));

// The directions questionnaire (DQ) case data, as the UI's DirectionsQuestionnaire fills its pages for the party and
// track. draftDirections is the uploaded draft directions document. requestedCourt is the party's requested court as
// the event started it, which holds the list of courts the about to start callback made (defendant's response only).
export function buildDirectionsQuestionnaire(
  party: DirectionsQuestionnaireParty,
  track: trackType,
  typeOfClaim: string,
  answers: DirectionsQuestionnaireAnswers,
  draftDirections: Document,
  requestedCourt?: Record<string, any>,
): Record<string, any> {
  const dq = party.fieldPrefix;
  return {
    ...(track === trackType.SMALL ? determinationWithoutHearing(party, answers) : fileAndDisclosure(dq, track, typeOfClaim, answers)),
    [`${dq}Experts`]: experts(party.label, answers.noOfExperts),
    [`${dq}Witnesses`]: witnesses(party.label, answers.noOfWitnesses),
    [`${dq}Language`]: { court: answers.language, documents: answers.language },
    [`${dq}Hearing`]: hearingAvailability(answers.unavailableDatesRequired),
    [`${dq}DraftDirections`]: draftDirections,
    ...(party.hasRequestedCourt ? courtAndRemoteHearing(dq, requestedCourt) : {}),
    [`${dq}HearingSupport`]: { supportRequirements: yesNo.YES, supportRequirementsAdditional: 'Hearing support requirements.' },
    [`${dq}VulnerabilityQuestions`]: {
      vulnerabilityAdjustmentsRequired: yesNo.YES,
      vulnerabilityAdjustments: 'Vulnerability adjustments required.',
    },
    [`${dq}FurtherInformation`]: {
      futureApplications: yesNo.YES,
      reasonForFutureApplications: 'Reason for future applications.',
      otherInformationForJudge: 'Other information for the judge.',
    },
  };
}

// Determination without hearing (small claims only)
function determinationWithoutHearing(party: DirectionsQuestionnaireParty, answers: DirectionsQuestionnaireAnswers) {
  return {
    [party.determinationWithoutHearingField]: {
      deterWithoutHearingYesNo: answers.determinationWithoutHearing,
      ...(answers.determinationWithoutHearing === yesNo.NO
        ? { deterWithoutHearingWhyNot: `${party.label} reason why the claim is not suitable for determination without a hearing.` }
        : {}),
    },
  };
}

// File directions questionnaire, Fixed recoverable costs (fast and intermediate tracks), Disclosure of electronic
// documents (intermediate and multi tracks), Disclosure of non-electronic documents, and Disclosure report
// (intermediate and multi tracks, not for personal injury claims). None of these are asked on the small claims track.
function fileAndDisclosure(dq: string, track: trackType, typeOfClaim: string, answers: DirectionsQuestionnaireAnswers) {
  const intermediateOrMulti = track === trackType.INTERMEDIATE || track === trackType.MULTI;
  const fixedRecoverableCosts = {
    isSubjectToFixedRecoverableCostRegime: answers.fixedRecoverableCosts,
    ...(answers.fixedRecoverableCosts === yesNo.YES
      ? { band: answers.fixedRecoverableCostsBand, complexityBandingAgreed: answers.fixedRecoverableCosts }
      : {}),
    reasons: 'Fixed Recoverable Costs explanation',
  };
  return {
    [`${dq}FileDirectionsQuestionnaire`]: {
      explainedToClient: ['CONFIRM'],
      oneMonthStayRequested: answers.oneMonthStay,
      reactionProtocolCompliedWith: answers.preActionProtocol,
      ...(answers.preActionProtocol === yesNo.NO ? { reactionProtocolNotCompliedWithReason: 'Pre-action protocol explanation' } : {}),
    },
    ...(track === trackType.FAST ? { [`${dq}FixedRecoverableCosts`]: fixedRecoverableCosts } : {}),
    ...(track === trackType.INTERMEDIATE ? { [`${dq}FixedRecoverableCostsIntermediate`]: fixedRecoverableCosts } : {}),
    ...(intermediateOrMulti
      ? {
        [`${dq}DisclosureOfElectronicDocuments`]: {
          reachedAgreement: yesNo.NO,
          agreementLikely: yesNo.NO,
          reasonForNoAgreement: 'Reason no agreement on electronic disclosure is likely.',
        },
      }
      : {}),
    [`${dq}DisclosureOfNonElectronicDocuments`]: {
      directionsForDisclosureProposed: answers.disclosure,
      ...(answers.disclosure === yesNo.YES ? { standardDirectionsRequired: yesNo.NO, bespokeDirections: 'Bespoke directions text.' } : {}),
    },
    ...(intermediateOrMulti && typeOfClaim !== unspecClaimTypes.PERSONAL_INJURY
      ? { [`${dq}DisclosureReport`]: { disclosureFormFiledAndServed: yesNo.YES, disclosureProposalAgreed: yesNo.YES, draftOrderNumber: '123' } }
      : {}),
  };
}

// Experts and witnesses are named after the party they belong to, e.g. Defendant1 Expert2, so they can be told apart.
// An expert's estimated cost is £500, which case data holds in pence.
function experts(partyLabel: string, noOfExperts: number) {
  if (noOfExperts < 1) {
    return { expertRequired: yesNo.NO };
  }
  const emailName = partyLabel.toLowerCase();
  return {
    expertRequired: yesNo.YES,
    expertReportsSent: 'YES',
    jointExpertSuitable: yesNo.NO,
    details: collection(Array.from({ length: noOfExperts }, (_, i) => ({
      firstName: partyLabel,
      lastName: `Expert${i + 1}`,
      emailAddress: `${emailName}.expert${i + 1}@example.com`,
      phoneNumber: '07700900000',
      fieldOfExpertise: `Expert${i + 1}: Test field of expertise`,
      whyRequired: `Expert${i + 1}: Test reason why this expert is required.`,
      estimatedCost: '50000',
    }))),
  };
}

function witnesses(partyLabel: string, noOfWitnesses: number) {
  if (noOfWitnesses < 1) {
    return { witnessesToAppear: yesNo.NO };
  }
  const emailName = partyLabel.toLowerCase();
  return {
    witnessesToAppear: yesNo.YES,
    details: collection(Array.from({ length: noOfWitnesses }, (_, i) => ({
      firstName: partyLabel,
      lastName: `Witness${i + 1}`,
      emailAddress: `${emailName}.witness${i + 1}@example.com`,
      phoneNumber: '07700900000',
      reasonForWitness: `Witness${i + 1}: Test event witnessed.`,
    }))),
  };
}

// Hearing availability: when there are dates the party cannot attend, a single date 6 months away and a 5 day range
// 7 months away, as the UI enters them
function hearingAvailability(unavailableDatesRequired: yesNo) {
  if (unavailableDatesRequired !== yesNo.YES) {
    return { unavailableDatesRequired: yesNo.NO };
  }
  const format = (date: moment.Moment) => date.format('YYYY-MM-DD');
  return {
    unavailableDatesRequired: yesNo.YES,
    unavailableDates: collection([
      { unavailableDateType: 'SINGLE_DATE', date: format(moment().add(6, 'months')) },
      { unavailableDateType: 'DATE_RANGE', fromDate: format(moment().add(7, 'months')), toDate: format(moment().add(7, 'months').add(5, 'days')) },
    ]),
  };
}

// Court location and remote hearing (defendant's response only). The court is picked from the list the event's about
// to start callback made, as its codes are made up each time the list is made.
function courtAndRemoteHearing(dq: string, requestedCourt: Record<string, any> | undefined) {
  const courtList = requestedCourt?.responseCourtLocations;
  const clerkenwell = courtList?.list_items?.find((item) => item.label === courts.clerkenwell.longAddress);
  if (!clerkenwell) {
    throw new Error(`${courts.clerkenwell.longAddress} is not in the list of courts ${dq}RequestedCourt offered`);
  }
  return {
    [`${dq}RequestedCourt`]: {
      ...requestedCourt,
      responseCourtLocations: { list_items: courtList.list_items, value: clerkenwell },
      reasonForHearingAtSpecificCourt: 'Reason for hearing at specific court.',
    },
    [`${dq}RemoteHearing`]: { remoteHearingRequested: yesNo.YES, reasonForRemoteHearing: 'Reason for remote hearing.' },
  };
}
