package uk.gov.hmcts.reform.civil.ccdvalidation;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class ComplexTypesCCDValidatorTest {

    @Test
    void testGetPrimaryKeyColumnsReturnsCorrectColumns() {
        //Then: the columns must be correct
        assertThat(new ComplexTypesCCDValidator().getPrimaryKeyColumns(), is(List.of("ID", "ListElementCode")));
    }

    @Test
    void testSpreadsheetNameIsCorrect() {
        assertThat(new ComplexTypesCCDValidator().getSheetName(), is("ComplexTypes"));
    }
}
