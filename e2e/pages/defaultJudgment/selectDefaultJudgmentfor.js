const {I} = inject();

module.exports = {

  fields: {
    defendantDefaultJudgmentOptions: {
      //id: '#defendantDetails',
      id: '#defendantDetailsSpec',
      options: {
        //defendantname: '#defendantDetails > fieldset > div',
        defendantname: '#defendantDetailsSpec > fieldset > div',
        //both: '#defendantDetails > fieldset > div::nth-of-type(3)',
        both: '#defendantDetailsSpec > fieldset > div:nth-of-type(3)'
      }
    },
    statementsApplyForDJ:{
      id: '#CPRAcceptance_acceptance-CERTIFIED',
      /*options: {
        yes: '#CPRConfirmation1_Yes',
        no: '#CPRConfirmation1_No'
      }*/
    },

    defendantPartialPayment:{
      id: '#paymentConfirmationDecisionSpec_radio',
      options: {
        yes: '#partialPayment_Yes',
        no: '#partialPayment_No'
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
        repaymentPlan: '#paymentTypeSelection-REPAYMENT_PLAN',
      }
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
      preferredLocation: '#hearingSupportRequirementsDJ_hearingPreferredLocation',
      preferredPhone: '#hearingSupportRequirementsDJ_hearingPreferredTelephoneNumber1',
      preferredEmail: '#hearingSupportRequirementsDJ_hearingPreferredEmail',
      estimatedTime: '#hearingSupportRequirementsDJ_hearingLengthEstimate-15_MINUTES',
      attendHearing: '#hearingSupportRequirementsDJ_hearingUnavailableDates_No',
    }
  },

  async againstWhichDefendant() {
    await within(this.fields.defendantDefaultJudgmentOptions.id, () => {
      I.click(this.fields.defendantDefaultJudgmentOptions.options.defendantname);
    });
    await I.clickContinue();
  },

  async againstBothDefendants() {
    await within(this.fields.defendantDefaultJudgmentOptions.id, () => {
      I.click(this.fields.defendantDefaultJudgmentOptions.options.both);
    });
    await I.clickContinue();
  },

  async hasDefendantMadePartialPayment(){
    await I.click(this.fields.defendantPartialPayment.options.no);
    await I.clickContinue();
  },

  async claimForFixedCosts(){
    await I.click(this.fields.claimForFixedCosts.options.no);
    await I.clickContinue();
  },

  async repaymentSummary(){
    await I.clickContinue();
  },

  async paymentTypeSelection(){
    await I.click(this.fields.paymentTypeSelection.options.immediately);
    await I.clickContinue();
  },

  async statementToCertify() {
    //await within(this.fields.statementsApplyForDJ.id, () => {
    await I.click(this.fields.statementsApplyForDJ.id);
    // });
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
    I.fillField(this.fields.hearingRequirements.preferredLocation, 'Aberystwyth County Court');
    I.fillField(this.fields.hearingRequirements.preferredPhone, '02087666666');
    I.fillField(this.fields.hearingRequirements.preferredEmail, 'test@test.com');
    I.click(this.fields.hearingRequirements.estimatedTime);
    I.click(this.fields.hearingRequirements.attendHearing);
    await I.clickContinue();
  }


};

