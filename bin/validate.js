#!/usr/bin/env node

/**
 * UI Design System for Claude Code - Pre-publish Validation
 *
 * Validates that all required files exist before publishing to npm.
 * Run via: npm run prepublishOnly
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = dirname(__dirname);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Required files and directories
const requiredFiles = [
  'package.json',
  'README.md',
  'LICENSE',
  'bin/install.js',
  'bin/validate.js'
];

const requiredCommands = [
  'init.md',
  'setup-tokens.md',
  'design-screens.md',
  'define-components.md',
  'export.md',
  'import-tokens.md',
  'import-design.md',
  'realize.md',
  'sync.md',
  'status.md',
  'decisions.md',
  'patterns.md',
  'whats-new.md',
  'help.md'
];

const requiredAgents = [
  'README.md',
  'ui-designer.md',
  'ui-researcher.md',
  'ui-specifier.md',
  'ui-prompter.md'
];

const requiredAdapters = [
  'README.md',
  'stitch.md',
  'v0.md',
  'figma.md',
  'generic.md'
];

const requiredTemplates = [
  'README.md',
  'ui-spec.md',
  'ui-context.md',
  'screen.md',
  'component.md',
  'ui-patterns.md',
  'ui-decisions.md',
  'ui-registry.md',
  'design-tokens.json'
];

let errors = [];
let warnings = [];

function checkFile(path, description) {
  const fullPath = join(packageRoot, path);
  if (!existsSync(fullPath)) {
    errors.push(`Missing ${description}: ${path}`);
    return false;
  }
  return true;
}

function checkDirectory(dir, files, description) {
  const dirPath = join(packageRoot, dir);

  if (!existsSync(dirPath)) {
    errors.push(`Missing directory: ${dir}`);
    return;
  }

  for (const file of files) {
    const fullPath = join(dirPath, file);
    if (!existsSync(fullPath)) {
      errors.push(`Missing ${description}: ${dir}/${file}`);
    }
  }
}

function validatePackageJson() {
  const pkgPath = join(packageRoot, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  // Check required fields
  const requiredFields = ['name', 'version', 'description', 'bin', 'files', 'license'];
  for (const field of requiredFields) {
    if (!pkg[field]) {
      errors.push(`package.json missing required field: ${field}`);
    }
  }

  // Check version format
  if (pkg.version && !/^\d+\.\d+\.\d+$/.test(pkg.version)) {
    warnings.push(`Version "${pkg.version}" should follow semver format (x.y.z)`);
  }

  // Check files array includes required directories
  const requiredInFiles = ['bin/', 'commands/', 'agents/', 'ui-design/'];
  for (const item of requiredInFiles) {
    if (!pkg.files || !pkg.files.includes(item)) {
      errors.push(`package.json "files" should include: ${item}`);
    }
  }

  return pkg;
}

function countFiles(dir) {
  let count = 0;
  const fullPath = join(packageRoot, dir);

  if (!existsSync(fullPath)) return 0;

  const items = readdirSync(fullPath);
  for (const item of items) {
    const itemPath = join(fullPath, item);
    const stat = statSync(itemPath);
    if (stat.isDirectory()) {
      count += countFiles(join(dir, item));
    } else {
      count++;
    }
  }
  return count;
}

// Run validation
log('\nValidating UI Design System for Claude Code...\n', 'bright');

// Check root files
log('Checking root files...', 'bright');
for (const file of requiredFiles) {
  checkFile(file, 'root file');
}

// Check package.json
log('Validating package.json...', 'bright');
const pkg = validatePackageJson();

// Check commands
log('Checking commands/ui/...', 'bright');
checkDirectory('commands/ui', requiredCommands, 'command');

// Check agents
log('Checking agents/...', 'bright');
checkDirectory('agents', requiredAgents, 'agent');

// Check adapters
log('Checking ui-design/adapters/...', 'bright');
checkDirectory('ui-design/adapters', requiredAdapters, 'adapter');

// Check templates
log('Checking ui-design/templates/...', 'bright');
checkDirectory('ui-design/templates', requiredTemplates, 'template');

// Summary
console.log('\n' + '─'.repeat(50));

const commandCount = countFiles('commands/ui');
const agentCount = countFiles('agents');
const adapterCount = countFiles('ui-design/adapters');
const templateCount = countFiles('ui-design/templates');

log(`\nPackage: ${pkg.name}@${pkg.version}`, 'bright');
log(`Commands: ${commandCount} files`, 'bright');
log(`Agents: ${agentCount} files`, 'bright');
log(`Adapters: ${adapterCount} files`, 'bright');
log(`Templates: ${templateCount} files`, 'bright');

if (warnings.length > 0) {
  log(`\nWarnings (${warnings.length}):`, 'yellow');
  for (const warning of warnings) {
    log(`  ⚠ ${warning}`, 'yellow');
  }
}

if (errors.length > 0) {
  log(`\nErrors (${errors.length}):`, 'red');
  for (const error of errors) {
    log(`  ✗ ${error}`, 'red');
  }
  log('\nValidation failed. Please fix errors before publishing.\n', 'red');
  process.exit(1);
} else {
  log('\n✓ Validation passed! Ready to publish.\n', 'green');
  process.exit(0);
}
