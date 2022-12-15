package uk.gov.hmcts.reform.civil.ccdvalidation;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class AuthorisationCaseFieldCCDValidatorTest {

    @Test
    void testGetPrimaryKeyColumnsReturnsCorrectColumns() {
        //Then: the columns must be correct
        assertThat(new AuthorisationCaseFieldCCDValidator().getPrimaryKeyColumns(),
            is(List.of("CaseFieldID", "UserRole")));
    }

    @Test
    void testSpreadsheetNameIsCorrect() {
        assertThat(new AuthorisationCaseFieldCCDValidator().getSheetName(), is("AuthorisationCaseField"));
    }
}
