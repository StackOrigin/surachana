import "../styles/pages/Admission.css";
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { jsPDF } from 'jspdf';
import PageHero from '../components/ui/PageHero';
import { uploadAdmissionPdf, submitAdmissionInquiry } from '../utils/api';

const schoolLogoSrc = import.meta.env.DEV
  ? '/schools/surachana/school_logo.jpg'
  : './schools/surachana/school_logo.jpg';

type FormState = {
  formNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dobYear: string;
  dobMonth: string;
  dobDay: string;
  gender: '' | 'Boy' | 'Girl';
  motherTongue: string;
  classApplied: string;
  lastSchool: string;
  lastClass: string;
  lastDivision: string;
  lastPercentage: string;
  lastRank: string;
  chronicDisease: string;
  allergicTo: string;
  admissionType: '' | 'DAY SCHOLAR' | 'SCHOLAR';
  fatherFirstName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  fatherNationality: string;
  fatherTel: string;
  fatherMobile: string;
  fatherOccupation: string;
  fatherPost: string;
  fatherOffice: string;
  motherFirstName: string;
  motherMiddleName: string;
  motherLastName: string;
  motherOccupation: string;
  motherPost: string;
  motherMobile: string;
  motherOffice: string;
  tempBlock: string;
  tempWard: string;
  tempVillage: string;
  tempVdc: string;
  tempDistrict: string;
  permBlock: string;
  permWard: string;
  permVillage: string;
  permVdc: string;
  permDistrict: string;
  guardianName: string;
  guardianMobile: string;
  guardianAddress: string;
  guardianTelRes: string;
  guardianRelationship: string;
  guardianOccupation: string;
  guardianPost: string;
  guardianOffice: string;
  email: string;
  referral: string;
  date: string;
};

const initialForm: FormState = {
  formNo: '',
  firstName: '', middleName: '', lastName: '',
  dobYear: '', dobMonth: '', dobDay: '',
  gender: '', motherTongue: '', classApplied: '',
  lastSchool: '',
  lastClass: '', lastDivision: '', lastPercentage: '', lastRank: '',
  chronicDisease: '', allergicTo: '', admissionType: '',
  fatherFirstName: '', fatherMiddleName: '', fatherLastName: '',
  fatherNationality: '', fatherTel: '', fatherMobile: '',
  fatherOccupation: '', fatherPost: '', fatherOffice: '',
  motherFirstName: '', motherMiddleName: '', motherLastName: '',
  motherOccupation: '', motherPost: '', motherMobile: '', motherOffice: '',
  tempBlock: '', tempWard: '', tempVillage: '', tempVdc: '', tempDistrict: '',
  permBlock: '', permWard: '', permVillage: '', permVdc: '', permDistrict: '',
  guardianName: '', guardianMobile: '', guardianAddress: '', guardianTelRes: '',
  guardianRelationship: '', guardianOccupation: '', guardianPost: '', guardianOffice: '',
  email: '', referral: '', date: '',
};

// ---------------------------------------------------------------------------
// PDF generation
//
// The document is drawn as a vector replica of the on-screen admission paper
// (see AdmissionPaper below): letterhead + dark banner + bordered field boxes
// laid out in the same groupings and column counts. Vector text keeps the file
// to a few kilobytes, stays selectable, and prints crisply — a rasterised
// screenshot of the page would be far larger and blurry in print.
//
// Only ASCII glyphs are used: jsPDF's built-in Helvetica is WinAnsi-encoded and
// cannot render symbols such as the on-screen phone glyph.
// ---------------------------------------------------------------------------

type Rgb = readonly [number, number, number];

const INK: Rgb = [13, 31, 29];       // banner fill, headings — CSS #0d1f1d
const BODY: Rgb = [23, 29, 29];      // labels and body text — CSS #171d1d
const BORDER: Rgb = [70, 78, 78];    // field box borders
const CAPTION: Rgb = [110, 118, 118]; // sub-captions under boxes
const VALUE: Rgb = [17, 17, 17];     // the applicant's typed values

/**
 * Reads the school logo into a data URL so it can be embedded in the PDF.
 * Resolves to null on any failure (missing file, timeout, blocked request) so
 * the letterhead can fall back to a drawn monogram instead of breaking.
 */
async function loadLogoDataUrl(src: string, timeoutMs = 4000): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(src, { signal: controller.signal });
      if (!response.ok) return null;
      const blob = await response.blob();
      return await new Promise<string | null>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } finally {
      window.clearTimeout(timer);
    }
  } catch {
    return null;
  }
}

/**
 * Downscales a logo data URL to a small JPEG so embedding doesn't bloat the
 * PDF. Mirrors the on-screen `object-fit: cover` crop — the shortest side is
 * centred, the longer side is trimmed. Falls back to the original URL on any
 * failure (decoder/tainted canvas/etc.) so the letterhead still renders.
 */
