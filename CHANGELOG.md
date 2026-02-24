# Changelog

All notable changes to UI Design System for Claude Code.

## [0.5.0] - 2026-02-24

### Added

- **Orchestrator + subagent pattern for Pencil MCP** — Prevents context window exhaustion when pushing, pulling, or exporting multiple screens
  - New `ui-pencil-screen` agent handles all Pencil MCP operations for a single screen
  - One agent per screen, all running in **parallel** with independent context windows
  - Orchestrator handles shared setup (open file, set variables, get components) then spawns agents
  - Orchestrator collects results and updates state/registry after agents complete
  - Single-screen operations still handled directly (no subagent overhead)

- **`ui-pencil-screen` agent** (`agents/ui-pencil-screen.md`)
  - Autonomous screen-level worker for push, pull, and validate operations
  - Receives self-contained context from orchestrator (spec, tokens, components, adapter rules)
  - Returns structured results (node_id, status, issues) to orchestrator
  - Never writes to state files (orchestrator's responsibility)

### Changed

- `/ui:pencil sync --push` now uses orchestrator pattern for 2+ screens
- `/ui:pencil sync --pull` now uses orchestrator pattern for 2+ screens
- `/ui:pencil validate all` now uses orchestrator pattern for 2+ screens
- `/ui:export pencil` now uses orchestrator pattern for 2+ screens
- UI Designer (coordinator) routing updated with Pencil Screen agent entries
- Pencil adapter updated with orchestrator pattern documentation and best practices
- Agent architecture diagrams updated across all documentation

### Why This Matters

Previously, pushing multiple screens to Pencil consumed the entire context window after 1-2 screens, requiring users to relaunch the command repeatedly. Now each screen gets its own fresh context, the orchestrator stays lean, and all screens process in parallel — making multi-screen operations both reliable and fast.

## [0.4.1] - 2026-02-09

### Fixed

- **Pencil hidden directory crash** — `.pen` files created under hidden (dot-prefixed) directories like `.planning/` caused Pencil MCP to crash
  - Added path validation to `open` subcommand enforcing `designs/` at project root
  - Added redirect logic when users provide hidden-directory paths
  - Added "File Location Rule" to state management section
  - Added "File in Hidden Directory Path" error handling with recovery instructions
  - Updated Pencil adapter metadata with file location constraint

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
