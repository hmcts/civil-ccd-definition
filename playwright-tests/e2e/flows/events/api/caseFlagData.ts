import { CaseFlagHolder, holderFlagsField } from '../../caseFlags/caseFlagHolders.ts';

// The holder's flags in an event's data, and the case data to submit once they have been changed: the case's own flags
// (caseFlags), a party's flags (inside the party) or an expert's or witness's flags (inside their entry in the list).
// The rest of the party, list or entry is submitted as it is, as XUI does.
export function holderFlags(data: Record<string, any>, holder: CaseFlagHolder) {
  const { field, index } = holderFlagsField(holder);
  if (field === 'caseFlags') {
    const flags = { ...(data.caseFlags ?? {}), details: [...(data.caseFlags?.details ?? [])] };
    return { details: flags.details, toCaseData: () => ({ caseFlags: flags }) };
  }
  if (index === undefined) {
    const party = { ...data[field], flags: { ...(data[field]?.flags ?? {}) } };
    party.flags.details = [...(party.flags.details ?? [])];
    return { details: party.flags.details as any[], toCaseData: () => ({ [field]: party }) };
  }
  const entries = [...(data[field] ?? [])];
  if (!entries[index]) {
    throw new Error(`${holder} is not on the case: ${field} has ${entries.length} entries`);
  }
  const value = { ...entries[index].value, flags: { ...(entries[index].value.flags ?? {}) } };
  value.flags.details = [...(value.flags.details ?? [])];
  entries[index] = { ...entries[index], value };
  return { details: value.flags.details as any[], toCaseData: () => ({ [field]: entries }) };
}
