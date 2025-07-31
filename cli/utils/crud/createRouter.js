const fs = require('fs');
const path = require('path');
const { routerTemplate } = require('../../templates/router');
const { emptyRouterTemplate } = require('../../templates/emptyRouter');
const { askTemplateChoice } = require('../../prompts');

exports.createRouter = async (projectDir, crudName) => {
	const routersDir = path.join(projectDir, 'routers');
	const controllerPath = path.join(projectDir, 'controllers', `${crudName.lower}Controller.js`);

	if (!fs.existsSync(routersDir)) fs.mkdirSync(routersDir);

	const templatePreference = await askTemplateChoice('router');

	let routerContent;
	if (templatePreference === 'empty') {
		console.log(`Creating an empty router for '${crudName.capitalized}'.`);
		routerContent = emptyRouterTemplate(crudName);
	} else {
		if (fs.existsSync(controllerPath)) {
			console.log(`Controller '${crudName.lower}Controller.js' found. Creating router with routes.`);
			routerContent = routerTemplate(crudName);
		} else {
			console.log(`Controller for '${crudName.capitalized}' not found. Creating an empty router instead.`);
			routerContent = emptyRouterTemplate(crudName);
		}
	}

	fs.writeFileSync(path.join(routersDir, `${crudName.lower}Router.js`), routerContent);
	console.log(`Router created: ${crudName.lower}Router.js`);
};
