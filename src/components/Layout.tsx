import { jsxRenderer } from "hono/jsx-renderer";

export const LayoutRenderer = jsxRenderer(
  ({ children, title }) => (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>
          {["James Cockshull", title].filter(Boolean).join(" - ")}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://jamesc.dev" />
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body class="font-mono leading-7 mx-[10vw] my-[10vh] dark:selection:bg-yellow-300 selection:bg-blue-700 selection:text-neutral-100 dark:selection:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        {children}
        <div
          id="visitor-count"
          class="fixed right-3 bottom-2 z-50 min-w-4 text-right text-sm tabular-nums text-neutral-400 dark:text-neutral-600"
          aria-live="polite"
          aria-label="Open connections"
        >
        </div>
        <script type="module" src="/client.js"></script>
      </body>
    </html>
  )
);
