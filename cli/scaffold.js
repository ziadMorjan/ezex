const { folders } = require("./utils/folders")
const { files } = require("./utils/files")
const { mainFolder } = require("./utils/mainFolder")
const { database } = require("./utils/database")
const { generateEnvTemplate } = require("./templates/env")
const { gitignore } = require("./utils/gitignore")
const { server } = require("./templates/server")
const { app } = require("./templates/app")
const { exe } = require("./utils/install")
const { cors } = require("./utils/cors")
const { err } = require("./utils/globalError")
const { createFolders } = require("./utils/addForlders")
const { createFile } = require("./utils/addFiles")
const fs = require("fs")
const path = require("path")
const simpleGit = require('simple-git');
const git = simpleGit();

const foldersArray = ["config", "controllers", "middlewares", "models", "routers", "utils"]
const filesArray = ["app.js", "config.env", "server.js", ".gitignore"]
const packageArray = ["express", "dotenv"]
const devPackageArray = ["nodemon"]

let varliables = {
    NODE_ENV: "development"
}
exports.scaffoldProject = async (projectDir, more) => {
    await mainFolder(projectDir)
    await folders(foldersArray, projectDir)
    await files(filesArray, projectDir)
    gitignore(projectDir)
    if (more.db) {
        packageArray.push("mongoose")
        database(projectDir)
        varliables.MONGO_URI = "Add your mongo url here"
    }
    if (more.app) {
        server(projectDir, more.db ?? null)
        app(projectDir)
    }
    if (more.cors) {
        packageArray.push("cors")
        cors(projectDir)
    }
    if (more.err) {
        err(projectDir)
    }
    if (more.d) {
        more.d.forEach(folder => {
            createFolders(projectDir, folder)
        });
    }
    if (more.f) {
        more.f.forEach(file => {
            createFile(projectDir, file)
        });
    }
    if (more.i) {
        more.i.forEach(pkg => {
            packageArray.push(pkg)
        });
    }
    await generateEnvTemplate(varliables, projectDir)
    const commandsArray = ["npm init -y", "npm i --save " + packageArray.join(' ') + "", "npm i --save-dev " + devPackageArray.join(' ') + ""]

    await exe(commandsArray, projectDir)
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
}
