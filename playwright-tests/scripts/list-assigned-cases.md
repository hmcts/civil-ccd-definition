# Listing the cases the test users are assigned to

`list-assigned-cases.ts` lists the cases the legal rep users the tests use are assigned to:

| User | Username |
|---|---|
| `claimantSolicitor` | hmcts.civil+organisation.1.solicitor.1@gmail.com |
| `respondent1Solicitor` | hmcts.civil+organisation.2.solicitor.1@gmail.com |
| `respondent2Solicitor` | hmcts.civil+organisation.3.solicitor.1@gmail.com |

It covers every case type: claims (CIVIL), general applications (GENERALAPPLICATION) and any other, such as XUI's own test cases. It has been tried on AAT and previews. Demo and ITHC name their services the same way as AAT, so it should work there too, but it has not been tried. Run every command from the repository root.

## Commands

All three users, every case:

```
ENV=aat yarn list:assigned-cases
```

A preview:

```
ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8265 yarn list:assigned-cases
```

Only the users named:

```
ENV=aat yarn list:assigned-cases respondent1Solicitor respondent2Solicitor
```

Only how many cases each user has:

```
ENV=aat yarn list:assigned-cases --summary
```

Also list assignments to cases that no longer exist (see below):

```
ENV=aat yarn list:assigned-cases --missing
```

Also save one line per case to a CSV file:

```
ENV=aat yarn list:assigned-cases --csv assigned-cases.csv
```

The options can be combined, for example `--summary --csv assigned-cases.csv` prints only the counts but saves every case.

## Options

| Option | What it does |
|---|---|
| `claimantSolicitor`, `respondent1Solicitor`, `respondent2Solicitor` | Only list these users. Without any, all three are listed. |
| `--summary` | Print only how many cases each user has. |
| `--missing` | Also list assignments to cases that no longer exist. |
| `--csv <file>` | Also save the cases to a CSV file (user, username, caseId, caseType, roles, state, assignedOn). |

| Setting | What it does |
|---|---|
| `ENV` | aat, demo, ithc or preview. Required. |
| `PREVIEW_SERVICE`, `PR_NUMBER` | Needed with ENV=preview, as for a test run. |
| `ROLE_ASSIGNMENT_URL` | Use this role assignment service instead of the environment's own. |

## Output

```
Claimant Solicitor (hmcts.civil+organisation.1.solicitor.1@gmail.com): 3 case(s), 3 CIVIL, plus 0 assignment(s) to cases that no longer exist
  1792690497632057  CIVIL  [APPLICANTSOLICITORONE]  PENDING_CASE_ISSUED                  2026-10-22T17:34:59.367731Z
  1792690595065168  CIVIL  [APPLICANTSOLICITORONE]  AWAITING_RESPONDENT_ACKNOWLEDGEMENT  2026-10-22T17:36:35.662775Z
```

Each line gives the case ID, case type, the user's case role(s), the case's state and when the user was assigned, oldest first.

## How it works

- A user's assignments are their case roles in the role assignment service. Every environment has one; a preview has its own (`am-role-assignment-civil-<service>-pr-<number>.preview.platform.hmcts.net`).
- Each case's state is then read from CCD: through its search where the environment has one, or one case at a time on a preview, which has no search.
- The role assignment service keeps assignments to cases CCD has since deleted. Those are counted as "assignments to cases that no longer exist" and only listed with `--missing`, showing `NO LONGER EXISTS` in place of a state. On AAT there are thousands of these.

A full run on AAT takes about 2 minutes, as the users are assigned to thousands of cases. To unassign the users from a case, see [unassign-case-users.md](unassign-case-users.md).
