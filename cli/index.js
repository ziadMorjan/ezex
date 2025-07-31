const path = require('path');
const fs = require('fs');
const { askProjectName, askForFeatures, askToOpen } = require('./prompts');
const { scaffoldProject } = require('./scaffold');
const { createCRUD } = require("./crud");
const { name } = require("./utils/naming");
const { createController } = require("./utils/crud/createController");
const { createModel } = require("./utils/crud/createModel");
const { createRouter } = require('./utils/crud/createRouter');
const { help } = require("./utils/help");
const { exec } = require('child_process');
const { createFolders } = require("./utils/addForlders");
const { createFile } = require("./utils/addFiles");
const { exe } = require("./utils/install");
const { logError, logInfo, logSuccess } = require('./utils/error');

async function handleComponentCreation(projectDir, args) {
	if (args.c || args.controller) {
		const items = args.c || args.controller;
		const controllerItems = Array.isArray(items) ? items : [items];
		for (const item of controllerItems) {
			await createController(projectDir, name(item));
		}
	}
	if (args.m || args.model) {
		const items = args.m || args.model;
		const modelItems = Array.isArray(items) ? items : [items];
		for (const item of modelItems) {
			await createModel(projectDir, name(item));
		}
	}
	if (args.r || args.router) {
		const items = args.r || args.router;
		const routerItems = Array.isArray(items) ? items : [items];
		for (const item of routerItems) {
			await createRouter(projectDir, name(item));
		}
	}
}

async function handleExtraAdditions(projectDir, args) {
	if (args.d || args.dir) {
		const items = args.d || args.dir;
		const folders = Array.isArray(items) ? items : [items];
		for (const folder of folders) {
			createFolders(projectDir, folder);
		}
	}
	if (args.f || args.file) {
		const items = args.f || args.file;
		const files = Array.isArray(items) ? items : [items];
		for (const file of files) {
			await createFile(projectDir, file, "");
		}
	}
	if (args.i || args.install) {
		const items = args.i || args.install;
		const packages = Array.isArray(items) ? items : [items];
		if (packages.length > 0) {
			const commandsArray = [`npm i ${packages.join(' ')}`];
			logInfo("Installing specified packages...");
			await exe(commandsArray, projectDir);
		}
	}
}

exports.init = async (args, version) => {
	try {
		if (args.version) {
			console.log(`ezex version: ${version}`);
			return;
		}
		if (args.help) {
			help();
			return;
		}

		const projectName = args._[0] || await askProjectName();
		if (!projectName) return;

		const projectDir = projectName === "." ? process.cwd() : path.resolve(projectName);
		const projectExists = fs.existsSync(path.join(projectDir, 'package.json'));
		const hasActionFlags = args.all || args.crud || args.c || args.m || args.r || args.i || args.d || args.f;

		// --- المنطق الرئيسي الجديد ---

		// الحالة 1: إنشاء مشروع جديد (لأن المشروع غير موجود و تم استخدام --all أو --crud أو لم يتم استخدام أي flag)
		if (!projectExists && (args.all || args.crud || !hasActionFlags)) {
			logInfo("Setting up a new project...");
			const features = args.all ?
				{ db: true, cors: true, morgan: true, linting: true, git: true } :
				await askForFeatures();
			await scaffoldProject(projectDir, features);
		}
		// الحالة 2: محاولة استخدام --all على مشروع موجود
		else if (projectExists && args.all) {
			logError("Project already exists. Cannot use --all to overwrite it.");
			return;
		}
		// الحالة 3: تشغيل الأمر على مشروع موجود بدون أي flag
		else if (projectExists && !hasActionFlags) {
			logInfo("Project already exists. Use flags like --crud, -c, etc. to modify it. Use --help for more options.");
			return;
		}

		// --- إضافة المكونات والميزات (تعمل بعد إنشاء المشروع الجديد أو على مشروع موجود) ---

		if (args.crud) {
			const crudItems = Array.isArray(args.crud) ? args.crud : [args.crud];
			for (const item of crudItems) {
				await createCRUD(projectDir, item);
			}
		}

		await handleComponentCreation(projectDir, args);
		await handleExtraAdditions(projectDir, args);

		logSuccess("All tasks completed successfully!");

		if (await askToOpen()) {
			exec(`code "${projectDir}"`, (err) => {
				if (err) logError('Failed to open VS Code.', err.message);
			});
		}
	} catch (error) {
		logError("An unexpected error occurred. Process stopped.", error.message);
	}
};
