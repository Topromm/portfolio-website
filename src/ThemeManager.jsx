import { useEffect, useState } from "react";

const ThemeManager = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const body = document.body;
    const modeButton = document.getElementById("mode-button");

    function updateTheme(dark) {
      if (!body) return;
      body.classList.toggle("dark-mode", dark);
      body.classList.toggle("light-mode", !dark);

      if (modeButton) {
        modeButton.innerHTML = dark
          ? '<img src="https://i.imgur.com/C0R5Nns.png" alt="Sun" class="icon" id="sun-icon">'
          : '<img src="https://i.imgur.com/Li8FKFW.png" alt="Moon" class="icon" id="moon-icon">';
      }
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
