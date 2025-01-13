import { Party } from '../../../../../../../models/partys';

export const heading = 'Add timeline of events (Optional)';

export const buttons = {
  addNew: {
    title: 'Add new',
    selector: '.write-collection-add-item__top',
  },
};

export const inputs = {
  timelineEvent: {
    date: {
      label: 'Date (Optional)',
    },
    eventDescription: {
      label: 'What happened (Optional)',
      selector: (party: Party, eventIndex: number) =>
        `#specResponseTimelineOfEvents${party.number === 1 ? '' : party.number}_${eventIndex}_timelineDescription`,
    },
  },
};
