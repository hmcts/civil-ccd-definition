const {element} = require('../api/dataHelper');
const uuid = require("uuid");
module.exports = {
  PARTY_FLAGS: {
    vulnerableUser: element({
      name: 'Vulnerable user',
      flagComment: 'test comment',
      dateTimeCreated: '2023-02-06T13:11:52.466Z',
      path: [
        {
          id: uuid.v1(),
          value: 'Party'
        }
      ],
      hearingRelevant: 'No',
      flagCode: 'PF0002',
      status: 'Active'
    }),
    confidentialPartyAddress: element({
      name: 'Confidential party/address',
      flagComment: 'test comment',
      dateTimeCreated: '2023-02-06T13:11:52.466Z',
      path: [
        {
          id: uuid.v1(),
          value: 'Party'
        }
      ],
      hearingRelevant: 'No',
      flagCode: 'PF0002',
      status: 'Active'
    }),
    unacceptableBehaviour: element({
      name: 'Unacceptable/disruptive customer behaviour',
      flagComment: 'test comment',
      dateTimeCreated: '2023-02-06T13:11:52.466Z',
      path: [
        {
          id: uuid.v1(),
          value: 'Party'
        }
      ],
      hearingRelevant: 'No',
      flagCode: 'PF0002',
      status: 'Active'
    }),
    vexatiousLitigant: element({
      name: 'Vexatious litigant',
      flagComment: 'test comment',
      dateTimeCreated: '2023-02-06T13:11:52.466Z',
      path: [
        {
          id: uuid.v1(),
          value: 'Party'
        }
      ],
      hearingRelevant: 'No',
      flagCode: 'PF0002',
      status: 'Active'
    }),
    civilRestraintOrder: element({
      name: 'Civil restraint order',
      flagComment: 'test comment',
      dateTimeCreated: '2023-02-06T13:11:52.466Z',
      path: [
        {
          id: uuid.v1(),
          value: 'Party'
        }
      ],
      hearingRelevant: 'No',
      flagCode: 'PF0002',
      status: 'Active'
    }),
    banningOrder: element({
      name: 'Banning order',
      flagComment: 'test comment',
      dateTimeCreated: '2023-02-06T13:11:52.466Z',
      path: [
        {
          id: uuid.v1(),
          value: 'Party'
        }
      ],
      hearingRelevant: 'No',
      flagCode: 'PF0002',
      status: 'Active'
    })
  },
  CASE_FLAGS: {
    complexCase: element({
      name: 'Complex Case',
      flagComment: 'test comment',
      dateTimeCreated: '2023-02-06T13:11:52.466Z',
      path: [
        {
          id: uuid.v1(),
          value: 'Case'
        }
      ],
      hearingRelevant: 'No',
      flagCode: 'PF0002',
      status: 'Active'
    }),
  }
};
