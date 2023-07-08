const {I} = inject();
const config = require('./../../config');

module.exports = {
  oldFields: function (party) {
    return {
      responseCourtCode: `#${party}DQRequestedCourt_responseCourtCode`,
    };
  },
  fields: function (party) {
    return {
      requestHearingAtSpecificCourt: {
        id: `#${party}DQRequestedCourt_requestHearingAtSpecificCourt`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      hearingToBeHeldRemotely: {
        id: `#${party}DQRequestedCourt_hearingToBeHeldRemotely`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      hearingToBeHeldRemotelyReason: `#${party}DQRequestedCourt_hearingToBeHeldRemotelyReason`,

      reasonForHearingAtSpecificCourt: `#${party}DQRequestedCourt_reasonForHearingAtSpecificCourt`,
      courtLocation: {
        id: `#${party}DQRequestedCourt_responseCourtLocations`,
        options: {
          defendantPreferredCourt: config.liverpoolCourt
        }
      }
    };
  },

  async selectSpecificCourtForHearing(party) {
    I.waitForElement(this.fields(party).requestHearingAtSpecificCourt.id);
    await I.runAccessibilityTest();

    I.selectOption(this.fields(party).courtLocation.id, this.fields(party).courtLocation.options.defendantPreferredCourt);

    I.fillField(this.fields(party).reasonForHearingAtSpecificCourt, 'A reason for the court');

    await I.selectOption(this.fields(party).hearingToBeHeldRemotely.id, () => {
      I.click(this.fields(party).hearingToBeHeldRemotely.options.yes);
    });

    I.fillField(this.fields(party).hearingToBeHeldRemotelyReason, 'Reason for remote hearing');

    await I.clickContinue();
  },
};
