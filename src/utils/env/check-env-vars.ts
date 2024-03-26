import * as fs from 'fs';
import * as dotenv from 'dotenv';
import path from 'path';
import colors from 'picocolors';
import { log, LogLevel } from 'utils/logger.js';

// Function to check if required environment variables are set in .env.local
export default function checkEnvVars(envVars: string[]): boolean {
    const { white, cyan } = colors;
    const cwd = process.cwd();
    const filePath = path.resolve(cwd, '.env.local');
    // Check if .env.local file exists
    if (!fs.existsSync(filePath)) {
        console.error('.env.local file does not exist.');
        return false;
    }

    // Read and parse the .env.local file
    const envConfig = dotenv.parse(fs.readFileSync(filePath));

    // Check each required environment variable
    const missingVars: string[] = [];
    envVars.forEach((varName) => {
        if (!(varName in envConfig)) {
            missingVars.push(`${white('-')} ${cyan(varName)}`);
        }
    });

    // Report results
    if (missingVars.length > 0) {
        log(`Missing environment variables in .env.local:\n${missingVars.join('\n')}`, LogLevel.error, undefined, true);
        return false;
    }
    return true;
}
