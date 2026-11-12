# Events missing from playwright-tests

The events in the Next step drop-down that playwright-e2e's tests run and playwright-tests does not. Found by checking
every event ID in the CCD definition against both frameworks, checking that a playwright-e2e test calls the step that
submits the event, and keeping only events a professional or staff user picks from Next step in XUI.
Compared on 2026-11-12.

The comparison is by event name, not by how much of each event is covered: an event both run may be run with more
combinations of answers in playwright-e2e. `MANAGE_DOCUMENTS` (Manage Documents) is not listed: playwright-e2e has a step
for it, but no test calls that step.

## Done since

- `ADD_DEFENDANT_LITIGATION_FRIEND`: DEFENDANT_LITIGATION_FRIEND=Yes (UI + API), passed AAT 1v2SS UI, 1v2DS API and 1v2DS UI on 2026-11-06
- `ADD_UNAVAILABLE_DATES`: ADD_UNAVAILABLE_DATES=Yes (UI + API, both journeys), passed AAT unspec 1v2DS UI and spec 1v2SS small claim API on 2026-11-06
- `CASE_PROCEEDS_IN_CASEMAN` (Case proceeds in Caseman): CASE_PROCEEDS_IN_CASEMAN=<reason> (UI + API, both journeys), passed AAT unspec 1v1 UI and API and spec 1v1 UI and API on 2026-11-12

## Events

### Judgments online

| Next step | Event ID | Who | Notes |
| --- | --- | --- | --- |
| Record Judgment | `RECORD_JUDGMENT` | Caseworker | |
| Edit Judgment | `EDIT_JUDGMENT` | Caseworker | |
| Set aside judgment | `SET_ASIDE_JUDGMENT` | Hearing centre admin, caseworker | Following an application, a defence received, or made in error |
| Mark judgment as paid in full | `JUDGMENT_PAID_IN_FULL` | Claimant solicitor (spec) | |
| Refer to judge-defended claim | `REFER_JUDGE_DEFENCE_RECEIVED` | Hearing centre admin, caseworker | A defence turns up after default judgment |

### Case management

| Next step | Event ID | Who | Notes |
| --- | --- | --- | --- |
| Not suitable for SDO | `NotSuitable_SDO` | Judge | Change location, other reason, small claims transfer |
| Transfer online case | `TRANSFER_ONLINE_CASE` | Hearing centre admin, caseworker | |
| Dismiss case | `DISMISS_CASE` | Hearing centre admin | |
| Send and reply to messages | `SEND_AND_REPLY` | Hearing centre admin, WLU admin, judge | Messages between staff and judges |
| Amend party details | `AMEND_PARTY_DETAILS` | Hearing centre admin | |

### Solicitor events

| Next step | Event ID | Who | Notes |
| --- | --- | --- | --- |
| Add or amend claim documents | `ADD_OR_AMEND_CLAIM_DOCUMENTS` | Claimant solicitor (unspec) | |
| Upload mediation documents | `UPLOAD_MEDIATION_DOCUMENTS` | Claimant and defendant solicitors (spec small claims) | 1v1, 2v1, defendant 1 and defendant 2 |

### General applications

| Next step | Event ID | Who | Notes |
| --- | --- | --- | --- |
| Schedule hearing | `HEARING_SCHEDULED_GA` | Hearing centre admin | |
| Respond to judges addn info | `RESPOND_TO_JUDGE_ADDITIONAL_INFO` | Defendant solicitor 1 | After the judge asks for more information |

### Not Next step events

playwright-e2e also submits these through the citizen UI's API. Citizens make them in the citizen UI, so they are not in
the Next step drop-down: `CREATE_LIP_CLAIM`, `DEFENDANT_RESPONSE_CUI`, `CLAIMANT_RESPONSE_CUI`. playwright-tests only has
LiPs as defendants, where solicitor-side events act for them.

## Features

| Feature | playwright-e2e tests | playwright-tests |
| --- | --- | --- |
| Dispute resolution hearing (small claims SDO with a DRH) | `api-tests/drh` (unspec and spec) | None |
| Automated hearing notice scheduler (HMC) | `api-tests/hearings`: 4 scheduler tests, including the duplicate defendant ones | None |
| Flight delay | `api-tests/flight-delay`, `ui-tests/flight-delay` | Partly: `AIRLINE_CLAIM` on create claim only |
| Case offline | `api-tests/case-offline` | Done: CASE_PROCEEDS_IN_CASEMAN |

## Suggested order

1. Judgments online (`RECORD_JUDGMENT`, `EDIT_JUDGMENT`, `SET_ASIDE_JUDGMENT`, `JUDGMENT_PAID_IN_FULL`,
   `REFER_JUDGE_DEFENCE_RECEIVED`), as they go together
2. Not suitable for SDO (`NotSuitable_SDO`)
3. `UPLOAD_MEDIATION_DOCUMENTS`
4. Dispute resolution hearing
5. The rest
