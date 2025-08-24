const path = require('path');
const fs = require('fs');
const { dbTemplate } = require('../templates/database'); // Mongo
const { pgRawTemplate } = require('../templates/postgresRaw');
const { pgOrmTemplate } = require('../templates/postgresOrm');

exports.database = async (projectDir, opts) => {
	if (opts.db) {
		fs.writeFileSync(path.join(projectDir, 'config', 'db.js'), dbTemplate);
	}
	if (opts['pg-raw']) {
		fs.writeFileSync(path.join(projectDir, 'config', 'pg.js'), pgRawTemplate);
	}
	if (opts['pg-orm']) {
		fs.writeFileSync(path.join(projectDir, 'config', 'pg.js'), pgOrmTemplate);
	}
};