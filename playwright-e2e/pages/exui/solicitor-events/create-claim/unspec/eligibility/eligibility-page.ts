import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { lists, paragraphs, subHeadings } from './eligibility-content';

@AllMethodsStep()
export default class EligibilityPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subHeadings.issueCivilCourtProceedings),
      super.expectText(subHeadings.whoCanUseThisService),
      super.expectText(subHeadings.pleaseNote),
      super.expectText(paragraphs.youMustBe),
      // ...lists.youMustBe.map((item) => super.expectText(item)),
      // super.expectText(paragraphs.ifDefendantHasLegalRepresentation),
      // ...lists.ifDefendantHasLegalRepresentation.map((item) => super.expectText(item)),
      // super.expectText(subHeadings.aboutTheClaimants),
      // super.expectText(paragraphs.claimantsMust),
      // ...lists.claimantsMust.map((item) => super.expectText(item)),
      // super.expectText(subHeadings.aboutTheDefendants),
      // super.expectText(paragraphs.defendantsMust),
      // ...lists.defendantsMust.map((item) => super.expectText(item, { ignoreDuplicates: true })),
      // super.expectText(subHeadings.aboutTheClaim, { ignoreDuplicates: true }),
      // super.expectText(paragraphs.countyCourtDamagesClaim),
      // ...lists.countyCourtDamagesClaim.map((item) => super.expectText(item)),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
