const path = require('path')
const fs = require('fs')
const databaseFile = require('../templates/database')
exports.database = async (projectDir) => {
	fs.writeFileSync(path.join(projectDir, 'config', 'db.js'), databaseFile.dbTemplate);
}