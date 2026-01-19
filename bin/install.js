#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const VERSION = require('../package.json').version;

// Parse arguments
const args = process.argv.slice(2);
const isLocal = args.includes('--local');
const isGlobal = args.includes('--global');
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
  console.log(`
UI Design System for Claude Code - Installer v${VERSION}

Usage: npx ui-design-cc [options]

Options:
  --global        Install to ~/.claude/ (default if non-interactive)
  --local         Install to ./.claude/ in current directory
  --help, -h      Show this help message

Examples:
  npx ui-design-cc              Interactive installation
  npx ui-design-cc --global     Install globally for all projects
  npx ui-design-cc --local      Install for current project only
`);
  process.exit(0);
}

// Determine install location
async function getInstallDir() {
  if (isLocal) {
    return path.join(process.cwd(), '.claude');
  }
  if (isGlobal) {
    return path.join(os.homedir(), '.claude');
  }

  // Interactive mode
  const rl = readline.createInterface({
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
        resolve(path.join(process.cwd(), '.claude'));
      } else {
        resolve(path.join(os.homedir(), '.claude'));
      }
    });
  });
}

// Copy directory recursively
function copyDir(src, dest, options = {}) {
  const { pathReplacements = {} } = options;

  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, options);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');

      // Apply path replacements for .md files
      if (entry.name.endsWith('.md')) {
        for (const [search, replace] of Object.entries(pathReplacements)) {
          content = content.replace(new RegExp(search, 'g'), replace);
        }
      }

      fs.writeFileSync(destPath, content);
    }
  }
}

// Remove directory if it exists
function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Main installation
async function install() {
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UI Design System for Claude Code - v${VERSION}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  const configDir = await getInstallDir();
  const isLocalInstall = configDir.includes(process.cwd());
  const pathPrefix = isLocalInstall ? './.claude' : '~/.claude';

  console.log(`\nInstalling to: ${configDir}\n`);

  const packageDir = path.join(__dirname, '..');

  const pathReplacements = {
    '~/.claude': pathPrefix
  };

  // Ensure base directory exists
  fs.mkdirSync(configDir, { recursive: true });

  // 1. Install commands (clean install)
  const commandsSrc = path.join(packageDir, 'commands', 'ui');
  const commandsDest = path.join(configDir, 'commands', 'ui');

  if (fs.existsSync(commandsSrc)) {
    removeDir(commandsDest);
    copyDir(commandsSrc, commandsDest, { pathReplacements });
    console.log('  ✓ Commands installed (commands/ui/)');
  }

  // 2. Install agents (only ui-* prefixed, preserve others)
  const agentsSrc = path.join(packageDir, 'agents');
  const agentsDest = path.join(configDir, 'agents');

  fs.mkdirSync(agentsDest, { recursive: true });

  if (fs.existsSync(agentsSrc)) {
    // Remove existing ui-* agents
    if (fs.existsSync(agentsDest)) {
      for (const file of fs.readdirSync(agentsDest)) {
        if (file.startsWith('ui-')) {
          fs.unlinkSync(path.join(agentsDest, file));
        }
      }
    }

    // Copy new ui-* agents
    for (const file of fs.readdirSync(agentsSrc)) {
      if (file.startsWith('ui-')) {
        let content = fs.readFileSync(path.join(agentsSrc, file), 'utf8');
        for (const [search, replace] of Object.entries(pathReplacements)) {
          content = content.replace(new RegExp(search, 'g'), replace);
        }
        fs.writeFileSync(path.join(agentsDest, file), content);
      }
    }
    console.log('  ✓ Agents installed (agents/ui-*)');
  }

  // 3. Install core system (clean install)
  const coreSrc = path.join(packageDir, 'ui-design');
  const coreDest = path.join(configDir, 'ui-design');

  if (fs.existsSync(coreSrc)) {
    removeDir(coreDest);
    copyDir(coreSrc, coreDest, { pathReplacements });
    console.log('  ✓ Core system installed (ui-design/)');
  }

  // 4. Write version file
  fs.writeFileSync(path.join(coreDest, 'VERSION'), VERSION);
  console.log(`  ✓ Version file written (${VERSION})`);

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ UI Design System installed successfully!

Get started:
  /ui:help              Show available commands
  /ui:setup-tokens      Initialize design system
  /ui:design-screens    Create screen specs from requirements

Works alongside GSD - run after /gsd:new-project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

install().catch((err) => {
  console.error('Installation failed:', err.message);
  process.exit(1);
});
