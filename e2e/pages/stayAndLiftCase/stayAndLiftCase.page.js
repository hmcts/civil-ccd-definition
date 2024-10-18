const {I} = inject();

module.exports = {

  fields: {
    reqUpdate: '#manageStayOption-REQUEST_UPDATE',
    liftStay: '#manageStayOption-LIFT_STAY',
  },

  async verifyReqUpdateSteps(state = 'JUDICIAL_REFERRAL') {
    await this.waitForText('Request an update on this case');
    await I.click(this.fields.reqUpdate);
    await this.waitForText('A notification will be sent to all parties, asking them for an update on the case.');
    await this.waitForText('After 7 days, a new task will be created to progress the case.');
    await I.click('Continue');
    await this.waitForText('You are requesting an update on this case, the stay will not be lifted.');
    await this.waitForText('A notification will be sent to all parties, asking for an update on the case.');
    await this.waitForText('After 7 days, a new task will be created to progress the case.');
  },

  async verifyLiftCaseStaySteps(state = 'JUDICIAL_REFERRAL') {
    await this.waitForText('Lift the stay from this case');
    if (['IN_MEDIATION', 'JUDICIAL_REFERRAL'].includes(state)) {
      await this.waitForText('By lifting the stay, this case will automatically be sent to a judge.');
      await this.waitForText('This will also raise a work allocation task for a judge to make a standard directions order for this case.');
    } else if (['CASE_PROGRESSION', 'HEARING_READINESS', 'PREPARE_FOR_CONDUCT_HEARING'].includes(state)) {
      await this.waitForText('By lifting the stay, this case will return to \'Case progression\' state.');
      await this.waitForText('A caseworker may need to schedule the next hearing for this case.');
    }
  }
};