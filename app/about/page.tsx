import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Heart } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "LangGraph Academy is a free, community-built learning portal that teaches you how to build stateful, multi-agent AI applications with LangGraph.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: BookOpen,
    title: "Learn by building",
    body: "Every concept is paired with runnable code you can copy, adapt and experiment with. Theory is grounded in practice.",
  },
  {
    icon: Code2,
    title: "Accurate & up to date",
    body: "Tutorials mirror the official LangGraph API and are kept in step with the framework's core concepts and idioms.",
  },
  {
    icon: Heart,
    title: "Free and open",
    body: "No paywalls, no sign-ups. This is a community resource for anyone who wants to build better AI agents.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        About
      </span>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
        Learning LangGraph, made <span className="gradient-text">approachable</span>.
      </h1>
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <p>
          {siteConfig.name} is a free, community-built learning portal for{" "}
          <a
            href={siteConfig.links.langgraphDocs}
            target="_blank"
            rel="noopener noreferrer"
          >
            LangGraph
          </a>
          — the framework for building stateful, controllable, multi-agent
          applications on top of large language models.
        </p>
        <p>
          Most agent tutorials stop at a single prompt-and-response. Real
          applications need memory, loops, branching logic, human oversight and
          the ability to coordinate multiple specialised agents. LangGraph makes
          those things possible by modelling your application as a{" "}
          <strong>graph</strong> of nodes and edges over a shared state. This
          site teaches you that model, step by step.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="card p-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/12 text-brand-600 dark:text-brand-300">
              <v.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-base font-semibold text-ink-900 dark:text-white">
              {v.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {v.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 text-sm text-ink-600 dark:bg-amber-500/10 dark:text-ink-300">
        <strong className="text-ink-900 dark:text-white">Disclaimer.</strong>{" "}
        {siteConfig.name} is an independent educational project. It is not
        affiliated with, sponsored by, or endorsed by LangChain, Inc. LangGraph
        and LangChain are trademarks of their respective owners. Always consult
        the{" "}
        <a
          href={siteConfig.links.langgraphDocs}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 underline dark:text-brand-300"
        >
          official documentation
        </a>{" "}
        for authoritative, version-specific guidance.
      </div>

      <div className="mt-10">
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-500"
        >
          Explore the learning path
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
