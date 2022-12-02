package uk.gov.hmcts.reform.civil.ccdvalidation;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public abstract class UniqueConstraintCCDFileValidator extends CCDFileValidatorBase {

    abstract List<String> getPrimaryKeyColumns();

    abstract String getSheetName();

    void applyCustomErrorHints(StringBuilder msg) {
        // nothing for us to do here. This is for subclasses to override as needed
    }

    void validate(XSSFWorkbook workbook, String originalErrorMessage, Integer originalStatusCode) {
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

        verifyDuplicates(duplicates, extractPrimaryKeyName(primaryKeyInfo), originalErrorMessage, originalStatusCode);
    }

    void verifyDuplicates(Set<String> duplicates, String primaryKeyName, String originalErrorMessage,
                          Integer originalStatusCode) {
        if (!duplicates.isEmpty()) {
            StringBuilder msg = new StringBuilder();
            msg.append(String.format("The import failed with the following error during CCD import:%n"));
            msg.append(String.format("    HTTP Status Code: %d%n", originalStatusCode));
            msg.append(String.format("    Message: %s%n", originalErrorMessage));
            msg.append("\n");
            msg.append(String.format("The following entries of %s are duplicate:%n", getSheetName()));
            duplicates.forEach(entry -> msg.append(entry).append("\n"));
            msg.append("Please check your CCD configuration changes and ensure the combination of ")
                .append(primaryKeyName)
                .append(" is always unique.")
                .append("\n");
            applyCustomErrorHints(msg);

            throw new CCDValidationError(msg.toString());
        }
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
            result.append(getCellStringValue(row.getCell(col.index), ""));
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
