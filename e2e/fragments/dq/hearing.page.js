const {I} = inject();
const date = require('../../fragments/date');

module.exports = {

  fields: function (party) {
    return {
      unavailableDatesRequired: {
        id: `#${party}DQHearing_unavailableDatesRequired`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      //respondent1DQHearing_unavailableDates_0_unavailableDateType
      unavailableDates: {
        id: `#${party}DQHearing_unavailableDates`,
        element: {
          unavailableDateType: {
            id: `#${party}DQHearing_unavailableDates_0_unavailableDateType`,
            options: {
              singleDateId: `#${party}DQHearing_unavailableDates_0_unavailableDateType-SINGLE_DATE`,
              dateRangeId: `#${party}DQHearing_unavailableDates_0_unavailableDateType-DATE_RANGE`
            }
          },
          date: 'date',
        }
      },
    };
  },

  async enterHearingInformation(party) {
    I.waitForElement(this.fields(party).unavailableDatesRequired.id);
    await I.runAccessibilityTest();

    await within(this.fields(party).unavailableDatesRequired.id, () => {
      I.click(this.fields(party).unavailableDatesRequired.options.yes);
    });
    await this.addUnavailableDates(party);

    await I.clickContinue();
  },

  async addUnavailableDates(party) {
    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields(party).unavailableDates.element.unavailableDateType.id);
    I.forceClick(this.fields(party).unavailableDates.element.unavailableDateType.options.singleDateId);
    await date.enterDate(this.fields(party).unavailableDates.element.date);
  },
};
