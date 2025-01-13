import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  experts: 'Experts',
};

export const getRadioButtons = (party: Party) => ({
  expertsRequired: {
    label: 'Do you want to use an expert?',
    yes: {
      label: 'Yes',
      selector: `#${party}DQExperts_expertRequired_Yes`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQExperts_expertRequired_No`,
    },
  },
  expertReports: {
    label: 'Have you already sent expert reports or similar to other parties?',
    yes: {
      label: 'Yes',
      selector: `#${party}DQExperts_expertReportsSent-YES`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQExperts_expertReportsSent-NO`,
    },
    notObtained: {
      label: 'Not yet obtained',
      selector: `#${party}DQExperts_expertReportsSent-NOT_OBTAINED`,
    },
  },
  jointExpert: {
    label: 'Do you think the case is suitable for a joint expert?',
    yes: {
      label: 'Yes',
      selector: `#${party}DQExperts_jointExpertSuitable_Yes`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQExperts_jointExpertSuitable_No`,
    },
  },
});

export const getInputs = (party: Party, expertNumber = 0) => ({
  firstName: {
    label: 'First name',
    selector: `#${party}DQExperts_details_${expertNumber}_firstName`,
  },
  lastName: {
    label: 'Last name',
    selector: `#${party}DQExperts_details_${expertNumber}_lastName`,
  },
  emailAddress: {
    label: 'Email Address',
    selector: `#${party}DQExperts_details_${expertNumber}_emailAddress`,
  },
  phoneNumber: {
    label: 'Phone Number',
    selector: `#${party}DQExperts_details_${expertNumber}_phoneNumber`,
  },
  expertise: {
    label: 'Field of expertise',
    selector: `#${party}DQExperts_details_${expertNumber}_fieldOfExpertise`,
  },
  whyRequired: {
    label: 'Why do you need this expert?',
    selector: `#${party}DQExperts_details_${expertNumber}_whyRequired`,
  },
  estimatedCost: {
    label: 'Estimated cost',
    selector: `#${party}DQExperts_details_${expertNumber}_estimatedCost`,
  },
});

export const buttons = {
  addNew: {
    title: 'Add new',
    selector: '.write-collection-add-item__top',
  },
};
