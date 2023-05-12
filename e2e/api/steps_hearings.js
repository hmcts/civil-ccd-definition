const {checkCaseFlagsEnabled, checkCaseFlagsAndHmcEnabled} = require('./testingSupport');
const apiRequest = require('./apiRequest.js');
const {addAndAssertCaseFlag} = require('./caseFlagsHelper');
const {getHearingsPayload} = require('./apiRequest');
const chai = require('chai');
const {expect} = chai;
const {date} = require('../api/dataHelper');

const specServiceId = 'AAA6';
const unspecServiceId = 'AAA7';

const getExpectedPayload = (serviceId) => {
  if (serviceId === specServiceId) {
    return {
      'hmctsServiceID': 'AAA6',
        'hmctsInternalCaseName': 'Test Inc v Sir John Doe',
        'publicCaseName': '\'Test Inc\' v \'John Doe\'',
        'caseAdditionalSecurityFlag': false,
        'caseCategories': [
        {
          'categoryType': 'caseType',
          'categoryValue': 'AAA6-SMALL_CLAIM'
        },
        {
          'categoryType': 'caseSubType',
          'categoryValue': 'AAA6-SMALL_CLAIM',
          'categoryParent': 'AAA6-SMALL_CLAIM'
        }
      ],
        'externalCaseReference': null,
        'caseManagementLocationCode': '229786',
        'caseSLAStartDate': date(210),
        'autoListFlag': false,
        'hearingType': '',
        'hearingWindow': {
        'dateRangeEnd': null,
          'dateRangeStart': null,
          'firstDateTimeMustBe': null
      },
      'duration': 0,
        'hearingPriorityType': 'Standard',
        'numberOfPhysicalAttendees': 0,
        'hearingInWelshFlag': false,
        'hearingLocations': [
        {
          'locationId': '229786',
          'locationType': 'court'
        }
      ],
        'facilitiesRequired': null,
        'listingComments': '',
        'hearingRequester': '',
        'privateHearingRequiredFlag': false,
        'caseInterpreterRequiredFlag': true,
        'panelRequirements': {},
      'leadJudgeContractType': '',
        'judiciary': {},
      'hearingIsLinkedFlag': false,
        'parties': [
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'Test Inc',
          'partyRole': 'CLAI',
          'individualDetails': {
            'title': null,
            'firstName': 'Test',
            'lastName': 'Inc',
            'preferredHearingChannel': null,
            'interpreterLanguage': 'Huttese',
            'reasonableAdjustments': [],
            'vulnerableFlag': false,
            'vulnerabilityDetails': null,
            'hearingChannelEmail': [
              'testinc@example.com'
            ],
            'hearingChannelPhone': [
              '07898878902'
            ],
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 1',
          'partyRole': 'LGRP',
          'individualDetails': null,
          'organisationDetails': {
            'name': 'Civil - Organisation 1',
            'organisationType': null,
            'cftOrganisationID': 'Q1KOKP2'
          },
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'John Doe',
          'partyRole': 'EXPR',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Doe',
            'preferredHearingChannel': null,
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
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'John Smith',
          'partyRole': 'WITN',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Smith',
            'preferredHearingChannel': null,
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
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'Sir John Doe',
          'partyRole': 'DEFE',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Doe',
            'preferredHearingChannel': null,
            'interpreterLanguage': null,
            'reasonableAdjustments': [
              'RA0019'
            ],
            'vulnerableFlag': false,
            'vulnerabilityDetails': null,
            'hearingChannelEmail': [
              'johndoe@example.com'
            ],
            'hearingChannelPhone': [
              '07898678902'
            ],
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 2',
          'partyRole': 'LGRP',
          'individualDetails': null,
          'organisationDetails': {
            'name': 'Civil - Organisation 2',
            'organisationType': null,
            'cftOrganisationID': '79ZRSOU'
          },
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        }
      ],
        'screenFlow': [
        {
          'screenName': 'hearing-requirements',
          'navigation': [
            {
              'resultValue': 'hearing-facilities'
            }
          ]
        },
        {
          'screenName': 'hearing-facilities',
          'navigation': [
            {
              'resultValue': 'hearing-stage'
            }
          ]
        },
        {
          'screenName': 'hearing-stage',
          'navigation': [
            {
              'resultValue': 'hearing-attendance'
            }
          ]
        },
        {
          'screenName': 'hearing-attendance',
          'navigation': [
            {
              'resultValue': 'hearing-venue'
            }
          ]
        },
        {
          'screenName': 'hearing-venue',
          'conditionKey': 'regionId',
          'navigation': [
            {
              'conditionOperator': 'INCLUDE',
              'conditionValue': '7',
              'resultValue': 'hearing-welsh'
            },
            {
              'conditionOperator': 'NOT INCLUDE',
              'conditionValue': '7',
              'resultValue': 'hearing-judge'
            }
          ]
        },
        {
          'screenName': 'hearing-welsh',
          'navigation': [
            {
              'resultValue': 'hearing-judge'
            }
          ]
        },
        {
          'screenName': 'hearing-judge',
          'navigation': [
            {
              'resultValue': 'hearing-timing'
            }
          ]
        },
        {
          'screenName': 'hearing-timing',
          'navigation': [
            {
              'resultValue': 'hearing-link'
            }
          ]
        },
        {
          'screenName': 'hearing-link',
          'navigation': [
            {
              'resultValue': 'hearing-additional-instructions'
            }
          ]
        },
        {
          'screenName': 'hearing-additional-instructions',
          'navigation': [
            {
              'resultValue': 'hearing-create-edit-summary'
            }
          ]
        }
      ],
        'vocabulary': [
        {}
      ],
        'hearingChannels': null,
        'caseFlags': {
        'flags': [
          {
            'partyName': 'Sir John Doe',
            'flagId': 'RA0019',
            'flagDescription': 'Step free / wheelchair access',
            'flagStatus': 'Active'
          },
          {
            'partyName': 'Test Inc',
            'flagId': 'PF0015',
            'flagDescription': 'Language Interpreter',
            'flagStatus': 'Active'
          }
        ]
      },
      'caserestrictedFlag': false
    };
  }
  if (serviceId === unspecServiceId) {
    return {
      'hmctsServiceID': 'AAA7',
      'hmctsInternalCaseName': 'Test Inc v Sir John Doe and Dr Foo Bar',
      'publicCaseName': '\'Test Inc\' represented by \'Bob the litigant friend\' (litigation friend) v \'John Doe\', \'Foo Bar\'',
      'caseAdditionalSecurityFlag': true,
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
      'externalCaseReference': null,
      'caseManagementLocationCode': '229786',
      'caseSLAStartDate': date(350),
      'autoListFlag': false,
      'hearingType': '',
      'hearingWindow': {
        'dateRangeStart': null,
        'dateRangeEnd': null,
        'firstDateTimeMustBe': null
      },
      'duration': 0,
      'hearingPriorityType': 'Standard',
      'numberOfPhysicalAttendees': 0,
      'hearingInWelshFlag': false,
      'hearingLocations': [
        {
          'locationId': '229786',
          'locationType': 'court'
        }
      ],
      'facilitiesRequired': [
        '11'
      ],
      'listingComments': '',
      'hearingRequester': '',
      'privateHearingRequiredFlag': false,
      'caseInterpreterRequiredFlag': false,
      'panelRequirements': {},
      'leadJudgeContractType': '',
      'judiciary': {},
      'hearingIsLinkedFlag': false,
      'parties': [
        {
          'partyID': '',
          'partyType': 'ORG',
          'partyName': 'Test Inc',
          'partyRole': 'CLAI',
          'individualDetails': null,
          'organisationDetails': {
            'name': 'Test Inc',
            'organisationType': null,
            'cftOrganisationID': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 1',
          'partyRole': 'LGRP',
          'individualDetails': null,
          'organisationDetails': {
            'name': 'Civil - Organisation 1',
            'organisationType': null,
            'cftOrganisationID': 'Q1KOKP2'
          },
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'John Doe',
          'partyRole': 'EXPR',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Doe',
            'preferredHearingChannel': null,
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
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'John Smith',
          'partyRole': 'WITN',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Smith',
            'preferredHearingChannel': null,
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
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'Bob the litigant friend',
          'partyRole': 'LIFR',
          'individualDetails': {
            'title': null,
            'firstName': 'Bob',
            'lastName': 'the litigant friend',
            'preferredHearingChannel': null,
            'interpreterLanguage': null,
            'reasonableAdjustments': [],
            'vulnerableFlag': false,
            'vulnerabilityDetails': null,
            'hearingChannelEmail': [
              'bobthelitigant@litigants.com'
            ],
            'hearingChannelPhone': [
              '07123456789'
            ],
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'Sir John Doe',
          'partyRole': 'DEFE',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Doe',
            'preferredHearingChannel': null,
            'interpreterLanguage': null,
            'reasonableAdjustments': [],
            'vulnerableFlag': false,
            'vulnerabilityDetails': null,
            'hearingChannelEmail': [],
            'hearingChannelPhone': [],
            'relatedParties': [
              {}
            ],
            'custodyStatus': 'C'
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 2',
          'partyRole': 'LGRP',
          'individualDetails': null,
          'organisationDetails': {
            'name': 'Civil - Organisation 2',
            'organisationType': null,
            'cftOrganisationID': '79ZRSOU'
          },
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'John Doe',
          'partyRole': 'EXPR',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Doe',
            'preferredHearingChannel': null,
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
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'John Smith',
          'partyRole': 'WITN',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Smith',
            'preferredHearingChannel': null,
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
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'Dr Foo Bar',
          'partyRole': 'DEFE',
          'individualDetails': {
            'title': null,
            'firstName': 'Foo',
            'lastName': 'Bar',
            'preferredHearingChannel': null,
            'interpreterLanguage': null,
            'reasonableAdjustments': [],
            'vulnerableFlag': false,
            'vulnerabilityDetails': null,
            'hearingChannelEmail': [],
            'hearingChannelPhone': [],
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 3',
          'partyRole': 'LGRP',
          'individualDetails': null,
          'organisationDetails': {
            'name': 'Civil - Organisation 3',
            'organisationType': null,
            'cftOrganisationID': 'H2156A0'
          },
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'John Doe',
          'partyRole': 'EXPR',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Doe',
            'preferredHearingChannel': null,
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
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '',
          'partyType': 'IND',
          'partyName': 'John Smith',
          'partyRole': 'WITN',
          'individualDetails': {
            'title': null,
            'firstName': 'John',
            'lastName': 'Smith',
            'preferredHearingChannel': null,
            'interpreterLanguage': null,
            'reasonableAdjustments': [
              'RA0026'
            ],
            'vulnerableFlag': true,
            'vulnerabilityDetails': null,
            'hearingChannelEmail': [
              'johnsmith@email.com'
            ],
            'hearingChannelPhone': [
              '07012345678'
            ],
            'relatedParties': [
              {}
            ],
            'custodyStatus': null
          },
          'organisationDetails': null,
          'unavailabilityDOW': null,
          'unavailabilityRange': null,
          'hearingSubChannel': null
        }
      ],
      'screenFlow': [
        {
          'screenName': 'hearing-requirements',
          'navigation': [
            {
              'resultValue': 'hearing-facilities'
            }
          ]
        },
        {
          'screenName': 'hearing-facilities',
          'navigation': [
            {
              'resultValue': 'hearing-stage'
            }
          ]
        },
        {
          'screenName': 'hearing-stage',
          'navigation': [
            {
              'resultValue': 'hearing-attendance'
            }
          ]
        },
        {
          'screenName': 'hearing-attendance',
          'navigation': [
            {
              'resultValue': 'hearing-venue'
            }
          ]
        },
        {
          'screenName': 'hearing-venue',
          'conditionKey': 'regionId',
          'navigation': [
            {
              'conditionOperator': 'INCLUDE',
              'conditionValue': '7',
              'resultValue': 'hearing-welsh'
            },
            {
              'conditionOperator': 'NOT INCLUDE',
              'conditionValue': '7',
              'resultValue': 'hearing-judge'
            }
          ]
        },
        {
          'screenName': 'hearing-welsh',
          'navigation': [
            {
              'resultValue': 'hearing-judge'
            }
          ]
        },
        {
          'screenName': 'hearing-judge',
          'navigation': [
            {
              'resultValue': 'hearing-timing'
            }
          ]
        },
        {
          'screenName': 'hearing-timing',
          'navigation': [
            {
              'resultValue': 'hearing-link'
            }
          ]
        },
        {
          'screenName': 'hearing-link',
          'navigation': [
            {
              'resultValue': 'hearing-additional-instructions'
            }
          ]
        },
        {
          'screenName': 'hearing-additional-instructions',
          'navigation': [
            {
              'resultValue': 'hearing-create-edit-summary'
            }
          ]
        }
      ],
      'vocabulary': [
        {}
      ],
      'hearingChannels': null,
      'caseFlags': {
        'flags': [
          {
            'partyName': 'Sir John Doe',
            'flagId': 'PF0019',
            'flagDescription': 'Detained individual',
            'flagStatus': 'Active'
          },
          {
            'partyName': 'Sir John Doe',
            'flagId': 'PF0007',
            'flagDescription': 'Unacceptable/disruptive customer behaviour',
            'flagStatus': 'Active'
          },
          {
            'partyName': 'John Smith',
            'flagId': 'RA0026',
            'flagDescription': 'Support worker or carer with me',
            'flagStatus': 'Active'
          }
        ]
      },
      'caserestrictedFlag': false
    };
  }
};

module.exports = {
  createCaseFlags: async (user, caseId, flagLocation, flag) => {
    if(!(await checkCaseFlagsEnabled())) {
      return;
    }

    await apiRequest.setupTokens(user);

    await addAndAssertCaseFlag(flagLocation, flag, caseId);
  },

  generateHearingsPayload: async (user, caseId, serviceId = 'AAA7') => {
    if(!(await checkCaseFlagsAndHmcEnabled())) {
      return;
    }

    await apiRequest.setupTokens(user);

    const payload = await getHearingsPayload(user, caseId);
    const {caseDeepLink, ...actualPayload} = payload;

    const expectedPayload = getExpectedPayload(serviceId);

    expect(actualPayload).deep.equal(expectedPayload);
    expect(caseDeepLink).deep.contain(`/cases/case-details/${caseId}`);
  },
};
