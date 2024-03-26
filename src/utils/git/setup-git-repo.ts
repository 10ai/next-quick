import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { log, LogLevel, LogColor } from 'utils/logger.js';

function isGitRepositorySimpleCheck(directory: string) {
    return fs.existsSync(path.join(directory, '.git'));
}

export default function setupGitRepo(directory: string) {
    if (!isGitRepositorySimpleCheck(directory)) {
        execSync('git init', { cwd: directory, stdio: 'inherit' });
        log('Initialized a new Git repository.', LogLevel.checkmark, LogColor.cyan, undefined, true);
    } else {
        log('Existing Git repository found.', LogLevel.checkmark, LogColor.cyan, undefined, true);
    }
}

// TODO: Instruct the user to remember to link this current git repo to the org
// function instructGitHubRepoCreation(organizationName: string, projectName: string) {
//     console.log(`Please create a new repository in your GitHub organization.`);
//     console.log(`Visit https://github.com/organizations/${organizationName}/repositories/new`);
//     console.log(`Or, use the GitHub CLI:`);
//     console.log(`gh repo create ${organizationName}/${projectName} --public/private`);
// }

// git remote add origin https://github.com/YourOrganizationName/YourRepositoryName.git
