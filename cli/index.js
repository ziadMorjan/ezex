const minimist = require('minimist');
const path = require('path');
const { scaffoldProject } = require('./scaffold');
const { createModel, createController, createRouter } = require('./crud');
const { logInfo, logError } = require('./utils/error');

const args = minimist(process.argv.slice(2), {
	boolean: ['db', 'cors', 'morgan', 'linting', 'git', 'force', 'dry-run'],
	alias: {
		d: 'db',
		c: 'cors',
		m: 'morgan',
		l: 'linting',
		g: 'git',
		f: 'force',
	},
});

const cmd = args._[0];
const name = args._[1];
const projectDir = path.resolve(process.cwd(), args._[1] || '.');
const opts = { force: args.force, dryRun: args['dry-run'] };

(async () => {
	try {
		if (cmd === 'create') {
			await scaffoldProject(projectDir, args);
		} else if (cmd === 'model') {
			await createModel(process.cwd(), name, opts);
		} else if (cmd === 'controller') {
			await createController(process.cwd(), name, opts);
		} else if (cmd === 'router') {
			await createRouter(process.cwd(), name, opts);
		} else {
			logInfo('Usage: ezex create <dir> [options] | ezex model <name> | ezex controller <name> | ezex router <name>');
		}
	} catch (err) {
		logError('Command failed', err.message);
	}
})();
