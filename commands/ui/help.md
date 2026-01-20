---
name: ui:help
description: Show available UI Design System commands and usage guide
allowed-tools: []
---

<objective>
Display all available UI Design System commands with descriptions, usage examples, and workflow guidance.
</objective>

<process>

Display the following help information:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI Design System for Claude Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A service-agnostic UI/UX specification system that works
alongside GSD (Get Shit Done) or standalone.

Version: 0.2.1

INITIALIZATION
─────────────────────────────────────────────────────

  /ui:init              Initialize UI context for project
                        Discovers platform, framework, inspiration
                        Creates: UI-CONTEXT.md, state files

  /ui:setup-tokens      Set up design token system
                        Define colors, typography, spacing
                        Creates: design-tokens.json

SPECIFICATION
─────────────────────────────────────────────────────

  /ui:design-screens    Create screen specifications
                        10-section format with wireframes
                        Creates: UI-SPEC.md, screens/*.md

  /ui:define-components Extract component inventory
                        Props, variants, states, accessibility
                        Creates: COMPONENTS.md

  /ui:patterns          Document reusable UI patterns
                        Add, view, or auto-extract patterns
                        Creates: UI-PATTERNS.md

EXPORT
─────────────────────────────────────────────────────

  /ui:export [service]  Generate service-specific prompts
                        Services: stitch, v0, figma, generic
                        Creates: ui-exports/*.md

                        Examples:
                        /ui:export stitch
                        /ui:export v0 SCR-01
                        /ui:export figma

BRANDING
─────────────────────────────────────────────────────

  /ui:logo              Create logo and favicon specifications
                        Guided questions, AI image prompts
                        Creates: LOGO-SPEC.md, logo-prompts.md

                        Options:
                        /ui:logo --refresh
                        /ui:logo --favicon-only
                        /ui:logo --export midjourney

IMPORT
─────────────────────────────────────────────────────

  /ui:import-tokens     Import tokens from external sources
                        Supports: Figma, Tailwind, W3C, etc.
                        Updates: design-tokens.json

  /ui:import-design     Import design from external tools
                        Reverse sync, drift detection
                        Updates: screen specs, patterns

TRACKING
─────────────────────────────────────────────────────

  /ui:realize [screen]  Mark screens as realized
                        Track implementation status
                        Updates: UI-REGISTRY.md

                        Examples:
                        /ui:realize SCR-01
                        /ui:realize SCR-01,SCR-02

  /ui:sync              Detect and fix drift
                        Token, component, export consistency
                        Auto-fix or generate recommendations

STATUS & INFO
─────────────────────────────────────────────────────

  /ui:status            Show specification coverage
                        Screens, components, exports, progress

  /ui:decisions         View design decision log
                        Add, view, filter decisions

                        Examples:
                        /ui:decisions
                        /ui:decisions add
                        /ui:decisions DEC-005

  /ui:whats-new         Show version history and changes

  /ui:help              Show this help message

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TYPICAL WORKFLOWS
─────────────────────────────────────────────────────

## Starting Fresh

  1. /ui:init               Set up context
  2. /ui:setup-tokens       Define design system
  3. /ui:design-screens     Specify all screens
  4. /ui:define-components  Extract components
  5. /ui:export stitch      Generate prompts
  6. [Use external tool]    Create designs
  7. /ui:realize            Track completion

## With GSD Integration

  /gsd:new-project          Define requirements
  /ui:init                  Set up UI context
  /ui:setup-tokens          Define tokens
  /ui:design-screens        Specs from requirements
  /ui:export v0             Generate code prompts
  /gsd:execute-phase        Implement

## Quick Export Flow

  /ui:export stitch         Export to Stitch
  [Generate in Stitch]
  /ui:import-design         Capture changes
  /ui:realize SCR-01        Mark as done

## Maintenance

  /ui:sync                  Check for drift
  /ui:decisions add         Document choice
  /ui:patterns extract      Find new patterns

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARTIFACTS CREATED
─────────────────────────────────────────────────────

  .planning/
  ├── UI-CONTEXT.md           Platform and constraints
  ├── UI-SPEC.md              Master specification
  ├── UI-DECISIONS.md         Decision log
  ├── UI-PATTERNS.md          Pattern library
  ├── UI-REGISTRY.md          Realization tracking
  ├── COMPONENTS.md           Component inventory
  ├── design-tokens.json      Design tokens (W3C)
  ├── screens/
  │   ├── SCR-01-login.md     Individual screen specs
  │   ├── SCR-02-signup.md
  │   └── ...
  ├── ui-exports/
  │   ├── stitch-prompts.md   Stitch-optimized prompts
  │   ├── v0-prompts.md       V0-optimized prompts
  │   ├── figma-tokens.json   Figma Variables export
  │   ├── generic-prompts.md  Tool-agnostic prompts
  │   └── handoffs/           Design handoff docs
  └── ui-state/
      └── coordinator-state.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUPPORTED SERVICES
─────────────────────────────────────────────────────

  Stitch      Visual design generation (Google)
              Best for: High-fidelity mockups

  V0          React component generation (Vercel)
              Best for: Code implementation

  Figma       Design tool integration
              Best for: Designer handoff

  Generic     Tool-agnostic prompts
              Best for: Any AI design tool

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MULTI-AGENT SYSTEM
─────────────────────────────────────────────────────

The system uses specialized agents:

  UI Designer     Coordinator, routes tasks
  UI Researcher   Context, inspiration, analysis
  UI Specifier    Screens, components, patterns
  UI Prompter     Exports, prompts, handoffs

Agents are spawned automatically based on task complexity.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

More Info:
  /ui:whats-new             Version history
  ~/.claude/ui-design/      Full documentation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>
