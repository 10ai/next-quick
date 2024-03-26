import inquirer from 'inquirer';
import createCommand from '../createCommand.js';
import pluginConfigFile from './plugins/config.json';

import allPlugins from './plugins/index.js';
import { ICommand } from 'types/ICommand.js';
import { log } from 'utils/logger.js';
import colors from 'picocolors';

/**
 * Auth command to set up authentication for the project
 */
const auth: ICommand = createCommand({
    requiresProjectInitialized: true,
    plugins: allPlugins,
    pluginConfigFile,
    action: async (context) => {
        const plugins = context.plugins;
        const authOptions = [
            { name: 'Kinde (Recommended) https://kinde.com/', value: 'kinde' },
            { name: 'Other - I will set up auth myself', value: 'other' },
        ];
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'auth',
                    message: 'Choose an authentication option for your project:',
                    choices: authOptions.map((auth) => auth.name),
                },
            ]);

            const selectedOption = authOptions.find((auth) => auth.name === answers.auth);
            if (!selectedOption) {
                console.error('Invalid auth selection.');
                return;
            }
            const { cyan } = colors;
            log(`Setting up ${cyan(selectedOption.name)} for your project...`);
            switch (selectedOption.value) {
                case 'kinde':
                    plugins.kinde.install({});
                    break;
                case 'other':
                    break;
            }
        } catch (error) {
            console.error('Failed to add auth:', error);
        }
    },
});

export default auth;
