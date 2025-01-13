import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { radioButtons, inputs } from './remote-hearing-content';

@AllMethodsStep()
export default class RemoteHearingFragment extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectText(radioButtons.remoteHearing.label),
        super.expectText(radioButtons.remoteHearing.hintText),
        super.expectLabel(radioButtons.remoteHearing.yes.label),
        super.expectLabel(radioButtons.remoteHearing.no.label),
      ],
      {
        runAxe: false,
      },
    );
  }

  async selectYes(reason?: string) {
    await super.clickBySelector(radioButtons.remoteHearing.yes.selector(this.party));
    await super.inputText(reason ?? 'No reason', inputs.remoteHearingReason.selector(this.party));
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.remoteHearing.no.selector(this.party));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
