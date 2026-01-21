# UI Design System for Claude Code — Complete Instructions

> **Version:** 0.3.0
> **Last Updated:** January 2026

A comprehensive guide to using the UI Design specification system — from commands to workflows to integration strategies.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Complete Command Reference](#complete-command-reference)
3. [Workflows by Development Phase](#workflows-by-development-phase)
4. [Workflows by Code Status](#workflows-by-code-status)
5. [GSD Integration Guide](#gsd-integration-guide)
6. [Service Adapters & Export Strategies](#service-adapters--export-strategies)
7. [Multi-Agent Architecture](#multi-agent-architecture)
8. [Design Token System](#design-token-system)
9. [Document Structure & Artifacts](#document-structure--artifacts)
10. [Best Practices & Tips](#best-practices--tips)
11. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Installation

```bash
# Global installation (recommended) — installs to ~/.claude/
npx ui-design-cc

# Local installation — installs to ./.claude/
npx ui-design-cc --local
```

### 30-Second Workflow

```bash
/ui:init              # Set up context
/ui:setup-tokens      # Define design system
/ui:design-screens    # Specify screens
/ui:export v0         # Generate code prompts
```

---

## Complete Command Reference

### Initialization Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `/ui:init` | Discover platform, framework, constraints, inspiration | `UI-CONTEXT.md` |
| `/ui:setup-tokens` | Define colors, typography, spacing, dark mode | `design-tokens.json` |

#### `/ui:init`

**When to use:** At the very beginning of any UI project.

**What it does:**
- Discovers your target platform (web, mobile, desktop)
- Identifies framework (React, Vue, SwiftUI, etc.)
- Documents user personas and constraints
- Captures design inspiration ("like Linear", "Stripe-inspired")
- Establishes accessibility requirements (WCAG level)
- Sets responsive breakpoints

**Interactive prompts:**
```
- What platform are you building for?
- What framework/library will you use?
- Who are your target users?
- What existing products inspire your design?
- What constraints should I know about?
```

**Example output:** `.planning/UI-CONTEXT.md`

---

#### `/ui:setup-tokens`

**When to use:** After `/ui:init`, before designing screens.

**What it does:**
- Creates a W3C-compliant design token file
- Defines color palette (primary, secondary, semantic)
- Sets typography scale (font families, sizes, weights)
- Establishes spacing scale (4px or 8px base)
- Configures dark mode variants
- Documents border radii, shadows, z-index

**Options:**
```bash
/ui:setup-tokens                    # Full interactive setup
/ui:setup-tokens --minimal          # Quick setup with sensible defaults
/ui:setup-tokens --from-tailwind    # Extract from existing tailwind.config
/ui:setup-tokens --from-figma       # Import from Figma Variables
```

**Example output:** `.planning/design-tokens.json`

---

### Specification Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `/ui:design-screens` | Create comprehensive screen specifications | `screens/*.md` |
| `/ui:define-components` | Extract component inventory | `COMPONENTS.md` |
| `/ui:patterns` | Document reusable UI patterns | `UI-PATTERNS.md` |
| `/ui:whats-new` | Show version history and changes | (console) |

#### `/ui:design-screens`

**When to use:** After tokens are set up, when you're ready to specify UI.

**What it does:**
Creates a 10-section specification for each screen:

1. **Meta** — Route, requirements, status
2. **Purpose** — What users accomplish
3. **Wireframe** — ASCII layout with annotations
4. **Layout Structure** — Grid, container, spacing
5. **Components** — Component inventory + hierarchy tree
6. **States** — Default, loading, error, success, empty
7. **Interactions** — Trigger → Action → Feedback mapping
8. **Responsive Behavior** — Breakpoint changes
9. **Accessibility** — WCAG checklist, focus management
10. **Content** — All text, labels, error messages

**Options:**
```bash
/ui:design-screens                        # Interactive screen discovery
/ui:design-screens Login, Signup          # Specify named screens
/ui:design-screens --all                  # Generate all screens from routes
/ui:design-screens --quick                # Minimal specs (sections 1-5 only)
```

**Example output:** `.planning/screens/SCR-01-login.md`

---

#### `/ui:define-components`

**When to use:** After designing screens, to create a component inventory.

**What it does:**
- Extracts all components from screen specs
- Defines props, variants, and sizes
- Documents component states (hover, active, disabled)
- Creates accessibility requirements per component
- Shows usage count across screens

**Options:**
```bash
/ui:define-components                     # Auto-extract from screens
/ui:define-components --manual            # Interactive component definition
/ui:define-components --from-code         # Extract from existing codebase
```

**Example output:** `.planning/COMPONENTS.md`

---

#### `/ui:patterns`

**When to use:** When you have reusable UI patterns that span multiple screens.

**What it does:**
- Documents reusable patterns (auth forms, dashboards, settings pages)
- Creates pattern templates with variants
- Links patterns to screens that use them

**Options:**
```bash
/ui:patterns                              # View all patterns
/ui:patterns add                          # Add new pattern
/ui:patterns extract SCR-01               # Extract pattern from screen
```

**Example output:** `.planning/UI-PATTERNS.md`

---

### Export Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `/ui:export` | Generate service-specific prompts | `ui-exports/*.md` |
| `/ui:import-tokens` | Import tokens from external sources | `design-tokens.json` |
| `/ui:import-design` | Reverse sync from design tools | Various |
| `/ui:logo` | Create logo and brand identity specs | `LOGO-SPEC.md` |

#### `/ui:export`

**When to use:** When you're ready to generate designs in external tools.

**Supported services:**

| Service | Best For | Output Format |
|---------|----------|---------------|
| `stitch` | Visual design generation, Figma export | Detailed visual prompts |
| `v0` | React + shadcn/ui production code | Component code prompts |
| `figma` | Design team collaboration | Token JSON + setup guide |
| `generic` | Unknown/future tools | Universal descriptions |

**Options:**
```bash
/ui:export stitch                         # Export for Stitch
/ui:export v0                             # Export for V0
/ui:export figma                          # Export for Figma
/ui:export generic                        # Tool-agnostic export
/ui:export stitch SCR-01                  # Export specific screen
/ui:export --all                          # Export all screens
```

**Example output:** `.planning/ui-exports/stitch-prompts.md`

---

#### `/ui:import-tokens`

**When to use:** When migrating an existing design system.

**Supported sources:**
```bash
/ui:import-tokens --from-tailwind         # From tailwind.config.js
/ui:import-tokens --from-figma            # From Figma Variables (JSON)
/ui:import-tokens --from-w3c              # From W3C tokens file
/ui:import-tokens --from-css              # From CSS custom properties
```

---

#### `/ui:import-design`

**When to use:** After iterating on designs in external tools.

**What it does:**
- Syncs visual changes back to specifications
- Updates component definitions
- Detects new patterns
- Maintains spec-implementation alignment

---

#### `/ui:logo`

**When to use:** When establishing brand identity for your project.

**What it does:**
- Creates logo identity specifications
- Generates AI image prompts (Midjourney, DALL-E, Ideogram)
- Specifies favicon with HTML markup
- Documents app icon requirements (iOS, Android, web)

**Options:**
```bash
/ui:logo                                  # Full discovery and spec
/ui:logo --refresh                        # Regenerate prompts
/ui:logo --favicon-only                   # Favicon specs only
/ui:logo --export midjourney              # Export for specific AI tool
```

**Example output:** `.planning/LOGO-SPEC.md`

---

### Code-to-Design Commands (Reverse Engineering)

| Command | Purpose | Output |
|---------|---------|--------|
| `/ui:scan` | Analyze codebase for UI elements | `CODE-ANALYSIS.md` |
| `/ui:generate-specs` | Auto-generate specs from analysis | `screens/*.md` |
| `/ui:reverse-engineer` | One-shot: scan + generate + export | Multiple |

#### `/ui:scan`

**When to use:** When starting with an existing codebase.

**What it detects:**
- Framework (Next.js, React, Vue, SwiftUI, etc.)
- All components (with props, variants, usage counts)
- All screens/routes from routing configuration
- Design tokens from configs (Tailwind, CSS variables)
- Component dependency graph
- Reusable UI patterns

**Options:**
```bash
/ui:scan                                  # Full codebase scan
/ui:scan --components-only                # Scan components only
/ui:scan --tokens-only                    # Extract tokens only
/ui:scan src/components                   # Scan specific directory
```

**Example output:** `.planning/CODE-ANALYSIS.md`

---

#### `/ui:generate-specs`

**When to use:** After reviewing `/ui:scan` results.

**What it does:**
- Generates screen specs from discovered routes
- Creates component definitions from analyzed components
- Builds pattern documentation from repeated structures

**Options:**
```bash
/ui:generate-specs                        # Generate all specs
/ui:generate-specs --screens              # Screens only
/ui:generate-specs --components           # Components only
```

---

#### `/ui:reverse-engineer`

**When to use:** For quick, minimal-intervention reverse engineering.

**What it does:**
Combines three operations in one:
1. Scans codebase (`/ui:scan`)
2. Generates specs (`/ui:generate-specs`)
3. Exports prompts (`/ui:export`)

**Options:**
```bash
/ui:reverse-engineer                      # Full reverse engineering
/ui:reverse-engineer --export stitch      # Specify export target
```

---

### Tracking & Maintenance Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `/ui:realize` | Mark screens as realized | `UI-REGISTRY.md` |
| `/ui:sync` | Detect drift between specs and code | (report) |
| `/ui:status` | Show specification coverage | (report) |

#### `/ui:realize`

**When to use:** After implementing a screen in an external tool.

**What it does:**
- Marks screens as "realized" (implemented)
- Tracks implementation status
- Links to external tool outputs

**Options:**
```bash
/ui:realize SCR-01                        # Mark single screen realized
/ui:realize SCR-01 SCR-02 SCR-03          # Mark multiple screens
/ui:realize --all                         # Mark all screens realized
```

**Example output:** `.planning/UI-REGISTRY.md`

---

#### `/ui:sync`

**When to use:** After implementation, to detect drift.

**What it does:**
- Compares specs to actual implementation
- Detects component mismatches
- Identifies missing accessibility features
- Reports token violations

---

#### `/ui:status`

**When to use:** Anytime you want a project health check.

**What it shows:**
- Specification coverage percentage
- Screens specified vs implemented
- Component inventory status
- Token usage
- Outstanding issues

---

### Documentation Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `/ui:decisions` | View/add design decision log | `UI-DECISIONS.md` |
| `/ui:help` | Show command help | (console) |

#### `/ui:decisions`

**When to use:** When making or reviewing design decisions.

**Decision format:**
```markdown
## DEC-001: Navigation Style

**Context:** Dashboard requires primary navigation
**Options Considered:**
1. Top navigation bar
2. Left sidebar
3. Tab-based navigation

**Decision:** Tab navigation (option 3)
**Rationale:** Mobile-first, consistent patterns
**Consequences:** Limited to 5 main sections
**Status:** Approved
**Affects:** SCR-03, SCR-04
```

**Options:**
```bash
/ui:decisions                             # View all decisions
/ui:decisions add                         # Add new decision
/ui:decisions DEC-001                     # View specific decision
```

---

## Workflows by Development Phase

### Phase 1: Project Inception (No Code Yet)

**Goal:** Establish design foundation before writing any code.

```
┌──────────────────────────────────────────────────────────────┐
│  DESIGN-FIRST WORKFLOW                                        │
│                                                               │
│  1. /ui:init                    ← Establish context           │
│     └─ Answer platform, framework, inspiration questions      │
│                                                               │
│  2. /ui:logo                    ← Brand identity (optional)   │
│     └─ Generate logo specs, AI prompts, favicon requirements  │
│                                                               │
│  3. /ui:setup-tokens            ← Define design system        │
│     └─ Colors, typography, spacing, dark mode                 │
│                                                               │
│  4. /ui:design-screens          ← Specify all screens         │
│     └─ 10-section specs with ASCII wireframes                 │
│                                                               │
│  5. /ui:define-components       ← Extract components          │
│     └─ Props, variants, states, accessibility                 │
│                                                               │
│  6. /ui:patterns                ← Document patterns           │
│     └─ Reusable UI structures                                 │
│                                                               │
│  7. /ui:export [service]        ← Generate prompts            │
│     └─ Ready for design tools                                 │
└──────────────────────────────────────────────────────────────┘
```

**Recommended export order:**
1. `stitch` — Visual exploration and iteration
2. `v0` — Production code generation
3. `figma` — If collaborating with designers

---

### Phase 2: Early Development (Prototyping)

**Goal:** Rapid iteration between specs and visual tools.

```
┌──────────────────────────────────────────────────────────────┐
│  RAPID PROTOTYPING WORKFLOW                                   │
│                                                               │
│  1. /ui:init                    ← Quick context setup         │
│                                                               │
│  2. /ui:setup-tokens --minimal  ← Minimal token set           │
│                                                               │
│  3. /ui:design-screens --quick  ← Rough wireframes only       │
│                                                               │
│  4. /ui:export stitch           ← Visual exploration          │
│     └─ [Iterate in Stitch]                                    │
│     └─ [Iterate in Stitch]                                    │
│     └─ [Iterate in Stitch]                                    │
│                                                               │
│  5. /ui:import-design           ← Capture refinements         │
│                                                               │
│  6. /ui:export v0               ← Generate code               │
│                                                               │
│  REPEAT 4-6 until satisfied                                   │
└──────────────────────────────────────────────────────────────┘
```

**Tips for this phase:**
- Use `--quick` flag to skip detailed specs
- Don't worry about comprehensive documentation
- Focus on visual iteration speed
- Import designs frequently to keep specs updated

---

### Phase 3: Active Development (Building Features)

**Goal:** Maintain alignment between specs and implementation.

```
┌──────────────────────────────────────────────────────────────┐
│  IMPLEMENTATION WORKFLOW                                      │
│                                                               │
│  For each feature/screen:                                     │
│                                                               │
│  1. /ui:design-screens [screen] ← Detailed spec               │
│                                                               │
│  2. /ui:export v0 [screen]      ← Code prompts                │
│     └─ [Implement in V0 or manually]                          │
│                                                               │
│  3. /ui:realize [screen]        ← Mark as implemented         │
│                                                               │
│  4. /ui:decisions add           ← Document any decisions      │
│                                                               │
│  Periodically:                                                │
│  • /ui:status                   ← Check coverage              │
│  • /ui:sync                     ← Detect drift                │
└──────────────────────────────────────────────────────────────┘
```

---

### Phase 4: Maintenance (Existing Product)

**Goal:** Keep specs and implementation in sync.

```
┌──────────────────────────────────────────────────────────────┐
│  MAINTENANCE WORKFLOW                                         │
│                                                               │
│  Regular checks:                                              │
│  1. /ui:sync                    ← Detect spec/code drift      │
│  2. /ui:status                  ← Review coverage             │
│                                                               │
│  When adding features:                                        │
│  1. /ui:design-screens [new]    ← Spec the feature            │
│  2. /ui:define-components       ← Update component inventory  │
│  3. /ui:export v0               ← Generate code               │
│  4. /ui:realize                 ← Track completion            │
│                                                               │
│  When refactoring:                                            │
│  1. /ui:scan                    ← Re-analyze codebase         │
│  2. Review CODE-ANALYSIS.md     ← Check for drift             │
│  3. Update specs as needed                                    │
└──────────────────────────────────────────────────────────────┘
```

---

## Workflows by Code Status

### Scenario A: Greenfield (No Existing Code)

**Situation:** Starting a brand new project from scratch.

```
RECOMMENDED WORKFLOW:

Day 1: Foundation
  /ui:init                         # Establish context
  /ui:logo                         # Brand identity
  /ui:setup-tokens                 # Design system

Day 2-3: Screen Design
  /ui:design-screens               # All major screens
  /ui:define-components            # Component inventory
  /ui:patterns                     # Reusable patterns

Day 4+: Implementation
  /ui:export v0                    # Generate code
  /ui:realize [screens]            # Track progress
```

**Export strategy:** Start with `v0` for production code, use `stitch` for complex visual sections.

---

### Scenario B: Existing Codebase (No Documentation)

**Situation:** Inheriting a project without design documentation.

```
RECOMMENDED WORKFLOW:

Step 1: Discovery
  /ui:scan                         # Analyze existing code
  [Review CODE-ANALYSIS.md]        # Validate findings

Step 2: Generate Specs
  /ui:generate-specs               # Auto-generate from analysis
  [Review generated specs]         # Edit as needed

Step 3: Fill Gaps
  /ui:setup-tokens --from-code     # Extract existing tokens
  /ui:define-components            # Formalize components

Step 4: Establish Baseline
  /ui:realize --all                # Mark existing as implemented
  /ui:status                       # Check coverage
```

**Alternative (faster):**
```
/ui:reverse-engineer               # One-shot: scan + generate + export
```

---

### Scenario C: Existing Codebase (With Partial Docs)

**Situation:** Project has some documentation but it's incomplete.

```
RECOMMENDED WORKFLOW:

Step 1: Assess
  /ui:status                       # See what's documented
  /ui:scan                         # Find what's missing

Step 2: Complete Documentation
  /ui:design-screens [missing]     # Spec undocumented screens
  /ui:define-components            # Update component inventory

Step 3: Sync
  /ui:sync                         # Check for drift
  /ui:import-design                # Update from implementations
```

---

### Scenario D: Design System Migration

**Situation:** Moving from one design system/framework to another.

```
RECOMMENDED WORKFLOW:

Step 1: Capture Current State
  /ui:scan                         # Analyze current implementation
  /ui:import-tokens --from-[source]  # Import existing tokens

Step 2: Define New System
  /ui:setup-tokens                 # Define new token system
  /ui:design-screens               # Update specs for new system

Step 3: Export for New Target
  /ui:export [new-target]          # Generate for new platform

Step 4: Track Migration
  /ui:realize                      # Track progress
  /ui:sync                         # Monitor drift
```

---

### Scenario E: Visual Refresh

**Situation:** Updating the look and feel without changing functionality.

```
RECOMMENDED WORKFLOW:

Step 1: Update Tokens
  /ui:setup-tokens                 # New colors, typography, etc.

Step 2: Generate New Visuals
  /ui:export stitch                # Visual exploration
  [Iterate in Stitch]
  /ui:import-design                # Capture refinements

Step 3: Apply Updates
  /ui:export v0                    # Generate updated code
  /ui:sync                         # Verify consistency
```

---

## GSD Integration Guide

The UI Design system is built to integrate seamlessly with [Get-Shit-Done (GSD)](https://github.com/your-gsd-repo) workflow.

### GSD + UI Design: Complete Project Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    GSD + UI DESIGN INTEGRATED WORKFLOW                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 0: PROJECT SETUP                                                  │
│  ───────────────────────                                                 │
│  /gsd:new-project                    Define requirements (PROJECT.md)    │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: UI DESIGN (After Requirements)                                 │
│  ───────────────────────────────────────                                 │
│  /ui:init                            Establish UI context                │
│  /ui:logo                            Brand identity (optional)           │
│  /ui:setup-tokens                    Define design system                │
│  /ui:design-screens                  Specify all screens                 │
│  /ui:define-components               Extract component inventory         │
│  /ui:patterns                        Document reusable patterns          │
│  /ui:export v0                       Generate implementation prompts     │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 2: PLANNING                                                       │
│  ─────────────────────                                                   │
│  /gsd:plan-phase                     References UI specs in PLAN.md      │
│                                      Links to screen specs               │
│                                      References component inventory      │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 3: EXECUTION                                                      │
│  ──────────────────────                                                  │
│  /gsd:execute-phase                  Uses UI exports as prompts          │
│                                                                          │
│  During execution:                                                       │
│    /ui:realize SCR-XX               Track screen completion              │
│    /ui:status                       Monitor progress                     │
│    /ui:decisions add                Document decisions made              │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 4: VERIFICATION                                                   │
│  ─────────────────────────                                               │
│  /gsd:verify-work                    Verify implementation vs specs      │
│                                                                          │
│  After verification:                                                     │
│    /ui:sync                         Detect any drift                     │
│    /ui:import-design                Sync visual changes back             │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 5: COMPLETION                                                     │
│  ────────────────────────                                                │
│  /gsd:complete-milestone             Archive milestone                   │
│                                      UI specs archived with project      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### When to Use UI Commands Within GSD Phases

#### During `/gsd:new-project`

Use after requirements are defined but before planning:

```
/gsd:new-project
[Requirements defined in PROJECT.md]

# NOW use UI commands:
/ui:init                    # Reference PROJECT.md for context
/ui:setup-tokens
/ui:design-screens          # Based on user stories in requirements
```

#### During `/gsd:plan-phase`

Reference UI specifications in your plans:

```markdown
# PLAN.md

## Implementation Steps

1. Implement Login Screen
   - Reference: `.planning/screens/SCR-01-login.md`
   - Components needed: Button, Input, Card (see COMPONENTS.md)
   - Export: `.planning/ui-exports/v0-prompts.md#login`
```

#### During `/gsd:execute-phase`

Track UI implementation progress:

```bash
# After implementing a screen:
/ui:realize SCR-01

# Check overall progress:
/ui:status

# Document any design decisions made during implementation:
/ui:decisions add
```

#### During `/gsd:verify-work`

Verify UI implementation matches specs:

```bash
# Check for drift between specs and code:
/ui:sync

# If there are differences, either:
# 1. Update specs to match implementation (if changes were intentional)
/ui:import-design

# 2. Or fix implementation to match specs
```

### GSD Phase Planning with UI Specs

When planning GSD phases that involve UI work, structure them like this:

```markdown
# Phase 3: Implement Core UI

## Goals
- Implement all authentication screens (SCR-01 through SCR-03)
- Realize design token system
- Set up component library foundation

## UI References
- Screen Specs: `.planning/screens/`
- Components: `.planning/COMPONENTS.md`
- Tokens: `.planning/design-tokens.json`
- V0 Prompts: `.planning/ui-exports/v0-prompts.md`

## Tasks
1. Set up design token system from `design-tokens.json`
2. Implement base components from `COMPONENTS.md`
3. Build SCR-01 Login using V0 prompts
4. Build SCR-02 Signup using V0 prompts
5. Build SCR-03 Password Reset using V0 prompts

## Verification
- [ ] All screens match specs
- [ ] All states implemented (loading, error, success)
- [ ] Accessibility requirements met (per screen specs)
- [ ] Responsive behavior verified
```

### File Organization with GSD

```
.planning/
├── PROJECT.md              # GSD: Project definition
├── REQUIREMENTS.md         # GSD: Requirements
├── ROADMAP.md              # GSD: Phase roadmap
├── phases/                 # GSD: Phase plans
│   └── phase-01/
│       └── PLAN.md
│
├── UI-CONTEXT.md           # UI: Context and constraints
├── UI-SPEC.md              # UI: Master spec hub
├── UI-PATTERNS.md          # UI: Reusable patterns
├── UI-DECISIONS.md         # UI: Decision log
├── UI-REGISTRY.md          # UI: Realization tracking
├── COMPONENTS.md           # UI: Component inventory
├── LOGO-SPEC.md            # UI: Brand identity
├── design-tokens.json      # UI: Token definitions
│
├── screens/                # UI: Individual screen specs
│   ├── SCR-01-login.md
│   └── SCR-02-signup.md
│
├── ui-exports/             # UI: Service-specific exports
│   ├── v0-prompts.md
│   └── stitch-prompts.md
│
└── ui-state/               # UI: Agent state persistence
    └── *.json
```

### GSD Integration: Quick Reference

| GSD Phase | UI Commands to Use | Purpose |
|-----------|-------------------|---------|
| `/gsd:new-project` | `/ui:init`, `/ui:setup-tokens` | Establish design context |
| `/gsd:plan-phase` | `/ui:design-screens`, `/ui:export` | Prepare implementation specs |
| `/gsd:execute-phase` | `/ui:realize`, `/ui:status` | Track progress |
| `/gsd:verify-work` | `/ui:sync`, `/ui:import-design` | Verify alignment |
| `/gsd:complete-milestone` | `/ui:status` | Final coverage check |

---

## Service Adapters & Export Strategies

### Adapter Comparison

| Adapter | Best For | Output | Strengths | Limitations |
|---------|----------|--------|-----------|-------------|
| **Stitch** | Visual design, exploration | Detailed visual prompts | Full-page layouts, quick iteration | Limited component systems |
| **V0** | React production code | shadcn/ui + Tailwind | TypeScript, responsive, dark mode | React-only ecosystem |
| **Figma** | Design collaboration | Token JSON + setup | Native variables, design systems | Setup required |
| **Generic** | Unknown/future tools | Universal descriptions | Works anywhere | Less optimized |

### Choosing the Right Adapter

```
┌─────────────────────────────────────────────────────────────┐
│                    ADAPTER SELECTION GUIDE                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  What's your primary goal?                                   │
│                                                              │
│  ┌─────────────────────┐                                     │
│  │ Visual exploration  │ ──────────────► Use STITCH         │
│  │ "I want to see it"  │                                     │
│  └─────────────────────┘                                     │
│                                                              │
│  ┌─────────────────────┐                                     │
│  │ Production code     │ ──────────────► Use V0             │
│  │ "I want to build it"│     (React/Next.js)                │
│  └─────────────────────┘                                     │
│                                                              │
│  ┌─────────────────────┐                                     │
│  │ Team collaboration  │ ──────────────► Use FIGMA          │
│  │ "Designers need it" │                                     │
│  └─────────────────────┘                                     │
│                                                              │
│  ┌─────────────────────┐                                     │
│  │ Non-React project   │ ──────────────► Use STITCH         │
│  │ "Vue, Svelte, etc"  │     then manual implementation     │
│  └─────────────────────┘                                     │
│                                                              │
│  ┌─────────────────────┐                                     │
│  │ Unknown tool        │ ──────────────► Use GENERIC        │
│  │ "Trying something"  │                                     │
│  └─────────────────────┘                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Multi-Adapter Workflow

For complex projects, use multiple adapters:

```bash
# 1. Visual exploration first
/ui:export stitch
[Iterate in Stitch until satisfied]

# 2. Sync back refinements
/ui:import-design

# 3. Generate production code
/ui:export v0

# 4. Share with design team
/ui:export figma
```

---

## Multi-Agent Architecture

The system uses specialized agents to handle different concerns:

### Agent Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     UI Designer (Coordinator)                    │
│              Routes tasks | Maintains coherence | Quick ops      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ UI Researcher│ │ UI Specifier│ │ UI Prompter │
    │ • /ui:init  │ │ • screens   │ │ • /ui:export│
    │ • context   │ │ • components│ │ • prompts   │
    │ • patterns  │ │ • wireframes│ │ • handoffs  │
    └─────────────┘ └─────────────┘ └─────────────┘
           │               │               │
           └───────────────┼───────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                                 ▼
    ┌─────────────┐                  ┌─────────────┐
    │ UI Brander  │                  │ UI Scanner  │
    │ • /ui:logo  │                  │ • /ui:scan  │
    │ • favicon   │                  │ • reverse   │
    │ • brand ID  │                  │ • analysis  │
    └─────────────┘                  └─────────────┘
```

### Agent Responsibilities

| Agent | Commands | Specialization |
|-------|----------|----------------|
| **UI Designer** | All commands (routing) | Coordination, state, quick operations |
| **UI Researcher** | `/ui:init`, inspiration | Context discovery, competitive analysis |
| **UI Specifier** | `/ui:design-screens`, `/ui:define-components` | Detailed specifications |
| **UI Prompter** | `/ui:export` (5+ screens) | Service-specific prompt generation |
| **UI Brander** | `/ui:logo` | Brand identity, AI image prompts |
| **UI Scanner** | `/ui:scan`, `/ui:reverse-engineer` | Code analysis, reverse engineering |

### State Persistence

Agent state persists across sessions in `.planning/ui-state/`:

```
.planning/ui-state/
├── coordinator-state.json    # Master routing state
├── researcher-state.json     # Research sessions
├── specifier-state.json      # Specification progress
├── prompter-state.json       # Export history
└── scanner-state.json        # Scan sessions
```

---

## Design Token System

### W3C Format with Dark Mode

```json
{
  "color": {
    "primary": {
      "default": {
        "$value": "#2563EB",
        "$type": "color",
        "$extensions": {
          "mode": { "dark": "#3B82F6" }
        }
      }
    }
  },
  "typography": {
    "heading": {
      "xl": {
        "$value": {
          "fontFamily": "Inter",
          "fontSize": "32px",
          "fontWeight": "600",
          "lineHeight": "1.2"
        },
        "$type": "typography"
      }
    }
  },
  "spacing": {
    "md": {
      "$value": "16px",
      "$type": "dimension"
    }
  }
}
```

### Supported Token Categories

| Category | Examples | Dark Mode Support |
|----------|----------|-------------------|
| Colors | primary, secondary, semantic | Yes |
| Typography | font families, sizes, weights | No |
| Spacing | padding, margins, gaps | No |
| Border Radius | sm, md, lg, full | No |
| Shadows | sm, md, lg, xl | Yes |
| Z-Index | base, dropdown, modal, toast | No |
| Transitions | fast, normal, slow | No |
| Opacity | muted, subtle, hidden | No |

---

## Document Structure & Artifacts

### Complete Directory Structure

```
.planning/
├── UI-CONTEXT.md              # Platform, constraints, users, inspiration
├── UI-SPEC.md                 # Master spec hub, screen inventory
├── UI-PATTERNS.md             # Reusable patterns (PAT-01, PAT-02)
├── UI-DECISIONS.md            # Decision log (DEC-001, DEC-002)
├── UI-REGISTRY.md             # Realization tracking
├── COMPONENTS.md              # Component inventory
├── LOGO-SPEC.md               # Brand identity specs
├── CODE-ANALYSIS.md           # Reverse engineering analysis
├── design-tokens.json         # W3C design tokens
│
├── screens/
│   ├── SCR-01-login.md        # Individual screen specs
│   ├── SCR-02-signup.md
│   └── ...
│
├── ui-exports/
│   ├── stitch-prompts.md      # Stitch exports
│   ├── v0-prompts.md          # V0 exports
│   ├── figma-tokens.json      # Figma Variables
│   ├── figma-setup.md         # Figma setup guide
│   ├── generic-prompts.md     # Generic exports
│   └── handoffs/
│       ├── SCR-01-brief.md    # Per-screen briefs
│       └── design-handoff.md  # Full handoff document
│
└── ui-state/
    ├── coordinator-state.json
    └── *.json
```

### ID Conventions

| Type | Format | Example |
|------|--------|---------|
| Screens | `SCR-XX` | SCR-01, SCR-02 |
| Components | `CMP-XX` | CMP-01, CMP-02 |
| Patterns | `PAT-XX` | PAT-01, PAT-02 |
| Decisions | `DEC-XXX` | DEC-001, DEC-002 |

---

## Best Practices & Tips

### General Best Practices

1. **Always start with `/ui:init`** — Context informs all subsequent decisions
2. **Define tokens before screens** — Consistent design language from the start
3. **Use comprehensive screen specs** — The 10-section format prevents gaps
4. **Track decisions** — Future you will thank present you
5. **Realize screens incrementally** — Don't wait until the end
6. **Sync regularly** — Catch drift early

### Performance Tips

1. **Use `--quick` for prototyping** — Skip detailed specs during exploration
2. **Export specific screens** — `/ui:export v0 SCR-01` instead of all
3. **One-shot reverse engineering** — `/ui:reverse-engineer` for existing codebases
4. **Parallel exports** — Export to multiple services simultaneously

### Common Patterns

#### Pattern 1: Design System First
```bash
/ui:init → /ui:setup-tokens → /ui:export figma
# Hand off to designers, then import their work back
/ui:import-tokens --from-figma
```

#### Pattern 2: Component-Driven
```bash
/ui:define-components → /ui:export v0
# Build component library first, then compose screens
/ui:design-screens
```

#### Pattern 3: Screen-Driven
```bash
/ui:design-screens → /ui:define-components
# Design screens first, extract components from them
```

---

## Troubleshooting

### Common Issues

#### "No UI-CONTEXT.md found"
**Solution:** Run `/ui:init` first to establish context.

#### "Tokens not loading correctly"
**Solution:** Verify `design-tokens.json` follows W3C format. Run `/ui:setup-tokens` to regenerate.

#### "Export prompts are generic"
**Solution:** Ensure screen specs are detailed. The export quality depends on spec quality.

#### "Drift detected but sync doesn't help"
**Solution:** Manually review `CODE-ANALYSIS.md` against specs. Some drift requires manual resolution.

#### "Agent state seems corrupted"
**Solution:** Delete `.planning/ui-state/` directory. State will be regenerated on next command.

### Getting Help

```bash
/ui:help                     # Show all commands
/ui:whats-new                # View version history
```

---

## Version History

| Version | Features |
|---------|----------|
| **0.3.0** | Code-to-design reverse engineering (`/ui:scan`, `/ui:generate-specs`, `/ui:reverse-engineer`) |
| **0.2.2** | Logo and branding support (`/ui:logo`) |
| **0.2.1** | Git auto-commit integration |
| **0.2.0** | Multi-agent architecture, 10-section specs, W3C tokens |
| **0.1.0** | Initial release |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    UI DESIGN QUICK REFERENCE                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INITIALIZATION                                              │
│    /ui:init                 Set up project context           │
│    /ui:setup-tokens         Define design system             │
│                                                              │
│  SPECIFICATION                                               │
│    /ui:design-screens       Create screen specs              │
│    /ui:define-components    Extract components               │
│    /ui:patterns             Document patterns                │
│    /ui:logo                 Brand identity                   │
│                                                              │
│  EXPORT                                                      │
│    /ui:export stitch        Visual design prompts            │
│    /ui:export v0            React code prompts               │
│    /ui:export figma         Token + setup export             │
│    /ui:export generic       Universal prompts                │
│                                                              │
│  REVERSE ENGINEERING                                         │
│    /ui:scan                 Analyze codebase                 │
│    /ui:generate-specs       Auto-generate specs              │
│    /ui:reverse-engineer     One-shot full workflow           │
│                                                              │
│  TRACKING                                                    │
│    /ui:realize              Mark screens done                │
│    /ui:sync                 Detect drift                     │
│    /ui:status               Check coverage                   │
│    /ui:decisions            Decision log                     │
│                                                              │
│  HELP                                                        │
│    /ui:help                 Show commands                    │
│    /ui:whats-new            Version history                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*UI Design System for Claude Code — Specifications are the source of truth.*
