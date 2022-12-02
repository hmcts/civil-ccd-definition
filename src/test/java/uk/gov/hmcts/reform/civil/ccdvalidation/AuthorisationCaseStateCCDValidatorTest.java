package uk.gov.hmcts.reform.civil.ccdvalidation;

import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AuthorisationCaseStateCCDValidatorTest {

    private final AuthorisationCaseStateCCDValidator validator = new AuthorisationCaseStateCCDValidator();

    @Test
    void verifyDuplicatesAreReported() {
        // Given: a collection of entries that are believed to be duplicates
        Set<String> duplicates = new HashSet<>();
        duplicates.add("Duplicate 1");
        duplicates.add("Duplicate 2");

        // When: I call the verifyDuplicates method
        CCDValidationError ex = assertThrows(CCDValidationError.class,
            () -> validator.verifyDuplicates(duplicates, "Key1/Key2", "Conflict", 409));

        // Then: The resulting error message contains a reference to each duplicated entry
        assertThat(ex.getMessage(), containsString("Duplicate 1"));
        assertThat(ex.getMessage(), containsString("Duplicate 2"));
    }

    @Test
    void verifyOriginalHttpErrorReported() {
        // Given: a collection of entries that are believed to be duplicates
        Set<String> duplicates = new HashSet<>();
        duplicates.add("Duplicate 1");
        duplicates.add("Duplicate 2");

        // When: I call the verifyDuplicates method
        CCDValidationError ex = assertThrows(CCDValidationError.class,
            () -> validator.verifyDuplicates(duplicates, "Key1/Key2",
                "Conflict", 409));

        // Then: The resulting error message contains a reference to each duplicated entry
        assertThat(ex.getMessage(), containsString("Conflict"));
        assertThat(ex.getMessage(), containsString("409"));
    }

    @Test
    @SneakyThrows
    void verifyValidateDetectsDuplicates() {
        // Given: a spreadsheet containing duplicate entries for the columns we are interested into
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("AuthorisationCaseState");
            sheet.createRow(0);
            sheet.createRow(1);
            Row headingRow = sheet.createRow(2);
            headingRow.createCell(0).setCellValue("boh");
            headingRow.createCell(1).setCellValue("CaseStateID");
            headingRow.createCell(2).setCellValue("UserRole");

            Row dataRow1 = sheet.createRow(3);
            dataRow1.createCell(0).setCellValue("unimportant 1");
            dataRow1.createCell(1).setCellValue("STATE_1");
            dataRow1.createCell(2).setCellValue("ROLE_1");
            Row dataRow2 = sheet.createRow(4);
            dataRow2.createCell(0).setCellValue("unimportant 2");
            dataRow2.createCell(1).setCellValue("STATE_1");
            dataRow2.createCell(2).setCellValue("ROLE_1");
            workbook.write(outputStream);
        }
        try (XSSFWorkbook workbookToValidate = new XSSFWorkbook(new ByteArrayInputStream(outputStream.toByteArray()))) {

            // When: I try to validate the spreadsheet
            CCDValidationError ex = assertThrows(CCDValidationError.class,
                () -> validator.validate(workbookToValidate, "Conflict", 409));

            // Then: an exception is thrown
            assertThat(ex.getMessage(), containsString("STATE_1/ROLE_1"));
        }
    }

    @Test
    @SneakyThrows
    void verifyValidateWithNoDuplicates() {
        // Given: a spreadsheet containing duplicate entries for the columns we are interested into
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("AuthorisationCaseState");
            sheet.createRow(0);
            sheet.createRow(1);
            Row headingRow = sheet.createRow(2);
            headingRow.createCell(0).setCellValue("boh");
            headingRow.createCell(1).setCellValue("CaseStateID");
            headingRow.createCell(2).setCellValue("UserRole");

            Row dataRow1 = sheet.createRow(3);
            dataRow1.createCell(0).setCellValue("unimportant 1");
            dataRow1.createCell(1).setCellValue("STATE_1");
            dataRow1.createCell(2).setCellValue("ROLE_1");
            Row dataRow2 = sheet.createRow(4);
            dataRow2.createCell(0).setCellValue("unimportant 2");
            dataRow2.createCell(1).setCellValue("STATE_1");
            dataRow2.createCell(2).setCellValue("ROLE_2");
            workbook.write(outputStream);
        }
        try (XSSFWorkbook workbookToValidate = new XSSFWorkbook(new ByteArrayInputStream(outputStream.toByteArray()))) {

            // When: I try to validate the spreadsheet
            validator.validate(workbookToValidate, "Conflict", 409);

            // Then: it's all good
            // all is fine if we get here
        }
    }

    @Test
    @SneakyThrows
    void verifyValidateWithNumericalDataDoesntWork() {
        // Given: a spreadsheet containing duplicate entries for the columns we are interested into
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("AuthorisationCaseState");
            sheet.createRow(0);
            sheet.createRow(1);
            Row headingRow = sheet.createRow(2);
            headingRow.createCell(0).setCellValue("boh");
            headingRow.createCell(1).setCellValue("CaseStateID");
            headingRow.createCell(2).setCellValue("UserRole");

            Row dataRow1 = sheet.createRow(3);
            dataRow1.createCell(0).setCellValue("unimportant 1");
            dataRow1.createCell(1).setCellValue(1);
            dataRow1.createCell(2).setCellValue(1);
            Row dataRow2 = sheet.createRow(4);
            dataRow2.createCell(0).setCellValue("unimportant 2");
            dataRow2.createCell(1).setCellValue(1);
            dataRow2.createCell(2).setCellValue(2);
            workbook.write(outputStream);
        }
        try (XSSFWorkbook workbookToValidate = new XSSFWorkbook(new ByteArrayInputStream(outputStream.toByteArray()))) {

            // When: I try to validate the spreadsheet
            IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> validator.validate(workbookToValidate, "Conflict", 409));

            // Then: an exception is thrown
            assertThat(ex.getMessage(), containsString("The cell is not of String type and is not blank."
                                                           + " Actual type: NUMERIC"));
        }
    }

    @Test
    @SneakyThrows
    void verifyValidateWithWrongColumnsDoesntWork() {
        // Given: a spreadsheet containing duplicate entries for the columns we are interested into
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("AuthorisationCaseState");
            sheet.createRow(0);
            sheet.createRow(1);
            Row headingRow = sheet.createRow(2);
            headingRow.createCell(0).setCellValue("boh");
            headingRow.createCell(1).setCellValue("CaseStateID");
            headingRow.createCell(2).setCellValue("UnknownColumn");

            Row dataRow1 = sheet.createRow(3);
            dataRow1.createCell(0).setCellValue("unimportant 1");
            dataRow1.createCell(1).setCellValue(1);
            dataRow1.createCell(2).setCellValue(1);
            Row dataRow2 = sheet.createRow(4);
            dataRow2.createCell(0).setCellValue("unimportant 2");
            dataRow2.createCell(1).setCellValue(1);
            dataRow2.createCell(2).setCellValue(2);
            workbook.write(outputStream);
        }
        try (XSSFWorkbook workbookToValidate = new XSSFWorkbook(new ByteArrayInputStream(outputStream.toByteArray()))) {

            // When: I try to validate the spreadsheet
            IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> validator.validate(workbookToValidate, "Conflict", 409));

            // Then: an exception is thrown
            assertThat(ex.getMessage(), containsString("Could not find a matching column for UserRole"
                + " in the provided heading row."));
        }
    }

    @Test
    @SneakyThrows
    void verifyValidateNoDuplicatesOnEmptySheet() {
        // Given: a spreadsheet containing duplicate entries for the columns we are interested into
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("AuthorisationCaseState");
            sheet.createRow(0);
            sheet.createRow(1);
            Row headingRow = sheet.createRow(2);
            headingRow.createCell(0).setCellValue("boh");
            headingRow.createCell(1).setCellValue("CaseStateID");
            headingRow.createCell(2).setCellValue("UserRole");

            workbook.write(outputStream);
        }
        try (XSSFWorkbook workbookToValidate = new XSSFWorkbook(new ByteArrayInputStream(outputStream.toByteArray()))) {

            // When: I try to validate the spreadsheet
            validator.validate(workbookToValidate, "Conflict", 409);

            // Then: it's all good
            // all is fine if we get here
        }
    }

}
