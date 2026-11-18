const {I} = inject();


module.exports = {

  fields: {
    username: '#email',
    password: '#password',
  },
  continueButton: 'form button[type="submit"]',

  async signIn(user) {
    if (user.email && user.password) {
      await I.waitForElement(this.fields.username, 10);
      await I.fillField(this.fields.username, user.email);

      await I.waitForElement(this.continueButton, 10);
      await I.click(this.continueButton);

      await I.waitForElement(this.fields.password, 10);
      await I.fillField(this.fields.password, user.password);

      await I.waitForElement(this.continueButton, 10);
      await I.click(this.continueButton);
    } else {
      console.log('*******User details are empty. Cannot login to idam*******');
    }
  },
};
