const fs = require('fs');
const path = require('path');
const { controllerTemplate } = require("../../templates/controller")

exports.createController = async (projectDir, crudName) => {
    if (!(fs.existsSync(path.join(projectDir, "controllers")))) {
        fs.mkdirSync(path.join(projectDir, "controllers"))
    }
    if (fs.existsSync(path.join(projectDir))) { }
    fs.writeFileSync(path.join(projectDir, "controllers", crudName.lower + "Controller.js"), controllerTemplate(crudName))
}