# UI Design System for Claude Code

A service-agnostic UI/UX design specification system for Claude Code. Define screens, components, and design tokens — export prompts for Stitch, V0, Figma, or any design tool.

## Why?

AI coding assistants like Claude Code are great at implementation but lack structured UI/UX design workflows. This system fills that gap:

- **Specify before you build** — Define screens and components before writing code
- **Service agnostic** — Your specs work with any design tool (Stitch, V0, Figma, etc.)
- **Works with GSD** — Complements Get-Shit-Done workflow, runs after requirements
- **Design tokens** — W3C-standard tokens that sync with design tools

## Installation

```bash
npx ui-design-cc
```

Options:
- `--global` — Install to `~/.claude/` (default)
- `--local` — Install to `./.claude/` in current project

## Commands

### Workflow

| Command | Description |
|---------|-------------|
| `/ui:setup-tokens` | Initialize design token system |
| `/ui:design-screens` | Create screen specifications from requirements |
| `/ui:define-components` | Extract component inventory from screens |

### Export

| Command | Description |
|---------|-------------|
| `/ui:export stitch` | Generate Google Stitch prompts |
| `/ui:export v0` | Generate Vercel V0 prompts |
| `/ui:export figma` | Export Figma-compatible tokens |
| `/ui:export generic` | Generate tool-agnostic prompts |

### Utility

| Command | Description |
|---------|-------------|
| `/ui:import-tokens` | Import tokens from external sources |
| `/ui:status` | Show specification coverage |
| `/ui:help` | Show all commands |

## Typical Workflow

### With GSD (Get-Shit-Done)

```
/gsd:new-project        → Define requirements
/ui:setup-tokens        → Establish design system
/ui:design-screens      → Create screen specifications
/ui:export stitch       → Generate prompts for Stitch
[use Stitch]            → Create visual designs
/gsd:plan-phase         → Plan implementation with UI specs
```

### Standalone

```
/ui:setup-tokens        → Start with design tokens
/ui:design-screens      → Define screens through conversation
/ui:define-components   → Extract component inventory
/ui:export v0           → Generate V0 prompts
[use V0]                → Generate React components
```

## Artifacts Created

```
.planning/
├── UI-SPEC.md              # Master UI specification
├── COMPONENTS.md           # Component inventory
├── design-tokens.json      # W3C design tokens
├── screens/
│   ├── SCR-01-login.md     # Individual screen specs
│   ├── SCR-02-signup.md
│   └── ...
└── ui-exports/
    ├── stitch-prompts.md   # Stitch-ready prompts
    ├── v0-prompts.md       # V0-ready prompts
    └── figma-tokens.json   # Figma-compatible tokens
```

## Supported Design Tools

| Tool | Export Type | Strengths |
|------|-------------|-----------|
| [Google Stitch](https://stitch.withgoogle.com/) | AI prompts | Full-page layouts, Figma export |
| [V0 by Vercel](https://v0.dev/) | AI prompts | Production React + shadcn/ui |
| [Figma](https://figma.com/) | Design tokens | Full design tool, collaboration |
| Generic | AI prompts | Works with any tool |

## Philosophy

**Specifications are the source of truth.** External tools are renderers.

- Your specs survive tool changes
- Switch between tools without losing work
- Add new tools by adding adapters
- Keep design intent documented

## Coexistence with GSD

This system installs to separate namespaces:

```
GSD:           commands/gsd/*, agents/gsd-*, get-shit-done/
UI Design:     commands/ui/*, agents/ui-*, ui-design/
```

Both can be installed and used together. GSD updates won't affect UI Design files.

## License

MIT
