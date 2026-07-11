import "../styles/pages/Admission.css";
import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowDownRight, Check, Clock, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { ADMISSION_STEPS, REQUIRED_DOCUMENTS, SCHOOL, submitInquiry } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

const eligibility = [
  { level: 'Nursery', criteria: 'Child must be 3 years old by the admission date.' },
  { level: 'LKG / UKG', criteria: 'Age 4–5 years with basic school readiness.' },
  { level: 'Class 1–5', criteria: 'Age-appropriate placement with previous school records.' },
  { level: 'Class 6–8', criteria: 'Successful completion of an entrance assessment.' },
  { level: 'Class 9–10', criteria: 'Entrance examination followed by a student conversation.' },
];

export default function Admission() {
  useScrollToTop();
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

  function updateAdmissionForm(field: keyof typeof admissionForm, value: string) {
    setAdmissionForm((current) => ({ ...current, [field]: value }));
  }

  async function handleAdmissionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    setFormState('sending');

    const guardianName = admissionForm.guardianName.trim();
    const studentName = admissionForm.studentName.trim();
    const grade = admissionForm.grade.trim();

    try {
      await submitInquiry({
        type: 'admission',
        fullName: guardianName,
        guardianName,
        studentName,
        grade,
        phone: admissionForm.phone.trim(),
        email: admissionForm.email.trim(),
        preferredContact: 'phone',
        message:
          admissionForm.message.trim() ||
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

      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal variant="clip">
            <div className="relative bg-navy-950 text-white overflow-hidden p-7 sm:p-10 lg:p-16">
              <div className="absolute inset-0 editorial-grid opacity-25" />
              <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
                <div>
                  <span className="editorial-kicker text-gold-300">Now welcoming families · 2083 BS</span>
                  <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl leading-[0.95] mt-5 max-w-3xl">
                    Your child’s next chapter can begin here.
                  </h2>
                  <p className="text-white/58 leading-relaxed mt-6 max-w-xl">
                    Applications are open from Nursery to Class 10. We invite families to visit,
                    meet our educators, and understand the learning environment before making a decision.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
                  <a href={`tel:${SCHOOL.phone}`} className="tactile inline-flex items-center justify-between gap-8 bg-gold-400 text-navy-950 px-6 py-4 text-sm font-bold">
                    Call admissions <Phone className="w-4 h-4" />
                  </a>
                  <a href={SCHOOL.email ? `mailto:${SCHOOL.email}?subject=Campus Visit Request` : SCHOOL.social.facebook} target={SCHOOL.email ? undefined : '_blank'} rel={SCHOOL.email ? undefined : 'noreferrer'} className="tactile inline-flex items-center justify-between gap-8 border border-white/25 px-6 py-4 text-sm font-bold hover:bg-white hover:text-navy-950 transition-colors">
                    Plan a visit <ArrowDownRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal variant="slide-left" className="mb-14 lg:mb-20">
            <p className="editorial-kicker text-gold-700 mb-5">01 · The process</p>
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-none max-w-3xl">
              Five simple steps,
              <span className="block italic text-navy-500">with people to guide you.</span>
            </h2>
          </Reveal>

          <div className="border-t border-navy-900/20">
            {ADMISSION_STEPS.map((item, index) => (
              <Reveal key={item.step} variant={index % 2 === 0 ? 'slide-left' : 'slide-right'} delay={index * 70}>
                <article className="grid sm:grid-cols-[0.2fr_0.75fr_1.2fr] gap-4 sm:gap-8 py-7 border-b border-navy-900/20 items-start">
                  <span className="font-heading text-3xl text-gold-700">{String(item.step).padStart(2, '0')}</span>
                  <h3 className="font-heading text-2xl sm:text-3xl">{item.title}</h3>
                  <p className="text-sm sm:text-base text-navy-600 leading-relaxed max-w-2xl">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-cream-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <Reveal variant="slide-left">
              <p className="editorial-kicker text-gold-700 mb-5">02 · Eligibility</p>
              <h2 className="font-heading text-5xl sm:text-6xl leading-none mb-10">Finding the right starting point.</h2>
              <div className="border-t border-navy-900/20">
                {eligibility.map((item) => (
                  <div key={item.level} className="grid grid-cols-[0.45fr_1fr] gap-5 py-5 border-b border-navy-900/20">
                    <strong className="text-xs uppercase tracking-[0.14em] text-gold-700">{item.level}</strong>
                    <p className="text-sm text-navy-600 leading-relaxed">{item.criteria}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="slide-right" delay={150}>
              <div className="bg-navy-950 text-white p-7 sm:p-10 lg:p-12">
                <FileText className="w-8 h-8 text-gold-300 mb-8" />
                <p className="editorial-kicker text-gold-300 mb-5">03 · What to bring</p>
                <h2 className="font-heading text-4xl sm:text-5xl leading-none mb-9">Required documents.</h2>
                <ul className="space-y-4">
                  {REQUIRED_DOCUMENTS.map((document) => (
                    <li key={document} className="flex items-start gap-3 text-sm text-white/65">
                      <Check className="w-4 h-4 text-gold-300 shrink-0 mt-0.5" />
                      {document}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 pt-6 border-t border-white/15 flex gap-3 text-sm text-gold-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  Originals are required only for verification during admission.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-start">
            <Reveal variant="slide-left">
              <p className="editorial-kicker text-gold-700 mb-5">04 · Admission inquiry</p>
              <h2 className="font-heading text-5xl sm:text-6xl leading-none">
                Share your details with the admission team.
              </h2>
              <p className="mt-6 text-navy-600 leading-relaxed max-w-lg">
                The school office will receive this request directly and can follow up with
                available classes, visit timing, and next steps.
              </p>
            </Reveal>

            <Reveal variant="slide-right" delay={120}>
              <form onSubmit={handleAdmissionSubmit} className="border border-navy-950/15 bg-cream-50 p-5 sm:p-8 lg:p-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="editorial-kicker text-navy-600">Parent / guardian</span>
                    <input
                      required
                      value={admissionForm.guardianName}
                      onChange={(event) => updateAdmissionForm('guardianName', event.target.value)}
                      className="mt-2 w-full border border-navy-950/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold-700"
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="block">
                    <span className="editorial-kicker text-navy-600">Student name</span>
                    <input
                      required
                      value={admissionForm.studentName}
                      onChange={(event) => updateAdmissionForm('studentName', event.target.value)}
                      className="mt-2 w-full border border-navy-950/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold-700"
                      placeholder="Child's full name"
                    />
                  </label>
                  <label className="block">
                    <span className="editorial-kicker text-navy-600">Class / grade</span>
                    <input
                      required
                      value={admissionForm.grade}
                      onChange={(event) => updateAdmissionForm('grade', event.target.value)}
                      className="mt-2 w-full border border-navy-950/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold-700"
                      placeholder="Nursery, Class 1, Class 8..."
                    />
                  </label>
                  <label className="block">
                    <span className="editorial-kicker text-navy-600">Phone</span>
                    <input
                      required
                      value={admissionForm.phone}
                      onChange={(event) => updateAdmissionForm('phone', event.target.value)}
                      className="mt-2 w-full border border-navy-950/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold-700"
                      placeholder="98XXXXXXXX"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="editorial-kicker text-navy-600">Email</span>
                    <input
                      type="email"
                      value={admissionForm.email}
                      onChange={(event) => updateAdmissionForm('email', event.target.value)}
                      className="mt-2 w-full border border-navy-950/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold-700"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="editorial-kicker text-navy-600">Message</span>
                    <textarea
                      rows={5}
                      value={admissionForm.message}
                      onChange={(event) => updateAdmissionForm('message', event.target.value)}
                      className="mt-2 w-full border border-navy-950/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold-700"
                      placeholder="Tell us what you would like to know."
                    />
                  </label>
                </div>

                {formError && (
                  <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formError}
                  </div>
                )}

                {formState === 'sent' && (
                  <div className="mt-5 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    Admission inquiry sent. The school office can now see it in the admin dashboard.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="tactile mt-7 inline-flex items-center justify-between gap-8 bg-navy-950 text-white px-6 py-4 text-sm font-bold disabled:opacity-60"
                >
                  {formState === 'sending' ? 'Sending inquiry' : 'Send admission inquiry'}
                  <ArrowDownRight className="w-4 h-4" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white text-navy-950">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-12">
          <Reveal variant="scale">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20">
              <div>
                <p className="editorial-kicker mb-5">Come and see for yourself</p>
                <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-none">
                  A school visit tells you more than a brochure can.
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5 content-end">
                {[
                  [Phone, 'Call', SCHOOL.phone, `tel:${SCHOOL.phone}`],
                  [Mail, 'Write', SCHOOL.email, `mailto:${SCHOOL.email}`],
                  [MapPin, 'Visit', SCHOOL.address, '/#/contact'],
                  [Clock, 'Office hours', SCHOOL.hours, '/#/contact'],
                ].map(([Icon, label, value, href]) => {
                  const ItemIcon = Icon as typeof Phone;
                  return (
                    <a key={String(label)} href={String(href)} className="group flex gap-4 border-t border-navy-950/25 pt-4">
                      <ItemIcon className="w-5 h-5 shrink-0 group-hover:rotate-6 transition-transform" />
                      <span>
                        <strong className="editorial-kicker block mb-1">{String(label)}</strong>
                        <span className="text-sm">{String(value)}</span>
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
