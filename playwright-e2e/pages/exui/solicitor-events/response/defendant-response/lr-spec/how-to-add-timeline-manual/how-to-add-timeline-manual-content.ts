export const heading = 'Add timeline of events (Optional)';

export const buttons = {
  addNew: {
    title: 'Add new',
    selector: '.write-collection-add-item__top',
  },
};

export const getInputs = (defendantNumber: number | undefined, eventIndex: number) => ({
  timelineEvent: {
    date: {
      label: 'Date (Optional)',
      day: {
        label: 'Day',
        selector: '#timelineDate-day',
      },
      month: {
        label: 'Month',
        selector: '#timelineDate-month',
      },
      year: {
        label: 'Year',
        selector: '#timelineDate-year',
      },
    },
    eventDescription: {
      label: 'What happened (Optional)',
      selector: `#specResponseTimelineOfEvents${defendantNumber ?? ''}_${eventIndex}_timelineDescription`,
    },
  },
});
