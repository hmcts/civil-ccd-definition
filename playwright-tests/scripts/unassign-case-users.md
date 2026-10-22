# Unassigning the test users from a case

`unassign-case-users.ts` unassigns the legal rep users the tests use from one case, whatever case roles they hold on it:

| User | Username |
|---|---|
| Claimant Solicitor | hmcts.civil+organisation.1.solicitor.1@gmail.com |
| Respondent1 Solicitor | hmcts.civil+organisation.2.solicitor.1@gmail.com |
| Respondent2 Solicitor | hmcts.civil+organisation.3.solicitor.1@gmail.com |

Use it to tidy up a case kept with KEEP_CASE_ASSIGNMENTS=Yes once you have finished with it, or one left assigned by a run that was stopped before its teardown. It has been tried on AAT and previews. Demo and ITHC name their services the same way as AAT, so it should work there too, but it has not been tried. Run every command from the repository root.

## Commands

Unassign the test users from a case:

```
ENV=aat yarn unassign:case-users 1792691185763774
```

A preview:

```
ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8265 yarn unassign:case-users 1792690738562907
```

Only show who is assigned, changing nothing:

```
ENV=aat yarn unassign:case-users 1792691185763774 --dry-run
```

The case reference can be given with or without dashes (1792-6911-8576-3774).

## Options

| Option | What it does |
|---|---|
| `<case reference>` | The 16 digit case reference. Required. |
| `--dry-run` | Only show who is assigned to the case. Nothing is unassigned and no records are removed. |

| Setting | What it does |
|---|---|
| `ENV` | aat, demo, ithc or preview. Required. |
| `PREVIEW_SERVICE`, `PR_NUMBER` | Needed with ENV=preview, as for a test run. |
| `ROLE_ASSIGNMENT_URL` | Use this role assignment service instead of the environment's own. |

## Output

```
Claimant Solicitor (hmcts.civil+organisation.1.solicitor.1@gmail.com) is assigned to case 1792691185763774 as [APPLICANTSOLICITORONE]
Respondent1 Solicitor (hmcts.civil+organisation.2.solicitor.1@gmail.com) is assigned to case 1792691185763774 as [RESPONDENTSOLICITORONE]
Respondent2 Solicitor (hmcts.civil+organisation.3.solicitor.1@gmail.com) is assigned to case 1792691185763774 as [RESPONDENTSOLICITORTWO]
Claimant Solicitor unassigned from cases [1792691185763774]
Respondent1 Solicitor unassigned from cases [1792691185763774]
Respondent2 Solicitor unassigned from cases [1792691185763774]
All test users unassigned from case 1792691185763774
```

Run again on the same case, it reports `None of the test users is assigned to case 1792691185763774`.

## How it works

1. The case's roles are read from the role assignment service. Every environment has one; a preview has its own (`am-role-assignment-civil-<service>-pr-<number>.preview.platform.hmcts.net`).
2. Each test user with a role on the case is unassigned through civil-service's testing support (`/testing-support/unassign-user`), as the run teardown does. The role assignment service is then checked again to make sure their roles have gone.
3. Anyone else with a role on the case, such as a citizen or a solicitor who is not a test user, is listed but left assigned: a user can only be unassigned with their own login.
4. Any record of the case under playwright-tests/e2e/.cases, left for a later run's teardown to unassign, is removed, so the teardown does not try again. This is done even when none of the test users was assigned. Records of a run still in progress are left alone.

If a user cannot be unassigned the script says so, keeps that user's record for the teardown to retry, and ends with an error.

To see which cases the test users are assigned to, see [list-assigned-cases.md](list-assigned-cases.md).
