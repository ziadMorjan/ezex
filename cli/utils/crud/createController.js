const fs = require('fs');
const path = require('path');
const { controllerTemplate } = require("../../templates/controller");
const { emptyControllerTemplate } = require("../../templates/emptyController");
const { askTemplateChoice } = require("../../prompts"); // Import the new prompt function

exports.createController = async (projectDir, crudName) => {
    const controllersDir = path.join(projectDir, "controllers");
    const modelsDir = path.join(projectDir, "models");
    const modelPath = path.join(modelsDir, crudName.capitalized + ".js");

    // Ensure the controllers directory exists
    if (!fs.existsSync(controllersDir)) {
        fs.mkdirSync(controllersDir);
    }

    // Ask the user for their template preference
    const templatePreference = await askTemplateChoice("controller");

    let controllerContent;
    if (templatePreference === 'empty') {
        console.log(`Creating an empty controller for '${crudName.capitalized}'.`);
        controllerContent = emptyControllerTemplate(crudName);
    } else { // 'default' preference
        // Check if a model with the same capitalized name exists
        if (fs.existsSync(modelPath)) {
            console.log(`Model '${crudName.capitalized}.js' found. Creating controller with model-specific CRUD functions.`);
            controllerContent = controllerTemplate(crudName);
        } else {
            console.log(`Model '${crudName.capitalized}.js' not found. Creating an empty controller (default fallback).`);
            controllerContent = emptyControllerTemplate(crudName);
        }
    }

    // Write the controller file
    fs.writeFileSync(path.join(controllersDir, crudName.lower + "Controller.js"), controllerContent);
    console.log(`Controller created: ${crudName.lower}Controller.js`);
};
