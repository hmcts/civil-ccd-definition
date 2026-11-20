import { sessionUsers, SessionUserKey } from '../../helpers/SessionHelper.ts';
import { unspecifiedSessionUsers } from './unspecified/unspecifiedUsers.ts';
import { specifiedSessionUsers } from './specified/specifiedUsers.ts';

// The saved session users the run needs, which preflight checks and the authentication setup signs in: everyone who
// runs a step in any of the run's unspecified or specified scenarios. The claimant and Defendant 1 solicitors are
// always included.
export function sessionUsersForRun(): SessionUserKey[] {
  const users = new Set<SessionUserKey>(['claimantSolicitor', 'respondent1Solicitor', ...unspecifiedSessionUsers(), ...specifiedSessionUsers()]);
  return (Object.keys(sessionUsers) as SessionUserKey[]).filter((key) => users.has(key));
}
