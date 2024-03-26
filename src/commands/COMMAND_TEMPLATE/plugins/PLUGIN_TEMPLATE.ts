import { Plugin } from 'types/plugin.js';
import fs from 'fs';
import path from 'path';
import { NPM } from 'utils/package-manager.js';

const PLUGIN_NAME: Plugin = {
    install: (packageJsonAdditions) => {
        // Replace necessary parts of this function with your own plugin's installation steps
        NPM.installDev('<<PACKAGE>>'); // .install('<<PACKAGE>>')

        // Any additional setup, such as creating a config file, or modifying the package.json file
        createPrettierConfig(process.cwd());
        packageJsonAdditions.scripts = packageJsonAdditions.scripts || {};
        packageJsonAdditions.scripts.prettier = 'prettier --write .';
    },
};

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
}

export default PLUGIN_NAME;
