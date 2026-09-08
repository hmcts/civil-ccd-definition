import FollowUp from '../../../../constants/ccd-events/ccd-events/query-management-raise/follow-up';
import HearingRelated from '../../../../constants/ccd-events/ccd-events/query-management-raise/hearing-related';
import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import { Party } from '../../../../models/users/partys';
import User from '../../../../models/users/user';
import CivilServiceRequests from '../../../../requests/civil-service-requests';

type QueryMessage = {
  id?: string;
  body?: string;
  name?: string;
  subject?: string;
  createdBy?: string;
  createdOn?: string;
  attachments?: unknown[];
  isHearingRelated?: string;
  hearingDate?: string;
  parentId?: string;
};

const partyName = 'All queries';

const hearingDate = () =>
  DateHelper.formatDateToString(DateHelper.addToToday({ days: 10 }), {
    outputFormat: 'YYYY-MM-DD',
  });

const partyNameForParty = (party: Party) => {
  if (party === partys.CLAIMANT_1 || party === partys.CLAIMANT_SOLICITOR_1) {
    return 'Claimant';
  }

  if (
    party === partys.DEFENDANT_1 ||
    party === partys.DEFENDANT_2 ||
    party === partys.DEFENDANT_SOLICITOR_1 ||
    party === partys.DEFENDANT_SOLICITOR_2
  ) {
    return 'Defendant';
  }

  return partyName;
};

const appendQueryMessagePayload = (
  caseData: CCDCaseData | undefined,
  newMessage: ReturnType<typeof CaseDataHelper.setIdToData>,
) => {
  const queryCollection = caseData?.queries ?? {
    partyName,
    caseMessages: [],
  };

  return {
    queries: {
      ...queryCollection,
      caseMessages: [
        ...(queryCollection.caseMessages ?? []),
        newMessage,
      ],
    },
  };
};

const initialQueryPayload = async (
  caseData: CCDCaseData | undefined,
  user: User,
  party: Party,
  civilServiceRequests: CivilServiceRequests,
  hearingRelated: HearingRelated,
  followUp: FollowUp,
) => {
  if (followUp === FollowUp.NO) {
    const name = partyNameForParty(party);

    const newMessage = CaseDataHelper.setIdToData({
      id: CaseDataHelper.getUuid(),
      body: `This query was raised by ${name}.`,
      name,
      subject: `${name} Query`,
      createdBy: user.userId,
      createdOn: DateHelper.getToday().toISOString(),
      attachments: [
        CaseDataHelper.setIdToData({
          ...(await civilServiceRequests.uploadTestDocument(user)),
          filename: 'query-attachment.pdf',
        }),
      ],
      isHearingRelated: hearingRelated,
      ...(hearingRelated === HearingRelated.YES
        ? { hearingDate: hearingDate() }
        : {}),
    });

    return appendQueryMessagePayload(caseData, newMessage);
  }

  return {};
};

const followUpQueryPayload = async (
  caseData: CCDCaseData | undefined,
  user: User,
  civilServiceRequests: CivilServiceRequests,
  initialMessage: QueryMessage,
  followUp: FollowUp,
) => {
  if (followUp === FollowUp.YES) {
    const newMessage = CaseDataHelper.setIdToData({
      id: CaseDataHelper.getUuid(),
      body: `${initialMessage.name}'s follow up to caseworker response.`,
      name: initialMessage.name,
      subject: initialMessage.subject,
      ...(followUp ? { parentId: initialMessage.id } : {}),
      createdBy: user.userId,
      createdOn: DateHelper.getToday().toISOString(),
      attachments: [
        CaseDataHelper.setIdToData({
          ...(await civilServiceRequests.uploadTestDocument(user)),
          filename: 'follow-up-attachment.pdf',
        }),
      ],
      hearingDate: initialMessage.hearingDate,
      isHearingRelated: initialMessage.isHearingRelated,
    });

    return appendQueryMessagePayload(caseData, newMessage);
  }

  return {};
};

export default {
  initialQueryPayload,
  followUpQueryPayload,
};
