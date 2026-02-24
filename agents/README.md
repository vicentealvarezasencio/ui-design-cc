# UI Design System Agents

This directory contains specialized agents for the UI Design System. The multi-agent architecture provides focused expertise for different phases of the design workflow.

## Agent Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     UI Designer (Coordinator)                    │
│                                                                  │
│  Routes tasks │ Maintains coherence │ Handles lightweight tasks  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
           ┌───────────┬───┼───────────┬───────────────┐
           │           │   │           │               │
           ▼           ▼   ▼           ▼               ▼
    ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────────────┐
    │ Researcher│ │ Specifier │ │ Prompter  │ │ Pencil Screen(s) │
    │           │ │           │ │           │ │                  │
    │ • Context │ │ • Screens │ │ • Exports │ │ • 1 per screen   │
    │ • Inspire │ │ • Comps   │ │ • Prompts │ │ • Push/Pull/Val  │
    │ • Patterns│ │ • Patterns│ │ • Handoffs│ │ • MCP operations │
    │ • Analysis│ │ • Wirefrm │ │ • Iterate │ │ • Own context    │
    └───────────┘ └───────────┘ └───────────┘ └──────────────────┘
```

## Agent Files

| File | Agent | Purpose |
|------|-------|---------|
| `ui-designer.md` | Coordinator | Routes tasks, maintains coherence, handles simple tasks |
| `ui-researcher.md` | Researcher | Context discovery, inspiration analysis, pattern research |
| `ui-specifier.md` | Specifier | Screen specs, component definitions, wireframes |
| `ui-prompter.md` | Prompter | Export prompts, handoffs, tool-specific generation |
| `ui-pencil-screen.md` | Pencil Screen | Single-screen Pencil MCP operations (push/pull/validate) |

## Agent Responsibilities

### UI Designer (Coordinator)
- **Routes tasks** to appropriate specialized agent
- **Maintains state** across all agents
- **Ensures coherence** in naming, references, patterns
- **Handles directly:** status checks, quick updates, decision logging

### UI Researcher
- **Context discovery:** Platform, framework, constraints
- **Inspiration analysis:** "Like [Product]" references, URL analysis
- **Pattern research:** Competitive analysis, domain patterns
- **Codebase analysis:** Existing components, styles, conventions

### UI Specifier
- **Screen specifications:** Full 10-section specs with wireframes
- **Component definitions:** Props, variants, states, accessibility
- **Pattern documentation:** Reusable patterns and when to use them
- **Content specification:** Copy, labels, error messages

### UI Prompter
- **Prompt generation:** Tool-optimized prompts (Stitch, V0, Figma, Generic)
- **Handoff documents:** Design briefs, developer handoffs
- **Prompt iteration:** Refinement when results need adjustment
- **Export management:** Version tracking, registry updates

### UI Pencil Screen
- **Autonomous screen worker:** Handles all Pencil MCP operations for exactly one screen
- **Push operations:** Creates/updates a single screen in Pencil from its spec
- **Pull operations:** Extracts a single screen from Pencil and writes its spec
- **Validation:** Validates a single screen against its specification
- **Own context window:** Runs in a fresh context, preventing orchestrator bloat
- **Parallel execution:** Multiple instances run simultaneously for different screens

## Command → Agent Mapping

| Command | Primary Agent | Notes |
|---------|---------------|-------|
| `/ui:init` | Researcher | Context and inspiration discovery |
| `/ui:setup-tokens` | Coordinator + Researcher | Token creation with research |
| `/ui:design-screens` | Specifier | Full screen specifications |
| `/ui:define-components` | Specifier | Component extraction |
| `/ui:export [service]` | Prompter | Generate tool-specific prompts |
| `/ui:export pencil` | Coordinator + Pencil Screen(s) | Orchestrator + parallel per-screen agents |
| `/ui:pencil sync --push` | Coordinator + Pencil Screen(s) | Orchestrator + parallel per-screen agents |
| `/ui:pencil sync --pull` | Coordinator + Pencil Screen(s) | Orchestrator + parallel per-screen agents |
| `/ui:import-tokens` | Coordinator | Direct handling |
| `/ui:import-design` | Coordinator + Researcher | Analysis of imported designs |
| `/ui:realize` | Coordinator | Registry management |
| `/ui:sync` | Coordinator + Specifier | Drift detection and spec updates |
| `/ui:status` | Coordinator | Direct handling |
| `/ui:decisions` | Coordinator | Direct handling |
| `/ui:patterns` | Specifier | Pattern documentation |

## State Management

Each agent maintains its own state file, coordinated by the master state:

```
.planning/design/ui-state/
├── coordinator-state.json   # Master state, tracks all agents
├── researcher-state.json    # Research sessions, discoveries
├── specifier-state.json     # Specification progress
├── prompter-state.json      # Export history, prompt versions
└── pencil-state.json        # Pencil session, screen-node mappings
```

Note: Pencil Screen agents do NOT write to state files directly. They return results to the orchestrator (Coordinator), which updates pencil-state.json and the registry.

### State Synchronization
- Coordinator maintains master state
- Agents report completion to coordinator
- State persists across sessions
- Enables continuity in long-running projects

## Memory Protocol

Agents remember context across invocations:

1. **Read state** at session start
2. **Reference previous work** when relevant
3. **Update state** at session end
4. **Note open questions** for next session

This enables:
- Continuing interrupted work
- Building on previous discoveries
- Tracking decisions over time
- Progressive refinement

## Agent Personalities

Each agent has a distinct working style:

| Agent | Personality Traits |
|-------|-------------------|
| **Coordinator** | Orchestrating, contextual, efficient, coherent |
| **Researcher** | Curious, thorough, organized, visual |
| **Specifier** | Precise, systematic, visual-first, complete |
| **Prompter** | Adaptive, precise, iterative, practical |
| **Pencil Screen** | Focused, autonomous, precise, visual |

## Output Standards

All agents follow consistent output patterns:

### Completion Summary
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 [Agent Name] Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task: [what was done]

Files Created/Updated:
  ✓ [file 1]
  ✓ [file 2]

Key Outcomes:
  • [outcome 1]
  • [outcome 2]

Questions for User:
  ? [if any]

Ready For: [next step]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### File Outputs
- Researcher → UI-CONTEXT.md, UI-INSPIRATION.md, research/*.md
- Specifier → screens/*.md, COMPONENTS.md, UI-PATTERNS.md
- Prompter → ui-exports/*.md, handoffs/*.md

## Workflow Example

```
User: /ui:init
         │
         ▼
