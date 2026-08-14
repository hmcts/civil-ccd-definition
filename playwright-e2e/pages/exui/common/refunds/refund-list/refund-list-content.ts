export const headings = {
  refundList: 'Refund list',
  reviewRefundDetails: 'Review refund details',
};

export const subheadings = {
  refundsToBeApproved: 'Refunds to be approved',
  refundsReturnedToCaseworker: 'Refunds returned to caseworker',
};

export const sortHeaders = {
  lastUpdated: 'mat-header-cell.cdk-column-date_updated [role="button"]',
};

export const containers = {
  caseRow: {
    selector: (caseId: string) => `mat-row:has-text("${caseId}")`,
  },
};

export const links = {
  processRefund: {
    title: 'Process refund',
    selector: 'a:has-text("Process refund")',
  },
  reviewRefund: {
    title: 'Review refund',
    selector: 'a:has-text("Review refund")',
  },
};
