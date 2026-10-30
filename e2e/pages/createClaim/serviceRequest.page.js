const { waitForFinishedBusinessProcess } = require('../../api/testingSupport');

const {I} = inject();

module.exports = {

  fields: {
    pbaNumber: {
      id: '#pbaAccountNumber',
      options: {
        activeAccount1: 'PBA0088192',
        activeAccount2: 'PBA0078095'
      }
    },
    reviewLinks: '.govuk-table__body td a'
  },

  async verifyAdditionalPayment(caseNumber) {
    I.waitInUrl(caseNumber);
    I.seeNumberOfVisibleElements(this.fields.reviewLinks, 2);
    I.click(locate(this.fields.reviewLinks).last());
    I.see('Paid');
    I.see('General application (on notice)');
    I.see('Total fees to pay: £167.00');
  },

  async waitForPaymentRequest() {
    await I.usePlaywrightTo(
      'wait for payment link on the same case',
      async ({ page }) => {
        const payNow = page.getByRole('link', {
          name: 'Pay now',
          exact: true
        }).first();

        const maxAttempts = 8;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          console.log(`Payment check ${attempt}/${maxAttempts}`);

          const visible = await payNow
            .waitFor({ state: 'visible', timeout: 10000 })
            .then(() => true)
            .catch(() => false);

          if (visible) {
            console.log(
              'SUCCESS: Pay now visible. Stop refreshing and continue payment.'
            );
            return;
          }

          if (attempt === maxAttempts) {
            break;
          }

          console.log('Payment not ready. Refreshing same case in 30 seconds.');

          await page.waitForTimeout(30000);
          await page.reload({ waitUntil: 'domcontentloaded' });
        }

        throw new Error(
          'Pay now was not visible after 8 payment checks'
        );
      }
    );
  },

  async payFee(caseNumber, hearingFee = false) {
    let feePaymentXPath;
    await I.waitInUrl(caseNumber);
    await this.waitForPaymentRequest();
    await I.see('Not paid');
    if (hearingFee) {
      feePaymentXPath = '//table/tbody/tr[position()=2]/td[position()=5]/a[contains(text(), \'Pay now\')]';
    } else {
      feePaymentXPath = '//table/tbody/tr[position()=1]/td[position()=5]/a[contains(text(), \'Pay now\')]';
    }
    await I.forceClick(feePaymentXPath);
    await I.waitForElement('#pbaAccount');
    await I.click({css: 'input#pbaAccount'});
    await I.waitForElement(this.fields.pbaNumber.id);
    await I.selectOption(this.fields.pbaNumber.id, this.fields.pbaNumber.options['activeAccount2']);
    await I.fillField('#pbaAccountRef', 'Test Test');
    await I.click({css: 'div.govuk-form-group span'});
    await I.click('Confirm payment');

    const outcome = await I.usePlaywrightTo(
      'wait for PBA success or known PBA error',
      async ({ page }) => {
        await page.waitForFunction(() => {
          const body = document.body.innerText;
          return body.includes('Payment successful') ||
            body.includes('Sorry, there is a problem with the service') ||
            body.includes('Your PBA account cannot be found');
        }, null, { timeout: 30000 });

        const body = await page.locator('body').innerText();

        if (body.includes('Payment successful')) {
          return 'success';
        }

        return 'pba_error';
      }
    );

    if (outcome === 'success') {
      console.log('PBA payment successful.');
      await I.click('View service requests');
      return;
    }

    console.log('PBA failed. Attempting card payment.');
    await I.click('Pay by card');
    await this.completeCardPayment(caseNumber);

  },

  async completeCardPayment(caseNumber) {

    const required = [
      'CARD_PAYMENT_NUMBER',
      'CARD_PAYMENT_EXPIRY_MONTH',
      'CARD_PAYMENT_EXPIRY_YEAR',
      'CARD_PAYMENT_CVV',
      'CARD_PAYMENT_NAME',
      'CARD_PAYMENT_ADDRESS',
      'CARD_PAYMENT_CITY',
      'CARD_PAYMENT_POSTCODE',
      'CARD_PAYMENT_EMAIL'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length) {
      console.error(
        'CARD PAYMENT BLOCKED: Missing configuration:',
        missing.join(', ')
      );

      throw new Error(
        `Missing test-card configuration: ${missing.join(', ')}`
      );
    }


    await I.usePlaywrightTo(
      'complete approved GOV.UK Pay test-card journey',
      async ({ page }) => {
        await page.waitForURL(
          url => url.hostname === 'card.payments.service.gov.uk',
          { timeout: 30000 }
        );

        await page.getByLabel('Card number').fill(
          process.env.CARD_PAYMENT_NUMBER
        );

        await page.getByLabel('Month', { exact: true }).fill(
          process.env.CARD_PAYMENT_EXPIRY_MONTH
        );

        await page.getByLabel('Year', { exact: true }).fill(
          process.env.CARD_PAYMENT_EXPIRY_YEAR
        );

        await page.getByLabel('Name on card').fill(
          process.env.CARD_PAYMENT_NAME
        );

        await page.getByLabel('Card security code').fill(
          process.env.CARD_PAYMENT_CVV
        );

        await page.getByLabel('Address line 1').fill(
          process.env.CARD_PAYMENT_ADDRESS
        );

        await page.getByLabel('Town or city').fill(
          process.env.CARD_PAYMENT_CITY
        );

        await page.getByLabel('Postcode').fill(
          process.env.CARD_PAYMENT_POSTCODE
        );

        await page.getByLabel('Email').fill(
          process.env.CARD_PAYMENT_EMAIL
        );

        await page.getByRole('button', {
          name: 'Continue'
        }).click();

        await page.getByRole('button', {
          name: 'Confirm payment'
        }).click();


        await page.getByText('Payment successful', {
          exact: false
        }).waitFor({ state: 'visible', timeout: 60000 });


        await page.getByRole('link', {
          name: /Return to service request/i
        }).click();


        await page.waitForURL(
          url => url.hostname.includes('manage-case.') &&
                 url.href.includes(caseNumber),
          { timeout: 60000 }
        );

        const serviceTab = page.getByRole('tab', {
          name: 'Service Request'
        });

        await serviceTab.waitFor({
          state: 'visible',
          timeout: 30000
        });

        await serviceTab.click();

        await page.getByText('Paid', {
          exact: true
        }).first().waitFor({
          state: 'visible',
          timeout: 30000
        });

        console.log(
          'SUCCESS: Card payment confirmed and Paid status verified.'
        );
      }
    );
  },

  async openServiceRequestTab() {
    const tab = locate('[role="tab"]').withText('Service Request');

    await I.waitForVisible(tab, 60);
    await I.click(tab);
    await I.waitInUrl('#Service', 30);
  }
};
