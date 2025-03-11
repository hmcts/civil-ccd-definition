import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import AcknowledgeClaimPageFactory from '../../../../pages/exui/claimant-defendant-solicitor/acknowledge-claim/acknowledge-claim-page-factory';

@AllMethodsStep()
export default class AcknowledgeClaimActions extends BaseTestData {
  private acknowledgeClaimPageFactory: AcknowledgeClaimPageFactory;

  constructor(acknowledgeClaimPageFactory: AcknowledgeClaimPageFactory, testData: TestData) {
    super(testData);
    this.acknowledgeClaimPageFactory = acknowledgeClaimPageFactory;
  }

  async confirmNameAndAddress() {
    const { confirmNameAndAddressPage } = this.acknowledgeClaimPageFactory;
    await confirmNameAndAddressPage.verifyContent();
    await confirmNameAndAddressPage.submit();
  }

  async responseIntentionDefendant1() {
    const { responseIntentionDefendant1Page } = this.acknowledgeClaimPageFactory;
    await responseIntentionDefendant1Page.verifyContent(this.ccdCaseData);
    await responseIntentionDefendant1Page.selectRejectAll();
    await responseIntentionDefendant1Page.submit();
  }

  async solicitorReferencesAcknowledgeClaimDefendant1() {
    const { solicitorReferencesAcknowledgeClaimDefendant1Page } = this.acknowledgeClaimPageFactory;
    await solicitorReferencesAcknowledgeClaimDefendant1Page.verifyContent();
    await solicitorReferencesAcknowledgeClaimDefendant1Page.submit();
  }

  async submitAcknowledgeClaim() {
    const { submitAcknowledgeClaimPage } = this.acknowledgeClaimPageFactory;
    await submitAcknowledgeClaimPage.verifyContent(this.ccdCaseData);
    await submitAcknowledgeClaimPage.submit();
  }

  async confirmAcknowledgeClaim() {
    const { confirmAcknowledgeClaimPage } = this.acknowledgeClaimPageFactory;
    await confirmAcknowledgeClaimPage.verifyContent(this.ccdCaseData);
    await confirmAcknowledgeClaimPage.submit();
  }

  async responseIntention2v1() {
    const { responseIntention2v1Page } = this.acknowledgeClaimPageFactory;
    await responseIntention2v1Page.verifyContent(this.ccdCaseData);
    await responseIntention2v1Page.selectRejectAll();
    await responseIntention2v1Page.submit();
  }

  async responseIntention1v2SS() {
    const { responseIntention1v2SSPage } = this.acknowledgeClaimPageFactory;
    await responseIntention1v2SSPage.verifyContent(this.ccdCaseData);
    await responseIntention1v2SSPage.selectRejectAll();
    await responseIntention1v2SSPage.submit();
  }

  async solicitorReferencesAcknowledgeClaimDefendant2() {
    const { solicitorReferencesAcknowledgeClaimDefendant2Page } = this.acknowledgeClaimPageFactory;
    await solicitorReferencesAcknowledgeClaimDefendant2Page.verifyContent();
    await solicitorReferencesAcknowledgeClaimDefendant2Page.submit();
  }
}
