import fs from 'fs';
import path from 'path';

// Check if the .nextjsclirc file exists in the current directory
export function nextjscliRcExists(): string | false {
    const filePath = path.join(process.cwd(), '.nextjsclirc');
    if (!fs.existsSync(filePath)) {
        return false;
    }
    return filePath;
}

// Utility function to read the .nextjsclirc file
export function readConfig(): { projectPath?: string } | undefined {
    const configPath = nextjscliRcExists();
    if (configPath) {
        const configFile = fs.readFileSync(configPath, 'utf-8');
        try {
            const config = JSON.parse(configFile);
            return config;
        } catch (error) {
            console.error('Failed to parse .nextjsclirc:', error);
            process.exit(1);
        }
    }
    console.error(
        '.nextjsclirc does not exist in the current directory. Run `nextjscli init` to create a new project.'
    );
    process.exit(1);
}
