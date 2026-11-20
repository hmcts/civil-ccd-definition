import {envUrl, runningEnv} from '../../iacConfig'

const { I } = inject();

class PaymentPage {
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

  constructor() {
  }

  async makePayment(paymentType: string = 'CC', caseId: string){
    await I.selectTab('Service Request')
    await I.waitForText('Pay now', 60);
    await I.clickButtonOrLinkWithoutRetry('Pay now');

    if (paymentType === 'CC') {
      await I.waitForElement(this.cardPaymentLocator,60);
      await I.clickButtonOrLinkWithoutRetry(this.cardPaymentLocator);
      await I.clickContinue();

      await I.fillField(this.cardNoLocator, this.cardNumber);
      await I.fillField(this.expiryMonthLocator, this.expiryMonth);
      await I.fillField(this.expiryYearLocator, this.expiryYear);
      await I.fillField(this.cardHolderNameLocator, this.nameOnCard);
      await I.fillField(this.cvcLocator, this.cvc);
      await I.fillField(this.addressLine1Locator, this.addressLine1);
      await I.fillField(this.addressCityLocator, this.city);
      await I.fillField(this.addressCountryLocator, this.country);
      await I.fillField(this.addressPostcodeLocator, this.postcode);
      await I.fillField(this.emailLocator, this.email);

      await I.clickButtonOrLink(this.continueButtonLocator);
      await I.waitForText('Confirm your payment', 60);
      await I.clickButtonOrLink(this.confirmButtonLocator);
      await I.waitForText('Payment successful');

      // In preview "Return to service request" hyperlink forwards to an AAT address
      // To work around this for the moment will force the navigation back to the overview tab
      // in preview environment
      if (['preview'].includes(runningEnv)){
        await I.amOnPage(envUrl + '/cases/case-details/' + caseId);
        await I.waitForText('Case details', 60);
      } else {
        await I.clickContinue();
      }
    }
  }
}

// For inheritance
export = PaymentPage;
