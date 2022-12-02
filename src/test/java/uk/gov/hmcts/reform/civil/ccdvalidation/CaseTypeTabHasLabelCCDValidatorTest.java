package uk.gov.hmcts.reform.civil.ccdvalidation;

import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CaseTypeTabHasLabelCCDValidatorTest {

    private final CaseTypeTabHasLabelCCDValidator validator = new CaseTypeTabHasLabelCCDValidator();

    @Test
    @SneakyThrows
    void verifyValidateWithEmptyTabLabelReportsRowsWithProblems() {
        // Given: a spreadsheet containing empty TabLabel values
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("CaseTypeTab");
            sheet.createRow(0);
            sheet.createRow(1);
            Row headingRow = sheet.createRow(2);
            headingRow.createCell(0).setCellValue("boh");
            headingRow.createCell(1).setCellValue("TabID");
            headingRow.createCell(2).setCellValue("TabLabel");

            Row dataRow1 = sheet.createRow(3);
            dataRow1.createCell(0).setCellValue("unimportant 1");
            dataRow1.createCell(1).setCellValue("someRandomValue");
            dataRow1.createCell(2).setCellValue("");
            Row dataRow2 = sheet.createRow(4);
            dataRow2.createCell(0).setCellValue("unimportant 2");
            dataRow2.createCell(1).setCellValue("someRandomValue");
            dataRow2.createCell(2).setCellValue("");
            workbook.write(outputStream);
        }
        try (XSSFWorkbook workbookToValidate = new XSSFWorkbook(new ByteArrayInputStream(outputStream.toByteArray()))) {

            // When: I try to validate the spreadsheet
            CCDValidationError ex = assertThrows(CCDValidationError.class,
                () -> validator.validate(workbookToValidate, "", null));

            // Then: an exception is thrown that references someRandomValue and explains the nature of the issue
            assertThat(ex.getMessage(), containsString("someRandomValue"));
            assertThat(ex.getMessage(), containsString("Some tabs as defined in the 'CaseTypeTab' "
                + "spreadsheet are missing a 'TabLabel'"));
        }
    }

    @Test
    @SneakyThrows
    void verifyValidateWithEmptyTabLabelBlankCell() {
        // Given: a spreadsheet containing empty (not defined at all) TabLabel values
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("CaseTypeTab");
            sheet.createRow(0);
            sheet.createRow(1);
            Row headingRow = sheet.createRow(2);
            headingRow.createCell(0).setCellValue("boh");
            headingRow.createCell(1).setCellValue("TabID");
            headingRow.createCell(2).setCellValue("TabLabel");

            Row dataRow1 = sheet.createRow(3);
            dataRow1.createCell(0).setCellValue("unimportant 1");
            dataRow1.createCell(1).setCellValue("someRandomValue");
            dataRow1.createCell(2).setBlank();
            Row dataRow2 = sheet.createRow(4);
            dataRow2.createCell(0).setCellValue("unimportant 2");
            dataRow2.createCell(1).setCellValue("someRandomValue");
            dataRow2.createCell(2).setBlank();
            workbook.write(outputStream);
        }
        try (XSSFWorkbook workbookToValidate = new XSSFWorkbook(new ByteArrayInputStream(outputStream.toByteArray()))) {

            // When: I try to validate the spreadsheet
            CCDValidationError ex = assertThrows(CCDValidationError.class,
                () -> validator.validate(workbookToValidate, "", null));

            // Then: an exception is thrown that references someRandomValue and explains the nature of the issue
            assertThat(ex.getMessage(), containsString("someRandomValue"));
        }
    }

}
