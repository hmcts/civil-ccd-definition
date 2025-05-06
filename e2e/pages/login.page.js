const {I} = inject();

module.exports = {

  fields: {
    username: '#username',
    password: '#password',
  },
  submitButton: 'input[value="Sign in"]',

  async signIn(user) {
    if (user.email && user.password) {
      I.waitForElement(this.fields.username);
      I.fillField(this.fields.username, user.email);
      I.fillField(this.fields.password, user.password);

      I.retry(5).waitForElement(this.submitButton);
      I.click(this.submitButton);
    } else {
      console.log('*******User details are empty. Cannot login to idam*******');
    }
  },
};
