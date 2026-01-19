# Screen Template

Template for `.planning/screens/SCR-XX-[name].md` — individual screen specifications.

<template>

```markdown
# SCR-[XX]: [Screen Name]

**Route:** /[path]
**Layout:** [centered-card | full-width | sidebar | split | custom]
**Auth Required:** [Yes | No]
**Requirements:** [REQ-XX, REQ-XX] (if GSD project)

## Purpose

[One sentence: What does this screen let users do?]

## Layout Structure

```
┌─────────────────────────────────────────┐
│  [Header/Navbar]                        │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │                                 │   │
│  │  [Main Content Area]            │   │
│  │                                 │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## Components

List components from top to bottom, left to right:

1. **[ComponentName]** — [brief description]
   - Props: `label="Value"`, `variant="primary"`

2. **[ComponentName]** — [brief description]
   - Props: `type="email"`, `required`

3. **[ComponentName]** — [brief description]
   - Props: `size="lg"`, `fullWidth`

## Content

| Element | Content | Notes |
|---------|---------|-------|
| Page title | "[Title]" | H1, typography.h1 |
| Subtitle | "[Subtitle]" | Optional, typography.body |
| Primary CTA | "[Button text]" | Button, primary variant |
| Secondary action | "[Link text]" | Link or ghost button |

## Behavior

### On Load
- [What happens when screen loads]
- [Data fetched, state initialized]

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Submit form | Click primary button | Validate → API call → Navigate to [route] |
| Cancel | Click secondary | Navigate back |
| [Action] | [Trigger] | [Result] |

### Validation
- [Field]: [validation rules]
- [Field]: [validation rules]

### Error States
- **[Error type]:** [How it's displayed]
- **API error:** Toast notification with message
- **Validation error:** Inline below field

### Loading States
- Primary button shows spinner when submitting
- [Other loading states]

## Visual Notes

**Spacing:**
- Card padding: spacing.6 (24px)
- Element gap: spacing.4 (16px)
- Section gap: spacing.8 (32px)

**Colors:**
- Background: color.background.default
- Card: color.surface.default
- Primary action: color.primary.default

**Responsive:**
- Mobile: Stack vertically, full-width card
- Tablet: Centered card, max-width 480px
- Desktop: Centered card, max-width 400px

## Accessibility

- [ ] All form fields have labels
- [ ] Focus order is logical
- [ ] Error messages linked to fields (aria-describedby)
- [ ] [Screen-specific accessibility requirements]

## Design References

**Inspiration:** [Links to similar UIs, Dribbble, etc.]
**Figma:** [Link when realized]
**Generated code:** [Path when implemented]

---
*Status: [Specified | Exported | Realized | Implemented]*
*Last updated: [date]*
```

</template>

<guidelines>

**Header Section:**
- Route: URL path for this screen
- Layout: General layout pattern
- Auth: Does user need to be logged in?
- Requirements: Link to GSD requirements if applicable

**Purpose:**
- Single sentence explaining user goal
- "This screen lets users [do what]"

**Layout Structure:**
- ASCII art showing general structure
- Helps visualize before detailed components
- Use consistent box-drawing characters

**Components:**
- List in visual order (top-to-bottom, left-to-right)
- Use component names from COMPONENTS.md
- Include key props for this instance
- Be specific enough for implementation

**Content:**
- Actual text/copy for the screen
- Helps with prompt generation
- Notes on typography tokens

**Behavior:**
- What happens on load
- User action → result mapping
- Validation rules
- Error handling
- Loading states

**Visual Notes:**
- Reference design tokens
- Spacing, colors, typography
- Responsive breakpoint behavior

**Accessibility:**
- Checklist of a11y requirements
- Screen-specific considerations

**Design References:**
- Links to inspiration
- Updated with Figma/code links when realized

</guidelines>

<complexity_levels>

**Simple screen** (login, error page):
- 3-5 components
- Single purpose
- Minimal behavior

**Medium screen** (settings, profile):
- 5-10 components
- Multiple sections
- Form with validation

**Complex screen** (dashboard, editor):
- 10+ components
- Multiple interaction patterns
- Consider splitting into regions

</complexity_levels>
