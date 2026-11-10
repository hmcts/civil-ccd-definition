# Urgent general applications

An urgent general application never waits for the other side to respond, even when it is made with notice. The respondent's solicitor gets no "Respond to application" event on it. This is how civil-service works, not a fault in the case, the tests or the user's access.

The journeys make applications that are **not urgent** unless `GENERAL_APPLICATION_URGENT=Yes`, so the respondent steps (`GA_RESPOND_<CLAIMANT|DEFENDANT1|DEFENDANT2>`) run for applications made with notice. With `GENERAL_APPLICATION_URGENT=Yes` they are skipped.

## What decides whether the respondent responds

After the application fee is paid, civil-service's `EndGeneralAppBusinessProcessCallbackHandler.determineStandardState` picks the application's next state:

| Application | State after payment | Respondent can respond? |
|---|---|---|
| With notice, not urgent | `AWAITING_RESPONDENT_RESPONSE` | Yes |
| With notice, urgent | `APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION` | No |
| Without notice | `APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION` | No, unless the court sends it to them (below) |

It goes to `AWAITING_RESPONDENT_RESPONSE` only when `JudicialDecisionNotificationUtil.isNotificationCriteriaSatisfied` is true, which needs all of:

- the application is with notice (`generalAppInformOtherParty.isWithNotice` is Yes; an agreed application counts as with notice)
- it is not urgent (`generalAppUrgencyRequirement.generalAppUrgency` is No)
- the first respondent solicitor in `generalAppRespondentSolicitors` has an email

The same check decides whether the respondents get the email asking them to respond (`GeneralApplicationCreationNotificationService`), so on an urgent application they are not asked to respond at all. The judge (or legal adviser) can still ask for the other side's views when deciding it.

## Without notice, sent to the other side by the court

A judge or legal adviser deciding an application made without notice can send it to the other side instead ("Request more information", "Send application to other party and request hearing details"). civil-service then asks the applicant for the extra fee (`APPLICATION_ADD_PAYMENT`). Once it is paid, `StateGeneratorService` moves a non-urgent application to `AWAITING_RESPONDENT_RESPONSE`, so the other side responds, and an urgent one straight back to `APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION`. The journeys do this with `GENERAL_APPLICATION_WITH_NOTICE=No GENERAL_APPLICATION_SEND_TO_OTHER_PARTY=Yes` (steps `GA_SEND_TO_OTHER_PARTY_<JUDGE|LEGAL_ADVISER>` and `GA_PAY_ADDITIONAL_FEE`), for non-urgent applications only.

## Example

On preview PR 8408, application 1793301344948485 (EXTEND_TIME, made by the claimant's solicitor, with notice, not agreed) was made urgent, with a consideration date. After payment it went straight to `APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION`. The defendant's solicitor (organisation 2, solicitor 1) still held `[RESPONDENTSOLICITORONE]` on it and was listed in `generalAppRespondentSolicitors`, but the only event they had on it was `UPLOAD_ADDL_DOCUMENTS` (upload additional documents).

## Getting a respondent step

Make the application again and answer **No** to "Is this application urgent?". The application then waits in `AWAITING_RESPONDENT_RESPONSE`, and each respondent's solicitor gets "Respond to application". One response is needed from each respondent organisation before the application goes to the judge.
