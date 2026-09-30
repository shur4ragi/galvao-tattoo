import { useCallback, useState } from 'react';
import { portfolio } from '../../data/site.js';
import { ArrowIcon } from '../ui/icons.jsx';
import Mark from '../ui/Mark.jsx';
import Carousel from './Carousel.jsx';
import GalleryModal from './GalleryModal.jsx';
import Lightbox from './Lightbox.jsx';
import styles from './styles.module.css';

// Trabalhos: carrossel curvo na página e todos os trabalhos em um modal.
export default function Portfolio() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [photo, setPhoto] = useState(null); // { items, index }

  const openPhoto = useCallback((items, index) => setPhoto({ items, index }), []);
  const closeGallery = useCallback(() => setGalleryOpen(false), []);

  return (
    <section id="portfolio" className={styles.section}>
      <div className="container">
        <div className={styles.bar} data-reveal>
          <Mark />
          <span>/ Portfólio</span>
          <span className={styles.index}>01</span>
        </div>
        <h2 className={`wide ${styles.title}`} data-reveal>
          <b>Trabalhos</b> recentes
        </h2>
      </div>

      <div data-reveal style={{ '--delay': '0.1s' }}>
        <Carousel items={portfolio} onOpen={(i) => openPhoto(portfolio, i)} />
      </div>

      <div className={`container ${styles.footer}`} data-reveal>
        <p>
          {portfolio.length} trabalhos · <span>arraste ou toque para ampliar</span>
        </p>
        <button type="button" className="btn btn--light" onClick={() => setGalleryOpen(true)}>
          Ver todos os trabalhos
          <ArrowIcon />
        </button>
      </div>

      {galleryOpen && (
        <GalleryModal onClose={closeGallery} onOpenPhoto={openPhoto} blockEscape={photo !== null} />
      )}
      {photo && (
        <Lightbox
          items={photo.items}
          index={photo.index}
          onChange={(index) => setPhoto((p) => ({ ...p, index }))}
          onClose={() => setPhoto(null)}
        />
      )}
    </section>
  );
}
