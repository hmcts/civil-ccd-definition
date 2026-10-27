import { CaseFlagClaim, CaseFlagHolder, holderMissingReason } from './caseFlagHolders.ts';

// One flag to create: where it goes and its flag code from reference data, e.g. { holder: 'DEFENDANT_1', code: 'RA0012' }
// for Braille documents. An "Other" flag (OT0001) is the one on the first flag type page unless otherUnder names the
// headings above another.
export interface CaseFlagSpec {
  holder: CaseFlagHolder;
  code: string;
  otherUnder?: string[];
  language?: string;
  otherDescription?: string;
}

// A short set that keeps a local run quick: the longest route through the flag pages for Claimant 1, and one flag for
// each defendant, a special measure for Defendant 1 and a party flag for Defendant 2. A flag for a party this claim does
// not have (Defendant 2 in a 1v1 claim) is left out.
const representative: CaseFlagSpec[] = [
  { holder: 'CLAIMANT_1', code: 'RA0043' },   // Reasonable adjustment > help communicating > Hearing Enhancement System > Hearing loop (4 levels)
  { holder: 'DEFENDANT_1', code: 'SM0003' },  // Special measure > Evidence by live link
  { holder: 'DEFENDANT_2', code: 'PF0002' },  // Vulnerable user
];

// The flags the hearing centre admin adds after the claimant's response (CASE_FLAGS):
//  - not set: none
//  - representative: the set above, for the holders this claim has
//  - a list of holder:code, e.g. CASE:CF0002,DEFENDANT_1:RA0012,CLAIMANT_EXPERT_1:SM0003. A third part gives the
//    language for an interpreter flag (CLAIMANT_1:PF0015:Spanish) or the description for an "Other" flag.
export function caseFlagSpecs(c: CaseFlagClaim): CaseFlagSpec[] {
  const setting = c.caseFlagsSetting?.trim();
  if (!setting) {
    return [];
  }
  if (setting === 'representative') {
    return representative.filter((flag) => holderMissingReason(c, flag.holder) === undefined);
  }
  return setting.split(',').map((entry) => {
    const [holder, code, detail] = entry.trim().split(':').map((part) => part.trim());
    const flag: CaseFlagSpec = { holder: holder as CaseFlagHolder, code };
    if (detail && code === 'OT0001') {
      flag.otherDescription = detail;
    } else if (detail) {
      flag.language = detail;
    }
    return flag;
  });
}

// Why CASE_FLAGS cannot be used for this claim, or undefined when it can
export function caseFlagsProblem(c: CaseFlagClaim): string | undefined {
  const setting = c.caseFlagsSetting?.trim();
  if (!setting || setting === 'representative') {
    return undefined;
  }
  const problems = caseFlagSpecs(c).flatMap((flag) => {
    if (!flag.holder || !flag.code) {
      return ['each entry must be holder:code, e.g. DEFENDANT_1:RA0012'];
    }
    const missing = holderMissingReason(c, flag.holder);
    return missing ? [missing] : [];
  });
  return problems.length ? `Invalid CASE_FLAGS value: ${setting}. ${problems.join('; ')}` : undefined;
}
