module.exports = {
  informExtension: async (camundaEvent = 'CREATE_CLAIM_SPEC') => {
    const extension = {
      userInput: {
        ExtensionDate: {
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
