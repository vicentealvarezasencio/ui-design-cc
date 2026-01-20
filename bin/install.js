#!/usr/bin/env node

/**
 * UI Design System for Claude Code - Installer
 *
 * Installs commands, agents, adapters, and templates to ~/.claude/ (global)
 * or ./.claude/ (local) for use with Claude Code.
 *
 * Usage:
 *   npx ui-design-cc          # Global install (recommended)
 *   npx ui-design-cc --local  # Local install (project-specific)
 *   npx ui-design-cc --dry-run # Preview without installing
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = dirname(__dirname);

// Parse arguments
const args = process.argv.slice(2);
const isLocal = args.includes('--local');
const isGlobal = args.includes('--global');
const isDryRun = args.includes('--dry-run');
const isHelp = args.includes('--help') || args.includes('-h');

// Version from package.json
const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf-8'));
const VERSION = packageJson.version;

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function showBanner() {
  console.log(`
${colors.cyan}┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ${colors.bright}UI Design System for Claude Code${colors.reset}${colors.cyan}                            │
│   ${colors.dim}v${VERSION}${colors.reset}${colors.cyan}                                                         │
│                                                                 │
│   Specifications  ──────►  Adapters  ──────►  Design Tools     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘${colors.reset}
`);
}

function showHelp() {
  showBanner();
  console.log(`${colors.bright}Usage:${colors.reset}
  npx ui-design-cc [options]

${colors.bright}Options:${colors.reset}
  --global      Install to ~/.claude/ (default)
  --local       Install to ./.claude/ (project-specific)
  --dry-run     Preview installation without making changes
  --help, -h    Show this help message

${colors.bright}What gets installed:${colors.reset}
  commands/ui/    17 slash commands (/ui:init, /ui:export, /ui:scan, etc.)
  agents/         5 specialized agents (designer, researcher, specifier, prompter, scanner)
  ui-design/      Adapters and templates

${colors.bright}Default location:${colors.reset}
  ~/.claude/      Global installation (works across all projects)

${colors.bright}After installation:${colors.reset}
  1. Open Claude Code in any project
  2. Run /ui:init to get started
  3. Run /ui:help for command reference
`);
}

// Determine install location
async function getInstallDir() {
  if (isLocal) {
    return join(process.cwd(), '.claude');
  }
  if (isGlobal) {
    return join(homedir(), '.claude');
  }

  // Interactive mode - ask user
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log('\nWhere would you like to install UI Design System?\n');
    console.log('  1. Global (~/.claude/) - Available for all projects');
    console.log('  2. Local (./.claude/)  - Only for current project\n');

    rl.question('Select [1/2] (default: 1): ', (answer) => {
      rl.close();
      if (answer === '2') {
        resolve(join(process.cwd(), '.claude'));
      } else {
        resolve(join(homedir(), '.claude'));
      }
    });
  });
}

function countFiles(dir) {
  let count = 0;
  if (!existsSync(dir)) return 0;

  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  }
  return count;
}

// Copy directory recursively with path replacements
function copyDir(src, dest, options = {}) {
  const { pathReplacements = {}, dryRun = false } = options;

  if (!existsSync(src)) {
    return 0;
  }

  if (!dryRun) {
    mkdirSync(dest, { recursive: true });
  }

  let copied = 0;
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copied += copyDir(srcPath, destPath, options);
    } else {
      if (!dryRun) {
        let content = readFileSync(srcPath, 'utf8');

        // Apply path replacements for .md files
        if (entry.name.endsWith('.md')) {
          for (const [search, replace] of Object.entries(pathReplacements)) {
            content = content.replace(new RegExp(search, 'g'), replace);
          }
        }

        writeFileSync(destPath, content);
      }
      copied++;
    }
  }

  return copied;
}

// Remove directory if it exists
function removeDir(dir) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Main installation
async function install() {
  showBanner();

  const configDir = await getInstallDir();
  const isLocalInstall = configDir.includes(process.cwd());
  const pathPrefix = isLocalInstall ? './.claude' : '~/.claude';
  const installType = isLocalInstall ? 'local (./.claude/)' : 'global (~/.claude/)';

  if (isDryRun) {
    log(`Dry run - previewing ${installType} installation\n`, 'yellow');
  } else {
    log(`Installing to: ${configDir}\n`, 'blue');
  }

  const pathReplacements = {
    '~/.claude': pathPrefix
  };

  // Ensure base directory exists
  if (!isDryRun) {
    mkdirSync(configDir, { recursive: true });
  }

  let totalCopied = 0;

  // 1. Install commands (clean install)
  const commandsSrc = join(packageRoot, 'commands', 'ui');
  const commandsDest = join(configDir, 'commands', 'ui');
  const commandCount = countFiles(commandsSrc);

  log(`${colors.bright}Commands${colors.reset} (${commandCount} files)`, 'cyan');
  if (existsSync(commandsSrc)) {
    if (!isDryRun) {
      removeDir(commandsDest);
    }
    const copied = copyDir(commandsSrc, commandsDest, { pathReplacements, dryRun: isDryRun });
    totalCopied += copied;
    if (!isDryRun) {
      log(`  ✓ Installed to commands/ui/`, 'green');
    } else {
      log(`  Would install to commands/ui/`, 'dim');
    }
  }
  console.log();

  // 2. Install agents (only ui-* prefixed, preserve others)
  const agentsSrc = join(packageRoot, 'agents');
  const agentsDest = join(configDir, 'agents');

  // Count only ui-* agents
  let agentCount = 0;
  if (existsSync(agentsSrc)) {
    for (const file of readdirSync(agentsSrc)) {
      if (file.startsWith('ui-')) agentCount++;
    }
  }

  log(`${colors.bright}Agents${colors.reset} (${agentCount} files)`, 'cyan');
  if (existsSync(agentsSrc)) {
    if (!isDryRun) {
      mkdirSync(agentsDest, { recursive: true });

      // Remove existing ui-* agents
      if (existsSync(agentsDest)) {
        for (const file of readdirSync(agentsDest)) {
          if (file.startsWith('ui-')) {
            rmSync(join(agentsDest, file));
          }
        }
      }

      // Copy new ui-* agents
      for (const file of readdirSync(agentsSrc)) {
        if (file.startsWith('ui-')) {
          let content = readFileSync(join(agentsSrc, file), 'utf8');
          for (const [search, replace] of Object.entries(pathReplacements)) {
            content = content.replace(new RegExp(search, 'g'), replace);
          }
          writeFileSync(join(agentsDest, file), content);
          totalCopied++;
        }
      }
      log(`  ✓ Installed to agents/ui-*`, 'green');
    } else {
      totalCopied += agentCount;
      log(`  Would install to agents/ui-*`, 'dim');
    }
  }
  console.log();

  // 3. Install adapters
  const adaptersSrc = join(packageRoot, 'ui-design', 'adapters');
  const adaptersDest = join(configDir, 'ui-design', 'adapters');
  const adapterCount = countFiles(adaptersSrc);

  log(`${colors.bright}Adapters${colors.reset} (${adapterCount} files)`, 'cyan');
  if (existsSync(adaptersSrc)) {
    if (!isDryRun) {
      removeDir(adaptersDest);
    }
    const copied = copyDir(adaptersSrc, adaptersDest, { pathReplacements, dryRun: isDryRun });
    totalCopied += copied;
    if (!isDryRun) {
      log(`  ✓ Installed to ui-design/adapters/`, 'green');
    } else {
      log(`  Would install to ui-design/adapters/`, 'dim');
    }
  }
  console.log();

  // 4. Install templates
  const templatesSrc = join(packageRoot, 'ui-design', 'templates');
  const templatesDest = join(configDir, 'ui-design', 'templates');
  const templateCount = countFiles(templatesSrc);

  log(`${colors.bright}Templates${colors.reset} (${templateCount} files)`, 'cyan');
  if (existsSync(templatesSrc)) {
    if (!isDryRun) {
      removeDir(templatesDest);
    }
    const copied = copyDir(templatesSrc, templatesDest, { pathReplacements, dryRun: isDryRun });
    totalCopied += copied;
    if (!isDryRun) {
      log(`  ✓ Installed to ui-design/templates/`, 'green');
    } else {
      log(`  Would install to ui-design/templates/`, 'dim');
    }
  }
  console.log();

  // 5. Install references
  const referencesSrc = join(packageRoot, 'ui-design', 'references');
  const referencesDest = join(configDir, 'ui-design', 'references');
  const referenceCount = countFiles(referencesSrc);

  log(`${colors.bright}References${colors.reset} (${referenceCount} files)`, 'cyan');
  if (existsSync(referencesSrc)) {
    if (!isDryRun) {
      removeDir(referencesDest);
    }
    const copied = copyDir(referencesSrc, referencesDest, { pathReplacements, dryRun: isDryRun });
    totalCopied += copied;
    if (!isDryRun) {
      log(`  ✓ Installed to ui-design/references/`, 'green');
    } else {
      log(`  Would install to ui-design/references/`, 'dim');
    }
  }
  console.log();

  // 6. Write version file
  if (!isDryRun) {
    const versionPath = join(configDir, 'ui-design', 'VERSION');
    mkdirSync(dirname(versionPath), { recursive: true });
    writeFileSync(versionPath, VERSION);
    log(`Version file written (${VERSION})`, 'green');
  }

  // Summary
  console.log(colors.bright + '─'.repeat(50) + colors.reset);

  if (isDryRun) {
    log(`\nDry run complete. Would install ${totalCopied} files.`, 'yellow');
    log(`\nRun without --dry-run to install.`, 'dim');
  } else {
    log(`\n✓ Installation complete! (${totalCopied} files)`, 'green');
    log(`\nNext steps:`, 'bright');
    log(`  1. Open Claude Code in your project`, 'dim');
    log(`  2. Run ${colors.cyan}/ui:init${colors.reset}${colors.dim} to get started`);
    log(`  3. Run ${colors.cyan}/ui:help${colors.reset}${colors.dim} for all commands`);
    log(`\nWorks alongside GSD - run after /gsd:new-project`, 'dim');
  }

  console.log();
}

// Main
if (isHelp) {
  showHelp();
} else {
  install().catch((err) => {
    console.error('Installation failed:', err.message);
    process.exit(1);
  });
}
