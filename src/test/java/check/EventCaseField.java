package check;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.tuple.Pair;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * locates duplicated pairs of Event Case Field and shows them in the console
 */
public class EventCaseField {
    private static final Path FOLDER = Paths.get(
        "/home/elfasij/workspace/HMCTS-Damages/civil-ccd-definition/ccd-definition/CaseEventToFields"
    );

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void main(String[] args) throws IOException {
        Map<Pair<String, String>, List<Path>> duplicated = getDuplicated(
            path -> path.getFileName().toString().toLowerCase().endsWith("-prod.json"));
        duplicated.forEach((key, listPaths) -> {
            System.out.println("Event " + key.getKey());
            System.out.println("Field " + key.getValue());
            listPaths.forEach(System.out::println);
            System.out.println();
        });
    }

    @SuppressWarnings({"unchecked", "MismatchedQueryAndUpdateOfCollection"})
    private static Map<Pair<String, String>, List<Path>> getDuplicated(Predicate<Path> exclude) throws IOException {
        Map<Pair<String, String>, List<Path>> fieldToFile = new HashMap<>();
        List<Path> allFiles = Files.list(FOLDER).filter(Predicate.not(exclude)).collect(Collectors.toList());
        for (Path path : allFiles) {
            List<Map<String, Object>> items = (List<Map<String, Object>>) objectMapper.readValue(
                path.toFile(),
                List.class
            );
            for (Map<String, Object> item : items) {
                String field = item.get("CaseFieldID").toString();
                String event = item.get("CaseEventID").toString();
                Pair<String, String> key = Pair.of(event, field);
                List<Path> list = fieldToFile.getOrDefault(key, new ArrayList<>());
                list.add(path);
            }
        }
        List<Pair<String, String>> toRemove = fieldToFile.keySet().stream()
            .filter(key -> fieldToFile.get(key).size() < 2)
            .collect(Collectors.toList());
        toRemove.forEach(fieldToFile::remove);
        return fieldToFile;
    }
}
