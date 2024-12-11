export const heading = 'Further information';

export const radioButtons = (defendantNumber: number) => ({
  yes: {
    selector: `#respondent${defendantNumber}DQFurtherInformation_futureApplications_Yes`,
  },
  no: {
    selector: `#respondent${defendantNumber}DQFurtherInformation_futureApplications_No`,
  },
});

export const whatForForm = (defendantNumber: number) => ({
  selector: `#respondent${defendantNumber}DQFurtherInformation_reasonForFutureApplications`,
});

export const furtherInformationForm = (defendantNumber: number) => ({
  selector: `#respondent${defendantNumber}DQFurtherInformation_otherInformationForJudge`,
});
