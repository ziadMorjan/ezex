const fs = require('fs')
const path = require('path');
exports.generateEnvTemplate = async (variables, projectDir) => {
	const template = Object.entries(variables)
		.map(([key, value]) => `${key}=${value}`)
		.join('\n');
	fs.writeFileSync(path.join(projectDir, 'config.env'), template)
}
