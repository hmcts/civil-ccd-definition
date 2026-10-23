import claimTypes from '../../../../enums/claim-types.ts';
import yesNo from '../../../../enums/yesNo.ts';
import { SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { UnspecifiedConfig } from '../../../journey/unspecified/unspecifiedConfig.ts';

// Who runs Manage Contact Information: the hearing centre admin, or one of the solicitors
export type MciUser = 'admin' | 'claimantSolicitor' | 'respondent1Solicitor' | 'respondent2Solicitor';

// The options on the event's first page, as civil-service codes them (ManageContactInformationUtils). In a 2v1 claim
// CLAIMANT_1_LR_INDIVIDUALS, CLAIMANT_1_WITNESSES and CLAIMANT_1_EXPERTS are both claimants', and in a 1v2 claim with
// the same solicitor DEFENDANT_1_LR_INDIVIDUALS, DEFENDANT_1_WITNESSES and DEFENDANT_1_EXPERTS are both defendants'.
export type MciParty =
  | 'CLAIMANT_1' | 'CLAIMANT_1_LITIGATION_FRIEND' | 'CLAIMANT_1_ORGANISATION_INDIVIDUALS' | 'CLAIMANT_1_LR_INDIVIDUALS'
  | 'CLAIMANT_1_WITNESSES' | 'CLAIMANT_1_EXPERTS'
  | 'CLAIMANT_2' | 'CLAIMANT_2_LITIGATION_FRIEND' | 'CLAIMANT_2_ORGANISATION_INDIVIDUALS'
  | 'DEFENDANT_1' | 'DEFENDANT_1_LITIGATION_FRIEND' | 'DEFENDANT_1_ORGANISATION_INDIVIDUALS' | 'DEFENDANT_1_LR_INDIVIDUALS'
  | 'DEFENDANT_1_WITNESSES' | 'DEFENDANT_1_EXPERTS'
  | 'DEFENDANT_2' | 'DEFENDANT_2_LITIGATION_FRIEND' | 'DEFENDANT_2_ORGANISATION_INDIVIDUALS' | 'DEFENDANT_2_LR_INDIVIDUALS'
  | 'DEFENDANT_2_WITNESSES' | 'DEFENDANT_2_EXPERTS';

// What the option updates, which decides the page it opens and the change made on it:
//  - party: the party's own details. Its email and first address line are changed.
//  - litigationFriend: the party's litigation friend. Their email and phone number are changed.
//  - individuals: the people attending for an organisation, or for its legal representative. One is added.
//  - witnesses, experts: those named in the directions questionnaire. The admin adds one; a solicitor cannot add or
//    remove any (civil-service rejects the page), so changes the first one's email.
export type MciKind = 'party' | 'litigationFriend' | 'individuals' | 'witnesses' | 'experts';

// One run of the event: who runs it and which option they choose
export interface MciSpec {
  user: MciUser;
  party: MciParty;
}

const users: Record<MciUser, SessionUserKey> = {
  admin: 'hearingCentreAdmin',
  claimantSolicitor: 'claimantSolicitor',
  respondent1Solicitor: 'respondent1Solicitor',
  respondent2Solicitor: 'respondent2Solicitor',
};

const userLabels: Record<MciUser, string> = {
  admin: 'Hearing Centre Admin',
  claimantSolicitor: 'Claimant Solicitor',
  respondent1Solicitor: 'Defendant 1 Solicitor',
  respondent2Solicitor: 'Defendant 2 Solicitor',
};

const allParties: MciParty[] = [
  'CLAIMANT_1', 'CLAIMANT_1_LITIGATION_FRIEND', 'CLAIMANT_1_ORGANISATION_INDIVIDUALS', 'CLAIMANT_1_LR_INDIVIDUALS',
  'CLAIMANT_1_WITNESSES', 'CLAIMANT_1_EXPERTS',
  'CLAIMANT_2', 'CLAIMANT_2_LITIGATION_FRIEND', 'CLAIMANT_2_ORGANISATION_INDIVIDUALS',
  'DEFENDANT_1', 'DEFENDANT_1_LITIGATION_FRIEND', 'DEFENDANT_1_ORGANISATION_INDIVIDUALS', 'DEFENDANT_1_LR_INDIVIDUALS',
  'DEFENDANT_1_WITNESSES', 'DEFENDANT_1_EXPERTS',
  'DEFENDANT_2', 'DEFENDANT_2_LITIGATION_FRIEND', 'DEFENDANT_2_ORGANISATION_INDIVIDUALS', 'DEFENDANT_2_LR_INDIVIDUALS',
  'DEFENDANT_2_WITNESSES', 'DEFENDANT_2_EXPERTS',
];

// A short set covering each kind of user and the main pages: the admin adds a witness for Defendant 1, the claimant's
// solicitor changes Claimant 1's details and adds someone attending for their firm, and each defendant's solicitor
// changes their client's details. A run for a party or solicitor this claim does not have is left out.
const representative: MciSpec[] = [
  { user: 'admin', party: 'DEFENDANT_1_WITNESSES' },
  { user: 'claimantSolicitor', party: 'CLAIMANT_1' },
  { user: 'claimantSolicitor', party: 'CLAIMANT_1_LR_INDIVIDUALS' },
  { user: 'respondent1Solicitor', party: 'DEFENDANT_1' },
  { user: 'respondent2Solicitor', party: 'DEFENDANT_2' },
];

export function mciSessionUser(spec: MciSpec): SessionUserKey {
  return users[spec.user];
}

export function mciUserLabel(spec: MciSpec): string {
  return userLabels[spec.user];
}

export function mciKind(party: MciParty): MciKind {
  if (party.endsWith('_LITIGATION_FRIEND')) {
    return 'litigationFriend';
  }
  if (party.endsWith('_INDIVIDUALS')) {
    return 'individuals';
  }
  if (party.endsWith('_WITNESSES')) {
    return 'witnesses';
  }
  if (party.endsWith('_EXPERTS')) {
    return 'experts';
  }
  return 'party';
}

// The case data field the option's changes are saved to
export function mciSavedField(party: MciParty): string {
  const [side, number] = party.split('_');
  const owner = `${side === 'CLAIMANT' ? 'applicant' : 'respondent'}${number}`;
  switch (mciKind(party)) {
    case 'party':
      return owner;
    case 'litigationFriend':
      return `${owner}LitigationFriend`;
    case 'individuals':
      return `${owner}${party.endsWith('_LR_INDIVIDUALS') ? 'LR' : 'Org'}Individuals`;
    case 'witnesses':
      return `${owner}DQWitnesses`;
    case 'experts':
      return `${owner}DQExperts`;
  }
}

// The runs of the event after the claimant's response (MANAGE_CONTACT_INFORMATION):
//  - not set: none
//  - representative: the set above, for the parties and solicitors this claim has
//  - a list of user:party, e.g. admin:CLAIMANT_1,respondent1Solicitor:DEFENDANT_1_EXPERTS. The users are admin,
//    claimantSolicitor, respondent1Solicitor and respondent2Solicitor, and the parties the event's options above.
export function mciSpecs(c: UnspecifiedConfig): MciSpec[] {
  const setting = c.manageContactInformationSetting?.trim();
  if (!setting) {
    return [];
  }
  if (setting === 'representative') {
    return representative.filter((spec) => mciSpecMissingReason(c, spec) === undefined);
  }
  return setting.split(',').map((entry) => {
    const [user, party] = entry.trim().split(':').map((part) => part.trim());
    return { user: user as MciUser, party: party as MciParty };
  });
}

// Why MANAGE_CONTACT_INFORMATION cannot be used for this claim, or undefined when it can
export function mciProblem(c: UnspecifiedConfig): string | undefined {
  const setting = c.manageContactInformationSetting?.trim();
  if (!setting || setting === 'representative') {
    return undefined;
  }
  const problems = mciSpecs(c).flatMap((spec) => {
    if (!(spec.user in users) || !allParties.includes(spec.party)) {
      return [`each entry must be user:party, with user one of ${Object.keys(users).join(', ')} and party one of ${allParties.join(', ')}`];
    }
    const missing = mciSpecMissingReason(c, spec);
    return missing ? [missing] : [];
  });
  return problems.length ? `Invalid MANAGE_CONTACT_INFORMATION value: ${setting}. ${[...new Set(problems)].join('; ')}` : undefined;
}

// Why the user cannot choose the option in this claim, or undefined when they can. This follows which options
// civil-service offers each user (PrepareEventTask): the admin sees every party, and a solicitor only their own
// client's side.
function mciSpecMissingReason(c: UnspecifiedConfig, spec: MciSpec): string | undefined {
  const { user, party } = spec;
  const entry = `${user}:${party}`;
  const twoClaimants = c.claimType === claimTypes.TWO_VS_ONE;
  const twoDefendants = [claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL].includes(c.claimType);
  const sameSolicitor = c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL;
  const differentSolicitors = c.claimType === claimTypes.ONE_VS_TWO_DIFF_SOL;
  const kind = mciKind(party);
  const [side, number] = party.split('_');
  const claimant = side === 'CLAIMANT';

  if (claimant && number === '2' && !twoClaimants) {
    return `${entry}: the claim has one claimant`;
  }
  if (!claimant && number === '2' && !twoDefendants) {
    return `${entry}: the claim has one defendant`;
  }
  // With one solicitor for both defendants, the people attending for them and their witnesses and experts are listed
  // together under Defendant 1
  if (!claimant && number === '2' && sameSolicitor && ['individuals', 'witnesses', 'experts'].includes(kind) && !party.endsWith('_ORGANISATION_INDIVIDUALS')) {
    return `${entry}: with the same solicitor for both defendants, use DEFENDANT_1_${party.split('_').slice(2).join('_')}`;
  }

  if (user === 'claimantSolicitor' && !claimant) {
    return `${entry}: the claimant's solicitor can only choose the claimants`;
  }
  if (user === 'respondent1Solicitor' && (claimant || (number === '2' && !sameSolicitor))) {
    return `${entry}: Defendant 1's solicitor can only choose ${sameSolicitor ? 'the defendants' : 'Defendant 1'}`;
  }
  if (user === 'respondent2Solicitor' && !differentSolicitors) {
    return `${entry}: Defendant 2 only has their own solicitor in a 1v2 claim with different solicitors`;
  }
  if (user === 'respondent2Solicitor' && (claimant || number !== '2')) {
    return `${entry}: Defendant 2's solicitor can only choose Defendant 2`;
  }

  const partyType = claimant ? c.claimantType : c.defendantType;
  const organisation = ['COMPANY', 'ORGANISATION'].includes(partyType);
  if (party.endsWith('_ORGANISATION_INDIVIDUALS') && !organisation) {
    return `${entry}: only a company or organisation has individuals attending for it (set ${claimant ? 'CLAIMANT_TYPE' : 'DEFENDANT_TYPE'})`;
  }
  if (kind === 'litigationFriend') {
    if (!claimant) {
      return `${entry}: the journey never gives a defendant a litigation friend`;
    }
    const hasLitigationFriend = number === '1' ? c.claimant1LitigantFriend === yesNo.YES : c.claimant2LitigantFriend === yesNo.YES;
    if (organisation || !hasLitigationFriend) {
      return `${entry}: Claimant ${number} has no litigation friend (set CLAIMANT${number}_LITIGANT_FRIEND=Yes, with an individual or sole trader claimant)`;
    }
  }
  // A solicitor is only offered witnesses and experts their side named, and changes the first rather than adding one
  if (user !== 'admin' && kind === 'witnesses' && Number(c.noOfWitnesses) === 0) {
    return `${entry}: a solicitor can only change the witnesses named in the directions questionnaire (set WITNESSES)`;
  }
  if (user !== 'admin' && kind === 'experts' && Number(c.noOfExperts) === 0) {
    return `${entry}: a solicitor can only change the experts named in the directions questionnaire (set EXPERTS)`;
  }
  return undefined;
}

// The details one run of the event enters, unique to the run so the saved case data shows it was this run's change
export interface MciChange {
  email: string;
  phone: string;
  addressLine1: string;
  firstName: string;
  lastName: string;
  fieldOfExpertise: string;
}

export function mciChange(index: number, spec: MciSpec): MciChange {
  const stamp = `${Date.now().toString(36)}${index + 1}`;
  return {
    email: `mci.${spec.party.toLowerCase().replace(/_/g, '.')}.${stamp}@example.com`,
    phone: `0770090${String(Date.now() % 10000).padStart(4, '0')}`,
    addressLine1: `${index + 1} Contact Information Road ${stamp}`,
    firstName: 'Mci',
    lastName: `Added${stamp}`,
    fieldOfExpertise: 'Orthopaedics',
  };
}

// Whether the change is saved as the run meant: the party's or litigation friend's new email, or an individual,
// witness or expert with the new email. Returns why not, or undefined when it is.
export function mciChangeNotSavedReason(caseData: Record<string, any>, spec: MciSpec, change: MciChange): string | undefined {
  const field = mciSavedField(spec.party);
  const saved = caseData[field];
  switch (mciKind(spec.party)) {
    case 'party':
      if (saved?.partyEmail !== change.email || saved?.primaryAddress?.AddressLine1 !== change.addressLine1) {
        return `${field} has email ${saved?.partyEmail} and address line 1 ${saved?.primaryAddress?.AddressLine1}, not ${change.email} and ${change.addressLine1}`;
      }
      return undefined;
    case 'litigationFriend':
      if (saved?.emailAddress !== change.email || saved?.phoneNumber !== change.phone) {
        return `${field} has email ${saved?.emailAddress} and phone ${saved?.phoneNumber}, not ${change.email} and ${change.phone}`;
      }
      return undefined;
    case 'individuals': {
      const found = (saved ?? []).some((individual) => individual.value?.email === change.email);
      return found ? undefined : `${field} has no individual with email ${change.email}`;
    }
    case 'witnesses':
    case 'experts': {
      const found = (saved?.details ?? []).some((entry) => entry.value?.emailAddress === change.email);
      return found ? undefined : `${field} has no entry with email ${change.email}`;
    }
  }
}

// Whether civil-service starts the MANAGE_CONTACT_INFORMATION business process (to tell the parties), which it only
// does when a party's or litigation friend's details change
export function mciStartsBusinessProcess(party: MciParty): boolean {
  return ['party', 'litigationFriend'].includes(mciKind(party));
}

// Whether the run adds a witness or expert, which only the admin can do, rather than changing the first
export function mciAddsEntry(spec: MciSpec): boolean {
  return spec.user === 'admin';
}
