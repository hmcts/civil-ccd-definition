package uk.gov.hmcts.reform.civil;

import uk.gov.hmcts.befta.DefaultTestAutomationAdapter;
import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.dse.ccd.DataLoaderToDefinitionStore;

import java.util.List;
import java.util.Locale;

public class HighLevelDataSetupApp extends DataLoaderToDefinitionStore {

    private final CcdEnvironment environment;

    public HighLevelDataSetupApp(CcdEnvironment dataSetupEnvironment ) {
        super(new DefaultTestAutomationAdapter(), VALID_CCD_TEST_DEFINITIONS_PATH, dataSetupEnvironment);
        environment = dataSetupEnvironment;
    }

    public static void main(String[] args) throws Throwable {
        if (CcdEnvironment.valueOf(args[0].toUpperCase(Locale.UK)).equals(CcdEnvironment.PROD)) {
            return;
        }

        if (CcdEnvironment.valueOf(args[0].toUpperCase(Locale.UK)).equals(CcdEnvironment.PREVIEW)) {
            return;
        }

        main(HighLevelDataSetupApp.class, args);
    }

    @Override
    protected boolean shouldTolerateDataSetupFailure() {
        return true;
    }

    @Override
    protected List<String> getAllDefinitionFilesToLoadAt(String definitionsPath) {
        String environmentName = environment.name().toLowerCase(Locale.UK);
        return List.of(String.format("build/ccd-release-config/civil-ccd-%s.xlsx", environmentName));
    }
}
