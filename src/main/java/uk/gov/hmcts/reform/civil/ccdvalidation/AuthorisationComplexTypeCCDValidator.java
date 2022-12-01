package uk.gov.hmcts.reform.civil.ccdvalidation;

import java.util.List;

public class AuthorisationComplexTypeCCDValidator extends UniqueConstraintCCDFileValidator {

    private static final List<String> PRIMARY_KEY_COLUMNS = List.of("CaseFieldID", "ListElementCode");

    private static final String SHEET_NAME = "AuthorisationComplexType";

    List<String> getPrimaryKeyColumns() {
        return PRIMARY_KEY_COLUMNS;
    }

    String getSheetName() {
        return SHEET_NAME;
    }

}
