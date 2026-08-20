import "../styles/pages/Admission.css";
import { useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { jsPDF } from 'jspdf';
import PageHero from '../components/ui/PageHero';

const schoolLogoSrc = import.meta.env.DEV
  ? '/schools/surachana/school_logo.jpg'
  : './schools/surachana/school_logo.jpg';

const schoolEmail = 'surachana.eschool@gmail.com';

const mailer = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  toEmail: import.meta.env.VITE_ADMISSION_TO_EMAIL || schoolEmail,
};

// EmailJS returns errors with .text (not a standard Error.message). Extract
// the most useful human-readable message so failures are diagnosable.
function emailErrorText(caught: unknown): string {
  if (caught && typeof caught === 'object') {
    const err = caught as { text?: unknown; message?: unknown };
    if (typeof err.text === 'string' && err.text.trim()) return err.text;
    if (typeof err.message === 'string' && err.message.trim()) return err.message;
  }
  return 'Could not send the application. Please try again or call the school at 01-5560537.';
}

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
  referral: '', date: '',
};

// Build a compact, text-based A4 PDF from the submitted values. A rasterised
// image-based PDF would exceed EmailJS's 50KB attachment limit; a text PDF is
// only a few kilobytes and still prints cleanly. Returns the jsPDF instance so
// the same document can be emailed (as base64) or downloaded/printed locally.
function buildPdf(form: FormState): { doc: jsPDF; filename: string; applicantForFile: string } {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ') || '—';

  function ensureSpace(needed: number) {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function heading(text: string) {
    ensureSpace(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 31, 30);
    doc.text(text, margin, y);
    y += 18;
  }

  function row(label: string, value: string) {
    const text = `${label}:  ${value || '________'}`;
    const lines = doc.splitTextToSize(text, contentWidth);
    ensureSpace(lines.length * 14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    if (label) {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(value || '________', margin + doc.getTextWidth(`${label}: `), y);
    } else {
      doc.text(value || '________', margin, y);
    }
    y += 16;
  }

  // Paper header
  ensureSpace(70);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 31, 30);
  doc.text('SURACHANA English School', pageWidth / 2, y, { align: 'center' });
  y += 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Godawari -14, Thaiba, Lalitpur  |  ☎ 01-5560537', pageWidth / 2, y, { align: 'center' });
  y += 10;
  doc.setDrawColor(15, 31, 30);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setFillColor(15, 31, 30);
  doc.rect(margin, y, contentWidth, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('APPLICATION FOR ADMISSION', pageWidth / 2, y + 16, { align: 'center' });
  doc.setTextColor(15, 31, 30);
  y += 40;

  heading('Applicant');
  row('Form No.', form.formNo);
  row('Name of the Applicant', fullName);
  row('Date of Birth (B.S.)', [form.dobYear, form.dobMonth, form.dobDay].filter(Boolean).join(' / '));
  row('Gender', form.gender);
  row('Mother Tongue', form.motherTongue);
  row('Class Applied For', form.classApplied);
  row('Last School Attended', form.lastSchool);

  heading('Previous Education');
  row('Class', form.lastClass);
  row('Division Secured', form.lastDivision);
  row('Percentage', form.lastPercentage);
  row('Rank', form.lastRank);
  row('Chronic Disease (if any)', form.chronicDisease);
  row('Allergic To (if any)', form.allergicTo);
  row('Seeking Admission As', form.admissionType);

  heading("Father's Details");
  row('Name', [form.fatherFirstName, form.fatherMiddleName, form.fatherLastName].filter(Boolean).join(' '));
  row('Nationality', form.fatherNationality);
  row('Tel. No.', form.fatherTel);
  row('Mobile No.', form.fatherMobile);
  row('Occupation', form.fatherOccupation);
  row('Post', form.fatherPost);
  row('Office / Organization and Address', form.fatherOffice);

  heading("Mother's Details");
  row('Name', [form.motherFirstName, form.motherMiddleName, form.motherLastName].filter(Boolean).join(' '));
  row('Occupation', form.motherOccupation);
  row('Post', form.motherPost);
  row('Mobile No.', form.motherMobile);
  row('Office / Organization and Address', form.motherOffice);

  heading('Temporary Address');
  row('Block / Ward', [form.tempBlock, form.tempWard].filter(Boolean).join(' / '));
  row('Village / Town', form.tempVillage);
  row('VDC / Municipality', form.tempVdc);
  row('District', form.tempDistrict);

  heading('Permanent Address');
  row('Block / Ward', [form.permBlock, form.permWard].filter(Boolean).join(' / '));
  row('Village / Town', form.permVillage);
  row('VDC / Municipality', form.permVdc);
  row('District', form.permDistrict);

  heading('Local Guardian');
  row('Name', form.guardianName);
  row('Address', form.guardianAddress);
  row('Tel. (Res)', form.guardianTelRes);
  row('Mobile', form.guardianMobile);
  row('Relationship', form.guardianRelationship);
  row('Occupation', form.guardianOccupation);
  row('Post', form.guardianPost);
  row('Office / Organization and Address', form.guardianOffice);

  heading('Other');
  row('Referral', form.referral);
  row('Date', form.date || new Date().toLocaleDateString());

  // Signature lines
  ensureSpace(60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Signature of parents / Guardians', pageWidth - margin - 220, y);
  doc.text('Authorized Signature', margin + 10, y);
  y += 10;
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - margin - 220, y, pageWidth - margin, y);
  doc.line(margin, y, margin + 210, y);

  const slug = (fullName || 'Applicant').replace(/[^a-zA-Z0-9_-]/g, '_') || 'Applicant';
  return { doc, filename: `Admission_Application_${slug}.pdf`, applicantForFile: fullName };
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
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

      <div className="form-row form-row--four-cols">
        <label className="field"><span>Address:</span>{box('guardianAddress')}</label>
        <label className="field"><span>Tel. (Res):</span>{box('guardianTelRes')}</label>
        <label className="field"><span>Relationship:</span>{box('guardianRelationship')}</label>
        <label className="field"><span>Occupation:</span>{box('guardianOccupation')}</label>
      </div>

      <div className="form-row form-row--two-cols">
        <label className="field"><span>Post:</span>{box('guardianPost')}</label>
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

export default function Admission() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleDownload() {
    const { doc, filename } = buildPdf(form);
    doc.save(filename);
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

    setStatus('sending');
    try {
      const { doc, filename } = buildPdf(form);
      const blob = doc.output('blob');
      const base64 = await blobToBase64(blob);

      await emailjs.send(
        mailer.serviceId,
        mailer.templateId,
        {
          to_email: mailer.toEmail,
          from_email: mailer.toEmail,
          student_name: applicant || 'Applicant',
          class_applied: form.classApplied || '—',
          guardian_name: form.guardianName || [form.fatherFirstName, form.fatherLastName].filter(Boolean).join(' ') || '—',
          guardian_mobile: form.guardianMobile || form.fatherMobile || '—',
          date: form.date || new Date().toLocaleDateString(),
          attachment_name: filename,
          attachment: [
            {
              name: filename,
              type: 'application/pdf',
              data: base64,
            },
          ],
        },
        { publicKey: mailer.publicKey },
      );

      setStatus('success');
    } catch (caught) {
      setStatus('error');
      // Surface EmailJS's real error text so failures are diagnosable
      // instead of hiding behind the generic fallback message.
      setErrorMsg(emailErrorText(caught));
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
              <button type="button" className="admission-download-btn" onClick={handleDownload}>
                Download PDF
              </button>
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