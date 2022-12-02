package uk.gov.hmcts.reform.civil.ccdvalidation;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class CaseTypeTabHasLabelCCDValidator extends CCDFileValidatorBase implements PreUploadCCDFileValidator {

    void validate(XSSFWorkbook workbook, String originalErrorMessage, Integer originalStatusCode) {

        Sheet sheet = workbook.getSheet("CaseTypeTab");

        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();
        rowIterator.next();
        Row headingRow = rowIterator.next();
        int tabIdCol = getColumnIndex("TabID", headingRow);
        int tabLabelCol = getColumnIndex("TabLabel", headingRow);

        Map<String, Set<String>> tabLabels = new HashMap<>();
        while (rowIterator.hasNext()) {
            collectTabLabels(tabLabels, rowIterator, tabIdCol, tabLabelCol);
        }

        checkForTabsWithoutLabel(tabLabels);
    }

    private void collectTabLabels(Map<String, Set<String>> tabLabels, Iterator<Row> rowIterator, int tabIdCol,
                           int tabLabelCol) {
        Row row = rowIterator.next();
        String tabId = getCellStringValue(row.getCell(tabIdCol), "");
        String tabLabel = getCellStringValue(row.getCell(tabLabelCol), "");
        tabLabels.putIfAbsent(tabId, new HashSet<>());
        tabLabels.computeIfPresent(tabId, (key, value) -> {
            value.add(tabLabel);
            return value;
        });
    }

    private static void checkForTabsWithoutLabel(Map<String, Set<String>> tabLabels) {
        List<Map.Entry<String, Set<String>>> emptyLabels =
            tabLabels.entrySet().stream()
                .filter(entry -> entry.getValue().contains("") && entry.getValue().size() == 1)
                .collect(Collectors.toList());

        if (!emptyLabels.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            emptyLabels.forEach(entry -> {
                sb.append(entry.getKey());
                sb.append("\n");
            });

            throw new CCDValidationError("Some tabs as defined in the 'CaseTypeTab' spreadsheet are missing a"
                                             + " 'TabLabel' or left it empty. This will result in an empty tab or a"
                                             + " tab without label being shown.\n"
                                             + "This error is normally the result of a typo, so check your CCD"
                                             + " definitions in the 'CaseTypeTab' directory and see if there's any"
                                             + " typo in the TabID column. If you added a tab with multiple fields,"
                                             + " ensure that one of them has a 'TabLabel' property.\n"
                                             + "The following are the tabs without a proper 'TabLabel' value: \n" + sb);
        }
    }
}
