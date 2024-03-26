import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import colors from 'picocolors';

const { cyan, green } = colors;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseSourceDir = path.join(__dirname, 'template');
const baseTargetDir = path.join(process.cwd());

/**
 * Recursively copies directories and files from source to target,
 * logs actions for top-level directories only.
 * @param {string} source The source directory.
 * @param {string} target The target directory.
 * @param {number} depth Current depth of recursion, top-level is 0.
 */
async function copyDirectoryRecursive(source: string, target: string, depth: number = 0) {
    await fs.mkdir(target, { recursive: true });
    const entries = await fs.readdir(source, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(source, entry.name);
        const destPath = path.join(target, entry.name);

        if (entry.isDirectory()) {
            // Log only for top-level directories (depth == 0)
            if (depth == 0) {
                process.stdout.write(
                    `- Adding items to ${cyan(destPath.replace(baseTargetDir + '/', '').concat('/'))} ... `
                );
            }
            await copyDirectoryRecursive(srcPath, destPath, depth + 1);
        } else {
            if (depth == 0) {
                process.stdout.write(`- Adding ${cyan(destPath.replace(baseTargetDir + '/', ''))}`);
            }
            // Copy the file
            await fs.copyFile(srcPath, destPath);
        }
        if (depth == 0) {
            console.log(green('✔ Done'));
        }
    }
}

/**
 * Initiates the template copying process.
 * @param {string} source Subdirectory in the base source directory.
 * @param {string} target Subdirectory in the base target directory.
 */
export default async function templateCopyTransfer(source: string, target: string) {
    target = target.replace(/^\/|\/$/g, '');
    source = source.replace(/^\/|\/$/g, '');
    target = path.join(baseTargetDir, target);
    source = path.join(baseSourceDir, source);
    await copyDirectoryRecursive(source, target);
}
