"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Database,
  Eye,
  EyeOff,
  GitMerge,
  Layers,
  Pause,
  Play,
  RefreshCw,
  Shield,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

function useDiagramStepper(length: number, initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [length, playing]);

  function select(nextIndex: number) {
    setPlaying(false);
    setIndex(nextIndex);
  }

  function next() {
    setPlaying(false);
    setIndex((current) => (current + 1) % length);
  }

  return {
    index,
    playing,
    select,
    next,
    togglePlaying: () => setPlaying((current) => !current),
  };
}

function DiagramControls({
  index,
  total,
  playing,
  onTogglePlaying,
  onNext,
}: {
  index: number;
  total: number;
  playing: boolean;
  onTogglePlaying: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200/70 bg-white/60 px-3 py-2 dark:border-ink-800/70 dark:bg-ink-900/40">
      <span
        aria-live="polite"
        className="text-xs font-medium text-ink-500 dark:text-ink-400"
      >
        Step {index + 1} of {total}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onTogglePlaying}
          aria-pressed={playing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-brand-400/40 bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-500/15 dark:text-brand-300"
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:border-brand-400/50 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200 dark:hover:text-brand-300"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* StateBoundaryExplorer — input, internal, private, and output state  */
/* ------------------------------------------------------------------ */

const STATE_SCOPES = [
  {
    key: "input",
    label: "Input",
    icon: Eye,
    channels: ["question", "customer_id"],
    owner: "The caller",
    visible: "Accepted by graph.invoke(...)",
    description:
      "The smallest contract a caller must satisfy. It contains request data, not internal implementation details.",
  },
  {
    key: "internal",
    label: "Internal",
    icon: Layers,
    channels: ["normalised_query", "document_ids", "attempts"],
    owner: "Graph nodes",
    visible: "Used while the graph runs",
    description:
      "Working channels that let nodes coordinate. They belong to the implementation and should not leak into the returned result.",
  },
  {
    key: "private",
    label: "Private",
    icon: EyeOff,
    channels: ["raw_policy_match", "rerank_debug"],
    owner: "Selected nodes",
    visible: "Limited by each node's state schema",
    description:
      "A narrower node-to-node contract. Private means hidden from unrelated node inputs—not encrypted or automatically redacted.",
  },
  {
    key: "output",
    label: "Output",
    icon: Check,
    channels: ["answer", "citations"],
    owner: "The graph",
    visible: "Returned to the caller",
    description:
      "The stable response contract. Internal channels can change without forcing every caller to change with them.",
  },
] as const;

export function StateBoundaryExplorer() {
  const stepper = useDiagramStepper(STATE_SCOPES.length, 1);
  const scope = STATE_SCOPES[stepper.index];
  const Icon = scope.icon;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <Shield className="h-4 w-4 text-brand-500" />
        Explore the state boundary
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STATE_SCOPES.map((item, index) => (
          <button
            key={item.key}
            type="button"
            onClick={() => stepper.select(index)}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm font-semibold transition-all",
              stepper.index === index
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <DiagramControls
        index={stepper.index}
        total={STATE_SCOPES.length}
        playing={stepper.playing}
        onTogglePlaying={stepper.togglePlaying}
        onNext={stepper.next}
      />

      <div
        key={scope.key}
        className="mt-4 animate-fade-up rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-semibold text-ink-900 dark:text-white">
                {scope.label} state
              </p>
              <p className="text-xs text-ink-400">{scope.visible}</p>
            </div>
          </div>
          <span className="rounded-full border border-ink-200/70 px-2.5 py-1 text-xs text-ink-500 dark:border-ink-700 dark:text-ink-300">
            Owner: {scope.owner}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {scope.channels.map((channel) => (
            <code
              key={channel}
              className="rounded-md border border-ink-200 bg-ink-50 px-2 py-1 text-xs text-ink-700 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200"
            >
              {channel}
            </code>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {scope.description}
        </p>
      </div>

      <figcaption className="mt-4 text-center text-xs text-ink-400">
        A good graph exposes a small contract and keeps its working state behind
        that boundary.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* ReducerPlayground — compare overwrite, append, merge, and messages  */
/* ------------------------------------------------------------------ */

const REDUCER_CASES = [
  {
    key: "overwrite",
    label: "Overwrite",
    annotation: "status: str",
    current: '"researching"',
    update: '"complete"',
    result: '"complete"',
    explanation:
      "No reducer is declared, so the new value replaces the old value. This is ideal for single-owner scalar channels.",
  },
  {
    key: "append",
    label: "Append",
    annotation: "notes: Annotated[list[str], add]",
    current: '["source A"]',
    update: '["source B"]',
    result: '["source A", "source B"]',
    explanation:
      "operator.add concatenates the two lists. Each node returns only its new items—not the accumulated list.",
  },
  {
    key: "merge",
    label: "Merge",
    annotation: "facts: Annotated[dict, merge_dicts]",
    current: '{"region": "EU"}',
    update: '{"plan": "pro"}',
    result: '{"region": "EU", "plan": "pro"}',
    explanation:
      "A custom reducer combines dictionaries. Its conflict rule must be explicit when both updates contain the same key.",
  },
  {
    key: "messages",
    label: "Messages",
    annotation: "messages: Annotated[list[AnyMessage], add_messages]",
    current: '[HumanMessage(id="1")]',
    update: '[AIMessage(id="2")]',
    result: '[HumanMessage(id="1"), AIMessage(id="2")]',
    explanation:
      "add_messages appends new IDs and replaces existing messages with matching IDs, which supports edits and removals.",
  },
] as const;

export function ReducerPlayground() {
  const stepper = useDiagramStepper(REDUCER_CASES.length, 1);
  const example = REDUCER_CASES[stepper.index];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
        <GitMerge className="h-4 w-4 text-brand-500" />
        Reducer laboratory
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {REDUCER_CASES.map((item, index) => (
          <button
            key={item.key}
            type="button"
            onClick={() => stepper.select(index)}
            className={cn(
              "rounded-lg border px-2 py-2 text-sm font-semibold transition-all",
              stepper.index === index
                ? "border-brand-400/70 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                : "border-ink-200/70 bg-white/60 text-ink-500 hover:border-brand-400/40 dark:border-ink-800/70 dark:bg-ink-900/40"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <DiagramControls
        index={stepper.index}
        total={REDUCER_CASES.length}
        playing={stepper.playing}
        onTogglePlaying={stepper.togglePlaying}
        onNext={stepper.next}
      />

      <div key={example.key} className="mt-4 animate-fade-up">
        <code className="block overflow-x-auto rounded-lg bg-ink-950 px-3 py-2 text-xs text-emerald-300">
          {example.annotation}
        </code>

        <div className="mt-4 grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <ValueCard label="Current" value={example.current} />
          <ArrowRight className="mx-auto h-4 w-4 self-center rotate-90 text-ink-400 sm:rotate-0" />
          <ValueCard label="Update" value={example.update} />
          <ArrowRight className="mx-auto h-4 w-4 self-center rotate-90 text-ink-400 sm:rotate-0" />
          <ValueCard label="Result" value={example.result} highlight />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {example.explanation}
        </p>
      </div>

      <figcaption className="mt-4 text-center text-xs text-ink-400">
        The type says what a channel contains; the reducer says how updates
        become its next value.
      </figcaption>
    </figure>
  );
}

function ValueCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-xl border p-3",
        highlight
          ? "border-brand-400/50 bg-brand-500/5"
          : "border-ink-200/70 bg-white/60 dark:border-ink-800/70 dark:bg-ink-900/40"
      )}
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
        {label}
      </p>
      <code className="block overflow-x-auto whitespace-pre-wrap break-words text-xs text-ink-800 dark:text-ink-100">
        {value}
      </code>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* StateShapeAudit — compare oversized checkpoints with a lean state   */
/* ------------------------------------------------------------------ */

const STATE_SHAPES = {
  oversized: {
    label: "Oversized state",
    estimate: "~19 MB per checkpoint",
    fields: [
      { name: "raw_pdf_bytes", location: "checkpoint", size: "18 MB" },
      { name: "full_search_response", location: "checkpoint", size: "900 KB" },
      { name: "model_client", location: "checkpoint", size: "not serialisable" },
      { name: "api_token", location: "checkpoint", size: "secret" },
      { name: "formatted_answer", location: "checkpoint", size: "derived" },
    ],
    summary:
      "Every checkpoint repeats bulky, sensitive, or reproducible data. Persistence becomes slow and the state is hard to reason about.",
  },
  lean: {
    label: "Lean state",
    estimate: "~6 KB per checkpoint",
    fields: [
      { name: "document_ids", location: "checkpoint", size: "120 B" },
      { name: "search_query", location: "checkpoint", size: "90 B" },
      { name: "answer", location: "checkpoint", size: "4 KB" },
      { name: "citation_ids", location: "checkpoint", size: "300 B" },
      { name: "schema_version", location: "checkpoint", size: "1 int" },
    ],
    summary:
      "The graph keeps only what it needs to resume. Documents live in durable storage, clients in runtime context, and secrets in configuration.",
  },
} as const;

type StateShapeKey = keyof typeof STATE_SHAPES;
const STATE_SHAPE_KEYS = Object.keys(STATE_SHAPES) as StateShapeKey[];

export function StateShapeAudit() {
  const stepper = useDiagramStepper(STATE_SHAPE_KEYS.length, 1);
  const key = STATE_SHAPE_KEYS[stepper.index];
  const shape = STATE_SHAPES[key];

  return (
    <figure className="not-prose my-8 rounded-2xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-5 dark:border-ink-800/70 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Database className="h-4 w-4 text-brand-500" />
          Checkpoint state audit
        </span>
        <div className="inline-flex rounded-lg border border-ink-200/70 p-0.5 dark:border-ink-800/70">
          {STATE_SHAPE_KEYS.map((shapeKey, index) => (
            <button
              key={shapeKey}
              type="button"
              onClick={() => stepper.select(index)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                stepper.index === index
                  ? "bg-brand-500/15 text-brand-700 dark:text-brand-300"
                  : "text-ink-400 hover:text-brand-600"
              )}
            >
              {STATE_SHAPES[shapeKey].label}
            </button>
          ))}
        </div>
      </div>

      <DiagramControls
        index={stepper.index}
        total={STATE_SHAPE_KEYS.length}
        playing={stepper.playing}
        onTogglePlaying={stepper.togglePlaying}
        onNext={stepper.next}
      />

      <div key={key} className="mt-4 animate-fade-up">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-ink-800 dark:text-ink-100">
            {shape.label}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              key === "lean"
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
            )}
          >
            {shape.estimate}
          </span>
        </div>

        <div className="space-y-2">
          {shape.fields.map((field) => (
            <div
              key={field.name}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-ink-200/70 bg-white/60 px-3 py-2 dark:border-ink-800/70 dark:bg-ink-900/40"
            >
              <code className="min-w-0 truncate text-xs text-ink-700 dark:text-ink-200">
                {field.name}
              </code>
              <span className="text-xs text-ink-400">{field.size}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {shape.summary}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-400">
        {key === "lean" ? (
          <>
            <Workflow className="h-3.5 w-3.5 text-emerald-500" />
            Checkpoint what the graph needs to resume; reference everything else.
          </>
        ) : (
          <>
            <RefreshCw className="h-3.5 w-3.5 text-amber-500" />
            Large state is serialised, persisted, streamed, and inspected repeatedly.
          </>
        )}
      </div>
    </figure>
  );
}
