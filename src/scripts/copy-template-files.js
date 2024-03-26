import shell from 'shelljs';

// We don't want to compile the TypeScript files in the template directory

const sourceDir = './_template';
const targetDir = './dist/template';

// Copying TypeScript files
// shell.cp('-R', `${sourceDir}/*.ts`, targetDir);
// console.log('TypeScript files copied successfully.');

// Copying all files
shell.cp('-R', `${sourceDir}/*`, targetDir);
console.log('Template files copied successfully.');
