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
  Mail,
  Megaphone,
  MessageSquare,
  Pencil,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
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
  { label: 'Total students', value: '412', change: '+18 this term', icon: Users, color: "admin__variant-001" },
  { label: 'New enquiries', value: '36', change: '12 pending calls', icon: GraduationCap, color: "admin__variant-002" },
  { label: 'Attendance', value: '94%', change: '+2.4% this week', icon: UserCheck, color: "admin__variant-003" },
  { label: 'Fees collected', value: '82%', change: 'NPR 1.8M posted', icon: Wallet, color: "admin__variant-004" },
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
  { time: '08:30', title: 'Morning assembly', owner: 'Student council', color: "admin__variant-005" },
  { time: '10:45', title: 'Admission interaction', owner: 'Front office', color: "admin__variant-006" },
  { time: '13:20', title: 'Science practical', owner: 'Lower secondary', color: "admin__variant-007" },
  { time: '15:30', title: 'Faculty briefing', owner: 'Leadership', color: "admin__variant-008" },
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
  New: "admin__variant-009",
  'Visit booked': "admin__variant-010",
  Assessment: "admin__variant-011",
  Admitted: "admin__variant-012",
  Waitlist: "admin__variant-013",
  Draft: "admin__variant-014",
  Scheduled: "admin__variant-015",
  Published: "admin__variant-016",
  Review: "admin__variant-017",
  Approved: "admin__variant-018",
  Hidden: "admin__variant-019",
  Active: "admin__variant-020",
  Planning: "admin__variant-021",
};

const schoolLogoSrc = import.meta.env.DEV ? '/schools/surachana/school_logo.jpg' : './schools/surachana/school_logo.jpg';

