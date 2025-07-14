import { useEffect, useState } from "react";

const ThemeManager = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const lightModeBackground = "#c9c2b8";
  const darkModeBackground = "#15161a";

  useEffect(() => {
    const body = document.body;
    const navbar = document.querySelector(".navbar");
    const heroContainer = document.querySelector(".hero-container");
    const contactButton = document.querySelector(".cta-button");
    const modeButton = document.getElementById("mode-button");

    function updateButtonColor(dark) {
      if (!contactButton) return;
      contactButton.classList.remove(dark ? "light-mode-button" : "dark-mode-button");
      contactButton.classList.add(dark ? "dark-mode-button" : "light-mode-button");
    }

    function updateTheme(dark) {
      if (!body || !navbar || !heroContainer || !modeButton) return;

      body.classList.toggle("dark-mode", dark);
      body.classList.toggle("light-mode", !dark);

      modeButton.innerHTML = dark
        ? '<img src="https://i.imgur.com/C0R5Nns.png" alt="Sun" class="icon" id="sun-icon">'
        : '<img src="https://i.imgur.com/Li8FKFW.png" alt="Moon" class="icon" id="moon-icon">';

      navbar.style.background = dark
        ? "linear-gradient(to right, #436674, #000000, #000000, #000000)"
        : "linear-gradient(to right, #ebb390, #677788, #677788, #677788)";
      heroContainer.style.backgroundImage = `url(${
        dark ? darkModeBackground : lightModeBackground
      })`;

      updateButtonColor(dark);
    }

    updateTheme(isDarkMode);

    const toggleMode = () => {
      const newMode = !isDarkMode;
      localStorage.setItem("darkMode", newMode);
      setIsDarkMode(newMode);
      window.dispatchEvent(new CustomEvent("darkModeChanged", { detail: newMode }));
    };

    if (modeButton) {
      modeButton.addEventListener("click", toggleMode);
    }

    return () => {
      if (modeButton) {
        modeButton.removeEventListener("click", toggleMode);
      }
    };
  }, [isDarkMode]);

  return null;
};

export default ThemeManager;
