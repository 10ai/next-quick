import { existsSync, appendFileSync } from 'fs';
import colors from 'picocolors';
import { log, LogLevel } from 'utils/logger.js';

const envLocalPath = '.env.local';

/**
 * Writes to the .env.local file.
 */
export default function writeToEnv(key: string, value: string) {
    const { cyan } = colors;
    try {
        // Check if the .env.local file exists
        if (existsSync(envLocalPath)) {
            // Append a new line to the .env.local file
            appendFileSync(envLocalPath, `\n${key}=${value}\n`);
            log(`Added new line for ${cyan(key)} to ${envLocalPath} file.`, LogLevel.checkmark, undefined, true);
        } else {
            log(`${cyan(envLocalPath)} file does not exist.`, LogLevel.error);
        }
    } catch (error) {
        log(`Failed to write to ${cyan(envLocalPath)} file, appending ${cyan(key)}: ${error}`, LogLevel.error);
    }
}
