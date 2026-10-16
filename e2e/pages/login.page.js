const {I} = inject();


module.exports = {

  fields: {
    username: '#email',
    password: '#password',
  },
  continueButton: 'form button[type="submit"]',

  async signIn(user) {
    if (user.email && user.password) {
      await I.retry(5).waitForElement(this.fields.username);
      await I.fillField(this.fields.username, user.email);
      await I.retry(5).waitForElement(this.continueButton);
      await I.click(this.continueButton);

      await I.retry(5).waitForElement(this.fields.password);
      await I.fillField(this.fields.password, user.password);
      await I.retry(5).waitForElement(this.continueButton);
      await I.click(this.continueButton);
    } else {
      console.log('*******User details are empty. Cannot login to idam*******');
    }
  },
};
