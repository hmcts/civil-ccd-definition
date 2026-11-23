import { expect } from '@playwright/test';
import { MciChange, MciSpec, mciAddsEntry, mciKind, mciSavedField } from '../../shared_api_ui/manageContactInformationSpecs.ts';

// The case data for MANAGE_CONTACT_INFORMATION, as the UI's ManageContactInformation submits it. startCaseData is the
// case data CCD returned when the event was started, which holds the options the user may choose and the case's
// current details.
//
// In the UI, choosing an option runs a mid event callback that notes the option (partyChosenId) and fills the page's
// list with the entries the case holds. The API does not run it, so the payload does both: civil-service replaces the
// case's individuals, witnesses or experts with the list submitted, so the existing entries are sent back with it.
export function buildManageContactInformationPayload(
  startCaseData: Record<string, any>,
  spec: MciSpec,
  change: MciChange,
): Record<string, any> {
  const options: Array<{ code: string; label: string }> = startCaseData.partyChosen?.list_items ?? [];
  const option = options.find((item) => item.code === spec.party);
  expect(option, `${spec.party} is not one of the options offered: ${options.map((item) => item.code).join(', ')}`).toBeDefined();

  const data: Record<string, any> = {
    partyChosen: { ...startCaseData.partyChosen, value: option },
    partyChosenId: spec.party,
  };
  const field = mciSavedField(spec.party);
  const current = startCaseData[field];

  switch (mciKind(spec.party)) {
    case 'party':
      data[field] = {
        ...current,
        partyEmail: change.email,
        primaryAddress: { ...current.primaryAddress, AddressLine1: change.addressLine1 },
      };
      break;
    case 'litigationFriend':
      data[field] = { ...current, emailAddress: change.email, phoneNumber: change.phone };
      break;
    case 'individuals': {
      const form = spec.party.endsWith('_LR_INDIVIDUALS') ? 'updateLRIndividualsForm' : 'updateOrgIndividualsForm';
      const existing = (current ?? []).map((individual) => ({
        id: individual.id,
        value: {
          firstName: individual.value.firstName,
          lastName: individual.value.lastName,
          emailAddress: individual.value.email,
          phoneNumber: individual.value.phone,
          partyId: individual.value.partyID,
        },
      }));
      data[form] = [...existing, { value: newEntry(change, false) }];
      break;
    }
    case 'witnesses':
    case 'experts': {
      const expert = mciKind(spec.party) === 'experts';
      const form = expert ? 'updateExpertsDetailsForm' : 'updateWitnessesDetailsForm';
      const existing = (current?.details ?? []).map((entry) => ({
        value: {
          firstName: entry.value.firstName,
          lastName: entry.value.lastName,
          emailAddress: entry.value.emailAddress,
          phoneNumber: entry.value.phoneNumber,
          partyId: entry.value.partyID,
          ...(expert ? { fieldOfExpertise: entry.value.fieldOfExpertise } : {}),
        },
      }));
      if (mciAddsEntry(spec)) {
        data[form] = [...existing, { value: newEntry(change, expert) }];
      } else {
        expect(existing.length, `${field} has no entries to change`).toBeGreaterThan(0);
        existing[0].value.emailAddress = change.email;
        data[form] = existing;
      }
      break;
    }
  }
  return data;
}

function newEntry(change: MciChange, expert: boolean) {
  return {
    firstName: change.firstName,
    lastName: change.lastName,
    emailAddress: change.email,
    phoneNumber: change.phone,
    ...(expert ? { fieldOfExpertise: change.fieldOfExpertise } : {}),
  };
}
