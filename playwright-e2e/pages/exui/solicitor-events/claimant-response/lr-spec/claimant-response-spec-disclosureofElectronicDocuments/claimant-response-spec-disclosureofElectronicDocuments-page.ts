import BasePage from '../../../../../../base/base-page';
import ExuiEvent from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  subHeading,
  legendsElectronicDocuments,
} from './claimant-response-spec-disclosureofElectronicDocuments-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecDisclosureofElectronicDocumentsPage extends ExuiEvent(
  BasePage,
) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subHeading.heading2),
      super.expectText(legendsElectronicDocuments.legend),
    ]);
  }

  async selectAgreed() {
    await super.clickBySelector(legendsElectronicDocuments.reachedAgreement.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
