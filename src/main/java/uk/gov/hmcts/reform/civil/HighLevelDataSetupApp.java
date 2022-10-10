package uk.gov.hmcts.reform.civil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.dse.ccd.CcdRoleConfig;
import uk.gov.hmcts.befta.dse.ccd.DataLoaderToDefinitionStore;
import uk.gov.hmcts.befta.util.BeftaUtils;

import java.util.List;
import java.util.Locale;

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
        new CcdRoleConfig("RES-SOL-TWO-SPEC-PROFILE", "PUBLIC")
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
}
