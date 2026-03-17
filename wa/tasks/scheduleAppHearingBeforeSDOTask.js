module.exports = {
  name: 'Application Hearing Scheduled',
  type: 'ScheduleApplicationHearing',
  task_title: 'Application Hearing Scheduled',
  location_name: 'County Court Money Claims Centre',
  location: '192280',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '4',
  case_type_id: 'GENERALAPPLICATION',
  case_category: 'Civil',
  auto_assigned: false,
  case_management_category: 'Civil',
  work_type_id: 'hearing_work',
  work_type_label: 'Hearing work',
  permissions: {values: ['Read', 'Own', 'CompleteOwn', 'CancelOwn', 'Claim', 'Unclaim', 'UnclaimAssign']},
  description: '[ScheduleApplicationHearing](/cases/case-details/${[CASE_REFERENCE]}/trigger/HEARING_SCHEDULED_GA/HEARING_SCHEDULED_GAHearingNoticeGADetail)',
  role_category: 'ADMIN'
};
