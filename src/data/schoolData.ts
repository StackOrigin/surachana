type SchoolDetails = {
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  locationLine: string;
  phone: string;
  phoneAlt?: string;
  email: string;
  hours: string;
  mapUrl: string;
  social: { facebook: string; instagram: string; youtube: string; twitter: string };
  theme: { navy950: string; navy900: string; gold400: string; gold700: string; cream50: string; cream100: string };
  aboutTitle: string;
  aboutSubtitle: string;
  storyTitle: string;
  story: string[];
  leadershipName: string;
  leadershipTitle: string;
  leadershipMessage: string[];
  seoDescription: string;
  heroLines: [string, string, string];
};

type ImageMap = Record<string, string>;
type Achievement = { number: string; label: string; icon: string };
type Program = { title: string; ages: string; description: string; focus: string[]; icon: string };
type ValueItem = { title: string; description: string; icon: string };
type GalleryItem = { src: string; alt: string; category: string };
type FacultyLevel = 'principal' | 'junior' | 'senior' | 'other';
type FacultyMember = { name: string; position: string; department: string; image: string; bio: string; level: FacultyLevel };
type BackendStaffMember = {
  name?: string;
  designation?: string;
  department?: string;
  memberType?: 'teacher' | 'staff';
  subjects?: string[];
  photoUrl?: string;
  bio?: string;
  email?: string;
  order?: number;
  isLeadership?: boolean;
};
type BackendAlbum = {
  title?: string;
  description?: string;
  coverUrl?: string;
  images?: { url?: string; caption?: string; order?: number }[];
};

type AdmissionStep = { step: number; title: string; description: string };
type TimelineItem = { year: string; title: string; description: string };

type SiteData = {
  id?: string;
  slug?: string;
  school?: SchoolDetails;
  images?: ImageMap;
  achievements?: Achievement[];
  programs?: Program[];
  values?: ValueItem[];
  whyChoose?: ValueItem[];
  galleryCategories?: string[];
  galleryItems?: GalleryItem[];
  faculty?: FacultyMember[];
  admissionSteps?: AdmissionStep[];
  requiredDocuments?: string[];
  timeline?: TimelineItem[];
};

const SCHOOL_CONTEXT =
  import.meta.env.VITE_SCHOOL_ID?.trim()
  || import.meta.env.VITE_SCHOOL_SLUG?.trim()
  || 'current';
let activeSchoolContext = SCHOOL_CONTEXT;

const asset = (filename: string) =>
  import.meta.env.DEV ? `/schools/surachana/${filename}` : `./schools/surachana/${filename}`;

const files = [
  'cover.jpg',
  'c6c49ee544844205.jpg',
  '6cf565d788ed4cb8.jpg',
  'b8975511abb8dfc6.jpg',
  'dc492696f43d89d6.jpg',
  'bf48f2abeed085be.jpg',
  '8133dbb07452109b.jpg',
  '0ea0c11eea99340e.jpg',
  '0a477c6cca0beb50.jpg',
  'c6c49ee544844205.jpg',
  'heroPhoto1.jpeg',
  'heroPhoto2.jpeg',
  'heroPhoto3.jpeg',
  'heroPhoto4.jpeg',
  'lowerSecondary.jpeg',
  'arriveAndBelong.jpeg',
  'questionAndDiscover.jpeg',
  'moveAndConnect.jpeg',
  'makeAndExpress.jpeg',
  'about1.jpeg',
  'about2.jpeg',
  'leadership.jpeg',
].map(asset);

