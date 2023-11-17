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
        primaryAddress: buildAddress('respondent'),
        individualDateOfBirth: date(-1),
        partyName: 'Sir John Doe',
        partyTypeDisplayValue: 'Individual',flags: {
          partyName: 'Sir John Doe',
          roleOnCase: 'Respondent 1'
        },
        partyID: "767407ce-3293-42"
      },
      respondent2: {
        type: 'INDIVIDUAL',
        individualFirstName: 'Foo',
        individualLastName: 'Bar',
        individualTitle: 'Dr',
        primaryAddress: buildAddress('second respondent'),
        individualDateOfBirth: date(-1),
        partyName: 'Dr Foo Bar',
        partyTypeDisplayValue: 'Individual',
      }
    },
    ResponseIntention: {
      respondent2ClaimResponseIntentionType: 'FULL_DEFENCE'
    },
    SolicitorReferences: {
      respondentSolicitor2Reference: 'sol2reference',
      solicitorReferences: {
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference',
      },
      solicitorReferencesCopy: {
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference',
      }
    },
  }
};
