import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Portfolio() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync menuOpen with checkbox state
  useEffect(() => {
    const check = document.getElementById("check");
    if (check) check.checked = menuOpen;
  }, [menuOpen]);

  const redirectToContactPage = () => {
    navigate("/contact"); // placeholder
  };

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

      <div className="hero-container">
        <div className="hero-content">
          <h2>About</h2>
          <p>Esimerkki about me tyylisestä sivusta.</p>
          <button className="cta-button" onClick={redirectToContactPage}>
            Contact me
          </button>
        </div>
      </div>

      <div className="page-content1">
        <h1>Esimerkki Erkki</h1>
        <p>Ohjelmistokehittäjä</p>
      </div>

      <div className="page-content2">
        <p>Paljon tärkeää tekstiä ja tietoa ja jotain semmosta.</p>
        <p>Tässä lisää tärkeää hienoa tekstiä ynnä muuta sellasta.</p>
        <p>Lisää tärkeää hienoa tietoa liittyen johonkin tärkeään.</p>
      </div>

      <div className="page-content3">
        <p>Paljon lisää tärkeää tekstiä ja tietoa ja jotain semmosta.</p>
        <p>Tässä vielä vähän lisää tärkeää tekstiä ynnä muuta sellasta.</p>
        <p>Lisää erittäin tärkeää hienoa tietoa liittyen johonkin tärkeään taas.</p>
      </div>

      <div className="page-content5">
        <button className="testi-button" onClick={redirectToContactPage}>Ota yhteyttä</button>
      </div>
    </>
  );
}

export default Portfolio;
