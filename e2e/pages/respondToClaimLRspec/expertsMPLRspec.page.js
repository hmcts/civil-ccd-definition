const {I} = inject();

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
        element: {
          name: `#${party}DQExperts_details_0_name`,
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
      I.click(this.fields(party).expertRequired.options.no);
    });

    await I.clickContinue();

  },

};
