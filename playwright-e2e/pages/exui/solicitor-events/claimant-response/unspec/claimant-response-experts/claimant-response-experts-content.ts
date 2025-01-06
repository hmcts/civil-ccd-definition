export const expertSubHeadings = {
  heading2: 'Experts',
  containerSelector:
    "div[id='applicant1DQExperts_applicant1DQExperts'] h2[class='heading-h2 ng-star-inserted']",
};

export const expertRadioButton = {
  text: 'Do you want to use an expert?',
  radioYes: {
    label: 'Yes',
    selector: '#applicant1DQExperts_expertRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#applicant1DQExperts_expertRequired_No',
  },
};
export const expertReportSent = {
  text: 'Have you already sent expert reports or similar to other parties?',
  reportSentYes: {
    label: 'Yes',
    selector: '#applicant1DQExperts_expertReportsSent-YES',
  },
  reportSentNo: {
    label: 'No',
    selector: '#applicant1DQExperts_expertReportsSent-NO',
  },
  reportNotObtain: {
    label: 'Not yet obtain',
    selector: '#applicant1DQExperts_expertReportsSent-NOT_OBTAINED',
  },
};

export const joinExpertSuitableForm = {
  text: 'Do you think the case is suitable for a joint expert?',
  jointExpertSuitableYes: {
    label: 'Yes',
    selector: '#applicant1DQExperts_jointExpertSuitable_Yes',
  },
  jointExpertSuitableNo: {
    label: 'No',
    selector: '#applicant1DQExperts_jointExpertSuitable_No',
  },
};

export const expertDetailsForm = {
  firstName: {
    label: 'First name',
    selector: '#applicant1DQExperts_details_0_firstName',
  },
  lastName: {
    label: 'Last name',
    selector: '#applicant1DQExperts_details_0_lastName',
  },
  phoneNumber: {
    label: 'Phone number (Optional)',
    selector: '#applicant1DQExperts_details_0_phoneNumber',
  },
  emailAddress: {
    label: 'Email address (Optional)',
    selector: '#applicant1DQExperts_details_0_emailAddress',
  },
  fieldOfExpertise: {
    label: 'Field of expertise',
    selector: '#applicant1DQExperts_details_0_fieldOfExpertise',
  },
  whyRequired: {
    label: 'Why do you need this expert?',
    selector: '#applicant1DQExperts_details_0_whyRequired',
  },
  estimatedCost: {
    label: 'Estimated cost',
    selector: '#applicant1DQExperts_details_0_estimatedCost',
  },
  addNewButton: {
    label: 'Add New',
    selector: "div[id='applicant1DQExperts_details'] button[type='button']",
  },
};
