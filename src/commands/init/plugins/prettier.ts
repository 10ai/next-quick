import { Plugin } from 'types/plugin.js';
import fs from 'fs';
import path from 'path';
import { NPM } from 'utils/package-manager.js';

const VERBOSE = false;

const prettier: Plugin = {
    install: (packageJsonAdditions) => {
        VERBOSE && console.log('Installing Prettier...');
        NPM.installDev('prettier eslint-plugin-prettier eslint-config-prettier');

        VERBOSE && console.log('Configuring Prettier...');
        updateEslintConfig(process.cwd());
        createPrettierConfig(process.cwd());
        createPrettierIgnore(process.cwd());
        packageJsonAdditions.scripts = packageJsonAdditions.scripts || {};
        packageJsonAdditions.scripts.prettier = 'prettier --write .';

        VERBOSE && console.log('Prettier installed and configured.');
    },
};

function updateEslintConfig(projectPath: string) {
    const eslintConfigPath = path.join(projectPath, '.eslintrc.json'); // Adjust based on actual ESLint config file name

    let eslintConfig;
    try {
        eslintConfig = JSON.parse(fs.readFileSync(eslintConfigPath, 'utf8'));
    } catch (error) {
        console.error('Failed to read ESLint config:', error);
        return;
    }

    // Ensure 'extends' is an array and includes Prettier configs
    const extendsArray = Array.isArray(eslintConfig.extends) ? eslintConfig.extends : [eslintConfig.extends];
    eslintConfig.extends = [...extendsArray, 'plugin:prettier/recommended'];

    // Write the updated configuration back to the file
    fs.writeFileSync(eslintConfigPath, JSON.stringify(eslintConfig, null, 2), 'utf8');

    VERBOSE && console.log('ESLint configuration updated to include Prettier.');
}

function createPrettierConfig(projectPath: string) {
    const config = {
        printWidth: 120,
        singleQuote: true,
        useTabs: false,
        tabWidth: 4,
        semi: true,
        bracketSpacing: true,
        arrowParens: 'always',
        trailingComma: 'es5',
        bracketSameLine: false,
        jsxSingleQuote: true,
    };

    const configPath = path.join(projectPath, '.prettierrc');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

    VERBOSE && console.log('Prettier configuration created.');
}

function createPrettierIgnore(projectPath: string) {
    fs.writeFileSync(
        path.join(projectPath, '.prettierignore'),
        `
`,
        { encoding: 'utf8' }
    );
}

export default prettier;
