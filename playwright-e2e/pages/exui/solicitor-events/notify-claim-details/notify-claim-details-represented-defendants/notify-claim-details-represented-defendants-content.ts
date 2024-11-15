export const heading = 'Notify claim details';

export const subheadings = {
  uploadDocuments: 'Upload documents',
  partiularsOfClaim: 'Particulars of claim (Optional)',
  medicalReports: 'Medical reports',
  scheduleOfLoss: 'Schedule os loss',
  certificateOfSuitability: 'Certificate of sutiability',
};

export const inputs = {
  uploadPartiularsOfClaim: {
    title: 'Choose file',
    selector: 'servedDocumentFiles_particularsOfClaimDocument_value',
  },
  uploadMedicalReports: {
    title: 'Choose file',
    selector: 'servedDocumentFiles_medicalReport_0_document',
  },
  uploadScheduleOfLoss: {
    title: 'Choose file',
    selector: 'servedDocumentFiles_scheduleOfLoss_0_document',
  },
  uploadCertificateOfSuitability: {
    title: 'Choose file',
    selector: 'servedDocumentFiles_certificateOfSuitability_0_document',
  },
};

export const buttons = {
  addPartiularsOfClaim: {
    title: 'Add new',
    selector: "div[id='servedDocumentFiles_particularsOfClaimDocument\"'] button[type='button']",
  },
  addMedicalReports: {
    title: 'Add new',
    selector: "div[id='servedDocumentFiles_medicalReport'] button[type='button']",
  },
  addScheduleOfLoss: {
    title: 'Add new',
    selector: "div[id='servedDocumentFiles_scheduleOfLoss'] button[type='button']",
  },
  addCertificateOfSuitability: {
    title: 'Add new',
    selector: "div[id='servedDocumentFiles_certificateOfSuitability'] button[type='button']",
  },
  continue: {
    title: 'Continue',
    selector: "button[type='submit']",
  },
};
