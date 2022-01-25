const {I} = inject();

module.exports = {

  fields: {
    confirmation: {
      id: '#confirmation-body'
    },
    applicationList: '#confirmation-body li'
  },

  async verifyConfirmationPage() {
    I.waitForElement(this.fields.confirmation.id);
    I.seeInCurrentUrl('INITIATE_GENERAL_APPLICATION/confirm');
    I.seeTextEquals('You have made an application', '#confirmation-header h1');
  },

  async verifyApplicationType(appTypes) {
    I.waitForElement(this.fields.confirmation.id);
    appTypes.forEach(type => {
      return I.see(type);
    });
  }
};

