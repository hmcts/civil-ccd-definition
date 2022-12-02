package uk.gov.hmcts.reform.civil.ccdvalidation;

import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.util.Iterator;

public abstract class CCDFileValidatorBase implements CCDFileValidator {

    abstract void validate(XSSFWorkbook workbook, String originalErrorMessage, Integer originalStatusCode);

    @SneakyThrows
    public void validate(File file, String originalErrorMessage, Integer originalStatusCode) {
        try (XSSFWorkbook workbook = new XSSFWorkbook(file)) {
            validate(workbook, originalErrorMessage, originalStatusCode);
        }
    }

    int getColumnIndex(String colName, Row headingRow) {
        Iterator<Cell> cellIterator = headingRow.cellIterator();
        int index = -1;
        while (cellIterator.hasNext()) {
            index++;
            Cell cell = cellIterator.next();
            //Check the cell type and format accordingly
            if (cell.getCellType() == CellType.STRING && colName.equalsIgnoreCase(cell.getStringCellValue())) {
                return index;
            }
        }
        throw new IllegalArgumentException("Could not find a matching column for " + colName
                                               + " in the provided heading row.");
    }

    String getCellStringValue(Cell cell, String defaultValue) {
        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue();
        }
        if (cell.getCellType() == CellType.BLANK) {
            return defaultValue;
        }
        throw new IllegalArgumentException("The cell is not of String type and is not blank. Actual type: "
                                               + cell.getCellType().name());
    }

}
