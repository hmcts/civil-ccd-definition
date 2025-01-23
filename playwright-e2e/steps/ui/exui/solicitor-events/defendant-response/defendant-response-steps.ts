import BaseExuiSteps from '../../../../../base/base-exui-steps';
import BaseSteps from '../../../../../base/base-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import DefendantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/defendant-response/defendant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from '../../../../../constants/ccd-events.ts';
import { claimantSolicitorUser, defendantSolicitor1User } from '../../../../../config/users/exui-users.ts';

@AllMethodsStep()
export default class DefendantResponseSteps extends BaseExuiSteps {
  private defendantResponsePageFactory: DefendantResponsePageFactory;

  constructor(
    defendantResponsePageFactory: DefendantResponsePageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.defendantResponsePageFactory = defendantResponsePageFactory;
  }

  async RespondToDefence1v1() {
    await this.retryExuiEvent(
      async () => {
        const { confirmDetailsPage } = this.defendantResponsePageFactory
        await confirmDetailsPage.verifyContent(this.ccdCaseData);
        await confirmDetailsPage.submit();

        const { respondentResponseTypeDefendant1Page } = this.defendantResponsePageFactory
        await respondentResponseTypeDefendant1Page.verifyContent(this.ccdCaseData);
        await respondentResponseTypeDefendant1Page.selectRejectAll();
        await respondentResponseTypeDefendant1Page.submit();

        const { solicitorReferencesPage } = this.defendantResponsePageFactory
        await solicitorReferencesPage.verifyContent(this.ccdCaseData);
        await solicitorReferencesPage.fillDefendant1Ref();
        await solicitorReferencesPage.submit();

        const { uploadDefendantResponseDefendant1Page } = this.defendantResponsePageFactory
        await uploadDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
        await uploadDefendantResponseDefendant1Page.uploadDefence();
        await uploadDefendantResponseDefendant1Page.submit();

        const { expertsDefendant1Page } = this.defendantResponsePageFactory
        await expertsDefendant1Page.verifyContent(this.ccdCaseData);
        await expertsDefendant1Page.useExperts();
        await expertsDefendant1Page.addNewExpert();
        await expertsDefendant1Page.submit();

      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }
}
