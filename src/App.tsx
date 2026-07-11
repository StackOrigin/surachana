import "./styles/App.css";
import type { MouseEvent } from 'react';
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

function resetScrollBeforeNavigation(event: MouseEvent<HTMLDivElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = event.target as Element;
  const link = target.closest('a[href^="#/"]');
  if (!link) return;

  resetScrollImmediately();
}

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-cream-50" onClickCapture={resetScrollBeforeNavigation}>
      {!isAdmin && <Navbar />}
      <div className={isAdmin ? 'flex-1 bg-[#f5f7f4]' : 'flex-1'}>
        <RouteTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </RouteTransition>
      </div>
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTopButton />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
