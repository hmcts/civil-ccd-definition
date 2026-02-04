import test from 'node:test';
import BaseTestData from '../../../../base/base-test-data.ts';
import { AllMethodsStep } from '../../../../decorators/test-steps.ts';
import TestData from '../../../../models/test-data.ts';
import ManageContactInformationPageFactory from '../../../../pages/exui/caseworker/manage-contact-information/manage-contact-information-page-factory.ts';

@AllMethodsStep()
export default class ManageContactInformationActions extends BaseTestData {
  private manageContactInformationPageFactory: ManageContactInformationPageFactory;

  constructor(
    manageContactInformationPageFactory: ManageContactInformationPageFactory,
    testData: TestData) {
    super(testData);
    this.manageContactInformationPageFactory = manageContactInformationPageFactory;
  }

  async partySelectionClaimant1Individual() {
    const { partySelectionSpecPage } = this.manageContactInformationPageFactory;
    await partySelectionSpecPage.verifyContent(this.ccdCaseData, this.claimant1PartyType, this.defendant1PartyType);
    await partySelectionSpecPage.selectClaimant1();
    await partySelectionSpecPage.submit();
  }

  async partySelectionDefendant1Company() {
    const { partySelectionSpecPage } = this.manageContactInformationPageFactory;
    await partySelectionSpecPage.verifyContent(this.ccdCaseData, this.claimant1PartyType, this.defendant1PartyType);
    await partySelectionSpecPage.selectDefendant1();
    await partySelectionSpecPage.submit();
  }

  async partySelectionDefendant1LitigationFriend() {
    const { partySelection1v2DSPage } = this.manageContactInformationPageFactory;
    await partySelection1v2DSPage.verifyContent(this.ccdCaseData, this.claimant1PartyType, this.defendant1PartyType, this.defendant2PartyType);
    await partySelection1v2DSPage.selectDefendant1LitigationFriend();
    await partySelection1v2DSPage.submit();
  }

  async partySelectionDefendant1Expert() {
    const { partySelection1v2DSPage } = this.manageContactInformationPageFactory;
    await partySelection1v2DSPage.verifyContent(this.ccdCaseData, this.claimant1PartyType, this.defendant1PartyType, this.defendant2PartyType);
    await partySelection1v2DSPage.selectDefendant1Expert();
    await partySelection1v2DSPage.submit();
  }

  async partySelectionDefendant2Witness() {
    const { partySelection1v2DSPage } = this.manageContactInformationPageFactory;
    await partySelection1v2DSPage.verifyContent(this.ccdCaseData, this.claimant1PartyType, this.defendant1PartyType, this.defendant2PartyType);
    await partySelection1v2DSPage.selectDefendant2Witnesses();
    await partySelection1v2DSPage.submit();
  }

  async applicantParty1Individual(ccdEventState: { id: string }) {
    const { applicant1PartyPage } = this.manageContactInformationPageFactory;
    await applicant1PartyPage.verifyContent(this.ccdCaseData, this.claimant1PartyType);
    await applicant1PartyPage.enterDetailsIndividual(ccdEventState);
    await applicant1PartyPage.submit();
  }

  async defendantParty1Company(ccdEventState: { id: string }) {
    const { defendant1PartyPage } = this.manageContactInformationPageFactory;
    await defendant1PartyPage.verifyContent(this.ccdCaseData, this.defendant1PartyType);
    await defendant1PartyPage.enterDetailsCompany(ccdEventState);
    await defendant1PartyPage.submit();
  }

  async defendantParty1LitigationFriend(ccdEventState: { id: string }) {
    const { manageContactInformationLitigationFriendPage } = this.manageContactInformationPageFactory;
    await manageContactInformationLitigationFriendPage.verifyContent(this.ccdCaseData);
    await manageContactInformationLitigationFriendPage.enterDetailsLitigationFriend(ccdEventState);
    await manageContactInformationLitigationFriendPage.submit();
  }

  async defendantParty1Expert() {
    const { manageContactInformationExpertPage } = this.manageContactInformationPageFactory;
    await manageContactInformationExpertPage.verifyContent(this.ccdCaseData);
    await manageContactInformationExpertPage.enterDetailsExpert();
    await manageContactInformationExpertPage.submit();
  }

  async defendantParty2Witness() {
    const { manageContactInformationWitnessPage } = this.manageContactInformationPageFactory;
    await manageContactInformationWitnessPage.verifyContent(this.ccdCaseData);
    await manageContactInformationWitnessPage.enterDetailsWitness();
    await manageContactInformationWitnessPage.submit();
  }

  async manageContactInformationSubmit() {
    const { manageContactInformationSubmitPage } = this.manageContactInformationPageFactory;
    await manageContactInformationSubmitPage.verifyContent(this.ccdCaseData);
    await manageContactInformationSubmitPage.enterEventDetails();
    await manageContactInformationSubmitPage.submit();
  }

  async manageContactInformationConfirm() {
    const { manageContactInformationConfirmPage } = this.manageContactInformationPageFactory;
    await manageContactInformationConfirmPage.verifyContent(this.ccdCaseData);
  }
}

