import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { headings, checkboxes } from './document-selection-small-claim-content.ts';

@AllMethodsStep()
export default class DocumentSelectionSmallClaimPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.selectDocumentType),
      super.expectSubheading(headings.witnessEvidence),
      super.expectSubheading(headings.expertEvidence),
      super.expectSubheading(headings.trialDocuments),
      super.expectLabel(checkboxes.witnessStatement),
      super.expectLabel(checkboxes.witnessSummary),
      super.expectLabel(checkboxes.documentaryEvidence),
      super.expectLabel(checkboxes.expertsReport),
      super.expectLabel(checkboxes.jointStatementOfExperts),
      super.expectLabel(checkboxes.authorities),
      super.expectLabel(checkboxes.costs),
      super.expectLabel(checkboxes.documentaryEvidenceForTrial),
    ]);
  }

  async selectWitnessStatement() {
    await super.clickByLabel(checkboxes.witnessStatement);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
