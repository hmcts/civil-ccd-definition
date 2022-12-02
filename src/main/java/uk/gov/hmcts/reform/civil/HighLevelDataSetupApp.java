package uk.gov.hmcts.reform.civil;

import io.restassured.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.dse.ccd.CcdRoleConfig;
import uk.gov.hmcts.befta.dse.ccd.DataLoaderToDefinitionStore;
import uk.gov.hmcts.befta.exception.ImportException;
import uk.gov.hmcts.befta.util.BeftaUtils;
import uk.gov.hmcts.reform.civil.ccdvalidation.AuthorisationCaseFieldCCDValidator;
import uk.gov.hmcts.reform.civil.ccdvalidation.AuthorisationCaseStateCCDValidator;
import uk.gov.hmcts.reform.civil.ccdvalidation.AuthorisationCaseTypeCCDValidator;
import uk.gov.hmcts.reform.civil.ccdvalidation.AuthorisationComplexTypeCCDValidator;
import uk.gov.hmcts.reform.civil.ccdvalidation.CCDFileValidator;
import uk.gov.hmcts.reform.civil.ccdvalidation.CaseFieldCCDValidator;
import uk.gov.hmcts.reform.civil.ccdvalidation.CaseTypeTabHasLabelCCDValidator;
import uk.gov.hmcts.reform.civil.ccdvalidation.ComplexTypesCCDValidator;
import uk.gov.hmcts.reform.civil.ccdvalidation.PreUploadCCDFileValidator;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.function.Function;

@Slf4j
public class HighLevelDataSetupApp extends DataLoaderToDefinitionStore {

    private static final Logger logger = LoggerFactory.getLogger(HighLevelDataSetupApp.class);

