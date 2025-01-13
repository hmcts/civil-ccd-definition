export const subheadings = {
  howToAddTimeline: 'How do you want to add the claim timeline?',
};

export const getRadioButtons = (defendantNumber?: number) => ({
  upload: {
    label: 'Upload claim timeline template',
    selector: `#specClaimResponseTimelineList${defendantNumber ?? ''}-UPLOAD`,
  },
  manual: {
    label: 'Add manually',
    selector: `#specClaimResponseTimelineList${defendantNumber ?? ''}-MANUAL`,
  },
});
