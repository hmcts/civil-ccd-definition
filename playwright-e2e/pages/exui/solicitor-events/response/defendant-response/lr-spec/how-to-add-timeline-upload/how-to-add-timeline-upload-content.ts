export const heading = 'Upload claim timeline template';

export const getInputs = (defendantNumber?: number) => ({
  upload: {
    label: 'Upload files',
    selector: `#specResponseTimelineDocumentFiles${defendantNumber ?? ''}`,
  },
});
