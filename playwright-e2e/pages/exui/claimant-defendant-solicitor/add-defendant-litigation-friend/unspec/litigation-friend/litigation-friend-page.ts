import { Page } from 'playwright-core';
import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import LitigationFriendFragment from '../../../../fragments/litigation-friend/litigation-friend-fragment';
import { radioButtons, subheadings, heading, inputs } from './litigation-friend-content';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';

@AllMethodsStep()
export default class LitigationFriendPage extends ExuiPage(BasePage) {
  private litigationFriendFragment: LitigationFriendFragment;

  constructor(page: Page, litigationFriendFragment: LitigationFriendFragment) {
    super(page);
    this.litigationFriendFragment = litigationFriendFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(ccdCaseData.id),
      super.expectHeading(ccdCaseData.caseNamePublic),
      super.expectSubheading(subheadings.litigationDetails),

      // Radio button assertions
      super.expectLegend(radioButtons.address.label, { count: 1 }),
      super.expectYesLabel(radioButtons.address.yes.selector),
      super.expectNoLabel(radioButtons.address.no.selector),

      // Input field assertions
      super.expectLabel(inputs.firstName.label, { count: 1 }),
      super.expectLabel(inputs.lastName.label, { count: 1 }),
    ]);
  }

  async enterLitigationFriendDetails() {
    await this.litigationFriendFragment.enterLitigationFriendDetails();
    await this.litigationFriendFragment.chooseNoSameAddress();
    await this.litigationFriendFragment.uploadCertificateOfSuitability();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
