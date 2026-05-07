package uk.gov.hmcts.reform.civil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import uk.gov.hmcts.befta.DefaultTestAutomationAdapter;
import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.dse.ccd.CcdRoleConfig;
import uk.gov.hmcts.befta.dse.ccd.DataLoaderToDefinitionStore;
import uk.gov.hmcts.befta.exception.ImportException;
import uk.gov.hmcts.befta.util.BeftaUtils;

import io.restassured.response.Response;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class HighLevelDataSetupApp extends DataLoaderToDefinitionStore {

    private static final Logger logger = LoggerFactory.getLogger(HighLevelDataSetupApp.class);
    private static final int HTTP_STATUS_OK = 200;
    private static final int HTTP_STATUS_GATEWAY_TIMEOUT = 504;
    private static final int VERSION_POLL_MAX_ATTEMPTS = 10;
    private static final long VERSION_POLL_DELAY_MS = 5_000;

    private static final CcdRoleConfig[] CCD_ROLES_NEEDED_FOR_CIVIL = {
        new CcdRoleConfig("caseworker-civil", "PUBLIC"),
        new CcdRoleConfig("caseworker-approver", "PUBLIC"),
        new CcdRoleConfig("prd-admin", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-admin", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-solicitor", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-judge", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-staff", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-systemupdate", "PUBLIC"),
        new CcdRoleConfig("caseworker-caa", "PUBLIC"),
        new CcdRoleConfig("judge-profile", "PUBLIC"),
        new CcdRoleConfig("basic-access", "PUBLIC"),
        new CcdRoleConfig("ga-basic-access", "PUBLIC"),
        new CcdRoleConfig("GS_profile", "PUBLIC"),
        new CcdRoleConfig("legal-adviser", "PUBLIC"),
        new CcdRoleConfig("caseworker-ras-validation", "PUBLIC"),
        new CcdRoleConfig("admin-access", "PUBLIC"),
        new CcdRoleConfig("full-access", "PUBLIC"),
        new CcdRoleConfig("hearing-schedule-access", "PUBLIC"),
        new CcdRoleConfig("civil-administrator-standard", "PUBLIC"),
        new CcdRoleConfig("civil-administrator-basic", "PUBLIC"),
        new CcdRoleConfig("civil-administrator-judge", "PUBLIC"),
        new CcdRoleConfig("APP-SOL-UNSPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("APP-SOL-SPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("RES-SOL-ONE-UNSPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("RES-SOL-ONE-SPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("RES-SOL-TWO-UNSPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("RES-SOL-TWO-SPEC-PROFILE", "PUBLIC"),
        new CcdRoleConfig("payment-access", "PUBLIC"),
        new CcdRoleConfig("caseflags-admin", "PUBLIC"),
        new CcdRoleConfig("caseflags-viewer", "PUBLIC"),
        new CcdRoleConfig("caseworker-wa-task-configuration", "RESTRICTED"),
        new CcdRoleConfig("CITIZEN-CLAIMANT-PROFILE", "PUBLIC"),
        new CcdRoleConfig("CITIZEN-DEFENDANT-PROFILE", "PUBLIC"),
        new CcdRoleConfig("cui-admin-profile", "PUBLIC"),
        new CcdRoleConfig("cui-nbc-profile", "PUBLIC"),
        new CcdRoleConfig("citizen-profile", "PUBLIC"),
        new CcdRoleConfig("citizen", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-citizen-ui-pcqextractor", "PUBLIC"),
        new CcdRoleConfig("judge", "PUBLIC"),
        new CcdRoleConfig("hearing-centre-admin", "PUBLIC"),
        new CcdRoleConfig("national-business-centre", "PUBLIC"),
        new CcdRoleConfig("hearing-centre-team-leader", "PUBLIC"),
        new CcdRoleConfig("next-hearing-date-admin", "PUBLIC"),
        new CcdRoleConfig("court-officer-order", "PUBLIC"),
        new CcdRoleConfig("APPLICANT-PROFILE-SPEC", "PUBLIC"),
        new CcdRoleConfig("RESPONDENT-ONE-PROFILE-SPEC", "PUBLIC"),
        new CcdRoleConfig("nbc-team-leader", "PUBLIC"),
        new CcdRoleConfig("ctsc", "PUBLIC"),
        new CcdRoleConfig("ctsc-team-leader", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-doc-removal", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-system-field-reader", "PUBLIC"),
        new CcdRoleConfig("caseworker-civil-rparobot", "PUBLIC"),
        new CcdRoleConfig("wlu-admin", "PUBLIC")
    };

    private final CcdEnvironment environment;

    public HighLevelDataSetupApp(CcdEnvironment dataSetupEnvironment) {
        super(dataSetupEnvironment);
        environment = dataSetupEnvironment;
    }

    HighLevelDataSetupApp(CcdEnvironment dataSetupEnvironment, String definitionStoreUrl) {
        super(new DefaultTestAutomationAdapter(),
              VALID_CCD_TEST_DEFINITIONS_PATH,
              dataSetupEnvironment,
              definitionStoreUrl);
        environment = dataSetupEnvironment;
    }

    public static void main(String[] args) throws Throwable {
        main(HighLevelDataSetupApp.class, args);
    }

    @Override
    public void addCcdRoles() {
        for (CcdRoleConfig roleConfig : CCD_ROLES_NEEDED_FOR_CIVIL) {
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
        return List.of(String.format("build/ccd-release-config/civil-ccd-%s.xlsx", environmentName),
                       String.format("build/ccd-release-config/civil-ga-ccd-%s.xlsx", environmentName));
    }

    @Override
    protected void importDefinition(String fileResourcePath) throws IOException {
        String caseType = extractCaseTypeFromFilename(fileResourcePath);
        String currentVersion = getCaseTypeVersion(caseType);

        try {
            importDefinitionFile(fileResourcePath);
        } catch (ImportException e) {
            if (e.getHttpStatusCode() != HTTP_STATUS_GATEWAY_TIMEOUT) {
                throw e;
            }
            logger.warn("Import got 504 Gateway Timeout for {}. Checking if {} case type version changed...",
                        fileResourcePath, caseType);

            if (pollForVersionChange(caseType, currentVersion)) {
                logger.info("Case type {} version changed after 504. Import succeeded for {}.",
                            caseType, fileResourcePath);
                return;
            }
            logger.error("Case type {} version unchanged after polling. Import failed for {}.",
                         caseType, fileResourcePath);
            throw e;
        }
    }

    protected void importDefinitionFile(String fileResourcePath) throws IOException {
        super.importDefinition(fileResourcePath);
    }

    private String extractCaseTypeFromFilename(String fileResourcePath) {
        String filename = new File(fileResourcePath).getName().toLowerCase(Locale.UK);
        if (filename.contains("-ga-")) {
            return "GENERALAPPLICATION";
        }
        return "CIVIL";
    }

    protected String getCaseTypeVersion(String caseType) {
        try {
            Response response = asAutoTestImporter()
                .given().when().get("/api/data/case-type/" + caseType + "/version");
            if (response.getStatusCode() == HTTP_STATUS_OK) {
                return response.body().asString().trim();
            }
        } catch (Exception ex) {
            logger.warn("Could not fetch current {} case type version: {}", caseType, ex.getMessage());
        }
        return null;
    }

    private boolean pollForVersionChange(String caseType, String previousVersion) {
        if (previousVersion == null) {
            logger.warn("No previous version available for {}. Cannot verify import after 504.", caseType);
            return false;
        }

        for (int attempt = 1; attempt <= getVersionPollMaxAttempts(); attempt++) {
            try {
                waitBeforeVersionCheck();
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
                return false;
            }
            logger.info("Checking {} case type version (attempt {}/{})",
                        caseType, attempt, getVersionPollMaxAttempts());
            String newVersion = getCaseTypeVersion(caseType);
            if (newVersion != null && !newVersion.equals(previousVersion)) {
                logger.info("Version changed from {} to {}", previousVersion, newVersion);
                return true;
            }
        }
        return false;
    }

    protected int getVersionPollMaxAttempts() {
        return VERSION_POLL_MAX_ATTEMPTS;
    }

    protected void waitBeforeVersionCheck() throws InterruptedException {
        Thread.sleep(VERSION_POLL_DELAY_MS);
    }

    @Override
    public void createRoleAssignments() {
        // Do not create role assignments.
        BeftaUtils.defaultLog("Will NOT create role assignments!");
    }
}