    private static final CcdRoleConfig[] CCD_ROLES_NEEDED_FOR_NFD = {
        new CcdRoleConfig("caseworker-civil", "PUBLIC"),
        new CcdRoleConfig("caseworker-approver", "PUBLIC"),
        new CcdRoleConfig("prd-admin", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-admin", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-solicitor", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-staff", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-systemupdate", "PUBLIC"),
        new CcdRoleConfig("caseworker-caa", "PUBLIC"),
        new CcdRoleConfig("judge-profile", "PUBLIC"),
        new CcdRoleConfig("basic-access", "PUBLIC"),
        new CcdRoleConfig("GS_profile", "PUBLIC"),
        new CcdRoleConfig("legal-adviser", "PUBLIC"),
        new CcdRoleConfig("caseworker-ras-validation", "PUBLIC"),
        new CcdRoleConfig("admin-access", "PUBLIC"),
        new CcdRoleConfig("full-access", "PUBLIC"),
        new CcdRoleConfig("hearing-schedule-access", "PUBLIC"),
        new CcdRoleConfig("civil-administrator-standard", "PUBLIC"),
        new CcdRoleConfig("civil-administrator-basic", "PUBLIC"),
        new CcdRoleConfig("APP-SOL-UNSPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("APP-SOL-SPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("RES-SOL-ONE-UNSPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("RES-SOL-ONE-SPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("RES-SOL-TWO-UNSPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("RES-SOL-TWO-SPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("payment-access", "PUBLIC")
    };

    private final List<CCDFileValidator> validators = List.of(
        new AuthorisationCaseFieldCCDValidator(),
        new AuthorisationCaseStateCCDValidator(),
        new AuthorisationCaseTypeCCDValidator(),
        new AuthorisationComplexTypeCCDValidator(),
        new CaseFieldCCDValidator(),
        new ComplexTypesCCDValidator(),
        new CaseTypeTabHasLabelCCDValidator()
    );

    private final CcdEnvironment environment;

    public HighLevelDataSetupApp(CcdEnvironment dataSetupEnvironment) {
        super(dataSetupEnvironment);
        environment = dataSetupEnvironment;
    }

    public static void main(String[] args) throws Throwable {
        main(HighLevelDataSetupApp.class, args);
    }

    @Override
    public void addCcdRoles() {
        for (CcdRoleConfig roleConfig : CCD_ROLES_NEEDED_FOR_NFD) {
            try {
                logger.info("\n\nAdding CCD Role {}.", roleConfig);
                addCcdRole(roleConfig);
                logger.info("\n\nAdded CCD Role {}.", roleConfig);
            } catch (Exception e) {
                logger.error("\n\nCouldn't add CCD Role {} - Exception: {}.\n\n", roleConfig, e);
                if (!shouldTolerateDataSetupFailure()) {
                    throw e;
                }
            }
        }
    }

    @Override
    protected List<String> getAllDefinitionFilesToLoadAt(String definitionsPath) {
        String environmentName = environment.name().toLowerCase(Locale.UK);
        return List.of(String.format("build/ccd-release-config/civil-ccd-%s.xlsx", environmentName));
    }

    @Override
    public void createRoleAssignments() {
        // Do not create role assignments.
        BeftaUtils.defaultLog("Will NOT create role assignments!");
    }

    @Override
    protected boolean shouldTolerateDataSetupFailure(Throwable e) {
        int httpStatusCode504 = 504;
        if (e instanceof ImportException) {
            ImportException importException = (ImportException) e;
            return importException.getHttpStatusCode() == httpStatusCode504;
        }
        return false;
    }

    @Override
    protected void importDefinition(String fileResourcePath) throws IOException {
        File file = new File(fileResourcePath).exists() ? new File(fileResourcePath)
            : BeftaUtils.getClassPathResourceIntoTemporaryFile(fileResourcePath);
        importDefinitionTestable(file, validators,
            (f) -> asAutoTestImporter().given().multiPart(f).when().post("/import"));
    }

    static void importDefinitionTestable(File file, List<CCDFileValidator> validators,
                                         Function<File, Response> httpCallHandler) throws IOException {
        // this contraption of a method is needed to make things unit-testable as the superclass does not shine on
        //  that front
        try {
            preValidateCCDFile(file, validators);
            Response response = httpCallHandler.apply(file);
            if (response.getStatusCode() / 100 != 2) {
                String message = getImportDefinitionErrorMessage(response, file);
                validateCCDFile(file, response.statusCode(), validators, message);
                throw new ImportException(message, response.statusCode());
            }
        } finally {
            if (!file.delete()) {
                log.warn("Could not delete {}", file.getPath());
            }
        }
    }

    static String getImportDefinitionErrorMessage(Response response, File file) {
        String message = "Import failed with response body: " + response.body().prettyPrint();
        message += "\nand http code: " + response.statusCode();
        message += "\non file: " + file.getPath();
        message += "\n\nThis failure means that some CCD changes are incorrect but we don't have validation to ";
        message += "detect which ones.";
        message += "\nPlease verify your CCD json files changes. Once you figured out what's wrong with them and fixed";
        message += " the issue, create a ticket to add the appropriate validator and speak to your Technical Lead to";
        message += " schedule the change, so that other developers won't have to spend as much time trying to";
        message += " understand what went wrong.";
        return message;
    }

    static void preValidateCCDFile(File file, List<CCDFileValidator> validators) {
        validators.forEach(validator -> {
            if (validator instanceof PreUploadCCDFileValidator) {
                validator.validate(file, null, null);
            }
        });
    }

    static void validateCCDFile(File file, int statusCode, List<CCDFileValidator> validators,
                                String originalErrorMessage) {
        if ((statusCode < 400 || statusCode > 499) && statusCode != 500) {
            // we only try to validate the 4xx range of errors and the generic 500 error (just in case)
            return;
        }
        validators.forEach(validator -> {
            if (!(validator instanceof PreUploadCCDFileValidator)) {
                validator.validate(file, originalErrorMessage, statusCode);
            }
        });
    }
}
