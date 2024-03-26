import inquirer from 'inquirer';
import { validateGitHubStatus } from 'utils/git/check-git.js';
import { ICommand } from 'types/ICommand.js';
import createCommand from '../createCommand.js';
import allPlugins from './plugins/index.js';
import pluginConfigFile from './plugins/config.json';
import { askOpenPage } from 'utils/inquirer/ask-open-page.js';

const deploymentOptions = [
    {
        name: 'Vercel',
        url: 'https://vercel.com/new',
    },
    {
        name: 'AWS Amplify',
        url: 'https://console.aws.amazon.com/amplify/home',
    },
];

/**
 * Initializes a new project by prompting the user for a project name and a GitHub template.
 */
const deploy: ICommand = createCommand({
    requiresProjectInitialized: true,
    plugins: allPlugins,
    pluginConfigFile,
    action: async () => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'target',
                    message: 'Choose your deployment target:',
                    choices: deploymentOptions.map((option) => option.name),
                },
            ])
            .then(async (answers) => {
                try {
                    await validateGitHubStatus();
                    const selectedOption = deploymentOptions.find((option) => option.name === answers.target);
                    if (selectedOption)
                        await askOpenPage(
                            `Log in to ${selectedOption.name} to deploy your project`,
                            selectedOption.url
                        );
                } catch (error) {
                    console.error('Failed to deploy project:', error);
                }
            })
            .catch((error) => {
                console.error('Failed to prompt:', error);
            });
    },
});

export default deploy;
