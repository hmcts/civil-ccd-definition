import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { dropdowns, inputs, subheadings } from './applicant-court-lr-spec-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';
import RemoteHearingSpecFragment from '../../../../../fragments/remote-hearing-spec/remote-hearing-spec-fragment.ts';
import partys from '../../../../../../../constants/partys.ts';

@AllMethodsStep()
export default class ApplicantCourtLRSpecPage extends ExuiPage(BasePage) {
  private remoteHearingSpecFragment: RemoteHearingSpecFragment;

  constructor(page: Page, remoteHearingSpecFragment: RemoteHearingSpecFragment) {
    super(page);
    this.remoteHearingSpecFragment = remoteHearingSpecFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.courtLocation),
      super.expectLabel(inputs.preferredCourtReason.label),
      this.remoteHearingSpecFragment.verifyContent(),
    ]);
  }

  async selectCourtLocation() {
    await super.selectFromDropdown(
      dropdowns.courtLocationDropdown.options[0],
      dropdowns.courtLocationDropdown.selector,
    );
    await super.inputText(
      `Court location reason - ${partys.CLAIMANT_1.key}`,
      inputs.preferredCourtReason.selector,
    );
  }

  async selectYesRemoteHearing() {
    await this.remoteHearingSpecFragment.selectYes();
  }

  async selectNoRemoteHearing() {
    await this.remoteHearingSpecFragment.selectNo();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
