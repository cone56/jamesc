import { FC } from "hono/jsx";

const links = [
  {
    href: "https://www.linkedin.com/in/jamescockshull",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/cone56",
    label: "GitHub",
  },
  {
    href: "https://bsky.app/profile/jamesc.dev",
    label: "Bluesky",
  },
  {
    href: "https://instagram.com/james.cockshull/",
    label: "Instagram",
  },
];

export const HomePage: FC<{}> = () => (
  <>
    <img
      class="rounded-full w-48 h-48 mb-10 block"
      src="/me.jpg"
      alt="James Cockshull"
    />
    <h1 class="text-xl font-bold my-4">
      <span class="animate-[wave_3s_linear_1s_infinite] inline-block">👋</span>{" "}
      Hi there. I'm James
    </h1>
    <p class="my-4">I'm a full stack web developer from the UK.</p>
    <p class="my-4">
      There's nothing hosted on this site; you can find my profiles on the
      interwebs below.
    </p>
    <ul class="mt-8 ml-8">
      {links.map(({ href, label }) => (
        <li class="my-2">
          <a
            class="text-blue-700 dark:text-yellow-400"
            href={href}
            rel="me external"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </>
);
