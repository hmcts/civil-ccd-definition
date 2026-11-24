import {expect, Page} from "@playwright/test";
import { TabsHelper } from '../../../helpers/TabsHelper';
import { ButtonHelper} from "../../../helpers/ButtonHelper";
import { paymentResultWaitSeconds } from "../../../civilConfig";
import PaymentMethod from '../../../enums/paymentMethod.ts';
import { paymentCard } from '../../../fixtures/paymentCard.ts';
import { withCardPaymentLock } from '../../../helpers/CardPaymentLock.ts';
import { PageHelper } from '../../../helpers/PageHelper.ts';
import { SessionEndedError } from '../../../helpers/SessionEndedError.ts';

// How many times a card GOV.UK Pay turns down is paid: once more after a decline
const cardPaymentAttempts = 2;

// Whether a payment result says GOV.UK Pay turned the card down, which takes no money, so it can be paid again: on its
// own page after the card details ("Your payment has been declined"), or on XUI's result page after they are confirmed
// ("Your card payment was unsuccessful")
function cardDeclined(message: string): boolean {
  return message.includes('Your payment has been declined') || message.includes('Your card payment was unsuccessful');
}

function expectSuccessful(message: string) {
  expect(message, `Payment failed: ${message}`).toContain('Payment successful');
}

