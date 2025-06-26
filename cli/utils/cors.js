const {addApp}=require("../templates/addToApp")

exports.cors=async(projectDir)=>{
    addApp(projectDir,{cors:true})
}