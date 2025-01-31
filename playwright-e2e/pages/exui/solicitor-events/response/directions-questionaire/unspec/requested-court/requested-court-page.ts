import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { dropdowns, inputs, subheadings } from './requested-court-content.ts';
import RemoteHearingFragment from '../../../../../fragments/remote-hearing/remote-hearing-fragment.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';
import preferredCourts from '../../../../../../../config/preferred-courts.ts';

@AllMethodsStep()
export default class RequestedCourtPage extends ExuiPage(BasePage) {
  private remoteHearingFragment: RemoteHearingFragment;
  private defendantParty: Party;

  constructor(page: Page, remoteHearingFragment: RemoteHearingFragment, defendantParty: Party) {
    super(page);
    this.remoteHearingFragment = remoteHearingFragment;
    this.defendantParty = defendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.courtLocation),
        super.expectLabel(dropdowns.courtLocations.label),
        super.expectLabel(inputs.preferredCourtReason.label),
        this.remoteHearingFragment.verifyContent(),
      ],
      { axePageInsertName: StringHelper.capitalise(this.defendantParty.key) },
    );
  }

  async selectCourtLocation() {
    await super.selectFromDropdown(
      preferredCourts[this.defendantParty.key].default,
      dropdowns.courtLocations.selector(this.defendantParty),
    );
  }

  async enterPreferredCourtReason() {
    await super.inputText(
      `Reason for preferred court - ${this.defendantParty.key}`,
      inputs.preferredCourtReason.selector(this.defendantParty),
    );
  }

  async selectYesRemoteHearing() {
    await this.remoteHearingFragment.selectYes();
  }

  async selectNoRemoteHearing() {
    await this.remoteHearingFragment.selectNo();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
