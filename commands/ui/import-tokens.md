---
name: ui:import-tokens
description: Import design tokens from external sources (Figma, Style Dictionary, W3C format)
allowed-tools: [Read, Write, Edit, AskUserQuestion, Glob]
---

<objective>
Import design tokens from external design tools or token files. Merge or replace existing tokens while maintaining W3C format compatibility.
</objective>

<process>

<step name="identify_source">
Use AskUserQuestion to determine import source:

**Question: Where are you importing tokens from?**
- Figma export (JSON)
- Style Dictionary format
- W3C Design Tokens format
- Tailwind config
- Custom JSON file
</step>

<step name="locate_file">
Ask user for file path or have them paste the JSON content.

If file path provided:
- Read the file
- Validate it's valid JSON

If content pasted:
- Parse the JSON
- Validate structure
</step>

<step name="detect_format">
Analyze the JSON structure to detect format:

**Figma Variables export:**
```json
{
  "colors": {
    "primary": { "value": "#2563EB", "type": "color" }
  }
}
```

**Style Dictionary:**
```json
{
  "color": {
    "primary": { "value": "#2563EB" }
  }
}
```

**W3C Design Tokens:**
```json
{
  "color": {
    "primary": { "$value": "#2563EB", "$type": "color" }
  }
}
```

**Tailwind config:**
```json
{
  "theme": {
    "colors": {
      "primary": "#2563EB"
    }
  }
}
```
</step>

<step name="transform_tokens">
Transform imported tokens to W3C Design Tokens format:

```json
{
  "color": {
    "primary": {
      "$value": "#2563EB",
      "$type": "color",
      "$description": "Primary brand color"
    }
  }
}
```

Handle:
- Color formats (hex, rgb, hsl) → normalize to hex
- Spacing values → ensure consistent units
- Typography → structure as composite tokens
- Shadows → parse into structured format
</step>

<step name="check_existing">
If `.planning/design-tokens.json` exists:
- Compare with imported tokens
- Identify conflicts
- Ask user: Merge (keep both, imported wins conflicts) or Replace (overwrite all)?

If doesn't exist:
- Create new file
</step>

<step name="write_tokens">
Write merged/replaced tokens to `.planning/design-tokens.json`

Validate the output:
- Valid JSON
- W3C format compliance
- All required categories present
</step>

<step name="present_results">
Show summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI ► TOKENS IMPORTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source:   [detected format]
Action:   [Merged with existing / Created new]

Tokens imported:
  Colors:     [N] values
  Typography: [N] values
  Spacing:    [N] values
  Shadows:    [N] values
  Other:      [N] values

Output: .planning/design-tokens.json

───────────────────────────────────────────────────────

## ▶ Next Up

**Update exports** — Regenerate prompts with new tokens

`/ui:export [service]`

───────────────────────────────────────────────────────
```
</step>

</process>

<success_criteria>
- Tokens successfully parsed from source format
- Tokens transformed to W3C format
- `.planning/design-tokens.json` updated
- No data loss during transformation
- Conflicts resolved per user preference
</success_criteria>
