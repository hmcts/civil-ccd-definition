package uk.gov.hmcts.reform.civil;

import org.junit.jupiter.api.Test;
import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.exception.ImportException;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Queue;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

class HighLevelDataSetupAppTest {

    @Test
    void shouldTreatGatewayTimeoutAsSuccessWhenCaseTypeVersionChanges() {
        TestHighLevelDataSetupApp app = new TestHighLevelDataSetupApp("1", "2");
        ImportException timeout = new ImportException("Gateway Timeout", 504);
        app.throwOnImport(timeout);

        assertDoesNotThrow(() -> app.importDefinition("build/ccd-release-config/civil-ccd-aat.xlsx"));

        assertEquals(1, app.importAttempts);
        assertEquals(2, app.versionChecks);
        assertEquals("CIVIL", app.lastCaseType);
    }

    @Test
    void shouldTreatGatewayTimeoutAsSuccessForGeneralApplicationWhenVersionChanges() {
        TestHighLevelDataSetupApp app = new TestHighLevelDataSetupApp("7", "8");
        app.throwOnImport(new ImportException("Gateway Timeout", 504));

        assertDoesNotThrow(() -> app.importDefinition("build/ccd-release-config/civil-ga-ccd-aat.xlsx"));

        assertEquals("GENERALAPPLICATION", app.lastCaseType);
    }

    @Test
    void shouldRethrowGatewayTimeoutWhenCaseTypeVersionDoesNotChange() {
        TestHighLevelDataSetupApp app = new TestHighLevelDataSetupApp("1", "1", "1");
        ImportException timeout = new ImportException("Gateway Timeout", 504);
        app.throwOnImport(timeout);

        ImportException thrown = assertThrows(
            ImportException.class,
            () -> app.importDefinition("build/ccd-release-config/civil-ccd-aat.xlsx")
        );

        assertSame(timeout, thrown);
        assertEquals(3, app.versionChecks);
    }

    @Test
    void shouldRethrowNonGatewayTimeoutImportFailures() {
        TestHighLevelDataSetupApp app = new TestHighLevelDataSetupApp("1");
        ImportException serverError = new ImportException("Internal Server Error", 500);
        app.throwOnImport(serverError);

        ImportException thrown = assertThrows(
            ImportException.class,
            () -> app.importDefinition("build/ccd-release-config/civil-ccd-aat.xlsx")
        );

        assertSame(serverError, thrown);
        assertEquals(1, app.versionChecks);
    }

    private static class TestHighLevelDataSetupApp extends HighLevelDataSetupApp {
        private final Queue<String> versions = new ArrayDeque<>();
        private ImportException importException;
        private int importAttempts;
        private int versionChecks;
        private String lastCaseType;

        TestHighLevelDataSetupApp(String... versions) {
            super(CcdEnvironment.AAT, "http://localhost");
            this.versions.addAll(Arrays.asList(versions));
        }

        void throwOnImport(ImportException importException) {
            this.importException = importException;
        }

        @Override
        protected void importDefinitionFile(String fileResourcePath) throws IOException {
            importAttempts++;
            if (importException != null) {
                throw importException;
            }
        }

        @Override
        protected String getCaseTypeVersion(String caseType) {
            versionChecks++;
            lastCaseType = caseType;
            return versions.poll();
        }

        @Override
        protected int getVersionPollMaxAttempts() {
            return 2;
        }

        @Override
        protected void waitBeforeVersionCheck() {
            // Keep the 504 verification tests fast.
        }
    }
}
