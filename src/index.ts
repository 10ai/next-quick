#!/usr/bin/env node

import { program } from 'commander';
import initProject from './commands/init/init.js';
import addDatabase from './commands/database/database.js';
import deploy from './commands/deploy/deploy.js';
import auth from './commands/auth/auth.js';
import { nextquickRcExists } from 'utils/read-config-file.js';
import checkIfAnyDirectoryExists from 'utils/check-directory.js';
import colors from 'picocolors';

program.name('next-quick').description('CLI to initialize and set up volunteer management systems');

const { green } = colors;
// Only show init command if .nextquickrc does not exist
if (!nextquickRcExists()) {
    program.command('init').description('Initialize a new volunteer management project').action(initProject.execute);
    // Case for if they created a project but haven't cd into it yet
    // If a directory exists, add help text to the end of message to remind them to cd into the project directory
    if (checkIfAnyDirectoryExists()) {
        program.addHelpText(
            'after',
            `\n${green(`* If you've already initialized a project, make sure to cd into the project directory before running any other commands.`)}\n`
        );
    }
} else {
    // Only show rest of commands if .nextquickrc exists
    program.command('deploy').description('Deploy the project').action(deploy.execute);
    program.command('database').description('Add a database to the project').action(addDatabase.execute);
    program.command('auth').description('Add authentication to the project').action(auth.execute);
}

program.parse(process.argv);
