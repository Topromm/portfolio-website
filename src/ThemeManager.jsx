import { useEffect, useState } from "react";

const ThemeManager = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const body = document.body;

    function updateTheme(dark) {
      if (!body) return;
      body.classList.toggle("dark-mode", dark);
      body.classList.toggle("light-mode", !dark);
    }

    updateTheme(isDarkMode);

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
      };
    }

  }, [isDarkMode, window.location.pathname]);

  return null;
};

export default ThemeManager;
