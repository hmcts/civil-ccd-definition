
module.exports = {
  manageStayRequestUpdate: () => {
    return {
      userInput: {
        manageStayOptions: {
          manageStayOption: 'REQUEST_UPDATE'
        },
        manageStayRequestUpdate: {
          manageStayRequestUpdateText: 'Need update on stay case'
        }
      }
    };
  },
  manageStayLiftStay: () => {
    return {
      userInput: {
        manageStayOptions: {
          manageStayOption: 'LIFT_STAY'
        }
      }
    };
  }
};
