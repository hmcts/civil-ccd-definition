
module.exports = {
  sendMessage: () => {
    return {
      userInput: {
        manageStayOptions: {
          manageStayOption: 'REQUEST_UPDATE'
        },
        manageStayRequestUpdate: {
        }
      }
    };
  },
  replyMessage: () => {
    return {
      userInput: {
        manageStayOptions: {
          manageStayOption: 'LIFT_STAY'
        }
      }
    };
  }
};
