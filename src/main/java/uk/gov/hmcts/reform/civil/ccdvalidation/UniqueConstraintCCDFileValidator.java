package uk.gov.hmcts.reform.civil.ccdvalidation;

import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public abstract class UniqueConstraintCCDFileValidator implements CCDFileValidator {

    abstract List<String> getPrimaryKeyColumns();

    abstract String getSheetName();

    void applyCustomErrorHints(StringBuilder msg) {
        // nothing for us to do here. This is for subclasses to override as needed
    }

    @SneakyThrows
    public void validate(File file) {
        try (XSSFWorkbook workbook = new XSSFWorkbook(file)) {
            validate(workbook);
        }
    }

    void validate(XSSFWorkbook workbook) {
        Map<String, Integer> counters = new HashMap<>();
        Set<String> duplicates = new HashSet<>();
        Sheet sheet = workbook.getSheet(getSheetName());

        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();
        rowIterator.next();
        Row headingRow = rowIterator.next();
        List<ColumnInfo> primaryKeyInfo = prepareColumnsInfo(headingRow, getPrimaryKeyColumns());

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            String primaryKey = extractPrimaryKeyValue(row, primaryKeyInfo);
            counters.putIfAbsent(primaryKey, 0);
            counters.computeIfPresent(primaryKey, (k, v) -> v + 1);
            if (counters.get(primaryKey) > 1) {
                duplicates.add(primaryKey);
            }
        }

        verifyDuplicates(duplicates, extractPrimaryKeyName(primaryKeyInfo));
    }

    void verifyDuplicates(Set<String> duplicates, String primaryKeyName) {
        if (!duplicates.isEmpty()) {
            StringBuilder msg = new StringBuilder("The following entries of " + getSheetName() + " are duplicate:\n");
            duplicates.forEach(entry -> msg.append(entry).append("\n"));
            msg.append("Please check your CCD configuration changes and ensure the combination of")
                .append(primaryKeyName)
                .append(" is always unique.")
                .append("\n");
            applyCustomErrorHints(msg);

            throw new CCDValidationError(msg.toString());
        }
    }

    String getCellStringValue(Cell cell) {
        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue();
        }
        throw new IllegalArgumentException("The cell is not of String type.");
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

    List<ColumnInfo> prepareColumnsInfo(Row headingRow, List<String> columnNames) {
        List<ColumnInfo> results = new ArrayList<>();
        for (String colName : columnNames) {
            results.add(new ColumnInfo(colName, getColumnIndex(colName, headingRow)));
        }
        return results;
    }

    String extractPrimaryKeyValue(Row row, List<ColumnInfo> primaryKeyInfo) {
        StringBuilder result = new StringBuilder();
        boolean first = true;
        for (ColumnInfo col : primaryKeyInfo) {
            result.append(getCellStringValue(row.getCell(col.index)));
            if (first) {
                result.append("/");
            }
            first = false;
        }
        return result.toString();
    }

    String extractPrimaryKeyName(List<ColumnInfo> primaryKeyInfo) {
        StringBuilder result = new StringBuilder();
        boolean first = true;
        for (ColumnInfo col : primaryKeyInfo) {
            result.append(col.name);
            if (first) {
                result.append("/");
            }
            first = false;
        }
        return result.toString();
    }

    private static class ColumnInfo {
        String name;
        int index;

        ColumnInfo(String name, int index) {
            this.name = name;
            this.index = index;
        }
    }
}
