const I = actor();

module.exports = {

  fields: {
    username: '#username',
    password: '#password',
    submitButton: 'input[value="Sign in"]',
  },

  signIn(user) {
    if (user.email && user.password) {
      I.waitForSelector(this.fields.username, 10);
      I.fillField(this.fields.username, user.email);
      I.fillField(this.fields.password, user.password);
      I.retry(5).waitForElement(this.fields.submitButton);
      I.click(this.fields.submitButton);
    } else {
      console.log('*******User details are empty. Cannot login to idam*******');
    }
  },
};
