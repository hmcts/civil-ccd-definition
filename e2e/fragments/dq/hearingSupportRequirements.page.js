const {checkHnlLegalRepToggleEnabled} = require('../../api/testingSupport');
const {I} = inject();

module.exports = {

  fields: function (party) {
    return {
      requirements: {
        options: {
          disabledAccess: `#${party}DQHearingSupport_requirements-DISABLED_ACCESS`,
          hearingLoop: `#${party}DQHearingSupport_requirements-HEARING_LOOPS`,
          signLanguage: `#${party}DQHearingSupport_requirements-SIGN_INTERPRETER`,
          languageInterpreter: `#${party}DQHearingSupport_requirements-LANGUAGE_INTERPRETER`,
          other: `#${party}DQHearingSupport_requirements-OTHER_SUPPORT`
        }
      },
      signLanguageRequired: `#${party}DQHearingSupport_signLanguageRequired`,
      languageToBeInterpreted: `#${party}DQHearingSupport_languageToBeInterpreted`,
      otherSupport: `#${party}DQHearingSupport_otherSupport`,
      supportRequirements: {
        id: `#${party}DQHearingSupport_supportRequirements`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      supportRequirementsAdditional: `#${party}DQHearingSupport_supportRequirementsAdditional`
    };
  },

  async selectRequirements(party) {

    let isHnlEnabled = await checkHnlLegalRepToggleEnabled();

    if (!isHnlEnabled) {
      I.waitForElement(this.fields(party).requirements.options.disabledAccess);
      await I.runAccessibilityTest();
      I.checkOption(this.fields(party).requirements.options.signLanguage);
      I.checkOption(this.fields(party).requirements.options.languageInterpreter);
      I.checkOption(this.fields(party).requirements.options.other);

      I.fillField(this.fields(party).signLanguageRequired, 'A language');
      I.fillField(this.fields(party).languageToBeInterpreted, 'A language');
      I.fillField(this.fields(party).otherSupport, 'Some support');
    }
    else  {
      I.waitForElement(this.fields(party).supportRequirements.id);
      await I.runAccessibilityTest();
      await within(this.fields(party).supportRequirements.id, () => {
        I.click(this.fields(party).supportRequirements.options.yes);
      });
      I.fillField(this.fields(party).supportRequirementsAdditional, 'Reason for support');
    }
    await I.clickContinue();
  },
};
