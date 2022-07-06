const { listElement } = require('../../api/dataHelper');

module.exports = {
  valid: {
    defendantDetails: {
      value: {
        code: '23acb892-1ebf-4aa3-a25e-d87a4b0e26fb',
        label: 'sdfg sdfg'
      },
      list_items: [
        {
          code: '23acb892-1ebf-4aa3-a25e-d87a4b0e26fb',
          label: 'sdfg sdfg'
        }
      ]
    },
    HearingSelectionForDJ: {
      HearingSelection: 'DISPOSAL_HEARING',
      detailsOfDirections: 'Details of directions',
    },
    HearingSupportRequirementsDJ: {
      hearingSupportRequirementsDJ: {
        hearingType: 'IN_PERSON',
        hearingLengthEstimate: '15_MINUTES',
        hearingPreferredEmail: 'a@a.com',
        hearingUnavailableDates: 'NO',
        hearingPreferredLocation: '102',
        hearingPreferredTelephoneNumber1: '+447700123456',
        hearingSupportRequirementsDisabledAccess: [
          'DISABLED_ACCESS'
        ]
      }
    }
  }
};
