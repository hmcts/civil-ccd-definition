import { expect } from '@playwright/test';
import moment from 'moment';
import claimTypes from '../../../../enums/claim-types.ts';
import { SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// The parties whose unavailable dates "Add Unavailable Dates" (ADD_UNAVAILABLE_DATES) adds to, by their case data field
export type UnavailableDatesParty = 'applicant1' | 'applicant2' | 'respondent1' | 'respondent2';

// One run of the event: who runs it and the parties civil-service adds the dates to. A solicitor adds them for every
// party they represent, which civil-service works out from their case role: the claimants' solicitor for both claimants
// in a 2v1 claim, and Defendant 1's solicitor for both defendants where they have the same solicitor. Court staff (the
// hearing centre admin) choose the party on the event's first page, from a list civil-service fills in for the claim
// type (adminChoice, the label chosen).
export interface UnavailableDatesSpec {
  name: string;
  label: string;
  user: SessionUserKey;
  parties: UnavailableDatesParty[];
  adminChoice?: string;
}

// The dates one run adds: a single date and a date range, each run's different so each can be found on the case.
// civil-service only accepts dates from today to a year ahead.
export interface UnavailableDates {
  date: string;
  fromDate: string;
  toDate: string;
}

const isoDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

export function unavailableDatesFor(index: number): UnavailableDates {
  const start = moment().add(20 + index * 10, 'days');
  return {
    date: isoDate(start),
    fromDate: isoDate(start.clone().add(3, 'days')),
    toDate: isoDate(start.clone().add(5, 'days')),
  };
}

// The runs for a claim: each solicitor on it, then the hearing centre admin for a defendant. defendant1HasSolicitor is
// false where Defendant 1 is a litigant in person. The admin adds dates for the defendant (1v1, 2v1), both defendants
// with the same solicitor (Defendants), or Defendant 2 where each defendant is separate, so a defendant who is a
// litigant in person still gets dates.
export function addUnavailableDatesSpecs(claimType: claimTypes, defendant1HasSolicitor: boolean): UnavailableDatesSpec[] {
  const twoClaimants = claimType === claimTypes.TWO_VS_ONE || claimType === claimTypes.TWO_VS_ONE_LIP;
  const twoDefendants = [
    claimTypes.ONE_VS_TWO_SAME_SOL,
    claimTypes.ONE_VS_TWO_DIFF_SOL,
    claimTypes.ONE_VS_TWO_LIPS,
    claimTypes.ONE_VS_TWO_LR_LIP,
    claimTypes.ONE_VS_TWO_LIP_LR,
  ].includes(claimType);
  const sameSolicitor = claimType === claimTypes.ONE_VS_TWO_SAME_SOL;

  const specs: UnavailableDatesSpec[] = [{
    name: 'ADD_UNAVAILABLE_DATES_CLAIMANT_SOLICITOR',
    label: 'Claimant Solicitor',
    user: 'claimantSolicitor',
    parties: twoClaimants ? ['applicant1', 'applicant2'] : ['applicant1'],
  }];
  if (defendant1HasSolicitor) {
    specs.push({
      name: 'ADD_UNAVAILABLE_DATES_DEFENDANT1_SOLICITOR',
      label: 'Defendant 1 Solicitor',
      user: 'respondent1Solicitor',
      parties: sameSolicitor ? ['respondent1', 'respondent2'] : ['respondent1'],
    });
  }
  if (claimType === claimTypes.ONE_VS_TWO_DIFF_SOL) {
    specs.push({
      name: 'ADD_UNAVAILABLE_DATES_DEFENDANT2_SOLICITOR',
      label: 'Defendant 2 Solicitor',
      user: 'respondent2Solicitor',
      parties: ['respondent2'],
    });
  }
  if (!twoDefendants) {
    specs.push({ name: 'ADD_UNAVAILABLE_DATES_ADMIN', label: 'Hearing Centre Admin', user: 'hearingCentreAdmin', parties: ['respondent1'], adminChoice: 'Defendant' });
  } else if (sameSolicitor) {
    specs.push({ name: 'ADD_UNAVAILABLE_DATES_ADMIN', label: 'Hearing Centre Admin', user: 'hearingCentreAdmin', parties: ['respondent1', 'respondent2'], adminChoice: 'Defendants' });
  } else {
    specs.push({ name: 'ADD_UNAVAILABLE_DATES_ADMIN', label: 'Hearing Centre Admin', user: 'hearingCentreAdmin', parties: ['respondent2'], adminChoice: 'Defendant 2' });
  }
  return specs;
}

// The event's dates, as entered on its page: Add new twice, a single date then a date range
export function unavailableDatesAnswers(dates: UnavailableDates) {
  return [
    { unavailableDateType: 'SINGLE_DATE', date: dates.date },
    { unavailableDateType: 'DATE_RANGE', fromDate: dates.fromDate, toDate: dates.toDate },
  ];
}

// What the run should have saved, for Playwright's toMatchObject: the dates are added to each party's unavailable
// dates and to the Listing notes tab's copy of them (respondent1UnavailableDatesForTab, for example), after any dates
// already there. civil-service marks each with the event and the day it was added; the day is only checked as present,
// as civil-service's clock may be on a different day near midnight.
export function expectedUnavailableDatesData(spec: UnavailableDatesSpec, dates: UnavailableDates): Record<string, any> {
  const added = expect.arrayContaining(unavailableDatesAnswers(dates).map((answer) => expect.objectContaining({
    value: expect.objectContaining({ ...answer, eventAdded: 'Unavailability Dates Event', dateAdded: expect.any(String) }),
  })));
  return Object.fromEntries(spec.parties.flatMap((party) => [
    [party, { unavailableDates: added }],
    [`${party}UnavailableDatesForTab`, added],
  ]));
}