export const SCHOOL: SchoolDetails = {
  name: 'Surachana English School',
  shortName: 'Surachana',
  tagline: 'Education is the light of our life.',
  address: 'Thaiba, Lalitpur, Nepal',
  locationLine: 'Thaiba · Lalitpur',
  phone: '01-5560537',
  phoneAlt: '01-5560537',
  email: 'surachana.eschool@gmail.com',
  hours: 'Sunday – Friday · School hours',
  mapUrl: 'https://www.google.com/maps?q=Thaiba%2C%20Lalitpur%2C%20Nepal&output=embed',
  social: {
    facebook: 'https://www.facebook.com/people/Surachana-English-School/61556496530762/',
    instagram: '',
    youtube: '',
    twitter: '',
  },
  theme: {
    navy950: '#081e2c',
    navy900: '#123e55',
    gold400: '#f0a14a',
    gold700: '#a65022',
    cream50: '#fbf7ef',
    cream100: '#f1e9db',
  },
  aboutTitle: 'A bright, welcoming place to begin',
  aboutSubtitle: 'Discover the people and everyday experiences that shape Surachana English School.',
  storyTitle: 'Learning that brings children into the light',
  story: [
    'Surachana English School serves families in Thaiba with a warm, community-minded approach to education.',
    'Its guiding thought—“Education is the light of our life”—is reflected in a school culture built around participation, encouragement, and steady progress.',
    'Learning extends beyond lessons into celebrations, shared activities, creativity, and the friendships that make school memorable.',
  ],
  leadershipName: 'School Leadership',
  leadershipTitle: 'Surachana English School',
  leadershipMessage: [
    'Welcome to Surachana English School.',
    'We see education as a light: something that helps children understand their world, recognise their strengths, and move forward with confidence.',
    'Together with families, we aim to make each school day purposeful, caring, and full of reasons to participate.',
  ],
  seoDescription: 'Surachana English School in Thaiba, Lalitpur — education is the light of our life.',
  heroLines: ['A brighter way to learn', 'begins here.', ''],
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim()
  || (import.meta.env.DEV ? 'http://127.0.0.1:4000' : '');

const schoolApiPath = (suffix = '', schoolContext = activeSchoolContext) =>
  `${API_BASE_URL}/api/schools/${encodeURIComponent(schoolContext)}${suffix}`;

export const IMAGES = {
  hero1: files[0], hero2: files[1], hero3: files[2], students1: files[3], students2: files[4],
  students3: files[5], drawing: files[6], campus: files[7], building: files[8], building2: files[9],
  teacher1: files[1], teacher2: files[2], teacher3: files[3], teacher4: files[4], teacher5: files[5],
  teacher6: files[6], sports1: files[3], sports2: files[4], sports3: files[5], library: files[7],
  reading: files[8], principal: files[1], cultural1: files[6], cultural2: files[7], celebration: files[8],
  heroPhoto1: files[10], heroPhoto2: files[11], heroPhoto3: files[12], heroPhoto4: files[13],
  earlyYears: asset('earlyYears.jpeg'),
  primaryYears: asset('primaryYears.jpeg'),
  lowerSecondary: files[14],
  lowerSecondaryAcademics: asset('lowerSecondaryAcademics.jpeg'),
  primaryTeam: asset('primaryTeam.jpeg'),
  activitiesTeam: asset('activitiesTeam.jpeg'),
  studentSupport: asset('studentSupport.jpeg'),
  arriveAndBelong: files[15], questionAndDiscover: files[16], moveAndConnect: files[17],
  makeAndExpress: files[18],
  about1: files[19], about2: files[20],
  leadership: files[21],
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admission', path: '/admission' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Contact', path: '/contact' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { number: 'Light', label: 'Guiding Belief', icon: 'trophy' },
  { number: 'English', label: 'Learning Environment', icon: 'target' },
  { number: 'Thaiba', label: 'Local Community', icon: 'users' },
  { number: 'Together', label: 'School Spirit', icon: 'award' },
];

export const PROGRAMS: Program[] = [
  { title: 'Early Years', ages: 'Young learners', description: 'A caring start built around language, play, routines, creativity, and the confidence to participate.', focus: ['Play', 'Language', 'Movement', 'Belonging'], icon: 'baby' },
  { title: 'Primary Level', ages: 'Foundation years', description: 'Strong foundations in core subjects, with space for questions, teamwork, expression, and practical learning.', focus: ['Core learning', 'Projects', 'Arts', 'Physical activity'], icon: 'bookOpen' },
  { title: 'Lower Secondary', ages: 'Growing independence', description: 'A broader curriculum that deepens understanding and helps learners become organised, curious, and self-aware.', focus: ['Mathematics', 'Science', 'Languages', 'Digital skills'], icon: 'microscope' },
];

export const VALUES: ValueItem[] = [
  { title: 'Purposeful Learning', description: 'Lessons help students understand, practise, question, and apply what they know.', icon: 'star' },
  { title: 'Character', description: 'Respect, responsibility, and kindness are learned through everyday choices.', icon: 'shield' },
  { title: 'Curiosity', description: 'Questions and original thinking are welcomed as part of real learning.', icon: 'lightbulb' },
  { title: 'Belonging', description: 'Every learner should feel known, included, and able to participate.', icon: 'heart' },
  { title: 'Whole-child Growth', description: 'Academic, social, creative, and physical development belong together.', icon: 'sprout' },
  { title: 'Family Partnership', description: 'Open conversation helps school and home support each child together.', icon: 'handshake' },
];

export const WHY_CHOOSE: ValueItem[] = [
  { title: 'Caring Educators', description: 'Teachers support both progress and confidence.', icon: 'users' },
  { title: 'Clear Foundations', description: 'A structured learning journey from early years through lower secondary.', icon: 'building' },
  { title: 'Active School Life', description: 'Activities and shared experiences bring learning to life.', icon: 'layout' },
  { title: 'A Sense of Belonging', description: 'A community where children can be known and encouraged.', icon: 'shieldCheck' },
  { title: 'SEE Pathway', description: 'Steady preparation for the next academic step.', icon: 'trendingUp' },
  { title: 'Family Connection', description: 'Direct communication between families and school.', icon: 'messageCircle' },
];

export const GALLERY_CATEGORIES = ['All', 'School Life', 'Learning', 'Activities', 'Community'];
export const GALLERY_ITEMS: GalleryItem[] = [];

export const FACULTY: FacultyMember[] = [];


export const ADMISSION_STEPS: AdmissionStep[] = [
  { step: 1, title: 'Start a Conversation', description: 'Call, message the school, or visit in person to ask about current availability.' },
  { step: 2, title: 'Visit the School', description: 'See the learning environment and talk through what matters to your family.' },
  { step: 3, title: 'Student Interaction', description: 'An age-appropriate conversation or assessment helps identify the right placement.' },
  { step: 4, title: 'Share Documents', description: 'Provide previous school records and the documents requested by the admission team.' },
  { step: 5, title: 'Confirm Admission', description: 'Complete the school’s confirmation process and prepare to join the Surachana community.' },
];

export const REQUIRED_DOCUMENTS = [
  'Birth certificate',
  'Previous school records or mark sheet',
  'Transfer certificate, where applicable',
  'Recent passport-size photographs',
  'Parent or guardian identification',
  'Any additional document requested by the school',
];

export const TIMELINE: TimelineItem[] = [
  { year: 'Foundation', title: 'A school takes root', description: 'Surachana begins with a commitment to serve learners and families in its local community.' },
  { year: 'Growth', title: 'A community grows', description: 'New learners, educators, activities, and shared traditions shape the character of the school.' },
  { year: 'Today', title: 'Learning continues', description: 'Surachana English School continues to help young people learn, participate, and move forward with confidence.' },
];

export async function loadBackendSchoolData() {
  if (import.meta.env.VITE_DISABLE_BACKEND === 'true' || !API_BASE_URL) return;

  try {
    const response = await fetchWithTimeout(resolveSiteDataUrl(), undefined, 3500);
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);

    const payload = await readJsonResponse(response) as { ok: boolean; data?: SiteData } | null;
    if (!payload?.ok || !payload.data) throw new Error('Backend response was not usable.');
    activeSchoolContext = payload.data.id || payload.data.slug || SCHOOL_CONTEXT;
    applySiteData(payload.data);
    await loadBackendFeatureModules();
  } catch (error) {
    console.warn('Using bundled school data because backend data could not be loaded.', error);
  }
}

