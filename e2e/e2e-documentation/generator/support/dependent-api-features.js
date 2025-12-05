/**
 * Dependent API scenario files (relative paths using forward slashes).
 * Add file paths here when scenarios in the file must run sequentially as one journey.
 */
module.exports = [
  'e2e/tests/api_tests/automated_hearing_notice/spec_hearing_notice_scheduler_test.js',
  'e2e/tests/api_tests/automated_hearing_notice/unspec_hearing_notice_scheduler_test.js',
  'e2e/tests/api_tests/damages/api_1v1_test.js',
  'e2e/tests/api_tests/damages/api_1v2_different_solicitor_test.js',
  'e2e/tests/api_tests/damages/api_1v2_same_solicitor_test.js',
  'e2e/tests/api_tests/damages/api_2v1_test.js',
  'e2e/tests/api_tests/defaultJudgments/api_dj_1v1_test.js',
  'e2e/tests/api_tests/defaultJudgments/api_dj_1v2_test.js',
  'e2e/tests/api_tests/defaultJudgments/api_dj_2v1_test.js',
  'e2e/tests/api_tests/hearings/api_1v2_spec_fast_hearings_test.js',
  'e2e/tests/api_tests/hearings/api_1v2DS_unspec_fast_hearings_test.js'
];
