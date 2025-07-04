const fs = require('fs');
const path = require('path');
const { controllerTemplate } = require("../../templates/controller");
const { emptyControllerTemplate } = require("../../templates/emptyController"); // Import the new empty controller template

exports.createController = async (projectDir, crudName) => {
    const controllersDir = path.join(projectDir, "controllers");
    const modelsDir = path.join(projectDir, "models");
    const modelPath = path.join(modelsDir, crudName.capitalized + ".js");

    // Ensure the controllers directory exists
    if (!fs.existsSync(controllersDir)) {
        fs.mkdirSync(controllersDir);
    }

    let controllerContent;
    // Check if a model with the same capitalized name exists
    if (fs.existsSync(modelPath)) {
        console.log(`Model '${crudName.capitalized}.js' found. Creating empty controller.`);
        controllerContent = controllerTemplate(crudName);
    } else {
        console.log(`Model '${crudName.capitalized}.js' not found. Creating an empty controller.`);
        controllerContent = emptyControllerTemplate(crudName);
    }

    // Write the controller file
    fs.writeFileSync(path.join(controllersDir, crudName.lower + "Controller.js"), controllerContent);
    console.log(`Controller created: ${crudName.lower}Controller.js`);
};