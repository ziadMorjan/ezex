const fs = require("fs")
exports.mainFolder=async(projectDir)=>{
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir);
    } 
}