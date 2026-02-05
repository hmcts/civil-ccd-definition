import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import { Page } from '@playwright/test';
import partys from '../../../../../constants/partys.ts';
import LitigationFriendFragment from '../../../fragments/litigation-friend/litigation-friend-fragment.ts';

@AllMethodsStep()
export default class ManageContactInformationLitigationFriendPage extends ExuiPage(BasePage) {

  private litigationFriendFragment: LitigationFriendFragment;

  constructor(page: Page) {
    super(page);
    this.litigationFriendFragment = new LitigationFriendFragment(page, partys.DEFENDANT_1_LITIGATION_FRIEND);
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
    ]);
  }

  async enterDetailsLitigationFriend(ccdEventState: { id: string }) {
    await this.litigationFriendFragment.verifyContent({ ccdEventState });
    await this.litigationFriendFragment.enterLitigationFriendDetails({ ccdEventState });
    await this.litigationFriendFragment.updateAddress({ ccdEventState });
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
