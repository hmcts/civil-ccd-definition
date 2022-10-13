const {date} = require('../../api/dataHelper');
const {sdoDjDocument} = require('../../api/dataHelper');

module.exports = {
  valid: {
    CaseManagementOrder: {
      trialHearingWitnessOfFactDJ: {
        input1: 'Each party shall serve on every other party the witness statements of all witnesses of fact on whom he intends to rely',
        input2: 'All statements to be no more than',
        input4: 'pages long, A4, double spaced and in font size 12.',
        input5: 'There shall be simultaneous exchange of such statements by 4pm on',
        date1: date(56),
        input6: 'Oral evidence will not be permitted at trial from a witness whose statement has not been served in ' +
          'accordance with this order or has been served late, except with permission from the court'
      },
      trialHearingJudgesRecitalDJ: {
        input: '[Title] [your name] has considered the statements of the case and the information provided by ' +
          'the parties, \n\n IT IS ORDERED THAT:'
      },
      trialPersonalInjury: {
        input1: '1. The claimant has permission to rely on the written expert evidence annexed to the Particulars ' +
          'of Claim. Defendant may raise written questions of the expert by 4pm on',
        date1: date(28),
        input2: 'which must be answered by 4pm on',
        date2: date(56),
        input3: 'No other permission is given for expert evidence.'
      },
      defendantDetails: {
        value: {
          code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
          label: 'Sir John Doe'
        },
        list_items: [
          {
            code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
            label: 'Sir John Doe'
          }
          ]
      },
      caseManagementOrderSelection: 'TRIAL_HEARING',
      disposalHearingStandardDisposalOrderDJ: {
        input: 'input'
      },
      trialClinicalNegligence: {
        input1: 'Documents are to be retained as follows:',
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
        input2: 'The column headings will be as follows: Item; Alleged Defect; claimant\'s Costing; ' +
          'defendant\'s Response; defendant\'s Costing; Reserved for Judge\'s Use',
        input3: 'The claimant must serve the Scott Schedule with the relevant columns completed by 4pm on',
        date1: date(70),
        input4: 'The defendant must file and serve the Scott Schedule with the relevant columns in response' +
          ' completed by 4pm on',
        date2: date(84) },
      trialHearingSchedulesOfLossDJToggle: [ 'SHOW' ],
      detailsOfClaim: 'Test details of claim',
      trialHearingSchedulesOfLossDJ: {
        input1: 'The claimant shall serve an updated schedule of loss on the defendant(s) by 4pm on',
        date1: date(70),
        input2: 'The defendant(s) shall serve a counter schedule on the claimant by 4pm on',
        date2: date(84),
        input3: 'If there is a claim for future pecuniary loss and the parties have not already' +
          ' set out their case on periodical payments. then they must do so in the respective schedule and' +
          ' counter-schedule',
        input4: 'Upon it being noted that the schedule of loss contains no claim for continuing loss and is' +
          ' therefore final, no further schedule of loss shall be served without permission to amend. The' +
          ' defendant shall file a counter-schedule of loss by 4pm on',
        date3: date(84) },
      disposalHearingFinalDisposalHearingDJ: {
        input: 'This claim be listed for final disposal before a Judge on the first available date after.',
        date: date(112)
      },
      trialCreditHire: {
        input1: '1. If impecuniosity is alleged by the claimant and not admitted by the defendant,' +
          ' the claimant\'s disclosure as ordered earlier in this order must include:\na. Evidence of' +
          ' all income from all sources for a period of 3 months prior to the commencement of hire until' +
          ' the earlier of i) 3 months after cessation of hire or ii) the repair/replacement of the' +
          ' claimant\'s vehicle;\nb. Copy statements of all blank, credit care and savings accounts for' +
          ' a period of 3 months prior to the commencement of hire until the earlier of i) 3 months after' +
          ' cessation of hire or ii) the repair/replacement of the claimant\'s vehicle;\nc. Evidence of any loan,' +
          ' overdraft or other credit facilities available to the claimant',
        input2: 'The claimant must file and serve a witness statement addressing, (a) need to hire a replacement' +
          ' vehicle and (b) impecuniosity no later than 4pm on',
        date1: date(56),
        input3: 'Failure to comply with the paragraph above will result in the claimant being debarred from' +
          ' asserting need or relying on impecuniosity as the case may be at the final hearing, save with' +
          ' permission of the Trial Judge.',
        input4: '4. The parties are to liaise and use reasonable endeavours to agree the basic hire rate no later' +
          ' than 4pm on.',
        date2: date(70),
        input5: '5. If the parties fail to agree rates subject to liability and/or other issues pursuant to the' +
          ' paragraph above, each party may rely upon written evidence by way of witness statement of one witness' +
          ' to provide evidence of basic hire rates available within the claimant\'s geographical location, from' +
          ' a mainstream (or, if none available, a local reputable) supplier. The defendant\'s evidence to be' +
          ' served by 4pm on',
        date3: date(84),
        input6: 'and the claimant\'s evidence in reply if so advised' +
          ' to be served by 4pm on',
        date4: date(98), input7: 'This witness statement is limited to 10 pages per party ' +
          '(to include any appendices).' },
      disposalHearingQuestionsToExpertsDJ: {
        date: date(42)
      },
      disposalHearingWitnessOfFactDJ: {
        input1: 'The claimant shall serve on every other party the witness statements of all witnesses of fact' +
          ' on whose evidence reliance is to be placed by 4pm on',
        date1: date(28),
        input2: 'The provisions of CPR 32.6 apply to such evidence.',
        input3: 'Any application by the defendant/s pursuant to CPR 32.7 must be made by 4pm on',
        date2: date(14),
        input4: 'and must be accompanied by proposed directions for allocation and listing for trial on quantum' +
          ' as cross-examination will result in the hearing exceeding the 30 minute maximum time estimate' +
          ' for a disposal hearing'
      },
      trialHearingDisclosureOfDocumentsDJToggle: [ 'SHOW' ],
      trialHearingWitnessOfFactDJToggle: [ 'SHOW' ],
      applicantVRespondentText: 'Test Inc v Sir John Doe',
      disposalHearingMedicalEvidenceDJ: {
        input1: 'The claimant has permission to rely upon the written expert evidence served with the ' +
          'Particulars of Claim to be disclosed by 4pm',
        date1: date(28),
        input2: 'and any associated correspondence and/or updating report disclosed not later than 4pm on the',
        date2: date(28) },
      trialHearingAlternativeDisputeDJToggle: [ 'SHOW' ],
      trialHearingNotesDJ: {
        input: 'This order has been made without a hearing. Each party has the right to apply to have this' +
          ' order set aside or varied. Any such application must be received by the court (together with the' +
          ' appropriate fee) by 4pm on',
        date: date(7)
      },
      trialHearingTrialDJToggle: [ 'SHOW' ],
      hearingSupportRequirementsDJ: {
        hearingPreferredLocation: 'site_name 0000 - court address 0000 - AA0 0BB' },
      disposalHearingDisclosureOfDocumentsDJ: {
        input: 'The parties shall serve on each other copies of the documents upon which reliance ' +
          'is to be placed at the disposal hearing by 4pm on',
        date: date(28) },
      trialHearingCostsToggle: [ 'SHOW' ],
      trialHearingSettlementDJToggle: [ 'SHOW' ],
      disposalHearingNotesDJ: {
        input: 'This Order has been made without a hearing. Each party has the right to apply to have this Order' +
          ' set aside or varied. Any such application must be received by the Court (together with the appropriate' +
          ' fee) by 4pm on',
        date: date(7) },
      trialHearingVariationsDirectionsDJToggle: [ 'SHOW' ],
      disposalHearingSchedulesOfLossDJ: {
        input1: 'If there is a claim for ongoing/future loss in the original schedule of losses then ' +
          'the claimant must send an up to date schedule of loss to the defendant by 4pm on the',
        date1: date(70),
        input2: 'The defendant, in the event of challenge, must send an up to date counter-schedule of loss' +
          ' to the claimant by 4pm on the',
        date2: date(84) },
      trialHearingDisclosureOfDocumentsDJ: {
        input1: 'By serving a list with a disclosure statement by 4pm on',
        date1: date(28),
        input2: 'Any request to inspect or for a copy of a document shall by made by 4pm on',
        date2: date(42), input3: 'and complied with with 7 days of the request',
        input4: 'Each party must serve and file with the court a list of issues relevant to the search for and' +
          ' disclosure of electronically stored documents, or must confirm there are no such issues, ' +
          'following Civil Rule Practice Direction 31B.',
        input5: 'By 4pm on',
        date3: date(28) },
      legacyCaseReference: '000DC260',
      respondent1OrganisationPolicy: {
        Organisation: {
          OrganisationID: '79ZRSOU'
        },
        OrgPolicyReference: 'Defendant policy reference456',
        OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORONE]' },
      disposalHearingJudgesRecitalDJ: {
        input: 'Upon considering the claim Form and Particulars of Claim/statements of case [and the directions' +
          ' questionnaires] \n\nIT IS ORDERED that:-' },
      trialHearingTrialDJ: {
        input1: 'The time provisionally allowed for the trial is',
        date1: date(154),
        date2: date(238),
        input2: 'If either party considers that the time estimates is insufficient, they must inform the' +
          ' court within 7 days of the date of this order.',
        input3: 'Not more than seven nor less than three clear days before the trial, the claimant must' +
          ' file at court and serve anindexed and paginated bundle of documents which complies with the' +
          ' requirements of Rule 39.5 Civil Procedure Rules and Practice Direction 39A. The parties must' +
          ' endeavour to agree the contents of the bundle before it is filed. The bundle will include ' +
          'a case summary and a chronology.' },
      trialHousingDisrepair: {
        input1: 'The claimant must prepare a Scott Schedule of the items of disrepair',
        input2: 'The column headings will be as follows: Item; Alleged disrepair; Defendant\'s Response; ' +
          'Reserved for Judge\'s Use',
        input3: 'The claimant must serve the Scott Schedule with the relevant columns completed by 4pm on',
        date1: date(70),
        input4: 'The Defendant must file and serve the Scott Schedule with the relevant' +
          ' column in response completed by 4pm on',
        date2: date(84) },
      disposalHearingBundleDJ: {
        input: 'The claimant must lodge at court at least 7 days before the disposal' },
      disposalHearingMethodInPersonDJ: null,
      trialHearingMethodInPersonDJ: null,
      trialRoadTrafficAccident: {
        input: 'Photographs and/or a plan of the location of the accident shall be prepared and agreed by the parties.'
      },
    },
    TrialHearing: {
      trialHearingMethodDJ: 'disposalHearingMethodTelephoneHearing',
      orderSDODocumentDJ: sdoDjDocument('Order_trial_pdf_000DC260.pdf')
    }
  }
};
