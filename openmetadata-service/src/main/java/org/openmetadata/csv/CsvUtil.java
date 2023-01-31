/*
 *  Copyright 2021 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package org.openmetadata.csv;

import static org.openmetadata.common.utils.CommonUtil.listOf;
import static org.openmetadata.common.utils.CommonUtil.listOrEmpty;
import static org.openmetadata.common.utils.CommonUtil.nullOrEmpty;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVFormat.Builder;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.openmetadata.schema.type.EntityReference;
import org.openmetadata.schema.type.TagLabel;
import org.openmetadata.schema.type.csv.CsvFile;
import org.openmetadata.schema.type.csv.CsvHeader;

public final class CsvUtil {
  public static final String SEPARATOR = ",";
  public static final String FIELD_SEPARATOR = ";";
  public static final String LINE_SEPARATOR = "\r\n";

  private CsvUtil() {
    // Utility class hides the constructor
  }

  public static String formatCsv(CsvFile csvFile) throws IOException {
    // CSV file is generated by the backend and the data exported is expected to be correct. Hence, no validation
    StringWriter writer = new StringWriter();
    List<String> headers = getHeaders(csvFile.getHeaders());
    CSVFormat csvFormat = Builder.create(CSVFormat.DEFAULT).setHeader(headers.toArray(new String[0])).build();
    try (CSVPrinter printer = new CSVPrinter(writer, csvFormat)) {
      for (List<String> record : listOrEmpty(csvFile.getRecords())) {
        printer.printRecord(record);
      }
    }
    return writer.toString();
  }

  /** Get headers from CsvHeaders */
  public static List<String> getHeaders(List<CsvHeader> csvHeaders) {
    List<String> headers = new ArrayList<>();
    for (CsvHeader header : csvHeaders) {
      String headerString = header.getRequired() ? String.format("%s*", header.getName()) : header.getName();
      headers.add(headerString);
    }
    return headers;
  }

  public static String recordToString(CSVRecord record) {
    return recordToString(record.toList());
  }

  public static String recordToString(List<String> fields) {
    return nullOrEmpty(fields)
        ? ""
        : fields.stream().map(str -> str.contains(SEPARATOR) ? quote(str) : str).collect(Collectors.joining(SEPARATOR));
  }

  public static String recordToString(String[] fields) {
    return recordToString(Arrays.asList(fields));
  }

  public static List<String> fieldToStrings(String field) {
    // Split a field that contains multiple strings separated by FIELD_SEPARATOR
    return field == null ? null : listOf(field.split(FIELD_SEPARATOR));
  }

  public static String quote(String field) {
    return String.format("\"%s\"", field);
  }

  /** Quote a CSV field made of multiple strings that has SEPARATOR or FIELD_SEPARATOR with " " */
  public static String quoteField(List<String> field) {
    return nullOrEmpty(field)
        ? ""
        : field.stream()
            .map(str -> str.contains(SEPARATOR) || str.contains(FIELD_SEPARATOR) ? quote(str) : str)
            .collect(Collectors.joining(FIELD_SEPARATOR));
  }

  public static List<String> addField(List<String> record, Boolean field) {
    record.add(field == null ? "" : field.toString());
    return record;
  }

  public static List<String> addField(List<String> record, String field) {
    record.add(field);
    return record;
  }

  public static List<String> addFieldList(List<String> record, List<String> field) {
    record.add(quoteField(field));
    return record;
  }

  public static List<String> addEntityReferences(List<String> record, List<EntityReference> refs) {
    record.add(
        nullOrEmpty(refs)
            ? null
            : refs.stream().map(EntityReference::getFullyQualifiedName).collect(Collectors.joining(FIELD_SEPARATOR)));
    return record;
  }

  public static List<String> addEntityReference(List<String> record, EntityReference ref) {
    record.add(nullOrEmpty(ref) ? null : ref.getFullyQualifiedName());
    return record;
  }

  public static List<String> addTagLabels(List<String> record, List<TagLabel> tags) {
    record.add(
        nullOrEmpty(tags) ? null : tags.stream().map(TagLabel::getTagFQN).collect(Collectors.joining(FIELD_SEPARATOR)));
    return record;
  }
}
