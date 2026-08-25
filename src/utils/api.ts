/**
 * Thin helpers for talking to the Nivaksha backend.
 *
 * Reads VITE_API_BASE_URL and VITE_SCHOOL_ID / VITE_SCHOOL_SLUG from the
 * environment so callers don't need to know about base URLs or school context.
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:4000').replace(/\/+$/, '');
const SCHOOL_SLUG = import.meta.env.VITE_SCHOOL_SLUG || import.meta.env.VITE_SCHOOL_ID || 'surachan-school';
const SCHOOL_ID = import.meta.env.VITE_SCHOOL_ID || SCHOOL_SLUG;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Response from POST /api/schools/:slug/admission-forms */
export type AdmissionFormUploadResponse = {
  ok: boolean;
  url?: string;
  id?: string;
  error?: { code: string; message: string };
};

/** Response from POST /api/schools/:id/inquiries */
export type InquiryResponse = {
  ok: boolean;
  data?: { id: string; schoolId: string; status: string; createdAt: string };
  error?: { code: string; message: string };
};

/** Payload sent to the admission inquiry endpoint */
export type AdmissionInquiryPayload = {
  type: 'admission';
  fullName: string;
  email: string;
  phone?: string;
  studentName?: string;
  guardianName?: string;
  grade?: string;
  previousSchool?: string;
  message?: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Upload a filled admission-form PDF to the backend.
 *
 * Endpoint: POST /api/schools/:schoolSlug/admission-forms
 * Content-Type: multipart/form-data (single `file` field)
 */
export async function uploadAdmissionPdf(
  pdfBlob: Blob,
  filename: string,
): Promise<AdmissionFormUploadResponse> {
  const file = new File([pdfBlob], filename, { type: 'application/pdf' });
  const formData = new FormData();
  formData.append('file', file);

  const url = `${API_BASE}/api/schools/${encodeURIComponent(SCHOOL_SLUG)}/admission-forms`;
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type header — browser automatically sets multipart/form-data with boundary
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  if (!res.ok || !json?.ok) {
    const errorMsg = json?.error?.message || json?.message || text || `PDF upload failed (HTTP ${res.status})`;
    console.warn('[admission-forms] Upload not supported or failed:', res.status, errorMsg);
    throw new Error(errorMsg);
  }

  return json as AdmissionFormUploadResponse;
}

/**
 * Submit basic admission inquiry data so it appears in the admin panel's
 * "Admission Enquiry" section.
 *
 * Endpoint: POST /api/schools/:schoolId/inquiries
 * Content-Type: application/json
 */
export async function submitAdmissionInquiry(
  payload: AdmissionInquiryPayload,
): Promise<InquiryResponse> {
  const url = `${API_BASE}/api/schools/${SCHOOL_ID}/inquiries`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-school-id': SCHOOL_ID,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok || !json.ok) {
    console.error('[inquiries] Submission failed:', res.status, json);
    const msg = json?.error?.message || `Inquiry submission failed (HTTP ${res.status})`;
    throw new Error(msg);
  }
  return json as InquiryResponse;
}
