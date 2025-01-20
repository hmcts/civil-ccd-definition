import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { radioButtons, buttons, inputs, subheadings } from './litigation-friend-content';
import filePaths from '../../../../config/file-paths';
import AddressFragment from '../address/address-fragment';
import CaseDataHelper from '../../../../helpers/case-data-helper';

@AllMethodsStep()
export default class LitigationFriendFragment extends ExuiPage(BasePage) {
  private addressFragment: AddressFragment;
  private litigationFriendParty: Party;

  constructor(page: Page, litigationFriendParty: Party) {
    super(page);
    this.addressFragment = new AddressFragment(page, litigationFriendParty);
    this.litigationFriendParty = litigationFriendParty;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectLabel(inputs.litigationFriendDetails.firstName.label),
        super.expectLabel(inputs.litigationFriendDetails.lastName.label),
        super.expectLabel(inputs.litigationFriendDetails.email.label),
        super.expectLabel(inputs.litigationFriendDetails.phoneNumber.label),
        super.expectSubheading(subheadings.uploadcertificate),
      ],
      {
        runAxe: false,
      },
    );
  }

  async enterLitigationFriendDetails() {
    const claimantLitigationFriendData = CaseDataHelper.buildLitigationFriendData(
      this.litigationFriendParty,
    );
    await super.inputText(
      claimantLitigationFriendData.firstName,
      inputs.litigationFriendDetails.firstName.selector(this.litigationFriendParty),
    );
    await super.inputText(
      claimantLitigationFriendData.lastName,
      inputs.litigationFriendDetails.lastName.selector(this.litigationFriendParty),
    );
    await super.inputText(
      claimantLitigationFriendData.emailAddress,
      inputs.litigationFriendDetails.email.selector(this.litigationFriendParty),
    );
    await super.inputText(
      claimantLitigationFriendData.phoneNumber,
      inputs.litigationFriendDetails.phoneNumber.selector(this.litigationFriendParty),
    );
  }

  async chooseYesSameAddress() {
    await super.clickBySelector(radioButtons.address.yes.selector(this.litigationFriendParty));
  }

  async chooseNoSameAddress() {
    await super.clickBySelector(radioButtons.address.no.selector(this.litigationFriendParty));
    await this.addressFragment.enterAddressManual();
  }

  async uploadCertificateOfSuitability() {
    await super.clickBySelector(buttons.addNewCertificate.selector(this.litigationFriendParty));
    await super.expectLabel(inputs.certificateOfSuitability.uploadDoc.label);
    await super.retryUploadFile(
      filePaths.testPdfFile,
      inputs.certificateOfSuitability.uploadDoc.selector(this.litigationFriendParty),
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
