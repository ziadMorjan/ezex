const fs = require('fs');
const path = require('path');
const { logError } = require('./error');
const { safeWrite } = require('./safeWrite');

const createFile = async (projectDir, relativePath, content, opts = {}) => {
	try {
		const filePath = path.join(projectDir, relativePath);
		safeWrite(filePath, content, opts);
	} catch (err) {
		logError(`Error creating file: ${relativePath}`, err.message);
	}
};

const modifyApp = async (projectDir, options = {}) => {
	try {
		const appPath = path.join(projectDir, 'app.js');
		let content = fs.readFileSync(appPath, 'utf8');

		if (options.morgan && !content.includes("import morgan from 'morgan'")) {
			content = `import morgan from 'morgan';\n` + content;
			content = content.replace(
				"const app = express();",
				"const app = express();\napp.use(morgan('dev'));"
			);
		}

		if (options.error && !content.includes("import errorHandler from './middlewares/errorHandler.js'")) {
			content = `import errorHandler from './middlewares/errorHandler.js';\n` + content;
			content = content.replace(/export default app;/, "app.use(errorHandler);\n\nexport default app;");
		}

		if (options.router) {
			const routerImport = `import ${options.router}Router from './routers/${options.router}.js`;
			if (!content.includes(routerImport)) {
				content = routerImport + '\n' + content;
				content = content.replace(
					"const app = express();",
					`const app = express();\napp.use('/api/${options.router.toLowerCase()}', ${options.router}Router);`
				);
			}
		}

		fs.writeFileSync(appPath, content);
	} catch (err) {
		logError('Error modifying app.js', err.message);
	}
};

module.exports = { createFile, modifyApp };
