type SchoolId = 'everest' | 'surachana' | 'laligurans' | 'vidyasagar' | 'dolphin' | 'crescent';

type Profile = {
  school: {
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
  files: string[];
  achievements: Array<{ number: string; label: string; icon: string }>;
};

type ImageMap = Record<string, string>;
type SiteData = {
  school?: Profile['school'];
  images?: ImageMap;
  achievements?: Profile['achievements'];
  programs?: typeof PROGRAMS;
  values?: typeof VALUES;
  whyChoose?: typeof WHY_CHOOSE;
  galleryCategories?: string[];
  galleryItems?: typeof GALLERY_ITEMS;
  faculty?: typeof FACULTY;
  admissionSteps?: typeof ADMISSION_STEPS;
  requiredDocuments?: string[];
  timeline?: typeof TIMELINE;
};

const profile = (
  id: SchoolId,
  school: Profile['school'],
  files: string[],
  achievements: Profile['achievements'],
): Profile => ({
  school,
  files: files.map((file) =>
    import.meta.env.DEV ? `/schools/${id}/${file}` : `./schools/${id}/${file}`,
  ),
  achievements,
});

const profiles: Record<SchoolId, Profile> = {
  everest: profile('everest', {
    name: 'Everest Secondary Boarding School',
    shortName: 'Everest',
    tagline: 'Learning with purpose. Growing together.',
    address: 'Godawari–14, Thaiba, Lalitpur, Nepal',
    locationLine: 'Thaiba · Lalitpur',
    phone: '01-5560575',
    email: '',
    hours: 'Sunday – Friday · School hours',
    mapUrl: 'https://www.google.com/maps?q=Godawari-14%2C%20Thaiba%2C%20Lalitpur&output=embed',
    social: { facebook: 'https://www.facebook.com/everestschool38/', instagram: '', youtube: '', twitter: '' },
    theme: { navy950: '#071d17', navy900: '#103b2b', gold400: '#efc62e', gold700: '#96720a', cream50: '#faf8ed', cream100: '#f0ebd5' },
    aboutTitle: 'A school grounded in effort, care, and community',
    aboutSubtitle: 'Meet the learning community behind Everest Secondary Boarding School in Thaiba.',
    storyTitle: 'Growing capable learners in Thaiba',
    story: [
      'Everest Secondary Boarding School is a close-knit learning community in Godawari–14, Thaiba.',
      'The school day balances focused classroom learning with opportunities to participate, perform, explore, and build confidence alongside friends.',
      'Families are invited to speak directly with the school, visit the campus, and discover whether Everest feels right for their child.',
    ],
    leadershipName: 'School Leadership',
    leadershipTitle: 'Everest Secondary Boarding School',
    leadershipMessage: [
      'Welcome to Everest Secondary Boarding School.',
      'We believe children do their best learning when high expectations are paired with encouragement, belonging, and room to be curious.',
      'Our work is shared with families: helping every learner become more capable, responsible, and confident with each school year.',
    ],
    seoDescription: 'Everest Secondary Boarding School in Godawari–14, Thaiba, Lalitpur.',
    heroLines: ['Rise with', 'curious minds', '& grounded hearts.'],
  }, ['7312434b69c21245.jpg', '0dea54120e3d24f2.jpg', 'c6ad1d673bb112ad.jpg', '0d354e74f539d7cb.jpg', 'f2c5d57243399ed4.jpg', '23c556fae364c6ca.jpg', '6fa97d54fbb35a52.jpg', '5b07fcb541cc7dc4.jpg', 'da0818e69abba4d7.jpg', '10380d054e2d0e83.jpg'],
  [
    { number: 'SEE', label: 'Secondary Focus', icon: 'target' },
    { number: 'Pre–10', label: 'Learning Journey', icon: 'users' },
    { number: 'Thaiba', label: 'Local Community', icon: 'award' },
    { number: 'Whole child', label: 'Shared Purpose', icon: 'trophy' },
  ]),

  surachana: profile('surachana', {
    name: 'Surachana English School',
    shortName: 'Surachana',
    tagline: 'Education is the light of our life.',
    address: 'Thaiba, Lalitpur, Nepal',
    locationLine: 'Thaiba · Lalitpur',
    phone: '986-1132424',
    phoneAlt: '+977 980-3160280',
    email: 'surachana.eschool@gmail.com',
    hours: 'Sunday – Friday · School hours',
    mapUrl: 'https://www.google.com/maps?q=Thaiba%2C%20Lalitpur%2C%20Nepal&output=embed',
    social: { facebook: 'https://www.facebook.com/people/Surachana-English-School/61556496530762/', instagram: '', youtube: '', twitter: '' },
    theme: { navy950: '#081e2c', navy900: '#123e55', gold400: '#f0a14a', gold700: '#a65022', cream50: '#fbf7ef', cream100: '#f1e9db' },
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
    heroLines: ['A brighter', 'way to learn', 'begins here.'],
  }, ['cover.jpg', 'c6c49ee544844205.jpg', '6cf565d788ed4cb8.jpg', 'b8975511abb8dfc6.jpg', 'dc492696f43d89d6.jpg', 'bf48f2abeed085be.jpg', '8133dbb07452109b.jpg', '0ea0c11eea99340e.jpg', '0a477c6cca0beb50.jpg', 'c6c49ee544844205.jpg'],
  [
    { number: 'Light', label: 'Guiding Belief', icon: 'trophy' },
    { number: 'English', label: 'Learning Environment', icon: 'target' },
    { number: 'Thaiba', label: 'Local Community', icon: 'users' },
    { number: 'Together', label: 'School Spirit', icon: 'award' },
  ]),

  laligurans: profile('laligurans', {
    name: 'Laligurans English Secondary School',
    shortName: 'Laligurans',
    tagline: 'The perfect place for your child to be!',
    address: 'Badegaun, Lalitpur, Nepal',
    locationLine: 'Badegaun · Lalitpur',
    phone: '01-5560361',
    email: 'slaligurans@gmail.com',
    hours: 'Sunday – Friday · School hours',
    mapUrl: 'https://www.google.com/maps?q=Badegaun%2C%20Lalitpur%2C%20Nepal&output=embed',
    social: { facebook: 'https://www.facebook.com/laligurans.school21/', instagram: '', youtube: '', twitter: '' },
    theme: { navy950: '#201016', navy900: '#4b1828', gold400: '#e98b9b', gold700: '#9e314c', cream50: '#fcf7f2', cream100: '#f2e7e1' },
    aboutTitle: 'Where school life feels full of possibility',
    aboutSubtitle: 'A closer look at Laligurans English Secondary School and its lively Badegaun community.',
    storyTitle: 'A place for learning, friendship, and confidence',
    story: [
      'Laligurans English Secondary School is part of the Badegaun community in Lalitpur.',
      'The school presents itself as “the perfect place for your child to be”—a promise expressed through active school life, shared experiences, and opportunities for children to grow together.',
      'From classroom focus to energetic activities, students are encouraged to learn with confidence and take an active place in their community.',
    ],
    leadershipName: 'School Leadership',
    leadershipTitle: 'Laligurans English Secondary School',
    leadershipMessage: [
      'Welcome to Laligurans English Secondary School.',
      'A meaningful education should give children knowledge, character, friendships, and the confidence to take part in the world around them.',
      'We invite families to visit, meet our community, and experience the everyday energy of school life in Badegaun.',
    ],
    seoDescription: 'Laligurans English Secondary School in Badegaun, Lalitpur.',
    heroLines: ['Room to', 'grow boldly', '& belong fully.'],
  }, ['new5.jpg', 'new3.jpg', 'new6.jpg', 'new2.jpg', 'new4.jpg', 'new1.jpg', '652fad28e6ae5d28.jpg', '1e96b24398a1ddd9.jpg', '5071f836b8ff5981.jpg', 'aad2c90e4f936620.jpg'],
  [
    { number: 'SEE', label: 'Secondary Focus', icon: 'target' },
    { number: 'English', label: 'Learning Environment', icon: 'award' },
    { number: 'Badegaun', label: 'Local Community', icon: 'users' },
    { number: 'Active', label: 'School Life', icon: 'trophy' },
  ]),

  vidyasagar: profile('vidyasagar', {
    name: 'Vidya Sagar Boarding School',
    shortName: 'Vidya Sagar',
    tagline: 'Knowledge, confidence, and community.',
    address: 'Pati–3, Godawari, Lalitpur, Nepal',
    locationLine: 'Pati · Godawari',
    phone: '01-5560606',
    email: 'vsbsgodawari@gmail.com',
    hours: 'Sunday – Friday · School hours',
    mapUrl: 'https://www.google.com/maps?q=Pati-3%2C%20Godawari%2C%20Lalitpur&output=embed',
    social: { facebook: 'https://www.facebook.com/vsbsgodawari/', instagram: '', youtube: '', twitter: '' },
    theme: { navy950: '#241018', navy900: '#4b1c2a', gold400: '#ee7b75', gold700: '#a7333c', cream50: '#fcf8f3', cream100: '#f3e8e3' },
    aboutTitle: 'A Godawari school shaped by participation',
    aboutSubtitle: 'Meet the learners, educators, and everyday traditions of Vidya Sagar Boarding School.',
    storyTitle: 'Learning with confidence in Pati',
    story: [
      'Vidya Sagar Boarding School is an education community based in Pati–3, Godawari.',
      'Its public school life brings together classroom learning, music, cultural performance, celebrations, and opportunities for students to take part with confidence.',
      'Families can connect directly with the school, visit its learning environment, and understand the rhythm of a Vidya Sagar school day.',
    ],
    leadershipName: 'School Leadership',
    leadershipTitle: 'Vidya Sagar Boarding School',
    leadershipMessage: [
      'Welcome to Vidya Sagar Boarding School.',
      'Education becomes meaningful when knowledge is joined by confidence, expression, discipline, and a real sense of belonging.',
      'We value the partnership between students, educators, and families that helps every child keep moving forward.',
    ],
    seoDescription: 'Vidya Sagar Boarding School in Pati–3, Godawari, Lalitpur.',
    heroLines: ['Learn with', 'confidence', '& take the stage.'],
  }, ['7dd8f8d19d230ddf.jpg', '32b4bef529acebb4.jpg', 'c763b2536c3b3442.jpg', '7aca3b6575f138bc.jpg', '509c957c625b84b8.jpg', '5373f35df2038d98.jpg', '90e378c7d3ce5104.jpg', '8436698b31339c61.jpg', 'a1459d548d0023f4.jpg', '504be36eff142c12.jpg'],
  [
    { number: 'Music', label: 'Creative Learning', icon: 'trophy' },
    { number: 'Culture', label: 'Shared Expression', icon: 'award' },
    { number: 'Pati–3', label: 'Local Community', icon: 'users' },
    { number: 'Together', label: 'School Spirit', icon: 'target' },
  ]),

  dolphin: profile('dolphin', {
    name: 'Dolphin English Secondary School',
    shortName: 'Dolphin',
    tagline: 'A lively place to learn and belong.',
    address: 'Godawari, Lalitpur, Nepal',
    locationLine: 'Godawari · Lalitpur',
    phone: '01-5174015',
    email: '',
    hours: 'Sunday – Friday · School hours',
    mapUrl: 'https://www.google.com/maps?q=Godawari%2C%20Lalitpur%2C%20Nepal&output=embed',
    social: { facebook: 'https://www.facebook.com/p/Dolphin-English-Secondary-School-Godawari-100078825498823/', instagram: '', youtube: '', twitter: '' },
    theme: { navy950: '#071a2c', navy900: '#103d67', gold400: '#f2c84b', gold700: '#a67905', cream50: '#faf8ef', cream100: '#eeeadd' },
    aboutTitle: 'A close school community in Godawari',
    aboutSubtitle: 'Discover the everyday learning and shared experiences of Dolphin English Secondary School.',
    storyTitle: 'A school day with energy and belonging',
    story: [
      'Dolphin English Secondary School serves learners and families in Godawari, Lalitpur.',
      'Its school identity is visible in the moments students share together: assemblies, activities, performances, classroom experiences, and the friendships built along the way.',
      'The best way to understand Dolphin is to speak with the school and see the community in person.',
    ],
    leadershipName: 'School Leadership',
    leadershipTitle: 'Dolphin English Secondary School',
    leadershipMessage: [
      'Welcome to Dolphin English Secondary School.',
      'Children grow when they feel part of their school—able to ask questions, contribute, practise, and discover what they can do.',
      'Our community aims to make learning purposeful while giving students room to develop confidence and responsibility.',
    ],
    seoDescription: 'Dolphin English Secondary School in Godawari, Lalitpur.',
    heroLines: ['Dive into', 'bright ideas', '& grow together.'],
  }, ['3c04607148ac15a8.jpg', '96f0b888bf66a3ab.jpg', 'eeb8209dddf847f8.jpg', 'e6546c7083a36ebe.jpg', '195f707d0371fb12.jpg', '3f46c6e33edde946.jpg', 'f5a7642ccda3fc41.jpg', 'aaa58c8180b874b6.jpg', '56f5dfecf4c67254.jpg', '81ffe49100eca9f3.jpg'],
  [
    { number: 'English', label: 'Learning Environment', icon: 'award' },
    { number: 'SEE', label: 'Secondary Focus', icon: 'target' },
    { number: 'Godawari', label: 'Local Community', icon: 'users' },
    { number: 'Active', label: 'School Life', icon: 'trophy' },
  ]),

  crescent: profile('crescent', {
    name: 'Crescent Academy English School',
    shortName: 'Crescent',
    tagline: 'Education is the light of life.',
    address: 'Dharapati, Godawari, Lalitpur, Nepal',
    locationLine: 'Dharapati · Godawari',
    phone: '01-5174168',
    email: 'cres_mail@yahoo.com',
    hours: 'Sunday – Friday · School hours',
    mapUrl: 'https://www.google.com/maps?q=Dharapati%2C%20Godawari%2C%20Nepal&output=embed',
    social: { facebook: 'https://www.facebook.com/cres97/', instagram: '', youtube: '', twitter: '' },
    theme: { navy950: '#102018', navy900: '#244b34', gold400: '#e8c83e', gold700: '#8f7410', cream50: '#faf9ed', cream100: '#eeecd9' },
    aboutTitle: 'Learning rooted in life and place',
    aboutSubtitle: 'Explore the active school community behind Crescent Academy English School in Dharapati.',
    storyTitle: 'Education as a light for everyday life',
    story: [
      'Crescent Academy English School is based in Dharapati, Godawari.',
      'Its guiding belief—“Education is the light of life”—comes alive through classroom learning, community activities, and practical experiences that bring children closer to the world around them.',
      'Students are encouraged to participate, explore, work together, and build the confidence that lasts beyond a school lesson.',
    ],
    leadershipName: 'School Leadership',
    leadershipTitle: 'Crescent Academy English School',
    leadershipMessage: [
      'Welcome to Crescent Academy English School.',
      'We believe education should illuminate everyday life: helping children understand, contribute, and recognise their own capacity to grow.',
      'With families and educators working together, school becomes a place of steady progress, curiosity, and belonging.',
    ],
    seoDescription: 'Crescent Academy English School in Dharapati, Godawari, Nepal.',
    heroLines: ['Let learning', 'light the way', 'into the world.'],
  }, ['83ebf60752c9853b.jpg', '13fd451da75fde97.jpg', 'c48ea682d15528c1.jpg', 'fea27790a5d3c354.jpg', 'b1e6a02615e8d8fd.jpg', '47b712b44ab4f905.jpg', 'd4da197c0cf06c9d.jpg', 'ea3f2f21916a31d5.jpg', 'fff94a8e1a7baeb3.jpg', 'ff26889a67feae0c.jpg'],
  [
    { number: 'Light', label: 'Guiding Belief', icon: 'trophy' },
    { number: 'English', label: 'Learning Environment', icon: 'award' },
    { number: 'Dharapati', label: 'Local Community', icon: 'users' },
    { number: 'Practical', label: 'Learning in Life', icon: 'target' },
  ]),
};

const pathname = window.location.pathname.toLowerCase();
const schoolFromPath: SchoolId | undefined =
  pathname.includes('surachana-english-school') ? 'surachana'
    : pathname.includes('laligurans-english-secondary-school') ? 'laligurans'
      : pathname.includes('vidya-sagar-boarding-school') ? 'vidyasagar'
        : pathname.includes('dolphin-english-secondary-school') ? 'dolphin'
          : pathname.includes('crescent-academy-english-school') ? 'crescent'
            : pathname.includes('everest-secondary-boarding-school') ? 'everest'
              : undefined;
const requestedId = (import.meta.env.VITE_SCHOOL_ID || schoolFromPath || 'surachana') as SchoolId;
const active = profiles[requestedId] || profiles.everest;
export const ACTIVE_SCHOOL_ID = (profiles[requestedId] ? requestedId : 'everest') as SchoolId;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:4000';
export const SCHOOL = active.school;

const f = active.files;
export const IMAGES = {
  hero1: f[0], hero2: f[1], hero3: f[2], students1: f[3], students2: f[4],
  students3: f[5], drawing: f[6], campus: f[7], building: f[8], building2: f[9],
  teacher1: f[1], teacher2: f[2], teacher3: f[3], teacher4: f[4], teacher5: f[5],
  teacher6: f[6], sports1: f[3], sports2: f[4], sports3: f[5], library: f[7],
  reading: f[8], principal: f[1], cultural1: f[6], cultural2: f[7], celebration: f[8],
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' }, { label: 'About', path: '/about' },
  { label: 'Academics', path: '/academics' }, { label: 'Admission', path: '/admission' },
  { label: 'Gallery', path: '/gallery' }, { label: 'Faculty', path: '/faculty' },
  { label: 'Contact', path: '/contact' },
];

export const ACHIEVEMENTS = active.achievements;
export const PROGRAMS = [
  { title: 'Early Years', ages: 'Young learners', description: 'A caring start built around language, play, routines, creativity, and the confidence to participate.', focus: ['Play', 'Language', 'Movement', 'Belonging'], icon: 'baby' },
  { title: 'Primary Level', ages: 'Foundation years', description: 'Strong foundations in core subjects, with space for questions, teamwork, expression, and practical learning.', focus: ['Core learning', 'Projects', 'Arts', 'Physical activity'], icon: 'bookOpen' },
  { title: 'Lower Secondary', ages: 'Growing independence', description: 'A broader curriculum that deepens understanding and helps learners become organised, curious, and self-aware.', focus: ['Mathematics', 'Science', 'Languages', 'Digital skills'], icon: 'microscope' },
  { title: 'Secondary Level', ages: 'SEE pathway', description: 'Focused academic preparation supported by guidance, responsibility, and learning beyond examinations.', focus: ['SEE preparation', 'Guidance', 'Leadership', 'Application'], icon: 'graduationCap' },
];

export const VALUES = [
  { title: 'Purposeful Learning', description: 'Lessons help students understand, practise, question, and apply what they know.', icon: 'star' },
  { title: 'Character', description: 'Respect, responsibility, and kindness are learned through everyday choices.', icon: 'shield' },
  { title: 'Curiosity', description: 'Questions and original thinking are welcomed as part of real learning.', icon: 'lightbulb' },
  { title: 'Belonging', description: 'Every learner should feel known, included, and able to participate.', icon: 'heart' },
  { title: 'Whole-child Growth', description: 'Academic, social, creative, and physical development belong together.', icon: 'sprout' },
  { title: 'Family Partnership', description: 'Open conversation helps school and home support each child together.', icon: 'handshake' },
];

export const WHY_CHOOSE = [
  { title: 'Caring Educators', description: 'Teachers support both progress and confidence.', icon: 'users' },
  { title: 'Clear Foundations', description: 'A structured learning journey from early years to secondary level.', icon: 'building' },
  { title: 'Active School Life', description: 'Activities and shared experiences bring learning to life.', icon: 'layout' },
  { title: 'A Sense of Belonging', description: 'A community where children can be known and encouraged.', icon: 'shieldCheck' },
  { title: 'SEE Pathway', description: 'Steady preparation for the important secondary years.', icon: 'trendingUp' },
  { title: 'Family Connection', description: 'Direct communication between families and school.', icon: 'messageCircle' },
];

export const GALLERY_CATEGORIES = ['All', 'School Life', 'Learning', 'Activities', 'Community'];
const categories = ['School Life', 'Learning', 'Activities', 'Community'];
export const GALLERY_ITEMS = [...f, ...f.slice(0, 6)].map((src, index) => ({
  src,
  alt: `${SCHOOL.shortName} school moment ${index + 1}`,
  category: categories[index % categories.length],
}));

export const FACULTY = [
  { name: 'School Leadership', position: 'Leadership Team', department: SCHOOL.shortName, image: f[1], bio: 'Guiding the school community with shared purpose and care.' },
  { name: 'Early Years Team', position: 'Foundation Educators', department: 'Early Years', image: f[2], bio: 'Helping young learners feel secure, curious, and ready to take part.' },
  { name: 'Primary Team', position: 'Class Teachers', department: 'Primary Level', image: f[3], bio: 'Building strong foundations through explanation, practice, and encouragement.' },
  { name: 'Secondary Team', position: 'Subject Educators', department: 'Secondary Level', image: f[4], bio: 'Supporting deeper subject learning and the journey toward SEE.' },
  { name: 'Activities Team', position: 'Co-curricular Mentors', department: 'Student Life', image: f[5], bio: 'Creating opportunities for expression, teamwork, movement, and confidence.' },
  { name: 'Student Support', position: 'School Community', department: 'Pastoral Care', image: f[6], bio: 'Helping students feel heard, connected, and ready to learn.' },
];

export const ADMISSION_STEPS = [
  { step: 1, title: 'Start a Conversation', description: 'Call, message the school, or visit in person to ask about current availability.' },
  { step: 2, title: 'Visit the School', description: 'See the learning environment and talk through what matters to your family.' },
  { step: 3, title: 'Student Interaction', description: 'An age-appropriate conversation or assessment helps identify the right placement.' },
  { step: 4, title: 'Share Documents', description: 'Provide previous school records and the documents requested by the admission team.' },
  { step: 5, title: 'Confirm Admission', description: `Complete the school’s confirmation process and prepare to join the ${SCHOOL.shortName} community.` },
];
export const REQUIRED_DOCUMENTS = ['Birth certificate', 'Previous school records or mark sheet', 'Transfer certificate, where applicable', 'Recent passport-size photographs', 'Parent or guardian identification', 'Any additional document requested by the school'];
export const TIMELINE = [
  { year: 'Foundation', title: 'A school takes root', description: `${SCHOOL.shortName} begins with a commitment to serve learners and families in its local community.` },
  { year: 'Growth', title: 'A community grows', description: 'New learners, educators, activities, and shared traditions shape the character of the school.' },
  { year: 'Today', title: 'Learning continues', description: `${SCHOOL.name} continues to help young people learn, participate, and move forward with confidence.` },
];

export async function loadBackendSchoolData() {
  if (import.meta.env.VITE_DISABLE_BACKEND === 'true') return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/schools/${ACTIVE_SCHOOL_ID}/site-data`);
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);

    const payload = await response.json() as { ok: boolean; data?: SiteData };
    if (!payload.ok || !payload.data) throw new Error('Backend response was not usable.');

    applySiteData(payload.data);
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
  const response = await fetch(`${API_BASE_URL}/api/schools/${ACTIVE_SCHOOL_ID}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...input,
      source: 'surachana-website',
    }),
  });

  const payload = await response.json() as {
    ok: boolean;
    error?: { message?: string };
  };

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error?.message || 'Could not send message right now.');
  }
}

