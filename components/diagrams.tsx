"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Blocks,
  Bot,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Copy,
  Database,
  Dices,
  Download,
  Eye,
  EyeOff,
  FileCode,
  Folder,
  Gauge,
  GitBranch,
  GitMerge,
  KeyRound,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Loader2,
  MessageSquare,
  Play,
  Radio,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  User,
  UserCheck,
  Workflow,
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

/* ------------------------------------------------------------------ */
/* 7. GraphAnatomy — click the parts of a StateGraph to learn them     */
/* ------------------------------------------------------------------ */

const GA_LEGEND = [
  {
    key: "state",
    label: "State",
    ids: ["start", "agent", "tools", "end", "e_start", "e_tool", "e_end", "e_loop"],
    desc: "State is the shared data that flows through the graph. Every node reads it and returns an update to it — it's the agent's working memory.",
  },
  {
    key: "start-end",
    label: "START / END",
    ids: ["start", "end"],
    desc: "START is where execution begins and END is where it stops. Every run travels from START to END.",
  },
  {
    key: "node",
    label: "Node",
    ids: ["agent", "tools"],
    desc: "A node is a unit of work — usually a function that reads the state, does something (call the model, run a tool), and returns an update.",
  },
  {
    key: "edge",
    label: "Edge",
    ids: ["e_start"],
    desc: "An edge connects one node to the next, defining the order of execution.",
  },
  {
    key: "conditional",
    label: "Conditional edge",
    ids: ["e_tool", "e_end"],
    desc: "A conditional edge chooses the next node at run time from the state. Here the agent decides whether to call a tool or finish — this is how a graph branches.",
  },
  {
    key: "loop",
    label: "Loop",
    ids: ["e_loop"],
    desc: "Edges can point backwards to form loops. After a tool runs, control returns to the agent to reason again — the core of an agent.",
  },
] as const;

