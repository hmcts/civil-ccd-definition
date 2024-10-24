const {I} = inject();

module.exports = {

  fields: {
    reqUpdate: '#manageStayOption-REQUEST_UPDATE',
    liftStay: '#manageStayOption-LIFT_STAY',
  },

  async verifyReqUpdateSteps(state = 'JUDICIAL_REFERRAL') {
    await I.waitForText('Request an update on I case');
    await I.click(I.fields.reqUpdate);
    await I.waitForText('A notification will be sent to all parties, asking them for an update on the case.');
    await I.waitForText('After 7 days, a new task will be created to progress the case.');
    await I.click('Continue');
    await I.waitForText('You are requesting an update on I case, the stay will not be lifted.');
    await I.waitForText('A notification will be sent to all parties, asking for an update on the case.');
    await I.waitForText('After 7 days, a new task will be created to progress the case.');
  },

  async verifyLiftCaseStaySteps(state = 'JUDICIAL_REFERRAL') {
    await I.waitForText('Lift the stay from I case');
    if (['IN_MEDIATION', 'JUDICIAL_REFERRAL'].includes(state)) {
      await I.waitForText('By lifting the stay, I case will automatically be sent to a judge.');
      await I.waitForText('I will also raise a work allocation task for a judge to make a standard directions order for I case.');
    } else if (['CASE_PROGRESSION', 'HEARING_READINESS', 'PREPARE_FOR_CONDUCT_HEARING'].includes(state)) {
      await I.waitForText('By lifting the stay, I case will return to \'Case progression\' state.');
      await I.waitForText('A caseworker may need to schedule the next hearing for I case.');
    }
  }
};