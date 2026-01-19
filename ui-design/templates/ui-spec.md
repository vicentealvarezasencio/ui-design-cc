# UI-SPEC.md Template

Template for `.planning/UI-SPEC.md` — the master UI specification document.

<template>

```markdown
# UI Specification: [Project Name]

## Overview

[2-3 sentences describing the application's UI. What does the user see and do?]

## Design System

**Tokens:** `.planning/design-tokens.json`
**Components:** `.planning/COMPONENTS.md`
**Target Library:** [shadcn/ui | Material UI | Custom | TBD]

### Quick Reference

| Token | Value |
|-------|-------|
| Primary | [color] |
| Secondary | [color] |
| Font | [family] |
| Base spacing | [value] |

## Screen Inventory

| ID | Screen | Route | Status | Requirements |
|----|--------|-------|--------|--------------|
| SCR-01 | Login | /login | Specified | REQ-03 |
| SCR-02 | Signup | /signup | Specified | REQ-04 |
| SCR-03 | Dashboard | /dashboard | Specified | REQ-05, REQ-06 |
| SCR-04 | Settings | /settings | Specified | REQ-12 |

**Status values:** Specified | Exported | Realized | Implemented

## Navigation Flows

### Authentication Flow

```
Landing ──→ Login ──→ Dashboard
   │           │
   │           ↓
   │      Forgot Password ──→ Login
   │
   └──→ Signup ──→ Onboarding ──→ Dashboard
```

### Main Application Flow

```
Dashboard ←──→ Settings
    │
    ↓
Project List ──→ Project Detail ──→ Editor
                      │
                      ↓
                   Preview ──→ Share
```

### Modal/Overlay Inventory

| Trigger | Type | Content |
|---------|------|---------|
| "New Project" button | Modal | Project creation form |
| User avatar click | Dropdown | User menu |
| Settings gear | Drawer | Quick settings |

## Component Summary

**Total:** [N] components

| Category | Count | Components |
|----------|-------|------------|
| Primitives | [N] | Button, Link, Icon, Badge |
| Form | [N] | InputField, Select, Checkbox |
| Layout | [N] | Card, Container, Divider |
| Navigation | [N] | Navbar, Sidebar, Tabs |
| Feedback | [N] | Modal, Toast, Alert |
| Composite | [N] | LoginForm, UserCard |

See: `.planning/COMPONENTS.md` for full specifications.

## Export Status

| Service | Exported | File |
|---------|----------|------|
| Stitch | [Yes/No] | `ui-exports/stitch-prompts.md` |
| V0 | [Yes/No] | `ui-exports/v0-prompts.md` |
| Figma | [Yes/No] | `ui-exports/figma-tokens.json` |

## Realization Tracking

Track which screens have been visually realized in external tools:

| Screen | Tool Used | Link/Reference | Date |
|--------|-----------|----------------|------|
| SCR-01: Login | Stitch | [Figma link] | YYYY-MM-DD |
| SCR-02: Signup | V0 | src/components/Signup.tsx | YYYY-MM-DD |

---
*Last updated: [date] after [trigger]*
```

</template>

<guidelines>

**Overview:**
- Describes the UI from user perspective
- What they see, what they can do
- Sets context for all screen specs

**Design System:**
- Links to token and component files
- Quick reference for most-used values
- Notes target component library

**Screen Inventory:**
- Every screen has unique ID (SCR-XX)
- Route/path specified
- Status tracked (Specified → Exported → Realized → Implemented)
- Mapped to requirements if GSD project

**Navigation Flows:**
- Use text diagrams or Mermaid
- Group by user journey (auth, main app, settings)
- Include modals/overlays/drawers

**Component Summary:**
- High-level counts by category
- Links to full COMPONENTS.md
- Updated when components are extracted

**Export Status:**
- Track which services have been exported to
- Links to export files
- Helps know when re-export is needed

**Realization Tracking:**
- Manual tracking of external tool work
- Links to Figma, generated code, etc.
- Dates for reference

</guidelines>
