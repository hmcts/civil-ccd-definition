import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import CreateCaseFlagsPageFactory from '../../../../pages/exui/hearing-center-admin/create-case-flags/create-case-flags-page-factory';

@AllMethodsStep()
export default class CreateCaseFlagsActions extends BaseTestData {
  private createCaseFlagsPageFactory: CreateCaseFlagsPageFactory;

  constructor(createCaseFlagsPageFactory: CreateCaseFlagsPageFactory, testData: TestData) {
    super(testData);
    this.createCaseFlagsPageFactory = createCaseFlagsPageFactory;
  }

  async selectCaseLevel() {
    const { createCaseFlagsLocationPage } = this.createCaseFlagsPageFactory;
    await createCaseFlagsLocationPage.verifyContent(
      super.ccdCaseData,
      super.claimant1PartyType,
      super.defendant1PartyType,
    );
    await createCaseFlagsLocationPage.selectCaseLevel();
    await createCaseFlagsLocationPage.submit();
  }

  async selectCaseLevel1v2DS() {
    const { createCaseFlagsLocation1v2DSPage } = this.createCaseFlagsPageFactory;
    await createCaseFlagsLocation1v2DSPage.verifyContent(
      super.ccdCaseData,
      super.claimant1PartyType,
      super.defendant1PartyType,
      super.defendant2PartyType,
    );
    await createCaseFlagsLocation1v2DSPage.selectCaseLevel();
    await createCaseFlagsLocation1v2DSPage.submit();
  }

  async selectClaimant1() {
    const { createCaseFlagsLocationPage } = this.createCaseFlagsPageFactory;
    await createCaseFlagsLocationPage.verifyContent(
      super.ccdCaseData,
      super.claimant1PartyType,
      super.defendant1PartyType,
    );
    await createCaseFlagsLocationPage.selectClaimant1(super.claimant1PartyType);
    await createCaseFlagsLocationPage.submit();
  }

  async caseLevelComplexTypeCaseFlag() {
    const { createCaseFlagsFlagTypeCaseLevelPage } = this.createCaseFlagsPageFactory;
    await createCaseFlagsFlagTypeCaseLevelPage.verifyContent(this.ccdCaseData);
    await createCaseFlagsFlagTypeCaseLevelPage.selectComplexCase();
    await createCaseFlagsFlagTypeCaseLevelPage.submit();

    const { createCaseFlagsCommentsPage } = this.createCaseFlagsPageFactory;
    await createCaseFlagsCommentsPage.verifyContent(this.ccdCaseData);
    await createCaseFlagsCommentsPage.addCaseFlagComment();
    await createCaseFlagsCommentsPage.submit();

    const { submitCreateCaseFlagsPage } = this.createCaseFlagsPageFactory;
    await submitCreateCaseFlagsPage.verifyContent(this.ccdCaseData);
    await submitCreateCaseFlagsPage.submit();
    super.incrementActiveCaseFlags();
  }

  async claimant1SpecialMeasureCaseFlag() {
    const { createCaseFlagsFlagTypePartyPage } = this.createCaseFlagsPageFactory;
    await createCaseFlagsFlagTypePartyPage.verifyContent(this.ccdCaseData);
    await createCaseFlagsFlagTypePartyPage.selectSpecialMeasure();
    await createCaseFlagsFlagTypePartyPage.submit();

    const { createCaseFlagsSpecialMeasurePage } = this.createCaseFlagsPageFactory;
    await createCaseFlagsSpecialMeasurePage.verifyContent(this.ccdCaseData);
    await createCaseFlagsSpecialMeasurePage.selectOther();
    await createCaseFlagsSpecialMeasurePage.submit();

    const { createCaseFlagsCommentsPage } = this.createCaseFlagsPageFactory;
    await createCaseFlagsCommentsPage.verifyContent(this.ccdCaseData);
    await createCaseFlagsCommentsPage.addCaseFlagComment();
    await createCaseFlagsCommentsPage.submit();

    const { submitCreateCaseFlagsPage } = this.createCaseFlagsPageFactory;
    await submitCreateCaseFlagsPage.verifyContent(this.ccdCaseData);
    await submitCreateCaseFlagsPage.submit();
    super.incrementActiveCaseFlags();
  }
}
