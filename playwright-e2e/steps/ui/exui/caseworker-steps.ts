import CaseworkerActionsFactory from '../../../actions/ui/exui/caseworker/caseworker-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import { civilAdminUser } from '../../../config/users/exui-users.ts';
import ccdEvents from '../../../constants/ccd-events.ts';

@AllMethodsStep()
export default class CaseworkerSteps extends BaseExui {
  private caseworkerActionsFactory: CaseworkerActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    caseworkerActionsFactory: CaseworkerActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, requestsFactory, testData);
    this.caseworkerActionsFactory = caseworkerActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(civilAdminUser);
  }

  async CaseProceedsInCaseman() {
    const { caseProceedsInCasemanActions } = this.caseworkerActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await caseProceedsInCasemanActions.caseSettled();
      },
      async () => {},
      ccdEvents.CASE_PROCEEDS_IN_CASEMAN,
      { verifySuccessEvent: false },
    );
  }

  async CaseProceedsInCasemanSpec() {
    const { caseProceedsInCasemanActions } = this.caseworkerActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await caseProceedsInCasemanActions.caseSettledSpec();
      },
      async () => {},
      ccdEvents.CASE_PROCEEDS_IN_CASEMAN,
      { verifySuccessEvent: false },
    );
  }

  async ManageDocuments() {
    const { manageDocumentsActions } = this.caseworkerActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await manageDocumentsActions.addDocuments();
      },
      async () => {},
      ccdEvents.MANAGE_DOCUMENTS,
      { verifySuccessEvent: false },
    );
  }

  async ManageContactInformation1v1SpecClaimant1Individual() {
    const { manageContactInformationActions } = this.caseworkerActionsFactory;

    await super.retryExuiEvent(
      async () => {
        await manageContactInformationActions.partySelectionClaimant1Individual();
        await manageContactInformationActions.applicantParty1Individual(ccdEvents.MANAGE_CONTACT_INFORMATION);
        await manageContactInformationActions.manageContactInformationSubmit();
      },
      async () => {
        await manageContactInformationActions.manageContactInformationConfirm();
      },
      ccdEvents.MANAGE_CONTACT_INFORMATION,
      { verifySuccessEvent: false },
    );
    await this.exuiDashboardActions.verifyManageContactInformationUpdateClaimant1Individual();
  }

  async ManageContactInformation1v1SpecDefendant1Company() {
    const { manageContactInformationActions } = this.caseworkerActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await manageContactInformationActions.partySelectionDefendant1Company();
        await manageContactInformationActions.defendantParty1Company(ccdEvents.MANAGE_CONTACT_INFORMATION);
        await manageContactInformationActions.manageContactInformationSubmit();
      },
      async () => {
        await manageContactInformationActions.manageContactInformationConfirm();
      },
      ccdEvents.MANAGE_CONTACT_INFORMATION,
      { verifySuccessEvent: false },
    );
    await this.exuiDashboardActions.verifyManageContactInformationUpdateDefendant1Company();
  }

  async ManageContactInformation1v2DSDefendant1LitigationFriend() {
    const { manageContactInformationActions } = this.caseworkerActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await manageContactInformationActions.partySelectionDefendant1LitigationFriend();
        await manageContactInformationActions.defendantParty1LitigationFriend(ccdEvents.MANAGE_CONTACT_INFORMATION);
        await manageContactInformationActions.manageContactInformationSubmit();
      },
      async () => {
        await manageContactInformationActions.manageContactInformationConfirm();
      },
      ccdEvents.MANAGE_CONTACT_INFORMATION,
      { verifySuccessEvent: false },
    );
    await this.exuiDashboardActions.verifyManageContactInformationUpdateDefendant1LitigationFriend();
  }

  async ManageContactInformation1v2DSDefendant2Witness() {
    const { manageContactInformationActions } = this.caseworkerActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await manageContactInformationActions.partySelectionDefendant2Witness();
        await manageContactInformationActions.defendantParty2Witness();
        await manageContactInformationActions.manageContactInformationSubmit();
      },
      async () => {
        await manageContactInformationActions.manageContactInformationConfirm();
      },
      ccdEvents.MANAGE_CONTACT_INFORMATION,
      { verifySuccessEvent: false },
    );
    await this.exuiDashboardActions.verifyManageContactInformationUpdateDefendant2Witness();
  }

  async ManageContactInformation1v2DSDefendant1Expert() {
    const { manageContactInformationActions } = this.caseworkerActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await manageContactInformationActions.partySelectionDefendant1Expert();
        await manageContactInformationActions.defendantParty1Expert();
        await manageContactInformationActions.manageContactInformationSubmit();
      },
      async () => {
        await manageContactInformationActions.manageContactInformationConfirm();
      },
      ccdEvents.MANAGE_CONTACT_INFORMATION,
      { verifySuccessEvent: false },
    );
    await this.exuiDashboardActions.verifyManageContactInformationUpdateDefendant1Expert();
  }

}