┌─────────────────────┐
│     Coordinator     │
│  "This needs context│
│   discovery..."     │
└──────────┬──────────┘
           │ spawns
           ▼
┌─────────────────────┐
│     Researcher      │
│  • Analyzes project │
│  • Detects framework│
│  • Gathers context  │
└──────────┬──────────┘
           │ returns
           ▼
┌─────────────────────┐
│     Coordinator     │
│  • Updates state    │
│  • Reports status   │
│  • Recommends next  │
└─────────────────────┘

User: /ui:design-screens
         │
         ▼
┌─────────────────────┐
│     Coordinator     │
│  "This needs full   │
│   specification..." │
└──────────┬──────────┘
           │ spawns
           ▼
┌─────────────────────┐
│     Specifier       │
│  • Creates wireframes│
│  • Lists components │
│  • Documents states │
└──────────┬──────────┘
           │ returns
           ▼
┌─────────────────────┐
│     Coordinator     │
│  • Updates inventory│
│  • Tracks progress  │
│  • Recommends next  │
└─────────────────────┘

User: /ui:export stitch
         │
         ▼
┌─────────────────────┐
│     Coordinator     │
│  "This needs prompt │
│   generation..."    │
└──────────┬──────────┘
           │ spawns
           ▼
┌─────────────────────┐
│     Prompter        │
│  • Loads adapter    │
│  • Transforms specs │
│  • Generates prompts│
└──────────┬──────────┘
           │ returns
           ▼
┌─────────────────────┐
│     Coordinator     │
│  • Updates registry │
│  • Tracks versions  │
│  • Provides prompts │
└─────────────────────┘

User: /ui:pencil sync --push  (or /ui:export pencil)
         │
         ▼
┌─────────────────────┐
│     Coordinator     │
│  (Orchestrator)     │
│  • Opens .pen file  │
│  • Sets variables   │
│  • Gets components  │
└──────────┬──────────┘
           │ spawns in parallel
     ┌─────┼─────┐
     ▼     ▼     ▼
  ┌─────┐┌─────┐┌─────┐
  │SCR01││SCR02││SCR03│
  │Agent││Agent││Agent│
  │     ││     ││     │
  │ MCP ││ MCP ││ MCP │
  │calls││calls││calls│
  └──┬──┘└──┬──┘└──┬──┘
     └───┬──┘───┬──┘
         ▼      │
┌─────────────────────┐
│     Coordinator     │
│  • Collects results │
│  • Updates state    │
│  • Reports summary  │
└─────────────────────┘
```

## Orchestrator Pattern (Pencil MCP)

The Pencil MCP integration uses a special **orchestrator + subagent** pattern to prevent context window exhaustion:

```
User: /ui:pencil sync --push (or /ui:export pencil)
         │
         ▼
