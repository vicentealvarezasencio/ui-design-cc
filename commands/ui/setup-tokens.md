---
name: ui:setup-tokens
description: Initialize design token system with colors, typography, and spacing
allowed-tools: [Read, Write, Edit, AskUserQuestion, Glob]
---

<objective>
Establish the foundational design token system for the project. Gather user preferences for colors, typography, and spacing, then create a W3C-compatible design-tokens.json file.
</objective>

<context>
@~/.claude/ui-design/templates/design-tokens.json
@~/.claude/ui-design/references/design-systems.md
</context>

<process>

<step name="check_existing">
Check if `.planning/design-tokens.json` already exists.

If exists:
- Show current token summary
- Ask if user wants to update or start fresh
</step>

<step name="ensure_directory">
Create `.planning/` directory if it doesn't exist.
</step>

<step name="gather_preferences">
Use AskUserQuestion to gather design preferences. Ask about:

**Question 1: Color Palette**
- "What's your primary brand color?"
- Offer common options: Blue (#2563EB), Green (#10B981), Purple (#8B5CF6), Custom
- Also ask for secondary color preference

**Question 2: Typography**
- "What font family should we use?"
- Options: Inter (modern), System UI (native), Roboto (Google), Custom

**Question 3: Style Direction**
- "What visual style are you going for?"
- Options: Minimal/Clean, Soft/Rounded, Bold/Strong, Custom

**Question 4: Component Library Target** (if they know)
- "Are you targeting a specific component library?"
- Options: shadcn/ui, Material UI, Tailwind defaults, Custom/None
</step>

<step name="generate_tokens">
Based on preferences, generate design-tokens.json following W3C Design Tokens format.

Include:
- **Colors**: primary, secondary, accent, background, surface, text (with semantic variants)
- **Typography**: font families, sizes (xs through 4xl), weights, line heights
- **Spacing**: scale from 0.5 through 16 (in 4px base unit increments)
- **Borders**: radius values (none, sm, md, lg, full), widths
- **Shadows**: elevation levels (sm, md, lg, xl)
- **Transitions**: duration and easing values

Write to `.planning/design-tokens.json`
</step>

<step name="create_summary">
Display a summary of what was created:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI ► DESIGN TOKENS CREATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary:     [color] [name]
Secondary:   [color] [name]
Typography:  [font family]
Style:       [direction]
Target:      [component library or "Custom"]

Token file:  .planning/design-tokens.json

───────────────────────────────────────────────────────

## ▶ Next Up

**Define screens** — Create screen specifications

`/ui:design-screens`

───────────────────────────────────────────────────────
```
</step>

</process>

<success_criteria>
- `.planning/design-tokens.json` exists with valid W3C format
- All core token categories defined (colors, typography, spacing, borders, shadows)
- Tokens align with user's stated preferences
</success_criteria>
