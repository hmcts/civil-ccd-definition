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
      remoteHearingRequested: {
        id: `#${party}DQRemoteHearing_remoteHearingRequested`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      reasonForRemoteHearing: `#${party}DQRemoteHearing_reasonForRemoteHearing`,
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
    await within(this.fields(party).remoteHearingRequested.id, () => {
      I.click(this.fields(party).remoteHearingRequested.options.yes);
    });

    I.fillField(this.fields(party).reasonForRemoteHearing, 'Reason for remote hearing');
    await I.clickContinue();
  },
};
