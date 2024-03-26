import { PluginRegistry, PluginConfigFile } from './plugin.js';

export interface ICommand {
    requiresProjectInitialized: boolean;
    plugins: PluginRegistry;
    pluginConfigFile: PluginConfigFile;
    execute(): Promise<void>;
}
