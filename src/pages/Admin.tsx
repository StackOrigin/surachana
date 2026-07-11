import "../styles/pages/Admin.css";
import type { FormEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  Activity,
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  Image,
  LayoutDashboard,
  Lock,
  Mail,
  Megaphone,
  MessageSquare,
  Pencil,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
  Wallet,
  XCircle,
} from 'lucide-react';
import { IMAGES, SCHOOL } from '../data/schoolData';
import { cn } from '../utils/cn';

type SectionId = 'overview' | 'admissions' | 'messages' | 'notices' | 'calendar' | 'gallery' | 'staff' | 'settings';
type AdmissionStatus = 'New' | 'Visit booked' | 'Assessment' | 'Admitted' | 'Waitlist';

type AdmissionRow = {
  id: string;
  student: string;
  guardian: string;
  grade: string;
  status: AdmissionStatus;
  date: string;
  phone: string;
};

type Notice = {
  id: string;
  title: string;
  audience: string;
  channel: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  date: string;
};

type GalleryItem = {
  id: string;
  title: string;
  image: string;
  status: 'Review' | 'Approved' | 'Hidden';
};

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'admissions', label: 'Admissions', icon: GraduationCap },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'notices', label: 'Notices', icon: Megaphone },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
] satisfies Array<{ id: SectionId; label: string; icon: typeof LayoutDashboard }>;

const metrics = [
  { label: 'Total students', value: '412', change: '+18 this term', icon: Users, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { label: 'New enquiries', value: '36', change: '12 pending calls', icon: GraduationCap, color: 'bg-sky-50 text-sky-700 border-sky-100' },
  { label: 'Attendance', value: '94%', change: '+2.4% this week', icon: UserCheck, color: 'bg-violet-50 text-violet-700 border-violet-100' },
  { label: 'Fees collected', value: '82%', change: 'NPR 1.8M posted', icon: Wallet, color: 'bg-amber-50 text-amber-700 border-amber-100' },
];

const admissionSeed: AdmissionRow[] = [
  { id: 'ADM-1024', student: 'Aarav K.C.', guardian: 'Sanjita K.C.', grade: 'Grade 4', status: 'New', date: 'Jul 09', phone: '9800000001' },
  { id: 'ADM-1023', student: 'Pranavi Shrestha', guardian: 'Ramesh Shrestha', grade: 'Grade 1', status: 'Visit booked', date: 'Jul 08', phone: '9800000002' },
  { id: 'ADM-1022', student: 'Samyak Maharjan', guardian: 'Rekha Maharjan', grade: 'Grade 7', status: 'Assessment', date: 'Jul 07', phone: '9800000003' },
  { id: 'ADM-1021', student: 'Niva Tamang', guardian: 'Pasang Tamang', grade: 'Nursery', status: 'Admitted', date: 'Jul 06', phone: '9800000004' },
  { id: 'ADM-1020', student: 'Ishan Basnet', guardian: 'Mina Basnet', grade: 'Grade 3', status: 'Waitlist', date: 'Jul 05', phone: '9800000005' },
];

const messageRows = [
  { from: 'Sanjita K.C.', subject: 'Admission visit timing', tag: 'Admission', time: '09:40', unread: true },
  { from: 'Grade 5 Parent Group', subject: 'Transport route update', tag: 'Transport', time: '08:15', unread: true },
  { from: 'Science Department', subject: 'Lab material request', tag: 'Internal', time: 'Yesterday', unread: false },
  { from: 'Alumni Desk', subject: 'Annual day guest list', tag: 'Event', time: 'Jul 07', unread: false },
];

const noticeSeed: Notice[] = [
  { id: 'N-41', title: 'First terminal exam routine', audience: 'Parents', channel: 'Website', status: 'Published', date: 'Jul 09' },
  { id: 'N-40', title: 'Grade 8 project exhibition', audience: 'Students', channel: 'Notice board', status: 'Scheduled', date: 'Jul 12' },
  { id: 'N-39', title: 'Parent meeting for early years', audience: 'Parents', channel: 'SMS', status: 'Draft', date: 'Jul 15' },
];

const events = [
  { time: '08:30', title: 'Morning assembly', owner: 'Student council', color: 'border-emerald-200 bg-emerald-50' },
  { time: '10:45', title: 'Admission interaction', owner: 'Front office', color: 'border-sky-200 bg-sky-50' },
  { time: '13:20', title: 'Science practical', owner: 'Lower secondary', color: 'border-violet-200 bg-violet-50' },
  { time: '15:30', title: 'Faculty briefing', owner: 'Leadership', color: 'border-amber-200 bg-amber-50' },
];

const gallerySeed: GalleryItem[] = [
  { id: 'G-18', title: 'Assembly morning', image: IMAGES.hero1, status: 'Approved' },
  { id: 'G-17', title: 'Creative classwork', image: IMAGES.students1, status: 'Review' },
  { id: 'G-16', title: 'Sports practice', image: IMAGES.sports1, status: 'Review' },
  { id: 'G-15', title: 'Cultural preparation', image: IMAGES.cultural1, status: 'Hidden' },
];

const staffRows = [
  { name: 'School Leadership', role: 'Leadership Team', load: 'Operations', status: 'Active' },
  { name: 'Early Years Team', role: 'Foundation Educators', load: 'Nursery - UKG', status: 'Active' },
  { name: 'Primary Team', role: 'Class Teachers', load: 'Grade 1 - 5', status: 'Active' },
  { name: 'Secondary Team', role: 'Subject Educators', load: 'Grade 6 - 10', status: 'Active' },
  { name: 'Activities Team', role: 'Co-curricular Mentors', load: 'Clubs and events', status: 'Planning' },
];

const statusStyles: Record<string, string> = {
  New: 'bg-sky-50 text-sky-700 border-sky-200',
  'Visit booked': 'bg-violet-50 text-violet-700 border-violet-200',
  Assessment: 'bg-amber-50 text-amber-700 border-amber-200',
  Admitted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Waitlist: 'bg-slate-50 text-slate-700 border-slate-200',
  Draft: 'bg-slate-50 text-slate-700 border-slate-200',
  Scheduled: 'bg-violet-50 text-violet-700 border-violet-200',
  Published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Review: 'bg-amber-50 text-amber-700 border-amber-200',
  Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Hidden: 'bg-rose-50 text-rose-700 border-rose-200',
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Planning: 'bg-sky-50 text-sky-700 border-sky-200',
};

const schoolLogoSrc = import.meta.env.DEV ? '/schools/surachana/logo.jpg' : './schools/surachana/logo.jpg';

function Badge({ value }: { value: string }) {
  return (
    <span className={cn('inline-flex items-center border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em]', statusStyles[value] || statusStyles.New)}>
      {value}
    </span>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn('rounded-lg border border-navy-900/10 bg-white shadow-sm', className)}>{children}</section>;
}

function PanelHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-navy-900/10 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">{eyebrow}</p>
        <h2 className="mt-1 font-heading text-2xl leading-none text-navy-950">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function IconButton({
  children,
  onClick,
  variant = 'dark',
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'dark' | 'light';
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'inline-flex h-10 items-center gap-2 rounded px-4 text-xs font-bold uppercase tracking-[0.1em] transition-colors',
        variant === 'dark' ? 'bg-navy-950 text-white hover:bg-navy-800' : 'border border-navy-900/15 bg-white text-navy-950 hover:bg-cream-100',
      )}
    >
      {children}
    </button>
  );
}

