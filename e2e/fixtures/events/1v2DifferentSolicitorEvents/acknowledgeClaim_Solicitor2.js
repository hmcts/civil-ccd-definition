const { date, buildAddress } = require('../../../api/dataHelper');
const uuid = require('uuid');

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
      respondent2: {
        type: 'INDIVIDUAL',
        individualFirstName: 'Foo',
        individualLastName: 'Bar',
        individualTitle: 'Dr',
        primaryAddress: buildAddress('second respondent'),
        individualDateOfBirth: date(-1),
        partyName: 'Dr Foo Bar',
        partyTypeDisplayValue: 'Individual',
        flags: {
          partyName: 'Dr Foo Bar',
          roleOnCase: 'Defendant 2'
        }
      }
    },
    ResponseIntention: {
      respondent2ClaimResponseIntentionType: 'FULL_DEFENCE'
    },
    SolicitorReferences: {
      solicitorReferences: {
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference',
      },
      respondent1ClaimResponseIntentionType: 'FULL_DEFENCE',
      solicitorReferencesCopy: {
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference',
      }
    },
  }
};
