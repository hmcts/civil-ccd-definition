const {I} = inject();

module.exports = {
  fields: {
    smallClaimsHearingTime: {
      id: '#smallClaimsHearing_time'
    },
    smallClaimsWitnessStatement : {
       claimantWitnessCount: '#smallClaimsWitnessStatement_input2',
       defendantWitnessCount: '#smallClaimsWitnessStatement_input3'
    },
    smallClaimsMethodInPerson: {
      id: '#smallClaimsMethodInPerson'
    },
    fastTrackWitnessOfFact : {
       claimantWitnessCount: '#fastTrackWitnessOfFact_input2',
       defendantWitnessCount: '#fastTrackWitnessOfFact_input3',
       numberOfPage: '#fastTrackWitnessOfFact_input6'
    },
    fastTrackTrial_type: {
      documentsId: '#fastTrackTrial_type-DOCUMENTS'
    },
    fastTrackMethodInPerson: {
      id: '#fastTrackMethodInPerson'
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
      hearingLocation: '#disposalHearingMethodInPerson',
      hearingBundleId: '#disposalHearingBundle_type',
      hearingBundleTypeDocs: '#disposalHearingBundle_type-DOCUMENTS',
      hearingBundleTypeSummary: '#disposalHearingBundle_type-SUMMARY',
      hearingBundleTypeElectronic: '#disposalHearingBundle_type-ELECTRONIC'
    }
  },

  async selectOrderDetails(allocateSmallClaims, trackType, orderType) {
    await I.runAccessibilityTest();
    if (allocateSmallClaims == 'smallClaims' || trackType == 'smallClaims') {
      await I.fillField(this.fields.smallClaimsHearingTime.id, '30 minutes');
      await I.fillField(this.fields.smallClaimsWitnessStatement.claimantWitnessCount, '2');
      await I.fillField(this.fields.smallClaimsWitnessStatement.defendantWitnessCount, '3');
      await I.fillField(this.fields.smallClaimsMethodInPerson.id, 'Liverpool Civil and Family Court - 35, VERNON STREET, CITY SQUARE - L2 2BX');
    } else if (orderType == 'disposal') {
      await I.click(this.fields.selectOrderAndHearingDetailsForSDOTask.disposalHearingTimeOptions.thirtyMinutes);
      await I.click(this.fields.selectOrderAndHearingDetailsForSDOTask.hearingMethodOptions.inPerson);
      await I.fillField(this.fields.selectOrderAndHearingDetailsForSDOTask.hearingLocation, 'Liverpool Civil and Family Court - 35, VERNON STREET, CITY SQUARE - L2 2BX');
      await I.click(this.fields.selectOrderAndHearingDetailsForSDOTask.hearingBundleTypeDocs);
    } else if (orderType == 'decideDamages' || trackType == 'fastTrack') {
      await I.fillField(this.fields.fastTrackWitnessOfFact.claimantWitnessCount, '2');
      await I.fillField(this.fields.fastTrackWitnessOfFact.defendantWitnessCount, '3');
      await I.fillField(this.fields.fastTrackWitnessOfFact.numberOfPage, '5');
      await I.fillField(this.fields.fastTrackMethodInPerson.id, 'Liverpool Civil and Family Court - 35, VERNON STREET, CITY SQUARE - L2 2BX');
      await I.click(this.fields.fastTrackTrial_type.documentsId);
    }
    await I.clickContinue();
  },

  async verifyOrderPreview(allocateSmallClaims, trackType, orderType) {
    let linkXPath;
    if (allocateSmallClaims == 'smallClaims' || trackType == 'smallClaims') {
      linkXPath = '//a[contains(text(), \'small_claims_sdo_\')]';
    } else if (orderType == 'disposal') {
      linkXPath = '//a[contains(text(), \'disposal_hearing_sdo_\')]';
    } else if (orderType == 'decideDamages' || trackType == 'fastTrack') {
      linkXPath = '//a[contains(text(), \'fast_track_sdo_\')]';
    }
    await I.waitForClickable(linkXPath);
    await I.clickContinue();
  }
};
