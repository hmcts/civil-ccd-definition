package uk.gov.hmcts.reform.civil.ccdvalidation;

public class CCDValidationError extends RuntimeException {

    public CCDValidationError(String message) {
        super(message);
    }
}
