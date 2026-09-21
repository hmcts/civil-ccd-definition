import partys from "../../../../../constants/users/partys";
import CaseDataHelper from "../../../../../helpers/case-data-helper";
import { ClaimantDefendantPartyType } from "../../../../../models/users/claimant-defendant-party-types";

export const headings = {
  selectParty: 'Select what party the document is for',
};

export const radioButtons = {
  uploadMediationDocumentsPartyChosen: {
    label: 'Select one of the options',
    hintText: 'You can use the options below to let the court know who this document is from',
    parties: {
      claimant1: {
        label: (claimant1PartyType: ClaimantDefendantPartyType) => `Claimant 1: ${CaseDataHelper.buildClaimantAndDefendantData(partys.CLAIMANT_1,claimant1PartyType).partyName}`,
        selector:'#uploadMediationDocumentsPartyChosen_CLAIMANT_1',
      },
      claimant2: {
        label: (claimant2PartyType: ClaimantDefendantPartyType) => `Claimant 2: ${CaseDataHelper.buildClaimantAndDefendantData(partys.CLAIMANT_2,claimant2PartyType).partyName}`,
        selector:'#uploadMediationDocumentsPartyChosen_CLAIMANT_2',
      },
      claimants: {
        label: 'Claimants 1 and 2',
        selector:'#uploadMediationDocumentsPartyChosen_CLAIMANTS',
      },
      defendant1: {
        label: (defendant1PartyType: ClaimantDefendantPartyType) => `Defendant 1: ${CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1,defendant1PartyType).partyName}`,
        selector:'#uploadMediationDocumentsPartyChosen_DEFENDANT_1',
      },
      defendant2: {
        label: (defendant2PartyType: ClaimantDefendantPartyType) => `Defendant 2: ${CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_2,defendant2PartyType).partyName}`,
        selector:'#uploadMediationDocumentsPartyChosen_DEFENDANT_2',
      },
      defendants: {
        label: 'Defendants 1 and 2',
        selector:'#uploadMediationDocumentsPartyChosen_DEFENDANTS',
      },
    },
  },
};
