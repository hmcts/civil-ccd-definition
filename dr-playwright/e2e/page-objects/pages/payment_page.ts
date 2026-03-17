import {expect, Page} from "@playwright/test";
import {envUrl, runningEnv} from '../../../iacConfig';
import { TabsHelper } from '../../../helpers/TabsHelper';
import { ButtonHelper} from "../../../helpers/ButtonHelper";


export class PaymentPage {
  private cardPaymentLocator: string = '#cardPayment';
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
  readonly payNow = this.page.getByText('Pay now');

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
  }

  async makePayment(paymentType: string = 'CC', caseId: string){
    await new TabsHelper(this.page).selectTab('Service Request');
    await this.payNow.click();

    if (paymentType === 'CC') {
      await this.page.check(this.cardPaymentLocator);
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

      await this.page.click(this.continueButtonLocator);
      await this.page.click(this.confirmButtonLocator);

      await this.page.waitForSelector('#main-content', { state: 'visible' });
      const message = await this.page.innerText('#main-content');
      expect(message, 'Payment failed').toContain('Payment successful');

      // In preview "Return to service request" hyperlink forwards to an AAT address
      // To work around this for the moment will force the navigation back to the overview tab
      // in preview environment
      if (['preview'].includes(runningEnv)){
        await this.page.goto(envUrl + '/cases/case-details/' + caseId);
      } else {
        await this.page.getByText('Return to service request').click();
      }
    }
  }
}