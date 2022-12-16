const {I} = inject();
const {checkToggleEnabled} = require('./../../api/testingSupport');

module.exports = {

  fields: function (party) {
    return {
      expertRequired: {
        id: `#${party}DQExperts_expertRequired`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      expertReportsSent: {
        id: `#${party}DQExperts_expertReportsSent`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      jointExpertSuitable: {
        id: `#${party}DQExperts_jointExpertSuitable`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      expertDetails: {
        id: `#${party}DQExperts_details'`,
        oldElements: {
          name: `#${party}DQExperts_details_0_name`,
          fieldOfExpertise: `#${party}DQExperts_details_0_fieldOfExpertise`,
          whyRequired: `#${party}DQExperts_details_0_whyRequired`,
          estimatedCost: `#${party}DQExperts_details_0_estimatedCost`,
        },
        elements: {
          firstName: `${party}DQExperts_details_0_firstName`,
          // lastName: `#${party}DQExperts_details_0_surname`,
          lastName: `${party}DQExperts_details_0_lastName`,
          emailAddress: `${party}DQExperts_details_0_emailAddress`,
          phoneNumber: `${party}DQExperts_details_0_phoneNumber`,
          fieldOfExpertise: `#${party}DQExperts_details_0_fieldOfExpertise`,
          whyRequired: `#${party}DQExperts_details_0_whyRequired`,
          estimatedCost: `#${party}DQExperts_details_0_estimatedCost`,
        }
      }
    };
  },

  async enterExpertInformation(party) {
    I.waitForElement(this.fields(party).expertRequired.id);
    await I.runAccessibilityTest();
    await within(this.fields(party).expertRequired.id, () => {
      I.click(this.fields(party).expertRequired.options.yes);
    });

    await within(this.fields(party).expertReportsSent.id, () => {
      I.click(this.fields(party).expertReportsSent.options.yes);
    });

    await within(this.fields(party).jointExpertSuitable.id, () => {
      I.click(this.fields(party).jointExpertSuitable.options.yes);
    });

    let isHNLEnabled = await checkToggleEnabled('hearing-and-listing-sdo');
    if (!isHNLEnabled) {
      await this.addExpertOldFields(party);
    } else {
      await this.addExpert(party);
    }

    await I.clickContinue();
  },

  async addExpert(party) {
    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields(party).expertDetails.elements.firstName);
    I.fillField(this.fields(party).expertDetails.elements.firstName, 'John');
    I.fillField(this.fields(party).expertDetails.elements.lastName, 'Smith');
    I.fillField(this.fields(party).expertDetails.elements.emailAddress, 'johnsmith@email.com');
    I.fillField(this.fields(party).expertDetails.elements.phoneNumber, '07000111000');
    I.fillField(this.fields(party).expertDetails.elements.fieldOfExpertise, 'Science');
    I.fillField(this.fields(party).expertDetails.elements.whyRequired, 'Reason why required');
    I.fillField(this.fields(party).expertDetails.elements.estimatedCost, '100');
  },

  async addExpertOldFields(party) {
    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields(party).expertDetails.oldElements.name);
    I.fillField(this.fields(party).expertDetails.oldElements.name, 'John Smith');
    I.fillField(this.fields(party).expertDetails.oldElements.fieldOfExpertise, 'Science');
    I.fillField(this.fields(party).expertDetails.oldElements.whyRequired, 'Reason why required');
    I.fillField(this.fields(party).expertDetails.oldElements.estimatedCost, '100');
  },
};
