import StudRequestBody from '../../models/wire-mock/stud-request-body';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

const hearingStubRequestBody = (
  hearing: Record<string, any>,
  hearingId: string,
): StudRequestBody => ({
  request: {
    method: 'GET',
    url: `/hearing/${hearingId}`,
  },
  response: {
    status: 200,
    body: JSON.stringify(hearing),
    headers: jsonHeaders,
  },
});

const unnotifiedHearingStubRequestBody = (
  hearingIds: string[],
): StudRequestBody => ({
  request: {
    method: 'GET',
    urlPathPattern: '/unNotifiedHearings/.*',
  },
  response: {
    status: 200,
    headers: jsonHeaders,
    body: JSON.stringify({
      totalFound: hearingIds.length,
      hearingIds,
    }),
  },
});

const getPartiesNotifiedStubRequestBody: (responses?: any[]) => StudRequestBody = (responses = []) => ({
  request: {
    method: 'GET',
    urlPathPattern: '/partiesNotified/.*',
  },
  response: {
    status: 200,
    headers: jsonHeaders,
    body: JSON.stringify({
      hearingID: '',
      responses,
    }),
  },
});

const putPartiesNotifiedStubRequestBody: StudRequestBody = {
  request: {
    method: 'PUT',
    urlPathPattern: '/partiesNotified/.*',
  },
  response: {
    status: 200,
    headers: jsonHeaders,
  },
};

export default {
  hearingStubRequestBody,
  unnotifiedHearingStubRequestBody,
  getPartiesNotifiedStubRequestBody,
  putPartiesNotifiedStubRequestBody,
};
