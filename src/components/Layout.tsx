import { html } from "hono/html";

export const Layout = (props: { title?: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>James Cockshull ${props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://jamesc.dev" />
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body
        class="font-mono leading-7 mx-[10vw] my-[10vh] dark:selection:bg-custom-yellow selection:bg-blue-700 selection:text-neutral-100 dark:selection:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 transition-all"
      >
        ${props?.children}
      </body>
    </html>`;
};
