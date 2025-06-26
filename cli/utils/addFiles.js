const fs = require('fs');
const path = require('path');
exports.createFile=async(projectDir,filePath)=>{
    const projectExists = fs.existsSync(projectDir);
    if (!projectExists) {
        console.log("There is no project with that name")
    }
    const fullFilePath = path.join(projectDir, filePath);
    const dirName = path.dirname(fullFilePath);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }
    const fileExists = fs.existsSync(fullFilePath);
    if (!fileExists) {
        fs.writeFileSync(fullFilePath, "");
    }
}