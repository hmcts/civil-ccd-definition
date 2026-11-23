import {
  AlignmentType, BorderStyle, Document, HeadingLevel, LevelFormat, Packer, Paragraph, ShadingType, Table, TableCell,
  TableRow, TextRun, WidthType,
} from 'docx';

// Turns the Markdown the playwright-tests guides use into a Word document: headings (#, ##, ###), paragraphs, bullet
// and numbered lists with one nested level, "- [ ]" checklist items, tables, fenced code blocks, **bold** and `code`.
// Every run is Arial, apart from code, which is Courier New. Lines that are HTML comments (<!-- ... -->) are left out.
// The page is A4 with 1 inch margins. generate-guides.ts uses it for the guides' .docx versions.

const FONT = 'Arial';
const CODE = 'Courier New';
const SIZE = 22; // 11pt
const TABLE_WIDTH = 9026; // A4 width less 1 inch margins, in DXA

// Inline **bold** and `code` as runs, each with its font set, as some viewers ignore the document's default font
function runs(text: string, { bold = false, size = SIZE } = {}): TextRun[] {
  const out: TextRun[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) {
      out.push(new TextRun({ text: text.slice(last, match.index), font: FONT, bold, size }));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      out.push(...runs(token.slice(2, -2), { bold: true, size }));
    } else {
      out.push(new TextRun({ text: token.slice(1, -1), font: CODE, bold, size: size - 2 }));
    }
    last = match.index + token.length;
  }
  if (last < text.length) {
    out.push(new TextRun({ text: text.slice(last), font: FONT, bold, size }));
  }
  return out;
}

const border = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const borders = { top: border, bottom: border, left: border, right: border };

function table(rows: string[][]): Table {
  const columns = rows[0].length;
  // A wider first column for three-column tables; the rest share what is left
  const first = Math.round(TABLE_WIDTH * (columns === 3 ? 0.26 : 1 / columns));
  const rest = Math.floor((TABLE_WIDTH - first) / (columns - 1));
  const widths = [first, ...Array(columns - 1).fill(rest)];
  widths[columns - 1] += TABLE_WIDTH - widths.reduce((total, width) => total + width, 0);
  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((cells, row) => new TableRow({
      tableHeader: row === 0,
      children: cells.map((cell, column) => new TableCell({
        width: { size: widths[column], type: WidthType.DXA },
        borders,
        shading: row === 0 ? { type: ShadingType.CLEAR, fill: 'D9E2F3', color: 'auto' } : undefined,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: runs(cell, { bold: row === 0, size: 20 }) })],
      })),
    })),
  });
}

const listItem = /^(\s*)(- |\d+\. )(.*)/;

function body(lines: string[]): Array<Paragraph | Table> {
  const children: Array<Paragraph | Table> = [];
  let index = 0;
  let numberedLists = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim() || /^<!--.*-->$/.test(line.trim())) {
      index++;
      continue;
    }
    if (line.startsWith('```')) {
      index++;
      const code: string[] = [];
      while (index < lines.length && !lines[index].startsWith('```')) {
        code.push(lines[index]);
        index++;
      }
      index++;
      const indent = Math.min(...code.filter((text) => text.trim()).map((text) => (text.match(/^ */) as RegExpMatchArray)[0].length));
      code.map((text) => text.slice(indent)).forEach((text, n) => children.push(new Paragraph({
        shading: { type: ShadingType.CLEAR, fill: 'F2F2F2', color: 'auto' },
        spacing: { before: n === 0 ? 120 : 0, after: n === code.length - 1 ? 160 : 0 },
        children: [new TextRun({ text: text || ' ', font: CODE, size: 18 })],
      })));
      continue;
    }
    const heading = line.match(/^(#{1,3}) (.*)/);
    if (heading) {
      const depth = heading[1].length - 1;
      const level = [HeadingLevel.TITLE, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2][depth];
      children.push(new Paragraph({ heading: level, children: runs(heading[2], { bold: true, size: [36, 30, 26][depth] }) }));
      index++;
      continue;
    }
    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].startsWith('|')) {
        const cells = lines[index].split('|').slice(1, -1).map((cell) => cell.trim());
        if (!cells.every((cell) => /^-+$/.test(cell))) {
          rows.push(cells);
        }
        index++;
      }
      children.push(table(rows));
      children.push(new Paragraph({ children: [] }));
      continue;
    }
    if (listItem.test(line)) {
      const instance = numberedLists++;
      let item: RegExpMatchArray | null;
      while (index < lines.length && (item = lines[index].match(listItem))) {
        const level = item[1].length >= 2 ? 1 : 0;
        const numbered = /\d/.test(item[2]);
        const text = item[3];
        children.push(new Paragraph({
          numbering: numbered ? { reference: 'numbers', level, instance } : { reference: 'bullets', level },
          spacing: { after: 60 },
          children: text.startsWith('[ ] ') ? [new TextRun({ text: '☐  ', font: FONT, size: SIZE }), ...runs(text.slice(4))] : runs(text),
        }));
        index++;
      }
      continue;
    }
    children.push(new Paragraph({ spacing: { after: 120 }, children: runs(line) }));
    index++;
  }
  return children;
}

const headingStyle = (size: number) => ({
  run: { font: FONT, size, bold: true, color: '1F3864' },
  paragraph: { spacing: { before: 240, after: 120 }, keepNext: true },
});

const bulletLevels = [
  { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { run: { font: FONT }, paragraph: { indent: { left: 720, hanging: 360 } } } },
  { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { run: { font: FONT }, paragraph: { indent: { left: 1440, hanging: 360 } } } },
];

export async function markdownToDocx(markdown: string): Promise<Buffer> {
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: SIZE } },
        title: headingStyle(36),
        heading1: headingStyle(30),
        heading2: headingStyle(26),
      },
    },
    numbering: {
      config: [
        { reference: 'bullets', levels: bulletLevels },
        {
          reference: 'numbers',
          levels: [
            { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { run: { font: FONT }, paragraph: { indent: { left: 720, hanging: 360 } } } },
            bulletLevels[1],
          ],
        },
      ],
    },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      children: body(markdown.split('\n')),
    }],
  });
  return Packer.toBuffer(doc);
}
