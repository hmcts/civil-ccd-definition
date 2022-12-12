package uk.gov.hmcts.reform.civil.ccdvalidation;

import java.util.List;

public class ComplexTypesCCDValidator extends UniqueConstraintCCDFileValidator {

    private static final List<String> PRIMARY_KEY_COLUMNS = List.of("ID", "ListElementCode");

    private static final String SHEET_NAME = "ComplexTypes";

    List<String> getPrimaryKeyColumns() {
        return PRIMARY_KEY_COLUMNS;
    }

    String getSheetName() {
        return SHEET_NAME;
    }

}
