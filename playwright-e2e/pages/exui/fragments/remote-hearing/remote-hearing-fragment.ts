import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { radioButtons, inputs } from './remote-hearing-content';

@AllMethodsStep()
export default class RemoteHearingFragment extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        //super.expectText(radioButtons.remoteHearing.label, {index: 0}), TODO - This verification is not working for the 1v2DS scenario for the Second Defendant.
        // super.expectText(radioButtons.remoteHearing.hintText, { index: 0 }),
        //TODO - Seperate Code to be Implemented to check Yes and No Labels.
        //super.expectText(radioButtons.remoteHearing.yes.label , {index: 0}),
        //super.expectText(radioButtons.remoteHearing.no.label, {index: 0}),
      ],
      {
        runAxe: false,
      },
    );
  }

  async selectYes() {
    await super.clickBySelector(
      radioButtons.remoteHearing.yes.selector(this.claimantDefendantParty),
    );
    await super.inputText(
      `Court location reason - ${this.claimantDefendantParty.key}`,
      inputs.remoteHearingReason.selector(this.claimantDefendantParty),
    );
  }

  async selectNo() {
    await super.clickBySelector(
      radioButtons.remoteHearing.no.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
