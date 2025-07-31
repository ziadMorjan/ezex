const fs = require('fs')
exports.mainFolder = async (projectDir) => {
	if (!fs.existsSync(projectDir)) {
		fs.mkdirSync(projectDir);
		console.log(`Project directory created: ${projectDir}`);
	} else {
		console.log(`Project directory already exists: ${projectDir}`);
	}
}
