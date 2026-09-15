module.exports = {
  enterIntoBS: (mpScenario, breathingSpaceDetails) => {
    const data ={};

    const [type, start, reference] = breathingSpaceDetails;

    switch (mpScenario) {
      case 'ONE_V_TWO': {
        const breathingSpaceData = {
          enterBreathing: {
            type,
            start,
            reference
          }
        };
        data.userInput = {
          EnterBreathingSpaceInfo: breathingSpaceData
        };

        data.valid = {
          EnterBreathingSpaceInfo: breathingSpaceData
        };
      }
        break;
      case 'TWO_V_ONE': {
        const breathingSpaceData = {
          enterBreathing: {
            type,
            start,
            reference
          }
        };
        data.userInput = {
          EnterBreathingSpaceInfo: breathingSpaceData
        };

        data.valid = {
          EnterBreathingSpaceInfo: breathingSpaceData
        };
      }
        break;
      case 'ONE_V_ONE': {
        const breathingSpaceData = {
          enterBreathing: {
            type,
            start,
            reference
          }
        };
        data.userInput = {
          EnterBreathingSpaceInfo: breathingSpaceData
        };

        data.valid = {
          EnterBreathingSpaceInfo: breathingSpaceData
        };
      }
        break;
    }
    return data;
  }
};
