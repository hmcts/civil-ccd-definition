export default interface CCDCaseData {
  id?: number;
  respondent1PaymentDateToStringSpec?: string;
  respondent1ClaimResponseTypeForSpec?: string;
  respondent1DQRemoteHearingLRspec?: DQRemoteHearing;
  addRespondent2?: string;
  submittedDate?: string;
  solicitorReferences?: SolicitorReferences;
  featureToggleWA?: string;
  respondent1OrgRegistered?: string;
  applicantSolicitor1UserDetails?: ApplicantSolicitor1UserDetails;
  applicantSolicitor1PbaAccounts?: ApplicantSolicitor1PbaAccounts;
  detailsOfClaim?: string;
  claimFee?: ClaimFee;
  respondent1Experts?: Expert[];
  respondent1DQVulnerabilityQuestions?: DQVulnerabilityQuestions;
  respondent1DQHearingSupport?: DQHearingSupport;
  respondent1DQHearing?: DQHearing;
  respondent1DQFixedRecoverableCosts?: DQFixedRecoverableCosts;
  respondent1DQLanguage?: DQLanguage;
  respondent1DQRemoteHearing?: DQRemoteHearing;
  applicantWitnesses?: Witnesses[];
  caseManagementLocation?: CaseManagementLocation;
  caseManagementCategory?: CaseManagementCategory;
  respondent1ResponseDate?: string;
  applicantSolicitor1PbaAccountsIsEmpty?: string;
  CaseAccessCategory?: string;
  multiPartyResponseTypeFlags?: string;
  applicant1?: Party;
  issueDate?: string;
  duplicateSystemGeneratedCaseDocs?: SystemGeneratedCaseDocument[];
  respondent2OrganisationPolicy?: OrganisationPolicy;
  locationName?: string;
  claimNotificationDate?: string;
  applicant1ResponseDate?: string;
  legacyCaseReference?: string;
  respondent1Represented?: string;
  applicant1OrganisationPolicy?: OrganisationPolicy;
  respondent1?: Party;
  respondent1DQExperts?: DQExperts;
  specAoSRespondentCorrespondenceAddressRequired?: string;
  applicantDefenceResponseDocumentAndDQFlag?: string;
  specRespondent1Represented?: string;
  respondent1ResponseDeadline?: string;
  specPaidLessAmountOrDisputesOrPartAdmission?: string;
  specFullDefenceOrPartAdmission?: string;
  respondentClaimResponseTypeForSpecGeneric?: string;
  respondent1ClaimResponsePaymentAdmissionForSpec?: string;
  showCarmFields?: string;
  specAoSApplicantCorrespondenceAddressRequired?: string;
  applicant1DQRemoteHearingLRspec?: DQRemoteHearing;
  applicantSolicitor1ClaimStatementOfTruth?: ClaimStatementOfTruth;
  responseClaimCourtLocationRequired?: string;
  paymentTypePBASpec?: string;
  applicant1DQHearingSupport?: DQHearingSupport;
  claimNotificationDeadline?: string;
  specDefenceFullAdmittedRequired?: string;
  responseClaimTrack?: string;
  caseNamePublic?: string;
  claimIssuedPaymentDetails?: ClaimIssuedPaymentDetails;
  applicant1ProceedWithClaim?: string;
  specApplicantCorrespondenceAddressRequired?: string;
  totalClaimAmount?: number;
  applicant1ClaimMediationSpecRequired?: ClaimMediationSpecRequired;
  defenceRouteRequired?: string;
  applicant1DQLanguage?: DQLanguage;
  applicant1DQVulnerabilityQuestions?: DQVulnerabilityQuestions;
  respondent1DQHearingSmallClaim?: DQHearing;
  specFullDefenceOrPartAdmission1V1?: string;
  systemGeneratedCaseDocuments?: SystemGeneratedCaseDocument[];
  showResponseOneVOneFlag?: string;
  specFullAdmissionOrPartAdmission?: string;
  applicant1DQWitnessesSmallClaim?: DQWitnesses;
  applicant1DQExperts?: DQExperts;
  respondent1DQWitnessesSmallClaim?: DQWitness;
  urgentFlag?: string;
  responseClaimMediationSpecRequired?: string;
  respondent1DQWitnesses?: DQWitnesses;
  respondent1DQDisclosureReport?: DQDisclosureReport;
  allPartyNames?: string;
  applicant1DQDisclosureOfNonElectronicDocuments?: DQDisclosureOfNonElectronicDocuments;
  servedDocumentFiles?: ServedDocumentFiles;
  claimType?: string;
  defendantResponseDocuments?: SystemGeneratedCaseDocument[];
  duplicateClaimantDefResponseDocs?: SystemGeneratedCaseDocument[];
  unassignedCaseListDisplayOrganisationReferences?: string;
  applicant1LitigationFriendRequired?: string;
  defendant1LIPAtClaimIssued?: string;
  defendantSolicitorNotifyClaimDetailsOptions?: NotifyClaimDetailsOptions;
  claimDetailsNotificationDate?: string;
  applicant1DQFileDirectionsQuestionnaire?: DQFileDirectionsQuestionnaire;
  claimDetailsNotificationDeadline?: string;
  respondent1DQFurtherInformation?: DQFurtherInformation;
  claimantResponseDocuments?: SystemGeneratedCaseDocument[];
  paymentTypePBA?: string;
  claimTypeUnSpec?: string;
  courtLocation?: CourtLocation;
  caseListDisplayDefendantSolicitorReferences?: string;
  claimValue?: ClaimValue;
  respondent1ClaimResponseIntentionType?: string;
  respondent2ClaimResponseIntentionType?: string;
  respondent1AcknowledgeNotificationDate?: string;
  respondent2AcknowledgeNotificationDate?: string;
}

