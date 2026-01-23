# Changelog

All notable changes to UI Design System for Claude Code.

## [0.4.0] - 2026-01-23

### Added

- **Pencil MCP adapter** — Direct design execution via MCP
  - Operations-based output (Insert, Update, Copy, Replace, Delete, Move, Generate)
  - Native screenshot validation for visual verification
  - Design system component support (`reusable: true`)
  - Variable/theme synchronization with W3C tokens
  - Dark mode via `$extensions.mode` in variables
  - Layout patterns (centered card, sidebar, grids)
  - State variation generation (error, loading, success)
  - Iteration guidance with Update operations

- **`/ui:pencil` command** — Interactive design workflow
  - `open` — Open or create .pen design files
  - `sync` — Bidirectional sync between specs and Pencil designs
  - `components` — Manage design system components
  - `validate` — Visual validation against specifications
  - `iterate` — Interactive refinement with natural language
  - `style` — Explore and apply style guides
  - `layout` — Debug layout and positioning issues

- **Pencil integration guide** — Comprehensive documentation
  - `ui-design/references/pencil-guide.md`
  - Workflows for different use cases
  - Best practices and troubleshooting
  - Integration with other commands

### Changed

- `/ui:export` now supports `pencil` as export target
- Adapters README updated with Pencil comparison
- Registry tracking includes Pencil node IDs
- Expanded to 19 slash commands (added `/ui:pencil`)

### Key Difference

Unlike other adapters that generate text prompts for manual use, Pencil **executes designs directly** via MCP tools. This enables:
- Automatic design generation (no copy/paste)
- Visual validation via `get_screenshot`
- Precise iteration with Update operations
- Design token synchronization via `set_variables`
- Bidirectional sync between specs and designs

## [0.3.0] - 2026-01-21

### Added

- **Code-to-Design workflow** — Reverse engineering for existing codebases
  - `/ui:scan` — Analyze existing codebase for UI patterns
  - `/ui:generate-specs` — Auto-generate specs from code analysis
  - `/ui:reverse-engineer` — One-shot: scan + generate + export
- **UI Scanner agent** — Codebase analysis specialist
  - Component discovery from source code
  - Screen/route extraction
  - Design token inference
  - Pattern recognition
- `code-analysis.md` template for scan output
- Support for React, Vue, Svelte, and vanilla HTML/CSS

### Changed

- Expanded to 18 slash commands
- UI Designer coordinator updated to route scanner tasks

## [0.2.2] - 2026-01-20

### Added

- `/ui:logo` command for logo and favicon generation
  - Guided discovery questions for brand identity
  - AI-optimized prompts for Midjourney, DALL-E, Ideogram
  - Favicon and app icon size requirements
- UI Brander agent
  - Brand identity specialist
  - Logo style exploration
  - Prompt engineering for AI image generators
- `logo-spec.md` template with favicon HTML, manifest, and icon sizes

## [0.2.1] - 2026-01-20

### Added

- Git auto-commit integration
  - Auto-commit after each command completion
  - Auto-push to remote if configured
  - Auto-init git repo if missing
  - Commit message format: `{type}(ui): {action} {subject}`
  - Individual file staging (never `git add .`)
- `git-integration.md` reference document

### Changed

- All agents updated with `git_integration` sections

## [0.2.0] - 2026-01-20

### Added

- Multi-agent architecture
  - UI Designer (coordinator)
  - UI Researcher
  - UI Specifier
  - UI Prompter
- New commands:
  - `/ui:init` — Initialize project
  - `/ui:import-design` — Import existing designs
  - `/ui:realize` — Generate implementation prompts
  - `/ui:sync` — Synchronize specifications
  - `/ui:decisions` — Document design decisions
  - `/ui:patterns` — Define UI patterns
  - `/ui:whats-new` — Show version changes
- New templates:
  - `ui-context.md` — Project context
  - `ui-patterns.md` — Pattern library
  - `ui-decisions.md` — Decision log
  - `ui-registry.md` — Component registry
- 10-section screen specification format with ASCII wireframes
- W3C design tokens with dark mode support via `$extensions.mode`
- Dark mode support in all service adapters
- ES module installer with dry-run support
- Pre-publish validation script

### Changed

- Expanded to 14 slash commands (from 7)
- Enhanced service adapters for dark mode

## [0.1.0] - 2026-01-19

### Added

- Initial release
- Core commands:
  - `/ui:setup-tokens` — Initialize design token system
  - `/ui:design-screens` — Create screen specifications
  - `/ui:define-components` — Extract component inventory
  - `/ui:export [service]` — Generate service-specific exports
  - `/ui:import-tokens` — Import external design tokens
  - `/ui:status` — Show specification coverage
  - `/ui:help` — Command reference
- Service adapters:
  - Google Stitch adapter
  - Vercel V0 adapter
  - Figma adapter (tokens + setup)
  - Generic adapter (tool-agnostic)
- Templates:
  - UI-SPEC.md master specification
  - Screen specification template
  - Component specification template
  - W3C design tokens template
- References:
  - Design systems patterns reference
- Agent:
  - UI Designer agent for complex design reasoning
- Installer:
  - npx installation support
  - Global and local install options
  - Coexists with GSD (separate namespaces)
