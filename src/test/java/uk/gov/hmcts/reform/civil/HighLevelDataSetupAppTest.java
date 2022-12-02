package uk.gov.hmcts.reform.civil;

import io.restassured.response.Response;
import io.restassured.response.ResponseBody;
import org.junit.jupiter.api.Test;
import uk.gov.hmcts.befta.exception.ImportException;
import uk.gov.hmcts.reform.civil.ccdvalidation.CCDFileValidator;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

class HighLevelDataSetupAppTest {

    @Test
    void importDefinitionErrorMessageTextMakesSense() {
        Response response = mock(Response.class);
        ResponseBody body = mock(ResponseBody.class);
        File file = mock(File.class);
        given(response.body()).willReturn(body);
        given(response.statusCode()).willReturn(409);
        given(body.prettyPrint()).willReturn("Something unimportant");
        given(file.getPath()).willReturn("some/file/path.xlsx");

        // When: I call the getImportDefinitionErrorMessage method
        String result = HighLevelDataSetupApp.getImportDefinitionErrorMessage(response, file);

        // Then: the message is descriptive
        assertThat(result, containsString("Please verify your CCD json files changes"));
    }

    @Test
    void checkValidateCCDFileRunsValidationFor409StatusCode() {
        // Given: the response status code is 409
        File file = mock(File.class);
        CCDFileValidator validator = mock(CCDFileValidator.class);
        List<CCDFileValidator> validators = new ArrayList<>();
        validators.add(validator);

        int statusCode = 409;

        // When
        HighLevelDataSetupApp.validateCCDFile(file, statusCode, validators, "Unimportant");

        // Then
        verify(validator, times(1)).validate(file, "Unimportant", statusCode);
    }

    @Test
    void checkValidateCCDFileRunsValidationFor500StatusCode() {
        // Given: the response status code is 500
        File file = mock(File.class);
        CCDFileValidator validator = mock(CCDFileValidator.class);
        List<CCDFileValidator> validators = new ArrayList<>();
        validators.add(validator);

        int statusCode = 500;

        // When: I call validateCCDFile
        HighLevelDataSetupApp.validateCCDFile(file, statusCode, validators, "Unimportant");

        // Then: the validators are called
        verify(validator, times(1)).validate(file, "Unimportant", statusCode);
    }

    @Test
    void checkValidateCCDFileDoesNotRunValidationFor200StatusCode() {
        // Given: the response status code is in the 200 range
        File file = mock(File.class);
        CCDFileValidator validator = mock(CCDFileValidator.class);
        List<CCDFileValidator> validators = new ArrayList<>();
        validators.add(validator);

        int statusCode = 200;

        // When: I call validateCCDFile
        HighLevelDataSetupApp.validateCCDFile(file, statusCode, validators, "OK");

        // Then: the validators are not called
        verifyNoInteractions(validator);
    }

    @Test
    void checkImportDefinitionTestableCallsValidationForNon200StatusCodes() throws IOException {
        // Given: the import will fail
        CCDFileValidator validator = mock(CCDFileValidator.class);
        List<CCDFileValidator> validators = new ArrayList<>();
        validators.add(validator);

        Response response = mock(Response.class);
        ResponseBody body = mock(ResponseBody.class);
        File file = mock(File.class);
        given(response.body()).willReturn(body);
        given(response.statusCode()).willReturn(409);
        given(body.prettyPrint()).willReturn("Something unimportant");
        given(file.getPath()).willReturn("some/file/path.xlsx");

        // When: I try the import and it fails
        assertThrows(ImportException.class,
            () -> HighLevelDataSetupApp.importDefinitionTestable(file, validators, (fl) -> response));

        // Then: the validators must be called
        verify(validator, times(1)).validate(eq(file), any(), eq(409));
    }

}
