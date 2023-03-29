const {dateNoWeekends} = require('../../api/dataHelper');

module.exports = {
  informExtension: async (camundaEvent = 'CREATE_CLAIM_SPEC') => {
    const extension = {
      userInput: {
        ExtensionDate: {
          respondentSolicitor1AgreedDeadlineExtension: await dateNoWeekends(40)
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
