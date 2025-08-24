const { folders } = require("./utils/folders");
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
const { createFile } = require("./utils/addFiles");
const simpleGit = require('simple-git');
const { customErrorTemplate } = require("./templates/customError");
const { queryManipulatorTemplate } = require("./templates/queryManipulator");
const { generalControllerTemplate } = require("./templates/generalController");
const { eslintTemplate } = require("./templates/eslint");
const { prettierTemplate } = require("./templates/prettier");
const { modifyPackageJson } = require("./templates/packageJson");
const { logInfo, logSuccess, logError } = require("./utils/error");

const foldersArray = ["config", "controllers", "middlewares", "models", "routers", "utils", "public"];
let varliables = {
	NODE_ENV: "development",
	PORT: 8000
};

exports.scaffoldProject = async (projectDir, features) => {
	logInfo("Starting project scaffolding...");
	await mainFolder(projectDir);
	await folders(foldersArray, projectDir);

	logInfo("Creating core utility files...");
	await createFile(projectDir, "utils/CustomError.js", customErrorTemplate);
	await createFile(projectDir, "utils/QueryManipulator.js", queryManipulatorTemplate);
	await createFile(projectDir, "controllers/Controller.js", generalControllerTemplate);

	await gitignore(projectDir);
	await app(projectDir);
	await server(projectDir);
	await errorHandler(projectDir);

	const packageArray = ["express@4", "dotenv"];
	const devPackageArray = ["nodemon"];

	if (features.db) {
		packageArray.push("mongoose");
		await database(projectDir);
		varliables.MONGO_URI = "mongodb://127.0.0.1:27017/your_db_name";
	}
	if (features.cors) {
		packageArray.push("cors");
		await cors(projectDir);
	}
	if (features.morgan) {
		packageArray.push("morgan");
		await morgan(projectDir);
	}
	if (features.linting) {
		devPackageArray.push("eslint@8", "prettier", "eslint-config-prettier", "eslint-plugin-prettier", "eslint-plugin-node");
		await createFile(projectDir, ".eslintrc.json", eslintTemplate);
		await createFile(projectDir, ".prettierrc", prettierTemplate);
		await createFile(projectDir, ".prettierignore", "node_modules\nconfig.env");
	}

	await generateEnvTemplate(varliables, projectDir);

	logInfo("Initializing npm and installing packages...");
	const commands = [{ cmd: 'npm', args: ['init', '-y'] }];
	if (packageArray.length > 0) commands.push({ cmd: 'npm', args: ['i', ...packageArray] });
	if (devPackageArray.length > 0) commands.push({ cmd: 'npm', args: ['i', '-D', ...devPackageArray] });

	await exe(commands, projectDir);

	logInfo("Configuring package.json for ESM and scripts...");
	modifyPackageJson(projectDir, features.linting);

	if (features.git) {
		logInfo("Initializing Git repository...");
		try {
			const git = simpleGit(projectDir);
			await git.init();
			await git.add('./*');
			await git.commit('feat: initial commit by ezex-cli');
			logSuccess('Git repository initialized.');
		} catch (err) {
			logError('Git initialization failed.', err.message);
		}
	}
	logSuccess("Project scaffolding complete!");
};
