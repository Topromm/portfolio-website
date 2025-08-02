import { useNavigate, Link} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { asciiArts } from "./asciiArt";

function LandingPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const whatIDoRef = useRef(null);
  const [whatIDoVisible, setWhatIDoVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [asciiArtIdx, setAsciiArtIdx] = useState(0);

  useEffect(() => {
    const handler = () => setIsDarkMode(localStorage.getItem("darkMode") === "true");
    const customHandler = (e) => setIsDarkMode(e.detail);

    window.addEventListener("storage", handler);
    window.addEventListener("darkModeChanged", customHandler);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("darkModeChanged", customHandler);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!whatIDoRef.current) return;
      const rect = whatIDoRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setWhatIDoVisible(true);
      }

      // Check if scrolled to bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setAsciiArtIdx(prev => (prev + 1) % asciiArts.length);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lightModeFace = "/assets/headshotLight.png";
  const darkModeFace = "/assets/headshotDark.png";
  const faceSrc = isDarkMode ? darkModeFace : lightModeFace;

  const redirectToContactPage = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const check = document.getElementById("check");
    if (check) check.checked = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      const menu = document.querySelector('.menu.open');
      const hamburger = document.querySelector('.hamburger-menu');
      if (
        menu &&
        !menu.contains(e.target) &&
        hamburger &&
        !hamburger.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

 return (
   <>
    <header>
      <nav>
        <ul className="navbar">
          <div className="mode-button" id="mode-button">
            <img src="https://i.imgur.com/Li8FKFW.png" alt="Moon" className="icon" id="moon-icon"/>
          </div>
          <li className="home-button">
            <a href="/">Home</a>
          </li>
          <input
            type="checkbox"
            id="check"
            checked={menuOpen}
            onChange={e => setMenuOpen(e.target.checked)}
            style={{ display: "none" }}
          />
          <label
            htmlFor="check"
            className="hamburger-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <span className={`bar top${menuOpen ? " open" : ""}`}></span>
            <span className={`bar middle${menuOpen ? " open" : ""}`}></span>
            <span className={`bar bottom${menuOpen ? " open" : ""}`}></span>
          </label>
          <span className={`menu${menuOpen ? " open" : ""}`}>
            <li>
              <Link to="/About" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="/Services" onClick={() => setMenuOpen(false)}>Services</Link>
            </li>
            <li>
              <Link to="/Portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
            </li>
            <li>
              <Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
            <li>
                <Link to="/Lunabox" onClick={() => setMenuOpen(false)}>Lunabox</Link>
            </li>
          </span>
        </ul>
      </nav>
    </header>

    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-header">Topias Romppanen</h1>
        <p className="hero-paragraph">
          Full-Stack Developer
          <br/>
          3D Generalist
          <br/>
        </p>
        <a
          href="#"
          className={`cta-button sparkle-btn ${isDarkMode ? "dark-mode-button" : "light-mode-button"}`}
          onClick={e => {
            e.preventDefault();
            redirectToContactPage();
          }}
          style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: "0.5em" }}
        >
          {/* Sparkle SVGs */}
          <svg viewBox="0 0 96 96" fill="none"><path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#fff"/></svg>
          <svg viewBox="0 0 96 96" fill="none"><path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#fff"/></svg>
          <svg viewBox="0 0 96 96" fill="none"><path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#fff"/></svg>
          <svg viewBox="0 0 96 96" fill="none"><path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#fff"/></svg>
          <span>Contact me</span>
        </a>
      </div>
      {isDarkMode ? (
        <pre
          className="hero-face-ascii"
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            lineHeight: "14px",
            color: "#fff",
            background: "transparent",
            textAlign: "right",
            margin: "0 auto",
            display: "block",
            maxWidth: "100vw",
            overflow: "hidden",
            whiteSpace: "pre",
            userSelect: "none",
            pointerEvents: "auto",
            marginLeft: "38vw"
          }}
        >{asciiArts[asciiArtIdx]}</pre>
      ) : (
        <img src={faceSrc} alt="Headshot" className="hero-face"/>
      )}
    </section>

    <section className="page-content1">
      <div className="edgeblur"/>
    </section>

    <section className="page-content2"
      ref={whatIDoRef}
      style={{ 
        transition: "transform 0.7s cubic-bezier(.23,1.02,.53,.97), opacity 0.7s cubic-bezier(.23,1.02,.53,.97)", 
        transform: whatIDoVisible ? "none" : "translateY(80px) scale(0.97)", 
        opacity: whatIDoVisible ? 1 : 0 
      }}
    >
      <h1 className="what-i-do">
        <span>What I Do</span>
      </h1>
      <div className="what-i-do-content">
        <div className="what-i-do-list">
          {[
            {
              title: "Frontend",
              desc: "I specialize in frontend development using JavaScript, TypeScript, and React, creating engaging user interfaces by leveraging modern tools and writing clean, maintainable code."
            },
            {
              title: "Backend",
              desc: "I build scalable backend systems using Python, Flask, and Node.js. \nI implement RESTful APIs, handle data processing, and ensure seamless integration with the frontend through well-structured architecture."
            },
            {
              title: "3D Art & Design",
              desc: "I create 3D models and visual assets using Blender, and enjoy building interactive experiences with game engines like Unreal. My passion lies in combining code and creativity to bring digital worlds and ideas to life."
            },
            {
              title: "Photography",
              desc: "I enjoy capturing unique moments and perspectives, editing my photos with tools like Photoshop and Lightroom to bring out their full potential. I'm always exploring new techniques and creative approaches to visual storytelling."
            }
          ].map((item, idx) => (
            <WhatIDoItem
              key={item.title}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </section>
    <footer className="footer">
        © Copyright {new Date().getFullYear()} Topromm.
      </footer>
   </>
 );
}

function WhatIDoItem({ title, desc }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastPx = 0, lastPy = 0;
    let animFrame = null;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      let x = Math.min(Math.max(e.clientX, rect.left), rect.right - 1);
      let y = Math.min(Math.max(e.clientY, rect.top), rect.bottom - 1);
      const px = ((x - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const py = ((y - rect.top) / rect.height - 0.5) * 2; // -1 to 1
      lastPx = px;
      lastPy = py;
      if (!animFrame) {
        animFrame = requestAnimationFrame(() => {
          const maxTilt = 30;
          el.style.setProperty('--tilt', `rotateX(${-lastPy * maxTilt}deg) rotateY(${lastPx * maxTilt}deg)`);
          el.classList.add('is-tilting');
          animFrame = null;
        });
      }
    }
    function handleLeave() {
      el.style.setProperty('--tilt', 'rotateX(0deg) rotateY(0deg)');
      el.classList.remove('is-tilting');
    }
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('mouseenter', handleMove);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('mouseenter', handleMove);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div className="what-i-do-item" ref={ref}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

export default LandingPage;
