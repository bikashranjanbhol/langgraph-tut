"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { title: "Learning Path", href: "/tutorials" },
  { title: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-ink-200/80 bg-white/80 backdrop-blur-xl dark:border-ink-800/80 dark:bg-ink-950/80"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                )}
              >
                {link.title}
              </Link>
            );
          })}
          <div className="mx-1 h-5 w-px bg-ink-200 dark:bg-ink-800" />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LangGraph on GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-brand-500/10 hover:text-brand-500 dark:text-ink-300"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <ThemeToggle />
          <Link
            href="/tutorials"
            className="ml-2 inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-all hover:bg-brand-500 hover:shadow-brand-500/40"
          >
            Start Learning
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 dark:text-ink-300"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink-200/80 bg-white/95 backdrop-blur-xl dark:border-ink-800/80 dark:bg-ink-950/95 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-brand-500/10 hover:text-brand-600 dark:text-ink-200"
              >
                {link.title}
              </Link>
            ))}
            <Link
              href="/tutorials"
              className="mt-2 block rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Start Learning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
