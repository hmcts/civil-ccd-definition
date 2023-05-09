const {date,dateNoWeekends} = require('../../api/dataHelper');

module.exports = {

  agreedData: async () => {
    return {
      valid: {
        ExtensionDate: {
          respondentSolicitor1AgreedDeadlineExtension: await dateNoWeekends(40)
        }
      },
      invalid: {
        ExtensionDate: {
          past: {
            respondentSolicitor1AgreedDeadlineExtension: date(-1)
          },
          beforeCurrentDeadline: {
            respondentSolicitor1AgreedDeadlineExtension: date(10)
          }
        }
      }
    }
  }
};