export class PaymentPage {
  private buttonHelper: ButtonHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
  }

  // Pays a fee from the Service Request tab of the case showing: a claim, or a general application. serviceRequestReference
  // is the fee's service request (as the case keeps it in claimIssuedPBADetails, hearingFeePBADetails or
  // generalAppPBADetails), so "Pay now" is clicked in that fee's row: a case can list more than one unpaid fee, for
  // example a claim fee and a hearing fee. Without it the only "Pay now" link is clicked.
  // The fee is paid from the PBA account, or by card (PAYMENT_METHOD=CARD, with the card in fixtures/paymentCard.ts).
  async makePayment(paymentMethod: PaymentMethod = PaymentMethod.PBA, serviceRequestReference?: string){
    const confirmPaymentButton = this.page.getByRole('button', { name: 'Confirm payment' });
    // The case (or general application) the fee is paid from, to come back to if GOV.UK Pay turns the card down
    const caseUrl = this.page.url();
    await this.clickPayNow(serviceRequestReference);

    if (paymentMethod === PaymentMethod.PBA) {
      await this.page.locator('#pbaAccount').click();
      // Organisation 1's account, or the first account a solicitor of another organisation has (a claimant's new
      // solicitor after a notice of change)
      const accountNumber = this.page.locator('#pbaAccountNumber');
      const accounts = (await accountNumber.locator('option').allTextContents()).map((account) => account.trim()).filter((account) => /^PBA\w+$/.test(account));
      await accountNumber.selectOption(accounts.includes('PBA0078095') ? 'PBA0078095' : accounts[0]);
      await this.page.locator('#pbaAccountRef').fill('PBA Account reference test text.');
      await this.page.keyboard.press('Tab');
      await confirmPaymentButton.click();
      expectSuccessful(await this.paymentResult());
    } else {
      // One card payment at a time across the workers, until its result shows (see CardPaymentLock.ts). GOV.UK Pay's
      // sandbox now and then turns a card down ("Your card payment was unsuccessful") even with nothing else paying.
      // No money is taken then, so the card is paid again from the service request, once.
      await withCardPaymentLock(async () => {
        for (let attempt = 1; ; attempt++) {
          const message = (await this.payByCard()) ?? (await this.paymentResult());
          if (attempt < cardPaymentAttempts && cardDeclined(message)) {
            console.log(`GOV.UK Pay turned the card payment down (${message}), so it is paid again: attempt ${attempt + 1} of ${cardPaymentAttempts}`);
            await this.backToServiceRequest(caseUrl);
            await this.clickPayNow(serviceRequestReference);
            continue;
          }
          expectSuccessful(message);
          return;
        }
      });
    }
  }

  // After a declined card, goes back to the service request the way a user would, which lets the payment service
  // close the declined payment so another can be made: GOV.UK Pay's "Start again" back to XUI, then XUI's "Return to
  // service request". Without them, the case is opened again.
  private async backToServiceRequest(caseUrl: string) {
    const startAgain = this.page.getByRole('button', { name: 'Start again' }).or(this.page.getByRole('link', { name: 'Start again' }));
    const returnToServiceRequest = this.page.getByRole('link', { name: 'Return to service request' });
    if (await startAgain.isVisible()) {
      // GOV.UK Pay goes back to the payment outcome page, which says the card payment was unsuccessful
      await startAgain.click();
      await returnToServiceRequest.waitFor({ state: 'visible', timeout: paymentResultWaitSeconds * 1000 }).catch(() => {});
    }
    if (await returnToServiceRequest.isVisible()) {
      await returnToServiceRequest.click();
      return;
    }
    await new PageHelper(this.page).gotoAndWaitForXui(caseUrl);
  }

  // Opens the Service Request tab of the case showing and clicks "Pay now" for the fee
  private async clickPayNow(serviceRequestReference?: string) {
    const maxRetries: number = 10;
    // The service request can take a while to reach the payment service, and the Service Request tab can show an
    // empty table or only fees already paid until it does. So wait for the "Pay now" link itself, reloading the
    // page between tries.
    const payNow = serviceRequestReference
      ? this.page.getByRole('row').filter({ hasText: serviceRequestReference }).getByText('Pay now')
      : this.page.getByText('Pay now');
    // A claim's tab wraps its table in .ServiceRequest; a general application's tab is just the table
    const serviceRequests = this.page.locator('.ServiceRequest').or(this.page.getByRole('table')).first();
    for (let retry = 1; retry <= maxRetries; retry++) {
      await this.waitForServiceRequestTab();
      await new TabsHelper(this.page).selectTab('Service Request');
      await serviceRequests.waitFor({state: 'visible'});
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
    }

    await payNow.click();
  }

  // Waits for the case's Service Request tab (a general application has no Next step list where the user has no event
  // to start, so the tab itself is waited for). If XUI sends the user to the sign in page instead, their session has
  // ended. Nothing has been paid before "Pay now" is clicked, so SessionEndedError is thrown and
  // SessionHelper.runWithSessionRecovery signs the user in again and starts the payment again from the case.
  private async waitForServiceRequestTab() {
    const serviceRequestTab = this.page.getByRole('tab', { name: 'Service Request' });
    const signInEmail = this.page.locator('#email');
    await serviceRequestTab.or(signInEmail).first().waitFor({ state: 'visible' });
    if (await signInEmail.isVisible()) {
      throw new SessionEndedError('opening the Service Request tab went to the sign in page');
    }
  }

  // The payment result's message. It can be slow to show when the payment service is busy, and is not waited for
  // again, as paying again after an unknown result could take a second payment. A payment that did not go through
  // shows "There is a problem" with the reason, such as "problem with the service" or, for a card GOV.UK Pay turned
  // down, "Your card payment was unsuccessful", so the test has the result as soon as that is shown.
  private async paymentResult(): Promise<string> {
    const result = this.page.locator('#main-content');
    await expect(result, `No payment result within ${paymentResultWaitSeconds}s`).toContainText(/Payment successful|There is a problem|problem with the service/, { timeout: paymentResultWaitSeconds * 1000 });
    return (await result.innerText()).replace(/\s+/g, ' ').trim();
  }

  // Card payment goes on to GOV.UK Pay's pages: the card details, then a page to confirm them, which then returns to
  // XUI's payment result. GOV.UK Pay can turn the card down straight after the card details, on a page of its own, in
  // which case that page's message is returned rather than confirming.
  private async payByCard(): Promise<string | undefined> {
    await this.page.locator('#cardPayment').click();
    await this.buttonHelper.continueButton.click();
    await this.page.locator('#card-no').fill(paymentCard.number);
    await this.page.locator('#expiry-month').fill(paymentCard.expiryMonth);
    await this.page.locator('#expiry-year').fill(paymentCard.expiryYear);
    await this.page.locator('#cardholder-name').fill(paymentCard.nameOnCard);
    await this.page.locator('#cvc').fill(paymentCard.securityCode);
    await this.page.locator('#address-line-1').fill(paymentCard.addressLine1);
    await this.page.locator('#address-city').fill(paymentCard.city);
    await this.setCountry(paymentCard.country);
    await this.page.locator('#address-postcode').fill(paymentCard.postcode);
    await this.page.locator('#email').fill(paymentCard.email);
    await this.page.locator('#submit-card-details').click();
    const confirm = this.page.locator('#confirm');
    const declined = this.page.getByRole('heading', { name: 'Your payment has been declined' });
    await expect(confirm.or(declined), 'GOV.UK Pay showed neither the confirm page nor a decline').toBeVisible({ timeout: paymentResultWaitSeconds * 1000 });
    if (await declined.isVisible()) {
      return (await this.page.locator('main').innerText()).replace(/\s+/g, ' ').trim();
    }
    await confirm.click();
    return undefined;
  }

  // GOV.UK Pay sends the country as a list (a select), and its script then swaps the list for a box that suggests
  // countries as you type, with the same id. Which one the test meets depends on how quickly the script runs, so it
  // waits a few seconds for the swap: with the box it types the country and picks the suggestion, and where the page
  // keeps the list it picks from that.
  private async setCountry(countryName: string) {
    const country = this.page.locator('#address-country');
    const tagName = () => country.evaluate((element) => element.tagName);
    await expect.poll(tagName, { timeout: 5000 }).toBe('INPUT').catch(() => {});
    if (await tagName() === 'SELECT') {
      await country.selectOption({ label: countryName });
      return;
    }
    await country.fill(countryName);
    const suggestion = this.page.locator('#address-country__listbox').getByRole('option', { name: countryName, exact: true });
    await suggestion.click();
    await expect(country).toHaveValue(countryName);
  }
}
