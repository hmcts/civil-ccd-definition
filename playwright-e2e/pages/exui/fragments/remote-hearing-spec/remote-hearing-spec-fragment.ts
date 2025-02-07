import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { radioButtons, inputs, subheadings } from './remote-hearing-spec-content';

@AllMethodsStep()
export default class RemoteHearingSpecFragment extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectSubheading(subheadings.remoteHearing, { ignoreDuplicates: true }),
        super.expectText(radioButtons.remoteHearing.label, { ignoreDuplicates: true }),
        super.expectText(radioButtons.remoteHearing.hintText, { ignoreDuplicates: true }),
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
