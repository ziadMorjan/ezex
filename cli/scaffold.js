// ... rest of imports
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

	// ... other setup code

	if (features.db) {
		packageArray.push("mongoose");
		await database(projectDir, { db: true });
		varliables.MONGO_URI = "mongodb://127.0.0.1:27017/your_db_name";
	}
	if (features['pg-raw']) {
		packageArray.push("pg");
		await database(projectDir, { 'pg-raw': true });
		varliables.PG_URI = "postgresql://user:password@localhost:5432/your_db_name";
	}
	if (features['pg-orm']) {
		packageArray.push("sequelize", "pg", "pg-hstore");
		await database(projectDir, { 'pg-orm': true });
		varliables.PG_URI = "postgresql://user:password@localhost:5432/your_db_name";
	}

	// ... rest of scaffold function
};