export default function Admin() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [admissions, setAdmissions] = useState(admissionSeed);
  const [notices, setNotices] = useState(noticeSeed);
  const [gallery, setGallery] = useState(gallerySeed);
  const [taskChecks, setTaskChecks] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeAudience, setNoticeAudience] = useState('Parents');
  const [noticeChannel, setNoticeChannel] = useState('Website');

  const filteredAdmissions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return admissions;
    return admissions.filter((row) =>
      [row.student, row.guardian, row.grade, row.id, row.status].some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [admissions, query]);

  const activeLabel = navItems.find((item) => item.id === activeSection)?.label || 'Overview';

  const updateAdmissionStatus = (id: string, status: AdmissionStatus) => {
    setAdmissions((rows) => rows.map((row) => (row.id === id ? { ...row, status } : row)));
  };

  const publishNotice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = noticeTitle.trim();
    if (!title) return;
    setNotices((items) => [
      {
        id: `N-${42 + items.length}`,
        title,
        audience: noticeAudience,
        channel: noticeChannel,
        status: 'Published',
        date: 'Today',
      },
      ...items,
    ]);
    setNoticeTitle('');
  };

  const setGalleryStatus = (id: string, status: GalleryItem['status']) => {
    setGallery((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  return (
    <main className="min-h-screen bg-[#f5f7f4] text-navy-950">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-navy-900/10 bg-navy-950 text-white lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
            <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-white/15 bg-white">
              <img src={schoolLogoSrc} alt="" className="h-full w-full object-contain p-1" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">Admin</p>
              <h1 className="truncate font-heading text-xl leading-none">{SCHOOL.shortName}</h1>
            </div>
          </div>

          <nav className="grid gap-1 p-3 sm:grid-cols-2 lg:block">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    'flex h-11 w-full items-center justify-between rounded px-3 text-left text-sm font-semibold transition-colors',
                    isActive ? 'bg-white text-navy-950' : 'text-white/68 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {isActive && <ChevronRight className="h-4 w-4 text-gold-700" />}
                </button>
              );
            })}
          </nav>

          <div className="mx-3 mb-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-gold-300" />
              <div>
                <p className="text-sm font-bold">School office</p>
                <p className="text-xs text-white/50">{SCHOOL.phone}</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-navy-900/10 bg-[#f5f7f4]/95 backdrop-blur-xl">
            <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">{SCHOOL.name}</p>
                <h2 className="mt-1 font-heading text-3xl leading-none">{activeLabel}</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search records"
                    className="h-11 w-full rounded border border-navy-900/15 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 sm:w-64"
                  />
                </label>
                <IconButton>
                  <Bell className="h-4 w-4" />
                  Alerts
                </IconButton>
              </div>
            </div>
          </header>

          <div className="px-5 py-6 lg:px-8 lg:py-8">
            {activeSection === 'overview' && (
              <div className="grid gap-5">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <Panel key={metric.label} className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy-500">{metric.label}</p>
                            <p className="mt-4 font-heading text-4xl leading-none">{metric.value}</p>
                            <p className="mt-2 text-sm text-navy-500">{metric.change}</p>
                          </div>
                          <span className={cn('grid h-11 w-11 place-items-center rounded-lg border', metric.color)}>
                            <Icon className="h-5 w-5" />
                          </span>
                        </div>
                      </Panel>
                    );
                  })}
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
                  <Panel>
                    <PanelHeader
                      eyebrow="School pulse"
                      title="Weekly operations"
                      action={
                        <IconButton variant="light">
                          <FileText className="h-4 w-4" />
                          Report
                        </IconButton>
                      }
                    />
                    <div className="grid gap-5 p-5 lg:grid-cols-3">
                      {[
                        ['Attendance', '94%', 'h-[94%]', 'bg-emerald-500'],
                        ['Admission follow-up', '68%', 'h-[68%]', 'bg-sky-500'],
                        ['Notice reach', '88%', 'h-[88%]', 'bg-amber-500'],
                      ].map(([label, value, height, color]) => (
                        <div key={label} className="rounded-lg border border-navy-900/10 p-4">
                          <div className="flex h-40 items-end gap-4">
                            <div className="flex h-full w-14 items-end rounded bg-navy-50">
                              <div className={cn('w-full rounded', height, color)} />
                            </div>
                            <div>
                              <p className="font-heading text-4xl leading-none">{value}</p>
                              <p className="mt-2 text-sm text-navy-500">{label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <Panel>
                    <PanelHeader eyebrow="Today" title="Priority list" />
                    <div className="divide-y divide-navy-900/10">
                      {['Call new admission families', 'Approve gallery updates', 'Publish exam routine', 'Confirm faculty briefing'].map((task) => (
                        <label key={task} className="flex cursor-pointer items-center gap-3 p-4 text-sm">
                          <input
                            type="checkbox"
                            checked={taskChecks[task] || false}
                            onChange={(event) => setTaskChecks((checks) => ({ ...checks, [task]: event.target.checked }))}
                            className="h-4 w-4 rounded border-navy-300 text-gold-600"
                          />
                          <span className={cn(taskChecks[task] && 'text-navy-400 line-through')}>{task}</span>
                        </label>
                      ))}
                    </div>
                  </Panel>
                </div>
              </div>
            )}

            {activeSection === 'admissions' && (
              <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
                <Panel>
                  <PanelHeader
                    eyebrow="Admission desk"
                    title="Student enquiries"
                    action={
                      <IconButton>
                        <Plus className="h-4 w-4" />
                        New lead
                      </IconButton>
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[820px] text-left text-sm">
                      <thead className="bg-navy-50 text-xs uppercase tracking-[0.1em] text-navy-500">
                        <tr>
                          <th className="px-5 py-3">ID</th>
                          <th className="px-5 py-3">Student</th>
                          <th className="px-5 py-3">Guardian</th>
                          <th className="px-5 py-3">Grade</th>
                          <th className="px-5 py-3">Status</th>
                          <th className="px-5 py-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-900/10">
                        {filteredAdmissions.map((row) => (
                          <tr key={row.id} className="bg-white">
                            <td className="px-5 py-4 font-bold text-navy-500">{row.id}</td>
                            <td className="px-5 py-4">
                              <p className="font-semibold">{row.student}</p>
                              <p className="text-xs text-navy-400">{row.phone}</p>
                            </td>
                            <td className="px-5 py-4">{row.guardian}</td>
                            <td className="px-5 py-4">{row.grade}</td>
                            <td className="px-5 py-4">
                              <select
                                value={row.status}
                                onChange={(event) => updateAdmissionStatus(row.id, event.target.value as AdmissionStatus)}
                                className="h-9 rounded border border-navy-900/15 bg-white px-3 text-xs font-bold outline-none focus:border-gold-500"
                              >
                                {['New', 'Visit booked', 'Assessment', 'Admitted', 'Waitlist'].map((status) => (
                                  <option key={status}>{status}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-5 py-4 text-navy-500">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Panel>

                <Panel className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">Pipeline</p>
                  <h3 className="mt-1 font-heading text-2xl leading-none">Current status</h3>
                  <div className="mt-6 grid gap-3">
                    {['New', 'Visit booked', 'Assessment', 'Admitted', 'Waitlist'].map((status) => {
                      const count = admissions.filter((row) => row.status === status).length;
                      return (
                        <div key={status} className="flex items-center justify-between rounded border border-navy-900/10 p-3">
                          <Badge value={status} />
                          <span className="font-heading text-2xl">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </Panel>
              </div>
            )}

            {activeSection === 'messages' && (
              <Panel>
                <PanelHeader
                  eyebrow="Inbox"
                  title="Family and staff messages"
                  action={
                    <IconButton>
                      <Send className="h-4 w-4" />
                      Compose
                    </IconButton>
                  }
                />
                <div className="divide-y divide-navy-900/10">
                  {messageRows.map((message) => (
                    <article key={`${message.from}-${message.time}`} className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
                      <div className="flex items-start gap-4">
                        <span className={cn('mt-1 grid h-10 w-10 place-items-center rounded-lg', message.unread ? 'bg-gold-100 text-gold-800' : 'bg-navy-50 text-navy-500')}>
                          <MessageSquare className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold">{message.from}</h3>
                            {message.unread && <span className="h-2 w-2 rounded-full bg-gold-500" />}
                          </div>
                          <p className="mt-1 text-sm text-navy-600">{message.subject}</p>
                          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-navy-400">{message.tag}</p>
                        </div>
                      </div>
                      <p className="text-sm text-navy-400">{message.time}</p>
                    </article>
                  ))}
                </div>
              </Panel>
            )}

            {activeSection === 'notices' && (
              <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
                <Panel>
                  <PanelHeader eyebrow="Publish" title="New notice" />
                  <form onSubmit={publishNotice} className="grid gap-4 p-5">
                    <label className="grid gap-2 text-sm font-semibold">
                      Notice title
                      <input
                        value={noticeTitle}
                        onChange={(event) => setNoticeTitle(event.target.value)}
                        className="h-11 rounded border border-navy-900/15 px-3 text-sm font-normal outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                        placeholder="Exam routine"
                      />
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-semibold">
                        Audience
                        <select value={noticeAudience} onChange={(event) => setNoticeAudience(event.target.value)} className="h-11 rounded border border-navy-900/15 px-3 text-sm font-normal outline-none">
                          <option>Parents</option>
                          <option>Students</option>
                          <option>Staff</option>
                        </select>
                      </label>
                      <label className="grid gap-2 text-sm font-semibold">
                        Channel
                        <select value={noticeChannel} onChange={(event) => setNoticeChannel(event.target.value)} className="h-11 rounded border border-navy-900/15 px-3 text-sm font-normal outline-none">
                          <option>Website</option>
                          <option>SMS</option>
                          <option>Notice board</option>
                        </select>
                      </label>
                    </div>
                    <IconButton type="submit">
                      <Megaphone className="h-4 w-4" />
                      Publish
                    </IconButton>
                  </form>
                </Panel>

                <Panel>
                  <PanelHeader eyebrow="Notices" title="Recent updates" />
                  <div className="divide-y divide-navy-900/10">
                    {notices.map((notice) => (
                      <article key={notice.id} className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
                        <div>
                          <p className="text-xs font-bold text-navy-400">{notice.id}</p>
                          <h3 className="mt-1 font-semibold">{notice.title}</h3>
                          <p className="mt-1 text-sm text-navy-500">{notice.audience} - {notice.channel}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge value={notice.status} />
                          <span className="text-sm text-navy-400">{notice.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </Panel>
              </div>
            )}

            {activeSection === 'calendar' && (
              <Panel>
                <PanelHeader
                  eyebrow="Schedule"
                  title="Today at school"
                  action={
                    <IconButton>
                      <Plus className="h-4 w-4" />
                      Event
                    </IconButton>
                  }
                />
                <div className="grid gap-4 p-5 lg:grid-cols-2">
                  {events.map((event) => (
                    <article key={event.title} className={cn('rounded-lg border p-5', event.color)}>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-500">{event.time}</p>
                      <h3 className="mt-3 font-heading text-2xl leading-none">{event.title}</h3>
                      <p className="mt-2 text-sm text-navy-600">{event.owner}</p>
                    </article>
                  ))}
                </div>
              </Panel>
            )}

            {activeSection === 'gallery' && (
              <Panel>
                <PanelHeader
                  eyebrow="Gallery"
                  title="Photo review queue"
                  action={
                    <IconButton>
                      <Plus className="h-4 w-4" />
                      Upload
                    </IconButton>
                  }
                />
                <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
                  {gallery.map((item) => (
                    <article key={item.id} className="overflow-hidden rounded-lg border border-navy-900/10 bg-white">
                      <div className="aspect-[4/3] bg-navy-100">
                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="grid gap-4 p-4">
                        <div>
                          <p className="text-xs font-bold text-navy-400">{item.id}</p>
                          <h3 className="mt-1 font-semibold">{item.title}</h3>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <Badge value={item.status} />
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => setGalleryStatus(item.id, 'Approved')} className="grid h-9 w-9 place-items-center rounded border border-emerald-200 text-emerald-700 hover:bg-emerald-50" aria-label="Approve photo">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button type="button" onClick={() => setGalleryStatus(item.id, 'Hidden')} className="grid h-9 w-9 place-items-center rounded border border-rose-200 text-rose-700 hover:bg-rose-50" aria-label="Hide photo">
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </Panel>
            )}

            {activeSection === 'staff' && (
              <Panel>
                <PanelHeader
                  eyebrow="People"
                  title="Faculty and teams"
                  action={
                    <IconButton>
                      <Plus className="h-4 w-4" />
                      Staff
                    </IconButton>
                  }
                />
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-navy-50 text-xs uppercase tracking-[0.1em] text-navy-500">
                      <tr>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Role</th>
                        <th className="px-5 py-3">Assignment</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-900/10">
                      {staffRows.map((row) => (
                        <tr key={row.name}>
                          <td className="px-5 py-4 font-semibold">{row.name}</td>
                          <td className="px-5 py-4 text-navy-600">{row.role}</td>
                          <td className="px-5 py-4 text-navy-600">{row.load}</td>
                          <td className="px-5 py-4"><Badge value={row.status} /></td>
                          <td className="px-5 py-4">
                            <button type="button" className="inline-flex h-9 items-center gap-2 rounded border border-navy-900/15 px-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-cream-100">
                              <Pencil className="h-4 w-4" />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            )}

            {activeSection === 'settings' && (
              <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
                <Panel>
                  <PanelHeader eyebrow="School profile" title="Public information" />
                  <div className="grid gap-4 p-5 md:grid-cols-2">
                    {[
                      ['School name', SCHOOL.name],
                      ['Address', SCHOOL.address],
                      ['Phone', SCHOOL.phone],
                      ['Email', SCHOOL.email],
                    ].map(([label, value]) => (
                      <label key={label} className="grid gap-2 text-sm font-semibold">
                        {label}
                        <input defaultValue={value} className="h-11 rounded border border-navy-900/15 px-3 text-sm font-normal outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" />
                      </label>
                    ))}
                  </div>
                </Panel>

                <Panel className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">Access</p>
                  <h3 className="mt-1 font-heading text-2xl leading-none">Admin controls</h3>
                  <div className="mt-6 grid gap-3">
                    {[
                      ['Admissions', true, ClipboardList],
                      ['Notice publishing', true, Megaphone],
                      ['Gallery approval', true, Image],
                      ['Fee records', false, Wallet],
                    ].map(([label, enabled, Icon]) => {
                      const ControlIcon = Icon as typeof Activity;
                      return (
                        <div key={String(label)} className="flex items-center justify-between rounded border border-navy-900/10 p-3">
                          <span className="flex items-center gap-3 text-sm font-semibold">
                            <ControlIcon className="h-4 w-4 text-navy-500" />
                            {String(label)}
                          </span>
                          <span className={cn('h-6 w-11 rounded-full p-1', enabled ? 'bg-emerald-500' : 'bg-navy-200')}>
                            <span className={cn('block h-4 w-4 rounded-full bg-white transition-transform', enabled && 'translate-x-5')} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Panel>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
