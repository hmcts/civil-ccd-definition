const {I} = inject();

const options = {
  fullDefence: 'Reject all of the claim',
  fullAdmission: 'Admit all of the claim',
  partAdmission: 'Admit part of the claim',
  counterClaim: 'Reject all of the claim and wants to counterclaim'
}

module.exports = {
  fields: {
    respondent1ClaimResponseType: {
      id: '#respondent1ClaimResponseType',
      options
    },
    respondent2ClaimResponseType: {
      id: '#respondent2ClaimResponseType',
      options
    },
    respondent1ClaimResponseTypeToApplicant2: {
      id: '#respondent1ClaimResponseTypeToApplicant2',
      options
    },
  },

  async selectResponseType({defendant1Response, defendant2Response, defendant1ResponseToApplicant2}) {
    // eslint-disable-next-line no-prototype-builtins
    await this.checkResponseValidity(this.fields.respondent1ClaimResponseType, defendant1Response);
    await this.inputResponse(this.fields.respondent1ClaimResponseType, defendant1Response)

    if(defendant2Response) {
      await this.checkResponseValidity(this.fields.respondent2ClaimResponseType, defendant2Response);
      await this.inputResponse(this.fields.respondent2ClaimResponseType, defendant2Response);
    }

    if(defendant1ResponseToApplicant2) {
      await this.checkResponseValidity(this.fields.respondent1ClaimResponseTypeToApplicant2, defendant1ResponseToApplicant2);
      await this.inputResponse(this.fields.respondent1ClaimResponseTypeToApplicant2, defendant1ResponseToApplicant2);
    }
    await I.clickContinue();
  },

  async inputResponse(responseField, responseType) {
    I.waitForElement(responseField.id);
    await I.runAccessibilityTest();
    await within(responseField.id, () => {
      I.click(responseField.options[responseType]);
    });
  },

  async checkResponseValidity(responseField, responseType) {
    if (!responseField.options.hasOwnProperty(responseType)) {
      throw new Error(`Response type: ${responseType} does not exist`);
    }
  }
};

