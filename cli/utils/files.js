const fs = require('fs');
const path = require('path');
exports.files=async(filesArray,projectDir)=>{
    filesArray.forEach(file => {
        fs.writeFileSync(path.join(projectDir, file),"");
    });
} 