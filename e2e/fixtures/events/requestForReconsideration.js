const {listElement} = require('../../api/dataHelper');
const config = require('../../config.js');

module.exports = {
  createRequestForReconsideration : () => {
      return {
        valid: {
          reasonForReconsideration: {
            reasonForReconsideration: {
              reasonForReconsiderationTxt: 'The legal adviser overlooked some factors'
            }
          }
        }
      };
    },

  createRequestForReconsiderationSpec : () => {
    return {
      userInput: {
        reasonForReconsideration: {
          reasonForReconsideration: {
            reasonForReconsiderationTxt: 'The legal adviser overlooked some factors'
          }
        }
      }
    };
  }
};
