module.exports = {
  valid: {
    Applicant1SolicitorEmail: {
      isApplicant1: 'Yes',
      isRespondent1: 'No',
      isRespondent2: 'No',
      applicantSolicitor1UserDetails: {
        email: 'mock-applicant-1-solicitor-email@gmail.com',
      }
    },
    Respondent1SolicitorEmail: {
      isApplicant1: 'No',
      isRespondent1: 'Yes',
      isRespondent2: 'No',
      respondentSolicitor1EmailAddress: 'mock-respondent-1-solicitor-email@gmail.com'
    },
    Respondent2SolicitorEmail: {
      isApplicant1: 'No',
      isRespondent1: 'No',
      isRespondent2: 'Yes',
      respondentSolicitor1EmailAddress: 'mock-respondent-2-solicitor-email@gmail.com'
    }
  }
};
