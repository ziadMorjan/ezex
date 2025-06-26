const fs = require('fs');
const path = require('path');
const { modelTemplate } = require("../../templates/model")
exports.createModel = async (projectDir, crudName) => {
    if (!(fs.existsSync(path.join(projectDir, "models")))) {
        fs.mkdirSync(path.join(projectDir, "models"))
    }
    fs.writeFileSync(path.join(projectDir, "models", crudName.capitalized + ".js"), modelTemplate(crudName))
}