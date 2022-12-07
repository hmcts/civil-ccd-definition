package uk.gov.hmcts.reform.civil.ccdvalidation;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class CaseFieldCCDValidatorTest {

    @Test
    void testGetPrimaryKeyColumnsReturnsCorrectColumns() {
        //Then: the columns must be correct
        assertThat(new CaseFieldCCDValidator().getPrimaryKeyColumns(), is(List.of("ID")));
    }

    @Test
    void testSpreadsheetNameIsCorrect() {
        assertThat(new CaseFieldCCDValidator().getSheetName(), is("CaseField"));
    }
}
