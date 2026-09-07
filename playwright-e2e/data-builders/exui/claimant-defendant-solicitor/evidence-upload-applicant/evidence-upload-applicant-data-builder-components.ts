import { claimantSolicitorUser } from '../../../../config/users/exui-users';
import DateHelper from '../../../../helpers/date-helper';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import ClaimTrack from '../../../../constants/cases/claim-track';
import partys from '../../../../constants/users/partys';
import ClaimType from '../../../../constants/cases/claim-type';
import CivilServiceRequests from '../../../../requests/civil-service-requests';

const createDate = () =>
  DateHelper.formatDateToString(DateHelper.getToday(), { outputFormat: 'YYYY-MM-DD' });

const createDateTime = () =>
  DateHelper.formatDateToString(DateHelper.getToday(), {
    outputFormat: 'YYYY-MM-DDTHH:MM:SS',
  });

const selectUploadOptions = (claimType: ClaimType) => {
  if (claimType === ClaimType.TWO_VS_ONE) {
    return {
      SelectUploadOptions: {
        evidenceUploadOptions: {
          list_items: [CaseDataHelper.setCodeToData('Claimants 1 and 2')],
          value: CaseDataHelper.setCodeToData('Claimants 1 and 2'),
        },
      }
    }
  }

  return {};
}

const evidenceUpload = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM)
    return {
      EvidenceUpload: {
        caseProgAllocatedTrack: 'FAST_CLAIM',
      },
    };
  else if (claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      EvidenceUpload: {
        caseProgAllocatedTrack: 'SMALL_CLAIM',
      }
    };
  return {};
};

const documentSelection = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM)
    return {
      DocumentSelectionFastTrack: {
        disclosureSelectionEvidence: ['DISCLOSURE_LIST'],
        witnessSelectionEvidence: ['WITNESS_SUMMARY'],
        expertSelectionEvidence: ['JOINT_STATEMENT'],
        trialSelectionEvidence: ['DOCUMENTARY'],
      },
    };
  else if (claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      DocumentSelectionSmallClaim: {
        witnessSelectionEvidenceSmallClaim: ['WITNESS_SUMMARY'],
        trialSelectionEvidenceSmallClaim: ['AUTHORITIES'],
        expertSelectionEvidenceSmallClaim: ['EXPERT_REPORT'],
      }
    }
  return {};
};


const documentUploadFastTrack = async (
  claimTrack: ClaimTrack,
  civilServiceRequests: CivilServiceRequests,
) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) {
    const disclosureDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const witnessSummaryDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const jointStatementDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const trialDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const witnessData = CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_1);
    const expertData = CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_1);
  
    return {
      DocumentUpload: {
        documentDisclosureList: [
          CaseDataHelper.setIdToData({
            documentUpload: disclosureDocument,
            createdDatetime: createDateTime(),
          }),
        ],
        documentWitnessSummary: [
          CaseDataHelper.setIdToData({
            witnessOptionName: witnessData.partyName,
            witnessOptionUploadDate: createDate(),
            witnessOptionDocument: witnessSummaryDocument,
            createdDatetime: createDateTime(),
          }),
        ],
        documentJointStatement: [
          CaseDataHelper.setIdToData({
            expertOptionName: expertData.partyName,
            expertOptionExpertises: expertData.fieldOfExpertise,
            expertOptionUploadDate: createDate(),
            expertDocument: jointStatementDocument,
            createdDatetime: createDateTime(),
          }),
        ],
        documentEvidenceForTrial: [
          CaseDataHelper.setIdToData({
            typeOfDocument: 'images etc',
            documentIssuedDate: createDate(),
            documentUpload: trialDocument,
            createdDatetime: createDateTime(),
          }),
        ],
      },
    };
  }

  return {};
};

const documentUploadSmallClaim = async (
  claimTrack: ClaimTrack,
  civilServiceRequests: CivilServiceRequests,
) => {
  if (claimTrack === ClaimTrack.SMALL_CLAIM) {
    const witnessStatement1 = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const witnessStatement2 = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const expertReport = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const authoritiesDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const witness1Data = CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_1);
    const witness2Data = CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_2);
    const expertData = CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_1);
    return {
      DocumentUpload: {
        documentWitnessStatement: [
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
        documentExpertReport: [
          CaseDataHelper.setIdToData({
            expertOptionName: expertData.partyName,
            expertOptionExpertise: expertData.fieldOfExpertise,
            expertOptionUploadDate: createDate(),
            expertDocument: expertReport,
          }),
        ],
        documentAuthorities: [
          CaseDataHelper.setIdToData({
            documentUpload: authoritiesDocument,
          }),
        ],
      },
    };
  }
};

export default {
  evidenceUpload,
  selectUploadOptions,
  documentSelection,
  documentUploadFastTrack,
  documentUploadSmallClaim,
};
