const {I} = inject();
const config = require('./../../config');

module.exports = {
  fields: {
    trialReadyApplicant: {
      id: '#trialReadyApplicant',
      options: {
        yes: '#trialReadyApplicant-Yes',
        no: '#trialReadyApplicant-No'
      }
    },
    applicantRevisedHearingRequirements: {
      id: '#applicantRevisedHearingRequirements_revisedHearingRequirements_radio',
      options: {
        yes: '#applicantRevisedHearingRequirements_revisedHearingRequirements_Yes',
        no: '#applicantRevisedHearingRequirements_revisedHearingRequirements_No'
      }
    },
    revisedHearingComments: '#applicantRevisedHearingRequirements_revisedHearingComments',
    hearingOtherComments: '#applicantHearingOtherComments_hearingOtherComments'
  },

  async updateTrialConfirmation(readyForTrial = 'yes', hearingRequirementsChanged = 'yes') {
      await I.waitForElement(this.fields.trialReadyApplicant.id);
      await I.runAccessibilityTest();
      if (readyForTrial == 'yes') {
        await I.click(this.fields.trialReadyApplicant.options.yes);
      } else {
        await I.click(this.fields.trialReadyApplicant.options.no);
      }
      await I.waitForElement(this.fields.applicantRevisedHearingRequirements.id);
      if (hearingRequirementsChanged == 'yes') {
        await I.click(this.fields.applicantRevisedHearingRequirements.options.yes);
        await I.waitForElement(this.fields.revisedHearingComments);
        await I.fillField(this.fields.revisedHearingComments, 'Revised hearing comments');
      } else {
        await I.waitForElement(this.fields.applicantRevisedHearingRequirements.options.no);
      }
      await I.fillField(this.fields.hearingOtherComments, 'Court needs to know this info');
      await I.clickContinue();
  }
};
