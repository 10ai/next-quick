import fs from 'fs';
import path from 'path';

// Check if the .nextquickrc file exists in the current directory
export function nextquickRcExists(): string | false {
    const filePath = path.join(process.cwd(), '.nextquickrc');
    if (!fs.existsSync(filePath)) {
        return false;
    }
    return filePath;
}

// Utility function to read the .nextquickrc file
export function readConfig(): { projectPath?: string } | undefined {
    const configPath = nextquickRcExists();
    if (configPath) {
        const configFile = fs.readFileSync(configPath, 'utf-8');
        try {
            const config = JSON.parse(configFile);
            return config;
        } catch (error) {
            console.error('Failed to parse .nextquickrc:', error);
            process.exit(1);
        }
    }
    console.error(
        '.nextquickrc does not exist in the current directory. Run `nextquick init` to create a new project.'
    );
    process.exit(1);
}