export async function submitInquiry(input: {
  type: string;
  fullName: string;
  email: string;
  phone: string;
  studentName?: string;
  guardianName?: string;
  grade?: string;
  preferredContact?: string;
  message: string;
}) {
  if (!API_BASE_URL) {
    throw new Error(`Online enquiries are temporarily unavailable. Please call ${SCHOOL.phone}.`);
  }

  const response = await fetchWithTimeout(schoolApiPath('/inquiries'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, source: 'surachana-website' }),
  }, 12000);

  const payload = await readJsonResponse(response) as { ok: boolean; error?: { message?: string } } | null;
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error?.message || 'Could not send message right now.');
  }
}

function applySiteData(data: SiteData) {
  if (data.school) Object.assign(SCHOOL, data.school);
  replaceArray(ACHIEVEMENTS, data.achievements);
  replaceArray(PROGRAMS, data.programs);
  replaceArray(VALUES, data.values);
  replaceArray(WHY_CHOOSE, data.whyChoose);
  replaceGalleryItems(data.galleryItems?.map((item) => ({ ...item, src: normalizeAssetPath(item.src) })));
  replaceArray(ADMISSION_STEPS, data.admissionSteps);
  replaceArray(REQUIRED_DOCUMENTS, data.requiredDocuments);
  replaceArray(TIMELINE, data.timeline);
}

