package uk.gov.hmcts.reform.civil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import uk.gov.hmcts.befta.BeftaMain;
import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.dse.ccd.CcdRoleConfig;
import uk.gov.hmcts.befta.dse.ccd.DataLoaderToDefinitionStore;
import uk.gov.hmcts.befta.exception.ImportException;
import uk.gov.hmcts.befta.util.BeftaUtils;

import javax.crypto.AEADBadTagException;
import javax.net.ssl.SSLException;
import java.util.List;
import java.util.Locale;

public class HighLevelDataSetupApp extends DataLoaderToDefinitionStore {

    private static final Logger logger = LoggerFactory.getLogger(HighLevelDataSetupApp.class);

    private static final CcdRoleConfig[] CCD_ROLES_NEEDED_FOR_CIVIL = {
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
        return List.of(String.format("build/ccd-release-config/civil-ccd-%s.xlsx", environmentName));
    }

    @Override
    public void createRoleAssignments() {
        // Do not create role assignments.
        BeftaUtils.defaultLog("Will NOT create role assignments!");
    }

    @Override
    protected boolean shouldTolerateDataSetupFailure() {
        if (BeftaMain.getConfig().getDefinitionStoreUrl().contains(".preview.")) {
            return true;
        }
        return false;
    }

    @Override
    protected boolean shouldTolerateDataSetupFailure(Throwable e) {
        int httpStatusCode504 = 504;
        if (e instanceof ImportException) {
            ImportException importException = (ImportException) e;
            return importException.getHttpStatusCode() == httpStatusCode504;
        }
        if (e instanceof SSLException) {
            return true;
        }
        if (e instanceof AEADBadTagException) {
            return true;
        }
        return shouldTolerateDataSetupFailure();
    }
}
