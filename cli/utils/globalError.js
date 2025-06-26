const fs = require('fs');
const path = require('path');
const {errorTemplate}=require("../templates/globalError")
const {addApp}=require("../templates/addToApp")

exports.err=async(projectDir)=>{
    fs.writeFileSync(path.join(projectDir,"middlewares","globalErrorHandler.js"),errorTemplate())
    addApp(projectDir,{error:true})
}