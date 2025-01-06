import BasePage from '../../../../../../base/base-page';
import ExuiEvent from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  nonElectronicDocumentsSubHeading,
  inputNonElectronicDocuments,
} from './claimant-response-spec-disclosureOfNonElectronicDocuments-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecDisclosureOfNonElectronicDocumentsPage extends ExuiEvent(
  BasePage,
) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(nonElectronicDocumentsSubHeading.subHeading2),
      super.expectText(inputNonElectronicDocuments.text),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
