const fs = require('fs');
const path = require('path');
const { routerTemplate } = require("../../templates/router");
const { emptyRouterTemplate } = require("../../templates/emptyRouter");
const { askTemplateChoice } = require("../../prompts"); // Import the new prompt function

exports.createRouter = async (projectDir, crudName) => {
    const routersDir = path.join(projectDir, "routers");
    const controllersDir = path.join(projectDir, "controllers");
    const modelsDir = path.join(projectDir, "models");

    const controllerPath = path.join(controllersDir, crudName.lower + "Controller.js");
    const modelPath = path.join(modelsDir, crudName.capitalized + ".js");

    // Ensure the routers directory exists
    if (!fs.existsSync(routersDir)) {
        fs.mkdirSync(routersDir);
    }

    // Ask the user for their template preference
    const templatePreference = await askTemplateChoice("router");

    let routerContent;
    if (templatePreference === 'empty') {
        console.log(`Creating an empty router for '${crudName.capitalized}'.`);
        routerContent = emptyRouterTemplate(crudName);
    } else { // 'default' preference
        // Check if BOTH the controller and the model exist
        if (fs.existsSync(controllerPath) && fs.existsSync(modelPath)) {
            console.log(`Controller '${crudName.lower}Controller.js' and Model '${crudName.capitalized}.js' found. Creating router with controller-specific routes.`);
            routerContent = routerTemplate(crudName);
        } else {
            console.log(`Controller or Model for '${crudName.capitalized}' not found. Creating an empty router (default fallback).`);
            routerContent = emptyRouterTemplate(crudName);
        }
    }

    // Write the router file
    fs.writeFileSync(path.join(routersDir, crudName.lower + "Router.js"), routerContent);
    console.log(`Router created: ${crudName.lower}Router.js`);
};
