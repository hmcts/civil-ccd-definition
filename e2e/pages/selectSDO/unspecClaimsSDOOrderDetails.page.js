const {I} = inject();
const {checkFastTrackUpliftsEnabled} = require('./../../api/testingSupport');

const date = require('../../fragments/date');

module.exports = {
  fields: {
    smallClaimsHearingTime: {
      id: '#smallClaimsHearing_time'
    },
    smallClaimsWitnessStatement : {
      checkbox: '#smallClaimsWitnessStatement_smallClaimsNumberOfWitnessesToggle-SHOW',
       claimantWitnessCount: '#smallClaimsWitnessStatement_input2',
       defendantWitnessCount: '#smallClaimsWitnessStatement_input3'
    },
    smallClaimsFlightDelay : {
      checkbox: '#smallClaimsFlightDelay_smallClaimsFlightDelayToggle-SHOW',
      input1: '#smallClaimsFlightDelay_input1',
      input2: '#smallClaimsFlightDelay_input2'
    },
    smallClaimsMethodInPerson: {
      id: '#smallClaimsMethod-smallClaimsMethodInPerson'
    },
    fastTrackAllocation: {
      assignComplexityBand: {
        id: '#fastTrackAllocation_assignComplexityBand',
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      band: {
        id: '#fastTrackAllocation_band',
        options: {
          band1: 'BAND_1',
          band2: 'BAND_2',
          band3: 'BAND_3',
          band4: 'BAND_4'
        }
      },
      reasons: '#fastTrackAllocation_reasons',
    },
    fastTrackWitnessOfFact : {
       claimantWitnessCount: '#fastTrackWitnessOfFact_input2',
       defendantWitnessCount: '#fastTrackWitnessOfFact_input3',
       numberOfPage: '#fastTrackWitnessOfFact_input6'
    },
    fastTrackHearingTime: {
      hearingDuration: '#fastTrackHearingTime_hearingDuration-ONE_HOUR'
    },
    selectOrderAndHearingDetailsForSDOTask:{
      text: 'Order and hearing details',
      disposalHearingTimeId: '#disposalHearingFinalDisposalHearing_time',
      disposalHearingTimeOptions: {
        thirtyMinutes: '#disposalHearingFinalDisposalHearing_time-THIRTY_MINUTES',
        fifteenMinutes: '#disposalHearingFinalDisposalHearing_time-FIFTEEN_MINUTES'
      },
      hearingMethodId: '#disposalHearingMethodInPerson',
      hearingMethodOptions: {
        inPerson: '#disposalHearingMethod-disposalHearingMethodInPerson',
        video: '#disposalHearingMethod-disposalHearingMethodVideoConferenceHearing',
        telephone: '#disposalHearingMethod-disposalHearingMethodTelephoneHearing'
      },
      hearingBundleId: '#disposalHearingBundle_type',
      hearingBundleTypeDocs: '#disposalHearingBundle_type-DOCUMENTS',
      hearingBundleTypeSummary: '#disposalHearingBundle_type-SUMMARY',
      hearingBundleTypeElectronic: '#disposalHearingBundle_type-ELECTRONIC'
    },
    orderDetailsHearingTime: {
      hearingTimeEstimate: {
        thirtyMinutes: '#smallClaimsHearing_time-THIRTY_MINUTES'
      },
      hearingDateFromId:  'dateFrom'
    }
  },

  async selectOrderDetails(allocateSmallClaims, trackType, orderType) {
    await I.runAccessibilityTest();
    if (allocateSmallClaims == 'yes' || trackType == 'smallClaims') {
      await I.waitForElement(this.fields.smallClaimsHearingTime.id);
      await I.click(this.fields.orderDetailsHearingTime.hearingTimeEstimate.thirtyMinutes);
      await I.checkOption(this.fields.smallClaimsWitnessStatement.checkbox);
      await I.fillField(this.fields.smallClaimsWitnessStatement.claimantWitnessCount, '2');
      await I.fillField(this.fields.smallClaimsWitnessStatement.defendantWitnessCount, '3');
      await I.checkOption(this.fields.smallClaimsFlightDelay.checkbox);
      await I.fillField(this.fields.smallClaimsFlightDelay.input1, '1');
      await I.fillField(this.fields.smallClaimsFlightDelay.defendantWitnessCount, '2');
      await date.enterDate(this.fields.orderDetailsHearingTime.hearingDateFromId, 40);
      await I.click(this.fields.orderDetailsHearingTime.hearingTimeEstimate.thirtyMinutes);
    } else if (orderType == 'disposal') {
      await I.click(this.fields.selectOrderAndHearingDetailsForSDOTask.disposalHearingTimeOptions.thirtyMinutes);
      await this.selectHearingMethodOption('In Person');
      await I.click(this.fields.selectOrderAndHearingDetailsForSDOTask.hearingMethodOptions.inPerson);
      await I.click(this.fields.selectOrderAndHearingDetailsForSDOTask.hearingBundleTypeDocs);
    } else if (orderType == 'decideDamages' || trackType == 'fastTrack') {
      let fastTrackUpliftsEnabled = await checkFastTrackUpliftsEnabled();
      if (fastTrackUpliftsEnabled) {
        await within(this.fields.fastTrackAllocation.assignComplexityBand.id, () => {
          I.click(this.fields.fastTrackAllocation.assignComplexityBand.options.yes);
        });
        await within(this.fields.fastTrackAllocation.band.id, () => {
          I.click(`${this.fields.fastTrackAllocation.band.id}-${this.fields.fastTrackAllocation.band.options.band1}`);
        });

        I.fillField(this.fields.fastTrackAllocation.reasons, 'A very good reason');
      }
      await I.fillField(this.fields.fastTrackWitnessOfFact.claimantWitnessCount, '2');
      await I.fillField(this.fields.fastTrackWitnessOfFact.defendantWitnessCount, '3');
      await I.fillField(this.fields.fastTrackWitnessOfFact.numberOfPage, '5');

      await this.selectHearingMethodOption('In Person');
      await I.click(this.fields.fastTrackHearingTime.hearingDuration);
    }
    await I.clickContinue();
  },

  async selectHearingMethodOption(text) {
    let xPath = `//label[contains(text(), '${text}')]`;
    let inputId = await I.grabAttributeFrom(xPath, 'for');
    await I.click(`#${inputId}`);
  },

  async verifyOrderPreview(allocateSmallClaims, trackType, orderType) {
    let linkXPath;
    if (allocateSmallClaims == 'yes' || trackType == 'smallClaims') {
      linkXPath = '//a[contains(text(), \'small_claims_sdo_\')]';
    } else if (orderType == 'disposal') {
      linkXPath = '//a[contains(text(), \'disposal_hearing_sdo_\')]';
    } else if (orderType == 'decideDamages' || trackType == 'fastTrack') {
      linkXPath = '//a[contains(text(), \'fast_track_sdo_\')]';
    }
    await I.waitForElement(linkXPath, 60);
    await I.clickContinue();
  }
};
