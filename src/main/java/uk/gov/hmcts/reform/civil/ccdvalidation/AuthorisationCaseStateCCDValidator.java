package uk.gov.hmcts.reform.civil.ccdvalidation;

import java.util.List;

public class AuthorisationCaseStateCCDValidator extends UniqueConstraintCCDFileValidator {

    private static final List<String> PRIMARY_KEY_COLUMNS = List.of("CaseStateID", "UserRole");

    private static final String SHEET_NAME = "AuthorisationCaseState";

    void applyCustomErrorHints(StringBuilder msg) {
        msg.append("Note that entries under 'AccessControl' can overlap with entries in 'UserRole'.");
    }

    List<String> getPrimaryKeyColumns() {
        return PRIMARY_KEY_COLUMNS;
    }

    String getSheetName() {
        return SHEET_NAME;
    }

}
