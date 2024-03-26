import { execSync } from 'child_process';

function runCmd(cmd: string) {
    execSync(cmd, { stdio: 'inherit' });
}

export const NPM = {
    install: (pkg: string) => {
        runCmd(`npm install ${pkg}`);
    },
    installDev: (pkg: string) => {
        runCmd(`npm install ${pkg} -D`);
    },
};
