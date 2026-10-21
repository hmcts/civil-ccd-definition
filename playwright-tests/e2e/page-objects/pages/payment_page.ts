import {expect, Page} from "@playwright/test";
import { TabsHelper } from '../../../helpers/TabsHelper';
import { ButtonHelper} from "../../../helpers/ButtonHelper";
import { paymentResultWaitSeconds } from "../../../civilConfig";
import PaymentMethod from '../../../enums/paymentMethod.ts';
import { paymentCard } from '../../../fixtures/paymentCard.ts';


export class PaymentPage {
  private buttonHelper: ButtonHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
  }

  // Pays a fee from the Service Request tab. serviceRequestReference is the fee's service request (as the case keeps it
  // in claimIssuedPBADetails or hearingFeePBADetails), so "Pay now" is clicked in that fee's row: a case can list more
  // than one unpaid fee, for example a claim fee and a hearing fee. Without it the only "Pay now" link is clicked.
  // The fee is paid from the PBA account, or by card (PAYMENT_METHOD=CARD, with the card in fixtures/paymentCard.ts).
  async makePayment(paymentMethod: PaymentMethod = PaymentMethod.PBA, serviceRequestReference?: string){
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

    if (paymentMethod === PaymentMethod.PBA) {
      await this.page.locator('#pbaAccount').click();
      await this.page.locator('#pbaAccountNumber').selectOption('PBA0078095');
      await this.page.locator('#pbaAccountRef').fill('PBA Account reference test text.');
      await this.page.keyboard.press('Tab');
      await confirmPaymentButton.click();
    } else {
      await this.payByCard();
    }
    // The payment result can be slow to show when the payment service is busy. It is not retried, as paying again
    // could take a second payment.
    const result = this.page.locator('#main-content');
    await expect(result, `No payment result within ${paymentResultWaitSeconds}s`).toContainText(/Payment successful|problem with the service/, { timeout: paymentResultWaitSeconds * 1000 });
    const message = await result.innerText();
    expect(message, 'Payment failed.').toContain('Payment successful');
  }

  // Card payment goes on to GOV.UK Pay's pages: the card details, then a page to confirm them, which then returns to
  // XUI's payment result
  private async payByCard() {
    await this.page.locator('#cardPayment').click();
    await this.buttonHelper.continueButton.click();
    await this.page.locator('#card-no').fill(paymentCard.number);
    await this.page.locator('#expiry-month').fill(paymentCard.expiryMonth);
    await this.page.locator('#expiry-year').fill(paymentCard.expiryYear);
    await this.page.locator('#cardholder-name').fill(paymentCard.nameOnCard);
    await this.page.locator('#cvc').fill(paymentCard.securityCode);
    await this.page.locator('#address-line-1').fill(paymentCard.addressLine1);
    await this.page.locator('#address-city').fill(paymentCard.city);
    await this.page.locator('#address-country').fill(paymentCard.country);
    await this.page.locator('#address-postcode').fill(paymentCard.postcode);
    await this.page.locator('#email').fill(paymentCard.email);
    await this.page.locator('#submit-card-details').click();
    await this.page.locator('#confirm').click();
  }
}
