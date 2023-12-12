const { buildAddress } = require('../../api/dataHelper');

module.exports = {
  ONE_V_ONE: {
    valid: {
      DefendantLitigationFriend: {
        "respondent1LitigationFriend": {
          primaryAddress: buildAddress('originalADDRESSSS'),
          "flags": {
            "partyName": "def lit 1 friend hnl",
            "roleOnCase": "Defendant 1 Litigation Friend"
          },
          "partyID": "2eacb1af-2ba4-42",
          "lastName": "lit 1 friend hnl",
          "firstName": "def",
          "phoneNumber": "02099999999",
          "emailAddress": "def1t@hnl.com",
          "certificateOfSuitability": [
            {
              "id": "5d16f2c4-64ab-4d22-96b0-3917007cf23f",
              "value": {
                "document": {
                  "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/e033eebb-7fa1-4e14-b804-8d7bc3f864c2",
                  "document_filename": "TEST DOCUMENT 2.pdf",
                  "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/e033eebb-7fa1-4e14-b804-8d7bc3f864c2/binary"
                }
              }
            }
          ]
        },
      }
    }
  },
  ONE_V_TWO_TWO_LEGAL_REP: {
    valid: {
      DefendantLitigationFriend: {
        'hasSameAddressAsLitigant': 'No',
        "respondent1LitigationFriend": {
          "flags": {
            "partyName": "def lit 1 friend hnl",
            "roleOnCase": "Defendant 1 Litigation Friend"
          },
          "partyID": "2eacb1af-2ba4-42",
          "lastName": "lit 1 friend hnl",
          "firstName": "def",
          "phoneNumber": "02099999999",
          "emailAddress": "def2t@hnl.com",
          primaryAddress: buildAddress('applicant'),
          "certificateOfSuitability": [
            {
              "id": "5d16f2c4-64ab-4d22-96b0-3917007cf23f",
              "value": {
                "document": {
                  "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/e033eebb-7fa1-4e14-b804-8d7bc3f864c2",
                  "document_filename": "TEST DOCUMENT 2.pdf",
                  "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/e033eebb-7fa1-4e14-b804-8d7bc3f864c2/binary"
                }
              }
            }
          ]
        },
        "respondent2LitigationFriend": {
          'hasSameAddressAsLitigant': 'No',
          "flags": {
            "partyName": "def lit 2 friend hnl",
            "roleOnCase": "Defendant 2 Litigation Friend"
          },
          "partyID": "2eacb1af-2ba4-45",
          "lastName": "lit 2 friend hnl",
          "firstName": "def",
          "phoneNumber": "02099999999",
          "emailAddress": "deft1@hnl.com",
          "certificateOfSuitability": [
            {
              "id": "5d16f2c4-64ab-4d22-96b0-3917007cf22f",
              "value": {
                "document": {
                  "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/e033eebb-7fa1-4e14-b804-8d7bc3f864c2",
                  "document_filename": "TEST DOCUMENT 2.pdf",
                  "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/e033eebb-7fa1-4e14-b804-8d7bc3f864c2/binary"
                }
              }
            }
          ]
        }
      }
    }
  }
};
