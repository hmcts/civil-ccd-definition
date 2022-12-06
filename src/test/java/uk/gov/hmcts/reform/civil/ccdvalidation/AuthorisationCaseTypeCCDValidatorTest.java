package uk.gov.hmcts.reform.civil.ccdvalidation;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class AuthorisationCaseTypeCCDValidatorTest {

    @Test
    void testGetPrimaryKeyColumnsReturnsCorrectColumns() {
        //Then: the columns must be correct
        assertThat(new AuthorisationCaseTypeCCDValidator().getPrimaryKeyColumns(),
            is(List.of("CaseTypeID", "UserRole")));
    }

    @Test
    void testSpreadsheetNameIsCorrect() {
        assertThat(new AuthorisationCaseTypeCCDValidator().getSheetName(), is("AuthorisationCaseType"));
    }
}
