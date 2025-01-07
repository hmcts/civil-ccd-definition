export const subheadings = {
  experts: 'Experts',
};

const getRadioButtons = (defendantNumber: number) => ({
  expertsRequired: {
    label: 'Do you want to use an expert?',
    yes: {
      label: 'Yes',
      selector: `#respondent${defendantNumber}DQExperts_expertRequired_Yes`,
    },
    no: {
      label: 'No',
      selector: `#respondent${defendantNumber}DQExperts_expertRequired_No`,
    },
  },
  expertReports: {
    label: 'Have you already sent expert reports or similar to other parties?',
    yes: {
      label: 'Yes',
      selector: `#respondent${defendantNumber}DQExperts_expertReportsSent-YES`,
    },
    no: {
      label: 'No',
      selector: `#respondent${defendantNumber}DQExperts_expertReportsSent-NO`,
    },
    notObtained: {
      label: 'Not yet obtained',
      selector: `#respondent${defendantNumber}DQExperts_expertReportsSent-NOT_OBTAINED`,
    },
  },
  jointExpert: {
    label: 'Do you think the case is suitable for a joint expert?',
    yes: {
      label: 'Yes',
      selector: `#respondent${defendantNumber}DQExperts_jointExpertSuitable_Yes`,
    },
    no: {
      label: 'No',
      selector: `#respondent${defendantNumber}DQExperts_jointExpertSuitable_No`,
    },
  },
});

const getInputs = (defendantNumber: number) => ({
  firstName: {
    label: 'First name',
    selector: `#respondent${defendantNumber}DQExperts_details_0_firstName`,
  },
  lastName: {
    label: 'Last name',
    selector: `#respondent${defendantNumber}DQExperts_details_0_lastName`,
  },
  emailAddress: {
    label: 'Email Address',
    selector: `#respondent${defendantNumber}DQExperts_details_0_emailAddress`,
  },
  phoneNumber: {
    label: 'Phone Number',
    selector: `#respondent${defendantNumber}DQExperts_details_0_phoneNumber`,
  },
  expertise: {
    label: 'Field of expertise',
    selector: `#respondent${defendantNumber}DQExperts_details_0_fieldOfExpertise`,
  },
  whyRequired: {
    label: 'Why do you need this expert?',
    selector: `#respondent${defendantNumber}DQExperts_details_0_whyRequired`,
  },
  estimatedCost: {
    label: 'Estimated cost',
    selector: `#respondent${defendantNumber}DQExperts_details_0_estimatedCost`,
  },
});

export const buttons = {
  addNew: {
    title: 'Add new',
    selector: '.write-collection-add-item__top',
  },
};
