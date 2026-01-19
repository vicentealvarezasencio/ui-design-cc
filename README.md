# UI Design System for Claude Code

> A service-agnostic UI/UX design specification system for Claude Code.
> Define screens, components, and design tokens — export prompts for Stitch, V0, Figma, or any design tool.

**Version:** 0.2.1

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
├── commands/ui/                    # 14 slash commands
├── agents/                         # 4 specialized agents
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
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ UI Researcher│ │ UI Specifier│ │ UI Prompter │
    │             │ │             │ │             │
    │ • Context   │ │ • Screens   │ │ • Exports   │
    │ • Inspiration│ │ • Components│ │ • Prompts   │
    │ • Patterns  │ │ • Patterns  │ │ • Handoffs  │
    │ • Analysis  │ │ • Wireframes│ │ • Iterations│
    └─────────────┘ └─────────────┘ └─────────────┘
```

| Agent | Role | Triggered By |
|-------|------|--------------|
| **UI Designer** | Coordinator — routes tasks, maintains state | Default |
| **UI Researcher** | Context discovery, inspiration analysis | `/ui:init`, "like [Product]" |
| **UI Specifier** | Screen specs, component definitions | `/ui:design-screens`, `/ui:define-components` |
| **UI Prompter** | Export generation, prompt optimization | `/ui:export` |

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
| `ui-context.md` | `.planning/UI-CONTEXT.md` | Platform and constraints |
| `screen.md` | `.planning/screens/SCR-XX-*.md` | Individual screen specs (10-section) |
| `component.md` | `.planning/COMPONENTS.md` | Component inventory |
| `ui-patterns.md` | `.planning/UI-PATTERNS.md` | Reusable UI patterns |
| `ui-decisions.md` | `.planning/UI-DECISIONS.md` | Design decision log |
| `ui-registry.md` | `.planning/UI-REGISTRY.md` | Realization tracking |
| `design-tokens.json` | `.planning/design-tokens.json` | W3C tokens with dark mode |

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

## Project Structure

```
ui-design-cc/
├── README.md                 # This file
├── commands/
│   └── ui/                   # 14 slash commands
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
│       ├── whats-new.md
│       └── help.md
├── agents/
│   ├── README.md             # Agent architecture
│   ├── ui-designer.md        # Coordinator agent
│   ├── ui-researcher.md      # Research agent
│   ├── ui-specifier.md       # Specification agent
│   └── ui-prompter.md        # Export agent
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
        └── design-tokens.json # Tokens template
```

## Version History

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing patterns for commands, agents, adapters
4. Update relevant README files
5. Submit a pull request

## License

MIT

---

**Need help?** Run `/ui:help` to see all commands and usage examples.
