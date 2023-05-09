const {date,dateNoWeekends} = require('../../../api/dataHelper');

module.exports = {
  agreedData: async () => {
    return {
      valid: {
        ExtensionDate: {
          respondentSolicitor2AgreedDeadlineExtension: await dateNoWeekends(40)
        }
      },
      invalid: {
        ExtensionDate: {
          past: {
            respondentSolicitor2AgreedDeadlineExtension: date(-1)
          },
          beforeCurrentDeadline: {
            respondentSolicitor2AgreedDeadlineExtension: date(10)
          }
        }
      }
    }
  }
};
