import fs from 'fs';
import path from 'path';

function removeTsNoCheck(dir, remove = false) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    files.forEach((file) => {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            // Recursively process subdirectories
            removeTsNoCheck(filePath, remove);
        } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))) {
            let content = fs.readFileSync(filePath, 'utf8');

            // Remove @ts-nocheck if it exists and ensure no leading newline
            const tsNoCheckPattern = '// @ts-nocheck\n';
            if (content.startsWith(tsNoCheckPattern)) {
                console.log(`Removing @ts-nocheck from ${filePath}`);
                content = content.substring(tsNoCheckPattern.length);
            }
            // Trim leading whitespace/newlines after removing @ts-nocheck
            content = content.trimStart();

            fs.writeFileSync(filePath, content);
        }
    });
}

removeTsNoCheck('./_template');
