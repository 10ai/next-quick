import { Plugin } from 'types/plugin.js';
import { NPM } from 'utils/package-manager.js';
import config from './config.json';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Set up husky pre-commit hooks
 * - uses lint-staged to run prettier and eslint on staged files
 */

const husky: Plugin = {
    install: (packageJsonAdditions) => {
        NPM.installDev('husky lint-staged');
        createLintStagedRc();
        createHuskyPreCommitHook();
        execSync('git init');
        execSync('npx husky');
        updatePackageJson(packageJsonAdditions);
    },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function updatePackageJson(packageJsonAdditions: any) {
    packageJsonAdditions.scripts = packageJsonAdditions.scripts || {};
    // Add or modify the husky and lint-staged configurations
    packageJsonAdditions.husky = {
        hooks: {
            'pre-commit': 'lint-staged',
        },
    };
    const scripts = ['npm run lint'];

    // If prettier is used in the project, make pre-commit hook run prettier as well
    config.plugins.prettier && scripts.push('npm run prettier');

    // Why the !() syntax? It's a glob pattern to ignore the [kindeAuth] directory because ESLint doesn't like it
    packageJsonAdditions['lint-staged'] = {
        '*.{ts,tsx}': scripts,
    };
}

// https://nextjs.org/docs/app/building-your-application/configuring/eslint#lint-staged
function createLintStagedRc() {
    const content = `
const path = require('path');

const buildEslintCommand = (filenames) =>
    \`next lint --fix --file \${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}\`;

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
`;

    fs.writeFileSync(path.join(process.cwd(), '.lintstagedrc.js'), content, { encoding: 'utf8' });
}

function createHuskyPreCommitHook() {
    const huskyDirPath = path.join(process.cwd(), '.husky');
    const preCommitFilePath = path.join(huskyDirPath, 'pre-commit');

    // Ensure the .husky directory exists
    if (!fs.existsSync(huskyDirPath)) {
        fs.mkdirSync(huskyDirPath);
    }

    // Write the pre-commit hook script, set to executable
    fs.writeFileSync(
        preCommitFilePath,
        `#!/bin/sh
npx lint-staged
`,
        { mode: 0o755, encoding: 'utf8' }
    );
}

export default husky;
