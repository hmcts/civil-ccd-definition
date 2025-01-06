import BasePage from '../../../../../../base/base-page';
import ExuiEvent from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  nonElectronicDocumentsSubHeading,
  inputNonElectronicDocuments,
  directionsDiscloreform,
} from './claimant-response-disclosureOfNonElectronicDocuments-content.ts';

@AllMethodsStep()
export default class ClaimantResponseDisclosureOfNonElectronicDocumentsPage extends ExuiEvent(
  BasePage,
) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(nonElectronicDocumentsSubHeading.subHeading2, { first: true }),
      super.expectText(directionsDiscloreform.proposeDirection, { first: true }),
    ]);
  }

  async proposeDirectionsSelectYes() {
    await super.clickBySelector(directionsDiscloreform.proposeDirectionsYes.selector);
  }

  async standardDisclosureSelectYes() {
    await super.expectText(directionsDiscloreform.standardDisclosure, { first: true });
    await super.clickBySelector(directionsDiscloreform.standardDisclosureYes.selector);
  }
  async submit() {
    await super.retryClickSubmit();
  }
}
