import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { AlertTriangle, Info, Lightbulb, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AgentLoop,
  AutonomySpectrum,
  ConditionalRouter,
  ContextWindow,
  DeterminismDemo,
  EcosystemGrid,
  ExecutionFlow,
  GraphAnatomy,
  GraphBuilder,
  LlmVsAgent,
  LoopStepper,
  MemoryTiers,
  MessageTypes,
  NodeAnatomy,
  OrchestrationDiagram,
  ProjectTree,
  ProviderPicker,
  RedactionToggle,
  StackDiagram,
  StateMerge,
  StateScopes,
  StreamModes,
  ThreadSwitcher,
  TokenStream,
  ToolLoop,
  TraceViewer,
  UseCaseGrid,
  VenvSetup,
  WhenToUse,
} from "@/components/diagrams";

type CalloutType = "note" | "tip" | "warning" | "success";

const calloutConfig: Record<
  CalloutType,
  { icon: typeof Info; className: string; iconClass: string; label: string }
> = {
  note: {
    icon: Info,
    label: "Note",
    className:
      "border-sky-500/30 bg-sky-500/5 dark:bg-sky-500/10",
    iconClass: "text-sky-500",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    className:
      "border-brand-500/30 bg-brand-500/5 dark:bg-brand-500/10",
    iconClass: "text-brand-500",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className:
      "border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10",
    iconClass: "text-amber-500",
  },
  success: {
    icon: CheckCircle2,
    label: "Key idea",
    className:
      "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10",
    iconClass: "text-emerald-500",
  },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const cfg = calloutConfig[type];
  const Icon = cfg.icon;
  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-xl border p-4 text-sm",
        cfg.className
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", cfg.iconClass)} />
      <div className="[&>p]:my-0 [&>p+p]:mt-2">
        <p className="mb-1 font-semibold text-ink-900 dark:text-white">
          {title ?? cfg.label}
        </p>
        {children}
      </div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-brand-600 underline decoration-brand-400/40 underline-offset-2 transition-colors hover:decoration-brand-500 dark:text-brand-300"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-600 underline decoration-brand-400/40 underline-offset-2 transition-colors hover:decoration-brand-500 dark:text-brand-300"
        {...props}
      >
        {children}
      </a>
    );
  },
  // Wrap tables so wide comparisons scroll instead of breaking the layout.
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  ),
  Callout,
  AgentLoop,
  AutonomySpectrum,
  ConditionalRouter,
  ContextWindow,
  DeterminismDemo,
  EcosystemGrid,
  ExecutionFlow,
  GraphAnatomy,
  GraphBuilder,
  LlmVsAgent,
  LoopStepper,
  MemoryTiers,
  MessageTypes,
  NodeAnatomy,
  OrchestrationDiagram,
  ProjectTree,
  ProviderPicker,
  RedactionToggle,
  StackDiagram,
  StateMerge,
  StateScopes,
  StreamModes,
  ThreadSwitcher,
  TokenStream,
  ToolLoop,
  TraceViewer,
  UseCaseGrid,
  VenvSetup,
  WhenToUse,
};