async function loadBackendFeatureModules() {
  const [staffResult, albumsResult] = await Promise.allSettled([
    fetchFeatureModule<BackendStaffMember>('staff'),
    fetchFeatureModule<BackendAlbum>('albums'),
  ]);

  if (staffResult.status === 'fulfilled' && staffResult.value.length) {
    replaceArray(FACULTY, staffResult.value.map(mapStaffMember));
  }

  if (albumsResult.status === 'fulfilled' && albumsResult.value.length) {
    const galleryItems = albumsResult.value
      .flatMap((album, albumIndex) => {
        const images = album.images?.length
          ? album.images
          : album.coverUrl
            ? [{ url: album.coverUrl, caption: album.description, order: 0 }]
            : [];

        return images
          .filter((image) => Boolean(image.url))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((image, imageIndex) => ({
            src: normalizeAssetPath(image.url || ''),
            alt: image.caption || album.title || `${SCHOOL.shortName} school moment ${albumIndex + imageIndex + 1}`,
            category: album.title || 'School Life',
          }));
      });

    if (galleryItems.length) {
      replaceGalleryItems(galleryItems);
    }
  }
}

function replaceGalleryItems(items: GalleryItem[] | undefined) {
  if (!items) return;

  const uniqueItems = Array.from(
    new Map(items.filter((item) => item.src).map((item) => [item.src, item])).values(),
  );
  replaceArray(GALLERY_ITEMS, uniqueItems);
  replaceArray(GALLERY_CATEGORIES, ['All', ...Array.from(new Set(uniqueItems.map((item) => item.category)))]);
}

function resolveSiteDataUrl() {
  if (SCHOOL_CONTEXT === 'current') return schoolApiPath('', 'current');
  return schoolApiPath('/site-data', SCHOOL_CONTEXT);
}

async function fetchFeatureModule<T>(moduleName: string) {
  const response = await fetchWithTimeout(schoolApiPath(`/${moduleName}`), undefined, 3500);
  if (!response.ok) return [];
  const payload = await readJsonResponse(response) as { ok: boolean; data?: T[] } | null;
  return payload?.ok && Array.isArray(payload.data) ? payload.data : [];
}

function mapStaffMember(member: BackendStaffMember): FacultyMember {
  const designation = member.designation?.trim() || (member.memberType === 'staff' ? 'Staff' : 'Teacher');
  const department = member.department?.trim() || member.subjects?.join(', ') || SCHOOL.shortName;

  return {
    name: member.name?.trim() || 'Faculty Member',
    position: designation,
    department,
    image: normalizeAssetPath(member.photoUrl || ''),
    bio: member.bio?.trim() || buildStaffBio(designation, department),
    level: resolveFacultyLevel(member),
  };
}

function resolveFacultyLevel(member: BackendStaffMember): FacultyLevel {
  const text = `${member.designation || ''} ${member.department || ''}`.toLowerCase();
  if (member.isLeadership || text.includes('principal') || text.includes('leader')) return 'principal';
  if (member.memberType === 'staff') return 'other';
  if (text.includes('junior') || text.includes('early') || text.includes('primary')) return 'junior';
  if (text.includes('senior') || text.includes('secondary')) return 'senior';
  return 'other';
}

function buildStaffBio(position: string, department: string) {
  return `${position}${department ? `, ${department}` : ''}.`;
}

function normalizeAssetPath(src: string) {
  if (!src) return src;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('/uploads/')) return API_BASE_URL ? `${API_BASE_URL}${src}` : src;
  if (!src || import.meta.env.DEV || !src.startsWith('/schools/')) return src;
  return `.${src}`;
}

function replaceArray<T>(target: T[], source: T[] | undefined) {
  if (source) target.splice(0, target.length, ...source);
}

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('The request timed out. Please try again.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function readJsonResponse(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}