export function GraphAnatomy() {
  const [sel, setSel] = useState<string>("node");
  const active = GA_LEGEND.find((l) => l.key === sel) ?? GA_LEGEND[2];
  const on = (id: string) => (active.ids as readonly string[]).includes(id);
  const st = (id: string) => ({
    opacity: on(id) ? 1 : 0.22,
    transition: "opacity .3s ease",
  });

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Workflow className="h-4 w-4 text-brand-500" />
        Anatomy of a StateGraph
      </span>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 640 300"
          className="mx-auto h-auto w-full min-w-[440px] max-w-2xl"
          role="img"
          aria-label="A LangGraph state graph: START to agent, a conditional edge to tools or END, and a loop from tools back to agent."
        >
          <defs>
            {/* userSpaceOnUse so vertical (zero-width) edges still paint */}
            <linearGradient
              id="ga-grad"
              gradientUnits="userSpaceOnUse"
              x1="80"
              y1="40"
              x2="560"
              y2="260"
            >
              <stop offset="0%" stopColor="#34d39e" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <marker
              id="ga-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
            </marker>
          </defs>

          {/* edges */}
          <g style={st("e_start")}>
            <line
              x1="320" y1="60" x2="320" y2="106"
              stroke="url(#ga-grad)" strokeWidth={on("e_start") ? 3 : 2}
              markerEnd="url(#ga-arrow)"
            />
          </g>
          <g style={st("e_tool")}>
            <line
              x1="292" y1="152" x2="214" y2="206"
              stroke="url(#ga-grad)" strokeWidth={on("e_tool") ? 3 : 2}
              strokeDasharray="5 5" markerEnd="url(#ga-arrow)"
            />
            <text x="214" y="184" textAnchor="middle" fontSize="11"
              className="fill-ink-500 dark:fill-ink-400" fontFamily="var(--font-mono)">
              needs tool
            </text>
          </g>
          <g style={st("e_end")}>
            <line
              x1="348" y1="152" x2="424" y2="206"
              stroke="url(#ga-grad)" strokeWidth={on("e_end") ? 3 : 2}
              strokeDasharray="5 5" markerEnd="url(#ga-arrow)"
            />
            <text x="426" y="184" textAnchor="middle" fontSize="11"
              className="fill-ink-500 dark:fill-ink-400" fontFamily="var(--font-mono)">
              done
            </text>
          </g>
          <g style={st("e_loop")}>
            <path
              d="M 140 224 C 44 206, 66 118, 260 132"
              fill="none" stroke="url(#ga-grad)" strokeWidth={on("e_loop") ? 3 : 2}
              markerEnd="url(#ga-arrow)"
            />
          </g>

          {/* START */}
          <g style={st("start")}>
            <rect x="281" y="28" width="78" height="32" rx="16"
              className="fill-white dark:fill-ink-900" stroke="#059669" strokeWidth="1.5" />
            <text x="320" y="48" textAnchor="middle" fontSize="12" fontWeight="700"
              className="fill-brand-600 dark:fill-brand-300" fontFamily="var(--font-mono)">
              START
            </text>
          </g>

          {/* agent node */}
          <g style={st("agent")}>
            <rect x="262" y="108" width="116" height="44" rx="12"
              className="fill-white dark:fill-ink-900" stroke="url(#ga-grad)" strokeWidth="2" />
            <text x="320" y="135" textAnchor="middle" fontSize="14" fontWeight="600"
              className="fill-ink-800 dark:fill-ink-100" fontFamily="var(--font-mono)">
              agent
            </text>
          </g>

          {/* tools node */}
          <g style={st("tools")}>
            <rect x="140" y="208" width="112" height="44" rx="12"
              className="fill-white dark:fill-ink-900" stroke="url(#ga-grad)" strokeWidth="2" />
            <text x="196" y="235" textAnchor="middle" fontSize="14" fontWeight="600"
              className="fill-ink-800 dark:fill-ink-100" fontFamily="var(--font-mono)">
              tools
            </text>
          </g>

          {/* END */}
          <g style={st("end")}>
            <rect x="402" y="210" width="84" height="32" rx="16"
              className="fill-white dark:fill-ink-900" stroke="#059669" strokeWidth="1.5" />
            <text x="444" y="230" textAnchor="middle" fontSize="12" fontWeight="700"
              className="fill-brand-600 dark:fill-brand-300" fontFamily="var(--font-mono)">
              END
            </text>
          </g>
        </svg>
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-2">
        {GA_LEGEND.map((l) => (
          <button
            key={l.key}
            type="button"
            onClick={() => setSel(l.key)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
              sel === l.key
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div
        key={sel}
        className="mt-4 animate-fade-up rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 dark:bg-brand-500/10"
      >
        <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">
          <span className="font-semibold text-ink-900 dark:text-white">
            {active.label}.
          </span>{" "}
          {active.desc}
        </p>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-400">
        Click a concept to highlight it in the graph.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 8. WhenToUse — interactive "do I need LangGraph?" helper            */
/* ------------------------------------------------------------------ */

const WHEN_CRITERIA = [
  "The task takes several steps to complete",
  "The right next step depends on intermediate results (branches or loops)",
  "It calls tools, APIs, or external systems",
  "It must remember earlier turns or resume after a pause",
  "A human needs to approve or edit actions mid-run",
  "Multiple specialised agents collaborate",
];

const WHEN_TONES = {
  sky: "border-sky-500/30 bg-sky-500/5 dark:bg-sky-500/10",
  amber: "border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10",
  brand: "border-brand-500/30 bg-brand-500/5 dark:bg-brand-500/10",
} as const;

export function WhenToUse() {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  const n = checked.length;
  const verdict =
    n === 0
      ? {
          tone: "sky" as const,
          title: "A single LLM call is probably enough",
          body: "Nothing here needs orchestration yet. Reach for the model SDK or a simple prompt.",
        }
      : n <= 2
        ? {
            tone: "amber" as const,
            title: "A simple chain or a prebuilt agent may do",
            body: "You have some complexity. A linear chain or a prebuilt agent could be enough — LangGraph is optional, but it will help as this grows.",
          }
        : {
            tone: "brand" as const,
            title: "LangGraph is a strong fit",
            body: "Loops, state, tools, memory, human oversight, or multiple agents — this is exactly what LangGraph is built to orchestrate.",
          };

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <SlidersHorizontal className="h-4 w-4 text-brand-500" />
        Do I need LangGraph?
      </span>
      <p className="mb-4 text-sm text-ink-500 dark:text-ink-400">
        Tick everything that&apos;s true of your task.
      </p>

      <div className="space-y-2">
        {WHEN_CRITERIA.map((c, i) => {
          const isOn = checked.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-all",
                isOn
                  ? "border-brand-400/60 bg-brand-500/10 text-ink-900 dark:text-white"
                  : "border-ink-200/70 bg-white/60 text-ink-600 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-300"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                  isOn
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-ink-300 dark:border-ink-600"
                )}
              >
                {isOn && <Check className="h-3.5 w-3.5" />}
              </span>
              {c}
            </button>
          );
        })}
      </div>

      <div
        key={verdict.title}
        className={cn(
          "mt-4 animate-fade-up rounded-xl border p-4",
          WHEN_TONES[verdict.tone]
        )}
      >
        <p className="text-sm font-semibold text-ink-900 dark:text-white">
          {verdict.title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {verdict.body}
        </p>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 9. EcosystemGrid — the pieces of the LangGraph ecosystem            */
/* ------------------------------------------------------------------ */

const ECOSYSTEM = [
  {
    icon: Workflow,
    title: "LangGraph (OSS)",
    tag: "Open source",
    desc: "The core Python & JavaScript library for building stateful graphs.",
  },
  {
    icon: Blocks,
    title: "Prebuilt agents",
    tag: "Open source",
    desc: "create_react_agent, ToolNode, and supervisor / swarm helpers.",
  },
  {
    icon: Database,
    title: "Checkpointers & stores",
    tag: "Open source",
    desc: "Memory, SQLite and Postgres backends for persistence and long-term memory.",
  },
  {
    icon: Terminal,
    title: "LangGraph CLI",
    tag: "Tooling",
    desc: "langgraph dev and langgraph build for local runs and Docker images.",
  },
  {
    icon: LayoutDashboard,
    title: "LangGraph Studio",
    tag: "Tooling",
    desc: "A visual IDE to run, inspect, and debug your graphs step by step.",
  },
  {
    icon: Cloud,
    title: "LangGraph Platform",
    tag: "Deployment",
    desc: "Managed or self-hosted deployment with an API, persistence, and scaling.",
  },
] as const;

export function EcosystemGrid() {
  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ECOSYSTEM.map((e) => {
        const Icon = e.icon;
        return (
          <div
            key={e.title}
            className="flex flex-col rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/12 text-brand-600 dark:text-brand-300">
                <Icon className="h-4 w-4" />
              </span>
              <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-500 dark:bg-ink-800/70 dark:text-ink-400">
                {e.tag}
              </span>
            </div>
            <h4 className="mt-3 text-sm font-semibold text-ink-900 dark:text-white">
              {e.title}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {e.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 10. StackDiagram — LangChain vs LangGraph vs LangSmith              */
/* ------------------------------------------------------------------ */

const STACK = [
  {
    icon: Blocks,
    name: "LangChain",
    role: "Components & integrations",
    desc: "Chat models, tools, retrievers, and embeddings — the building blocks you plug into a graph.",
  },
  {
    icon: Workflow,
    name: "LangGraph",
    role: "Orchestration",
    desc: "Stateful graphs, control flow, persistence, and human-in-the-loop — how the pieces run together.",
  },
  {
    icon: Activity,
    name: "LangSmith",
    role: "Observability & evaluation",
    desc: "Tracing, datasets, evaluations, and monitoring — how you see and improve what your app does.",
  },
] as const;

export function StackDiagram() {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {STACK.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.name}
              className="flex flex-col rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/12 text-brand-600 dark:text-brand-300">
                <Icon className="h-4 w-4" />
              </span>
              <h4 className="mt-3 text-base font-bold text-ink-900 dark:text-white">
                {s.name}
              </h4>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {s.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Three independent tools that work well together — you can use any one
        without the others.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Shared: a small styled terminal-ish code block                      */
/* ------------------------------------------------------------------ */

function MiniCode({ lines }: { lines: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-ink-800 bg-ink-950 p-3.5 font-mono text-[13px] leading-relaxed">
      <code className="grid">
        {lines.map((l, i) => (
          <span
            key={i}
            className={
              l.trim().startsWith("#") ? "text-ink-500" : "text-ink-100"
            }
          >
            {l || " "}
          </span>
        ))}
      </code>
    </pre>
  );
}

/* ------------------------------------------------------------------ */
/* 11. VenvSetup — OS-aware virtual environment commands               */
/* ------------------------------------------------------------------ */

const VENV_TABS = [
  {
    id: "unix",
    label: "macOS / Linux",
    lines: [
      "# create the environment",
      "python3 -m venv .venv",
      "# activate it",
      "source .venv/bin/activate",
    ],
  },
  {
    id: "win",
    label: "Windows (PowerShell)",
    lines: [
      "# create the environment",
      "python -m venv .venv",
      "# activate it",
      ".venv\\Scripts\\Activate.ps1",
    ],
  },
] as const;

export function VenvSetup() {
  const [tab, setTab] = useState<string>("unix");
  const active = VENV_TABS.find((t) => t.id === tab) ?? VENV_TABS[0];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Terminal className="h-4 w-4 text-brand-500" />
        Create &amp; activate a virtual environment
      </span>

      <div className="mb-3 inline-flex rounded-xl border border-ink-200 bg-white/70 p-1 dark:border-ink-700 dark:bg-ink-900/60">
        {VENV_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
              tab === t.id
                ? "bg-brand-600 text-white shadow-sm"
                : "text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <MiniCode lines={[...active.lines]} />
      <figcaption className="mt-3 text-xs text-ink-400">
        Your prompt now shows <code className="font-mono">(.venv)</code>. Run{" "}
        <code className="font-mono">deactivate</code> to exit.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 12. ProviderPicker — install + env var + init line per provider     */
/* ------------------------------------------------------------------ */

const PROVIDERS = [
  {
    id: "anthropic",
    label: "Anthropic (Claude)",
    install: 'pip install -U "langchain[anthropic]"',
    env: "ANTHROPIC_API_KEY",
    model: "anthropic:claude-sonnet-5",
    note: null as string | null,
  },
  {
    id: "openai",
    label: "OpenAI",
    install: 'pip install -U "langchain[openai]"',
    env: "OPENAI_API_KEY",
    model: "openai:gpt-4o",
    note: null,
  },
  {
    id: "google",
    label: "Google Gemini",
    install: 'pip install -U "langchain[google-genai]"',
    env: "GOOGLE_API_KEY",
    model: "google_genai:gemini-2.0-flash",
    note: null,
  },
  {
    id: "ollama",
    label: "Ollama (local)",
    install: "pip install -U langchain-ollama",
    env: "— no key needed",
    model: "ollama:llama3.1",
    note: "Runs models locally via Ollama — no API key required.",
  },
] as const;

export function ProviderPicker() {
  const [id, setId] = useState<string>("anthropic");
  const p = PROVIDERS.find((x) => x.id === id) ?? PROVIDERS[0];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Sparkles className="h-4 w-4 text-brand-500" />
        Configure your model provider
      </span>

      <div className="mb-4 flex flex-wrap gap-2">
        {PROVIDERS.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setId(x.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
              id === x.id
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div key={id} className="animate-fade-up space-y-4">
        <div>
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400">
            <Download className="h-3.5 w-3.5" /> 1. Install
          </p>
          <MiniCode lines={[p.install]} />
        </div>
        <div>
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400">
            <KeyRound className="h-3.5 w-3.5" /> 2. Set your API key
          </p>
          {p.note ? (
            <p className="rounded-lg border border-ink-200/70 bg-white/60 p-3 text-sm text-ink-600 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-300">
              {p.note}
            </p>
          ) : (
            <MiniCode lines={[`export ${p.env}="sk-..."`]} />
          )}
        </div>
        <div>
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400">
            <Code2 className="h-3.5 w-3.5" /> 3. Initialise the model
          </p>
          <MiniCode
            lines={[
              "from langchain.chat_models import init_chat_model",
              "",
              `llm = init_chat_model("${p.model}")`,
            ]}
          />
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Pick a provider — the rest of the course code stays identical.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 13. ProjectTree — clickable recommended project structure           */
/* ------------------------------------------------------------------ */

const TREE: {
  d: number;
  name: string;
  kind: "folder" | "file";
  desc: string;
}[] = [
  { d: 0, name: "langgraph-course/", kind: "folder", desc: "The project root — everything lives here." },
  { d: 1, name: ".venv/", kind: "folder", desc: "Your virtual environment. Machine-specific — never commit it." },
  { d: 1, name: ".env", kind: "file", desc: "API keys and secrets. Listed in .gitignore — never commit it." },
  { d: 1, name: ".gitignore", kind: "file", desc: "Keeps .venv/ and .env out of version control." },
  { d: 1, name: "requirements.txt", kind: "file", desc: "Pinned dependencies so the project is reproducible." },
  { d: 1, name: "src/", kind: "folder", desc: "Your application code, split by responsibility." },
  { d: 2, name: "config.py", kind: "file", desc: "Loads environment variables and configures the model." },
  { d: 2, name: "state.py", kind: "file", desc: "State schemas (TypedDict / Pydantic) for your graphs." },
  { d: 2, name: "nodes.py", kind: "file", desc: "Node functions — the units of work in your graph." },
  { d: 2, name: "tools.py", kind: "file", desc: "Tool definitions the agent can call." },
  { d: 2, name: "graph.py", kind: "file", desc: "Builds, wires, and compiles the graph." },
  { d: 1, name: "notebooks/", kind: "folder", desc: "Jupyter notebooks for interactive exploration." },
  { d: 2, name: "explore.ipynb", kind: "file", desc: "A scratchpad to try graphs step by step." },
  { d: 1, name: "tests/", kind: "folder", desc: "Automated tests for your nodes and graphs." },
  { d: 2, name: "test_graph.py", kind: "file", desc: "Unit tests that keep the graph honest." },
];

export function ProjectTree() {
  const [sel, setSel] = useState<number>(5);
  const active = TREE[sel];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Folder className="h-4 w-4 text-brand-500" />
        Recommended project structure
      </span>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-ink-200/70 bg-ink-950 p-2 dark:border-ink-800/70">
          {TREE.map((row, i) => {
            const Icon = row.kind === "folder" ? Folder : FileCode;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSel(i)}
                style={{ paddingLeft: `${row.d * 18 + 10}px` }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md py-1.5 pr-2 text-left font-mono text-[13px] transition-colors",
                  sel === i
                    ? "bg-brand-500/20 text-white"
                    : "text-ink-300 hover:bg-white/5"
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    row.kind === "folder"
                      ? "text-brand-400"
                      : "text-ink-500"
                  )}
                />
                {row.name}
              </button>
            );
          })}
        </div>

        <div
          key={sel}
          className="animate-fade-up self-start rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 dark:bg-brand-500/10"
        >
          <p className="font-mono text-sm font-semibold text-ink-900 dark:text-white">
            {active.name}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {active.desc}
          </p>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Click any file or folder to see what it&apos;s for.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 14. ExecutionFlow — step through a graph and watch state build up   */
/* ------------------------------------------------------------------ */

const FLOW_NODES = ["START", "clean", "count", "summarize", "END"];

const FLOW_STEPS: {
  node: string;
  desc: string;
  state: [string, string][];
  changed: string[];
}[] = [
  {
    node: "START",
    desc: "Execution begins. The input you pass to the graph becomes the initial state.",
    state: [["text", '"  hello   world  "']],
    changed: ["text"],
  },
  {
    node: "clean",
    desc: "The clean node normalises whitespace and returns an update to the text channel.",
    state: [["text", '"hello world"']],
    changed: ["text"],
  },
  {
    node: "count",
    desc: "The count node reads text and returns a new word_count channel. Earlier values are kept.",
    state: [
      ["text", '"hello world"'],
      ["word_count", "2"],
    ],
    changed: ["word_count"],
  },
  {
    node: "summarize",
    desc: "The summarize node adds a human-readable summary, reading the values the earlier nodes produced.",
    state: [
      ["text", '"hello world"'],
      ["word_count", "2"],
      ["summary", '"2 words"'],
    ],
    changed: ["summary"],
  },
  {
    node: "END",
    desc: "No edges remain, so the graph stops and returns the final accumulated state to the caller.",
    state: [
      ["text", '"hello world"'],
      ["word_count", "2"],
      ["summary", '"2 words"'],
    ],
    changed: [],
  },
];

export function ExecutionFlow() {
  const [i, setI] = useState(0);
  const step = FLOW_STEPS[i];
  const atStart = i === 0;
  const atEnd = i === FLOW_STEPS.length - 1;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Play className="h-4 w-4 text-brand-500" />
          Graph execution, step by step
        </span>
        <span className="font-mono text-xs text-ink-400">
          super-step {i + 1} / {FLOW_STEPS.length}
        </span>
      </div>

      {/* node path */}
      <div className="flex flex-wrap items-center gap-1.5">
        {FLOW_NODES.map((n, idx) => {
          const isActive = n === step.node;
          const done = FLOW_NODES.indexOf(step.node) > idx;
          const terminal = n === "START" || n === "END";
          return (
            <span key={n} className="flex items-center gap-1.5">
              <span
                className={cn(
                  "rounded-lg border px-2.5 py-1.5 font-mono text-xs font-medium transition-all",
                  terminal ? "rounded-full" : "",
                  isActive
                    ? "border-brand-400/70 bg-brand-500/15 text-brand-700 shadow-sm dark:text-brand-200"
                    : done
                      ? "border-ink-200/70 bg-white/60 text-ink-400 dark:border-ink-800/70 dark:bg-ink-900/40"
                      : "border-ink-200/70 bg-white/40 text-ink-400 opacity-60 dark:border-ink-800/70 dark:bg-ink-900/30"
                )}
              >
                {n}
              </span>
              {idx < FLOW_NODES.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 text-ink-300" />
              )}
            </span>
          );
        })}
      </div>

      {/* state panel */}
      <div className="mt-4 rounded-xl border border-ink-800 bg-ink-950 p-4 font-mono text-[13px]">
        <p className="mb-2 text-ink-500">state = {"{"}</p>
        <div className="space-y-1 pl-4">
          {step.state.map(([k, v]) => {
            const isChanged = step.changed.includes(k);
            return (
              <div
                key={k}
                className={cn(
                  "flex items-center gap-2 rounded px-1.5 py-0.5",
                  isChanged ? "bg-brand-500/15" : ""
                )}
              >
                <span className="text-sky-300">{k}</span>
                <span className="text-ink-500">:</span>
                <span className="text-emerald-300">{v}</span>
                {isChanged && (
                  <span className="ml-1 rounded bg-brand-500/25 px-1.5 text-[10px] uppercase tracking-wide text-brand-200">
                    updated
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-ink-500">{"}"}</p>
      </div>

      <p
        key={i}
        className="mt-4 animate-fade-up rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 text-sm leading-relaxed text-ink-700 dark:bg-brand-500/10 dark:text-ink-200"
      >
        <span className="font-semibold text-ink-900 dark:text-white">
          {step.node}.
        </span>{" "}
        {step.desc}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={atStart}
          className="inline-flex items-center gap-1 rounded-lg border border-ink-200 px-3 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:border-brand-400/50 disabled:opacity-40 dark:border-ink-700 dark:text-ink-300"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={() => setI((v) => Math.min(FLOW_STEPS.length - 1, v + 1))}
          disabled={atEnd}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-40"
        >
          Next step <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setI(0)}
          className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 transition-colors hover:text-brand-600"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 15. GraphBuilder — assemble a first StateGraph step by step         */
/* ------------------------------------------------------------------ */

const BUILD_STEPS: {
  title: string;
  caption: string;
  lines: string[];
  nodes: string[];
  connected: boolean;
}[] = [
  {
    title: "Define the state",
    caption:
      "Start with the shape of your data. Every channel a node reads or writes goes here.",
    lines: [
      "from typing_extensions import TypedDict",
      "from langgraph.graph import StateGraph, START, END",
      "",
      "",
      "class State(TypedDict):",
      "    name: str",
      "    message: str",
    ],
    nodes: [],
    connected: false,
  },
  {
    title: "Write the nodes",
    caption:
      "Each node is a function: it reads the state and returns a partial update.",
    lines: [
      "",
      "",
      "def greet(state: State) -> dict:",
      '    return {"message": f"Hello, {state[\'name\']}!"}',
      "",
      "",
      "def shout(state: State) -> dict:",
      '    return {"message": state["message"].upper()}',
    ],
    nodes: [],
    connected: false,
  },
  {
    title: "Add the nodes to a builder",
    caption:
      "Create a StateGraph and register each function under a name. They exist now, but aren't wired together yet.",
    lines: [
      "",
      "",
      "builder = StateGraph(State)",
      'builder.add_node("greet", greet)',
      'builder.add_node("shout", shout)',
    ],
    nodes: ["greet", "shout"],
    connected: false,
  },
  {
    title: "Connect them with edges",
    caption:
      "Wire START to your first node, node to node, and the last node to END.",
    lines: [
      "",
      'builder.add_edge(START, "greet")',
      'builder.add_edge("greet", "shout")',
      'builder.add_edge("shout", END)',
    ],
    nodes: ["greet", "shout"],
    connected: true,
  },
  {
    title: "Compile",
    caption:
      "Turn the specification into a runnable graph. This validates the wiring.",
    lines: ["", "graph = builder.compile()"],
    nodes: ["greet", "shout"],
    connected: true,
  },
  {
    title: "Run it",
    caption:
      "Invoke with an initial state. The final state comes back as a dict.",
    lines: [
      "",
      'result = graph.invoke({"name": "Ada"})',
      'print(result["message"])  # "HELLO, ADA!"',
    ],
    nodes: ["greet", "shout"],
    connected: true,
  },
];

export function GraphBuilder() {
  const [i, setI] = useState(0);
  const current = BUILD_STEPS[i];

  // accumulate code lines up to the current step, tagged by owning step
  const lineItems: { text: string; step: number }[] = [];
  BUILD_STEPS.slice(0, i + 1).forEach((s, idx) =>
    s.lines.forEach((text) => lineItems.push({ text, step: idx }))
  );

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Workflow className="h-4 w-4 text-brand-500" />
          Build your first graph
        </span>
        <span className="font-mono text-xs text-ink-400">
          step {i + 1} / {BUILD_STEPS.length} · {current.title}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* accumulating code */}
        <pre className="overflow-x-auto rounded-lg border border-ink-800 bg-ink-950 p-3.5 font-mono text-[12.5px] leading-relaxed">
          <code className="grid">
            {lineItems.map((item, idx) => {
              const isCurrent = item.step === i;
              return (
                <span
                  key={idx}
                  className={cn(
                    "-mx-3.5 border-l-2 px-3.5",
                    isCurrent
                      ? "border-brand-500 bg-brand-500/10 text-ink-100"
                      : "border-transparent text-ink-400"
                  )}
                >
                  {item.text || " "}
                </span>
              );
            })}
          </code>
        </pre>

        {/* growing diagram */}
        <div className="flex flex-col justify-center rounded-lg border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40">
          {current.nodes.length === 0 ? (
            <p className="text-center text-xs text-ink-400">
              No nodes in the graph yet.
            </p>
          ) : current.connected ? (
            <div className="flex flex-col items-center gap-2">
              <Chip label="START" terminal />
              <Down />
              {current.nodes.map((n, idx) => (
                <span key={n} className="flex flex-col items-center gap-2">
                  <Chip label={n} />
                  {idx < current.nodes.length - 1 ? <Down /> : null}
                </span>
              ))}
              <Down />
              <Chip label="END" terminal />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-wrap justify-center gap-2">
                {current.nodes.map((n) => (
                  <Chip key={n} label={n} />
                ))}
              </div>
              <p className="mt-1 text-center text-[11px] text-ink-400">
                nodes added — not wired yet
              </p>
            </div>
          )}
        </div>
      </div>

      <p
        key={i}
        className="mt-4 animate-fade-up rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 text-sm leading-relaxed text-ink-700 dark:bg-brand-500/10 dark:text-ink-200"
      >
        <span className="font-semibold text-ink-900 dark:text-white">
          {current.title}.
        </span>{" "}
        {current.caption}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-ink-200 px-3 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:border-brand-400/50 disabled:opacity-40 dark:border-ink-700 dark:text-ink-300"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={() => setI((v) => Math.min(BUILD_STEPS.length - 1, v + 1))}
          disabled={i === BUILD_STEPS.length - 1}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-40"
        >
          Next step <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setI(0)}
          className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 transition-colors hover:text-brand-600"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </figure>
  );
}

function Chip({ label, terminal }: { label: string; terminal?: boolean }) {
  return (
    <span
      className={cn(
        "border px-3 py-1.5 font-mono text-xs font-semibold",
        terminal
          ? "rounded-full border-brand-500/60 bg-white text-brand-600 dark:bg-ink-900 dark:text-brand-300"
          : "rounded-lg border-brand-400/60 bg-brand-500/10 text-ink-800 dark:text-ink-100"
      )}
    >
      {label}
    </span>
  );
}

function Down() {
  return <span className="h-4 w-px bg-brand-400/50" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* 16. StateMerge — how a partial update merges into the state         */
/* ------------------------------------------------------------------ */

const MERGE_CHANNELS = [
  { key: "query", current: '"hi"', update: '"hello there"' },
  { key: "count", current: "1", update: "2" },
  { key: "status", current: '"pending"', update: '"done"' },
];

export function StateMerge() {
  const [included, setIncluded] = useState<string[]>(["count", "status"]);
  const toggle = (k: string) =>
    setIncluded((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <GitMerge className="h-4 w-4 text-brand-500" />
        How a partial update merges
      </span>

      <p className="mb-4 text-sm text-ink-500 dark:text-ink-400">
        Toggle which channels the node returns, and watch how the state merges.
      </p>

      <div className="grid gap-3 lg:grid-cols-3">
        {/* current */}
        <div className="rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
            Current state
          </p>
          <div className="space-y-1 font-mono text-[13px]">
            {MERGE_CHANNELS.map((c) => (
              <div key={c.key} className="text-ink-600 dark:text-ink-300">
                <span className="text-sky-500 dark:text-sky-300">{c.key}</span>
                <span className="text-ink-400">: </span>
                <span className="text-emerald-600 dark:text-emerald-300">
                  {c.current}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* node returns */}
        <div className="rounded-xl border border-brand-400/40 bg-brand-500/5 p-4 dark:bg-brand-500/10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
            Node returns
          </p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {MERGE_CHANNELS.map((c) => {
              const on = included.includes(c.key);
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => toggle(c.key)}
                  className={cn(
                    "rounded-md border px-2 py-1 font-mono text-[11px] transition-all",
                    on
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-ink-300 text-ink-400 line-through dark:border-ink-600"
                  )}
                >
                  {c.key}
                </button>
              );
            })}
          </div>
          <div className="font-mono text-[13px]">
            <span className="text-ink-400">return {"{"}</span>
            {MERGE_CHANNELS.filter((c) => included.includes(c.key)).map((c) => (
              <div key={c.key} className="pl-4 text-ink-700 dark:text-ink-200">
                <span className="text-sky-500 dark:text-sky-300">{c.key}</span>
                <span className="text-ink-400">: </span>
                <span className="text-emerald-600 dark:text-emerald-300">
                  {c.update}
                </span>
                <span className="text-ink-400">,</span>
              </div>
            ))}
            <span className="text-ink-400">{"}"}</span>
          </div>
        </div>

        {/* merged */}
        <div className="rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
            New state
          </p>
          <div className="space-y-1 font-mono text-[13px]">
            {MERGE_CHANNELS.map((c) => {
              const changed = included.includes(c.key);
              return (
                <div
                  key={c.key}
                  className={cn(
                    "flex items-center gap-1.5 rounded px-1.5 py-0.5",
                    changed ? "bg-brand-500/15" : ""
                  )}
                >
                  <span className="text-sky-500 dark:text-sky-300">{c.key}</span>
                  <span className="text-ink-400">:</span>
                  <span className="text-emerald-600 dark:text-emerald-300">
                    {changed ? c.update : c.current}
                  </span>
                  <span
                    className={cn(
                      "ml-auto rounded px-1.5 text-[10px] uppercase tracking-wide",
                      changed
                        ? "bg-brand-500/25 text-brand-700 dark:text-brand-200"
                        : "text-ink-400"
                    )}
                  >
                    {changed ? "updated" : "kept"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Only the channels a node returns change. Everything else is preserved.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 17. StateScopes — input, internal, and output state                 */
/* ------------------------------------------------------------------ */

const SCOPE_CHANNELS = [
  { key: "question", scope: "input", desc: "Provided by the caller when the graph is invoked." },
  { key: "documents", scope: "internal", desc: "Fetched mid-run; useful between nodes, never exposed." },
  { key: "draft", scope: "internal", desc: "A working scratchpad passed node to node." },
  { key: "answer", scope: "output", desc: "Returned to the caller as the result." },
];

const SCOPE_TABS = [
  { id: "all", label: "All channels" },
  { id: "input", label: "Input" },
  { id: "internal", label: "Internal" },
  { id: "output", label: "Output" },
] as const;

const SCOPE_BADGE: Record<string, string> = {
  input: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  internal: "bg-ink-200 text-ink-600 dark:bg-ink-800 dark:text-ink-300",
  output: "bg-brand-500/15 text-brand-700 dark:text-brand-300",
};

export function StateScopes() {
  const [tab, setTab] = useState<string>("all");
  const on = (scope: string) => tab === "all" || tab === scope;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Layers className="h-4 w-4 text-brand-500" />
        Input, internal &amp; output state
      </span>

      <div className="mb-4 flex flex-wrap gap-2">
        {SCOPE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
              tab === t.id
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {SCOPE_CHANNELS.map((c) => (
          <div
            key={c.key}
            style={{ opacity: on(c.scope) ? 1 : 0.3, transition: "opacity .3s" }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-ink-200/70 bg-white/60 p-3 dark:border-ink-800/70 dark:bg-ink-900/40"
          >
            <span className="font-mono text-sm font-semibold text-ink-800 dark:text-ink-100">
              {c.key}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium capitalize",
                SCOPE_BADGE[c.scope]
              )}
            >
              {c.scope}
            </span>
            <span className="w-full text-sm text-ink-500 dark:text-ink-400 sm:w-auto sm:flex-1">
              {c.desc}
            </span>
          </div>
        ))}
      </div>

      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Separate input and output schemas let callers see only what they need —
        internal channels stay hidden.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 18. NodeAnatomy — dissect a node function part by part              */
/* ------------------------------------------------------------------ */

const NODE_LINES: { text: string; part: string }[] = [
  { text: "def summarize(state: State) -> dict:", part: "signature" },
  { text: '    text = state["text"]', part: "read" },
  { text: '    prompt = f"Summarize this:\\n\\n{text}"', part: "work" },
  { text: "    response = llm.invoke(prompt)", part: "work" },
  { text: '    return {"summary": response.content}', part: "return" },
];

const NODE_PARTS = [
  {
    key: "signature",
    label: "Signature",
    desc: "A node is just a function. It receives the current state and is annotated to return a dict — a partial update. The name you give it in add_node() is how edges refer to it.",
  },
  {
    key: "read",
    label: "Read state",
    desc: "Read the channels you need from the state. With a TypedDict that's dictionary access; use .get() when a value might be missing.",
  },
  {
    key: "work",
    label: "Do the work",
    desc: "The body does the real work — build a prompt, call a model, run a tool, or compute a value. This is where your application logic lives.",
  },
  {
    key: "return",
    label: "Return an update",
    desc: "Return a dict of only the channels you changed. LangGraph merges it into the state and follows the edges to the next node.",
  },
] as const;

export function NodeAnatomy() {
  const [sel, setSel] = useState<string>("signature");
  const active = NODE_PARTS.find((p) => p.key === sel) ?? NODE_PARTS[0];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Code2 className="h-4 w-4 text-brand-500" />
        Anatomy of a node
      </span>

      <pre className="overflow-x-auto rounded-lg border border-ink-800 bg-ink-950 p-3.5 font-mono text-[13px] leading-relaxed">
        <code className="grid">
          {NODE_LINES.map((line, idx) => {
            const on = line.part === sel;
            return (
              <span
                key={idx}
                onMouseEnter={() => setSel(line.part)}
                className={cn(
                  "-mx-3.5 cursor-pointer border-l-2 px-3.5 transition-colors",
                  on
                    ? "border-brand-500 bg-brand-500/15 text-ink-100"
                    : "border-transparent text-ink-400 hover:bg-white/5"
                )}
              >
                {line.text}
              </span>
            );
          })}
        </code>
      </pre>

      <div className="mt-4 flex flex-wrap gap-2">
        {NODE_PARTS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setSel(p.key)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
              sel === p.key
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p
        key={sel}
        className="mt-4 animate-fade-up rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 text-sm leading-relaxed text-ink-700 dark:bg-brand-500/10 dark:text-ink-200"
      >
        <span className="font-semibold text-ink-900 dark:text-white">
          {active.label}.
        </span>{" "}
        {active.desc}
      </p>
      <figcaption className="mt-3 text-center text-xs text-ink-400">
        Hover or click a line to dissect the node.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 19. ConditionalRouter — pick an input, watch it route              */
/* ------------------------------------------------------------------ */

const ROUTER_EXAMPLES = [
  { text: "How do I reset my password?", category: "question", branch: "answer" },
  { text: "This product is broken and I'm furious!", category: "complaint", branch: "escalate" },
  { text: "You WON $1000!!! Click here now →", category: "spam", branch: "discard" },
];

const ROUTER_BRANCHES = [
  { key: "answer", desc: "Reply with a helpful answer." },
  { key: "escalate", desc: "Hand off to a human agent." },
  { key: "discard", desc: "Drop it and stop." },
];

export function ConditionalRouter() {
  const [i, setI] = useState(0);
  const chosen = ROUTER_EXAMPLES[i];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <GitBranch className="h-4 w-4 text-brand-500" />
        A conditional edge in action
      </span>

      <p className="mb-3 text-sm text-ink-500 dark:text-ink-400">
        Pick an incoming message. The classify node runs, then a routing
        function decides which branch handles it.
      </p>

      <div className="mb-4 flex flex-col gap-2">
        {ROUTER_EXAMPLES.map((ex, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "rounded-lg border px-3 py-2 text-left text-sm transition-all",
              i === idx
                ? "border-brand-400/60 bg-brand-500/10 text-ink-900 dark:text-white"
                : "border-ink-200/70 bg-white/60 text-ink-600 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-300"
            )}
          >
            &ldquo;{ex.text}&rdquo;
          </button>
        ))}
      </div>

      {/* routing readout */}
      <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="rounded-lg border border-brand-400/60 bg-brand-500/10 px-2.5 py-1 font-semibold text-brand-700 dark:text-brand-200">
          classify
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-ink-400" />
        <span className="text-ink-500">route(state) →</span>
        <span className="rounded bg-ink-900 px-2 py-1 text-emerald-300">
          &quot;{chosen.branch}&quot;
        </span>
        <span className="text-ink-400">(category: {chosen.category})</span>
      </div>

      {/* branches */}
      <div className="grid gap-2 sm:grid-cols-3">
        {ROUTER_BRANCHES.map((b) => {
          const active = b.key === chosen.branch;
          return (
            <div
              key={b.key}
              className={cn(
                "rounded-xl border p-3 transition-all",
                active
                  ? "border-brand-400/70 bg-brand-500/10 shadow-sm shadow-brand-500/10"
                  : "border-ink-200/70 bg-white/40 opacity-50 dark:border-ink-800/70 dark:bg-ink-900/30"
              )}
            >
              <p
                className={cn(
                  "font-mono text-sm font-semibold",
                  active
                    ? "text-brand-700 dark:text-brand-200"
                    : "text-ink-600 dark:text-ink-300"
                )}
              >
                {b.key}
              </p>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Same graph, different path — the routing function chooses at run time.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 20. LoopStepper — run a loop until its exit condition is met        */
/* ------------------------------------------------------------------ */

const LOOP_SCORES = [5, 7, 9];
const LOOP_THRESHOLD = 8;
const LOOP_MAX = 5;

export function LoopStepper() {
  const [it, setIt] = useState(0); // iterations completed

  const iterations = LOOP_SCORES.slice(0, it).map((score, idx) => ({
    attempt: idx + 1,
    score,
    done: score >= LOOP_THRESHOLD,
  }));
  const last = iterations[iterations.length - 1];
  const finished = (last?.done ?? false) || it >= LOOP_SCORES.length;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <RefreshCw className="h-4 w-4 text-brand-500" />
          A loop with an exit condition
        </span>
        <span className="font-mono text-xs text-ink-400">
          exit when score ≥ {LOOP_THRESHOLD} · max {LOOP_MAX} attempts
        </span>
      </div>

      {/* node path */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5 font-mono text-xs">
        <span className="rounded-lg border border-brand-400/60 bg-brand-500/10 px-2.5 py-1.5 text-brand-700 dark:text-brand-200">
          generate
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-ink-400" />
        <span className="rounded-lg border border-brand-400/60 bg-brand-500/10 px-2.5 py-1.5 text-brand-700 dark:text-brand-200">
          evaluate
        </span>
        <span className="inline-flex items-center gap-1 text-ink-400">
          <RefreshCw className="h-3.5 w-3.5" /> or
        </span>
        <span className="rounded-full border border-brand-500/60 bg-white px-2.5 py-1 text-brand-600 dark:bg-ink-900 dark:text-brand-300">
          END
        </span>
      </div>

      {/* iteration log */}
      <div className="space-y-2">
        {iterations.length === 0 ? (
          <p className="rounded-lg border border-dashed border-ink-300/60 p-4 text-center text-sm text-ink-400 dark:border-ink-700">
            Press <span className="font-medium">Run iteration</span> to start the loop.
          </p>
        ) : (
          iterations.map((r) => (
            <div
              key={r.attempt}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-ink-200/70 bg-white/60 p-3 text-sm dark:border-ink-800/70 dark:bg-ink-900/40"
            >
              <span className="font-mono text-xs text-ink-400">
                attempt {r.attempt}
              </span>
              <span className="text-ink-700 dark:text-ink-200">
                score = <span className="font-semibold">{r.score}</span>
              </span>
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-[11px] font-medium",
                  r.done
                    ? "bg-brand-500/15 text-brand-700 dark:text-brand-300"
                    : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                )}
              >
                {r.done
                  ? `${r.score} ≥ ${LOOP_THRESHOLD} → done → END`
                  : `${r.score} < ${LOOP_THRESHOLD} → loop back to generate`}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIt((v) => Math.min(LOOP_SCORES.length, v + 1))}
          disabled={finished}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-40"
        >
          <Play className="h-4 w-4" /> Run iteration
        </button>
        {finished && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-300">
            <Check className="h-4 w-4" /> Loop exited
          </span>
        )}
        <button
          type="button"
          onClick={() => setIt(0)}
          className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 transition-colors hover:text-brand-600"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
      <figcaption className="mt-3 text-xs text-ink-400">
        The routing function returns <code className="font-mono">END</code> once
        the score clears the threshold — otherwise it loops back. The max-attempts
        guard (and LangGraph&apos;s recursion limit) prevent an infinite loop.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 21. MessageTypes — explore the four message roles                   */
/* ------------------------------------------------------------------ */

const MESSAGE_ROLES = [
  {
    key: "system",
    label: "System",
    icon: Settings,
    cls: "SystemMessage",
    example: "You are a friendly support assistant for Acme Corp.",
    desc: "Sets the assistant's behaviour and ground rules. Usually comes first, and is hidden from the end user.",
  },
  {
    key: "human",
    label: "Human",
    icon: User,
    cls: "HumanMessage",
    example: "How do I reset my password?",
    desc: "A message from the user — their question or instruction.",
  },
  {
    key: "ai",
    label: "AI",
    icon: Bot,
    cls: "AIMessage",
    example: "Go to Settings → Security → Reset password.",
    desc: "The model's reply. It can contain text, tool calls, or both.",
  },
  {
    key: "tool",
    label: "Tool",
    icon: Wrench,
    cls: "ToolMessage",
    example: '{"status": "reset_link_sent"}',
    desc: "The result of a tool the AI asked to run, fed back so the model can use it.",
  },
] as const;

export function MessageTypes() {
  const [sel, setSel] = useState<string>("system");
  const role = MESSAGE_ROLES.find((r) => r.key === sel) ?? MESSAGE_ROLES[0];
  const Icon = role.icon;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <MessageSquare className="h-4 w-4 text-brand-500" />
        The four message types
      </span>

      <div className="mb-4 flex flex-wrap gap-2">
        {MESSAGE_ROLES.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setSel(r.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
              sel === r.key
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div key={sel} className="animate-fade-up">
        {/* message bubble */}
        <div className="flex items-start gap-3 rounded-xl border border-ink-200/70 bg-white/70 p-4 dark:border-ink-800/70 dark:bg-ink-900/50">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/12 text-brand-600 dark:text-brand-300">
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <span className="rounded-md bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] text-ink-600 dark:bg-ink-800 dark:text-ink-300">
              {role.cls}
            </span>
            <p className="mt-2 break-words font-mono text-sm text-ink-800 dark:text-ink-100">
              {role.example}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {role.desc}
        </p>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 22. ContextWindow — watch a conversation fill the context budget    */
/* ------------------------------------------------------------------ */

const TURN_COST = 12;
const CTX_CAPACITY = 100;

export function ContextWindow() {
  const [turns, setTurns] = useState(0);
  const [strategy, setStrategy] = useState<"all" | "trim" | "summarize">("all");

  const used =
    strategy === "all"
      ? turns * TURN_COST
      : strategy === "trim"
        ? Math.min(turns, 4) * TURN_COST
        : turns > 0
          ? 8 + Math.min(turns, 2) * TURN_COST
          : 0;

  const pct = Math.min((used / CTX_CAPACITY) * 100, 100);
  const over = used > CTX_CAPACITY;
  const barColor = over
    ? "bg-rose-500"
    : pct >= 75
      ? "bg-amber-500"
      : "bg-brand-500";

  const STRATS = [
    { id: "all", label: "Keep everything" },
    { id: "trim", label: "Trim to last 4" },
    { id: "summarize", label: "Summarize older" },
  ] as const;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Gauge className="h-4 w-4 text-brand-500" />
          The context window fills up
        </span>
        <span className="font-mono text-xs text-ink-400">
          {turns} turns · ~{used}/{CTX_CAPACITY}
        </span>
      </div>

      {/* meter */}
      <div className="h-4 w-full overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
        <div
          className={cn("h-full rounded-full transition-all duration-300", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      {over ? (
        <p className="mt-2 text-xs font-medium text-rose-600 dark:text-rose-400">
          Context budget exceeded — the model will error or silently truncate.
        </p>
      ) : (
        <p className="mt-2 text-xs text-ink-400">
          Every turn adds messages. Leave headroom for the model&apos;s reply.
        </p>
      )}

      {/* strategy */}
      <div className="mt-4 flex flex-wrap gap-2">
        {STRATS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStrategy(s.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
              strategy === s.id
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTurns((v) => v + 1)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          <MessageSquare className="h-4 w-4" /> Add a turn
        </button>
        <button
          type="button"
          onClick={() => setTurns(0)}
          className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 transition-colors hover:text-brand-600"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <figcaption className="mt-3 text-xs text-ink-400">
        {strategy === "all"
          ? "Keeping the full history grows without bound — eventually it overflows."
          : strategy === "trim"
            ? "Trimming keeps only the most recent turns, so usage stays bounded."
            : "Summarizing condenses older turns into a short recap, preserving context cheaply."}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 23. ToolLoop — step through the model–tool loop                     */
/* ------------------------------------------------------------------ */

const TOOL_STEPS: {
  active: "user" | "agent" | "tools";
  note: string;
  msg: { role: "Human" | "AI" | "Tool"; text: string; tool?: boolean };
  end?: boolean;
}[] = [
  {
    active: "user",
    note: "The user asks a question that needs a calculation.",
    msg: { role: "Human", text: "What is 15 × 24?" },
  },
  {
    active: "agent",
    note: "The model decides it needs the calculator and emits a tool call — it doesn't answer yet.",
    msg: { role: "AI", text: 'calculator(expression="15 * 24")', tool: true },
  },
  {
    active: "tools",
    note: "The tools node runs the calculator and feeds the result back as a ToolMessage.",
    msg: { role: "Tool", text: "360" },
  },
  {
    active: "agent",
    note: "The model reads the result and writes the final answer. No more tool calls, so the graph ends.",
    msg: { role: "AI", text: "15 × 24 = 360." },
    end: true,
  },
];

const MSG_STYLE: Record<string, { icon: typeof User; tone: string }> = {
  Human: { icon: User, tone: "border-sky-500/40 bg-sky-500/5" },
  AI: { icon: Bot, tone: "border-brand-500/40 bg-brand-500/5" },
  Tool: { icon: Wrench, tone: "border-amber-500/40 bg-amber-500/5" },
};

export function ToolLoop() {
  const [i, setI] = useState(0);
  const step = TOOL_STEPS[i];
  const shown = TOOL_STEPS.slice(0, i + 1);

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Wrench className="h-4 w-4 text-brand-500" />
          The model–tool loop
        </span>
        <span className="font-mono text-xs text-ink-400">
          step {i + 1} / {TOOL_STEPS.length}
        </span>
      </div>

      {/* node indicator */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5 font-mono text-xs">
        <span
          className={cn(
            "rounded-lg border px-2.5 py-1.5 transition-all",
            step.active === "agent"
              ? "border-brand-400/70 bg-brand-500/15 text-brand-700 dark:text-brand-200"
              : "border-ink-200/70 bg-white/50 text-ink-400 dark:border-ink-800/70 dark:bg-ink-900/40"
          )}
        >
          agent
        </span>
        <span className="inline-flex items-center gap-1 text-ink-400">
          <RefreshCw className="h-3.5 w-3.5" />
        </span>
        <span
          className={cn(
            "rounded-lg border px-2.5 py-1.5 transition-all",
            step.active === "tools"
              ? "border-brand-400/70 bg-brand-500/15 text-brand-700 dark:text-brand-200"
              : "border-ink-200/70 bg-white/50 text-ink-400 dark:border-ink-800/70 dark:bg-ink-900/40"
          )}
        >
          tools
        </span>
        {step.end && (
          <>
            <ArrowRight className="h-3.5 w-3.5 text-ink-400" />
            <span className="rounded-full border border-brand-500/60 bg-white px-2.5 py-1 text-brand-600 dark:bg-ink-900 dark:text-brand-300">
              END
            </span>
          </>
        )}
      </div>

      {/* messages */}
      <div className="space-y-2">
        {shown.map((s, idx) => {
          const style = MSG_STYLE[s.msg.role];
          const Icon = style.icon;
          return (
            <div
              key={idx}
              className={cn(
                "flex items-start gap-2.5 rounded-xl border p-3",
                style.tone,
                idx === i ? "animate-fade-up" : ""
              )}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/70 text-ink-500 dark:bg-ink-900/70">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <span className="font-mono text-[11px] uppercase tracking-wide text-ink-400">
                  {s.msg.role}
                  {s.msg.tool ? " · tool call" : ""}
                </span>
                <p className="break-words font-mono text-[13px] text-ink-800 dark:text-ink-100">
                  {s.msg.tool ? "→ " : ""}
                  {s.msg.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p
        key={i}
        className="mt-4 rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 text-sm leading-relaxed text-ink-700 dark:bg-brand-500/10 dark:text-ink-200"
      >
        {step.note}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-ink-200 px-3 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:border-brand-400/50 disabled:opacity-40 dark:border-ink-700 dark:text-ink-300"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={() => setI((v) => Math.min(TOOL_STEPS.length - 1, v + 1))}
          disabled={i === TOOL_STEPS.length - 1}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-40"
        >
          Next step <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setI(0)}
          className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 transition-colors hover:text-brand-600"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 24. ThreadSwitcher — each thread_id is an isolated conversation     */
/* ------------------------------------------------------------------ */

const THREADS = [
  {
    id: "customer-123",
    label: "Ada",
    msgs: [
      { role: "Human", text: "Hi, my order 42 is late." },
      { role: "AI", text: "Sorry! Order 42 shipped yesterday and arrives tomorrow." },
      { role: "Human", text: "What order number was that again?" },
      { role: "AI", text: "Order 42." },
    ],
  },
  {
    id: "customer-456",
    label: "Ben",
    msgs: [
      { role: "Human", text: "Do you sell replacement cables?" },
      { role: "AI", text: "Yes — the USB-C cable is $9." },
    ],
  },
  { id: "customer-789", label: "New", msgs: [] as { role: string; text: string }[] },
];

export function ThreadSwitcher() {
  const [id, setId] = useState(THREADS[0].id);
  const thread = THREADS.find((t) => t.id === id) ?? THREADS[0];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <MessageSquare className="h-4 w-4 text-brand-500" />
        One graph, many threads
      </span>

      <div className="mb-3 flex flex-wrap gap-2">
        {THREADS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setId(t.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all",
              id === t.id
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {t.id}
          </button>
        ))}
      </div>

      <p className="mb-3 font-mono text-xs text-ink-400">
        config = {`{"configurable": {"thread_id": `}
        <span className="text-emerald-500 dark:text-emerald-300">
          &quot;{thread.id}&quot;
        </span>
        {`}}`}
      </p>

      <div
        key={id}
        className="animate-fade-up space-y-2 rounded-xl border border-ink-200/70 bg-white/50 p-3 dark:border-ink-800/70 dark:bg-ink-900/40"
      >
        {thread.msgs.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink-400">
            No history yet — a fresh conversation starts here.
          </p>
        ) : (
          thread.msgs.map((m, idx) => (
            <div
              key={idx}
              className={cn(
                "flex gap-2 text-sm",
                m.role === "Human" ? "" : "flex-row-reverse text-right"
              )}
            >
              <span
                className={cn(
                  "max-w-[80%] rounded-xl px-3 py-1.5",
                  m.role === "Human"
                    ? "bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200"
                    : "bg-brand-500/15 text-ink-800 dark:text-ink-100"
                )}
              >
                {m.text}
              </span>
            </div>
          ))
        )}
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Switch threads — the checkpointer restores each conversation&apos;s own
        history. They never mix.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 25. MemoryTiers — short-term vs long-term memory                    */
/* ------------------------------------------------------------------ */

const TIERS = {
  short: {
    scope: "One conversation (a single thread)",
    backed: "Checkpointer",
    lifetime: "Lives with the thread",
    example: "“Earlier you said your order was #42.”",
  },
  long: {
    scope: "Across all conversations (a user)",
    backed: "Store",
    lifetime: "Persists indefinitely",
    example: "“Welcome back, Ada — still prefer email updates?”",
  },
} as const;

export function MemoryTiers() {
  const [tier, setTier] = useState<"short" | "long">("short");
  const t = TIERS[tier];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Database className="h-4 w-4 text-brand-500" />
        Short-term vs long-term memory
      </span>

      <div className="mb-4 inline-flex rounded-xl border border-ink-200 bg-white/70 p-1 dark:border-ink-700 dark:bg-ink-900/60">
        {(["short", "long"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setTier(k)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
              tier === k
                ? "bg-brand-600 text-white shadow-sm"
                : "text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
            )}
          >
            {k === "short" ? "Short-term" : "Long-term"}
          </button>
        ))}
      </div>

      {/* scope visual */}
      <div className="mb-4 rounded-xl border border-ink-200/70 bg-white/50 p-4 dark:border-ink-800/70 dark:bg-ink-900/40">
        {tier === "short" ? (
          <div className="flex items-center justify-center gap-2">
            <span className="rounded-lg border border-brand-400/60 bg-brand-500/10 px-4 py-2 font-mono text-xs text-brand-700 dark:text-brand-200">
              thread
            </span>
            <span className="text-xs text-ink-400">→ its own saved history</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap justify-center gap-2">
              {["thread A", "thread B", "thread C"].map((th) => (
                <span
                  key={th}
                  className="rounded-lg border border-ink-200/70 bg-white/70 px-3 py-1.5 font-mono text-xs text-ink-500 dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-300"
                >
                  {th}
                </span>
              ))}
            </div>
            <span className="text-xs text-ink-400">↓ all share ↓</span>
            <span className="rounded-lg border border-brand-400/60 bg-brand-500/10 px-4 py-2 font-mono text-xs text-brand-700 dark:text-brand-200">
              long-term store
            </span>
          </div>
        )}
      </div>

      <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
        <Row k="Scope" v={t.scope} />
        <Row k="Backed by" v={t.backed} mono />
        <Row k="Lifetime" v={t.lifetime} />
        <Row k="Feels like" v={t.example} />
      </dl>
    </figure>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <>
      <dt className="font-medium text-ink-400">{k}</dt>
      <dd
        className={cn(
          "text-ink-800 dark:text-ink-100",
          mono ? "font-mono text-[13px]" : ""
        )}
      >
        {v}
      </dd>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 26. TokenStream — streaming vs batch, live                          */
/* ------------------------------------------------------------------ */

const STREAM_ANSWER =
  "LangGraph streams tokens as the model generates them, so the answer appears in real time instead of making the user wait for the whole thing.";

export function TokenStream() {
  const [mode, setMode] = useState<"stream" | "batch">("stream");
  const [shown, setShown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const words = STREAM_ANSWER.split(" ");

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearAll(), []);

  function run() {
    clearAll();
    setShown(0);
    setDone(false);
    setLoading(false);
    if (mode === "stream") {
      words.forEach((_, idx) => {
        timers.current.push(
          setTimeout(() => {
            setShown(idx + 1);
            if (idx === words.length - 1) setDone(true);
          }, 65 * (idx + 1))
        );
      });
    } else {
      setLoading(true);
      timers.current.push(
        setTimeout(() => {
          setLoading(false);
          setShown(words.length);
          setDone(true);
        }, 1900)
      );
    }
  }

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Zap className="h-4 w-4 text-brand-500" />
        Streaming vs. waiting
      </span>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-ink-200 bg-white/70 p-1 dark:border-ink-700 dark:bg-ink-900/60">
          {(["stream", "batch"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                clearAll();
                setShown(0);
                setDone(false);
                setLoading(false);
              }}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
                mode === m
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
              )}
            >
              {m === "stream" ? "With streaming" : "Without streaming"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={run}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          <Play className="h-4 w-4" /> Run
        </button>
      </div>

      <div className="min-h-[7rem] rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40">
        {loading ? (
          <span className="inline-flex items-center gap-2 text-sm text-ink-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Generating… (nothing to
            show yet)
          </span>
        ) : shown === 0 ? (
          <span className="text-sm text-ink-400">
            Press <span className="font-medium">Run</span> to compare the two.
          </span>
        ) : (
          <p className="text-[15px] leading-relaxed text-ink-800 dark:text-ink-100">
            {words.slice(0, shown).join(" ")}
            {mode === "stream" && !done && (
              <span className="ml-0.5 inline-block h-4 w-1.5 -translate-y-px animate-pulse bg-brand-500 align-middle" />
            )}
          </p>
        )}
      </div>

      <figcaption className="mt-3 text-xs text-ink-400">
        {mode === "stream"
          ? "First words appear in a fraction of a second — the wait feels instant."
          : "Nothing appears until the whole response is ready — the user stares at a spinner."}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 28. TraceViewer — a LangSmith-style execution trace                 */
/* ------------------------------------------------------------------ */

const TRACE_SPANS = [
  {
    d: 0,
    name: "agent_graph",
    type: "chain",
    ms: 1680,
    detail: { input: 'HumanMessage("Weather in Paris?")', output: "4 messages", tokens: "—" },
  },
  {
    d: 1,
    name: "agent (llm)",
    type: "llm",
    ms: 820,
    detail: {
      input: '[HumanMessage("Weather in Paris?")]',
      output: "AIMessage(tool_calls=[get_weather])",
      tokens: "340 in · 45 out",
    },
  },
  {
    d: 1,
    name: "tools · get_weather",
    type: "tool",
    ms: 210,
    detail: { input: '{"city": "Paris"}', output: '"18°C, sunny"', tokens: "—" },
  },
  {
    d: 1,
    name: "agent (llm)",
    type: "llm",
    ms: 610,
    detail: {
      input: "[…conversation with tool result]",
      output: 'AIMessage("It\'s 18°C and sunny in Paris.")',
      tokens: "400 in · 30 out",
    },
  },
];

const SPAN_BADGE: Record<string, string> = {
  chain: "bg-ink-200 text-ink-600 dark:bg-ink-800 dark:text-ink-300",
  llm: "bg-brand-500/15 text-brand-700 dark:text-brand-300",
  tool: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
};

const SPAN_ICON: Record<string, typeof Brain> = {
  chain: Workflow,
  llm: Brain,
  tool: Wrench,
};

export function TraceViewer() {
  const [sel, setSel] = useState(1);
  const maxMs = Math.max(...TRACE_SPANS.map((s) => s.ms));
  const span = TRACE_SPANS[sel];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Activity className="h-4 w-4 text-brand-500" />
        An execution trace
      </span>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        {/* span tree */}
        <div className="space-y-1">
          {TRACE_SPANS.map((s, i) => {
            const Icon = SPAN_ICON[s.type];
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSel(i)}
                style={{ paddingLeft: `${s.d * 18 + 8}px` }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg border py-2 pr-2 text-left transition-all",
                  sel === i
                    ? "border-brand-400/60 bg-brand-500/10"
                    : "border-transparent hover:bg-white/5"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-ink-400" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-mono text-[12.5px] text-ink-800 dark:text-ink-100">
                      {s.name}
                    </span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] font-medium uppercase",
                        SPAN_BADGE[s.type]
                      )}
                    >
                      {s.type}
                    </span>
                  </span>
                  <span className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
                      <span
                        className="block h-full rounded-full bg-brand-500/70"
                        style={{ width: `${(s.ms / maxMs) * 100}%` }}
                      />
                    </span>
                    <span className="font-mono text-[10px] text-ink-400">
                      {s.ms}ms
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* detail */}
        <div
          key={sel}
          className="animate-fade-up self-start rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40"
        >
          <p className="font-mono text-sm font-semibold text-ink-900 dark:text-white">
            {span.name}
          </p>
          <dl className="mt-3 space-y-2 text-[13px]">
            <TraceRow k="latency" v={`${span.ms} ms`} />
            <TraceRow k="tokens" v={span.detail.tokens} />
            <TraceRow k="input" v={span.detail.input} mono />
            <TraceRow k="output" v={span.detail.output} mono />
          </dl>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Click a span. A trace shows every node, model, and tool call — with its
        inputs, outputs, latency, and tokens.
      </figcaption>
    </figure>
  );
}

function TraceRow({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-400">
        {k}
      </dt>
      <dd
        className={cn(
          "mt-0.5 break-words text-ink-700 dark:text-ink-200",
          mono ? "font-mono text-[12px]" : ""
        )}
      >
        {v}
      </dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 29. RedactionToggle — never log secrets                             */
/* ------------------------------------------------------------------ */

export function RedactionToggle() {
  const [redact, setRedact] = useState(true);

  const raw = `INFO node=fetch input={"api_key": "sk-ant-9f3a2c7b", "email": "ada@acme.com", "query": "orders"}`;
  const safe = `INFO node=fetch input={"api_key": "***REDACTED***", "email": "a***@acme.com", "query": "orders"}`;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Shield className="h-4 w-4 text-brand-500" />
          Redacting sensitive data in logs
        </span>
        <button
          type="button"
          onClick={() => setRedact((v) => !v)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
            redact
              ? "border-brand-400/60 bg-brand-500/10 text-brand-700 dark:text-brand-200"
              : "border-rose-400/60 bg-rose-500/10 text-rose-700 dark:text-rose-300"
          )}
        >
          {redact ? <Shield className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          Redaction {redact ? "on" : "off"}
        </button>
      </div>

      <pre
        className={cn(
          "overflow-x-auto rounded-lg border p-3.5 font-mono text-[12.5px] leading-relaxed",
          redact
            ? "border-ink-800 bg-ink-950 text-ink-100"
            : "border-rose-500/40 bg-rose-950/40 text-rose-100"
        )}
      >
        <code>{redact ? safe : raw}</code>
      </pre>

      <p
        className={cn(
          "mt-3 text-xs",
          redact ? "text-ink-400" : "text-rose-600 dark:text-rose-400"
        )}
      >
        {redact
          ? "Secrets and PII are masked before the line is written — safe to store and share."
          : "This log line leaks an API key and a user's email. Anyone with log access now has them."}
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 30. PatternGallery — the beginner design patterns at a glance       */
/* ------------------------------------------------------------------ */

const PATTERNS = [
  {
    key: "chain",
    label: "Prompt chain",
    desc: "A fixed sequence of steps, each feeding the next.",
    use: "The task breaks into predictable, ordered steps.",
    shape: "chain",
  },
  {
    key: "router",
    label: "Router",
    desc: "Classify the input, then dispatch to a specialised handler.",
    use: "Different kinds of input need different handling.",
    shape: "router",
  },
  {
    key: "evaluator",
    label: "Evaluator–optimizer",
    desc: "Generate, grade, and refine until the result is good enough.",
    use: "Quality matters and something can judge it.",
    shape: "loop",
  },
  {
    key: "agent",
    label: "Simple agent loop",
    desc: "A model calls tools in a loop until the task is done.",
    use: "The right steps depend on what the model discovers.",
    shape: "agent",
  },
  {
    key: "approval",
    label: "Human approval",
    desc: "Pause for a human to approve before a consequential action.",
    use: "An action is risky, costly, or irreversible.",
    shape: "approval",
  },
  {
    key: "retrieval",
    label: "Retrieval-assisted",
    desc: "Fetch relevant context, then answer grounded in it.",
    use: "Answers must come from your data, not the model's memory.",
    shape: "retrieval",
  },
] as const;

function Ar() {
  return <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-400" />;
}

function AmberChip({ label }: { label: string }) {
  return (
    <span className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-amber-700 dark:text-amber-300">
      {label}
    </span>
  );
}

function PatternShape({ shape }: { shape: string }) {
  switch (shape) {
    case "chain":
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip label="START" terminal />
          <Ar />
          <Chip label="extract" />
          <Ar />
          <Chip label="translate" />
          <Ar />
          <Chip label="summarize" />
          <Ar />
          <Chip label="END" terminal />
        </div>
      );
    case "router":
      return (
        <div className="flex flex-col items-center gap-2">
          <Chip label="classify" />
          <Down />
          <div className="flex flex-wrap justify-center gap-2">
            <Chip label="answer" />
            <Chip label="escalate" />
            <Chip label="discard" />
          </div>
        </div>
      );
    case "loop":
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip label="generate" />
            <RefreshCw className="h-3.5 w-3.5 text-ink-400" />
            <Chip label="evaluate" />
            <Ar />
            <Chip label="END" terminal />
          </div>
          <span className="text-[11px] text-ink-400">loops until good enough</span>
        </div>
      );
    case "agent":
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip label="agent" />
            <RefreshCw className="h-3.5 w-3.5 text-ink-400" />
            <Chip label="tools" />
            <Ar />
            <Chip label="END" terminal />
          </div>
          <span className="text-[11px] text-ink-400">
            loops until no more tool calls
          </span>
        </div>
      );
    case "approval":
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip label="propose" />
          <Ar />
          <AmberChip label="human ✋" />
          <Ar />
          <Chip label="act" />
          <Ar />
          <Chip label="END" terminal />
        </div>
      );
    case "retrieval":
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip label="START" terminal />
          <Ar />
          <Chip label="retrieve" />
          <Ar />
          <Chip label="generate" />
          <Ar />
          <Chip label="END" terminal />
        </div>
      );
    default:
      return null;
  }
}

export function PatternGallery() {
  const [key, setKey] = useState<string>("chain");
  const p = PATTERNS.find((x) => x.key === key) ?? PATTERNS[0];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Blocks className="h-4 w-4 text-brand-500" />
        Six beginner patterns
      </span>

      <div className="mb-4 flex flex-wrap gap-2">
        {PATTERNS.map((x) => (
          <button
            key={x.key}
            type="button"
            onClick={() => setKey(x.key)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
              key === x.key
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div
        key={key}
        className="animate-fade-up rounded-xl border border-ink-200/70 bg-white/50 p-5 dark:border-ink-800/70 dark:bg-ink-900/40"
      >
        <div className="flex min-h-[5rem] items-center justify-center overflow-x-auto">
          <PatternShape shape={p.shape} />
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
        <span className="font-semibold text-ink-900 dark:text-white">
          {p.label}.
        </span>{" "}
        {p.desc}
      </p>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
        <span className="font-medium text-brand-600 dark:text-brand-300">
          Use when:
        </span>{" "}
        {p.use}
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 27. StreamModes — what each stream_mode yields                      */
/* ------------------------------------------------------------------ */

const STREAM_MODES = [
  {
    id: "updates",
    desc: "What each node returned, right after it runs. Ideal for a step-by-step activity view.",
    sample: `{'agent': {'messages': [AIMessage('...')]}}`,
  },
  {
    id: "values",
    desc: "The full accumulated state after each step. Use it to render the whole current picture.",
    sample: `{'messages': [HumanMessage('Hi'), AIMessage('Hello!')]}`,
  },
  {
    id: "messages",
    desc: "LLM tokens as they are generated, with metadata — the classic typewriter effect.",
    sample: `(AIMessageChunk('Lang'), {'langgraph_node': 'agent'})`,
  },
  {
    id: "custom",
    desc: "Your own progress events, emitted from inside a node via get_stream_writer().",
    sample: `{'progress': '3/10 documents processed'}`,
  },
] as const;

export function StreamModes() {
  const [id, setId] = useState<string>("updates");
  const m = STREAM_MODES.find((x) => x.id === id) ?? STREAM_MODES[0];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Radio className="h-4 w-4 text-brand-500" />
        The stream modes
      </span>

      <div className="mb-4 flex flex-wrap gap-2">
        {STREAM_MODES.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setId(x.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all",
              id === x.id
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40 dark:text-ink-400"
            )}
          >
            &quot;{x.id}&quot;
          </button>
        ))}
      </div>

      <div key={id} className="animate-fade-up">
        <p className="mb-2 font-mono text-xs text-ink-400">
          for chunk in graph.stream(input, stream_mode=
          <span className="text-emerald-500 dark:text-emerald-300">
            &quot;{m.id}&quot;
          </span>
          ):
        </p>
        <pre className="overflow-x-auto rounded-lg border border-ink-800 bg-ink-950 p-3.5 font-mono text-[13px] text-ink-100">
          <code># each chunk looks like:{"\n"}{m.sample}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {m.desc}
        </p>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 31. CapstoneBuilder — assemble the support assistant step by step   */
/* ------------------------------------------------------------------ */

const CAPSTONE_STEPS = [
  {
    key: "state",
    label: "State",
    icon: Database,
    adds: "Define what the graph carries between nodes — the conversation and the detected category.",
    code: [
      "class State(TypedDict):",
      "    messages: Annotated[list, add_messages]",
      "    category: str",
    ],
  },
  {
    key: "nodes",
    label: "Nodes & routes",
    icon: Workflow,
    adds: "Classify each message, then branch: answer questions, or escalate complaints to a human.",
    code: [
      'builder.add_edge(START, "classify")',
      'builder.add_conditional_edges("classify", route, {',
      '    "question": "answer",',
      '    "complaint": "escalate",',
      "})",
    ],
  },
  {
    key: "tools",
    label: "Tools",
    icon: Wrench,
    adds: "Give the assistant an order-lookup tool so it can answer with real data, not guesses.",
    code: [
      "llm = llm.bind_tools([lookup_order])",
      'builder.add_node("tools", ToolNode([lookup_order]))',
      'builder.add_conditional_edges("answer", tools_condition)',
      'builder.add_edge("tools", "answer")',
    ],
  },
  {
    key: "memory",
    label: "Memory",
    icon: Brain,
    adds: "Attach a checkpointer so each customer's conversation persists across turns, keyed by thread.",
    code: [
      "graph = builder.compile(checkpointer=MemorySaver())",
      'config = {"configurable": {"thread_id": customer_id}}',
    ],
  },
  {
    key: "streaming",
    label: "Streaming",
    icon: Radio,
    adds: "Stream the reply token by token so the customer sees it typing instead of waiting.",
    code: [
      'for tok, meta in graph.stream(',
      '    inputs, config, stream_mode="messages"):',
      "    print(tok.content, end='', flush=True)",
    ],
  },
] as const;

function CapstoneNode({
  label,
  active,
  terminal,
  tone = "brand",
}: {
  label: string;
  active: boolean;
  terminal?: boolean;
  tone?: "brand" | "amber";
}) {
  return (
    <span
      className={cn(
        "border px-3 py-1.5 font-mono text-xs font-semibold transition-all",
        terminal ? "rounded-full" : "rounded-lg",
        !active
          ? "border-dashed border-ink-300/60 bg-transparent text-ink-300 dark:border-ink-700 dark:text-ink-600"
          : tone === "amber"
            ? "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            : terminal
              ? "border-brand-500/60 bg-white text-brand-600 dark:bg-ink-900 dark:text-brand-300"
              : "border-brand-400/60 bg-brand-500/10 text-ink-800 dark:text-ink-100"
      )}
    >
      {label}
    </span>
  );
}

export function CapstoneBuilder() {
  const [step, setStep] = useState(0);
  const s = CAPSTONE_STEPS[step];
  const Icon = s.icon;

  // What has been assembled by the current step.
  const hasNodes = step >= 1;
  const hasTools = step >= 2;
  const hasMemory = step >= 3;
  const hasStreaming = step >= 4;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Blocks className="h-4 w-4 text-brand-500" />
          Building the support assistant
        </span>
        <span className="font-mono text-xs text-ink-400">
          step {step + 1} of {CAPSTONE_STEPS.length}
        </span>
      </div>

      {/* stage rail */}
      <div className="mb-5 flex flex-wrap gap-2">
        {CAPSTONE_STEPS.map((x, i) => {
          const StepIcon = x.icon;
          const done = i < step;
          const current = i === step;
          return (
            <button
              key={x.key}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all",
                current
                  ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                  : done
                    ? "border-brand-400/40 bg-transparent text-brand-600 dark:text-brand-300"
                    : "border-ink-200/70 bg-white/60 text-ink-400 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40"
              )}
            >
              {done ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <StepIcon className="h-3.5 w-3.5" />
              )}
              {x.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* the graph, growing */}
        <div className="rounded-xl border border-ink-200/70 bg-white/50 p-5 dark:border-ink-800/70 dark:bg-ink-900/40">
          <div className="flex flex-col items-center gap-2">
            <CapstoneNode label="START" active terminal />
            <Down />
            <CapstoneNode label="classify" active />
            <Down />
            <div className="flex flex-wrap items-start justify-center gap-2">
              <div className="flex flex-col items-center gap-2">
                <CapstoneNode label="answer" active={hasNodes} />
                {hasTools && (
                  <>
                    <span className="inline-flex items-center gap-1 text-ink-400">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </span>
                    <CapstoneNode label="tools" active />
                  </>
                )}
              </div>
              <CapstoneNode label="escalate" active={hasNodes} tone="amber" />
            </div>
            <Down />
            <CapstoneNode label="END" active terminal />
          </div>

          {/* capability badges */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 border-t border-ink-200/60 pt-4 dark:border-ink-800/60">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                hasMemory
                  ? "border-brand-400/50 bg-brand-500/10 text-brand-700 dark:text-brand-300"
                  : "border-dashed border-ink-300/60 text-ink-300 dark:border-ink-700 dark:text-ink-600"
              )}
            >
              <Brain className="h-3 w-3" /> memory
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                hasStreaming
                  ? "border-brand-400/50 bg-brand-500/10 text-brand-700 dark:text-brand-300"
                  : "border-dashed border-ink-300/60 text-ink-300 dark:border-ink-700 dark:text-ink-600"
              )}
            >
              <Radio className="h-3 w-3" /> streaming
            </span>
          </div>
        </div>

        {/* what this step adds */}
        <div key={s.key} className="animate-fade-up flex flex-col">
          <span className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-200">
            <Icon className="h-4 w-4" />
            {s.label}
          </span>
          <p className="mb-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {s.adds}
          </p>
          <MiniCode lines={[...s.code]} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep((v) => Math.max(0, v - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-ink-200/70 px-3 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:border-brand-400/50 disabled:opacity-40 dark:border-ink-800/70 dark:text-ink-300"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={() =>
            setStep((v) => Math.min(CAPSTONE_STEPS.length - 1, v + 1))
          }
          disabled={step === CAPSTONE_STEPS.length - 1}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-40"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
        {step === CAPSTONE_STEPS.length - 1 && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-300">
            <Check className="h-4 w-4" /> assistant complete
          </span>
        )}
        <button
          type="button"
          onClick={() => setStep(0)}
          className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 transition-colors hover:text-brand-600"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 32. ProjectExplorer — the full capstone project, file by file       */
/* ------------------------------------------------------------------ */

type ProjectRow =
  | { kind: "folder"; name: string; d: number }
  | { kind: "file"; name: string; d: number; lang: string; code: string };

const PROJECT_FILES: ProjectRow[] = [
  { kind: "folder", name: "support-assistant/", d: 0 },
  { kind: "folder", name: "app/", d: 1 },
  {
    kind: "file",
    name: "__init__.py",
    d: 2,
    lang: "python",
    code: `from .graph import build_graph

__all__ = ["build_graph"]`,
  },
  {
    kind: "file",
    name: "state.py",
    d: 2,
    lang: "python",
    code: `from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages


class State(TypedDict):
    """Everything the graph carries between nodes."""

    # the conversation, auto-appended by the add_messages reducer
    messages: Annotated[list, add_messages]
    # the classifier's decision: "question" | "order" | "complaint"
    category: str`,
  },
  {
    kind: "file",
    name: "tools.py",
    d: 2,
    lang: "python",
    code: `from langchain_core.tools import tool

# A tiny stand-in for a real orders database.
_ORDERS = {
    "A123": "Shipped - arriving Tuesday.",
    "B456": "Processing - ships within 24 hours.",
}


@tool
def lookup_order(order_id: str) -> str:
    """Look up the status of an order by its ID (e.g. 'A123')."""
    return _ORDERS.get(order_id.strip("# "), "No order found with that ID.")`,
  },
  {
    kind: "file",
    name: "nodes.py",
    d: 2,
    lang: "python",
    code: `from langchain_core.messages import AIMessage, SystemMessage
from langchain_openai import ChatOpenAI

from .state import State
from .tools import lookup_order

# One model for classifying, one (tool-bound) for answering.
_llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
_answerer = _llm.bind_tools([lookup_order])

_CATEGORIES = {"question", "order", "complaint"}


def classify(state: State) -> dict:
    """Label the latest user message so we can route it."""
    prompt = [
        SystemMessage(
            "Classify the user's message as exactly one word: "
            "question, order, or complaint."
        ),
        state["messages"][-1],
    ]
    label = _llm.invoke(prompt).content.strip().lower()
    return {"category": label if label in _CATEGORIES else "question"}


def answer(state: State) -> dict:
    """Reply to the customer, calling the order tool when needed."""
    system = SystemMessage(
        "You are a helpful support assistant for Acme Corp. "
        "Use the lookup_order tool when the customer mentions an order."
    )
    reply = _answerer.invoke([system, *state["messages"]])
    return {"messages": [reply]}


def escalate(state: State) -> dict:
    """Hand a complaint off to a human agent."""
    return {
        "messages": [
            AIMessage(
                "I'm sorry you've had a bad experience. I've flagged this "
                "for a human agent who will follow up shortly."
            )
        ]
    }


def route(state: State) -> str:
    """Send complaints to a human, everything else to the assistant."""
    return "escalate" if state["category"] == "complaint" else "answer"`,
  },
  {
    kind: "file",
    name: "graph.py",
    d: 2,
    lang: "python",
    code: `from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver

from .state import State
from .tools import lookup_order
from .nodes import classify, answer, escalate, route


def build_graph():
    """Assemble and compile the support-assistant graph."""
    builder = StateGraph(State)

    # 1. nodes
    builder.add_node("classify", classify)
    builder.add_node("answer", answer)
    builder.add_node("escalate", escalate)
    builder.add_node("tools", ToolNode([lookup_order]))

    # 2. edges & routes
    builder.add_edge(START, "classify")
    builder.add_conditional_edges(
        "classify", route, {"answer": "answer", "escalate": "escalate"}
    )
    # answer loops through tools until it's ready to reply
    builder.add_conditional_edges("answer", tools_condition)
    builder.add_edge("tools", "answer")
    builder.add_edge("escalate", END)

    # 3. memory: a checkpointer gives every thread_id its own history
    return builder.compile(checkpointer=MemorySaver())`,
  },
  {
    kind: "file",
    name: "main.py",
    d: 1,
    lang: "python",
    code: `"""Streaming console chat for the customer-support assistant."""
from app import build_graph

graph = build_graph()


def chat(thread_id: str = "demo") -> None:
    config = {"configurable": {"thread_id": thread_id}}
    print("Support assistant ready. Type 'quit' to exit.\\n")

    while True:
        user = input("You: ").strip()
        if user.lower() in {"quit", "exit"}:
            break

        # stream only the customer-facing reply, token by token
        print("Assistant: ", end="", flush=True)
        for token, meta in graph.stream(
            {"messages": [("user", user)]},
            config,
            stream_mode="messages",
        ):
            if meta["langgraph_node"] == "answer" and token.content:
                print(token.content, end="", flush=True)
        print("\\n")


if __name__ == "__main__":
    chat()`,
  },
  {
    kind: "file",
    name: "requirements.txt",
    d: 1,
    lang: "text",
    code: `langgraph>=0.2
langchain-openai>=0.2
python-dotenv>=1.0`,
  },
  {
    kind: "file",
    name: ".env.example",
    d: 1,
    lang: "text",
    code: `# Copy this file to .env and fill in your key.
OPENAI_API_KEY=sk-...

# Optional: turn on LangSmith tracing while debugging.
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=lsv2_...`,
  },
  {
    kind: "file",
    name: "README.md",
    d: 1,
    lang: "md",
    code: `# Customer-Support Assistant

A LangGraph agent that classifies customer messages, answers questions
(looking up orders with a tool), escalates complaints to a human, and
streams its replies. Built as the Part I capstone.

## Setup

    python -m venv .venv
    source .venv/bin/activate      # Windows: .venv\\Scripts\\activate
    pip install -r requirements.txt
    cp .env.example .env           # then add your OPENAI_API_KEY

## Run

    python main.py

    You: Where is my order #A123?
    Assistant: Your order A123 has shipped - it's arriving Tuesday.

## How it works

    START -> classify -> (answer <-> tools) or escalate -> END

- state.py  - the shared State (messages + category)
- tools.py  - the lookup_order tool
- nodes.py  - classify / answer / escalate + the router
- graph.py  - wires the nodes, tools, and memory together
- main.py   - a streaming console chat loop`,
  },
];

function CodeLines({ code, lang }: { code: string; lang: string }) {
  const commentable = lang !== "md";
  return (
    <code className="grid">
      {code.split("\n").map((line, i) => {
        const isComment = commentable && line.trimStart().startsWith("#");
        return (
          <span
            key={i}
            className={cn(
              "whitespace-pre",
              isComment ? "text-ink-500" : "text-ink-100"
            )}
          >
            {line || " "}
          </span>
        );
      })}
    </code>
  );
}

export function ProjectExplorer() {
  const fileIndexes = PROJECT_FILES.map((r, i) => ({ r, i })).filter(
    (x) => x.r.kind === "file"
  );
  // default to graph.py — the heart of the project
  const defaultIdx =
    fileIndexes.find((x) => x.r.kind === "file" && x.r.name === "graph.py")
      ?.i ?? fileIndexes[0].i;
  const [sel, setSel] = useState<number>(defaultIdx);
  const [copied, setCopied] = useState(false);

  const active = PROJECT_FILES[sel];
  const file = active.kind === "file" ? active : null;

  const copy = async () => {
    if (!file) return;
    try {
      await navigator.clipboard.writeText(file.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Folder className="h-4 w-4 text-brand-500" />
        The finished project, file by file
      </span>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,15rem)_1fr]">
        {/* file tree */}
        <div className="h-max rounded-xl border border-ink-200/70 bg-ink-950 p-2 dark:border-ink-800/70">
          {PROJECT_FILES.map((row, i) => {
            if (row.kind === "folder") {
              return (
                <div
                  key={i}
                  style={{ paddingLeft: `${row.d * 16 + 10}px` }}
                  className="flex items-center gap-2 py-1.5 pr-2 font-mono text-[13px] text-ink-400"
                >
                  <Folder className="h-3.5 w-3.5 shrink-0 text-brand-400" />
                  {row.name}
                </div>
              );
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSel(i)}
                style={{ paddingLeft: `${row.d * 16 + 10}px` }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md py-1.5 pr-2 text-left font-mono text-[13px] transition-colors",
                  sel === i
                    ? "bg-brand-500/20 text-white"
                    : "text-ink-300 hover:bg-white/5"
                )}
              >
                <FileCode
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    sel === i ? "text-brand-300" : "text-ink-500"
                  )}
                />
                {row.name}
              </button>
            );
          })}
        </div>

        {/* code panel */}
        <div className="min-w-0 overflow-hidden rounded-xl border border-ink-800 bg-ink-950">
          <div className="flex items-center justify-between border-b border-ink-800 px-4 py-2">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-300">
              <FileCode className="h-3.5 w-3.5 text-brand-400" />
              {file?.name}
              <span className="rounded border border-ink-700 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-ink-500">
                {file?.lang}
              </span>
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-ink-400 transition-colors hover:text-brand-300"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </>
              )}
            </button>
          </div>
          <pre
            key={sel}
            className="animate-fade-up max-h-[26rem] overflow-auto p-4 font-mono text-[13px] leading-relaxed"
          >
            {file && <CodeLines code={file.code} lang={file.lang} />}
          </pre>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Click any file to read its code. Together these eight files are the
        complete, runnable assistant.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 33. OrchestrationSplit — logic in the node vs. a service layer      */
/* ------------------------------------------------------------------ */

export function OrchestrationSplit() {
  const [split, setSplit] = useState(true);

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Layers className="h-4 w-4 text-brand-500" />
          Orchestration vs. business logic
        </span>
        <div className="inline-flex rounded-lg border border-ink-200/70 p-0.5 dark:border-ink-800/70">
          <button
            type="button"
            onClick={() => setSplit(false)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              !split
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                : "text-ink-400 hover:text-brand-600"
            )}
          >
            One fat node
          </button>
          <button
            type="button"
            onClick={() => setSplit(true)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              split
                ? "bg-brand-500/15 text-brand-700 dark:text-brand-300"
                : "text-ink-400 hover:text-brand-600"
            )}
          >
            Orchestration + logic
          </button>
        </div>
      </div>

      {!split ? (
        <div key="fat" className="animate-fade-up">
          <div className="mx-auto max-w-md rounded-xl border-2 border-amber-500/50 bg-amber-500/5 p-4">
            <p className="mb-3 text-center font-mono text-xs font-semibold text-amber-700 dark:text-amber-300">
              def answer(state): # does everything
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {[
                "parse input",
                "validate",
                "query the DB",
                "build the prompt",
                "call the LLM",
                "format reply",
                "handle errors",
                "log",
              ].map((r) => (
                <span
                  key={r}
                  className="rounded-md border border-amber-500/40 bg-white/70 px-2 py-1 font-mono text-[11px] text-ink-700 dark:bg-ink-900/50 dark:text-ink-200"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
          <ul className="mx-auto mt-4 max-w-md space-y-1.5 text-sm text-ink-600 dark:text-ink-300">
            <li>· Can&apos;t test the DB lookup without running the whole graph.</li>
            <li>· The logic can&apos;t be reused outside this node.</li>
            <li>· One change risks breaking unrelated concerns.</li>
          </ul>
        </div>
      ) : (
        <div key="split" className="animate-fade-up space-y-3">
          <div className="rounded-xl border border-brand-400/40 bg-brand-500/5 p-4">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              Graph · orchestration (thin nodes)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Chip label="START" terminal />
              <Ar />
              <Chip label="classify" />
              <Ar />
              <Chip label="answer" />
              <Ar />
              <Chip label="END" terminal />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 py-1 text-brand-500">
            <ArrowDown className="h-7 w-7" strokeWidth={2.25} />
            <span className="rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              nodes call services
            </span>
            <ArrowDown className="h-7 w-7" strokeWidth={2.25} />
          </div>
          <div className="rounded-xl border border-ink-300/60 bg-ink-100/80 p-4 dark:border-ink-700/60 dark:bg-ink-800/50">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-ink-500">
              Services · business logic (plain Python)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["classifier.py", "orders.py", "llm.py", "formatting.py"].map(
                (s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-ink-300 bg-white px-3 py-1.5 font-mono text-xs text-ink-700 shadow-sm dark:border-ink-600 dark:bg-ink-900 dark:text-ink-200"
                  >
                    <Wrench className="h-3 w-3 text-ink-400 dark:text-ink-500" />
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
          <ul className="mx-auto max-w-lg space-y-1.5 text-sm text-ink-600 dark:text-ink-300">
            <li>· Each service is a plain function you can unit-test on its own.</li>
            <li>· Nodes stay thin — they wire services together, nothing more.</li>
            <li>· Swap an implementation without touching the graph.</li>
          </ul>
        </div>
      )}

      <figcaption className="mt-4 text-center text-xs text-ink-400">
        The graph decides <em>what runs when</em>; services decide{" "}
        <em>how each step works</em>. Keep them apart.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 34. WorkflowVsAgent — who controls the flow, you or the model       */
/* ------------------------------------------------------------------ */

const WVA_STOPS = [
  {
    key: "workflow",
    label: "Workflow",
    control: "You do",
    predictability: "High",
    tone: "brand" as const,
    desc: "You wire the path explicitly with edges. The model fills in steps, but never decides the route.",
    example: "Extract → translate → summarise; a fixed router.",
    shape: "Fixed edges you author by hand.",
  },
  {
    key: "hybrid",
    label: "Hybrid",
    control: "Shared",
    predictability: "Medium",
    tone: "sky" as const,
    desc: "A mostly-fixed graph with a bounded agent loop inside one branch. Structure where you can, freedom where you must.",
    example: "A pipeline whose 'research' step is a small tool-using agent.",
    shape: "Authored graph + a contained loop.",
  },
  {
    key: "agent",
    label: "Agent",
    control: "The model does",
    predictability: "Low",
    tone: "amber" as const,
    desc: "The model chooses the next action each step, looping over tools until done. Most flexible, least predictable.",
    example: "Open-ended research or debugging where steps aren't known.",
    shape: "A tool loop driven by the model.",
  },
];

export function WorkflowVsAgent() {
  const [i, setI] = useState(0);
  const s = WVA_STOPS[i];
  const toneText =
    s.tone === "brand"
      ? "text-brand-700 dark:text-brand-300"
      : s.tone === "sky"
        ? "text-sky-700 dark:text-sky-300"
        : "text-amber-700 dark:text-amber-300";

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <SlidersHorizontal className="h-4 w-4 text-brand-500" />
        Who controls the flow?
      </span>

      {/* spectrum bar */}
      <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-ink-400">
        <span>You author the path</span>
        <span>The model decides</span>
      </div>
      <div className="relative mb-5 h-2 rounded-full bg-gradient-to-r from-brand-400/60 via-sky-400/60 to-amber-400/70">
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-ink-800 shadow transition-all dark:border-ink-950 dark:bg-white"
          style={{ left: `calc(${(i / (WVA_STOPS.length - 1)) * 100}% - 8px)` }}
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {WVA_STOPS.map((x, idx) => (
          <button
            key={x.key}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "rounded-lg border px-2 py-2 text-sm font-semibold transition-all",
              i === idx
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40"
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div
        key={s.key}
        className="animate-fade-up rounded-xl border border-ink-200/70 bg-white/50 p-4 dark:border-ink-800/70 dark:bg-ink-900/40"
      >
        <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <span className="text-ink-500 dark:text-ink-400">
            Control flow:{" "}
            <span className={cn("font-semibold", toneText)}>{s.control}</span>
          </span>
          <span className="text-ink-500 dark:text-ink-400">
            Predictability:{" "}
            <span className={cn("font-semibold", toneText)}>
              {s.predictability}
            </span>
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">
          {s.desc}
        </p>
        <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
          <span className="font-medium text-ink-700 dark:text-ink-200">
            Reach for it:
          </span>{" "}
          {s.example}
        </p>
      </div>

      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Prefer the leftmost option that expresses your task — move right only
        when you genuinely need the model to decide.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 35. ApiComparison — the same graph in Graph API vs Functional API   */
/* ------------------------------------------------------------------ */

const API_TABS = [
  {
    key: "graph",
    label: "Graph API",
    blurb:
      "You declare nodes and edges explicitly. The structure is a first-class object you can inspect, visualise, and reason about.",
    code: [
      "from langgraph.graph import StateGraph, START, END",
      "",
      "builder = StateGraph(State)",
      'builder.add_node("classify", classify)',
      'builder.add_node("answer", answer)',
      "",
      'builder.add_edge(START, "classify")',
      'builder.add_edge("classify", "answer")',
      'builder.add_edge("answer", END)',
      "",
      "graph = builder.compile()",
    ],
    good: "Branching, loops, parallelism, and anything you want to visualise.",
  },
  {
    key: "func",
    label: "Functional API",
    blurb:
      "You write ordinary Python control flow. @task marks the steps and @entrypoint gives you persistence, streaming, and retries.",
    code: [
      "from langgraph.func import entrypoint, task",
      "",
      "@task",
      "def classify(text): ...",
      "",
      "@task",
      "def answer(text, category): ...",
      "",
      "@entrypoint(checkpointer=MemorySaver())",
      "def graph(text):",
      "    category = classify(text).result()",
      "    return answer(text, category).result()",
    ],
    good: "Mostly-linear logic where plain if/for reads more naturally than a graph.",
  },
] as const;

export function ApiComparison() {
  const [key, setKey] = useState<string>("graph");
  const t = API_TABS.find((x) => x.key === key) ?? API_TABS[0];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Code2 className="h-4 w-4 text-brand-500" />
          One graph, two APIs
        </span>
        <div className="inline-flex rounded-lg border border-ink-200/70 p-0.5 dark:border-ink-800/70">
          {API_TABS.map((x) => (
            <button
              key={x.key}
              type="button"
              onClick={() => setKey(x.key)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                key === x.key
                  ? "bg-brand-500/15 text-brand-700 dark:text-brand-300"
                  : "text-ink-400 hover:text-brand-600"
              )}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <div key={t.key} className="animate-fade-up">
        <p className="mb-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {t.blurb}
        </p>
        <MiniCode lines={[...t.code]} />
        <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
          <span className="font-medium text-brand-600 dark:text-brand-300">
            Best for:
          </span>{" "}
          {t.good}
        </p>
      </div>

      <figcaption className="mt-4 text-center text-xs text-ink-400">
        Both compile to the same runtime — same state, persistence, and
        streaming. Pick whichever expresses <em>this</em> graph most clearly.
      </figcaption>
    </figure>
  );
}
