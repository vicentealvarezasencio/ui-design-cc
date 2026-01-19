# Adapters Overview

This directory contains export adapters for different design tools. Each adapter transforms UI specifications into tool-specific prompts or formats.

## Adapter Comparison

| Feature | Stitch | V0 | Figma | Generic |
|---------|--------|-----|-------|---------|
| **Output** | Visual designs | React code | Design files | Universal prompts |
| **Primary Use** | Quick mockups | Production code | Full design work | Unknown tools |
| **Best For** | Visual exploration | React/Next.js apps | Team collaboration | Future-proofing |
| **Code Output** | HTML/CSS/Flutter | React + Tailwind | CSS snippets | None |
| **Token Import** | Manual (hex values) | Via Tailwind config | Native Variables | Manual (hex values) |
| **Iteration** | Re-prompt | Built-in UI | Full control | Re-prompt |
| **Collaboration** | Solo | Solo | Excellent | Solo |
| **Prototyping** | N/A | React state | Excellent | N/A |

## Capability Matrix

| Capability | Stitch | V0 | Figma | Generic |
|------------|--------|-----|-------|---------|
| Full screens | ✅ Excellent | ✅ Good | ✅ Excellent | ✅ Works |
| Components | ⚠️ Limited | ✅ Excellent | ✅ Excellent | ✅ Works |
| Responsive | ✅ Good | ✅ Excellent | ✅ Excellent | ✅ Works |
| Dark mode | ✅ Good | ✅ Excellent | ✅ Excellent | ✅ Works |
| Animations | ⚠️ Limited | ✅ Good | ✅ Good | ⚠️ Variable |
| Production code | ⚠️ Basic | ✅ Excellent | ⚠️ Dev Mode | ⚠️ Variable |
| TypeScript | ❌ No | ✅ Excellent | ❌ N/A | ❌ N/A |
| Design handoff | ⚠️ Via Figma | Direct code | ✅ Excellent | ⚠️ Manual |

## When to Use Each Adapter

### Stitch
```
Use when:
- Early visual exploration
- Need quick mockups for feedback
- Non-React projects
- Want Figma-exportable designs
- Marketing/landing pages
- Client presentations

Skip when:
- Need production code
- Complex interactions
- Detailed component systems
```

### V0
```
Use when:
- Building React/Next.js apps
- Need TypeScript code
- Want shadcn/ui components
- Need form validation
- Building data tables
- Component-level generation

Skip when:
- Not using React
- Need design files
- Team design review needed
- Visual exploration phase
```

### Figma
```
Use when:
- Full design system work
- Team collaboration needed
- Detailed visual refinement
- Interactive prototypes
- Design-to-dev handoff
- Client presentations

Skip when:
- Solo developer project
- Simple screens
- Time-constrained
- React implementation priority
```

### Generic
```
Use when:
- Tool not supported
- Testing new AI tools
- Tool-agnostic docs needed
- Fallback when others fail
- Documentation purposes

Skip when:
- Using supported tool
- Need optimized output
- Tool-specific features needed
```

## Typical Workflows

### Solo Developer (React)
```
Spec → V0 → Codebase
```

### Solo Developer (Non-React)
```
Spec → Stitch → Export → Implement
```

### With Design Team
```
Spec → Figma → Refine → V0 → Codebase
```

### Visual Exploration First
```
Spec → Stitch → Figma → Refine → V0 → Codebase
```

### Unknown Tool
```
Spec → Generic → Adapt → Tool → Export
```

## Common Features Across All Adapters

Each adapter includes:

1. **Capability Matrix** — What the tool can/cannot do
2. **Prompt Structure** — Basic and extended templates
3. **Transformation Rules** — Spec → prompt conversion
4. **Token Mapping** — Design tokens → tool format
5. **Component Descriptions** — Universal → tool-specific
6. **Iteration Guidance** — How to refine results
7. **Example Transformation** — Concrete before/after
8. **Reverse Sync** — Importing designs back
9. **Handoff Document** — Team communication
10. **Best Practices** — Dos and don'ts

## Adding New Adapters

To add support for a new design tool:

1. Create `[tool-name].md` in this directory
2. Follow the adapter template structure:
   - `<adapter_info>` — Service metadata
   - `<capability_matrix>` — Feature support
   - `<prompt_structure>` — Output templates
   - `<transformation_rules>` — Conversion logic
   - `<token_mapping>` — Token translation
   - `<component_descriptions>` — Component mapping
   - `<iteration_guidance>` — Refinement patterns
   - `<example_transformation>` — Before/after
   - `<reverse_sync>` — Import guidance
   - `<handoff_document>` — Handoff template
   - `<best_practices>` — Guidance

3. Update this README with comparison
4. Test with sample specifications

## Input/Output

### Input (From Specifications)

Adapters consume:
- Screen specs from `ui-design/templates/screen.md` (10-section format)
- Component specs from `ui-design/templates/component.md`
- Design tokens from `ui-design/templates/design-tokens.json`
- Context from `ui-design/templates/ui-context.md`
- Patterns from `ui-design/templates/ui-patterns.md`

### Output (To External Tools)

```
.planning/ui-exports/
├── stitch-prompts.md      # Stitch-optimized prompts
├── v0-prompts.md          # V0-optimized prompts
├── figma-tokens.json      # Figma Variables export
├── figma-setup.md         # Figma setup instructions
├── generic-prompts.md     # Tool-agnostic prompts
└── handoffs/
    ├── SCR-01-brief.md    # Per-screen design briefs
    └── design-handoff.md  # Full project handoff
```

## Dark Mode Support

All adapters support dark mode via design tokens:

```json
{
  "color": {
    "background": {
      "default": {
        "$value": "#FFFFFF",
        "$extensions": {
          "mode": { "dark": "#0F172A" }
        }
      }
    }
  }
}
```

### Adapter-Specific Dark Mode Handling

| Adapter | Dark Mode Approach |
|---------|-------------------|
| Stitch | Request explicit dark mode variant in prompt |
| V0 | Uses Tailwind `dark:` classes, respects CSS variables |
| Figma | Uses Variable modes (Light/Dark) |
| Generic | Describe both modes in visual language |

## Version History

- **0.2.0** — Enhanced adapters
  - Dark mode support via token `$extensions.mode`
  - 10-section screen format compatibility
  - Template integration
  - Improved iteration guidance
  - Registry tracking updates

- **0.1.0** — Initial adapters: Stitch, V0, Figma, Generic
