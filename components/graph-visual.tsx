import { cn } from "@/lib/utils";

/**
 * Decorative animated state-graph diagram used in the hero.
 * Purely presentational — hidden from assistive tech.
 */
export function GraphVisual({ className }: { className?: string }) {
  const nodes = [
    { id: "start", x: 150, y: 40, label: "START", kind: "terminal" },
    { id: "agent", x: 150, y: 130, label: "agent", kind: "node" },
    { id: "tools", x: 55, y: 220, label: "tools", kind: "node" },
    { id: "respond", x: 245, y: 220, label: "respond", kind: "node" },
    { id: "end", x: 150, y: 310, label: "END", kind: "terminal" },
  ];

  const edges: [string, string, boolean][] = [
    ["start", "agent", false],
    ["agent", "tools", true],
    ["tools", "agent", false],
    ["agent", "respond", true],
    ["respond", "end", false],
  ];

  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 300 350"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id="edge-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d39e" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
        </marker>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* edges */}
      {edges.map(([from, to, dashed], i) => {
        const a = nodeById[from];
        const b = nodeById[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#edge-grad)"
            strokeWidth="2"
            strokeDasharray={dashed ? "5 5" : undefined}
            markerEnd="url(#arrow)"
            opacity={0.65}
            style={{
              strokeDashoffset: 40,
              animation: `dash 2s ease-out ${i * 0.25}s forwards`,
            }}
          />
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => {
        const terminal = n.kind === "terminal";
        return (
          <g
            key={n.id}
            style={{ animation: `fade-up 0.6s ease-out ${0.3 + i * 0.15}s both` }}
          >
            {terminal ? (
              <>
                <rect
                  x={n.x - 34}
                  y={n.y - 15}
                  width="68"
                  height="30"
                  rx="15"
                  className="fill-white dark:fill-ink-900"
                  stroke="#059669"
                  strokeWidth="1.5"
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  className="fill-brand-600 dark:fill-brand-300"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  {n.label}
                </text>
              </>
            ) : (
              <>
                <rect
                  x={n.x - 42}
                  y={n.y - 18}
                  width="84"
                  height="36"
                  rx="10"
                  className="fill-white dark:fill-ink-900"
                  stroke="url(#edge-grad)"
                  strokeWidth="1.75"
                  filter={n.id === "agent" ? "url(#glow)" : undefined}
                />
                <circle
                  cx={n.x - 28}
                  cy={n.y}
                  r="3"
                  fill="#34d39e"
                  className="animate-pulse-glow"
                />
                <text
                  x={n.x + 4}
                  y={n.y + 4}
                  textAnchor="middle"
                  className="fill-ink-800 dark:fill-ink-100"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                >
                  {n.label}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
