import { execSync } from 'child_process';
import inquirer from 'inquirer';
import colors from 'picocolors';
import { log, LogLevel } from 'utils/logger.js';

/**
 * Validates the current Git repository status to ensure that the project can be deployed.
 * - Checks if it's a Git repository
 * - Checks if it has a remote
 * - Checks if there are unpushed changes
 */
async function validateGitHubStatus() {
    const { yellow } = colors;
    if (!isGitRepository()) {
        log('This directory is not a Git repository. Did you mean to run: next-quick init', LogLevel.error);
        process.exit(1);
    }
    if (!hasRemote()) {
        log('This Git repository does not have a remote.', LogLevel.error);
        log('Please create a new repository in your GitHub organization, then');
        log('git remote add origin https://github.com/YourOrganizationName/YourRepositoryName.git', LogLevel.command);

        process.exit(1);
    }
    if (hasUnpushedChanges(true)) {
        const answers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continue',
                message: "You have uncommitted changes that won't be reflected in the deployment. Continue?",
                default: false,
                prefix: yellow('⚠️'),
            },
        ]);
        if (!answers.continue) {
            process.exit(1);
        }
    }
}

function isGitRepository() {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

function hasRemote() {
    try {
        const result = execSync('git remote', { encoding: 'utf8' });
        return result.trim().length > 0;
    } catch {
        return false;
    }
}

function hasUnpushedChanges(silent: boolean): boolean {
    try {
        execSync('git diff --quiet && git diff --staged --quiet', { stdio: 'ignore' });
        return false;
    } catch {
        !silent && console.warn("You have uncommitted changes that won't be reflected in the deployment.");
        return true;
    }
}

export { validateGitHubStatus, isGitRepository, hasRemote, hasUnpushedChanges };
