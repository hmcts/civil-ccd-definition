const {I} = inject();

module.exports = {

  fields: {
    defendantDefaultJudgmentOptions: {
      id: '#defendantDetails',
      options: {
        defendantname: '#defendantDetails > fieldset > div',
        both: '#defendantDetails > fieldset > div:nth-of-type(3)'
      }
    },
   /* statementsApplyForDJ:{
      id: '#CPRAcceptance_acceptance-CERTIFIED'
    },*/

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

/*  async againstOneDefendant() {
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
  },*/

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
    //await within(this.fields.statementsApplyForDJ.id, () => {
    //await I.click(this.fields.statementsApplyForDJ.id);
    // });
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
    I.fillField(this.fields.hearingRequirements.preferredLocation, 'Aberystwyth Justice Centre - Y LANFA, TREFECHAN - SY23 1AS');
    I.fillField(this.fields.hearingRequirements.preferredPhone, '02087666666');
    I.fillField(this.fields.hearingRequirements.preferredEmail, 'test@test.com');
    I.click(this.fields.hearingRequirements.estimatedTime);
    I.click(this.fields.hearingRequirements.attendHearing);
    await I.clickContinue();
  }
};

