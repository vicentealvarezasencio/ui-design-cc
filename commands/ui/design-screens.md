---
name: ui:design-screens
description: Create screen specifications from requirements or through guided conversation
allowed-tools: [Read, Write, Edit, AskUserQuestion, Glob, Task]
---

<objective>
Identify and specify all screens needed for the application. Create individual screen specification files and a master UI-SPEC.md document with navigation flows.
</objective>

<context>
@~/.claude/ui-design/templates/ui-spec.md
@~/.claude/ui-design/templates/screen.md
@~/.claude/ui-design/references/design-systems.md
</context>

<process>

<step name="load_context">
Check for existing project context:

1. If `.planning/REQUIREMENTS.md` exists (GSD project):
   - Read requirements
   - Extract UI-relevant requirements (user-facing features)
   - Map REQ-IDs to potential screens

2. If `.planning/PROJECT.md` exists:
   - Read project description and core value
   - Understand what the product does

3. If `.planning/design-tokens.json` exists:
   - Note design system is established
   - Reference in screen specs

4. If no GSD artifacts:
   - Proceed with guided conversation mode
</step>

<step name="identify_screens">
**If requirements exist:**
- Analyze each requirement for UI implications
- Group related requirements into logical screens
- Identify navigation patterns (auth flow, main app, settings, etc.)

**If standalone:**
Use AskUserQuestion to understand the app:
- "What kind of application is this?" (web app, mobile, dashboard, etc.)
- "What are the main things users will do?"
- "Does the app require authentication?"

From answers, derive screen inventory.
</step>

<step name="define_screen_list">
Present proposed screen inventory to user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI ► SCREEN INVENTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Based on [requirements/conversation], I've identified these screens:

Authentication Flow:
  □ SCR-01: Login
  □ SCR-02: Signup
  □ SCR-03: Forgot Password

Main Application:
  □ SCR-04: Dashboard
  □ SCR-05: [Feature Screen]
  □ SCR-06: [Feature Screen]

Settings:
  □ SCR-07: Settings
  □ SCR-08: Profile

───────────────────────────────────────────────────────
```

Ask user to confirm, add, or remove screens.
</step>

<step name="create_screen_specs">
For each confirmed screen, create a specification file.

Create `.planning/screens/` directory if needed.

For each screen, create `.planning/screens/SCR-XX-[name].md`:
- Use the screen template from @~/.claude/ui-design/templates/screen.md
- Include: route, layout, components, behavior, visual notes
- Map to requirements if available (REQ-XX)
- Reference design tokens where applicable

If design tokens don't exist, use placeholder references and note that `/ui:setup-tokens` should be run.
</step>

<step name="define_navigation">
Create navigation flow documentation:
- Group screens by flow (auth, main, settings)
- Define transitions between screens
- Note any modals or overlays
- Create simple flow diagrams using text/mermaid
</step>

<step name="create_ui_spec">
Create or update `.planning/UI-SPEC.md`:
- Project UI overview
- Design system reference (link to design-tokens.json)
- Screen inventory with status
- Navigation flows
- Component summary (placeholder until /ui:define-components)

Use template from @~/.claude/ui-design/templates/ui-spec.md
</step>

<step name="present_results">
Show summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI ► SCREENS DEFINED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Created [N] screen specifications:

  ✓ SCR-01: Login           .planning/screens/SCR-01-login.md
  ✓ SCR-02: Signup          .planning/screens/SCR-02-signup.md
  ...

Master spec: .planning/UI-SPEC.md

───────────────────────────────────────────────────────

## ▶ Next Up

**Define components** — Extract component inventory from screens

`/ui:define-components`

**Or export prompts** — Generate prompts for external tools

`/ui:export stitch`
`/ui:export v0`

───────────────────────────────────────────────────────
```
</step>

</process>

<success_criteria>
- `.planning/UI-SPEC.md` exists with navigation flows
- `.planning/screens/SCR-XX-*.md` files created for all screens
- Each screen spec includes route, layout, components, behavior
- Navigation flows document how screens connect
- Requirements mapped to screens (if REQUIREMENTS.md exists)
</success_criteria>
