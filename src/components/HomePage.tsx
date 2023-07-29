import { Layout } from "./Layout";

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
    href: "https://twitter.com/cone56",
    label: "Twitter",
  },
  {
    href: "https://instagram.com/james.cockshull/",
    label: "Instagram",
  },
];

export const HomePage = () => {
  return (
    <Layout>
      <img
        class="rounded-full w-48 h-48 mb-10 block"
        src="/public/me.jpg"
        alt="James Cockshull"
      />
      <h1 class="text-xl font-bold my-3">
        <span class="animate-[wave_3s_linear_infinite] inline-block">👋</span>{" "}
        Hi there. I'm James
      </h1>
      <p>I'm a full stack web developer from Eastbourne, UK.</p>
      <p>
        There's nothing hosted on this site; you can find my profiles on the
        interwebs below.
      </p>
      <ul class="mt-6 ml-6">
        {links.map(({ href, label }) => (
          <li>
            <a
              class="text-custom-yellow underline"
              href={href}
              rel="me external"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
