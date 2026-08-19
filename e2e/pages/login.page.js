const {I} = inject();

/*
 * IDAM serves two different login UIs during the HMCTS Access migration:
 *
 *   legacy        one page, email + password together
 *   hmctsAccess   two pages, email then password
 *
 * Both must be supported until the production cutover completes.
 * See DTSCCI-6142 and the HMCTS Access Migration Guide (Confluence, space SISM).
 */
module.exports = {

  fields: {
    username: '#username',
    password: '#password',
  },
  submitButton: 'input[value="Sign in"]',

  hmctsAccess: {
    email: '#email',
    password: '#password',
    // Scoped to the form holding the input: the cookie banner also renders a submit
    // button, and it sits outside any form. Structural rather than text based, because
    // the migration guide states user-facing copy is changing.
    emailSubmit: 'form:has(#email) button[type=submit]',
    passwordSubmit: 'form:has(#password) button[type=submit]',
  },

  // Matches the email field of whichever UI is being served.
  anyUiEmailField: '#username, #email',

  async signIn(user) {
    if (!user.email || !user.password) {
      console.log('*******User details are empty. Cannot login to idam*******');
      return;
    }

    await I.retry(5).waitForElement(this.anyUiEmailField);

    const isHmctsAccessUi = (await I.grabNumberOfVisibleElements(this.hmctsAccess.email)) > 0;
    if (isHmctsAccessUi) {
      await this.hmctsAccessSignIn(user);
    } else {
      await I.fillField(this.fields.username, user.email);
      await I.fillField(this.fields.password, user.password);

      await I.retry(5).waitForElement(this.submitButton);
      await I.click(this.submitButton);
    }
  },

  async hmctsAccessSignIn(user) {
    await I.fillField(this.hmctsAccess.email, user.email);
    await I.click(this.hmctsAccess.emailSubmit);

    // The password field only exists once the email step has been accepted.
    await I.retry(5).waitForElement(this.hmctsAccess.password);
    await I.fillField(this.hmctsAccess.password, user.password);
    await I.click(this.hmctsAccess.passwordSubmit);
  },
};
