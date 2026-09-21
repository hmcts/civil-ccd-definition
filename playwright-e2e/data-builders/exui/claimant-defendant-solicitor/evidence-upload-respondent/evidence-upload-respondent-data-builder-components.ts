import {
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../config/users/exui-users';
import DateHelper from '../../../../helpers/date-helper';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import { Party } from '../../../../models/users/partys';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimType from '../../../../constants/cases/claim-type';
import partys from '../../../../constants/users/partys';
import CivilServiceRequests from '../../../../requests/civil-service-requests';

const createDate = () =>
  DateHelper.formatDateToString(DateHelper.getToday(), { outputFormat: 'YYYY-MM-DD' });

const createDateTime = () =>
  DateHelper.formatDateToString(DateHelper.getToday(), {
    outputFormat: 'YYYY-MM-DDTHH:MM:SS',
  });

const evidenceUpload = {
  EvidenceUpload: {
    caseProgAllocatedTrack: 'FAST_CLAIM',
  },
};

const selectUploadOptions = (claimType: ClaimType) => {
  if (claimType === ClaimType.ONE_VS_TWO_SAME_SOL) {
    return {
      SelectUploadOptions: {
        evidenceUploadOptions: {
          list_items: [CaseDataHelper.setCodeToData('Defendant 1 and 2')],
          value: CaseDataHelper.setCodeToData('Defendant 1 and 2')
        }
      }
    }
  }

  return {};
}

const documentSelection = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM)
    return {
      DocumentSelectionFastTrack: {
        disclosureSelectionEvidenceRes: ['DISCLOSURE_LIST'],
        witnessSelectionEvidenceRes: ['WITNESS_SUMMARY'],
        expertSelectionEvidenceRes: ['QUESTIONS_FOR_EXPERTS'],
        trialSelectionEvidenceRes: ['COSTS'],
      },
    };
  else if (claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      DocumentSelectionSmallClaim: {
        witnessSelectionEvidenceSmallClaim: ['WITNESS_SUMMARY'],
        trialSelectionEvidenceSmallClaim: ['AUTHORITIES'],
        expertSelectionEvidenceSmallClaim: ['EXPERT_REPORT'],
      }
    };

  return {};
};

const getUploadUser = (defendantSolicitorParty: Party) =>
  defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? defendantSolicitor1User
    : defendantSolicitor2User;

const documentUploadFastTrack = async (
  claimTrack: ClaimTrack,
  witnessParty: Party,
  expertParty: Party,
  defendantSolicitorParty: Party,
  civilServiceRequests: CivilServiceRequests,
) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) {
    const user = getUploadUser(defendantSolicitorParty);
    const disclosureDocument = await civilServiceRequests.uploadTestDocument(user);
    const witnessSummaryDocument = await civilServiceRequests.uploadTestDocument(user);
    const questionsDocument = await civilServiceRequests.uploadTestDocument(user);
    const authoritiesDocument = await civilServiceRequests.uploadTestDocument(user);
    const witnessPartyData = CaseDataHelper.buildWitnessData(witnessParty);
    const expertPartyData = CaseDataHelper.buildExpertData(expertParty);

    return {
      DocumentUpload: {
        documentDisclosureListRes: [
          CaseDataHelper.setIdToData({
            documentUpload: disclosureDocument,
            createdDatetime: createDateTime(),
          }),
        ],
        documentWitnessSummaryRes: [
          CaseDataHelper.setIdToData({
            witnessOptionName: witnessPartyData.partyName,
            witnessOptionUploadDate: createDate(),
            witnessOptionDocument: witnessSummaryDocument,
            createdDatetime: createDateTime(),
          }),
        ],
        documentQuestionsRes: [
          CaseDataHelper.setIdToData({
            expertOptionName: expertPartyData.partyName,
            expertOptionOtherParty: 'text',
            expertDocumentQuestion: 'question',
            expertOptionUploadDate: createDate(),
            expertDocument: questionsDocument,
            createdDatetime: createDateTime(),
          }),
        ],
        documentAuthoritiesRes: [
          CaseDataHelper.setIdToData({
            documentUpload: authoritiesDocument,
            createdDatetime: createDateTime(),
          }),
        ],
      },
    };
  }
};

const documentUploadSmallClaim = async (
  claimTrack: ClaimTrack,
  witness1Party: Party,
  witness2Party: Party,
  expertParty: Party,
  defendantSolicitorParty: Party,
  civilServiceRequests: CivilServiceRequests,
) => {
  if (claimTrack === ClaimTrack.SMALL_CLAIM) {
    const user = getUploadUser(defendantSolicitorParty);
    const witnessStatement1 = await civilServiceRequests.uploadTestDocument(user);
    const witnessStatement2 = await civilServiceRequests.uploadTestDocument(user);
    const expertReport = await civilServiceRequests.uploadTestDocument(user);
    const authoritiesDocument = await civilServiceRequests.uploadTestDocument(user);
    const witness1Data = CaseDataHelper.buildWitnessData(witness1Party);
    const witness2Data = CaseDataHelper.buildWitnessData(witness2Party);
    const expertData = CaseDataHelper.buildExpertData(expertParty);
    return {
      DocumentUpload: {
        documentWitnessStatementRes: [
          CaseDataHelper.setIdToData({
            witnessOptionName: witness1Data.partyName,
            witnessOptionUploadDate: createDate(),
            witnessOptionDocument: witnessStatement1,
          }),
          CaseDataHelper.setIdToData({
            witnessOptionName: witness2Data.partyName,
            witnessOptionUploadDate: createDate(),
            witnessOptionDocument: witnessStatement2,
          }),
        ],
        documentExpertReportRes: [
          CaseDataHelper.setIdToData({
            expertOptionName: expertData.partyName,
            expertOptionExpertise: expertData.fieldOfExpertise,
            expertOptionUploadDate: createDate(),
            expertDocument: expertReport,
          }),
        ],
        documentAuthoritiesRes: [
          CaseDataHelper.setIdToData({
            documentUpload: authoritiesDocument,
          }),
        ],
      },
    };
  }
}

const undefine = {
  Undefine: {
    witnessSelectionEvidenceSmallClaim: undefined,
    trialSelectionEvidenceSmallClaim: undefined,
    expertSelectionEvidenceSmallClaim: undefined,
  }
};

export default {
  evidenceUpload,
  selectUploadOptions,
  documentSelection,
  documentUploadFastTrack,
  documentUploadSmallClaim,
  undefine
};
