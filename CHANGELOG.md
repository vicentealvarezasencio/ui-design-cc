# Changelog

All notable changes to UI Design System for Claude Code.

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
