import inquirer from 'inquirer';
import { Plugin } from 'types/plugin.js';
import { NPM } from 'utils/package-manager.js';
import writeToEnv from 'utils/env/write-to-env.js';
import { log, LogColor, LogLevel } from 'utils/logger.js';
import templateCopyTransfer from 'utils/template-copy-transfer.js';
import { askOpenPage } from 'utils/inquirer/ask-open-page.js';

// MongoDB with Mongoose ORM
const mongoose: Plugin = {
    install: async () => {
        try {
            NPM.install('mongoose');

            // Prompt user to go to mongoDB website to set up project
            await askOpenPage(
                'Log in to MongoDB to connect your project',
                'https://www.mongodb.com/cloud/atlas/register'
            );
            // Prompt user for & add to url .env
            log(
                'Log in to your MongoDB Atlas account and copy the connection string, which can be found under:\n“Connect” > “Connecting with MongoDB for VS Code.”',
                undefined,
                LogColor.cyan,
                true
            );
            const resUrl = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'url',
                    message: 'Enter your MongoDB connection URL:',
                    validate: (input) => {
                        if (input.length === 0) {
                            return 'MongoDB connection URL cannot be empty.';
                        }
                        return true;
                    },
                },
            ]);
            let url = resUrl.url;
            // If "<password>" is in the URL, replace it with the actual password by prompting the user
            if (url.includes('<password>')) {
                log(
                    'Please enter the password for your MongoDB database user. You can find this on the left navigation bar:\n“Security” > “Database Access.”',
                    undefined,
                    LogColor.cyan,
                    true
                );
                const resPw = await inquirer.prompt([
                    {
                        type: 'password',
                        name: 'password',
                        message: 'Enter your database user password:',
                        validate: (input) => {
                            if (input.length === 0) {
                                return 'Database user password cannot be empty.';
                            }
                            return true;
                        },
                    },
                ]);
                url = url.replace('<password>', resPw.password);
            }
            // Add the MONDODB_URL to the user's .env.local file
            writeToEnv('MONGODB_URL', url);
            await templateCopyTransfer('plugins/mongoose', 'src');
            NPM.installDev('swr');

            log(
                'Test the database connection at http://localhost:3000/test-database',
                LogLevel.success,
                undefined,
                true
            );
        } catch (error) {
            console.error('Failed to set up database for project:', error);
        }
    },
};

export default mongoose;
