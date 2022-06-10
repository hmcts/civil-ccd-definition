const {I} = inject();

module.exports = {

  fields: {
    defendantDefaultJudgmentOptions: {
      id: '#defendantDetails',
      options: {
        defendantname: '#defendantDetails > fieldset > div',
      }
    },
    statementsApplyForDJ:{
      id: '#CPRConfirmation1_radio',
      options: {
        yes: '#CPRConfirmation1_Yes',
        no: '#CPRConfirmation1_No'
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

  async statementToCertify() {
    await within(this.fields.statementsApplyForDJ.id, () => {
      I.click(this.fields.statementsApplyForDJ.options.yes);
    });
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

