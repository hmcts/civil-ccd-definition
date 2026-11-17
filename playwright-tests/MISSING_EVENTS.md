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
- `NotSuitable_SDO` (Not suitable for SDO) and `TRANSFER_ONLINE_CASE` (Transfer online case): NOT_SUITABLE_SDO=CHANGE_LOCATION|OTHER_REASONS (UI + API, both journeys; the judge follows the directions task's "Not Suitable for SDO" link, and with CHANGE_LOCATION the hearing centre admin transfers the claim before the SDO is made at the new court), passed AAT on 2026-11-16: unspec 1v1 UI and spec 1v1 API (change of location, transfer, SDO), spec 1v1 UI and unspec 1v2DS API (other reason, offline). Transfer online case is only run after a change of location; playwright-e2e's UI case progression test also transfers a claim in CASE_PROGRESSION.
- `UPLOAD_MEDIATION_DOCUMENTS` (Upload mediation documents): UPLOAD_MEDIATION_DOCUMENTS=Yes (UI + API, spec small claims after unsuccessful mediation; a non-attendance statement and a referred document from each solicitor, for every party they act for), passed AAT on 2026-11-16: spec small 1v2DS UI (all three solicitors), spec small 1v2SS API (Defendants 1 and 2), spec small 2v1 UI (Claimants 1 and 2)
- Dispute resolution hearing: DISPUTE_RESOLUTION_HEARING=Yes (UI + API, both journeys; the small claims SDO lists a DRH, with the witness statement deadline filled in), passed AAT on 2026-11-16: unspec small 1v1 API to All_FINAL_ORDERS_ISSUED, unspec small 1v1 UI (judge's SDO), spec small 1v1 UI (legal adviser's SDO, then the whole journey)
- `SEND_AND_REPLY` (Send and reply to messages): SEND_AND_REPLY=Yes (UI + API, both journeys; the hearing centre admin sends a district judge a message and the judge replies, while the case is stayed with STAY_CASE=Yes, otherwise in JUDICIAL_REFERRAL), passed AAT on 2026-11-17: unspec 1v1 UI on a stayed case, spec 1v1 API in JUDICIAL_REFERRAL
- `DISMISS_CASE` (Dismiss case): DISMISS_CASE=Yes (UI + API, both journeys, a closing step like CASE_PROCEEDS_IN_CASEMAN), passed AAT on 2026-11-17: unspec 1v1 UI and spec 1v1 API, each dismissed in JUDICIAL_REFERRAL

## Events

### Case management

| Next step | Event ID | Who | Notes |
| --- | --- | --- | --- |
| Amend party details | `AMEND_PARTY_DETAILS` | Hearing centre admin | |

### Solicitor events

| Next step | Event ID | Who | Notes |
| --- | --- | --- | --- |
| Add or amend claim documents | `ADD_OR_AMEND_CLAIM_DOCUMENTS` | Claimant solicitor (unspec) | |

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
| Dispute resolution hearing (small claims SDO with a DRH) | `api-tests/drh` (unspec and spec) | Done: DISPUTE_RESOLUTION_HEARING=Yes (both journeys, UI + API) |
| Automated hearing notice scheduler (HMC) | `api-tests/hearings`: 4 scheduler tests, including the duplicate defendant ones | None |
| Flight delay | `api-tests/flight-delay`, `ui-tests/flight-delay` | Partly: `AIRLINE_CLAIM` on create claim only |
| Case offline | `api-tests/case-offline` | Done: CASE_PROCEEDS_IN_CASEMAN |

## Suggested order

1. `AMEND_PARTY_DETAILS` and `ADD_OR_AMEND_CLAIM_DOCUMENTS`
2. The general application events (`HEARING_SCHEDULED_GA`, `RESPOND_TO_JUDGE_ADDITIONAL_INFO`)
3. The automated hearing notice scheduler and flight delay
