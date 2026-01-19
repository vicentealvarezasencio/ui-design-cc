# Changelog

All notable changes to UI Design System for Claude Code.

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
