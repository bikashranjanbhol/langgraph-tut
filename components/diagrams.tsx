"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  Database,
  Dices,
  Eye,
  GitBranch,
  LifeBuoy,
  Play,
  RefreshCw,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* 1. AgentLoop — the perceive → reason → act → observe cycle          */
/* ------------------------------------------------------------------ */

const LOOP_STAGES = [
  {
    label: "Perceive",
    icon: Eye,
    short: "Take in the situation",
    detail:
      "The agent reads its inputs — the user's goal, the current state, results from previous actions, and anything in memory. This is its picture of the world right now.",
  },
  {
    label: "Reason",
    icon: Brain,
    short: "Decide what to do",
    detail:
      "The model thinks about the goal and decides the next step: call a tool, ask a question, or conclude. Crucially, the agent — not the developer — chooses.",
  },
  {
    label: "Act",
    icon: Zap,
    short: "Take an action",
    detail:
      "The chosen action runs: a tool is called, code executes, a message is sent. The action changes the world or gathers new information.",
  },
  {
    label: "Observe",
    icon: RefreshCw,
    short: "Read the result",
    detail:
      "The result of the action feeds back in. If the goal isn't met, the loop repeats — perceive, reason, act again — until the agent decides it's done.",
  },
] as const;

export function AgentLoop() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % LOOP_STAGES.length),
      2600
    );
    return () => clearInterval(id);
  }, [auto]);

  const Active = LOOP_STAGES[active];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <RefreshCw className="h-4 w-4 text-brand-500" />
          The agent loop
        </span>
        <button
          type="button"
          onClick={() => setAuto((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-500 transition-colors hover:border-brand-400/50 hover:text-brand-600 dark:border-ink-700 dark:text-ink-400"
        >
          <Play className={cn("h-3 w-3", auto && "text-brand-500")} />
          {auto ? "Auto-playing" : "Paused"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {LOOP_STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i === active;
          return (
            <button
              key={stage.label}
              type="button"
              onMouseEnter={() => {
                setAuto(false);
                setActive(i);
              }}
              onClick={() => {
                setAuto(false);
                setActive(i);
              }}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all",
                isActive
                  ? "border-brand-400/70 bg-brand-500/10 shadow-sm shadow-brand-500/10"
                  : "border-ink-200/70 bg-white/60 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40"
              )}
            >
              <span className="flex w-full items-center justify-between">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    isActive
                      ? "bg-brand-500/20 text-brand-600 dark:text-brand-300"
                      : "bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-mono text-xs text-ink-400">{i + 1}</span>
              </span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  isActive
                    ? "text-brand-700 dark:text-brand-200"
                    : "text-ink-800 dark:text-ink-200"
                )}
              >
                {stage.label}
              </span>
              <span className="text-xs text-ink-500 dark:text-ink-400">
                {stage.short}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-400">
        <RefreshCw className="h-3 w-3" />
        repeats until the goal is met
      </div>

      <div
        key={active}
        className="mt-4 animate-fade-up rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 dark:bg-brand-500/10"
      >
        <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">
          <span className="font-semibold text-ink-900 dark:text-white">
            {Active.label}.
          </span>{" "}
          {Active.detail}
        </p>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-400">
        Hover or tap a stage to explore it.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 2. LlmVsAgent — toggle between a plain LLM call and an agentic app  */
/* ------------------------------------------------------------------ */

export function LlmVsAgent() {
  const [mode, setMode] = useState<"llm" | "agent">("llm");
  const isAgent = mode === "agent";

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-5 inline-flex rounded-xl border border-ink-200 bg-white/70 p-1 dark:border-ink-700 dark:bg-ink-900/60">
        {(["llm", "agent"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
              mode === m
                ? "bg-brand-600 text-white shadow-sm"
                : "text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
            )}
          >
            {m === "llm" ? "Plain LLM app" : "Agentic app"}
          </button>
        ))}
      </div>

      {/* Flow */}
      <div className="flex flex-wrap items-center gap-2.5">
        <FlowBox label="Input / Goal" tone="neutral" />
        <ArrowRight className="h-4 w-4 shrink-0 text-ink-400" />
        <FlowBox
          label={isAgent ? "LLM reasons" : "LLM"}
          icon={Brain}
          tone="brand"
        />
        {isAgent && (
          <>
            <span className="inline-flex items-center gap-1 text-xs text-ink-400">
              <RefreshCw className="h-3.5 w-3.5" />
            </span>
            <FlowBox label="Tools · Memory · Env" icon={Wrench} tone="amber" />
            <ArrowRight className="h-4 w-4 shrink-0 text-ink-400" />
          </>
        )}
        {!isAgent && <ArrowRight className="h-4 w-4 shrink-0 text-ink-400" />}
        <FlowBox label="Output" tone="neutral" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            Control flow
          </p>
          <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">
            {isAgent
              ? "Decided by the model at run time — it loops until done."
              : "Fixed by the developer — one pass, in and out."}
          </p>
        </div>
        <div className="rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            Typical use
          </p>
          <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">
            {isAgent
              ? "Open-ended tasks: research, multi-step tool use, assistants."
              : "One-shot tasks: summarize, classify, extract, translate."}
          </p>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Toggle to compare a single LLM call with an agentic application.
      </figcaption>
    </figure>
  );
}

