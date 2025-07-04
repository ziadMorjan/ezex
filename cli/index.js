const path = require('path');
const fs = require('fs');
const { askProjectName, askAddMoreFeatures, askOptionalFeatures, askToOpen } = require('./prompts');
const { scaffoldProject } = require('./scaffold');
const { createCRUD } = require("./crud");
const { name } = require("./utils/naming");
const { createController } = require("./utils/crud/createController");
const { createModel } = require("./utils/crud/createModel");
const { createRouter } = require('./utils/crud/createRouter');
const { help } = require("./utils/help");
const { exec } = require('child_process');
const { version } = require("../package.json");
const { createFolders } = require("./utils/addForlders");
const { createFile } = require("./utils/addFiles");
const { exe } = require("./utils/install");

/**
 * Prepares the project by asking for optional features and scaffolding the project.
 * This function is typically called when creating a new project or when --crud is used
 * and no project exists.
 * @param {string} projectDir - The path to the project directory.
 * @param {object} more - An object containing additional features to include.
 */
async function prepareProject(projectDir, more) {
    const askmore = (await askAddMoreFeatures());
    const addMore = askmore.addMore;
    const addGit = askmore.addgit;

    if (addMore) {
        const features = await askOptionalFeatures();
        more.db = features.addDatabase;
        more.app = features.appfile;
        more.cors = features.cors;
        more.morgan = features.morgan;
        more.err = features.globalError;
    }
    if (addGit) {
        more.git = true;
    }
    await scaffoldProject(projectDir, more);
}

/**
 * Main function to initialize the ezex CLI tool.
 * Handles different flags and the flow of project creation or modification.
 * @param {object} args - Command-line arguments parsed by minimist.
 */
exports.init = async (args) => {
    // Handle --version and --help flags first and exit
    if (args.version) {
        console.log(`ezex version: ${version}`);
        return;
    }
    if (args.help) {
        help();
        return;
    }

    // Prompt for project name
    const projectName = await askProjectName();
    let projectDir;
    let more = {}; // Object to store additional features/flags

    if (!projectName) return; // Exit if no project name is entered

    // Determine the absolute path of the project directory
    if (projectName === ".") {
        projectDir = process.cwd();
    } else {
        projectDir = path.isAbsolute(projectName)
            ? projectName
            : path.join(process.cwd(), projectName);
    }

    // NEW: Check if an ezex project exists by looking for package.json
    const isEzexProject = fs.existsSync(path.join(projectDir, 'package.json'));
    // Also check if the directory itself exists, regardless of project files
    const directoryExists = fs.existsSync(projectDir);


    // Collect values for multi-value flags (-d, -f, -i) upfront
    if (args.d) {
        more.d = Array.isArray(args.d) ? args.d : [args.d];
    }
    if (args.f) {
        more.f = Array.isArray(args.f) ? args.f : [args.f];
    }
    if (args.i) {
        more.i = Array.isArray(args.i) ? args.i : [args.i];
    }

    // --- Core Logic Flow ---

    // Case 1: Attempting to create a full project (--all)
    if (args.all) {
        if (isEzexProject) { // If an ezex project exists, prevent overwrite
            console.log("This project already exists. Cannot use --all to overwrite it.");
            return;
        } else { // If no ezex project, proceed to scaffold, even if directory exists but is empty of project files
            more.db = true;
            more.app = true;
            more.cors = true;
            more.morgan = true;
            more.err = true;
            more.git = true;
            await scaffoldProject(projectDir, more);
        }
    }
    // Case 2: Adding custom directories, files, or installing packages to an EXISTING ezex project
    else if (isEzexProject && (more.d || more.f || more.i)) {
        console.log("Project exists. Adding specified directories, files, or packages...");
        if (more.d) {
            for (const folder of more.d) {
                createFolders(projectDir, folder);
            }
        }
        if (more.f) {
            for (const file of more.f) {
                await createFile(projectDir, file, "");
            }
        }
        if (more.i) {
            const packagesToInstall = more.i;
            if (packagesToInstall.length > 0) {
                const commandsArray = ["npm i --save " + packagesToInstall.join(' ')];
                console.log("Installing specified packages...");
                await exe(commandsArray, projectDir);
            }
        }
    }
    // Case 3: Adding CRUD components (--crud)
    else if (args.crud) {
        if (!isEzexProject) { // If no ezex project, scaffold it first
            await prepareProject(projectDir, more);
        }
        const crudItems = Array.isArray(args.crud) ? args.crud : [args.crud];
        for (const item of crudItems) {
            await createCRUD(projectDir, item);
        }
    }
    // Case 4: Adding individual components (-c, -m, -r)
    else if (args.c || args.m || args.r) {
        if (!isEzexProject) { // Requires an ezex project to exist
            console.log("No ezex project found at this location. Use --all or --crud to create a new project.");
            return;
        }
        if (args.c) {
            const controllerItems = Array.isArray(args.c) ? args.c : [args.c];
            for (const item of controllerItems) {
                const parsedName = name(item);
                await createController(projectDir, parsedName);
            }
        }
        if (args.m) {
            const modelItems = Array.isArray(args.m) ? args.m : [args.m];
            for (const item of modelItems) {
                const parsedName = name(item);
                await createModel(projectDir, parsedName);
            }
        }
        if (args.r) {
            const routerItems = Array.isArray(args.r) ? args.r : [args.r];
            for (const item of routerItems) {
                const parsedName = name(item);
                await createRouter(projectDir, parsedName);
            }
        }
    }
    // Case 5: Default new project creation (no specific flags, and no ezex project exists)
    else if (!isEzexProject) {
        // Ensure the directory exists before scaffolding if it's a new project
        if (!directoryExists) {
            fs.mkdirSync(projectDir);
            console.log(`Project directory created: ${projectDir}`);
        } else {
            console.log(`Project directory already exists: ${projectDir} (but no ezex project found, proceeding with scaffold).`);
        }
        await prepareProject(projectDir, more);
    }
    // Case 6: If an ezex project exists and no specific action was taken (e.g., just `ezex .` on existing ezex project)
    else if (isEzexProject) { // This condition explicitly handles the case where an ezex project exists
        console.log("An ezex project already exists. No action taken. Use --help for options to modify it.");
    }
    // Fallback for any unhandled case (shouldn't be reached with proper logic)
    else {
        console.log("Unhandled scenario. Please check your command or report an issue.");
    }


    // Prompt user to open project in VS Code (after any successful operation)
    const open = await askToOpen();
    if (open) {
        exec(`code "${projectDir}"`, (err) => {
            if (err) {
                console.error('❌ Failed to open VS Code:', err.message);
            }
        });
    }
};
