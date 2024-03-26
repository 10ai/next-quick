import { Plugin } from 'types/plugin.js';
import path from 'path';
import fs from 'fs';

/**
 * EsLint should already be installed in create-next-app,
 * we will be doing extra configurations
 */

const eslint: Plugin = {
    install: (packageJsonAdditions) => {
        packageJsonAdditions.scripts = packageJsonAdditions.scripts || {};
        packageJsonAdditions.scripts.lint = 'next lint src --fix';
        createEslintIgnore();
    },
};

function createEslintIgnore() {
    fs.writeFileSync(
        path.join(process.cwd(), '.eslintignore'),
        `*.json
`,
        { encoding: 'utf8' }
    );
}

export default eslint;
