const {dateNoWeekends} = require('../../api/dataHelper');

module.exports = {
  userInput: {
    ResponseDeadlineExtension: {
      respondentSolicitor1AgreedDeadlineExtension: await dateNoWeekends(40)
    }
  },
  midEventData: {
    ExtensionDate: {
      businessProcess: {
        status: 'FINISHED',
        camundaEvent: 'CREATE_CLAIM_SPEC'
      },
    }
  },

  midEventGeneratedData: {

  }
};
