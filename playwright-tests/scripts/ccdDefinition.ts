import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

// Reads the CIVIL case type's CCD definition, which is in this repository, for new-event.ts: the events, the pages and
// fields of each, and each field's type and label

const definitionFolder = path.resolve(__dirname, '../../ccd-definition/civil');

export interface CcdEvent {
  ID: string;
  Name: string;
  Description?: string;
  'PreConditionState(s)'?: string;
  PostConditionState?: string;
  ShowSummary?: string;
  // When XUI offers the event in Next step, as a show condition on the case data
  EventEnablingCondition?: string;
}

// Whether the definition hides the event from XUI's Next step list for everyone (it can only be done through the API)
export function hiddenFromXui(event: CcdEvent): boolean {
  return (event.EventEnablingCondition ?? '').includes('DO_NOT_SHOW_IN_UI');
}

interface CcdEventField {
  CaseEventID: string;
  CaseFieldID: string;
  PageID: string;
  PageDisplayOrder?: number;
  PageFieldDisplayOrder?: number;
  DisplayContext?: string;
  FieldShowCondition?: string;
  PageShowCondition?: string;
  PageLabel?: string;
}

interface CcdField {
  ID: string;
  Label?: string;
  FieldType: string;
  FieldTypeParameter?: string;
}

export interface EventPageField {
  id: string;
  label: string;
  type: string;
  // MANDATORY, OPTIONAL, READONLY or COMPLEX (a part of a complex field has none)
  displayContext: string;
  showCondition?: string;
  // The element XUI shows it as, for a field you fill in: #<id>, or for a choice #<id>_Yes, #<id>-<code> ...
  element?: string;
  // The codes a list or radio list takes
  values?: string[];
  // The parts of a complex field (or of each item of a collection of complex fields)
  parts?: EventPageField[];
}

interface CcdComplexTypeElement {
  ID: string;
  ListElementCode: string;
  ElementLabel?: string;
  FieldType: string;
  FieldTypeParameter?: string;
}

interface CcdFixedListItem {
  ID: string;
  ListElementCode: string;
}

let complexTypes: Map<string, CcdComplexTypeElement[]> | undefined;
let fixedLists: Map<string, string[]> | undefined;

function complexType(id: string): CcdComplexTypeElement[] | undefined {
  if (complexTypes === undefined) {
    complexTypes = new Map();
    for (const element of rows<CcdComplexTypeElement>('ComplexTypes')) {
      const elements = complexTypes.get(element.ID) ?? [];
      if (!elements.some((existing) => existing.ListElementCode === element.ListElementCode)) {
        elements.push(element);
      }
      complexTypes.set(element.ID, elements);
    }
  }
  return complexTypes.get(id);
}

function fixedList(id: string): string[] | undefined {
  if (fixedLists === undefined) {
    fixedLists = new Map();
    for (const item of rows<CcdFixedListItem>('FixedLists')) {
      const codes = fixedLists.get(item.ID) ?? [];
      if (!codes.includes(item.ListElementCode)) {
        codes.push(item.ListElementCode);
      }
      fixedLists.set(item.ID, codes);
    }
  }
  return fixedLists.get(id);
}

// How XUI shows a field of a type, its values and its parts, given its element ID
function describeField(fieldType: string, parameter: string | undefined, elementId: string, depth: number): Pick<EventPageField, 'type' | 'element' | 'values' | 'parts'> {
  const type = parameter ? `${fieldType} (${parameter})` : fieldType;
  const values = parameter ? fixedList(parameter) : undefined;
  const partsOf = (typeId: string, prefix: string): EventPageField[] | undefined => {
    const elements = depth < 3 ? complexType(typeId) : undefined;
    return elements?.map((element) => ({
      id: element.ListElementCode,
      label: (element.ElementLabel ?? '').split('\n')[0].trim(),
      displayContext: '',
      ...describeField(element.FieldType, element.FieldTypeParameter, `${prefix}_${element.ListElementCode}`, depth + 1),
    }));
  };
  switch (fieldType) {
    case 'YesOrNo':
      return { type, element: `#${elementId}_Yes / #${elementId}_No` };
    case 'FixedRadioList':
    case 'DynamicRadioList':
      return { type, element: `#${elementId}-<code>`, values };
    case 'FixedList':
    case 'DynamicList':
      return { type, element: `#${elementId} (a drop-down)`, values };
    case 'MultiSelectList':
      return { type, element: `#${elementId}-<code> (tick boxes)`, values };
    case 'Date':
    case 'DateTime':
      return { type, element: `#${elementId}-day, -month, -year` };
    case 'Label':
      return { type };
    case 'Collection':
      return { type, element: `#${elementId}_0 ... (press "Add new" first)`, parts: parameter ? partsOf(parameter, `${elementId}_0`) : undefined };
    default: {
      const parts = partsOf(fieldType, elementId);
      return parts ? { type, parts } : { type, element: `#${elementId}` };
    }
  }
}

