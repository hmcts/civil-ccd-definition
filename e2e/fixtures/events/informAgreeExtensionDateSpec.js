const {date} = require('../../api/dataHelper');

module.exports = {
  valid: {
    ExtensionDate: {
      respondentSolicitor1AgreedDeadlineExtension: date(40)
    }
  }
};
