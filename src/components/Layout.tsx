import { Handler } from "hono";

export const LayoutRenderer: Handler = async (ctx, next) => {
  ctx.setRenderer((content, head) => {
    return ctx.html(
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>
            {["James Cockshull", head?.title].filter(Boolean).join(" - ")}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://jamesc.dev" />
          <link rel="stylesheet" href="/app.css" />
        </head>
        <body class="font-mono leading-7 mx-[10vw] my-[10vh] dark:selection:bg-custom-yellow selection:bg-blue-700 selection:text-neutral-100 dark:selection:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 animate-[slideIn_300ms_ease-out]">
          {content}
        </body>
      </html>
    );
  });
  await next();
};