export interface EventPage {
  id: string;
  label?: string;
  showCondition?: string;
  fields: EventPageField[];
}

// Every row of every JSON file in a folder of the definition (a file holds a list of rows, or just one)
function rows<T>(folder: string): T[] {
  const files = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return files(entryPath);
    }
    return entry.name.endsWith('.json') ? [entryPath] : [];
  });
  return files(path.join(definitionFolder, folder)).flatMap((file) => {
    const content = JSON.parse(readFileSync(file, 'utf8')) as T | T[];
    return Array.isArray(content) ? content : [content];
  });
}

// The events users pick from Next step (the definition's user events), once each
export function userEvents(): CcdEvent[] {
  const byId = new Map<string, CcdEvent>();
  for (const event of rows<CcdEvent>('CaseEvent/User')) {
    if (!byId.has(event.ID)) {
      byId.set(event.ID, event);
    }
  }
  return [...byId.values()];
}

// The event's pages in the order XUI shows them, each with its fields in order. Fields hidden from the UI
// ("DO_NOT_SHOW_IN_UI") are left out.
export function eventPages(eventId: string): EventPage[] {
  const fieldsById = new Map(rows<CcdField>('CaseField').map((field) => [field.ID, field]));
  const eventFields = rows<CcdEventField>('CaseEventToFields').filter((row) => row.CaseEventID === eventId);
  const seen = new Set<string>();
  const unique = eventFields.filter((row) => {
    const key = `${row.PageID}/${row.CaseFieldID}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return !(row.FieldShowCondition ?? '').includes('DO_NOT_SHOW_IN_UI');
  });
  const pages = new Map<string, EventPage & { order: number }>();
  for (const row of unique.sort((a, b) => (a.PageDisplayOrder ?? 0) - (b.PageDisplayOrder ?? 0) || (a.PageFieldDisplayOrder ?? 0) - (b.PageFieldDisplayOrder ?? 0))) {
    const page = pages.get(row.PageID) ?? { id: row.PageID, order: row.PageDisplayOrder ?? 0, fields: [] };
    page.label = page.label ?? row.PageLabel;
    page.showCondition = page.showCondition ?? row.PageShowCondition;
    const field = fieldsById.get(row.CaseFieldID);
    const displayContext = row.DisplayContext ?? 'OPTIONAL';
    const described = field === undefined ? { type: 'unknown' } : describeField(field.FieldType, field.FieldTypeParameter, row.CaseFieldID, 0);
    page.fields.push({
      id: row.CaseFieldID,
      label: (field?.Label ?? '').split('\n')[0].trim(),
      displayContext,
      showCondition: row.FieldShowCondition,
      ...described,
      // A read-only field is only shown, not filled in
      element: displayContext === 'READONLY' ? undefined : described.element,
    });
    pages.set(row.PageID, page);
  }
  return [...pages.values()].sort((a, b) => a.order - b.order).map((page) => ({ id: page.id, label: page.label, showCondition: page.showCondition, fields: page.fields }));
}

interface CcdEventAuthorisation {
  CaseEventID: string;
  AccessControl?: Array<{ UserRoles: string[]; CRUD: string }>;
}

// The roles that can do the event (those with create access to it), from the definition's AuthorisationCaseEvent
export function eventRoles(eventId: string): string[] {
  const roles = rows<CcdEventAuthorisation>('AuthorisationCaseEvent')
    .filter((row) => row.CaseEventID === eventId)
    .flatMap((row) => (row.AccessControl ?? []).filter((access) => access.CRUD.includes('C')).flatMap((access) => access.UserRoles));
  return [...new Set(roles)].sort();
}
