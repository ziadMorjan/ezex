const fs = require('fs');
const path = require('path');
const {routerTemplate}=require("../../templates/router")
exports.createRouter=async(projectDir,crudName)=>{
    if(!(fs.existsSync(path.join(projectDir,"routers")))){
            fs.mkdirSync(path.join(projectDir,"routers"))
        }
    fs.writeFileSync(path.join(projectDir,"routers",crudName.lower+"Router.js"),routerTemplate(crudName))
}