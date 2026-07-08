import type { MouseEvent } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import { resetScrollImmediately } from './utils/scroll';

function resetScrollBeforeNavigation(event: MouseEvent<HTMLDivElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = event.target as Element;
  const link = target.closest('a[href^="#/"]');
  if (!link) return;

  resetScrollImmediately();
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-cream-50" onClickCapture={resetScrollBeforeNavigation}>
        <Navbar />
        <div className="flex-1">
          <RouteTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </RouteTransition>
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}
