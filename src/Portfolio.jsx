import { useState, useEffect, useRef } from 'react';

function Portfolio() {
  const [view, setView] = useState('categories');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    const customHandler = (e) => setIsDarkMode(e.detail);
    window.addEventListener('storage', handler);
    window.addEventListener('darkModeChanged', customHandler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('darkModeChanged', customHandler);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const photoPlaceholders = [
    '/assets/photography/1.jpg',
    '/assets/photography/2.jpg',
    '/assets/photography/3.jpg',
    '/assets/photography/4.jpg',
    '/assets/photography/5.jpg',
    '/assets/photography/6.jpg',
    '/assets/photography/7.jpg',
    '/assets/photography/8.jpg',
    '/assets/photography/9.jpg',
    '/assets/photography/10.jpg',
    '/assets/photography/11.jpg',
    '/assets/photography/12.jpg',
    '/assets/photography/13.jpg',
    '/assets/photography/14.jpg',
    '/assets/photography/15.jpg',
    '/assets/photography/16.jpg',
    '/assets/photography/17.jpg',
    '/assets/photography/18.jpg',
    '/assets/photography/19.jpg',
    '/assets/photography/20.jpg',
    '/assets/photography/21.jpg',
    '/assets/photography/22.jpg',
    '/assets/photography/23.jpg',
    '/assets/photography/24.jpg',
    '/assets/photography/25.jpg',
    '/assets/photography/26.jpg',
    '/assets/photography/27.jpg',
    '/assets/photography/28.jpg',
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const [hoveredIdx, setHoveredIdx] = useState(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [minSpinnerTimeDone, setMinSpinnerTimeDone] = useState(false);

  useEffect(() => {
    if (view === 'photography') {
      setImagesLoaded(false);
      setMinSpinnerTimeDone(false);
      const timer = setTimeout(() => setMinSpinnerTimeDone(true), 300);
      return () => clearTimeout(timer);
    }
  }, [view]);

  useEffect(() => {
    if (view !== 'photography') return;
    let loaded = 0;
    const imgs = [];
    photoPlaceholders.forEach((src) => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === photoPlaceholders.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
      imgs.push(img);
    });
  }, [view, photoPlaceholders]);

  return (
    <>
      <style>{`
        .photo-square {
          width: 220px;
          aspect-ratio: 1/1;
          overflow: hidden;
          border-radius: 18px;
          box-shadow: 0 2px 12px #0002;
          background: #222;
          cursor: pointer;
          position: relative;
          transition: box-shadow 0.22s cubic-bezier(.23,1.02,.53,.97), transform 0.22s cubic-bezier(.23,1.02,.53,.97);
          will-change: transform, box-shadow;
        }
        .photo-square.pop {
          transform: translateY(-8px) scale(1.05); /* reduced pop effect */
          box-shadow: 0 8px 24px 0 #0005, 0 2px 12px #0002;
          z-index: 2;
        }
        .spinner {
          width: 48px;
          height: 48px;
          border: 6px solid #bbb;
          border-top: 6px solid #0077cc;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <header>
        <nav>
          <ul className="navbar">
            <div className="mode-button" id="mode-button" onClick={() => {
              const newMode = !isDarkMode;
              setIsDarkMode(newMode);
              localStorage.setItem('darkMode', newMode);
              window.dispatchEvent(new CustomEvent('darkModeChanged', { detail: newMode }));
            }}>
              <img src={isDarkMode ? 'https://i.imgur.com/C0R5Nns.png' : 'https://i.imgur.com/Li8FKFW.png'} alt={isDarkMode ? 'Sun' : 'Moon'} className="icon" id={isDarkMode ? 'sun-icon' : 'moon-icon'} />
            </div>
            <li className="home-button">
              <a href="/">Home</a>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
        {view === 'categories' && (
          <div style={{ width: '100%', maxWidth: 900, display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                flex: 1,
                minWidth: '220px',
                minHeight: '180px',
                background: isDarkMode ? '#23272e' : '#f3f3f3',
                border: '2px solid #bbb',
                borderRadius: '18px',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: isDarkMode ? '#fff' : '#222',
                boxShadow: '0 2px 12px #0001',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onClick={() => setView('photography')}
            >
              Photography
            </button>
            <button
              style={{
                flex: 1,
                minWidth: '220px',
                minHeight: '180px',
                background: isDarkMode ? '#23272e' : '#f3f3f3',
                border: '2px solid #bbb',
                borderRadius: '18px',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#aaa',
                boxShadow: '0 2px 12px #0001',
                cursor: 'not-allowed',
                opacity: 0.6,
              }}
              disabled
            >
              Programming
            </button>
            <button
              style={{
                flex: 1,
                minWidth: '220px',
                minHeight: '180px',
                background: isDarkMode ? '#23272e' : '#f3f3f3',
                border: '2px solid #bbb',
                borderRadius: '18px',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#aaa',
                boxShadow: '0 2px 12px #0001',
                cursor: 'not-allowed',
                opacity: 0.6,
              }}
              disabled
            >
              3D Art
            </button>
          </div>
        )}

        {view === 'photography' && (
          <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 500 }}>
            <button
              style={{
                alignSelf: 'flex-start',
                marginBottom: '24px',
                background: 'none',
                border: 'none',
                color: '#0077cc',
                fontSize: '1.1rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
              }}
              onClick={() => setView('categories')}
            >
              ← Back to categories
            </button>
            <div
              style={{
                display: (imagesLoaded && minSpinnerTimeDone) ? 'grid' : 'none',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '32px',
                width: '100%',
                justifyItems: 'center',
              }}
            >
              {photoPlaceholders.map((src, i) => (
                <div key={src} style={{ width: '100%', maxWidth: 320, display: 'flex', justifyContent: 'center' }}>
                  <div
                    className={"photo-square" + (hoveredIdx === i ? " pop" : "")}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => { setModalImg(src); setModalOpen(true); }}
                  >
                    <img
                      src={src}
                      alt={`Photography ${i+1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: 18,
                        display: 'block',
                        transition: 'transform 0.2s',
                      }}
                      onLoad={e => {
                        if (i === photoPlaceholders.length - 1) {
                          setTimeout(() => setImagesLoaded(true), 50);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {!(imagesLoaded && minSpinnerTimeDone) && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, width: '100%' }}>
                <div className="spinner" style={{ margin: '48px 0' }}></div>
                <span style={{ color: '#888', fontSize: '1.1rem', marginTop: 12 }}>Loading photos…</span>
              </div>
            )}
          </div>
        )}

        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
              cursor: 'zoom-out',
            }}
            onClick={() => setModalOpen(false)}
          >
            <img
              src={modalImg}
              alt="Big view"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: 18,
                boxShadow: '0 8px 32px #000a',
                background: '#222',
                cursor: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            />
            {/* Close X icon */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'fixed',
                top: 32,
                right: 40,
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                borderRadius: '50%',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10000,
              }}
              aria-label="Close big view"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="14" fill="#222"/>
                <path d="M9 9L19 19M19 9L9 19" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Portfolio;



