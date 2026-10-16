import CaseState from '../constants/cases/case-state';

export default interface GaCCDCaseData {
  id?: number;
  state?: CaseState;
  gaAddlDoc?: SystemGeneratedCaseDocument[];
  isMultiParty?: string;
  locationName?: string;
  gaAddlDocStaff?: SystemGeneratedCaseDocument[];
  gaWaTrackLabel?: string;
  generalAppType?: GeneralAppType;
  businessProcess?: BusinessProcess;
  isCcmccLocation?: string;
  applicationTypes?: string;
  isGaApplicantLip?: string;
  gaAddlDocClaimant?: SystemGeneratedCaseDocument[];
  isDocumentVisible?: string;
  CaseAccessCategory?: string;
  applicantPartyName?: string;
  caseNameGaInternal?: string;
  claimant1PartyName?: string;
  defendant1PartyName?: string;
  defendant2PartyName?: string;
  emailPartyReference?: string;
  parentCaseReference?: string;
  generalAppPBADetails?: GeneralAppPBADetails;
  isGaRespondentOneLip?: string;
  isGaRespondentTwoLip?: string;
  civilServiceUserRoles?: ApplicantSolicitor1UserDetails;
  generalAppHearingDate?: GeneralAppHearingDate;
  mainCaseSubmittedDate?: string;
  caseManagementCategory?: CaseManagementCategory;
  caseManagementLocation?: CaseManagementLocation;
  gaApplicantDisplayName?: string;
  generalAppApplnSolicitor?: GeneralAppSolicitor;
  generalAppDetailsOfOrder?: string;
  generalAppHearingDetails?: GeneralAppHearingDetails;
  generalAppParentCaseLink?: CaseLink;
  generalAppReasonsOfOrder?: string;
  generalAppSuperClaimType?: string;
  parentClaimantIsApplicant?: string;
  generalAppInformOtherParty?: GeneralAppInformOtherParty;
  generalAppStatementOfTruth?: ClaimStatementOfTruth;
  applicant1OrganisationPolicy?: OrganisationPolicy;
  respondent1OrganisationPolicy?: OrganisationPolicy;
  respondent2OrganisationPolicy?: OrganisationPolicy;
  generalAppUrgencyRequirement?: GeneralAppUrgencyRequirement;
  generalAppRespondentAgreement?: GeneralAppRespondentAgreement;
  generalAppSubmittedDateGAspec?: string;
  generalAppRespondentSolicitors?: GeneralAppRespondentSolicitor[];
  generalAppNotificationDeadlineDate?: string;
  applicant1?: ClaimantDefendant;
  respondent1?: ClaimantDefendant;
  respondent2?: ClaimantDefendant;
}

export interface GeneralAppPBADetails {
  fee?: ClaimFee;
  serviceRequestReference?: string;
  generalAppFeeToPayInText?: string;
}

export interface GeneralAppSolicitor extends ApplicantSolicitor1UserDetails {
  surname?: string;
  forename?: string;
  organisationIdentifier?: string;
}

export interface GeneralAppRespondentSolicitor {
  id?: string;
  value?: GeneralAppSolicitor;
}

export interface SystemGeneratedCaseDocument {
  id?: string;
  value?: SystemGeneratedCaseDocumentValue;
}

export interface SystemGeneratedCaseDocumentValue {
  createdBy?: string;
  documentLink?: UploadDocumentValue;
  documentName?: string;
  documentSize?: number;
  documentType?: string;
  createdDatetime?: string;
}

export interface UploadDocumentValue {
  category_id?: string;
  document_url?: string;
  upload_timestamp?: string;
  document_filename?: string;
  document_binary_url?: string;
}

export interface GeneralAppType {
  types?: string[];
}

export interface BusinessProcess {
  status?: string;
  camundaEvent?: string;
  processInstanceId?: string;
  readyOn?: string;
}

export interface ClaimFee {
  code?: string;
  version?: number | string;
  calculatedAmountInPence?: number | string;
}

export interface ApplicantSolicitor1UserDetails {
  id?: string;
  email?: string;
}

export interface GeneralAppHearingDate {
  hearingScheduledPreferenceYesNo?: string;
  hearingScheduledDate?: string;
}

export interface CaseManagementCategory {
  value?: CaseManagementCategoryValue;
  list_items?: CaseManagementCategoryListItem[];
}

export interface CaseManagementCategoryValue {
  code?: string;
  label?: string;
}

export interface CaseManagementCategoryListItem {
  id?: string;
  value?: CaseManagementCategoryValue;
}

export interface CaseManagementLocation {
  region?: number | string;
  baseLocation?: number | string;
  address?: string;
  postcode?: string;
  siteName?: string;
}

export interface GeneralAppHearingDetails {
  hearingYesorNo?: string;
  hearingDate?: string;
  trialRequiredYesOrNo?: string;
  trialDateFrom?: string;
  trailDateTo?: string;
  HearingPreferencesPreferredType?: string;
  ReasonForPreferredHearingType?: string;
  HearingPreferredLocation?: CourtLocationList;
  HearingDetailsTelephoneNumber?: string;
  HearingDetailsEmailID?: string;
  HearingDuration?: string;
  generalAppUnavailableDates?: GeneralAppUnavailableDate[];
  vulnerabilityQuestionsYesOrNo?: string;
  vulnerabilityQuestion?: string;
  SupportRequirement?: string[];
  SupportRequirementLanguageInterpreter?: string;
  SupportRequirementOther?: string;
  SupportRequirementSignLanguage?: string;
}

export interface CourtLocationList {
  value?: CaseManagementCategoryValue;
  list_items?: CaseManagementCategoryValue[];
}

export interface GeneralAppUnavailableDate {
  id?: string;
  value?: GeneralAppUnavailableDateValue;
}

export interface GeneralAppUnavailableDateValue {
  unavailableTrialDateFrom?: string;
  unavailableTrialDateTo?: string;
}

export interface CaseLink {
  CaseReference?: string;
}

export interface GeneralAppInformOtherParty {
  isWithNotice?: string;
  reasonsForWithoutNotice?: string;
}

export interface ClaimStatementOfTruth {
  name?: string;
  role?: string;
}

export interface OrganisationPolicy {
  Organisation?: Organisation;
  OrgPolicyReference?: string;
  OrgPolicyCaseAssignedRole?: string;
}

export interface Organisation {
  OrganisationID?: string;
}

export interface GeneralAppUrgencyRequirement {
  generalAppUrgency?: string;
  reasonsForUrgency?: string;
  urgentAppConsiderationDate?: string;
}

export interface GeneralAppRespondentAgreement {
  hasAgreed?: string;
}

export interface ClaimantDefendant {
  type?: string;
  flags?: CaseFlags;
  partyID?: string;
  partyName?: string;
  partyEmail?: string;
  partyPhone?: string;
  companyName?: string;
  primaryAddress?: Address;
  individualTitle?: string;
  individualLastName?: string;
  individualFirstName?: string;
  individualDateOfBirth?: string;
  partyTypeDisplayValue?: string;
}

export interface CaseFlags {
  partyName?: string;
  roleOnCase?: string;
}

export interface Address {
  County?: string;
  Country?: string;
  PostCode?: string;
  PostTown?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  AddressLine3?: string;
}
