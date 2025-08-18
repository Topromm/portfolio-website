import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

function contact() {
  const [captchaToken, setCaptchaToken] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  useEffect(() => {
    const check = document.getElementById("check");
    if (check) check.checked = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const handler = () => setIsDarkMode(localStorage.getItem("darkMode") === "true");
    const customHandler = (e) => setIsDarkMode(e.detail);
    window.addEventListener("storage", handler);
    window.addEventListener("darkModeChanged", customHandler);
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("darkModeChanged", customHandler);
    };
  }, [isDarkMode]);

  return (
    <>
      <header>
        <nav>
          <ul className="navbar">
            <li>
              <div
                className="mode-button"
                id="mode-button"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const newMode = !isDarkMode;
                  localStorage.setItem("darkMode", newMode);
                  setIsDarkMode(newMode);
                  window.dispatchEvent(new CustomEvent("darkModeChanged", { detail: newMode }));
                }}
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
              <li>
                <Link to="/Lunabox" onClick={() => setMenuOpen(false)}>Lunabox</Link>
              </li>
            </span>
          </ul>
        </nav>
      </header>


      <main style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', position: 'relative'}}>
        <form
          ref={formRef}
          action="https://api.web3forms.com/submit"
          method="POST"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative'}}
          onSubmit={async (e) => {
            e.preventDefault();
            if (!captchaToken) {
              alert("Please complete the captcha.");
              return;
            }
            const form = formRef.current;
            const formData = new FormData(form);
            formData.append("h-captcha-response", captchaToken);
            try {
              const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
              });
              if (response.ok) {
                setShowPopup(true);
                setTimeout(() => {
                  form.reset();
                  setCaptchaToken("");
                  const textarea = form.querySelector('textarea[name="message"]');
                  if (textarea) textarea.style.height = '';
                }, 100);
              } else {
                alert("There was an error sending your message. Please try again.");
              }
            } catch {
              alert("There was an error sending your message. Please try again.");
            }
          }}
        >
          <input type="hidden" name="access_key" value="76a6349d-92e2-4f97-a8c7-dc48d16bffd6"/>
          <input type="hidden" name="subject" value="New contact from your website"></input>
          <input type="hidden" name="from_name" value="topiasromppanen.com"></input>

          <input
            type="text"
            name="name"
            placeholder="YOUR NAME"
            required
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s cubic-bezier(.23,1.02,.53,.97), transform 0.7s cubic-bezier(.23,1.02,.53,.97)'
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="YOUR EMAIL"
            required
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s cubic-bezier(.23,1.02,.53,.97) 0.1s, transform 0.7s cubic-bezier(.23,1.02,.53,.97) 0.1s'
            }}
          />
          <textarea
            name="message"
            placeholder="YOUR MESSAGE"
            required
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              minHeight: '100px',
              resize: 'vertical',
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s cubic-bezier(.23,1.02,.53,.97) 0.2s, transform 0.7s cubic-bezier(.23,1.02,.53,.97) 0.2s'
            }}
          />

          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }}/>

          <div
            style={{
              margin: '0.5rem 0',
              display: 'flex',
              justifyContent: 'center',
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s cubic-bezier(.23,1.02,.53,.97) 0.25s, transform 0.7s cubic-bezier(.23,1.02,.53,.97) 0.25s'
            }}
          >
            <HCaptcha
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              reCaptchaCompat={false}
              onVerify={setCaptchaToken}
            />
          </div>

          <button
            type="submit"
            className={`cta-button ${isDarkMode ? "dark-mode-button" : "light-mode-button"}`}
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s cubic-bezier(.23,1.02,.53,.97) 0.3s, transform 0.7s cubic-bezier(.23,1.02,.53,.97) 0.3s'
            }}
          >
            Submit Form
          </button>

          {showPopup && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(240,240,240,0.98)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#222', textAlign: 'center' }}>
                Message sent successfully!
              </div>
              <button
                onClick={() => setShowPopup(false)}
                style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', background: '#677788', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                OK
              </button>
            </div>
          )}
        </form>
      </main>
    </>
  );
}

export default contact;
