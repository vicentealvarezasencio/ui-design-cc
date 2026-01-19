---
name: ui:status
description: Show UI specification coverage and realization status
allowed-tools: [Read, Glob]
---

<objective>
Display the current state of UI specifications: what's defined, what's been realized in external tools, and what's pending.
</objective>

<process>

<step name="check_artifacts">
Check for existence of UI artifacts:
- `.planning/UI-SPEC.md`
- `.planning/design-tokens.json`
- `.planning/COMPONENTS.md`
- `.planning/screens/*.md`
- `.planning/ui-exports/*`
</step>

<step name="gather_status">
For each artifact type, determine status:

**Design Tokens:**
- Exists? Y/N
- Token count by category

**Screens:**
- Count of screen specs
- List each with realization status (from UI-SPEC.md tracking)

**Components:**
- Exists? Y/N
- Component count by category

**Exports:**
- Which services have been exported to
- When last exported (from file timestamps)
</step>

<step name="display_status">
Show comprehensive status:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI ► STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN TOKENS                              [✓ Defined]
───────────────────────────────────────────────────────
  Colors:      12 values
  Typography:   8 values
  Spacing:     10 values
  Shadows:      4 values

SCREENS                                    [6 defined]
───────────────────────────────────────────────────────
  ✓ SCR-01: Login              Realized (Stitch)
  ✓ SCR-02: Signup             Realized (Stitch)
  ◆ SCR-03: Dashboard          Exported, pending
  ○ SCR-04: Settings           Specified only
  ○ SCR-05: Profile            Specified only
  ○ SCR-06: Project View       Specified only

  Progress: ██████░░░░ 33% realized

COMPONENTS                                 [✓ Defined]
───────────────────────────────────────────────────────
  Primitives:    6 components
  Form:          4 components
  Layout:        3 components
  Composite:     2 components
  Total:        15 components

EXPORTS                                    [2 services]
───────────────────────────────────────────────────────
  ✓ Stitch     .planning/ui-exports/stitch-prompts.md
  ✓ V0         .planning/ui-exports/v0-prompts.md
  ○ Figma      Not exported
  ○ Generic    Not exported

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ▶ Suggested Actions

[Based on status, suggest next steps]

If tokens missing:     `/ui:setup-tokens`
If screens missing:    `/ui:design-screens`
If components missing: `/ui:define-components`
If exports outdated:   `/ui:export [service]`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
</step>

<step name="check_gsd_context">
If GSD artifacts exist (`.planning/ROADMAP.md`, `.planning/STATE.md`):
- Show which phase the project is in
- Note if UI specs should be updated based on phase progress
</step>

</process>

<success_criteria>
- All UI artifacts checked for existence
- Clear status display for each category
- Actionable next steps provided
- Integration with GSD state if applicable
</success_criteria>
