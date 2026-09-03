import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import ClaimType from '../../../../../constants/cases/claim-type';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import DateHelper from '../../../../../helpers/date-helper';
import CivilServiceRequests from '../../../../../requests/civil-service-requests';


const selectDefendantSolicitor = {
  SelectDefendantSolicitor: {
    defendantSolicitorNotifyClaimDetailsOptions: {
      list_items: [CaseDataHelper.setCodeToData('Both')],
      value: CaseDataHelper.setCodeToData('Both'),
    },
  }
};

const upload = async (
  claimType: ClaimType,
  hasParticularsOfClaimDocument: boolean,
  civilServiceRequests: CivilServiceRequests,
) => {
  if (
    !hasParticularsOfClaimDocument &&
    (ClaimTypeHelper.isDefendant1Represented(claimType) ||
      ClaimTypeHelper.isDefendant2Represented(claimType))
  ) {
    const particularsOfClaimDocument =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

    return {
      Upload: {
        servedDocumentFiles: {
          particularsOfClaimDocument: [
            CaseDataHelper.setIdToData(particularsOfClaimDocument)
          ],
        },
      },
    };
  }

  return {};
};

const certificateOfService1 = async (
  claimType: ClaimType,
  civilServiceRequests: CivilServiceRequests,
) => {
  if (ClaimTypeHelper.isDefendant1Unrepresented(claimType)) {
    const defendant1SupportEvidenceCos =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const serviceDate = DateHelper.formatDateToString(
      DateHelper.subtractFromToday({ days: 1, workingDay: true }),
      { outputFormat: 'YYYY-MM-DD' },
    );

    return {
      CertificateOfService1: {
        cosNotifyClaimDetails1: {
          cosDateOfServiceForDefendant: serviceDate,
          cosDateDeemedServedForDefendant: serviceDate,
          cosServedDocumentFiles: 'string',
          cosRecipient: 'string',
          cosRecipientServeType: 'HANDED',
          cosRecipientServeLocation: 'string',
          cosRecipientServeLocationOwnerType: 'FRIEND',
          cosRecipientServeLocationType: 'LAST_KNOWN_RESIDENCE',
          cosSender: 'string',
          cosSenderFirm: 'string',
          cosEvidenceDocument: [
            CaseDataHelper.setIdToData(defendant1SupportEvidenceCos)
          ],
          cosUISenderStatementOfTruthLabel: [
            'CERTIFIED'
          ],
        }
      }
    };
  }

  return {};
}

const certificateOfService2 = async (
  claimType: ClaimType,
  civilServiceRequests: CivilServiceRequests,
) => {
  if (ClaimTypeHelper.isDefendant2Unrepresented(claimType)) {
    const defendant2SupportEvidenceCos =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const serviceDate = DateHelper.formatDateToString(
      DateHelper.subtractFromToday({ days: 1, workingDay: true }),
      { outputFormat: 'YYYY-MM-DD' },
    );

    return {
      CertificateOfService2: {
        cosNotifyClaimDetails2: {
          cosDateOfServiceForDefendant: serviceDate,
          cosDateDeemedServedForDefendant: serviceDate,
          cosServedDocumentFiles: 'string',
          cosRecipient: 'string',
          cosRecipientServeType: 'OTHER',
          cosRecipientServeLocation: 'string',
          cosRecipientServeLocationOwnerType: 'FRIEND',
          cosRecipientServeLocationType: 'PRINCIPAL_OFFICE_CORPORATION',
          cosSender: 'string',
          cosSenderFirm: 'string',
          cosEvidenceDocument: [
            CaseDataHelper.setIdToData(defendant2SupportEvidenceCos)
          ],
          cosUISenderStatementOfTruthLabel: [
            'CERTIFIED'
          ],
        }
      }
    };
  }

  return {};
}



const notifyClaimDetailsDataBuilderComponents = {
  selectDefendantSolicitor,
  upload,
  certificateOfService1,
  certificateOfService2,
};

export default notifyClaimDetailsDataBuilderComponents;
