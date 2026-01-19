---
name: ui:help
description: Show available UI Design System commands and usage guide
allowed-tools: []
---

<objective>
Display all available UI Design System commands with descriptions and usage examples.
</objective>

<process>

Display the following help information:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI Design System for Claude Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A service-agnostic UI/UX specification system that works
alongside GSD (Get Shit Done) or standalone.

WORKFLOW COMMANDS
─────────────────────────────────────────────────────

  /ui:setup-tokens        Initialize design token system
                          Define colors, typography, spacing
                          Creates: design-tokens.json

  /ui:design-screens      Create screen specifications
                          Reads REQUIREMENTS.md (if exists)
                          Creates: UI-SPEC.md, screens/*.md

  /ui:define-components   Extract component inventory
                          Analyzes screen specs
                          Creates: COMPONENTS.md

EXPORT COMMANDS
─────────────────────────────────────────────────────

  /ui:export [service]    Generate service-specific prompts
                          Services: stitch, v0, figma, generic
                          Creates: ui-exports/*.md

  /ui:import-tokens       Import design tokens from external
                          Supports: Figma JSON, W3C format

STATUS COMMANDS
─────────────────────────────────────────────────────

  /ui:status              Show specification coverage
                          Screens defined vs. realized
                          Component inventory status

  /ui:help                Show this help message

TYPICAL WORKFLOW
─────────────────────────────────────────────────────

  With GSD:
    /gsd:new-project      → Define requirements
    /ui:setup-tokens      → Establish design system
    /ui:design-screens    → Create screen specs
    /ui:export stitch     → Generate prompts
    [use external tool]   → Create visuals
    /gsd:plan-phase       → Continue with implementation

  Standalone:
    /ui:setup-tokens      → Start with design tokens
    /ui:design-screens    → Define screens manually
    /ui:define-components → Extract components
    /ui:export v0         → Generate V0 prompts

ARTIFACTS CREATED
─────────────────────────────────────────────────────

  .planning/
  ├── UI-SPEC.md            Master UI specification
  ├── COMPONENTS.md         Component inventory
  ├── design-tokens.json    Design token definitions
  ├── screens/
  │   ├── SCR-01-*.md       Individual screen specs
  │   └── ...
  └── ui-exports/
      ├── stitch-prompts.md
      ├── v0-prompts.md
      └── figma-tokens.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>
