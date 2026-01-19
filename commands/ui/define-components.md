---
name: ui:define-components
description: Extract and define component inventory from screen specifications
allowed-tools: [Read, Write, Edit, Glob]
---

<objective>
Analyze all screen specifications to extract unique UI components. Create a comprehensive COMPONENTS.md inventory with props, variants, and usage patterns.
</objective>

<context>
@~/.claude/ui-design/templates/component.md
@~/.claude/ui-design/references/design-systems.md
</context>

<process>

<step name="verify_screens">
Check that screen specifications exist:
- Glob for `.planning/screens/SCR-*.md`
- If none found, inform user to run `/ui:design-screens` first
</step>

<step name="extract_components">
Read all screen specification files.

For each screen:
- Parse the Components section
- Extract component names and their usage context
- Note props being used
- Track which screens use each component

Build a component inventory map:
```
{
  "Button": {
    "usedIn": ["SCR-01", "SCR-02", "SCR-04"],
    "variants": ["primary", "secondary", "ghost"],
    "props": ["label", "loading", "disabled", "icon"]
  },
  "InputField": {
    "usedIn": ["SCR-01", "SCR-02", "SCR-03"],
    "types": ["text", "email", "password"],
    "props": ["label", "type", "required", "error"]
  }
}
```
</step>

<step name="categorize_components">
Organize components into categories:

**Primitives** (basic building blocks):
- Button, Link, Icon, Badge, Avatar

**Form Elements**:
- InputField, TextArea, Select, Checkbox, Radio, Switch, DatePicker

**Layout**:
- Card, Container, Divider, Stack, Grid

**Navigation**:
- Navbar, Sidebar, Tabs, Breadcrumb, Pagination

**Feedback**:
- Alert, Toast, Modal, Dialog, Tooltip

**Data Display**:
- Table, List, DataCard, Chart

**Composite** (app-specific combinations):
- LoginForm, UserCard, FeatureCard, etc.
</step>

<step name="define_component_specs">
For each unique component, create a specification:

```markdown
## ComponentName

**Category:** [Primitive/Form/Layout/Navigation/Feedback/Data/Composite]
**Used in:** SCR-01, SCR-02, SCR-04

**Variants:** primary, secondary, ghost, destructive
**Sizes:** sm, md, lg

**Props:**
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| label | string | - | Yes | Button text |
| variant | enum | "primary" | No | Visual style |
| size | enum | "md" | No | Size preset |
| loading | boolean | false | No | Shows spinner |
| disabled | boolean | false | No | Prevents interaction |
| icon | string | null | No | Icon name (left position) |
| onClick | function | - | No | Click handler |

**States:** default, hover, active, focus, disabled, loading

**Accessibility:**
- Must have aria-label if icon-only
- Keyboard navigable (Enter/Space to activate)

**Design Token References:**
- Background: color.primary.default
- Text: color.primary.foreground
- Border radius: border.radius.md
- Padding: spacing.3 spacing.4
```
</step>

<step name="write_components_file">
Create `.planning/COMPONENTS.md` with:
- Overview and component count
- Component inventory table (quick reference)
- Detailed specifications for each component
- Notes on any composite/app-specific components
</step>

<step name="update_ui_spec">
Update `.planning/UI-SPEC.md` with component summary:
- Total component count
- Link to COMPONENTS.md
- Note which components are standard vs. custom
</step>

<step name="present_results">
Show summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI ► COMPONENTS DEFINED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Extracted [N] unique components from [M] screens:

  Primitives:     Button, Link, Icon, Badge
  Form Elements:  InputField, Select, Checkbox
  Layout:         Card, Container, Divider
  Navigation:     Navbar, Tabs
  Feedback:       Modal, Toast
  Composite:      LoginForm, UserCard

Component spec: .planning/COMPONENTS.md

───────────────────────────────────────────────────────

## ▶ Next Up

**Export prompts** — Generate prompts for external design tools

`/ui:export stitch`    Google Stitch prompts
`/ui:export v0`        Vercel V0 prompts
`/ui:export figma`     Figma-compatible tokens

───────────────────────────────────────────────────────
```
</step>

</process>

<success_criteria>
- `.planning/COMPONENTS.md` exists with full inventory
- All components from screen specs are documented
- Each component has props, variants, states defined
- Components categorized appropriately
- UI-SPEC.md updated with component summary
</success_criteria>