async function downscaleLogo(
  dataUrl: string,
  target: number,
  quality = 0.82,
): Promise<string | null> {
  return await new Promise<string | null>((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth - side) / 2;
        const sy = (img.naturalHeight - side) / 2;
        const canvas = document.createElement('canvas');
        canvas.width = target;
        canvas.height = target;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, sx, sy, side, side, 0, 0, target, target);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

/** One cell in a field row. `weight` distributes the row width, flex-style. */
type PdfCell = {
  label?: string;
  value?: string;
  weight?: number;
  caption?: string;
  /** Splits the cell into sub-boxes (applicant/parent names, date of birth). */
  parts?: { value: string; caption?: string }[];
  /** Renders tick boxes instead of an input box (gender, admission type). */
  options?: string[];
  selected?: string;
};

async function buildPdf(form: FormState): Promise<{ doc: jsPDF; filename: string }> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  const M = 28;          // page margin / outer border inset
  const PAD = 12;        // padding inside the outer border
  const CX = M + PAD;    // content left edge
  const CW = W - CX * 2; // content width
  const GAP = 6;         // gap between cells
  const LABEL_H = 9;     // height reserved for a field label
  const BOX_H = 14;      // height of an input box
  const ROW_GAP = 3;     // vertical gap between rows
  const CAPTION_H = 9;   // height reserved for a sub-caption

  const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ');

  // -- low-level drawing helpers -------------------------------------------
  // Wrappers avoid spreading tuples into jsPDF's overloaded colour setters.
  const strokeColor = (c: Rgb) => doc.setDrawColor(c[0], c[1], c[2]);
  const fillColor = (c: Rgb) => doc.setFillColor(c[0], c[1], c[2]);
  const textColor = (c: Rgb) => doc.setTextColor(c[0], c[1], c[2]);

  function drawPageBorder() {
    strokeColor(INK);
    doc.setLineWidth(1.2);
    doc.rect(M, M, W - M * 2, H - M * 2);
  }

  drawPageBorder();
  let y = CX;

  function ensureSpace(needed: number) {
    if (y + needed <= H - CX) return;
    doc.addPage();
    drawPageBorder();
    y = CX;
  }

  /** Truncates text that would overflow its box, so values never spill out. */
  function fitText(text: string, maxW: number, size: number) {
    if (!text) return '';
    doc.setFontSize(size);
    if (doc.getTextWidth(text) <= maxW) return text;
    let trimmed = text;
    while (trimmed.length > 1 && doc.getTextWidth(`${trimmed}...`) > maxW) {
      trimmed = trimmed.slice(0, -1);
    }
    return `${trimmed}...`;
  }

  function drawLabel(text: string, x: number, top: number, maxW: number) {
    doc.setFont('helvetica', 'bold');
    textColor(BODY);
    doc.text(fitText(text, maxW, 7.5), x, top + 7);
  }

  function drawBox(x: number, top: number, w: number, value?: string) {
    strokeColor(BORDER);
    doc.setLineWidth(0.6);
    doc.rect(x, top, w, BOX_H);
    if (!value) return;
    doc.setFont('helvetica', 'normal');
    textColor(VALUE);
    doc.text(fitText(value, w - 8, 9), x + 4, top + BOX_H / 2 + 3.1);
  }

  function drawCaption(text: string, x: number, top: number, w: number, centered = false) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    textColor(CAPTION);
    if (centered) doc.text(text, x + w / 2, top + 6, { align: 'center' });
    else doc.text(text, x, top + 6);
  }

  function drawOptions(x: number, top: number, w: number, options: string[], selected?: string) {
    strokeColor(BORDER);
    doc.setLineWidth(0.6);
    doc.rect(x, top, w, BOX_H);

    const tick = 7;
    const tickTop = top + (BOX_H - tick) / 2;
    let cursor = x + 5;
    doc.setFontSize(7);
    options.forEach((option) => {
      const isOn = option === selected;
      strokeColor(BODY);
      doc.setLineWidth(0.7);
      if (isOn) {
        fillColor(INK);
        doc.rect(cursor, tickTop, tick, tick, 'FD');
      } else {
        doc.rect(cursor, tickTop, tick, tick);
      }
      cursor += tick + 3;
      doc.setFont('helvetica', isOn ? 'bold' : 'normal');
      textColor(BODY);
      doc.text(option, cursor, top + BOX_H / 2 + 2.5);
      cursor += doc.getTextWidth(option) + 9;
    });
  }

  /** Draws one row of cells and advances `y` past it. */
  function renderRow(cells: PdfCell[]) {
    const hasLabel = cells.some((cell) => cell.label);
    const hasCaption = cells.some((cell) => cell.caption || cell.parts?.some((part) => part.caption));
    const rowH = (hasLabel ? LABEL_H : 0) + BOX_H + (hasCaption ? CAPTION_H : 0);
    ensureSpace(rowH + ROW_GAP);

    const totalWeight = cells.reduce((sum, cell) => sum + (cell.weight ?? 1), 0);
    const available = CW - GAP * (cells.length - 1);
    const boxTop = y + (hasLabel ? LABEL_H : 0);
    let x = CX;

    cells.forEach((cell) => {
      const w = (available * (cell.weight ?? 1)) / totalWeight;
      if (cell.label) drawLabel(cell.label, x, y, w);

      if (cell.options) {
        drawOptions(x, boxTop, w, cell.options, cell.selected);
      } else if (cell.parts) {
        const partW = (w - GAP * (cell.parts.length - 1)) / cell.parts.length;
        let partX = x;
        cell.parts.forEach((part) => {
          drawBox(partX, boxTop, partW, part.value);
          if (part.caption) drawCaption(part.caption, partX, boxTop + BOX_H, partW, true);
          partX += partW + GAP;
        });
      } else {
        drawBox(x, boxTop, w, cell.value);
        if (cell.caption) drawCaption(cell.caption, x, boxTop + BOX_H, w);
      }

      x += w + GAP;
    });

    y = boxTop + BOX_H + (hasCaption ? CAPTION_H : 0) + ROW_GAP;
  }

  /** A bold caption spanning the row — used above the three-part name blocks. */
  function groupLabel(text: string) {
    ensureSpace(12 + LABEL_H + BOX_H);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    textColor(INK);
    doc.text(text, CX, y + 8);
    y += 12;
  }

  /** Bordered sub-panel with a centred heading — the two address blocks. */
  function addressPanel(
    x: number,
    top: number,
    w: number,
    title: string,
    rows: { label: string; value: string }[],
  ) {
    const innerPad = 6;
    const labelW = 72;
    const rowH = BOX_H + 3;
    const panelH = 15 + rows.length * rowH + innerPad;

    strokeColor(BORDER);
    doc.setLineWidth(0.6);
    doc.rect(x, top, w, panelH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    textColor(INK);
    doc.text(title, x + w / 2, top + 11, { align: 'center' });

    let rowY = top + 15;
    rows.forEach((row) => {
      doc.setFont('helvetica', 'bold');
      textColor(BODY);
      doc.text(fitText(row.label, labelW - 4, 7.5), x + innerPad, rowY + BOX_H / 2 + 2.6);
      drawBox(x + innerPad + labelW, rowY, w - innerPad * 2 - labelW, row.value);
      rowY += rowH;
    });

    return top + panelH;
  }

  function signatureLine(x: number, top: number, w: number, caption: string) {
    strokeColor(BODY);
    doc.setLineWidth(0.7);
    doc.line(x, top, x + w, top);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    textColor(BODY);
    doc.text(caption, x + w / 2, top + 9, { align: 'center' });
  }

  // -- letterhead ----------------------------------------------------------
  const HEADER_H = 48;
  const markSize = 44;
  const markTop = y + (HEADER_H - markSize) / 2;
  const logoDataUrl = await loadLogoDataUrl(schoolLogoSrc);
  // Downscale before embedding: the raw image is ~28KB and would balloon the
  // PDF; a 140px centred-square crop is plenty for the 44pt letterhead slot.
  const downscaledLogo = logoDataUrl ? await downscaleLogo(logoDataUrl, 140) : null;
  const embedDataUrl = downscaledLogo ?? logoDataUrl;
  let logoDrawn = false;
  if (embedDataUrl) {
    try {
      doc.addImage(embedDataUrl, 'JPEG', CX, markTop, markSize, markSize);
      logoDrawn = true;
    } catch {
      logoDrawn = false;
    }
  }
  if (!logoDrawn) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    textColor(INK);
    doc.text('S', CX + markSize / 2, markTop + markSize / 2 + 7, { align: 'center' });
  }
  strokeColor(INK);
  doc.setLineWidth(1);
  doc.rect(CX, markTop, markSize, markSize);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  textColor(INK);
  doc.text('SURACHANA English School', W / 2, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  textColor(BODY);
  doc.text('Godawari -14, Thaiba, Lalitpur', W / 2, y + 32, { align: 'center' });
  doc.text('Tel: 01-5560537', W / 2, y + 43, { align: 'center' });

  const photoW = 44;
  const photoH = 46;
  const photoX = CX + CW - photoW;
  const photoTop = y + (HEADER_H - photoH) / 2;
  strokeColor(BORDER);
  doc.setLineWidth(0.6);
  doc.rect(photoX, photoTop, photoW, photoH);
  drawCaption('Photo', photoX, photoTop + photoH / 2 - 3, photoW, true);

  y += HEADER_H + 4;

  // -- banner --------------------------------------------------------------
  const BANNER_H = 21;
  fillColor(INK);
  doc.rect(CX, y, CW, BANNER_H, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('APPLICATION FOR ADMISSION', W / 2, y + BANNER_H / 2 + 4.2, { align: 'center' });
  y += BANNER_H + 8;

  // -- applicant -----------------------------------------------------------
  renderRow([
    { label: 'Form No. :-', value: form.formNo, weight: 1 },
    { weight: 1.4 },
  ]);

  groupLabel('Name of the Applicant :   (IN BLOCK LETTERS)');
  renderRow([{
    parts: [
      { value: form.firstName, caption: 'First Name' },
      { value: form.middleName, caption: 'Middle Name' },
      { value: form.lastName, caption: 'Last Name' },
    ],
  }]);

  renderRow([
    {
      label: 'Date of Birth (in B.S.) :',
      weight: 1.6,
      parts: [
        { value: form.dobYear, caption: 'Year' },
        { value: form.dobMonth, caption: 'Month' },
        { value: form.dobDay, caption: 'Day' },
      ],
    },
    { label: 'Gender :', weight: 1, options: ['Boy', 'Girl'], selected: form.gender },
    { label: 'Mother Tongue :', value: form.motherTongue, weight: 1 },
    { label: 'Class Applied For :', value: form.classApplied, weight: 1 },
  ]);

  renderRow([{ label: 'Name & Address of the Last School Attended :', value: form.lastSchool }]);

  renderRow([
    { label: 'Class :', value: form.lastClass, weight: 0.7 },
    { label: 'Division Secured in the Last Exam :', value: form.lastDivision, weight: 1.6 },
    { label: 'Percentage :', value: form.lastPercentage, weight: 0.85 },
    { label: 'Rank :', value: form.lastRank, weight: 0.7 },
  ]);

  renderRow([
    { label: 'Chronic disease (if any) :', value: form.chronicDisease, weight: 1 },
    { label: 'Allergic to (if any) :', value: form.allergicTo, weight: 1 },
    {
      label: 'Seeking admission as :',
      weight: 1.5,
      options: ['DAY SCHOLAR', 'SCHOLAR'],
      selected: form.admissionType,
    },
  ]);

  // -- father --------------------------------------------------------------
  groupLabel("Father's Name :   (IN BLOCK LETTERS)");
  renderRow([{
    parts: [
      { value: form.fatherFirstName, caption: 'First Name' },
      { value: form.fatherMiddleName, caption: 'Middle Name' },
      { value: form.fatherLastName, caption: 'Last Name' },
    ],
  }]);

  renderRow([
    { label: 'Nationality', value: form.fatherNationality },
    { label: 'Tel. No.', value: form.fatherTel },
    { label: 'Mobile No.', value: form.fatherMobile },
    { label: 'Occupation', value: form.fatherOccupation },
    { label: 'Post :', value: form.fatherPost },
  ]);

  renderRow([{ label: 'Name of the Office / Organization and Address :', value: form.fatherOffice }]);

  // -- mother --------------------------------------------------------------
  groupLabel("Mother's Name :   (IN BLOCK LETTERS)");
  renderRow([{
    parts: [
      { value: form.motherFirstName, caption: 'First Name' },
      { value: form.motherMiddleName, caption: 'Middle Name' },
      { value: form.motherLastName, caption: 'Last Name' },
    ],
  }]);

  renderRow([
    { label: 'Occupation', value: form.motherOccupation },
    { label: 'Post :', value: form.motherPost },
    { label: 'Mobile No.', value: form.motherMobile },
  ]);

  renderRow([{ label: 'Name of the Office / Organization and Address :', value: form.motherOffice }]);

  // -- addresses (side by side, mirroring the on-screen panels) ------------
  // ensureSpace may add a page and reset y to CX, so capture panelTop *after*
  // the break check — otherwise a late break would leave panels drawn at the
  // stale pre-break y on whatever page they actually land on.
  const panelW = (CW - GAP * 2) / 2;
  ensureSpace(15 + 5 * (BOX_H + 3) + 6 + ROW_GAP);
  const panelTop = y;
  const tempBottom = addressPanel(CX, panelTop, panelW, 'Temporary', [
    { label: 'Block No.', value: form.tempBlock },
    { label: 'Ward No.', value: form.tempWard },
    { label: 'Village / Town', value: form.tempVillage },
    { label: 'VDC / Municipality', value: form.tempVdc },
    { label: 'District :', value: form.tempDistrict },
  ]);
  const permBottom = addressPanel(CX + panelW + GAP * 2, panelTop, panelW, 'Permanent', [
    { label: 'Block No.', value: form.permBlock },
    { label: 'Ward No.', value: form.permWard },
    { label: 'Village / Town', value: form.permVillage },
    { label: 'VDC / Municipality', value: form.permVdc },
    { label: 'District :', value: form.permDistrict },
  ]);
  y = Math.max(tempBottom, permBottom) + ROW_GAP + 2;

  // -- local guardian ------------------------------------------------------
  renderRow([
    { label: "Local Guardian's Name :", value: form.guardianName },
    { label: 'Mobile :', value: form.guardianMobile },
  ]);

  renderRow([
    { label: 'Email Address :   (Optional)', value: form.email },
    { label: 'Tel. (Res) :', value: form.guardianTelRes },
  ]);

  renderRow([
    { label: 'Address :', value: form.guardianAddress },
    { label: 'Relationship :', value: form.guardianRelationship },
    { label: 'Occupation :', value: form.guardianOccupation },
    { label: 'Post :', value: form.guardianPost },
  ]);

  renderRow([{ label: 'Name of the Office / Organization and Address :', value: form.guardianOffice }]);

  renderRow([
    { label: 'Referral :', value: form.referral, weight: 2 },
    { label: 'Date :', value: form.date || new Date().toLocaleDateString(), weight: 1 },
  ]);

  // -- notes and signatures ------------------------------------------------
  const sigW = 168;
  ensureSpace(58);
  const footerTop = y + 2;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  textColor(BODY);
  doc.text('N.B. Documents to be submitted;', CX, footerTop + 7);
  doc.setFont('helvetica', 'normal');
  const noteLines: string[] = doc.splitTextToSize(
    '(1) copy of birth certificate (2) copy of the mark-sheet of the last exam '
    + '(3) two copies of P.P size Photo (4) Must have EMIS Transfer for Class 2 to 9.',
    CW - sigW - 24,
  );
  let noteY = footerTop + 16;
  noteLines.forEach((line) => {
    doc.text(line, CX, noteY);
    noteY += 8;
  });
  doc.setFont('helvetica', 'bold');
  doc.text('Official Remarks:', CX, noteY + 3);
  doc.setFont('helvetica', 'normal');
  doc.text('Date:', CX, noteY + 13);

  const sigX = CX + CW - sigW;
  signatureLine(sigX, footerTop + 20, sigW, 'Signature of parents / Guardians');
  signatureLine(sigX, footerTop + 48, sigW, 'Authorized Signature');

  const slug = (fullName || 'Applicant').replace(/[^a-zA-Z0-9_-]/g, '_') || 'Applicant';
  return { doc, filename: `Admission_Application_${slug}.pdf` };
}

// Extract error message from caught errors (API or network)
function extractErrorMessage(caught: unknown): string {
  if (caught instanceof Error && caught.message.trim()) return caught.message;
  return 'Could not send the application. Please try again or call the school at 01-5560537.';
}

type PaperProps = {
  form: FormState;
  onChange: (field: keyof FormState, value: string) => void;
};

function AdmissionPaper({ form, onChange }: PaperProps) {
  const box = (key: keyof FormState, placeholder = '') => (
    <input
      type="text"
      placeholder={placeholder}
      value={form[key]}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(key, e.target.value)}
    />
  );

  const nameFields = (first: keyof FormState, middle: keyof FormState, last: keyof FormState) => (
    <div className="inline-fields inline-fields--three">
      {box(first, 'First Name')}
      {box(middle, 'Middle name')}
      {box(last, 'Last Name')}
    </div>
  );

  const radios = (key: keyof FormState, options: string[], stacked = false) => (
    <div className={stacked ? 'option-row option-row--stacked' : 'option-row'}>
      {options.map((opt) => (
        <label key={opt} className="check">
          <input
            type="radio"
            name={String(key)}
            checked={form[key] === opt}
            onChange={() => onChange(key, opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="admission-paper__form">
      <div className="form-row form-row--compact">
        <label className="field field--wide">
          <span>Form No. <em>:-</em></span>
          {box('formNo')}
        </label>
      </div>

      <div className="form-row form-row--names">
        <label className="field field--full">
          <span>Name of the Applicant : <small>(IN BLOCK LETTERS)</small></span>
          {nameFields('firstName', 'middleName', 'lastName')}
        </label>
      </div>

      <div className="form-row form-row--split">
        <div className="field-group">
          <label className="field field--date">
            <span>Date of Birth (in B.S.) :</span>
            <div className="inline-fields inline-fields--three">
              {box('dobYear', 'Year')}
              {box('dobMonth', 'Month')}
              {box('dobDay', 'Day')}
            </div>
          </label>
        </div>

        <div className="field-group field-group--right">
          <label className="field">
            <span>Gender :</span>
            {radios('gender', ['Boy', 'Girl'])}
          </label>
          <label className="field field--compact">
            <span>Mother Tongue:</span>
            {box('motherTongue')}
          </label>
          <label className="field field--compact">
            <span>Class Applied For :</span>
            {box('classApplied')}
          </label>
        </div>
      </div>

      <div className="form-row">
        <label className="field field--full">
          <span>Name & Address of the Last School Attended:</span>
          {box('lastSchool')}
        </label>
      </div>

      <div className="form-row form-row--three-cols">
        <label className="field"><span>Class:</span>{box('lastClass')}</label>
        <label className="field"><span>Division Secured in the Last Exam :</span>{box('lastDivision')}</label>
        <label className="field"><span>Percentage :</span>{box('lastPercentage')}</label>
        <label className="field"><span>Rank :</span>{box('lastRank')}</label>
      </div>

      <div className="form-row form-row--five-cols">
        <label className="field"><span>Chronic disease (if any) :</span>{box('chronicDisease')}</label>
        <label className="field"><span>Allergic to (if any):</span>{box('allergicTo')}</label>
        <label className="field field--wide-option">
          <span>Seeking admission as :</span>
          {radios('admissionType', ['DAY SCHOLAR', 'SCHOLAR'], true)}
        </label>
      </div>

      <div className="form-row form-row--names">
        <label className="field field--full">
          <span>Father's Name: <small>(IN BLOCK LETTERS)</small></span>
          {nameFields('fatherFirstName', 'fatherMiddleName', 'fatherLastName')}
        </label>
      </div>

      <div className="form-row form-row--split-second">
        <label className="field"><span>Nationality</span>{box('fatherNationality')}</label>
        <label className="field"><span>Tel. No.</span>{box('fatherTel')}</label>
        <label className="field"><span>Mobile No.</span>{box('fatherMobile')}</label>
        <label className="field"><span>Occupation</span>{box('fatherOccupation')}</label>
        <label className="field"><span>Post:</span>{box('fatherPost')}</label>
      </div>

      <div className="form-row">
        <label className="field field--full">
          <span>Name of the Office / Organization and Address :</span>
          {box('fatherOffice')}
        </label>
      </div>

      <div className="form-row form-row--names">
        <label className="field field--full">
          <span>Mother's Name: <small>(IN BLOCK LETTERS)</small></span>
          {nameFields('motherFirstName', 'motherMiddleName', 'motherLastName')}
        </label>
      </div>

      <div className="form-row form-row--split-second">
        <label className="field"><span>Occupation</span>{box('motherOccupation')}</label>
        <label className="field"><span>Post:</span>{box('motherPost')}</label>
        <label className="field"><span>Mobile No.</span>{box('motherMobile')}</label>
      </div>

      <div className="form-row">
        <label className="field field--full">
          <span>Name of the Office / Organization and Address :</span>
          {box('motherOffice')}
        </label>
      </div>

      <div className="form-row form-row--address">
        <div className="address-block">
          <h3>Temporary</h3>
          <label className="field"><span>Block No.</span>{box('tempBlock')}</label>
          <label className="field"><span>Ward No.</span>{box('tempWard')}</label>
          <label className="field"><span>Village / Town</span>{box('tempVillage')}</label>
          <label className="field"><span>VDC / Municipality</span>{box('tempVdc')}</label>
          <label className="field"><span>District :</span>{box('tempDistrict')}</label>
        </div>

        <div className="address-block">
          <h3>Permanent</h3>
          <label className="field"><span>Block No.</span>{box('permBlock')}</label>
          <label className="field"><span>Ward No.</span>{box('permWard')}</label>
          <label className="field"><span>Village / Town</span>{box('permVillage')}</label>
          <label className="field"><span>VDC / Municipality</span>{box('permVdc')}</label>
          <label className="field"><span>District :</span>{box('permDistrict')}</label>
        </div>
      </div>

      <div className="form-row form-row--two-cols">
        <label className="field field--full"><span>Local Guardian's Name:</span>{box('guardianName')}</label>
        <label className="field field--full"><span>Mobile:</span>{box('guardianMobile')}</label>
      </div>

      <div className="form-row form-row--two-cols">
        <label className="field field--full">
          <span>Email Address : <small>(Optional)</small></span>
          {box('email', 'e.g. parent@example.com')}
        </label>
        <label className="field field--full"><span>Tel. (Res):</span>{box('guardianTelRes')}</label>
      </div>

      <div className="form-row form-row--four-cols">
        <label className="field"><span>Address:</span>{box('guardianAddress')}</label>
        <label className="field"><span>Relationship:</span>{box('guardianRelationship')}</label>
        <label className="field"><span>Occupation:</span>{box('guardianOccupation')}</label>
        <label className="field"><span>Post:</span>{box('guardianPost')}</label>
      </div>

      <div className="form-row">
        <label className="field field--full">
          <span>Name of the Office / Organization and Address:</span>
          {box('guardianOffice')}
        </label>
      </div>

      <div className="form-row form-row--topline">
        <label className="field field--full"><span>Referral:</span>{box('referral')}</label>
        <label className="field field--date-small"><span>Date:</span>{box('date')}</label>
      </div>

      <div className="form-row form-row--final">
        <div className="notes">
          <p><strong>N.B.</strong> Documents to be submitted;</p>
          <p>(1) copy of birth certificate (2) copy of the mark-sheet of the last exam (3) two copies of P.P size Photo (4) Must have EMIS</p>
          <p>Transfer for Class 2 to 9.</p>
          <p><strong>Official Remarks:</strong></p>
          <p>Date:</p>
        </div>

        <div className="signature-block">
          <p>Signature of parents / Guardians</p>
          <div className="signature-line" />
          <p>Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}

function normalizeGrade(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return 'Nursery';
  if (/^nursery$/i.test(trimmed)) return 'Nursery';
  if (/^(playgroup|pg|lkg|ukg|kg)$/i.test(trimmed)) return 'Nursery';
  const numMatch = trimmed.match(/\b([1-9]|10)\b/);
  if (numMatch) return `Class ${numMatch[1]}`;
  return trimmed;
}

function buildAdmissionSummaryMessage(form: FormState, pdfUrl?: string): string {
  const lines: string[] = [];
  lines.push('[Online Admission Form Application]');
  if (pdfUrl) lines.push(`PDF Form URL: ${pdfUrl}`);
  if (form.formNo) lines.push(`Form No: ${form.formNo}`);
  lines.push(`Class Applied: ${form.classApplied || 'N/A'}`);
  lines.push(`DOB (B.S.): ${[form.dobYear, form.dobMonth, form.dobDay].filter(Boolean).join('/') || 'N/A'}`);
  lines.push(`Gender: ${form.gender || 'N/A'} | Mother Tongue: ${form.motherTongue || 'N/A'}`);
  lines.push(`Admission Type: ${form.admissionType || 'N/A'}`);
  if (form.lastSchool) {
    lines.push(`Last School: ${form.lastSchool} (Class: ${form.lastClass || 'N/A'}, Div: ${form.lastDivision || 'N/A'}, %: ${form.lastPercentage || 'N/A'}, Rank: ${form.lastRank || 'N/A'})`);
  }
  if (form.chronicDisease || form.allergicTo) {
    lines.push(`Medical Notes: Disease: ${form.chronicDisease || 'None'}, Allergic: ${form.allergicTo || 'None'}`);
  }
  const fatherName = [form.fatherFirstName, form.fatherMiddleName, form.fatherLastName].filter(Boolean).join(' ');
  if (fatherName) {
    lines.push(`Father: ${fatherName} | Mobile: ${form.fatherMobile || form.fatherTel || 'N/A'} | Occ: ${form.fatherOccupation || 'N/A'} (${form.fatherOffice || 'N/A'})`);
  }
  const motherName = [form.motherFirstName, form.motherMiddleName, form.motherLastName].filter(Boolean).join(' ');
  if (motherName) {
    lines.push(`Mother: ${motherName} | Mobile: ${form.motherMobile || 'N/A'} | Occ: ${form.motherOccupation || 'N/A'} (${form.motherOffice || 'N/A'})`);
  }
  const permAddr = [form.permVillage, form.permWard ? `Ward ${form.permWard}` : '', form.permVdc, form.permDistrict].filter(Boolean).join(', ');
  if (permAddr) lines.push(`Permanent Address: ${permAddr}`);
  const tempAddr = [form.tempVillage, form.tempWard ? `Ward ${form.tempWard}` : '', form.tempVdc, form.tempDistrict].filter(Boolean).join(', ');
  if (tempAddr) lines.push(`Temporary Address: ${tempAddr}`);
  if (form.guardianName) {
    lines.push(`Local Guardian: ${form.guardianName} (${form.guardianRelationship || 'Guardian'}, Mobile: ${form.guardianMobile || 'N/A'}, Addr: ${form.guardianAddress || 'N/A'})`);
  }
  if (form.referral) lines.push(`Referral: ${form.referral}`);
  return lines.join('\n');
}

export default function Admission() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const applicant = [form.firstName, form.middleName, form.lastName].join(' ').trim();
    if (applicant.length < 2) {
      setStatus('error');
      setErrorMsg('Please enter the applicant’s full name.');
      return;
    }

    // Resolve email: use user email if provided and valid, otherwise fallback automatically so the user is never blocked
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let submissionEmail = form.email.trim();
    if (!submissionEmail || !emailPattern.test(submissionEmail)) {
      const phoneDigits = (form.guardianMobile || form.fatherMobile || form.motherMobile || '').replace(/\D/g, '') || 'applicant';
      submissionEmail = `applicant.${phoneDigits}@surachanaschool.edu.np`;
    }

    setStatus('sending');
    try {
      // 1. Build the PDF from form data
      const { doc, filename } = await buildPdf(form);
      const pdfBlob = new Blob([doc.output('arraybuffer')], { type: 'application/pdf' });

      // 2. Attempt PDF upload to backend (if supported/deployed on server)
      let uploadedPdfUrl: string | undefined;
      try {
        const uploadRes = await uploadAdmissionPdf(pdfBlob, filename);
        if (uploadRes?.url) {
          uploadedPdfUrl = uploadRes.url;
        }
      } catch (uploadErr) {
        console.warn('PDF upload endpoint not available or returned error. Continuing with inquiry submission.', uploadErr);
      }

      // 3. Submit admission inquiry data for the admin panel
      const guardianName = form.guardianName
        || [form.fatherFirstName, form.fatherLastName].filter(Boolean).join(' ')
        || '';
      const phone = form.guardianMobile || form.fatherMobile || '';
      const grade = normalizeGrade(form.classApplied);
      const summaryMessage = buildAdmissionSummaryMessage(form, uploadedPdfUrl);

      await submitAdmissionInquiry({
        type: 'admission',
        fullName: applicant,
        email: submissionEmail,
        studentName: applicant,
        guardianName,
        phone,
        grade,
        previousSchool: form.lastSchool || '',
        message: summaryMessage,
      });

      // 4. Download PDF copy locally for the applicant
      try {
        doc.save(filename);
      } catch {
        // Non-blocking if browser restricts programmatic download
      }

      setStatus('success');
    } catch (caught) {
      setStatus('error');
      setErrorMsg(extractErrorMessage(caught));
    }
  }

  return (
    <main className="admission-page">
      <PageHero
        title="Admissions"
        subtitle="A clear, thoughtful path into the Surachana community for every family."
        breadcrumb="Admission"
      />

      <section className="admission-intro">
        <div className="admission-intro__inner">
          <div className="admission-intro__content">
            <p className="admission-kicker">Admissions open</p>
            <h2>Begin your child’s journey with confidence.</h2>
            <p>
              We welcome families to apply for a place in a warm, academically focused learning environment
              where each child is encouraged to grow, belong, and thrive.
            </p>
          </div>

          <div className="admission-intro__stats">
            <div>
              <strong>Nursery</strong>
              <span>to Class 8</span>
            </div>
            <div>
              <strong>Friendly</strong>
              <span>school community</span>
            </div>
            <div>
              <strong>Supportive</strong>
              <span>admission guidance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="admission-application">
        <div className="admission-paper">
          <header className="admission-paper__header">
            <div className="school-mark" aria-label="School emblem">
              <img src={schoolLogoSrc} alt="Surachana English School logo" className="school-mark__img" />
            </div>

            <div className="admission-paper__title-wrap">
              <h1>SURACHANA English School</h1>
              <p>Godawari -14, Thaiba, Lalitpur</p>
              <p>☎ 01-5560537</p>
            </div>

            <div className="admission-paper__photo-box" aria-hidden="true" />
          </header>

          <div className="admission-paper__banner">APPLICATION FOR ADMISSION</div>

          <form className="admission-paper__form" onSubmit={handleSubmit} noValidate>
            <AdmissionPaper form={form} onChange={update} />

            {status === 'error' && (
              <div className="admission-status admission-status--error" role="alert">
                {errorMsg}
              </div>
            )}
            {status === 'success' && (
              <div className="admission-status admission-status--success" role="status">
                Your application has been sent! The school will contact you regarding the next steps.
              </div>
            )}

            <div className="form-row form-row--submit">
              <button type="submit" className="admission-submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending Application…' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="admission-visit">
        <div className="admission-visit__inner">
          <div className="admission-visit__copy">
            <p className="admission-visit__label">COME AND SEE FOR YOURSELF</p>
            <h2>
              A school visit tells<br />
              you more than a<br />
              <strong>brochure</strong> can.
            </h2>
          </div>

          <div className="admission-visit__details">
            <div className="admission-visit__row">
              <div className="admission-visit__icon">☎</div>
              <div className="admission-visit__text">
                <strong>CALL</strong>
                <strong>01-5560537</strong>
              </div>
            </div>

            <div className="admission-visit__row">
              <div className="admission-visit__icon">✉</div>
              <div className="admission-visit__text">
                <strong>WRITE</strong>
                <strong>surachana.eschool@gmail.com</strong>
              </div>
            </div>

            <div className="admission-visit__row">
              <div className="admission-visit__icon">◉</div>
              <div className="admission-visit__text">
                <strong>VISIT</strong>
                <strong>Thaiba, Lalitpur</strong>
              </div>
            </div>

            <div className="admission-visit__row">
              <div className="admission-visit__icon">◔</div>
              <div className="admission-visit__text">
                <strong>OFFICE HOURS</strong>
                <strong>Sunday to Friday</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}