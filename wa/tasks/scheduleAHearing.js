module.exports = {
    name: 'Schedule A Hearing',
    type: 'ScheduleAHearing',
    task_state: 'unassigned',
    task_system: 'SELF',
    security_classification: 'PUBLIC',
    task_title: 'Schedule A Hearing',
    location_name: 'Nottingham County Court and Family Court (and Crown)',
    location: '424213',
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
    description: '[Directions - Schedule A Hearing](/cases/case-details/${[CASE_REFERENCE]}/trigger/HEARING_SCHEDULED/HEARING_SCHEDULEDHearingNoticeSelect)',
    role_category: 'ADMIN',
    minor_priority: 500,
    major_priority: 5000
  }