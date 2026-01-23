# Contributing to UI Design System for Claude Code

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## Ways to Contribute

### 1. Report Bugs

Found a bug? [Open a bug report](https://github.com/vicentealvarezasencio/ui-design-cc/issues/new?template=bug_report.yml).

Please include:
- Version number (`ui-design-cc@x.x.x`)
- Which command is affected
- Steps to reproduce
- Expected vs actual behavior
- Error messages (if any)

### 2. Suggest Features

Have an idea? [Open a feature request](https://github.com/vicentealvarezasencio/ui-design-cc/issues/new?template=feature_request.yml).

Great feature requests include:
- The problem you're trying to solve
- Your proposed solution
- Why this would benefit others

### 3. Request New Adapters

Want support for a new design tool? [Request an adapter](https://github.com/vicentealvarezasencio/ui-design-cc/issues/new?template=adapter_request.yml).

Tell us:
- What tool you want supported
- Why it would be valuable
- How the output should work

### 4. Improve Documentation

See something unclear? [Suggest an improvement](https://github.com/vicentealvarezasencio/ui-design-cc/issues/new?template=documentation.yml).

### 5. Join Discussions

- [Ideas & Questions](https://github.com/vicentealvarezasencio/ui-design-cc/discussions) — Share thoughts, ask questions
- [Show & Tell](https://github.com/vicentealvarezasencio/ui-design-cc/discussions/categories/show-and-tell) — Share what you've built

## Development Setup

### Prerequisites

- Node.js 18+
- Claude Code CLI
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/vicentealvarezasencio/ui-design-cc.git
cd ui-design-cc

# Install locally for testing
node bin/install.js --local

# Or link globally for development
npm link
```

### Project Structure

```
ui-design-cc/
├── bin/                    # Installation scripts
│   ├── install.js          # Main installer
│   └── validate.js         # Pre-publish validation
├── commands/ui/            # Slash command definitions
│   ├── init.md
│   ├── pencil.md
│   └── ...
├── agents/                 # Agent definitions
│   ├── ui-designer.md
│   └── ...
├── ui-design/
│   ├── adapters/           # Service adapters (Stitch, V0, Figma, Pencil)
│   ├── templates/          # Document templates
│   └── references/         # Reference documentation
├── CHANGELOG.md
├── README.md
└── package.json
```

## Contributing Code

### Adding a New Command

1. Create `commands/ui/your-command.md` following the existing format
2. Update `commands/ui/help.md` to include the new command
3. Update `CHANGELOG.md`
4. Test thoroughly

### Adding a New Adapter

1. Create `ui-design/adapters/your-adapter.md` following the adapter template
2. Update `ui-design/adapters/README.md` comparison tables
3. Update `commands/ui/export.md` to include the new adapter
4. Update `commands/ui/help.md`
5. Update `CHANGELOG.md`

### Adding a New Agent

1. Create `agents/your-agent.md` following the existing format
2. Update `agents/README.md`
3. Update coordinator agent if routing is needed
4. Update `CHANGELOG.md`

## Code Style

### Markdown Files

- Use clear, descriptive headings
- Include code examples where helpful
- Follow existing formatting patterns
- Use ASCII diagrams for visual concepts

### Command Files

Commands follow this structure:
```markdown
---
name: ui:command-name
description: Brief description
argument-hint: "[args]"
allowed-tools: [Tool1, Tool2]
---

<objective>
What this command does
</objective>

<context>
Required files and context
</context>

<process>
Step-by-step implementation
</process>

<success_criteria>
What success looks like
</success_criteria>
```

### Adapter Files

Adapters include these sections:
- `<adapter_info>` — Service details
- `<capability_matrix>` — Feature support
- `<transformation_rules>` — Spec → output conversion
- `<token_mapping>` — Design token handling
- `<component_descriptions>` — Component mapping
- `<iteration_guidance>` — Refinement patterns
- `<example_transformation>` — Before/after example
- `<best_practices>` — Dos and don'ts

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run validation (`node bin/validate.js`)
5. Commit with clear message
6. Push to your fork
7. Open a Pull Request

### PR Guidelines

- Keep PRs focused on a single change
- Update documentation as needed
- Update CHANGELOG.md
- Test your changes locally
- Describe what and why in the PR description

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0) — Breaking changes
- **MINOR** (0.x.0) — New features, backward compatible
- **PATCH** (0.0.x) — Bug fixes, backward compatible

## Questions?

- [Open a discussion](https://github.com/vicentealvarezasencio/ui-design-cc/discussions)
- Check existing [issues](https://github.com/vicentealvarezasencio/ui-design-cc/issues)

## Code of Conduct

Be respectful, constructive, and helpful. We're all here to build great tools together.

---

Thank you for contributing!
