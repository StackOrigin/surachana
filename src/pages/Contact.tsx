import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react';
import { SCHOOL, submitInquiry } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import PageHero from '../components/ui/PageHero';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';

export default function Contact() {
  useScrollToTop();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const form = new FormData(e.currentTarget);

    try {
      await submitInquiry({
        type: mapSubjectToType(String(form.get('subject') || 'general')),
        fullName: String(form.get('fullName') || ''),
        phone: String(form.get('phone') || ''),
        email: String(form.get('email') || ''),
        message: String(form.get('message') || ''),
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

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Info Cards */}
          <Reveal variant="fade">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: <MapPin className="w-6 h-6" />, title: "Visit Us", detail: SCHOOL.address, sub: SCHOOL.locationLine },
                { icon: <Phone className="w-6 h-6" />, title: "Call Us", detail: SCHOOL.phone, sub: SCHOOL.phoneAlt || "Speak with the school" },
                { icon: <Mail className="w-6 h-6" />, title: SCHOOL.email ? "Email Us" : "Message Us", detail: SCHOOL.email || "Facebook page", sub: "Send a direct enquiry" },
                { icon: <Clock className="w-6 h-6" />, title: "Office Hours", detail: "Sun – Fri", sub: "Confirm hours before visiting" },
              ].map((item, i) => (
                <div key={i} className="tactile bg-white rounded-2xl p-6 shadow-sm border border-navy-100/50 hover:shadow-lg hover:border-gold-200 transition-all duration-300 text-center group">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-base font-bold text-navy-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-navy-700 font-medium">{item.detail}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form + Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionTitle
                badge="Get in Touch"
                title="Send Us a Message"
                subtitle="Have questions? Fill out the form and we'll get back to you promptly."
                align="left"
              />
              <Reveal variant="slide-left">
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-700">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Full Name *</label>
                        <input name="fullName" type="text" required className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Phone Number</label>
                        <input name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="+977-" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">Email Address *</label>
                      <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">Subject *</label>
                      <select name="subject" required className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm bg-white">
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
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">Message *</label>
                      <textarea name="message" rows={5} required className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm resize-none" placeholder="How can we help you?" />
                    </div>
                    <Button variant="primary" size="lg" type="submit" disabled={submitting} className="w-full sm:w-auto disabled:opacity-60">
                      <Send className="w-4 h-4" /> {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </Reveal>
            </div>

            <Reveal variant="slide-right" delay={200}>
              <div className="space-y-6">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-navy-100 h-80 lg:h-96">
                  <iframe
                    src={SCHOOL.mapUrl}
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
                <div className="bg-navy-900 rounded-2xl p-6">
                  <h3 className="font-heading text-lg font-bold text-white mb-4">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-3">
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
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-navy-800 text-navy-200 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 text-sm font-medium"
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
