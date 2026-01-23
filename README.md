# UI Design System for Claude Code

> A service-agnostic UI/UX design specification system for Claude Code.
> Define screens, components, and design tokens — export prompts for Stitch, V0, Figma, or any design tool.

**Version:** 0.4.0

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Specifications  ──────►  Adapters  ──────►  Design Tools     │
│                                                                 │
│   ┌─────────────┐         ┌─────────┐         ┌─────────────┐  │
│   │ UI-SPEC.md  │         │ Stitch  │────────►│   Stitch    │  │
│   │ screens/*.md│────────►│ V0      │────────►│   V0        │  │
│   │ COMPONENTS  │         │ Figma   │────────►│   Figma     │  │
│   │ tokens.json │         │ Generic │────────►│   Any Tool  │  │
│   └─────────────┘         └─────────┘         └─────────────┘  │
│                                                                 │
│   Source of Truth         Transform           Render/Generate   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Why?

AI coding assistants like Claude Code excel at implementation but lack structured UI/UX design workflows. This system fills that gap:

- **Specify before you build** — Define screens and components before writing code
- **Service agnostic** — Your specs work with any design tool (Stitch, V0, Figma, etc.)
- **Works with GSD** — Complements Get-Shit-Done workflow, runs after requirements
- **Design tokens** — W3C-standard tokens with dark mode support
- **Multi-agent architecture** — Specialized agents for research, specification, and export

## Installation

```bash
# Global installation (recommended)
npx ui-design-cc

# Local installation (project-specific)
npx ui-design-cc --local
```

**What gets installed:**

```
~/.claude/                          # or ./.claude/ if --local
├── commands/ui/                    # 17 slash commands
├── agents/                         # 5 specialized agents
└── ui-design/
    ├── adapters/                   # Service adapters
    └── templates/                  # Document templates
```

## Quick Start

```bash
# 1. Initialize UI context for your project
/ui:init

# 2. Set up design tokens
/ui:setup-tokens

# 3. Create screen specifications
/ui:design-screens

# 4. Extract component inventory
/ui:define-components

# 5. Export to your preferred tool
/ui:export stitch    # or v0, figma, generic

# 6. Track what's been built
/ui:realize SCR-01
```

## Commands

### Initialization

| Command | Description |
|---------|-------------|
| `/ui:init` | Initialize UI context — discover platform, framework, gather inspiration |
| `/ui:setup-tokens` | Set up design token system — colors, typography, spacing, dark mode |

### Specification

| Command | Description |
|---------|-------------|
| `/ui:design-screens` | Create screen specifications with 10-section format and ASCII wireframes |
| `/ui:define-components` | Extract component inventory from screens — props, variants, states |
| `/ui:patterns` | Document reusable UI patterns — add, view, or auto-extract |

### Export

| Command | Description |
|---------|-------------|
| `/ui:export [service]` | Generate service-specific prompts (stitch, v0, figma, generic) |
| `/ui:import-tokens` | Import tokens from external sources (Figma, Tailwind, W3C) |
| `/ui:import-design` | Reverse sync designs from external tools back to specs |

### Code-to-Design (Reverse Engineering)

| Command | Description |
|---------|-------------|
| `/ui:scan` | Scan existing codebase to discover components, screens, and tokens |
| `/ui:generate-specs` | Auto-generate UI specs from code analysis (after `/ui:scan`) |
| `/ui:reverse-engineer` | One-shot workflow: scan + generate specs + export (minimal intervention) |

### Branding

| Command | Description |
|---------|-------------|
| `/ui:logo` | Create logo and favicon specifications with AI-optimized prompts |

### Tracking

| Command | Description |
|---------|-------------|
| `/ui:realize [screen]` | Mark screens as realized — track implementation status |
| `/ui:sync` | Detect and fix drift between specs and implementations |
| `/ui:status` | Show specification coverage — screens, components, exports |

### Documentation

| Command | Description |
|---------|-------------|
| `/ui:decisions` | View and add design decisions with rationale |
| `/ui:whats-new` | Show version history and recent changes |
| `/ui:help` | Show all commands and usage guide |

## Architecture

### Multi-Agent System

```
┌─────────────────────────────────────────────────────────────────┐
│                     UI Designer (Coordinator)                    │
│                                                                  │
│  Routes tasks │ Maintains coherence │ Handles lightweight tasks  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
       ┌───────────────┬───┴───┬───────────────┐
       │               │       │               │
       ▼               ▼       ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ UI Researcher│ │ UI Specifier│ │ UI Prompter │ │ UI Scanner  │
│             │ │             │ │             │ │             │
│ • Context   │ │ • Screens   │ │ • Exports   │ │ • Codebase  │
│ • Inspiration│ │ • Components│ │ • Prompts   │ │ • Discovery │
│ • Patterns  │ │ • Patterns  │ │ • Handoffs  │ │ • Tokens    │
│ • Analysis  │ │ • Wireframes│ │ • Iterations│ │ • Reverse   │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

| Agent | Role | Triggered By |
|-------|------|--------------|
| **UI Designer** | Coordinator — routes tasks, maintains state | Default |
| **UI Researcher** | Context discovery, inspiration analysis | `/ui:init`, "like [Product]" |
| **UI Specifier** | Screen specs, component definitions | `/ui:design-screens`, `/ui:define-components` |
| **UI Prompter** | Export generation, prompt optimization | `/ui:export` |
| **UI Brander** | Logo design, favicon specs, AI prompts | `/ui:logo` |
| **UI Scanner** | Codebase reverse-engineering, token extraction | `/ui:scan`, `/ui:reverse-engineer` |

### Service Adapters

| Adapter | Output | Best For |
|---------|--------|----------|
| **Stitch** | Visual design prompts | Quick mockups, marketing pages, Figma export |
| **V0** | React + shadcn/ui code | Production components, React/Next.js apps |
| **Figma** | Variables + setup guide | Design team collaboration, full refinement |
| **Generic** | Tool-agnostic prompts | Unknown tools, future-proofing |

### Document Templates

| Template | Output Location | Purpose |
|----------|-----------------|---------|
| `ui-spec.md` | `.planning/UI-SPEC.md` | Master specification hub |
| `logo-spec.md` | `.planning/LOGO-SPEC.md` | Logo and branding specification |
| `ui-context.md` | `.planning/UI-CONTEXT.md` | Platform and constraints |
| `screen.md` | `.planning/screens/SCR-XX-*.md` | Individual screen specs (10-section) |
| `component.md` | `.planning/COMPONENTS.md` | Component inventory |
| `ui-patterns.md` | `.planning/UI-PATTERNS.md` | Reusable UI patterns |
| `ui-decisions.md` | `.planning/UI-DECISIONS.md` | Design decision log |
| `ui-registry.md` | `.planning/UI-REGISTRY.md` | Realization tracking |
| `design-tokens.json` | `.planning/design-tokens.json` | W3C tokens with dark mode |
| `code-analysis.md` | `.planning/CODE-ANALYSIS.md` | Codebase scan results (reverse-engineering) |

## Screen Specification Format

Every screen uses the 10-section format:

```markdown
# SCR-01: Login

## 1. Meta
Route, requirements, status, last updated

## 2. Purpose
What user accomplishes on this screen

## 3. Wireframe
ASCII layout with annotations

## 4. Layout Structure
Grid, container, spacing details

## 5. Components
Table with variants/props + hierarchy tree

## 6. States
Default, loading, error, success, empty

## 7. Interactions
Trigger → Action → Feedback mapping

## 8. Responsive Behavior
Breakpoint changes for mobile/tablet/desktop

## 9. Accessibility
WCAG checklist, focus management, ARIA

## 10. Content
All text, labels, error messages
```

## Design Tokens

W3C-format tokens with dark mode support:

```json
{
  "color": {
    "primary": {
      "default": {
        "$value": "#2563EB",
        "$type": "color",
        "$extensions": {
          "mode": { "dark": "#3B82F6" }
        }
      }
    },
    "background": {
      "default": {
        "$value": "#FFFFFF",
        "$type": "color",
        "$extensions": {
          "mode": { "dark": "#0F172A" }
        }
      }
    }
  }
}
```

## Workflows

### Code-to-Design (Reverse Engineering)

**For existing apps without design documentation:**

```
# Separated workflow (with review between steps)
/ui:scan                  → Analyze codebase, output CODE-ANALYSIS.md
[Review analysis]         → Check discovered components, screens, tokens
/ui:generate-specs        → Auto-generate UI specs from analysis
/ui:export stitch         → Generate design prompts

# One-shot workflow (minimal intervention)
/ui:reverse-engineer      → Scan + generate specs + export in one command
```

**What gets discovered:**
- All components with props, variants, and usage counts
- All screens/routes with layouts
- Design tokens from Tailwind/CSS/theme files
- Reusable UI patterns
- Component dependency graph

### With GSD Integration

```
/gsd:new-project          → Define requirements
/ui:init                  → Set up UI context
/ui:setup-tokens          → Establish design system
/ui:design-screens        → Create screen specifications
/ui:export v0             → Generate code prompts
/gsd:execute-phase        → Implement with specs as reference
```

### Standalone (No GSD)

```
/ui:init                  → Discover project context
/ui:setup-tokens          → Define colors, typography, spacing
/ui:design-screens        → Specify all screens
/ui:define-components     → Extract component inventory
/ui:export stitch         → Generate Stitch prompts
[Use Stitch]              → Create visual designs
/ui:realize SCR-01        → Track completion
```

### Visual Exploration First

```
/ui:init                  → Gather inspiration
/ui:setup-tokens          → Basic token setup
/ui:design-screens        → Quick wireframes
/ui:export stitch         → Generate visual prompts
[Iterate in Stitch]       → Refine designs
/ui:import-design         → Sync changes back
/ui:export v0             → Generate code
```

### Design Team Collaboration

```
/ui:init                  → Document context
/ui:setup-tokens          → Define tokens
/ui:export figma          → Export to Figma
[Design in Figma]         → Full design work
/ui:import-tokens         → Sync token changes
/ui:sync                  → Detect drift
/ui:export v0             → Generate code
```

## Artifacts Created

```
.planning/
├── UI-SPEC.md              # Master specification
├── UI-CONTEXT.md           # Platform and constraints
├── UI-PATTERNS.md          # Reusable patterns
├── UI-DECISIONS.md         # Decision log
├── UI-REGISTRY.md          # Realization tracking
├── COMPONENTS.md           # Component inventory
├── design-tokens.json      # W3C design tokens
├── screens/
│   ├── SCR-01-login.md     # Individual screen specs
│   ├── SCR-02-signup.md
│   ├── SCR-03-dashboard.md
│   └── ...
├── ui-exports/
│   ├── stitch-prompts.md   # Stitch-optimized prompts
│   ├── v0-prompts.md       # V0-optimized prompts
│   ├── figma-tokens.json   # Figma Variables export
│   ├── generic-prompts.md  # Tool-agnostic prompts
│   └── handoffs/           # Design handoff docs
└── ui-state/
    └── coordinator-state.json  # Agent state persistence
```

## Supported Design Tools

| Tool | Export Type | Strengths | Best For |
|------|-------------|-----------|----------|
| [Google Stitch](https://stitch.withgoogle.com/) | Visual prompts | Full-page layouts, Figma export | Quick mockups, exploration |
| [V0 by Vercel](https://v0.dev/) | Code prompts | Production React + shadcn/ui | React/Next.js implementation |
| [Figma](https://figma.com/) | Variables + specs | Collaboration, prototyping | Design team workflows |
| Pencil MCP | **Direct execution** | Interactive, screenshots, bidirectional | Rapid prototyping, iteration |
| Generic | Universal prompts | Tool-agnostic | Unknown tools, documentation |

## Philosophy

**Specifications are the source of truth. External tools are renderers.**

- Your specs survive tool changes
- Switch between tools without losing work
- Add new tools by adding adapters
- Keep design intent documented
- Agents handle complexity, you make decisions

## Git Integration

**Auto-commit with comprehensive messages, auto-push to remote.**

Inspired by GSD's git philosophy:
- Automatically initializes git repo if none exists
- Commits after each command completion
- Uses clear commit messages: `docs(ui): specify SCR-01 Login screen`
- Stages files individually (never `git add .`)
- Pushes automatically if remote exists
- Warns but doesn't block on git errors

See `ui-design/references/git-integration.md` for full protocol.

## Coexistence with GSD

This system installs to separate namespaces:

```
GSD:           commands/gsd/*, agents/gsd-*, get-shit-done/
UI Design:     commands/ui/*, agents/ui-*, ui-design/
```

Both can be installed and used together. GSD updates won't affect UI Design files.

### UI Commands in the GSD Cycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GSD + UI INTEGRATION                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /gsd:new-project ─────────────► PROJECT.md with requirements               │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  UI DESIGN PHASE (after requirements, before planning)              │   │
│  │                                                                     │   │
│  │  /ui:init ──────────────► UI-CONTEXT.md (platform, constraints)    │   │
│  │  /ui:logo ──────────────► LOGO-SPEC.md (branding, favicons)        │   │
│  │  /ui:setup-tokens ──────► design-tokens.json (colors, typography)  │   │
│  │  /ui:design-screens ────► screens/*.md (all screen specs)          │   │
│  │  /ui:define-components ─► COMPONENTS.md (component inventory)      │   │
│  │  /ui:patterns ──────────► UI-PATTERNS.md (reusable patterns)       │   │
│  │  /ui:export v0 ─────────► ui-exports/ (implementation prompts)     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│         │                                                                   │
│         ▼                                                                   │
│  /gsd:plan-phase ──────────► PLAN.md (references UI specs)                  │
│         │                                                                   │
│         ▼                                                                   │
│  /gsd:execute-phase ───────► Implementation (uses UI exports as prompts)    │
│         │                                                                   │
│         │  ┌─────────────────────────────────────────────────────────┐     │
│         ├──│  DURING EXECUTION                                       │     │
│         │  │  /ui:realize SCR-XX ──► Track screen completion         │     │
│         │  │  /ui:status ──────────► Check coverage progress         │     │
│         │  │  /ui:decisions ───────► Document design choices         │     │
│         │  └─────────────────────────────────────────────────────────┘     │
│         ▼                                                                   │
│  /gsd:verify-work ─────────► Verify implementation matches specs            │
│         │                                                                   │
│         │  ┌─────────────────────────────────────────────────────────┐     │
│         ├──│  AFTER EXECUTION                                        │     │
│         │  │  /ui:sync ────────────► Detect spec/implementation drift│     │
│         │  │  /ui:import-design ───► Sync visual changes back        │     │
│         │  └─────────────────────────────────────────────────────────┘     │
│         ▼                                                                   │
│  /gsd:complete-milestone ──► Archive milestone                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### When to Run Each UI Command

| GSD Phase | UI Commands | Purpose |
|-----------|-------------|---------|
| **After `/gsd:new-project`** | `/ui:init` | Establish UI context from requirements |
| | `/ui:logo` | Define branding before visual design |
| | `/ui:setup-tokens` | Create design system foundation |
| | `/ui:design-screens` | Specify all screens from requirements |
| | `/ui:define-components` | Extract reusable components |
| | `/ui:patterns` | Document UI patterns |
| | `/ui:export` | Generate prompts for implementation |
| **During `/gsd:execute-phase`** | `/ui:realize` | Mark screens as implemented |
| | `/ui:status` | Monitor specification coverage |
| | `/ui:decisions` | Record design decisions made |
| **After `/gsd:verify-work`** | `/ui:sync` | Detect drift between specs and code |
| | `/ui:import-design` | Backport visual refinements to specs |

### Recommended Flow

```bash
# 1. Start project with GSD
/gsd:new-project

# 2. UI Design phase (do ALL of these before planning)
/ui:init
/ui:logo                    # Optional: if app needs branding
/ui:setup-tokens
/ui:design-screens          # Specify ALL screens
/ui:define-components
/ui:export v0               # Or stitch/figma based on workflow

# 3. Plan implementation (specs are now available as reference)
/gsd:plan-phase 1

# 4. Execute (UI exports provide ready-to-use prompts)
/gsd:execute-phase 1
/ui:realize SCR-01          # Track as you complete screens
/ui:realize SCR-02

# 5. Verify and sync
/gsd:verify-work
/ui:sync                    # Catch any drift

# 6. Continue to next phase or milestone
/gsd:plan-phase 2
```

## Project Structure

```
ui-design-cc/
├── README.md                 # This file
├── commands/
│   └── ui/                   # 17 slash commands
│       ├── init.md
│       ├── setup-tokens.md
│       ├── design-screens.md
│       ├── define-components.md
│       ├── export.md
│       ├── import-tokens.md
│       ├── import-design.md
│       ├── realize.md
│       ├── sync.md
│       ├── status.md
│       ├── decisions.md
│       ├── patterns.md
│       ├── logo.md
│       ├── scan.md           # Code-to-design
│       ├── generate-specs.md # Code-to-design
│       ├── reverse-engineer.md # Code-to-design
│       ├── whats-new.md
│       └── help.md
├── agents/
│   ├── README.md             # Agent architecture
│   ├── ui-designer.md        # Coordinator agent
│   ├── ui-researcher.md      # Research agent
│   ├── ui-specifier.md       # Specification agent
│   ├── ui-prompter.md        # Export agent
│   ├── ui-brander.md         # Branding agent
│   └── ui-scanner.md         # Code analysis agent
└── ui-design/
    ├── adapters/
    │   ├── README.md         # Adapter comparison
    │   ├── stitch.md         # Google Stitch rules
    │   ├── v0.md             # Vercel V0 rules
    │   ├── figma.md          # Figma export rules
    │   └── generic.md        # Tool-agnostic rules
    ├── references/
    │   ├── design-systems.md # Design system references
    │   └── git-integration.md # Git auto-commit protocol
    └── templates/
        ├── README.md         # Template documentation
        ├── ui-spec.md        # Master spec template
        ├── ui-context.md     # Context template
        ├── screen.md         # Screen spec template
        ├── component.md      # Component template
        ├── ui-patterns.md    # Patterns template
        ├── ui-decisions.md   # Decisions template
        ├── ui-registry.md    # Registry template
        ├── logo-spec.md      # Logo/branding template
        ├── code-analysis.md  # Code scan output template
        └── design-tokens.json # Tokens template
```

## Version History

### 0.4.0 — Pencil MCP Integration

- **`/ui:pencil` command** — Interactive design workflow with 7 subcommands
- **Pencil adapter** — Direct design execution via MCP (no copy/paste)
- **Bidirectional sync** — Push specs to Pencil, pull designs back to specs
- **Visual validation** — Screenshot comparison against specifications
- **Interactive refinement** — Natural language design iteration
- **Design system management** — Create and manage reusable components
- **Style guide exploration** — Browse and apply style guides
- **Layout debugging** — Identify and fix positioning issues

### 0.3.0 — Code-to-Design Workflow

- **`/ui:scan` command** — Reverse-engineer existing codebases to discover components, screens, and tokens
- **`/ui:generate-specs` command** — Auto-generate UI specs from code analysis
- **`/ui:reverse-engineer` command** — One-shot workflow for minimal intervention
- **UI Scanner agent** — Specialized for codebase analysis and token extraction
- **`code-analysis.md` template** — Complete inventory format for discovered UI elements
- **Framework detection** — Next.js, React, Vue, Svelte, Flutter, iOS, Android
- **Token extraction** — From Tailwind config, CSS variables, theme files
- **Pattern detection** — Auth forms, dashboard layouts, settings sections

### 0.2.2 — Logo and Branding

- **`/ui:logo` command** — Create logo and favicon specifications
- **UI Brander agent** — Brand identity specialist with AI prompt engineering
- **`logo-spec.md` template** — Complete logo spec with favicon HTML and app icon sizes

### 0.2.1 — Git Integration

- **Auto-commit philosophy** — Commits after each command with comprehensive messages
- **Auto-push** — Pushes to remote if exists
- **Git init** — Automatically initializes git repo if none exists
- **Reference documentation** — `ui-design/references/git-integration.md`

### 0.2.0 — Multi-Agent Architecture

- **Multi-agent system** with specialized agents (Designer, Researcher, Specifier, Prompter)
- **10-section screen format** for comprehensive specifications
- **Dark mode support** via `$extensions.mode` in design tokens
- **ASCII wireframes** in all templates
- **New commands:** `/ui:init`, `/ui:import-design`, `/ui:realize`, `/ui:sync`, `/ui:decisions`, `/ui:patterns`
- **Enhanced adapters** with dark mode handling and iteration guidance
- **Template system** for consistent document generation
- **State persistence** across sessions

### 0.1.0 — Initial Release

- Design token system (W3C format)
- Screen specification workflow
- Component inventory extraction
- Export to Stitch, V0, Figma, Generic
- GSD integration support

## Feedback & Community

We'd love to hear from you!

### Report Issues
- [Bug Reports](https://github.com/vicentealvarezasencio/ui-design-cc/issues/new?template=bug_report.yml) — Something not working?
- [Feature Requests](https://github.com/vicentealvarezasencio/ui-design-cc/issues/new?template=feature_request.yml) — Have an idea?
- [Adapter Requests](https://github.com/vicentealvarezasencio/ui-design-cc/issues/new?template=adapter_request.yml) — Want a new design tool supported?
- [Documentation](https://github.com/vicentealvarezasencio/ui-design-cc/issues/new?template=documentation.yml) — Docs unclear?

### Join the Discussion
- [GitHub Discussions](https://github.com/vicentealvarezasencio/ui-design-cc/discussions) — Ideas, questions, show & tell

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

**Quick start:**
1. Fork the repository
2. Create a feature branch
3. Follow existing patterns for commands, agents, adapters
4. Update CHANGELOG.md
5. Submit a pull request

## License

MIT

---

**Need help?** Run `/ui:help` to see all commands and usage examples.

**Have feedback?** [Open an issue](https://github.com/vicentealvarezasencio/ui-design-cc/issues) or [start a discussion](https://github.com/vicentealvarezasencio/ui-design-cc/discussions).
