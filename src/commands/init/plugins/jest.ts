import { Plugin } from 'types/plugin.js';
import { NPM } from 'utils/package-manager.js';
import path from 'path';
import fs from 'fs';

const jest: Plugin = {
    install: () => {
        // Replace necessary parts of this function with your own plugin's installation steps
        NPM.installDev('jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom');
        // Instead of running the jest cli for creating config file like below, we copy over from template given by NextJS: `jestConfigTemplate`
        /* 
        const { cyan } = colors;
        console.log(cyan('Creating Jest config file. Please follow steps below:'));
        execSync('npm init jest@latest', { stdio: 'inherit' });
        */
        const targetPath = path.join(process.cwd(), 'jest.config.ts');
        fs.writeFileSync(targetPath, jestConfigTemplate);
    },
};

const jestConfigTemplate = `import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
`;

export default jest;
