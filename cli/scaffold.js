// This file handles the main scaffolding logic for creating an Express project.

const { folders } = require("./utils/folders");
const { files } = require("./utils/files");
const { mainFolder } = require("./utils/mainFolder");
const { database } = require("./utils/database");
const { generateEnvTemplate } = require("./templates/env");
const { gitignore } = require("./utils/gitignore");
const { server } = require("./templates/server");
const { app } = require("./templates/app");
const { exe } = require("./utils/install");
const { cors } = require("./utils/cors");
const { morgan } = require("./utils/morgan");
const { errorHandler } = require("./utils/errorMiddleware");
const { createFolders } = require("./utils/addForlders");
const { createFile } = require("./utils/addFiles");
const fs = require("fs");
const path = require("path");
const simpleGit = require('simple-git');
const git = simpleGit();

// Import the CustomError template
const { customErrorTemplate } = require("./templates/customError");
// Import the new QueryManipulator template
const { queryManipulatorTemplate } = require("./templates/queryManipulator");
// Import the generic controller template
const { generalControllerTemplate } = require("./templates/generalController");

const foldersArray = ["config", "controllers", "middlewares", "models", "routers", "utils"];
const filesArray = ["config.env", ".gitignore"];
const packageArray = ["express", "dotenv"];
const devPackageArray = ["nodemon"];

let varliables = {
    NODE_ENV: "development"
};

/**
 * Scaffolds the Express project based on provided options.
 * @param {string} projectDir - The root directory of the project.
 * @param {object} more - An object containing additional features to include.
 * @param {boolean} [more.db] - Whether to include database configuration.
 * @param {boolean} [more.app] - Whether to include default app.js and server.js.
 * @param {boolean} [more.cors] - Whether to include CORS configuration.
 * @param {boolean} [more.morgan] - Whether to include morgan configuration.
 * @param {boolean} [more.err] - Whether to include global error handling.
 * @param {boolean} [more.git] - Whether to initialize a Git repository.
 * @param {string[]} [more.d] - Array of custom directories to create.
 * @param {string[]} [more.f] - Array of custom files to create.
 * @param {string[]} [more.i] - Array of additional packages to install.
 */
exports.scaffoldProject = async (projectDir, more) => {
    await mainFolder(projectDir);
    await folders(foldersArray, projectDir);

    // Create core utility files
    await createFile(projectDir, "utils/CustomError.js", customErrorTemplate);
    await createFile(projectDir, "utils/QueryManipulator.js", queryManipulatorTemplate);
    await createFile(projectDir, "controllers/Controller.js", generalControllerTemplate);

    // Create other standard files
    await files(filesArray, projectDir);

    // Gitignore is always created
    gitignore(projectDir);

    // Always create app.js and server.js with their base content
    await app(projectDir);
    await server(projectDir, more.db ?? null);

    // Always include global error handling
    // This will create middlewares/errorMiddleware.js and add its usage to app.js
    await errorHandler(projectDir);

    // Conditional features
    if (more.db) {
        packageArray.push("mongoose");
        database(projectDir);
        varliables.MONGO_URI = "Add your mongo url here";
    }

    if (more.cors) {
        packageArray.push("cors");
        cors(projectDir);
    }
    if (more.morgan) {
        packageArray.push("morgan");
        morgan(projectDir);
    }
    // Note: more.err is no longer needed here as errorHandler is always called.
    // It can still be used in `prepareProject` if you want to track the user's initial choice,
    // but it won't prevent error handling from being added.

    // Handle custom directories, files, and additional packages
    if (more.d) {
        more.d.forEach(folder => {
            createFolders(projectDir, folder);
        });
    }
    if (more.f) {
        more.f.forEach(file => {
            createFile(projectDir, file);
        });
    }
    if (more.i) {
        more.i.forEach(pkg => {
            packageArray.push(pkg);
        });
    }

    await generateEnvTemplate(varliables, projectDir);
    const commandsArray = ["npm init -y", "npm i --save " + packageArray.join(' ') + "", "npm i --save-dev " + devPackageArray.join(' ') + ""];

    await exe(commandsArray, projectDir);
    if (more.git) {
        try {
            console.log('Initializing Git repository...');
            await git.cwd(projectDir).init();
            await git.add('./*');
            await git.commit('Initial commit');
            console.log('Git repository initialized');
        } catch (err) {
            console.error('Git init failed:', err.message);
        }
    }
};
