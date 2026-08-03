import "../styles/pages/Contact.css";
import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react';
import { SCHOOL, resolveMapUrl, submitInquiry } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import { useSchoolData } from '../hooks/useSchoolData';
import PageHero from '../components/ui/PageHero';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';

export default function Contact() {
  useScrollToTop();
  useSchoolData();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ phone: '', email: '' });
  const [mapEmbedUrl, setMapEmbedUrl] = useState(SCHOOL.mapUrl);

  useEffect(() => {
    let active = true;
    resolveMapUrl(SCHOOL.mapUrl).then((url) => {
      if (active) setMapEmbedUrl(url);
    });
    return () => {
      active = false;
    };
  }, [SCHOOL.mapUrl]);

  function updateFieldError(field: 'phone' | 'email', message: string) {
    setFieldErrors((current) => ({ ...current, [field]: message }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setFieldErrors({ phone: '', email: '' });

    const form = new FormData(e.currentTarget);
    const fullName = String(form.get('fullName') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const email = String(form.get('email') || '').trim();
    const subject = String(form.get('subject') || '').trim();
    const message = String(form.get('message') || '').trim();

    if (fullName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!isValidPhone(phone)) {
      updateFieldError('phone', 'Please enter a valid phone number.');
      return;
    }
    if (!isValidEmail(email)) {
      updateFieldError('email', 'Please enter a valid email address.');
      return;
    }
    if (!subject) {
      setError('Please choose a subject.');
      return;
    }
    if (message.length < 10) {
      setError('Please write a message with at least 10 characters.');
      return;
    }

    setSubmitting(true);

    try {
      await submitInquiry({
        type: mapSubjectToType(subject),
        fullName,
        phone,
        email,
        message,
      });
      setSubmitted(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not send message right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for admissions, general inquiries, or to schedule a campus visit."
        breadcrumb="Contact"
      />

      <section className="contact__section-001">
        <div className="contact__div-002">
          {/* Contact Info Cards */}
          <Reveal variant="fade">
            <div className="contact__div-003">
              {[
                { icon: <MapPin className="contact__map-pin-004" />, title: "Visit Us", detail: SCHOOL.address, sub: SCHOOL.locationLine },
                { icon: <Phone className="contact__phone-005" />, title: "Call Us", detail: SCHOOL.phone, sub: SCHOOL.phoneAlt || "Speak with the school" },
                { icon: <Mail className="contact__mail-006" />, title: SCHOOL.email ? "Email Us" : "Message Us", detail: SCHOOL.email || "Facebook page", sub: "Send a direct enquiry" },
                { icon: <Clock className="contact__clock-007" />, title: "Office Hours", detail: "Sun – Fri", sub: "Confirm hours before visiting" },
              ].map((item, i) => (
                <div key={i} className="tactile contact__div-008">
                  <div className="contact__div-009">
                    {item.icon}
                  </div>
                  <h3 className="contact__h3-010">{item.title}</h3>
                  <p className="contact__p-011">{item.detail}</p>
                  <p className="contact__p-012">{item.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form + Map */}
          <div className="contact__div-013">
            <div>
              <SectionTitle
                badge="Get in Touch"
                title="Send Us a Message"
                subtitle="Have questions? Fill out the form and we'll get back to you promptly."
                align="left"
              />
              <Reveal variant="slide-left">
                {submitted ? (
                  <div className="contact__div-014" role="status" aria-live="polite">
                    <CheckCircle className="contact__check-circle-015" />
                    <h3 className="contact__h3-016">Message Sent!</h3>
                    <p className="contact__p-017">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact__form-018" noValidate>
                    {error && (
                      <div className="contact__div-019" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="contact__div-020">
                      <div>
                        <label htmlFor="contact-full-name" className="contact__label-021">Full Name *</label>
                        <input id="contact-full-name" name="fullName" type="text" autoComplete="name" required className="contact__input-022" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="contact__label-023">Phone Number *</label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required
                          className="contact__input-024"
                          placeholder="98XXXXXXXX"
                          onInput={(event) => {
                            const input = event.currentTarget;
                            input.value = onlyNumbers(input.value);
                            updateFieldError('phone', isValidPhone(input.value) || !input.value ? '' : 'Please enter a valid phone number.');
                          }}
                          aria-invalid={Boolean(fieldErrors.phone)}
                          aria-describedby={fieldErrors.phone ? 'contact-phone-error' : undefined}
                        />
                        {fieldErrors.phone && (
                          <p id="contact-phone-error" className="contact__field-error">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="contact__label-025">Email Address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="contact__input-026"
                        placeholder="your@email.com"
                        onChange={(event) => {
                          const value = event.currentTarget.value.trim();
                          updateFieldError('email', isValidEmail(value) || !value ? '' : 'Please enter a valid email address.');
                        }}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                      />
                      {fieldErrors.email && (
                        <p id="contact-email-error" className="contact__field-error">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="contact__label-027">Subject *</label>
                      <select id="contact-subject" name="subject" required className="contact__select-028">
                        <option value="">Select a subject</option>
                        <option value="admission">Admission Inquiry</option>
                        <option value="general">General Inquiry</option>
                        <option value="campus_visit">Campus Visit</option>
                        <option value="fee">Fee Structure</option>
                        <option value="career">Career / Job Inquiry</option>
                        <option value="feedback">Complaint / Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="contact__label-029">Message *</label>
                      <textarea id="contact-message" name="message" rows={5} required className="contact__textarea-030" placeholder="How can we help you?" />
                    </div>
                    <Button variant="primary" size="lg" type="submit" disabled={submitting} className="contact__button-031">
                      <Send className="contact__send-032" /> {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </Reveal>
            </div>

            <Reveal variant="slide-right" delay={200}>
              <div className="contact__div-033">
                <div className="contact__div-034">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="School Location"
                  />
                </div>
                
                {/* Social Links */}
                <div className="contact__div-035">
                  <h3 className="contact__h3-036">Follow Us</h3>
                  <div className="contact__div-037">
                    {[
                      { name: "Facebook", href: SCHOOL.social.facebook },
                      { name: "Instagram", href: SCHOOL.social.instagram },
                      { name: "YouTube", href: SCHOOL.social.youtube },
                      { name: "Twitter / X", href: SCHOOL.social.twitter },
                    ].filter((social) => social.href).map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact__a-038"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

function mapSubjectToType(value: string) {
  return value || 'general';
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return value.replace(/[^\d]/g, '').length >= 7;
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, '');
}
