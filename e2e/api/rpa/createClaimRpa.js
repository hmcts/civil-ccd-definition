module.exports = {
  createClaimRpa: ({
    header: {
      caseNumber: '000DC023',
      owningCourtCode: '390',
      owningCourtName: 'CCMCC',
      caseType: 'PERSONAL INJURY',
      preferredCourtCode: '344',
      caseAllocatedTo: 'MULTI TRACK'
    },
    litigiousParties: [
      {
        type: 'Claimant',
        name: 'Test Inc',
        addresses: {
          contactAddress: {
            addressLine1: 'Flat 2 - applicant',
            addressLine2: 'Caversham House 15-17',
            addressLine3: 'Church Road',
            addressLine4: 'Reading',
            addressLine5: 'Kent, United Kingdom',
            postCode: 'RG4 7AA'
          }
        },
        welshTranslation: false,
        solicitorID: '001',
        ID: '001'
      },
      {
        type: 'Defendant',
        name: 'Sir John Doe',
        addresses: {
          contactAddress: {
            addressLine1: 'Flat 2 - respondent',
            addressLine2: 'Caversham House 15-17',
            addressLine3: 'Church Road',
            addressLine4: 'Reading',
            addressLine5: 'Kent, United Kingdom',
            postCode: 'RG4 7AA'
          }
        },
        welshTranslation: false,
        solicitorID: '002',
        ID: '002'
      }
    ],
    solicitors: [
      {
        contactEmailAddress: 'civilunspecified@gmail.com',
        reference: 'Applicant reference',
        ID: '001',
        isPayee: true
      }
    ],
    claimDetails: {
      caseRequestReceivedDate: '2022-07-14',
      caseIssuedDate: '2022-07-14',
      amountClaimed: 30000
    },
    events: {
      miscellaneous: [
        {
          eventSequence: 1,
          eventCode: '999',
          dateReceived: '2022-07-14',
          eventDetails: {
            miscText: 'Claim issued in CCD.'
          },
          eventDetailsText: 'Claim issued in CCD.'
        }
      ],
      acknowledgementOfServiceReceived: [
        {}
      ],
      consentExtensionFilingDefence: [
        {}
      ],
      defenceFiled: [
        {}
      ],
      defenceAndCounterClaim: [
        {}
      ],
      receiptOfPartAdmission: [
        {}
      ],
      receiptOfAdmission: [
        {}
      ],
      replyToDefence: [
        {}
      ],
      directionsQuestionnaireFiled: [
        {}
      ]
    }
  })
}
