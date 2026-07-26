import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  GitBranch,
  Repeat,
  Save,
  Sparkles,
  UserCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { GraphVisual } from "@/components/graph-visual";
import { getAllTutorials } from "@/lib/tutorials";
import { syllabus, getSyllabusStats, partSectionCount } from "@/lib/syllabus";
import { DifficultyBadge } from "@/components/ui";
import { siteConfig } from "@/lib/site";

const features = [
  {
    icon: Workflow,
    title: "Graphs, not chains",
    body: "Model agents as stateful graphs with nodes and edges. Loops, branches and cycles become first-class citizens.",
  },
  {
    icon: Repeat,
    title: "Cycles & control flow",
    body: "Build reasoning loops like ReAct where an agent thinks, acts and observes until the task is done.",
  },
  {
    icon: Save,
    title: "Durable persistence",
    body: "Checkpointers save graph state so conversations survive restarts and can be resumed at any point.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop",
    body: "Pause execution for approvals, edits or input, then resume exactly where you left off.",
  },
  {
    icon: Boxes,
    title: "Multi-agent systems",
    body: "Compose supervisors, teams and hierarchies of specialised agents that hand off work to each other.",
  },
  {
    icon: Zap,
    title: "Streaming built-in",
    body: "Stream tokens, state updates and events as your graph runs for responsive, real-time UIs.",
  },
];

export default function HomePage() {
  const tutorials = getAllTutorials();
  const s = getSyllabusStats();
  const stats = [
    { value: `${s.chapters}`, label: "Chapters" },
    { value: `${s.sections}`, label: "Lessons" },
    { value: "100%", label: "Free & open" },
  ];

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        {/* background glow + grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 opacity-40 blur-[120px] dark:bg-brand-500/25"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <Link
                href="/tutorials"
                className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-500/15 dark:text-brand-300"
              >
                <Sparkles className="h-3.5 w-3.5" />
                A complete, hands-on learning path
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl lg:text-6xl">
                Master{" "}
                <span className="gradient-text">LangGraph</span>, one
                graph at a time.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
                Learn to build stateful, controllable, multi-agent AI
                applications — from your very first{" "}
                <code className="rounded bg-brand-500/10 px-1.5 py-0.5 font-mono text-[0.85em] text-brand-600 dark:text-brand-300">
                  StateGraph
                </code>{" "}
                to production-grade agent systems, with clear explanations and
                runnable code.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/curriculum"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-500 hover:shadow-brand-500/40"
                >
                  Explore the curriculum
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={siteConfig.links.langgraphDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white/60 px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-400/50 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-200"
                >
                  Official docs
                </a>
              </div>

              <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl font-bold text-ink-900 dark:text-white">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-xs text-ink-500 dark:text-ink-400">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right column: graph + code peek */}
            <div className="relative animate-fade-up [animation-delay:150ms]">
              <div className="card relative mx-auto max-w-md overflow-hidden p-6">
                <div className="flex items-center gap-1.5 pb-4">
                  <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono text-xs text-ink-400">
                    react_agent.py
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
                  <pre className="overflow-x-auto rounded-lg bg-ink-950 p-4 font-mono text-[11px] leading-relaxed text-ink-100">
                    <code>{`from langgraph.graph import StateGraph, START, END

g = StateGraph(State)
g.add_node("agent", call_model)
g.add_node("tools", tool_node)

g.add_edge(START, "agent")
g.add_conditional_edges(
    "agent", should_continue,
    {"continue": "tools", "end": END},
)
g.add_edge("tools", "agent")

app = g.compile()`}</code>
                  </pre>
                  <div className="hidden sm:block">
                    <GraphVisual />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Features                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Why LangGraph
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            The framework for agents that actually work
          </h2>
          <p className="mt-4 text-ink-600 dark:text-ink-300">
            Simple chains break down the moment agents need memory, loops or
            collaboration. LangGraph gives you the primitives to build reliable,
            stateful systems.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card card-hover p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/12 text-brand-600 dark:text-brand-300">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Two learning tracks                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Two ways to learn
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            Pick your pace
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Link
            href="/curriculum"
            className="group card card-hover flex flex-col p-7"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <BookOpen className="h-4 w-4" />
              Full curriculum
            </span>
            <h3 className="mt-3 text-xl font-bold text-ink-900 dark:text-white">
              The complete course
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Four parts and {s.chapters} chapters, from beginner foundations to
              advanced systems and shipping agents in the workplace. The deep,
              structured path.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
              Browse all {s.parts} parts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/tutorials"
            className="group card card-hover flex flex-col p-7"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <Zap className="h-4 w-4" />
              Quickstart track
            </span>
            <h3 className="mt-3 text-xl font-bold text-ink-900 dark:text-white">
              {tutorials.length} hands-on tutorials
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              A focused, fast path that takes you from your first StateGraph to a
              multi-agent system with runnable code — perfect if you want to build
              something today.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
              Start the quickstart
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Curriculum parts                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[rgb(var(--bg-subtle))]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                <GitBranch className="h-4 w-4" />
                The curriculum
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
                Four parts, zero to production
              </h2>
              <p className="mt-4 text-ink-600 dark:text-ink-300">
                A sequential path that grows with you — from your first graph to
                enterprise-grade, governed agent systems.
              </p>
            </div>
            <Link
              href="/curriculum"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-300"
            >
              View full curriculum
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {syllabus.map((part) => (
              <Link
                key={part.slug}
                href={`/curriculum/${part.slug}`}
                className="group card card-hover flex flex-col p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/12 font-mono text-xs font-bold text-brand-600 dark:text-brand-300">
                      {part.roman}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
                      Part {part.roman} · {part.focus}
                    </span>
                  </span>
                  <DifficultyBadge level={part.level} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                  {part.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                  {part.subtitle}
                </p>
                <span className="mt-4 text-xs text-ink-400 dark:text-ink-500">
                  {part.chapters.length} chapters · {partSectionCount(part)} lessons
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-brand-400/20 bg-gradient-to-br from-brand-600 to-emerald-700 px-6 py-14 text-center shadow-2xl shadow-brand-600/20 sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-20"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build your first graph?
            </h2>
            <p className="mt-4 text-brand-50/90">
              Start with the fundamentals and work your way up to production
              multi-agent systems. No sign-up, no paywall — just learning.
            </p>
            <Link
              href="/curriculum/beginner/introduction-to-ai-agents"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-transform hover:scale-[1.02]"
            >
              Begin Part I · Chapter 1
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
