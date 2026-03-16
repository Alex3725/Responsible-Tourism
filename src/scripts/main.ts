const navToggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const nav = document.querySelector<HTMLElement>("#site-nav");
const themeToggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");

const THEME_KEY = "bora-theme";

const applyTheme = (mode: "light" | "dark") => {
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.style.colorScheme = mode;
  if (themeToggle) {
    themeToggle.textContent = mode === "dark" ? "Tema chiaro" : "Tema scuro";
    themeToggle.setAttribute("aria-pressed", String(mode === "dark"));
  }
};

const storedTheme = localStorage.getItem(THEME_KEY);
if (storedTheme === "light" || storedTheme === "dark") {
  applyTheme(storedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isHidden = nav.classList.toggle("hidden");
    navToggle.setAttribute("aria-expanded", String(!isHidden));
  });
}
