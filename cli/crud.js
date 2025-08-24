const path = require('path');
const { askTemplateChoice } = require('./prompts');
const { controllerTemplate, emptyControllerTemplate } = require('./templates/controller');
const { routerTemplate, emptyRouterTemplate } = require('./templates/router');
const { modelTemplate } = require('./templates/model');
const { toPascalCase, toLowerCase } = require('./utils/naming');
const { modifyApp } = require('./utils/addFiles');
const { logError, logSuccess } = require('./utils/error');
const { assertSafeName } = require('./utils/validate');
const { safeWrite } = require('./utils/safeWrite');

const createModel = async (projectDir, name, opts = {}) => {
	try {
		assertSafeName(name);
		const modelName = toPascalCase(name);
		const modelFilePath = path.join(projectDir, 'models', `${modelName}.js`);
		const content = modelTemplate(modelName);
		if (safeWrite(modelFilePath, content, opts)) {
			logSuccess(`Model created: ${modelFilePath}`);
		}
	} catch (err) {
		logError(`Error creating model: ${err.message}`);
	}
};

const createController = async (projectDir, name, opts = {}) => {
	try {
		assertSafeName(name);
		const controllerName = toPascalCase(name);
		const controllerFilePath = path.join(projectDir, 'controllers', `${controllerName}.js`);
		const choice = await askTemplateChoice('controller');
		const content =
			choice === 'full'
				? controllerTemplate(controllerName, toLowerCase(controllerName))
				: emptyControllerTemplate(controllerName);

		if (safeWrite(controllerFilePath, content, opts)) {
			logSuccess(`Controller created: ${controllerFilePath}`);
		}
	} catch (err) {
		logError(`Error creating controller: ${err.message}`);
	}
};

const createRouter = async (projectDir, name, opts = {}) => {
	try {
		assertSafeName(name);
		const routerName = toPascalCase(name);
		const routerFilePath = path.join(projectDir, 'routers', `${routerName}.js`);
		const choice = await askTemplateChoice('router');
		const content =
			choice === 'full'
				? routerTemplate(routerName, toLowerCase(routerName))
				: emptyRouterTemplate(routerName);

		if (safeWrite(routerFilePath, content, opts)) {
			logSuccess(`Router created: ${routerFilePath}`);
		}
		await modifyApp(projectDir, { router: routerName });
		logSuccess(`Router linked in app.js`);
	} catch (err) {
		logError(`Error creating router: ${err.message}`);
	}
};

module.exports = { createModel, createController, createRouter };
