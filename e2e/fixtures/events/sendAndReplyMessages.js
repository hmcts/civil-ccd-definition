module.exports = {
  sendMessage: () => {
    return {
      userInput: {
        messages: [
          {
            id: '6dd1ef70-004d-425a-84c9-36bc7f0153fa',
            value: {
              history: [
                {
                  id: '96704f31-5bf7-4864-9219-5d37d2f74626',
                  value: {
                    subject: 'Test',
                    isUrgent: 'No',
                    sentTime: '2025-01-28T16:25:17',
                    senderName: 'Amy Powell, Judge',
                    subjectType: 'APPLICATION',
                    messageContent: 'Test reply',
                    senderRoleType: 'JUDICIAL',
                    recipientRoleType: 'ADMIN'
                  }
                },
                {
                  id: '173f59bf-002e-40b7-9120-31c18e766818',
                  value: {
                    subject: 'Test',
                    isUrgent: 'No',
                    sentTime: '2025-01-28T16:21:53',
                    senderName: 'ctsc adminuser, CTSC',
                    subjectType: 'APPLICATION',
                    messageContent: 'Test',
                    senderRoleType: 'ADMIN',
                    recipientRoleType: 'JUDICIAL_DISTRICT'
                  }
                }
              ],
              subject: 'Test',
              isUrgent: 'No',
              sentTime: '2025-01-28T16:21:53',
              senderName: 'ctsc adminuser, CTSC',
              subjectType: 'APPLICATION',
              updatedTime: '2025-01-28T16:26:58',
              messageContent: 'Test reply reply',
              senderRoleType: 'ADMIN',
              recipientRoleType: 'JUDICIAL'
            }
          }
        ]
      }
    };
  },
  replyMessage: () => {
    return {
      userInput: {
        messages: [
          {
            id: '6dd1ef70-004d-425a-84c9-36bc7f0153fa',
            value: {
              history: [
                {
                  id: '96704f31-5bf7-4864-9219-5d37d2f74626',
                  value: {
                    subject: 'Test',
                    isUrgent: 'No',
                    sentTime: '2025-01-28T16:25:17',
                    senderName: 'Amy Powell, Judge',
                    subjectType: 'APPLICATION',
                    messageContent: 'Test reply',
                    senderRoleType: 'JUDICIAL',
                    recipientRoleType: 'ADMIN'
                  }
                },
                {
                  id: '173f59bf-002e-40b7-9120-31c18e766818',
                  value: {
                    subject: 'Test',
                    isUrgent: 'No',
                    sentTime: '2025-01-28T16:21:53',
                    senderName: 'ctsc adminuser, CTSC',
                    subjectType: 'APPLICATION',
                    messageContent: 'Test',
                    senderRoleType: 'ADMIN',
                    recipientRoleType: 'JUDICIAL_DISTRICT'
                  }
                }
              ],
              subject: 'Test',
              isUrgent: 'No',
              sentTime: '2025-01-28T16:21:53',
              senderName: 'ctsc adminuser, CTSC',
              subjectType: 'APPLICATION',
              updatedTime: '2025-01-28T16:26:58',
              messageContent: 'Test reply reply',
              senderRoleType: 'ADMIN',
              recipientRoleType: 'JUDICIAL'
            }
          }
        ]
      }
    };
  }
};
