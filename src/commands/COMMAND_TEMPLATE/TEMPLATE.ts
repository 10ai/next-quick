// import inquirer from 'inquirer';
import createCommand from '../createCommand.js';
import pluginConfigFile from './plugins/config.json';

import allPlugins from './plugins/index.js';
import { ICommand } from 'types/ICommand.js';

/**
 * TEMPLATE
 */
const COMMAND_NAME: ICommand = createCommand({
    requiresProjectInitialized: true,
    plugins: allPlugins,
    pluginConfigFile,
    action: async (context) => {
        const plugins = context.plugins;

        // Add stuff here, like inquirer prompts or other logic
        plugins.prettier.install({});
    },
});

export default COMMAND_NAME;
