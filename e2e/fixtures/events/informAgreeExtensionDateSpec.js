const {dateNoWeekends} = require('../../api/dataHelper');

module.exports = {
  informExtension: (camundaEvent = 'CREATE_CLAIM_SPEC') =>
  {
    const extension = {
      userInput: {
        ExtensionDate: {
          respondentSolicitor1AgreedDeadlineExtension: dateNoWeekends(40)
        }
      },
      midEventData: {
        ExtensionDate: {
          businessProcess: {
            status: 'FINISHED',
            camundaEvent: camundaEvent
          },
        }
      },

      midEventGeneratedData: {}
    };
    return extension;
  }
};
