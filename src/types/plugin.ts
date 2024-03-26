export interface StringIndexablePlugin {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    [key: string]: (packageJsonAdditions: any) => void;
}

interface BasePlugin {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    install: (packageJsonAdditions: any) => void;
}

export type Plugin = BasePlugin & StringIndexablePlugin;

/**
 * Example of PluginRegistry object:
 * {
 *    eslint: Plugin,
 *    prettier: Plugin,
 * }
 */
export type PluginRegistry = {
    [key: string]: Plugin;
};

export interface PluginConfigField {
    [pluginName: string]: boolean;
}

export type PluginConfigFile = {
    name: string;
    plugins: PluginConfigField;
};
