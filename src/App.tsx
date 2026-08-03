import "./styles/App.css";
import { useEffect, type MouseEvent } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import RouteTransition from './components/layout/RouteTransition';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admission from './pages/Admission';
import Gallery from './pages/Gallery';
import Faculty from './pages/Faculty';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { resetScrollImmediately } from './utils/scroll';
import { SCHOOL } from './data/schoolData';
import { useSchoolData } from './hooks/useSchoolData';
import PageHero from './components/ui/PageHero';
import { Link } from 'react-router-dom';

function getRouteMeta(pathname: string): { title: string; description: string } {
  const routeMeta: Record<string, { title: string; description: string }> = {
    '/': { title: SCHOOL.name, description: SCHOOL.seoDescription },
    '/about': { title: `About ${SCHOOL.shortName}`, description: SCHOOL.aboutSubtitle },
    '/academics': { title: `Academics | ${SCHOOL.shortName}`, description: `Explore the learning journey and academic programs at ${SCHOOL.name}.` },
    '/admission': { title: `Admissions | ${SCHOOL.shortName}`, description: `Learn about admission steps, eligibility, and how to contact ${SCHOOL.name}.` },
    '/gallery': { title: `Gallery | ${SCHOOL.shortName}`, description: `See school life, learning, activities, and community moments at ${SCHOOL.name}.` },
    '/faculty': { title: `Faculty | ${SCHOOL.shortName}`, description: `Meet the educators and support teams at ${SCHOOL.name}.` },
    '/contact': { title: `Contact | ${SCHOOL.shortName}`, description: `Contact ${SCHOOL.name} in ${SCHOOL.locationLine}.` },
    '/admin': { title: `Admin preview | ${SCHOOL.shortName}`, description: 'School administration interface preview.' },
  };
  return routeMeta[pathname] || { title: `Page not found | ${SCHOOL.shortName}`, description: SCHOOL.seoDescription };
}

function resetScrollBeforeNavigation(event: MouseEvent<HTMLDivElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = event.target as Element;
  const link = target.closest('a[href^="#/"]');
  if (!link) return;

  resetScrollImmediately();
}

function AppShell() {
  const location = useLocation();
  const adminEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_ADMIN === 'true';
  const isAdmin = location.pathname.startsWith('/admin') && adminEnabled;
  const dataVersion = useSchoolData();

  useEffect(() => {
    const isAdminRoute =
      location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#/admin');
    if (isAdminRoute) {
      window.location.replace('https://nivaksha.me/admin');
    }
  }, [location.pathname]);

  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[name="robots"]')?.setAttribute('content', isAdmin ? 'noindex, nofollow' : 'index, follow');
  }, [isAdmin, location.pathname, dataVersion]);

  return (
    <div className="app__div-001" onClickCapture={resetScrollBeforeNavigation}>
      {!isAdmin && <a className="app__skip-link" href="#main-content">Skip to main content</a>}
      {!isAdmin && <Navbar />}
      <div id="main-content" tabIndex={-1} className={isAdmin ? "app__div-002" : "app__div-003"}>
        <RouteTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={adminEnabled ? <Admin /> : <NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteTransition>
      </div>
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTopButton />}
    </div>
  );
}

function NotFound() {
  return (
    <main>
      <PageHero
        title="Page not found"
        subtitle="The page you were looking for may have moved or no longer exists."
        breadcrumb="Not found"
      />
      <section className="app__not-found">
        <p>Return to the homepage or use the main navigation to continue exploring the school.</p>
        <Link to="/" className="app__not-found-link">Return home</Link>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
