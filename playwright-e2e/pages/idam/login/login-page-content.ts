/*
 * IDAM serves two different login UIs during the HMCTS Access migration:
 *
 *  - legacyUi        one page, email + password together      (AAT today)
 *  - hmctsAccessUi   two pages, email then password           (ITHC today)
 *
 * Both must be supported until the production cutover completes.
 * See DTSCCI-6142 and the HMCTS Access Migration Guide (Confluence, space SISM).
 */

export const legacyUi = {
  heading: 'Sign in or create an account',
  inputs: {
    email: {
      label: 'Email address',
      selector: '#username',
    },
    password: {
      label: 'Password',
      selector: '#password',
    },
  },
  buttons: {
    submit: {
      selector: 'input[type=submit]',
    },
  },
};

export const hmctsAccessUi = {
  enterEmail: {
    heading: 'Enter your email address',
    input: {
      label: 'Enter your email address',
      selector: '#email',
    },
    // Scoped to the form holding the email field: the cookie banner also renders a
    // submit button, and it sits outside any form. Structural rather than text-based,
    // because the migration guide states user-facing copy is changing.
    submit: {
      selector: 'form:has(#email) button[type=submit]',
    },
  },
  enterPassword: {
    heading: 'Enter your password',
    input: {
      label: 'Enter your password',
      selector: '#password',
    },
    submit: {
      selector: 'form:has(#password) button[type=submit]',
    },
  },
};

// Matches the email field of whichever UI is being served, so callers can assert
// "a login page is showing" without knowing which one it is.
export const anyUiEmailSelector = `${legacyUi.inputs.email.selector}, ${hmctsAccessUi.enterEmail.input.selector}`;
