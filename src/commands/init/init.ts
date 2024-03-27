import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { chdir } from 'process';
import installPlugins from 'utils/install-plugins.js';
import colors from 'picocolors';
import setupGitRepo from 'utils/git/setup-git-repo.js';
import createCommand from '../createCommand.js';
import { ICommand } from 'types/ICommand.js';
import allPlugins from './plugins/index.js';
import pluginConfigFile from './plugins/config.json';
import { log, LogLevel, LogColor } from 'utils/logger.js';

/**
 * Initializes a new project by prompting the user for a project name and a GitHub template.
 */

const initProject: ICommand = createCommand({
    requiresProjectInitialized: false,
    plugins: allPlugins,
    pluginConfigFile,
    action: async (context) => {
        const { cyan } = colors;
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'Project name:',
                    validate: (input) => {
                        if (input.length === 0) {
                            return 'Project name cannot be empty.';
                        } else if (/^[a-z0-9-_]+$/.test(input)) {
                            if (fs.existsSync(input)) {
                                return 'A directory with this name already exists.';
                            }
                            return true;
                        }
                        return 'Project name must be all lowercase and can only include letters, numbers, underscores, and hyphens.';
                    },
                },
            ])
            .then(async (answers) => {
                try {
                    const projectName = answers.projectName;
                    const projectPath = path.join(process.cwd(), projectName);
                    const configPath = path.join(projectPath, '.nextjsclirc');
                    // const defaultConfig = { projectName, projectPath };
                    const defaultConfig = { projectName };

                    if (!fs.existsSync(projectPath)) {
                        fs.mkdirSync(projectPath, { recursive: true });
                    }

                    createNextApp(projectPath);

                    chdir(projectPath);

                    setupGitRepo(projectPath);

                    // Create an .env.local file
                    const envLocalPath = path.join(projectPath, '.env.local');
                    fs.writeFileSync(envLocalPath, '', 'utf-8');

                    installPlugins(context.plugins);

                    execSync('npm run prettier', { stdio: 'inherit' });

                    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
                    log(
                        `Config file .nextjsclirc created in ${configPath}`,
                        LogLevel.checkmark,
                        LogColor.cyan,
                        true,
                        true
                    );
                    log(`Project ${cyan(projectName)} initialized.`, LogLevel.checkmark);
                } catch (error) {
                    console.error('Failed to initialize project:', error);
                }
            })
            .catch((error) => {
                console.error('Failed to prompt:', error);
            });
    },
});

function createNextApp(projectPath: string) {
    const FLAGS = '--use-npm --typescript --tailwind  --eslint --app --src-dir --import-alias "@/*"';
    execSync(`npx create-next-app@latest . ${FLAGS}`, { cwd: projectPath, stdio: 'inherit' });
}

export default initProject;
