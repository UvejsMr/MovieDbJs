const themeToggleButton = document.getElementById("themeToggle");

const setTheme = (theme) => {
  document.body.className = theme;
  const navbar = document.querySelector(".navbar");
  navbar.className = `navbar navbar-expand-lg ${theme}`;

  themeToggleButton.textContent =
    theme === "light-mode" ? "Dark Mode" : "Light Mode";

  localStorage.setItem("theme", theme);
};

const savedTheme = localStorage.getItem("theme") || "light-mode";
setTheme(savedTheme);

themeToggleButton.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("light-mode")
    ? "light-mode"
    : "dark-mode";
  const newTheme = currentTheme === "light-mode" ? "dark-mode" : "light-mode";
  setTheme(newTheme);
});
