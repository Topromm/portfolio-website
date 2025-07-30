import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function About() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = document.getElementById("check");
    if (check) check.checked = menuOpen;
  }, [menuOpen]);

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

  const lightModeFace = "/assets/aboutBirdsLight.png";
  const darkModeFace = "/assets/aboutBackgroundLight.png";
  const faceSrc = isDarkMode ? darkModeFace : lightModeFace;

  useEffect(() => {
    const check = document.getElementById("check");
    if (check) check.checked = menuOpen;
  }, [menuOpen]);


  return (
    <>
      <header>
        <nav>
          <ul className="navbar2">
            <li>
              <div
                className="mode-button"
                id="mode-button"
                onClick={() => {
                  const newMode = !isDarkMode;
                  setIsDarkMode(newMode);
                  localStorage.setItem("darkMode", newMode);
                  window.dispatchEvent(new CustomEvent("darkModeChanged", { detail: newMode }));
                }}
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
            </span>
          </ul>
        </nav>
      </header>

      <section className="about-container">
        <div className="about-images">
          <img src={faceSrc} alt="aboutImage1" className="about-image1"/>
        </div>
      </section>
    </>
  );
}

export default About;
