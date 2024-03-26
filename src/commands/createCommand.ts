import { ICommand } from 'types/ICommand.js';
import { PluginRegistry, PluginConfigFile } from 'types/plugin.js';
import { readConfig } from 'utils/read-config-file.js';

export default function createCommand(config: {
    requiresProjectInitialized: boolean;
    plugins: PluginRegistry;
    pluginConfigFile: PluginConfigFile;
    action: (context: { plugins: PluginRegistry }) => Promise<void>;
}): ICommand {
    const { requiresProjectInitialized, plugins, pluginConfigFile, action } = config;

    return {
        requiresProjectInitialized,
        plugins,
        pluginConfigFile,
        async execute() {
            // Always check requiresProjectInitialized flag
            if (requiresProjectInitialized) {
                const config = readConfig();

                if (!config) {
                    console.error('Project is not initialized.');
                    process.exit(1);
                }
            }
            let filteredPluginRegistry: PluginRegistry = {};
            // Always load in plugins if any
            if (pluginConfigFile) {
                filteredPluginRegistry = Object.entries(plugins).reduce((acc, [pluginName, plugin]) => {
                    // If the plugin is not mentioned in configFile.plugins or is explicitly set to true, keep it
                    if (pluginConfigFile.plugins[pluginName] !== false) {
                        acc[pluginName] = plugin;
                    }
                    return acc;
                }, {} as PluginRegistry);
            }
            // Custom logic for the command
            await action({ plugins: filteredPluginRegistry });
        },
    };
}
