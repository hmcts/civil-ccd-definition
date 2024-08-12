module.exports = {
  listedHearing: (hearingId, hearingType, caseId) => ({
    'requestDetails': {
      'status': 'LISTED',
      'timestamp': '2025-01-01T15:12:01.819258',
      'versionNumber': 1,
      'hearingRequestID': `${hearingId}`
    },
    'hearingDetails': {
      'hearingType': `AAA7-${hearingType}`,
      'hearingWindow': {},
      'duration': 60,
      'hearingPriorityType': 'Standard',
      'numberOfPhysicalAttendees': 5,
      'hearingInWelshFlag': false,
      'hearingLocations': [
        {
          'locationType': 'court',
          'locationId': '424213'
        }
      ],
      'privateHearingRequiredFlag': false,
      'panelRequirements': {
        'roleType': [
          '45'
        ],
        'authorisationTypes': [],
        'authorisationSubType': [],
        'panelPreferences': [],
        'panelSpecialisms': []
      },
      'hearingIsLinkedFlag': false,
      'hearingChannels': [
        'INTER'
      ],
      'autolistFlag': false
    },
    'caseDetails': {
      'hmctsServiceCode': 'AAA7',
      'caseRef': `${caseId}`,
      'caseDeepLink': `https://manage-case.demo.platform.hmcts.net/cases/case-details/${caseId}`,
      'hmctsInternalCaseName': '\'New name\' represented by \'Gareth Lancaster\' (litigation friend) v \'John Doe\'',
      'publicCaseName': '\'New name\' represented by \'Gareth Lancaster\' (litigation friend) v \'John Doe\'',
      'caseAdditionalSecurityFlag': false,
      'caseInterpreterRequiredFlag': false,
      'caseCategories': [
        {
          'categoryType': 'caseType',
          'categoryValue': 'AAA7-FAST_CLAIM'
        },
        {
          'categoryType': 'caseSubType',
          'categoryValue': 'AAA7-FAST_CLAIM',
          'categoryParent': 'AAA7-FAST_CLAIM'
        }
      ],
      'caseManagementLocationCode': '424213',
      'caserestrictedFlag': false,
      'caseSLAStartDate': '2024-02-08'
    },
    'partyDetails': [
      {
        'partyID': '70e0aa2c-0c2a-41',
        'partyType': 'ORG',
        'partyRole': 'CLAI',
        'organisationDetails': {
          'name': 'New name',
          'organisationType': 'ORG',
          'cftOrganisationID': null
        },
        'unavailabilityRanges': [
          {
            'unavailableFromDate': '2024-02-18',
            'unavailableToDate': '2024-02-18',
            'unavailabilityType': 'All Day'
          },
          {
            'unavailableFromDate': '2024-03-09',
            'unavailableToDate': '2024-03-14',
            'unavailabilityType': 'All Day'
          }
        ]
      },
      {
        'partyID': 'B04IXE4',
        'partyType': 'ORG',
        'partyRole': 'LGRP',
        'organisationDetails': {
          'name': 'Civil - Organisation 1',
          'organisationType': 'ORG',
          'cftOrganisationID': 'B04IXE4'
        }
      },
      {
        'partyID': 'DAWY9LJ',
        'partyType': 'ORG',
        'partyRole': 'LGRP',
        'organisationDetails': {
          'name': 'Civil - Organisation 2',
          'organisationType': 'ORG',
          'cftOrganisationID': 'DAWY9LJ'
        }
      },
      {
        'partyID': '03dd0269-a4b1-48',
        'partyType': 'IND',
        'partyRole': 'LGRP',
        'individualDetails': {
          'title': null,
          'firstName': 'claimant1',
          'lastName': 'lrindividual',
          'preferredHearingChannel': 'INTER',
          'interpreterLanguage': null,
          'reasonableAdjustments': [],
          'vulnerableFlag': false,
          'vulnerabilityDetails': null,
          'hearingChannelEmail': [
            'hjfkhkjdsfhsdf@gmail.com'
          ],
          'hearingChannelPhone': [
            '07898767676'
          ],
          'relatedParties': [],
          'custodyStatus': null,
          'otherReasonableAdjustmentDetails': null
        }
      },
      {
        'partyID': 'c6864175-2314-45',
        'partyType': 'IND',
        'partyRole': 'LIFR',
        'individualDetails': {
          'title': null,
          'firstName': 'Gareth',
          'lastName': 'Lancaster',
          'preferredHearingChannel': 'INTER',
          'interpreterLanguage': null,
          'reasonableAdjustments': [],
          'vulnerableFlag': false,
          'vulnerabilityDetails': null,
          'hearingChannelEmail': [
            'Gareththelitigant@litigants.com'
          ],
          'hearingChannelPhone': [
            '07123456789'
          ],
          'relatedParties': [],
          'custodyStatus': null,
          'otherReasonableAdjustmentDetails': null
        }
      },
      {
        'partyID': '0bf456e0-c680-11',
        'partyType': 'IND',
        'partyRole': 'DEFE',
        'individualDetails': {
          'title': null,
          'firstName': 'John',
          'lastName': 'Doe',
          'preferredHearingChannel': 'TEL',
          'interpreterLanguage': null,
          'reasonableAdjustments': [],
          'vulnerableFlag': false,
          'vulnerabilityDetails': null,
          'hearingChannelEmail': [],
          'hearingChannelPhone': [],
          'relatedParties': [],
          'custodyStatus': null,
          'otherReasonableAdjustmentDetails': null
        },
        'unavailabilityRanges': [
          {
            'unavailableFromDate': '2024-02-18',
            'unavailableToDate': '2024-02-18',
            'unavailabilityType': 'All Day'
          },
          {
            'unavailableFromDate': '2024-03-09',
            'unavailableToDate': '2024-03-14',
            'unavailabilityType': 'All Day'
          }
        ]
      },
      {
        'partyID': 'f4aca95a-dc91-41',
        'partyType': 'IND',
        'partyRole': 'WITN',
        'individualDetails': {
          'title': null,
          'firstName': 'John',
          'lastName': 'Smith',
          'preferredHearingChannel': 'VID',
          'interpreterLanguage': null,
          'reasonableAdjustments': [],
          'vulnerableFlag': false,
          'vulnerabilityDetails': null,
          'hearingChannelEmail': [
            'johnsmith@email.com'
          ],
          'hearingChannelPhone': [
            '07012345678'
          ],
          'relatedParties': [],
          'custodyStatus': null,
          'otherReasonableAdjustmentDetails': null
        }
      },
      {
        'partyID': 'd5577b58-c753-43',
        'partyType': 'IND',
        'partyRole': 'EXPR',
        'individualDetails': {
          'title': null,
          'firstName': 'John',
          'lastName': 'Doe',
          'preferredHearingChannel': 'INTER',
          'interpreterLanguage': null,
          'reasonableAdjustments': [],
          'vulnerableFlag': false,
          'vulnerabilityDetails': null,
          'hearingChannelEmail': [
            'john@doemail.com'
          ],
          'hearingChannelPhone': [
            '07111111111'
          ],
          'relatedParties': [],
          'custodyStatus': null,
          'otherReasonableAdjustmentDetails': null
        }
      },
      {
        'partyID': '63247839-59e2-44',
        'partyType': 'IND',
        'partyRole': 'EXPR',
        'individualDetails': {
          'title': null,
          'firstName': 'John',
          'lastName': 'Doe',
          'preferredHearingChannel': 'INTER',
          'interpreterLanguage': null,
          'reasonableAdjustments': [],
          'vulnerableFlag': false,
          'vulnerabilityDetails': null,
          'hearingChannelEmail': [
            'test@email.com'
          ],
          'hearingChannelPhone': [
            '07000111000'
          ],
          'relatedParties': [],
          'custodyStatus': null,
          'otherReasonableAdjustmentDetails': null
        }
      }
    ],
    'hearingResponse': {
      'hearingDaySchedule': [
        {
          'hearingStartDateTime': '2025-02-09T09:00:00',
          'hearingEndDateTime': '2025-02-016T10:00:00',
          'hearingVenueId': '739514',
          'hearingRoomId': 'Clerkenwell and Shoreditch Floating List',
          'hearingJudgeId': null,
          'panelMemberIds': null,
          'attendees': [
            {
              'hearingSubChannel': 'INTER',
              'partyID': '63247839-59e2-44'
            },
            {
              'hearingSubChannel': 'INTER',
              'partyID': 'c6864175-2314-45'
            },
            {
              'hearingSubChannel': 'TELCVP',
              'partyID': '0bf456e0-c680-11'
            },
            {
              'hearingSubChannel': 'INTER',
              'partyID': 'd5577b58-c753-43'
            },
            {
              'hearingSubChannel': 'VIDCVP',
              'partyID': 'f4aca95a-dc91-41'
            },
            {
              'hearingSubChannel': null,
              'partyID': '70e0aa2c-0c2a-41'
            },
            {
              'hearingSubChannel': 'INTER',
              'partyID': '03dd0269-a4b1-48'
            },
            {
              'hearingSubChannel': null,
              'partyID': 'B04IXE4'
            },
            {
              'hearingSubChannel': null,
              'partyID': 'DAWY9LJ'
            }
          ],
          'listAssistSessionID': null
        }
      ],
      'laCaseStatus': 'LISTED',
      'listingStatus': 'FIXED',
      'receivedDateTime': '2025-01-01T15:20:00',
      'requestVersion': 1
    }
  })
};