┌─────────────────────────────┐
│     Coordinator             │
│  (acts as ORCHESTRATOR)     │
│                             │
│  1. Load specs & tokens     │
│  2. Open .pen file          │
│  3. Set variables (once)    │
│  4. Get reusable components │
│  5. Identify screens to     │
│     push/pull/validate      │
└──────────┬──────────────────┘
           │ spawns in PARALLEL
           ├─────────────────────────────────┐
           │                │                │
           ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Pencil Screen│  │ Pencil Screen│  │ Pencil Screen│
│ Agent: SCR-01│  │ Agent: SCR-03│  │ Agent: SCR-04│
│              │  │              │  │              │
│ Own context  │  │ Own context  │  │ Own context  │
│ window       │  │ window       │  │ window       │
│              │  │              │  │              │
│ • batch_des  │  │ • batch_des  │  │ • batch_des  │
│ • screenshot │  │ • screenshot │  │ • screenshot │
│ • iterate    │  │ • iterate    │  │ • iterate    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │ returns          │ returns          │ returns
       └─────────────────┬┘─────────────────┘
                         ▼
┌─────────────────────────────┐
│     Coordinator             │
│  (collects results)         │
│                             │
│  6. Collect node IDs        │
│  7. Update pencil-state     │
│  8. Update UI-REGISTRY      │
│  9. Report summary          │
└─────────────────────────────┘
```

### Why This Pattern?

- **Context window protection:** Each Pencil screen requires many MCP tool calls (batch_design, get_screenshot, batch_get, etc.) that consume significant context. With 5+ screens, the context would overflow.
- **Parallel execution:** All screen agents run simultaneously, making multi-screen operations much faster.
- **Isolation:** If one screen fails, others succeed independently.
- **Fresh context per screen:** Each agent starts with only the context it needs — no accumulated noise from previous screens.

### When to Use

- 2+ screens: Orchestrator + parallel subagents
- 1 screen: Handle directly (no subagent overhead needed)

## Adding New Agents

To add a specialized agent:

1. Create `agents/[agent-name].md`
2. Follow the agent template structure:
   - `<agent_identity>` — Name, role, personality
   - `<spawn_conditions>` — When to use this agent
   - `<context_protocol>` — What context it receives/writes
   - `<capabilities>` — What it can do
   - `<working_methods>` — How it approaches tasks
   - `<output_formats>` — What it produces
   - `<constraints>` — Must do / must not do
   - `<memory_protocol>` — State management
   - `<tools>` — Available tools
   - `<output_summary>` — Completion format

3. Update coordinator's routing logic
4. Update this README

## Templates Integration

Agents use templates from `ui-design/templates/`:

| Agent | Primary Templates Used |
|-------|------------------------|
| Coordinator | coordinator-state.json |
| Researcher | ui-context.md |
| Specifier | screen.md, component.md, ui-patterns.md, ui-decisions.md |
| Prompter | Export adapters, ui-registry.md |
| Pencil Screen | Pencil adapter rules (inlined by orchestrator) |

## File Structure

```
agents/
├── README.md              # This file
├── ui-designer.md         # Coordinator agent
├── ui-researcher.md       # Research agent
├── ui-specifier.md        # Specification agent
├── ui-prompter.md         # Prompt/export agent
└── ui-pencil-screen.md    # Per-screen Pencil MCP agent

ui-design/
├── adapters/              # Service-specific adapters
│   ├── stitch.md
│   ├── v0.md
│   ├── figma.md
│   └── generic.md
└── templates/             # Document templates
    ├── ui-spec.md
    ├── ui-context.md
    ├── screen.md
    ├── component.md
    ├── ui-patterns.md
    ├── ui-decisions.md
    ├── ui-registry.md
    └── design-tokens.json
```

## Version History

- **0.5.0** — Orchestrator pattern for Pencil MCP operations
  - New `ui-pencil-screen` agent for per-screen Pencil operations
  - Orchestrator pattern: coordinator handles setup, spawns parallel screen agents
  - Prevents context window exhaustion during multi-screen push/pull/export
  - Parallel execution for faster multi-screen operations
  - Updated routing logic in coordinator

- **0.2.0** — Enhanced multi-agent architecture
  - 10-section screen specification format
  - Dark mode support in tokens
  - ASCII wireframe standards
  - UI-CONTEXT, UI-PATTERNS, UI-DECISIONS, UI-REGISTRY support
  - Template-driven outputs
  - Enhanced state persistence

- **0.1.0** — Initial agent architecture
  - UI Designer (Coordinator)
  - UI Researcher
  - UI Specifier
  - UI Prompter
