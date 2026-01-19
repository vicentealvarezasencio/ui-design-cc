# Component Template

Template for component specifications in `.planning/COMPONENTS.md`.

<template>

```markdown
## [ComponentName]

**Category:** [Primitive | Form | Layout | Navigation | Feedback | Data | Composite]
**Used in:** SCR-01, SCR-02, SCR-04

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| primary | Bold, filled background | Main actions |
| secondary | Subtle, outlined | Secondary actions |
| ghost | Minimal, text only | Tertiary actions |
| destructive | Red, warning style | Delete, remove |

### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 32px | spacing.2 spacing.3 | typography.sm |
| md | 40px | spacing.2 spacing.4 | typography.base |
| lg | 48px | spacing.3 spacing.6 | typography.lg |

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | ReactNode | - | Yes | Button content |
| variant | enum | "primary" | No | Visual style variant |
| size | enum | "md" | No | Size preset |
| disabled | boolean | false | No | Disables interaction |
| loading | boolean | false | No | Shows loading spinner |
| icon | string | null | No | Icon name (left position) |
| iconPosition | enum | "left" | No | Icon placement |
| fullWidth | boolean | false | No | Expands to container width |
| type | enum | "button" | No | HTML button type |
| onClick | function | - | No | Click handler |

### States

| State | Visual Change | Trigger |
|-------|---------------|---------|
| default | Base appearance | Initial |
| hover | Slightly darker bg | Mouse enter |
| active | Darker bg, slight scale | Mouse down |
| focus | Focus ring | Tab navigation |
| disabled | Muted colors, no pointer | disabled=true |
| loading | Spinner, disabled | loading=true |

### Design Token References

```
Background:     color.primary.default
Background hover: color.primary.hover
Text:           color.primary.foreground
Border radius:  border.radius.md
Font weight:    typography.weight.medium
Transition:     transition.colors
Shadow (hover): shadow.sm
```

### Accessibility

- Must be keyboard navigable (Tab to focus, Enter/Space to activate)
- Requires visible focus indicator
- Disabled state must be conveyed (aria-disabled)
- Loading state should announce to screen readers
- If icon-only, must have aria-label

### Usage Examples

**Basic:**
```jsx
<Button>Click me</Button>
```

**With variants:**
```jsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="destructive">Delete</Button>
```

**With states:**
```jsx
<Button loading>Saving...</Button>
<Button disabled>Unavailable</Button>
```

**With icon:**
```jsx
<Button icon="plus">Add item</Button>
<Button icon="arrow-right" iconPosition="right">Next</Button>
```

### Do's and Don'ts

**Do:**
- Use primary for the main action on a page
- Keep button text short and action-oriented
- Use loading state for async actions

**Don't:**
- Don't use more than one primary button per section
- Don't use destructive variant for non-destructive actions
- Don't disable without explaining why (use tooltip)
```

</template>

<categories>

**Primitives:**
Basic building blocks used across the app.
- Button, Link, Icon, Badge, Avatar, Tooltip

**Form Elements:**
Input and selection components.
- InputField, TextArea, Select, Checkbox, Radio, Switch, Slider, DatePicker, FileUpload

**Layout:**
Structural and spacing components.
- Card, Container, Divider, Stack, Grid, Spacer

**Navigation:**
Wayfinding components.
- Navbar, Sidebar, Tabs, Breadcrumb, Pagination, Menu, Dropdown

**Feedback:**
User feedback and notifications.
- Alert, Toast, Modal, Dialog, Progress, Skeleton, Spinner

**Data Display:**
Showing data and content.
- Table, List, DataCard, Stat, Chart, Avatar, Badge

**Composite:**
App-specific combinations of primitives.
- LoginForm, SearchBar, UserCard, FeatureCard, PricingCard

</categories>

<spec_depth>

**Minimal** (for simple primitives):
- Props table
- Basic usage

**Standard** (for most components):
- Variants, sizes, props
- States
- Token references
- Usage examples

**Comprehensive** (for complex components):
- All of standard
- Accessibility details
- Do's and don'ts
- Edge cases

</spec_depth>
