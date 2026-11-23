import { expect } from '@playwright/test';
import { event } from '../e2e/journey/event.ts';
import { AddOrAmendClaimDocuments } from '../e2e/flows/events/ui/AddOrAmendClaimDocuments.ts';
import { AddOrAmendClaimDocuments as AddOrAmendClaimDocumentsApi } from '../e2e/flows/events/api/AddOrAmendClaimDocuments.ts';

// The claimant's solicitor uploads the particulars of claim with "Add or amend claim documents" once the claim is
// issued, which Notify claim details then serves instead of asking for them
export default event({
  id: 'ADD_OR_AMEND_CLAIM_DOCUMENTS',
  title: 'Claimant Solicitor uploads the particulars of claim.',
  description: 'Optional event: once the claim is issued, the claimant\'s solicitor uploads the particulars of claim with "Add or amend claim documents", which is only offered until the claim details are notified. The test checks they were saved. Notify claim details then serves them instead of asking for them again. Has an API version.',
  user: 'claimantSolicitor',
  after: { UNSPECIFIED: 'CREATE_CLAIM' },
  ui: ({ page }) => new AddOrAmendClaimDocuments(page).submit(),
  api: ({ caseId }) => new AddOrAmendClaimDocumentsApi().submit(caseId),
  check: ({ caseData }) => {
    expect(caseData.servedDocumentFiles?.particularsOfClaimDocument ?? [], 'The particulars of claim were not saved').toHaveLength(1);
  },
});
