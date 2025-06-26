const fs = require('fs');
const path = require('path');
exports.folders=async(foldersArray,projectDir)=>{
    for (folder of foldersArray){
        if(!fs.existsSync(path.join(projectDir,folder))){
            fs.mkdirSync(path.join(projectDir, folder));
        }
    }
}