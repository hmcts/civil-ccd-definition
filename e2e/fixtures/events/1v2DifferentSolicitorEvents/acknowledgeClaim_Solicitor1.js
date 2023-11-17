const { date, buildAddress } = require('../../../api/dataHelper');

module.exports = {
  midEventData:{
    SolicitorReferences:{
      solicitorReferences:{
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference'
      },
    }
  },
  valid: {
    ConfirmNameAddress: {
      respondent1: {
        type: 'INDIVIDUAL',
        individualFirstName: 'John',
        individualLastName: 'Doe',
        individualTitle: 'Sir',
        individualDateOfBirth: date(-1),
        primaryAddress: buildAddress('respondent'),
        partyName: 'Sir John Doe',
        partyTypeDisplayValue: 'Individual',flags: {
          partyName: 'Sir John Doe',
          roleOnCase: 'Respondent 1'
        },
        partyID: "767407ce-3293-41"
      },
    },
    ResponseIntention: {
      respondent1ClaimResponseIntentionType: 'FULL_DEFENCE'
    },
    SolicitorReferences: {
      solicitorReferences:{
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference'
      },
      solicitorReferencesCopy:{
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference'
      }
    }
  },
  invalid: {
    ConfirmNameAddress: {
      futureDateOfBirth: {
        respondent1: {
          type: 'INDIVIDUAL',
          individualFirstName: 'John',
          individualLastName: 'Doe',
          individualTitle: 'Sir',
          individualDateOfBirth: date(1),
          primaryAddress: buildAddress('respondent')
        }
      }
    }
  }
};