function applySiteData(data: SiteData) {
  if (data.school) Object.assign(SCHOOL, data.school);
  if (data.images) Object.assign(IMAGES, normalizeImages(data.images));
  replaceArray(ACHIEVEMENTS, data.achievements);
  replaceArray(PROGRAMS, data.programs);
  replaceArray(VALUES, data.values);
  replaceArray(WHY_CHOOSE, data.whyChoose);
  replaceArray(GALLERY_CATEGORIES, data.galleryCategories);
  replaceArray(GALLERY_ITEMS, data.galleryItems?.map((item) => ({
    ...item,
    src: normalizeAssetPath(item.src),
  })));
  replaceArray(FACULTY, data.faculty?.map((member) => ({
    ...member,
    image: normalizeAssetPath(member.image),
  })));
  replaceArray(ADMISSION_STEPS, data.admissionSteps);
  replaceArray(REQUIRED_DOCUMENTS, data.requiredDocuments);
  replaceArray(TIMELINE, data.timeline);
}

function normalizeImages(images: ImageMap) {
  return Object.fromEntries(
    Object.entries(images).map(([key, value]) => [key, normalizeAssetPath(value)]),
  );
}

function normalizeAssetPath(src: string) {
  if (!src || import.meta.env.DEV || !src.startsWith('/schools/')) return src;
  return `.${src}`;
}

function replaceArray<T>(target: T[], source: T[] | undefined) {
  if (!source) return;
  target.splice(0, target.length, ...source);
}
