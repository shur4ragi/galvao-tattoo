import { useReveal } from './hooks/useReveal.js';
import Intro from './components/Intro/index.jsx';
import FrameRails from './components/FrameRails/index.jsx';
import Header from './components/Header/index.jsx';
import Hero from './components/Hero/index.jsx';
import Marquee from './components/Marquee/index.jsx';
import Portfolio from './components/Portfolio/index.jsx';
import Quote from './components/Quote/index.jsx';
import Stories from './components/Stories/index.jsx';
import Process from './components/Process/index.jsx';
import Testimonials from './components/Testimonials/index.jsx';
import Mentoring from './components/Mentoring/index.jsx';
import Faq from './components/Faq/index.jsx';
import Contact from './components/Contact/index.jsx';
import Footer from './components/Footer/index.jsx';
import WhatsAppFloat from './components/WhatsAppFloat/index.jsx';

// Preto e branco, dentro da moldura lateral fixa: hero automático que termina apresentando o
// Yuri → portfólio em carrossel curvo → citação → histórias → passo a passo → mentorias
// → dúvidas → contato e rodapé.
export default function App() {
  useReveal();

  return (
    <>
      <Intro />
      <FrameRails />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Portfolio />
        <Quote />
        <Stories />
        <Process />
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
