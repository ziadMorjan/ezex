const fs = require('fs');
const path = require('path');
exports.createFolders = (projectDir, subPath) => {
    const projectExists = fs.existsSync(projectDir);
    if (!projectExists) {
        console.log("Error: Project directory does not exist.")
        return; // Exit if the project directory does not exist
    }
    const fullPath = path.join(projectDir, subPath);
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Directory created: ${fullPath}`);
}
