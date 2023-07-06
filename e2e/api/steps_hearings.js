const {checkCaseFlagsEnabled, checkCaseFlagsAndHmcEnabled} = require('./testingSupport');
const apiRequest = require('./apiRequest.js');
const {addAndAssertCaseFlag} = require('./caseFlagsHelper');
const {getHearingsPayload} = require('./apiRequest');
const chai = require('chai');
const {expect} = chai;
const {date} = require('../api/dataHelper');
const config = require('../config');

const specServiceId = 'AAA6';
const unspecServiceId = 'AAA7';

const runningOnLocal = () => !['aat', 'demo', 'preview'].includes(config.runningEnv);
const locationId = () => runningOnLocal() ? '000000' : '229786';

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
        'caseManagementLocationCode': locationId(),
        'caseSLAStartDate': date(),
        'autoListFlag': false,
        'hearingType': null,
        'hearingWindow': null,
      'duration': 0,
        'hearingPriorityType': 'Standard',
        'numberOfPhysicalAttendees': 0,
        'hearingInWelshFlag': false,
        'hearingLocations': [
        {
          'locationId': locationId(),
          'locationType': 'court'
        }
      ],
        'facilitiesRequired': null,
        'listingComments': null,
        'hearingRequester': '',
        'privateHearingRequiredFlag': false,
        'caseInterpreterRequiredFlag': true,
        'panelRequirements': null,
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
            'interpreterLanguage': 'HUT',
            'reasonableAdjustments': [],
            'vulnerableFlag': false,
            'vulnerabilityDetails': null,
            'hearingChannelEmail': [
              'testinc@example.com'
            ],
            'hearingChannelPhone': [
              '07898878902'
            ],
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
          'hearingSubChannel': null
        },
        {
          'partyID': 'Q1KOKP2',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 1',
          'partyRole': 'LGRP',
          'organisationDetails': {
            'name': 'Civil - Organisation 1',
            'organisationType': 'ORG',
            'cftOrganisationID': 'Q1KOKP2'
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
          'hearingSubChannel': null
        },
        {
          'partyID': '79ZRSOU',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 2',
          'partyRole': 'LGRP',
          'organisationDetails': {
            'name': 'Civil - Organisation 2',
            'organisationType': 'ORG',
            'cftOrganisationID': '79ZRSOU'
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
        'hearingChannels': ['INTER'],
        'caseFlags': {
        'flags': [
          {
            'partyName': 'Sir John Doe',
            'flagId': 'RA0019',
            'flagDescription': 'Step free / wheelchair access',
            'flagStatus': 'Active',
            'partyID': ''
          },
          {
            'partyName': 'Test Inc',
            'flagId': 'PF0015',
            'flagDescription': 'Language Interpreter',
            'flagStatus': 'Active',
            'partyID': ''
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
      'caseManagementLocationCode': locationId(),
      'caseSLAStartDate': date(),
      'autoListFlag': false,
      'hearingType': null,
      'hearingWindow': null,
      'duration': 0,
      'hearingPriorityType': 'Standard',
      'numberOfPhysicalAttendees': 0,
      'hearingInWelshFlag': false,
      'hearingLocations': [
        {
          'locationId': locationId(),
          'locationType': 'court'
        }
      ],
      'facilitiesRequired': [
        '11'
      ],
      'listingComments': null,
      'hearingRequester': '',
      'privateHearingRequiredFlag': false,
      'caseInterpreterRequiredFlag': false,
      'panelRequirements': null,
      'leadJudgeContractType': '',
      'judiciary': {},
      'hearingIsLinkedFlag': false,
      'parties': [
        {
          'partyID': '',
          'partyType': 'ORG',
          'partyName': 'Test Inc',
          'partyRole': 'CLAI',
          'organisationDetails': {
            'name': 'Test Inc',
            'organisationType': 'ORG',
            'cftOrganisationID': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': [
            {
                'unavailabilityType': 'All Day',
                'unavailableFromDate': date(10),
                'unavailableToDate': date(10)
            },
            {
              'unavailabilityType': 'All Day',
              'unavailableFromDate': date(30),
              'unavailableToDate': date(35)
            }
          ],
          'hearingSubChannel': null
        },
        {
          'partyID': 'Q1KOKP2',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 1',
          'partyRole': 'LGRP',
          'organisationDetails': {
            'name': 'Civil - Organisation 1',
            'organisationType': 'ORG',
            'cftOrganisationID': 'Q1KOKP2'
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': 'C'
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': [
            {
              'unavailabilityType': 'All Day',
              'unavailableFromDate': date(10),
              'unavailableToDate': date(10)
            },
            {
              'unavailabilityType': 'All Day',
              'unavailableFromDate': date(30),
              'unavailableToDate': date(35)
            }
          ],
          'hearingSubChannel': null
        },
        {
          'partyID': '79ZRSOU',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 2',
          'partyRole': 'LGRP',
          'organisationDetails': {
            'name': 'Civil - Organisation 2',
            'organisationType': 'ORG',
            'cftOrganisationID': '79ZRSOU'
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': [
            {
              'unavailabilityType': 'All Day',
              'unavailableFromDate': date(10),
              'unavailableToDate': date(10)
            },
            {
              'unavailabilityType': 'All Day',
              'unavailableFromDate': date(30),
              'unavailableToDate': date(35)
            }
          ],          'hearingSubChannel': null
        },
        {
          'partyID': 'H2156A0',
          'partyType': 'ORG',
          'partyName': 'Civil - Organisation 3',
          'partyRole': 'LGRP',
          'organisationDetails': {
            'name': 'Civil - Organisation 3',
            'organisationType': 'ORG',
            'cftOrganisationID': 'H2156A0'
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'vulnerabilityDetails': 'Support worker or carer with me - support worker comment',
            'hearingChannelEmail': [
              'johnsmith@email.com'
            ],
            'hearingChannelPhone': [
              '07012345678'
            ],
            'relatedParties': [],
            'custodyStatus': null
          },
          'unavailabilityDOW': null,
          'unavailabilityRanges': null,
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
            'flagStatus': 'Active',
            'partyID': ''
          },
          {
            'partyName': 'Sir John Doe',
            'flagId': 'PF0007',
            'flagDescription': 'Unacceptable/disruptive customer behaviour',
            'flagStatus': 'Active',
            'partyID': ''

          },
          {
            'partyName': 'John Smith',
            'flagId': 'RA0026',
            'flagDescription': 'Support worker or carer with me',
            'flagStatus': 'Active',
            'partyID': ''
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

    let {caseDeepLink, ...actualPayload} = payload;

    // remove uniquely generated partyID for all parties except legal rep
    actualPayload.parties = actualPayload.parties.map(function (party) {
      if (party.partyRole !== 'LGRP') {
        return {...party, partyID:''};
      } else {
        return {...party};
      }
    });
    actualPayload.caseFlags.flags = actualPayload.caseFlags.flags.map(function (flag) {
      if (flag.partyRole !== 'LGRP') {
        return {...flag, partyID:''};
      } else {
        return {...flag};
      }
    });
    const expectedPayload = getExpectedPayload(serviceId);

    expect(actualPayload).deep.equal(expectedPayload);
    expect(caseDeepLink).deep.contain(`/cases/case-details/${caseId}`);
  },
};

