package uk.gov.hmcts.reform.unspec.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import uk.gov.hmcts.reform.unspec.model.common.Element;
import uk.gov.hmcts.reform.unspec.model.documents.Document;

import java.util.ArrayList;
import java.util.List;

import static java.util.Optional.ofNullable;

@Data
@Builder
public class ServedDocumentFiles {

    private List<Element<Document>> other;
    private List<Element<Document>> medicalReports;
    private List<Element<Document>> scheduleOfLoss;
    private Document particularsOfClaimDocument;
    private String particularsOfClaimText;
    private List<Element<Document>> certificateOfSuitability;

    @JsonIgnore
    public List<String> getErrors() {
        List<String> errors = new ArrayList<>();
        if (ofNullable(particularsOfClaimDocument).isPresent() && ofNullable(particularsOfClaimText).isPresent()) {
            errors.add("More than one particular of claim added");
        }

        if (ofNullable(particularsOfClaimDocument).isEmpty() && ofNullable(particularsOfClaimText).isEmpty()) {
            errors.add("One particular of claim is required");
        }
        return errors;
    }
}
