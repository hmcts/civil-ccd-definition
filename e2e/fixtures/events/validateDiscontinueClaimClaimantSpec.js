module.exports = {
  validateDiscontinueClaimClaimant: (permission) => {
    const data ={};
    switch (permission) {
      case 'YES': {
        data.userInput = {
          ValidateDiscontinuance: {
            confirmOrderGivesPermission: 'YES',
            permissionGrantedDateCopy: '2024-05-02',
            permissionGrantedJudgeCopy: 'Judge name'
          }
        };
      }
      break;

      case 'NO': {
        data.userInput = {
          ValidateDiscontinuance: {
            confirmOrderGivesPermission: 'NO',
            permissionGrantedDateCopy: '2024-05-02',
            permissionGrantedJudgeCopy: 'Judge name'
          }
        };
      }
        break;
    }
    return data;
  }
};
