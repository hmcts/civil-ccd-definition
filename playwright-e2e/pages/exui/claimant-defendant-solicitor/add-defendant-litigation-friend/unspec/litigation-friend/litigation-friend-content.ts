import { Party } from '../../../../../../models/partys';

export const heading = 'Add litigation friend details';
export const subheadings = {
  litigationDetails: 'Defendant litigation details',
};

export const radioButtons = {
  address: {
    label:
      "Is the address of the Defendant's litigation friend the same as the address of the Defendant?",
    yes: {
      label: 'Yes',
      selector: '#litigationFriendSameAddress_Yes',
    },
    no: {
      label: 'No',
      selector: '#litigationFriendSameAddress_No',
    },
  },
};

export const inputs = {
  firstName: {
    label: 'First name(s)',
    selector: '#litigationFriendFirstName',
  },
  lastName: {
    label: 'Last name',
    selector: '#litigationFriendLastName',
  },
};
