package uk.gov.hmcts.reform.civil.ccdvalidation;

import java.util.List;

public class CaseFieldCCDValidator extends UniqueConstraintCCDFileValidator {

    private static final List<String> PRIMARY_KEY_COLUMNS = List.of("ID");

    private static final String SHEET_NAME = "CaseField";

    List<String> getPrimaryKeyColumns() {
        return PRIMARY_KEY_COLUMNS;
    }

    String getSheetName() {
        return SHEET_NAME;
    }

}
