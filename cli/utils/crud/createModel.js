const fs = require('fs');
const path = require('path');
const { modelTemplate } = require('../../templates/model')
exports.createModel = async (projectDir, crudName) => {
	const modelsDir = path.join(projectDir, 'models');
	if (!fs.existsSync(modelsDir)) {
		fs.mkdirSync(modelsDir);
	}
	fs.writeFileSync(path.join(modelsDir, `${crudName.capitalized}.js`), modelTemplate(crudName));
	console.log(`Model created: ${crudName.capitalized}.js`);
}
