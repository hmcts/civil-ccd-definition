module.exports = {
    name: 'Schedule a Disposal Hearing - HMC',
    type: 'ScheduleHMCHearing',
    task_state: 'unassigned',
    task_system: 'SELF',
    security_classification: 'PUBLIC',
    task_title: 'Schedule a Disposal Hearing - HMC',
    location_name: 'Central London County Court',
    location: '20262',
    execution_type: 'Case Management Task',
    jurisdiction: 'CIVIL',
    region: '1',
    case_type_id: 'CIVIL' + (process.env.CCD_DEF_VERSION || ''),
    case_category: 'Civil',
    case_name: 'Test Inc',
    auto_assigned: false,
    warnings: false,
    warning_list: { values: [] },
    case_management_category: 'Civil',
    work_type_id: 'hearing_work',
    work_type_label: 'Hearing work',
    permissions: {
      values: [
        'Read',          'Own',
        'Manage',        'Cancel',
        'CompleteOwn',   'CancelOwn',
        'Claim',         'Unclaim',
        'Assign',        'Unassign',
        'UnclaimAssign'
      ]
    },
    description: '[Hearings (HMC)](/cases/case-details/${[CASE_REFERENCE]}/hearings)',
    role_category: 'ADMIN',
    minor_priority: 500,
    major_priority: 5000
  };
