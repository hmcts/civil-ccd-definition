const {I} = inject();
const {checkCourtLocationDynamicListIsEnabled} = require('./../../api/testingSupport');
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

      reasonForHearingAtSpecificCourt: `#${party}DQRequestedCourt_reasonForHearingAtSpecificCourt`,
      courtLocation: {
        id: `#${party}DQRequestedCourt_responseCourtLocations`,
        options: {
          defendantPreferredCourt: 'Liverpool Civil and Family Court - 35, VERNON STREET, CITY SQUARE - L2 2BX'
        }
      }
    };
  },

  async selectSpecificCourtForHearing(party) {
    I.waitForElement(this.fields(party).requestHearingAtSpecificCourt.id);
    await I.runAccessibilityTest();

    let isCourtListEnabled = await checkCourtLocationDynamicListIsEnabled();
    if (!isCourtListEnabled || !(['preview', 'demo'].includes(config.runningEnv))) {
      await within(this.fields(party).requestHearingAtSpecificCourt.id, () => {
        I.click(this.fields(party).requestHearingAtSpecificCourt.options.yes);
      });
      I.fillField(this.oldFields(party).responseCourtCode, '343');
    } else {
      I.selectOption(this.fields(party).courtLocation.id, this.fields(party).courtLocation.options.defendantPreferredCourt);
    }

    I.fillField(this.fields(party).reasonForHearingAtSpecificCourt, 'A reason for the court');
    await I.clickContinue();
  },
};
