module.exports = {
  liftBS: (mpScenario, breathingSpaceDetails) => {
    const data ={};

    const [expectedEnd, reasonToLift] = breathingSpaceDetails;

    switch (mpScenario) {
      case 'ONE_V_TWO': {
        const breathingSpaceData = {
          liftBreathing: {
            expectedEnd,
            reasonToLift
          }
        };
        data.userInput = {
          BreathingSpaceLiftInfo: breathingSpaceData
        };

        data.valid = {
          BreathingSpaceLiftInfo: breathingSpaceData
        };
      }
        break;
      case 'TWO_V_ONE': {
        const breathingSpaceData = {
          liftBreathing: {
            expectedEnd,
            reasonToLift
          }
        };
        data.userInput = {
          BreathingSpaceLiftInfo: breathingSpaceData
        };

        data.valid = {
          BreathingSpaceLiftInfo: breathingSpaceData
        };
      }
        break;
      case 'ONE_V_ONE': {
        const breathingSpaceData = {
          liftBreathing: {
            expectedEnd,
            reasonToLift
          }
        };
        data.userInput = {
          BreathingSpaceLiftInfo: breathingSpaceData
        };

        data.valid = {
          BreathingSpaceLiftInfo: breathingSpaceData
        };
      }
        break;
    }
    return data;
  }
};
