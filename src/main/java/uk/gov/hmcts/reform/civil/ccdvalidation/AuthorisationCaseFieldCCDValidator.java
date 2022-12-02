package uk.gov.hmcts.reform.civil.ccdvalidation;

import java.util.List;

public class AuthorisationCaseFieldCCDValidator extends UniqueConstraintCCDFileValidator {

    private static final List<String> PRIMARY_KEY_COLUMNS = List.of("CaseFieldID", "UserRole");

    private static final String SHEET_NAME = "AuthorisationCaseField";

    List<String> getPrimaryKeyColumns() {
        return PRIMARY_KEY_COLUMNS;
    }

    String getSheetName() {
        return SHEET_NAME;
    }

}
