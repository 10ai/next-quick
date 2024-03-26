import inquirer from 'inquirer';
import open from 'open';
import colors from 'picocolors';

export async function askOpenPage(action: string, url: string) {
    const { cyan } = colors;
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: `\n${action}: ${cyan(url)}\nOpen page now?`,
            default: true,
        },
    ]);
    if (!answers.continue) {
        process.exit(1);
    }
    open(url);
}
