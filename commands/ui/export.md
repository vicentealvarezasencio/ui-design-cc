---
name: ui:export
description: Generate service-specific prompts and exports for external design tools
argument-hint: "[service: stitch|v0|figma|generic]"
allowed-tools: [Read, Write, Glob, AskUserQuestion]
---

<objective>
Transform UI specifications into service-optimized outputs. Generate prompts for AI design tools (Stitch, V0) or export formats for design applications (Figma).
</objective>

<context>
@~/.claude/ui-design/adapters/stitch.md
@~/.claude/ui-design/adapters/v0.md
@~/.claude/ui-design/adapters/figma.md
@~/.claude/ui-design/adapters/generic.md
</context>

<process>

<step name="parse_argument">
Parse the service argument:
- `stitch` → Google Stitch prompts
- `v0` → Vercel V0 prompts
- `figma` → Figma-compatible design tokens
- `generic` → Tool-agnostic prompts (default if no argument)

If no argument provided, ask user which service to export for.
</step>

<step name="verify_specs">
Check that specifications exist:
- `.planning/UI-SPEC.md` — required
- `.planning/screens/*.md` — required
- `.planning/COMPONENTS.md` — optional but recommended
- `.planning/design-tokens.json` — optional but recommended

If screens don't exist, inform user to run `/ui:design-screens` first.
</step>

<step name="load_specs">
Read all specification files:
- Parse UI-SPEC.md for overview and flows
- Read each screen specification
- Load design tokens if available
- Load component specs if available
</step>

<step name="apply_adapter">
Load the appropriate adapter from `@~/.claude/ui-design/adapters/[service].md`

Each adapter defines:
- Prompt structure and format
- Service-specific terminology
- Best practices for that tool
- Token/export format

Transform each screen spec into the service format.
</step>

<step name="generate_exports" service="stitch">
**For Stitch:**

Create `.planning/ui-exports/stitch-prompts.md`:

```markdown
# Stitch Prompts

Generated from UI specifications. Copy each prompt into Google Stitch.

## SCR-01: Login

### Stitch Prompt
```
[Generated Stitch-optimized prompt for login screen]
```

### Expected Output
- Layout: [description]
- Key components: [list]
- Export format: Figma / HTML+CSS / Flutter

---

## SCR-02: Signup
...
```
</step>

<step name="generate_exports" service="v0">
**For V0:**

Create `.planning/ui-exports/v0-prompts.md`:

```markdown
# V0 Prompts

Generated from UI specifications. Copy each prompt into v0.dev.

## SCR-01: Login

### V0 Prompt
```
[Generated V0-optimized prompt using shadcn/ui terminology]
```

### After Generation
- Review generated code
- Copy with "Add to Codebase" or `npx v0 add`
- Component location: src/components/screens/Login.tsx

---

## SCR-02: Signup
...
```
</step>

<step name="generate_exports" service="figma">
**For Figma:**

Create `.planning/ui-exports/figma-tokens.json`:
- Transform design-tokens.json to Figma Variables format
- Include color modes if defined (light/dark)
- Structure for Figma's native import (November 2026+) or plugin import

Create `.planning/ui-exports/figma-setup.md`:
- Instructions for importing tokens
- Plugin recommendations
- How to set up Figma file structure matching screen specs
</step>

<step name="generate_exports" service="generic">
**For Generic:**

Create `.planning/ui-exports/generic-prompts.md`:
- Tool-agnostic prompts that work anywhere
- Focus on describing layout, components, and behavior
- No service-specific terminology
</step>

<step name="create_export_directory">
Ensure `.planning/ui-exports/` directory exists.
Write all generated files.
</step>

<step name="present_results">
Show summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI ► EXPORT COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service:  [stitch/v0/figma/generic]
Screens:  [N] prompts generated

Output:   .planning/ui-exports/[service]-prompts.md

───────────────────────────────────────────────────────

## How to Use

1. Open [service URL]
2. Copy prompt for each screen
3. Generate and iterate
4. Export results back to project

[Service-specific tips]

───────────────────────────────────────────────────────

## ▶ Other Exports

`/ui:export stitch`    Google Stitch
`/ui:export v0`        Vercel V0
`/ui:export figma`     Figma tokens
`/ui:export generic`   Any tool

───────────────────────────────────────────────────────
```
</step>

</process>

<success_criteria>
- Export file created in `.planning/ui-exports/`
- All screens have corresponding prompts/exports
- Prompts follow service-specific best practices
- Design tokens included where applicable
- Clear usage instructions provided
</success_criteria>
