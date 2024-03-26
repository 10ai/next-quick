import fs from 'fs';
import path from 'path';

function addTsNoCheck(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    files.forEach((file) => {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            // Recursively process subdirectories
            addTsNoCheck(filePath);
        } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))) {
            const content = fs.readFileSync(filePath, 'utf8');
            // Check if the file already contains @ts-nocheck
            if (!content.startsWith('// @ts-nocheck')) {
                fs.writeFileSync(filePath, `// @ts-nocheck\n${content}`);
            }
        }
    });
}

addTsNoCheck('./_template');
