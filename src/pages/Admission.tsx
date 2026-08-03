import "../styles/pages/Admission.css";
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowDownRight, Check, Clock, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { ADMISSION_STEPS, REQUIRED_DOCUMENTS, SCHOOL, submitInquiry } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import { useSchoolData } from '../hooks/useSchoolData';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

const eligibility = [
  { level: 'Nursery', criteria: 'Child must be 3 years old by the admission date.' },
  { level: 'LKG / UKG', criteria: 'Age 4–5 years with basic school readiness.' },
  { level: 'Class 1–5', criteria: 'Age-appropriate placement with previous school records.' },
  { level: 'Class 6–8', criteria: 'Successful completion of an entrance assessment.' },
];

const GRADE_OPTIONS = [
  'Nursery',
  'LKG',
  'UKG',
  ...Array.from({ length: 10 }, (_, index) => `Class ${index + 1}`),
];

export default function Admission() {
  useScrollToTop();
  useSchoolData();
  const [admissionForm, setAdmissionForm] = useState({
    guardianName: '',
    studentName: '',
    grade: '',
    phone: '',
    email: '',
    message: '',
  });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ grade: '', phone: '', email: '' });

  function updateAdmissionForm(field: keyof typeof admissionForm, value: string) {
    const nextValue = field === 'phone' ? onlyNumbers(value) : value;
    setAdmissionForm((current) => ({ ...current, [field]: nextValue }));

    if (field === 'grade') {
      setFieldErrors((current) => ({
        ...current,
        grade: isValidGrade(nextValue) || !nextValue ? '' : 'Please choose a valid class or grade.',
      }));
    }

    if (field === 'phone') {
      setFieldErrors((current) => ({
        ...current,
        phone: isValidPhone(nextValue) || !nextValue ? '' : 'Please enter a valid phone number.',
      }));
    }

    if (field === 'email') {
      const trimmedEmail = nextValue.trim();
      setFieldErrors((current) => ({
        ...current,
        email: isValidEmail(trimmedEmail) || !trimmedEmail ? '' : 'Please enter a valid email address.',
      }));
    }
  }

  async function handleAdmissionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    setFieldErrors({ grade: '', phone: '', email: '' });
    setFormState('sending');

    const guardianName = admissionForm.guardianName.trim();
    const studentName = admissionForm.studentName.trim();
    const grade = admissionForm.grade.trim();
    const phone = admissionForm.phone.trim();
    const email = admissionForm.email.trim();
    const message = admissionForm.message.trim();

    if (guardianName.length < 2) {
      setFormState('idle');
      setFormError('Please enter the parent or guardian name.');
      return;
    }
    if (studentName.length < 2) {
      setFormState('idle');
      setFormError('Please enter the student name.');
      return;
    }
    if (!grade) {
      setFormState('idle');
      setFieldErrors((current) => ({ ...current, grade: 'Please enter the class or grade.' }));
      return;
    }
    if (!isValidGrade(grade)) {
      setFormState('idle');
      setFieldErrors((current) => ({ ...current, grade: 'Please choose a valid class or grade.' }));
      return;
    }
    if (!isValidPhone(phone)) {
      setFormState('idle');
      setFieldErrors((current) => ({ ...current, phone: 'Please enter a valid phone number.' }));
      return;
    }
    if (email && !isValidEmail(email)) {
      setFormState('idle');
      setFieldErrors((current) => ({ ...current, email: 'Please enter a valid email address, or leave it blank.' }));
      return;
    }

    try {
      await submitInquiry({
        type: 'admission',
        fullName: guardianName,
        guardianName,
        studentName,
        grade,
        phone,
        email,
        preferredContact: 'phone',
        message:
          message ||
          `Admission inquiry for ${studentName || 'a student'}${grade ? ` in ${grade}` : ''}.`,
      });
      setAdmissionForm({
        guardianName: '',
        studentName: '',
        grade: '',
        phone: '',
        email: '',
        message: '',
      });
      setFormState('sent');
    } catch (error) {
      setFormState('idle');
      setFormError(error instanceof Error ? error.message : 'Could not send admission inquiry.');
    }
  }

  return (
    <main>
      <PageHero
        title="Admissions"
        subtitle={`A clear, thoughtful path into the ${SCHOOL.shortName} community—so families know what to expect at every step.`}
        breadcrumb="Admission"
      />

      <section className="admission__section-001">
        <div className="admission__div-002">
          <Reveal variant="clip">
            <div className="admission__div-003">
              <div className="editorial-grid admission__div-004" />
              <div className="admission__div-005">
                <div>
                  <span className="editorial-kicker admission__span-006">Now welcoming families · 2083 BS</span>
                  <h2 className="admission__h2-007">
                    Your child’s next chapter can begin here.
                  </h2>
                  <p className="admission__p-008">
                    Applications are open from Nursery to Class 10. We invite families to visit,
                    meet our educators, and understand the learning environment before making a decision.
                  </p>
                </div>
                <div className="admission__div-009">
                  <a href={`tel:${SCHOOL.phone.replace(/[^\d+]/g, '')}`} className="tactile admission__a-010">
                    Call admissions <Phone className="admission__phone-011" />
                  </a>
                  <Link to="/contact" className="tactile admission__a-012">
                    Plan a visit <ArrowDownRight className="admission__arrow-down-right-013" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="admission__section-014">
        <div className="admission__div-015">
          <Reveal variant="slide-left" className="admission__reveal-016">
            <p className="editorial-kicker admission__p-017">01 · The process</p>
            <h2 className="admission__h2-018">
              Five simple steps,
              <span className="admission__span-019">with people to guide you.</span>
            </h2>
          </Reveal>

          <div className="admission__div-020">
            {ADMISSION_STEPS.map((item, index) => (
              <Reveal key={item.step} variant={index % 2 === 0 ? 'slide-left' : 'slide-right'} delay={index * 70}>
                <article className="admission__article-021">
                  <span className="admission__span-022">{String(item.step).padStart(2, '0')}</span>
                  <h3 className="admission__h3-023">{item.title}</h3>
                  <p className="admission__p-024">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="admission__section-025">
        <div className="admission__div-026">
          <div className="admission__div-027">
            <Reveal variant="slide-left">
              <p className="editorial-kicker admission__p-028">02 · Eligibility</p>
              <h2 className="admission__h2-029">Finding the right starting point.</h2>
              <div className="admission__div-030">
                {eligibility.map((item) => (
                  <div key={item.level} className="admission__div-031">
                    <strong className="admission__strong-032">{item.level}</strong>
                    <p className="admission__p-033">{item.criteria}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="slide-right" delay={150}>
              <div className="admission__div-034">
                <FileText className="admission__file-text-035" />
                <p className="editorial-kicker admission__p-036">03 · What to bring</p>
                <h2 className="admission__h2-037">Required documents.</h2>
                <ul className="admission__ul-038">
                  {REQUIRED_DOCUMENTS.map((document) => (
                    <li key={document} className="admission__li-039">
                      <Check className="admission__check-040" />
                      {document}
                    </li>
                  ))}
                </ul>
                <div className="admission__div-041">
                  <AlertCircle className="admission__alert-circle-042" />
                  Originals are required only for verification during admission.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="admission__section-043">
        <div className="admission__div-044">
          <div className="admission__div-045">
            <Reveal variant="slide-left">
              <p className="editorial-kicker admission__p-046">04 · Admission inquiry</p>
              <h2 className="admission__h2-047">
                Share your details with the admission team.
              </h2>
              <p className="admission__p-048">
                The school office will receive this request directly and can follow up with
                available classes, visit timing, and next steps.
              </p>
            </Reveal>

            <Reveal variant="slide-right" delay={120}>
              <form onSubmit={handleAdmissionSubmit} className="admission__form-049" noValidate>
                <div className="admission__div-050">
                  <label className="admission__label-051">
                    <span className="editorial-kicker admission__span-052">Parent / guardian</span>
                    <input
                      name="guardianName"
                      required
                      autoComplete="name"
                      value={admissionForm.guardianName}
                      onChange={(event) => updateAdmissionForm('guardianName', event.target.value)}
                      className="admission__input-053"
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="admission__label-054">
                    <span className="editorial-kicker admission__span-055">Student name</span>
                    <input
                      name="studentName"
                      required
                      autoComplete="off"
                      value={admissionForm.studentName}
                      onChange={(event) => updateAdmissionForm('studentName', event.target.value)}
                      className="admission__input-056"
                      placeholder="Child's full name"
                    />
                  </label>
                  <label className="admission__label-057">
                    <span className="editorial-kicker admission__span-058">Class / grade</span>
                    <select
                      name="grade"
                      required
                      value={admissionForm.grade}
                      onChange={(event) => updateAdmissionForm('grade', event.target.value)}
                      className="admission__input-059"
                      aria-invalid={Boolean(fieldErrors.grade)}
                      aria-describedby={fieldErrors.grade ? 'admission-grade-error' : undefined}
                    >
                      <option value="">Select class / grade</option>
                      {GRADE_OPTIONS.map((gradeOption) => (
                        <option key={gradeOption} value={gradeOption}>
                          {gradeOption}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.grade && (
                      <p id="admission-grade-error" className="admission__field-error">
                        {fieldErrors.grade}
                      </p>
                    )}
                  </label>
                  <label className="admission__label-060">
                    <span className="editorial-kicker admission__span-061">Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      autoComplete="tel"
                      value={admissionForm.phone}
                      onChange={(event) => updateAdmissionForm('phone', event.target.value)}
                      className="admission__input-062"
                      placeholder="98XXXXXXXX"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? 'admission-phone-error' : undefined}
                    />
                    {fieldErrors.phone && (
                      <p id="admission-phone-error" className="admission__field-error">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </label>
                  <label className="admission__label-063">
                    <span className="editorial-kicker admission__span-064">Email</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={admissionForm.email}
                      onChange={(event) => updateAdmissionForm('email', event.target.value)}
                      className="admission__input-065"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'admission-email-error' : undefined}
                    />
                    {fieldErrors.email && (
                      <p id="admission-email-error" className="admission__field-error">
                        {fieldErrors.email}
                      </p>
                    )}
                  </label>
                  <label className="admission__label-066">
                    <span className="editorial-kicker admission__span-067">Message</span>
                    <textarea
                      name="message"
                      rows={5}
                      value={admissionForm.message}
                      onChange={(event) => updateAdmissionForm('message', event.target.value)}
                      className="admission__textarea-068"
                      placeholder="Tell us what you would like to know."
                    />
                  </label>
                </div>

                {formError && (
                  <div className="admission__div-069" role="alert">
                    {formError}
                  </div>
                )}

                {formState === 'sent' && (
                  <div className="admission__div-070" role="status" aria-live="polite">
                    Admission inquiry sent. The school office can now see it in the admin dashboard.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="tactile admission__button-071"
                >
                  {formState === 'sending' ? 'Sending inquiry' : 'Send admission inquiry'}
                  <ArrowDownRight className="admission__arrow-down-right-072" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="admission__section-073">
        <div className="admission__div-074">
          <Reveal variant="scale">
            <div className="admission__div-075">
              <div>
                <p className="editorial-kicker admission__p-076">Come and see for yourself</p>
                <h2 className="admission__h2-077">
                  A school visit tells you more than a brochure can.
                </h2>
              </div>
              <div className="admission__div-078">
                {[
                  [Phone, 'Call', SCHOOL.phone, `tel:${SCHOOL.phone}`],
                  [Mail, 'Write', SCHOOL.email, `mailto:${SCHOOL.email}`],
                  [MapPin, 'Visit', SCHOOL.address, '/#/contact'],
                  [Clock, 'Office hours', SCHOOL.hours, '/#/contact'],
                ].map(([Icon, label, value, href]) => {
                  const ItemIcon = Icon as typeof Phone;
                  return (
                    <a key={String(label)} href={String(href)} className="admission__a-079">
                      <ItemIcon className="admission__item-icon-080" />
                      <span>
                        <strong className="editorial-kicker admission__strong-081">{String(label)}</strong>
                        <span className="admission__span-082">{String(value)}</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return value.replace(/[^\d]/g, '').length >= 7;
}

function isValidGrade(value: string) {
  return GRADE_OPTIONS.includes(value);
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, '');
}
