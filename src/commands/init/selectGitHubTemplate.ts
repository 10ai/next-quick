import fs from 'fs';
import path from 'path';
import execAsync from 'utils/exec-async.js';

const templates = [
    { name: 'None', url: 'None' },
];

const prompt = {
    type: 'list',
    name: 'template',
    message: 'Choose a template for your project:',
    choices: templates.map((t) => t.name),
};

const action = async (answers: { template: string }, projectName: string, projectPath: string): Promise<void> => {
    const { url } = templates.find((t) => t.name === answers.template) || {};
    if (url) {
        if (url === 'None') {
            createDefaultTemplate(projectName, projectPath);
        } else {
            await cloneTemplate(url, projectName);
        }
    } else {
        console.error('Invalid template selected.');
    }
};

async function cloneTemplate(githubUrl: string, projectName: string): Promise<void> {
    console.log(`Cloning template from ${githubUrl} into ${projectName}...`);
    const { stdout, stderr } = await execAsync(`git clone ${githubUrl} ${projectName}`);
    console.log(stdout);
    if (stderr) {
        console.error(stderr);
    }
}

function createDefaultTemplate(projectName: string, projectPath: string) {
    fs.mkdirSync(projectPath, { recursive: true });
    fs.writeFileSync(
        path.join(projectPath, 'README.md'),
        `# ${projectName}\n\nProject initialized with NextJS CLI.`
    );
    fs.writeFileSync(path.join(projectPath, 'config.json'), '{}');
}

export default { prompt, action };
