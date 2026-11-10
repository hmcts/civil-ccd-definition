# Events missing from playwright-tests

The CCD events that playwright-e2e runs and playwright-tests does not, found by comparing the event constants
playwright-e2e uses (61 events) with the event IDs in playwright-tests' journeys, flows, helpers and scenarios.
Compared on 2026-11-06.

The comparison is by event name, not by how much of each event is covered: an event both run may be run with more
combinations of answers in playwright-e2e. playwright-e2e also submits a few events inside helpers without naming them,
so this list may not be complete.

## Done since

- `ADD_DEFENDANT_LITIGATION_FRIEND`: DEFENDANT_LITIGATION_FRIEND=Yes (UI + API), passed AAT 1v2SS UI, 1v2DS API and 1v2DS UI on 2026-11-06
- `ADD_UNAVAILABLE_DATES`: ADD_UNAVAILABLE_DATES=Yes (UI + API, both journeys), passed AAT unspec 1v2DS UI and spec 1v2SS small claim API on 2026-11-06

## Events

### Judgments online

| Event | Who | Notes |
| --- | --- | --- |
| `RECORD_JUDGMENT` | Caseworker | |
| `EDIT_JUDGMENT` | Caseworker | |
| `SET_ASIDE_JUDGMENT` | Hearing centre admin, caseworker | Following an application, a defence received, or made in error |
| `JUDGMENT_PAID_IN_FULL` | Claimant solicitor (spec) | |
| `REFER_JUDGE_DEFENCE_RECEIVED` | Hearing centre admin, caseworker | A defence turns up after default judgment |

### Case management

| Event | Who | Notes |
| --- | --- | --- |
| `NOT_SUITABLE_SDO` | Judge | 3 playwright-e2e tests (unspec and spec) |
| `TRANSFER_ONLINE_CASE` | Hearing centre admin, caseworker | |
| `CASE_PROCEEDS_IN_CASEMAN` | Hearing centre admin, caseworker | Takes the case offline |
| `DISMISS_CASE` | Hearing centre admin | |
| `SEND_AND_REPLY` | Caseworker, CTSC admin, judge | Messages between staff and judges |
| `MANAGE_DOCUMENTS` | Caseworker | |
| `AMEND_PARTY_DETAILS` | Caseworker | |

### Solicitor events

| Event | Who | Notes |
| --- | --- | --- |
| `ADD_OR_AMEND_CLAIM_DOCUMENTS` | Claimant solicitor | |
| `UPLOAD_MEDIATION_DOCUMENTS` | Claimant and defendant solicitors (spec small claims) | 4 playwright-e2e mediation tests |

### General applications

| Event | Who | Notes |
| --- | --- | --- |
| `HEARING_SCHEDULED_GA` | Hearing centre admin | |
| `RESPOND_TO_JUDGE_ADDITIONAL_INFO` | Defendant solicitor 1 | After the judge asks for more information |

### Citizen (LiP) events

| Event | Who | Notes |
| --- | --- | --- |
| `CREATE_LIP_CLAIM` | Claimant citizen | LiP v LiP and LiP claimant journeys through the citizen UI API |
| `DEFENDANT_RESPONSE_CUI` | Defendant citizen | |
| `CLAIMANT_RESPONSE_CUI` | Claimant citizen | |

playwright-tests only has LiPs as defendants, where solicitor-side events act for them.

## Features

| Feature | playwright-e2e tests | playwright-tests |
| --- | --- | --- |
| Dispute resolution hearing (small claims SDO with a DRH) | `api-tests/drh` (unspec and spec) | None |
| Automated hearing notice scheduler (HMC) | `api-tests/hearings`: 4 scheduler tests, including the duplicate defendant ones | None |
| Flight delay | `api-tests/flight-delay`, `ui-tests/flight-delay` | Partly: `AIRLINE_CLAIM` on create claim only |
| Case offline | `api-tests/case-offline` | None (goes with `CASE_PROCEEDS_IN_CASEMAN`) |

## Suggested order

1. Judgments online (`RECORD_JUDGMENT`, `EDIT_JUDGMENT`, `SET_ASIDE_JUDGMENT`, `JUDGMENT_PAID_IN_FULL`,
   `REFER_JUDGE_DEFENCE_RECEIVED`), as they go together
2. `NOT_SUITABLE_SDO`
3. `UPLOAD_MEDIATION_DOCUMENTS`
4. Dispute resolution hearing
5. The rest
