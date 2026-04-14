import Link from "next/link";
import { footerLinks } from "@/constants/menu";
import NewsletterSection from "./NewsletterSection";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-3.5 h-3.5"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-3.5 h-3.5"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-3.5 h-3.5"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto">
      <NewsletterSection />
      <div className="w-full bg-brand py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-0.5 shrink-0">
            <span className="text-white font-semibold text-lg sm:text-xl tracking-tight">
              AutoElite
            </span>
            <span className="text-[#94A3B8] font-normal text-xs sm:text-sm">
              &copy; {currentYear} AutoElite. All rights reserved.
            </span>
          </div>

          <nav className="flex font-normal text=[#94A3B8] text-xs sm:text-sm items-center flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-400 text-xs hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {socialLinks.map(({ label, href, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-gray-400 hover:text-white hover:border-white/40 transition-colors duration-150"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
