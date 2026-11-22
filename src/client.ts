const visitorCount = document.querySelector<HTMLElement>("#visitor-count")!;
const themeToggle = document.querySelector<HTMLButtonElement>("#theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const protocol = location.protocol === "https:" ? "wss:" : "ws:";
const socket = new WebSocket(`${protocol}//${location.host}/ws`);
type Theme = "light" | "dark";

function getStoredTheme(): Theme | null {
  try {
    const theme = localStorage.getItem("theme");
    return theme === "light" || theme === "dark" ? theme : null;
  } catch (error) {
    console.warn("Unable to read theme pref:", error);
    return null;
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.warn("Unable to set theme pref:", error);
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
}

let chosenTheme = getStoredTheme();

systemTheme.addEventListener("change", () => {
  if (!chosenTheme) {
    applyTheme(systemTheme.matches ? "dark" : "light");
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === "theme" || event.key === null) {
    chosenTheme = getStoredTheme();
    applyTheme(chosenTheme ?? (systemTheme.matches ? "dark" : "light"));
  }
});

themeToggle?.addEventListener("click", () => {
  chosenTheme = document.documentElement.dataset.theme === "dark"
    ? "light"
    : "dark";
  storeTheme(chosenTheme);
  applyTheme(chosenTheme);
});

applyTheme(chosenTheme ?? (systemTheme.matches ? "dark" : "light"));

socket.addEventListener("message", (event) => {
  const update = JSON.parse(event.data) as {
    count: number;
    uniqueCount: number;
  };
  visitorCount.textContent = `${update.count} (${update.uniqueCount})`;
});

socket.addEventListener("close", () => {
  visitorCount.textContent = "-";
});