function FlowBox({
  label,
  icon: Icon,
  tone,
}: {
  label: string;
  icon?: typeof Brain;
  tone: "neutral" | "brand" | "amber";
}) {
  const tones = {
    neutral:
      "border-ink-200/70 bg-white/70 text-ink-700 dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-200",
    brand:
      "border-brand-400/50 bg-brand-500/10 text-brand-700 dark:text-brand-200",
    amber:
      "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium",
        tones[tone]
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 3. AutonomySpectrum — from fixed workflow to autonomous agent       */
/* ------------------------------------------------------------------ */

const SPECTRUM = [
  {
    name: "Single call",
    control: 5,
    desc: "One prompt, one response. The developer controls everything.",
    example: "Summarize this email.",
  },
  {
    name: "Chain",
    control: 20,
    desc: "A fixed pipeline of steps. Still fully developer-defined.",
    example: "Extract → translate → format.",
  },
  {
    name: "Router",
    control: 45,
    desc: "The model picks a branch, but the paths are pre-built by the developer.",
    example: "Classify the request, then route to the right handler.",
  },
  {
    name: "Tool-calling agent",
    control: 75,
    desc: "The model chooses which tools to call and loops until it's satisfied.",
    example: "A research assistant that searches, reads, and answers.",
  },
  {
    name: "Autonomous / multi-agent",
    control: 95,
    desc: "The model drives most decisions, coordinating tools and other agents.",
    example: "A team of agents that plans, executes, and reviews a report.",
  },
] as const;

export function AutonomySpectrum() {
  const [i, setI] = useState(2);
  const level = SPECTRUM[i];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <SlidersHorizontal className="h-4 w-4 text-brand-500" />
        The autonomy spectrum
      </span>

      {/* Track */}
      <div className="relative mt-2 h-2 rounded-full bg-gradient-to-r from-sky-400/60 via-brand-500/60 to-rose-500/60">
        <div
          className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-brand-600 shadow transition-all dark:border-ink-950"
          style={{ left: `${level.control}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-ink-400">
        <span>Developer controls flow</span>
        <span>Model controls flow</span>
      </div>

      {/* Segments */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {SPECTRUM.map((s, idx) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "rounded-lg border px-2 py-2 text-center text-xs font-medium transition-all",
              idx === i
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div
        key={i}
        className="mt-4 animate-fade-up rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 dark:bg-brand-500/10"
      >
        <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">
          <span className="font-semibold text-ink-900 dark:text-white">
            {level.name}.
          </span>{" "}
          {level.desc}
        </p>
        <p className="mt-2 text-xs text-ink-500 dark:text-ink-400">
          <span className="font-medium">Example:</span> {level.example}
        </p>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-400">
        Click a level. LangGraph is designed for the right-hand side — but supports it all.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 4. DeterminismDemo — same input, same output vs varied output       */
/* ------------------------------------------------------------------ */

const LLM_VARIANTS = [
  "Sure! The capital of France is Paris.",
  "That would be Paris, the capital of France.",
  "Paris is France's capital city.",
  "The answer is Paris.",
  "France's capital is Paris — the City of Light.",
];

export function DeterminismDemo() {
  const [mode, setMode] = useState<"code" | "llm">("llm");
  const [runs, setRuns] = useState<string[]>([]);

  function run() {
    if (mode === "code") {
      setRuns(["Paris", "Paris", "Paris"]);
    } else {
      const pool = [...LLM_VARIANTS];
      const picks: string[] = [];
      for (let n = 0; n < 3; n++) {
        const idx = Math.floor(Math.random() * pool.length);
        picks.push(pool.splice(idx, 1)[0] ?? "Paris.");
      }
      setRuns(picks);
    }
  }

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-ink-200 bg-white/70 p-1 dark:border-ink-700 dark:bg-ink-900/60">
          {(["code", "llm"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setRuns([]);
              }}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                mode === m
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
              )}
            >
              {m === "code" ? "Deterministic function" : "LLM (non-deterministic)"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={run}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          {mode === "code" ? <Play className="h-4 w-4" /> : <Dices className="h-4 w-4" />}
          Run 3×
        </button>
      </div>

      <p className="mt-4 font-mono text-xs text-ink-400">
        input: &quot;What is the capital of France?&quot;
      </p>

      <div className="mt-2 space-y-2">
        {runs.length === 0 ? (
          <p className="rounded-lg border border-dashed border-ink-300/60 p-4 text-center text-sm text-ink-400 dark:border-ink-700">
            Press <span className="font-medium">Run 3×</span> to see what happens.
          </p>
        ) : (
          runs.map((r, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-ink-200/70 bg-white/60 p-3 text-sm dark:border-ink-800/70 dark:bg-ink-900/40"
            >
              <span className="font-mono text-xs text-ink-400">run {idx + 1}</span>
              <span className="text-ink-800 dark:text-ink-100">{r}</span>
            </div>
          ))
        )}
      </div>

      {runs.length > 0 && (
        <p className="mt-3 text-xs text-ink-500 dark:text-ink-400">
          {mode === "code"
            ? "Identical every time — deterministic. The same input always yields the same output."
            : "The meaning is stable, but the wording varies run to run — non-deterministic. This is why agents need guardrails, testing, and evaluation."}
        </p>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 5. OrchestrationDiagram — what an orchestrator ties together        */
/* ------------------------------------------------------------------ */

const SPOKES = [
  { label: "LLM reasoning", icon: Brain },
  { label: "Tools & APIs", icon: Wrench },
  { label: "Memory & state", icon: Database },
  { label: "Control flow", icon: GitBranch },
  { label: "Human oversight", icon: UserCheck },
] as const;

export function OrchestrationDiagram() {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-xl border border-brand-400/50 bg-brand-500/10 px-4 py-2.5 text-sm font-semibold text-brand-700 dark:text-brand-200">
          <Sparkles className="h-4 w-4" />
          Orchestration layer
        </div>
        <div className="my-3 h-6 w-px bg-gradient-to-b from-brand-400/60 to-transparent" />
        <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-5">
          {SPOKES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-ink-200/70 bg-white/60 p-3 text-center dark:border-ink-800/70 dark:bg-ink-900/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/12 text-brand-600 dark:text-brand-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium text-ink-700 dark:text-ink-200">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Orchestration coordinates every moving part into one reliable system —
        this is LangGraph&apos;s job.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 6. UseCaseGrid — common agent use cases                             */
/* ------------------------------------------------------------------ */

const USE_CASES = [
  {
    icon: Search,
    title: "Research assistants",
    desc: "Search multiple sources, read, cross-check, and synthesize an answer with citations.",
  },
  {
    icon: LifeBuoy,
    title: "Customer support",
    desc: "Understand a request, look up account data, take actions, and escalate when unsure.",
  },
  {
    icon: Bot,
    title: "Coding agents",
    desc: "Read a codebase, plan a change, edit files, run tests, and iterate on failures.",
  },
  {
    icon: ShoppingCart,
    title: "Task automation",
    desc: "Drive multi-step back-office workflows across internal tools and APIs.",
  },
] as const;

export function UseCaseGrid() {
  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
      {USE_CASES.map((u) => {
        const Icon = u.icon;
        return (
          <div
            key={u.title}
            className="rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/12 text-brand-600 dark:text-brand-300">
              <Icon className="h-4 w-4" />
            </span>
            <h4 className="mt-3 text-sm font-semibold text-ink-900 dark:text-white">
              {u.title}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {u.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
