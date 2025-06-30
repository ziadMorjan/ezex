const path = require('path');
const fs = require('fs');
const { askProjectName, askAddMoreFeatures, askOptionalFeatures, askToOpen } = require('./prompts');
const { scaffoldProject } = require('./scaffold');
const { createCRUD } = require("./crud")
const { name } = require("./utils/naming")
const { createController } = require("./utils/crud/createController")
const { createModel } = require("./utils/crud/createModel");
const { createRouter } = require('./utils/crud/createRouter');
const { help } = require("./utils/help")
const { exec } = require('child_process');
const { version } = require("../package.json");
async function prepareProject(projectDir, more) {
    const askmore = (await askAddMoreFeatures());
    const addMore = askmore.addMore
    const addGit = askmore.addgit
    if (addMore) {
        const features = await askOptionalFeatures();
        more.db = features.addDatabase;
        more.app = features.appfile;
        more.cors = features.cors
        more.morgan = features.morgan
        more.err = features.globalError
    }
    if (addGit) {
        more.git = true
    }
    await scaffoldProject(projectDir, more);
}
exports.init = async (args) => {
    if (args.version) {
        console.log(`ezex version: ${version}`);
        return
    }
    if (args.help) {
        help()
        return
    }
    const projectName = await askProjectName();
    let projectDir
    let more = {}
    if (!projectName) return
    if (projectName === ".") {
        projectDir = process.cwd();
    } else {
        projectDir = path.isAbsolute(projectName)
            ? projectName
            : path.join(process.cwd(), projectName);
    }
    const projectExist = fs.existsSync(path.join(projectDir))
    if (args.d) {
        const dirArray = Array.isArray(args.d) ? args.d : [args.d]
        more.d = dirArray
    }
    if (args.f) {
        const filesArray = Array.isArray(args.f) ? args.f : [args.f]
        more.f = filesArray
    }
    if (args.i) {
        const pkgArray = Array.isArray(args.i) ? args.i : [args.i]
        more.i = pkgArray
    }


    if (args.all) {
        if (projectExist) {
            console.log("That project exist")
            return
        }
        else {
            more.db = true
            more.app = true
            more.cors = true
            more.morgan = true
            more.err = true
            more.git = true
            await scaffoldProject(projectDir, more)
        }

    }

    else if (args.c) {
        if (!projectExist) {
            console.log("There is no project with that name ")
            return
        }
        const controllerItems = Array.isArray(args.c) ? args.c : [args.c];
        for (const item of controllerItems) {
            const parsedName = name(item)
            await createController(projectDir, parsedName);
        }
    }
    else if (args.d || args.f || args.i) {
        if (!args.crud) {
            await prepareProject(projectDir, more)
        }
    }
    else if (args.m) {
        if (!projectExist) {
            console.log("There is no project with that name ")
            return
        }
        const modelItems = Array.isArray(args.m) ? args.m : [args.m];
        for (const item of modelItems) {
            const parsedName = name(item)
            await createModel(projectDir, parsedName);
        }
    }
    else if (args.r) {
        if (!projectExist) {
            console.log("There is no project with that name ")
            return
        }
        const modelItems = Array.isArray(args.r) ? args.r : [args.r];
        for (const item of modelItems) {
            const parsedName = name(item)
            await createRouter(projectDir, parsedName);
        }
    }
    else if (!args.all && !args.crud) {
        if (projectExist) {
            console.log("That project exist")
            return
        } else {
            await prepareProject(projectDir, more)
        }

    }
    if (args.crud) {
        if (!projectExist && !args.all) {
            await prepareProject(projectDir, more)
        }
        const crudItems = Array.isArray(args.crud) ? args.crud : [args.crud];
        for (const item of crudItems) {
            await createCRUD(projectDir, item);
        }
    }
    const open = await askToOpen()
    if (open) {
        exec(`code "${projectDir}"`, (err) => {
            if (err) {
                console.error('❌ Failed to open VS Code:', err.message);
            }
        });
    }

}
