const {I} = inject();
const {checkToggleEnabled} = require('./../../api/testingSupport');
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
  oldFields: function (party) {
    return {
      hearingLength: {
        id: `#${party}DQHearing_hearingLength`,
        options: {
          lessThanOneDay: 'Less than a day',
          oneDay: 'One day',
          moreThanOneDay: 'More than a day',
        }
      },
      hearingLengthHours: `#${party}DQHearing_hearingLengthHours`,
      hearingLengthDays: `#${party}DQHearing_hearingLengthDays`,
      unavailableDatesRequired: {
        id: `#${party}DQHearing_unavailableDatesRequired`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      unavailableDates: {
        id: `#${party}DQHearing_unavailableDates`,
        element: {
          who: `#${party}DQHearing_unavailableDates_0_who`,
          date: 'date',
        }
      },
    };
  },

  async enterHearingInformation(party) {
    let isHNLEnabled = await checkToggleEnabled('hearing-and-listing-sdo');
    if (!isHNLEnabled) {
      I.waitForElement(this.oldFields(party).hearingLength.id);
      await I.runAccessibilityTest();
      await within(this.oldFields(party).hearingLength.id, () => {
        I.click(this.oldFields(party).hearingLength.options.lessThanOneDay);
      });

      I.fillField(this.oldFields(party).hearingLengthHours, '5');
      await within(this.oldFields(party).unavailableDatesRequired.id, () => {
        I.click(this.oldFields(party).unavailableDatesRequired.options.yes);
      });

      await this.addOldUnavailableDates(party);
    } else {
      I.waitForElement(this.fields(party).unavailableDatesRequired.id);
      await I.runAccessibilityTest();

      await within(this.fields(party).unavailableDatesRequired.id, () => {
        I.click(this.fields(party).unavailableDatesRequired.options.yes);
      });
      await this.addUnavailableDates(party);
    }

    await I.clickContinue();
  },

  async addOldUnavailableDates(party) {
    await I.addAnotherElementToCollection();
    I.waitForElement(this.oldFields(party).unavailableDates.element.who);
    I.fillField(this.oldFields(party).unavailableDates.element.who, 'John Smith');
    await date.enterDate(this.oldFields(party).unavailableDates.element.date);
  },

  async addUnavailableDates(party) {
    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields(party).unavailableDates.element.unavailableDateType);
    I.click(this.fields(party).unavailableDates.element.unavailableDateType.options.singleDateId);
    await date.enterDate(this.fields(party).unavailableDates.element.date);
  },
};
