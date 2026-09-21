import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import User from '../../../../models/users/user';
import CivilServiceRequests from '../../../../requests/civil-service-requests';

type QueryType = {
  collectionField: string;
  partyName: string;
};

type QueryMessage = {
  id?: string;
  subject?: string;
  isHearingRelated?: string;
  hearingDate?: string;
};

const publicQuery: QueryType = {
  collectionField: 'queries',
  partyName: 'All queries',
};

const queryResponsePayload = async (
  caseData: CCDCaseData | undefined,
  user: User,
  civilServiceRequests: CivilServiceRequests,
  initialMessage: QueryMessage,
  queryType = publicQuery,
) => {
  const queryCollection = (caseData as Record<string, any> | undefined)?.[queryType.collectionField] ?? {
    partyName: queryType.partyName,
    caseMessages: [],
  };
  const newMessage = CaseDataHelper.setIdToData({
    id: CaseDataHelper.getUuid(),
    body: 'Caseworker response to query.',
    name: 'Caseworker',
    subject: initialMessage.subject,
    parentId: initialMessage.id,
    createdBy: user.userId,
    createdOn: DateHelper.getToday().toISOString(),
    attachments: [
      CaseDataHelper.setIdToData({
        ...(await civilServiceRequests.uploadTestDocument(user)),
        filename: 'response-attachment.pdf',
      }),
    ],
    hearingDate: initialMessage.hearingDate,
    isHearingRelated: initialMessage.isHearingRelated,
  });

  return {
    [queryType.collectionField]: {
      ...queryCollection,
      caseMessages: [
        ...(queryCollection.caseMessages ?? []),
        newMessage,
      ],
    },
  };
};

export default {
  queryResponsePayload,
};
