import Link from "next/link";
import { Github } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-200/70 bg-[rgb(var(--bg-subtle))] dark:border-ink-800/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-xs text-ink-400 dark:text-ink-500">
              A community learning resource. Not affiliated with or endorsed by
              LangChain, Inc.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900 dark:text-white">
              Learn
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/tutorials"
                  className="text-ink-500 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-300"
                >
                  Learning Path
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-ink-500 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-300"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900 dark:text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.links.langgraphDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-500 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-300"
                >
                  Official Docs
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-500 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-300"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-200/70 pt-6 text-xs text-ink-400 dark:border-ink-800/70 dark:text-ink-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Built for the community.
          </p>
          <p>Made with Next.js · Content under CC BY 4.0</p>
        </div>
      </div>
    </footer>
  );
}
