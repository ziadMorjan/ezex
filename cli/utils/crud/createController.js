const fs = require('fs');
const path = require('path');
const { controllerTemplate } = require('../../templates/controller');
const { emptyControllerTemplate } = require('../../templates/emptyController');
const { askTemplateChoice } = require('../../prompts');

exports.createController = async (projectDir, crudName) => {
	const controllersDir = path.join(projectDir, 'controllers');
	const modelsDir = path.join(projectDir, 'models');
	const modelPath = path.join(modelsDir, `${crudName.capitalized}.js`);

	if (!fs.existsSync(controllersDir)) fs.mkdirSync(controllersDir);

	const templatePreference = await askTemplateChoice('controller');

	let controllerContent;
	if (templatePreference === 'empty') {
		console.log(`Creating an empty controller for '${crudName.capitalized}'.`);
		controllerContent = emptyControllerTemplate(crudName);
	} else {
		if (fs.existsSync(modelPath)) {
			console.log(`Model '${crudName.capitalized}.js' found. Creating controller with CRUD functions.`);
			controllerContent = controllerTemplate(crudName);
		} else {
			console.log(`Model '${crudName.capitalized}.js' not found. Creating an empty controller instead.`);
			controllerContent = emptyControllerTemplate(crudName);
		}
	}

	fs.writeFileSync(path.join(controllersDir, `${crudName.lower}Controller.js`), controllerContent);
	console.log(`Controller created: ${crudName.lower}Controller.js`);
};

