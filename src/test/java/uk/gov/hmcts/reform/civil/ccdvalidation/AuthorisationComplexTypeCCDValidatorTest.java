package uk.gov.hmcts.reform.civil.ccdvalidation;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class AuthorisationComplexTypeCCDValidatorTest {

    @Test
    void testGetPrimaryKeyColumnsReturnsCorrectColumns() {
        //Then: the columns must be correct
        assertThat(new AuthorisationComplexTypeCCDValidator().getPrimaryKeyColumns(),
            is(List.of("CaseFieldID", "ListElementCode", "UserRole")));
    }

    @Test
    void testSpreadsheetNameIsCorrect() {
        assertThat(new AuthorisationComplexTypeCCDValidator().getSheetName(), is("AuthorisationComplexType"));
    }
}
