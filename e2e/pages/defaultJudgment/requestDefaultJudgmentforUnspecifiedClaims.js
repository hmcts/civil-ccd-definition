const {I} = inject();
const config = require('../../config.js');

module.exports = {

  fields: {
    defendantDefaultJudgmentOptions: {
      id: '#defendantDetails',
      options: {
        defendantname: '#defendantDetails > fieldset > div',
        both: '#defendantDetails > fieldset > div:nth-of-type(3)'
      }
    },

    statementsApplyForDJ:{
      options: {
        ONE_V_ONE: '#CPRAcceptance_acceptance-CERTIFIED',
        ONE_V_TWO: '#CPRAcceptance2Def_acceptance-CERTIFIED'
      }
    },

    claimForFixedCosts:{
      id: '#partialPayment',
      options: {
        yes: '#paymentConfirmationDecisionSpec_Yes',
        no: '#paymentConfirmationDecisionSpec_No'
      }
    },

    paymentTypeSelection:{
      id: '#paymentTypeSelection',
      options: {
        immediately: '#paymentTypeSelection-IMMEDIATELY',
        setDate: '#paymentTypeSelection-SET_DATE',
        repaymentPlan: '#paymentTypeSelection-REPAYMENT_PLAN'
      }
    },

    CaseManagementOrderSelectionForDJTask:{
      text: 'What order would you like to make',
      id: '#caseManagementOrderSelection',
      options: {
        disposalHearing: '#caseManagementOrderSelection-DISPOSAL_HEARING',
        trialHearing: '#caseManagementOrderSelection-TRIAL_HEARING'
      },
      additionDirectionsBuildingDispute: '#caseManagementOrderAdditional-OrderTypeTrialAdditionalDirectionsBuildingDispute'
    },

    selectOrderAndHearingDetailsForDJTask:{
      text: 'Order and hearing details',
      disposalHearingTimeId: '#disposalHearingFinalDisposalHearingDJ_time',
      disposalHearingTimeOptions: {
        thirtyMinutes: '#disposalHearingFinalDisposalHearingDJ_time-THIRTY_MINUTES',
        fifteenMinutes: '#disposalHearingFinalDisposalHearingDJ_time-FIFTEEN_MINUTES'
      },
      hearingMethodId: '#disposalHearingMethodDJ',
      hearingMethodOptions: {
        inPerson: '#disposalHearingMethodDJ-disposalHearingMethodInPerson',
        video: '#disposalHearingMethodDJ-disposalHearingMethodVideoConferenceHearing',
        telephone: '#disposalHearingMethodDJ-disposalHearingMethodTelephoneHearing'
      },
      hearingLocation: '#disposalHearingMethodInPersonDJ',
      hearingBundleId: '#disposalHearingBundleDJ_type',
      hearingBundleTypeDocs: '#disposalHearingBundleDJ_type-DOCUMENTS',
      hearingBundleTypeSummary: '#ådisposalHearingBundleDJ_type-SUMMARY',
      hearingBundleTypeElectronic: '#disposalHearingBundleDJ_type-ELECTRONIC'
    },

    hearingSelectionForDJ:{
      id: '#hearingSelection',
      options: {
        disposalHearing: '#hearingSelection-DISPOSAL_HEARING',
        trialHearing: '#hearingSelection-TRIAL_HEARING'
      },
      details: '#detailsOfDirection'
    },

    hearingRequirements:{
      id: '#hearingSupportRequirementsDJ_hearingType',
      options: {
        inPerson: '#hearingSupportRequirementsDJ_hearingType-IN_PERSON',
        videoconf: '#hearingSupportRequirementsDJ_hearingType-VIDEO_CONF',
        telephone: '#hearingSupportRequirementsDJ_hearingType-TELEPHONE_HEARING'
      },
      preferredLocation: '#hearingSupportRequirementsDJ_hearingTemporaryLocation',
      preferredPhone: '#hearingSupportRequirementsDJ_hearingPreferredTelephoneNumber1',
      preferredEmail: '#hearingSupportRequirementsDJ_hearingPreferredEmail',
      estimatedTime: '#hearingSupportRequirementsDJ_hearingLengthEstimate-15_MINUTES',
      attendHearing: '#hearingSupportRequirementsDJ_hearingUnavailableDates_No'
    }
  },

  async againstWhichDefendant(scenario) {
    if(scenario==='ONE_V_ONE'){
      await within(this.fields.defendantDefaultJudgmentOptions.id, () => {
        I.click(this.fields.defendantDefaultJudgmentOptions.options.defendantname);
      });
    }else if (scenario==='ONE_V_TWO'){
      await within(this.fields.defendantDefaultJudgmentOptions.id, () => {
        I.click(this.fields.defendantDefaultJudgmentOptions.options.both);
      });
    }
    await I.clickContinue();
  },

  async statementToCertify(scenario) {
    if(scenario==='ONE_V_ONE'){
      await I.click(this.fields.statementsApplyForDJ.options.ONE_V_ONE);
    }else if (scenario==='ONE_V_TWO'){
      await I.click(this.fields.statementsApplyForDJ.options.ONE_V_TWO);
    }
    await I.clickContinue();
  },

  async hearingSelection(){
    await within(this.fields.hearingSelectionForDJ.id, () => {
      I.click(this.fields.hearingSelectionForDJ.options.disposalHearing);
    });
    I.fillField(this.fields.hearingSelectionForDJ.details, 'Directions expected');
    await I.clickContinue();
  },

  async hearingRequirements(){
    await within(this.fields.hearingRequirements.id, () => {
      I.click(this.fields.hearingRequirements.options.inPerson);
    });
    I.fillField(this.fields.hearingRequirements.preferredLocation, config.djClaimantSelectedCourt);
    I.fillField(this.fields.hearingRequirements.preferredPhone, '02087666666');
    I.fillField(this.fields.hearingRequirements.preferredEmail, 'test@test.com');
    I.click(this.fields.hearingRequirements.estimatedTime);
    I.click(this.fields.hearingRequirements.attendHearing);
    await I.clickContinue();
  },

  async selectCaseManagementOrder(orderType = 'DisposalHearing') {
    await I.waitForText(this.fields.CaseManagementOrderSelectionForDJTask.text);
    await within(this.fields.CaseManagementOrderSelectionForDJTask.id, () => {
      if (orderType == 'DisposalHearing') {
        I.click(this.fields.CaseManagementOrderSelectionForDJTask.options.disposalHearing);
      } else {
        I.click(this.fields.CaseManagementOrderSelectionForDJTask.options.trialHearing);
        I.waitForElement(this.fields.CaseManagementOrderSelectionForDJTask.additionDirectionsBuildingDispute);
        I.click(this.fields.CaseManagementOrderSelectionForDJTask.additionDirectionsBuildingDispute);
      }
    });
    await I.clickContinue();
  },
  
  async selectOrderAndHearingDetailsForDJTask(orderType = 'DisposalHearing') {
    await I.waitForText(this.fields.selectOrderAndHearingDetailsForDJTask.text);
    if (orderType == 'DisposalHearing') {
      await I.click(this.fields.selectOrderAndHearingDetailsForDJTask.disposalHearingTimeOptions.thirtyMinutes);
      await I.click(this.fields.selectOrderAndHearingDetailsForDJTask.hearingMethodOptions.inPerson);
      await I.fillField(this.fields.selectOrderAndHearingDetailsForDJTask.hearingLocation, config.djJudgeClaimantSelectedCourt);
      await I.click(this.fields.selectOrderAndHearingDetailsForDJTask.hearingBundleTypeDocs);
    }
    await I.clickContinue();
  },
  
  async verifyOrderPreview() {
    const linkXPath = '//a[contains(text(), \'Order_disposal_pdf_\')]';
    await I.waitForClickable(linkXPath);
    await I.clickContinue();
  },

  async performAndVerifyTransferCaseOffline(caseId) {
    await I.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId);
    await I.waitForText('Summary');
    await I.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId + '/trigger/TAKE_CASE_OFFLINE/submit');
    await I.waitForText('Take case offline');
    await I.click('Submit');
    await I.waitForText('Case list');
    await I.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId + '#History');
    await I.waitForText('Case Proceeds Offline');
  }
};
