const {date} = require('../../api/dataHelper');
const Joi = require('joi');

module.exports = {
  valid: {
    ExtensionDate: {
      respondentSolicitor1AgreedDeadlineExtension: date(40)
    },
    BusinessProcess:{
      businessProcess: {
        status: 'FINISHED',
        camundaEvent: 'ACKNOWLEDGE_CLAIM',
        readyOn: Joi.string()
      }
    },
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
};
