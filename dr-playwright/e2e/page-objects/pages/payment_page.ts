import {expect, Page} from "@playwright/test";
import { TabsHelper } from '../../../helpers/TabsHelper';
import { ButtonHelper} from "../../../helpers/ButtonHelper";


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

  async makePayment(paymentType: string = 'PBA'){
    const confirmPaymentButton = this.page.getByRole('button', { name: 'Confirm payment' });

    const maxRetries: number = 10;
    // let retry: number = 0;

    for (let retry = 1; retry <= maxRetries; retry++) {
      await new TabsHelper(this.page).selectTab('Service Request');
      await this.page.locator('.ServiceRequest').waitFor({state: 'visible'});
      const serviceRequestTable = this.page.locator('.ServiceRequest');
      const serviceRequestTableRow = serviceRequestTable.getByRole('row');

      if (await serviceRequestTableRow.getByRole('table').count() < 1) {
        console.log('Refreshing webpage - waiting for "Pay now" link for Service request, try: ' + retry + ' of ' + maxRetries);
        await this.page.reload();
        const visibleElement = this.page.locator('#next-step');
        await visibleElement.waitFor({state: 'visible'});
      } else {
        console.log('"Pay now" link is available. Continuing test....');
        break;
      }
    }

    await this.page.getByText('Pay now').click();

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
    await this.page.waitForSelector('#main-content', { state: 'visible' });
    const message = await this.page.innerText('#main-content');
    expect(message, 'Payment failed.').toContain('Payment successful');
  }
}
