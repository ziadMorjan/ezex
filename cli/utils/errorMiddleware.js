// This utility file is responsible for creating and adding the error handling middleware file to the project.

const fs = require('fs');
const path = require('path');
// Import the errorTemplate from the updated errorHandler template file
const { errorTemplate } = require("../templates/errorMiddleware");
const { addApp } = require("../templates/addToApp");

exports.errorHandler = async (projectDir) => {
    // Write the error handling middleware content to the new file path
    fs.writeFileSync(path.join(projectDir, "middlewares", "errorMiddleware.js"), errorTemplate());
    // Add the error handling middleware to the app.js file
    addApp(projectDir, { error: true });
};
