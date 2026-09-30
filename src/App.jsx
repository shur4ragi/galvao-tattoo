import { useReveal } from './hooks/useReveal.js';
import Intro from './components/Intro/index.jsx';
import Header from './components/Header/index.jsx';
import Hero from './components/Hero/index.jsx';
import Marquee from './components/Marquee/index.jsx';
import Specialties from './components/Specialties/index.jsx';
import Portfolio from './components/Portfolio/index.jsx';
import Stories from './components/Stories/index.jsx';
import Process from './components/Process/index.jsx';
import About from './components/About/index.jsx';
import Testimonials from './components/Testimonials/index.jsx';
import Mentoring from './components/Mentoring/index.jsx';
import Faq from './components/Faq/index.jsx';
import Contact from './components/Contact/index.jsx';
import Footer from './components/Footer/index.jsx';
import WhatsAppFloat from './components/WhatsAppFloat/index.jsx';

export default function App() {
  useReveal();

  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Specialties />
        <Portfolio />
        <Stories />
        <Process />
        <About />
        <Testimonials />
        <Mentoring />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
