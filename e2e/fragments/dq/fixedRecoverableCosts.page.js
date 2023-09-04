const {I} = inject();
const {checkFastTrackUpliftsEnabled} = require('./../../api/testingSupport');

module.exports = {

  fields: function (party) {
    return {
      isSubjectToFixedRecoverableCostRegime: {
        id: `#${party}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      band: {
        id: `#${party}DQFixedRecoverableCosts_band`,
        options: {
          band1: 'BAND_1',
          band2: 'BAND_2',
          band3: 'BAND_3',
          band4: 'BAND_4'
        }
      },
      complexityBandingAgreed: {
        id: `#${party}DQFixedRecoverableCosts_complexityBandingAgreed`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      reasons: `#${party}DQFixedRecoverableCosts_reasons`,
    };
  },

  async fixedRecoverableCosts(party) {
    let fastTrackUpliftsEnabled = await checkFastTrackUpliftsEnabled();
    console.log('fastTrackUpliftsEnabled: ' + fastTrackUpliftsEnabled);
    // if (fastTrackUpliftsEnabled) {
      await within(this.fields(party).isSubjectToFixedRecoverableCostRegime.id, () => {
        I.runAccessibilityTest();
        I.click(`${this.fields(party).isSubjectToFixedRecoverableCostRegime.options.yes}`);
      });

      await within(this.fields(party).band.id, () => {
        I.click(`${this.fields(party).band.id}-${this.fields(party).band.options.band1}`);
      });

      await within(this.fields(party).complexityBandingAgreed.id, () => {
        I.click(this.fields(party).complexityBandingAgreed.options.yes);
      });

      I.fillField(this.fields(party).reasons, 'Some good reasons');

      await I.clickContinue();
    }
  // }
};
