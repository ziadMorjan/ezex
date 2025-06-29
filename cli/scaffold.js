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
const { errorHandler } = require("./utils/errorMiddleware"); // Updated import path and name
const { createFolders } = require("./utils/addForlders");
const { createFile } = require("./utils/addFiles");
const fs = require("fs");
const path = require("path");
const simpleGit = require('simple-git');
const git = simpleGit();

const foldersArray = ["config", "controllers", "middlewares", "models", "routers", "utils"];
const filesArray = ["app.js", "config.env", "server.js", ".gitignore"];
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
 * @param {boolean} [more.err] - Whether to include global error handling.
 * @param {boolean} [more.git] - Whether to initialize a Git repository.
 * @param {string[]} [more.d] - Array of custom directories to create.
 * @param {string[]} [more.f] - Array of custom files to create.
 * @param {string[]} [more.i] - Array of additional packages to install.
 */
exports.scaffoldProject = async (projectDir, more) => {
    // Create the main project folder
    await mainFolder(projectDir);
    // Create standard folders
    await folders(foldersArray, projectDir);
    // Create standard files
    await files(filesArray, projectDir);
    // Create .gitignore file
    gitignore(projectDir);

    // Add database configuration if requested
    if (more.db) {
        packageArray.push("mongoose");
        database(projectDir);
        varliables.MONGO_URI = "Add your mongo url here"; // Placeholder for MongoDB URI
    }

    // Add default app.js and server.js files if requested
    if (more.app) {
        server(projectDir, more.db ?? null); // Pass db status to server template
        app(projectDir);
    }

    // Add CORS configuration if requested
    if (more.cors) {
        packageArray.push("cors");
        cors(projectDir);
    }

    // Add global error handling if requested
    if (more.err) {
        errorHandler(projectDir); // Updated function call
    }

    // Create custom directories if requested
    if (more.d) {
        more.d.forEach(folder => {
            createFolders(projectDir, folder);
        });
    }

    // Create custom files if requested
    if (more.f) {
        more.f.forEach(file => {
            createFile(projectDir, file);
        });
    }

    // Add additional packages to installation list if requested
    if (more.i) {
        more.i.forEach(pkg => {
            packageArray.push(pkg);
        });
    }

    // Generate the environment configuration file
    await generateEnvTemplate(varliables, projectDir);

    // Define npm installation commands
    const commandsArray = [
        "npm init -y",
        "npm i --save " + packageArray.join(' '),
        "npm i --save-dev " + devPackageArray.join(' ')
    ];

    // Execute the npm installation commands
    await exe(commandsArray, projectDir);

    // Initialize Git repository if requested
    if (more.git) {
        try {
            console.log('Initializing Git repository...');
            await git.cwd(projectDir).init();
            await git.add('./*'); // Add all files to staging
            await git.commit('Initial commit'); // Commit the initial changes
            console.log('Git repository initialized');
        } catch (err) {
            console.error('Git init failed:', err.message);
        }
    }
};
