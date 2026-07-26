import type { Difficulty } from "./tutorials";

/**
 * The full LangGraph curriculum, encoded as a single authoritative tree.
 * Section numbers (e.g. "4.1") and slugs are derived, not stored, so the data
 * stays compact and impossible to mis-number. Chapter pages render this outline
 * until an MDX file exists for the chapter (see lib/curriculum.ts).
 */

export interface ChapterSection {
  /** e.g. "4.1" */
  number: string;
  title: string;
  /** anchor id, e.g. "4-1-understanding-graphs" */
  id: string;
}

export interface Chapter {
  number: number;
  title: string;
  slug: string;
  sections: ChapterSection[];
}

export interface Part {
  number: number;
  roman: string;
  slug: string;
  title: string;
  subtitle: string;
  level: Difficulty;
  /** short focus label, e.g. "Professional" */
  focus: string;
  chapters: Chapter[];
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type RawChapter = { t: string; s: string[] };
type RawPart = {
  roman: string;
  slug: string;
  title: string;
  subtitle: string;
  level: Difficulty;
  focus: string;
  chapters: RawChapter[];
};

const RAW: RawPart[] = [
  {
    roman: "I",
    slug: "beginner",
    title: "LangGraph for Beginners",
    subtitle:
      "Start from zero. Understand agents and graph-based orchestration, then build your first stateful graphs, tools, memory, and streaming — finishing with a capstone.",
    level: "Beginner",
    focus: "Foundations",
    chapters: [
      {
        t: "Introduction to AI Agents",
        s: [
          "What is an AI agent?",
          "LLM applications versus agentic applications",
          "Workflows versus autonomous agents",
          "Deterministic and non-deterministic behaviour",
          "Why agents require orchestration",
          "Common agent use cases",
          "Limitations and risks of AI agents",
        ],
      },
      {
        t: "Introduction to LangGraph",
        s: [
          "What is LangGraph?",
          "When to use LangGraph",
          "When LangGraph may be unnecessary",
          "LangGraph versus LangChain agents",
          "LangGraph versus traditional workflow engines",
          "Understanding graph-based orchestration",
          "Overview of the LangGraph ecosystem",
          "LangGraph, LangChain, and LangSmith",
        ],
      },
      {
        t: "Development Environment Setup",
        s: [
          "Python prerequisites",
          "Creating a virtual environment",
          "Installing LangGraph and related packages",
          "Managing environment variables",
          "Configuring an LLM provider",
          "Protecting API keys",
          "Setting up notebooks and an IDE",
          "Creating the course project structure",
        ],
      },
      {
        t: "LangGraph Core Concepts",
        s: [
          "Understanding graphs",
          "State",
          "Nodes",
          "Edges",
          "The START and END nodes",
          "Graph execution flow",
          "Compiling a graph",
          "Invoking a graph",
          "Reading graph output",
          "Visualising a graph",
        ],
      },
      {
        t: "Creating Your First StateGraph",
        s: [
          "Defining a state schema",
          "Using TypedDict for state",
          "Writing a basic node",
          "Adding nodes to a graph",
          "Connecting nodes with edges",
          "Compiling and running the graph",
          "Passing inputs to the graph",
          "Returning structured outputs",
          "Handling basic execution errors",
          "Mini-project: Text-processing workflow",
        ],
      },
      {
        t: "Working with State",
        s: [
          "State as shared application data",
          "Reading values from state",
          "Returning state updates",
          "Partial state updates",
          "Avoiding direct state mutation",
          "Input, internal, and output state",
          "Default values",
          "State validation",
          "Using dataclasses",
          "Introduction to Pydantic state models",
        ],
      },
      {
        t: "Nodes and Application Logic",
        s: [
          "Anatomy of a node",
          "Synchronous nodes",
          "Asynchronous nodes",
          "Pure functions and side effects",
          "Calling an LLM inside a node",
          "Prompt construction",
          "Structured model responses",
          "Calling external Python functions",
          "Node naming conventions",
          "Error handling inside nodes",
        ],
      },
      {
        t: "Edges and Control Flow",
        s: [
          "Sequential edges",
          "Branching workflows",
          "Conditional edges",
          "Routing functions",
          "Looping between nodes",
          "Exit conditions",
          "Preventing infinite loops",
          "Fallback routes",
          "Designing readable control flow",
          "Mini-project: Content classification workflow",
        ],
      },
      {
        t: "Messages and Conversation State",
        s: [
          "Human, AI, system, and tool messages",
          "Understanding MessagesState",
          "Adding messages to state",
          "Maintaining conversation history",
          "Creating a basic chatbot graph",
          "System instructions",
          "Multi-turn conversations",
          "Managing long conversations",
          "Basic context-window awareness",
          "Mini-project: Stateful support chatbot",
        ],
      },
      {
        t: "Tools and Tool-Calling Agents",
        s: [
          "What is a tool?",
          "Defining Python tools",
          "Tool schemas and descriptions",
          "Binding tools to a model",
          "Understanding tool calls",
          "Executing tool requests",
          "Returning tool results",
          "Building a model–tool loop",
          "Handling unknown tools",
          "Handling tool failures",
          "Mini-project: Calculator and information agent",
        ],
      },
      {
        t: "Introduction to Persistence and Memory",
        s: [
          "Why agent state must persist",
          "Threads and conversation identity",
          "Checkpoints",
          "Checkpointers",
          "In-memory checkpointing",
          "Saving conversation state",
          "Resuming a previous conversation",
          "Short-term versus long-term memory",
          "Common memory mistakes",
          "Mini-project: Personal assistant with memory",
        ],
      },
      {
        t: "Streaming and User Experience",
        s: [
          "Why streaming matters",
          "Streaming model tokens",
          "Streaming graph updates",
          "Streaming state values",
          "Displaying progress messages",
          "Handling partial output",
          "Streaming errors",
          "Building a simple streaming interface",
        ],
      },
      {
        t: "Debugging and Basic Observability",
        s: [
          "Reading exceptions",
          "Logging node inputs and outputs",
          "Inspecting graph state",
          "Identifying routing errors",
          "Debugging loops",
          "Introduction to LangSmith tracing",
          "Reviewing execution traces",
          "Debugging tool calls",
          "Protecting sensitive information in logs",
        ],
      },
      {
        t: "Beginner Design Patterns",
        s: [
          "Prompt chain",
          "Router workflow",
          "Evaluator–optimizer workflow",
          "Simple agent loop",
          "Human approval workflow",
          "Retrieval-assisted response workflow",
          "When to use each pattern",
        ],
      },
      {
        t: "Beginner Capstone Project",
        s: [
          "Project requirements",
          "Designing the graph",
          "Defining the state",
          "Implementing nodes and routes",
          "Adding tools",
          "Adding memory",
          "Adding streaming",
          "Testing the workflow",
          "Documenting the project",
          "Suggested project: Customer-support assistant",
        ],
      },
    ],
  },
  {
    roman: "II",
    slug: "intermediate",
    title: "Intermediate LangGraph",
    subtitle:
      "Move from prototypes to maintainable applications: advanced state design, complex routing, parallelism, deep persistence and memory, human-in-the-loop, subgraphs, RAG, multi-agent basics, testing, and evaluation.",
    level: "Intermediate",
    focus: "Applied",
    chapters: [
      {
        t: "Intermediate Architecture Review",
        s: [
          "Reviewing LangGraph fundamentals",
          "From prototypes to maintainable applications",
          "Separating orchestration from business logic",
          "Designing graph boundaries",
          "State ownership",
          "Dependency management",
          "Choosing between workflows and agents",
          "Graph API versus Functional API",
        ],
      },
      {
        t: "Advanced State Design",
        s: [
          "Designing state for larger applications",
          "Public and private state",
          "Separate input and output schemas",
          "Typed state channels",
          "Reducers",
          "Append, merge, and overwrite behaviour",
          "Message reducers",
          "Concurrent state updates",
          "State normalisation",
          "State versioning",
          "Avoiding oversized state objects",
        ],
      },
      {
        t: "Complex Routing",
        s: [
          "Multi-condition routing",
          "Dynamic route selection",
          "Routing using structured LLM output",
          "Confidence-based routing",
          "Policy-based routing",
          "Combining state updates and routing",
          "Using Command",
          "Dynamic fan-out",
          "Using Send for map-reduce workflows",
          "Graceful termination strategies",
        ],
      },
      {
        t: "Parallel Execution",
        s: [
          "Sequential versus parallel execution",
          "Parallel branches",
          "Fan-out and fan-in patterns",
          "Aggregating parallel results",
          "Reducers in parallel workflows",
          "Handling partial branch failures",
          "Timeouts and fallbacks",
          "Rate-limit considerations",
          "Ordering and deterministic aggregation",
          "Mini-project: Parallel research workflow",
        ],
      },
      {
        t: "Persistence in Depth",
        s: [
          "The persistence model",
          "Checkpoint lifecycle",
          "Thread identifiers",
          "Checkpoint namespaces",
          "Retrieving current state",
          "Reading state history",
          "Updating saved state",
          "Resuming execution",
          "Replaying previous execution",
          "Branching from an earlier checkpoint",
          "Persistence-backed fault recovery",
          "Selecting a production checkpointer",
        ],
      },
      {
        t: "Short-Term and Long-Term Memory",
        s: [
          "Conversation memory architecture",
          "Thread-scoped memory",
          "User-scoped memory",
          "Long-term stores",
          "Memory namespaces",
          "Semantic memory",
          "Episodic memory",
          "Procedural memory",
          "Writing memories explicitly",
          "Extracting memories automatically",
          "Retrieving relevant memories",
          "Memory deletion and correction",
          "Privacy and retention considerations",
        ],
      },
      {
        t: "Human-in-the-Loop Workflows",
        s: [
          "Human oversight patterns",
          "Pausing execution with interrupts",
          "Returning interrupt information",
          "Resuming with user input",
          "Approve, edit, or reject workflows",
          "Reviewing tool calls before execution",
          "Correcting agent state",
          "Escalating to a human operator",
          "Multiple interrupts",
          "Designing approval interfaces",
          "Audit requirements",
          "Mini-project: Human-approved email agent",
        ],
      },
      {
        t: "Subgraphs and Modular Design",
        s: [
          "What is a subgraph?",
          "When to use subgraphs",
          "Calling a graph from another graph",
          "Shared-state subgraphs",
          "Separate-state subgraphs",
          "Transforming parent and child state",
          "Subgraph persistence",
          "Per-invocation subgraphs",
          "Per-thread subgraphs",
          "Testing subgraphs independently",
          "Reusable graph components",
          "Mini-project: Modular document-processing system",
        ],
      },
      {
        t: "Functional API",
        s: [
          "Functional API concepts",
          "Entrypoints",
          "Tasks",
          "Standard Python control flow",
          "Persistence with the Functional API",
          "Streaming",
          "Human-in-the-loop operations",
          "Short-term memory",
          "Long-term memory",
          "Calling StateGraphs from functional workflows",
          "Calling functional workflows from graphs",
          "Choosing the correct API style",
        ],
      },
      {
        t: "Tool Engineering",
        s: [
          "Designing reliable tools",
          "Clear tool descriptions",
          "Input schema validation",
          "Structured tool output",
          "Tool error taxonomy",
          "Retryable and non-retryable failures",
          "Tool timeouts",
          "Tool fallbacks",
          "Idempotent tool execution",
          "Authentication and authorisation",
          "Tool result caching",
          "Preventing unsafe tool use",
        ],
      },
      {
        t: "Retrieval-Augmented LangGraph Applications",
        s: [
          "RAG architecture review",
          "Retrieval as a graph node",
          "Query rewriting",
          "Document retrieval",
          "Document grading",
          "Context filtering",
          "Answer generation",
          "Hallucination checking",
          "Corrective retrieval",
          "Adaptive RAG routing",
          "Citation generation",
          "Mini-project: Knowledge-base assistant",
        ],
      },
      {
        t: "Multi-Agent Fundamentals",
        s: [
          "Single-agent versus multi-agent architecture",
          "Specialised agents",
          "Supervisor patterns",
          "Agent hand-offs",
          "Shared-state collaboration",
          "Isolated agent context",
          "Agent communication protocols",
          "Routing tasks to specialists",
          "Combining agent outputs",
          "Preventing delegation loops",
          "Mini-project: Research team of agents",
        ],
      },
      {
        t: "Testing LangGraph Applications",
        s: [
          "Unit-testing nodes",
          "Testing routing functions",
          "Testing state reducers",
          "Mocking models",
          "Mocking tools",
          "Testing interrupts",
          "Testing persistence",
          "Testing streaming output",
          "Integration tests",
          "Regression datasets",
          "Deterministic test settings",
          "End-to-end graph tests",
        ],
      },
      {
        t: "Evaluation and Observability",
        s: [
          "Tracing graph execution",
          "Tags and metadata",
          "Inspecting node latency",
          "Tracking token usage",
          "Evaluating final answers",
          "Evaluating trajectories",
          "Tool-selection evaluation",
          "Human evaluation",
          "LLM-as-judge evaluation",
          "Building evaluation datasets",
          "Comparing graph versions",
          "Monitoring quality over time",
        ],
      },
      {
        t: "Intermediate Capstone Project",
        s: [
          "Requirements and architecture",
          "Modular graph design",
          "Parallel research",
          "Retrieval and grading",
          "Long-term memory",
          "Human approval",
          "Failure recovery",
          "Tracing and evaluation",
          "Automated tests",
          "Suggested project: Research and report-generation agent",
        ],
      },
    ],
  },
  {
    roman: "III",
    slug: "advanced",
    title: "Advanced LangGraph",
    subtitle:
      "Go deep on the runtime and production concerns: durable execution, advanced persistence and memory, control flow, multi-agent systems, planning, deep research, MCP, reliability, performance, security, evaluation, and deployment.",
    level: "Advanced",
    focus: "Systems",
    chapters: [
      {
        t: "LangGraph Runtime Architecture",
        s: [
          "Runtime responsibilities",
          "Graph compilation internals",
          "Message-passing execution",
          "Super-step execution model",
          "Channels and state updates",
          "Parallel node execution",
          "Deterministic update application",
          "Execution termination",
          "Runtime context",
          "Execution metadata",
          "Recursion limits",
          "Graceful degradation",
        ],
      },
      {
        t: "Durable Execution",
        s: [
          "Principles of durable workflows",
          "Checkpoint-based recovery",
          "Restarting interrupted processes",
          "Long-running agent operations",
          "Deterministic replay",
          "Side effects and replay safety",
          "Idempotency strategies",
          "Task boundaries",
          "Failure-safe external operations",
          "Durable human approval",
          "Recovery after infrastructure failure",
          "Testing recovery scenarios",
        ],
      },
      {
        t: "Advanced Persistence Architecture",
        s: [
          "Production checkpoint stores",
          "Persistence consistency",
          "Checkpoint serialisation",
          "State encryption",
          "Checkpoint retention",
          "Archival and deletion",
          "Multi-tenant state isolation",
          "Checkpoint migration",
          "Schema evolution",
          "Data-residency considerations",
          "Persistence performance",
          "Disaster recovery",
        ],
      },
      {
        t: "Advanced Memory Systems",
        s: [
          "Memory architecture for agents",
          "Working memory",
          "Conversation summaries",
          "Semantic user profiles",
          "Episodic event memory",
          "Procedural instruction memory",
          "Memory extraction pipelines",
          "Memory consolidation",
          "Memory relevance scoring",
          "Conflict resolution",
          "Memory decay and expiration",
          "User-controlled memory",
          "Privacy-preserving memory",
          "Evaluating memory quality",
        ],
      },
      {
        t: "Advanced Control Flow",
        s: [
          "Dynamic graph behaviour",
          "State-driven graph transitions",
          "Command-based navigation",
          "Parent graph navigation",
          "Dynamic parallelism",
          "Recursive subgraphs",
          "Hierarchical workflows",
          "Event-driven graph execution",
          "Interrupt-driven control flow",
          "Compensation workflows",
          "Circuit breakers",
          "Dead-letter handling",
          "Preventing cyclic failure patterns",
        ],
      },
      {
        t: "Advanced Multi-Agent Systems",
        s: [
          "Multi-agent architecture selection",
          "Supervisor-agent systems",
          "Hierarchical supervisors",
          "Peer-to-peer agents",
          "Network-based agent collaboration",
          "Agent hand-off protocols",
          "Context isolation",
          "Shared memory between agents",
          "Role and capability modelling",
          "Task decomposition",
          "Dynamic agent selection",
          "Consensus and arbitration",
          "Conflict resolution",
          "Preventing agent collusion and loops",
          "Evaluating multi-agent trajectories",
        ],
      },
      {
        t: "Planning and Reasoning Architectures",
        s: [
          "Planner–executor pattern",
          "Plan-and-solve workflows",
          "Replanning after failure",
          "Reflection workflows",
          "Critic and reviser agents",
          "Evaluator–optimizer loops",
          "Search-based reasoning",
          "Tree-structured exploration",
          "Hypothesis generation and testing",
          "Confidence-aware planning",
          "Budget-aware reasoning",
          "Termination and convergence criteria",
        ],
      },
      {
        t: "Advanced Retrieval and Research Agents",
        s: [
          "Multi-source retrieval",
          "Query decomposition",
          "Parallel search",
          "Source ranking",
          "Evidence extraction",
          "Deduplication",
          "Contradiction detection",
          "Source-quality evaluation",
          "Citation verification",
          "Iterative research",
          "Research supervisor architecture",
          "Deep-research workflows",
          "Generating evidence-backed reports",
          "Evaluating research completeness",
        ],
      },
      {
        t: "Model Context Protocol Integration",
        s: [
          "MCP concepts",
          "MCP clients and servers",
          "Tool discovery",
          "Connecting MCP tools to agents",
          "Managing MCP sessions",
          "Authentication and permissions",
          "Tool allowlists",
          "Handling untrusted server output",
          "Multi-server orchestration",
          "MCP failure handling",
          "Auditing MCP activity",
          "Enterprise MCP patterns",
        ],
      },
      {
        t: "Reliability Engineering",
        s: [
          "Agent failure taxonomy",
          "Model failures",
          "Tool failures",
          "Network and infrastructure failures",
          "Retry policies",
          "Exponential backoff",
          "Fallback models",
          "Fallback tools",
          "Timeouts",
          "Circuit breakers",
          "Bulkheads and isolation",
          "Partial-result handling",
          "Graceful degradation",
          "Recovery playbooks",
        ],
      },
      {
        t: "Performance Engineering",
        s: [
          "Measuring end-to-end latency",
          "Node-level latency analysis",
          "Parallelisation strategies",
          "Model-selection optimisation",
          "Prompt and context optimisation",
          "Token-budget management",
          "Caching model responses",
          "Caching tool results",
          "Batch processing",
          "Connection pooling",
          "Reducing checkpoint overhead",
          "Backpressure and queue management",
          "Load testing",
          "Capacity planning",
        ],
      },
      {
        t: "Security Engineering",
        s: [
          "Agent threat modelling",
          "Prompt-injection attacks",
          "Indirect prompt injection",
          "Tool-output injection",
          "Data exfiltration risks",
          "Least-privilege tool access",
          "Authentication and authorisation",
          "Secrets management",
          "Tenant isolation",
          "Input and output validation",
          "Sandboxing tools",
          "Human approval for sensitive actions",
          "Audit logging",
          "Security testing and red teaming",
        ],
      },
      {
        t: "Advanced Evaluation",
        s: [
          "Evaluating non-deterministic systems",
          "Outcome-based evaluation",
          "Trajectory evaluation",
          "Node-level evaluation",
          "Tool-use accuracy",
          "Routing accuracy",
          "Retrieval-quality metrics",
          "Memory-quality metrics",
          "Safety evaluation",
          "Latency and cost evaluation",
          "Pairwise comparison",
          "Online versus offline evaluation",
          "Production feedback loops",
          "Statistical significance",
          "Detecting quality regressions",
        ],
      },
      {
        t: "Deployment Architecture",
        s: [
          "Packaging a LangGraph application",
          "Configuration management",
          "Development, staging, and production environments",
          "Agent-server architecture",
          "Containerisation",
          "Horizontal scaling",
          "Stateful workload considerations",
          "Deployment strategies",
          "Rolling and canary releases",
          "Versioning graphs",
          "Managing database migrations",
          "Health checks",
          "Rollback strategies",
          "Disaster recovery testing",
        ],
      },
      {
        t: "Advanced Capstone Project",
        s: [
          "System requirements",
          "Architecture decision record",
          "Hierarchical multi-agent design",
          "Durable execution",
          "Advanced memory",
          "Human governance",
          "Secure tool integration",
          "Reliability controls",
          "Performance testing",
          "Evaluation framework",
          "Production deployment",
          "Suggested project: Enterprise deep-research platform",
        ],
      },
    ],
  },
  {
    roman: "IV",
    slug: "workplace",
    title: "LangGraph for Engineers in the Workplace",
    subtitle:
      "Ship LangGraph in a real organisation: use-case selection, requirements, enterprise architecture and integrations, security and governance, testing, observability, CI/CD, operations, cost management, incident response, and readiness reviews.",
    level: "Advanced",
    focus: "Professional",
    chapters: [
      {
        t: "Identifying Valuable Workplace Use Cases",
        s: [
          "Mapping business processes",
          "Identifying repetitive knowledge work",
          "Workflow automation versus agent automation",
          "Selecting processes suitable for LLMs",
          "Risk and complexity assessment",
          "Estimating business value",
          "Measuring time saved",
          "Defining success metrics",
          "Selecting a pilot project",
          "Avoiding “agent for everything” thinking",
        ],
      },
      {
        t: "Requirements Engineering for Agents",
        s: [
          "Stakeholder interviews",
          "User stories",
          "Functional requirements",
          "Non-functional requirements",
          "Data requirements",
          "Tool and integration requirements",
          "Human-review requirements",
          "Security requirements",
          "Compliance requirements",
          "Service-level objectives",
          "Acceptance criteria",
          "Definition of done",
        ],
      },
      {
        t: "Enterprise Agent Architecture",
        s: [
          "Reference architecture",
          "API, orchestration, model, and data layers",
          "Separating graph logic from services",
          "Domain-driven graph boundaries",
          "Shared platform components",
          "Reusable nodes and subgraphs",
          "Event-driven integration",
          "Synchronous and asynchronous execution",
          "Multi-tenant architecture",
          "Build-versus-buy decisions",
          "Architecture decision records",
        ],
      },
      {
        t: "Engineering Repository Structure",
        s: [
          "Application package layout",
          "Graph-definition modules",
          "State-schema modules",
          "Node and tool modules",
          "Prompt management",
          "Configuration modules",
          "Persistence adapters",
          "Test organisation",
          "Evaluation datasets",
          "Deployment configuration",
          "Documentation standards",
          "Ownership files and code owners",
        ],
      },
      {
        t: "Coding Standards for LangGraph Teams",
        s: [
          "Node design principles",
          "State naming conventions",
          "Type safety",
          "Dependency injection",
          "Pure logic versus side effects",
          "Async programming standards",
          "Error-handling conventions",
          "Logging conventions",
          "Structured output standards",
          "Tool-interface contracts",
          "Code-review checklist",
          "Refactoring large graphs",
        ],
      },
      {
        t: "Enterprise Integrations",
        s: [
          "Internal REST APIs",
          "Databases",
          "Search systems",
          "Vector databases",
          "Document-management systems",
          "CRM platforms",
          "Ticketing systems",
          "Messaging and collaboration platforms",
          "Email and calendar systems",
          "Data warehouses",
          "Event buses and queues",
          "MCP-based integrations",
          "Legacy systems",
          "Integration testing",
        ],
      },
      {
        t: "Authentication, Authorisation, and Identity",
        s: [
          "User authentication",
          "Service identities",
          "Role-based access control",
          "Attribute-based access control",
          "Delegated user permissions",
          "Tool-level authorisation",
          "Tenant-level access control",
          "Secrets and token management",
          "Identity propagation through graph nodes",
          "Approval for privileged actions",
          "Audit trails",
          "Access-review processes",
        ],
      },
      {
        t: "Data Governance and Compliance",
        s: [
          "Data classification",
          "Personally identifiable information",
          "Sensitive company information",
          "Data minimisation",
          "Retention policies",
          "Right-to-delete workflows",
          "Memory governance",
          "Logging and redaction",
          "Data residency",
          "Third-party model-provider risk",
          "Legal and compliance review",
          "Responsible-AI documentation",
        ],
      },
      {
        t: "Human Oversight and Operational Governance",
        s: [
          "Human-in-the-loop versus human-on-the-loop",
          "Approval matrices",
          "Risk-based review thresholds",
          "Escalation rules",
          "Manual override",
          "Editing proposed actions",
          "Incident intervention",
          "User feedback collection",
          "Accountability and ownership",
          "Audit-ready decision records",
          "Governance dashboards",
          "Periodic agent review",
        ],
      },
      {
        t: "Testing Strategy for Engineering Teams",
        s: [
          "Test pyramid for agent systems",
          "Unit tests",
          "Contract tests",
          "Graph integration tests",
          "Tool integration tests",
          "Persistence tests",
          "Security tests",
          "Adversarial tests",
          "Load and stress tests",
          "Failure-recovery tests",
          "Golden datasets",
          "Regression evaluation",
          "User-acceptance testing",
          "Release-quality gates",
        ],
      },
      {
        t: "LangSmith and Workplace Observability",
        s: [
          "Trace collection",
          "Environment separation",
          "Trace metadata",
          "User and tenant identifiers",
          "Node-level monitoring",
          "Tool-call monitoring",
          "Latency dashboards",
          "Token and cost dashboards",
          "Error categorisation",
          "Quality monitoring",
          "Feedback collection",
          "Alert design",
          "Sensitive-data redaction",
          "Incident investigation",
        ],
      },
      {
        t: "Evaluation in the Software Delivery Lifecycle",
        s: [
          "Defining evaluation metrics",
          "Building representative datasets",
          "Creating baseline performance",
          "Automated evaluators",
          "Human-review programmes",
          "Evaluating tool trajectories",
          "Evaluating workflow completion",
          "Measuring groundedness",
          "Measuring safety",
          "Measuring business outcomes",
          "Evaluation in pull requests",
          "Evaluation in CI/CD",
          "Production evaluation",
          "Release approval criteria",
        ],
      },
      {
        t: "CI/CD for LangGraph Applications",
        s: [
          "Branching strategy",
          "Pull-request checks",
          "Formatting and static analysis",
          "Type checking",
          "Unit and integration tests",
          "Automated evaluations",
          "Security scanning",
          "Container builds",
          "Infrastructure validation",
          "Deployment to staging",
          "Smoke testing",
          "Canary deployment",
          "Production promotion",
          "Automated rollback",
        ],
      },
      {
        t: "Production Deployment and Operations",
        s: [
          "Deployment options",
          "Cloud and self-hosted environments",
          "Agent-server configuration",
          "Persistence infrastructure",
          "Queue and worker architecture",
          "Horizontal scaling",
          "Concurrency controls",
          "Rate limiting",
          "Model-provider failover",
          "Health checks",
          "Backup and restoration",
          "Operational dashboards",
          "On-call readiness",
          "Production runbooks",
        ],
      },
      {
        t: "Cost and Capacity Management",
        s: [
          "Model token costs",
          "Tool and API costs",
          "Infrastructure costs",
          "Persistence costs",
          "Cost per successful task",
          "Cost allocation by team or tenant",
          "Model-routing strategies",
          "Context-window optimisation",
          "Caching strategies",
          "Concurrency planning",
          "Usage quotas",
          "Budget alerts",
          "Forecasting production demand",
        ],
      },
      {
        t: "Incident Management",
        s: [
          "Agent incident taxonomy",
          "Incorrect-response incidents",
          "Unauthorised-action incidents",
          "Data-exposure incidents",
          "Tool and integration outages",
          "Model-provider outages",
          "Stuck and looping executions",
          "Disabling tools or graphs",
          "Feature flags and kill switches",
          "Incident response workflow",
          "Root-cause analysis",
          "Post-incident evaluation",
          "Corrective and preventive actions",
        ],
      },
      {
        t: "Team Collaboration and Documentation",
        s: [
          "Graph architecture diagrams",
          "State and tool contracts",
          "Prompt documentation",
          "Runbooks",
          "Evaluation reports",
          "Model cards and system cards",
          "Architecture decision records",
          "Onboarding documentation",
          "Knowledge-sharing sessions",
          "Ownership and escalation maps",
          "Release notes",
          "Stakeholder communication",
        ],
      },
      {
        t: "Migrating a Prototype to Production",
        s: [
          "Prototype assessment",
          "Identifying technical debt",
          "Reworking state design",
          "Modularising nodes",
          "Replacing in-memory persistence",
          "Adding authentication",
          "Adding human controls",
          "Adding observability",
          "Creating tests and evaluations",
          "Hardening tool integrations",
          "Load testing",
          "Staged rollout",
          "Production-readiness review",
        ],
      },
      {
        t: "Workplace Case Studies",
        s: [
          "Internal knowledge assistant",
          "Customer-support copilot",
          "IT service-desk agent",
          "Software-engineering assistant",
          "Document-review workflow",
          "Compliance-review assistant",
          "Sales-research agent",
          "Financial-analysis workflow",
          "Employee-onboarding assistant",
          "Incident-response assistant",
          "Procurement-review workflow",
          "Executive-reporting agent",
        ],
      },
      {
        t: "Workplace Capstone Project",
        s: [
          "Business problem definition",
          "Stakeholder and user analysis",
          "Requirements document",
          "Security and risk assessment",
          "Architecture design",
          "LangGraph implementation",
          "Enterprise integrations",
          "Persistence and memory",
          "Human approval controls",
          "Test and evaluation suite",
          "CI/CD implementation",
          "Production deployment",
          "Monitoring dashboard",
          "Runbook and incident plan",
          "Business-outcome presentation",
        ],
      },
      {
        t: "Final Engineering Readiness Assessment",
        s: [
          "Architecture review",
          "Code-quality review",
          "Security review",
          "Data-governance review",
          "Reliability review",
          "Performance review",
          "Evaluation review",
          "Operational-readiness review",
          "Cost review",
          "Stakeholder sign-off",
          "Launch checklist",
          "Post-launch improvement roadmap",
        ],
      },
    ],
  },
];

function build(): Part[] {
  return RAW.map((rawPart, pIndex) => {
    const chapters: Chapter[] = rawPart.chapters.map((rawCh, cIndex) => {
      const number = cIndex + 1;
      const sections: ChapterSection[] = rawCh.s.map((title, sIndex) => {
        const secNumber = `${number}.${sIndex + 1}`;
        return {
          number: secNumber,
          title,
          id: `${number}-${sIndex + 1}-${slugify(title)}`,
        };
      });
      return { number, title: rawCh.t, slug: slugify(rawCh.t), sections };
    });
    return {
      number: pIndex + 1,
      roman: rawPart.roman,
      slug: rawPart.slug,
      title: rawPart.title,
      subtitle: rawPart.subtitle,
      level: rawPart.level,
      focus: rawPart.focus,
      chapters,
    };
  });
}

export const syllabus: Part[] = build();

export function getPart(slug: string): Part | undefined {
  return syllabus.find((p) => p.slug === slug);
}

export function getChapter(
  partSlug: string,
  chapterSlug: string
): { part: Part; chapter: Chapter } | undefined {
  const part = getPart(partSlug);
  if (!part) return undefined;
  const chapter = part.chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) return undefined;
  return { part, chapter };
}

export function getAdjacentChapters(
  partSlug: string,
  chapterSlug: string
): {
  prev: { part: Part; chapter: Chapter } | null;
  next: { part: Part; chapter: Chapter } | null;
} {
  // Flatten all chapters across parts for a continuous learning order.
  const flat: { part: Part; chapter: Chapter }[] = [];
  for (const part of syllabus) {
    for (const chapter of part.chapters) flat.push({ part, chapter });
  }
  const idx = flat.findIndex(
    (x) => x.part.slug === partSlug && x.chapter.slug === chapterSlug
  );
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

export interface SyllabusStats {
  parts: number;
  chapters: number;
  sections: number;
}

export function getSyllabusStats(): SyllabusStats {
  let chapters = 0;
  let sections = 0;
  for (const part of syllabus) {
    chapters += part.chapters.length;
    for (const chapter of part.chapters) sections += chapter.sections.length;
  }
  return { parts: syllabus.length, chapters, sections };
}

export function partChapterCount(part: Part): number {
  return part.chapters.length;
}

export function partSectionCount(part: Part): number {
  return part.chapters.reduce((sum, c) => sum + c.sections.length, 0);
}
