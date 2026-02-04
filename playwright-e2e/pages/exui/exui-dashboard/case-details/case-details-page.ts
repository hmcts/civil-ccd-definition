import BasePage from '../../../../base/base-page';
import config from '../../../../config/config';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../models/ccd/ccd-case-data';
import { CCDEvent } from '../../../../models/ccd/ccd-events';
import {
  components,
  getFormattedCaseId,
  getUnformattedCaseId,
  headings,
} from '../../exui-page/exui-content';
import ExuiPage from '../../exui-page/exui-page';
import {
  buttons,
  caseFlagsNoticeText,
  containers,
  dropdowns,
  successBannerText,
  tabs,
  labels
} from './case-details-content';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import claimantDefendantPartyTypes from '../../../../constants/claimant-defendant-party-types';
import partys from '../../../../constants/partys';

const classKey = 'CaseDetailsPage';

@AllMethodsStep()
export default class CaseDetailsPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(caseData),
      super.expectSelector(tabs.summary.selector),
      super.expectSelector(tabs.caseFile.selector),
      super.expectSelector(tabs.claimDetails.selector),
      super.expectSelector(tabs.history.selector),
      // super.expectText(tabs.claimDocs.title),
      // super.expectSelector(tabs.paymentHistory.selector),
      // super.expectText(tabs.serviceRequest.title, { exact: true }),
      super.expectSelector(tabs.bundles.selector),
      super.expectSelector(tabs.caseFlags.selector),
      // super.expectLabel(dropdowns.nextStep.label),
    ]);
  }

  async verifySummaryContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.summary.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyCaseFileContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.caseFile.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyClaimDetailsContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.claimDetails.title);
    await super.runVerifications([
      super.verifyHeadings(caseData),
    ], { useAxeCache: false });
  }

  async verifyClaimDocumentsContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.claimDocs.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyPaymentHistoryContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.paymentHistory.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyBundlesContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.bundles.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyCaseFlagsContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.caseFlags.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async grabCaseNumber() {
    return getUnformattedCaseId(await super.getText(headings.caseNumber.selector));
  }

  @TruthyParams(classKey, 'caseId')
  async goToCaseDetails(caseId: number, { force }: { force: boolean } = { force: true }) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseId}`, { force });
  }

  @TruthyParams(classKey, 'caseId')
  async retryGoToCaseDetails(caseId: number) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.retryGoTo(
      `${urls.manageCase}/cases/case-details/${caseId}`,
      () =>
        super.expectSelector(tabs.summary.selector, {
          timeout: config.playwright.shortExpectTimeout,
        }),
      undefined,
      { retries: 3, message: `Navigating to case with ccd case id: ${caseId}, trying again` },
    );
  }

  async chooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.selectFromDropdown(ccdEvent.name, dropdowns.nextStep.selector);
    await super.clickBySelector(buttons.go.selector);
    super.setCCDEvent = ccdEvent;
  }

  async retryChooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.retryAction(
      async () => {
        await super.retryReload(
          async () => {
            await super.expectSelector(dropdowns.nextStep.selector);
            await super.selectFromDropdown(ccdEvent.name, dropdowns.nextStep.selector, {
              timeout: 5_000,
            });
          },
          undefined,
          { retries: 1 },
        );
        await super.clickBySelector(buttons.go.selector);
      },
      async () => {
        await super.waitForPageToLoad();
        await super.expectNoSelector(tabs.summary.selector, {
          timeout: config.exui.pageSubmitTimeout,
        });
      },
      () => super.reload(),
      { retries: 3, message: `Starting event: ${ccdEvent.name} failed, trying again` },
    );
  }

  async chooseNextStepWithUrl(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Starting event with url: ${ccdEvent.id}`);
    await super.goTo(
      `${urls.manageCase}/cases/case-details/${caseId}/trigger/${ccdEvent.id}/${ccdEvent.id}`,
    );
    super.setCCDEvent = ccdEvent;
  }

  async retryChooseNextStepWithUrl(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Starting event with url: ${ccdEvent.id}`);
    await super.retryGoTo(
      `${urls.manageCase}/cases/case-details/${caseId}/trigger/${ccdEvent.id}/${ccdEvent.id}`,
      async () =>
        super.expectSelector(components.eventTrigger.selector, {
          timeout: config.exui.pageSubmitTimeout,
        }),
      undefined,
      { retries: 2, message: `Starting event with url: ${ccdEvent.id} failed, trying again` },
    );
    super.setCCDEvent = ccdEvent;
  }

  async verifySuccessEvent(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Verifying success banner and event history: ${ccdEvent.name}`);
    await super.expectText(successBannerText(getFormattedCaseId(caseId), ccdEvent));
    await super.clickByText(tabs.history.title);
    await super.expectTableRowValue(ccdEvent.name, containers.eventHistory.selector, {
      rowNum: 1,
    });
  }

  async verifySuccessCaseFlagsEvent(activeCaseFlags: number, ccdEvent: CCDEvent) {
    console.log(`Verifying case flags notice and event history: ${ccdEvent.name}`);
    await super.expectText(caseFlagsNoticeText(activeCaseFlags), { exact: false });
    await super.clickByText(tabs.history.title);
    await super.expectTableRowValue(ccdEvent.name, containers.eventHistory.selector, {
      rowNum: 1,
    });
  }

  async verifyClaimDetailsContentManageContactInformationClaimant1Individual() {
    const expectedUser = CaseDataHelper.buildClaimantAndDefendantData(partys.CLAIMANT_1, claimantDefendantPartyTypes.INDIVIDUAL, { updated: true });
    const expectedAddress = CaseDataHelper.buildAddressData(partys.CLAIMANT_1, { updated: true });
    await super.clickByText(tabs.claimDetails.title);
    await this.expectTableValueByRowName(labels.firstName, expectedUser.individualFirstName, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.lastName, expectedUser.individualLastName, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.email, expectedUser.partyEmail, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.building, expectedAddress.AddressLine1, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.addressLine2, expectedAddress.AddressLine2, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.addressLine3, expectedAddress.AddressLine3, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.postTown, expectedAddress.PostTown, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.county, expectedAddress.County, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.country, expectedAddress.Country, { containerSelector: containers.verifyDetails.claimant1.selector });
    await this.expectTableValueByRowName(labels.postCode, expectedAddress.PostCode, { containerSelector: containers.verifyDetails.claimant1.selector });
  }

  async verifyClaimDetailsContentManageContactInformationDefendant1Company() {
    const expectedUser = CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1, claimantDefendantPartyTypes.COMPANY, { updated: true });
    const expectedAddress = CaseDataHelper.buildAddressData(partys.DEFENDANT_1, { updated: true });
    await super.clickByText(tabs.claimDetails.title);
    await this.expectTableValueByRowName(labels.companyName, expectedUser.companyName, { containerSelector: containers.verifyDetails.defendant1.selector, first: true });
    await this.expectTableValueByRowName(labels.email, expectedUser.partyEmail, { containerSelector: containers.verifyDetails.defendant1.selector });
    await this.expectTableValueByRowName(labels.building, expectedAddress.AddressLine1, { containerSelector: containers.verifyDetails.defendant1.selector });
    await this.expectTableValueByRowName(labels.addressLine2, expectedAddress.AddressLine2, { containerSelector: containers.verifyDetails.defendant1.selector });
    await this.expectTableValueByRowName(labels.addressLine3, expectedAddress.AddressLine3, { containerSelector: containers.verifyDetails.defendant1.selector });
    await this.expectTableValueByRowName(labels.postTown, expectedAddress.PostTown, { containerSelector: containers.verifyDetails.defendant1.selector });
    await this.expectTableValueByRowName(labels.county, expectedAddress.County, { containerSelector: containers.verifyDetails.defendant1.selector });
    await this.expectTableValueByRowName(labels.country, expectedAddress.Country, { containerSelector: containers.verifyDetails.defendant1.selector });
    await this.expectTableValueByRowName(labels.postCode, expectedAddress.PostCode, { containerSelector: containers.verifyDetails.defendant1.selector });
  }

  async verifyManageContactInformationUpdateDefendant1LitigationFriend() {
    const expectedUser = CaseDataHelper.buildLitigationFriendData(partys.DEFENDANT_1_LITIGATION_FRIEND, { updated: true });
    const expectedAddress = CaseDataHelper.buildAddressData(partys.DEFENDANT_1_LITIGATION_FRIEND, { updated: true });
    await super.clickByText(tabs.claimDetails.title);
    await this.expectTableValueByRowName(labels.firstName, expectedUser.firstName, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.lastName, expectedUser.lastName, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.email, expectedUser.emailAddress, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.building, expectedAddress.AddressLine1, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.addressLine2, expectedAddress.AddressLine2, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.addressLine3, expectedAddress.AddressLine3, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.postTown, expectedAddress.PostTown, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.county, expectedAddress.County, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.country, expectedAddress.Country, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
    await this.expectTableValueByRowName(labels.postCode, expectedAddress.PostCode, { containerSelector: containers.verifyDetails.respondent1LitigationFriend.selector });
  }

  async verifyManageContactInformationUpdateDefendant1Expert() {
    const expectedUser = CaseDataHelper.buildExpertData(partys.DEFENDANT_1_EXPERT_1, { updated: true });
    await super.clickByText(tabs.claimDetails.title);
    await this.expectText(expectedUser.firstName, { containerSelector: containers.verifyDetails.defendant1Experts.selector, exact: false });
    await this.expectText(expectedUser.lastName, { containerSelector: containers.verifyDetails.defendant1Experts.selector, exact: false });
    await this.expectText(expectedUser.emailAddress, { containerSelector: containers.verifyDetails.defendant1Experts.selector, exact: false });
  }

  async verifyManageContactInformationUpdateDefendant2Witness() {
    const expectedUser = CaseDataHelper.buildWitnessData(partys.DEFENDANT_2_WITNESS_1, { updated: true });
    await super.clickByText(tabs.claimDetails.title);
    await this.expectText(expectedUser.firstName, { containerSelector: containers.verifyDetails.defendant2Witnesses.selector, exact: false });
    await this.expectText(expectedUser.lastName, { containerSelector: containers.verifyDetails.defendant2Witnesses.selector, exact: false });
    await this.expectText(expectedUser.emailAddress, { containerSelector: containers.verifyDetails.defendant2Witnesses.selector, exact: false });
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
