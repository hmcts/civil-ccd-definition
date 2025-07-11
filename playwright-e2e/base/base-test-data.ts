import claimantDefendantPartyTypes from '../constants/claimant-defendant-party-types';
import CaseDataHelper from '../helpers/case-data-helper';
import CCDCaseData from '../models/ccd/ccd-case-data';
import { ClaimantDefendantPartyType } from '../models/claimant-defendant-party-types';
import TestData from '../models/test-data';

export default abstract class BaseTestData {
  private _testData: TestData;

  constructor(testData: TestData) {
    this._testData = testData;
  }

  protected get workerIndex() {
    return this._testData.workerIndex;
  }

  protected get ccdCaseData() {
    return this._testData.ccdCaseData;
  }

  protected set setCCDCaseData(ccdCaseData: CCDCaseData) {
    this._testData.ccdCaseData = ccdCaseData;
  }

  protected get claimant1PartyType() {
    return this._testData.claimant1PartyType;
  }

  protected set setClaimant1PartyType(claimant1PartyType: ClaimantDefendantPartyType) {
    this._testData.claimant1PartyType = claimant1PartyType;
    if (claimant1PartyType)
      console.log('Set Claimant 1 Party Type: ' + this._testData.claimant1PartyType?.type);
  }

  protected get claimant2PartyType() {
    return this._testData.claimant2PartyType;
  }

  protected set setClaimant2PartyType(claimant2PartyType: ClaimantDefendantPartyType) {
    this._testData.claimant2PartyType = claimant2PartyType;
    if (claimant2PartyType)
      console.log('Set Claimant 2 Party Type: ' + this._testData.claimant2PartyType?.type);
  }

  protected get defendant1PartyType() {
    return this._testData.defendant1PartyType;
  }

  protected set setDefendant1PartyType(defendant1PartyType: ClaimantDefendantPartyType) {
    this._testData.defendant1PartyType = defendant1PartyType;
    if (defendant1PartyType)
      console.log('Set Defendant 1 Party Type: ' + this._testData.defendant1PartyType?.type);
  }

  protected get defendant2PartyType() {
    return this._testData.defendant2PartyType;
  }

  protected set setDefendant2PartyType(defendant2PartyType: ClaimantDefendantPartyType) {
    this._testData.defendant2PartyType = defendant2PartyType;
    if (defendant2PartyType)
      console.log('Set Defendant 2 Party Type: ' + this._testData.defendant2PartyType?.type);
  }

  protected get activeCaseFlags() {
    return this._testData.activeCaseFlags;
  }

  protected incrementActiveCaseFlags() {
    console.log('Incrementing Total Active Case Flags');
    this._testData.activeCaseFlags++;
    console.log(`Total Number of Active Case Flags: ${this._testData.activeCaseFlags}`);
  }

  protected decrementActiveCaseFlags() {
    console.log('Decrementing Total Active Case Flags');
    this._testData.activeCaseFlags--;
    console.log(`Total Number of Active Case Flags: ${this._testData.activeCaseFlags}`);
  }

  protected setClaimantDefendantPartyTypes() {
    this.setClaimant1PartyType = claimantDefendantPartyTypes[this.ccdCaseData?.applicant1?.type];
    this.setClaimant2PartyType = claimantDefendantPartyTypes[this.ccdCaseData?.applicant2?.type];
    this.setDefendant1PartyType = claimantDefendantPartyTypes[this.ccdCaseData?.respondent1?.type];
    this.setDefendant2PartyType = claimantDefendantPartyTypes[this.ccdCaseData?.respondent2?.type];
  }

  protected setActiveCaseFlags() {
    let activeCaseFlags = 0;
    activeCaseFlags += CaseDataHelper.getActiveCaseLevelFlags(this.ccdCaseData);
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForClaimantDefendant(
      this.ccdCaseData?.applicant1,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForLitigationFriend(
      this.ccdCaseData?.applicant1LitigationFriend,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForClaimantDefendant(
      this.ccdCaseData?.applicant2,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForLitigationFriend(
      this.ccdCaseData?.applicant2LitigationFriend,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForClaimantDefendant(
      this.ccdCaseData?.respondent1,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForLitigationFriend(
      this.ccdCaseData?.respondent1LitigationFriend,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForClaimantDefendant(
      this.ccdCaseData?.respondent2,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForLitigationFriend(
      this.ccdCaseData?.respondent2LitigationFriend,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForExpertAndWitness(
      this.ccdCaseData.applicantExperts,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForExpertAndWitness(
      this.ccdCaseData.applicantWitnesses,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForExpertAndWitness(
      this.ccdCaseData.respondent1Experts,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForExpertAndWitness(
      this.ccdCaseData.respondent1Witnesses,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForExpertAndWitness(
      this.ccdCaseData.respondent2Experts,
    );
    activeCaseFlags += CaseDataHelper.getActiveCaseFlagsForExpertAndWitness(
      this.ccdCaseData.respondent2Witnesses,
    );
    this._testData.activeCaseFlags = activeCaseFlags;
    console.log(`Total Number of Active Case Flags: ${this._testData.activeCaseFlags}`);
  }
}