interface ServedDocumentFiles {
  particularsOfClaimDocument?: ParticularsOfClaimDocument[];
}

interface SolicitorReferences {
  applicantSolicitor1Reference?: string;
  respondentSolicitor1Reference?: string;
}

interface ParticularsOfClaimDocument {
  id?: string;
  value?: ParticularsOfClaimDocumentValue;
}

interface ApplicantSolicitor1PbaAccounts {
  value?: ApplicantSolicitor1PbaAccountsValue;
  list_items?: ApplicantSolicitor1PbaAccountsListItem[];
}

interface ApplicantSolicitor1PbaAccountsValue {
  code?: string;
  label?: string;
}

interface ApplicantSolicitor1PbaAccountsListItem {
  code?: string;
  label?: string;
}

interface ClaimStatementOfTruth {
  name?: string;
  role?: string;
}

interface ClaimIssuedPaymentDetails {
  status?: string;
  reference?: string;
  customerReference?: string;
}

interface ClaimValue {
  statementOfValueInPennies?: string;
}

interface ClaimMediationSpecRequired {
  hasAgreedFreeMediation?: string;
}

interface NotifyClaimDetailsOptions {
  value?: NotifyClaimDetailsOptionsValue;
}

interface NotifyClaimDetailsOptionsValue {
  code?: string;
  label?: string;
}

interface Expert {
  id?: string;
  value?: ExpertValue;
}

interface ExpertValue {
  email?: string;
  flags?: CaseFlags;
  phone?: string;
  partyID?: string;
  lastName?: string;
  firstName?: string;
}

interface Witnesses {
  id?: string;
  value?: Witness;
}

interface Witness {
  email?: string;
  flags?: CaseFlags;
  phone?: string;
  partyID?: string;
  lastName?: string;
  firstName?: string;
}

interface Party {
  type?: string;
  flags?: CaseFlags;
  partyID?: string;
  partyName?: string;
  partyEmail?: string;
  companyName?: string;
  primaryAddress?: PrimaryAddress;
  individualTitle?: string;
  individualLastName?: string;
  individualFirstName?: string;
  partyTypeDisplayValue?: string;
}

interface ParticularsOfClaimDocumentValue {
  category_id?: string;
  document_url?: string;
  upload_timestamp?: string;
  document_filename?: string;
  document_binary_url?: string;
}

interface ApplicantSolicitor1UserDetails {
  email?: string;
}

interface SystemGeneratedCaseDocument {
  id?: string;
  value?: SystemGeneratedCaseDocumentValue;
}

interface SystemGeneratedCaseDocumentValue {
  createdBy?: string;
  documentLink?: SystemGeneratedDocumentDocumentLink;
  documentName?: string;
  documentSize?: number;
  documentType?: string;
  createdDatetime?: string;
}

interface SystemGeneratedDocumentDocumentLink {
  category_id?: string;
  document_url?: string;
  upload_timestamp?: string;
  document_filename?: string;
  document_binary_url?: string;
}

interface OrganisationPolicy {
  Organisation?: Organisation;
  OrgPolicyReference?: string;
  OrgPolicyCaseAssignedRole?: string;
}

