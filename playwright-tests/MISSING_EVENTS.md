# Events missing from playwright-tests

The events in the Next step drop-down that playwright-e2e's tests run and playwright-tests does not. Found by checking
every event ID in the CCD definition against both frameworks, checking that a playwright-e2e test calls the step that
submits the event, and keeping only events a professional or staff user picks from Next step in XUI.
Compared on 2026-11-12.

`RECORD_JUDGMENT` (Record Judgment) and `EDIT_JUDGMENT` (Edit Judgment) are not listed either. playwright-e2e submits them
through the API, but the definition has hidden them from every user since CIV-16299 (January 2025): their
EventEnablingCondition needs `CaseAccessCategory="DO_NOT_SHOW_IN_UI_BUT_IN_PREVIEW_SET_IT_TO_SPEC_CLAIM"`, which no claim
can have (civil-service's CaseCategory is only UNSPEC_CLAIM or SPEC_CLAIM). Nothing else opens them: no work allocation
task links to them and no business process runs them. civil-service also only allows Record Judgment in the
FULL_DEFENCE_PROCEED flow state, so not once a hearing has been listed.

The comparison is by event name, not by how much of each event is covered: an event both run may be run with more
combinations of answers in playwright-e2e. `MANAGE_DOCUMENTS` (Manage Documents) is not listed: playwright-e2e has a step
for it, but no test calls that step.

## Done since

- `ADD_DEFENDANT_LITIGATION_FRIEND`: DEFENDANT_LITIGATION_FRIEND=Yes (UI + API), passed AAT 1v2SS UI, 1v2DS API and 1v2DS UI on 2026-11-06
- `ADD_UNAVAILABLE_DATES`: ADD_UNAVAILABLE_DATES=Yes (UI + API, both journeys), passed AAT unspec 1v2DS UI and spec 1v2SS small claim API on 2026-11-06
- `CASE_PROCEEDS_IN_CASEMAN` (Case proceeds in Caseman): CASE_PROCEEDS_IN_CASEMAN=<reason> (UI + API, both journeys), passed AAT unspec 1v1 UI and API and spec 1v1 UI and API on 2026-11-12
- `JUDGMENT_PAID_IN_FULL` (Mark judgment as paid in full), `REFER_JUDGE_DEFENCE_RECEIVED` (Refer to judge-defended claim), `SET_ASIDE_JUDGMENT` (Set aside judgment): JUDGMENT_PAID_IN_FULL=Yes, REFER_JUDGE_DEFENCE_RECEIVED=Yes, SET_ASIDE_JUDGMENT=<reason> (UI + API, spec journey, after default judgment or a judgment by admission), passed AAT on 2026-11-16: spec 1v1 default judgment UI (all three, set aside after a defence, then taken offline), spec 1v1 judgment by admission API (paid in full, refer), spec 1v2DS default judgment API (set aside made in error, then taken offline)

## Events

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

1. Not suitable for SDO (`NotSuitable_SDO`)
2. `UPLOAD_MEDIATION_DOCUMENTS`
3. Dispute resolution hearing
4. The rest
