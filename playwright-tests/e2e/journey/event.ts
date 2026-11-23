import { Page } from '@playwright/test';
import caseStates from '../../enums/caseStates.ts';
import { SessionUserKey } from '../../helpers/SessionHelper.ts';
import type { SpecifiedClaimFacts, UnspecifiedClaimFacts } from './claimFacts.ts';
import type { Journey } from './settings.ts';
import type { JourneyConfig } from './steps/journeyConfig.ts';

// An event wired into the journeys from one file in playwright-tests/events. The event's pages are done by its UI class
// (e2e/flows/events/ui) and, where it has one, its API class (e2e/flows/events/api), written as for any other event.
// The file says who does the event, when, which class to call and what to check, and the journeys do the rest (see
// eventSteps.ts): the setting that turns it on, where it goes, when it is skipped, which settings it can't be used
// with, and running it through the API (until API_UNTIL) or the UI.

export interface EventDefinition<Answers = undefined> {
  // The CCD event ID. It is the step's name (for STOP_AFTER_TEST) and the setting that turns it on (<id>=Yes).
  id: string;
  // The test's title in the report
  title: string;
  // What it does, as the guides say, the same in both journeys or for each journey it belongs to
  description: string | Partial<Record<Journey, string>>;
  // Who does it
  user: SessionUserKey;
  // The step it comes after, in each journey it belongs to (only those journeys get it)
  after?: Partial<Record<Journey, string>>;
  // For an event that closes the claim: the states it is offered in. It goes at the end of both journeys, and runs even
  // where STOP_AT_STATE or STOP_AFTER_TEST stopped the journey.
  closesClaim?: { offeredIn: caseStates[] };
  // Facts about the claim it needs (claimFacts.ts), such as defendant1HasSolicitor. A fact only one journey has (such as
  // reachesMediation) can only be used by an event in that journey.
  onlyWhen?: Array<keyof SpecifiedClaimFacts | keyof UnspecifiedClaimFacts>;
  // What the user enters, worked out once each time the event runs, for ui, api and check to share
  answers?: (claim: JourneyConfig) => Answers;
  // Does the event in XUI with its UI class. The case page is open.
  ui: (args: { page: Page; answers: Answers; claim: JourneyConfig }) => Promise<unknown>;
  // Does the event through the CCD API with its API class, for the steps before API_UNTIL
  api?: (args: { caseId: string; user: SessionUserKey; answers: Answers; claim: JourneyConfig }) => Promise<unknown>;
  // What should happen: the state the claim moves to (it stays where it was when left out), and the business process
  // civil-service starts for the event, to wait for
  expect?: { state?: caseStates; businessProcess?: string };
  // Anything else to check once it is done, with the case data as saved. inUi says whether the UI class was used.
  check?: (args: { caseData: Record<string, any>; page: Page; inUi: boolean; answers: Answers; claim: JourneyConfig }) => Promise<void> | void;
}

// Declares an event (the default export of a file in playwright-tests/events)
export function event<Answers = undefined>(definition: EventDefinition<Answers>): EventDefinition<Answers> {
  return definition;
}