interface Organisation {
  OrganisationID?: string;
}

interface ClaimFee {
  code?: string;
  version?: number;
  calculatedAmountInPence?: number;
}

interface CaseManagementLocation {
  region?: number;
  baseLocation?: number;
}

interface CaseManagementCategory {
  value?: CaseManagementCategoryValue;
  list_items?: CaseManagementCategoryListItem[];
}

interface CaseManagementCategoryValue {
  code?: string;
  label?: string;
}

interface CaseManagementCategoryListItem {
  id?: string;
  value?: CaseManagementCategoryListItemValue;
}

interface CaseManagementCategoryListItemValue {
  code?: string;
  label?: string;
}

interface HearingAttendee {
  id?: string;
  value?: HearingAttendeeValue;
}

interface HearingAttendeeValue {
  email?: string;
  flags?: CaseFlags;
  phone?: string;
  partyID?: string;
  lastName?: string;
  firstName?: string;
}

interface CaseFlags {
  details?: CaseFlagsDetails[];
  partyName?: string;
  roleOnCase?: string;
}

interface CaseFlagsDetails {
  id?: string;
  value?: CaseFlagsDetailsValue;
}

interface CaseFlagsDetailsValue {
  name?: string;
  path?: CaseFlagsDetailsValuePath[];
  status?: string;
  flagCode?: string;
  flagComment?: string;
  dateTimeCreated?: string;
  hearingRelevant?: string;
}

interface CaseFlagsDetailsValuePath {
  id?: string;
  value?: string;
}

interface PrimaryAddress {
  County?: string;
  Country?: string;
  PostCode?: string;
  PostTown?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  AddressLine3?: string;
}

interface DQExperts {
  details?: DQExpertsDetails[];
  expertRequired?: string;
  expertReportsSent?: string;
  jointExpertSuitable?: string;
}

interface DQExpertsDetails {
  id?: string;
  value?: DQExpertsDetailsValue;
}

interface DQExpertsDetailsValue {
  partyID?: string;
  lastName?: string;
  dateAdded?: string;
  firstName?: string;
  eventAdded?: string;
  phoneNumber?: string;
  whyRequired?: string;
  emailAddress?: string;
  estimatedCost?: string;
  fieldOfExpertise?: string;
}

interface DQHearingSupport {
  supportRequirements?: string;
  supportRequirementsAdditional?: string;
}

interface DQVulnerabilityQuestions {
  vulnerabilityAdjustments?: string;
  vulnerabilityAdjustmentsRequired?: string;
}

interface DQWitnesses {
  details?: DQWitness[];
  witnessesToAppear?: string;
}

interface DQWitness {
  id?: string;
  value?: {
    partyID?: string;
    lastName?: string;
    dateAdded?: string;
    firstName?: string;
    eventAdded?: string;
    phoneNumber?: string;
    emailAddress?: string;
    reasonForWitness?: string;
  };
}

interface DQHearing {
  unavailableDates?: DQHearingUnavailableDate[];
  unavailableDatesRequired?: string;
}

interface DQHearingUnavailableDate {
  id?: string;
  value?: DQHearingUnavailableDateValue;
}

interface DQHearingUnavailableDateValue {
  date?: string;
  unavailableDateType?: string;
  toDate?: string;
  fromDate?: string;
}

interface DQFixedRecoverableCosts {
  band?: string;
  reasons?: string;
  complexityBandingAgreed?: string;
  isSubjectToFixedRecoverableCostRegime?: string;
}

interface DQLanguage {
  court?: string;
  documents?: string;
}

interface DQRemoteHearing {
  reasonForRemoteHearing?: string;
  remoteHearingRequested?: string;
}

interface DQDisclosureReport {
  disclosureProposalAgreed?: string;
  disclosureFormFiledAndServed?: string;
}

interface DQDisclosureOfNonElectronicDocuments {
  bespokeDirections?: string;
  standardDirectionsRequired?: string;
  directionsForDisclosureProposed?: string;
}

interface DQFileDirectionsQuestionnaire {
  explainedToClient?: string[];
  oneMonthStayRequested?: string;
  reactionProtocolCompliedWith?: string;
}

interface DQFurtherInformation {
  futureApplications?: string;
  otherInformationForJudge?: string;
  reasonForFutureApplications?: string;
}

interface CourtLocation {
  caseLocation?: CaseManagementLocation;
  applicantPreferredCourt?: string;
}
