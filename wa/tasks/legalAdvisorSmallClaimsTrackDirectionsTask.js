module.exports = {
    name: 'Legal Advisor Small Claims Track Directions',
    type: 'LegalAdvisorSmallClaimsTrackDirections',
    task_state: 'unassigned',
    task_system: 'SELF',
    security_classification: 'PUBLIC',
    task_title: 'Legal Advisor Small Claims Track Directions',
    location_name: 'Nottingham County Court and Family Court (and Crown)',
    location: '420219',
    execution_type: 'Case Management Task',
    jurisdiction: 'CIVIL',
    region: '2',
    case_type_id: 'CIVIL',
    case_category: 'Civil',
    case_name: 'Test Inc',
    auto_assigned: false,
    warnings: false,
    warning_list: { values: [] },
    case_management_category: 'Civil',
    work_type_id: 'decision_making_work',
    work_type_label: 'Decision-making work',
    permissions: {
      values: [
        'Read',
        'Own',
        'CompleteOwn',
        'CancelOwn',
        'Claim',
        'Unclaim',
        'UnclaimAssign'
      ]
    },
    description: '[Directions - Legal Adviser Small Claims Track](/cases/case-details/${[CASE_REFERENCE]}/trigger/CREATE_SDO/CREATE_SDOSmallClaims)',
    role_category: 'LEGAL_OPERATIONS',
    minor_priority: 500,
    major_priority: 5000
  };

/* {
    name: 'Legal Advisor Small Claims Track Directions',
    type: 'LegalAdvisorSmallClaimsTrackDirections',
    task_title: 'Legal Advisor Small Claims Track Directions',
    location_name: 'Nottingham County Court and Family Court (and Crown)',
    location: '420219',
    execution_type: 'Case Management Task',
    jurisdiction: 'CIVIL',
    region: '2',
    case_type_id: 'CIVIL',
    case_category: 'Civil',
    auto_assigned: false,
    case_management_category: 'Civil',
    work_type_id: 'decision_making_work',
    work_type_label: 'Decision-making work',
    permissions: { values: [ 'Read', 'Own', 'Manage', 'Cancel', 'Complete', 'Claim', 'Assign', 'Unassign' ] },
    description: '[Directions - Legal Adviser Small Claims Track](/cases/case-details/${[CASE_REFERENCE]}/trigger/CREATE_SDO/CREATE_SDOSmallClaims)',
    role_category: 'LEGAL_OPERATIONS',
    minor_priority: 500,
    major_priority: 5000
};  */
