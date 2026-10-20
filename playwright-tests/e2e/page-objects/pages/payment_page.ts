import {expect, Page} from "@playwright/test";
import { TabsHelper } from '../../../helpers/TabsHelper';
import { ButtonHelper} from "../../../helpers/ButtonHelper";
import { paymentResultWaitSeconds } from "../../../civilConfig";


export class PaymentPage {
  private cardNoLocator: string = '#card-no';
  private expiryMonthLocator: string = '#expiry-month';
  private expiryYearLocator: string = '#expiry-year';
  private cardHolderNameLocator = '#cardholder-name';
  private cvcLocator = '#cvc';
  private addressLine1Locator = '#address-line-1';
  private addressCityLocator = '#address-city';
  private addressCountryLocator = '#address-country';
  private addressPostcodeLocator = '#address-postcode';
  private emailLocator = '#email';
  private continueButtonLocator = '#submit-card-details';
  private confirmButtonLocator = '#confirm';

  private cardNumber: string = '4444333322221111';
  private expiryMonth: string = '11';
  private expiryYear: string = '2032';
  private nameOnCard: string = 'Credit Card';
  private cvc: string = '000';
  private addressLine1: string = 'Buckingham Palace';
  private city: string = 'London';
  private country: string = 'United Kingdom';
  private postcode: string = 'SW1A 1AA';
  private email: string = 'sol-i-citor@test.com';

  private buttonHelper: ButtonHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
  }

  // Pays a fee from the Service Request tab. serviceRequestReference is the fee's service request (as the case keeps it
  // in claimIssuedPBADetails or hearingFeePBADetails), so "Pay now" is clicked in that fee's row: a case can list more
  // than one unpaid fee, for example a claim fee and a hearing fee. Without it the only "Pay now" link is clicked.
  async makePayment(paymentType: string = 'PBA', serviceRequestReference?: string){
    const confirmPaymentButton = this.page.getByRole('button', { name: 'Confirm payment' });

    const maxRetries: number = 10;
    // The service request can take a while to reach the payment service, and the Service Request tab can show an
    // empty table or only fees already paid until it does. So wait for the "Pay now" link itself, reloading the
    // page between tries.
    const payNow = serviceRequestReference
      ? this.page.locator('.ServiceRequest tr.govuk-table__row', { hasText: serviceRequestReference }).getByText('Pay now')
      : this.page.getByText('Pay now');
    for (let retry = 1; retry <= maxRetries; retry++) {
      await new TabsHelper(this.page).selectTab('Service Request');
      await this.page.locator('.ServiceRequest').waitFor({state: 'visible'});
      let payNowShown = true;
      try {
        await payNow.waitFor({ state: 'visible', timeout: 5000 });
      } catch {
        payNowShown = false;
      }
      if (payNowShown) {
        console.log(`"Pay now" link is available${serviceRequestReference ? ` for service request ${serviceRequestReference}` : ''}. Continuing test....`);
        break;
      }
      console.log('Refreshing webpage - waiting for "Pay now" link for Service request, try: ' + retry + ' of ' + maxRetries);
      await this.page.reload();
      await this.page.locator('#next-step').waitFor({state: 'visible'});
    }

    await payNow.click();

    paymentType == 'PBA' ? await this.page.locator('#pbaAccount').click() : await this.page.locator('#cardPayment').click();
 //   await this.page.waitForTimeout(2000);
    if (paymentType === 'PBA') {
      await this.page.locator('#pbaAccountNumber').selectOption('PBA0078095');
      await this.page.locator('#pbaAccountRef').fill('PBA Account reference test text.');
      await this.page.keyboard.press('Tab');
      await confirmPaymentButton.click();
    } else {
      await this.page.locator('#cardPayment').click();
      await this.buttonHelper.continueButton.click();
      await this.page.fill(this.cardNoLocator, this.cardNumber);
      await this.page.fill(this.expiryMonthLocator, this.expiryMonth);
      await this.page.fill(this.expiryYearLocator, this.expiryYear);
      await this.page.fill(this.cardHolderNameLocator, this.nameOnCard);
      await this.page.fill(this.cvcLocator, this.cvc);
      await this.page.fill(this.addressLine1Locator, this.addressLine1);
      await this.page.fill(this.addressCityLocator, this.city);
      await this.page.fill(this.addressCountryLocator, this.country);
      await this.page.fill(this.addressPostcodeLocator, this.postcode);
      await this.page.fill(this.emailLocator, this.email);
      await this.page.waitForTimeout(2000);
      await this.page.click(this.continueButtonLocator);
      await this.page.click(this.confirmButtonLocator);
    }
    // The payment result can be slow to show when the payment service is busy. It is not retried, as paying again
    // could take a second payment.
    const result = this.page.locator('#main-content');
    await expect(result, `No payment result within ${paymentResultWaitSeconds}s`).toContainText(/Payment successful|problem with the service/, { timeout: paymentResultWaitSeconds * 1000 });
    const message = await result.innerText();
    expect(message, 'Payment failed.').toContain('Payment successful');
  }
}
