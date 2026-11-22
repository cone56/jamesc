import { jsxRenderer } from "hono/jsx-renderer";
import { ThemeToggle } from "./ThemeToggle";

export const LayoutRenderer = jsxRenderer(
  ({ children, title }) => (
    <html
      lang="en"
      class="bg-white transition-colors duration-300 motion-reduce:transition-none dark:bg-neutral-900"
    >
      <head>
        <meta charset="utf-8" />
        <meta name="color-scheme" content="light dark" />
        <title>
          {["James Cockshull", title].filter(Boolean).join(" - ")}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://jamesc.dev" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const root = document.documentElement;
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  try {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      theme = storedTheme;
    }
  } catch (error) {
    console.warn("Unable to read theme pref:", error);
  }

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`,
          }}
        />
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body class="font-mono leading-7 mx-[10vw] my-[10vh] transition-colors duration-300 motion-reduce:transition-none dark:selection:bg-yellow-300 selection:bg-blue-700 selection:text-neutral-100 dark:selection:text-neutral-900 dark:text-neutral-100">
        {children}
        <ThemeToggle className="fixed top-4 right-4" />
        <div
          id="visitor-count"
          class="fixed left-3 bottom-3 min-w-4 text-xs tabular-nums text-neutral-400 dark:text-neutral-600"
          aria-live="polite"
          aria-label="Open connections (unique count)"
        >
        </div>
        <script type="module" src="/client.js"></script>
      </body>
    </html>
  )
);