function Badge({ value }: { value: string }) {
  return (
    <span className={cn("admin__span-022", statusStyles[value] || statusStyles.New)}>
      {value}
    </span>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("admin__section-023", className)}>{children}</section>;
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
    <div className="admin__div-024">
      <div>
        <p className="admin__p-025">{eyebrow}</p>
        <h2 className="admin__h2-026">{title}</h2>
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
        "admin__button-027",
        variant === 'dark' ? "admin__button-028" : "admin__button-029",
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
    <main className="admin__main-030">
      <div className="admin__div-031">
        <aside className="admin__aside-032">
          <div className="admin__div-033">
            <div className="admin__div-034">
              <img src={schoolLogoSrc} alt="" className="admin__img-035" />
            </div>
            <div className="admin__div-036">
              <p className="admin__p-037">Admin</p>
              <h1 className="admin__h1-038">{SCHOOL.shortName}</h1>
            </div>
          </div>

          <nav className="admin__nav-039">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "admin__button-040",
                    isActive ? "admin__button-041" : "admin__button-042",
                  )}
                >
                  <span className="admin__span-043">
                    <Icon className="admin__icon-044" />
                    {item.label}
                  </span>
                  {isActive && <ChevronRight className="admin__chevron-right-045" />}
                </button>
              );
            })}
          </nav>

          <div className="admin__div-046">
            <div className="admin__div-047">
              <ShieldCheck className="admin__shield-check-048" />
              <div>
                <p className="admin__p-049">School office</p>
                <p className="admin__p-050">{SCHOOL.phone}</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="admin__div-051">
          <header className="admin__header-052">
            <div className="admin__div-053">
              <div>
                <p className="admin__p-054">{SCHOOL.name}</p>
                <h2 className="admin__h2-055">{activeLabel}</h2>
              </div>
              <div className="admin__div-056">
                <label className="admin__label-057">
                  <Search className="admin__search-058" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search records"
                    className="admin__input-059"
                  />
                </label>
                <IconButton>
                  <Bell className="admin__bell-060" />
                  Alerts
                </IconButton>
              </div>
            </div>
          </header>

          <div className="admin__div-061">
            {activeSection === 'overview' && (
              <div className="admin__div-062">
                <div className="admin__div-063">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <Panel key={metric.label} className="admin__panel-064">
                        <div className="admin__div-065">
                          <div>
                            <p className="admin__p-066">{metric.label}</p>
                            <p className="admin__p-067">{metric.value}</p>
                            <p className="admin__p-068">{metric.change}</p>
                          </div>
                          <span className={cn("admin__span-069", metric.color)}>
                            <Icon className="admin__icon-070" />
                          </span>
                        </div>
                      </Panel>
                    );
                  })}
                </div>

                <div className="admin__div-071">
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
                    <div className="admin__div-072">
                      {[
                        ['Attendance', '94%', "admin__variant-073", "admin__variant-074"],
                        ['Admission follow-up', '68%', "admin__variant-075", "admin__variant-076"],
                        ['Notice reach', '88%', "admin__variant-077", "admin__variant-078"],
                      ].map(([label, value, height, color]) => (
                        <div key={label} className="admin__div-079">
                          <div className="admin__div-080">
                            <div className="admin__div-081">
                              <div className={cn("admin__div-082", height, color)} />
                            </div>
                            <div>
                              <p className="admin__p-083">{value}</p>
                              <p className="admin__p-084">{label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <Panel>
                    <PanelHeader eyebrow="Today" title="Priority list" />
                    <div className="admin__div-085">
                      {['Call new admission families', 'Approve gallery updates', 'Publish exam routine', 'Confirm faculty briefing'].map((task) => (
                        <label key={task} className="admin__label-086">
                          <input
                            type="checkbox"
                            checked={taskChecks[task] || false}
                            onChange={(event) => setTaskChecks((checks) => ({ ...checks, [task]: event.target.checked }))}
                            className="admin__input-087"
                          />
                          <span className={cn(taskChecks[task] && "admin__span-088")}>{task}</span>
                        </label>
                      ))}
                    </div>
                  </Panel>
                </div>
              </div>
            )}

            {activeSection === 'admissions' && (
              <div className="admin__div-089">
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
                  <div className="admin__div-090">
                    <table className="admin__table-091">
                      <thead className="admin__thead-092">
                        <tr>
                          <th className="admin__th-093">ID</th>
                          <th className="admin__th-094">Student</th>
                          <th className="admin__th-095">Guardian</th>
                          <th className="admin__th-096">Grade</th>
                          <th className="admin__th-097">Status</th>
                          <th className="admin__th-098">Date</th>
                        </tr>
                      </thead>
                      <tbody className="admin__tbody-099">
                        {filteredAdmissions.map((row) => (
                          <tr key={row.id} className="admin__tr-100">
                            <td className="admin__td-101">{row.id}</td>
                            <td className="admin__td-102">
                              <p className="admin__p-103">{row.student}</p>
                              <p className="admin__p-104">{row.phone}</p>
                            </td>
                            <td className="admin__td-105">{row.guardian}</td>
                            <td className="admin__td-106">{row.grade}</td>
                            <td className="admin__td-107">
                              <select
                                value={row.status}
                                onChange={(event) => updateAdmissionStatus(row.id, event.target.value as AdmissionStatus)}
                                className="admin__select-108"
                              >
                                {['New', 'Visit booked', 'Assessment', 'Admitted', 'Waitlist'].map((status) => (
                                  <option key={status}>{status}</option>
                                ))}
                              </select>
                            </td>
                            <td className="admin__td-109">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Panel>

                <Panel className="admin__panel-110">
                  <p className="admin__p-111">Pipeline</p>
                  <h3 className="admin__h3-112">Current status</h3>
                  <div className="admin__div-113">
                    {['New', 'Visit booked', 'Assessment', 'Admitted', 'Waitlist'].map((status) => {
                      const count = admissions.filter((row) => row.status === status).length;
                      return (
                        <div key={status} className="admin__div-114">
                          <Badge value={status} />
                          <span className="admin__span-115">{count}</span>
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
                <div className="admin__div-116">
                  {messageRows.map((message) => (
                    <article key={`${message.from}-${message.time}`} className="admin__article-117">
                      <div className="admin__div-118">
                        <span className={cn("admin__span-119", message.unread ? "admin__span-120" : "admin__span-121")}>
                          <MessageSquare className="admin__message-square-122" />
                        </span>
                        <div>
                          <div className="admin__div-123">
                            <h3 className="admin__h3-124">{message.from}</h3>
                            {message.unread && <span className="admin__span-125" />}
                          </div>
                          <p className="admin__p-126">{message.subject}</p>
                          <p className="admin__p-127">{message.tag}</p>
                        </div>
                      </div>
                      <p className="admin__p-128">{message.time}</p>
                    </article>
                  ))}
                </div>
              </Panel>
            )}

            {activeSection === 'notices' && (
              <div className="admin__div-129">
                <Panel>
                  <PanelHeader eyebrow="Publish" title="New notice" />
                  <form onSubmit={publishNotice} className="admin__form-130">
                    <label className="admin__label-131">
                      Notice title
                      <input
                        value={noticeTitle}
                        onChange={(event) => setNoticeTitle(event.target.value)}
                        className="admin__input-132"
                        placeholder="Exam routine"
                      />
                    </label>
                    <div className="admin__div-133">
                      <label className="admin__label-134">
                        Audience
                        <select value={noticeAudience} onChange={(event) => setNoticeAudience(event.target.value)} className="admin__select-135">
                          <option>Parents</option>
                          <option>Students</option>
                          <option>Staff</option>
                        </select>
                      </label>
                      <label className="admin__label-136">
                        Channel
                        <select value={noticeChannel} onChange={(event) => setNoticeChannel(event.target.value)} className="admin__select-137">
                          <option>Website</option>
                          <option>SMS</option>
                          <option>Notice board</option>
                        </select>
                      </label>
                    </div>
                    <IconButton type="submit">
                      <Megaphone className="admin__megaphone-138" />
                      Publish
                    </IconButton>
                  </form>
                </Panel>

                <Panel>
                  <PanelHeader eyebrow="Notices" title="Recent updates" />
                  <div className="admin__div-139">
                    {notices.map((notice) => (
                      <article key={notice.id} className="admin__article-140">
                        <div>
                          <p className="admin__p-141">{notice.id}</p>
                          <h3 className="admin__h3-142">{notice.title}</h3>
                          <p className="admin__p-143">{notice.audience} - {notice.channel}</p>
                        </div>
                        <div className="admin__div-144">
                          <Badge value={notice.status} />
                          <span className="admin__span-145">{notice.date}</span>
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
                <div className="admin__div-146">
                  {events.map((event) => (
                    <article key={event.title} className={cn("admin__article-147", event.color)}>
                      <p className="admin__p-148">{event.time}</p>
                      <h3 className="admin__h3-149">{event.title}</h3>
                      <p className="admin__p-150">{event.owner}</p>
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
                <div className="admin__div-151">
                  {gallery.map((item) => (
                    <article key={item.id} className="admin__article-152">
                      <div className="admin__div-153">
                        <img src={item.image} alt="" className="admin__img-154" />
                      </div>
                      <div className="admin__div-155">
                        <div>
                          <p className="admin__p-156">{item.id}</p>
                          <h3 className="admin__h3-157">{item.title}</h3>
                        </div>
                        <div className="admin__div-158">
                          <Badge value={item.status} />
                          <div className="admin__div-159">
                            <button type="button" onClick={() => setGalleryStatus(item.id, 'Approved')} className="admin__button-160" aria-label="Approve photo">
                              <CheckCircle className="admin__check-circle-161" />
                            </button>
                            <button type="button" onClick={() => setGalleryStatus(item.id, 'Hidden')} className="admin__button-162" aria-label="Hide photo">
                              <XCircle className="admin__xcircle-163" />
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
                <div className="admin__div-164">
                  <table className="admin__table-165">
                    <thead className="admin__thead-166">
                      <tr>
                        <th className="admin__th-167">Name</th>
                        <th className="admin__th-168">Role</th>
                        <th className="admin__th-169">Assignment</th>
                        <th className="admin__th-170">Status</th>
                        <th className="admin__th-171">Action</th>
                      </tr>
                    </thead>
                    <tbody className="admin__tbody-172">
                      {staffRows.map((row) => (
                        <tr key={row.name}>
                          <td className="admin__td-173">{row.name}</td>
                          <td className="admin__td-174">{row.role}</td>
                          <td className="admin__td-175">{row.load}</td>
                          <td className="admin__td-176"><Badge value={row.status} /></td>
                          <td className="admin__td-177">
                            <button type="button" className="admin__button-178">
                              <Pencil className="admin__pencil-179" />
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
              <div className="admin__div-180">
                <Panel>
                  <PanelHeader eyebrow="School profile" title="Public information" />
                  <div className="admin__div-181">
                    {[
                      ['School name', SCHOOL.name],
                      ['Address', SCHOOL.address],
                      ['Phone', SCHOOL.phone],
                      ['Email', SCHOOL.email],
                    ].map(([label, value]) => (
                      <label key={label} className="admin__label-182">
                        {label}
                        <input defaultValue={value} className="admin__input-183" />
                      </label>
                    ))}
                  </div>
                </Panel>

                <Panel className="admin__panel-184">
                  <p className="admin__p-185">Access</p>
                  <h3 className="admin__h3-186">Admin controls</h3>
                  <div className="admin__div-187">
                    {[
                      ['Admissions', true, ClipboardList],
                      ['Notice publishing', true, Megaphone],
                      ['Gallery approval', true, Image],
                      ['Fee records', false, Wallet],
                    ].map(([label, enabled, Icon]) => {
                      const ControlIcon = Icon as typeof Activity;
                      return (
                        <div key={String(label)} className="admin__div-188">
                          <span className="admin__span-189">
                            <ControlIcon className="admin__control-icon-190" />
                            {String(label)}
                          </span>
                          <span className={cn("admin__span-191", enabled ? "admin__span-192" : "admin__span-193")}>
                            <span className={cn("admin__span-194", enabled && "admin__span-195")} />
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
