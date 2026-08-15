import "../styles/pages/Admission.css";
import PageHero from '../components/ui/PageHero';

const schoolLogoSrc = import.meta.env.DEV
  ? '/schools/surachana/school_logo.jpg'
  : './schools/surachana/school_logo.jpg';

export default function Admission() {
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

          <form className="admission-paper__form">
            <div className="form-row form-row--compact">
              <label className="field field--wide">
                <span>Form No. <em>:-</em></span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row form-row--names">
              <label className="field field--full">
                <span>Name of the Applicant : <small>(IN BLOCK LETTERS)</small></span>
                <div className="inline-fields inline-fields--three">
                  <input type="text" placeholder="First Name" />
                  <input type="text" placeholder="Middle name" />
                  <input type="text" placeholder="Last Name" />
                </div>
              </label>
            </div>

            <div className="form-row form-row--split">
              <div className="field-group">
                <label className="field field--date">
                  <span>Date of Birth (in B.S.) :</span>
                  <div className="inline-fields inline-fields--three">
                    <input type="text" placeholder="Year" />
                    <input type="text" placeholder="Month" />
                    <input type="text" placeholder="Day" />
                  </div>
                </label>
              </div>

              <div className="field-group field-group--right">
                <label className="field">
                  <span>Gender :</span>
                  <div className="option-row">
                    <label className="check"><input type="checkbox" /> <span>Boy</span></label>
                    <label className="check"><input type="checkbox" /> <span>Girl</span></label>
                  </div>
                </label>
                <label className="field field--compact">
                  <span>Mother Tongue:</span>
                  <input type="text" />
                </label>
                <label className="field field--compact">
                  <span>Class Applied For :</span>
                  <input type="text" />
                </label>
              </div>
            </div>

            <div className="form-row">
              <label className="field field--full">
                <span>Name &amp; Address of the Last School Attended:</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row form-row--three-cols">
              <label className="field">
                <span>Class:</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Division Secured in the Last Exam :</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Percentage :</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Rank :</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row form-row--five-cols">
              <label className="field">
                <span>Chronic disease (if any) :</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Allergic to (if any):</span>
                <input type="text" />
              </label>
              <label className="field field--wide-option">
                <span>Seeking admission as :</span>
                <div className="option-row option-row--stacked">
                  <label className="check"><input type="checkbox" /> <span>DAY SCHOLAR</span></label>
                  <label className="check"><input type="checkbox" /> <span>SCHOLAR</span></label>
                </div>
              </label>
            </div>

            <div className="form-row form-row--names">
              <label className="field field--full">
                <span>Father's Name: <small>(IN BLOCK LETTERS)</small></span>
                <div className="inline-fields inline-fields--three">
                  <input type="text" placeholder="First Name" />
                  <input type="text" placeholder="Middle name" />
                  <input type="text" placeholder="Last Name" />
                </div>
              </label>
            </div>

            <div className="form-row form-row--split-second">
              <label className="field">
                <span>Nationality</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Tel. No.</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Mobile No.</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Occupation</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Post:</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row">
              <label className="field field--full">
                <span>Name of the Office / Organization and Address :</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row form-row--names">
              <label className="field field--full">
                <span>Mother's Name: <small>(IN BLOCK LETTERS)</small></span>
                <div className="inline-fields inline-fields--three">
                  <input type="text" placeholder="First Name" />
                  <input type="text" placeholder="Middle name" />
                  <input type="text" placeholder="Last Name" />
                </div>
              </label>
            </div>

            <div className="form-row form-row--split-second">
              <label className="field">
                <span>Occupation</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Post:</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Mobile No.</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row">
              <label className="field field--full">
                <span>Name of the Office / Organization and Address :</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row form-row--address">
              <div className="address-block">
                <h3>Temporary</h3>
                <label className="field"><span>Block No.</span><input type="text" /></label>
                <label className="field"><span>Ward No.</span><input type="text" /></label>
                <label className="field"><span>Village / Town</span><input type="text" /></label>
                <label className="field"><span>VDC / Municipality</span><input type="text" /></label>
                <label className="field"><span>District :</span><input type="text" /></label>
              </div>

              <div className="address-block">
                <h3>Permanent</h3>
                <label className="field"><span>Block No.</span><input type="text" /></label>
                <label className="field"><span>Ward No.</span><input type="text" /></label>
                <label className="field"><span>Village / Town</span><input type="text" /></label>
                <label className="field"><span>VDC / Municipality</span><input type="text" /></label>
                <label className="field"><span>District :</span><input type="text" /></label>
              </div>
            </div>

            <div className="form-row form-row--two-cols">
              <label className="field field--full">
                <span>Local Guardian's Name:</span>
                <input type="text" />
              </label>
              <label className="field field--full">
                <span>Mobile:</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row form-row--four-cols">
              <label className="field">
                <span>Address:</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Tel. (Res):</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Relationship:</span>
                <input type="text" />
              </label>
              <label className="field">
                <span>Occupation:</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row form-row--two-cols">
              <label className="field">
                <span>Post:</span>
                <input type="text" />
              </label>
              <label className="field field--full">
                <span>Name of the Office / Organization and Address:</span>
                <input type="text" />
              </label>
            </div>

            <div className="form-row form-row--topline">
              <label className="field field--full">
                <span>Referral:</span>
                <input type="text" />
              </label>
              <label className="field field--date-small">
                <span>Date:</span>
                <input type="text" />
              </label>
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

            <div className="form-row form-row--submit">
              <button type="submit" className="admission-submit-btn">Submit Application</button>
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
