const fs = require('fs');
const path = require('path');

exports.modifyPackageJson = (projectDir, addLinting) => {
	const packageJsonPath = path.join(projectDir, 'package.json');
	if (!fs.existsSync(packageJsonPath)) return;

	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

	packageJson.type = "module";
	packageJson.main = "server.js";
	packageJson.scripts = {
		"start": "node server.js",
		"dev": "nodemon server.js",
		...packageJson.scripts, // Keep existing scripts like "test"
	};

	if (addLinting) {
		packageJson.scripts.lint = "eslint .";
		packageJson.scripts.format = "prettier --write .";
	}

	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
