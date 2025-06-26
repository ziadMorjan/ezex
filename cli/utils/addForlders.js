const fs = require('fs');
const path = require('path');
exports.createFolders=(projectDir,subPath)=> {
    const projectExists = fs.existsSync(projectDir);
    if (!projectExists) {
        console.log("There is no project with that name")
    }
    const fullPath = path.join(projectDir, subPath);
    fs.mkdirSync(fullPath, { recursive: true });
}