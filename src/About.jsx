import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function About() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [ufoActive, setUfoActive] = useState(false);
  const [ufoAnimId, setUfoAnimId] = useState(0);
  const ufoTimeoutRef = useRef();
  const ufoIntervalRef = useRef();
  
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      const menu = document.querySelector('.menu.open');
      const hamburger = document.querySelector('.hamburger-menu');
      const modeButton = document.getElementById("mode-button");
      if (modeButton && modeButton.contains(e.target)) {
        return;
      }
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

  useEffect(() => {
    const check = document.getElementById("check");
    if (check) check.checked = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const handler = () => setIsDarkMode(localStorage.getItem("darkMode") === "true");
    const customHandler = (e) => setIsDarkMode(e.detail);

    window.addEventListener("storage", handler);
    window.addEventListener("darkModeChanged", customHandler);

    const modeButton = document.getElementById("mode-button");
    if (modeButton) {
      modeButton.innerHTML = isDarkMode
        ? '<img src="https://i.imgur.com/C0R5Nns.png" alt="Sun" class="icon" id="sun-icon">'
        : '<img src="https://i.imgur.com/Li8FKFW.png" alt="Moon" class="icon" id="moon-icon">';
      modeButton.onclick = null;
      modeButton.onclick = () => {
        const newMode = !isDarkMode;
        localStorage.setItem("darkMode", newMode);
        setIsDarkMode(newMode);
        window.dispatchEvent(new CustomEvent("darkModeChanged", { detail: newMode }));
        document.body.classList.toggle("dark-mode", newMode);
        document.body.classList.toggle("light-mode", !newMode);
        setMenuOpen(false);
      };
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.body.classList.toggle("light-mode", !isDarkMode);
    }

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("darkModeChanged", customHandler);
    };
  }, [isDarkMode, menuOpen, window.location.pathname]);

  const lightModeImages = [
    "/assets/aboutBackgroundLight.png",
    "/assets/aboutBirdsLight.png",
    "/assets/aboutMountains1Light.png",
    "/assets/aboutMountains2Light.png",
    "/assets/aboutTreelineLight.png",
  ];

  const darkModeImages = [
    "/assets/aboutStarsDark.png",
    "/assets/aboutMoonDark.png",
    "/assets/aboutUFODark.png",
    "/assets/aboutMountains1Dark.png",
    "/assets/aboutMountains2Dark.png",
    "/assets/aboutTreelineDark.png",
  ];

  const imagesToShow = isDarkMode ? darkModeImages : lightModeImages;

  useEffect(() => {
    const check = document.getElementById("check");
    if (check) check.checked = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.add("about-page");
    const prevBodyOverflowX = document.body.style.overflowX;
    const prevHtmlOverflowX = document.documentElement.style.overflowX;
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.classList.remove("about-page");
      document.body.style.overflowX = prevBodyOverflowX;
      document.documentElement.style.overflowX = prevHtmlOverflowX;
    };
  }, []);

  useEffect(() => {
    if (ufoTimeoutRef.current) clearTimeout(ufoTimeoutRef.current);
    if (ufoIntervalRef.current) clearInterval(ufoIntervalRef.current);

    if (!isDarkMode) {
      setUfoActive(false);
      return;
    }

    const triggerUfo = () => {
      setUfoActive(true);
      setUfoAnimId(id => id + 1);
      ufoTimeoutRef.current = setTimeout(() => setUfoActive(false), 3000);
    };

    triggerUfo();

    ufoIntervalRef.current = setInterval(triggerUfo, 60000);

    return () => {
      if (ufoTimeoutRef.current) clearTimeout(ufoTimeoutRef.current);
      if (ufoIntervalRef.current) clearInterval(ufoIntervalRef.current);
    };
  }, [isDarkMode]);

  return (
    <>
      <div className="about-container"/>
      {isDarkMode && (
        <img
          src="/assets/aboutStarsDark2.png"
          alt="Stars Overlay"
          style={{
            position: "absolute",
            top: -80,
            left: 0,
            width: "100vw",
            height: "140px",
            objectFit: "cover",
            zIndex: 2000,
            pointerEvents: "none",
            userSelect: "none"
          }}
        />
      )}
      <style>
        {`
        @keyframes ufo-fly-once {
          0% { left: -120px; opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100vw; opacity: 0; }
        }
        .about-ufo {
          position: absolute !important;
          width: 80px !important;
          height: auto !important;
          top: 60px !important;
          z-index: 2;
          pointer-events: none;
          user-select: none;
          left: -120px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .about-ufo.active {
          animation: ufo-fly-once 3s linear 0s 1;
          opacity: 1 !important;
        }
        `}
      </style>
      <header>
        <nav>
          <ul className="navbar2">
            <li>
              <div
                className="mode-button"
                id="mode-button"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={isDarkMode
                    ? "https://i.imgur.com/C0R5Nns.png"
                    : "https://i.imgur.com/Li8FKFW.png"}
                  alt={isDarkMode ? "Sun" : "Moon"}
                  className="icon"
                  id={isDarkMode ? "sun-icon" : "moon-icon"}
                />
              </div>
            </li>
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
                <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              </li>
              <li>
                <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
              </li>
              <li>
                <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              </li>
              <li>
                <Link to="/lunabox" onClick={() => setMenuOpen(false)}>Lunabox</Link>
              </li>
            </span>
          </ul>
        </nav>
      </header>
      <div className="about-images">
        {imagesToShow.map((src, idx) => {
          if (isDarkMode && src === "/assets/aboutUFODark.png") {
            return (
              <img
                src={src}
                alt="aboutUFO"
                className={`about-image about-ufo${ufoActive ? " active" : ""}`}
                key={`ufo-${ufoAnimId}`}
                style={{ }}
              />
            );
          }
          return (
            <img
              src={src}
              alt={`aboutImage${idx + 1}`}
              className={`about-image about-image${idx + 1}`}
              key={src}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          );
        })}
      <h1 style={{
        fontFamily: "Book Antiqua",
        width: "140%",
        textAlign: "center",
        marginTop: "200px",
        marginBottom: "24px",
        fontSize: "2.5rem",
        fontWeight: 800,
        color: "#fff"
      }}>
        Nothing here, yet...
      </h1>
      </div>
      <footer
        className="footer"
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100vw",
          background: isDarkMode ? "#010f35" : "#243023",
          color:  isDarkMode ? "#13265cff" : "#3f523dff",
          textAlign: "right",
          padding: "16px 16px",
          fontSize: "1rem",
          letterSpacing: "1px",
        }}
      >
        © Copyright {new Date().getFullYear()} Topromm.
      </footer>
    </>
  );
}

export default About;
