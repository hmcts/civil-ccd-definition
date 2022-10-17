const {date} = require('../../api/dataHelper');
const {sdoDjDocument} = require('../../api/dataHelper');

module.exports = {
  valid: {
    CaseManagementOrder: {
      defendantDetails: {
        value: {
          code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
          label: 'Both defendants'
        },
        list_items: [
          {
            code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
            label: 'Sir John Doe'
          },
          {
            code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
            label: 'Dr Foo Bar'
          },
          {
            code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
            label: 'Both defendants'
          }
        ]
      },
      bothDefendants: 'Both defendants',
      caseManagementOrderSelection: 'TRIAL_HEARING',
      trialHearingDisclosureOfDocumentsDJToggle: ['SHOW'],
      trialHearingWitnessOfFactDJToggle: ['SHOW'],
      trialHearingAlternativeDisputeDJToggle: ['SHOW'],
      trialHearingTrialDJToggle: ['SHOW'],
      trialHearingCostsToggle: ['SHOW'],
      trialHearingSettlementDJToggle: ['SHOW'],
      disposalHearingNotesDJ: {
        input: 'This order has been made without a hearing. Each party has the right to apply to have this order set aside or varied. Any such application must be uploaded to the Digital Portal together with payment of any appropriate fee, by 4pm on',
        date: date(7)
      },
      trialHearingVariationsDirectionsDJToggle: ['SHOW'],
      disposalHearingSchedulesOfLossDJ: {
        input1: 'If there is a claim for ongoing/future loss in the original schedule of losses then ' +
          'the claimant must send an up to date schedule of loss to the defendant by 4pm on the',
        date1: date(70),
        input2: 'If the defendant wants to challenge this claim, they must send an up-to-date counter-schedule of loss to the claimant by 4pm on',
        date2: date(84),
        date3: date(84),
        input3: 'If the defendant wants to challenge the sums claimed in the schedule of loss they must upload to the' +
          ' Digital Portal an updated counter schedule of loss by 4pm on'
      },
      trialHearingDisclosureOfDocumentsDJ: {
        input1: 'By uploading to a Digital Portal a list with a disclosure statement by 4pm on',
        date1: date(28),
        input2: 'Any request to inspect or for a copy of a document shall by made by 4pm on',
        date2: date(42), input3: 'and complied with with 7 days of the request',
        input4: 'Each party must upload to the Digital Portal copies of those documents on which they wish to rely at trial',
        input5: 'By 4pm on',
        date3: date(28)
      },
      legacyCaseReference: '000DC260',
      respondent1OrganisationPolicy: {
        Organisation: {
          OrganisationID: '79ZRSOU'
        },
        OrgPolicyReference: 'Defendant policy reference456',
        OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORONE]'
      },
      disposalHearingJudgesRecitalDJ: {
        input: 'Mr Leadership Judge, Upon considering the claim form and Particulars of Claim/statements of case [and the directions questionnaires] \n\nIT IS ORDERED that:-',
        judgeNameTitle: 'Mr Leadership Judge'
      },
      trialHearingTrialDJ: {
        input1: 'The time provisionally allowed for the trial is',
        date1: date(154),
        date2: date(238),
        input2: 'If either party considers that the time estimates is insufficient, they must inform the' +
          ' court within 7 days of the date of this order.',
        input3: 'At least 7 days before the trial, the claimant must upload to the Digital Portal ',
        type: 'DOCUMENTS'
      },
      trialHousingDisrepair: {
        input1: 'The claimant must prepare a Scott Schedule of the items of disrepair',
        input2: 'The column headings will be as follows: Item; Alleged disrepair; Defendant\'s Response; ' +
          'Reserved for Judge\'s Use',
        input3: 'The claimant must uploaded to the Digital Portal the Scott Schedule with the relevant columns completed by 4pm on',
        date1: date(70),
        input4: 'The defendant must uploaded to the Digital Portal the amended Scott Schedule with the relevant columns in response completed by 4pm on',
        date2: date(84)
      },
      disposalHearingBundleDJ: {
        input: 'The claimant must lodge at court at least 7 days before the disposal',
      },
      disposalHearingMethodInPersonDJ: null,
      trialHearingMethodInPersonDJ: null,
      trialRoadTrafficAccident: {
        input: 'Photographs and/or a place of the accident location shall be prepared and agreed by the parties and' +
          ' uploaded to the Digital Portal by 4pm on',
        date1: date(28)
      },
      hearingSupportRequirementsDJ: {
        hearingPreferredLocation: 'site_name 0000 - court address 0000 - AA0 0BB'
      },
      disposalHearingDisclosureOfDocumentsDJ: {
        input: 'The parties shall serve on each other copies of the documents upon which reliance ' +
          'is to be placed at the disposal hearing by 4pm on',
        date: date(28)
      },
      trialHearingNotesDJ: {
        input: 'This order has been made without a hearing. Each party has the right to apply to have this' +
          ' order set aside or varied. Any such application must be received by the court (together with the' +
          ' appropriate fee) by 4pm on',
        date: date(7)
      },
      disposalHearingMedicalEvidenceDJ: {
        input1: 'The claimant has permission to rely upon the written expert evidence already uploaded to the Digital Portal with the particulars of claim and in addition has permission to rely upon any associated correspondence or updating report which is uploaded to the Digital Portal by 4pm on',
        date1: date(28)
      },
      applicantVRespondentText: 'Test Inc v Sir John Doe',
      disposalHearingWitnessOfFactDJ: {
        input1: 'The claimant shall serve on every other party the witness statements of all witnesses of fact' +
          ' on whose evidence reliance is to be placed by 4pm on',
        date1: date(28),
        input2: 'The provisions of CPR 32.6 apply to such evidence.',
        input3: 'The claimant must upload to the Digital Portal copies of the witness statements of all witnesses whose evidence they wish the court to consider when deciding the amount of damages by by 4pm on ',
        date2: date(28),
        date3: date(14),
        input4: 'The provisions of CPR 32.6 apply to such evidence.',
        input5: 'Any application by the defendant/s pursuant to CPR 32.7 must be made by 4pm on',
        input6: 'and must be accompanied by proposed directions for allocation and listing for trial on quantum as ' +
          'cross-examination will result in the hearing exceeding the 30 minute maximum time estimate for a disposal' +
          ' hearing'
      },
      trialCreditHire: {
        input1: 'If impecuniosity is alleged by the claimant and not admitted by the defendant, the claimant\'s disclosure as ordered earlier in this order must include:\na. Evidence of all income from all sources for a period of 3 months prior to the commencement of hire until the earlier of i) 3 months after cessation of hire or ii) the repair/replacement of the claimant\'s vehicle;\nb. Copy statements of all blank, credit care and savings accounts for a period of 3 months prior to the commencement of hire until the earlier of i) 3 months after cessation of hire or ii) the repair/replacement of the claimant\'s vehicle;\nc. Evidence of any loan, overdraft or other credit facilities available to the claimant',
        input2: 'The claimant must upload to the Digital Portal a witness statement addressing a)the need to hire a replacement vehicle; and b)impecuniosity',
        date1: date(56),
        input3: 'This statement must be uploaded to the Digital Portal by 4pm on',
        input4: 'A failure to comply will result in the claimant being debarred from asserting need or relying on impecuniosity as the case may be at the final hearing, unless they have the permission of the trial Judge.',
        date2: date(70),
        input5: 'The parties are to liaise and use reasonable endeavours to agree the basic hire rate no later than 4pm on.',
        date3: date(84),
        input6: 'If the parties fail to agree rates subject to liability and/or other issues pursuant to the paragraph above, each party may rely upon written evidence by way of witness statement of one witness to provide evidence of basic hire rates available within the claimant\'s geographical location, from a mainstream (or, if none available, a local reputable) supplier. The defendant\'s evidence to be served by 4pm on',
        date4: date(98),
        input7: 'and the claimant’s evidence in reply if so advised is to be uploaded by 4pm on',
        input8: 'This witness statement is limited to 10 pages per party (to include any appendices).'
      },
      disposalHearingQuestionsToExpertsDJ: {
        date: date(42)
      },
      trialClinicalNegligence: {
        input1: 'Documents should be retained as follows:',
        input2: 'the parties must retain all electronically stored documents relating to the issues in this Claim.',
        input3: 'the defendant must retain the original clinical notes relating to the issues in this Claim. ' +
          'The defendant must give facilities for inspection by the claimant, the claimant\'s legal advisers and' +
          ' experts of these original notes on 7 days written notice.',
        input4: 'Legible copies of the medical and educational records of the claimant / Deceased / ' +
          'claimant\'s Mother are to be placed in a separate paginated bundle by the claimant\'s Solicitors ' +
          'and kept up to date. All references to medical notes are to be made by reference to the pages ' +
          'in that bundle.' },
      trialBuildingDispute: {
        input1: 'The claimant must prepare a Scott Schedule of the defects, items of damage or any ' +
          'other relevant matters',
        input2: 'The columns should be headed: Item; Alleged Defect; Claimant\'s costing; Defendant\'s response; Defendant\'s costing; Reserved for Judge\'s use.',
        input3: 'The claimant must upload to the Digital Portal the Scott Schedule with the relevant columns completed by 4pm on',
        date1: date(70),
        input4: 'The defendant must upload to the Digital Portal an amended version of the Scott Schedule with the relevant columns in response completed by 4pm on',
        date2: date(84) },
      trialHearingSchedulesOfLossDJToggle: [ 'SHOW' ],
      detailsOfClaim: 'Test details of claim',
      trialHearingSchedulesOfLossDJ: {
        input1: 'The claimant must upload to the Digital Portal an up-to-date schedule of loss to the defendant by 4pm on',
        date1: date(70),
        input2: 'If the defendant wants to challenge this claim, upload to the Digital Portal counter-schedule of loss by 4pm on',
        date2: date(84),
        input3: 'If there is a claim for future pecuniary loss and the parties have not already' +
          ' set out their case on periodical payments. then they must do so in the respective schedule and' +
          ' counter-schedule',
        input4: 'Upon it being noted that the schedule of loss contains no claim for continuing loss and is therefore final, no further schedule of loss shall be uploaded without permission to amend. The defendant shall upload to the Digital Portal an up-to-date counter schedule of loss by 4pm on',
        date3: date(84) },
      disposalHearingFinalDisposalHearingDJ: {
        input: 'This claim be listed for final disposal before a Judge on the first available date after.',
        date: date(112)
      },
      trialHearingJudgesRecitalDJ: {
        input: 'Mr Leadership Judge, has considered the statements of the case and the information provided by the parties, \n\n IT IS ORDERED THAT:',
        judgeNameTitle: 'Mr Leadership Judge'
      },
      trialPersonalInjury: {
        input1: 'The claimant has permission to rely upon the written expert evidence already uploaded to the Digital Portal with the particulars of claim and in addition has permission to rely upon any associated correspondence or updating report which is uploaded to the Digital Portal by 4pm on',
        date1: date(28),
        input2: 'which must be answered by 4pm on',
        date2: date(56),
        date3: date(28),
        input3: 'Any questions which are to be addressed to an expert must be sent to the expert directly and uploaded ' +
          'to the Digital Portal by 4pm on'
      },
      trialHearingWitnessOfFactDJ: {
        input1: 'Each party must upload to the Digital Portal copies of the statements of all witnesses of fact on whom they intend to rely.',
        input4: 'For this limitation, a party is counted as witness.',
        input5: 'Each witness statement should be no more than',
        date1: date(56),
        input7:'A4 pages. Statements should be double spaced using a font size of 12.',
        input8:'Witness statements shall be uploaded to the Digital Portal by 4pm on',
        input9:'Oral evidence will only be permitted at trial with permission from the Court from witnesses whose statements have not been uploaded to the Digital Portal in accordance with this order, or whose statements that have been served late'
      },
    },
    TrialHearing: {
      trialHearingMethodDJ: 'disposalHearingMethodTelephoneHearing',
      orderSDODocumentDJ: sdoDjDocument('Order_trial_000DC260.pdf')
    }
  }
};
