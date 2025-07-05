const fs = require('fs');
const path = require('path');

const srcFolder = 'src';

function cleanJsFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return;
        }

        fs.unlink(filePath, () => {
            console.log(`Cleaned: ${filePath}`);
        });

        // let cleanedData = data.replace(/\/\/.*$/gm, '');

        // cleanedData = cleanedData.replace(/\/\*[\s\S]*?\*\//g, '');

        // cleanedData = cleanedData.replace(/(\n\s*){2,}/g, '\n\n');
        // cleanedData = cleanedData.split('\n').map(line => line.trim()).join('\n');

        // cleanedData = cleanedData.replace(/^\s*[\r\n]/gm, '').replace(/[\r\n]{3,}/g, '\n\n');

        // fs.writeFile(filePath, cleanedData, 'utf8', (err) => {
        //     if (err) {
        //         console.error(`Error writing to file ${filePath}:`, err);
        //     } else {
        //         console.log(`Cleaned: ${filePath}`);
        //     }
        // });
    });
}

function processFolder(folderPath) {
    fs.readdir(folderPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error(`Error reading directory ${folderPath}:`, err);
            return;
        }

        entries.forEach(entry => {
            const fullPath = path.join(folderPath, entry.name);
            if (entry.isDirectory()) {
                processFolder(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                cleanJsFile(fullPath);
            }
        });
    });
}

processFolder(srcFolder);